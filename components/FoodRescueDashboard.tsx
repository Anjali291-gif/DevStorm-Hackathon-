'use client';

import React, { useState } from 'react';
import { Leaf, DollarSign, Sparkles, TrendingUp, ShieldCheck, Award } from 'lucide-react';
import { RescueStats } from '../lib/types';

interface FoodRescueDashboardProps {
  stats: RescueStats;
}

export const FoodRescueDashboard: React.FC<FoodRescueDashboardProps> = ({ stats }) => {
  const [userGroceriesPerWeek, setUserGroceriesPerWeek] = useState(2500);

  const potentialAnnualSavings = Math.round(userGroceriesPerWeek * 0.28 * 52);
  const potentialCo2Saved = Math.round(userGroceriesPerWeek * 0.003 * 52);

  const progressPercent = Math.min(
    100,
    Math.round((stats.foodRescuedKg / stats.monthlyGoalKg) * 100)
  );

  return (
    <section id="impact-section" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
      <div className="glass-panel rounded-3xl p-8 sm:p-12 md:p-16 relative overflow-hidden border border-secondary/30 glass-edge">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/15 rounded-full blur-[120px] pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-tertiary/10 rounded-full blur-[100px] pointer-events-none -z-10" />

        {/* Section Header */}
        <div className="relative z-10 flex flex-col items-center text-center mb-14">
          <div className="w-14 h-14 rounded-2xl bg-secondary/15 border border-secondary/30 flex items-center justify-center text-secondary mb-4 shadow-[0_0_25px_rgba(208,188,255,0.3)]">
            <Leaf className="w-7 h-7" />
          </div>
          <span className="font-mono text-xs font-semibold text-secondary tracking-widest uppercase mb-2">
            SUSTAINABILITY &amp; IMPACT
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
            FOOD RESCUE IMPACT
          </h2>
          <p className="font-body text-base text-on-surface-variant max-w-xl mt-2">
            Your real-time contribution to minimizing kitchen waste, lowering emissions, and saving household budget.
          </p>
        </div>

        {/* Primary Metric Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 mb-12">
          {/* Stat 1: Food Rescued */}
          <div className="bg-surface-container-highest/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 hover:border-tertiary/40">
            <div className="flex items-baseline gap-1 text-tertiary font-display text-5xl font-bold tracking-tight mb-2 glow-text-subtle">
              <span>{stats.foodRescuedKg.toFixed(1)}</span>
              <span className="text-2xl font-mono">KG</span>
            </div>
            <span className="font-mono text-xs font-bold text-on-surface-variant tracking-wider uppercase">
              FOOD RESCUED THIS MONTH
            </span>
            <span className="text-xs text-tertiary/80 mt-1 font-mono">↑ 18% from last month</span>
          </div>

          {/* Stat 2: Money Saved */}
          <div className="bg-surface-container-highest/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
            <div className="flex items-baseline gap-1 text-primary font-display text-5xl font-bold tracking-tight mb-2 glow-text-primary">
              <span className="text-3xl">₹</span>
              <span>{stats.moneySaved}</span>
            </div>
            <span className="font-mono text-xs font-bold text-on-surface-variant tracking-wider uppercase">
              HOUSEHOLD MONEY SAVED
            </span>
            <span className="text-xs text-primary/80 mt-1 font-mono">Estimated grocery value</span>
          </div>

          {/* Stat 3: Ingredients Saved */}
          <div className="bg-surface-container-highest/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 hover:border-secondary/40">
            <div className="flex items-baseline gap-1 text-secondary font-display text-5xl font-bold tracking-tight mb-2">
              <span>{stats.ingredientsSaved}</span>
              <span className="text-2xl font-mono">ITEMS</span>
            </div>
            <span className="font-mono text-xs font-bold text-on-surface-variant tracking-wider uppercase">
              INGREDIENTS RESCUED
            </span>
            <span className="text-xs text-secondary/80 mt-1 font-mono">{stats.co2SavedKg}kg CO₂ emissions avoided</span>
          </div>
        </div>

        {/* Monthly Goal Progress Bar */}
        <div className="glass-panel p-6 rounded-3xl border border-white/10 mb-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-tertiary" />
              <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                Monthly Zero-Waste Milestone
              </span>
            </div>
            <span className="font-mono text-xs text-tertiary font-bold">
              {stats.foodRescuedKg.toFixed(1)} / {stats.monthlyGoalKg.toFixed(1)} KG ({progressPercent}%)
            </span>
          </div>

          <div className="w-full h-3 bg-surface-container-highest rounded-full overflow-hidden p-0.5 border border-white/10">
            <div
              className="h-full bg-gradient-to-r from-primary-container via-tertiary to-secondary rounded-full transition-all duration-700 shadow-[0_0_15px_rgba(68,214,254,0.5)]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Interactive Savings Estimator */}
        <div className="bg-surface-container-low/60 rounded-3xl p-6 sm:p-8 border border-white/10">
          <div className="flex items-center gap-2.5 mb-4">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3 className="font-display font-bold text-lg text-white">
              Zero-Waste Annual Savings Estimator
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-on-surface-variant mb-6">
            Adjust your estimated weekly grocery spend to calculate how much FridgeWise can save you every year.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-3">
              <div className="flex justify-between text-xs font-mono text-white">
                <span>Weekly Grocery Spend:</span>
                <span className="font-bold text-tertiary text-sm">₹{userGroceriesPerWeek.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="10000"
                step="500"
                value={userGroceriesPerWeek}
                onChange={(e) => setUserGroceriesPerWeek(Number(e.target.value))}
                className="w-full h-2 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[10px] font-mono text-on-surface-variant">
                <span>₹1,000 / week</span>
                <span>₹5,000 / week</span>
                <span>₹10,000 / week</span>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="glass-panel p-4 rounded-2xl border border-primary/30 text-center">
                <span className="text-[10px] font-mono text-on-surface-variant uppercase block">
                  Est. Annual Savings
                </span>
                <span className="font-display font-bold text-xl sm:text-2xl text-primary mt-1 block">
                  ₹{potentialAnnualSavings.toLocaleString()}
                </span>
              </div>
              <div className="glass-panel p-4 rounded-2xl border border-tertiary/30 text-center">
                <span className="text-[10px] font-mono text-on-surface-variant uppercase block">
                  CO₂ Offset / Year
                </span>
                <span className="font-display font-bold text-xl sm:text-2xl text-tertiary mt-1 block">
                  {potentialCo2Saved} kg
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
