import React, { useState } from 'react';
import { User, Lock, LogOut, ChevronRight, Eye, EyeOff } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface Props {
  onLogout: () => void;
  currentPin: string;
  onUpdatePin: (pin: string) => void;
  parentAccount?: { name: string; email: string; password: string; };
  onUpdateParentAccount?: (account: any) => void;
}

export function SettingsView({ onLogout, currentPin, onUpdatePin, parentAccount, onUpdateParentAccount }: Props) {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingSecurity, setIsEditingSecurity] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [name, setName] = useState(parentAccount?.name || 'John Doe');
  const [email, setEmail] = useState(parentAccount?.email || 'johndoe@example.com');
  const [password, setPassword] = useState(parentAccount?.password || 'password123');

  const [inputCurrentPin, setInputCurrentPin] = useState('');
  const [inputNewPin, setInputNewPin] = useState('');
  const [securityError, setSecurityError] = useState('');
  const [securitySuccess, setSecuritySuccess] = useState('');

  const handleUpdateProfile = () => {
    if (onUpdateParentAccount) {
      onUpdateParentAccount({ name, email, password });
    }
    setIsEditingProfile(false);
  };

  const handleUpdatePin = () => {
    setSecurityError('');
    setSecuritySuccess('');
    if (inputCurrentPin !== currentPin) {
      setSecurityError('Current PIN is incorrect');
      return;
    }
    if (inputNewPin.length !== 4) {
      setSecurityError('New PIN must be 4 digits');
      return;
    }
    onUpdatePin(inputNewPin);
    setSecuritySuccess('PIN updated successfully');
    setInputCurrentPin('');
    setInputNewPin('');
  };

  if (isEditingProfile) {
    return (
      <div className="flex flex-col gap-6 animate-in slide-in-from-right-4 duration-300 pb-20">
        <div className="flex items-center gap-3">
          <button onClick={() => setIsEditingProfile(false)} className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm text-[#64748B] hover:text-[#1E293B] font-bold">
            ←
          </button>
          <h2 className="text-xl font-bold text-[#1E293B]">Edit Profile</h2>
        </div>

        <Card className="p-5 space-y-4 bg-white border-[#F1F5F9]">
          <div>
            <label className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-1.5 block">Parent Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-[#1E293B] font-medium outline-none focus:border-primary" />
          </div>
          <div>
            <label className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-1.5 block">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-[#1E293B] font-medium outline-none focus:border-primary" />
          </div>
          <div>
            <label className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-1.5 block">Password</label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-[#1E293B] font-medium outline-none focus:border-primary pr-12" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B]">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </Card>

        <Button onClick={handleUpdateProfile} className="w-full bg-primary text-white hover:bg-primary-hover border-b-4 border-primary-border">
          Save Changes
        </Button>
      </div>
    );
  }

  if (isEditingSecurity) {
    return (
      <div className="flex flex-col gap-6 animate-in slide-in-from-right-4 duration-300 pb-20">
        <div className="flex items-center gap-3">
          <button onClick={() => {setIsEditingSecurity(false); setSecurityError(''); setSecuritySuccess('');}} className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm text-[#64748B] hover:text-[#1E293B] font-bold">
            ←
          </button>
          <h2 className="text-xl font-bold text-[#1E293B]">Privacy & Security</h2>
        </div>

        <Card className="p-5 space-y-4 bg-white border-[#F1F5F9]">
          <h3 className="font-bold text-[#1E293B]">Change Parent PIN</h3>
          <div>
            <label className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-1.5 block">Current PIN</label>
            <input type="password" maxLength={4} value={inputCurrentPin} onChange={e => setInputCurrentPin(e.target.value)} className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-[#1E293B] font-medium outline-none focus:border-primary" placeholder="Enter 4-digit PIN" />
          </div>
          <div>
            <label className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-1.5 block">New PIN</label>
            <input type="password" maxLength={4} value={inputNewPin} onChange={e => setInputNewPin(e.target.value)} className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-[#1E293B] font-medium outline-none focus:border-primary" placeholder="Enter 4-digit PIN" />
          </div>
          {securityError && <p className="text-red-500 text-sm font-semibold">{securityError}</p>}
          {securitySuccess && <p className="text-green-500 text-sm font-semibold">{securitySuccess}</p>}
          <Button onClick={handleUpdatePin} className="w-full bg-primary text-white hover:bg-primary-hover border-b-4 border-primary-border">
            Update PIN
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300 pb-20">
      <h2 className="text-xl font-bold text-[#1E293B]">Settings</h2>
      
      <div className="space-y-3">
        <SettingItem icon={User} title="Profile & Account" subtitle="Name, username, password" onClick={() => setIsEditingProfile(true)} />
        <SettingItem icon={Lock} title="Privacy & Security" subtitle="PIN and biometrics" onClick={() => setIsEditingSecurity(true)} />
      </div>

      <div className="mt-4">
        <button onClick={onLogout} className="w-full bg-white border border-[#F1F5F9] text-[#EF4444] font-bold py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-sm">
          <LogOut size={18} />
          Log Out
        </button>
      </div>
    </div>
  );
}

function SettingItem({ icon: Icon, title, subtitle, onClick }: any) {
  return (
    <Card onClick={onClick} className="p-4 bg-white border-[#F1F5F9] flex items-center gap-4 cursor-pointer active:scale-95 transition-transform">
      <div className="w-12 h-12 bg-[#F8FAFC] rounded-xl flex items-center justify-center text-[#64748B]">
        <Icon size={20} />
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-[#1E293B]">{title}</h4>
        <p className="text-xs text-[#94A3B8] mt-0.5">{subtitle}</p>
      </div>
      <ChevronRight size={20} className="text-[#CBD5E1]" />
    </Card>
  );
}
