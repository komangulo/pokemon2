import { useState } from 'react';
import SetCard from './SetCard';
import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePokemonSets } from '@/services/pokemonTCG';
import { Skeleton } from '@/components/ui/skeleton';

const SetGrid = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  
  const { data: sets, isLoading, error } = usePokemonSets();
  
  // Group sets by series
  const setsBySeries = sets?.reduce((acc: Record<string, typeof sets>, set) => {
    if (!acc[set.series]) {
      acc[set.series] = [];
    }
    acc[set.series].push(set);
    return acc;
  }, {});
  
  // Sort sets within each series by release date (newest first)
  if (setsBySeries) {
    Object.keys(setsBySeries).forEach(series => {
      setsBySeries[series].sort((a, b) => 
        new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
      );
    });
  }
  
  // Get sorted series based on their most recent set's release date
  const sortedSeries = setsBySeries && Object.keys(setsBySeries)
    .sort((a, b) => {
      const latestSetA = setsBySeries[a][0]; // First set is the newest after sorting
      const latestSetB = setsBySeries[b][0];
      return new Date(latestSetB.releaseDate).getTime() - new Date(latestSetA.releaseDate).getTime();
    })
    .filter(series => series.toLowerCase().includes(searchTerm.toLowerCase()))
    .reduce((acc: Record<string, typeof sets>, series) => {
      const filteredSets = setsBySeries[series].filter(set => 
        set.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filter === 'all' || (
          filter === 'recent' && new Date(set.releaseDate).getFullYear() >= 2022
        ))
      );
      
      if (filteredSets.length > 0) {
        acc[series] = filteredSets;
      }
      
      return acc;
    }, {});
  
  if (error) {
    return (
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2 text-red-600">Error loading sets</h3>
            <p className="text-gray-600">Please try again later</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Pokémon Card Sets</h1>
        
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <input 
              type="text" 
              placeholder="Search sets..." 
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
          
          <div className="flex">
            <Button 
              variant={filter === 'all' ? 'default' : 'outline'} 
              className="rounded-l-lg rounded-r-none px-4"
              onClick={() => setFilter('all')}
            >
              All Sets
            </Button>
            <Button 
              variant={filter === 'recent' ? 'default' : 'outline'} 
              className="rounded-l-none rounded-r-lg px-4"
              onClick={() => setFilter('recent')}
            >
              Recent Sets
            </Button>
          </div>
        </div>
        
        {/* Sets Grid */}
        {isLoading ? (
          <div className="space-y-16">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-8 w-64" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                  {[...Array(8)].map((_, j) => (
                    <Skeleton key={j} className="h-64 w-full rounded-lg" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : sortedSeries && Object.keys(sortedSeries).length > 0 ? (
          <div className="space-y-16">
            {Object.entries(sortedSeries).map(([series, seriesSets]) => (
              <div key={series} className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-800 border-b-2 pb-2">{series}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                  {seriesSets.map(set => {
                    // Get prices based on set name
                    let boosterBoxPrice = 0;
                    let eliteTrainerPrice = 0;
                    
                    switch(set.name) {
                      case 'Prismatic Evolutions':
                        boosterBoxPrice = 228.00;
                        eliteTrainerPrice = 79.47;
                        break;
                      case 'Terastal Festival':
                        boosterBoxPrice = 144.50;
                        eliteTrainerPrice = 68.50;
                        break;
                      case 'Battle Partners':
                        boosterBoxPrice = 194.97;
                        eliteTrainerPrice = 97.75;
                        break;
                      case 'Pokémon Card 151':
                        boosterBoxPrice = 322.94;
                        eliteTrainerPrice = 213.80;
                        break;
                      case 'Paldea Evolved':
                        boosterBoxPrice = 194.97;
                        eliteTrainerPrice = 79.47;
                        break;
                      case 'Stellar Crown':
                        boosterBoxPrice = 144.50;
                        eliteTrainerPrice = 68.50;
                        break;
                      case 'Ancient Origins':
                        boosterBoxPrice = 322.94;
                        eliteTrainerPrice = 283.81;
                        break;
                      case 'BREAKpoint':
                        boosterBoxPrice = 194.97;
                        eliteTrainerPrice = 266.01;
                        break;
                      case 'BREAKthrough':
                        boosterBoxPrice = 228.00;
                        eliteTrainerPrice = 349.99;
                        break;
                      case 'Burning Shadows':
                        boosterBoxPrice = 322.94;
                        eliteTrainerPrice = 320.14;
                        break;
                      case 'Celestial Storm':
                        boosterBoxPrice = 194.97;
                        eliteTrainerPrice = 283.81;
                        break;
                      case 'Cosmic Eclipse':
                        boosterBoxPrice = 322.94;
                        eliteTrainerPrice = 213.80;
                        break;
                      case 'Crimson Invasion':
                        boosterBoxPrice = 194.97;
                        eliteTrainerPrice = 266.01;
                        break;
                      case 'Dragon Majesty':
                        boosterBoxPrice = 322.94;
                        eliteTrainerPrice = 320.14;
                        break;
                      case 'Fates Collide':
                        boosterBoxPrice = 194.97;
                        eliteTrainerPrice = 283.81;
                        break;
                      case 'Forbidden Light':
                        boosterBoxPrice = 228.00;
                        eliteTrainerPrice = 266.01;
                        break;
                      case 'Furious Fists':
                        boosterBoxPrice = 322.94;
                        eliteTrainerPrice = 1725.00;
                        break;
                      case 'Generations':
                        boosterBoxPrice = 194.97;
                        eliteTrainerPrice = 320.14;
                        break;
                      case 'Guardians Rising':
                        boosterBoxPrice = 228.00;
                        eliteTrainerPrice = 283.81;
                        break;
                      case 'Hidden Fates':
                        boosterBoxPrice = 322.94;
                        eliteTrainerPrice = 349.99;
                        break;
                      case 'Lost Thunder':
                        boosterBoxPrice = 194.97;
                        eliteTrainerPrice = 248.83;
                        break;
                      case 'Phantom Forces':
                        boosterBoxPrice = 322.94;
                        eliteTrainerPrice = 320.14;
                        break;
                      case 'Plasma Blast':
                        boosterBoxPrice = 194.97;
                        eliteTrainerPrice = 283.81;
                        break;
                      case 'Plasma Storm':
                        boosterBoxPrice = 322.94;
                        eliteTrainerPrice = 213.80;
                        break;
                      case 'Primal Clash':
                        boosterBoxPrice = 194.97;
                        eliteTrainerPrice = 266.01;
                        break;
                      case 'Roaring Skies':
                        boosterBoxPrice = 228.00;
                        eliteTrainerPrice = 320.14;
                        break;
                      case 'Shining Legends':
                        boosterBoxPrice = 322.94;
                        eliteTrainerPrice = 283.81;
                        break;
                      case 'Steam Siege':
                        boosterBoxPrice = 194.97;
                        eliteTrainerPrice = 266.01;
                        break;
                      case 'Sun & Moon':
                        boosterBoxPrice = 228.00;
                        eliteTrainerPrice = 349.99;
                        break;
                      case 'Team Up':
                        boosterBoxPrice = 322.94;
                        eliteTrainerPrice = 320.14;
                        break;
                      case 'Ultra Prism':
                        boosterBoxPrice = 194.97;
                        eliteTrainerPrice = 283.81;
                        break;
                      case 'Unbroken Bonds':
                        boosterBoxPrice = 322.94;
                        eliteTrainerPrice = 213.80;
                        break;
                      case 'Unified Minds':
                        boosterBoxPrice = 194.97;
                        eliteTrainerPrice = 266.01;
                        break;
                      case 'Shrouded Fable':
                        boosterBoxPrice = 194.97;
                        eliteTrainerPrice = 79.47;
                        break;
                      case 'Temporal Forces':
                        boosterBoxPrice = 144.50;
                        eliteTrainerPrice = 97.75;
                        break;
                      case 'Surging Sparks':
                        boosterBoxPrice = 194.97;
                        eliteTrainerPrice = 79.47;
                        break;
                      case 'Paradox Rift':
                        boosterBoxPrice = 322.94;
                        eliteTrainerPrice = 68.50;
                        break;
                      case 'Paldean Fates':
                        boosterBoxPrice = 228.00;
                        eliteTrainerPrice = 97.75;
                        break;
                      case 'Obsidian Flames':
                        boosterBoxPrice = 144.50;
                        eliteTrainerPrice = 248.83;
                        break;
                      case 'Scarlet & Violet':
                        boosterBoxPrice = 194.97;
                        eliteTrainerPrice = 266.01;
                        break;
                      case 'Crown Zenith':
                        boosterBoxPrice = 322.94;
                        eliteTrainerPrice = 320.14;
                        break;
                      case 'Silver Tempest':
                        boosterBoxPrice = 194.97;
                        eliteTrainerPrice = 283.81;
                        break;
                      case 'Lost Origin':
                        boosterBoxPrice = 144.50;
                        eliteTrainerPrice = 349.99;
                        break;
                      case 'Astral Radiance':
                        boosterBoxPrice = 194.97;
                        eliteTrainerPrice = 213.80;
                        break;
                      case 'Brilliant Stars':
                        boosterBoxPrice = 322.94;
                        eliteTrainerPrice = 266.01;
                        break;
                      case 'Fusion Strike':
                        boosterBoxPrice = 228.00;
                        eliteTrainerPrice = 248.83;
                        break;
                      case 'Celebrations':
                        boosterBoxPrice = 194.97;
                        eliteTrainerPrice = 320.14;
                        break;
                      case 'Evolving Skies':
                        boosterBoxPrice = 144.50;
                        eliteTrainerPrice = 283.81;
                        break;
                      case 'Chilling Reign':
                        boosterBoxPrice = 194.97;
                        eliteTrainerPrice = 79.47;
                        break;
                      case 'Battle Styles':
                        boosterBoxPrice = 322.94;
                        eliteTrainerPrice = 68.50;
                        break;
                      case 'Shining Fates':
                        boosterBoxPrice = 194.97;
                        eliteTrainerPrice = 213.80;
                        break;
                      case 'Vivid Voltage':
                        boosterBoxPrice = 144.50;
                        eliteTrainerPrice = 266.01;
                        break;
                      case 'Champions Path':
                        boosterBoxPrice = 194.97;
                        eliteTrainerPrice = 1725.00;
                        break;
                      case 'Darkness Ablaze':
                        boosterBoxPrice = 322.94;
                        eliteTrainerPrice = 320.14;
                        break;
                      case 'Rebel Clash':
                        boosterBoxPrice = 228.00;
                        eliteTrainerPrice = 283.81;
                        break;
                      case 'Sword & Shield':
                        boosterBoxPrice = 194.97;
                        eliteTrainerPrice = 349.99;
                        break;
                      case 'Legendary Treasures':
                        boosterBoxPrice = 1200.00;
                        eliteTrainerPrice = 0;
                        break;
                      case 'Plasma Freeze':
                        boosterBoxPrice = 2500.00;
                        eliteTrainerPrice = 0;
                        break;
                      case 'Boundaries Crossed':
                        boosterBoxPrice = 1800.00;
                        eliteTrainerPrice = 0;
                        break;
                      case 'Dragon Vault':
                        boosterBoxPrice = 900.00;
                        eliteTrainerPrice = 0;
                        break;
                      case 'Dragons Exalted':
                        boosterBoxPrice = 1500.00;
                        eliteTrainerPrice = 0;
                        break;
                      case 'Dark Explorers':
                        boosterBoxPrice = 2000.00;
                        eliteTrainerPrice = 0;
                        break;
                      case 'Next Destinies':
                        boosterBoxPrice = 1800.00;
                        eliteTrainerPrice = 0;
                        break;
                      case 'Noble Victories':
                        boosterBoxPrice = 2200.00;
                        eliteTrainerPrice = 0;
                        break;
                      case 'Emerging Powers':
                        boosterBoxPrice = 1500.00;
                        eliteTrainerPrice = 0;
                        break;
                      case 'Call of Legends':
                        boosterBoxPrice = 3500.00;
                        eliteTrainerPrice = 0;
                        break;
                      case 'HS—Triumphant':
                        boosterBoxPrice = 3000.00;
                        eliteTrainerPrice = 0;
                        break;
                      case 'HS—Undaunted':
                        boosterBoxPrice = 2800.00;
                        eliteTrainerPrice = 0;
                        break;
                      case 'HS—Unleashed':
                        boosterBoxPrice = 2800.00;
                        eliteTrainerPrice = 0;
                        break;
                      case 'HeartGold & SoulSilver':
                        boosterBoxPrice = 3200.00;
                        eliteTrainerPrice = 0;
                        break;
                      case 'Arceus':
                        boosterBoxPrice = 2500.00;
                        eliteTrainerPrice = 0;
                        break;
                      case 'Supreme Victors':
                        boosterBoxPrice = 2800.00;
                        eliteTrainerPrice = 0;
                        break;
                      case 'Rising Rivals':
                        boosterBoxPrice = 2600.00;
                        eliteTrainerPrice = 0;
                        break;
                      case 'Platinum':
                        boosterBoxPrice = 3000.00;
                        eliteTrainerPrice = 0;
                        break;
                      case 'Stormfront':
                        boosterBoxPrice = 2800.00;
                        eliteTrainerPrice = 0;
                        break;
                      case 'Legends Awakened':
                        boosterBoxPrice = 2500.00;
                        eliteTrainerPrice = 0;
                        break;
                      case 'Majestic Dawn':
                        boosterBoxPrice = 2600.00;
                        eliteTrainerPrice = 0;
                        break;
                      case 'Great Encounters':
                        boosterBoxPrice = 2400.00;
                        eliteTrainerPrice = 0;
                        break;
                      case 'Secret Wonders':
                        boosterBoxPrice = 2700.00;
                        eliteTrainerPrice = 0;
                        break;
                      case 'Mysterious Treasures':
                        boosterBoxPrice = 2500.00;
                        eliteTrainerPrice = 0;
                        break;
                      case 'Diamond & Pearl':
                        boosterBoxPrice = 3000.00;
                        eliteTrainerPrice = 0;
                        break;
                      case 'Power Keepers':
                        boosterBoxPrice = 3500.00;
                        eliteTrainerPrice = 0;
                        break;
                      case 'Dragon Frontiers':
                        boosterBoxPrice = 4000.00;
                        eliteTrainerPrice = 0;
                        break;
                      case 'Crystal Guardians':
                        boosterBoxPrice = 3800.00;
                        eliteTrainerPrice = 0;
                        break;
                      case 'Holon Phantoms':
                        boosterBoxPrice = 4200.00;
                        eliteTrainerPrice = 0;
                        break;
                      case 'Legend Maker':
                        boosterBoxPrice = 3600.00;
                        eliteTrainerPrice = 0;
                        break;
                      case 'Delta Species':
                        boosterBoxPrice = 3800.00;
                        eliteTrainerPrice = 0;
                        break;
                      case 'Unseen Forces':
                        boosterBoxPrice = 4500.00;
                        eliteTrainerPrice = 0;
                        break;
                      case 'Emerald':
                        boosterBoxPrice = 4000.00;
                        eliteTrainerPrice = 0;
                        break;
                      case 'Deoxys':
                        boosterBoxPrice = 4200.00;
                        eliteTrainerPrice = 0;
                        break;
                      case 'Team Rocket Returns':
                        boosterBoxPrice = 5000.00;
                        eliteTrainerPrice = 0;
                        break;
                      case 'FireRed & LeafGreen':
                        boosterBoxPrice = 4500.00;
                        eliteTrainerPrice = 0;
                        break;
                      case 'Hidden Legends':
                        boosterBoxPrice = 3800.00;
                        eliteTrainerPrice = 0;
                        break;
                      case 'Gym Challenge':
                        boosterBoxPrice = 25000.00;
                        eliteTrainerPrice = 0;
                        break;
                      case 'Gym Heroes':
                        boosterBoxPrice = 22000.00;
                        eliteTrainerPrice = 0;
                        break;
                      case 'Base Set':
                        boosterBoxPrice = 40000.00;
                        eliteTrainerPrice = 0;
                        break;
                      case 'Base Set 2':
                        boosterBoxPrice = 25000.00;
                        eliteTrainerPrice = 0;
                        break;
                      case 'Fossil':
                        boosterBoxPrice = 20000.00;
                        eliteTrainerPrice = 0;
                        break;
                      case 'Jungle':
                        boosterBoxPrice = 20000.00;
                        eliteTrainerPrice = 0;
                        break;
                      case 'Team Rocket':
                        boosterBoxPrice = 18000.00;
                        eliteTrainerPrice = 0;
                        break;
                      case 'Neo Genesis':
                        boosterBoxPrice = 25000.00;
                        eliteTrainerPrice = 0;
                        break;
                      case 'Neo Discovery':
                        boosterBoxPrice = 22000.00;
                        eliteTrainerPrice = 0;
                        break;
                      case 'Neo Revelation':
                        boosterBoxPrice = 28000.00;
                        eliteTrainerPrice = 0;
                        break;
                      case 'Neo Destiny':
                        boosterBoxPrice = 30000.00;
                        eliteTrainerPrice = 0;
                        break;
                      case 'Skyridge':
                        boosterBoxPrice = 40000.00;
                        eliteTrainerPrice = 0;
                        break;
                      case 'Aquapolis':
                        boosterBoxPrice = 35000.00;
                        eliteTrainerPrice = 0;
                        break;
                      case 'Expedition Base Set':
                        boosterBoxPrice = 30000.00;
                        eliteTrainerPrice = 0;
                        break;
                      default:
                        boosterBoxPrice = 0;
                        eliteTrainerPrice = 0;
                    }

                    return (
                    <SetCard 
                      key={set.id}
                      id={set.id}
                      name={set.name}
                      cardCount={set.total}
                      releaseDate={new Date(set.releaseDate).toLocaleDateString()}
                      logo={set.images.logo}
                        eliteTrainerPrice={eliteTrainerPrice}
                        boosterBoxPrice={boosterBoxPrice}
                    />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No sets found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SetGrid;
