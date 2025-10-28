
import React, { useState, useRef } from 'react';
import { UGANDAN_DISTRICTS } from '../constants';

interface RegisterLandFormScreenProps {
  onComplete: () => void;
  onCancel: () => void;
}

const RegisterLandFormScreen: React.FC<RegisterLandFormScreenProps> = ({ onComplete, onCancel }) => {
  const [landPhoto, setLandPhoto] = useState<string | null>(null);
  const [titleDeed, setTitleDeed] = useState<File | null>(null);
  const landPhotoInputRef = useRef<HTMLInputElement>(null);
  const titleDeedInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<any>>,
    isImage: boolean
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (isImage) {
        const reader = new FileReader();
        reader.onload = (e) => setter(e.target?.result as string);
        reader.readAsDataURL(file);
      } else {
        setter(file);
      }
    }
  };
  
  const handleSubmit = () => {
    // Basic form validation can be added here
    setIsSubmitting(true);
    // Simulate API call for verification
    setTimeout(() => {
        alert("Submission successful! Your land registration is now under review. You will be notified of the outcome.");
        onComplete();
    }, 1500);
  }

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex items-center p-3 border-b border-gray-200 bg-surface sticky top-0 z-10">
        <button onClick={onCancel} className="p-2 text-text-secondary hover:text-primary">
          <span className="material-icons-outlined">arrow_back</span>
        </button>
        <h1 className="font-poppins text-xl text-text-primary ml-4">Register Your Land</h1>
      </div>
      
      <div className="flex-1 p-6 overflow-y-auto space-y-8">
        {/* Section 1: Land Information */}
        <div>
          <h2 className="font-poppins text-lg text-text-primary border-b pb-2 mb-4">1. Land Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-text-secondary mb-2">Land Photo</label>
              <input type="file" accept="image/*" ref={landPhotoInputRef} onChange={(e) => handleFileUpload(e, setLandPhoto, true)} className="hidden" />
              <button onClick={() => landPhotoInputRef.current?.click()} className="w-full h-40 rounded-lg bg-gray-200 flex items-center justify-center text-text-secondary border-2 border-dashed hover:border-primary overflow-hidden">
                {landPhoto ? <img src={landPhoto} alt="Land" className="w-full h-full object-cover"/> : <span className="material-icons-outlined text-3xl">add_a_photo</span>}
              </button>
            </div>
            <div>
              <label className="block text-sm font-semibold text-text-secondary mb-1">Listing Title <span className="text-red-500">*</span></label>
              <input type="text" placeholder="e.g. 10 Acres Farmland in Gulu" className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:ring-0 transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-text-secondary mb-1">District <span className="text-red-500">*</span></label>
              <select className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:ring-0 transition bg-white">
                <option value="">Select District</option>
                {UGANDAN_DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
             <div>
              <label className="block text-sm font-semibold text-text-secondary mb-1">Size (in Acres) <span className="text-red-500">*</span></label>
              <input type="number" placeholder="e.g. 10" className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:ring-0 transition" />
            </div>
          </div>
        </div>

        {/* Section 2: Owner Verification */}
        <div>
          <h2 className="font-poppins text-lg text-text-primary border-b pb-2 mb-4">2. Owner Verification</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-text-secondary mb-1">National ID Number (NIN) <span className="text-red-500">*</span></label>
              <input type="text" placeholder="CF123456789M" className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:ring-0 transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-text-secondary mb-1">Upload Land Title Deed <span className="text-red-500">*</span></label>
              <input type="file" accept="image/*,.pdf" ref={titleDeedInputRef} onChange={(e) => handleFileUpload(e, setTitleDeed, false)} className="hidden" />
              <button onClick={() => titleDeedInputRef.current?.click()} className="w-full p-4 rounded-lg bg-gray-100 flex items-center justify-between text-text-secondary border-2 border-dashed hover:border-primary">
                <span className="truncate pr-2">{titleDeed ? titleDeed.name : "Select a file (PDF, JPG, PNG)"}</span>
                <span className="material-icons-outlined text-xl">upload_file</span>
              </button>
              <p className="text-xs text-text-secondary mt-1">Please upload a clear scan or photo of your official Land Title document.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-gray-200 bg-surface">
        <button 
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full bg-primary text-white font-open-sans font-semibold py-3 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-wait"
        >
          {isSubmitting ? "Submitting..." : "Submit for Verification"}
        </button>
      </div>
    </div>
  );
};

export default RegisterLandFormScreen;
