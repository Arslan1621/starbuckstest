import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In a real application, you would send this to a backend API
      console.log("Form submitted:", formData);

      toast.success("Thank you! Your message has been sent successfully.");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-muted-foreground">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Contact Info Cards */}
            <Card className="p-6 text-center">
              <Mail className="w-8 h-8 text-accent mx-auto mb-4" />
              <h3 className="font-bold text-foreground mb-2">Email</h3>
              <p className="text-muted-foreground text-sm">
                contact@starbuckscaloriecalculator.co
              </p>
            </Card>

            <Card className="p-6 text-center">
              <Phone className="w-8 h-8 text-accent mx-auto mb-4" />
              <h3 className="font-bold text-foreground mb-2">Support</h3>
              <p className="text-muted-foreground text-sm">
                Available via email for all inquiries
              </p>
            </Card>

            <Card className="p-6 text-center">
              <MapPin className="w-8 h-8 text-accent mx-auto mb-4" />
              <h3 className="font-bold text-foreground mb-2">Website</h3>
              <p className="text-muted-foreground text-sm">
                www.starbuckscaloriecalculator.co
              </p>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="p-8">
            <h2 className="text-3xl font-bold text-foreground mb-8">Send us a Message</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is this about?"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message..."
                  rows={6}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 py-3 font-medium"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Card>

          {/* FAQ Section */}
          <Card className="p-8 mt-12">
            <h2 className="text-3xl font-bold text-foreground mb-8">Frequently Asked Questions</h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-foreground mb-2">
                  How accurate is the nutritional information?
                </h3>
                <p className="text-muted-foreground">
                  Our data is based on publicly available Starbucks nutrition information. However, actual values may vary slightly due to preparation methods and regional differences. Always verify with official Starbucks sources for the most accurate information.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-foreground mb-2">
                  Can I use this for dietary restrictions?
                </h3>
                <p className="text-muted-foreground">
                  Yes! Our calculator helps you track calories, macronutrients, and other nutritional information. However, always consult with a healthcare professional or nutritionist for personalized dietary advice.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-foreground mb-2">
                  Is this calculator affiliated with Starbucks?
                </h3>
                <p className="text-muted-foreground">
                  No, this is an independent tool created to help customers make informed choices. We are not affiliated with, endorsed by, or connected to Starbucks Corporation.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-foreground mb-2">
                  How can I report incorrect information?
                </h3>
                <p className="text-muted-foreground">
                  If you find any inaccuracies, please contact us using the form above. We appreciate your feedback and will investigate any reported issues.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
