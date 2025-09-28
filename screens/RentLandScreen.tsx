
import React from 'react';
import ListingCard from '../components/ListingCard';
import type { Listing } from '../types';
import type { ChatDetails } from '../App';

const mockLand: Listing[] = [
  { id: 1, type: 'land', title: 'Fertile Land in Mbarara', price: 'UGX 500,000', location: 'Mbarara, Kashari', image: 'https://picsum.photos/seed/land1/400/300', size: '2 Acres', seller: 'John K.', sellerPhoto: 'https://picsum.photos/seed/seller1/100' },
  { id: 2, type: 'land', title: 'Lakeside Plot', price: 'UGX 1,200,000', location: 'Wakiso, Entebbe', image: 'https://picsum.photos/seed/land2/400/300', size: '5 Acres', seller: 'Peter A.', sellerPhoto: 'https://picsum.photos/seed/seller3/100' },
  { id: 3, type: 'land', title: 'Rich Loam Soil', price: 'UGX 800,000', location: 'Mbale, Budadiri', image: 'https://picsum.photos/seed/land3/400/300', size: '3 Acres', seller: 'Mbale Farmers Coop', sellerPhoto: 'https://picsum.photos/seed/seller6/100' },
  { id: 4, type: 'land', title: 'Gulu Farmland', price: 'UGX 400,000', location: 'Gulu', image: 'https://picsum.photos/seed/land4/400/300', size: '10 Acres', seller: 'David O.', sellerPhoto: 'https://picsum.photos/seed/seller9/100' },
];

const FilterButton: React.FC<{ label: string, icon: string }> = ({ label, icon }) => (
    <button className="flex items-center space-x-1 px-3 py-2 bg-surface border border-gray-300 rounded-full text-sm font-semibold text-text-primary whitespace-nowrap">
      <span>{label}</span>
      <span className="material-icons-outlined text-base">{icon}</span>
    </button>
  );

interface RentLandScreenProps {
  onStartChat: (details: ChatDetails) => void;
}

const RentLandScreen: React.FC<RentLandScreenProps> = ({ onStartChat }) => {
  return (
    <div className="bg-background min-h-full">
      <div className="sticky top-0 bg-background/80 backdrop-blur-sm z-10 p-4 border-b border-gray-200">
        <h1 className="font-poppins text-2xl text-text-primary">Rent Land</h1>
        <div className="flex space-x-2 overflow-x-auto mt-3 pb-2">
            <FilterButton label="Location" icon="expand_more" />
            <FilterButton label="Price" icon="tune" />
            <FilterButton label="Size" icon="tune" />
            <FilterButton label="Soil Type" icon="expand_more" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {mockLand.map(listing => <ListingCard key={listing.id} listing={listing} onStartChat={onStartChat} />)}
      </div>
    </div>
  );
};

export default RentLandScreen;
