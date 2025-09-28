
import React, { useState } from 'react';
import type { Listing } from '../types';
import type { ChatDetails } from '../App';

interface ListingCardProps {
  listing: Listing;
  onStartChat: (details: ChatDetails) => void;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing, onStartChat }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <div className="bg-surface rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img src={listing.image} alt={listing.title} className="w-full h-40 object-cover" />
        <button 
          onClick={() => setIsFavorited(!isFavorited)}
          className="absolute top-2 right-2 bg-white/70 backdrop-blur-sm p-2 rounded-full text-gray-700 hover:text-red-500 transition-colors"
          aria-label="Favorite listing"
        >
          <span className={`material-icons-outlined ${isFavorited ? 'text-red-500' : ''}`}>
            {isFavorited ? 'favorite' : 'favorite_border'}
          </span>
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-poppins text-lg text-text-primary truncate">{listing.title}</h3>
        <p className="text-sm text-text-secondary mt-1">{listing.location}</p>
        <div className="flex justify-between items-center mt-3">
          <p className="font-semibold text-primary text-lg">
            {listing.price} <span className="text-xs font-normal text-text-secondary">{listing.type === 'land' ? '/ season' : ''}</span>
          </p>
          <div className="flex items-center space-x-2">
            {listing.size && <p className="text-sm text-text-secondary">{listing.size}</p>}
            <button 
              onClick={() => onStartChat({ userName: listing.seller, userPhoto: listing.sellerPhoto, listingTitle: listing.title })}
              className="p-2 bg-primary/10 rounded-full text-primary hover:bg-primary/20 transition-colors"
              aria-label={`Start chat with ${listing.seller}`}
            >
              <span className="material-icons-outlined text-xl">chat</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
