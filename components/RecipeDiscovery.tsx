'use client';

import React from 'react';
import { ChefHat, Clock, Sparkles, ChevronRight, Gauge } from 'lucide-react';
import { Recipe } from '../lib/types';

interface RecipeDiscoveryProps {
  recipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
}

export const RecipeDiscovery: React.FC<RecipeDiscoveryProps> = ({
  recipes,
  onSelectRecipe,
}) => {
  return (
    <section id="recipes-section" className="py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto relative z-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="font-mono text-xs tracking-wider">AI RECOMMENDATIONS</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
            RECIPE DISCOVERY
          </h2>
          <p className="text-on-surface-variant text-sm mt-1">
            Dynamic recipes matched to what&apos;s currently expiring in your fridge.
          </p>
        </div>

        <button
          onClick={() => onSelectRecipe(recipes[0])}
          className="text-primary hover:text-white transition-colors flex items-center gap-1.5 font-mono text-xs border-b border-primary/30 pb-1 hover:border-primary"
        >
          <span>QUICK COOK HIGHEST MATCH</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Grid of Recipes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            onClick={() => onSelectRecipe(recipe)}
            className="group glass-panel rounded-3xl overflow-hidden glass-edge border border-white/10 hover:border-primary/40 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 cursor-pointer shadow-xl"
          >
            <div>
              {/* Recipe Cover Image with Match Badge */}
              <div className="h-48 w-full relative overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                  style={{ backgroundImage: `url('${recipe.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />

                {/* Match percentage chip */}
                <div className="absolute top-3 right-3 glass-panel-deep px-3 py-1 rounded-full flex items-center gap-1 border border-tertiary/40 shadow-lg">
                  <Sparkles className="w-3 h-3 text-tertiary" />
                  <span className="font-mono text-[11px] text-tertiary font-bold">
                    {recipe.matchScore}% MATCH
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md glass-panel-deep font-mono text-[10px] text-white border border-white/15">
                    {recipe.difficulty}
                  </span>
                  <span className="px-2 py-0.5 rounded-md glass-panel-deep font-mono text-[10px] text-primary border border-primary/20">
                    {recipe.calories} kcal
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-primary transition-colors">
                  {recipe.title}
                </h3>
                <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed mb-4">
                  {recipe.description}
                </p>

                {/* Metrics */}
                <div className="flex items-center gap-4 text-xs font-mono text-on-surface-variant/90 mb-2">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-tertiary" />
                    <span>{recipe.timeMinutes}m prep</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ChefHat className="w-3.5 h-3.5 text-secondary" />
                    <span>{recipe.matchedIngredients.length} items ready</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom CTA Button */}
            <div className="px-5 pb-5 pt-0">
              <button className="w-full py-2.5 rounded-2xl border border-white/10 group-hover:border-primary/50 group-hover:bg-primary/10 text-white font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all">
                <span>VIEW RECIPE</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
