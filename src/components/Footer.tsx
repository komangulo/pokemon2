
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between mb-12">
          {/* Brand */}
          <div className="mb-8 md:mb-0">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-brand-blue">CardSetHub</span>
            </Link>
            <p className="mt-4 text-gray-600 max-w-xs">
              The premier destination for Pokémon card collectors and sellers.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-500 hover:text-brand-blue transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-brand-blue transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-brand-blue transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/services/auctions" className="text-gray-600 hover:text-brand-blue transition-colors">Weekly Auctions</Link>
                </li>
                <li>
                  <Link to="/services/express" className="text-gray-600 hover:text-brand-blue transition-colors">Express Service</Link>
                </li>
                <li>
                  <Link to="/services/buy-now" className="text-gray-600 hover:text-brand-blue transition-colors">Buy-It-Now</Link>
                </li>
                <li>
                  <Link to="/grading" className="text-gray-600 hover:text-brand-blue transition-colors">Card Grading</Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/set-search" className="text-gray-600 hover:text-brand-blue transition-colors">Set Search</Link>
                </li>
                <li>
                  <Link to="/market-prices" className="text-gray-600 hover:text-brand-blue transition-colors">Market Prices</Link>
                </li>
                <li>
                  <Link to="/blog" className="text-gray-600 hover:text-brand-blue transition-colors">Blog</Link>
                </li>
                <li>
                  <Link to="/faq" className="text-gray-600 hover:text-brand-blue transition-colors">FAQs</Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-gray-600 hover:text-brand-blue transition-colors">About Us</Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-600 hover:text-brand-blue transition-colors">Contact</Link>
                </li>
                <li>
                  <Link to="/terms" className="text-gray-600 hover:text-brand-blue transition-colors">Terms of Service</Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-gray-600 hover:text-brand-blue transition-colors">Privacy Policy</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            © {currentYear} CardSetHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
