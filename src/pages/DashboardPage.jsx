import React from 'react';
import { NavLink } from 'react-router-dom';
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
  Palette,
  Check
} from 'lucide-react';

export default function DashboardPage() {
  const { userProfile, dailyLog, addWater, mealPlan, logMealToTracker, currentTheme, changeTheme } = useApp();

  const caloriePercentage = Math.min(100, Math.round((dailyLog.calories / userProfile.dailyCalorieBudget) * 100));
  const proteinPercentage = Math.min(100, Math.round((dailyLog.protein / userProfile.dailyProteinGoal) * 100));
  const carbsPercentage = Math.min(100, Math.round((dailyLog.carbs / userProfile.dailyCarbsGoal) * 100));
  const fatPercentage = Math.min(100, Math.round((dailyLog.fat / userProfile.dailyFatGoal) * 100));
  const waterPercentage = Math.min(100, Math.round((dailyLog.water / userProfile.dailyWaterGoal) * 100));

  const weeklyData = [
    { day: 'Mon', calories: 2100, protein: 125, goal: 2200 },
    { day: 'Tue', calories: 2180, protein: 130, goal: 2200 },
    { day: 'Wed', calories: 1950, protein: 110, goal: 2200 },
    { day: 'Thu', calories: 2250, protein: 135, goal: 2200 },
    { day: 'Fri', calories: 2050, protein: 120, goal: 2200 },
    { day: 'Sat', calories: 2300, protein: 140, goal: 2200 },
    { day: 'Sun', calories: dailyLog.calories, protein: dailyLog.protein, goal: 2200 }
  ];

  const aiSuggestions = [
    {
      id: 1,
      title: 'Optimize Post-Workout Protein',
      desc: 'Add 25g protein within 45 minutes of workout to maximize muscle synthesis.',
      tag: 'Muscle Gain',
      actionText: 'View Recipes',
      actionPath: '/recipes'
    },
    {
      id: 2,
      title: 'Hydration Boost Needed',
      desc: `You're ${userProfile.dailyWaterGoal - dailyLog.water}ml away from optimal cognitive & recovery hydration today.`,
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
              <Sparkles className="w-3.5 h-3.5" /> AI Nutrition Co-Pilot Active
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-heading text-white">
              Welcome back, <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">{userProfile.name}</span>! 👋
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed">
              Your overall nutrition health score is at <span className="text-emerald-400 font-bold">94/100 (A+)</span> today. You're on track for your <span className="text-white font-medium">{userProfile.goal}</span> plan.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <NavLink
              to="/meal-planner"
              className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/25 transition-transform active:scale-95"
            >
              <Sparkles className="w-4 h-4" /> AI Meal Plan
            </NavLink>
            <NavLink
              to="/ingredient-scanner"
              className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm flex items-center gap-2 transition-all"
            >
              <Utensils className="w-4 h-4 text-emerald-400" /> Scan Fridge
            </NavLink>
          </div>
        </div>
      </div>

      {/* FitGen Project Theme Color Customizer */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white font-heading flex items-center gap-2">
                🎨 FitGen Project Theme Color Customizer
              </h3>
              <p className="text-xs text-slate-400">
                Select your preferred visual theme palette to customize buttons, glowing accents & charts across the entire workspace.
              </p>
            </div>
          </div>

          <span className="self-start sm:self-auto px-3 py-1 rounded-xl bg-slate-800 border border-slate-700 text-xs font-bold text-slate-300 capitalize">
            Active: {currentTheme}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-1">
          {[
            { name: 'emerald', label: '❇️ Cyber Emerald', desc: 'Neon Green & Teal', color: '#10B981' },
            { name: 'cyberpunk', label: '🟣 Neon Cyberpunk', desc: 'Electric Pink & Cyan', color: '#EC4899' },
            { name: 'sunset', label: '🌅 Golden Sunset', desc: 'Amber & Warm Flame', color: '#F59E0B' },
            { name: 'ocean', label: '🌊 Sapphire Ocean', desc: 'Deep Cyan & Electric Blue', color: '#06B6D4' },
            { name: 'stealth', label: '🖤 Stealth Onyx', desc: 'Monochrome Silver & Slate', color: '#94A3B8' }
          ].map((thm) => {
            const isSelected = currentTheme === thm.name;
            return (
              <button
                key={thm.name}
                onClick={() => changeTheme(thm.name)}
                className={`p-3.5 rounded-2xl text-left transition-all border cursor-pointer flex flex-col justify-between space-y-2 group ${
                  isSelected
                    ? 'bg-slate-800 border-emerald-500/60 shadow-lg ring-2 ring-emerald-500/30 scale-102'
                    : 'bg-slate-950/80 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="w-4 h-4 rounded-full border border-white/20 shadow-md" style={{ backgroundColor: thm.color }} />
                  {isSelected && <Check className="w-4 h-4 text-emerald-400" />}
                </div>

                <div>
                  <h4 className="text-xs font-extrabold text-white group-hover:text-emerald-400 transition-colors">
                    {thm.label}
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">{thm.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Top 4 Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Daily Calories */}
        <div className="glass-panel p-5 space-y-4 hover:border-emerald-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Daily Calories</span>
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
                className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${caloriePercentage}%` }}
              />
            </div>
          </div>
          <p className="text-[11px] text-slate-400 flex items-center justify-between">
            <span>{userProfile.dailyCalorieBudget - dailyLog.calories} kcal remaining</span>
            <span className="text-emerald-400 font-semibold">{caloriePercentage}%</span>
          </p>
        </div>

        {/* Protein Intake */}
        <div className="glass-panel p-5 space-y-4 hover:border-emerald-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Protein Intake</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
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
                className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${proteinPercentage}%` }}
              />
            </div>
          </div>
          <p className="text-[11px] text-slate-400 flex items-center justify-between">
            <span>{userProfile.dailyProteinGoal - dailyLog.protein}g to goal</span>
            <span className="text-emerald-400 font-semibold">{proteinPercentage}%</span>
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
              className="px-2.5 py-1 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30 text-[11px] font-semibold hover:bg-blue-500/30 transition-colors flex items-center gap-1"
            >
              <Plus className="w-3 h-3" /> +250ml
            </button>
          </div>
        </div>

        {/* Nutrition Score */}
        <div className="glass-panel p-5 space-y-4 hover:border-emerald-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Nutrition Score</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-emerald-400 font-heading">
                {dailyLog.nutritionScore}
              </span>
              <span className="text-xs text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-500/15">
                Grade A+
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-3">
              Calculated based on macro balance, fiber, and clean eating.
            </p>
          </div>
          <p className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +4% higher than last week
          </p>
        </div>
      </div>

      {/* Middle Grid: Weekly Chart & Macro Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Nutrition Chart Card (2 cols) */}
        <div className="lg:col-span-2 glass-panel p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold font-heading text-white">Weekly Calorie & Protein Progress</h3>
              <p className="text-xs text-slate-400">Consistently meeting macro targets for 7 days</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Intake (kcal)
              </span>
              <span className="flex items-center gap-1.5 text-slate-400">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-700" /> Target (2200)
              </span>
            </div>
          </div>

          {/* Custom SVG Interactive Bar Chart */}
          <div className="h-56 flex items-end justify-between gap-3 pt-6 pb-2 px-2 border-b border-slate-800">
            {weeklyData.map((d, i) => {
              const heightPercent = Math.min(100, Math.round((d.calories / 2500) * 100));
              const isToday = d.day === 'Sun';
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group relative">
                  {/* Tooltip */}
                  <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 border border-slate-700 text-xs px-2.5 py-1 rounded-lg shadow-xl text-slate-200 pointer-events-none whitespace-nowrap z-20">
                    {d.calories} kcal | {d.protein}g protein
                  </div>

                  <div className="w-full bg-slate-800/60 rounded-t-xl h-44 flex items-end p-1 relative">
                    {/* Target Dotted Line */}
                    <div
                      className="absolute left-0 right-0 border-b border-dashed border-slate-600/60"
                      style={{ bottom: '88%' }}
                    />
                    <div
                      className={`w-full rounded-lg transition-all duration-500 ${
                        isToday
                          ? 'bg-gradient-to-t from-emerald-500 to-teal-400 shadow-lg shadow-emerald-500/30'
                          : 'bg-slate-700 hover:bg-emerald-500/60'
                      }`}
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                  <span className={`text-xs font-semibold ${isToday ? 'text-emerald-400' : 'text-slate-400'}`}>
                    {d.day}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-3 gap-4 pt-2 text-center">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Weekly Avg</span>
              <p className="text-base font-bold text-slate-200 font-heading">2,154 kcal</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Avg Protein</span>
              <p className="text-base font-bold text-emerald-400 font-heading">126 g/day</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Burned Today</span>
              <p className="text-base font-bold text-amber-400 font-heading">{dailyLog.caloriesBurned} kcal</p>
            </div>
          </div>
        </div>

        {/* Macro Distribution Rings (1 col) */}
        <div className="glass-panel p-6 space-y-6 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold font-heading text-white">Macro Ratio</h3>
            <p className="text-xs text-slate-400">Target: 30% Protein, 45% Carbs, 25% Fat</p>
          </div>

          <div className="space-y-4">
            {/* Protein */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-300 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Protein (30%)
                </span>
                <span className="text-emerald-400">{dailyLog.protein}g / {userProfile.dailyProteinGoal}g</span>
              </div>
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${proteinPercentage}%` }} />
              </div>
            </div>

            {/* Carbs */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-300 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-400" /> Carbs (45%)
                </span>
                <span className="text-blue-400">{dailyLog.carbs}g / {userProfile.dailyCarbsGoal}g</span>
              </div>
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div className="bg-blue-400 h-full rounded-full" style={{ width: `${carbsPercentage}%` }} />
              </div>
            </div>

            {/* Fat */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-300 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Fats (25%)
                </span>
                <span className="text-amber-400">{dailyLog.fat}g / {userProfile.dailyFatGoal}g</span>
              </div>
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div className="bg-amber-400 h-full rounded-full" style={{ width: `${fatPercentage}%` }} />
              </div>
            </div>

            {/* Fiber */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-300 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-400" /> Dietary Fiber
                </span>
                <span className="text-purple-400">{dailyLog.fiber}g / 30g</span>
              </div>
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div className="bg-purple-400 h-full rounded-full" style={{ width: `${Math.min(100, (dailyLog.fiber / 30) * 100)}%` }} />
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 space-y-1">
            <p className="font-bold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-400" /> Macro Co-Pilot Tip
            </p>
            <p className="text-[11px] text-slate-300 leading-normal">
              Your protein intake is optimal for your {userProfile.goal} plan. Maintain cottage cheese or lentil options tonight!
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Today's Meal Plan & AI Suggestions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Meals (2 cols) */}
        <div className="lg:col-span-2 glass-panel p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold font-heading text-white">Today's Scheduled Meals</h3>
              <p className="text-xs text-slate-400">Generated for your {userProfile.dietary} preference</p>
            </div>
            <NavLink
              to="/meal-planner"
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              Full Planner <ChevronRight className="w-4 h-4" />
            </NavLink>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {mealPlan.map((meal) => (
              <div
                key={meal.id}
                className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md uppercase bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      {meal.type}
                    </span>
                    <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {meal.prepTime || '15 min'}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-100 font-heading line-clamp-1">{meal.title}</h4>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{meal.description}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                  <div className="text-xs font-semibold text-slate-300">
                    <span className="text-emerald-400 font-bold">{meal.calories}</span> kcal • {meal.protein}g P
                  </div>
                  <button
                    onClick={() => logMealToTracker(meal)}
                    className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30 text-xs font-semibold transition-colors flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Log Meal
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Smart Suggestions Cards (1 col) */}
        <div className="glass-panel p-6 space-y-5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold font-heading text-white">AI Real-time Insights</h3>
          </div>

          <div className="space-y-3.5">
            {aiSuggestions.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2.5 hover:border-slate-700 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-500/15 text-blue-400 border border-blue-500/30">
                    {item.tag}
                  </span>
                  <span className="text-[10px] text-slate-400">Just now</span>
                </div>
                <h4 className="text-xs font-bold text-slate-200">{item.title}</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">{item.desc}</p>

                {item.actionPath ? (
                  <NavLink
                    to={item.actionPath}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:underline"
                  >
                    {item.actionText} <ArrowUpRight className="w-3.5 h-3.5" />
                  </NavLink>
                ) : (
                  <button
                    onClick={item.onAction}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue-400 hover:underline"
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
