import { useQuery } from "@tanstack/react-query";

interface PokemonCard {
  id: string;
  name: string;
  supertype: string;
  subtypes: string[];
  hp?: string;
  types?: string[];
  evolvesFrom?: string;
  evolvesTo?: string[];
  rules?: string[];
  attacks?: {
    name: string;
    cost: string[];
    convertedEnergyCost: number;
    damage: string;
    text: string;
  }[];
  weaknesses?: {
    type: string;
    value: string;
  }[];
  resistances?: {
    type: string;
    value: string;
  }[];
  retreatCost?: string[];
  convertedRetreatCost?: number;
  set: {
    id: string;
    name: string;
    series: string;
    printedTotal: number;
    total: number;
    legalities: { [key: string]: string };
    ptcgoCode?: string;
    releaseDate: string;
    updatedAt: string;
    images: {
      symbol: string;
      logo: string;
    };
  };
  number: string;
  artist?: string;
  rarity?: string;
  flavorText?: string;
  nationalPokedexNumbers?: number[];
  legalities: { [key: string]: string };
  images: {
    small: string;
    large: string;
  };
  tcgplayer?: {
    url: string;
    updatedAt: string;
    prices: {
      [key: string]: {
        low?: number;
        mid?: number;
        high?: number;
        market?: number;
        directLow?: number;
      };
    };
  };
  cardmarket?: {
    url: string;
    updatedAt: string;
    prices: {
      averageSellPrice?: number;
      lowPrice?: number;
      trendPrice?: number;
      germanProLow?: number;
      suggestedPrice?: number;
      reverseHoloSell?: number;
      reverseHoloLow?: number;
      reverseHoloTrend?: number;
      lowPriceExPlus?: number;
      avg1?: number;
      avg7?: number;
      avg30?: number;
      reverseHoloAvg1?: number;
      reverseHoloAvg7?: number;
      reverseHoloAvg30?: number;
    };
  };
}

interface PokemonSet {
  id: string;
  name: string;
  series: string;
  printedTotal: number;
  total: number;
  legalities: {
    unlimited?: string;
    standard?: string;
    expanded?: string;
  };
  ptcgoCode?: string;
  releaseDate: string;
  updatedAt: string;
  images: {
    symbol: string;
    logo: string;
  };
}

interface PokemonSetsResponse {
  data: PokemonSet[];
}

interface PokemonCardsResponse {
  data: PokemonCard[];
}

const API_URL = "https://api.pokemontcg.io/v2";

// Helper function to get set image URL
const getSetImageUrl = (setId: string): string => {
  // Map of set IDs to their official wallpaper paths
  const setWallpapers: Record<string, string> = {
    'sv7': '/static-assets/content-assets/cms2/img/trading-card-game/series/sv_series/sv07/sv07-banner.png',
    'sv6': '/static-assets/content-assets/cms2/img/trading-card-game/series/sv_series/sv06/sv06-banner.png',
    'sv5': '/static-assets/content-assets/cms2/img/trading-card-game/series/sv_series/sv05/sv05-banner.png',
    'sv4': '/static-assets/content-assets/cms2/img/trading-card-game/series/sv_series/sv04/sv04-banner.png',
    'sv3': '/static-assets/content-assets/cms2/img/trading-card-game/series/sv_series/sv03/sv03-banner.png',
    'sv2': '/static-assets/content-assets/cms2/img/trading-card-game/series/sv_series/sv02/sv02-banner.png',
    'sv1': '/static-assets/content-assets/cms2/img/trading-card-game/series/sv_series/sv01/sv01-banner.png',
    // Añade más mapeos según sea necesario
  };

  // Si existe un wallpaper oficial, úsalo
  if (setWallpapers[setId.toLowerCase()]) {
    return `https://www.pokemon.com${setWallpapers[setId.toLowerCase()]}`;
  }

  // Si no hay wallpaper oficial, usa el de la API de Pokemon TCG como respaldo
  return `https://images.pokemontcg.io/${setId}/background.png`;
};

export const usePokemonSets = () => {
  return useQuery({
    queryKey: ['pokemonSets'],
    queryFn: async (): Promise<PokemonSet[]> => {
      const response = await fetch(`${API_URL}/sets`);
      const data: PokemonSetsResponse = await response.json();
      return data.data;
    },
  });
};

export const useSetCards = (setId: string) => {
  return useQuery({
    queryKey: ['setCards', setId],
    queryFn: async (): Promise<PokemonCard[]> => {
      const response = await fetch(`${API_URL}/cards?q=set.id:${setId}`);
      const data: PokemonCardsResponse = await response.json();
      return data.data;
    },
    enabled: !!setId,
  });
};

export const useSetDetails = (setId: string) => {
  return useQuery({
    queryKey: ['setDetails', setId],
    queryFn: async (): Promise<PokemonSet> => {
      const response = await fetch(`${API_URL}/sets/${setId}`);
      const data = await response.json();
      return data.data;
    },
    enabled: !!setId,
  });
};

export { getSetImageUrl };
export type { PokemonCard, PokemonSet, PokemonSetsResponse, PokemonCardsResponse };
