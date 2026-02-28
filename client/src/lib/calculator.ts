// Nutrition Calculator Logic
import { Product, Customization, NutritionInfo, getCustomizationById } from "./nutritionData";

export interface CalculatorState {
  selectedProduct: Product | null;
  customizations: Record<string, number>; // customization ID -> quantity
  totalNutrition: NutritionInfo;
}

export interface MacroBreakdown {
  fatCalories: number;
  carbCalories: number;
  proteinCalories: number;
  fatPercent: number;
  carbPercent: number;
  proteinPercent: number;
}

/**
 * Calculate total nutrition based on product and customizations
 */
export function calculateNutrition(
  product: Product,
  customizations: Record<string, number>
): NutritionInfo {
  // Start with base product nutrition
  let total: NutritionInfo = {
    calories: product.calories,
    fat: product.fat,
    carbs: product.carbs,
    protein: product.protein,
    sugar: product.sugar,
    caffeine: product.caffeine,
    sodium: product.sodium,
  };

  // Add default customizations first
  for (const [customId, quantity] of Object.entries(product.defaultCustomizations)) {
    const custom = getCustomizationById(customId);
    if (custom) {
      total = addCustomization(total, custom, quantity);
    }
  }

  // Add user-selected customizations
  for (const [customId, quantity] of Object.entries(customizations)) {
    const custom = getCustomizationById(customId);
    if (custom && quantity > 0) {
      total = addCustomization(total, custom, quantity);
    }
  }

  return total;
}

/**
 * Add a customization to the nutrition total
 */
function addCustomization(
  total: NutritionInfo,
  custom: Customization,
  quantity: number
): NutritionInfo {
  return {
    calories: total.calories + custom.calories * quantity,
    fat: total.fat + custom.fat * quantity,
    carbs: total.carbs + custom.carbs * quantity,
    protein: total.protein + custom.protein * quantity,
    sugar: total.sugar + custom.sugar * quantity,
    caffeine: total.caffeine + custom.caffeine * quantity,
    sodium: total.sodium + custom.sodium * quantity,
  };
}

/**
 * Calculate macro breakdown percentages
 */
export function calculateMacroBreakdown(nutrition: NutritionInfo): MacroBreakdown {
  const fatCalories = nutrition.fat * 9; // 9 calories per gram of fat
  const carbCalories = nutrition.carbs * 4; // 4 calories per gram of carbs
  const proteinCalories = nutrition.protein * 4; // 4 calories per gram of protein

  const totalCalories = nutrition.calories || 1; // Avoid division by zero

  return {
    fatCalories,
    carbCalories,
    proteinCalories,
    fatPercent: (fatCalories / totalCalories) * 100,
    carbPercent: (carbCalories / totalCalories) * 100,
    proteinPercent: (proteinCalories / totalCalories) * 100,
  };
}

/**
 * Format nutrition value for display
 */
export function formatNutritionValue(value: number, decimals: number = 0): string {
  return value.toFixed(decimals);
}

/**
 * Get daily value percentage (based on 2000 calorie diet)
 */
export function getDailyValuePercent(nutrient: string, value: number): number {
  const dailyValues: Record<string, number> = {
    fat: 78, // grams
    carbs: 275, // grams
    protein: 50, // grams
    sodium: 2300, // mg
    sugar: 50, // grams (WHO recommendation)
    caffeine: 400, // mg
  };

  const dv = dailyValues[nutrient];
  if (!dv) return 0;

  return (value / dv) * 100;
}

/**
 * Generate a shareable order summary
 */
export function generateOrderSummary(product: Product, customizations: Record<string, number>): string {
  let summary = `${product.name} (${product.sizeLabel})\n`;

  // Add default customizations
  for (const [customId, quantity] of Object.entries(product.defaultCustomizations)) {
    const custom = getCustomizationById(customId);
    if (custom) {
      summary += `• ${custom.name} x${quantity}\n`;
    }
  }

  // Add user customizations
  for (const [customId, quantity] of Object.entries(customizations)) {
    if (quantity > 0) {
      const custom = getCustomizationById(customId);
      if (custom) {
        summary += `• ${custom.name} x${quantity}\n`;
      }
    }
  }

  return summary;
}
