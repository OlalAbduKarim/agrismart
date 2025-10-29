import React, { useState, useEffect } from 'react';
import BottomNav from './components/BottomNav';
import HomeScreen from './screens/HomeScreen';
import MarketplaceScreen from './screens/MarketplaceScreen';
import RentLandScreen from './screens/RentLandScreen';
import AIGuideScreen from './screens/AIGuideScreen';
import ProfileScreen from './screens/ProfileScreen';
import WelcomeScreen from './screens/onboarding/WelcomeScreen';
import RoleSelectionScreen from './screens/onboarding/RoleSelectionScreen';
import PhoneAuthScreen from './screens/onboarding/PhoneAuthScreen';
import OTPScreen from './screens/onboarding/OTPScreen';
import ProfileCompletionScreen from './screens/onboarding/ProfileCompletionScreen';
import MessagesScreen from './screens/MessagesScreen';
import ChatScreen from './screens/ChatScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import LandRegistryScreen from './screens/LandRegistryScreen';
import RegisterLandFormScreen from './screens/RegisterLandFormScreen';
import { getWishlist, addToWishlist, removeFromWishlist } from './services/wishlistService';
import WishlistScreen from './screens/WishlistScreen';

export type Tab = 'Home' | 'Marketplace' | 'Rent Land' | 'Land Registry' | 'Messages' | 'AI Guide' | 'Profile';

export interface ChatDetails {
  userName: string;
  userPhoto: string;
  listingTitle: string;
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('Home');
  const [onboardingStep, setOnboardingStep] = useState(0); // 0: Welcome, 1: Role, 2: Phone, 3: OTP, 4: Profile, 5: App
  const [userProfile, setUserProfile] = useState({ name: '', photo: '', district: '' });
  const [activeChat, setActiveChat] = useState<ChatDetails | null>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isRegisteringLand, setIsRegisteringLand] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [isViewingWishlist, setIsViewingWishlist] = useState(false);
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return savedTheme || (userPrefersDark ? 'dark' : 'light');
  });

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    // Simulate checking if user is already onboarded
    const is_onboarded = localStorage.getItem('onboarded');
    if (is_onboarded) {
      setOnboardingStep(5);
      const profile = localStorage.getItem('userProfile');
      if (profile) {
        setUserProfile(JSON.parse(profile));
      }
    }
    // Load wishlist from localStorage on initial load
    setWishlist(getWishlist());
  }, []);

  const completeOnboarding = (profile: { name: string; photo: string; district: string; }) => {
    localStorage.setItem('onboarded', 'true');
    localStorage.setItem('userProfile', JSON.stringify(profile));
    setUserProfile(profile);
    setOnboardingStep(5);
  };
  
  const handleStartChat = (details: ChatDetails) => {
    setActiveChat(details);
  };
  
  const handleCloseChat = () => {
    setActiveChat(null);
  };
  
  const handleUpdateProfile = (updatedProfile: { name: string; photo: string; district: string; }) => {
    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
    setUserProfile(updatedProfile);
    setIsEditingProfile(false);
  };

  const handleToggleWishlist = (listingId: number) => {
    setWishlist(prevWishlist => {
      if (prevWishlist.includes(listingId)) {
        return removeFromWishlist(listingId);
      } else {
        return addToWishlist(listingId);
      }
    });
  };

  const renderOnboarding = () => {
    switch (onboardingStep) {
      case 0:
        return <WelcomeScreen onFinish={() => setOnboardingStep(1)} />;
      case 1:
        return <RoleSelectionScreen onSelect={() => setOnboardingStep(2)} />;
      case 2:
        return <PhoneAuthScreen onSendOtp={() => setOnboardingStep(3)} />;
      case 3:
        return <OTPScreen onVerify={() => setOnboardingStep(4)} />;
      case 4:
        return <ProfileCompletionScreen onComplete={completeOnboarding} />;
      default:
        return null;
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Home':
        return <HomeScreen profile={userProfile} onNavigate={setActiveTab} onStartChat={handleStartChat} wishlist={wishlist} onToggleWishlist={handleToggleWishlist} />;
      case 'Marketplace':
        return <MarketplaceScreen onStartChat={handleStartChat} wishlist={wishlist} onToggleWishlist={handleToggleWishlist} />;
      case 'Rent Land':
        return <RentLandScreen onStartChat={handleStartChat} wishlist={wishlist} onToggleWishlist={handleToggleWishlist} />;
      case 'Land Registry':
        return <LandRegistryScreen onRegisterLand={() => setIsRegisteringLand(true)} />;
      case 'Messages':
        return <MessagesScreen onStartChat={handleStartChat} />;
      case 'AI Guide':
        return <AIGuideScreen />;
      case 'Profile':
        return <ProfileScreen profile={userProfile} onLogout={() => {
          localStorage.clear();
          setOnboardingStep(0);
          setActiveTab('Home');
        }} onEditProfile={() => setIsEditingProfile(true)} 
        theme={theme}
        onToggleTheme={toggleTheme}
        onViewWishlist={() => setIsViewingWishlist(true)}
        />;
      default:
        return <HomeScreen profile={userProfile} onNavigate={setActiveTab} onStartChat={handleStartChat} wishlist={wishlist} onToggleWishlist={handleToggleWishlist} />;
    }
  };

  const handleCompleteRegistration = () => {
    // In a real app, you might show a success toast message.
    setIsRegisteringLand(false);
    // Optionally navigate to the land registry to see the (pending) submission
    setActiveTab('Land Registry');
  }

  return (
    <div className="h-screen w-screen bg-background dark:bg-gray-900 font-open-sans text-text-primary dark:text-gray-200 flex flex-col items-center">
      <div className="relative w-full max-w-md h-full bg-background dark:bg-gray-900 flex flex-col shadow-lg">
        {onboardingStep < 5 ? (
          renderOnboarding()
        ) : isViewingWishlist ? (
           <WishlistScreen 
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
              onStartChat={handleStartChat}
              onBack={() => setIsViewingWishlist(false)}
           />
        ) : isEditingProfile ? (
            <EditProfileScreen
              profile={userProfile}
              onSave={handleUpdateProfile}
              onCancel={() => setIsEditingProfile(false)}
            />
        ) : isRegisteringLand ? (
            <RegisterLandFormScreen
              onComplete={handleCompleteRegistration}
              onCancel={() => setIsRegisteringLand(false)}
            />
        ) : activeChat ? (
           <ChatScreen 
              userName={activeChat.userName}
              userPhoto={activeChat.userPhoto}
              listingTitle={activeChat.listingTitle}
              onBack={handleCloseChat}
           />
        ) : (
          <>
            <main className="flex-1 overflow-y-auto pb-16">
              {renderContent()}
            </main>
            <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
          </>
        )}
      </div>
    </div>
  );
};

export default App;