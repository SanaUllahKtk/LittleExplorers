import React, { useState } from 'react';
import { ChildProfile } from '../data';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Settings, Plus, LogOut } from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  profiles: ChildProfile[];
  onSelectChild: (child: ChildProfile) => void;
  onSelectParent: () => void;
  onLogout?: () => void;
}

export function ProfileSelector({ profiles, onSelectChild, onSelectParent, onLogout }: Props) {
  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] p-6 pt-12 items-center text-center relative">
      {onLogout && (
        <button 
          onClick={onLogout}
          className="absolute top-6 right-6 p-3 bg-white rounded-full text-slate-400 hover:text-red-500 shadow-sm transition-colors"
        >
          <LogOut size={20} />
        </button>
      )}
      
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-10"
      >
        <h1 className="text-3xl font-extrabold text-[#1E293B] mb-2">Little Explorers</h1>
        <p className="text-[#64748B] font-medium text-lg">Who is learning today?</p>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-6 mb-12 w-full max-w-sm">
        {profiles.map((profile, i) => (
          <motion.div
            key={profile.id}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col items-center gap-3 cursor-pointer group"
            onClick={() => onSelectChild(profile)}
          >
            <div className={`w-28 h-28 rounded-full ${i === 0 ? 'bg-[#FFD93D]' : 'bg-[#FF8E71]'} border-4 border-white shadow-md flex items-center justify-center text-5xl transition-transform group-hover:scale-105 group-hover:border-[#6C5CE7] group-active:scale-95`}>
              {profile.avatar}
            </div>
            <span className="text-xl font-bold text-[#1E293B]">{profile.name}</span>
          </motion.div>
        ))}


      </div>

      <div className="mt-auto pb-8 w-full flex justify-end">
        <Button variant="ghost" size="icon" onClick={onSelectParent} className="rounded-full w-14 h-14 bg-white shadow-sm text-slate-400 hover:text-primary">
          <Settings size={28} />
        </Button>
      </div>
    </div>
  );
}
