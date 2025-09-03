import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface SetCardProps {
  id: string;
  name: string;
  cardCount: number;
  releaseDate: string;
  logo?: string;
  eliteTrainerPrice?: number;
  boosterBoxPrice?: number;
  backgroundImage?: string;
}

// Helper function to get background URL based on set name
const getBackgroundUrl = (name: string): string => {
  // Convert set name to the format used in URLs
  const formattedName = name
    .replace(/[^a-zA-Z0-9\s]/g, '')  // Remove special characters
    .replace(/\s+/g, '_')            // Replace spaces with underscores
    .replace(/&/g, 'and');          // Replace & with 'and'

  // Map of special cases where the URL differs from the formatted name
  const specialCases: Record<string, string> = {
    'SWSH_Black_Star_Promos': 'Black_Star_Promos',
    'Champions_Path': 'Champions_Path',
    'Shining_Fates_Shiny_Vault': 'Shining_Fates',
    'Battle_Styles': 'Battle_Styles',
    'Pokemon_GO': 'Pokemon_GO',
    'Silver_Tempest': 'Silver_Tempest',
    'Shining_Fates': 'Shining_Fates',
    'Crown_Zenith': 'Crown_Zenith',
    'Lost_Origin': 'Lost_Origin',
    'Brilliant_Stars': 'Brilliant_Stars',
    'Sword_Shield': 'Sword_and_Shield',
    'Prismatic_Evolutions': 'Prismatic_Evolutions',
    'Surging_Sparks': 'Surging_Sparks',
    'Stellar_Crown': 'Stellar_Crown',
    'Shrouded_Fable': 'Shrouded_Fable',
    'Twilight_Masquerade': 'Twilight_Masquerade',
    'Temporal_Forces': 'Temporal_Forces',
    'Paldean_Fates': 'Paldean_Fates',
    'Paradox_Rift': 'Paradox_Rift',
    '151': '151',
    'Obsidian_Flames': 'Obsidian_Flames',
  };

  const urlName = specialCases[formattedName] || formattedName;
  return `https://api.arizonatcg.com/web/background/${urlName}.webp`;
};

const SetCard = ({ id, name, cardCount, releaseDate, logo, eliteTrainerPrice, boosterBoxPrice, backgroundImage }: SetCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [bgError, setBgError] = useState(false);

  // Get background URL if not provided
  const effectiveBackgroundImage = backgroundImage || getBackgroundUrl(name);

  return (
    <div className="w-full">
      <Link 
        to={`/set/${id}`}
        className="group relative block w-full overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AspectRatio ratio={16/10}>
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${effectiveBackgroundImage})` }}
            onError={() => setBgError(true)}
          />

          {/* Background gradient overlay */}
          <div 
            className={`absolute inset-0 bg-gradient-to-br from-violet-500/20 via-blue-500/20 to-purple-500/20 transition-opacity duration-300 z-10 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />
          
          {/* Dark overlay for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent z-20" />

          {/* Set Logo */}
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-16 z-30 transition-all duration-300 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}>
            {logo && (
              <img 
                src={logo}
                alt={`${name} logo`}
                className="h-full w-auto object-contain drop-shadow-lg"
                onLoad={() => setImageLoaded(true)}
              />
            )}
          </div>

          {/* Price Badges */}
          <div className="absolute top-2 left-2 right-2 z-30 flex justify-between">
            {eliteTrainerPrice > 0 && (
              <a 
                href="https://www.cardmarket.com/en/Pokemon/Products/Elite-Trainer-Boxes?idExpansion=0&perSite=1200"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white/90 backdrop-blur px-3 py-1 shadow-lg hover:bg-white/100 transition-all"
              >
                <div className="text-xs font-medium text-gray-600">Elite Trainer</div>
                <div className="text-base font-bold text-gray-900">
                  {eliteTrainerPrice.toFixed(2)} €
                </div>
              </a>
            )}
            <a 
              href="https://www.cardmarket.com/en/Pokemon/Products/Booster-Boxes?idExpansion=0&perSite=20"
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-full bg-white/90 backdrop-blur px-3 py-1 shadow-lg hover:bg-white/100 transition-all ${!eliteTrainerPrice && 'ml-auto'}`}
            >
              <div className="text-xs font-medium text-gray-600">Booster Box</div>
              <div className="text-base font-bold text-gray-900">
                {boosterBoxPrice ? `${boosterBoxPrice.toFixed(2)} €` : '0.00 €'}
              </div>
            </a>
          </div>
        </AspectRatio>

        {/* Card Info */}
        <div className="p-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-gray-600">
              {cardCount} cards
            </span>
            <span className="font-medium text-gray-600">
              {releaseDate}
            </span>
          </div>
        </div>
      </Link>
      {/* Set Name Below Card */}
      <h3 className="mt-2 text-center text-sm font-semibold text-gray-900 truncate px-1">
        {name}
      </h3>
    </div>
  );
};

export default SetCard;
