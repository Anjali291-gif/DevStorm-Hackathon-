'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { RotateCw, Sparkles, Thermometer, Droplets, Box, Image as ImageIcon } from 'lucide-react';
import { ThreeFridgeCanvas } from './ThreeFridgeCanvas';

export const InteractiveFridgeCard: React.FC = () => {
  const [viewMode, setViewMode] = useState<'photo3d' | 'threejs'>('photo3d');
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [glareX, setGlareX] = useState(50);
  const [glareY, setGlareY] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0, rotX: 0, rotY: 0 });

  // 3D Pointer / Mouse Tilt Interaction
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      rotX,
      rotY,
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    setGlareX(px * 100);
    setGlareY(py * 100);

    if (isDraggingRef.current) {
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      setRotY(dragStartRef.current.rotY + dx * 0.25);
      setRotX(Math.max(-30, Math.min(30, dragStartRef.current.rotX - dy * 0.25)));
    } else {
      // Gentle hover parallax
      const targetY = (px - 0.5) * 22;
      const targetX = -(py - 0.5) * 22;
      setRotY((prev) => prev + (targetY - prev) * 0.15);
      setRotX((prev) => prev + (targetX - prev) * 0.15);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = false;
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Safe catch
    }
  };

  const handleMouseLeave = () => {
    if (!isDraggingRef.current) {
      setRotX(0);
      setRotY(0);
      setGlareX(50);
      setGlareY(50);
    }
  };

  return (
    <div className="relative w-full max-w-lg mx-auto flex flex-col items-center">
      {/* Mode Switcher Toggle */}
      <div className="flex items-center gap-1.5 mb-3 p-1 rounded-full glass-panel border border-tertiary/30 shadow-lg z-20 backdrop-blur-md">
        <button
          onClick={() => setViewMode('photo3d')}
          className={`flex items-center gap-1.5 px-3.5 py-1 rounded-full font-mono text-xs font-semibold transition-all ${
            viewMode === 'photo3d'
              ? 'bg-gradient-to-r from-tertiary to-primary text-background shadow-md'
              : 'text-white/70 hover:text-white'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5" />
          <span>CYBER SMART FRIDGE</span>
        </button>
        <button
          onClick={() => setViewMode('threejs')}
          className={`flex items-center gap-1.5 px-3.5 py-1 rounded-full font-mono text-xs font-semibold transition-all ${
            viewMode === 'threejs'
              ? 'bg-gradient-to-r from-tertiary to-primary text-background shadow-md'
              : 'text-white/70 hover:text-white'
          }`}
        >
          <Box className="w-3.5 h-3.5" />
          <span>360° 3D MODEL</span>
        </button>
      </div>

      {viewMode === 'threejs' ? (
        <ThreeFridgeCanvas />
      ) : (
        <div
          ref={cardRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onMouseLeave={handleMouseLeave}
          style={{
            perspective: '1200px',
            touchAction: 'none',
          }}
          className="relative w-full rounded-3xl cursor-grab active:cursor-grabbing select-none group"
        >
          {/* Neon Glow halo behind fridge */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-tertiary/30 via-primary/20 to-transparent blur-3xl -z-10 scale-105" />

          {/* 3D Rotatable Container */}
          <div
            style={{
              transform: `rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1, 1, 1)`,
              transition: isDragging ? 'none' : 'transform 0.25s cubic-bezier(0.2, 0, 0.2, 1)',
              transformStyle: 'preserve-3d',
            }}
            className="relative w-full rounded-3xl overflow-hidden glass-panel border border-tertiary/40 shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
          >
            {/* Dynamic Glass Glare Overlay */}
            <div
              style={{
                background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(68,214,254,0.3) 0%, transparent 65%)`,
              }}
              className="absolute inset-0 pointer-events-none z-20 mix-blend-screen transition-opacity duration-300"
            />

            {/* Top HUD Gauges */}
            <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border border-tertiary/40 backdrop-blur-md shadow-lg">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary"></span>
                </span>
                <span className="font-mono text-[10px] text-tertiary font-bold tracking-wider">
                  4°C • 65% HUMIDITY
                </span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-panel border border-primary/40 backdrop-blur-md shadow-lg">
                <Sparkles className="w-3 h-3 text-primary animate-pulse" />
                <span className="font-mono text-[10px] text-primary font-bold tracking-wider">
                  AI SCAN READY
                </span>
              </div>
            </div>

            {/* The Smart Fridge Image */}
            <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-surface-container-lowest">
              <Image
                src="/smart-fridge.jpg"
                alt="Smart Fridge with fresh ingredients and cyan neon lighting"
                fill
                sizes="(max-width: 768px) 100vw, 550px"
                className="object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                priority
              />
            </div>

            {/* Bottom HUD Rotation Instructions */}
            <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border border-white/20 backdrop-blur-md shadow-lg">
                <Thermometer className="w-3 h-3 text-tertiary" />
                <span className="font-mono text-[10px] text-white/90">ECO CHILL 3.8°C</span>
              </div>

              <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass-panel border border-tertiary/50 backdrop-blur-md shadow-[0_0_20px_rgba(68,214,254,0.25)]">
                <RotateCw className="w-3 h-3 text-tertiary animate-spin" style={{ animationDuration: '5s' }} />
                <span className="font-mono text-[10px] text-tertiary font-bold tracking-wider uppercase">
                  DRAG TO ROTATE 3D
                </span>
              </div>
            </div>

            {/* Cyber Edge Lighting */}
            <div className="absolute inset-0 rounded-3xl ring-1 ring-tertiary/40 shadow-[inset_0_0_50px_rgba(68,214,254,0.12)] pointer-events-none" />
          </div>
        </div>
      )}
    </div>
  );
};
