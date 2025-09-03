import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, TrendingUp, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PokemonCard } from '@/services/pokemonTCG';
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { EbayListings } from '@/components/EbayListings';

const CardDetail = () => {
  const { cardId } = useParams<{ cardId: string }>();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const fetchCard = async (): Promise<PokemonCard> => {
    const response = await fetch(`https://api.pokemontcg.io/v2/cards/${cardId}`);
    const data = await response.json();
    return data.data;
  };

  const { 
    data: card, 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['card', cardId],
    queryFn: fetchCard,
    enabled: !!cardId,
  });

  // Generate mock price history data (replace with actual API data if available)
  const generatePriceData = () => {
    const today = new Date();
    const data = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      
      // Generate some realistic price fluctuation based on card market price
      const basePrice = card?.tcgplayer?.prices?.holofoil?.market || 
                       card?.tcgplayer?.prices?.normal?.market || 
                       (card?.cardmarket?.prices?.averageSellPrice || 1);
      
      const randomFactor = 0.8 + (Math.random() * 0.4); // Between 0.8 and 1.2
      const price = basePrice * randomFactor;
      
      const psa10Factor = 5 + Math.random() * 2; // PSA 10 is 5-7x base price
      const psa9Factor = 2 + Math.random(); // PSA 9 is 2-3x base price
      const psa8Factor = 1.2 + Math.random() * 0.5; // PSA 8 is 1.2-1.7x base price
      
      data.push({
        date: dateStr,
        raw: price.toFixed(2),
        psa8: (price * psa8Factor).toFixed(2),
        psa9: (price * psa9Factor).toFixed(2),
        psa10: (price * psa10Factor).toFixed(2),
      });
    }
    return data;
  };

  const priceData = card ? generatePriceData() : [];

  const priceConfig = {
    raw: {
      label: "Raw",
      color: "#0ea5e9",
    },
    psa8: {
      label: "PSA 8",
      color: "#22c55e",
    },
    psa9: {
      label: "PSA 9",
      color: "#f59e0b",
    },
    psa10: {
      label: "PSA 10",
      color: "#ef4444",
    },
  };

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="container mx-auto pt-24 px-4">
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-red-600">Error loading card data</h2>
            <p className="mt-4">Please try again later</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="container mx-auto pt-24 px-4 pb-16">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Skeleton className="h-[500px] w-full rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-40 w-full" />
            </div>
          </div>
        ) : card ? (
          <>
            <Link to={`/set/${card.set.id}`} className="inline-flex items-center gap-2 mb-6 text-blue-600 hover:text-blue-800">
              <ArrowLeft size={16} />
              <span>Back to {card.set.name}</span>
            </Link>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div>
                <div 
                  className="rounded-lg overflow-hidden shadow-lg w-full max-w-[400px] perspective hover:cursor-pointer group"
                  onClick={() => setIsModalOpen(true)}
                >
                  {!imageLoaded && <Skeleton className="h-[400px] w-full" />}
                  <div className="relative transform-gpu transition-transform duration-200 ease-out group-hover:scale-[1.02] group-hover:[transform:rotateY(var(--mouse-x)deg)_rotateX(var(--mouse-y)deg)]"
                       onMouseMove={(e) => {
                         const rect = e.currentTarget.getBoundingClientRect();
                         const x = e.clientX - rect.left;
                         const y = e.clientY - rect.top;
                         const centerX = rect.width / 2;
                         const centerY = rect.height / 2;
                         const rotateX = ((y - centerY) / centerY) * -10;
                         const rotateY = ((x - centerX) / centerX) * 10;
                         e.currentTarget.style.setProperty('--mouse-x', rotateY.toString());
                         e.currentTarget.style.setProperty('--mouse-y', rotateX.toString());
                       }}
                       onMouseLeave={(e) => {
                         e.currentTarget.style.setProperty('--mouse-x', '0');
                         e.currentTarget.style.setProperty('--mouse-y', '0');
                       }}>
                    <img 
                      src={card.images.large} 
                      alt={card.name}
                      className={`w-full h-auto ${!imageLoaded ? 'hidden' : ''}`}
                      onLoad={() => setImageLoaded(true)}
                    />
                  </div>
                </div>

                {/* Add eBay listings section */}
                <EbayListings 
                  cardName={card.name}
                  cardNumber={card.number}
                  setName={card.set.name}
                />

              </div>

              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">
                    {card.name} #{card.number}
                  </h1>
                  <p className="text-lg text-gray-600 mb-6">{card.supertype} - {card.subtypes?.join(', ')}</p>
                </div>

                {card.tcgplayer && (
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="font-bold mb-4">Market Prices</h3>
                      {Object.entries(card.tcgplayer.prices || {}).map(([priceType, prices]) => (
                        <div key={priceType} className="border-b pb-3 last:border-b-0 last:pb-0">
                          <h4 className="font-semibold capitalize">{priceType.replace(/([A-Z])/g, ' $1')}</h4>
                          <div className="grid grid-cols-2 gap-4 mt-2">
                            {prices.market && (
                              <div>
                                <p className="text-xs text-gray-500">Market</p>
                                <p className="font-medium">${prices.market.toFixed(2)}</p>
                              </div>
                            )}
                            {prices.low && (
                              <div>
                                <p className="text-xs text-gray-500">Low</p>
                                <p className="font-medium">${prices.low.toFixed(2)}</p>
                              </div>
                            )}
                            {prices.mid && (
                              <div>
                                <p className="text-xs text-gray-500">Mid</p>
                                <p className="font-medium">${prices.mid.toFixed(2)}</p>
                              </div>
                            )}
                            {prices.high && (
                              <div>
                                <p className="text-xs text-gray-500">High</p>
                                <p className="font-medium">${prices.high.toFixed(2)}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        Price History (30 days)
                      </h3>
                    </div>
                    <div className="h-[300px] w-full">
                      <ChartContainer config={priceConfig}>
                        <LineChart data={priceData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                          <XAxis 
                            dataKey="date" 
                            tick={{ fontSize: 12 }}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => value.substring(0, 3)}
                          />
                          <YAxis 
                            tick={{ fontSize: 12 }}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `$${value}`}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="raw" 
                            stroke="var(--color-raw)" 
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 4 }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="psa8" 
                            stroke="var(--color-psa8)" 
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 4 }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="psa9" 
                            stroke="var(--color-psa9)" 
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 4 }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="psa10" 
                            stroke="var(--color-psa10)" 
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 4 }}
                          />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Legend content={<ChartLegendContent />} />
                        </LineChart>
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">HP</p>
                        <p className="font-semibold">{card.hp || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Rarity</p>
                        <p className="font-semibold">{card.rarity || 'N/A'}</p>
                      </div>
                      {card.types && (
                        <div>
                          <p className="text-sm text-gray-500">Types</p>
                          <div className="flex gap-1 mt-1">
                            {card.types.map(type => (
                              <span key={type} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                {type}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {card.evolvesFrom && (
                        <div>
                          <p className="text-sm text-gray-500">Evolves From</p>
                          <p className="font-semibold">{card.evolvesFrom}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
                
                {card.attacks && card.attacks.length > 0 && (
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="font-bold mb-4">Attacks</h3>
                      <div className="space-y-4">
                        {card.attacks.map((attack, index) => (
                          <div key={index} className="border-b pb-3 last:border-b-0 last:pb-0">
                            <div className="flex justify-between">
                              <h4 className="font-semibold">{attack.name}</h4>
                              <p className="text-sm">{attack.damage}</p>
                            </div>
                            <p className="text-sm mt-1">{attack.text}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                {card.weaknesses && card.weaknesses.length > 0 && (
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="font-bold mb-2">Weaknesses</h3>
                      <div className="flex gap-2">
                        {card.weaknesses.map((weakness, index) => (
                          <span key={index} className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">
                            {weakness.type} {weakness.value}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                {card.resistances && card.resistances.length > 0 && (
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="font-bold mb-2">Resistances</h3>
                      <div className="flex gap-2">
                        {card.resistances.map((resistance, index) => (
                          <span key={index} className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                            {resistance.type} {resistance.value}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                {card.cardmarket && card.cardmarket.prices && (
                  <Card>
                    <CardContent className="pt-6">
                      <h3 className="font-bold mb-4">Detailed Price Information</h3>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Price Type</TableHead>
                            <TableHead className="text-right">Value</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {card.cardmarket.prices.averageSellPrice !== undefined && (
                            <TableRow>
                              <TableCell>Average Sell Price</TableCell>
                              <TableCell className="text-right">${card.cardmarket.prices.averageSellPrice.toFixed(2)}</TableCell>
                            </TableRow>
                          )}
                          {card.cardmarket.prices.lowPrice !== undefined && (
                            <TableRow>
                              <TableCell>Low Price</TableCell>
                              <TableCell className="text-right">${card.cardmarket.prices.lowPrice.toFixed(2)}</TableCell>
                            </TableRow>
                          )}
                          {card.cardmarket.prices.trendPrice !== undefined && (
                            <TableRow>
                              <TableCell>Trend Price</TableCell>
                              <TableCell className="text-right">${card.cardmarket.prices.trendPrice.toFixed(2)}</TableCell>
                            </TableRow>
                          )}
                          {card.cardmarket.prices.germanProLow !== undefined && card.cardmarket.prices.germanProLow > 0 && (
                            <TableRow>
                              <TableCell>German Pro Low</TableCell>
                              <TableCell className="text-right">${card.cardmarket.prices.germanProLow.toFixed(2)}</TableCell>
                            </TableRow>
                          )}
                          {card.cardmarket.prices.suggestedPrice !== undefined && card.cardmarket.prices.suggestedPrice > 0 && (
                            <TableRow>
                              <TableCell>Suggested Price</TableCell>
                              <TableCell className="text-right">${card.cardmarket.prices.suggestedPrice.toFixed(2)}</TableCell>
                            </TableRow>
                          )}
                          {card.cardmarket.prices.reverseHoloSell !== undefined && (
                            <TableRow>
                              <TableCell>Reverse Holo Sell</TableCell>
                              <TableCell className="text-right">${card.cardmarket.prices.reverseHoloSell.toFixed(2)}</TableCell>
                            </TableRow>
                          )}
                          {card.cardmarket.prices.reverseHoloLow !== undefined && (
                            <TableRow>
                              <TableCell>Reverse Holo Low</TableCell>
                              <TableCell className="text-right">${card.cardmarket.prices.reverseHoloLow.toFixed(2)}</TableCell>
                            </TableRow>
                          )}
                          {card.cardmarket.prices.reverseHoloTrend !== undefined && (
                            <TableRow>
                              <TableCell>Reverse Holo Trend</TableCell>
                              <TableCell className="text-right">${card.cardmarket.prices.reverseHoloTrend.toFixed(2)}</TableCell>
                            </TableRow>
                          )}
                          {card.cardmarket.prices.lowPriceExPlus !== undefined && (
                            <TableRow>
                              <TableCell>Low Price Ex+</TableCell>
                              <TableCell className="text-right">${card.cardmarket.prices.lowPriceExPlus.toFixed(2)}</TableCell>
                            </TableRow>
                          )}
                          {card.cardmarket.prices.avg1 !== undefined && (
                            <TableRow>
                              <TableCell>1 Day Average</TableCell>
                              <TableCell className="text-right">${card.cardmarket.prices.avg1.toFixed(2)}</TableCell>
                            </TableRow>
                          )}
                          {card.cardmarket.prices.avg7 !== undefined && (
                            <TableRow>
                              <TableCell>7 Day Average</TableCell>
                              <TableCell className="text-right">${card.cardmarket.prices.avg7.toFixed(2)}</TableCell>
                            </TableRow>
                          )}
                          {card.cardmarket.prices.avg30 !== undefined && (
                            <TableRow>
                              <TableCell>30 Day Average</TableCell>
                              <TableCell className="text-right">${card.cardmarket.prices.avg30.toFixed(2)}</TableCell>
                            </TableRow>
                          )}
                          {card.cardmarket.prices.reverseHoloAvg1 !== undefined && (
                            <TableRow>
                              <TableCell>Reverse Holo 1 Day Average</TableCell>
                              <TableCell className="text-right">${card.cardmarket.prices.reverseHoloAvg1.toFixed(2)}</TableCell>
                            </TableRow>
                          )}
                          {card.cardmarket.prices.reverseHoloAvg7 !== undefined && (
                            <TableRow>
                              <TableCell>Reverse Holo 7 Day Average</TableCell>
                              <TableCell className="text-right">${card.cardmarket.prices.reverseHoloAvg7.toFixed(2)}</TableCell>
                            </TableRow>
                          )}
                          {card.cardmarket.prices.reverseHoloAvg30 !== undefined && (
                            <TableRow>
                              <TableCell>Reverse Holo 30 Day Average</TableCell>
                              <TableCell className="text-right">${card.cardmarket.prices.reverseHoloAvg30.toFixed(2)}</TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                )}
                
                <div className="text-sm text-gray-500">
                  <p>Set: {card.set.name}</p>
                  <p>Card Number: {card.number}/{card.set.printedTotal}</p>
                  {card.artist && <p>Illustrator: {card.artist}</p>}
                </div>
              </div>
            </div>

            {/* Modal for enlarged card view */}
            {isModalOpen && (
              <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={() => setIsModalOpen(false)}>
                <div className="relative max-h-[90vh] max-w-[90vw]">
                  <button 
                    className="absolute -top-4 -right-4 bg-white rounded-full p-1 shadow-lg hover:bg-gray-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsModalOpen(false);
                    }}
                  >
                    <X className="h-6 w-6" />
                  </button>
                  <img 
                    src={card.images.large} 
                    alt={card.name}
                    className="max-h-[85vh] w-auto rounded-lg shadow-2xl"
                  />
                </div>
              </div>
            )}
          </>
        ) : null}
      </main>
      <Footer />
    </div>
  );
};

export default CardDetail;

