import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCustomizationsByType } from "@/lib/nutritionData";
import { Plus, Minus, RotateCcw } from "lucide-react";

interface CustomizationPanelProps {
  customizations: Record<string, number>;
  onCustomizationChange: (customizationId: string, quantity: number) => void;
  onReset: () => void;
}

export default function CustomizationPanel({
  customizations,
  onCustomizationChange,
  onReset,
}: CustomizationPanelProps) {
  const milks = getCustomizationsByType("milk");
  const syrups = getCustomizationsByType("syrup");
  const sauces = getCustomizationsByType("sauce");
  const toppings = getCustomizationsByType("topping");
  const drizzles = getCustomizationsByType("drizzle");
  const powders = getCustomizationsByType("powder");
  const espressoShots = getCustomizationsByType("espresso");

  const getQuantity = (id: string) => customizations[id] || 0;

  const handleQuantityChange = (id: string, delta: number) => {
    const newQuantity = Math.max(0, getQuantity(id) + delta);
    onCustomizationChange(id, newQuantity);
  };

  const CustomizationRow = ({ customization }: any) => (
    <div className="flex items-center justify-between py-3 px-4 bg-input rounded-lg hover:bg-input/80 transition-colors">
      <span className="text-sm font-medium text-foreground">{customization.name}</span>
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => handleQuantityChange(customization.id, -1)}
        >
          <Minus className="h-3 w-3" />
        </Button>
        <span className="w-6 text-center text-sm font-semibold text-accent">
          {getQuantity(customization.id)}
        </span>
        <Button
          size="sm"
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => handleQuantityChange(customization.id, 1)}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );

  return (
    <Card className="p-6 shadow-lg border-0 bg-white">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">Customize Your Drink</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={onReset}
          className="gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
      </div>

      <div className="space-y-6">
        {/* Milk Selection */}
        {milks.length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wide mb-3">
              🥛 Milk Type
            </h3>
            <div className="space-y-2">
              {milks.map((milk) => (
                <CustomizationRow key={milk.id} customization={milk} />
              ))}
            </div>
          </div>
        )}

        {/* Syrups */}
        {syrups.length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wide mb-3">
              🍯 Syrups
            </h3>
            <div className="space-y-2">
              {syrups.map((syrup) => (
                <CustomizationRow key={syrup.id} customization={syrup} />
              ))}
            </div>
          </div>
        )}

        {/* Sauces */}
        {sauces.length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wide mb-3">
              🍫 Sauces
            </h3>
            <div className="space-y-2">
              {sauces.map((sauce) => (
                <CustomizationRow key={sauce.id} customization={sauce} />
              ))}
            </div>
          </div>
        )}

        {/* Toppings */}
        {toppings.length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wide mb-3">
              ✨ Toppings
            </h3>
            <div className="space-y-2">
              {toppings.map((topping) => (
                <CustomizationRow key={topping.id} customization={topping} />
              ))}
            </div>
          </div>
        )}

        {/* Drizzles */}
        {drizzles.length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wide mb-3">
              🌊 Drizzles
            </h3>
            <div className="space-y-2">
              {drizzles.map((drizzle) => (
                <CustomizationRow key={drizzle.id} customization={drizzle} />
              ))}
            </div>
          </div>
        )}

        {/* Powders */}
        {powders.length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wide mb-3">
              ✨ Powders
            </h3>
            <div className="space-y-2">
              {powders.map((powder) => (
                <CustomizationRow key={powder.id} customization={powder} />
              ))}
            </div>
          </div>
        )}

        {/* Espresso Shots */}
        {espressoShots.length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wide mb-3">
              ☕ Extra Shots
            </h3>
            <div className="space-y-2">
              {espressoShots.map((shot) => (
                <CustomizationRow key={shot.id} customization={shot} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
