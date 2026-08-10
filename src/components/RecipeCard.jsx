import React from 'react';
import { Clock, Flame, Dumbbell, ChevronRight, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

export default function RecipeCard({ recipe, userIngredients, onSelectRecipe }) {
  // Calculate match percentage
  const matchedIngredients = recipe.keyIngredients.filter(ing => 
    userIngredients.some(userIng => userIng.toLowerCase().includes(ing) || ing.includes(userIng.toLowerCase()))
  );
  
  const missingIngredients = recipe.keyIngredients.filter(ing => 
    !userIngredients.some(userIng => userIng.toLowerCase().includes(ing) || ing.includes(userIng.toLowerCase()))
  );

  const matchPercent = recipe.keyIngredients.length > 0
    ? Math.round((matchedIngredients.length / recipe.keyIngredients.length) * 100)
    : 0;

  return (
    <div 
      onClick={() => onSelectRecipe(recipe)}
      className="glass-panel glass-panel-hover flex flex-col justify-between overflow-hidden cursor-pointer group border border-slate-800"
    >
      <div>
        {/* Card Header Image & Overlay Tags */}
        <div className="relative h-48 w-full overflow-hidden bg-slate-950">
          <img 
            src={recipe.image} 
            alt={recipe.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

          {/* Cuisine Pill */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold shadow-md backdrop-blur-md ${
              recipe.cuisine === 'Indian' ? 'badge-cuisine-indian' : 'badge-cuisine-western'
            }`}>
              {recipe.cuisine === 'Indian' ? '🇮🇳 Indian' : '🥗 Western'}
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-900/80 text-slate-300 backdrop-blur-md border border-slate-700">
              {recipe.region}
            </span>
          </div>

          {/* Match Score Badge */}
          <div className="absolute top-3 right-3">
            <span className={`px-2.5 py-1 rounded-full text-xs font-extrabold shadow-md flex items-center gap-1 backdrop-blur-md ${
              matchPercent >= 80 
                ? 'bg-emerald-500/90 text-slate-950 shadow-emerald-500/30' 
                : matchPercent >= 50
                ? 'bg-amber-500/90 text-slate-950'
                : 'bg-slate-800/90 text-slate-300'
            }`}>
              <Sparkles className="w-3 h-3 stroke-[2.5]" />
              {matchPercent}% Match
            </span>
          </div>

          {/* Fitness Goal Pill */}
          <div className="absolute bottom-3 left-3 flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-md flex items-center gap-1">
              <Dumbbell className="w-3 h-3" />
              {recipe.fitnessGoals && recipe.fitnessGoals[0] ? recipe.fitnessGoals[0] : 'Fitness Goal'}
            </span>
          </div>
        </div>

        {/* Card Content Body */}
        <div className="p-5 space-y-4">
          
          <div>
            <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors font-heading line-clamp-1">
              {recipe.name}
            </h3>
            <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
              {recipe.description}
            </p>
          </div>

          {/* Time & Workout Tag */}
          <div className="flex items-center justify-between text-xs text-slate-400 border-y border-slate-800/80 py-2">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Prep: {recipe.prepTime} • Cook: {recipe.cookTime}</span>
            </div>
            <div className="text-[10px] font-semibold text-teal-300 bg-teal-950/60 px-2 py-0.5 rounded border border-teal-800/50">
              {recipe.dietary}
            </div>
          </div>

          {/* Macro Breakdown Pills */}
          <div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1.5">
              Nutrition Macros per Serving
            </div>
            <div className="grid grid-cols-5 gap-1.5 text-center">
              <div className="p-1.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <div className="text-[10px] text-slate-400">Cals</div>
                <div className="text-xs font-bold text-amber-400">{recipe.macros.calories}</div>
              </div>
              <div className="p-1.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <div className="text-[10px] text-slate-400">Protein</div>
                <div className="text-xs font-bold text-emerald-400">{recipe.macros.protein}g</div>
              </div>
              <div className="p-1.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <div className="text-[10px] text-slate-400">Carbs</div>
                <div className="text-xs font-bold text-blue-400">{recipe.macros.carbs}g</div>
              </div>
              <div className="p-1.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <div className="text-[10px] text-slate-400">Fat</div>
                <div className="text-xs font-bold text-rose-400">{recipe.macros.fat}g</div>
              </div>
              <div className="p-1.5 rounded-lg bg-slate-950/60 border border-slate-800">
                <div className="text-[10px] text-slate-400">Fiber</div>
                <div className="text-xs font-bold text-teal-400">{recipe.macros.fiber}g</div>
              </div>
            </div>
          </div>

          {/* Ingredient Match vs Missing */}
          <div className="flex items-center justify-between text-xs pt-1">
            <div className="flex items-center gap-1 text-emerald-400 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{matchedIngredients.length} In Pantry</span>
            </div>
            {missingIngredients.length > 0 ? (
              <div className="flex items-center gap-1 text-rose-400 font-semibold">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{missingIngredients.length} Missing</span>
              </div>
            ) : (
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Ready to Cook!
              </span>
            )}
          </div>

        </div>
      </div>

      {/* Footer Action Button */}
      <div className="px-5 py-3 bg-slate-950/50 border-t border-slate-800/80 flex items-center justify-between group-hover:bg-slate-950 transition-colors">
        <span className="text-xs font-bold text-emerald-400 group-hover:underline flex items-center gap-1">
          View Step-by-Step Recipe
        </span>
        <ChevronRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
}
