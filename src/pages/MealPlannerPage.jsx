import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { exportMealPlanPDF } from '../utils/pdfExport';
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
  AlertCircle
} from 'lucide-react';

export default function MealPlannerPage() {
  const { userProfile, setUserProfile, mealPlan, setMealPlan, addToast } = useApp();
  const [isGenerating, setIsGenerating] = useState(false);

  // Form input state initialized from userProfile
  const [formData, setFormData] = useState({
    age: userProfile.age || 26,
    gender: userProfile.gender || 'Female',
    height: userProfile.height || 172,
    weight: userProfile.weight || 65,
    goal: userProfile.goal || 'Muscle Gain',
    activityLevel: userProfile.activityLevel || 'Active (4-5 workouts/week)',
    dietary: userProfile.dietary || 'Vegetarian',
    allergies: userProfile.allergies ? userProfile.allergies.join(', ') : 'Peanuts'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Generate AI Meal Plan algorithm simulation
  const handleGeneratePlan = (e) => {
    e.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
      // Create personalized meals based on dietary & goal preference
      const isVeg = formData.dietary === 'Vegetarian' || formData.dietary === 'Vegan';
      const isHighProtein = formData.goal === 'Muscle Gain';

      const newPlan = [
        {
          id: 'mp-' + Date.now() + '-1',
          type: 'breakfast',
          title: isVeg
            ? 'Spiced Paneer Scramble & Whole Grain Toast'
            : 'Egg White Spinach Omelette & Avocado Toast',
          calories: isHighProtein ? 450 : 380,
          protein: isHighProtein ? 32 : 24,
          carbs: 24,
          fat: 18,
          prepTime: '15 mins',
          description: isVeg
            ? 'Cottage cheese scrambled with onions, tomatoes, turmeric, green chillies and fresh coriander.'
            : 'Fluffy egg whites cooked with fresh baby spinach, feta cheese, and whole grain toast.',
          ingredients: isVeg
            ? ['Paneer (180g)', 'Spinach (1 cup)', 'Whole Wheat Toast (2 slices)', 'Green Chillies']
            : ['Egg Whites (4)', 'Spinach (1 cup)', 'Avocado (1/2)', 'Whole Wheat Toast (2)']
        },
        {
          id: 'mp-' + Date.now() + '-2',
          type: 'lunch',
          title: isVeg
            ? 'High-Protein Moong Dal Khichdi & Greek Yogurt'
            : 'Grilled Lemon Herb Chicken & Quinoa Salad',
          calories: isHighProtein ? 650 : 540,
          protein: isHighProtein ? 42 : 34,
          carbs: 68,
          fat: 16,
          prepTime: '25 mins',
          description: isVeg
            ? 'Yellow lentils and brown rice slow-cooked with ghee, cumin seeds, turmeric, and high-protein strained curd.'
            : 'Marinated chicken breast grilled with rosemary, served over warm quinoa and roasted cherry tomatoes.',
          ingredients: isVeg
            ? ['Yellow Moong Dal (1 cup)', 'Brown Rice (1/2 cup)', 'Desi Ghee (1 tsp)', 'Greek Curd (150g)']
            : ['Chicken Breast (200g)', 'Quinoa (1 cup cooked)', 'Olive Oil', 'Lemon Juice']
        },
        {
          id: 'mp-' + Date.now() + '-3',
          type: 'dinner',
          title: isVeg
            ? 'Palak Cottage Cheese Curry & Brown Basmati'
            : 'Pan-Seared Salmon & Asparagus Brown Rice',
          calories: isHighProtein ? 580 : 490,
          protein: isHighProtein ? 36 : 30,
          carbs: 52,
          fat: 20,
          prepTime: '30 mins',
          description: isVeg
            ? 'Smooth spinach sauce cooked with garlic, roasted cottage cheese cubes, and fragrant cumin brown rice.'
            : 'Wild-caught salmon fillet seared with dill, garlic asparagus, and fluffy brown basmati.',
          ingredients: isVeg
            ? ['Paneer (150g)', 'Spinach Puree (2 cups)', 'Brown Rice (1 cup cooked)', 'Garlic & Ginger']
            : ['Salmon Fillet (180g)', 'Asparagus Spears (8)', 'Brown Rice (1 cup)', 'Lemon']
        },
        {
          id: 'mp-' + Date.now() + '-4',
          type: 'snacks',
          title: 'Chia Seed Protein Smoothie Bowl & Roasted Seeds',
          calories: 280,
          protein: 20,
          carbs: 30,
          fat: 8,
          prepTime: '5 mins',
          description: 'Blended whey/plant protein with almond milk, topped with chia seeds, pumpkin seeds, and blueberries.',
          ingredients: ['Protein Powder (1 scoop)', 'Almond Milk (250ml)', 'Chia Seeds (1 tbsp)', 'Blueberries']
        }
      ];

      setMealPlan(newPlan);
      setUserProfile((prev) => ({
        ...prev,
        age: Number(formData.age),
        gender: formData.gender,
        height: Number(formData.height),
        weight: Number(formData.weight),
        goal: formData.goal,
        activityLevel: formData.activityLevel,
        dietary: formData.dietary,
        allergies: formData.allergies.split(',').map((s) => s.trim())
      }));

      setIsGenerating(false);
      addToast('Generated new personalized AI Meal Plan!');
    }, 1200);
  };

  const handleDownloadPDF = () => {
    exportMealPlanPDF(mealPlan, userProfile);
    addToast('Downloaded Meal Plan PDF!');
  };

  const handleSavePlan = () => {
    addToast('Meal Plan saved to profile!');
  };

  const totalCalories = mealPlan.reduce((acc, m) => acc + (m.calories || 0), 0);
  const totalProtein = mealPlan.reduce((acc, m) => acc + (m.protein || 0), 0);
  const totalCarbs = mealPlan.reduce((acc, m) => acc + (m.carbs || 0), 0);
  const totalFat = mealPlan.reduce((acc, m) => acc + (m.fat || 0), 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-white flex items-center gap-2">
            <Sparkles className="w-7 h-7 text-emerald-400" /> AI Meal Planner
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Tailor high-protein, calorie-calibrated daily nutrition for your exact body metrics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSavePlan}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm flex items-center gap-2 transition-all"
          >
            <Bookmark className="w-4 h-4 text-emerald-400" /> Save Plan
          </button>
          <button
            onClick={handleDownloadPDF}
            className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/25 transition-transform active:scale-95"
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

          {/* Fitness Goal */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Primary Goal</label>
            <select
              name="goal"
              value={formData.goal}
              onChange={handleInputChange}
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="Muscle Gain">Muscle Gain (Hypertrophy)</option>
              <option value="Weight Loss">Weight Loss (Fat Loss)</option>
              <option value="Maintenance">Maintenance & Tone</option>
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
          <div className="space-y-1.5">
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
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> Analyzing Nutrients & Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" /> Generate AI Meal Plan
              </>
            )}
          </button>
        </div>
      </form>

      {/* Plan Summary Macros Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-panel p-4 text-center">
          <span className="text-[10px] text-slate-400 font-semibold uppercase">Total Calories</span>
          <p className="text-2xl font-bold text-amber-400 font-heading mt-1">{totalCalories} kcal</p>
        </div>
        <div className="glass-panel p-4 text-center">
          <span className="text-[10px] text-slate-400 font-semibold uppercase">Total Protein</span>
          <p className="text-2xl font-bold text-emerald-400 font-heading mt-1">{totalProtein} g</p>
        </div>
        <div className="glass-panel p-4 text-center">
          <span className="text-[10px] text-slate-400 font-semibold uppercase">Total Carbs</span>
          <p className="text-2xl font-bold text-blue-400 font-heading mt-1">{totalCarbs} g</p>
        </div>
        <div className="glass-panel p-4 text-center">
          <span className="text-[10px] text-slate-400 font-semibold uppercase">Total Fat</span>
          <p className="text-2xl font-bold text-purple-400 font-heading mt-1">{totalFat} g</p>
        </div>
      </div>

      {/* Unique AI Time Slot Assigner & Scheduled Meals Grid */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold font-heading text-white flex items-center gap-2">
              📅 Unique AI Daily Meal Schedule & Time Assigner
            </h3>
            <p className="text-xs text-slate-400">
              Assign precise eating times, pre/post workout slots, and automatic alarm reminders for peak metabolic absorption.
            </p>
          </div>
          <span className="px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-extrabold flex items-center gap-1.5">
            ⚡ {mealPlan.length} Scheduled Meals Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mealPlan.map((meal) => (
            <div
              key={meal.id}
              className="glass-panel p-6 space-y-4 hover:border-cyan-500/40 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                {/* Header: Slot Badge & Time Assigner */}
                <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <select
                      value={meal.type || 'lunch'}
                      onChange={(e) => {
                        const newType = e.target.value;
                        setMealPlan((prev) =>
                          prev.map((m) => (m.id === meal.id ? { ...m, type: newType } : m))
                        );
                        addToast(`Re-assigned slot to ${newType.toUpperCase()}`, 'info');
                      }}
                      className="text-xs font-extrabold px-3 py-1 rounded-lg uppercase tracking-wider bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 focus:outline-none cursor-pointer"
                    >
                      <option value="breakfast">🌅 Breakfast</option>
                      <option value="lunch">☀️ Lunch</option>
                      <option value="snack">🍎 Snack</option>
                      <option value="dinner">🌙 Dinner</option>
                      <option value="pre-workout">⚡ Pre-Workout Fuel</option>
                      <option value="post-workout">💪 Post-Workout Recovery</option>
                    </select>
                  </div>

                  {/* Scheduled Time Assigner Input */}
                  <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <input
                      type="text"
                      value={meal.scheduledTime || '01:00 PM'}
                      onChange={(e) => {
                        const newTime = e.target.value;
                        setMealPlan((prev) =>
                          prev.map((m) => (m.id === meal.id ? { ...m, scheduledTime: newTime } : m))
                        );
                      }}
                      placeholder="01:00 PM"
                      className="w-20 bg-transparent text-xs font-bold text-slate-200 focus:outline-none text-right"
                    />
                  </div>
                </div>

                {/* Meal Title & Description */}
                <div>
                  <h4 className="text-base font-bold text-slate-100 font-heading group-hover:text-cyan-400 transition-colors">
                    {meal.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed mt-1">{meal.description}</p>
                </div>

                {/* Key Ingredients */}
                {meal.ingredients && (
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-semibold text-slate-300">Key Ingredients:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {meal.ingredients.map((ing, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300"
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
                    <span className="text-cyan-400">{meal.protein}g Protein</span>
                  </div>
                  <span className="text-slate-400 text-[11px]">⏱️ {meal.prepTime || '15 mins'}</span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      const newReminder = !meal.reminderEnabled;
                      setMealPlan((prev) =>
                        prev.map((m) => (m.id === meal.id ? { ...m, reminderEnabled: newReminder } : m))
                      );
                      addToast(
                        newReminder
                          ? `🔔 Alarm Reminder enabled for ${meal.scheduledTime || '01:00 PM'}!`
                          : `🔕 Reminder disabled.`,
                        newReminder ? 'success' : 'info'
                      );
                    }}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      meal.reminderEnabled
                        ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300'
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
                    className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-extrabold text-xs flex items-center gap-1 shadow-md transition-transform active:scale-95 cursor-pointer"
                  >
                    <CheckCircle className="w-3.5 h-3.5" /> Log Meal
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
