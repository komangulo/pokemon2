import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Search, Menu, X, ShoppingCart, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-brand-blue">CardSetHub</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex relative w-full max-w-sm mx-4">
            <input 
              type="text" 
              placeholder="Search for cards..." 
              className="w-full pl-4 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-blue"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2">
              <Search className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/set-search" className="text-gray-700 hover:text-brand-blue transition-colors">
              Set Search
            </Link>
            <Link to="/top-prices" className="text-gray-700 hover:text-brand-blue transition-colors">
              Top Prices
            </Link>
            <Link to="/sell" className="text-gray-700 hover:text-brand-blue transition-colors">
              Sell
            </Link>
            <div className="flex items-center space-x-3">
              <Link to="/auth">
                <Button variant="outline" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="icon" className="rounded-full">
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-4 animate-slide-down animate-once">
            <div className="relative mb-4">
              <input 
                type="text" 
                placeholder="Search for cards..." 
                className="w-full pl-4 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2">
                <Search className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/set-search" 
                className="text-gray-700 hover:text-brand-blue transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Set Search
              </Link>
              <Link 
                to="/top-prices" 
                className="text-gray-700 hover:text-brand-blue transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Top Prices
              </Link>
              <Link 
                to="/sell" 
                className="text-gray-700 hover:text-brand-blue transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sell
              </Link>
              <div className="flex space-x-3 pt-2">
                <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="outline" size="icon" className="rounded-full">
                  <ShoppingCart className="h-5 w-5" />
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
