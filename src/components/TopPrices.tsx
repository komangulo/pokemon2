import { useState } from 'react';
import { Button } from '@/components/ui/button';

const TopPrices = () => {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const filters = [
    { id: 'ALL', label: 'ALL' },
    { id: 'RARE', label: 'RARE' },
    { id: 'COMMON', label: 'COMMON' },
    { id: 'PROMO', label: 'PROMO' },
    { id: 'UNCOMMON', label: 'UNCOMMON' },
    { id: 'RARE HOLO', label: 'RARE HOLO' },
    { id: 'RARE SECRET', label: 'RARE SECRET' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#1a2332] text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-6">
            THE TOP 100 MOST EXPENSIVE RARE POKEMON CARDS
          </h1>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded ${
                  activeFilter === filter.id
                    ? 'bg-yellow-500 text-black'
                    : 'bg-transparent hover:bg-gray-700'
                }`}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Card items will be mapped here */}
          {/* This is a placeholder for the card grid that will be implemented */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <img 
              src="https://i.ebayimg.com/images/g/zFYAAOSwODxl08qt/s-l1200.jpg"
              alt="Pokemon Card"
              className="w-full h-64 object-contain mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">Pikachu VMAX</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">PSA 10</span>
                <span className="font-bold text-green-600">$2,322.50</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">PSA 9</span>
                <span className="font-bold text-blue-600">$1,379.38</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Raw Card</span>
                <span className="font-bold text-purple-600">$1,423.83</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopPrices; 