import React, { useState } from 'react';
import { ShoppingBag, Check, Trash2, Plus, Share2, Sparkles, X } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function GroceryListModal({ 
  groceryList, 
  onRemoveGroceryItem, 
  onClearGroceryList,
  onAddGroceryItem,
  isOpen,
  onClose 
}) {
  const [checkedIds, setCheckedIds] = useState([]);
  const [customItemName, setCustomItemName] = useState('');

  if (!isOpen) return null;

  const toggleCheck = (id) => {
    if (checkedIds.includes(id)) {
      setCheckedIds(checkedIds.filter(i => i !== id));
    } else {
      setCheckedIds([...checkedIds, id]);
    }
  };

  const handleAddCustom = (e) => {
    e.preventDefault();
    if (!customItemName.trim()) return;
    onAddGroceryItem({
      id: `groc-custom-${Date.now()}`,
      name: customItemName.trim(),
      recipeName: 'Custom Pantry Need',
      amount: 'As needed'
    });
    setCustomItemName('');
  };

  const handleCopyClipboard = () => {
    const text = groceryList.map(item => `- ${item.name} (${item.amount}) [${item.recipeName}]`).join('\n');
    navigator.clipboard.writeText(`FitGen AI Grocery List:\n\n${text}`);
    confetti({ particleCount: 40, spread: 50 });
    alert("Grocery Shopping List copied to clipboard!");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-heading">Grocery Shopping List</h2>
              <p className="text-xs text-slate-400">Missing ingredients auto-synced from your recipes</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {groceryList.length > 0 && (
              <button
                onClick={handleCopyClipboard}
                className="p-2 rounded-xl bg-slate-800 text-emerald-400 hover:bg-slate-700 transition-colors"
                title="Copy List to Clipboard"
              >
                <Share2 className="w-4 h-4" />
              </button>
            )}
            <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* List Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm">
          
          {/* Add Custom Grocery Item */}
          <form onSubmit={handleAddCustom} className="flex items-center gap-2">
            <input
              type="text"
              value={customItemName}
              onChange={(e) => setCustomItemName(e.target.value)}
              placeholder="Add extra pantry item e.g. Olive oil, Turmeric, Salt..."
              className="flex-1 glass-input px-4 py-2 text-xs"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
          </form>

          {groceryList.length === 0 ? (
            <div className="p-8 text-center space-y-2 bg-slate-950/40 border border-slate-800/60 rounded-xl">
              <ShoppingBag className="w-10 h-10 text-slate-600 mx-auto" />
              <p className="text-sm font-bold text-slate-300">Your Grocery List is Empty!</p>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Missing ingredients will appear here when you explore recipe recommendations or click "Add Missing to Grocery List".
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {groceryList.map((item) => {
                const isChecked = checkedIds.includes(item.id);
                return (
                  <div
                    key={item.id}
                    className={`p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                      isChecked
                        ? 'bg-slate-950/40 border-slate-800 text-slate-500 line-through'
                        : 'bg-slate-950/70 border-slate-800 text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleCheck(item.id)}
                        className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                          isChecked
                            ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                            : 'border-slate-700 hover:border-emerald-500'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </button>
                      <div>
                        <div className="font-bold text-xs capitalize">{item.name}</div>
                        <div className="text-[10px] text-slate-400">Recipe: {item.recipeName}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveGroceryItem(item.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-900 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          {groceryList.length > 0 ? (
            <button
              onClick={onClearGroceryList}
              className="text-xs text-rose-400 hover:underline font-semibold"
            >
              Clear Entire List
            </button>
          ) : <span />}

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-all"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
