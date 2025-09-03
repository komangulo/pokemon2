import { ArrowRight, BarChart, Search, DollarSign, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Features = () => {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Feature 1 */}
        <div className="mb-24">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-12">
              <div className="animate-slide-right animate-once">
                <h2 className="text-3xl font-bold mb-4 text-gray-900">
                  Rare & Valuable <span className="text-brand-blue">Pokemon Cards</span> for Collectors
                </h2>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Discover First Edition, Shadowless, and Holo Rarities
                </h3>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Find the Rarest Pokemon Cards in the Market</h3>
                <p className="text-gray-700 mb-6">
                  Discover first edition Charizards, shadowless holos, and other rare Pokemon cards that serious collectors are searching for. Our marketplace connects you with the most sought-after Pokemon TCG cards in the world.
                </p>
                <Button asChild className="button-primary">
                  <Link to="/set-search">
                    Browse Pokémon Sets <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src="https://i.ibb.co/JWhqNtcc/429bb593eb5be08b26ee299a2bff5c9e-removebg-preview.png" 
                  alt="Pokemon card collection" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="mb-24">
          <div className="flex flex-col md:flex-row-reverse items-center">
            <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pl-12">
              <div className="animate-slide-left animate-once">
                <h2 className="text-3xl font-bold mb-4 text-gray-900">
                  How to Sell Your <span className="text-brand-blue">Pokemon Cards</span> for Maximum Value
                </h2>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Get Top Dollar for Your Pokemon Card Collection</h3>
                <p className="text-gray-700 mb-6">
                  Our experts know how to properly grade, photograph, and list your Pokemon cards to attract serious collectors. We handle everything from authentication to secure shipping, ensuring you get the best possible price for your valuable Pokemon TCG collection.
                </p>
                <Button asChild className="button-primary">
                  <Link to="/sell">
                    Get Your Free Pokemon Card Valuation <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="w-full md:w-1/2 animate-slide-right animate-once">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src="https://cdn11.bigcommerce.com/s-chpconbphw/images/stencil/original/products/117/573/PSA_TCG_Bulk_Visual__58481.1730196690.png" 
                  alt="PSA graded Pokemon cards" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Features List */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="section-title">Complete <span className="text-brand-blue">Pokemon Card</span> Services</h2>
            <h3 className="section-subtitle">
              Everything You Need to Buy, Sell, and Trade Pokemon TCG Cards
            </h3>
            <h4 className="text-lg font-medium text-gray-600 mt-4">
              From Grading to Selling - We Handle It All for Pokemon TCG Enthusiasts
            </h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature Item 1 */}
            <div className="text-center p-6 animate-slide-up animate-once animate-delay-100">
              <div className="rounded-full bg-blue-100 p-4 inline-flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-brand-blue" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Professional Pokemon Card Grading</h3>
              <h4 className="text-md font-medium text-gray-700 mb-2">PSA & BGS Authentication</h4>
              <p className="text-gray-600">Professional authentication and grading of your Pokemon cards to maximize their value and appeal to collectors.</p>
            </div>
            
            {/* Feature Item 2 */}
            <div className="text-center p-6 animate-slide-up animate-once animate-delay-200">
              <div className="rounded-full bg-blue-100 p-4 inline-flex items-center justify-center mb-4">
                <BarChart className="h-6 w-6 text-brand-blue" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Pokemon Card Market Analysis</h3>
              <h4 className="text-md font-medium text-gray-700 mb-2">Real-time Price Tracking</h4>
              <p className="text-gray-600">Real-time market data and price history for all Pokemon TCG cards to help you make informed buying and selling decisions.</p>
            </div>
            
            {/* Feature Item 3 */}
            <div className="text-center p-6 animate-slide-up animate-once animate-delay-300">
              <div className="rounded-full bg-blue-100 p-4 inline-flex items-center justify-center mb-4">
                <DollarSign className="h-6 w-6 text-brand-blue" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure Pokemon Card Marketplace</h3>
              <h4 className="text-md font-medium text-gray-700 mb-2">Protected Buying & Selling</h4>
              <p className="text-gray-600">Safe and secure payment processing for all Pokemon TCG transactions with buyer and seller protection.</p>
            </div>
            
            {/* Feature Item 4 */}
            <div className="text-center p-6 animate-slide-up animate-once animate-delay-400">
              <div className="rounded-full bg-blue-100 p-4 inline-flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-brand-blue" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Expert Pokemon Card Authentication</h3>
              <h4 className="text-md font-medium text-gray-700 mb-2">Genuine TCG Verification</h4>
              <p className="text-gray-600">Expert verification of Pokemon card authenticity to protect against counterfeits and ensure quality.</p>
            </div>
          </div>
        </div>

        {/* Process Steps */}
        <div className="mb-24">
          <h2 className="section-title text-center">How to <span className="text-brand-blue">Sell Pokemon Cards</span> for Maximum Value</h2>
          <h3 className="section-subtitle text-center mb-4">
            Our Simple 4-Step Process to Get the Best Price for Your Pokemon TCG Collection
          </h3>
          <h4 className="text-lg text-gray-600 text-center mb-12">
            From Submission to Payment - We Make Selling Pokemon Cards Simple & Profitable
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {/* Step 1 */}
            <div className="relative">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-blue text-white font-bold text-lg mb-4">1</div>
                <h3 className="text-lg font-semibold mb-2">1. Submit Your Pokemon Cards</h3>
                <h4 className="text-md font-medium text-gray-700 mb-2">Free Evaluation & Quote</h4>
                <p className="text-gray-600">Send us your Pokemon cards using our secure shipping service or visit our location for in-person evaluation.</p>
              </div>
              <div className="absolute top-6 left-full w-full h-0.5 bg-gray-300 hidden lg:block" style={{ width: 'calc(100% - 3rem)' }}></div>
            </div>
            
            {/* Step 2 */}
            <div className="relative">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-blue text-white font-bold text-lg mb-4">2</div>
                <h3 className="text-lg font-semibold mb-2">2. Professional Grading & Pricing</h3>
                <h4 className="text-md font-medium text-gray-700 mb-2">Expert Card Assessment</h4>
                <p className="text-gray-600">Our Pokemon TCG experts evaluate, grade, and price your cards based on current market values.</p>
              </div>
              <div className="absolute top-6 left-full w-full h-0.5 bg-gray-300 hidden lg:block" style={{ width: 'calc(100% - 3rem)' }}></div>
            </div>
            
            {/* Step 3 */}
            <div className="relative">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-blue text-white font-bold text-lg mb-4">3</div>
                <h3 className="text-lg font-semibold mb-2">3. We Handle the Sale</h3>
                <h4 className="text-md font-medium text-gray-700 mb-2">Marketing & Secure Transactions</h4>
                <p className="text-gray-600">We list your Pokemon cards on our high-traffic marketplace and manage all buyer inquiries and negotiations.</p>
              </div>
              <div className="absolute top-6 left-full w-full h-0.5 bg-gray-300 hidden lg:block" style={{ width: 'calc(100% - 3rem)' }}></div>
            </div>
            
            {/* Step 4 */}
            <div className="relative">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-blue text-white font-bold text-lg mb-4">4</div>
                <h3 className="text-lg font-semibold mb-2">4. Get Paid Securely</h3>
                <h4 className="text-md font-medium text-gray-700 mb-2">Fast & Reliable Payments</h4>
                <p className="text-gray-600">Choose from multiple payment options and get paid as soon as your Pokemon cards sell, with no hidden fees.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pokemon Card Categories */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="section-title">Explore <span className="text-brand-blue">Pokemon Card</span> Categories</h2>
            <h3 className="section-subtitle">
              Find the Perfect Pokemon Cards for Your Collection
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Category 1 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Vintage Pokemon Cards</h3>
                <h4 className="text-md font-semibold text-brand-blue mb-2">Base Set, Jungle, Fossil & More</h4>
                <p className="text-gray-600 mb-4">Discover rare first edition and shadowless cards from the original Wizards of the Coast sets that started it all.</p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Base Set 1st Edition</li>
                  <li>• Shadowless Variants</li>
                  <li>• Legendary Collection</li>
                  <li>• Team Rocket & Gym Heroes</li>
                </ul>
              </div>
            </div>

            {/* Category 2 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Modern Pokemon TCG</h3>
                <h4 className="text-md font-semibold text-brand-blue mb-2">Sword & Shield, Evolving Skies & More</h4>
                <p className="text-gray-600 mb-4">Latest releases and sought-after cards from recent expansions with stunning artwork and powerful gameplay.</p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Alt Art Cards</li>
                  <li>• Rainbow Rare & Gold Cards</li>
                  <li>• VMAX & VSTAR Ultra Rares</li>
                  <li>• Special Illustration Rares</li>
                </ul>
              </div>
            </div>

            {/* Category 3 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Graded Pokemon Cards</h3>
                <h4 className="text-md font-semibold text-brand-blue mb-2">PSA, BGS & CGC Certified</h4>
                <p className="text-gray-600 mb-4">Professionally graded and authenticated cards with guaranteed condition and value protection.</p>
                <ul className="space-y-2 text-gray-600">
                  <li>• PSA 10 Gem Mint</li>
                  <li>• BGS Black Label 10</li>
                  <li>• CGC Pristine 10</li>
                  <li>• Population Reports</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Pokemon Card Rarity Guide */}
        <div className="mb-24 bg-gray-50 py-16 px-4 rounded-2xl">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="section-title">Pokemon Card <span className="text-brand-blue">Rarity Guide</span></h2>
              <h3 className="section-subtitle">
                Understanding Pokemon Card Rarities and Their Value
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Rarity Types */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Card Rarity Types</h3>
                
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h4 className="text-lg font-semibold text-brand-blue mb-2">Common (C)</h4>
                    <p className="text-gray-600">Basic Pokemon and Trainer cards found in most booster packs. Identified by a black circle symbol.</p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h4 className="text-lg font-semibold text-brand-blue mb-2">Uncommon (U)</h4>
                    <p className="text-gray-600">Slightly rarer than commons, featuring a black diamond symbol. Often include useful Trainer cards.</p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h4 className="text-lg font-semibold text-brand-blue mb-2">Rare (R)</h4>
                    <p className="text-gray-600">Feature a black star symbol. Include powerful Pokemon and special Trainer cards. One guaranteed per pack.</p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h4 className="text-lg font-semibold text-brand-blue mb-2">Holo Rare (Holo)</h4>
                    <p className="text-gray-600">Rare cards with holographic artwork. More valuable than standard rares and highly collectible.</p>
                  </div>
                </div>
              </div>
              
              {/* Special Rarities */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Special Rarities</h3>
                
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h4 className="text-lg font-semibold text-brand-blue mb-2">Ultra Rare (UR)</h4>
                    <p className="text-gray-600">Includes EX, GX, V, and VMAX cards with unique artwork and powerful abilities. Highly sought after by collectors.</p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h4 className="text-lg font-semibold text-brand-blue mb-2">Secret Rare (SR)</h4>
                    <p className="text-gray-600">Extremely rare cards with set numbers beyond the printed set size. Often feature gold lettering or special textures.</p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h4 className="text-lg font-semibold text-brand-blue mb-2">Rainbow Rare</h4>
                    <p className="text-gray-600">Ultra-rare cards with rainbow holographic artwork. Among the most valuable modern Pokemon cards.</p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h4 className="text-lg font-semibold text-brand-blue mb-2">Alternate Art (AA)</h4>
                    <p className="text-gray-600">Feature unique artwork different from the standard versions. Highly collectible and often valuable.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Button asChild variant="outline" className="border-brand-blue text-brand-blue hover:bg-brand-blue/10">
                <Link to="/rarity-guide">
                  View Complete Rarity Guide <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mb-24">
          <h2 className="section-title text-center">Ready to <span className="text-brand-blue">Sell Your Pokemon Cards</span>?</h2>
          <h3 className="section-subtitle text-center">
            Get the Best Prices with Our 15% Flat Commission - No Hidden Fees
          </h3>
          
          <div className="flex justify-center mt-8">
            <Button asChild className="button-primary text-lg px-8 py-6">
              <Link to="/signup">
                Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
