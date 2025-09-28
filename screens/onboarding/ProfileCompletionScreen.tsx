
import React, { useState, useRef } from 'react';
import { UGANDAN_DISTRICTS } from '../../constants';

interface ProfileCompletionScreenProps {
  onComplete: (profile: { name: string; photo: string; district: string }) => void;
}

const ProfileCompletionScreen: React.FC<ProfileCompletionScreenProps> = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [district, setDistrict] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhoto(e.target?.result as string);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const isFormValid = name && district && photo;

  return (
    <div className="flex-1 flex flex-col items-center p-6 bg-background">
      <h1 className="font-poppins text-2xl text-text-primary text-center my-6">Complete Your Profile</h1>
      
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <input 
            type="file" 
            accept="image/*" 
            ref={fileInputRef} 
            onChange={handlePhotoUpload} 
            className="hidden" 
          />
          <button onClick={() => fileInputRef.current?.click()} className="relative w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-text-secondary overflow-hidden">
            {photo ? (
              <img src={photo} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="material-icons-outlined text-5xl">add_a_photo</span>
            )}
            <div className="absolute bottom-0 right-0 bg-primary p-2 rounded-full">
                <span className="material-icons-outlined text-white text-sm">edit</span>
            </div>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-text-secondary mb-1">Full Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:ring-0 transition" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-text-secondary mb-1">District of Operation</label>
            <select value={district} onChange={(e) => setDistrict(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:ring-0 transition bg-white">
              <option value="">Select District</option>
              {UGANDAN_DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </div>

        <button 
          onClick={() => onComplete({ name, photo: photo!, district })}
          disabled={!isFormValid}
          className="w-full bg-primary text-white font-open-sans font-semibold py-3 rounded-lg mt-8 hover:bg-green-700 transition-colors disabled:bg-gray-400"
        >
          Finish Setup
        </button>
      </div>
    </div>
  );
};

export default ProfileCompletionScreen;
