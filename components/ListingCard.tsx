import React, { useState } from 'react';
import type { Listing } from '../types';
import type { ChatDetails } from '../App';

interface ListingCardProps {
  listing: Listing;
  onStartChat: (details: ChatDetails) => void;
  suitabilityScore?: number;
  suitabilityReason?: string;
}

const getSuitabilityColor = (score: number) => {
    if (score >= 80) return 'bg-green-600';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
};

const ListingCard: React.FC<ListingCardProps> = ({ listing, onStartChat, suitabilityScore, suitabilityReason }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <div className="bg-surface dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl dark:hover:shadow-primary/20 transition-shadow duration-300">
      <div className="relative">
        <img src={listing.image} alt={listing.title} className="w-full h-40 object-cover" />
        <button 
          onClick={() => setIsFavorited(!isFavorited)}
          className="absolute top-2 right-2 bg-white/70 dark:bg-gray-900/60 backdrop-blur-sm p-2 rounded-full text-gray-700 dark:text-gray-300 hover:text-red-500 transition-colors"
          aria-label="Favorite listing"
        >
          <span className={`material-icons-outlined ${isFavorited ? 'text-red-500' : ''}`}>
            {isFavorited ? 'favorite' : 'favorite_border'}
          </span>
        </button>
        {typeof suitabilityScore === 'number' && (
            <div className={`absolute top-2 left-2 text-white text-xs font-bold px-2.5 py-1.5 rounded-full shadow-lg ${getSuitabilityColor(suitabilityScore)}`}>
                {suitabilityScore}% Match
            </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-poppins text-lg text-text-primary dark:text-gray-100 truncate">{listing.title}</h3>
        <p className="text-sm text-text-secondary dark:text-gray-400 mt-1">{listing.location}</p>
        
        {suitabilityReason && (
            <div className="mt-3 p-2 bg-primary/5 dark:bg-primary/10 rounded-md">
                <p className="text-xs text-text-secondary dark:text-gray-300">
                    <span className="font-bold text-primary/80 dark:text-primary/90">AI Note:</span> {suitabilityReason}
                </p>
            </div>
        )}

        <div className="flex justify-between items-center mt-3">
          <p className="font-semibold text-primary text-lg">
            {listing.price} <span className="text-xs font-normal text-text-secondary dark:text-gray-400">{listing.type === 'land' ? '/ season' : ''}</span>
          </p>
          <div className="flex items-center space-x-2">
            {listing.size && <p className="text-sm text-text-secondary dark:text-gray-400">{listing.size}</p>}
            <button 
              onClick={() => onStartChat({ userName: listing.seller, userPhoto: listing.sellerPhoto, listingTitle: listing.title })}
              className="px-3 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold hover:bg-primary/20 transition-colors"
              aria-label={`Chat with ${listing.seller}`}
            >
              Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;