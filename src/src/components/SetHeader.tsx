
import { PokemonSet } from '@/services/pokemonTCG';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface SetHeaderProps {
  set: PokemonSet;
}

const SetHeader = ({ set }: SetHeaderProps) => {
  return (
    <div className="bg-gray-100 rounded-xl p-6 shadow-md">
      <div className="flex flex-col md:flex-row items-center gap-6">
        {set.images.logo && (
          <div className="flex-shrink-0 w-64">
            <AspectRatio ratio={16/9} className="bg-white p-2 rounded shadow-sm">
              <img 
                src={set.images.logo} 
                alt={`${set.name} logo`} 
                className="w-full h-full object-contain"
              />
            </AspectRatio>
          </div>
        )}
        
        <div className="flex-1 space-y-4 text-center md:text-left">
          <h1 className="text-3xl font-bold">{set.name}</h1>
          <div className="space-y-2">
            <p className="text-gray-700"><span className="font-semibold">Series:</span> {set.series}</p>
            <p className="text-gray-700"><span className="font-semibold">Release Date:</span> {new Date(set.releaseDate).toLocaleDateString()}</p>
            <p className="text-gray-700"><span className="font-semibold">Cards:</span> {set.total} ({set.printedTotal} printed)</p>
            
            {set.legalities && (
              <div className="flex flex-wrap gap-2 mt-4">
                {Object.entries(set.legalities).map(([format, status]) => (
                  <span 
                    key={format}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      status === 'Legal' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {format.charAt(0).toUpperCase() + format.slice(1)}: {status}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {set.images.symbol && (
          <div className="flex-shrink-0 w-16 h-16">
            <img 
              src={set.images.symbol} 
              alt={`${set.name} symbol`} 
              className="w-full h-auto"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SetHeader;
