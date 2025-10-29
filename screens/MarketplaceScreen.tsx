import React from 'react';
import ListingCard from '../components/ListingCard';
import type { Listing } from '../types';
import type { ChatDetails } from '../App';
import { mockProductListings } from '../mockData';

const FilterButton: React.FC<{ label: string }> = ({ label }) => (
  <button className="px-4 py-2 bg-surface border border-gray-300 rounded-full text-sm font-semibold text-text-primary whitespace-nowrap">
    {label}
  </button>
);

interface MarketplaceScreenProps {
  onStartChat: (details: ChatDetails) => void;
  wishlist: number[];
  onToggleWishlist: (id: number) => void;
}

const MarketplaceScreen: React.FC<MarketplaceScreenProps> = ({ onStartChat, wishlist, onToggleWishlist }) => {
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
        {mockProductListings.map(listing => <ListingCard 
            key={listing.id} 
            listing={listing} 
            onStartChat={onStartChat}
            isInWishlist={wishlist.includes(listing.id)}
            onToggleWishlist={onToggleWishlist}
        />)}
      </div>
       <button className="fixed bottom-20 right-5 bg-secondary text-text-primary p-4 rounded-full shadow-lg hover:scale-105 transition-transform">
        <span className="material-icons-outlined">add</span>
      </button>
    </div>
  );
};

export default MarketplaceScreen;