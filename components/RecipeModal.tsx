'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Clock,
  Flame,
  CheckCircle2,
  AlertCircle,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Utensils,
  Share2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Recipe } from '../lib/types';

interface RecipeModalProps {
  recipe: Recipe | null;
  onClose: () => void;
  onCookRecipe: (recipe: Recipe) => void;
}

export const RecipeModal: React.FC<RecipeModalProps> = ({ recipe, onClose, onCookRecipe }) => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    if (recipe) {
      setTimerSeconds(recipe.timeMinutes * 60);
      setIsTimerRunning(false);
      setCompletedSteps([]);
    }
  }, [recipe]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      try {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      } catch {
        // ignore
      }
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  if (!recipe) return null;

  const toggleStep = (index: number) => {
    if (completedSteps.includes(index)) {
      setCompletedSteps(completedSteps.filter((s) => s !== index));
    } else {
      setCompletedSteps([...completedSteps, index]);
    }
  };

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleFinishCooking = () => {
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 },
      });
    } catch {
      // ignore
    }
    onCookRecipe(recipe);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] rounded-3xl glass-panel-deep border border-white/15 shadow-2xl flex flex-col overflow-hidden glass-edge"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image and Dismiss */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden flex-shrink-0">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('${recipe.image}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-background/60 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full glass-panel-deep text-white hover:bg-white/20 transition-all border border-white/20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Match badge */}
          <div className="absolute top-4 left-4 glass-panel-deep px-3.5 py-1.5 rounded-full flex items-center gap-1.5 border border-tertiary/40">
            <Sparkles className="w-4 h-4 text-tertiary" />
            <span className="font-mono text-xs font-bold text-tertiary">
              {recipe.matchScore}% MATCH WITH FRIDGE
            </span>
          </div>

          {/* Title inside hero banner */}
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex flex-wrap gap-2 mb-2">
              {recipe.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-md glass-panel text-[11px] font-mono text-primary border border-primary/20"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
              {recipe.title}
            </h2>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-grow">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-3">
            <div className="glass-panel p-3 rounded-2xl flex flex-col items-center justify-center border border-white/10 text-center">
              <Clock className="w-4 h-4 text-primary mb-1" />
              <span className="font-mono text-xs font-semibold text-white">{recipe.timeMinutes} Mins</span>
              <span className="text-[10px] text-on-surface-variant font-mono">COOK TIME</span>
            </div>
            <div className="glass-panel p-3 rounded-2xl flex flex-col items-center justify-center border border-white/10 text-center">
              <Flame className="w-4 h-4 text-secondary mb-1" />
              <span className="font-mono text-xs font-semibold text-white">{recipe.calories} Kcal</span>
              <span className="text-[10px] text-on-surface-variant font-mono">CALORIES</span>
            </div>
            <div className="glass-panel p-3 rounded-2xl flex flex-col items-center justify-center border border-white/10 text-center">
              <Utensils className="w-4 h-4 text-tertiary mb-1" />
              <span className="font-mono text-xs font-semibold text-white">{recipe.difficulty}</span>
              <span className="text-[10px] text-on-surface-variant font-mono">DIFFICULTY</span>
            </div>
          </div>

          {/* Interactive Cooking Timer */}
          <div className="glass-panel p-4 rounded-2xl border border-tertiary/30 flex items-center justify-between bg-gradient-to-r from-tertiary/10 to-transparent">
            <div>
              <span className="font-mono text-[10px] tracking-wider text-tertiary uppercase font-bold block">
                INTELLIGENT KITCHEN TIMER
              </span>
              <span className="font-mono text-2xl font-bold text-white tracking-wider">
                {formatTimer(timerSeconds)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className={`p-2.5 rounded-full font-mono text-xs font-semibold flex items-center gap-1.5 shadow-md ${
                  isTimerRunning ? 'bg-error text-white' : 'bg-tertiary text-background'
                }`}
              >
                {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isTimerRunning ? 'PAUSE' : 'START'}</span>
              </button>
              <button
                onClick={() => {
                  setIsTimerRunning(false);
                  setTimerSeconds(recipe.timeMinutes * 60);
                }}
                className="p-2.5 rounded-full glass-panel text-on-surface-variant hover:text-white border border-white/15"
                title="Reset Timer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Ingredients Analysis */}
          <div className="space-y-3">
            <h3 className="font-display font-semibold text-base text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-tertiary" />
              <span>Ingredients Match ({recipe.matchedIngredients.length} Found in Fridge)</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs">
              {recipe.matchedIngredients.map((ing) => (
                <div
                  key={ing}
                  className="p-2.5 rounded-xl glass-panel border border-tertiary/20 flex items-center gap-2 text-white bg-tertiary/5"
                >
                  <span className="w-2 h-2 rounded-full bg-tertiary" />
                  <span>{ing}</span>
                </div>
              ))}
              {recipe.missingIngredients.map((ing) => (
                <div
                  key={ing}
                  className="p-2.5 rounded-xl glass-panel border border-white/10 flex items-center gap-2 text-on-surface-variant"
                >
                  <span className="w-2 h-2 rounded-full bg-on-surface-variant/40" />
                  <span>{ing} (Optional/Pantry)</span>
                </div>
              ))}
            </div>
          </div>

          {/* Step-by-Step Cooking Steps */}
          <div className="space-y-3">
            <h3 className="font-display font-semibold text-base text-white flex items-center justify-between">
              <span>Cooking Steps ({completedSteps.length}/{recipe.instructions.length} Completed)</span>
            </h3>
            <div className="space-y-2.5">
              {recipe.instructions.map((step, idx) => {
                const isDone = completedSteps.includes(idx);
                return (
                  <div
                    key={idx}
                    onClick={() => toggleStep(idx)}
                    className={`p-3.5 rounded-2xl glass-panel border transition-all cursor-pointer flex items-start gap-3.5 ${
                      isDone
                        ? 'border-tertiary/40 bg-tertiary/10 opacity-75'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs font-bold flex-shrink-0 transition-colors ${
                        isDone ? 'bg-tertiary text-background' : 'glass-panel text-on-surface-variant'
                      }`}
                    >
                      {isDone ? '✓' : idx + 1}
                    </div>
                    <p className={`text-sm ${isDone ? 'line-through text-on-surface-variant' : 'text-white'}`}>
                      {step}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-white/10 glass-panel-deep flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full font-mono text-xs text-on-surface-variant hover:text-white transition-colors"
          >
            CANCEL
          </button>

          <button
            onClick={handleFinishCooking}
            className="pill-gradient px-7 py-3 rounded-full font-mono text-xs font-semibold flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>FINISH &amp; RESCUE INGREDIENTS</span>
          </button>
        </div>
      </div>
    </div>
  );
};
