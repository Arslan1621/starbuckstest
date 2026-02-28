export default function Footer() {
  return (
    <footer className="bg-foreground/5 border-t border-border mt-16 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-foreground mb-3">About</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A free, open-source Starbucks calorie calculator to help you make informed nutritional choices.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-foreground mb-3">Features</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Comprehensive menu database</li>
              <li>• Full customization support</li>
              <li>• Macro breakdown visualization</li>
              <li>• Shareable orders</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-foreground mb-3">Disclaimer</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              This calculator is independent and not affiliated with Starbucks Corporation. Nutrition data is approximate and may vary.
            </p>
          </div>
        </div>
        <div className="border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <p>
            © 2026 Starbucks Calorie Calculator. Built with care.
            <br />
            <a href="https://www.starbuckscaloriecalculator.co/" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent/80 transition-colors font-medium">
              Visit our website
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
