
import React, { useState } from 'react';

interface PhoneAuthScreenProps {
  onSendOtp: () => void;
}

const PhoneAuthScreen: React.FC<PhoneAuthScreenProps> = ({ onSendOtp }) => {
  const [phone, setPhone] = useState('');

  return (
    <div className="flex-1 flex flex-col justify-center items-center p-6 bg-background">
      <h1 className="font-poppins text-2xl text-text-primary text-center mb-2">Enter your phone number</h1>
      <p className="text-text-secondary text-center mb-8">We'll send you a verification code.</p>
      
      <div className="w-full max-w-sm">
        <div className="flex items-center border-2 border-gray-200 rounded-lg focus-within:border-primary transition-colors p-3">
          <div className="flex items-center pr-3 border-r border-gray-200">
            <span className="text-xl">🇺🇬</span>
            <span className="ml-2 font-semibold text-text-primary">+256</span>
          </div>
          <input 
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
            placeholder="771 234 567"
            className="w-full p-0 border-0 bg-transparent focus:ring-0 ml-3 text-lg"
          />
        </div>

        <button 
          onClick={onSendOtp}
          disabled={phone.length < 9}
          className="w-full bg-primary text-white font-open-sans font-semibold py-3 rounded-lg mt-8 hover:bg-green-700 transition-colors disabled:bg-gray-400"
        >
          Send OTP
        </button>
      </div>
    </div>
  );
};

export default PhoneAuthScreen;
