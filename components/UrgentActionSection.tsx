'use client';

import React from 'react';
import { AlertCircle, ArrowRight, Flame, Sparkles, Clock, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

interface UrgentActionProps {
  onCookNow: () => void;
  onExploreRecipes: () => void;
}

export const UrgentActionSection: React.FC<UrgentActionProps> = ({
  onCookNow,
  onExploreRecipes,
}) => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background glow and skew container */}
      <div className="absolute inset-0 bg-surface-container-low/40 skew-y-[-2deg] origin-top-left -z-10" />
      <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-tertiary/15 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Visual Holographic Orb of Expiring Ingredient */}
        <div className="lg:col-span-5 relative flex justify-center order-2 lg:order-1">
          <div className="relative w-72 sm:w-88 aspect-square rounded-full glass-panel glass-edge flex items-center justify-center p-6 border border-tertiary/30 shadow-[0_0_50px_rgba(68,214,254,0.2)]">
            {/* Spinning decorative orbit rings */}
            <div className="absolute inset-2 rounded-full border border-dashed border-tertiary/30 animate-spin" style={{ animationDuration: '24s' }} />
            <div className="absolute inset-6 rounded-full border border-tertiary/20" />

            {/* Central Ingredient Image */}
            <div className="relative w-full h-full rounded-full overflow-hidden border border-white/20 shadow-inner group">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=800&auto=format&fit=crop&q=80')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-primary/10" />
            </div>

            {/* Expiry Badge Overlay */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 glass-panel-deep px-5 py-2 rounded-full flex items-center gap-2.5 border border-error/40 shadow-xl whitespace-nowrap">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-error"></span>
              </span>
              <span className="font-mono text-xs font-bold text-white tracking-wide">
                EXPIRES IN 24 HOURS
              </span>
            </div>

            {/* AI Match Badge */}
            <div className="absolute -top-3 right-4 glass-panel px-3.5 py-1.5 rounded-full flex items-center gap-1.5 border border-tertiary/40 shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-tertiary" />
              <span className="font-mono text-[10px] text-tertiary font-bold">3 RECIPES READY</span>
            </div>
          </div>
        </div>

        {/* Right Column: Urgent Action Content */}
        <div className="lg:col-span-7 flex flex-col gap-6 order-1 lg:order-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/10 border border-secondary/30 text-secondary w-max">
            <AlertCircle className="w-3.5 h-3.5" />
            <span className="font-mono text-xs font-semibold tracking-wider">
              PRIORITY ZERO-WASTE RADAR
            </span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
            WHAT SHOULD I <br />
            <span className="text-tertiary">COOK FIRST?</span>
          </h2>

          {/* AI Urgent Insight Card */}
          <div className="p-6 rounded-3xl glass-panel border-l-4 border-l-tertiary border-white/10 glass-edge flex flex-col gap-3">
            <div className="flex items-center gap-2 text-tertiary font-mono text-xs font-semibold">
              <Clock className="w-4 h-4" />
              <span>RECOMMENDED BY FRIDGEWISE AI</span>
            </div>
            <p className="font-body text-base sm:text-lg text-white font-medium leading-relaxed">
              &ldquo;Your <span className="text-tertiary font-semibold">Baby Spinach</span> (250g) and <span className="text-secondary font-semibold">Farm Fresh Eggs</span> are approaching peak freshness. Cook the <span className="text-primary font-semibold">Spinach &amp; Herb Omelette</span> to use 100% of expiring stock.&rdquo;
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-1 font-mono text-xs text-on-surface-variant">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-tertiary" /> Saves ₹80 from waste
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Ready in 12 minutes
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onCookNow}
              className="pill-gradient px-8 py-4 rounded-full font-mono text-xs sm:text-sm font-semibold tracking-wider flex items-center justify-center gap-2 group"
            >
              <Flame className="w-4 h-4 text-white animate-bounce" />
              <span>START COOKING NOW</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onExploreRecipes}
              className="glass-panel px-6 py-4 rounded-full font-mono text-xs sm:text-sm font-medium tracking-wider text-white hover:bg-white/10 transition-colors border border-white/15"
            >
              VIEW ALL RESCUE RECIPES
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
