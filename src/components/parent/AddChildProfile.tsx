import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { ChildProfile } from '../../data';

interface Props {
  onAdd: (profile: ChildProfile) => void;
  onCancel: () => void;
}

const AVATARS = ['👶', '👦', '👧', '🦁', '🚀', '🌟', '🦊', '🎨'];

export function AddChildProfile({ onAdd, onCancel }: Props) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('5');
  const [avatar, setAvatar] = useState(AVATARS[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd({
        id: Date.now().toString(),
        name: name.trim(),
        age: parseInt(age, 10),
        avatar,
        language: 'English',
        level: 'Level 1',
        stars: 0,
        streak: 0,
        progress: 0,
        settings: {
          screenTimeLimit: 60,
          bedTime: '20:00',
          allowedCategories: ['math', 'reading', 'logic', 'creativity']
        }
      });
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-in slide-in-from-right-4 duration-300 h-full overflow-y-auto pb-20">
      <div className="flex items-center gap-3 mb-2">
        <button type="button" onClick={onCancel} className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm text-[#64748B] hover:text-[#1E293B] font-bold">
          ←
        </button>
        <h2 className="text-xl font-bold text-[#1E293B]">Add Child Profile</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="p-5 space-y-4 bg-white border-[#F1F5F9]">
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 rounded-full bg-primary-light flex items-center justify-center text-5xl mb-4 border-4 border-primary">
              {avatar}
            </div>
            <div className="grid grid-cols-4 gap-2">
              {AVATARS.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setAvatar(a)}
                  className={`w-12 h-12 flex items-center justify-center text-2xl rounded-full transition-transform active:scale-95 ${avatar === a ? 'bg-primary shadow-md border-2 border-white' : 'bg-[#F8FAFC]'}`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-1.5 block">Child's Name</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Leo"
              required
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-[#1E293B] font-medium outline-none focus:border-primary" 
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#64748B] uppercase tracking-wider mb-1.5 block">Age</label>
            <select
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 text-[#1E293B] font-medium outline-none focus:border-primary"
            >
              {[2, 3, 4, 5, 6, 7, 8].map(num => (
                <option key={num} value={num}>{num} years old</option>
              ))}
            </select>
          </div>
        </Card>

        <Button type="submit" className="w-full bg-primary text-white hover:bg-primary-hover border-b-4 border-primary-border py-4 rounded-xl font-bold">
          Create Profile
        </Button>
      </form>
    </div>
  );
}
