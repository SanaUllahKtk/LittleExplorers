import React, { useState } from 'react';
import { ProfileSelector } from './components/ProfileSelector';
import { PinPad } from './components/PinPad';
import { ChildApp } from './components/child/ChildApp';
import { ParentApp } from './components/parent/ParentApp';
import { AuthView } from './components/AuthView';
import { ChildProfile, MOCK_PROFILES } from './data';
import { AnimatePresence, motion } from 'motion/react';

type AppState = 'auth' | 'selector' | 'pin' | 'parent' | 'child';

export default function App() {
  const [appState, setAppState] = useState<AppState>('auth');
  const [activeChild, setActiveChild] = useState<ChildProfile | null>(null);
  const [profiles, setProfiles] = useState<ChildProfile[]>(MOCK_PROFILES);
  const [currentPin, setCurrentPin] = useState('1234');
  
  const [parentAccount, setParentAccount] = useState({
    name: 'Parent',
    email: 'parent@example.com',
    password: 'password123'
  });

  const handleLogin = (email: string, pass: string) => {
    // Basic mock login
    setParentAccount({ ...parentAccount, email, password: pass });
    setAppState('selector');
  };

  const handleSignUp = (name: string, email: string, pass: string) => {
    setParentAccount({ name, email, password: pass });
    setAppState('selector');
  };

  const handleSelectChild = (child: ChildProfile) => {
    setActiveChild(child);
    setAppState('child');
  };

  const handleSelectParent = () => {
    setAppState('pin');
  };

  const handlePinSuccess = () => {
    setAppState('parent');
  };

  const handlePinCancel = () => {
    setAppState('selector');
  };

  const handleLogout = () => {
    setActiveChild(null);
    setAppState('selector');
  };

  const handleAuthLogout = () => {
    setActiveChild(null);
    setAppState('auth');
  };

  const handleAddProfile = (profile: ChildProfile) => {
    setProfiles([...profiles, profile]);
  };

  const handleUpdateProfile = (updatedProfile: ChildProfile) => {
    setProfiles(profiles.map(p => p.id === updatedProfile.id ? updatedProfile : p));
  };

  return (
    <div className={`w-full h-screen bg-[#E8F1F2] flex items-center justify-center font-sans theme-indigo`}>
      {/* Mobile container constraint to simulate a mobile app on desktop */}
      <div className="w-full h-full sm:h-[720px] sm:w-[360px] sm:rounded-[48px] bg-white overflow-hidden shadow-2xl relative border-[10px] border-[#1C1C1C]">
        
        <AnimatePresence mode="wait">
          {appState === 'auth' && (
            <motion.div
              key="auth"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute inset-0 z-50"
            >
              <AuthView 
                onLogin={handleLogin}
                onSignUp={handleSignUp}
              />
            </motion.div>
          )}

          {appState === 'selector' && (
            <motion.div
              key="selector"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute inset-0"
            >
              <ProfileSelector 
                profiles={profiles}
                onSelectChild={handleSelectChild} 
                onSelectParent={handleSelectParent} 
                onLogout={handleAuthLogout}
              />
            </motion.div>
          )}

          {appState === 'pin' && (
            <motion.div
              key="pin"
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute inset-0 z-50"
            >
              <PinPad 
                expectedPin={currentPin}
                onSuccess={handlePinSuccess} 
                onCancel={handlePinCancel} 
              />
            </motion.div>
          )}

          {appState === 'parent' && (
            <motion.div
              key="parent"
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute inset-0"
            >
              <ParentApp 
                profiles={profiles} 
                onAddProfile={handleAddProfile} 
                onUpdateProfile={handleUpdateProfile}
                onLogout={handleLogout}
                currentPin={currentPin}
                onUpdatePin={setCurrentPin}
                parentAccount={parentAccount}
                onUpdateParentAccount={setParentAccount}
              />
            </motion.div>
          )}

          {appState === 'child' && activeChild && (
            <motion.div
              key="child"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute inset-0"
            >
              <ChildApp 
                profile={activeChild} 
                allProfiles={profiles}
                onLogout={handleLogout} 
                onUpdateProfile={(p) => {
                  handleUpdateProfile(p);
                  setActiveChild(p);
                }} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
