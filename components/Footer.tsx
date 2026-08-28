'use client';

import React from 'react';
import { Refrigerator, Heart, Sparkles, Shield, Github, Twitter } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full rounded-t-[40px] mt-24 border-t border-white/10 bg-gradient-to-b from-surface-container-lowest to-black relative overflow-hidden">
      {/* Ambient glow in footer */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-tertiary p-[1px] flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                  <Refrigerator className="w-4 h-4 text-tertiary" />
                </div>
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-white">
                FRIDGE<span className="text-tertiary">WISE</span>
              </span>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed max-w-sm font-body">
              Pioneering holographic culinary intelligence and smart kitchen management. Built to prevent food waste, inspire mindful cooking, and save household budgets.
            </p>
            <div className="flex items-center gap-2 font-mono text-[11px] text-tertiary">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
              <span>FRIDGE NEURAL ENGINE v3.4 ONLINE</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 flex flex-col gap-3 font-mono text-xs">
            <span className="text-white font-bold tracking-wider uppercase mb-1">PLATFORM</span>
            <a href="#inventory-section" className="text-on-surface-variant hover:text-white transition-colors">
              Smart Fridge Tracker
            </a>
            <a href="#recipes-section" className="text-on-surface-variant hover:text-white transition-colors">
              AI Recipe Discovery
            </a>
            <a href="#impact-section" className="text-on-surface-variant hover:text-white transition-colors">
              Food Rescue Dashboard
            </a>
            <a href="#" className="text-on-surface-variant hover:text-white transition-colors">
              3D Holographic View
            </a>
          </div>

          {/* Compliance & AI Ethics Column */}
          <div className="md:col-span-4 flex flex-col gap-3 font-mono text-xs">
            <span className="text-white font-bold tracking-wider uppercase mb-1">SUSTAINABILITY &amp; ETHICS</span>
            <div className="p-4 rounded-2xl glass-panel border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-primary font-semibold">
                <Shield className="w-4 h-4" />
                <span>Zero-Waste AI Commitment</span>
              </div>
              <p className="text-[11px] text-on-surface-variant font-sans leading-normal">
                Our models strictly optimize for household grocery preservation, nutrition density, and minimizing municipal landfill footprint.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-on-surface-variant/70 font-mono">
          <div>
            © 2026 FRIDGEWISE AI. The Future of Zero-Waste Cooking.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
