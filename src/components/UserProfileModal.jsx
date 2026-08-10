import React, { useState } from 'react';
import { X, Check, Globe, Dumbbell, ShieldAlert, Sparkles, HeartPulse, Flame } from 'lucide-react';

export default function UserProfileModal({ isOpen, onClose, userProfile, onSaveProfile }) {
  if (!isOpen) return null;

  const [cuisine, setCuisine] = useState(userProfile.cuisine || 'Indian');
  const [goal, setGoal] = useState(userProfile.goal || 'Muscle Gain');
  const [workout, setWorkout] = useState(userProfile.workout || 'Strength Training High-Protein');
  const [dietary, setDietary] = useState(userProfile.dietary || 'Vegetarian');
  const [allergies, setAllergies] = useState(userProfile.allergies || []);

  const toggleAllergy = (item) => {
    if (allergies.includes(item)) {
      setAllergies(allergies.filter(a => a !== item));
    } else {
      setAllergies([...allergies, item]);
    }
  };

  const handleSave = () => {
    onSaveProfile({
      cuisine,
      goal,
      workout,
      dietary,
      allergies
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/40">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-heading">FitGen AI Preferences</h2>
              <p className="text-xs text-slate-400">Tailor cuisine, fitness goals, and dietary filters</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">

          {/* 1. Cuisine Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-1.5">
              <Globe className="w-4 h-4" /> 1. Food Cuisine Preference
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'Indian', label: 'Indian Cuisine', flag: '🇮🇳', desc: 'Curries, Paneer, Dosa, Chole, Spices' },
                { id: 'Western', label: 'Western Cuisine', flag: '🥗', desc: 'Salads, Salmon, Toast, Steaks, Quinoa' },
                { id: 'All', label: 'All / Fusion', flag: '🌐', desc: 'Mix Indian & Western recommendations' }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCuisine(item.id)}
                  className={`p-3.5 rounded-xl text-left border transition-all flex flex-col justify-between ${
                    cuisine === item.id
                      ? 'bg-emerald-500/15 border-emerald-500 text-white shadow-md shadow-emerald-500/10'
                      : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xl">{item.flag}</span>
                    {cuisine === item.id && <Check className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-slate-200">{item.label}</div>
                    <div className="text-[11px] text-slate-400 leading-tight mt-0.5">{item.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Fitness Goal */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-1.5">
              <Flame className="w-4 h-4" /> 2. Fitness & Body Goal
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { id: '6-Pack Abs', label: '6-Pack Abs', icon: '⚡', desc: 'Boy & Girl Core Shred' },
                { id: 'Weight Loss', label: 'Weight Loss', icon: '🔥', desc: 'Caloric deficit, high fiber' },
                { id: 'Muscle Gain', label: 'Muscle Gain', icon: '💪', desc: 'High protein focus' },
                { id: 'Maintenance', label: 'Maintenance', icon: '⚖️', desc: 'Balanced macros' }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setGoal(item.id)}
                  className={`p-3 rounded-xl text-center border transition-all ${
                    goal === item.id
                      ? 'bg-emerald-500/15 border-emerald-500 text-white'
                      : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="text-lg mb-1">{item.icon}</div>
                  <div className="font-bold text-xs text-slate-200">{item.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Workout Routine */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-1.5">
              <Dumbbell className="w-4 h-4" /> 3. Current Workout Routine
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { id: 'Strength Training High-Protein', label: 'Heavy Strength / Weight Lifting', desc: 'Needs ~35g-50g protein post-workout' },
                { id: 'HIIT Post-Workout', label: 'HIIT / High Intensity Interval', desc: 'Requires quick energy replenishment' },
                { id: 'Cardio Recovery', label: 'Cardio & Running', desc: 'High fiber and clean hydration' },
                { id: 'Yoga Light Fuel', label: 'Yoga & Pilates', desc: 'Light, nutrient-dense meals' }
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setWorkout(item.id)}
                  className={`p-3 rounded-xl text-left border transition-all ${
                    workout === item.id
                      ? 'bg-emerald-500/15 border-emerald-500 text-white'
                      : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="font-bold text-xs text-slate-200">{item.label}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 4. Dietary Choice */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-1.5">
              <HeartPulse className="w-4 h-4" /> 4. Dietary Preference
            </label>
            <div className="grid grid-cols-4 gap-2">
              {['Vegetarian', 'Non-Vegetarian', 'Vegan', 'Eggetarian'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setDietary(type)}
                  className={`py-2 px-3 rounded-xl text-center text-xs font-semibold border transition-all ${
                    dietary === type
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                      : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* 5. Medical Conditions / Allergies */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4" /> 5. Allergies & Medical Restrictions
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'Gluten-Free', label: '🌾 Gluten-Free' },
                { id: 'Dairy-Free', label: '🥛 Dairy-Free' },
                { id: 'Nut-Free', label: '🥜 Nut Allergy' },
                { id: 'Low Sodium', label: '🧂 Low Sodium' },
                { id: 'Diabetic-Friendly', label: '🩸 Diabetic-Friendly' }
              ].map((item) => {
                const active = allergies.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleAllergy(item.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      active
                        ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                        : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-slate-400 hover:text-white transition-all text-xs font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all"
          >
            Save & Update Recommendations
          </button>
        </div>

      </div>
    </div>
  );
}
