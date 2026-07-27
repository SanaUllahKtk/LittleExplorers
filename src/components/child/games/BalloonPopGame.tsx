import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChildProfile } from '../../../data';

interface Props {
  profile: ChildProfile;
  onWin: (points: number) => void;
  onExit: () => void;
}

export function BalloonPopGame({ profile, onWin, onExit }: Props) {
  const [target, setTarget] = useState('');
  const [balloons, setBalloons] = useState<{ id: string; content: string; color: string; left: number; speed: number }[]>([]);
  const [score, setScore] = useState(0);
  const winScore = 5;

  const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500'];
  const numbers24 = ['1', '2', '3', '4', '5'];
  const math46 = [{ q: '2+2', a: '4' }, { q: '3+1', a: '4' }, { q: '1+2', a: '3' }, { q: '5+0', a: '5' }];
  const math610 = [{ q: '5x5', a: '25' }, { q: '12+13', a: '25' }, { q: '6x4', a: '24' }, { q: '100/4', a: '25' }];

  useEffect(() => {
    // Setup game based on age
    let currentTarget = '';
    let options: string[] = [];

    if (profile.age >= 2 && profile.age <= 4) {
      currentTarget = numbers24[Math.floor(Math.random() * numbers24.length)];
      options = numbers24;
    } else if (profile.age >= 5 && profile.age <= 6) {
      const q = math46[Math.floor(Math.random() * math46.length)];
      currentTarget = q.a;
      options = math46.map(m => m.a);
    } else {
      const q = math610[Math.floor(Math.random() * math610.length)];
      currentTarget = q.a;
      options = math610.map(m => m.a);
    }

    setTarget(currentTarget);

    // Spawn balloons
    const interval = setInterval(() => {
      setBalloons(prev => {
        if (prev.length > 8) return prev;
        const isTarget = Math.random() > 0.4;
        const content = isTarget ? currentTarget : options[Math.floor(Math.random() * options.length)];
        return [...prev, {
          id: Math.random().toString(),
          content,
          color: colors[Math.floor(Math.random() * colors.length)],
          left: 10 + Math.random() * 70,
          speed: 6 + Math.random() * 4 // Faster speed (6 to 10 seconds)
        }];
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [profile.age]);

  const handlePop = (id: string, content: string) => {
    if (content === target) {
      const newScore = score + 1;
      setScore(newScore);
      if (newScore >= winScore) {
        setTimeout(() => onWin(20), 500);
      }
    } else {
      setScore(Math.max(0, score - 1));
    }
    setBalloons(prev => prev.filter(b => b.id !== id));
  };

  return (
    <div className="w-full h-full relative overflow-hidden bg-sky-100 flex flex-col">
      <div className="p-4 bg-white/80 backdrop-blur-sm shadow-sm flex items-center justify-between z-10">
        <div className="text-xl font-bold text-[#2D3436]">
          Target: <span className="text-[#6C5CE7] text-3xl ml-2">{target}</span>
        </div>
        <div className="text-xl font-bold text-[#2D3436]">
          Score: <span className="text-[#00B894]">{score}/{winScore}</span>
        </div>
      </div>

      <div className="flex-1 relative">
        <AnimatePresence>
          {balloons.map(balloon => (
            <motion.div
              key={balloon.id}
              initial={{ top: '100%', opacity: 0, scale: 0.8 }}
              animate={{ top: '-30%', opacity: 1, scale: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: balloon.speed, ease: 'linear' }}
              onPointerDown={() => handlePop(balloon.id, balloon.content)}
              style={{ left: `${balloon.left}%` }}
              className={`absolute w-24 h-32 ${balloon.color} rounded-[50%] shadow-lg cursor-pointer flex items-center justify-center`}
              onAnimationComplete={() => setBalloons(prev => prev.filter(b => b.id !== balloon.id))}
            >
              <div className="text-white font-black text-3xl select-none">{balloon.content}</div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1 h-8 bg-slate-300"></div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
