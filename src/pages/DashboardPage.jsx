import React, { useState, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Flame,
  Dumbbell,
  Droplets,
  Award,
  Sparkles,
  TrendingUp,
  Plus,
  ArrowUpRight,
  Clock,
  CheckCircle,
  Calendar,
  Utensils,
  ChevronRight,
  Heart,
  Send,
  ChefHat,
  Camera,
  ImageIcon,
  ScanLine
} from 'lucide-react';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { userProfile, dailyLog, addWater, mealPlan, logMealToTracker } = useApp();

  const [kitchenInput, setKitchenInput] = useState('');
  const cameraInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  const handlePhotoSelected = (e) => {
    const files = Array.from(e.target.files).filter(f => f.type.startsWith('image/'));
    if (files.length > 0) {
      navigate('/ingredient-scanner', { state: { autoScanFiles: files } });
    }
  };

  // Time-based greeting helper
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const handleGenerateRecipeSubmit = (e) => {
    e.preventDefault();
    if (kitchenInput.trim()) {
      navigate(`/ingredient-scanner?search=${encodeURIComponent(kitchenInput.trim())}`);
    } else {
      navigate('/ingredient-scanner');
    }
  };

  const caloriePercentage = Math.min(100, Math.round((dailyLog.calories / userProfile.dailyCalorieBudget) * 100));
  const proteinPercentage = Math.min(100, Math.round((dailyLog.protein / userProfile.dailyProteinGoal) * 100));
  const carbsPercentage = Math.min(100, Math.round((dailyLog.carbs / userProfile.dailyCarbsGoal) * 100));
  const fatPercentage = Math.min(100, Math.round((dailyLog.fat / userProfile.dailyFatGoal) * 100));
  const waterPercentage = Math.min(100, Math.round((dailyLog.water / userProfile.dailyWaterGoal) * 100));

  const weeklyData = [
    { day: 'Mon', calories: 2100, protein: 125, goal: userProfile.dailyCalorieBudget },
    { day: 'Tue', calories: 2180, protein: 130, goal: userProfile.dailyCalorieBudget },
    { day: 'Wed', calories: 1950, protein: 110, goal: userProfile.dailyCalorieBudget },
    { day: 'Thu', calories: 2250, protein: 135, goal: userProfile.dailyCalorieBudget },
    { day: 'Fri', calories: 2050, protein: 120, goal: userProfile.dailyCalorieBudget },
    { day: 'Sat', calories: 2300, protein: 140, goal: userProfile.dailyCalorieBudget },
    { day: 'Sun', calories: dailyLog.calories, protein: dailyLog.protein, goal: userProfile.dailyCalorieBudget }
  ];

  const aiSuggestions = [
    {
      id: 1,
      title: 'Optimize Post-Workout Protein',
      desc: 'Add 25g protein within 45 minutes of workout to maximize muscle synthesis.',
      tag: 'Muscle Gain',
      actionText: 'View Recipes',
      actionPath: '/ingredient-scanner'
    },
    {
      id: 2,
      title: 'Hydration Boost Needed',
      desc: `You're ${Math.max(0, userProfile.dailyWaterGoal - dailyLog.water)}ml away from optimal cognitive & recovery hydration today.`,
      tag: 'Hydration',
      actionText: '+250ml Water',
      onAction: () => addWater(250)
    },
    {
      id: 3,
      title: 'Micronutrient Balance',
      desc: 'Spinach & Cottage Cheese in your pantry match your daily iron & calcium needs.',
      tag: 'Pantry AI',
      actionText: 'Meal Planner',
      actionPath: '/meal-planner'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-blue-950 border border-emerald-500/20 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" /> FitGen AI Co-Pilot Active
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-heading text-white">
              {getGreeting()}, <span className="bg-gradient-to-r from-[#39FF14] to-[#00CFFF] bg-clip-text text-transparent">{userProfile.name}</span>! 👋
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed">
              Goal: <span className="text-[#39FF14] font-bold">{userProfile.goal}</span> • Diet: <span className="text-[#00CFFF] font-bold">{userProfile.dietary}</span> ({userProfile.nation})
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            <NavLink
              to="/ingredient-scanner"
              className="px-5 py-3 rounded-2xl bg-[#39FF14] hover:bg-[#39FF14]/90 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#39FF14]/25 transition-transform active:scale-95 text-center"
            >
              <ChefHat className="w-4 h-4" /> AI Kitchen Assistant
            </NavLink>
            <NavLink
              to="/meal-planner"
              className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm flex items-center justify-center gap-2 transition-all text-center"
            >
              <Sparkles className="w-4 h-4 text-[#00CFFF]" /> 7-Day Meal Plan
            </NavLink>
          </div>
        </div>
      </div>

      {/* MAIN AI KITCHEN ASSISTANT CARD */}
      <div className="glass-card p-6 rounded-3xl border border-[#39FF14]/30 shadow-2xl relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <ChefHat className="w-40 h-40 text-[#39FF14]" />
        </div>

        {/* Hidden Camera & Gallery File Inputs */}
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handlePhotoSelected}
          className="hidden"
        />
        <input
          ref={galleryInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handlePhotoSelected}
          className="hidden"
        />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-[#39FF14]/15 border border-[#39FF14]/30 text-[#39FF14]">
                <Sparkles className="w-5 h-5" />
              </span>
              <div>
                <h2 className="text-lg font-bold font-heading text-white">What's in your kitchen today?</h2>
                <p className="text-xs text-slate-400">Tell FitGen AI your ingredients or scan your fridge photo to generate recipes!</p>
              </div>
            </div>

            {/* Quick Camera & Photo Scanner Action Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => cameraInputRef.current?.click()}
                className="px-3 py-1.5 rounded-xl bg-[#39FF14]/15 hover:bg-[#39FF14] text-[#39FF14] hover:text-slate-950 border border-[#39FF14]/40 text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer shadow-md group"
                title="Open Camera & Snap Photo of Ingredients"
              >
                <Camera className="w-4 h-4 text-[#39FF14] group-hover:text-slate-950" />
                <span>Camera Scan</span>
              </button>

              <button
                type="button"
                onClick={() => galleryInputRef.current?.click()}
                className="px-3 py-1.5 rounded-xl bg-[#00CFFF]/15 hover:bg-[#00CFFF] text-[#00CFFF] hover:text-slate-950 border border-[#00CFFF]/40 text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer shadow-md group"
                title="Upload Photo(s) of Ingredients from Gallery"
              >
                <ImageIcon className="w-4 h-4 text-[#00CFFF] group-hover:text-slate-950" />
                <span>Upload Photo</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleGenerateRecipeSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 flex items-center">
              <input
                type="text"
                value={kitchenInput}
                onChange={(e) => setKitchenInput(e.target.value)}
                placeholder="e.g. paneer, tomato, onion, beans, cabbage"
                className="w-full pl-4 pr-24 py-3.5 glass-input text-sm text-white placeholder-slate-500 rounded-2xl focus:ring-2 focus:ring-[#39FF14]/50 border border-white/10"
              />
              <div className="absolute right-2 flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => cameraInputRef.current?.click()}
                  className="p-2 rounded-xl bg-slate-800/80 hover:bg-[#39FF14] text-slate-300 hover:text-slate-950 transition-all border border-white/10 flex items-center gap-1 text-xs font-bold shadow-md cursor-pointer group"
                  title="Snap Camera Photo"
                >
                  <Camera className="w-4 h-4 text-[#39FF14] group-hover:text-slate-950" />
                </button>
                <button
                  type="button"
                  onClick={() => galleryInputRef.current?.click()}
                  className="p-2 rounded-xl bg-slate-800/80 hover:bg-[#00CFFF] text-slate-300 hover:text-slate-950 transition-all border border-white/10 flex items-center gap-1 text-xs font-bold shadow-md cursor-pointer group"
                  title="Upload Gallery Photo"
                >
                  <ImageIcon className="w-4 h-4 text-[#00CFFF] group-hover:text-slate-950" />
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-3.5 bg-[#39FF14] hover:bg-[#39FF14]/90 text-slate-950 font-extrabold rounded-2xl text-xs uppercase tracking-wider shadow-lg shadow-[#39FF14]/20 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 whitespace-nowrap"
            >
              <span>GENERATE MY RECIPE</span>
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Quick example chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[11px] font-semibold text-slate-400">Quick Try:</span>
            {[
              'paneer, tomato, onion, beans',
              'spinach, garlic, chickpeas, rice',
              'tofu, broccoli, soy sauce, quinoa',
              'egg, onion, capsicum, toast'
            ].map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => setKitchenInput(chip)}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-white/5 transition-all"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* TODAY'S NUTRITION & MACROS TARGET PROGRESS */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold font-heading text-white flex items-center gap-2">
          <Flame className="w-5 h-5 text-[#39FF14]" />
          <span>Today's Nutrition Progress</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Daily Calories */}
          <div className="glass-panel p-5 space-y-4 hover:border-emerald-500/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Calories</span>
              <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <Flame className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-white font-heading">{dailyLog.calories}</span>
                <span className="text-xs text-slate-400">/ {userProfile.dailyCalorieBudget} kcal</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-500 to-[#39FF14] h-full rounded-full transition-all duration-500"
                  style={{ width: `${caloriePercentage}%` }}
                />
              </div>
            </div>
            <p className="text-[11px] text-slate-400 flex items-center justify-between">
              <span>{Math.max(0, userProfile.dailyCalorieBudget - dailyLog.calories)} kcal remaining</span>
              <span className="text-[#39FF14] font-semibold">{caloriePercentage}%</span>
            </p>
          </div>

          {/* Protein Intake */}
          <div className="glass-panel p-5 space-y-4 hover:border-emerald-500/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Protein</span>
              <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[#00CFFF]">
                <Dumbbell className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-white font-heading">{dailyLog.protein}g</span>
                <span className="text-xs text-slate-400">/ {userProfile.dailyProteinGoal}g target</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
                <div
                  className="bg-[#00CFFF] h-full rounded-full transition-all duration-500"
                  style={{ width: `${proteinPercentage}%` }}
                />
              </div>
            </div>
            <p className="text-[11px] text-slate-400 flex items-center justify-between">
              <span>{Math.max(0, userProfile.dailyProteinGoal - dailyLog.protein)}g remaining</span>
              <span className="text-[#00CFFF] font-semibold">{proteinPercentage}%</span>
            </p>
          </div>

          {/* Water Intake */}
          <div className="glass-panel p-5 space-y-4 hover:border-blue-500/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Water Intake</span>
              <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                <Droplets className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-white font-heading">{dailyLog.water}</span>
                <span className="text-xs text-slate-400">/ {userProfile.dailyWaterGoal} ml</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
                <div
                  className="bg-blue-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${waterPercentage}%` }}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-400">{waterPercentage}% completed</span>
              <button
                onClick={() => addWater(250)}
                className="px-2.5 py-1 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30 text-[11px] font-semibold hover:bg-blue-500/30 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3 h-3" /> +250ml
              </button>
            </div>
          </div>

          {/* Fiber & Carbs */}
          <div className="glass-panel p-5 space-y-4 hover:border-purple-500/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Carbs & Fiber</span>
              <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                <Award className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-white font-heading">{dailyLog.carbs}g</span>
                <span className="text-xs text-slate-400">Carbs / {dailyLog.fiber}g Fiber</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full mt-3 overflow-hidden">
                <div
                  className="bg-purple-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${carbsPercentage}%` }}
                />
              </div>
            </div>
            <p className="text-[11px] text-slate-400 flex items-center justify-between">
              <span>Fat: {dailyLog.fat}g / {userProfile.dailyFatGoal}g</span>
              <span className="text-purple-400 font-semibold">{carbsPercentage}%</span>
            </p>
          </div>
        </div>
      </div>

      {/* TODAY'S CLICKABLE MEALS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold font-heading text-white">Today's Meals</h3>
              <p className="text-xs text-slate-400">Breakfast, Lunch, Snack & Dinner tailored for your fitness plan</p>
            </div>
            <NavLink
              to="/meal-planner"
              className="text-xs font-semibold text-[#39FF14] hover:underline flex items-center gap-1"
            >
              Full 7-Day Plan <ChevronRight className="w-4 h-4" />
            </NavLink>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {mealPlan.map((meal) => (
              <div
                key={meal.id}
                onClick={() => navigate('/meal-planner')}
                className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-[#39FF14]/40 transition-all flex flex-col justify-between gap-3 cursor-pointer group"
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md uppercase bg-[#39FF14]/15 text-[#39FF14] border border-[#39FF14]/30">
                      {meal.type}
                    </span>
                    <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {meal.prepTime || '15 min'}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-100 font-heading line-clamp-1 group-hover:text-[#39FF14] transition-colors">
                    {meal.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{meal.description}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                  <div className="text-xs font-semibold text-slate-300">
                    <span className="text-[#39FF14] font-bold">{meal.calories}</span> kcal • {meal.protein}g P
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      logMealToTracker(meal);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-[#39FF14]/20 hover:bg-[#39FF14]/30 text-[#39FF14] border border-[#39FF14]/30 text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" /> Log Meal
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Real-time Insights */}
        <div className="glass-panel p-6 space-y-5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#39FF14]" />
            <h3 className="text-base font-bold font-heading text-white">FitGen AI Insights</h3>
          </div>

          <div className="space-y-3.5">
            {aiSuggestions.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2.5 hover:border-slate-700 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#00CFFF]/15 text-[#00CFFF] border border-[#00CFFF]/30">
                    {item.tag}
                  </span>
                  <span className="text-[10px] text-slate-400">Active</span>
                </div>
                <h4 className="text-xs font-bold text-slate-200">{item.title}</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">{item.desc}</p>

                {item.actionPath ? (
                  <NavLink
                    to={item.actionPath}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#39FF14] hover:underline"
                  >
                    {item.actionText} <ArrowUpRight className="w-3.5 h-3.5" />
                  </NavLink>
                ) : (
                  <button
                    onClick={item.onAction}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#00CFFF] hover:underline cursor-pointer"
                  >
                    {item.actionText} <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
