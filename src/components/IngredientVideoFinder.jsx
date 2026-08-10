// src/components/IngredientVideoFinder.jsx
import React, { useState, useMemo } from 'react';
import {
  Video,
  Search,
  Play,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Plus,
  X,
  Flame,
  Dumbbell,
  BookOpen,
  ShoppingBag,
  Info,
  Volume2
} from 'lucide-react';
import { getVideosForIngredients } from '../data/nutritionVideosData';
import { useApp } from '../context/AppContext';

const PRESET_CHIPS = [
  { label: '🧀 Paneer & Spinach', query: 'paneer, spinach' },
  { label: '🍗 Chicken & Garlic', query: 'chicken breast, garlic' },
  { label: '🥚 Eggs & Rice', query: 'egg, rice' },
  { label: '🫘 Soya Chunks & Quinoa', query: 'soya, quinoa' },
  { label: '🥣 Oats & Chia Seeds', query: 'oats, chia seeds, milk' },
  { label: '🥑 Avocado & Salmon', query: 'avocado, salmon' },
  { label: '🫛 Chickpeas & Dal', query: 'chickpeas, dal' },
  { label: '🥟 Samosa & Potato', query: 'samosa, potato' }
];

export default function IngredientVideoFinder({ initialQuery = '', compact = false }) {
  const { addGroceryItem, addToast } = useApp();
  const [typedQuery, setTypedQuery] = useState(initialQuery);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Dynamic video search matching
  const matchedVideos = useMemo(() => {
    return getVideosForIngredients(typedQuery);
  }, [typedQuery]);

  const handleChipClick = (query) => {
    setTypedQuery(query);
  };

  const handleAddAllToGrocery = () => {
    if (!typedQuery.trim()) {
      addToast('Please type some ingredients first!', 'warning');
      return;
    }

    const items = typedQuery
      .split(/[,+]/)
      .map(i => i.trim())
      .filter(Boolean);

    items.forEach(name => {
      addGroceryItem({
        name: name,
        category: 'Nutrition Ingredient',
        quantity: '1 unit'
      });
    });

    addToast(`Added ${items.length} ingredient(s) to your Grocery List!`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Search Header Bar */}
      <div className="glass-panel p-5 sm:p-6 space-y-4 border border-emerald-500/20 bg-slate-900/80 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5 font-heading">
              <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <Video className="w-5 h-5 animate-pulse" />
              </div>
              Nutrition Videos by Ingredients
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Type any ingredient or dish name below to discover curated nutrition science & cooking video guides.
            </p>
          </div>

          {typedQuery.trim() && (
            <button
              onClick={handleAddAllToGrocery}
              className="px-3.5 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto transition-all"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add Ingredients to Grocery</span>
            </button>
          )}
        </div>

        {/* Input Bar */}
        <div className="relative">
          <Search className="w-5 h-5 text-emerald-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={typedQuery}
            onChange={(e) => setTypedQuery(e.target.value)}
            placeholder="Type ingredients here (e.g. paneer, spinach, chicken breast, oats, eggs, avocado)..."
            className="w-full pl-12 pr-10 py-3.5 bg-slate-950/90 border border-slate-700/80 focus:border-emerald-500 rounded-2xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-inner transition-all"
          />
          {typedQuery && (
            <button
              onClick={() => setTypedQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Preset Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
          <span className="text-slate-400 font-semibold flex items-center gap-1 shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Popular Combos:
          </span>
          {PRESET_CHIPS.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleChipClick(chip.query)}
              className={`px-3 py-1.5 rounded-xl border font-medium whitespace-nowrap transition-all shrink-0 ${
                typedQuery.toLowerCase().includes(chip.query.split(',')[0])
                  ? 'bg-emerald-500/25 border-emerald-500/50 text-emerald-300 shadow-md shadow-emerald-500/10'
                  : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* Active Ingredients Nutrition Summary Banner */}
      {typedQuery.trim() && (
        <div className="glass-panel p-4 bg-gradient-to-r from-slate-900 via-emerald-950/20 to-slate-900 border border-emerald-500/30 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-extrabold tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Ingredients Detected
              </span>
              <span className="text-sm font-bold text-white">
                "{typedQuery}"
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Found <strong className="text-emerald-400">{matchedVideos.length}</strong> specialized video tutorials and nutrition science guides for these ingredients.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`https://www.youtube.com/results?search_query=${encodeURIComponent(typedQuery + ' nutrition recipe science')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/40 text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>More YouTube Results</span>
            </a>
          </div>
        </div>
      )}

      {/* Videos Grid */}
      <div className={`grid grid-cols-1 ${compact ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'} gap-5`}>
        {matchedVideos.map((video) => (
          <div
            key={video.id}
            className="glass-panel bg-slate-900 border border-slate-800 hover:border-emerald-500/40 rounded-2xl overflow-hidden group flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/5 hover:-translate-y-1"
          >
            {/* Thumbnail Header */}
            <div className="relative aspect-video w-full bg-slate-950 overflow-hidden cursor-pointer" onClick={() => setSelectedVideo(video)}>
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

              {/* Category Pill */}
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-white/10 text-[10px] font-bold text-emerald-400">
                {video.category}
              </span>

              {/* Video Duration */}
              <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[10px] font-mono text-slate-200">
                {video.duration}
              </span>

              {/* Center Play Icon Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-emerald-500/90 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:scale-110 group-hover:bg-emerald-400 transition-all">
                  <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
                </div>
              </div>
            </div>

            {/* Video Body Content */}
            <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 
                  onClick={() => setSelectedVideo(video)}
                  className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-2 cursor-pointer font-heading leading-snug"
                >
                  {video.title}
                </h3>

                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-medium text-slate-300 flex items-center gap-1">
                    {video.channel}
                    {video.channelVerified && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                  </span>
                  <span>{video.views}</span>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {video.summary}
                </p>
              </div>

              {/* Macro Pills */}
              {video.macros && (
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-300">
                  <span className="flex items-center gap-1 text-emerald-400 font-bold">
                    <Dumbbell className="w-3 h-3" /> P: {video.macros.protein}
                  </span>
                  <span className="flex items-center gap-1 text-amber-400">
                    <Flame className="w-3 h-3" /> {video.macros.calories}
                  </span>
                  <span className="text-sky-400">
                    C: {video.macros.carbs}
                  </span>
                </div>
              )}

              {/* Key Nutrition Highlights Bullet */}
              {video.nutritionHighlights && video.nutritionHighlights.length > 0 && (
                <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 text-[11px] text-slate-300 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Key Nutrition Benefit
                  </span>
                  <p className="text-slate-300 line-clamp-2">
                    • {video.nutritionHighlights[0]}
                  </p>
                </div>
              )}

              {/* Watch Video Action Button */}
              <button
                onClick={() => setSelectedVideo(video)}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-emerald-400 border border-slate-700/60 font-bold text-xs flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-sm"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Watch Nutrition Guide</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Video Embed Modal Player */}
      {selectedVideo && (
        <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
      )}
    </div>
  );
}

/**
 * Embedded Multi-Source Video Player Modal (HTML5 HD & YouTube Embed Dual Player)
 */
function VideoModal({ video, onClose }) {
  const { addToast } = useApp();
  const [playerSource, setPlayerSource] = useState('mp4'); // 'mp4' | 'youtube'

  const mp4Url = video.mp4Fallback || "https://assets.mixkit.co/videos/preview/mixkit-chef-cooking-food-in-a-pan-41584-large.mp4";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white font-heading line-clamp-1">
                {video.title}
              </h3>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <span>{video.channel}</span> • <span>{video.category}</span>
              </p>
            </div>
          </div>

          {/* Player Mode Switcher Tabs */}
          <div className="flex items-center gap-2 self-stretch sm:self-auto">
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setPlayerSource('mp4')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                  playerSource === 'mp4'
                    ? 'bg-emerald-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Play className="w-3 h-3 fill-current" /> HD Video Player
              </button>

              <button
                onClick={() => setPlayerSource('youtube')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                  playerSource === 'youtube'
                    ? 'bg-rose-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <ExternalLink className="w-3 h-3" /> YouTube Embed
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 transition-all"
              title="Close Player"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Player Frame Area */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
          {playerSource === 'mp4' ? (
            <video
              key={mp4Url}
              src={mp4Url}
              poster={video.thumbnail}
              controls
              autoPlay
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <iframe
              src={`${video.embedUrl}?autoplay=1&rel=0`}
              title={video.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>

        {/* Modal Footer / Nutrition Details */}
        <div className="p-5 overflow-y-auto space-y-4 bg-slate-900">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <h4 className="text-xs font-bold uppercase text-emerald-400 tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Nutrition & Cooking Takeaways
              </h4>
              <p className="text-xs text-slate-300 mt-1">
                {video.summary}
              </p>
            </div>

            <a
              href={video.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-2 transition-all shrink-0 self-start sm:self-auto"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Watch on YouTube</span>
            </a>
          </div>

          {/* Highlights List */}
          {video.nutritionHighlights && (
            <div className="space-y-2">
              <h5 className="text-xs font-bold text-slate-200">Key Health & Macro Benefits:</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {video.nutritionHighlights.map((highlight, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
