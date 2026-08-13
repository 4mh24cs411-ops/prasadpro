/**
 * FitGen AI - Dual Model Service (Google Gemini 1.5/2.0 Flash + FitGen Local Engine Fallback)
 * Connects to Google Generative AI API for multimodal vision and deep conversational intelligence.
 */

import { processConversationalChatbotQuery } from '../utils/nutritionAiEngine';
import { analyzeImageFile } from './imageRecognition';

const GEMINI_MODEL = 'gemini-1.5-flash';

/**
 * Get stored or environment Gemini API Key
 */
export function getGeminiApiKey() {
  if (typeof window !== 'undefined') {
    const customKey = localStorage.getItem('fitgen_gemini_api_key');
    if (customKey && customKey.trim()) return customKey.trim();
  }
  return import.meta.env.VITE_GEMINI_API_KEY || '';
}

/**
 * Store user custom Gemini API Key
 */
export function setGeminiApiKey(key) {
  if (typeof window !== 'undefined') {
    if (key && key.trim()) {
      localStorage.setItem('fitgen_gemini_api_key', key.trim());
    } else {
      localStorage.removeItem('fitgen_gemini_api_key');
    }
  }
}

/**
 * Convert File object to Base64 string for Gemini Vision API
 */
async function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.split(',')[1];
      resolve(base64String);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Master Hybrid Query Processor: Calls Gemini API if Key is Available, else uses FitGen Local AI Engine
 */
export async function queryDualAiModel({ userPrompt, attachedFile, conversationHistory = [], userProfile = {} }) {
  const apiKey = getGeminiApiKey();

  // If no Gemini API key configured, use local engine
  if (!apiKey) {
    let detectedIngs = [];
    if (attachedFile) {
      const imgRes = await analyzeImageFile(attachedFile);
      detectedIngs = imgRes.detectedIngredients || [];
    }

    const querySubject = userPrompt || (detectedIngs.length > 0 ? detectedIngs.join(', ') : 'Paneer Tikka');
    const localRes = processConversationalChatbotQuery(querySubject, conversationHistory, userProfile);

    return {
      source: 'FitGen Turbo Local Engine',
      isRealGemini: false,
      text: localRes.text,
      dishAnalysis: localRes.dishAnalysis,
      ingredientRecommendations: localRes.ingredientRecommendations,
      relevantVideos: localRes.relevantVideos || []
    };
  }

  // Call Real Google Gemini API with 5s AbortController timeout
  try {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

    const systemInstruction = `You are FitGen AI, an expert nutrition chatbot & computer vision assistant.
User Profile context:
- Name: ${userProfile?.name || 'User'}
- Goal: ${userProfile?.goal || 'Muscle Gain'} (Daily Protein Target: ${userProfile?.dailyProteinGoal || 130}g)
- Dietary Preference: ${userProfile?.dietary || 'Vegetarian'} (CRITICAL: Strictly enforce 100% vegetarian/vegan recipes if dietary is Vegetarian/Vegan!)
- Region / Country: ${userProfile?.nation || 'India 🇮🇳'}

Provide a warm, detailed, accurate response. If ingredients or dishes are asked, format ingredients clearly with protein counts.`;

    const contentsParts = [];

    // Attach Image if present
    if (attachedFile) {
      const mimeType = attachedFile.type || 'image/jpeg';
      const base64Data = await fileToBase64(attachedFile);
      contentsParts.push({
        inline_data: {
          mime_type: mimeType,
          data: base64Data
        }
      });
      contentsParts.push({
        text: `Analyze this image and identify all food ingredients or dishes present. User prompt: "${userPrompt || 'Suggest recipes with these scanned ingredients'}"`
      });
    } else {
      contentsParts.push({
        text: `${systemInstruction}\n\nUser Question: ${userPrompt}`
      });
    }

    // Set 5 second timeout using AbortController to prevent hanging UI
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    let response;
    try {
      response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: contentsParts }]
        }),
        signal: controller.signal
      });
    } finally {
      clearTimeout(timeoutId);
    }

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error?.message || `HTTP ${response.status}`);
    }

    const data = await response.json();
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    // Also get structured recipe cards from local engine to attach if ingredients are mentioned
    const localFallback = processConversationalChatbotQuery(userPrompt || 'paneer, tomato, onion', conversationHistory, userProfile);

    const finalResponseText = generatedText.trim()
      ? `✨ **Google Gemini AI Model Response**:\n\n${generatedText}`
      : localFallback.text;

    return {
      source: `Google Gemini 1.5 Flash API`,
      isRealGemini: true,
      text: finalResponseText,
      dishAnalysis: localFallback.dishAnalysis,
      ingredientRecommendations: localFallback.ingredientRecommendations,
      relevantVideos: localFallback.relevantVideos || []
    };
  } catch (err) {
    console.warn("⚠️ Gemini API Call Error, falling back to local model:", err.message);
    const localRes = processConversationalChatbotQuery(userPrompt || 'paneer', conversationHistory, userProfile);
    const isTimeout = err.name === 'AbortError' || err.message?.includes('aborted');
    const notice = isTimeout
      ? `⚡ *(Gemini API timed out — using FitGen Turbo Local Engine)*\n\n`
      : `⚡ *(Note: Using FitGen Turbo Local Engine)*\n\n`;

    return {
      source: 'FitGen Turbo Local Engine (Fallback)',
      isRealGemini: false,
      text: `${notice}${localRes.text}`,
      dishAnalysis: localRes.dishAnalysis,
      ingredientRecommendations: localRes.ingredientRecommendations,
      relevantVideos: localRes.relevantVideos || []
    };
  }
}
