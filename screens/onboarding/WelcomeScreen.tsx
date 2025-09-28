
import React, { useEffect } from 'react';

const AgrismartLogo = () => (
  <div className="text-center">
    <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto text-[#2E7D32]">
      <path d="M16.5 12C16.5 14.4853 14.4853 16.5 12 16.5C9.51472 16.5 7.5 14.4853 7.5 12C7.5 9.51472 9.51472 7.5 12 7.5C14.4853 7.5 16.5 9.51472 16.5 12Z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 3V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M21 12H16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 21V16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M3 12H7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
    <h1 className="text-4xl font-poppins text-[#2E7D32] mt-4">Agrismart</h1>
  </div>
);

interface WelcomeScreenProps {
  onFinish: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="flex-1 flex justify-center items-center bg-surface animate-fade-in">
      <AgrismartLogo />
    </div>
  );
};

export default WelcomeScreen;
