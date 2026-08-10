import React from 'react';
import { Flame, Dumbbell, Target, Sparkles, Utensils, HeartPulse, ChevronRight } from 'lucide-react';

export default function NutritionDashboard({ 
  userProfile, 
  recipes, 
  userIngredients, 
  onSelectRecipe,
  onOpenProfile 
}) {
  // Calculate recommended daily targets based on user fitness goal
  let targetCals = 2200;
  let targetProtein = 150;
  let targetCarbs = 200;
  let targetFat = 65;
  let targetFiber = 30;

  if (userProfile.goal === 'Weight Loss') {
    targetCals = 1800;
    targetProtein = 160;
    targetCarbs = 140;
    targetFat = 50;
  } else if (userProfile.goal === 'Muscle Gain') {
    targetCals = 2600;
    targetProtein = 180;
    targetCarbs = 280;
    targetFat = 75;
  }

  // Filter recipes matching user cuisine and dietary preference
  const filteredRecipes = recipes.filter(r => {
    const matchesCuisine = userProfile.cuisine === 'All' || r.cuisine === userProfile.cuisine;
    const matchesDiet = userProfile.dietary === 'Non-Vegetarian' || 
                        r.dietary === userProfile.dietary || 
                        (userProfile.dietary === 'Vegetarian' && (r.dietary === 'Vegetarian' || r.dietary === 'Vegan'));
    return matchesCuisine && matchesDiet;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Fitness & Workout Hero Card */}
      <div className="glass-panel p-6 border border-emerald-500/30 relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-900/90 to-emerald-950/40">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> AI Nutrition Plan Active
              </span>
              <span className="text-xs font-semibold text-slate-400">
                Targeting: <strong className="text-white">{userProfile.goal}</strong>
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white font-heading">
              Personalized {userProfile.cuisine} Meal Plan
            </h1>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              Calibrated for <strong className="text-emerald-400">{userProfile.workout}</strong> routine with <strong className="text-emerald-400">{userProfile.dietary}</strong> nutrition standards.
            </p>
          </div>

          {/* Quick Profile Summary Badge */}
          <button
            onClick={onOpenProfile}
            className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-emerald-500/40 transition-all flex items-center gap-4 text-left group"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl font-bold group-hover:scale-110 transition-transform">
              {userProfile.cuisine === 'Indian' ? '🇮🇳' : '🥗'}
            </div>
            <div>
              <div className="text-xs font-bold text-slate-200 group-hover:text-emerald-400 transition-colors">
                {userProfile.cuisine} Cuisine • {userProfile.dietary}
              </div>
              <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                <Dumbbell className="w-3 h-3 text-emerald-400" />
                <span>{userProfile.workout}</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
          </button>
        </div>
      </div>

      {/* DAILY TARGET MACROS DASHBOARD GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Calories Card */}
        <div className="glass-panel p-5 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-bold flex items-center gap-1"><Flame className="w-4 h-4 text-amber-400" /> Calorie Goal</span>
            <span className="text-amber-400 font-mono font-bold">{targetCals} kcal</span>
          </div>
          <div className="text-2xl font-extrabold text-white font-heading">
            {targetCals - 450} <span className="text-xs font-normal text-slate-400">rem.</span>
          </div>
          <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
            <div className="bg-gradient-to-r from-amber-500 to-orange-400 h-full w-[70%] rounded-full"></div>
          </div>
        </div>

        {/* Protein Card */}
        <div className="glass-panel p-5 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-bold flex items-center gap-1"><Target className="w-4 h-4 text-emerald-400" /> Target Protein</span>
            <span className="text-emerald-400 font-mono font-bold">{targetProtein}g</span>
          </div>
          <div className="text-2xl font-extrabold text-white font-heading">
            110g <span className="text-xs font-normal text-slate-400">logged</span>
          </div>
          <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full w-[75%] rounded-full"></div>
          </div>
        </div>

        {/* Carbs Card */}
        <div className="glass-panel p-5 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-bold flex items-center gap-1"><Utensils className="w-4 h-4 text-blue-400" /> Complex Carbs</span>
            <span className="text-blue-400 font-mono font-bold">{targetCarbs}g</span>
          </div>
          <div className="text-2xl font-extrabold text-white font-heading">
            140g <span className="text-xs font-normal text-slate-400">logged</span>
          </div>
          <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full w-[65%] rounded-full"></div>
          </div>
        </div>

        {/* Healthy Fats Card */}
        <div className="glass-panel p-5 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-bold flex items-center gap-1"><HeartPulse className="w-4 h-4 text-rose-400" /> Healthy Fats</span>
            <span className="text-rose-400 font-mono font-bold">{targetFat}g</span>
          </div>
          <div className="text-2xl font-extrabold text-white font-heading">
            42g <span className="text-xs font-normal text-slate-400">logged</span>
          </div>
          <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
            <div className="bg-gradient-to-r from-rose-500 to-pink-400 h-full w-[55%] rounded-full"></div>
          </div>
        </div>

      </div>

      {/* RECOMMENDED MEALS SECTION */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white font-heading">
              Recommended {userProfile.cuisine} Dishes For Your Pantry
            </h2>
            <p className="text-xs text-slate-400">Matched with your ingredients and workout goals</p>
          </div>
          <span className="px-3 py-1 rounded-xl bg-slate-900 text-emerald-400 text-xs font-bold border border-slate-800">
            {filteredRecipes.length} Matches Found
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <div key={recipe.id} onClick={() => onSelectRecipe(recipe)} className="cursor-pointer">
              <div className="glass-panel glass-panel-hover overflow-hidden rounded-2xl border border-slate-800">
                <div className="relative h-44 w-full">
                  <img src={recipe.image} alt={recipe.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold badge-cuisine-indian bg-slate-900/80 backdrop-blur-md">
                    {recipe.cuisine === 'Indian' ? '🇮🇳 Indian' : '🥗 Western'}
                  </span>
                  <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
                    {recipe.macros.protein}g Protein
                  </span>
                </div>

                <div className="p-4 space-y-2">
                  <h3 className="text-sm font-bold text-white line-clamp-1">{recipe.name}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2">{recipe.description}</p>
                  
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
                    <span>⏱️ {recipe.totalTimeMins} mins</span>
                    <span className="text-emerald-400 font-bold">View Process →</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
