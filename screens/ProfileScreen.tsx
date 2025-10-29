import React from 'react';

interface ProfileScreenProps {
  profile: { name: string; photo: string; district: string; };
  onLogout: () => void;
  onEditProfile: () => void;
  theme: string;
  onToggleTheme: () => void;
}

const ProfileMenuItem: React.FC<{icon: string, label: string, onClick?: () => void}> = ({ icon, label, onClick }) => (
    <button onClick={onClick} className="flex items-center w-full p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
        <span className="material-icons-outlined text-text-secondary dark:text-gray-400 mr-4">{icon}</span>
        <span className="font-semibold text-text-primary dark:text-gray-100 flex-1 text-left">{label}</span>
        <span className="material-icons-outlined text-gray-400 dark:text-gray-500">chevron_right</span>
    </button>
);

const ThemeToggle: React.FC<{ theme: string; onToggle: () => void; }> = ({ theme, onToggle }) => (
  <div className="flex items-center w-full p-4">
    <span className="material-icons-outlined text-text-secondary dark:text-gray-400 mr-4">dark_mode</span>
    <span className="font-semibold text-text-primary dark:text-gray-100 flex-1 text-left">Dark Mode</span>
    <button 
      onClick={onToggle} 
      className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${theme === 'dark' ? 'bg-primary' : 'bg-gray-300'}`}
      aria-label="Toggle dark mode"
    >
      <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  </div>
);


const ProfileScreen: React.FC<ProfileScreenProps> = ({ profile, onLogout, onEditProfile, theme, onToggleTheme }) => {
  return (
    <div className="bg-background dark:bg-gray-900 min-h-full">
      <div className="p-4 bg-surface dark:bg-gray-800 flex flex-col items-center pb-6 border-b dark:border-gray-700">
        <img src={profile.photo || 'https://picsum.photos/seed/profile/200'} alt="Profile" className="w-28 h-28 rounded-full object-cover border-4 border-white dark:border-gray-600 shadow-lg mb-4" />
        <h1 className="font-poppins text-2xl text-text-primary dark:text-gray-100">{profile.name}</h1>
        <p className="text-text-secondary dark:text-gray-400 mt-1">{profile.district}, Uganda</p>
      </div>
      
      <div className="py-4">
        <div className="bg-surface dark:bg-gray-800 rounded-lg mx-4 shadow-sm">
            <ProfileMenuItem icon="account_circle" label="Edit Profile" onClick={onEditProfile} />
            <div className="border-t border-gray-100 dark:border-gray-700 mx-4"></div>
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            <div className="border-t border-gray-100 dark:border-gray-700 mx-4"></div>
            <ProfileMenuItem icon="notifications" label="Notifications" />
            <div className="border-t border-gray-100 dark:border-gray-700 mx-4"></div>
            <ProfileMenuItem icon="security" label="Security" />
            <div className="border-t border-gray-100 dark:border-gray-700 mx-4"></div>
            <ProfileMenuItem icon="help_outline" label="Help & Support" />
        </div>
      </div>
      
      <div className="px-4 mt-4">
        <button 
          onClick={onLogout}
          className="w-full bg-red-500 text-white font-semibold py-3 rounded-lg hover:bg-red-600 transition-colors">
            Logout
        </button>
      </div>

    </div>
  );
};

export default ProfileScreen;