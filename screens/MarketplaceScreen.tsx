
import React from 'react';
import ListingCard from '../components/ListingCard';
import type { Listing } from '../types';
import type { ChatDetails } from '../App';

const mockProducts: Listing[] = [
  { id: 1, type: 'product', title: 'Organic Maize', price: 'UGX 1,500 / Kg', location: 'Jinja', image: 'https://picsum.photos/seed/prod1/400/300', seller: 'Maria N.', sellerPhoto: 'https://picsum.photos/seed/seller2/100' },
  { id: 2, type: 'product', title: 'Fresh Matooke', price: 'UGX 20,000 / bunch', location: 'Masaka', image: 'https://picsum.photos/seed/prod2/400/300', seller: 'Aisha K.', sellerPhoto: 'https://picsum.photos/seed/seller4/100' },
  { id: 3, type: 'product', title: 'NPK Fertilizer', price: 'UGX 150,000 / bag', location: 'Kampala', image: 'https://picsum.photos/seed/prod3/400/300', seller: 'Agro Supplies Ltd', sellerPhoto: 'https://picsum.photos/seed/seller5/100' },
  { id: 4, type: 'product', title: 'High-Yield Beans Seeds', price: 'UGX 5,000 / Kg', location: 'Mbale', image: 'https://picsum.photos/seed/prod4/400/300', seller: 'Mbale Farmers Coop', sellerPhoto: 'https://picsum.photos/seed/seller6/100' },
  { id: 5, type: 'product', title: 'Walking Tractor', price: 'UGX 3,500,000', location: 'Arua', image: 'https://picsum.photos/seed/prod5/400/300', seller: 'Mechanics Inc.', sellerPhoto: 'https://picsum.photos/seed/seller7/100' },
  { id: 6, type: 'product', title: 'Irish Potatoes', price: 'UGX 2,000 / Kg', location: 'Kabale', image: 'https://picsum.photos/seed/prod6/400/300', seller: 'Sarah T.', sellerPhoto: 'https://picsum.photos/seed/seller8/100' },
];

const FilterButton: React.FC<{ label: string }> = ({ label }) => (
  <button className="px-4 py-2 bg-surface border border-gray-300 rounded-full text-sm font-semibold text-text-primary whitespace-nowrap">
    {label}
  </button>
);

interface MarketplaceScreenProps {
  onStartChat: (details: ChatDetails) => void;
}

const MarketplaceScreen: React.FC<MarketplaceScreenProps> = ({ onStartChat }) => {
  return (
    <div className="relative min-h-full bg-background">
      <div className="sticky top-0 bg-background/80 backdrop-blur-sm z-10 p-4 border-b border-gray-200">
        <h1 className="font-poppins text-2xl text-text-primary">Marketplace</h1>
        <div className="flex space-x-2 overflow-x-auto mt-3 pb-2">
          <FilterButton label="Produce" />
          <FilterButton label="Seeds" />
          <FilterButton label="Fertilizer" />
          <FilterButton label="Machinery" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {mockProducts.map(listing => <ListingCard key={listing.id} listing={listing} onStartChat={onStartChat} />)}
      </div>
       <button className="fixed bottom-20 right-5 bg-secondary text-text-primary p-4 rounded-full shadow-lg hover:scale-105 transition-transform">
        <span className="material-icons-outlined">add</span>
      </button>
    </div>
  );
};

export default MarketplaceScreen;
