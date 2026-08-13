import React, { useState, useEffect } from 'react';
import { X, Clock, Flame, Dumbbell, Play, Pause, RotateCcw, Plus, Check, AlertTriangle, Sparkles, CheckCircle, Video, Image as ImageIcon, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function RecipeDetailModal({ 
  recipe, 
  userIngredients = [], 
  onClose, 
  onAddGroceryItem
}) {
  if (!recipe) return null;

  const [mediaTab, setMediaTab] = useState('photo'); // 'photo' | 'video'

  // Safe fallback objects
  const safeInstructions = recipe.instructions && recipe.instructions.length > 0
    ? recipe.instructions
    : [
        { step: 1, title: 'Prepare Ingredients', description: 'Clean, chop, and assemble all fresh ingredients.', timerSeconds: 180 },
        { step: 2, title: 'Cook & Simmer', description: 'Sauté seasonings and cook until tender and fragrant.', timerSeconds: 300 },
        { step: 3, title: 'Plate & Serve', description: 'Garnish with herbs and serve hot.', timerSeconds: 60 }
      ];

  const safeMacros = {
    calories: 450,
    protein: 35,
    carbs: 30,
    fat: 15,
    fiber: 6,
    ...(recipe.macros || {})
  };

  const safeMicros = {
    iron: '25% DV',
    calcium: '40% DV',
    vitC: '30% DV',
    ...(recipe.micros || {})
  };

  const safeKeyIngs = recipe.keyIngredients || [];
  const safeIngredients = recipe.ingredients || [];
  const userIngs = userIngredients || [];

  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(safeInstructions[0]?.timerSeconds || 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Check matched vs missing ingredients
  const matchedIngredients = safeKeyIngs.filter(ing => 
    userIngs.some(userIng => userIng.toLowerCase().includes(ing) || ing.includes(userIng.toLowerCase()))
  );
  
  const missingIngredients = safeKeyIngs.filter(ing => 
    !userIngs.some(userIng => userIng.toLowerCase().includes(ing) || ing.includes(userIng.toLowerCase()))
  );

  // Step Timer Effect
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  // Update timer when active step changes
  const handleSelectStep = (index) => {
    const safeIdx = Math.min(index, safeInstructions.length - 1);
    setActiveStepIndex(safeIdx);
    setIsTimerRunning(false);
    setTimerSeconds(safeInstructions[safeIdx]?.timerSeconds || 60);
  };

  // Format Timer MM:SS
  const formatTime = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Add all missing ingredients to grocery list
  const handleAddAllMissingToGrocery = () => {
    missingIngredients.forEach(item => {
      onAddGroceryItem({
        id: `groc-${item}-${Date.now()}`,
        name: item,
        recipeName: recipe.name,
        amount: '1 pack / standard qty'
      });
    });
    confetti({ particleCount: 30, spread: 40 });
  };

  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(recipe.youtubeQuery || recipe.name + ' recipe cooking tutorial')}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header Hero Media Banner (Image or Video) */}
        <div className="relative h-60 sm:h-64 w-full bg-slate-950">
          
          {mediaTab === 'photo' ? (
            <img
              src={recipe.image || 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80'}
              alt={recipe.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-rose-950/40 p-6 flex flex-col items-center justify-center text-center space-y-3 relative">
              <div className="w-14 h-14 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/40 flex items-center justify-center animate-pulse">
                <Video className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-heading">
                  Cooking Tutorial: {recipe.name}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Watch authentic video preparation & step-by-step cooking guide
                </p>
              </div>

              <a
                href={youtubeSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-rose-600/30 transition-transform active:scale-95"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Watch {recipe.name} Video on YouTube</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent pointer-events-none"></div>

          {/* Close Icon */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-xl bg-slate-950/70 text-slate-300 hover:text-white border border-slate-700/80 backdrop-blur-md transition-all hover:scale-105 z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Media Switcher Tab Buttons */}
          <div className="absolute top-4 left-4 flex items-center gap-1.5 p-1 rounded-xl bg-slate-950/80 border border-slate-800 backdrop-blur-md z-10">
            <button
              onClick={() => setMediaTab('photo')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                mediaTab === 'photo'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" /> Photo
            </button>
            <button
              onClick={() => setMediaTab('video')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                mediaTab === 'video'
                  ? 'bg-rose-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Video className="w-3.5 h-3.5" /> Video Guide
            </button>
          </div>

          <div className="absolute bottom-4 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  recipe.cuisine === 'Indian' ? 'badge-cuisine-indian' : 'badge-cuisine-western'
                }`}>
                  {recipe.cuisine === 'Indian' ? '🇮🇳 Indian Cuisine' : '🥗 Western Cuisine'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold badge-goal">
                  {recipe.fitnessGoals && recipe.fitnessGoals[0] ? recipe.fitnessGoals[0] : 'Fitness Goal'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                  {recipe.dietary || 'Vegetarian'}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                {recipe.name}
              </h1>
            </div>

            {/* Prep, Cook Badges & External YouTube / Google Links */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-3 text-xs text-slate-300 bg-slate-950/80 px-4 py-2 rounded-xl border border-slate-800 backdrop-blur-md">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>Prep: <strong>{recipe.prepTime || '15 mins'}</strong></span>
                </div>
                <div className="w-px h-4 bg-slate-700"></div>
                <div className="flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span>Cook: <strong>{recipe.cookTime || '20 mins'}</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={youtubeSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-rose-600/30 transition-transform active:scale-95 cursor-pointer"
                  title="Watch Cooking Video on YouTube"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>YouTube</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <a
                  href={`https://www.google.com/search?q=${encodeURIComponent(recipe.name + ' authentic recipe step by step')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-600/30 transition-transform active:scale-95 cursor-pointer"
                  title="Search Recipe on Google"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Google</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Main Body Scrollable */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">

          {/* MACROS & MICROS GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 p-4 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="text-center p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <div className="text-[11px] font-bold text-amber-400 uppercase">Calories</div>
              <div className="text-lg font-extrabold text-white">{safeMacros.calories}</div>
              <div className="text-[10px] text-slate-400">kcal</div>
            </div>
            <div className="text-center p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <div className="text-[11px] font-bold text-emerald-400 uppercase">Protein</div>
              <div className="text-lg font-extrabold text-white">{safeMacros.protein}g</div>
              <div className="text-[10px] text-slate-400">Muscle Build</div>
            </div>
            <div className="text-center p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <div className="text-[11px] font-bold text-blue-400 uppercase">Carbs</div>
              <div className="text-lg font-extrabold text-white">{safeMacros.carbs}g</div>
              <div className="text-[10px] text-slate-400">Energy</div>
            </div>
            <div className="text-center p-2 rounded-lg bg-rose-500/10 border border-rose-500/20">
              <div className="text-[11px] font-bold text-rose-400 uppercase">Healthy Fat</div>
              <div className="text-lg font-extrabold text-white">{safeMacros.fat}g</div>
              <div className="text-[10px] text-slate-400">Hormone Health</div>
            </div>
            <div className="text-center p-2 rounded-lg bg-teal-500/10 border border-teal-500/20 col-span-2 sm:col-span-1">
              <div className="text-[11px] font-bold text-teal-400 uppercase">Fiber</div>
              <div className="text-lg font-extrabold text-white">{safeMacros.fiber}g</div>
              <div className="text-[10px] text-slate-400">Digestion</div>
            </div>
          </div>

          {/* INGREDIENTS LIST & MISSING ITEMS */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white font-heading flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" /> Required Ingredients ({safeIngredients.length})
              </h3>

              {missingIngredients.length > 0 && (
                <button
                  onClick={handleAddAllMissingToGrocery}
                  className="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <Plus className="w-3.5 h-3.5" /> Add {missingIngredients.length} Missing to Grocery List
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {safeIngredients.map((ing, idx) => {
                const ingName = typeof ing === 'string' ? ing : ing.name;
                const ingAmount = typeof ing === 'string' ? '1 unit' : ing.amount;
                const ingIcon = typeof ing === 'string' ? '🥗' : (ing.icon || '🥗');

                const isMatched = userIngs.some(u => 
                  u.toLowerCase().includes(ingName.toLowerCase()) || ingName.toLowerCase().includes(u.toLowerCase())
                );
                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                      isMatched
                        ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
                        : 'bg-slate-950/40 border-rose-500/30 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-lg shrink-0">{ingIcon}</span>
                      <div className="min-w-0">
                        <div className="font-semibold text-xs text-white truncate">{ingName}</div>
                        <div className="text-[11px] text-slate-400">{ingAmount}</div>
                      </div>
                    </div>

                    {isMatched ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 shrink-0">
                        <Check className="w-3 h-3" /> In Pantry
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center gap-1 shrink-0">
                        <AlertTriangle className="w-3 h-3" /> Missing
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* STEP-BY-STEP COOKING PROCESS WITH TIMER */}
          <div className="space-y-4 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white font-heading">
                  Step-by-Step Cooking Process
                </h3>
                <p className="text-xs text-slate-400">Follow the accurate cooking instructions with interactive step timers</p>
              </div>
            </div>

            {/* Step Selection Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {safeInstructions.map((inst, index) => (
                <button
                  key={inst.step || index}
                  onClick={() => handleSelectStep(index)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 ${
                    activeStepIndex === index
                      ? 'bg-emerald-500 text-slate-950 shadow-md'
                      : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <span>Step {inst.step || (index + 1)}</span>
                  {activeStepIndex === index && <CheckCircle className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>

            {/* Active Step Box */}
            {safeInstructions[activeStepIndex] && (
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-emerald-500/30 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400">
                      Step {safeInstructions[activeStepIndex].step || (activeStepIndex + 1)} of {safeInstructions.length}
                    </span>
                    <h4 className="text-lg font-bold text-white mt-1">
                      {safeInstructions[activeStepIndex].title}
                    </h4>
                  </div>

                  {/* Step Timer Display & Controls */}
                  <div className="flex items-center gap-2 bg-slate-900 p-2 rounded-xl border border-slate-800">
                    <div className="text-base font-mono font-bold text-amber-400 px-2">
                      {formatTime(timerSeconds)}
                    </div>
                    <button
                      onClick={() => setIsTimerRunning(!isTimerRunning)}
                      className="p-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors"
                    >
                      {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => {
                        setIsTimerRunning(false);
                        setTimerSeconds(safeInstructions[activeStepIndex]?.timerSeconds || 60);
                      }}
                      className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
                  {safeInstructions[activeStepIndex].description}
                </p>

                <div className="flex items-center justify-between pt-2">
                  <button
                    disabled={activeStepIndex === 0}
                    onClick={() => handleSelectStep(activeStepIndex - 1)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800"
                  >
                    ← Previous Step
                  </button>
                  
                  {activeStepIndex < safeInstructions.length - 1 ? (
                    <button
                      onClick={() => handleSelectStep(activeStepIndex + 1)}
                      className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all shadow-md shadow-emerald-500/20"
                    >
                      Next Step →
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        confetti({ particleCount: 100, spread: 80 });
                        onClose();
                      }}
                      className="px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 shadow-lg shadow-emerald-500/25 hover:scale-105 transition-all"
                    >
                      🎉 Complete Recipe!
                    </button>
                  )}
                </div>

              </div>
            )}

          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Micro Nutrients: Iron {safeMicros.iron} • Calcium {safeMicros.calcium} • Vit C {safeMicros.vitC}</span>
          </div>
          <button onClick={onClose} className="px-4 py-1.5 rounded-lg bg-slate-800 text-white hover:bg-slate-700">
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
