export interface FridgeItem {
  id: string;
  name: string;
  category: 'Produce' | 'Dairy' | 'Protein' | 'Pantry' | 'Bakery' | 'Condiment';
  quantity: string;
  addedDate: string;
  expiryDate: string;
  daysRemaining: number;
  status: 'critical' | 'expiring-soon' | 'fresh';
  iconName: string;
  imageUrl?: string;
  estimatedWasteValue: number; // in INR / units
  nutritionNotes?: string;
  recipesCount: number;
}

export interface Recipe {
  id: string;
  title: string;
  matchScore: number;
  timeMinutes: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  servings: number;
  calories: number;
  image: string;
  description: string;
  tags: string[];
  matchedIngredients: string[];
  missingIngredients: string[];
  instructions: string[];
}

export interface RescueStats {
  foodRescuedKg: number;
  moneySaved: number;
  ingredientsSaved: number;
  co2SavedKg: number;
  monthlyGoalKg: number;
}
