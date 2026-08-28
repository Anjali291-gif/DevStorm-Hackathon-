'use client';

import React from 'react';
import { ArrowRight, AlertTriangle, ChefHat, Scan } from 'lucide-react';
import { InteractiveFridgeCard } from './InteractiveFridgeCard';

interface HeroSectionProps {
  onExploreFridge: () => void;
  onOpenScanner: () => void;
  onSelectUrgentRecipe: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreFridge,
  onOpenScanner,
  onSelectUrgentRecipe,
}) => {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center px-4 sm:px-6 lg:px-12 pt-28 pb-16 max-w-7xl mx-auto overflow-hidden">
      {/* Ambient background volumetric lighting */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-0 w-[450px] h-[450px] bg-secondary-container/20 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center relative z-10">
        {/* Left Column: Headlines & Call to Actions */}
        <div className="lg:col-span-6 flex flex-col gap-6 max-w-2xl">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-panel border border-tertiary/30 w-max shadow-[0_0_20px_rgba(68,214,254,0.15)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary"></span>
            </span>
            <span className="font-mono text-xs font-semibold text-tertiary tracking-widest uppercase">
              AI-POWERED SMART KITCHEN
            </span>
          </div>

          {/* Main Title */}
          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-[1.12]">
            KNOW WHAT&apos;S IN <br />
            YOUR FRIDGE. <br />
            <span className="text-gradient">COOK WHAT EXPIRES FIRST.</span>
          </h1>

          {/* Subtitle description */}
          <p className="font-body text-base sm:text-lg text-on-surface-variant leading-relaxed font-normal max-w-xl">
            FridgeWise continuously tracks your ingredients, predicts freshness timelines, and automatically curates delicious zero-waste recipes before food spoils.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onExploreFridge}
              className="pill-gradient px-7 py-3.5 rounded-full font-mono text-xs sm:text-sm tracking-wider font-semibold flex items-center justify-center gap-2.5 group"
            >
              <span>EXPLORE MY FRIDGE</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onOpenScanner}
              className="glass-panel px-6 py-3.5 rounded-full font-mono text-xs sm:text-sm tracking-wider text-white hover:bg-white/10 transition-all border border-white/15 flex items-center gap-2"
            >
              <Scan className="w-4 h-4 text-tertiary" />
              <span>SCAN INGREDIENTS</span>
            </button>
          </div>

          {/* Urgent Recipe Highlight Banner */}
          <div
            onClick={onSelectUrgentRecipe}
            className="mt-3 p-4 sm:p-5 rounded-2xl glass-panel border border-tertiary/30 hover:border-tertiary/60 transition-all cursor-pointer group glass-edge bg-gradient-to-r from-tertiary/10 via-surface/40 to-transparent"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-xl bg-tertiary/20 text-tertiary border border-tertiary/30 mt-0.5 group-hover:scale-110 transition-transform">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] tracking-widest text-tertiary font-bold uppercase">
                      COOK ME FIRST RECOMMENDATION
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-error-container/60 text-error text-[10px] font-mono font-semibold">
                      Expires in 24h
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-sm sm:text-base text-white mt-1 group-hover:text-tertiary transition-colors">
                    Baby Spinach: 3 quick recipes available
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    Suggested: Spinach Omelette (98% match, 12 min prep)
                  </p>
                </div>
              </div>
              <div className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full glass-panel group-hover:bg-tertiary group-hover:text-background transition-colors text-tertiary">
                <ChefHat className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive 3D Smart Fridge */}
        <div className="lg:col-span-6 relative flex items-center justify-center">
          {/* Interactive 3D Fridge Card */}
          <InteractiveFridgeCard />
        </div>
      </div>
    </section>
  );
};

