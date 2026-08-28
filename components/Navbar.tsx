'use client';

import React, { useState, useEffect } from 'react';
import { Scan, Menu, X, Refrigerator, ChefHat, Leaf, BarChart3 } from 'lucide-react';
import Image from 'next/image';

interface NavbarProps {
  onOpenScanner: () => void;
  onOpenAssistant: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenScanner, onOpenAssistant }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pointer-events-none">
      <nav
        className={`pointer-events-auto w-full max-w-6xl rounded-full border transition-all duration-300 px-5 py-3 flex items-center justify-between shadow-2xl glass-edge ${
          isScrolled
            ? 'bg-surface/85 backdrop-blur-2xl border-white/15 shadow-[0_0_30px_rgba(82,141,255,0.2)] py-2.5'
            : 'bg-surface/50 backdrop-blur-xl border-white/10 shadow-[0_0_20px_rgba(175,198,255,0.1)]'
        }`}
      >
        {/* Brand Logo */}
        <a
          href="#"
          className="flex items-center gap-3 group focus:outline-none"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <div className="relative w-9 h-9 rounded-full bg-gradient-to-tr from-primary-container via-primary to-tertiary p-[1.5px] shadow-[0_0_15px_rgba(82,141,255,0.5)] group-hover:scale-105 transition-transform">
            <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
              <Refrigerator className="w-4 h-4 text-tertiary group-hover:rotate-6 transition-transform" />
            </div>
            <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-tertiary rounded-full animate-ping" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
              FRIDGE<span className="text-tertiary font-extrabold">WISE</span>
            </span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-primary/70 -mt-1">
              AI Smart Kitchen
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center gap-7 font-mono text-xs tracking-wider">
          <li>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-primary hover:text-white font-semibold transition-colors flex items-center gap-1"
            >
              <span>HOME</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection('inventory-section')}
              className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1.5"
            >
              <Refrigerator className="w-3.5 h-3.5" />
              <span>MY FRIDGE</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection('recipes-section')}
              className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1.5"
            >
              <ChefHat className="w-3.5 h-3.5" />
              <span>RECIPES</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection('impact-section')}
              className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1.5"
            >
              <Leaf className="w-3.5 h-3.5" />
              <span>FOOD RESCUE</span>
            </button>
          </li>
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenAssistant}
            className="hidden sm:flex items-center gap-1.5 pl-1 pr-3.5 py-1 rounded-full border border-secondary/30 bg-secondary/10 hover:bg-secondary/20 text-secondary text-xs font-mono transition-all duration-200"
            title="Ask AI Chef"
          >
            <Image
              src="/ai-chef-original.png"
              alt="AI Chef"
              width={26}
              height={26}
              className="w-6 h-6 object-contain rounded-full"
            />
            <span>AI CHEF</span>
          </button>

          <button
            onClick={onOpenScanner}
            className="pill-gradient px-4 sm:px-5 py-2 rounded-full font-mono text-xs tracking-wider font-semibold flex items-center gap-2"
          >
            <Scan className="w-4 h-4" />
            <span className="hidden xs:inline">SCAN MY FRIDGE</span>
            <span className="xs:hidden">SCAN</span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-primary hover:text-white rounded-lg glass-panel focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto absolute top-20 left-4 right-4 rounded-3xl glass-panel-deep p-6 border border-white/15 shadow-2xl backdrop-blur-3xl md:hidden animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-4 font-mono text-sm">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 rounded-xl hover:bg-white/5 text-primary flex items-center gap-3"
            >
              <Refrigerator className="w-4 h-4" />
              <span>HOME OVERVIEW</span>
            </button>
            <button
              onClick={() => scrollToSection('inventory-section')}
              className="text-left py-2 px-3 rounded-xl hover:bg-white/5 text-on-surface flex items-center gap-3"
            >
              <Refrigerator className="w-4 h-4 text-tertiary" />
              <span>MY FRIDGE INVENTORY</span>
            </button>
            <button
              onClick={() => scrollToSection('recipes-section')}
              className="text-left py-2 px-3 rounded-xl hover:bg-white/5 text-on-surface flex items-center gap-3"
            >
              <ChefHat className="w-4 h-4 text-primary" />
              <span>AI RECIPE DISCOVERY</span>
            </button>
            <button
              onClick={() => scrollToSection('impact-section')}
              className="text-left py-2 px-3 rounded-xl hover:bg-white/5 text-on-surface flex items-center gap-3"
            >
              <BarChart3 className="w-4 h-4 text-secondary" />
              <span>FOOD RESCUE IMPACT</span>
            </button>

            <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAssistant();
                }}
                className="w-full py-2 rounded-xl border border-secondary/30 bg-secondary/10 text-secondary text-xs flex items-center justify-center gap-2"
              >
                <Image
                  src="/ai-chef-original.png"
                  alt="AI Chef"
                  width={24}
                  height={24}
                  className="w-6 h-6 object-contain rounded-full"
                />
                <span>CHAT WITH AI CHEF</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenScanner();
                }}
                className="w-full pill-gradient py-2.5 rounded-xl text-xs flex items-center justify-center gap-2"
              >
                <Scan className="w-4 h-4" />
                <span>SCAN MY FRIDGE (CAMERA AI)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
