'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Camera,
  Scan,
  CheckCircle2,
  Sparkles,
  RefreshCw,
  Plus,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { FridgeItem } from '../lib/types';

interface ScanFridgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddDetectedItems: (items: FridgeItem[]) => void;
}

interface DetectedObject {
  id: string;
  name: string;
  category: FridgeItem['category'];
  quantity: string;
  confidence: number;
  daysRemaining: number;
  box: { top: string; left: string; width: string; height: string };
}

export const ScanFridgeModal: React.FC<ScanFridgeModalProps> = ({
  isOpen,
  onClose,
  onAddDetectedItems,
}) => {
  const [isScanning, setIsScanning] = useState(true);
  const [scanProgress, setScanProgress] = useState(0);

  const mockDetections: DetectedObject[] = [
    {
      id: 'det-1',
      name: 'Hydroponic Basil',
      category: 'Produce',
      quantity: '100g',
      confidence: 99,
      daysRemaining: 4,
      box: { top: '25%', left: '20%', width: '28%', height: '30%' },
    },
    {
      id: 'det-2',
      name: 'Fresh Mozzarella Ball',
      category: 'Dairy',
      quantity: '200g',
      confidence: 96,
      daysRemaining: 3,
      box: { top: '35%', left: '55%', width: '30%', height: '32%' },
    },
    {
      id: 'det-3',
      name: 'Cherry Tomatoes',
      category: 'Produce',
      quantity: '250g',
      confidence: 94,
      daysRemaining: 5,
      box: { top: '65%', left: '30%', width: '35%', height: '25%' },
    },
  ];

  const [selectedItems, setSelectedItems] = useState<string[]>(['det-1', 'det-2', 'det-3']);

  useEffect(() => {
    if (isOpen) {
      setIsScanning(true);
      setScanProgress(0);
      const interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsScanning(false);
            return 100;
          }
          return prev + 20;
        });
      }, 300);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleToggleSelect = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((i) => i !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleImport = () => {
    const itemsToAdd: FridgeItem[] = mockDetections
      .filter((d) => selectedItems.includes(d.id))
      .map((d) => ({
        id: `scanned-${Date.now()}-${d.id}`,
        name: d.name,
        category: d.category,
        quantity: d.quantity,
        addedDate: new Date().toISOString().split('T')[0],
        expiryDate: new Date(Date.now() + d.daysRemaining * 86400000).toISOString().split('T')[0],
        daysRemaining: d.daysRemaining,
        status: d.daysRemaining <= 1 ? 'critical' : d.daysRemaining <= 3 ? 'expiring-soon' : 'fresh',
        iconName: 'Leaf',
        imageUrl:
          d.category === 'Produce'
            ? 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500&auto=format&fit=crop&q=80'
            : 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&auto=format&fit=crop&q=80',
        estimatedWasteValue: 75,
        nutritionNotes: 'AI Identified via camera scan',
        recipesCount: 2,
      }));

    onAddDetectedItems(itemsToAdd);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl rounded-3xl glass-panel-deep border border-white/20 shadow-2xl overflow-hidden glass-edge flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-tertiary/15 text-tertiary border border-tertiary/30">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">AI Vision Fridge Scanner</h3>
              <p className="font-mono text-[11px] text-on-surface-variant">
                Computer vision neural model identifying grocery items
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full glass-panel text-on-surface-variant hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Viewfinder simulation */}
        <div className="relative h-72 sm:h-80 w-full bg-slate-950 overflow-hidden flex-shrink-0">
          {/* Mock fridge photo */}
          <div
            className="w-full h-full bg-cover bg-center opacity-70"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=1000&auto=format&fit=crop&q=80')",
            }}
          />

          {/* Holographic Laser Grid */}
          {isScanning && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="w-full h-1 bg-gradient-to-r from-transparent via-tertiary to-transparent shadow-[0_0_20px_#44d6fe] animate-laser relative" />
              <div className="absolute inset-0 bg-tertiary/5 backdrop-blur-[1px]" />
            </div>
          )}

          {/* Viewfinder Target Crosshairs */}
          <div className="absolute inset-6 border border-white/20 rounded-2xl pointer-events-none flex flex-col justify-between p-3">
            <div className="flex justify-between font-mono text-[9px] text-tertiary font-bold tracking-widest">
              <span>SCAN_MODE: MULTI_OBJECT</span>
              <span>NEURAL_ENGINE_V3</span>
            </div>
            <div className="flex justify-between font-mono text-[9px] text-on-surface-variant">
              <span>RES: 4K OPTICAL</span>
              <span>{isScanning ? `ANALYZING... ${scanProgress}%` : 'SCAN COMPLETE'}</span>
            </div>
          </div>

          {/* Bounding Boxes on detected items */}
          {!isScanning &&
            mockDetections.map((item) => (
              <div
                key={item.id}
                style={{
                  top: item.box.top,
                  left: item.box.left,
                  width: item.box.width,
                  height: item.box.height,
                }}
                onClick={() => handleToggleSelect(item.id)}
                className={`absolute rounded-xl border-2 cursor-pointer transition-all duration-300 p-1.5 flex flex-col justify-between ${
                  selectedItems.includes(item.id)
                    ? 'border-tertiary bg-tertiary/20 shadow-[0_0_15px_rgba(68,214,254,0.4)]'
                    : 'border-white/40 bg-black/40 opacity-70'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold text-white bg-black/80 px-1.5 py-0.5 rounded">
                    {item.name}
                  </span>
                  <span className="font-mono text-[9px] text-tertiary font-bold">
                    {item.confidence}%
                  </span>
                </div>
              </div>
            ))}
        </div>

        {/* Detected Item Checklist */}
        <div className="p-5 overflow-y-auto space-y-3 flex-grow">
          <div className="flex items-center justify-between">
            <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              {isScanning
                ? 'Detecting Items...'
                : `Detected Items (${selectedItems.length}/${mockDetections.length} selected)`}
            </h4>
            {!isScanning && (
              <button
                onClick={() => {
                  setIsScanning(true);
                  setScanProgress(0);
                }}
                className="text-xs text-primary hover:text-white font-mono flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" /> Rescan
              </button>
            )}
          </div>

          <div className="space-y-2">
            {mockDetections.map((item) => {
              const isSelected = selectedItems.includes(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => handleToggleSelect(item.id)}
                  className={`p-3 rounded-2xl glass-panel border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'border-tertiary/40 bg-tertiary/10'
                      : 'border-white/10 opacity-60 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center font-mono text-xs ${
                        isSelected ? 'bg-tertiary text-background font-bold' : 'glass-panel text-white'
                      }`}
                    >
                      {isSelected ? '✓' : ''}
                    </div>
                    <div>
                      <h5 className="font-display font-semibold text-sm text-white">{item.name}</h5>
                      <span className="text-[11px] font-mono text-on-surface-variant">
                        {item.category} • {item.quantity} • Shelf life: ~{item.daysRemaining} days
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-tertiary font-semibold">
                    {item.confidence}% Match
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-white/10 glass-panel flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-mono text-on-surface-variant hover:text-white transition-colors"
          >
            CANCEL
          </button>
          <button
            disabled={isScanning || selectedItems.length === 0}
            onClick={handleImport}
            className="pill-gradient px-6 py-2.5 rounded-full font-mono text-xs font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4" />
            <span>ADD {selectedItems.length} ITEMS TO FRIDGE</span>
          </button>
        </div>
      </div>
    </div>
  );
};
