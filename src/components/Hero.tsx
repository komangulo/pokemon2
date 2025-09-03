import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="hero-section pt-32 pb-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Hero Text */}
          <div className="w-full lg:w-1/2 mb-10 lg:mb-0 lg:pr-10 animate-slide-right animate-once">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Buy, Sell & Trade <span className="text-brand-blue">Pokemon Cards</span> Online
            </h1>
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">
              Your Trusted Marketplace for Rare & Graded Pokemon TCG Cards
            </h2>
            <h3 className="text-xl font-medium text-gray-700 mb-3">
              Find First Edition, Holo, and Ultra Rare Cards at Competitive Prices
            </h3>
            <p className="text-lg text-gray-700 mb-8 max-w-lg">
              Discover the largest selection of authentic Pokemon cards, from vintage 1st Edition to the latest Sword & Shield expansions. We offer professional grading, secure transactions, and expert authentication for all Pokemon TCG cards.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild className="bg-brand-blue hover:bg-brand-light text-white px-6 py-6 rounded-md text-lg">
                <Link to="/set-search">
                  Browse Sets <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="px-6 py-6 rounded-md text-lg">
                <Link to="/sell">
                  Sell Your Cards
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="w-full lg:w-1/2 relative animate-slide-left animate-once">
            <div className="relative z-10 rounded-lg shadow-xl overflow-hidden max-w-md mx-auto">
              <img 
                src="https://i.ebayimg.com/images/g/zFYAAOSwODxl08qt/s-l1200.jpg"
                alt="Pokemon cards collection"
                className="w-full h-[400px] object-contain"
              />
            </div>
            
            {/* Floating Element */}
            <div className="absolute top-1/2 -right-40 lg:-right-36 transform -translate-y-1/2 bg-white p-4 rounded-xl shadow-xl w-64 hidden lg:block animate-slide-left animate-once animate-delay-300">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">Umbreon VMAX Alt Art</span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-lg">
                  <span className="text-sm font-medium">PSA 10</span>
                  <span className="text-sm font-bold text-green-600">$2,322.50</span>
                </div>
                <div className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-lg">
                  <span className="text-sm font-medium">PSA 9</span>
                  <span className="text-sm font-bold text-blue-600">$1,379.38</span>
                </div>
                <div className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-lg">
                  <span className="text-sm font-medium">Raw Card</span>
                  <span className="text-sm font-bold text-purple-600">$1,423.83</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
