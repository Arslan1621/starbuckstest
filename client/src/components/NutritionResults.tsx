import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import type { NutritionInfo } from "@/lib/nutritionData";
import type { MacroBreakdown } from "@/lib/calculator";
import { getDailyValuePercent, formatNutritionValue } from "@/lib/calculator";

interface NutritionResultsProps {
  nutrition: NutritionInfo;
  macroBreakdown: MacroBreakdown;
}

export default function NutritionResults({ nutrition, macroBreakdown }: NutritionResultsProps) {
  const chartData = [
    {
      name: "Fat",
      value: Math.round(macroBreakdown.fatPercent),
      color: "#D97757",
    },
    {
      name: "Carbs",
      value: Math.round(macroBreakdown.carbPercent),
      color: "#E8C4A8",
    },
    {
      name: "Protein",
      value: Math.round(macroBreakdown.proteinPercent),
      color: "#9CAF88",
    },
  ].filter((item) => item.value > 0);

  const nutritionItems = [
    { label: "Calories", value: nutrition.calories, unit: "cal", dailyValue: null },
    { label: "Total Fat", value: nutrition.fat, unit: "g", dailyValue: 78 },
    { label: "Carbohydrates", value: nutrition.carbs, unit: "g", dailyValue: 275 },
    { label: "Protein", value: nutrition.protein, unit: "g", dailyValue: 50 },
    { label: "Sugars", value: nutrition.sugar, unit: "g", dailyValue: 50 },
    { label: "Sodium", value: nutrition.sodium, unit: "mg", dailyValue: 2300 },
    { label: "Caffeine", value: nutrition.caffeine, unit: "mg", dailyValue: 400 },
  ];

  return (
    <div className="space-y-6 sticky top-8">
      {/* Calorie Badge */}
      <Card className="p-6 bg-gradient-to-br from-accent to-accent/80 border-0 text-white shadow-lg">
        <p className="text-sm font-semibold opacity-90 mb-1">Total Calories</p>
        <p className="text-5xl font-bold">{nutrition.calories}</p>
        <p className="text-xs opacity-75 mt-2">
          {((nutrition.calories / 2000) * 100).toFixed(1)}% of daily intake
        </p>
      </Card>

      {/* Macro Breakdown Chart */}
      <Card className="p-6 shadow-lg border-0 bg-white">
        <h3 className="text-lg font-bold text-foreground mb-4">Macro Breakdown</h3>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value}%`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      {/* Nutrition Details */}
      <Card className="p-6 shadow-lg border-0 bg-white">
        <h3 className="text-lg font-bold text-foreground mb-4">Nutrition Facts</h3>
        <div className="space-y-3">
          {nutritionItems.map((item) => (
            <div key={item.label} className="flex items-center justify-between pb-3 border-b border-border last:border-0">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">{item.label}</span>
                {item.dailyValue && (
                  <span className="text-xs text-muted-foreground">
                    {getDailyValuePercent(item.label.toLowerCase().replace(" ", "-"), item.value).toFixed(0)}% DV
                  </span>
                )}
              </div>
              <span className="text-sm font-semibold text-accent">
                {formatNutritionValue(item.value)}
                <span className="text-xs text-muted-foreground ml-1">{item.unit}</span>
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Wellness Tips */}
      <Card className="p-4 bg-gradient-to-br from-secondary/20 to-transparent border border-secondary/50">
        <p className="text-xs text-muted-foreground leading-relaxed">
          💡 <strong>Tip:</strong> Most Starbucks drinks can be customized to reduce calories. Try oat or almond milk, fewer pumps of syrup, or skip the whipped cream!
        </p>
      </Card>
    </div>
  );
}
