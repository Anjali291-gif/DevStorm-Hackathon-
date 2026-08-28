'use client';

import React from 'react';
import { Camera, Cpu, Sparkles, Utensils, ArrowUpRight } from 'lucide-react';

interface WorkflowStep {
  number: string;
  title: string;
  description: string;
  tag: string;
  icon: React.ReactNode;
  accentColor: string;
  glowClass: string;
  bgGradient: string;
  image: string;
}

const steps: WorkflowStep[] = [
  {
    number: '01',
    title: 'SCAN',
    tag: 'COMPUTER VISION',
    description: 'Snap a picture or add items with voice. AI scans and tags your fresh groceries instantly.',
    icon: <Camera className="w-5 h-5" />,
    accentColor: '#afc6ff',
    glowClass: 'group-hover:shadow-[0_0_30px_rgba(175,198,255,0.4)]',
    bgGradient: 'from-primary/10 to-transparent',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80',
  },
  {
    number: '02',
    title: 'ANALYZE',
    tag: 'FRESHNESS PREDICTION',
    description: 'Neural freshness model predicts shelf life, moisture, and alerts you before items degrade.',
    icon: <Cpu className="w-5 h-5" />,
    accentColor: '#44d6fe',
    glowClass: 'group-hover:shadow-[0_0_30px_rgba(68,214,254,0.4)]',
    bgGradient: 'from-tertiary/10 to-transparent',
    image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=600&auto=format&fit=crop&q=80',
  },
  {
    number: '03',
    title: 'DISCOVER',
    tag: 'DYNAMIC MATCHING',
    description: 'Instant recipes curated exclusively from existing ingredients, prioritizing critical expiry items.',
    icon: <Sparkles className="w-5 h-5" />,
    accentColor: '#d0bcff',
    glowClass: 'group-hover:shadow-[0_0_30px_rgba(208,188,255,0.4)]',
    bgGradient: 'from-secondary/10 to-transparent',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&auto=format&fit=crop&q=80',
  },
  {
    number: '04',
    title: 'COOK & RESCUE',
    tag: 'ZERO WASTE IMPACT',
    description: 'Cook delicious meals with step-by-step guidance, saving money and tracking planetary impact.',
    icon: <Utensils className="w-5 h-5" />,
    accentColor: '#528dff',
    glowClass: 'group-hover:shadow-[0_0_30px_rgba(82,141,255,0.4)]',
    bgGradient: 'from-primary-container/10 to-transparent',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80',
  },
];

export const WorkflowSection: React.FC = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto relative z-10">
      {/* Header */}
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <span className="font-mono text-xs font-semibold text-tertiary tracking-widest uppercase mb-3 inline-block">
          SEAMLESS ZERO-WASTE INTELLIGENCE
        </span>
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
          FROM FRIDGE TO PLATE
        </h2>
        <p className="font-body text-base text-on-surface-variant mt-3">
          A four-step intelligent system that eliminates food waste and elevates your daily culinary routines.
        </p>
      </div>

      {/* Grid of Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, idx) => (
          <div
            key={step.number}
            className="group relative rounded-3xl glass-panel p-6 flex flex-col justify-between border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-2 glass-edge overflow-hidden"
          >
            {/* Ambient Background Gradient on Hover */}
            <div
              className={`absolute inset-0 bg-gradient-to-b ${step.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
            />

            {/* Top row with step number and icon */}
            <div className="flex items-center justify-between relative z-10 mb-6">
              <div
                className="w-12 h-12 rounded-2xl glass-panel-bright flex items-center justify-center font-mono font-bold text-base transition-all duration-300 group-hover:scale-110"
                style={{ color: step.accentColor, border: `1px solid ${step.accentColor}40` }}
              >
                {step.number}
              </div>
              <div className="p-2.5 rounded-full bg-white/5 text-on-surface-variant group-hover:text-white transition-colors">
                {step.icon}
              </div>
            </div>

            {/* Step info */}
            <div className="relative z-10 flex flex-col gap-2 mb-6">
              <span className="font-mono text-[10px] tracking-widest uppercase font-semibold text-on-surface-variant">
                {step.tag}
              </span>
              <h3 className="font-display font-bold text-xl text-white tracking-tight group-hover:text-tertiary transition-colors">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed font-normal">
                {step.description}
              </p>
            </div>

            {/* Preview Image Thumbnail */}
            <div className="relative z-10 w-full h-36 rounded-2xl overflow-hidden border border-white/10 mt-auto">
              <div
                className="w-full h-full bg-cover bg-center opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                style={{ backgroundImage: `url('${step.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
