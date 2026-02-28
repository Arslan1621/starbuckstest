import { Coffee } from "lucide-react";
import { Link } from "wouter";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-primary to-accent/50 text-white py-6 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="bg-white rounded-full p-2">
            <Coffee className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Starbucks Calculator</h1>
            <p className="text-sm opacity-90">Make informed choices about your drink</p>
          </div>
        </Link>
        
        <nav className="flex items-center gap-8">
          <Link href="/" className="text-white hover:opacity-80 transition-opacity font-medium">
            Home
          </Link>
          <Link href="/about" className="text-white hover:opacity-80 transition-opacity font-medium">
            About
          </Link>
          <Link href="/blogs" className="text-white hover:opacity-80 transition-opacity font-medium">
            Blog
          </Link>
          <Link href="/contact" className="text-white hover:opacity-80 transition-opacity font-medium">
            Contact
          </Link>
          <Link href="/admin" className="text-white hover:opacity-80 transition-opacity font-medium bg-white/20 px-3 py-1 rounded">
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
