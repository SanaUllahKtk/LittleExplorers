import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChildProfile } from '../../../data';

interface Props {
  profile: ChildProfile;
  onWin: (points: number) => void;
  onExit: () => void;
}

export function QuizGame({ profile, onWin, onExit }: Props) {
  const [questions, setQuestions] = useState<{ q: string, a: string[], correct: string }[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    let qList = [];
    if (profile.age >= 2 && profile.age <= 4) {
      qList = [
        { q: 'Which is a circle?', a: ['🔴', '🟥', '🔺', '🟩'], correct: '🔴' },
        { q: 'Which is a star?', a: ['🔵', '⭐', '🔶', '⬛'], correct: '⭐' },
        { q: 'Which is a triangle?', a: ['⭕', '⬜', '🔺', '💛'], correct: '🔺' },
      ];
    } else if (profile.age >= 5 && profile.age <= 6) {
      qList = [
        { q: 'C _ T', a: ['A', 'B', 'Z', 'E'], correct: 'A' },
        { q: 'D O _', a: ['G', 'M', 'P', 'R'], correct: 'G' },
        { q: 'B _ R D', a: ['U', 'A', 'I', 'O'], correct: 'I' },
      ];
    } else {
      qList = [
        { q: 'What is the capital of France?', a: ['London', 'Berlin', 'Paris', 'Rome'], correct: 'Paris' },
        { q: 'How many planets in solar system?', a: ['7', '8', '9', '10'], correct: '8' },
        { q: 'What is 15 * 3?', a: ['30', '45', '50', '60'], correct: '45' },
      ];
    }
    setQuestions(qList.sort(() => Math.random() - 0.5));
  }, [profile.age]);

  const handleAnswer = (ans: string) => {
    const q = questions[currentIdx];
    const newScore = ans === q.correct ? score + 1 : score;
    
    if (ans === q.correct) {
      setScore(newScore);
    }
    
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      onWin(Math.max(10, newScore * 10));
    }
  };

  if (questions.length === 0) return null;

  const currentQ = questions[currentIdx];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6">
      <div className="text-xl font-bold text-[#636E72] mb-8">Question {currentIdx + 1} of {questions.length}</div>
      
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#F1F3F5] w-full max-w-md text-center mb-8">
        <h2 className="text-4xl md:text-5xl font-black text-[#2D3436]">{currentQ.q}</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        {currentQ.a.map((option, idx) => (
          <motion.button
            key={idx}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onPointerDown={() => handleAnswer(option)}
            className="bg-[#6C5CE7] text-white p-6 rounded-2xl text-2xl md:text-3xl font-bold shadow-md hover:bg-[#5f4ed1] transition-colors"
          >
            {option}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
