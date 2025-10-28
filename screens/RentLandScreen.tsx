import React, { useState, useEffect, useRef, useMemo } from 'react';
import ListingCard from '../components/ListingCard';
import type { Listing } from '../types';
import type { ChatDetails } from '../App';

const mockLand: Listing[] = [
  { id: 1, type: 'land', title: 'Fertile Land in Mbarara', price: 'UGX 500,000', location: 'Mbarara, Kashari', image: 'https://picsum.photos/seed/land1/400/300', size: '2 Acres', seller: 'John K.', sellerPhoto: 'https://picsum.photos/seed/seller1/100', soilType: 'Loam', landUse: 'Arable', waterSource: true },
  { id: 2, type: 'land', title: 'Lakeside Plot', price: 'UGX 1,200,000', location: 'Wakiso, Entebbe', image: 'https://picsum.photos/seed/land2/400/300', size: '5 Acres', seller: 'Peter A.', sellerPhoto: 'https://picsum.photos/seed/seller3/100', soilType: 'Sandy', landUse: 'Commercial', waterSource: true },
  { id: 3, type: 'land', title: 'Rich Loam Soil', price: 'UGX 800,000', location: 'Mbale, Budadiri', image: 'https://picsum.photos/seed/land3/400/300', size: '3 Acres', seller: 'Mbale Farmers Coop', sellerPhoto: 'https://picsum.photos/seed/seller6/100', soilType: 'Loam', landUse: 'Arable', waterSource: false },
  { id: 4, type: 'land', title: 'Gulu Farmland', price: 'UGX 400,000', location: 'Gulu', image: 'https://picsum.photos/seed/land4/400/300', size: '10 Acres', seller: 'David O.', sellerPhoto: 'https://picsum.photos/seed/seller9/100', soilType: 'Black Cotton', landUse: 'Grazing', waterSource: false },
];

const FilterDropdown: React.FC<{
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  icon?: string;
}> = ({ label, options, value, onChange, icon = 'expand_more' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (option: string) => {
    onChange(option === value ? '' : option); // Allow deselecting
    setIsOpen(false);
  };

  const isActive = !!value;

  return (
    <div className="relative flex-shrink-0" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-1 px-3 py-2 border rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
          isActive
            ? 'bg-primary/10 border-primary text-primary'
            : 'bg-surface border-gray-300 text-text-primary'
        }`}
      >
        <span>{value || label}</span>
        <span className="material-icons-outlined text-base">{icon}</span>
      </button>
      {isOpen && (
        <div className="absolute top-full mt-2 w-48 bg-surface rounded-lg shadow-lg z-20 border py-1">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                option === value ? 'bg-primary/10 text-primary font-semibold' : 'hover:bg-gray-100'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};


interface RentLandScreenProps {
  onStartChat: (details: ChatDetails) => void;
}

const RentLandScreen: React.FC<RentLandScreenProps> = ({ onStartChat }) => {
  const [filters, setFilters] = useState({
    location: '',
    price: '',
    size: '',
    soilType: '',
    landUse: '',
    waterSource: '',
  });

  const handleFilterChange = (filterName: keyof typeof filters, value: string) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  const filteredLand = useMemo(() => {
    return mockLand.filter(land => {
      if (filters.soilType && land.soilType !== filters.soilType) return false;
      if (filters.landUse && land.landUse !== filters.landUse) return false;
      if (filters.waterSource) {
        const waterSourceBool = filters.waterSource === 'Yes';
        if (land.waterSource !== waterSourceBool) return false;
      }
      // Note: Filtering for location, price, and size is not implemented as per focus on new features.
      return true;
    });
  }, [filters]);
  
  const clearFilters = () => {
    setFilters({
        location: '', price: '', size: '', soilType: '', landUse: '', waterSource: '',
    });
  }
  
  const isAnyFilterActive = Object.values(filters).some(v => v !== '');

  return (
    <div className="bg-background min-h-full">
      <div className="sticky top-0 bg-background/80 backdrop-blur-sm z-10 p-4 border-b border-gray-200">
        <h1 className="font-poppins text-2xl text-text-primary">Rent Land</h1>
        <div className="flex items-center space-x-2 overflow-x-auto mt-3 pb-2">
            <FilterDropdown label="Land Use" options={['Arable', 'Grazing', 'Commercial', 'Mixed-use']} value={filters.landUse} onChange={(v) => handleFilterChange('landUse', v)} />
            <FilterDropdown label="Water Source" options={['Yes', 'No']} value={filters.waterSource} onChange={(v) => handleFilterChange('waterSource', v)} />
            <FilterDropdown label="Soil Type" options={['Loam', 'Clay', 'Sandy', 'Black Cotton']} value={filters.soilType} onChange={(v) => handleFilterChange('soilType', v)} />
            <FilterDropdown label="Location" options={['Mbarara', 'Wakiso', 'Mbale', 'Gulu']} value={filters.location} onChange={(v) => handleFilterChange('location', v)} />
            <FilterDropdown label="Price" options={['< 500k', '500k - 1M', '> 1M']} value={filters.price} onChange={(v) => handleFilterChange('price', v)} icon="tune" />
            <FilterDropdown label="Size" options={['1-5 Acres', '6-10 Acres', '> 10 Acres']} value={filters.size} onChange={(v) => handleFilterChange('size', v)} icon="tune" />
            {isAnyFilterActive && <button onClick={clearFilters} className="text-sm text-red-500 font-semibold flex-shrink-0">Clear</button>}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {filteredLand.length > 0 ? (
          filteredLand.map(listing => <ListingCard key={listing.id} listing={listing} onStartChat={onStartChat} />)
        ) : (
          <div className="col-span-1 md:col-span-2 text-center py-10">
            <span className="material-icons-outlined text-5xl text-gray-400 mb-2">search_off</span>
            <p className="text-text-secondary font-semibold">No matching land found.</p>
            <p className="text-sm text-text-secondary">Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RentLandScreen;