// src/pages/NutritionVideosPage.jsx
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import IngredientVideoFinder from '../components/IngredientVideoFinder';
import { Video, Sparkles, Flame, Apple, HeartPulse } from 'lucide-react';

export default function NutritionVideosPage() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('ingredients') || searchParams.get('search') || '';

  return (
    <div className="space-y-8 pb-12 animate-fade-in">
      {/* Page Hero Header */}
      <div className="glass-panel p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-emerald-950/30 to-slate-900 border border-emerald-500/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Nutrition & Cooking Video Hub</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-heading tracking-tight leading-tight">
            Discover Nutrition Videos for <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">Whatever Ingredients You Type</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Instant video guides, cooking tutorials, macro breakdowns, and health benefits powered by AI for any typed ingredients or custom dish combinations.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-medium text-slate-400">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <Flame className="w-4 h-4" /> Calorie & Macro Breakdown
            </span>
            <span className="flex items-center gap-1.5 text-sky-400">
              <Apple className="w-4 h-4" /> Vitamin & Micronutrient Science
            </span>
            <span className="flex items-center gap-1.5 text-amber-400">
              <HeartPulse className="w-4 h-4" /> Bioavailability & Digestion
            </span>
          </div>
        </div>
      </div>

      {/* Main Ingredient Video Finder Section */}
      <IngredientVideoFinder initialQuery={initialQuery} />
    </div>
  );
}
