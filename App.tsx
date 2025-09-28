
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

export type Tab = 'Home' | 'Marketplace' | 'Rent Land' | 'Messages' | 'AI Guide' | 'Profile';

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
        return <HomeScreen profile={userProfile} onNavigate={setActiveTab} onStartChat={handleStartChat} />;
      case 'Marketplace':
        return <MarketplaceScreen onStartChat={handleStartChat} />;
      case 'Rent Land':
        return <RentLandScreen onStartChat={handleStartChat} />;
      case 'Messages':
        return <MessagesScreen onStartChat={handleStartChat} />;
      case 'AI Guide':
        return <AIGuideScreen />;
      case 'Profile':
        return <ProfileScreen profile={userProfile} onLogout={() => {
          localStorage.clear();
          setOnboardingStep(0);
          setActiveTab('Home');
        }}/>;
      default:
        return <HomeScreen profile={userProfile} onNavigate={setActiveTab} onStartChat={handleStartChat} />;
    }
  };

  return (
    <div className="h-screen w-screen bg-background font-open-sans text-text-primary flex flex-col items-center">
      <div className="relative w-full max-w-md h-full bg-background flex flex-col shadow-lg">
        {onboardingStep < 5 ? (
          renderOnboarding()
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
