import React, { useState, useEffect } from 'react';
import SectionHeader from '../components/SectionHeader';
import ListingCard from '../components/ListingCard';
import WeatherCard, { WeatherCardSkeleton } from '../components/WeatherCard';
import { getWeatherForDistrict } from '../services/weatherService';
import type { Listing, WeatherData } from '../types';
import type { Tab, ChatDetails } from '../App';
import { mockFeaturedListings } from '../mockData';

const QuickActionButton: React.FC<{ icon: string; label: string; onClick: () => void }> = ({ icon, label, onClick }) => (
    <button onClick={onClick} className="flex flex-col items-center space-y-2 flex-shrink-0 w-24">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="material-icons-outlined text-primary text-3xl">{icon}</span>
        </div>
        <p className="text-sm font-semibold text-text-primary text-center">{label}</p>
    </button>
);


interface HomeScreenProps {
  profile: { name: string; photo: string; district: string; };
  onNavigate: (tab: Tab) => void;
  onStartChat: (details: ChatDetails) => void;
  wishlist: number[];
  onToggleWishlist: (id: number) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ profile, onNavigate, onStartChat, wishlist, onToggleWishlist }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState(true);

  useEffect(() => {
    if (profile.district) {
      setIsLoadingWeather(true);
      getWeatherForDistrict(profile.district)
        .then(data => setWeather(data))
        .catch(console.error)
        .finally(() => setIsLoadingWeather(false));
    } else {
      setIsLoadingWeather(false);
    }
  }, [profile.district]);

  return (
    <div className="bg-background min-h-full">
      <div className="p-4">
        <h1 className="font-open-sans text-xl text-text-secondary">Hello,</h1>
        <p className="font-poppins text-2xl text-text-primary">{profile.name.split(' ')[0]}</p>
        <div className="relative mt-4">
          <input type="text" placeholder="Search for land or produce..." className="w-full pl-10 pr-4 py-3 rounded-full bg-surface border border-gray-200 focus:ring-primary focus:border-primary" />
          <span className="material-icons-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">search</span>
        </div>
      </div>

      {isLoadingWeather ? <WeatherCardSkeleton /> : weather && <WeatherCard weatherData={weather} />}

      <div className="py-4">
        <div className="flex space-x-4 px-4 overflow-x-auto pb-4">
            <QuickActionButton icon="landscape" label="Rent Land" onClick={() => onNavigate('Rent Land')} />
            <QuickActionButton icon="shopping_basket" label="Sell Produce" onClick={() => onNavigate('Marketplace')} />
            <QuickActionButton icon="psychology" label="Ask AI" onClick={() => onNavigate('AI Guide')} />
        </div>
      </div>
      
      <div>
        <SectionHeader title="Featured Listings" onViewAll={() => onNavigate('Marketplace')} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          {mockFeaturedListings.map(listing => <ListingCard key={listing.id} listing={listing} onStartChat={onStartChat} 
            isInWishlist={wishlist.includes(listing.id)}
            onToggleWishlist={onToggleWishlist}
          />)}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;