import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo.png';

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToPricing = () => {
    const el = document.getElementById('pricing');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-card/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="AgriHerd Solutions" className="h-9 w-9" />
            <span className="text-lg font-bold text-primary hidden sm:inline">AgriHerd Solutions</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <button onClick={scrollToPricing} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Pricing
            </button>
            <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Sign In
            </Link>
            <Button size="sm" asChild>
              <Link to="/signup">Start Free Trial</Link>
            </Button>
          </div>

          {/* Mobile: CTA + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <Button size="sm" asChild>
              <Link to="/signup">Free Trial</Link>
            </Button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-muted-foreground hover:text-primary"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-2">
              <button onClick={scrollToPricing} className="text-left px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary">
                Pricing
              </button>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary flex items-center gap-2">
                <LogIn className="h-4 w-4" /> Sign In
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
