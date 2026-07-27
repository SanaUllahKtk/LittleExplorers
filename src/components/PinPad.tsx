import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Lock, Delete } from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  expectedPin?: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export function PinPad({ expectedPin = '1234', onSuccess, onCancel }: Props) {
  const [pin, setPin] = useState('');
  const CORRECT_PIN = '1234'; // In a real app, this would be hashed and stored securely

  const handlePress = (num: string) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      if (newPin.length === 4) {
        if (newPin === expectedPin) {
          setTimeout(onSuccess, 300);
        } else {
          // Shake effect could be added here
          setTimeout(() => setPin(''), 500);
        }
      }
    }
  };

  const handleBackspace = () => {
    setPin(pin.slice(0, -1));
  };

  return (
    <div className="flex flex-col h-full bg-[#1C1C1C] text-white p-6 items-center justify-center">
      <div className="mb-8 flex flex-col items-center">
        <div className="w-16 h-16 bg-[#2D3436] rounded-full flex items-center justify-center mb-4">
          <Lock size={32} className="text-[#B2BEC3]" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Parents Only</h2>
        <p className="text-[#B2BEC3] text-center text-sm">Enter your PIN to access the dashboard.<br/>(Hint: 1234)</p>
      </div>

      <div className="flex gap-4 mb-12 h-6">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            initial={false}
            animate={{ 
              scale: pin.length > i ? 1.2 : 1,
              backgroundColor: pin.length > i ? 'var(--color-primary)' : '#2D3436'
            }}
            className="w-4 h-4 rounded-full bg-[#2D3436]"
          />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6 w-full max-w-[280px]">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
          <button
            key={num}
            onClick={() => handlePress(num)}
            className="w-20 h-20 rounded-full bg-[#2D3436] text-3xl font-medium active:bg-primary active:text-white transition-colors flex items-center justify-center"
          >
            {num}
          </button>
        ))}
        <button
          onClick={onCancel}
          className="w-20 h-20 rounded-full text-[#B2BEC3] text-sm font-bold active:bg-[#2D3436] transition-colors flex items-center justify-center uppercase tracking-wider"
        >
          Cancel
        </button>
        <button
          onClick={() => handlePress('0')}
          className="w-20 h-20 rounded-full bg-[#2D3436] text-3xl font-medium active:bg-primary transition-colors flex items-center justify-center"
        >
          0
        </button>
        <button
          onClick={handleBackspace}
          className="w-20 h-20 rounded-full text-[#B2BEC3] active:bg-[#2D3436] transition-colors flex items-center justify-center"
        >
          <Delete size={28} />
        </button>
      </div>
    </div>
  );
}
