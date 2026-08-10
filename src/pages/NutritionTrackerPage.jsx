import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  LineChart,
  TrendingUp,
  Droplets,
  Plus,
  Flame,
  Dumbbell,
  Scale,
  Calendar,
  Sparkles,
  PieChart
} from 'lucide-react';

export default function NutritionTrackerPage() {
  const { dailyLog, setDailyLog, userProfile, addWater, addToast } = useApp();

  const [mealInput, setMealInput] = useState({
    title: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: ''
  });

  const handleCustomLogMeal = (e) => {
    e.preventDefault();
    if (!mealInput.title || !mealInput.calories) return;

    setDailyLog((prev) => ({
      ...prev,
      calories: prev.calories + Number(mealInput.calories),
      protein: prev.protein + (Number(mealInput.protein) || 0),
      carbs: prev.carbs + (Number(mealInput.carbs) || 0),
      fat: prev.fat + (Number(mealInput.fat) || 0)
    }));

    addToast(`Logged custom meal "${mealInput.title}" (${mealInput.calories} kcal)!`);
    setMealInput({ title: '', calories: '', protein: '', carbs: '', fat: '' });
  };

  const weightHistory = [
    { date: 'Jul 1', weight: 67.5 },
    { date: 'Jul 8', weight: 67.0 },
    { date: 'Jul 15', weight: 66.4 },
    { date: 'Jul 22', weight: 65.8 },
    { date: 'Jul 29', weight: 65.3 },
    { date: 'Aug 3', weight: userProfile.weight || 65.0 }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-heading text-white flex items-center gap-2">
          <LineChart className="w-7 h-7 text-emerald-400" /> Nutrition & Macro Tracker
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Detailed analytics, calorie trends, weight trajectory, and daily micro/macro breakdowns.
        </p>
      </div>

      {/* Main Intake Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Calories */}
        <div className="glass-panel p-4 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Calories</span>
            <Flame className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-xl font-bold text-white font-heading">{dailyLog.calories}</p>
          <span className="text-[10px] text-slate-400">Target: {userProfile.dailyCalorieBudget} kcal</span>
        </div>

        {/* Protein */}
        <div className="glass-panel p-4 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Protein</span>
            <Dumbbell className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-xl font-bold text-emerald-400 font-heading">{dailyLog.protein}g</p>
          <span className="text-[10px] text-slate-400">Target: {userProfile.dailyProteinGoal}g</span>
        </div>

        {/* Carbs */}
        <div className="glass-panel p-4 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Carbs</span>
            <span className="text-blue-400 font-bold">C</span>
          </div>
          <p className="text-xl font-bold text-blue-400 font-heading">{dailyLog.carbs}g</p>
          <span className="text-[10px] text-slate-400">Target: {userProfile.dailyCarbsGoal}g</span>
        </div>

        {/* Fat */}
        <div className="glass-panel p-4 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Fats</span>
            <span className="text-purple-400 font-bold">F</span>
          </div>
          <p className="text-xl font-bold text-purple-400 font-heading">{dailyLog.fat}g</p>
          <span className="text-[10px] text-slate-400">Target: {userProfile.dailyFatGoal}g</span>
        </div>

        {/* Fiber */}
        <div className="glass-panel p-4 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Fiber</span>
            <span className="text-teal-400 font-bold">Fi</span>
          </div>
          <p className="text-xl font-bold text-teal-400 font-heading">{dailyLog.fiber}g</p>
          <span className="text-[10px] text-slate-400">Target: 30g</span>
        </div>

        {/* Water */}
        <div className="glass-panel p-4 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Water</span>
            <Droplets className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-xl font-bold text-blue-400 font-heading">{dailyLog.water}ml</p>
          <span className="text-[10px] text-slate-400">Goal: {userProfile.dailyWaterGoal}ml</span>
        </div>
      </div>

      {/* Grid: Quick Log & Weight Progress Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Meal Logging Card */}
        <form onSubmit={handleCustomLogMeal} className="glass-panel p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Plus className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold font-heading text-white">Log Custom Meal / Snack</h3>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-slate-300">Meal Title</label>
              <input
                type="text"
                value={mealInput.title}
                onChange={(e) => setMealInput({ ...mealInput, title: e.target.value })}
                placeholder="e.g. Protein Bar, Greek Salad"
                className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500 mt-1"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-300">Calories (kcal)</label>
                <input
                  type="number"
                  value={mealInput.calories}
                  onChange={(e) => setMealInput({ ...mealInput, calories: e.target.value })}
                  placeholder="350"
                  className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500 mt-1"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">Protein (g)</label>
                <input
                  type="number"
                  value={mealInput.protein}
                  onChange={(e) => setMealInput({ ...mealInput, protein: e.target.value })}
                  placeholder="25"
                  className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500 mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">Carbs (g)</label>
                <input
                  type="number"
                  value={mealInput.carbs}
                  onChange={(e) => setMealInput({ ...mealInput, carbs: e.target.value })}
                  placeholder="30"
                  className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500 mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">Fat (g)</label>
                <input
                  type="number"
                  value={mealInput.fat}
                  onChange={(e) => setMealInput({ ...mealInput, fat: e.target.value })}
                  placeholder="10"
                  className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500 mt-1"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1 shadow-md shadow-emerald-500/20 transition-all"
          >
            <Plus className="w-4 h-4" /> Add to Daily Intake
          </button>
        </form>

        {/* Weight Trajectory Chart (2 cols) */}
        <div className="lg:col-span-2 glass-panel p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold font-heading text-white">Weight Progress History</h3>
              <p className="text-xs text-slate-400">Current: {userProfile.weight} kg | Goal: Muscle Gain & Fat Loss</p>
            </div>
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold">
              <TrendingUp className="w-3.5 h-3.5" /> -2.5 kg total change
            </div>
          </div>

          {/* SVG Line & Area Chart for Weight Progress */}
          <div className="h-48 relative flex items-end justify-between px-4 pt-6 border-b border-slate-800">
            {weightHistory.map((item, i) => {
              const minW = 64;
              const maxW = 68;
              const heightPercent = Math.round(((item.weight - minW) / (maxW - minW)) * 100);
              return (
                <div key={i} className="flex flex-col items-center gap-2 group relative z-10">
                  <div className="text-[11px] font-bold text-emerald-400">{item.weight} kg</div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-950 group-hover:scale-150 transition-transform shadow-md shadow-emerald-500/50" />
                  <span className="text-[11px] text-slate-500 font-medium">{item.date}</span>
                </div>
              );
            })}

            {/* Background SVG Connecting Line */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none p-4 opacity-40 overflow-visible">
              <path
                d="M 30 80 Q 120 100 210 120 T 390 140 T 570 150"
                fill="none"
                stroke="#10B981"
                strokeWidth="3"
                strokeDasharray="4 4"
              />
            </svg>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 uppercase">Starting Weight</span>
              <p className="text-sm font-bold text-slate-200 font-heading">67.5 kg</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
              <span className="text-[10px] text-slate-400 uppercase">Current Weight</span>
              <p className="text-sm font-bold text-emerald-400 font-heading">{userProfile.weight} kg</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center col-span-2 sm:col-span-1">
              <span className="text-[10px] text-slate-400 uppercase">BMI Score</span>
              <p className="text-sm font-bold text-blue-400 font-heading">22.0 (Normal)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
