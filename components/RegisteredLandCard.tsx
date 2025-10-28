import React from 'react';
import type { RegisteredLand } from '../types';

interface RegisteredLandCardProps {
  land: RegisteredLand;
}

const RegisteredLandCard: React.FC<RegisteredLandCardProps> = ({ land }) => {
  return (
    <div className="bg-surface rounded-lg shadow-md overflow-hidden flex flex-col">
      <img src={land.image} alt={land.title} className="w-full h-40 object-cover" />
      <div className="p-4 flex-1">
        <h3 className="font-poppins text-lg text-text-primary truncate">{land.title}</h3>
        <p className="text-sm text-text-secondary mt-1">{land.location}</p>
        <div className="border-t my-3"></div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="font-semibold text-text-secondary">Owner:</span>
            <span className="text-text-primary">{land.ownerName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-text-secondary">Size:</span>
            <span className="text-text-primary">{land.size}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-text-secondary">NIN:</span>
            <span className="text-text-primary font-mono">{land.ownerNIN}</span>
          </div>
        </div>
      </div>
      {land.isVerified ? (
        <div className="bg-green-100 text-green-800 text-xs font-bold uppercase p-2 flex items-center justify-center">
          <span className="material-icons-outlined text-base mr-1">verified</span>
          Verified Ownership
        </div>
      ) : (
        <div className="bg-yellow-100 text-yellow-800 text-xs font-bold uppercase p-2 flex items-center justify-center">
            <span className="material-icons-outlined text-base mr-1">hourglass_top</span>
            Pending Verification
        </div>
      )}
    </div>
  );
};

export default RegisteredLandCard;
