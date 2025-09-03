
import Navbar from '@/components/Navbar';
import SetGrid from '@/components/SetGrid';
import Footer from '@/components/Footer';

const SetSearch = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-24">
        <SetGrid />
      </main>
      <Footer />
    </div>
  );
};

export default SetSearch;
