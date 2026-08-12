import React, { createContext, useContext, useState, useEffect } from 'react';
import { RECIPES_DATABASE } from '../data/recipes';

const AppContext = createContext();

const DEFAULT_PROFILE = {
  name: 'Alex Morgan',
  email: 'alex.morgan@fitgen.ai',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
  age: 26,
  gender: 'Female',
  height: 172, // cm
  weight: 65,  // kg
  goal: 'Muscle Gain', // 'Weight Loss', 'Muscle Gain', '6-Pack Abs', 'Maintenance'
  activityLevel: 'Active (4-5 workouts/week)',
  dietary: 'Vegetarian', // 'Vegetarian', 'Non-Vegetarian', 'Vegan', 'Eggetarian'
  cuisine: 'Indian', // 'Indian', 'Western', 'All'
  nation: 'India 🇮🇳', // 'India 🇮🇳', 'USA 🇺🇸', 'Italy 🇮🇹', 'Japan 🇯🇵', 'Mexico 🇲🇽', 'Middle East 🇱🇧', 'Thailand 🇹🇭', 'Global 🌍'
  cuisineStyle: 'High-Protein Gym & Bodybuilding', // 'Traditional Home-Cooked', 'High-Protein Gym & Bodybuilding', 'Low-Carb Keto', 'Spicy Street Food', 'Organic Whole Foods', 'Quick 15-Min Prep'
  fitnessLevel: 'Advanced Lifter', // 'Beginner', 'Advanced Lifter', 'Endurance Athlete', 'Wellness'
  spiceLevel: 'Medium / Balanced', // 'Mild', 'Medium / Balanced', 'Hot & Spicy'
  mealFrequency: '4-5 Small Meals', // '3 Standard Meals', '4-5 Small Meals', 'Intermittent Fasting (16:8)'
  allergies: ['Peanuts'],
  medicalConditions: ['None'],
  dailyCalorieBudget: 2200,
  dailyProteinGoal: 130, // grams
  dailyCarbsGoal: 240,  // grams
  dailyFatGoal: 65,      // grams
  dailyWaterGoal: 3000   // ml
};

const INITIAL_MEAL_PLAN = [
  {
    id: 'mp-1',
    type: 'breakfast',
    title: 'High-Protein Spinach & Paneer Omelette / Bhurji',
    calories: 420,
    protein: 28,
    carbs: 18,
    fat: 24,
    prepTime: '15 mins',
    description: 'Scrambled paneer tossed with fresh spinach, turmeric, green chillies and whole wheat toast.',
    ingredients: ['Paneer (150g)', 'Spinach (1 cup)', 'Onion', 'Tomato', 'Whole Wheat Toast (2 slices)']
  },
  {
    id: 'mp-2',
    type: 'lunch',
    title: 'Quinoa Lentil Power Bowl & Avocado Slices',
    calories: 620,
    protein: 34,
    carbs: 72,
    fat: 18,
    prepTime: '25 mins',
    description: 'Cooked quinoa served with spiced yellow dal, roasted chickpea crunch, and avocado.',
    ingredients: ['Quinoa (1 cup cooked)', 'Yellow Moong Dal (1 cup)', 'Chickpeas', 'Avocado']
  },
  {
    id: 'mp-3',
    type: 'dinner',
    title: 'Palak Paneer with Brown Rice & Cucumber Salad',
    calories: 550,
    protein: 32,
    carbs: 58,
    fat: 20,
    prepTime: '30 mins',
    description: 'Rich spinach puree cooked with cottage cheese cubes, cumin brown rice, and fresh salad.',
    ingredients: ['Paneer (150g)', 'Spinach Puree (2 cups)', 'Brown Rice (1 cup)', 'Cucumber']
  },
  {
    id: 'mp-4',
    type: 'dinner',
    title: 'Authentic Macro-Optimized Egg Rice',
    calories: 545,
    protein: 37,
    carbs: 48,
    fat: 16,
    prepTime: '20 mins',
    description: 'Pan-tossed basmati rice cooked with whole eggs, egg whites, spring onions, garlic, and macro-optimized spices.',
    ingredients: ['Whole Eggs & Egg Whites (3 whole + 2 whites)', 'Basmati Rice (1.5 cups cooked)', 'Spring Onions & Veggies', 'Soy Sauce & Garlic Spices']
  },
  {
    id: 'mp-5',
    type: 'snacks',
    title: 'Greek Yogurt Berry Bowl & Almond Crunch',
    calories: 260,
    protein: 18,
    carbs: 28,
    fat: 8,
    prepTime: '5 mins',
    description: 'Thick strained Greek yogurt topped with blueberries, chia seeds, and raw almonds.',
    ingredients: ['Greek Yogurt (200g)', 'Blueberries', 'Chia Seeds', 'Almonds']
  }
];

const INITIAL_GROCERY_LIST = [
  { id: 'g-1', name: 'Spinach', category: 'Vegetables', quantity: '2 bunches', completed: false },
  { id: 'g-2', name: 'Paneer (Cottage Cheese)', category: 'Protein', quantity: '500g', completed: false },
  { id: 'g-3', name: 'Greek Yogurt', category: 'Dairy', quantity: '2 tubs', completed: true },
  { id: 'g-4', name: 'Quinoa', category: 'Grains', quantity: '1 kg', completed: false },
  { id: 'g-5', name: 'Blueberries', category: 'Fruits', quantity: '250g', completed: false },
  { id: 'g-6', name: 'Turmeric Powder', category: 'Spices', quantity: '1 pack', completed: true },
  { id: 'g-7', name: 'Almonds', category: 'Protein', quantity: '200g', completed: false },
  { id: 'g-8', name: 'Whole Eggs', category: 'Protein', quantity: '1 dozen', completed: false },
  { id: 'g-9', name: 'Basmati Rice', category: 'Grains', quantity: '1 kg', completed: false }
];

const DEFAULT_DAILY_LOG = {
  calories: 1850,
  protein: 112,
  carbs: 195,
  fat: 52,
  fiber: 28,
  water: 2250, // ml
  workoutMinutes: 45,
  caloriesBurned: 420,
  nutritionScore: 94
};

export function AppProvider({ children }) {
  // Current active user account
  const [currentUserEmail, setCurrentUserEmail] = useState(() => {
    return localStorage.getItem('fitgen_active_user') || '';
  });

  // Registered Accounts Database
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('fitgen_registered_users');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Failed to parse fitgen_registered_users:', e);
    }
    return [
      {
        fullName: 'Alex Morgan',
        email: 'alex.morgan@fitgen.ai',
        password: 'password123',
        goal: 'Muscle Gain'
      },
      {
        fullName: 'Demo User',
        email: 'user@fitgen.ai',
        password: 'password123',
        goal: 'Weight Loss'
      }
    ];
  });

  // User Profile State - Persisted across page refreshes until explicit logout!
  const [userProfile, setUserProfile] = useState(() => {
    try {
      const activeEmail = localStorage.getItem('fitgen_active_user') || 'alex.morgan@fitgen.ai';
      const cleanEmail = activeEmail.trim().toLowerCase();
      const savedProfile = localStorage.getItem(`fitgen_profile_${cleanEmail}`) || localStorage.getItem('fitgen_current_user_profile');
      if (savedProfile) {
        const parsed = JSON.parse(savedProfile);
        if (parsed && typeof parsed === 'object') {
          return { ...DEFAULT_PROFILE, ...parsed };
        }
      }
    } catch (e) {
      console.warn('Error reading saved profile on mount:', e);
    }
    return DEFAULT_PROFILE;
  });

  // Daily Tracker Log
  const [dailyLog, setDailyLog] = useState(DEFAULT_DAILY_LOG);

  // Active Pantry Ingredients
  const [userIngredients, setUserIngredients] = useState([
    'paneer', 'spinach', 'tomato', 'garlic', 'onion', 'chickpeas', 'quinoa', 'egg', 'rice'
  ]);

  // Persistent Scanner Chat Messages State
  const [scannerMessages, setScannerMessages] = useState([]);

  // Saved Favorite Recipe IDs
  const [savedRecipeIds, setSavedRecipeIds] = useState(['r-1', 'r-3']);

  // Active Generated Meal Plan
  const [mealPlan, setMealPlan] = useState(INITIAL_MEAL_PLAN);

  // Grocery List Items
  const [groceryList, setGroceryList] = useState(INITIAL_GROCERY_LIST);

  // Toast Notifications
  const [toasts, setToasts] = useState([]);

  // Theme Color State
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem('fitgen_theme') || 'emerald';
  });

  const changeTheme = (themeName) => {
    setCurrentTheme(themeName);
    localStorage.setItem('fitgen_theme', themeName);
    document.documentElement.dataset.theme = themeName;
    addToast(`Switched project theme to ${themeName.toUpperCase()}!`, 'success');
  };

  useEffect(() => {
    document.documentElement.dataset.theme = currentTheme;
  }, [currentTheme]);

  // Auth State - Preserved from localStorage so switching tabs or refreshing stays logged in!
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedActive = localStorage.getItem('fitgen_active_user');
    const savedStatus = localStorage.getItem('fitgen_auth_status');
    return savedStatus === 'true' || Boolean(savedActive);
  });

  // Auto load active user account on mount
  useEffect(() => {
    if (currentUserEmail) {
      loadAccountData(currentUserEmail);
    }
  }, []);

  // Helper to load specific account data from localStorage
  const loadAccountData = (emailStr) => {
    if (!emailStr) return;
    const cleanEmail = emailStr.trim().toLowerCase();
    
    // Load profile
    try {
      const savedProfile = localStorage.getItem(`fitgen_profile_${cleanEmail}`) || localStorage.getItem('fitgen_current_user_profile');
      if (savedProfile) {
        const parsed = JSON.parse(savedProfile);
        setUserProfile({ ...DEFAULT_PROFILE, ...parsed });
      } else {
        const foundUser = registeredUsers.find((u) => u.email.toLowerCase() === cleanEmail);
        if (foundUser) {
          setUserProfile((prev) => ({
            ...DEFAULT_PROFILE,
            ...prev,
            name: foundUser.fullName || prev.name || DEFAULT_PROFILE.name,
            email: foundUser.email,
            goal: foundUser.goal || prev.goal || DEFAULT_PROFILE.goal
          }));
        }
      }
    } catch (e) {
      console.warn('Error loading account profile:', e);
    }

    // Load daily log
    try {
      const savedLog = localStorage.getItem(`fitgen_dailylog_${cleanEmail}`);
      if (savedLog) {
        setDailyLog({ ...DEFAULT_DAILY_LOG, ...JSON.parse(savedLog) });
      } else {
        setDailyLog(DEFAULT_DAILY_LOG);
      }
    } catch (e) {
      console.warn('Error loading daily log:', e);
    }

    // Load grocery list
    try {
      const savedGrocery = localStorage.getItem(`fitgen_grocery_${cleanEmail}`);
      if (savedGrocery) {
        setGroceryList(JSON.parse(savedGrocery));
      } else {
        setGroceryList(INITIAL_GROCERY_LIST);
      }
    } catch (e) {
      console.warn('Error loading grocery list:', e);
    }
  };

  // Load account data when component mounts or active email changes
  useEffect(() => {
    if (isAuthenticated && currentUserEmail) {
      loadAccountData(currentUserEmail);
    }
  }, [currentUserEmail, isAuthenticated]);

  // Persist registered users
  useEffect(() => {
    localStorage.setItem('fitgen_registered_users', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  // Persist current profile to user-specific & global localStorage keys
  useEffect(() => {
    try {
      localStorage.setItem('fitgen_current_user_profile', JSON.stringify(userProfile));
      const emailToUse = currentUserEmail || userProfile.email;
      if (emailToUse) {
        localStorage.setItem(`fitgen_profile_${emailToUse.trim().toLowerCase()}`, JSON.stringify(userProfile));
      }
    } catch (e) {
      console.warn('Error writing user profile to localStorage:', e);
    }
  }, [userProfile, currentUserEmail]);

  // Persist daily log to user-specific localStorage key
  useEffect(() => {
    if (isAuthenticated && currentUserEmail) {
      localStorage.setItem(`fitgen_dailylog_${currentUserEmail}`, JSON.stringify(dailyLog));
    }
  }, [dailyLog, currentUserEmail, isAuthenticated]);

  // Persist grocery list to user-specific localStorage key
  useEffect(() => {
    if (isAuthenticated && currentUserEmail) {
      localStorage.setItem(`fitgen_grocery_${currentUserEmail}`, JSON.stringify(groceryList));
    }
  }, [groceryList, currentUserEmail, isAuthenticated]);

  // Validate Account Credentials
  const validateCredentials = (email, password) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPassword = (password || '').trim();

    const found = registeredUsers.find(
      (u) => u.email.toLowerCase().trim() === cleanEmail
    );

    if (!found) {
      return { success: false, error: 'NO_ACCOUNT' };
    }

    if (found.password !== cleanPassword) {
      return { success: false, error: 'INVALID_PASSWORD' };
    }

    return { success: true, user: found };
  };

  // Login Handler
  const login = (email, password, googleProfile = null) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    setCurrentUserEmail(cleanEmail);
    localStorage.setItem('fitgen_active_user', cleanEmail);
    localStorage.setItem('fitgen_auth_status', 'true');
    setIsAuthenticated(true);

    loadAccountData(cleanEmail);

    if (googleProfile) {
      setUserProfile((prev) => ({
        ...prev,
        name: googleProfile.name || prev.name,
        email: cleanEmail,
        avatar: googleProfile.avatar || prev.avatar
      }));
      addToast(`Signed in with Google as ${googleProfile.name}!`, 'success');
    } else {
      addToast('Welcome back to FitGen!', 'success');
    }
  };

  // Signup Handler
  const signup = (userData) => {
    if (userData && userData.email) {
      const cleanEmail = userData.email.trim().toLowerCase();
      const newUser = {
        fullName: userData.fullName || 'New Athlete',
        email: cleanEmail,
        password: userData.password || 'password123',
        goal: 'Muscle Gain'
      };

      setRegisteredUsers((prev) => {
        const exists = prev.some((u) => u.email.toLowerCase() === cleanEmail);
        if (exists) return prev;
        return [...prev, newUser];
      });

      setCurrentUserEmail(cleanEmail);
      localStorage.setItem('fitgen_active_user', cleanEmail);
      localStorage.setItem('fitgen_auth_status', 'true');

      const initialProfile = {
        ...DEFAULT_PROFILE,
        name: newUser.fullName,
        email: newUser.email,
        avatar: userData.avatar || DEFAULT_PROFILE.avatar,
        goal: newUser.goal
      };

      setUserProfile(initialProfile);
      setDailyLog(DEFAULT_DAILY_LOG);
      setGroceryList(INITIAL_GROCERY_LIST);
    }

    setIsAuthenticated(true);
    addToast('Google Account linked & registered successfully!', 'success');
  };

  // Complete Logout Handler
  const logout = () => {
    // Save current active state before resetting
    if (currentUserEmail) {
      localStorage.setItem(`fitgen_profile_${currentUserEmail}`, JSON.stringify(userProfile));
      localStorage.setItem(`fitgen_dailylog_${currentUserEmail}`, JSON.stringify(dailyLog));
    }

    localStorage.removeItem('fitgen_active_user');
    localStorage.removeItem('fitgen_auth_status');

    setIsAuthenticated(false);
    setCurrentUserEmail('');
    setUserProfile(DEFAULT_PROFILE);
    setDailyLog(DEFAULT_DAILY_LOG);

    addToast('Logged out cleanly from FitGen', 'info');
  };

  // Update Goal Handler
  const setGoal = (newGoal) => {
    setUserProfile((prev) => {
      const updated = { ...prev, goal: newGoal };
      if (currentUserEmail) {
        localStorage.setItem(`fitgen_profile_${currentUserEmail}`, JSON.stringify(updated));
      }
      return updated;
    });

    setRegisteredUsers((prev) =>
      prev.map((u) => (u.email.toLowerCase() === currentUserEmail ? { ...u, goal: newGoal } : u))
    );

    addToast(`Goal updated to "${newGoal}"!`, 'success');
  };

  // Toast Helper - Max 1 toast active at a time, auto-dismiss in 2 seconds to avoid UI clutter
  const addToast = (message, type = 'success') => {
    const id = Date.now();
    // Keep only the newest toast to prevent notification stacking
    setToasts([{ id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2200);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Pantry Handlers - Silently updates active pantry without popup clutter
  const addIngredient = (ingredient) => {
    const clean = ingredient.toLowerCase().trim();
    if (clean && !userIngredients.includes(clean)) {
      setUserIngredients((prev) => [...prev, clean]);
    }
  };

  const removeIngredient = (ingredient) => {
    setUserIngredients((prev) => prev.filter((i) => i !== ingredient));
  };

  const clearIngredients = () => {
    setUserIngredients([]);
  };

  // Grocery Handlers
  const addGroceryItem = (item) => {
    setGroceryList((prev) => {
      const cleanName = item.name ? item.name.trim() : 'Grocery Item';
      if (prev.some((g) => g.name.toLowerCase() === cleanName.toLowerCase())) {
        addToast(`"${cleanName}" is already in grocery list`, 'info');
        return prev;
      }

      // Auto-categorize intelligently
      const rawCat = (item.category || '').toLowerCase();
      let normalizedCategory = 'Other';
      if (rawCat.includes('veg') || rawCat.includes('spinach') || rawCat.includes('tomato')) normalizedCategory = 'Vegetables';
      else if (rawCat.includes('fruit') || rawCat.includes('banana') || rawCat.includes('berry')) normalizedCategory = 'Fruits';
      else if (rawCat.includes('prot') || rawCat.includes('paneer') || rawCat.includes('chicken') || rawCat.includes('egg') || rawCat.includes('soya')) normalizedCategory = 'Protein';
      else if (rawCat.includes('dair') || rawCat.includes('milk') || rawCat.includes('yogurt') || rawCat.includes('ghee')) normalizedCategory = 'Dairy';
      else if (rawCat.includes('grain') || rawCat.includes('rice') || rawCat.includes('oats') || rawCat.includes('quinoa')) normalizedCategory = 'Grains';
      else if (rawCat.includes('spice') || rawCat.includes('masala')) normalizedCategory = 'Spices';

      addToast(`Added "${cleanName}" to grocery list`);
      return [{ id: 'g-' + Date.now(), completed: false, name: cleanName, category: normalizedCategory, quantity: item.quantity || '1 unit' }, ...prev];
    });
  };

  const toggleGroceryItem = (id) => {
    setGroceryList((prev) =>
      prev.map((g) => (g.id === id ? { ...g, completed: !g.completed } : g))
    );
  };

  const removeGroceryItem = (id) => {
    setGroceryList((prev) => prev.filter((g) => g.id !== id));
    addToast('Item removed from grocery list', 'info');
  };

  const clearCompletedGrocery = () => {
    setGroceryList((prev) => prev.filter((g) => !g.completed));
    addToast('Cleared completed items');
  };

  // Recipe Favorites Handlers
  const toggleSaveRecipe = (recipeId) => {
    setSavedRecipeIds((prev) => {
      const exists = prev.includes(recipeId);
      if (exists) {
        addToast('Recipe removed from favorites', 'info');
        return prev.filter((id) => id !== recipeId);
      } else {
        addToast('Recipe saved to favorites!');
        return [...prev, recipeId];
      }
    });
  };

  // Water Intake Logger
  const addWater = (amountMl = 250) => {
    setDailyLog((prev) => {
      const newWater = Math.min(prev.water + amountMl, userProfile.dailyWaterGoal + 1000);
      addToast(`Logged +${amountMl}ml Water! Total: ${newWater}ml`);
      return { ...prev, water: newWater };
    });
  };

  // Log Meal
  const logMealToTracker = (meal) => {
    setDailyLog((prev) => ({
      ...prev,
      calories: prev.calories + (meal.calories || 0),
      protein: prev.protein + (meal.protein || 0),
      carbs: prev.carbs + (meal.carbs || 0),
      fat: prev.fat + (meal.fat || 0)
    }));
    addToast(`Logged "${meal.title || meal.name}" to Daily Tracker!`);
  };

  // Calculate BMI
  const calculateBMI = (heightCm, weightKg) => {
    if (!heightCm || !weightKg) return { score: 0, status: 'Unknown', color: '#94A3B8' };
    const heightM = heightCm / 100;
    const score = (weightKg / (heightM * heightM)).toFixed(1);
    let status = 'Normal';
    let color = '#10B981';

    if (score < 18.5) {
      status = 'Underweight';
      color = '#F59E0B';
    } else if (score >= 18.5 && score < 25) {
      status = 'Normal weight';
      color = '#10B981';
    } else if (score >= 25 && score < 30) {
      status = 'Overweight';
      color = '#F59E0B';
    } else {
      status = 'Obese';
      color = '#EF4444';
    }

    return { score, status, color };
  };

  // Unique AI Meal Scheduling & Time Slot Assigner Function
  const scheduleMeal = (dishOrMeal, slot = 'lunch', scheduledTime = '01:00 PM', reminderEnabled = true) => {
    const newMeal = {
      id: 'sched-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      type: slot.toLowerCase(),
      title: dishOrMeal.name || dishOrMeal.title || 'Scheduled Fitness Meal',
      calories: dishOrMeal.calories || 450,
      protein: dishOrMeal.protein || 30,
      carbs: dishOrMeal.carbs || 45,
      fat: dishOrMeal.fat || 15,
      prepTime: dishOrMeal.prepTime || '20 mins',
      scheduledTime: scheduledTime,
      reminderEnabled: reminderEnabled,
      description: dishOrMeal.description || dishOrMeal.shortReason || 'AI Scheduled Fitness Meal',
      ingredients: dishOrMeal.ingredientsUsed || dishOrMeal.ingredients || ['Fresh Ingredients'],
      fitgenNote: dishOrMeal.fitgenVersion || dishOrMeal.fitnessReason || 'Macro Balanced'
    };

    setMealPlan((prev) => [newMeal, ...prev.filter((m) => m.id !== newMeal.id)]);
    addToast(`📅 Scheduled "${newMeal.title}" for ${slot.toUpperCase()} at ${scheduledTime}!`, 'success');
  };

  return (
    <AppContext.Provider
      value={{
        userProfile,
        setUserProfile,
        dailyLog,
        setDailyLog,
        userIngredients,
        setUserIngredients,
        scannerMessages,
        setScannerMessages,
        addIngredient,
        removeIngredient,
        clearIngredients,
        savedRecipeIds,
        toggleSaveRecipe,
        mealPlan,
        setMealPlan,
        scheduleMeal,
        groceryList,
        addGroceryItem,
        toggleGroceryItem,
        removeGroceryItem,
        clearCompletedGrocery,
        toasts,
        addToast,
        removeToast,
        addWater,
        logMealToTracker,
        calculateBMI,
        isAuthenticated,
        setIsAuthenticated,
        currentUserEmail,
        registeredUsers,
        validateCredentials,
        login,
        signup,
        logout,
        setGoal,
        currentTheme,
        changeTheme
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
