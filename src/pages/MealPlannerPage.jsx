import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { exportMealPlanPDF } from '../utils/pdfExport';
import { generateWeeklyMealPlan } from '../utils/nutritionAiEngine';
import {
  Sparkles,
  Download,
  Bookmark,
  RefreshCw,
  Clock,
  Dumbbell,
  Flame,
  Plus,
  CheckCircle,
  Sliders,
  AlertCircle,
  Calendar,
  Droplet
} from 'lucide-react';

export default function MealPlannerPage() {
  const { userProfile, setUserProfile, addToast, logMealToTracker } = useApp();
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedDay, setSelectedDay] = useState('Monday');

  // Form input state initialized from userProfile
  const [formData, setFormData] = useState({
    age: userProfile.age || 26,
    gender: userProfile.gender || 'Female',
    height: userProfile.height || 172,
    weight: userProfile.weight || 65,
    goal: userProfile.goal || 'Muscle Gain',
    activityLevel: userProfile.activityLevel || 'Active (4-5 workouts/week)',
    dietary: userProfile.dietary || 'Vegetarian',
    nation: userProfile.nation || 'India 🇮🇳',
    allergies: userProfile.allergies ? userProfile.allergies.join(', ') : 'Peanuts'
  });

  // Full 7-Day Weekly Meal Plan State
  const [weeklyPlan, setWeeklyPlan] = useState(() =>
    generateWeeklyMealPlan({
      nation: formData.nation,
      dietary: formData.dietary,
      goal: formData.goal,
      allergies: formData.allergies ? formData.allergies.split(',').map((s) => s.trim()) : [],
      age: Number(formData.age),
      gender: formData.gender,
      height: Number(formData.height),
      weight: Number(formData.weight),
      activityLevel: formData.activityLevel
    })
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Generate 7-Day Weekly AI Meal Plan algorithm
  const handleGeneratePlan = (e) => {
    e.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
      const allergyList = formData.allergies
        ? formData.allergies.split(',').map((s) => s.trim()).filter(Boolean)
        : [];

      const newWeeklyPlan = generateWeeklyMealPlan({
        nation: formData.nation,
        dietary: formData.dietary,
        goal: formData.goal,
        allergies: allergyList,
        age: Number(formData.age),
        gender: formData.gender,
        height: Number(formData.height),
        weight: Number(formData.weight),
        activityLevel: formData.activityLevel
      });

      setWeeklyPlan(newWeeklyPlan);
      setUserProfile((prev) => ({
        ...prev,
        age: Number(formData.age),
        gender: formData.gender,
        height: Number(formData.height),
        weight: Number(formData.weight),
        goal: formData.goal,
        activityLevel: formData.activityLevel,
        dietary: formData.dietary,
        nation: formData.nation,
        allergies: allergyList
      }));

      setIsGenerating(false);
      addToast(`Generated full 7-Day AI Meal Plan for ${formData.nation} (${formData.dietary})!`, 'success');
    }, 700);
  };

  const currentDayMeals = weeklyPlan[selectedDay] || [];

  const handleDownloadPDF = () => {
    exportMealPlanPDF(currentDayMeals, userProfile);
    addToast(`Downloaded ${selectedDay} Meal Plan PDF!`);
  };

  const handleSavePlan = () => {
    addToast('7-Day Weekly Meal Plan saved to profile!');
  };

  const totalCalories = currentDayMeals.reduce((acc, m) => acc + (m.calories || 0), 0);
  const totalProtein = currentDayMeals.reduce((acc, m) => acc + (m.protein || 0), 0);
  const totalCarbs = currentDayMeals.reduce((acc, m) => acc + (m.carbs || 0), 0);
  const totalFat = currentDayMeals.reduce((acc, m) => acc + (m.fat || 0), 0);

  const DAYS_LIST = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-white flex items-center gap-2">
            <Sparkles className="w-7 h-7 text-emerald-400" /> AI 7-Day Weekly Meal Planner
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Discover distinct AI-suggested daily menus for all 7 days of the week with automatic liquid & hydration tracking.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full md:w-auto">
          <button
            onClick={handleSavePlan}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Bookmark className="w-4 h-4 text-emerald-400" /> Save 7-Day Plan
          </button>
          <button
            onClick={handleDownloadPDF}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-transform active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4" /> Download PDF
          </button>
        </div>
      </div>

      {/* Input Metrics Form Card */}
      <form onSubmit={handleGeneratePlan} className="glass-panel p-6 space-y-6">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
          <Sliders className="w-5 h-5 text-emerald-400" />
          <h3 className="text-base font-bold font-heading text-white">Your Body Metrics & Dietary Preferences</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Age */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Age (Years)</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
              required
            />
          </div>

          {/* Gender */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Height */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Height (cm)</label>
            <input
              type="number"
              name="height"
              value={formData.height}
              onChange={handleInputChange}
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
              required
            />
          </div>

          {/* Weight */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Weight (kg)</label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
              required
            />
          </div>

          {/* Primary Goal */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Primary Goal</label>
            <select
              name="goal"
              value={formData.goal}
              onChange={handleInputChange}
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-emerald-500 font-semibold text-emerald-400"
            >
              <option value="Muscle Gain">💪 Muscle Gain (Hypertrophy)</option>
              <option value="Weight Loss">🔥 Weight Loss (Fat Loss)</option>
              <option value="6-Pack Abs">⚡ 6-Pack Abs (Lean Cutting)</option>
              <option value="Maintenance">✨ Maintenance & Tone</option>
            </select>
          </div>

          {/* Activity Level */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Activity Level</label>
            <select
              name="activityLevel"
              value={formData.activityLevel}
              onChange={handleInputChange}
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="Sedentary (Desk Job)">Sedentary (Desk Job)</option>
              <option value="Moderate (1-3 workouts/week)">Moderate (1-3 workouts/week)</option>
              <option value="Active (4-5 workouts/week)">Active (4-5 workouts/week)</option>
              <option value="Very Active (6+ workouts/week)">Very Active (6+ workouts/week)</option>
            </select>
          </div>

          {/* Nation / Regional Cuisine Preference */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Nation / Cuisine Preference</label>
            <select
              name="nation"
              value={formData.nation}
              onChange={handleInputChange}
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-emerald-500 font-semibold text-emerald-400"
            >
              <option value="India 🇮🇳">India 🇮🇳 (Desi High-Protein)</option>
              <option value="USA 🇺🇸">USA 🇺🇸 (American Fitness)</option>
              <option value="Italy 🇮🇹">Italy 🇮🇹 (Mediterranean)</option>
              <option value="Japan 🇯🇵">Japan 🇯🇵 (Clean Asian)</option>
              <option value="Mexico 🇲🇽">Mexico 🇲🇽 (Mexican Grill)</option>
              <option value="Middle East 🇱🇧">Middle East 🇱🇧 (Levantine)</option>
              <option value="Thailand 🇹🇭">Thailand 🇹🇭 (Thai Herbs)</option>
              <option value="Global 🌍">Global 🌍 (International)</option>
            </select>
          </div>

          {/* Dietary Preference */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Dietary Preference</label>
            <select
              name="dietary"
              value={formData.dietary}
              onChange={handleInputChange}
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="Vegetarian">Vegetarian</option>
              <option value="Non-Vegetarian">Non-Vegetarian</option>
              <option value="Vegan">Vegan</option>
              <option value="Eggetarian">Eggetarian</option>
            </select>
          </div>

          {/* Allergies */}
          <div className="space-y-1.5 sm:col-span-2 lg:col-span-4">
            <label className="text-xs font-semibold text-slate-300">Allergies / Exclusions</label>
            <input
              type="text"
              name="allergies"
              value={formData.allergies}
              onChange={handleInputChange}
              placeholder="e.g. Peanuts, Shellfish, Gluten"
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isGenerating}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all disabled:opacity-50 cursor-pointer"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> Analyzing 7-Day Nutrients & Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" /> Generate Full 7-Day AI Meal Plan
              </>
            )}
          </button>
        </div>
      </form>

      {/* 7-Day Day Selector Tab Bar */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold font-heading text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-400" /> Select Day of Week
          </h3>
          <span className="text-xs text-slate-400">
            Showing AI plan for <span className="text-emerald-400 font-bold">{selectedDay}</span>
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {DAYS_LIST.map((day) => {
            const isActive = selectedDay === day;
            return (
              <button
                key={day}
                type="button"
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 border transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-500/10'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <span>📅 {day}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Plan Summary Macros Bar for Selected Day */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-panel p-4 text-center">
          <span className="text-[10px] text-slate-400 font-semibold uppercase">{selectedDay} Calories</span>
          <p className="text-2xl font-bold text-amber-400 font-heading mt-1">{totalCalories} kcal</p>
        </div>
        <div className="glass-panel p-4 text-center">
          <span className="text-[10px] text-slate-400 font-semibold uppercase">{selectedDay} Protein</span>
          <p className="text-2xl font-bold text-emerald-400 font-heading mt-1">{totalProtein} g</p>
        </div>
        <div className="glass-panel p-4 text-center">
          <span className="text-[10px] text-slate-400 font-semibold uppercase">{selectedDay} Carbs</span>
          <p className="text-2xl font-bold text-blue-400 font-heading mt-1">{totalCarbs} g</p>
        </div>
        <div className="glass-panel p-4 text-center">
          <span className="text-[10px] text-slate-400 font-semibold uppercase">{selectedDay} Fat</span>
          <p className="text-2xl font-bold text-purple-400 font-heading mt-1">{totalFat} g</p>
        </div>
      </div>

      {/* Meals Grid for Selected Day */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold font-heading text-white flex items-center gap-2">
              🍽️ AI Suggested Meals for {selectedDay}
            </h3>
            <p className="text-xs text-slate-400">
              Each meal slot is fixed and tailored by FitGen AI to optimize nutrition, hydration, and metabolic digestion.
            </p>
          </div>
          <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-extrabold flex items-center gap-1.5">
            ⚡ {currentDayMeals.length} Fixed Slots Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentDayMeals.map((meal) => {
            const isHydration = meal.type === 'hydration';
            return (
              <div
                key={meal.id}
                className={`glass-panel p-6 space-y-4 transition-all flex flex-col justify-between group ${
                  isHydration ? 'border-cyan-500/40 bg-cyan-950/10 hover:border-cyan-400' : 'hover:border-emerald-500/40'
                }`}
              >
                <div className="space-y-3">
                  {/* Header: Fixed Meal Slot Badge (NO DROPDOWN) & Scheduled Time */}
                  <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    {/* Fixed Badge Header */}
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-extrabold px-3 py-1 rounded-lg uppercase tracking-wider border ${
                          isHydration
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                            : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                        }`}
                      >
                        {meal.label || meal.type?.toUpperCase()}
                      </span>
                    </div>

                    {/* Time Indicator */}
                    <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1 text-xs font-bold text-slate-200">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{meal.scheduledTime || '01:00 PM'}</span>
                    </div>
                  </div>

                  {/* Meal Title & Description */}
                  <div>
                    <h4
                      className={`text-base font-bold font-heading transition-colors ${
                        isHydration ? 'text-cyan-300' : 'text-slate-100 group-hover:text-emerald-400'
                      }`}
                    >
                      {meal.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed mt-1">{meal.description}</p>
                  </div>

                  {/* Key Ingredients / Hydration Items */}
                  {meal.ingredients && (
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[11px] font-semibold text-slate-300">
                        {isHydration ? 'Hydration & Liquid Items:' : 'Key Ingredients:'}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {meal.ingredients.map((ing, idx) => (
                          <span
                            key={idx}
                            className={`text-[10px] px-2 py-0.5 rounded-md border ${
                              isHydration
                                ? 'bg-cyan-950 border-cyan-800 text-cyan-200'
                                : 'bg-slate-900 border-slate-800 text-slate-300'
                            }`}
                          >
                            {ing}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Actions & Macros */}
                <div className="space-y-3 pt-3 border-t border-slate-800">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                    <div className="flex items-center gap-2">
                      <span className="text-amber-400 font-bold">{meal.calories} kcal</span>
                      <span>•</span>
                      <span className="text-emerald-400">{meal.protein}g Protein</span>
                    </div>
                    <span className="text-slate-400 text-[11px]">⏱️ {meal.prepTime || '15 mins'}</span>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <button
                      onClick={() => {
                        const newReminder = !meal.reminderEnabled;
                        setWeeklyPlan((prev) => ({
                          ...prev,
                          [selectedDay]: prev[selectedDay].map((m) =>
                            m.id === meal.id ? { ...m, reminderEnabled: newReminder } : m
                          )
                        }));
                        addToast(
                          newReminder
                            ? `🔔 Alarm Reminder enabled for ${meal.scheduledTime}!`
                            : `🔕 Reminder disabled.`,
                          newReminder ? 'success' : 'info'
                        );
                      }}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        meal.reminderEnabled
                          ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span>{meal.reminderEnabled ? '🔔 Reminder ON' : '🔕 Set Alarm'}</span>
                    </button>

                    <button
                      onClick={() => {
                        logMealToTracker(meal);
                        addToast(`Logged ${meal.title} to Nutrition Tracker!`, 'success');
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-extrabold text-xs flex items-center gap-1 shadow-md transition-transform active:scale-95 cursor-pointer"
                    >
                      <CheckCircle className="w-3.5 h-3.5" /> Log Meal
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

