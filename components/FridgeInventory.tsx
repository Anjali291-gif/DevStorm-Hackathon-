'use client';

import React, { useState } from 'react';
import {
  Plus,
  Search,
  AlertTriangle,
  Check,
  Trash2,
  Utensils,
  Sparkles,
  Leaf,
  Filter,
} from 'lucide-react';
import { FridgeItem } from '../lib/types';

interface FridgeInventoryProps {
  items: FridgeItem[];
  onAddItem: () => void;
  onConsumeItem: (item: FridgeItem) => void;
  onDeleteItem: (itemId: string) => void;
  onSelectRecipeForIngredient: (ingredientName: string) => void;
}

type CategoryFilter = 'All' | 'Produce' | 'Dairy' | 'Protein' | 'Bakery' | 'Pantry';

export const FridgeInventory: React.FC<FridgeInventoryProps> = ({
  items,
  onAddItem,
  onConsumeItem,
  onDeleteItem,
  onSelectRecipeForIngredient,
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: CategoryFilter[] = ['All', 'Produce', 'Dairy', 'Protein', 'Bakery', 'Pantry'];

  const filteredItems = items.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getStatusBadge = (item: FridgeItem) => {
    if (item.daysRemaining <= 1) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-error-container/40 text-error border border-error/30 font-mono text-[10px] font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-error animate-ping" />
          EXPIRES IN {item.daysRemaining} DAY
        </span>
      );
    }
    if (item.daysRemaining <= 3) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 font-mono text-[10px] font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
          {item.daysRemaining} DAYS REMAINING
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-tertiary/15 text-tertiary border border-tertiary/20 font-mono text-[10px] font-medium">
        <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
        FRESH ({item.daysRemaining} DAYS)
      </span>
    );
  };

  return (
    <section id="inventory-section" className="py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto relative z-10">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="font-mono text-xs tracking-wider">LIVE DIGITAL INVENTORY</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
            MY SMART FRIDGE
          </h2>
          <p className="text-on-surface-variant text-sm mt-1">
            Real-time freshness monitoring with proactive zero-waste alerts.
          </p>
        </div>

        {/* Add item CTA */}
        <button
          onClick={onAddItem}
          className="pill-gradient px-5 py-3 rounded-full font-mono text-xs font-semibold flex items-center gap-2 shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>ADD INGREDIENT</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-center mb-8">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full font-mono text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-primary text-background shadow-[0_0_15px_rgba(175,198,255,0.4)]'
                  : 'glass-panel text-on-surface-variant hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full lg:w-72">
          <Search className="w-4 h-4 text-on-surface-variant absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search ingredients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full glass-panel border border-white/10 text-white placeholder:text-on-surface-variant/60 font-mono text-xs focus:outline-none focus:border-primary/50 focus:glow-primary transition-all"
          />
        </div>
      </div>

      {/* Inventory Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 glass-panel rounded-3xl border border-white/10">
          <Leaf className="w-12 h-12 text-on-surface-variant/40 mx-auto mb-3" />
          <h3 className="font-display font-semibold text-lg text-white">No items found</h3>
          <p className="text-xs text-on-surface-variant mt-1 font-mono">
            Try adjusting your search or add a new ingredient to your fridge.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`rounded-3xl glass-panel p-5 flex flex-col justify-between border transition-all duration-300 hover:-translate-y-1.5 glass-edge group ${
                item.daysRemaining <= 1
                  ? 'border-error/40 bg-gradient-to-b from-error/5 to-transparent'
                  : item.daysRemaining <= 3
                  ? 'border-yellow-500/30'
                  : 'border-white/10 hover:border-primary/30'
              }`}
            >
              <div>
                {/* Top status line */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  {getStatusBadge(item)}
                  <span className="font-mono text-[11px] text-on-surface-variant font-medium">
                    {item.quantity}
                  </span>
                </div>

                {/* Thumbnail Image */}
                <div className="relative w-full h-36 rounded-2xl overflow-hidden mb-4 border border-white/10 group-hover:border-white/25 transition-all">
                  <div
                    className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url('${item.imageUrl}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                  <span className="absolute bottom-2.5 left-3 font-mono text-[10px] px-2 py-0.5 rounded-md glass-panel-deep text-white border border-white/15">
                    {item.category}
                  </span>
                </div>

                {/* Title & Notes */}
                <h3 className="font-display font-bold text-lg text-white tracking-tight group-hover:text-primary transition-colors">
                  {item.name}
                </h3>
                {item.nutritionNotes && (
                  <p className="text-xs text-on-surface-variant/80 mt-1 line-clamp-2">
                    {item.nutritionNotes}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-3 border-t border-white/10 flex items-center justify-between gap-2">
                <button
                  onClick={() => onSelectRecipeForIngredient(item.name)}
                  className="flex-1 py-2 px-3 rounded-xl bg-white/5 hover:bg-tertiary/20 text-tertiary hover:text-white border border-tertiary/30 font-mono text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all"
                  title="Find recipes using this"
                >
                  <Utensils className="w-3.5 h-3.5" />
                  <span>{item.recipesCount} RECIPES</span>
                </button>

                <button
                  onClick={() => onConsumeItem(item)}
                  className="p-2 rounded-xl bg-primary/10 hover:bg-primary text-primary hover:text-background border border-primary/20 transition-all"
                  title="Mark as cooked & rescued"
                >
                  <Check className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onDeleteItem(item.id)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-error/20 text-on-surface-variant hover:text-error transition-all"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
