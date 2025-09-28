
import React from 'react';

interface RoleButtonProps {
  icon: string;
  title: string;
  onClick: () => void;
}

const RoleButton: React.FC<RoleButtonProps> = ({ icon, title, onClick }) => (
  <button onClick={onClick} className="w-full bg-surface p-6 rounded-lg shadow-md flex items-center space-x-4 hover:bg-gray-50 transition-colors">
    <span className="material-icons-outlined text-primary text-3xl">{icon}</span>
    <span className="font-semibold text-text-primary text-lg">{title}</span>
  </button>
);


interface RoleSelectionScreenProps {
  onSelect: () => void;
}

const RoleSelectionScreen: React.FC<RoleSelectionScreenProps> = ({ onSelect }) => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center p-6 bg-background">
      <h1 className="font-poppins text-2xl text-text-primary text-center mb-8">How will you use Agrismart?</h1>
      <div className="w-full space-y-4">
        <RoleButton icon="landscape" title="I own land to rent" onClick={onSelect} />
        <RoleButton icon="agriculture" title="I need land to farm" onClick={onSelect} />
        <RoleButton icon="storefront" title="I want to buy/sell goods" onClick={onSelect} />
        <RoleButton icon="trending_up" title="I'm an investor" onClick={onSelect} />
      </div>
    </div>
  );
};

export default RoleSelectionScreen;
