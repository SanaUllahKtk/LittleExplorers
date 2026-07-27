import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';

interface Props {
  onLogin: (email: string, pass: string) => void;
  onSignUp: (name: string, email: string, pass: string) => void;
}

export function AuthView({ onLogin, onSignUp }: Props) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      onLogin(email, password);
    } else {
      onSignUp(name, email, password);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#E8F1F2] to-white p-6 relative overflow-hidden">
      
      {/* Decorative background elements */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div className="absolute top-10 right-10 w-24 h-24 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-32 h-32 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      
      <div className="z-10 w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-white rounded-3xl shadow-lg mx-auto flex items-center justify-center mb-4 transform rotate-3">
            <span className="text-4xl">🌟</span>
          </div>
          <h1 className="text-3xl font-black text-[#1E293B] mb-2 tracking-tight">KidsLearn</h1>
          <p className="text-[#64748B] font-medium">For Parents & Kids</p>
        </div>

        <motion.div 
          className="bg-white p-6 rounded-[32px] shadow-xl border border-[#F1F5F9]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        >
          <div className="flex mb-6 bg-[#F8FAFC] p-1 rounded-2xl">
            <button 
              onClick={() => setMode('login')}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-colors ${mode === 'login' ? 'bg-white shadow-sm text-primary' : 'text-[#94A3B8] hover:text-[#64748B]'}`}
            >
              Sign In
            </button>
            <button 
              onClick={() => setMode('signup')}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-colors ${mode === 'signup' ? 'bg-white shadow-sm text-primary' : 'text-[#94A3B8] hover:text-[#64748B]'}`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="wait">
              {mode === 'signup' && (
                <motion.div
                  key="name"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-1.5"
                >
                  <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider ml-1">Parent Name</label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]">
                      <User size={18} />
                    </div>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required={mode === 'signup'}
                      placeholder="Enter your name"
                      className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl pl-11 pr-4 py-3.5 text-[#1E293B] font-medium outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider ml-1">Email</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]">
                  <Mail size={18} />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="parent@example.com"
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl pl-11 pr-4 py-3.5 text-[#1E293B] font-medium outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider ml-1">Password</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]">
                  <Lock size={18} />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl pl-11 pr-4 py-3.5 text-[#1E293B] font-medium outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-primary text-white font-bold py-4 rounded-2xl mt-6 flex items-center justify-center gap-2 hover:bg-primary-hover active:scale-[0.98] transition-all shadow-md shadow-primary/20"
            >
              {mode === 'login' ? 'Sign In' : 'Create Account'}
              <ArrowRight size={18} />
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
