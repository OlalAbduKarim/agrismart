
import React from 'react';
import type { Tab } from '../App';

interface BottomNavProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

interface NavItemProps {
  label: Tab;
  icon: string;
  isActive: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ label, icon, isActive, onClick }) => {
  const activeColor = 'text-primary';
  const inactiveColor = 'text-text-secondary';
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center flex-1 transition-colors duration-200 ${isActive ? activeColor : inactiveColor}`}
    >
      <span className="material-icons-outlined">{icon}</span>
      <span className="text-xs font-semibold mt-1">{label}</span>
    </button>
  );
};

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const navItems: { label: Tab; icon: string }[] = [
    { label: 'Home', icon: 'home' },
    { label: 'Marketplace', icon: 'storefront' },
    { label: 'Rent Land', icon: 'landscape' },
    { label: 'Messages', icon: 'chat_bubble_outline' },
    { label: 'AI Guide', icon: 'psychology' },
    { label: 'Profile', icon: 'person' },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md h-16 bg-surface border-t border-gray-200 flex justify-around items-center shadow-lg">
      {navItems.map((item) => (
        <NavItem
          key={item.label}
          label={item.label}
          icon={item.icon}
          isActive={activeTab === item.label}
          onClick={() => setActiveTab(item.label)}
        />
      ))}
    </div>
  );
};

export default BottomNav;
