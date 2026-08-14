import React, { useState, useRef, useEffect } from 'react';
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
  Upload,
  Check,
  Plus,
  X,
  Edit3
} from 'lucide-react';

const FITNESS_GOALS = [
  { id: 'Muscle Gain', label: '🏋️ Muscle Gain', desc: 'Build lean muscle mass & maximize hypertrophy with high protein' },
  { id: 'Fat Loss', label: '🔥 Fat Loss', desc: 'Burn body fat while preserving lean muscle in calorie deficit' },
  { id: 'Weight Loss', label: '📉 Weight Loss', desc: 'Sustainable calorie deficit for steady healthy weight reduction' },
  { id: 'Weight Gain', label: '📈 Weight Gain', desc: 'Calorie surplus with clean whole food calories for healthy weight gain' },
  { id: 'Body Recomposition', label: '⚡ Body Recomposition', desc: 'Simultaneously build muscle and burn fat at maintenance calories' },
  { id: 'Maintenance', label: '⚖️ Maintenance', desc: 'Maintain current body composition & energy levels' },
  { id: 'General Fitness', label: '🧘 General Fitness', desc: 'Overall longevity, gut health & everyday vital energy' },
  { id: 'Strength', label: '💪 Pure Strength', desc: 'Maximize powerlifting & heavy compound lift performance' },
  { id: 'Endurance', label: '🏃 Endurance', desc: 'Stamina, cardiovascular capacity & marathon/HIIT fuel' }
];

const ACTIVITY_LEVELS = [
  { id: 'Sedentary', label: '🪑 Sedentary', desc: 'Desk job, little to no regular workout' },
  { id: 'Lightly Active', label: '🚶 Lightly Active', desc: '1-3 light workouts per week or active walking' },
  { id: 'Moderately Active', label: '🏋️ Moderately Active', desc: '3-4 moderate gym sessions per week' },
  { id: 'Active', label: '🔥 Active', desc: '4-5 intensive workouts per week' },
  { id: 'Very Active', label: '⚡ Very Active', desc: '6-7 heavy workouts/day double sessions' }
];

const DIETARY_CHOICES = [
  { id: 'Vegetarian', label: '🥗 Vegetarian', desc: 'Paneer, lentils, soya, dairy, fruits & vegetables' },
  { id: 'Vegan', label: '🌿 Vegan', desc: '100% Plant-Based: Tofu, soya, legumes, nuts & seeds' },
  { id: 'Eggetarian', label: '🥚 Eggetarian', desc: 'Eggs + vegetarian dairy, grains & veggies' },
  { id: 'Non-Vegetarian', label: '🍗 Non-Vegetarian', desc: 'Chicken, fish, eggs, mutton, meats & dairy' },
  { id: 'Pescatarian', label: '🐟 Pescatarian', desc: 'Fish, seafood + plant foods & dairy' },
  { id: 'Jain', label: '🧘 Jain Vegetarian', desc: 'Pure vegetarian excluding root vegetables (onion, garlic, potato)' },
  { id: 'Other', label: '🍽️ Custom / Other', desc: 'Tailored dietary split' }
];

const ALLERGY_OPTIONS = [
  'Peanuts', 'Tree nuts', 'Dairy', 'Gluten', 'Soy', 'Eggs', 'Seafood', 'Shellfish', 'Sesame'
];

const REGIONS_LIST = [
  { id: 'India 🇮🇳', name: 'India', flag: '🇮🇳' },
  { id: 'USA 🇺🇸', name: 'United States', flag: '🇺🇸' },
  { id: 'Italy 🇮🇹', name: 'Italy & Mediterranean', flag: '🇮🇹' },
  { id: 'Japan 🇯🇵', name: 'Japan & East Asia', flag: '🇯🇵' },
  { id: 'Mexico 🇲🇽', name: 'Mexico & Latin America', flag: '🇲🇽' },
  { id: 'Middle East 🇱🇧', name: 'Middle East & Arabia', flag: '🇱🇧' },
  { id: 'Global 🌍', name: 'Global Fusion', flag: '🌍' }
];

const CUISINES_LIST = [
  'Indian', 'North Indian', 'South Indian', 'Punjabi', 'Gujarati', 'Bengali', 'Maharashtrian',
  'Tamil', 'Kerala', 'Mediterranean', 'Mexican', 'American', 'Chinese', 'Japanese', 'Korean', 'Middle Eastern'
];

export default function GoalSelectionPage() {
  const navigate = useNavigate();
  const { isAuthenticated, setUserProfile, userProfile, addToast } = useApp();
  const fileInputRef = useRef(null);

  const [step, setStep] = useState(1); // 1: Personal | 2: Fitness | 3: Dietary & Exclusions | 4: Region & Cuisine | 5: Summary & Targets

  // Step 1: Personal Info & Units
  const [unitSystem, setUnitSystem] = useState('metric'); // 'metric' (kg, cm) or 'imperial' (lbs, ft+in)
  const [fullName, setFullName] = useState(userProfile.name || '');
  const [age, setAge] = useState(userProfile.age || 26);
  const [sex, setSex] = useState(userProfile.gender || 'Female');
  const [heightCm, setHeightCm] = useState(userProfile.height || 172);
  const [weightKg, setWeightKg] = useState(userProfile.weight || 65);
  const [feet, setFeet] = useState(5);
  const [inches, setInches] = useState(8);
  const [weightLbs, setWeightLbs] = useState(143);

  // Step 2: Fitness Goal & Activity
  const [selectedGoal, setSelectedGoal] = useState(userProfile.goal || 'Muscle Gain');
  const [activityLevel, setActivityLevel] = useState(userProfile.activityLevel || 'Active');
  const [workoutsPerWeek, setWorkoutsPerWeek] = useState(4);
  const [workoutDuration, setWorkoutDuration] = useState('45-60 mins');
  const [workoutType, setWorkoutType] = useState('Strength & Hypertrophy');
  const [targetWeight, setTargetWeight] = useState(userProfile.weight || 65);

  // Step 3: Dietary Profile & Exclusions
  const [selectedDietary, setSelectedDietary] = useState(userProfile.dietary || 'Vegetarian');
  const [selectedAllergies, setSelectedAllergies] = useState(userProfile.allergies || ['Peanuts']);
  const [customAllergyInput, setCustomAllergyInput] = useState('');

  // Step 4: Region & Cuisine
  const [selectedRegion, setSelectedRegion] = useState(userProfile.nation || 'India 🇮🇳');
  const [selectedCuisines, setSelectedCuisines] = useState(
    Array.isArray(userProfile.cuisines) ? userProfile.cuisines : ['Indian', 'North Indian', 'Punjabi']
  );

  // Step 5: Nutrition Target Overrides
  const [calcCalories, setCalcCalories] = useState(2200);
  const [calcProtein, setCalcProtein] = useState(130);
  const [calcCarbs, setCalcCarbs] = useState(240);
  const [calcFat, setCalcFat] = useState(65);
  const [calcWater, setCalcWater] = useState(3000);
  const [isEditingTargets, setIsEditingTargets] = useState(false);

  const [selectedAvatar, setSelectedAvatar] = useState(userProfile.avatar || AI_AVATARS[0].url);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync Unit Conversion
  useEffect(() => {
    if (unitSystem === 'metric') {
      const convertedCm = Math.round((feet * 12 + inches) * 2.54);
      const convertedKg = Math.round(weightLbs * 0.453592);
      if (convertedCm > 0) setHeightCm(convertedCm);
      if (convertedKg > 0) setWeightKg(convertedKg);
    } else {
      const totalInches = Math.round(heightCm / 2.54);
      setFeet(Math.floor(totalInches / 12));
      setInches(totalInches % 12);
      setWeightLbs(Math.round(weightKg * 2.20462));
    }
  }, [unitSystem]);

  // Recalculate Nutrition Targets based on BMR / TDEE
  useEffect(() => {
    const wKg = unitSystem === 'metric' ? weightKg : weightLbs * 0.453592;
    const hCm = unitSystem === 'metric' ? heightCm : (feet * 12 + inches) * 2.54;

    // BMR formula (Mifflin-St Jeor)
    let bmr = 10 * wKg + 6.25 * hCm - 5 * age;
    bmr += sex === 'Female' ? -161 : 5;

    // Activity multiplier
    let actMult = 1.375;
    if (activityLevel.includes('Sedentary')) actMult = 1.2;
    if (activityLevel.includes('Lightly')) actMult = 1.375;
    if (activityLevel.includes('Moderately')) actMult = 1.55;
    if (activityLevel.includes('Very')) actMult = 1.9;
    if (activityLevel.includes('Active') && !activityLevel.includes('Moderately')) actMult = 1.725;

    let tdee = Math.round(bmr * actMult);

    // Goal adjustment
    if (selectedGoal.includes('Fat Loss') || selectedGoal.includes('Weight Loss')) tdee -= 400;
    else if (selectedGoal.includes('Muscle Gain') || selectedGoal.includes('Weight Gain')) tdee += 350;
    else if (selectedGoal.includes('Body Recomposition')) tdee -= 150;

    const calories = Math.max(1200, Math.round(tdee));

    // Protein Target (1.8g - 2.2g per kg)
    let pFactor = selectedGoal.includes('Muscle Gain') ? 2.0 : 1.8;
    const protein = Math.round(wKg * pFactor);

    // Fats ~ 25% of total calories
    const fat = Math.round((calories * 0.25) / 9);

    // Carbs ~ remaining calories
    const carbs = Math.max(50, Math.round((calories - (protein * 4 + fat * 9)) / 4));

    // Water ~ 35ml per kg bodyweight
    const water = Math.round(wKg * 35 + 500);

    setCalcCalories(calories);
    setCalcProtein(protein);
    setCalcCarbs(carbs);
    setCalcFat(fat);
    setCalcWater(water);
  }, [weightKg, weightLbs, heightCm, feet, inches, age, sex, activityLevel, selectedGoal, unitSystem]);

  // Strict route protection
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleToggleAllergy = (allergy) => {
    setSelectedAllergies((prev) =>
      prev.includes(allergy) ? prev.filter((a) => a !== allergy) : [...prev, allergy]
    );
  };

  const handleAddCustomAllergy = () => {
    if (customAllergyInput.trim()) {
      const clean = customAllergyInput.trim();
      if (!selectedAllergies.includes(clean)) {
        setSelectedAllergies((prev) => [...prev, clean]);
      }
      setCustomAllergyInput('');
    }
  };

  const handleToggleCuisine = (cuisine) => {
    setSelectedCuisines((prev) =>
      prev.includes(cuisine) ? prev.filter((c) => c !== cuisine) : [...prev, cuisine]
    );
  };

  const handleNextStep = () => {
    if (step < 5) {
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

    const finalProfile = {
      ...userProfile,
      name: fullName.trim() || userProfile.name || 'Athlete',
      age: Number(age),
      gender: sex,
      height: Number(heightCm),
      weight: Number(weightKg),
      goal: selectedGoal,
      activityLevel: activityLevel,
      workoutsPerWeek: workoutsPerWeek,
      workoutDuration: workoutDuration,
      workoutType: workoutType,
      targetWeight: targetWeight,
      dietary: selectedDietary,
      allergies: selectedAllergies,
      nation: selectedRegion,
      cuisines: selectedCuisines,
      cuisine: selectedCuisines[0] || 'Indian',
      avatar: selectedAvatar,
      dailyCalorieBudget: calcCalories,
      dailyProteinGoal: calcProtein,
      dailyCarbsGoal: calcCarbs,
      dailyFatGoal: calcFat,
      dailyWaterGoal: calcWater,
      hasCompletedProfile: true
    };

    setTimeout(() => {
      setUserProfile(finalProfile);
      localStorage.setItem(`fitgen_profile_${finalProfile.email.toLowerCase()}`, JSON.stringify(finalProfile));
      setIsSubmitting(false);
      addToast('✨ FitGen AI Profile created & target macros locked!', 'success');
      navigate('/dashboard');
    }, 800);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between p-4 md:p-8 overflow-x-hidden bg-[#0A0A0A] text-slate-100">
      {/* Background Glows */}
      <div className="particle-glow w-[36rem] h-[36rem] bg-[#39FF14]/15 top-[-15%] left-[-10%] animate-pulse" />
      <div className="particle-glow w-[36rem] h-[36rem] bg-[#00CFFF]/15 bottom-[-15%] right-[-10%] animate-pulse" style={{ animationDelay: '3s' }} />

      {/* Header Container */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center pt-2">
        <div className="flex items-center gap-2 mb-2">
          <img src="/assets/fitgen_logo.png" alt="FitGen Logo" className="w-12 h-12 rounded-xl object-cover border border-white/20 shadow-lg" />
          <span className="text-2xl font-extrabold font-heading text-white">FIT<span className="text-[#39FF14]">GEN</span> <span className="text-xs text-[#00CFFF] px-2 py-0.5 rounded-full bg-[#00CFFF]/10 border border-[#00CFFF]/30">AI SETUP</span></span>
        </div>

        {/* Step Progress Bar */}
        <div className="w-full max-w-2xl bg-slate-900/90 border border-white/10 p-2 rounded-2xl mb-6 flex items-center justify-between gap-1 shadow-xl overflow-x-auto scrollbar-none">
          {[
            { num: 1, title: '1. Personal' },
            { num: 2, title: '2. Fitness Goal' },
            { num: 3, title: '3. Diet & Allergies' },
            { num: 4, title: '4. Region & Cuisine' },
            { num: 5, title: '5. Summary' }
          ].map((item) => {
            const isActive = step === item.num;
            const isCompleted = step > item.num;

            return (
              <div
                key={item.num}
                onClick={() => isCompleted && setStep(item.num)}
                className={`flex-1 py-2 px-2.5 rounded-xl flex items-center justify-center gap-1 text-[11px] sm:text-xs font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#39FF14] text-slate-950 shadow-md shadow-[#39FF14]/20 font-extrabold'
                    : isCompleted
                    ? 'bg-slate-800 text-emerald-400 cursor-pointer hover:bg-slate-700'
                    : 'text-slate-500'
                }`}
              >
                <span>{item.title}</span>
                {isCompleted && <CheckCircle2 className="w-3.5 h-3.5" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Glass Form Container */}
      <div className="relative z-10 w-full max-w-3xl mx-auto glass-card p-6 md:p-8 rounded-[24px] shadow-2xl border border-white/10 mb-8 animate-fadeIn">
        
        {/* STEP 1: PERSONAL INFORMATION & UNITS */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center max-w-xl mx-auto">
              <h2 className="text-2xl font-extrabold font-heading text-white">Personal Biometrics</h2>
              <p className="text-xs text-slate-400 mt-1">Let FitGen AI calculate your base BMR and daily caloric maintenance.</p>
            </div>

            {/* Units Toggle */}
            <div className="flex justify-center">
              <div className="bg-slate-900 p-1 rounded-xl border border-white/10 flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setUnitSystem('metric')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${unitSystem === 'metric' ? 'bg-[#39FF14] text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'}`}
                >
                  Metric (kg, cm)
                </button>
                <button
                  type="button"
                  onClick={() => setUnitSystem('imperial')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${unitSystem === 'imperial' ? 'bg-[#39FF14] text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'}`}
                >
                  Imperial (lb, ft/in)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Mahadev"
                  className="w-full px-4 py-2.5 glass-input text-sm text-white rounded-xl focus:ring-2 focus:ring-[#39FF14]/50"
                />
              </div>

              {/* Age */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Age (Years)</label>
                <input
                  type="number"
                  min="12"
                  max="100"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full px-4 py-2.5 glass-input text-sm text-white rounded-xl focus:ring-2 focus:ring-[#39FF14]/50"
                />
              </div>

              {/* Sex / Gender */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Biological Sex</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Female', 'Male', 'Other'].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setSex(g)}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all ${sex === g ? 'bg-[#00CFFF]/20 border-[#00CFFF] text-[#00CFFF]' : 'bg-slate-900/60 border-white/10 text-slate-400 hover:border-white/20'}`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Height */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Height {unitSystem === 'metric' ? '(cm)' : '(ft / in)'}
                </label>
                {unitSystem === 'metric' ? (
                  <input
                    type="number"
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    className="w-full px-4 py-2.5 glass-input text-sm text-white rounded-xl focus:ring-2 focus:ring-[#39FF14]/50"
                  />
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Feet"
                      value={feet}
                      onChange={(e) => setFeet(Number(e.target.value))}
                      className="w-1/2 px-3 py-2.5 glass-input text-sm text-white rounded-xl"
                    />
                    <input
                      type="number"
                      placeholder="Inches"
                      value={inches}
                      onChange={(e) => setInches(Number(e.target.value))}
                      className="w-1/2 px-3 py-2.5 glass-input text-sm text-white rounded-xl"
                    />
                  </div>
                )}
              </div>

              {/* Weight */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Current Weight {unitSystem === 'metric' ? '(kg)' : '(lbs)'}
                </label>
                <input
                  type="number"
                  value={unitSystem === 'metric' ? weightKg : weightLbs}
                  onChange={(e) => unitSystem === 'metric' ? setWeightKg(Number(e.target.value)) : setWeightLbs(Number(e.target.value))}
                  className="w-full px-4 py-2.5 glass-input text-sm text-white rounded-xl focus:ring-2 focus:ring-[#39FF14]/50"
                />
              </div>

              {/* Target Weight */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Target Weight (kg)</label>
                <input
                  type="number"
                  value={targetWeight}
                  onChange={(e) => setTargetWeight(Number(e.target.value))}
                  className="w-full px-4 py-2.5 glass-input text-sm text-white rounded-xl focus:ring-2 focus:ring-[#39FF14]/50"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: FITNESS GOAL & ACTIVITY */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center max-w-xl mx-auto">
              <h2 className="text-2xl font-extrabold font-heading text-white">Fitness Goal & Routine</h2>
              <p className="text-xs text-slate-400 mt-1">FitGen AI tailors macro splits (protein/carbs/fat) specifically to your body objective.</p>
            </div>

            {/* Primary Goal */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">Primary Fitness Goal</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {FITNESS_GOALS.map((g) => {
                  const isSelected = selectedGoal === g.id;
                  return (
                    <div
                      key={g.id}
                      onClick={() => setSelectedGoal(g.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#39FF14]/15 border-[#39FF14] text-white shadow-lg shadow-[#39FF14]/10'
                          : 'bg-slate-900/60 border-white/10 hover:border-white/20 text-slate-300'
                      }`}
                    >
                      <div className="font-bold text-sm">{g.label}</div>
                      <div className="text-[11px] text-slate-400 mt-1 leading-snug">{g.desc}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Activity Level */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">Activity Level</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {ACTIVITY_LEVELS.map((act) => {
                  const isSelected = activityLevel.includes(act.id);
                  return (
                    <div
                      key={act.id}
                      onClick={() => setActivityLevel(act.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#00CFFF]/15 border-[#00CFFF] text-white'
                          : 'bg-slate-900/60 border-white/10 hover:border-white/20 text-slate-300'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-xs">{act.label}</div>
                        <div className="text-[10px] text-slate-400">{act.desc}</div>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-[#00CFFF]" />}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Workout Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Workouts / Week</label>
                <select
                  value={workoutsPerWeek}
                  onChange={(e) => setWorkoutsPerWeek(Number(e.target.value))}
                  className="w-full px-3 py-2 glass-input text-xs text-white rounded-xl"
                >
                  <option value={2} className="bg-slate-900">2 Days / Week</option>
                  <option value={3} className="bg-slate-900">3 Days / Week</option>
                  <option value={4} className="bg-slate-900">4 Days / Week</option>
                  <option value={5} className="bg-slate-900">5 Days / Week</option>
                  <option value={6} className="bg-slate-900">6 Days / Week</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Session Duration</label>
                <select
                  value={workoutDuration}
                  onChange={(e) => setWorkoutDuration(e.target.value)}
                  className="w-full px-3 py-2 glass-input text-xs text-white rounded-xl"
                >
                  <option value="30 mins" className="bg-slate-900">30 mins</option>
                  <option value="45-60 mins" className="bg-slate-900">45-60 mins</option>
                  <option value="60-90 mins" className="bg-slate-900">60-90 mins</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Workout Type</label>
                <select
                  value={workoutType}
                  onChange={(e) => setWorkoutType(e.target.value)}
                  className="w-full px-3 py-2 glass-input text-xs text-white rounded-xl"
                >
                  <option value="Strength & Hypertrophy" className="bg-slate-900">Strength & Weightlifting</option>
                  <option value="Cardio & Running" className="bg-slate-900">Cardio & Running</option>
                  <option value="Crossfit & HIIT" className="bg-slate-900">Crossfit & HIIT</option>
                  <option value="Yoga & Mobility" className="bg-slate-900">Yoga & Mobility</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: DIETARY PROFILE & ALLERGY EXCLUSIONS */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center max-w-xl mx-auto">
              <h2 className="text-2xl font-extrabold font-heading text-white">Dietary & Allergy Restrictions</h2>
              <p className="text-xs text-slate-400 mt-1">
                <span className="text-[#FF5722] font-bold">HARD RESTRICTION RULE:</span> FitGen AI will NEVER suggest foods or ingredients that conflict with these choices.
              </p>
            </div>

            {/* Diet Choice */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">Dietary Preference</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {DIETARY_CHOICES.map((d) => {
                  const isSelected = selectedDietary === d.id;
                  return (
                    <div
                      key={d.id}
                      onClick={() => setSelectedDietary(d.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#39FF14]/15 border-[#39FF14] text-white shadow-md'
                          : 'bg-slate-900/60 border-white/10 hover:border-white/20 text-slate-300'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-xs">{d.label}</div>
                        <div className="text-[10px] text-slate-400">{d.desc}</div>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-[#39FF14]" />}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Allergies & Exclusions */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">
                Allergies & Food Exclusions (Hard Exclusions)
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {ALLERGY_OPTIONS.map((allergy) => {
                  const isSelected = selectedAllergies.includes(allergy);
                  return (
                    <button
                      key={allergy}
                      type="button"
                      onClick={() => handleToggleAllergy(allergy)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                          : 'bg-slate-900 border-white/10 text-slate-400 hover:border-white/20'
                      }`}
                    >
                      <span>{allergy}</span>
                      {isSelected && <X className="w-3 h-3 text-rose-400" />}
                    </button>
                  );
                })}
              </div>

              {/* Add Custom Allergy */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customAllergyInput}
                  onChange={(e) => setCustomAllergyInput(e.target.value)}
                  placeholder="Add custom exclusion (e.g. Mushroom, Lactose, Mustard)"
                  className="flex-1 px-3 py-2 glass-input text-xs text-white rounded-xl"
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCustomAllergy())}
                />
                <button
                  type="button"
                  onClick={handleAddCustomAllergy}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold border border-white/10 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5 text-[#39FF14]" />
                  <span>Add</span>
                </button>
              </div>

              {selectedAllergies.length > 0 && (
                <div className="mt-3 p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-center gap-2 text-xs text-rose-300 font-medium">
                  <ShieldAlert className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>FitGen AI will strictly exclude: {selectedAllergies.join(', ')}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 4: REGION & CUISINE */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="text-center max-w-xl mx-auto">
              <h2 className="text-2xl font-extrabold font-heading text-white">Region & Cuisine Preferences</h2>
              <p className="text-xs text-slate-400 mt-1">Select your favorite regional flavors so FitGen AI formats authentic recipes you love.</p>
            </div>

            {/* Country / Region */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">Country / Region</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {REGIONS_LIST.map((reg) => (
                  <button
                    key={reg.id}
                    type="button"
                    onClick={() => setSelectedRegion(reg.id)}
                    className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all ${
                      selectedRegion === reg.id
                        ? 'bg-[#00CFFF]/20 border-[#00CFFF] text-white shadow-md'
                        : 'bg-slate-900 border-white/10 text-slate-400 hover:border-white/20'
                    }`}
                  >
                    <span className="text-base">{reg.flag}</span>
                    <span className="truncate">{reg.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Preferred Cuisines */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2 uppercase tracking-wider">Preferred Cuisines (Multi-Select)</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {CUISINES_LIST.map((cuisine) => {
                  const isSelected = selectedCuisines.includes(cuisine);
                  return (
                    <button
                      key={cuisine}
                      type="button"
                      onClick={() => handleToggleCuisine(cuisine)}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#39FF14]/20 border-[#39FF14] text-[#39FF14]'
                          : 'bg-slate-900 border-white/10 text-slate-400 hover:border-white/20'
                      }`}
                    >
                      <span className="truncate">{cuisine}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 shrink-0 text-[#39FF14]" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: FITGEN AI PROFILE SUMMARY & NUTRITION TARGETS */}
        {step === 5 && (
          <div className="space-y-6">
            <div className="text-center max-w-xl mx-auto">
              <h2 className="text-2xl font-extrabold font-heading text-white">FITGEN AI PROFILE SUMMARY</h2>
              <p className="text-xs text-slate-400 mt-1">Review your personalized profile & calculated daily targets before activating FitGen AI.</p>
            </div>

            {/* Summary Grid Card */}
            <div className="bg-slate-900/90 border border-white/15 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-3">
                  <img src={selectedAvatar} alt="Avatar" className="w-12 h-12 rounded-full border border-white/20 object-cover" />
                  <div>
                    <h3 className="text-base font-bold text-white">{fullName || 'Athlete'}</h3>
                    <p className="text-xs text-slate-400">{age} yrs • {sex} • {heightCm}cm • {weightKg}kg</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-[#39FF14]/20 text-[#39FF14] border border-[#39FF14]/40 rounded-full text-xs font-extrabold">
                  {selectedGoal}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="bg-slate-950/60 p-2.5 rounded-xl border border-white/5">
                  <span className="text-[10px] text-slate-400 block uppercase">Activity</span>
                  <span className="font-bold text-slate-200">{activityLevel}</span>
                </div>
                <div className="bg-slate-950/60 p-2.5 rounded-xl border border-white/5">
                  <span className="text-[10px] text-slate-400 block uppercase">Diet</span>
                  <span className="font-bold text-emerald-400">{selectedDietary}</span>
                </div>
                <div className="bg-slate-950/60 p-2.5 rounded-xl border border-white/5">
                  <span className="text-[10px] text-slate-400 block uppercase">Region</span>
                  <span className="font-bold text-slate-200">{selectedRegion}</span>
                </div>
                <div className="bg-slate-950/60 p-2.5 rounded-xl border border-white/5">
                  <span className="text-[10px] text-slate-400 block uppercase">Allergies</span>
                  <span className="font-bold text-rose-400">{selectedAllergies.length > 0 ? selectedAllergies.join(', ') : 'None'}</span>
                </div>
              </div>
            </div>

            {/* Calculated Nutrition Targets */}
            <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Flame className="w-4 h-4 text-[#39FF14]" />
                    <span>Calculated Daily Nutrition Targets</span>
                  </h4>
                  <p className="text-[11px] text-slate-400">Estimated based on your biometrics & fitness objective (editable below).</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsEditingTargets((prev) => !prev)}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 rounded-lg flex items-center gap-1 border border-white/10"
                >
                  <Edit3 className="w-3 h-3 text-[#00CFFF]" />
                  <span>{isEditingTargets ? 'Done' : 'Edit Targets'}</span>
                </button>
              </div>

              {/* Target Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <div className="bg-slate-950 p-3 rounded-xl border border-white/10 text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Calories</span>
                  {isEditingTargets ? (
                    <input
                      type="number"
                      value={calcCalories}
                      onChange={(e) => setCalcCalories(Number(e.target.value))}
                      className="w-full mt-1 text-center bg-slate-900 border border-white/20 text-white font-extrabold rounded text-xs py-1"
                    />
                  ) : (
                    <span className="text-lg font-extrabold text-[#39FF14]">{calcCalories} <span className="text-[10px] text-slate-400 font-normal">kcal</span></span>
                  )}
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-white/10 text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Protein</span>
                  {isEditingTargets ? (
                    <input
                      type="number"
                      value={calcProtein}
                      onChange={(e) => setCalcProtein(Number(e.target.value))}
                      className="w-full mt-1 text-center bg-slate-900 border border-white/20 text-white font-extrabold rounded text-xs py-1"
                    />
                  ) : (
                    <span className="text-lg font-extrabold text-[#00CFFF]">{calcProtein}g</span>
                  )}
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-white/10 text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Carbs</span>
                  {isEditingTargets ? (
                    <input
                      type="number"
                      value={calcCarbs}
                      onChange={(e) => setCalcCarbs(Number(e.target.value))}
                      className="w-full mt-1 text-center bg-slate-900 border border-white/20 text-white font-extrabold rounded text-xs py-1"
                    />
                  ) : (
                    <span className="text-lg font-extrabold text-amber-400">{calcCarbs}g</span>
                  )}
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-white/10 text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Fats</span>
                  {isEditingTargets ? (
                    <input
                      type="number"
                      value={calcFat}
                      onChange={(e) => setCalcFat(Number(e.target.value))}
                      className="w-full mt-1 text-center bg-slate-900 border border-white/20 text-white font-extrabold rounded text-xs py-1"
                    />
                  ) : (
                    <span className="text-lg font-extrabold text-purple-400">{calcFat}g</span>
                  )}
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-white/10 text-center col-span-2 sm:col-span-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Water</span>
                  {isEditingTargets ? (
                    <input
                      type="number"
                      value={calcWater}
                      onChange={(e) => setCalcWater(Number(e.target.value))}
                      className="w-full mt-1 text-center bg-slate-900 border border-white/20 text-white font-extrabold rounded text-xs py-1"
                    />
                  ) : (
                    <span className="text-lg font-extrabold text-blue-400">{calcWater}ml</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Form Controls / Step Buttons */}
        <div className="mt-8 flex items-center justify-between pt-4 border-t border-white/10">
          {step > 1 ? (
            <button
              type="button"
              onClick={handlePrevStep}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-300 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : <div />}

          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleNextStep}
            className={`px-6 py-3 rounded-xl font-extrabold text-xs tracking-wider uppercase transition-all shadow-lg flex items-center gap-2 cursor-pointer ${
              step === 5
                ? 'bg-[#39FF14] hover:bg-[#39FF14]/90 text-slate-950 shadow-[#39FF14]/30'
                : 'bg-[#39FF14] hover:bg-[#39FF14]/90 text-slate-950'
            }`}
          >
            {isSubmitting ? (
              <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
            ) : step === 5 ? (
              <>
                <span>START FITGEN AI</span>
                <Sparkles className="w-4 h-4" />
              </>
            ) : (
              <>
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
