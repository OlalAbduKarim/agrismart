import React from 'react';
import type { RegisteredLand } from '../types';
import RegisteredLandCard from '../components/RegisteredLandCard';

const mockRegisteredLand: RegisteredLand[] = [
  { id: 1, title: 'Kashari Hills Farmland', location: 'Mbarara', image: 'https://picsum.photos/seed/regland1/400/300', size: '15 Acres', ownerName: 'Yoweri M.', ownerNIN: 'CF123456789M', isVerified: true },
  { id: 5, title: 'Iganga Farmland (New)', location: 'Iganga', image: 'https://picsum.photos/seed/regland5/400/300', size: '8 Acres', ownerName: 'Aisha K.', ownerNIN: 'CM987123456F', isVerified: false },
  { id: 2, title: 'Entebbe Lakeside Estate', location: 'Wakiso', image: 'https://picsum.photos/seed/regland2/400/300', size: '5 Acres', ownerName: 'Janet K.', ownerNIN: 'CF987654321F', isVerified: true },
  { id: 3, title: 'Gulu Agricultural Block', location: 'Gulu', image: 'https://picsum.photos/seed/regland3/400/300', size: '50 Acres', ownerName: 'David O.', ownerNIN: 'CM543219876M', isVerified: true },
  { id: 4, title: 'Jinja Sugarcane Plantation', location: 'Jinja', image: 'https://picsum.photos/seed/regland4/400/300', size: '25 Acres', ownerName: 'Maria N.', ownerNIN: 'CF246813579F', isVerified: true },
];

interface LandRegistryScreenProps {
  onRegisterLand: () => void;
}

const LandRegistryScreen: React.FC<LandRegistryScreenProps> = ({ onRegisterLand }) => {
  return (
    <div className="relative min-h-full bg-background pb-20">
      <div className="sticky top-0 bg-background/80 backdrop-blur-sm z-10 p-4 border-b border-gray-200">
        <h1 className="font-poppins text-2xl text-text-primary">Land Registry</h1>
        <p className="text-sm text-text-secondary mt-1">Officially verified land ownership records.</p>
        <div className="relative mt-3">
          <input type="text" placeholder="Search by location or NIN..." className="w-full pl-10 pr-4 py-2 rounded-full bg-surface border border-gray-200 focus:ring-primary focus:border-primary" />
          <span className="material-icons-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">search</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {mockRegisteredLand.map(land => <RegisteredLandCard key={land.id} land={land} />)}
      </div>
      <button 
        onClick={onRegisterLand}
        className="fixed bottom-20 right-5 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-all flex items-center space-x-2 group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        aria-label="Register Your Land"
      >
        <span className="material-icons-outlined">add_location_alt</span>
        <span className="max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100 group-hover:pr-2 transition-all duration-300 whitespace-nowrap text-sm font-semibold">Register Land</span>
      </button>
    </div>
  );
};

export default LandRegistryScreen;
