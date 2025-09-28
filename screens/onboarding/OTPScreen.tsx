import React, { useState, useRef, ChangeEvent, KeyboardEvent } from 'react';

interface OTPScreenProps {
  onVerify: () => void;
}

const OTPScreen: React.FC<OTPScreenProps> = ({ onVerify }) => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.nextSibling && element.value) {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };


  return (
    <div className="flex-1 flex flex-col justify-center items-center p-6 bg-background">
      <h1 className="font-poppins text-2xl text-text-primary text-center mb-2">Verify your number</h1>
      <p className="text-text-secondary text-center mb-8">Enter the 6-digit code we sent you.</p>
      
      <div className="flex justify-center space-x-2 mb-8">
        {otp.map((data, index) => {
          return (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={data}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target, index)}
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(e, index)}
              // FIX: The ref callback function should not return a value. Using a block body `{}` fixes the implicit return of the assignment expression.
              ref={(el) => { inputsRef.current[index] = el; }}
              className="w-12 h-14 text-center text-2xl font-semibold border-2 border-gray-200 rounded-lg focus:border-primary focus:ring-primary transition"
            />
          );
        })}
      </div>

      <button 
        onClick={onVerify}
        disabled={otp.join('').length !== 6}
        className="w-full max-w-sm bg-primary text-white font-open-sans font-semibold py-3 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400"
      >
        Verify & Proceed
      </button>

      <p className="text-text-secondary text-sm mt-6">
        Didn't receive code? <button className="text-primary font-semibold">Resend</button>
      </p>
    </div>
  );
};

export default OTPScreen;
