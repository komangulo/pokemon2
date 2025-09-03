import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PokemonCard } from '@/services/pokemonTCG';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Skeleton } from '@/components/ui/skeleton';

interface PokemonCardProps {
  card: PokemonCard;
}

const PokemonCardComponent = ({ card }: PokemonCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Get the card price from cardmarket
  const cardPrice = card.cardmarket?.prices?.averageSellPrice;
  
  return (
    <Link 
      to={`/card/${card.id}`}
      className="group rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <AspectRatio ratio={63/88}>
          {!imageLoaded && <Skeleton className="absolute inset-0" />}
          <img 
            src={card.images.small} 
            alt={card.name}
            className={`w-full h-full object-contain transition-transform duration-500 ${isHovered ? 'scale-110' : ''} ${!imageLoaded ? 'opacity-0' : 'opacity-100'}`}
            onLoad={() => setImageLoaded(true)}
          />
          <div 
            className={`absolute inset-0 bg-black transition-opacity duration-300 ${isHovered ? 'opacity-20' : 'opacity-0'}`}
          ></div>
        </AspectRatio>
      </div>
      
      <div className="p-3 bg-white">
        <h3 className="font-medium text-sm truncate">{card.name}</h3>
        <div className="flex justify-between items-center mt-1">
          <span className="text-xs text-gray-500">#{card.number}</span>
          {cardPrice !== undefined && (
            <span className="text-xs font-semibold text-green-600">
              ${cardPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default PokemonCardComponent;
