
import React from 'react';

interface SectionHeaderProps {
  title: string;
  onViewAll?: () => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, onViewAll }) => {
  return (
    <div className="flex justify-between items-center px-4 pt-4">
      <h2 className="font-poppins text-xl text-text-primary">{title}</h2>
      {onViewAll && (
        <button onClick={onViewAll} className="text-primary font-semibold text-sm">
          View All
        </button>
      )}
    </div>
  );
};

export default SectionHeader;
