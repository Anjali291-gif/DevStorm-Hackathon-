'use client';

import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { WorkflowSection } from '../components/WorkflowSection';
import { UrgentActionSection } from '../components/UrgentActionSection';
import { FridgeInventory } from '../components/FridgeInventory';
import { RecipeDiscovery } from '../components/RecipeDiscovery';
import { RecipeModal } from '../components/RecipeModal';
import { FoodRescueDashboard } from '../components/FoodRescueDashboard';
import { ScanFridgeModal } from '../components/ScanFridgeModal';
import { AddItemModal } from '../components/AddItemModal';
import { AiKitchenAssistant } from '../components/AiKitchenAssistant';
import { Footer } from '../components/Footer';

import { initialFridgeItems, initialRecipes, initialRescueStats } from '../lib/data';
import { FridgeItem, Recipe, RescueStats } from '../lib/types';

export default function Home() {
  const [fridgeItems, setFridgeItems] = useState<FridgeItem[]>(initialFridgeItems);
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);
  const [stats, setStats] = useState<RescueStats>(initialRescueStats);

  // Modals state
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  // Handlers
  const handleAddItem = (item: FridgeItem) => {
    setFridgeItems((prev) => [item, ...prev]);
  };

  const handleAddDetectedItems = (newItems: FridgeItem[]) => {
    setFridgeItems((prev) => [...newItems, ...prev]);
  };

  const handleDeleteItem = (itemId: string) => {
    setFridgeItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleConsumeItem = (item: FridgeItem) => {
    // Remove from fridge
    setFridgeItems((prev) => prev.filter((i) => i.id !== item.id));

    // Update rescue stats
    setStats((prev) => ({
      ...prev,
      foodRescuedKg: +(prev.foodRescuedKg + 0.35).toFixed(2),
      moneySaved: prev.moneySaved + item.estimatedWasteValue,
      ingredientsSaved: prev.ingredientsSaved + 1,
      co2SavedKg: +(prev.co2SavedKg + 0.7).toFixed(1),
    }));
  };

  const handleCookRecipe = (recipe: Recipe) => {
    setSelectedRecipe(null);

    // Update rescue stats
    setStats((prev) => ({
      ...prev,
      foodRescuedKg: +(prev.foodRescuedKg + 0.6).toFixed(2),
      moneySaved: prev.moneySaved + 140,
      ingredientsSaved: prev.ingredientsSaved + recipe.matchedIngredients.length,
      co2SavedKg: +(prev.co2SavedKg + 1.2).toFixed(1),
    }));
  };

  const handleSelectUrgentRecipe = () => {
    const omelette = recipes.find((r) => r.id === 'rec-1') || recipes[0];
    setSelectedRecipe(omelette);
  };

  const handleSelectRecipeForIngredient = (ingredientName: string) => {
    const matched =
      recipes.find((r) =>
        r.matchedIngredients.some((i) => i.toLowerCase().includes(ingredientName.toLowerCase()))
      ) || recipes[0];
    setSelectedRecipe(matched);
  };

  const scrollToInventory = () => {
    document.getElementById('inventory-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToRecipes = () => {
    document.getElementById('recipes-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen relative overflow-x-hidden selection:bg-primary selection:text-background">
      {/* Top Floating Glass Navbar */}
      <Navbar
        onOpenScanner={() => setIsScannerOpen(true)}
        onOpenAssistant={() => setIsAssistantOpen(true)}
      />

      {/* Hero Section with 3D Three.js Refrigerator */}
      <HeroSection
        onExploreFridge={scrollToInventory}
        onOpenScanner={() => setIsScannerOpen(true)}
        onSelectUrgentRecipe={handleSelectUrgentRecipe}
      />

      {/* 4-Step Process Section */}
      <WorkflowSection />

      {/* Urgent Action Spotlight */}
      <UrgentActionSection
        onCookNow={handleSelectUrgentRecipe}
        onExploreRecipes={scrollToRecipes}
      />

      {/* Digital Fridge Inventory */}
      <FridgeInventory
        items={fridgeItems}
        onAddItem={() => setIsAddItemOpen(true)}
        onConsumeItem={handleConsumeItem}
        onDeleteItem={handleDeleteItem}
        onSelectRecipeForIngredient={handleSelectRecipeForIngredient}
      />

      {/* AI Recipe Discovery */}
      <RecipeDiscovery
        recipes={recipes}
        onSelectRecipe={(recipe) => setSelectedRecipe(recipe)}
      />

      {/* Sustainability & Food Rescue Impact Dashboard */}
      <FoodRescueDashboard stats={stats} />

      {/* Futuristic Glassmorphic Footer */}
      <Footer />

      {/* Modals & Overlays */}
      <RecipeModal
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
        onCookRecipe={handleCookRecipe}
      />

      <ScanFridgeModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onAddDetectedItems={handleAddDetectedItems}
      />

      <AddItemModal
        isOpen={isAddItemOpen}
        onClose={() => setIsAddItemOpen(false)}
        onAddItem={handleAddItem}
      />

      <AiKitchenAssistant
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        onOpen={() => setIsAssistantOpen(true)}
      />
    </main>
  );
}
