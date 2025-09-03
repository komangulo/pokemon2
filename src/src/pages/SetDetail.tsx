
import { useParams } from 'react-router-dom';
import { useSetCards, useSetDetails } from '@/services/pokemonTCG';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Skeleton } from '@/components/ui/skeleton';
import CardGrid from '@/components/CardGrid';
import SetHeader from '@/components/SetHeader';

const SetDetail = () => {
  const { setId } = useParams<{ setId: string }>();
  
  const { 
    data: setDetails, 
    isLoading: isLoadingDetails, 
    error: setError 
  } = useSetDetails(setId || '');
  
  const { 
    data: cards, 
    isLoading: isLoadingCards, 
    error: cardsError 
  } = useSetCards(setId || '');

  if (setError || cardsError) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="container mx-auto pt-24 px-4">
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-red-600">Error loading set data</h2>
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
        {isLoadingDetails ? (
          <div className="space-y-4">
            <Skeleton className="h-40 w-full rounded-lg" />
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          </div>
        ) : setDetails ? (
          <SetHeader set={setDetails} />
        ) : null}

        <div className="mt-12">
          {isLoadingCards ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[...Array(20)].map((_, i) => (
                <Skeleton key={i} className="h-80 w-full rounded-lg" />
              ))}
            </div>
          ) : cards ? (
            <CardGrid cards={cards} />
          ) : null}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SetDetail;
