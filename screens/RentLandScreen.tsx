import React, { useState, useEffect, useRef, useMemo } from 'react';
import ListingCard from '../components/ListingCard';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { getLandSuitabilityAnalysis, SuitabilityAnalysisResult } from '../services/geminiService';
import type { Listing } from '../types';
import type { ChatDetails } from '../App';

const mockLand: Listing[] = [
  { id: 1, type: 'land', title: 'Fertile Land in Mbarara', price: 'UGX 500,000', location: 'Mbarara, Kashari', image: 'https://picsum.photos/seed/land1/400/300', size: '2 Acres', seller: 'John K.', sellerPhoto: 'https://picsum.photos/seed/seller1/100', soilType: 'Loam', landUse: 'Arable', waterSource: true, lat: -0.6050, lng: 30.6552, aiTips: ['Intercropping', 'Drought-resistant crops'] },
  { id: 2, type: 'land', title: 'Lakeside Plot', price: 'UGX 1,200,000', location: 'Wakiso, Entebbe', image: 'https://picsum.photos/seed/land2/400/300', size: '5 Acres', seller: 'Peter A.', sellerPhoto: 'https://picsum.photos/seed/seller3/100', soilType: 'Sandy', landUse: 'Commercial', waterSource: true, lat: 0.0566, lng: 32.4627, aiTips: ['Organic farming'] },
  { id: 3, type: 'land', title: 'Rich Loam Soil', price: 'UGX 800,000', location: 'Mbale, Budadiri', image: 'https://picsum.photos/seed/land3/400/300', size: '3 Acres', seller: 'Mbale Farmers Coop', sellerPhoto: 'https://picsum.photos/seed/seller6/100', soilType: 'Loam', landUse: 'Arable', waterSource: false, lat: 1.0821, lng: 34.1759, aiTips: ['Organic farming', 'Zero tillage'] },
  { id: 4, type: 'land', title: 'Gulu Farmland', price: 'UGX 400,000', location: 'Gulu', image: 'https://picsum.photos/seed/land4/400/300', size: '10 Acres', seller: 'David O.', sellerPhoto: 'https://picsum.photos/seed/seller9/100', soilType: 'Black Cotton', landUse: 'Grazing', waterSource: false, lat: 2.7725, lng: 32.2884, aiTips: ['Drought-resistant crops'] },
];

interface DisplayListing extends Listing {
    suitabilityScore?: number;
    suitabilityReason?: string;
}

interface MapPopupCardProps {
  listing: DisplayListing;
  onStartChat: (details: ChatDetails) => void;
}

const MapPopupCard: React.FC<MapPopupCardProps> = ({ listing, onStartChat }) => {
  return (
    <div className="w-60">
      <img src={listing.image} alt={listing.title} className="w-full h-24 object-cover rounded-t-lg" />
      <div className="p-2">
        <h3 className="font-poppins text-sm font-semibold text-text-primary dark:text-gray-100 truncate">{listing.title}</h3>
        {typeof listing.suitabilityScore === 'number' && (
            <div className="font-bold text-xs mt-1 text-green-700 dark:text-green-400">
                {listing.suitabilityScore}% Match: <span className="font-normal text-text-secondary dark:text-gray-400">{listing.suitabilityReason}</span>
            </div>
        )}
        <div className="flex justify-between items-center text-xs text-text-secondary dark:text-gray-400 mt-0.5">
            <span>{listing.location}</span>
            {listing.size && <span className="font-semibold">{listing.size}</span>}
        </div>
        <div className="flex justify-between items-center mt-2">
            <p className="font-semibold text-primary text-sm">
              {listing.price} <span className="text-xs font-normal text-text-secondary dark:text-gray-400">/ season</span>
            </p>
            <button
                onClick={() => onStartChat({ userName: listing.seller, userPhoto: listing.sellerPhoto, listingTitle: listing.title })}
                className="flex items-center space-x-1 px-2 py-1 bg-primary text-white rounded-md text-xs font-semibold hover:bg-green-700 transition-colors"
                aria-label={`Chat with ${listing.seller}`}
            >
                <span className="material-icons-outlined text-sm">chat</span>
                <span>Chat</span>
            </button>
        </div>
      </div>
    </div>
  );
};


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
            : 'bg-surface dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-text-primary dark:text-gray-200'
        }`}
      >
        <span>{value || label}</span>
        <span className="material-icons-outlined text-base">{icon}</span>
      </button>
      {isOpen && (
        <div className="absolute top-full mt-2 w-48 bg-surface dark:bg-gray-800 rounded-lg shadow-lg z-20 border dark:border-gray-700 py-1">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className={`block w-full text-left px-4 py-2 text-sm transition-colors text-text-primary dark:text-gray-200 ${
                option === value ? 'bg-primary/10 text-primary font-semibold' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
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

const ViewModeToggle: React.FC<{ viewMode: 'list' | 'map'; setViewMode: (mode: 'list' | 'map') => void; }> = ({ viewMode, setViewMode }) => {
  const baseClasses = "flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-900";
  const activeClasses = "bg-primary text-white shadow";
  const inactiveClasses = "bg-gray-200 dark:bg-gray-700 text-text-secondary dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600";

  return (
    <div className="bg-gray-200 dark:bg-gray-700 p-1 rounded-full flex items-center">
      <button onClick={() => setViewMode('list')} className={`${baseClasses} ${viewMode === 'list' ? activeClasses : inactiveClasses}`}>
        <span className="material-icons-outlined text-base">view_list</span>
        <span>List</span>
      </button>
      <button onClick={() => setViewMode('map')} className={`${baseClasses} ${viewMode === 'map' ? activeClasses : inactiveClasses}`}>
        <span className="material-icons-outlined text-base">map</span>
        <span>Map</span>
      </button>
    </div>
  );
};

interface MapViewProps {
  listings: DisplayListing[];
  onStartChat: (details: ChatDetails) => void;
}

const getLandUseIconName = (landUse?: Listing['landUse']) => {
    switch(landUse) {
        case 'Arable': return 'agriculture';
        case 'Grazing': return 'grass';
        case 'Commercial': return 'storefront';
        case 'Mixed-use': return 'blender';
        default: return 'landscape';
    }
};

const getSuitabilityBorder = (score?: number) => {
    if (typeof score !== 'number') return 'border-white dark:border-gray-800';
    if (score >= 80) return 'border-green-500';
    if (score >= 60) return 'border-yellow-500';
    return 'border-red-500';
}

const getMarkerIcon = (listing: DisplayListing) => {
  const landUseColorMap: { [key: string]: string } = {
    'Arable': 'bg-green-600',
    'Grazing': 'bg-yellow-600',
    'Commercial': 'bg-blue-600',
    'Mixed-use': 'bg-purple-600',
    'default': 'bg-gray-600'
  };

  const colorClass = landUseColorMap[listing.landUse || 'default'] || landUseColorMap['default'];
  const hasAiTips = listing.aiTips && listing.aiTips.length > 0;
  const suitabilityBorder = getSuitabilityBorder(listing.suitabilityScore);

  const aiTipBadge = hasAiTips ? `
    <div class="absolute -top-1.5 -right-1.5 bg-secondary rounded-full w-5 h-5 flex items-center justify-center shadow-lg border-2 border-white dark:border-gray-800">
      <span class="material-icons-outlined text-text-primary" style="font-size: 14px;">psychology</span>
    </div>
  ` : '';

  const html = `
    <div class="relative transition-transform duration-200 hover:scale-110">
      <div class="w-8 h-8 rounded-full ${colorClass} border-4 ${suitabilityBorder} shadow-md flex items-center justify-center">
         <span class="material-icons-outlined text-white text-lg">${getLandUseIconName(listing.landUse)}</span>
      </div>
      ${aiTipBadge}
    </div>
  `;

  return L.divIcon({
    html: html,
    className: 'bg-transparent border-none',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -20]
  });
};

const MapView: React.FC<MapViewProps> = ({ listings, onStartChat }) => {
  const ugandaCenter: [number, number] = [1.3733, 32.2903];

  return (
    <div className="p-4">
      <div className="map-container-wrapper rounded-2xl overflow-hidden shadow-lg">
        <MapContainer center={ugandaCenter} zoom={7} scrollWheelZoom={true} style={{ height: '65vh', width: '100%', zIndex: 0 }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {listings.map(listing => (
            (listing.lat && listing.lng) && (
              <Marker key={listing.id} position={[listing.lat, listing.lng]} icon={getMarkerIcon(listing)}>
                <Popup minWidth={240}>
                  <MapPopupCard listing={listing} onStartChat={onStartChat} />
                </Popup>
              </Marker>
            )
          ))}
        </MapContainer>
      </div>
    </div>
  );
};


interface RentLandScreenProps {
  onStartChat: (details: ChatDetails) => void;
}

const RentLandScreen: React.FC<RentLandScreenProps> = ({ onStartChat }) => {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [aiQuery, setAiQuery] = useState('');
  const [suitabilityResults, setSuitabilityResults] = useState<SuitabilityAnalysisResult[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  const [filters, setFilters] = useState({
    soilType: '',
    landUse: '',
    waterSource: '',
    aiTip: '',
  });

  const handleFilterChange = (filterName: keyof typeof filters, value: string) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  const handleAnalyzeSuitability = async () => {
    if (!aiQuery.trim()) return;
    setIsAnalyzing(true);
    setAnalysisError(null);
    try {
      const results = await getLandSuitabilityAnalysis(aiQuery, mockLand);
      setSuitabilityResults(results);
    } catch (error) {
      console.error(error);
      setAnalysisError(error instanceof Error ? error.message : "An unknown error occurred.");
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const aiTipOptions = ['Drought-resistant crops', 'Intercropping', 'Organic farming', 'Zero tillage'];

  const displayedLand = useMemo(() => {
    let land = mockLand.filter(l => {
      if (filters.soilType && l.soilType !== filters.soilType) return false;
      if (filters.landUse && l.landUse !== filters.landUse) return false;
      if (filters.waterSource) {
        const waterSourceBool = filters.waterSource === 'Yes';
        if (l.waterSource !== waterSourceBool) return false;
      }
      if (filters.aiTip && (!l.aiTips || !l.aiTips.includes(filters.aiTip))) return false;
      return true;
    });

    if (suitabilityResults.length > 0) {
        const resultsMap = new Map(suitabilityResults.map(r => [r.id, r]));
        let enrichedLand: DisplayListing[] = land.map(l => ({
            ...l,
            suitabilityScore: resultsMap.get(l.id)?.suitabilityScore,
            suitabilityReason: resultsMap.get(l.id)?.reason,
        }));
        
        // Filter out low scores and sort by score
        return enrichedLand
          .filter(l => (l.suitabilityScore ?? 0) >= 40)
          .sort((a, b) => (b.suitabilityScore ?? 0) - (a.suitabilityScore ?? 0));

    }

    return land;
  }, [filters, suitabilityResults]);
  
  const clearFilters = () => {
    setFilters({ soilType: '', landUse: '', waterSource: '', aiTip: '' });
    setAiQuery('');
    setSuitabilityResults([]);
    setAnalysisError(null);
  }
  
  const isAnyFilterActive = Object.values(filters).some(v => v !== '') || aiQuery !== '';

  return (
    <div className="bg-background dark:bg-gray-900 min-h-full">
      <div className="sticky top-0 bg-background/80 dark:bg-gray-900/80 backdrop-blur-sm z-10 p-4 border-b border-gray-200 dark:border-gray-700 space-y-3">
        <div className="flex justify-between items-center">
          <h1 className="font-poppins text-2xl text-text-primary dark:text-gray-100">Rent Land</h1>
          <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
        </div>
        
        <div className="flex items-center space-x-2">
            <div className="relative flex-grow">
                <input
                    type="text"
                    value={aiQuery}
                    onChange={(e) => setAiQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAnalyzeSuitability()}
                    placeholder="E.g., 'maize and beans', 'drip irrigation'"
                    className="w-full pl-10 pr-4 py-2 rounded-full bg-surface dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 focus:ring-primary focus:border-primary transition-colors"
                />
                <span className="material-icons-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">psychology</span>
            </div>
            <button
                onClick={handleAnalyzeSuitability}
                disabled={isAnalyzing}
                className="px-4 py-2 bg-primary text-white font-semibold rounded-full hover:bg-green-700 disabled:bg-gray-400 transition-colors flex items-center"
            >
                {isAnalyzing ? (
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                ) : 'Analyze'}
            </button>
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto pb-1">
            <FilterDropdown label="AI Farming Tips" options={aiTipOptions} value={filters.aiTip} onChange={(v) => handleFilterChange('aiTip', v)} icon="psychology" />
            <FilterDropdown label="Land Use" options={['Arable', 'Grazing', 'Commercial', 'Mixed-use']} value={filters.landUse} onChange={(v) => handleFilterChange('landUse', v)} />
            <FilterDropdown label="Water Source" options={['Yes', 'No']} value={filters.waterSource} onChange={(v) => handleFilterChange('waterSource', v)} />
            <FilterDropdown label="Soil Type" options={['Loam', 'Clay', 'Sandy', 'Black Cotton']} value={filters.soilType} onChange={(v) => handleFilterChange('soilType', v)} />
            {isAnyFilterActive && <button onClick={clearFilters} className="text-sm text-red-500 font-semibold flex-shrink-0 px-2">Clear</button>}
        </div>
      </div>
      
      {analysisError && <div className="m-4 p-3 bg-red-100 text-red-800 rounded-lg text-sm">{analysisError}</div>}

      {viewMode === 'list' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          {displayedLand.length > 0 ? (
            displayedLand.map(listing => <ListingCard 
                key={listing.id} 
                listing={listing} 
                onStartChat={onStartChat} 
                suitabilityScore={listing.suitabilityScore}
                suitabilityReason={listing.suitabilityReason}
            />)
          ) : (
            <div className="col-span-1 md:col-span-2 text-center py-10">
              <span className="material-icons-outlined text-5xl text-gray-400 mb-2">search_off</span>
              <p className="text-text-secondary dark:text-gray-400 font-semibold">No matching land found.</p>
              <p className="text-sm text-text-secondary dark:text-gray-500">Try adjusting your filters or AI analysis.</p>
            </div>
          )}
        </div>
      ) : (
        <MapView listings={displayedLand} onStartChat={onStartChat} />
      )}
    </div>
  );
};

export default RentLandScreen;