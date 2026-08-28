'use client';

import React, { useState } from 'react';
import { X, Plus, Sparkles, Tag, Calendar, Scale } from 'lucide-react';
import { FridgeItem } from '../lib/types';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddItem: (item: FridgeItem) => void;
}

export const AddItemModal: React.FC<AddItemModalProps> = ({ isOpen, onClose, onAddItem }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<FridgeItem['category']>('Produce');
  const [quantity, setQuantity] = useState('1 pack');
  const [daysRemaining, setDaysRemaining] = useState(4);
  const [estimatedValue, setEstimatedValue] = useState(60);
  const [nutritionNotes, setNutritionNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newItem: FridgeItem = {
      id: `item-${Date.now()}`,
      name: name.trim(),
      category,
      quantity,
      addedDate: new Date().toISOString().split('T')[0],
      expiryDate: new Date(Date.now() + daysRemaining * 86400000).toISOString().split('T')[0],
      daysRemaining,
      status: daysRemaining <= 1 ? 'critical' : daysRemaining <= 3 ? 'expiring-soon' : 'fresh',
      iconName: 'Leaf',
      imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop&q=80',
      estimatedWasteValue: estimatedValue,
      nutritionNotes: nutritionNotes.trim() || 'Custom added grocery item',
      recipesCount: 2,
    };

    onAddItem(newItem);
    setName('');
    setQuantity('1 pack');
    setDaysRemaining(4);
    setNutritionNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-2xl animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg rounded-3xl glass-panel-deep border border-white/15 shadow-2xl p-6 glass-edge"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-primary/20 text-primary border border-primary/30">
              <Plus className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-lg text-white">Add New Ingredient</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full glass-panel text-on-surface-variant hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
          {/* Ingredient Name */}
          <div>
            <label className="block text-on-surface-variant font-medium mb-1.5">
              INGREDIENT NAME *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Greek Feta Cheese, Strawberries"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl glass-panel border border-white/10 text-white placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary/60 text-sm font-sans"
            />
          </div>

          {/* Category & Quantity Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-on-surface-variant font-medium mb-1.5">
                CATEGORY
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as FridgeItem['category'])}
                className="w-full px-3 py-2.5 rounded-2xl glass-panel-deep border border-white/10 text-white focus:outline-none focus:border-primary/60"
              >
                <option value="Produce">Produce (Veg/Fruit)</option>
                <option value="Dairy">Dairy</option>
                <option value="Protein">Protein &amp; Eggs</option>
                <option value="Bakery">Bakery</option>
                <option value="Pantry">Pantry</option>
                <option value="Condiment">Condiments</option>
              </select>
            </div>

            <div>
              <label className="block text-on-surface-variant font-medium mb-1.5">
                QUANTITY / WEIGHT
              </label>
              <input
                type="text"
                placeholder="e.g. 500g, 2 pcs, 1L"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl glass-panel border border-white/10 text-white placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary/60 text-sm font-sans"
              />
            </div>
          </div>

          {/* Days until expiry */}
          <div>
            <div className="flex justify-between mb-1.5">
              <label className="text-on-surface-variant font-medium">SHELF LIFE (DAYS REMAINING)</label>
              <span className="text-tertiary font-bold">{daysRemaining} Days</span>
            </div>
            <input
              type="range"
              min="1"
              max="14"
              value={daysRemaining}
              onChange={(e) => setDaysRemaining(Number(e.target.value))}
              className="w-full h-2 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-tertiary"
            />
            <div className="flex justify-between text-[10px] text-on-surface-variant/70 mt-1">
              <span className="text-error font-semibold">1 Day (Critical)</span>
              <span>7 Days</span>
              <span>14 Days (Fresh)</span>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-on-surface-variant font-medium mb-1.5">
              NUTRITION / STORAGE NOTES (OPTIONAL)
            </label>
            <input
              type="text"
              placeholder="e.g. Keep chilled in crisper drawer"
              value={nutritionNotes}
              onChange={(e) => setNutritionNotes(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl glass-panel border border-white/10 text-white placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary/60 text-sm font-sans"
            />
          </div>

          {/* Buttons */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-on-surface-variant hover:text-white transition-colors"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="pill-gradient px-6 py-2.5 rounded-full font-semibold flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>SAVE INGREDIENT</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
