import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { RECIPES_DATABASE } from '../data/recipes';
import RecipeCard from '../components/RecipeCard';
import RecipeDetailModal from '../components/RecipeDetailModal';
import {
  Utensils,
  Search,
  Filter,
  Bookmark,
  Sparkles,
  Flame,
  Dumbbell,
  CheckCircle,
  Globe,
  Video
} from 'lucide-react';
import IngredientVideoFinder from '../components/IngredientVideoFinder';

export default function RecipesPage() {
  const { userIngredients, savedRecipeIds, toggleSaveRecipe, addGroceryItem, addToast } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCuisine, setSelectedCuisine] = useState('All'); // 'All', 'Indian', 'Western'
  const [selectedDiet, setSelectedDiet] = useState('All'); // 'All', 'Vegetarian', 'Non-Vegetarian', 'Vegan'
  const [selectedGoal, setSelectedGoal] = useState('All'); // 'All', 'Muscle Gain', 'Weight Loss'
  const [onlySaved, setOnlySaved] = useState(false);

  // Selected recipe for modal popup
  const [activeModalRecipe, setActiveModalRecipe] = useState(null);

  // Filtered recipes list
  const filteredRecipes = useMemo(() => {
    return RECIPES_DATABASE.filter((recipe) => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = recipe.name.toLowerCase().includes(q);
        const matchesDesc = recipe.description.toLowerCase().includes(q);
        const matchesIng = recipe.keyIngredients.some((ing) => ing.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesIng) return false;
      }

      // Cuisine
      if (selectedCuisine !== 'All' && recipe.cuisine !== selectedCuisine) {
        return false;
      }

      // Diet
      if (selectedDiet !== 'All') {
        if (selectedDiet === 'Vegetarian' && recipe.dietary !== 'Vegetarian' && recipe.dietary !== 'Vegan') {
          return false;
        }
        if (selectedDiet === 'Non-Vegetarian' && recipe.dietary !== 'Non-Vegetarian') {
          return false;
        }
        if (selectedDiet === 'Vegan' && recipe.dietary !== 'Vegan') {
          return false;
        }
      }

      // Goal
      if (selectedGoal !== 'All' && (!recipe.fitnessGoals || !recipe.fitnessGoals.includes(selectedGoal))) {
        return false;
      }

      // Saved favorites
      if (onlySaved && !savedRecipeIds.includes(recipe.id)) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedCuisine, selectedDiet, selectedGoal, onlySaved, savedRecipeIds]);

  const handleAddRecipeIngredientsToGrocery = (recipe) => {
    recipe.keyIngredients.forEach((ing) => {
      addGroceryItem({
        name: ing,
        category: 'Protein',
        quantity: '1 unit'
      });
    });
    addToast(`Added missing ingredients for "${recipe.name}" to Grocery List!`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-white flex items-center gap-2">
            <Utensils className="w-7 h-7 text-emerald-400" /> AI Recipe Generator
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Discover macro-optimized meal recipes matched to your active pantry ingredients.
          </p>
        </div>

        <button
          onClick={() => setOnlySaved(!onlySaved)}
          className={`px-4 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 border transition-all ${
            onlySaved
              ? 'bg-amber-500/20 text-amber-400 border-amber-500/40 shadow-lg shadow-amber-500/10'
              : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
          }`}
        >
          <Bookmark className={`w-4 h-4 ${onlySaved ? 'fill-amber-400' : ''}`} />
          {onlySaved ? 'Showing Saved Recipes' : `Saved Favorites (${savedRecipeIds.length})`}
        </button>
      </div>

      {/* Filter Controls Bar */}
      <div className="glass-panel p-5 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search Box */}
          <div className="relative md:col-span-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by name, ingredient..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Cuisine Selector */}
          <div className="space-y-1">
            <select
              value={selectedCuisine}
              onChange={(e) => setSelectedCuisine(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="All">All Cuisines (Indian & Western)</option>
              <option value="Indian">🇮🇳 Indian Cuisine</option>
              <option value="Western">🥗 Western / Global Cuisine</option>
            </select>
          </div>

          {/* Diet Filter */}
          <div className="space-y-1">
            <select
              value={selectedDiet}
              onChange={(e) => setSelectedDiet(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="All">All Dietary Types</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Non-Vegetarian">Non-Vegetarian</option>
              <option value="Vegan">Vegan</option>
            </select>
          </div>

          {/* Fitness Goal Filter */}
          <div className="space-y-1">
            <select
              value={selectedGoal}
              onChange={(e) => setSelectedGoal(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="All">All Fitness Goals</option>
              <option value="Muscle Gain">Muscle Gain</option>
              <option value="Weight Loss">Weight Loss</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>
        </div>
      </div>

      {/* Recipe Grid Display */}
      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              userIngredients={userIngredients}
              onSelectRecipe={(r) => setActiveModalRecipe(r)}
            />
          ))}
        </div>
      ) : (
        <div className="glass-panel p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
            <Utensils className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white font-heading">No recipes match your current filter criteria</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            Try adjusting your cuisine or dietary filters, or scan more ingredients in your pantry.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCuisine('All');
              setSelectedDiet('All');
              setSelectedGoal('All');
              setOnlySaved(false);
            }}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-bold border border-slate-700 transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Dynamic Nutrition & Recipe Video Discovery Section */}
      <div className="pt-6 border-t border-slate-800/80">
        <IngredientVideoFinder initialQuery={searchQuery} />
      </div>

      {/* Recipe Detail Modal Popup */}
      {activeModalRecipe && (
        <RecipeDetailModal
          recipe={activeModalRecipe}
          userIngredients={userIngredients}
          onClose={() => setActiveModalRecipe(null)}
          onAddGroceryItem={(ingName) => {
            addGroceryItem({
              name: ingName,
              category: 'Protein',
              quantity: '1 unit'
            });
          }}
        />
      )}
    </div>
  );
}
