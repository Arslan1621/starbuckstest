import { Card } from "@/components/ui/card";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            About Our Calculator
          </h1>
          <p className="text-lg text-muted-foreground">
            Making informed nutritional choices easier, one drink at a time.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Mission */}
          <Card className="p-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The Starbucks Calorie Calculator was created with a simple mission: to empower coffee lovers to make informed nutritional choices about their favorite beverages. We believe that understanding what goes into your drink is the first step toward making healthier decisions.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Whether you're tracking calories, managing macronutrients, or simply curious about the nutritional content of your order, our calculator provides accurate, comprehensive data to help you customize your drink exactly how you want it.
            </p>
          </Card>

          {/* Why We Built This */}
          <Card className="p-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why We Built This</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Starbucks offers an incredible variety of customization options, but it can be overwhelming to figure out the nutritional impact of each choice. Many people want to enjoy their favorite drinks while maintaining their health goals, but lack the tools to do so easily.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We created this calculator to bridge that gap—providing a free, easy-to-use tool that lets you see exactly how your customizations affect the nutritional profile of your drink in real-time.
            </p>
          </Card>

          {/* Features */}
          <Card className="p-8">
            <h2 className="text-3xl font-bold text-foreground mb-6">What We Offer</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-lg text-foreground mb-2">Comprehensive Database</h3>
                <p className="text-muted-foreground">
                  Access detailed nutritional information for a wide range of Starbucks beverages.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg text-foreground mb-2">Full Customization</h3>
                <p className="text-muted-foreground">
                  Adjust milk types, syrups, sauces, and toppings to see real-time nutritional updates.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg text-foreground mb-2">Visual Analytics</h3>
                <p className="text-muted-foreground">
                  Understand your drink's macro breakdown with intuitive charts and visualizations.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-lg text-foreground mb-2">Shareable Orders</h3>
                <p className="text-muted-foreground">
                  Easily copy and share your customized drink order with friends or baristas.
                </p>
              </div>
            </div>
          </Card>

          {/* Disclaimer */}
          <Card className="p-8 bg-accent/5 border-accent/20">
            <h2 className="text-2xl font-bold text-foreground mb-4">Important Disclaimer</h2>
            <p className="text-muted-foreground leading-relaxed">
              This calculator is an independent tool and is not affiliated with, endorsed by, or connected to Starbucks Corporation. The nutritional data provided is approximate and based on publicly available information. Actual nutritional values may vary depending on preparation methods, portion sizes, and regional differences. Always consult official Starbucks nutrition information or speak with a barista for the most accurate information about your specific order.
            </p>
          </Card>

          {/* Contact CTA */}
          <div className="text-center py-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">Have Questions?</h3>
            <p className="text-muted-foreground mb-6">
              We'd love to hear from you! Get in touch with us through our contact page.
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
