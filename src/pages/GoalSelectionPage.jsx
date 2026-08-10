import React, { useState, useRef } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { AI_AVATARS } from '../data/avatars';
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Flame,
  Dumbbell,
  Sparkles,
  Target,
  Globe,
  Utensils,
  Zap,
  Sliders,
  ShieldAlert,
  ChevronRight,
  HeartPulse,
  Activity,
  User,
  Camera,
  Upload
} from 'lucide-react';

const NATIONS_LIST = [
  { id: 'India 🇮🇳', name: 'India', flag: '🇮🇳', desc: 'North & South Indian curries, paneer, dal, tandoor & spices' },
  { id: 'USA 🇺🇸', name: 'United States', flag: '🇺🇸', desc: 'Classic grills, Tex-Mex bowls, lean steaks & American BBQ' },
  { id: 'Italy 🇮🇹', name: 'Italy & Mediterranean', flag: '🇮🇹', desc: 'Mediterranean olive oil diet, pastas, seafood & fresh herbs' },
  { id: 'Japan 🇯🇵', name: 'Japan & East Asia', flag: '🇯🇵', desc: 'Teriyaki bowls, ramen, sushi, edamame & high-protein stir-fries' },
  { id: 'Mexico 🇲🇽', name: 'Mexico & Latin America', flag: '🇲🇽', desc: 'Fajitas, taco bowls, guac, salsa & black bean power bowls' },
  { id: 'Middle East 🇱🇧', name: 'Middle East & Arabia', flag: '🇱🇧', desc: 'Shawarma grills, hummus, kebabs, falafel & Mediterranean salads' },
  { id: 'Thailand 🇹🇭', name: 'Thailand & SE Asia', flag: '🇹🇭', desc: 'Thai curry, Pad Thai, aromatic broths & chili lemongrass fuel' },
  { id: 'Global 🌍', name: 'Global Fusion', flag: '🌍', desc: 'Curated blend of international high-protein fitness recipes' }
];

const CUISINE_STYLES = [
  { id: 'High-Protein Gym & Bodybuilding', label: '🏋️ High-Protein Gym', desc: 'Macro-optimized lean protein for muscle gain & recovery' },
  { id: 'Traditional Home-Cooked', label: '🍛 Authentic Home-Cooked', desc: 'Rich regional spices & traditional home cooking methods' },
  { id: 'Low-Carb Keto', label: '🥑 Low-Carb Keto', desc: 'Healthy fats, minimal carbs for continuous fat burn' },
  { id: 'Spicy Street Food', label: '🌶️ Spicy Street Food', desc: 'Bold zesty spices, garlic, chilis & street delicacies' },
  { id: 'Organic Whole Foods', label: '🧘 Clean Whole Foods', desc: 'Minimally processed, gut-friendly organic ingredients' },
  { id: 'Quick 15-Min Prep', label: '⏱️ Quick 15-Min Prep', desc: 'Easy 15-minute recipes for busy schedules' }
];

const FITNESS_LEVELS = [
  { id: 'Beginner', label: '🔰 Beginner', desc: 'Starting fitness journey, light active routine' },
  { id: 'Advanced Lifter', label: '🏋️ Advanced Lifter', desc: 'Heavy strength training, hypertrophy & strict macros' },
  { id: 'Endurance Athlete', label: '🏃 Endurance Athlete', desc: 'High stamina, HIIT, marathon or Crossfit training' },
  { id: 'Wellness', label: '🧘 Active Wellness', desc: 'Balanced lifestyle, flexibility & overall maintenance' }
];

const SPICE_LEVELS = [
  { id: 'Mild', label: '🌿 Mild / Gentle', desc: 'Subtle herbs, zero heavy chili burn' },
  { id: 'Medium / Balanced', label: '🌶️ Medium / Balanced', desc: 'Perfect balance of spices and flavor' },
  { id: 'Hot & Spicy', label: '🌶️🌶️ Hot & Spicy', desc: 'Extra chili, street-style fiery heat' }
];

const DIETARY_CHOICES = [
  { id: 'Vegetarian', label: '🥗 Vegetarian', desc: 'Paneer, lentils, soya, dairy & veggies' },
  { id: 'Non-Vegetarian', label: '🍗 Non-Vegetarian', desc: 'Chicken, fish, eggs, mutton & meats' },
  { id: 'Eggetarian', label: '🥚 Eggetarian', desc: 'Eggs + vegetarian dairy & plant protein' },
  { id: 'Vegan', label: '🌿 Vegan', desc: '100% plant-based: Tofu, soya, legumes & seeds' }
];

const MEAL_FREQUENCIES = [
  { id: '3 Standard Meals', label: '🥣 3 Meals / Day', desc: 'Breakfast, Lunch & Dinner' },
  { id: '4-5 Small Meals', label: '🍱 4-5 Small Meals', desc: 'Frequent anabolic meal split for muscle growth' },
  { id: 'Intermittent Fasting (16:8)', label: '⏳ Intermittent Fasting (16:8)', desc: '16 hours fasting, 8 hours eating window' }
];

export default function GoalSelectionPage() {
  const navigate = useNavigate();
  const { isAuthenticated, setUserProfile, userProfile, addToast } = useApp();
  const fileInputRef = useRef(null);

  const [step, setStep] = useState(1); // Step 1: Goal | Step 2: Nation & Style | Step 3: Advanced | Step 4: Avatar Photo

  // Form State
  const [selectedGoal, setSelectedGoal] = useState(userProfile.goal || 'Muscle Gain');
  const [selectedNation, setSelectedNation] = useState(userProfile.nation || 'India 🇮🇳');
  const [selectedStyle, setSelectedStyle] = useState(userProfile.cuisineStyle || 'High-Protein Gym & Bodybuilding');
  const [selectedFitnessLevel, setSelectedFitnessLevel] = useState(userProfile.fitnessLevel || 'Advanced Lifter');
  const [selectedSpiceLevel, setSelectedSpiceLevel] = useState(userProfile.spiceLevel || 'Medium / Balanced');
  const [selectedDietary, setSelectedDietary] = useState(userProfile.dietary || 'Vegetarian');
  const [selectedMealFrequency, setSelectedMealFrequency] = useState(userProfile.mealFrequency || '4-5 Small Meals');
  const [selectedAvatar, setSelectedAvatar] = useState(userProfile.avatar || AI_AVATARS[0].url);
  const [avatarFilter, setAvatarFilter] = useState('All'); // 'All', 'Boy', 'Girl'

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Custom photo upload handler
  const handleCustomImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const customUrl = uploadEvent.target.result;
        setSelectedAvatar(customUrl);
        if (addToast) addToast('📷 Custom photo uploaded successfully!', 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  // Strict route protection
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleNextStep = () => {
    if (step < 4) {
      setStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleFinalizeSetup();
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFinalizeSetup = () => {
    setIsSubmitting(true);

    setTimeout(() => {
      setUserProfile((prev) => ({
        ...prev,
        goal: selectedGoal,
        nation: selectedNation,
        cuisineStyle: selectedStyle,
        fitnessLevel: selectedFitnessLevel,
        spiceLevel: selectedSpiceLevel,
        dietary: selectedDietary,
        mealFrequency: selectedMealFrequency,
        avatar: selectedAvatar,
        cuisine: selectedNation.includes('India') ? 'Indian' : selectedNation.includes('USA') ? 'Western' : 'All'
      }));

      setIsSubmitting(false);
      navigate('/dashboard');
    }, 800);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between p-4 md:p-8 overflow-hidden bg-[#0A0A0A] text-slate-100">
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleCustomImageUpload}
        className="hidden"
      />

      {/* Background Floating Glow Orbs */}
      <div className="particle-glow w-[36rem] h-[36rem] bg-[#39FF14]/15 top-[-15%] left-[-10%] animate-pulse" />
      <div className="particle-glow w-[36rem] h-[36rem] bg-[#00CFFF]/15 bottom-[-15%] right-[-10%] animate-pulse" style={{ animationDelay: '3s' }} />

      {/* Header Container */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center pt-4">
        
        {/* FitGen Emblem */}
        <div className="relative group transition-transform duration-300 hover:scale-105 mb-3">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#39FF14] via-[#00CFFF] to-[#FF5722] opacity-75 blur-md group-hover:opacity-100 transition duration-500 animate-pulse" />
          <img
            src="/assets/fitgen_logo.png"
            alt="FitGen Logo"
            className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-white/20 shadow-2xl bg-[#0A0A0A]"
          />
        </div>

        {/* Step Progress Bar */}
        <div className="w-full max-w-lg bg-slate-900/90 border border-white/10 p-2 rounded-2xl mb-6 flex items-center justify-between gap-1.5 shadow-xl">
          {[
            { num: 1, title: '1. Goal', icon: Target },
            { num: 2, title: '2. Nation', icon: Globe },
            { num: 3, title: '3. Settings', icon: Sliders },
            { num: 4, title: '4. Avatar Photo', icon: User }
          ].map((item) => {
            const IconComponent = item.icon;
            const isActive = step === item.num;
            const isCompleted = step > item.num;

            return (
              <div
                key={item.num}
                onClick={() => isCompleted && setStep(item.num)}
                className={`flex-1 py-2 px-2 rounded-xl flex items-center justify-center gap-1.5 transition-all text-xs font-bold ${
                  isActive
                    ? 'bg-[#39FF14] text-slate-950 shadow-md shadow-[#39FF14]/20'
                    : isCompleted
                    ? 'bg-slate-800 text-emerald-400 cursor-pointer hover:bg-slate-700'
                    : 'text-slate-500'
                }`}
              >
                <IconComponent className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{item.title}</span>
                <span className="sm:hidden">{item.num}</span>
              </div>
            );
          })}
        </div>

        {/* Dynamic Titles per step */}
        {step === 1 && (
          <>
            <h1 className="text-3xl md:text-5xl font-extrabold text-center font-heading text-white tracking-tight mb-2">
              What's Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#39FF14] to-[#00CFFF]">Fitness Goal?</span>
            </h1>
            <p className="text-xs md:text-sm text-slate-400 text-center max-w-xl mb-8">
              Step 1 of 4: Choose your primary fitness objective. FitGen AI will automatically calibrate your daily calories and protein target.
            </p>
          </>
        )}

        {step === 2 && (
          <>
            <h1 className="text-3xl md:text-5xl font-extrabold text-center font-heading text-white tracking-tight mb-2">
              Assign Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#39FF14] to-[#00CFFF]">Nation & Culinary Style</span>
            </h1>
            <p className="text-xs md:text-sm text-slate-400 text-center max-w-xl mb-8">
              Step 2 of 4: Tailor FitGen AI to your home country and preferred cooking style for hyper-accurate local recipes.
            </p>
          </>
        )}

        {step === 3 && (
          <>
            <h1 className="text-3xl md:text-5xl font-extrabold text-center font-heading text-white tracking-tight mb-2">
              Advanced <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#39FF14] to-[#00CFFF]">Fitness & Dietary Settings</span>
            </h1>
            <p className="text-xs md:text-sm text-slate-400 text-center max-w-xl mb-8">
              Step 3 of 4: Fine-tune training intensity, spice levels, meal frequency, and dietary lifestyle.
            </p>
          </>
        )}

        {step === 4 && (
          <>
            <h1 className="text-3xl md:text-5xl font-extrabold text-center font-heading text-white tracking-tight mb-2">
              Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#39FF14] to-[#00CFFF]">Profile Photo / AI Avatar</span>
            </h1>
            <p className="text-xs md:text-sm text-slate-400 text-center max-w-xl mb-8">
              Step 4 of 4: Assign your custom photo from your device OR choose from 5 futuristic AI Fitness Avatars!
            </p>
          </>
        )}

        {/* STEP 1 CONTENT: Fitness Goal */}
        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-5xl mb-8">
            {/* CARD 1: Gain Muscle */}
            <div
              onClick={() => setSelectedGoal('Muscle Gain')}
              className={`group relative glass-card rounded-[20px] overflow-hidden cursor-pointer transition-all duration-500 border p-5 flex flex-col justify-between ${
                selectedGoal === 'Muscle Gain'
                  ? 'scale-[1.02] neon-border-green bg-[#121212]/90 shadow-[0_0_30px_rgba(57,255,20,0.3)]'
                  : 'border-white/10 hover:border-white/20 hover:scale-[1.01]'
              }`}
            >
              {selectedGoal === 'Muscle Gain' && (
                <div className="absolute top-4 right-4 z-20 bg-[#39FF14] text-slate-950 p-1.5 rounded-full shadow-lg flex items-center justify-center animate-bounce">
                  <CheckCircle2 className="w-5 h-5 stroke-[3]" />
                </div>
              )}

              <div className="relative w-full h-40 rounded-xl overflow-hidden mb-4 bg-slate-900/80">
                <img
                  src="/assets/muscle_gain_card.png"
                  alt="Gain Muscle"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-[#0A0A0A]/80 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
                  <Dumbbell className="w-4 h-4 text-[#39FF14]" />
                  <span className="text-xs font-bold text-[#39FF14] uppercase tracking-wider">Hypertrophy</span>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">💪</span>
                  <h3 className="text-lg font-bold font-heading text-white">Gain Muscle</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-5">
                  Build lean muscle mass, increase strength, and follow a high-protein surplus diet.
                </p>
              </div>

              <button
                type="button"
                className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  selectedGoal === 'Muscle Gain'
                    ? 'bg-[#39FF14] text-slate-950 shadow-[0_0_15px_rgba(57,255,20,0.4)]'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                }`}
              >
                <span>{selectedGoal === 'Muscle Gain' ? 'Selected' : 'Select Gain Muscle'}</span>
                {selectedGoal === 'Muscle Gain' && <Sparkles className="w-4 h-4" />}
              </button>
            </div>

            {/* CARD 2: 6-Pack Abs (Boy & Girl Physiques) UNIQUE NEW GOAL */}
            <div
              onClick={() => setSelectedGoal('6-Pack Abs')}
              className={`group relative glass-card rounded-[20px] overflow-hidden cursor-pointer transition-all duration-500 border p-5 flex flex-col justify-between ${
                selectedGoal === '6-Pack Abs'
                  ? 'scale-[1.02] neon-border-orange bg-[#121212]/90 shadow-[0_0_30px_rgba(255,87,34,0.4)] border-[#FF5722]'
                  : 'border-white/10 hover:border-white/20 hover:scale-[1.01]'
              }`}
            >
              {selectedGoal === '6-Pack Abs' && (
                <div className="absolute top-4 right-4 z-20 bg-[#FF5722] text-white p-1.5 rounded-full shadow-lg flex items-center justify-center animate-bounce">
                  <CheckCircle2 className="w-5 h-5 stroke-[3]" />
                </div>
              )}

              <div className="relative w-full h-40 rounded-xl overflow-hidden mb-4 bg-slate-900/80">
                <img
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80"
                  alt="6-Pack Abs"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-[#0A0A0A]/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
                  <Zap className="w-4 h-4 text-[#FF5722]" />
                  <span className="text-[11px] font-extrabold text-[#FF5722] uppercase tracking-wider">Boy 👦 & Girl 👧 6-Packs</span>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">⚡</span>
                  <h3 className="text-lg font-bold font-heading text-white">6-Pack Abs Shred</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-5">
                  Achieve chiseled 6-pack abs, waist slimming, and lean core definition for both boys & girls.
                </p>
              </div>

              <button
                type="button"
                className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  selectedGoal === '6-Pack Abs'
                    ? 'bg-[#FF5722] text-white shadow-[0_0_15px_rgba(255,87,34,0.4)]'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                }`}
              >
                <span>{selectedGoal === '6-Pack Abs' ? 'Selected' : 'Select 6-Pack Abs'}</span>
                {selectedGoal === '6-Pack Abs' && <Sparkles className="w-4 h-4" />}
              </button>
            </div>

            {/* CARD 3: Lose Weight */}
            <div
              onClick={() => setSelectedGoal('Weight Loss')}
              className={`group relative glass-card rounded-[20px] overflow-hidden cursor-pointer transition-all duration-500 border p-5 flex flex-col justify-between ${
                selectedGoal === 'Weight Loss'
                  ? 'scale-[1.02] neon-border-blue bg-[#121212]/90 shadow-[0_0_30px_rgba(0,207,255,0.3)]'
                  : 'border-white/10 hover:border-white/20 hover:scale-[1.01]'
              }`}
            >
              {selectedGoal === 'Weight Loss' && (
                <div className="absolute top-4 right-4 z-20 bg-[#00CFFF] text-slate-950 p-1.5 rounded-full shadow-lg flex items-center justify-center animate-bounce">
                  <CheckCircle2 className="w-5 h-5 stroke-[3]" />
                </div>
              )}

              <div className="relative w-full h-40 rounded-xl overflow-hidden mb-4 bg-slate-900/80">
                <img
                  src="/assets/weight_loss_card.png"
                  alt="Lose Weight"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-[#0A0A0A]/80 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
                  <Flame className="w-4 h-4 text-[#00CFFF]" />
                  <span className="text-xs font-bold text-[#00CFFF] uppercase tracking-wider">Fat Loss & HIIT</span>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🔥</span>
                  <h3 className="text-lg font-bold font-heading text-white">Lose Weight</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-5">
                  Burn body fat, improve stamina, and follow a high-satiety calorie deficit plan.
                </p>
              </div>

              <button
                type="button"
                className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  selectedGoal === 'Weight Loss'
                    ? 'bg-[#00CFFF] text-slate-950 shadow-[0_0_15px_rgba(0,207,255,0.4)]'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                }`}
              >
                <span>{selectedGoal === 'Weight Loss' ? 'Selected' : 'Select Lose Weight'}</span>
                {selectedGoal === 'Weight Loss' && <Sparkles className="w-4 h-4" />}
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 CONTENT: Nation & Cooking Style */}
        {step === 2 && (
          <div className="w-full max-w-4xl space-y-8 mb-8">
            {/* Nation Selection Grid */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Globe className="w-5 h-5 text-[#39FF14]" />
                <h3 className="text-base font-bold text-white uppercase tracking-wider font-heading">
                  1. Choose Your Nation / Country of Origin
                </h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {NATIONS_LIST.map((nat) => (
                  <div
                    key={nat.id}
                    onClick={() => setSelectedNation(nat.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between relative group ${
                      selectedNation === nat.id
                        ? 'bg-[#39FF14]/15 border-[#39FF14] text-white shadow-lg shadow-[#39FF14]/10'
                        : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/80'
                    }`}
                  >
                    {selectedNation === nat.id && (
                      <CheckCircle2 className="w-4 h-4 text-[#39FF14] absolute top-3 right-3" />
                    )}
                    <div className="text-2xl mb-2">{nat.flag}</div>
                    <div>
                      <h4 className="font-bold text-sm text-white">{nat.name}</h4>
                      <p className="text-[11px] text-slate-400 leading-tight mt-1">{nat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Culinary / Cooking Style */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Utensils className="w-5 h-5 text-[#00CFFF]" />
                <h3 className="text-base font-bold text-white uppercase tracking-wider font-heading">
                  2. Choose Your Cooking & Meal Style
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {CUISINE_STYLES.map((style) => (
                  <div
                    key={style.id}
                    onClick={() => setSelectedStyle(style.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between relative ${
                      selectedStyle === style.id
                        ? 'bg-[#00CFFF]/15 border-[#00CFFF] text-white shadow-lg shadow-[#00CFFF]/10'
                        : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/80'
                    }`}
                  >
                    {selectedStyle === style.id && (
                      <CheckCircle2 className="w-4 h-4 text-[#00CFFF] absolute top-3 right-3" />
                    )}
                    <div>
                      <h4 className="font-bold text-sm text-white">{style.label}</h4>
                      <p className="text-[11px] text-slate-400 leading-tight mt-1">{style.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3 CONTENT: Advanced Preferences */}
        {step === 3 && (
          <div className="w-full max-w-4xl space-y-6 mb-8">
            
            {/* 1. Advanced Fitness Level */}
            <div>
              <label className="block text-xs font-bold text-[#39FF14] uppercase tracking-wider mb-2.5 flex items-center gap-2 font-heading">
                <Activity className="w-4 h-4" /> 1. Advanced Fitness & Training Level
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {FITNESS_LEVELS.map((lvl) => (
                  <div
                    key={lvl.id}
                    onClick={() => setSelectedFitnessLevel(lvl.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                      selectedFitnessLevel === lvl.id
                        ? 'bg-[#39FF14]/15 border-[#39FF14] text-white'
                        : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-bold text-xs text-white">{lvl.label}</div>
                    <div className="text-[11px] text-slate-400 mt-1">{lvl.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Preferred Spice Level */}
            <div>
              <label className="block text-xs font-bold text-[#00CFFF] uppercase tracking-wider mb-2.5 flex items-center gap-2 font-heading">
                <Flame className="w-4 h-4" /> 2. Preferred Spice Tolerance
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {SPICE_LEVELS.map((spice) => (
                  <div
                    key={spice.id}
                    onClick={() => setSelectedSpiceLevel(spice.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                      selectedSpiceLevel === spice.id
                        ? 'bg-[#00CFFF]/15 border-[#00CFFF] text-white'
                        : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-bold text-xs text-white">{spice.label}</div>
                    <div className="text-[11px] text-slate-400 mt-1">{spice.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Dietary Choice */}
            <div>
              <label className="block text-xs font-bold text-[#39FF14] uppercase tracking-wider mb-2.5 flex items-center gap-2 font-heading">
                <Utensils className="w-4 h-4" /> 3. Dietary Lifestyle
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {DIETARY_CHOICES.map((diet) => (
                  <div
                    key={diet.id}
                    onClick={() => setSelectedDietary(diet.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                      selectedDietary === diet.id
                        ? 'bg-[#39FF14]/15 border-[#39FF14] text-white'
                        : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-bold text-xs text-white">{diet.label}</div>
                    <div className="text-[11px] text-slate-400 mt-1">{diet.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Meal Frequency Split */}
            <div>
              <label className="block text-xs font-bold text-[#00CFFF] uppercase tracking-wider mb-2.5 flex items-center gap-2 font-heading">
                <Zap className="w-4 h-4" /> 4. Preferred Meal Frequency & Schedule
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {MEAL_FREQUENCIES.map((freq) => (
                  <div
                    key={freq.id}
                    onClick={() => setSelectedMealFrequency(freq.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                      selectedMealFrequency === freq.id
                        ? 'bg-[#00CFFF]/15 border-[#00CFFF] text-white'
                        : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-bold text-xs text-white">{freq.label}</div>
                    <div className="text-[11px] text-slate-400 mt-1">{freq.desc}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* STEP 4 CONTENT: AI Avatars & Custom Photo Selector */}
        {step === 4 && (
          <div className="w-full max-w-4xl space-y-8 mb-8">
            
            {/* Active Selected Avatar Hero Preview */}
            <div className="flex flex-col items-center justify-center p-6 rounded-3xl bg-slate-900/90 border border-white/10 shadow-2xl relative">
              <div className="relative group mb-3">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#39FF14] via-[#00CFFF] to-[#FF5722] opacity-75 blur-md group-hover:opacity-100 transition duration-500 animate-pulse" />
                <img
                  src={selectedAvatar}
                  alt="Selected Avatar"
                  className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-slate-950 shadow-2xl"
                />
                <div className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-[#39FF14] text-slate-950 flex items-center justify-center shadow-lg border-2 border-slate-950">
                  <CheckCircle2 className="w-5 h-5 stroke-[3]" />
                </div>
              </div>
              <span className="text-xs font-bold text-[#39FF14] uppercase tracking-wider">Active Profile Picture</span>
              <p className="text-xs text-slate-400 mt-1">This photo will represent you across FitGen AI</p>
            </div>

            {/* Custom Photo Upload Card */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Camera className="w-5 h-5 text-[#39FF14]" />
                <h3 className="text-base font-bold text-white uppercase tracking-wider font-heading">
                  Option 1: Upload Your Custom Profile Photo
                </h3>
              </div>

              <div
                onClick={() => fileInputRef.current?.click()}
                className="p-6 rounded-2xl border-2 border-dashed border-slate-700 hover:border-[#39FF14] bg-slate-900/50 hover:bg-slate-900 transition-all cursor-pointer flex flex-col items-center justify-center text-center space-y-2 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#39FF14]/10 text-[#39FF14] border border-[#39FF14]/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Click to upload custom picture from device</p>
                  <p className="text-xs text-slate-400 mt-0.5">Supports JPG, PNG, WEBP files</p>
                </div>
              </div>
            </div>

            {/* 12 AI Avatars Catalog (Boy & Girl Physiques) */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#00CFFF]" />
                  <h3 className="text-base font-bold text-white uppercase tracking-wider font-heading">
                    Option 2: Select From Boy & Girl 6-Pack AI Avatars
                  </h3>
                </div>
                
                {/* Boy / Girl Filter Tabs */}
                <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
                  {['All', 'Boy', 'Girl'].map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setAvatarFilter(tab)}
                      className={`px-3 py-1 rounded-lg text-xs font-extrabold transition-all ${
                        avatarFilter === tab
                          ? 'bg-[#00CFFF] text-slate-950 shadow-md'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {tab === 'All' ? '⚡ All (12)' : tab === 'Boy' ? '👦 Boy Avatars' : '👧 Girl Avatars'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {AI_AVATARS.filter(a => avatarFilter === 'All' || a.gender === avatarFilter).map((avatar) => {
                  const isSelected = selectedAvatar === avatar.url;

                  return (
                    <div
                      key={avatar.id}
                      onClick={() => setSelectedAvatar(avatar.url)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col items-center text-center relative group ${
                        isSelected
                          ? 'bg-[#00CFFF]/15 border-[#00CFFF] text-white scale-[1.03] shadow-xl shadow-[#00CFFF]/15'
                          : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/80'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-2 right-2 bg-[#00CFFF] text-slate-950 p-1 rounded-full z-10">
                          <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}

                      <img
                        src={avatar.url}
                        alt={avatar.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-white/20 mb-2 group-hover:scale-105 transition-transform"
                      />

                      <span className="text-[9px] font-extrabold text-[#00CFFF] bg-[#00CFFF]/10 border border-[#00CFFF]/30 px-1.5 py-0.5 rounded-md mb-1 truncate max-w-full">
                        {avatar.badge}
                      </span>
                      <h4 className="font-bold text-[11px] text-white leading-tight line-clamp-1">{avatar.name}</h4>
                      <p className="text-[9px] text-slate-400 mt-0.5 line-clamp-1">{avatar.category}</p>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* Navigation Control Buttons */}
        <div className="flex items-center gap-4 w-full max-w-md pb-6">
          {step > 1 && (
            <button
              onClick={handlePrevStep}
              className="py-4 px-6 rounded-[16px] bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm flex items-center gap-2 transition-all cursor-pointer border border-slate-700"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          )}

          <button
            onClick={handleNextStep}
            disabled={isSubmitting}
            className="flex-1 py-4 px-8 neon-btn-primary text-slate-950 font-extrabold rounded-[16px] shadow-xl flex items-center justify-center gap-2 text-base tracking-wide transition-all duration-300 cursor-pointer"
          >
            {isSubmitting ? (
              <div className="w-6 h-6 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>{step === 4 ? 'Save Profile & Launch FitGen AI' : 'Continue'}</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
