import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllProducts, getCustomizationsByType } from "@/lib/nutritionData";
import { calculateNutrition, calculateMacroBreakdown, generateOrderSummary } from "@/lib/calculator";
import type { Product } from "@/lib/nutritionData";
import NutritionResults from "./NutritionResults";
import CustomizationPanel from "./CustomizationPanel";
import OrderSummary from "./OrderSummary";

export default function Calculator() {
  const allProducts = useMemo(() => getAllProducts(), []);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(allProducts[0] || null);
  const [customizations, setCustomizations] = useState<Record<string, number>>({});

  const nutrition = useMemo(() => {
    if (!selectedProduct) return null;
    return calculateNutrition(selectedProduct, customizations);
  }, [selectedProduct, customizations]);

  const macroBreakdown = useMemo(() => {
    if (!nutrition) return null;
    return calculateMacroBreakdown(nutrition);
  }, [nutrition]);

  const orderSummary = useMemo(() => {
    if (!selectedProduct) return "";
    return generateOrderSummary(selectedProduct, customizations);
  }, [selectedProduct, customizations]);

  const handleProductChange = (productId: string) => {
    const product = allProducts.find((p) => p.id === productId);
    if (product) {
      setSelectedProduct(product);
      setCustomizations({}); // Reset customizations when product changes
    }
  };

  const handleCustomizationChange = (customizationId: string, quantity: number) => {
    setCustomizations((prev) => ({
      ...prev,
      [customizationId]: quantity,
    }));
  };

  const handleReset = () => {
    setCustomizations({});
  };

  if (!selectedProduct) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            ☕ Starbucks Calorie Calculator
          </h1>
          <p className="text-muted-foreground text-lg">
            Make informed choices about your favorite Starbucks drinks
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Calculator */}
          <div className="lg:col-span-2 space-y-6">
            {/* Product Selection Card */}
            <Card className="p-6 shadow-lg border-0 bg-white">
              <h2 className="text-2xl font-bold text-foreground mb-4">Select Your Drink</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Product
                  </label>
                  <Select value={selectedProduct.id} onValueChange={handleProductChange}>
                    <SelectTrigger className="w-full h-12 text-base">
                      <SelectValue placeholder="Select a product" />
                    </SelectTrigger>
                    <SelectContent>
                      {allProducts.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name} - {product.sizeLabel}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            {/* Customization Panel */}
            <CustomizationPanel
              customizations={customizations}
              onCustomizationChange={handleCustomizationChange}
              onReset={handleReset}
            />

            {/* Order Summary */}
            <OrderSummary summary={orderSummary} />
          </div>

          {/* Right Column: Results */}
          <div className="lg:col-span-1">
            {nutrition && macroBreakdown && (
              <NutritionResults nutrition={nutrition} macroBreakdown={macroBreakdown} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
