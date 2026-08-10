import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { AI_AVATARS } from '../data/avatars';
import {
  User,
  Scale,
  Ruler,
  Award,
  Heart,
  Edit3,
  LogOut,
  Save,
  CheckCircle2,
  AlertCircle,
  Flame,
  Dumbbell,
  Sparkles,
  ShieldAlert,
  Camera,
  Upload,
  X
} from 'lucide-react';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { userProfile, setUserProfile, calculateBMI, logout, addToast } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const fileInputRef = useRef(null);

  const handleCustomUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const customUrl = ev.target.result;
        setUserProfile((prev) => ({ ...prev, avatar: customUrl }));
        setShowAvatarModal(false);
        addToast('📷 Profile photo updated successfully!', 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectAvatar = (url) => {
    setUserProfile((prev) => ({ ...prev, avatar: url }));
    setShowAvatarModal(false);
    addToast('✨ AI Fitness Avatar assigned!', 'success');
  };

  const [editForm, setEditForm] = useState({
    name: userProfile.name || 'Alex Morgan',
    email: userProfile.email || 'alex.morgan@fitgen.ai',
    age: userProfile.age || 26,
    gender: userProfile.gender || 'Female',
    height: userProfile.height || 172,
    weight: userProfile.weight || 65,
    goal: userProfile.goal || 'Muscle Gain',
    dietary: userProfile.dietary || 'Vegetarian',
    cuisine: userProfile.cuisine || 'Indian',
    nation: userProfile.nation || 'India 🇮🇳',
    cuisineStyle: userProfile.cuisineStyle || 'High-Protein Gym & Bodybuilding',
    fitnessLevel: userProfile.fitnessLevel || 'Advanced Lifter',
    spiceLevel: userProfile.spiceLevel || 'Medium / Balanced',
    mealFrequency: userProfile.mealFrequency || '4-5 Small Meals',
    allergies: userProfile.allergies ? userProfile.allergies.join(', ') : 'Peanuts',
    medicalConditions: userProfile.medicalConditions ? userProfile.medicalConditions.join(', ') : 'None'
  });

  const bmi = calculateBMI(editForm.height, editForm.weight);

  const handleSave = (e) => {
    e.preventDefault();
    setUserProfile((prev) => ({
      ...prev,
      name: editForm.name,
      email: editForm.email,
      age: Number(editForm.age),
      gender: editForm.gender,
      height: Number(editForm.height),
      weight: Number(editForm.weight),
      goal: editForm.goal,
      dietary: editForm.dietary,
      cuisine: editForm.cuisine,
      nation: editForm.nation,
      cuisineStyle: editForm.cuisineStyle,
      fitnessLevel: editForm.fitnessLevel,
      spiceLevel: editForm.spiceLevel,
      mealFrequency: editForm.mealFrequency,
      allergies: editForm.allergies.split(',').map((s) => s.trim()),
      medicalConditions: editForm.medicalConditions.split(',').map((s) => s.trim())
    }));

    setIsEditing(false);
    addToast('Profile updated successfully!');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-white flex items-center gap-2">
            <User className="w-7 h-7 text-emerald-400" /> User Profile & Biometrics
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Manage your personal metrics, dietary rules, medical conditions, and fitness goals.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm flex items-center gap-2 transition-all cursor-pointer"
          >
            <Edit3 className="w-4 h-4 text-emerald-400" />
            {isEditing ? 'Cancel Edit' : 'Edit Profile'}
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/40 font-bold text-sm flex items-center gap-2 transition-all cursor-pointer shadow-md"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Hidden File Input for Custom Upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleCustomUpload}
        className="hidden"
      />

      {/* Avatar Picker Modal */}
      {showAvatarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/40">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white font-heading">Choose Profile Photo / AI Avatar</h2>
                  <p className="text-xs text-slate-400">Upload your own photo or pick from 5 AI Fitness Avatars</p>
                </div>
              </div>
              <button 
                onClick={() => setShowAvatarModal(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              {/* Option 1: Upload Custom Photo */}
              <div>
                <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5 font-heading">
                  <Camera className="w-4 h-4" /> 1. Upload Custom Image File
                </h3>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="p-5 rounded-2xl border-2 border-dashed border-slate-700 hover:border-emerald-400 bg-slate-950/50 hover:bg-slate-950 transition-all cursor-pointer flex items-center justify-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-white">Click to upload photo from your computer/device</p>
                    <p className="text-[11px] text-slate-400">JPG, PNG, WEBP supported</p>
                  </div>
                </div>
              </div>

              {/* Option 2: 5 AI Fitness Avatars */}
              <div>
                <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-3 flex items-center gap-1.5 font-heading">
                  <Sparkles className="w-4 h-4" /> 2. Choose from 5 AI Fitness Avatars
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {AI_AVATARS.map((avatar) => {
                    const isSelected = userProfile.avatar === avatar.url;

                    return (
                      <div
                        key={avatar.id}
                        onClick={() => handleSelectAvatar(avatar.url)}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col items-center text-center relative group ${
                          isSelected
                            ? 'bg-emerald-500/15 border-emerald-500 text-white shadow-lg shadow-emerald-500/10'
                            : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        {isSelected && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 absolute top-2 right-2" />
                        )}
                        <img
                          src={avatar.url}
                          alt={avatar.name}
                          className="w-16 h-16 rounded-full object-cover border border-white/20 mb-2 group-hover:scale-105 transition-transform"
                        />
                        <h4 className="font-bold text-[11px] text-white leading-tight">{avatar.name}</h4>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Profile & BMI Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Avatar & BMI Gauge Card */}
        <div className="glass-panel p-6 space-y-6 flex flex-col items-center text-center">
          <div className="relative group cursor-pointer" onClick={() => setShowAvatarModal(true)}>
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              className="w-28 h-28 rounded-full object-cover border-4 border-emerald-500/40 shadow-2xl group-hover:opacity-90 transition-opacity"
            />
            <button
              type="button"
              className="absolute bottom-1 right-1 p-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 border-2 border-slate-950 shadow-lg transition-transform group-hover:scale-110"
              title="Change Profile Photo / Select AI Avatar"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>

          <div>
            <h2 className="text-xl font-bold font-heading text-white">{userProfile.name}</h2>
            <p className="text-xs text-slate-400 mt-0.5">{userProfile.email}</p>
            <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              {userProfile.goal} Plan
            </span>
          </div>

          {/* BMI Gauge Card */}
          <div className="w-full p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
              <span>Body Mass Index (BMI)</span>
              <Scale className="w-4 h-4 text-emerald-400" />
            </div>

            <div className="flex items-baseline justify-center gap-2">
              <span className="text-3xl font-extrabold font-heading" style={{ color: bmi.color }}>
                {bmi.score}
              </span>
              <span
                className="text-xs font-bold px-2.5 py-0.5 rounded-md"
                style={{ backgroundColor: `${bmi.color}20`, color: bmi.color }}
              >
                {bmi.status}
              </span>
            </div>

            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (Number(bmi.score) / 40) * 100)}%`, backgroundColor: bmi.color }}
              />
            </div>

            <p className="text-[11px] text-slate-400 leading-tight">
              Optimal BMI range for target goal is 18.5 - 24.9.
            </p>
          </div>

          {/* Daily Goal Quick Overview */}
          <div className="w-full p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 text-left">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Daily Target Split</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <span className="text-slate-400 block text-[10px]">Calories</span>
                <span className="font-bold text-emerald-400">{userProfile.dailyCalorieBudget} kcal</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <span className="text-slate-400 block text-[10px]">Protein</span>
                <span className="font-bold text-blue-400">{userProfile.dailyProteinGoal}g</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Editable Profile Details (2 cols) */}
        <div className="lg:col-span-2 glass-panel p-6 sm:p-8">
          <h3 className="text-lg font-bold font-heading text-white mb-6 flex items-center gap-2">
            <Ruler className="w-5 h-5 text-emerald-400" /> Biometrics & Dietary Settings
          </h3>

          {isEditing ? (
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300">Full Name</label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-emerald-500 mt-1"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300">Email Address</label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-emerald-500 mt-1"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300">Age</label>
                  <input
                    type="number"
                    value={editForm.age}
                    onChange={(e) => setEditForm({ ...editForm, age: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-emerald-500 mt-1"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300">Gender</label>
                  <select
                    value={editForm.gender}
                    onChange={(e) => setEditForm({ ...editForm, gender: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-emerald-500 mt-1"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300">Height (cm)</label>
                  <input
                    type="number"
                    value={editForm.height}
                    onChange={(e) => setEditForm({ ...editForm, height: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-emerald-500 mt-1"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300">Weight (kg)</label>
                  <input
                    type="number"
                    value={editForm.weight}
                    onChange={(e) => setEditForm({ ...editForm, weight: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-emerald-500 mt-1"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300">Fitness Goal</label>
                  <select
                    value={editForm.goal}
                    onChange={(e) => setEditForm({ ...editForm, goal: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-emerald-500 mt-1"
                  >
                    <option value="Muscle Gain">Muscle Gain</option>
                    <option value="6-Pack Abs">6-Pack Abs & Core Shred (Boy & Girl)</option>
                    <option value="Weight Loss">Weight Loss</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300">Nation / Country</label>
                  <select
                    value={editForm.nation}
                    onChange={(e) => setEditForm({ ...editForm, nation: e.target.value, cuisine: e.target.value.includes('India') ? 'Indian' : e.target.value.includes('USA') ? 'Western' : 'All' })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-emerald-500 mt-1"
                  >
                    <option value="India 🇮🇳">India 🇮🇳</option>
                    <option value="USA 🇺🇸">United States 🇺🇸</option>
                    <option value="Italy 🇮🇹">Italy & Mediterranean 🇮🇹</option>
                    <option value="Japan 🇯🇵">Japan & East Asia 🇯🇵</option>
                    <option value="Mexico 🇲🇽">Mexico & Latin America 🇲🇽</option>
                    <option value="Middle East 🇱🇧">Middle East & Arabia 🇱🇧</option>
                    <option value="Thailand 🇹🇭">Thailand & SE Asia 🇹🇭</option>
                    <option value="Global 🌍">Global Fusion 🌍</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300">Cooking & Meal Style</label>
                  <select
                    value={editForm.cuisineStyle}
                    onChange={(e) => setEditForm({ ...editForm, cuisineStyle: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-emerald-500 mt-1"
                  >
                    <option value="High-Protein Gym & Bodybuilding">🏋️ High-Protein Gym</option>
                    <option value="Traditional Home-Cooked">🍛 Authentic Home-Cooked</option>
                    <option value="Low-Carb Keto">🥑 Low-Carb Keto</option>
                    <option value="Spicy Street Food">🌶️ Spicy Street Food</option>
                    <option value="Organic Whole Foods">🧘 Clean Whole Foods</option>
                    <option value="Quick 15-Min Prep">⏱️ Quick 15-Min Prep</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300">Training Level</label>
                  <select
                    value={editForm.fitnessLevel}
                    onChange={(e) => setEditForm({ ...editForm, fitnessLevel: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-emerald-500 mt-1"
                  >
                    <option value="Beginner">🔰 Beginner</option>
                    <option value="Advanced Lifter">🏋️ Advanced Lifter</option>
                    <option value="Endurance Athlete">🏃 Endurance Athlete</option>
                    <option value="Wellness">🧘 Active Wellness</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300">Spice Tolerance</label>
                  <select
                    value={editForm.spiceLevel}
                    onChange={(e) => setEditForm({ ...editForm, spiceLevel: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-emerald-500 mt-1"
                  >
                    <option value="Mild">🌿 Mild / Gentle</option>
                    <option value="Medium / Balanced">🌶️ Medium / Balanced</option>
                    <option value="Hot & Spicy">🌶️🌶️ Hot & Spicy</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300">Dietary Preference</label>
                  <select
                    value={editForm.dietary}
                    onChange={(e) => setEditForm({ ...editForm, dietary: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-emerald-500 mt-1"
                  >
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Non-Vegetarian">Non-Vegetarian</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Eggetarian">Eggetarian</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300">Allergies (comma separated)</label>
                  <input
                    type="text"
                    value={editForm.allergies}
                    onChange={(e) => setEditForm({ ...editForm, allergies: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-emerald-500 mt-1"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300">Medical Conditions</label>
                  <input
                    type="text"
                    value={editForm.medicalConditions}
                    onChange={(e) => setEditForm({ ...editForm, medicalConditions: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-emerald-500 mt-1"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" /> Save Profile
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
                  <span className="text-xs text-slate-400 font-semibold uppercase">Height</span>
                  <p className="text-base font-bold text-slate-200 font-heading">{userProfile.height} cm</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
                  <span className="text-xs text-slate-400 font-semibold uppercase">Weight</span>
                  <p className="text-base font-bold text-slate-200 font-heading">{userProfile.weight} kg</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
                  <span className="text-xs text-slate-400 font-semibold uppercase">Age & Gender</span>
                  <p className="text-base font-bold text-slate-200 font-heading">
                    {userProfile.age} yrs • {userProfile.gender}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
                  <span className="text-xs text-slate-400 font-semibold uppercase">Activity Level</span>
                  <p className="text-base font-bold text-slate-200 font-heading">{userProfile.activityLevel}</p>
                </div>
              </div>

              {/* Assigned Nation & Style Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-emerald-500/30">
                  <span className="text-xs text-emerald-400 font-semibold uppercase">Nation / Country</span>
                  <p className="text-base font-bold text-white font-heading mt-0.5">{userProfile.nation || 'India 🇮🇳'}</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-blue-500/30">
                  <span className="text-xs text-blue-400 font-semibold uppercase">Culinary Style</span>
                  <p className="text-base font-bold text-white font-heading mt-0.5">{userProfile.cuisineStyle || 'High-Protein Gym'}</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-purple-500/30">
                  <span className="text-xs text-purple-400 font-semibold uppercase">Training Level</span>
                  <p className="text-base font-bold text-white font-heading mt-0.5">{userProfile.fitnessLevel || 'Advanced Lifter'}</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-amber-500/30">
                  <span className="text-xs text-amber-400 font-semibold uppercase">Spice Level</span>
                  <p className="text-base font-bold text-white font-heading mt-0.5">{userProfile.spiceLevel || 'Medium / Balanced'}</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-teal-500/30">
                  <span className="text-xs text-teal-400 font-semibold uppercase">Meal Schedule</span>
                  <p className="text-base font-bold text-white font-heading mt-0.5">{userProfile.mealFrequency || '4-5 Small Meals'}</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-rose-500/30">
                  <span className="text-xs text-rose-400 font-semibold uppercase">Dietary Type</span>
                  <p className="text-base font-bold text-white font-heading mt-0.5">{userProfile.dietary}</p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Allergies</h4>
                <div className="flex flex-wrap gap-2">
                  {userProfile.allergies && userProfile.allergies.length > 0 ? (
                    userProfile.allergies.map((alg, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-xl text-xs font-semibold bg-rose-500/15 text-rose-300 border border-rose-500/30 flex items-center gap-1.5"
                      >
                        <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                        {alg}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-400">None reported</span>
                  )}
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Medical Conditions</h4>
                <div className="flex flex-wrap gap-2">
                  {userProfile.medicalConditions && userProfile.medicalConditions.length > 0 ? (
                    userProfile.medicalConditions.map((med, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-xl text-xs font-semibold bg-blue-500/15 text-blue-300 border border-blue-500/30 flex items-center gap-1.5"
                      >
                        <Heart className="w-3.5 h-3.5 text-blue-400" />
                        {med}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-400">None reported</span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
