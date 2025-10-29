import React from 'react';
import type { Listing } from '../types';
import type { ChatDetails } from '../App';
import ListingCard from '../components/ListingCard';
import { ALL_MOCK_LISTINGS } from '../mockData';

interface WishlistScreenProps {
  wishlist: number[];
  onToggleWishlist: (id: number) => void;
  onStartChat: (details: ChatDetails) => void;
  onBack: () => void;
}

const WishlistScreen: React.FC<WishlistScreenProps> = ({ wishlist, onToggleWishlist, onStartChat, onBack }) => {
  const wishlistedItems = ALL_MOCK_LISTINGS.filter(listing => wishlist.includes(listing.id));

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center p-3 border-b border-gray-200 bg-surface dark:bg-gray-800">
        <button onClick={onBack} className="p-2 text-text-secondary dark:text-gray-300 hover:text-primary dark:hover:text-primary">
          <span className="material-icons-outlined">arrow_back</span>
        </button>
        <h1 className="font-poppins text-xl text-text-primary dark:text-gray-100 ml-4">My Wishlist</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {wishlistedItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {wishlistedItems.map(listing => (
              <ListingCard
                key={listing.id}
                listing={listing}
                onStartChat={onStartChat}
                isInWishlist={true} // It's in the wishlist by definition
                onToggleWishlist={onToggleWishlist}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center text-text-secondary dark:text-gray-400">
            <span className="material-icons-outlined text-6xl mb-4">favorite_border</span>
            <h2 className="font-poppins text-xl text-text-primary dark:text-gray-200">Your Wishlist is Empty</h2>
            <p className="mt-2 max-w-xs">Tap the heart icon on any listing to save it here for later.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistScreen;
