import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Share2 } from "lucide-react";
import { useState } from "react";

interface OrderSummaryProps {
  summary: string;
}

export default function OrderSummary({ summary }: OrderSummaryProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      try {
        await navigator.share({
          title: "My Starbucks Order",
          text: summary,
        });
      } catch (err) {
        // User cancelled share
      }
    }
  };

  return (
    <Card className="p-6 shadow-lg border-0 bg-white">
      <h2 className="text-2xl font-bold text-foreground mb-4">Your Order</h2>

      <div className="bg-input rounded-lg p-4 mb-4 font-mono text-sm whitespace-pre-wrap text-foreground">
        {summary || "Select a drink and customizations to see your order"}
      </div>

      <div className="flex gap-3">
        <Button
          onClick={handleCopy}
          variant="outline"
          className="flex-1 gap-2"
        >
          <Copy className="h-4 w-4" />
          {copied ? "Copied!" : "Copy Order"}
        </Button>
        {typeof navigator !== 'undefined' && 'share' in navigator && (
          <Button
            onClick={handleShare}
            variant="outline"
            className="flex-1 gap-2"
          >
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        )}
      </div>
    </Card>
  );
}
