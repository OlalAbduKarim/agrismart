
import React from 'react';

interface ProfileScreenProps {
  profile: { name: string; photo: string; district: string; };
  onLogout: () => void;
  onEditProfile: () => void;
}

const ProfileMenuItem: React.FC<{icon: string, label: string, onClick?: () => void}> = ({ icon, label, onClick }) => (
    <button onClick={onClick} className="flex items-center w-full p-4 hover:bg-gray-50 transition-colors">
        <span className="material-icons-outlined text-text-secondary mr-4">{icon}</span>
        <span className="font-semibold text-text-primary flex-1 text-left">{label}</span>
        <span className="material-icons-outlined text-gray-400">chevron_right</span>
    </button>
)

const ProfileScreen: React.FC<ProfileScreenProps> = ({ profile, onLogout, onEditProfile }) => {
  return (
    <div className="bg-background min-h-full">
      <div className="p-4 bg-surface flex flex-col items-center pb-6 border-b">
        <img src={profile.photo || 'https://picsum.photos/seed/profile/200'} alt="Profile" className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg mb-4" />
        <h1 className="font-poppins text-2xl text-text-primary">{profile.name}</h1>
        <p className="text-text-secondary mt-1">{profile.district}, Uganda</p>
      </div>
      
      <div className="py-4">
        <div className="bg-surface rounded-lg mx-4 shadow-sm">
            <ProfileMenuItem icon="account_circle" label="Edit Profile" onClick={onEditProfile} />
            <div className="border-t border-gray-100 mx-4"></div>
            <ProfileMenuItem icon="notifications" label="Notifications" />
            <div className="border-t border-gray-100 mx-4"></div>
            <ProfileMenuItem icon="security" label="Security" />
            <div className="border-t border-gray-100 mx-4"></div>
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
