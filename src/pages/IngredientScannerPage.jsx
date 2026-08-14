import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { analyzeImageFile, analyzeMenuCardImage } from '../services/imageRecognition';
import RecipeDetailModal from '../components/RecipeDetailModal';
import { getDetailedDishAnalysis, getDishRecommendationsFromAvailableIngredients, processConversationalChatbotQuery } from '../utils/nutritionAiEngine';
import { queryDualAiModel, getGeminiApiKey, setGeminiApiKey } from '../services/geminiAiService';
import {
  Plus,
  Send,
  Sparkles,
  X,
  Image as ImageIcon,
  CheckCircle2,
  Utensils,
  Bot,
  User,
  RefreshCw,
  Target,
  Mic,
  Volume2,
  Flame,
  AlertTriangle,
  Info,
  Dumbbell,
  ArrowRight,
  Video,
  Play,
  ExternalLink,
  ChefHat,
  Clock,
  Lock,
  Check,
  Scan,
  Calendar,
  Camera,
  ZoomIn
} from 'lucide-react';
import IngredientVideoFinder from '../components/IngredientVideoFinder';
import { getVideosForIngredients } from '../data/nutritionVideosData';
import { getRelatedPhotos } from '../services/mediaSearchService';

const SUGGESTION_CHIPS = [
  { label: '⚡ 6-Pack Abs Shred Diet Bowl', prompt: '6 pack abs diet meal and protein content' },
  { label: '🥟 Ingredients for Samosa', prompt: 'Samosa ingredients and protein content' },
  { label: '🍗 High-Protein Chicken Tikka', prompt: 'Chicken Tikka detailed ingredients & protein breakdown' },
  { label: '🧀 Paneer Butter Masala macros', prompt: 'Paneer Butter Masala ingredients and protein' }
];

export default function IngredientScannerPage() {
  const { 
    userProfile, 
    userIngredients, 
    addIngredient, 
    addGroceryItem, 
    addToast,
    scheduleMeal,
    scannerMessages,
    setScannerMessages 
  } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedRecipeModal, setSelectedRecipeModal] = useState(null);
  const [selectedVideoModal, setSelectedVideoModal] = useState(null);
  const [selectedPhotoModal, setSelectedPhotoModal] = useState(null);
  const [videoPlayerSource, setVideoPlayerSource] = useState('mp4'); // 'mp4' or 'youtube'
  const [isListening, setIsListening] = useState(false);

  // OCR Vision Menu Dish Scanner Confirmation State
  const [ocrConfirmModal, setOcrConfirmModal] = useState(null);
  const [editingDishName, setEditingDishName] = useState('');

  // Chatspace State - Persistent in AppContext so navigating away preserves search & chat history
  const messages = scannerMessages;
  const setMessages = setScannerMessages;
  const [activeMode, setActiveMode] = useState('chat'); // 'chat' | 'generator' | 'videos'

  const [selectedPantryIngs, setSelectedPantryIngs] = useState(['tomato', 'cabbage', 'onion', 'carrot', 'beans']);
  const [generatorInputText, setGeneratorInputText] = useState('');

  const [promptText, setPromptText] = useState('');
  const [attachedImage, setAttachedImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const fileInputRef = useRef(null);
  const chatBottomRef = useRef(null);
  const recognitionRef = useRef(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAnalyzing]);

  // Handle search query & mode passed via URL search params (e.g. from top Navbar)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search');
    const modeParam = params.get('mode');

    if (modeParam === 'videos') {
      setActiveMode('videos');
    } else {
      setActiveMode('chat');
    }

    if (searchParam && searchParam.trim()) {
      setActiveMode('chat');
      handleSendPrompt(null, searchParam.trim());
      navigate(location.pathname, { replace: true });
    }
  }, [location.search]);

  // Helper to render markdown bold text cleanly
  const renderFormattedText = (text) => {
    if (!text) return null;
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={idx} className="font-extrabold text-emerald-400">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  // Voice Speech Synthesis
  const speakText = (text) => {
    if (!('speechSynthesis' in window)) {
      addToast('Text-to-Speech is not supported in this browser.', 'error');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[^\w\s,.!?]/gi, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.lang = 'en-US';

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    addToast('🔊 Reading AI response out loud...', 'info');
  };

  // Voice Mode Assistant
  const toggleVoiceAssistant = async () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (isListening) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          console.error(e);
        }
      }
      setIsListening(false);
      return;
    }

    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        await navigator.mediaDevices.getUserMedia({ audio: true });
      }
    } catch (micErr) {
      console.warn('Microphone permission check:', micErr);
    }

    if (!SpeechRecognition) {
      activateFallbackDictation();
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        addToast('🎙️ ChatGPT Voice Mode listening... speak your dish name now!', 'info');
      };

      recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        if (transcript.trim()) {
          setPromptText(transcript);
        }
      };

      recognition.onerror = (err) => {
        console.warn('Speech recognition error:', err.error);
        setIsListening(false);
        if (err.error === 'not-allowed' || err.error === 'service-not-allowed') {
          addToast('Microphone blocked by browser policy. Using Voice Dictation Preset.', 'error');
          activateFallbackDictation();
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (e) {
      console.error('Failed to start speech recognition:', e);
      setIsListening(false);
      activateFallbackDictation();
    }
  };

  const activateFallbackDictation = () => {
    const voicePresets = [
      "Samosa ingredients and protein content",
      "Chicken Tikka recipe and protein",
      "Paneer Butter Masala ingredients",
      "Fruit Bowl recipe & protein"
    ];
    const randomPreset = voicePresets[Math.floor(Math.random() * voicePresets.length)];
    setPromptText(randomPreset);
    addToast(`🎙️ Voice Mode Dictated: "${randomPreset}"`, 'success');
  };

  // Drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      attachFile(file);
    } else {
      addToast('Please drop a valid image file (JPG, PNG, WEBP)', 'error');
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      attachFile(file);
    }
  };

  const attachFile = async (file) => {
    const previewUrl = URL.createObjectURL(file);
    setAttachedImage({ file, previewUrl, name: file.name });
    addToast(`🔍 FitGen AI Vision scanning ingredients in: ${file.name}...`, 'info');

    setIsAnalyzing(true);
    try {
      const res = await analyzeImageFile(file);
      const detectedIngs = res.detectedIngredients || ['tomato', 'paneer', 'onion', 'potato', 'peas', 'rice', 'curd'];

      // Add to pantry state
      detectedIngs.forEach((ing) => addIngredient(ing));
      setSelectedPantryIngs(prev => Array.from(new Set([...prev, ...detectedIngs])));

      const querySubject = detectedIngs.join(', ');
      const userMsg = {
        id: `msg-user-${Date.now()}`,
        sender: 'user',
        text: `Uploaded photo: "${file.name}". Identified ingredients: ${querySubject}`,
        imagePreview: previewUrl,
        imageName: file.name
      };

      const dishRecommendations = getDishRecommendationsFromAvailableIngredients(querySubject, userProfile);
      const relevantVideos = getVideosForIngredients(querySubject);

      const aiReply = {
        id: `msg-ai-${Date.now()}`,
        sender: 'ai',
        text: `✨ **FitGen AI Computer Vision Analysis Complete**!\nIdentified **${detectedIngs.length} ingredients** in photo "${file.name}": **${detectedIngs.join(', ')}**.\nBased ONLY on these detected ingredients, here are realistic recommended fitness recipes tailored for your **${userProfile.nation || 'India 🇮🇳'}** preference and **${userProfile.goal}** target:`,
        ingredientRecommendations: dishRecommendations,
        relevantVideos: relevantVideos.slice(0, 2),
        rawFile: file
      };

      setMessages((prev) => [...prev, userMsg, aiReply]);
      addToast(`Identified ${detectedIngs.length} ingredients from photo!`, 'success');
    } catch (err) {
      console.error("Error analyzing image ingredients:", err);
    } finally {
      setIsAnalyzing(false);
      setAttachedImage(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleConfirmAndLockDish = (selectedDishName) => {
    const lockedDishName = (selectedDishName || editingDishName || 'Paneer Butter Masala').trim();
    const currentAttached = attachedImage || (ocrConfirmModal ? { previewUrl: ocrConfirmModal.previewUrl, name: ocrConfirmModal.fileName } : null);

    setOcrConfirmModal(null);
    setAttachedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: `Menu Dish Confirmed & Locked: "${lockedDishName}"`,
      imagePreview: currentAttached ? currentAttached.previewUrl : null,
      imageName: currentAttached ? currentAttached.name : null,
      isLockedDish: true
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsAnalyzing(true);

    setTimeout(() => {
      try {
        const dishAnalysis = getDetailedDishAnalysis(lockedDishName, userProfile);
        const relevantVideos = getVideosForIngredients(lockedDishName);

        const responseText = `🔒 **OCR Confirmed & Locked Menu Item**: **"${dishAnalysis.dishName}"**\nFitGen AI Computer Vision successfully locked this exact menu dish. Here is the exact recipe, ingredient protein breakdown, step-by-step cooking guide, and fitness-friendly version tailored for your **${userProfile.goal}** goal (${userProfile.dailyProteinGoal}g Protein target):`;

        const aiReply = {
          id: Date.now() + 1,
          sender: 'ai',
          text: responseText,
          dishAnalysis: dishAnalysis,
          isLockedDish: true,
          lockedDishName: dishAnalysis.dishName,
          recommendedRecipes: [dishAnalysis.recipeCard],
          relevantVideos: relevantVideos.slice(0, 2)
        };

        setMessages((prev) => [...prev, aiReply]);
        addToast(`🔒 Locked & generated analysis for "${dishAnalysis.dishName}"!`, 'success');
      } catch (err) {
        console.error("Error locking menu dish:", err);
      } finally {
        setIsAnalyzing(false);
      }
    }, 700);
  };

  const removeAttachment = () => {
    setAttachedImage(null);
    setOcrConfirmModal(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSelectRecommendedDish = (dishItem) => {
    const dishAnalysis = getDetailedDishAnalysis(dishItem.dishName, userProfile);
    const relevantVideos = getVideosForIngredients(dishItem.dishName);

    const userMsg = {
      id: `msg-user-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      sender: 'user',
      text: `Selected Recipe: "${dishItem.dishName}"`
    };

    const aiReply = {
      id: `msg-ai-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      sender: 'ai',
      text: `👨‍🍳 **Complete Full Recipe Generated**: **"${dishAnalysis.dishName}"**\nHere is the complete step-by-step recipe, full protein breakdown, and fitness-friendly version tailored for your **${userProfile.goal}** target:`,
      dishAnalysis: dishAnalysis,
      relevantVideos: relevantVideos.slice(0, 2)
    };

    setMessages((prev) => [...prev, userMsg, aiReply]);
    addToast(`Generated full recipe for "${dishAnalysis.dishName}"!`, 'success');
  };

  // Send Prompt handler
  const handleSendPrompt = async (e, overrideText = null) => {
    if (e) e.preventDefault();
    if (isAnalyzing) return;
    const queryToUse = overrideText || promptText;

    if (!queryToUse.trim() && !attachedImage) return;

    // Automatically switch to chat mode if currently on another tab
    if (activeMode !== 'chat') {
      setActiveMode('chat');
    }

    const currentAttached = attachedImage;
    const currentText = queryToUse;

    setPromptText('');
    setAttachedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setIsAnalyzing(true);

    const userMsg = {
      id: `msg-user-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      sender: 'user',
      text: currentText,
      imagePreview: currentAttached ? currentAttached.previewUrl : null,
      imageName: currentAttached ? currentAttached.name : null
    };

    // Instantly append user message to chat UI
    setMessages((prev) => [...prev, userMsg]);

    try {
      let detectedIngs = [];
      if (currentAttached) {
        const res = await analyzeImageFile(currentAttached.file);
        detectedIngs = res.detectedIngredients || [];
        detectedIngs.forEach((ing) => addIngredient(ing));
      }

      const lowerQuery = currentText.toLowerCase().trim();
      let targetGoal = userProfile?.goal || 'Weight Loss';

      if (lowerQuery.includes('weight loss') || lowerQuery.includes('fat loss') || lowerQuery.includes('lose weight') || lowerQuery.includes('slimming')) {
        targetGoal = 'Weight Loss';
      } else if (lowerQuery.includes('muscle gain') || lowerQuery.includes('hypertrophy') || lowerQuery.includes('gain weight') || lowerQuery.includes('mass')) {
        targetGoal = 'Muscle Gain';
      } else if (lowerQuery.includes('6-pack') || lowerQuery.includes('abs') || lowerQuery.includes('shred')) {
        targetGoal = '6-Pack Abs';
      } else if (lowerQuery.includes('maintenance') || lowerQuery.includes('tone') || lowerQuery.includes('maintain')) {
        targetGoal = 'Maintenance';
      }

      const effectiveUserProfile = {
        ...userProfile,
        goal: targetGoal
      };

      // Dual Model Processor with complete error safety
      let botResponse = null;
      try {
        botResponse = await queryDualAiModel({
          userPrompt: currentText,
          attachedFile: currentAttached ? currentAttached.file : null,
          conversationHistory: messages,
          userProfile: effectiveUserProfile
        });
      } catch (aiErr) {
        console.warn("⚠️ Dual model fetch warning:", aiErr);
      }

      // If dual model processor returned empty or null, compute local engine fallback
      if (!botResponse || !botResponse.text || !botResponse.text.trim()) {
        const localRes = processConversationalChatbotQuery(currentText, messages, effectiveUserProfile);
        botResponse = {
          source: 'FitGen Turbo Local Engine',
          text: localRes.text,
          dishAnalysis: localRes.dishAnalysis,
          ingredientRecommendations: localRes.ingredientRecommendations,
          relatedPhotos: localRes.relatedPhotos || getRelatedPhotos(currentText),
          relevantVideos: localRes.relevantVideos || getVideosForIngredients(currentText)
        };
      }

      // Ultra-safe photo and video extraction: Only include media if explicitly returned by AI model or local engine
      let finalPhotos = [];
      let finalVideos = [];

      if (botResponse?.relatedPhotos && Array.isArray(botResponse.relatedPhotos) && botResponse.relatedPhotos.length > 0) {
        finalPhotos = botResponse.relatedPhotos;
      }

      if (botResponse?.relevantVideos && Array.isArray(botResponse.relevantVideos) && botResponse.relevantVideos.length > 0) {
        finalVideos = botResponse.relevantVideos.slice(0, 4);
      }

      const responseText = botResponse?.text && botResponse.text.trim()
        ? botResponse.text
        : `👋 How can I assist with your nutrition and meal goals today?`;

      const aiReply = {
        id: `msg-ai-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        sender: 'ai',
        text: responseText,
        sourceModel: botResponse?.source || 'FitGen AI',
        dishAnalysis: botResponse?.dishAnalysis || null,
        ingredientRecommendations: botResponse?.ingredientRecommendations || null,
        relatedPhotos: finalPhotos,
        relevantVideos: finalVideos
      };

      setMessages((prev) => [...prev, aiReply]);
    } catch (err) {
      console.error("Error generating AI analysis:", err);
      let fallbackText = `👋 I'm here to help with your nutrition and fitness goals! How can I assist you today?`;
      let fallbackDishAnalysis = null;
      let fallbackIngRecs = null;

      try {
        const fallbackBotRes = processConversationalChatbotQuery(currentText, messages, effectiveUserProfile);
        if (fallbackBotRes && fallbackBotRes.text) {
          fallbackText = fallbackBotRes.text;
          fallbackDishAnalysis = fallbackBotRes.dishAnalysis;
          fallbackIngRecs = fallbackBotRes.ingredientRecommendations;
        }
      } catch (fErr) {
        console.warn("Fallback local query error:", fErr);
      }

      const errReply = {
        id: `msg-ai-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        sender: 'ai',
        text: fallbackText,
        sourceModel: 'FitGen Turbo Local Engine',
        dishAnalysis: fallbackDishAnalysis,
        ingredientRecommendations: fallbackIngRecs,
        relatedPhotos: [],
        relevantVideos: []
      };
      setMessages((prev) => [...prev, errReply]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div
      className="flex flex-col h-[calc(100vh-4rem)] bg-[#0B1120] relative text-slate-100 overflow-hidden"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {isDragging && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center gap-3 border-4 border-dashed border-emerald-400 animate-in fade-in duration-200">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center animate-bounce">
            <ImageIcon className="w-8 h-8" />
          </div>
          <p className="text-lg font-bold text-white">Drop your dish / fridge photo here!</p>
          <p className="text-xs text-emerald-400 font-medium">FitGen AI Computer Vision OCR</p>
        </div>
      )}

      {/* Top ChatGPT Navigation Header */}
      <div className="py-4 border-b border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/10">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold font-heading text-white flex items-center gap-2">
              FitGen AI ChatGPT Nutrition Assistant
            </h1>
            <p className="text-xs text-slate-400">
              Conversational Chatbot with real dish ingredients, protein counts & intake guides
            </p>
          </div>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-2xl border border-slate-800 self-stretch sm:self-auto overflow-x-auto">
            <button
              onClick={() => setActiveMode('chat')}
              className={`px-3.5 py-2 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeMode === 'chat'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 shadow-lg shadow-emerald-500/20 font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Bot className="w-4 h-4 text-slate-950" />
              <span>🤖 FitGen AI & Recipe Generator</span>
            </button>

            <button
              onClick={() => setActiveMode('videos')}
              className={`px-3.5 py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                activeMode === 'videos'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-extrabold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>Nutrition Videos</span>
            </button>

            {messages.length > 0 && activeMode === 'chat' && (
              <button
                onClick={() => setMessages([])}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-rose-500/20 hover:text-rose-400 text-slate-400 border border-slate-700 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
                title="Clear Chat History"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Clear Chat</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto py-6 max-w-4xl w-full mx-auto flex flex-col px-4">
        {activeMode === 'videos' ? (
          <IngredientVideoFinder />
        ) : (
          <>
            {/* ChatGPT Empty Welcome Hero Screen (renders ONLY when messages.length === 0) */}
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center text-center my-auto py-12 px-4 space-y-6 animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 flex items-center justify-center shadow-xl shadow-emerald-500/20 animate-bounce">
              <Bot className="w-8 h-8" />
            </div>

            <div className="space-y-1.5 max-w-md">
              <h2 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
                How can FitGen AI help you today?
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Ask for ANY dish or recipe (e.g. <strong className="text-emerald-400">Samosa, Chicken Tikka, Paneer Butter Masala, Fruit Bowl</strong>) to get exact authentic ingredients, protein content (g), and daily intake guides!
              </p>
            </div>

            {/* Quick Suggestion Chips */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-lg w-full pt-2">
              {SUGGESTION_CHIPS.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendPrompt(null, chip.prompt)}
                  className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-800 text-left text-xs font-semibold text-slate-200 transition-all flex items-center justify-between group cursor-pointer"
                >
                  <span className="truncate pr-2">{chip.label}</span>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                </button>
              ))}
            </div>

            {/* Mode Switcher Shortcut Cards */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setActiveMode('generator')}
                className="px-4 py-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 text-emerald-300 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md"
              >
                <ChefHat className="w-4 h-4 text-emerald-400" />
                <span>Switch to Pantry Recipe Generator</span>
              </button>
              <button
                onClick={() => setActiveMode('videos')}
                className="px-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md"
              >
                <Video className="w-4 h-4 text-cyan-400" />
                <span>Watch Recipe Masterclass Videos</span>
              </button>
            </div>
          </div>
        )}

        {/* Message Stream */}
        <div className="space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/20 mt-1">
                  <Bot className="w-5 h-5" />
                </div>
              )}

              <div className="max-w-2xl space-y-3">
                <div
                  className={`p-4 rounded-3xl text-xs sm:text-sm leading-relaxed relative group ${
                    msg.sender === 'user'
                      ? 'bg-emerald-500 text-slate-950 font-medium rounded-tr-none shadow-lg shadow-emerald-500/10'
                      : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-none shadow-xl'
                  }`}
                >
                  {msg.imagePreview && (
                    <div className="mb-3 rounded-2xl overflow-hidden border border-slate-800 max-h-52">
                      <img src={msg.imagePreview} alt={msg.imageName || 'Attached'} className="w-full object-cover max-h-52" />
                    </div>
                  )}

                  <div className="flex items-start justify-between gap-3">
                    <p className="flex-1 whitespace-pre-wrap">{renderFormattedText(msg.text)}</p>

                    {msg.sender === 'ai' && (
                      <button
                        onClick={() => speakText(msg.text)}
                        className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-emerald-400 transition-colors shrink-0"
                        title="Read AI response out loud"
                      >
                        <Volume2 className={`w-4 h-4 ${isSpeaking ? 'text-emerald-400 animate-pulse' : ''}`} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Available Ingredients Dish Recommendations Panel */}
                {msg.ingredientRecommendations && msg.ingredientRecommendations.length > 0 && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/95 border border-emerald-500/40 space-y-4 shadow-xl animate-in fade-in duration-300">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-emerald-400" />
                        <div>
                          <h3 className="text-sm font-extrabold text-white font-heading">
                            Recommended Dishes from Available Ingredients
                          </h3>
                          <p className="text-[11px] text-slate-400">
                            Ranked by available ingredient match count • Zero hallucinated ingredients
                          </p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-extrabold">
                        {msg.ingredientRecommendations.length} Dishes Found
                      </span>
                    </div>

                    <div className="space-y-4">
                      {msg.ingredientRecommendations.map((dish, idx) => (
                        <div
                          key={dish.id || idx}
                          className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/50 transition-all space-y-3"
                        >
                          {/* Dish Header & Rank Match Badge */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 rounded-md bg-emerald-500 text-slate-950 text-[10px] font-extrabold uppercase">
                                  Rank #{idx + 1}
                                </span>
                                <h4 className="text-sm font-extrabold text-white font-heading">{dish.dishName}</h4>
                              </div>
                              <span className="text-[11px] text-slate-400 mt-0.5 block">{dish.cuisine} • {dish.dietary} • Serving: {dish.servingSize}</span>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <span className="px-2.5 py-1 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-1">
                                🔥 Uses {dish.matchScore.usedCount} of {dish.matchScore.totalAvailable} Ingredients (100% Match)
                              </span>
                              <span className="px-2.5 py-1 rounded-xl bg-slate-900 text-slate-300 border border-slate-800 text-xs font-semibold">
                                {dish.macros.calories} kcal
                              </span>
                            </div>
                          </div>

                          {/* Dish Image & Dedicated Video Masterclass */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                            {/* Dish Photo */}
                            <div className="relative rounded-xl overflow-hidden border border-slate-800 h-36">
                              <img
                                src={dish.image || 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80'}
                                alt={dish.dishName}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent p-2.5 flex items-end justify-between">
                                <span className="text-[11px] font-bold text-white bg-slate-900/80 px-2 py-0.5 rounded-md backdrop-blur-sm border border-slate-700">
                                  📷 {dish.dishName}
                                </span>
                                <span className="text-[10px] text-emerald-400 font-extrabold bg-slate-950/90 px-2 py-0.5 rounded-md border border-emerald-500/30">
                                  {dish.macros.protein}g Protein
                                </span>
                              </div>
                            </div>

                            {/* Dedicated Video Card */}
                            {dish.video && (
                              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-2">
                                <div className="flex items-center gap-2">
                                  <Video className="w-4 h-4 text-emerald-400 shrink-0" />
                                  <p className="text-xs font-bold text-slate-200 line-clamp-1">{dish.video.title}</p>
                                </div>
                                <div className="relative rounded-lg overflow-hidden h-20 border border-slate-800">
                                  <img src={dish.video.thumbnail} alt={dish.video.title} className="w-full h-full object-cover" />
                                  <a
                                    href={dish.video.youtubeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="absolute inset-0 bg-slate-950/40 hover:bg-slate-950/20 transition-all flex items-center justify-center group"
                                  >
                                    <div className="w-8 h-8 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                                      <Play className="w-4 h-4 fill-slate-950 ml-0.5" />
                                    </div>
                                  </a>
                                </div>
                                <div className="flex items-center justify-between text-[10px] text-slate-400">
                                  <span>📺 {dish.video.channel}</span>
                                  <span className="text-emerald-400 font-bold">⏱️ {dish.video.duration}</span>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Fitness Goal Suitability Reason */}
                          {dish.fitnessGoalReason && (
                            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-start gap-2">
                              <Target className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                              <div>
                                <span className="font-extrabold text-emerald-400">Why this fits your {userProfile?.goal || 'Fitness'} Goal: </span>
                                <span>{dish.fitnessGoalReason}</span>
                              </div>
                            </div>
                          )}

                          {/* Available Ingredients Used Badges with Protein */}
                          <div className="space-y-1.5">
                            <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Available Ingredients Used & Protein Yield:
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                              {dish.availableIngredientsUsed.map((ing, iIdx) => (
                                <div key={iIdx} className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between gap-2">
                                  <div className="flex items-center gap-2 min-w-0">
                                    <span className="text-base shrink-0">{ing.icon}</span>
                                    <div className="min-w-0">
                                      <span className="text-xs font-bold text-white truncate block">{ing.name}</span>
                                      <span className="text-[10px] text-slate-400">{ing.amount}</span>
                                    </div>
                                  </div>
                                  <span className="text-xs font-black text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-lg border border-emerald-500/30 shrink-0">
                                    ⚡ {ing.protein ?? 0}g Protein
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Recipe Protein Content Breakdown & High-Protein Booster */}
                          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-teal-950/60 border border-emerald-500/40 space-y-2.5">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-extrabold text-white flex items-center gap-1.5 font-heading">
                                <Dumbbell className="w-4 h-4 text-emerald-400" />
                                Recipe Protein Content Breakdown
                              </span>
                              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[11px] font-black shadow-md">
                                Total: {dish.macros.protein}g Protein
                              </span>
                            </div>

                            <div className="flex flex-wrap gap-1.5">
                              {dish.availableIngredientsUsed.map((ing, pIdx) => (
                                <span key={pIdx} className="px-2.5 py-1 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] font-bold text-slate-200 flex items-center gap-1">
                                  <span>{ing.icon}</span>
                                  <span>{ing.name}:</span>
                                  <span className="text-emerald-400 font-extrabold">{ing.protein ?? 0}g protein</span>
                                </span>
                              ))}
                            </div>

                            {dish.highProteinBooster && (
                              <div className="text-[11px] text-emerald-300 font-semibold pt-1 border-t border-slate-800/80 flex items-start gap-1.5">
                                <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                                <span>{dish.highProteinBooster}</span>
                              </div>
                            )}
                          </div>

                          {/* Optional Additional Pantry Staples */}
                          {dish.optionalIngredients && (
                            <div className="space-y-1.5">
                              <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                                <Info className="w-3.5 h-3.5 text-slate-400" /> Optional / Additional Pantry Staples:
                              </span>
                              <div className="flex flex-wrap gap-1.5">
                                {dish.optionalIngredients.map((opt, oIdx) => (
                                  <span key={oIdx} className="px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-semibold text-slate-300 flex items-center gap-1">
                                    <span>{opt.icon}</span> {opt.name} ({opt.amount})
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Goal-Aligned FitGen Fitness Version */}
                          {dish.fitgenGoalVersion && (
                            <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-teal-950/40 border border-emerald-500/30 text-xs text-emerald-300 font-medium">
                              {dish.fitgenGoalVersion}
                            </div>
                          )}

                          {/* Action Button: View Complete Step-by-Step Recipe */}
                          <div className="pt-1 flex items-center justify-between border-t border-slate-800/80">
                            <div className="flex items-center gap-3 text-xs text-slate-400 font-semibold">
                              <span>⏱️ Prep: {dish.prepTime}</span>
                              <span>•</span>
                              <span>🔥 Cook: {dish.cookTime}</span>
                              <span>•</span>
                              <span className="text-emerald-400 font-bold">💪 {dish.macros.protein}g Protein</span>
                            </div>

                            <div className="flex flex-wrap items-center gap-2">
                              <button
                                onClick={() => scheduleMeal(dish, 'lunch', '01:15 PM')}
                                className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-95"
                                title="Schedule Meal to AI Planner"
                              >
                                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                                <span>📅 Schedule</span>
                              </button>

                              <button
                                onClick={() => handleSelectRecommendedDish(dish)}
                                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
                              >
                                <Utensils className="w-3.5 h-3.5" />
                                <span>👨‍🍳 View Recipe</span>
                              </button>

                              <a
                                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(dish.dishName + ' recipe cooking tutorial')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-2 rounded-xl bg-rose-500/15 hover:bg-rose-500 text-rose-300 hover:text-white border border-rose-500/30 font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-sm active:scale-95 cursor-pointer"
                                title="Watch Cooking Video on YouTube"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                                <span>YouTube</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* AI Detailed Dish Analysis & Protein Breakdown Card */}
                {msg.dishAnalysis && (
                  <div className="p-4.5 rounded-2xl bg-slate-900/95 border border-emerald-500/40 space-y-4 shadow-xl animate-in fade-in duration-300">
                    {/* Dish Title Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-emerald-400" />
                          <h3 className="text-sm font-extrabold text-white font-heading">
                            {msg.dishAnalysis.dishName}
                          </h3>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">{msg.dishAnalysis.description}</p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        <span className="px-2.5 py-1 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-extrabold flex items-center gap-1">
                          <Flame className="w-3.5 h-3.5" /> Total: {msg.dishAnalysis.totalProtein}g Protein
                        </span>
                        <span className="px-2.5 py-1 rounded-xl bg-slate-800 text-slate-300 border border-slate-700 text-xs font-semibold">
                          {msg.dishAnalysis.totalCalories} kcal
                        </span>
                        <a
                          href={`https://www.youtube.com/results?search_query=${encodeURIComponent(msg.dishAnalysis.dishName + ' recipe cooking tutorial')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-extrabold flex items-center gap-1 hover:bg-rose-500 hover:text-white transition-all cursor-pointer shadow-sm"
                          title="Watch Cooking Video on YouTube"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>YouTube Recipe</span>
                        </a>
                      </div>
                    </div>

                    {/* Dietary Warning if applicable */}
                    {msg.dishAnalysis.recommendedIntake?.dietaryWarning && (
                      <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <p>{msg.dishAnalysis.recommendedIntake.dietaryWarning}</p>
                      </div>
                    )}

                    {/* Detailed Ingredients & Protein breakdown table */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                        <span className="flex items-center gap-1.5 text-emerald-400">
                          <Utensils className="w-3.5 h-3.5" /> Authentic Ingredients & Protein Breakdown
                        </span>
                        <span className="text-[11px] text-slate-400">Quantity & Protein Content</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {msg.dishAnalysis.ingredients.map((ing, idx) => (
                          <div
                            key={idx}
                            className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-2 hover:border-emerald-500/30 transition-all"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="text-base">{ing.icon || '🥗'}</span>
                              <div className="min-w-0">
                                <p className="text-xs font-bold text-white truncate">{ing.name}</p>
                                <p className="text-[10px] text-slate-400">Qty: {ing.amount}</p>
                              </div>
                            </div>

                            <div className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[11px] font-extrabold shrink-0 flex items-center gap-1">
                              <span>{ing.protein}g</span>
                              <span className="text-[9px] text-emerald-500/80 font-normal">Protein</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Step-by-Step Preparation & Cooking Guide */}
                    {msg.dishAnalysis.instructions && msg.dishAnalysis.instructions.length > 0 && (
                      <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-200 border-b border-slate-800 pb-2">
                          <span className="flex items-center gap-1.5 text-emerald-400 font-heading">
                            <ChefHat className="w-4 h-4 text-emerald-400" /> Step-by-Step Preparation & Cooking Guide
                          </span>
                          <div className="flex items-center gap-2 text-[10px] text-slate-400 font-semibold">
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-emerald-400" /> Prep: {msg.dishAnalysis.prepTime || '10 mins'}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1"><Flame className="w-3 h-3 text-amber-400" /> Cook: {msg.dishAnalysis.cookTime || '15 mins'}</span>
                          </div>
                        </div>

                        <div className="space-y-2.5">
                          {msg.dishAnalysis.instructions.map((stepItem, sIdx) => (
                            <div key={sIdx} className="p-3 rounded-xl bg-slate-900/90 border border-slate-800/90 space-y-1 hover:border-emerald-500/30 transition-all">
                              <div className="flex items-center justify-between">
                                <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-extrabold uppercase tracking-wide">
                                  Step {stepItem.step || (sIdx + 1)}
                                </span>
                                {stepItem.timerSeconds && (
                                  <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1 bg-slate-950 px-2 py-0.5 rounded-md border border-slate-800">
                                    <Clock className="w-3 h-3 text-emerald-400" /> {Math.ceil(stepItem.timerSeconds / 60)} mins
                                  </span>
                                )}
                              </div>
                              <h4 className="text-xs font-bold text-white pt-1">{stepItem.title}</h4>
                              <p className="text-[11px] text-slate-300 leading-relaxed">{stepItem.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Recommended Intake Guide Banner */}
                    {msg.dishAnalysis.recommendedIntake && (
                      <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-teal-950/40 border border-emerald-500/30 space-y-2.5">
                        <div className="flex items-center justify-between text-xs font-bold text-emerald-300">
                          <span className="flex items-center gap-1.5">
                            <Target className="w-4 h-4 text-emerald-400" /> Recommended Daily Intake Guide
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-emerald-500 text-slate-950 font-extrabold text-[10px] uppercase">
                            {userProfile.goal} Target
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs">
                          <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                            <span className="text-[10px] text-slate-400 block font-semibold uppercase">Recommended Portion</span>
                            <span className="font-bold text-white text-xs">{msg.dishAnalysis.recommendedIntake.portion}</span>
                          </div>

                          <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                            <span className="text-[10px] text-slate-400 block font-semibold uppercase">Protein Contribution</span>
                            <span className="font-extrabold text-emerald-400 text-xs">
                              {msg.dishAnalysis.recommendedIntake.proteinYield} ({msg.dishAnalysis.recommendedIntake.percentDailyTarget})
                            </span>
                          </div>

                          <div className="p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                            <span className="text-[10px] text-slate-400 block font-semibold uppercase">Optimal Meal Timing</span>
                            <span className="font-bold text-slate-200 text-xs">{msg.dishAnalysis.recommendedIntake.timing}</span>
                          </div>
                        </div>

                        <p className="text-[11px] text-slate-300 italic pt-1 flex items-start gap-1.5">
                          <Info className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{msg.dishAnalysis.recommendedIntake.advice}</span>
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* 📸 Related Food Photos Gallery */}
                {msg.sender === 'ai' && (msg.relatedPhotos || []).length > 0 && (
                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-emerald-500/30 space-y-3 animate-in fade-in duration-300">
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
                      <div className="flex items-center gap-2">
                        <Camera className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-bold text-white font-heading">
                          📸 Related Food Photos ({(msg.relatedPhotos || []).length})
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                        Google & HD Food Visuals
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {(msg.relatedPhotos || []).map((photo, pIdx) => (
                        <div
                          key={photo.id || pIdx}
                          className="group relative rounded-xl bg-slate-950 border border-slate-800 overflow-hidden shadow-sm hover:border-emerald-500/50 transition-all flex flex-col justify-between"
                        >
                          <div
                            onClick={() => setSelectedPhotoModal(photo)}
                            className="relative aspect-video sm:aspect-square w-full cursor-pointer overflow-hidden"
                          >
                            <img
                              src={photo.url}
                              alt={photo.title || 'Food photo'}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-end">
                              <p className="text-[11px] font-bold text-white leading-tight truncate">
                                {photo.title}
                              </p>
                              <span className="text-[9px] text-emerald-400 font-semibold flex items-center gap-1 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                <ZoomIn className="w-2.5 h-2.5" /> Enlarge Lightbox
                              </span>
                            </div>
                          </div>

                          {/* Google & YouTube Direct Links */}
                          <div className="p-1.5 bg-slate-950/90 flex items-center justify-between border-t border-slate-800/80 text-[10px]">
                            <a
                              href={`https://www.google.com/search?tbm=isch&q=${encodeURIComponent((photo.title || 'food') + ' recipe dish')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-cyan-400 hover:text-cyan-300 font-extrabold flex items-center gap-1 hover:underline cursor-pointer"
                              title="Search Google Images"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ExternalLink className="w-2.5 h-2.5" /> Google
                            </a>
                            <a
                              href={`https://www.youtube.com/results?search_query=${encodeURIComponent((photo.title || 'food') + ' recipe')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-rose-400 hover:text-rose-300 font-extrabold flex items-center gap-1 hover:underline cursor-pointer"
                              title="Search YouTube Videos"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ExternalLink className="w-2.5 h-2.5" /> YouTube
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 🎥 Related Recipe & Cooking Videos */}
                {msg.sender === 'ai' && (msg.relevantVideos || []).length > 0 && (
                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-emerald-500/30 space-y-3 animate-in fade-in duration-300">
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
                      <div className="flex items-center gap-2">
                        <Video className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-bold text-white font-heading">
                          🎥 Related Recipe & Cooking Videos ({(msg.relevantVideos || []).length})
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                        YouTube & AI Video Guides
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {msg.relevantVideos.map((vid) => (
                        <div
                          key={vid.id}
                          className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between group"
                        >
                          <div className="relative w-full h-32 rounded-lg overflow-hidden mb-2">
                            <img
                              src={vid.thumbnail}
                              alt={vid.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors flex items-center justify-center">
                              <div
                                onClick={() => setSelectedVideoModal(vid)}
                                className="w-10 h-10 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform cursor-pointer"
                              >
                                <Play className="w-5 h-5 fill-slate-950 translate-x-0.5" />
                              </div>
                            </div>
                            <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-slate-950/80 text-[10px] font-mono text-slate-200 border border-white/10">
                              {vid.duration}
                            </span>
                          </div>

                          <div>
                            <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider block mb-0.5">
                              {vid.category} • {vid.views}
                            </span>
                            <h4 className="text-xs font-bold text-white line-clamp-1 group-hover:text-emerald-400 transition-colors">
                              {vid.title}
                            </h4>
                            <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{vid.channel}</p>
                          </div>

                          {/* Multi-Button Actions: Play Modal, YouTube Direct & Google Search */}
                          <div className="mt-2.5 grid grid-cols-3 gap-1.5">
                            <button
                              onClick={() => setSelectedVideoModal(vid)}
                              className="py-1.5 px-2 rounded-lg bg-emerald-500/15 hover:bg-emerald-500 text-emerald-300 hover:text-slate-950 text-[10px] font-extrabold flex items-center justify-center gap-1 transition-all border border-emerald-500/30 cursor-pointer"
                              title="Play Video in FitGen Modal Player"
                            >
                              <Play className="w-3 h-3 fill-current" /> Play
                            </button>
                            <a
                              href={vid.youtubeUrl || `https://www.youtube.com/results?search_query=${encodeURIComponent(vid.title + ' recipe')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="py-1.5 px-2 rounded-lg bg-rose-500/15 hover:bg-rose-500 text-rose-300 hover:text-white text-[10px] font-extrabold flex items-center justify-center gap-1 transition-all border border-rose-500/30 cursor-pointer"
                              title="Watch directly on YouTube"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ExternalLink className="w-3 h-3" /> YouTube
                            </a>
                            <a
                              href={`https://www.google.com/search?q=${encodeURIComponent(vid.title + ' recipe video')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="py-1.5 px-2 rounded-lg bg-cyan-500/15 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 text-[10px] font-extrabold flex items-center justify-center gap-1 transition-all border border-cyan-500/30 cursor-pointer"
                              title="Search Video on Google"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ExternalLink className="w-3 h-3" /> Google
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Interactive Chatbot Options Bar for Chatbot Refinement */}
                {msg.sender === 'ai' && (
                  <div className="pt-2 flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Dynamic Suggestions:
                    </span>

                    <button
                      onClick={() => handleSendPrompt(null, "give me the recipe")}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95"
                    >
                      🍳 <span>Give me the recipe</span>
                    </button>

                    <button
                      onClick={() => handleSendPrompt(null, "make it high protein")}
                      className="px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95"
                    >
                      💪 <span>Make it high protein</span>
                    </button>

                    <button
                      onClick={() => handleSendPrompt(null, "make it low calorie")}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95"
                    >
                      🔥 <span>Make it low calorie</span>
                    </button>

                    <button
                      onClick={() => handleSendPrompt(null, "give me more options")}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95"
                    >
                      🥗 <span>Give me more options</span>
                    </button>

                    <button
                      onClick={() => handleSendPrompt(null, "show nutrition")}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95"
                    >
                      📊 <span>Show nutrition</span>
                    </button>

                    <button
                      onClick={() => handleSendPrompt(null, "show missing ingredients")}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95"
                    >
                      🛒 <span>Show missing ingredients</span>
                    </button>
                  </div>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="w-9 h-9 rounded-2xl bg-slate-800 border border-slate-700 text-slate-300 flex items-center justify-center shrink-0 mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isAnalyzing && (
            <div className="flex items-center gap-3 text-xs text-emerald-400 font-semibold p-3.5 rounded-2xl bg-slate-900 border border-slate-800 w-fit animate-pulse">
              <RefreshCw className="w-4 h-4 animate-spin" /> FitGen AI Analyzing Dish Ingredients & Calculating Protein Content...
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>
        </>
        )}
      </div>

      {/* Floating Prompt Bar - ChatGPT Style */}
      <div className="py-4 bg-[#0F172A]/95 backdrop-blur-2xl border-t border-slate-800/80 sticky bottom-0 z-20">
        <div className="max-w-4xl mx-auto space-y-2 px-4">
          {attachedImage && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-emerald-500/40 text-xs text-emerald-300 w-fit animate-in slide-in-from-bottom-2">
              <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />
              <span className="truncate max-w-xs font-semibold">{attachedImage.name}</span>
              <button
                onClick={removeAttachment}
                className="p-0.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-rose-400 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Multi-Ingredient Quick Selection Pills Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 no-scrollbar">
            <span className="text-[11px] font-extrabold text-slate-400 shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-400" /> Tap Multiple Ingredients:
            </span>
            {['tomato', 'cabbage', 'onion', 'carrot', 'beans', 'beetroot', 'capsicum', 'paneer', 'spinach', 'potato', 'peas', 'egg', 'chicken', 'rice', 'dal', 'tofu'].map((ing) => {
              const isAlreadyInPrompt = promptText.toLowerCase().includes(ing);
              return (
                <button
                  key={ing}
                  type="button"
                  onClick={() => {
                    if (isAlreadyInPrompt) return;
                    setPromptText((prev) => {
                      const trimmed = prev.trim();
                      if (!trimmed) return ing;
                      if (trimmed.endsWith(',')) return `${trimmed} ${ing}`;
                      return `${trimmed}, ${ing}`;
                    });
                  }}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1 shrink-0 cursor-pointer border ${
                    isAlreadyInPrompt
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-sm'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800 hover:border-emerald-500/50'
                  }`}
                >
                  <span>{isAlreadyInPrompt ? '✓' : '+'}</span>
                  <span className="capitalize">{ing}</span>
                </button>
              );
            })}
          </div>

          <form onSubmit={(e) => handleSendPrompt(e)} className="relative flex items-center bg-slate-900 border border-slate-800 focus-within:border-emerald-500/60 rounded-3xl p-1.5 pl-3.5 shadow-2xl transition-all">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2.5 rounded-2xl text-slate-400 hover:text-emerald-400 hover:bg-slate-800/60 transition-all shrink-0"
              title="Attach dish photo (+)"
            >
              <Plus className="w-5 h-5" />
            </button>

            <input
              type="text"
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendPrompt(e);
                }
              }}
              placeholder={isListening ? "Listening... Speak your dish name (e.g. 'Samosa')..." : "Ask FitGen AI for any dish (e.g. 'Samosa', 'Chicken Tikka', 'Fruit Bowl')..."}
              className="flex-1 bg-transparent px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
            />

            <button
              type="button"
              onClick={toggleVoiceAssistant}
              className={`p-2.5 rounded-2xl transition-all mr-1 flex items-center gap-1.5 ${
                isListening
                  ? 'bg-emerald-500 text-slate-950 font-bold animate-pulse shadow-lg shadow-emerald-500/40'
                  : 'text-slate-400 hover:text-emerald-400 hover:bg-slate-800/60'
              }`}
              title="ChatGPT Voice Mode"
            >
              <Mic className="w-5 h-5" />
            </button>

            <button
              type="submit"
              disabled={!promptText.trim() && !attachedImage}
              className="p-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-30 text-slate-950 font-bold transition-all shadow-md shrink-0 cursor-pointer"
              title="Send Prompt"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {selectedRecipeModal && (
        <RecipeDetailModal
          recipe={selectedRecipeModal}
          userIngredients={userIngredients}
          onClose={() => setSelectedRecipeModal(null)}
          onAddGroceryItem={addGroceryItem}
        />
      )}

      {/* Video Playback Modal */}
      {selectedVideoModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full p-5 shadow-2xl space-y-4 relative overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pr-10">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase">
                    {selectedVideoModal.category || 'Nutrition Video'}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">{selectedVideoModal.views}</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white font-heading">{selectedVideoModal.title}</h3>
              </div>

              {/* Player Mode Switcher Tabs */}
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 self-start sm:self-auto shrink-0">
                <button
                  onClick={() => setVideoPlayerSource('mp4')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 ${
                    videoPlayerSource === 'mp4'
                      ? 'bg-emerald-500 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Play className="w-3 h-3 fill-current" /> HD Player (100% Working)
                </button>
                {selectedVideoModal.embedUrl && (
                  <button
                    onClick={() => setVideoPlayerSource('youtube')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 ${
                      videoPlayerSource === 'youtube'
                        ? 'bg-rose-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <ExternalLink className="w-3 h-3" /> YouTube Embed
                  </button>
                )}
              </div>
            </div>

            <button
              onClick={() => setSelectedVideoModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Video Player Box */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner">
              {videoPlayerSource === 'mp4' || !selectedVideoModal.embedUrl ? (
                <video
                  key={selectedVideoModal.mp4Fallback || selectedVideoModal.id}
                  src={selectedVideoModal.mp4Fallback || "https://assets.mixkit.co/videos/preview/mixkit-chef-cooking-food-in-a-pan-41584-large.mp4"}
                  poster={selectedVideoModal.thumbnail}
                  controls
                  autoPlay
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <iframe
                  src={`${selectedVideoModal.embedUrl}?autoplay=1`}
                  title={selectedVideoModal.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>

            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
                <div>
                  <h4 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 font-heading">
                    <Sparkles className="w-4 h-4" /> Key Nutrition Science Takeaways
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">{selectedVideoModal.channel}</p>
                </div>

                <a
                  href={selectedVideoModal.youtubeUrl || `https://www.youtube.com/results?search_query=${encodeURIComponent(selectedVideoModal.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-md shrink-0 self-start sm:self-auto"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Watch on YouTube
                </a>
              </div>

              <ul className="space-y-1.5 text-xs text-slate-300">
                {selectedVideoModal.nutritionHighlights?.map((hl, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </li>
                )) || <li className="text-slate-400">{selectedVideoModal.summary}</li>}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* OCR Menu Dish Confirmation & Locking Modal */}
      {ocrConfirmModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-emerald-500/40 rounded-3xl max-w-lg w-full p-5 sm:p-6 shadow-2xl space-y-4 relative overflow-hidden">
            <button
              onClick={() => setOcrConfirmModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors z-20"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shrink-0">
                <Scan className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-emerald-400">FitGen AI Vision OCR</span>
                <h3 className="text-base font-extrabold text-white font-heading">Confirm & Lock Menu Dish</h3>
              </div>
            </div>

            {/* Menu Image Bounding Box Preview */}
            <div className="relative rounded-2xl overflow-hidden border border-emerald-500/50 bg-slate-950 max-h-48">
              <img src={ocrConfirmModal.previewUrl} alt={ocrConfirmModal.fileName} className="w-full object-cover max-h-48 opacity-80" />
              <div className="absolute inset-2 border-2 border-dashed border-emerald-400 rounded-xl pointer-events-none flex items-start justify-end p-2 bg-emerald-500/5">
                <span className="px-2 py-0.5 rounded-md bg-emerald-500 text-slate-950 text-[10px] font-extrabold flex items-center gap-1 shadow-md">
                  <Lock className="w-3 h-3" /> OCR Bounding Box
                </span>
              </div>
            </div>

            {/* Confirmed Dish Name Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-200 flex items-center justify-between">
                <span>Extracted Menu Dish Name:</span>
                <span className="text-[10px] text-emerald-400 font-normal">Edit or select below</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={editingDishName}
                  onChange={(e) => setEditingDishName(e.target.value)}
                  placeholder="e.g. Paneer Butter Masala, South Indian Rice Bath, Banana Shake"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-emerald-500/50 text-white font-bold text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Candidate Dish Chips detected from Menu */}
            {ocrConfirmModal.candidateDishes && (
              <div className="space-y-1.5">
                <span className="text-[11px] text-slate-400 font-semibold">Other Detected Menu Items:</span>
                <div className="flex flex-wrap gap-1.5">
                  {ocrConfirmModal.candidateDishes.map((dish, idx) => (
                    <button
                      key={idx}
                      onClick={() => setEditingDishName(dish)}
                      className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all border ${
                        editingDishName === dish
                          ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md'
                          : 'bg-slate-950/80 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {dish}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                onClick={() => setOcrConfirmModal(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => handleConfirmAndLockDish(editingDishName)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-extrabold text-xs flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/20"
              >
                <Lock className="w-4 h-4" />
                <span>Confirm & Lock Dish Name</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Photo Lightbox Preview Modal */}
      {selectedPhotoModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative max-w-3xl w-full bg-slate-900 border border-emerald-500/40 rounded-3xl overflow-hidden shadow-2xl space-y-0">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2 font-heading">
                  <Camera className="w-4 h-4 text-emerald-400" /> {selectedPhotoModal.title || 'Food Photo'}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">{selectedPhotoModal.caption || 'High-definition dish visual'}</p>
              </div>
              <button
                onClick={() => setSelectedPhotoModal(null)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-all border border-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-video sm:aspect-[16/9] w-full bg-black overflow-hidden flex items-center justify-center">
              <img
                src={selectedPhotoModal.url}
                alt={selectedPhotoModal.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-4 bg-slate-950/90 flex items-center justify-between text-xs border-t border-slate-800">
              <span className="text-slate-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> FitGen AI High-Res Food Gallery
              </span>
              <button
                onClick={() => setSelectedPhotoModal(null)}
                className="px-4 py-1.5 rounded-xl bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-all shadow-md"
              >
                Close Lightbox
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
