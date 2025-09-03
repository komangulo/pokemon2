import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Search, User } from 'lucide-react';
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

interface Card {
  id: string;
  name: string;
  images: {
    small: string;
    large: string;
  };
  set: {
    name: string;
  };
  number: string;
  rarity: string;
  tcgplayer?: {
    prices: {
      normal?: {
        market: number;
      };
      holofoil?: {
        market: number;
      };
      reverseHolofoil?: {
        market: number;
      };
    };
  };
  ebayListings?: EbayListing[];
}

function getNumericPrice(card: Card): number {
  if (!card.tcgplayer?.prices) return 0;
  const prices = card.tcgplayer.prices;
  return Math.max(
    prices.normal?.market || 0,
    prices.holofoil?.market || 0,
    prices.reverseHolofoil?.market || 0
  );
}

function getCardPrices(card: Card) {
  const prices = {
    normal: 'N/A',
    reverseHolofoil: 'N/A'
  };

  if (card.tcgplayer?.prices?.normal?.market) {
    prices.normal = card.tcgplayer.prices.normal.market.toFixed(2);
  }
  if (card.tcgplayer?.prices?.reverseHolofoil?.market) {
    prices.reverseHolofoil = card.tcgplayer.prices.reverseHolofoil.market.toFixed(2);
  }

  return prices;
}

function CardComponent({ card }: { card: Card }) {
  const handleEbaySearch = () => {
    const searchQuery = `Pokemon ${card.name} ${card.set.name} ${card.number}`;
    const encodedQuery = encodeURIComponent(searchQuery);
    window.open(`https://www.ebay.com/sch/i.html?_nkw=${encodedQuery}`, '_blank');
  };

  return (
    <div className="relative bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200">
      <div className="flex flex-col items-center">
        <img 
          src={card.images.small}
          alt={card.name}
          className="w-full max-w-[250px] h-auto"
        />
        <div className="p-2.5 w-full text-center">
          <h3 className="text-sm font-bold uppercase text-gray-900 mb-1.5">{card.name}</h3>
          <div className="text-gray-600 space-y-1 text-sm">
            <p className="opacity-90">SET: {card.set.name}</p>
            <p className="opacity-90">NUMBER: {card.number}</p>
            <p className="opacity-90">RARITY: {card.rarity}</p>
            {(() => {
              const prices = getCardPrices(card);
              return (
                <>
                  {prices.normal !== 'N/A' && (
                    <p className="opacity-90">
                      NORMAL: <span className="text-[#4287f5] font-semibold">${prices.normal}</span>
                    </p>
                  )}
                  {prices.reverseHolofoil !== 'N/A' && (
                    <p className="opacity-90">
                      REVERSE HOLOFOIL: <span className="text-[#4287f5] font-semibold">${prices.reverseHolofoil}</span>
                    </p>
                  )}
                </>
              );
            })()}
          </div>
          
          <div className="mt-2">
            <Button
              onClick={handleEbaySearch}
              className="w-full"
            >
              Search on eBay
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const TopPrices = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState('Loading cards...');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRarity, setSelectedRarity] = useState('ALL');
  const cardsPerPage = 24;

  useEffect(() => {
    const fetchExpensiveCards = async () => {
      try {
        setLoading(true);
        setLoadingMessage('Loading expensive cards...');
        
        let allExpensiveCards: Card[] = [];
        const maxRetries = 3;
        
        // Función para hacer fetch con reintentos
        const fetchWithRetry = async (url: string, retries = 0): Promise<any> => {
          try {
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
          } catch (error) {
            if (retries < maxRetries) {
              // Esperar 1 segundo antes de reintentar
              await new Promise(resolve => setTimeout(resolve, 1000));
              return fetchWithRetry(url, retries + 1);
            }
            throw error;
          }
        };

        // Fetch los 100 cards más caras primero
        setLoadingMessage('Loading most expensive cards overall...');
        const overallResponse = await fetchWithRetry(
          'https://api.pokemontcg.io/v2/cards?orderBy=-tcgplayer.prices.holofoil.market,-tcgplayer.prices.reverseHolofoil.market,-tcgplayer.prices.normal.market&pageSize=100'
        );
        allExpensiveCards = [...overallResponse.data];

        // Define queries para cada rareza
        const rarityQueries = [
          { rarity: 'rare secret', query: 'rarity:"rare secret" OR rarity:"hyper rare"' },
          { rarity: 'rare holo', query: 'rarity:"rare holo"' },
          { rarity: 'rare', query: 'rarity:"rare"' },
          { rarity: 'common', query: 'rarity:"common"' },
          { rarity: 'uncommon', query: 'rarity:"uncommon"' }
        ];

        // Fetch cards por rareza en paralelo
        const rarityPromises = rarityQueries.map(async ({ rarity, query }) => {
          setLoadingMessage(`Loading ${rarity} cards...`);
          try {
            const data = await fetchWithRetry(
              `https://api.pokemontcg.io/v2/cards?q=${query}&orderBy=-tcgplayer.prices.holofoil.market,-tcgplayer.prices.reverseHolofoil.market,-tcgplayer.prices.normal.market&pageSize=50`
            );
            return data.data;
          } catch (error) {
            console.error(`Error fetching ${rarity} cards:`, error);
            return [];
          }
        });

        const rarityResults = await Promise.allSettled(rarityPromises);
        rarityResults.forEach((result) => {
          if (result.status === 'fulfilled') {
            allExpensiveCards = [...allExpensiveCards, ...result.value];
          }
        });

        // Eliminar duplicados y ordenar
        setLoadingMessage('Processing results...');
        const uniqueCards = Array.from(
          new Map(allExpensiveCards.map(card => [card.id, card])).values()
        );

        const sortedCards = uniqueCards
          .filter(card => getNumericPrice(card) > 0)
          .sort((a, b) => getNumericPrice(b) - getNumericPrice(a));

        setCards(sortedCards);
      } catch (error) {
        console.error('Error fetching cards:', error);
        setLoadingMessage('Error loading cards. Please check your internet connection and try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchExpensiveCards();
  }, []);

  // Filtrar cartas basado en búsqueda y rareza
  const filteredCards = cards.filter(card => {
    const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRarity = selectedRarity === 'ALL' || card.rarity.toLowerCase() === selectedRarity.toLowerCase();
    return matchesSearch && matchesRarity;
  });

  // Paginación
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(filteredCards.length / cardsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#cce2fe] text-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-xl font-bold text-[#0066ff] hover:text-[#0052cc] mr-4">
                CardSetHub
              </Link>
              <Link to="/set-search">
                <Button variant="ghost" className="text-gray-800 hover:text-gray-900 hover:bg-blue-200">
                  Set Search
                </Button>
              </Link>
              <Link to="/top-prices">
                <Button variant="ghost" className="text-gray-800 hover:text-gray-900 hover:bg-blue-200">
                  Top Prices
                </Button>
              </Link>
              <Link to="/sell">
                <Button variant="ghost" className="text-gray-800 hover:text-gray-900 hover:bg-blue-200">
                  Sell
                </Button>
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <Link to="/auth">
                <Button variant="ghost" className="text-gray-800 hover:text-gray-900 hover:bg-blue-200">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Most Expensive Pokemon Cards</h1>
          <div className="max-w-6xl mx-auto mb-4">
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <Input
                type="text"
                placeholder="Search cards..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="flex-1"
              />
              <select
                value={selectedRarity}
                onChange={(e) => {
                  setSelectedRarity(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-3 py-2 border rounded-md"
              >
                <option value="ALL">All Rarities</option>
                <option value="Common">Common</option>
                <option value="Uncommon">Uncommon</option>
                <option value="Rare">Rare</option>
                <option value="Rare Holo">Rare Holo</option>
                <option value="Rare Secret">Rare Secret</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12 text-gray-800">{loadingMessage}</div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 max-w-6xl mx-auto">
                {currentCards.map((card) => (
                  <CardComponent key={card.id} card={card} />
                ))}
              </div>
              
              {/* Paginación */}
              <div className="flex justify-center mt-4 gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <Button
                    key={i + 1}
                    onClick={() => paginate(i + 1)}
                    variant={currentPage === i + 1 ? 'default' : 'outline'}
                  >
                    {i + 1}
                  </Button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopPrices; 