import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { exportGroceryListPDF } from '../utils/pdfExport';
import {
  ShoppingBag,
  Plus,
  Trash2,
  Download,
  CheckCircle2,
  Circle,
  Filter,
  CheckSquare,
  Sparkles
} from 'lucide-react';

const CATEGORIES = ['Vegetables', 'Fruits', 'Protein', 'Dairy', 'Grains', 'Spices', 'Other'];

export function getItemCategory(item) {
  const cat = (item.category || '').trim();
  const valid = CATEGORIES.find(c => c.toLowerCase() === cat.toLowerCase());
  if (valid) return valid;
  
  const str = (cat + ' ' + (item.name || '')).toLowerCase();
  if (str.includes('spinach') || str.includes('veg') || str.includes('tomato') || str.includes('onion') || str.includes('garlic') || str.includes('cucumber') || str.includes('broccoli') || str.includes('carrot') || str.includes('peas') || str.includes('beans')) return 'Vegetables';
  if (str.includes('fruit') || str.includes('banana') || str.includes('berry') || str.includes('avocado') || str.includes('apple')) return 'Fruits';
  if (str.includes('protein') || str.includes('paneer') || str.includes('chicken') || str.includes('egg') || str.includes('salmon') || str.includes('tofu') || str.includes('soya') || str.includes('meat') || str.includes('chickpea') || str.includes('chana') || str.includes('cottage cheese')) return 'Protein';
  if (str.includes('dairy') || str.includes('yogurt') || str.includes('milk') || str.includes('ghee') || str.includes('butter') || str.includes('cheese')) return 'Dairy';
  if (str.includes('grain') || str.includes('quinoa') || str.includes('rice') || str.includes('oats') || str.includes('bread') || str.includes('flour') || str.includes('toast')) return 'Grains';
  if (str.includes('spice') || str.includes('masala') || str.includes('cinnamon') || str.includes('clove') || str.includes('salt') || str.includes('pepper') || str.includes('chili') || str.includes('herb')) return 'Spices';

  return 'Other';
}

export default function GroceryListPage() {
  const {
    groceryList,
    addGroceryItem,
    toggleGroceryItem,
    removeGroceryItem,
    clearCompletedGrocery,
    addToast
  } = useApp();

  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('Vegetables');
  const [newItemQuantity, setNewItemQuantity] = useState('1 unit');
  const [selectedFilterCategory, setSelectedFilterCategory] = useState('All');

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    addGroceryItem({
      name: newItemName.trim(),
      category: newItemCategory,
      quantity: newItemQuantity.trim() || '1 unit'
    });

    setNewItemName('');
    setNewItemQuantity('1 unit');
  };

  const handleDownloadPDF = () => {
    if (groceryList.length === 0) {
      addToast('Grocery list is empty!', 'error');
      return;
    }
    exportGroceryListPDF(groceryList);
    addToast('Downloaded Grocery List PDF!');
  };

  const completedCount = groceryList.filter((g) => g.completed).length;
  const pendingCount = groceryList.length - completedCount;

  // Group items by normalized category
  const activeCategories = selectedFilterCategory === 'All'
    ? CATEGORIES
    : CATEGORIES.filter(c => c === selectedFilterCategory);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-white flex items-center gap-2">
            <ShoppingBag className="w-7 h-7 text-blue-400" /> Smart Grocery List
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Categorized shopping checklist populated automatically from your meal plan, scanner, and recipes.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full md:w-auto">
          {completedCount > 0 && (
            <button
              onClick={clearCompletedGrocery}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-semibold transition-colors flex items-center justify-center"
            >
              Clear Completed ({completedCount})
            </button>
          )}

          <button
            onClick={handleDownloadPDF}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-transform active:scale-95"
          >
            <Download className="w-4 h-4" /> Export PDF
          </button>
        </div>
      </div>

      {/* Add Item Form Card */}
      <form onSubmit={handleAddItem} className="glass-panel p-5 space-y-4">
        <h3 className="text-sm font-bold font-heading text-white">Add Custom Item to List</h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder="Item name (e.g. Avocado, Greek Yogurt, Basmati Rice)"
            className="sm:col-span-2 px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-blue-500"
            required
          />

          <select
            value={newItemCategory}
            onChange={(e) => setNewItemCategory(e.target.value)}
            className="px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-blue-500"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-all"
          >
            <Plus className="w-4 h-4" /> Add Item
          </button>
        </div>
      </form>

      {/* Stats Summary Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-panel p-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-semibold uppercase">Total Items</span>
            <p className="text-xl font-bold text-white font-heading">{groceryList.length}</p>
          </div>
          <ShoppingBag className="w-5 h-5 text-blue-400" />
        </div>
        <div className="glass-panel p-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-semibold uppercase">Pending Items</span>
            <p className="text-xl font-bold text-amber-400 font-heading">{pendingCount}</p>
          </div>
          <Circle className="w-5 h-5 text-amber-400" />
        </div>
        <div className="glass-panel p-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-semibold uppercase">Completed</span>
            <p className="text-xl font-bold text-emerald-400 font-heading">{completedCount}</p>
          </div>
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
        </div>
      </div>

      {/* Category Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <span className="text-xs font-bold text-slate-400 flex items-center gap-1 shrink-0 pr-2">
          <Filter className="w-3.5 h-3.5" /> Category Filter:
        </span>
        <button
          onClick={() => setSelectedFilterCategory('All')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 border ${
            selectedFilterCategory === 'All'
              ? 'bg-blue-500 text-slate-950 border-blue-400 shadow-md'
              : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
          }`}
        >
          All Items ({groceryList.length})
        </button>
        {CATEGORIES.map((cat) => {
          const count = groceryList.filter(item => getItemCategory(item) === cat).length;
          if (count === 0 && selectedFilterCategory !== cat) return null;
          return (
            <button
              key={cat}
              onClick={() => setSelectedFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 border ${
                selectedFilterCategory === cat
                  ? 'bg-blue-500 text-slate-950 border-blue-400 shadow-md'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Categorized Lists */}
      <div className="space-y-6">
        {activeCategories.map((category) => {
          const categoryItems = groceryList.filter((item) => getItemCategory(item) === category);
          if (categoryItems.length === 0) return null;

          return (
            <div key={category} className="glass-panel p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h3 className="text-base font-bold font-heading text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                  {category}
                  <span className="text-xs text-slate-400 font-medium">({categoryItems.length} items)</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {categoryItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleGroceryItem(item.id)}
                    className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                      item.completed
                        ? 'bg-slate-900/40 border-slate-800/60 opacity-60'
                        : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {item.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-500 shrink-0" />
                      )}
                      <div>
                        <p
                          className={`text-sm font-semibold ${
                            item.completed ? 'line-through text-slate-500' : 'text-slate-200'
                          }`}
                        >
                          {item.name}
                        </p>
                        {item.quantity && (
                          <span className="text-[11px] text-slate-400">{item.quantity}</span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeGroceryItem(item.id);
                      }}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {groceryList.length === 0 && (
          <div className="glass-panel p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white font-heading">Your grocery list is empty</h3>
            <p className="text-sm text-slate-400">
              Add items manually using the form above or import ingredients from recipes!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
