import { useState, useEffect } from 'react';
import { Card } from "./ui/card";
import { ebayService } from '@/services/ebay.service';

interface EbayListing {
  itemId: string;
  title: string;
  price: {
    value: string;
    currency: string;
  };
  image?: {
    imageUrl: string;
  };
  itemWebUrl: string;
}

interface EbayListingsProps {
  cardName: string;
  cardNumber: string;
  setName: string;
}

export const EbayListings = ({ cardName, cardNumber, setName }: EbayListingsProps) => {
  const [listings, setListings] = useState<EbayListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchQuery = `${setName} ${cardName} ${cardNumber}`;
  const ebaySearchUrl = `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(searchQuery)}&_sop=10`;

  useEffect(() => {
    let mounted = true;
    console.log('Fetching eBay listings for:', searchQuery);

    const fetchListings = async () => {
      if (!mounted) return;
      
      setLoading(true);
      setError(null);
      setListings([]); // Limpiar listados anteriores
      
      try {
        console.log('Making API call to eBay...');
        const response = await ebayService.searchPokemonCard(searchQuery);
        console.log('eBay response:', response);
        
        if (!mounted) return;
        
        if (response.itemSummaries && response.itemSummaries.length > 0) {
          console.log('Setting listings:', response.itemSummaries);
          setListings(response.itemSummaries);
        } else {
          console.log('No listings found');
          setError('No listings found');
        }
      } catch (error) {
        if (!mounted) return;
        console.error('Error fetching eBay listings:', error);
        setError('Error loading listings');
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchListings();

    return () => {
      mounted = false;
    };
  }, [setName, cardName, cardNumber, searchQuery]);

  const renderHeader = () => (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <svg viewBox="0 0 70 28" className="h-6"><path d="M66 28H4c-2.2 0-4-1.8-4-4V4c0-2.2 1.8-4 4-4h62c2.2 0 4 1.8 4 4v20c0 2.2-1.8 4-4 4" fill="#fff"/><path d="M67.7 11.5h-4.3c-.3-.7-.6-1.5-1.1-2.3l3-3c.3-.3.3-.8 0-1.1l-2.3-2.3c-.3-.3-.8-.3-1.1 0l-3 3c-.8-.4-1.6-.8-2.3-1.1V.5c0-.4-.4-.8-.8-.8h-3.2c-.4 0-.8.4-.8.8v4.3c-.7.3-1.5.6-2.3 1.1l-3-3c-.3-.3-.8-.3-1.1 0l-2.3 2.3c-.3.3-.3.8 0 1.1l3 3c-.4.8-.8 1.6-1.1 2.3H41c-.4 0-.8.4-.8.8v3.2c0 .4.4.8.8.8h4.3c.3.7.6 1.5 1.1 2.3l-3 3c-.3.3-.3.8 0 1.1l2.3 2.3c.3.3.8.3 1.1 0l3-3c.8.4 1.6.8 2.3 1.1v4.3c0 .4.4.8.8.8h3.2c.4 0 .8-.4.8-.8v-4.3c.7-.3 1.5-.6 2.3-1.1l3 3c.3.3.8.3 1.1 0l2.3-2.3c.3-.3.3-.8 0-1.1l-3-3c.4-.8.8-1.6 1.1-2.3h4.3c.4 0 .8-.4.8-.8v-3.2c-.1-.4-.5-.8-.9-.8" fill="#e53238"/></svg>
        <h2 className="text-xl font-bold">NEWLY LISTED ON</h2>
      </div>
      <a 
        href={ebaySearchUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800"
      >
        See all
      </a>
    </div>
  );

  return (
    <div className="mt-8">
      {renderHeader()}
      
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 aspect-[3/4] rounded-lg mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-6 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <p className="text-gray-500">{error}</p>
          <a 
            href={ebaySearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 mt-2 inline-block"
          >
            Search on eBay
          </a>
        </div>
      ) : listings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {listings.slice(0, 5).map((listing) => (
            <a 
              key={listing.itemId} 
              href={listing.itemWebUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
                <div className="aspect-[3/4] relative overflow-hidden bg-gray-50">
                  <img 
                    src={listing.image?.imageUrl} 
                    alt={listing.title}
                    className="w-full h-full object-contain transition-transform duration-200 group-hover:scale-105"
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-medium line-clamp-2 mb-2 min-h-[2.5rem]">{listing.title}</h3>
                  <p className="text-lg font-bold text-[#0064D2]">${listing.price.value}</p>
                  <div className="mt-2">
                    <button className="w-full bg-[#0064D2] text-white py-2 px-4 rounded font-medium hover:bg-[#004C9E] transition-colors">
                      Buy it Now
                    </button>
                  </div>
                </div>
              </Card>
            </a>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">No listings found</p>
          <a 
            href={ebaySearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 mt-2 inline-block"
          >
            Search on eBay
          </a>
        </div>
      )}
    </div>
  );
}; 