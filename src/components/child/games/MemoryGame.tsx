import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChildProfile } from '../../../data';

interface Props {
  profile: ChildProfile;
  onWin: (points: number) => void;
  onExit: () => void;
}

interface Card {
  id: number;
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export function MemoryGame({ profile, onWin, onExit }: Props) {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    let items: string[] = [];
    if (profile.age >= 2 && profile.age <= 4) {
      items = ['🐶', '🐱', '🐰', '🦁', '🐻', '🐼'];
    } else if (profile.age >= 5 && profile.age <= 6) {
      items = ['A', 'B', 'C', 'D', 'E', 'F'];
    } else {
      items = ['Sun', 'Moon', 'Star', 'Earth', 'Mars', 'Venus'];
    }

    const deck = [...items, ...items]
      .sort(() => Math.random() - 0.5)
      .map((content, index) => ({
        id: index,
        content,
        isFlipped: false,
        isMatched: false
      }));

    setCards(deck);
  }, [profile.age]);

  const handleCardClick = (id: number) => {
    if (isLocked) return;
    const clickedCard = cards.find(c => c.id === id);
    if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched) return;

    const newFlipped = [...flippedIds, id];
    setFlippedIds(newFlipped);
    
    setCards(prev => prev.map(c => c.id === id ? { ...c, isFlipped: true } : c));

    if (newFlipped.length === 2) {
      setIsLocked(true);
      setMoves(m => m + 1);
      
      const card1 = cards.find(c => c.id === newFlipped[0]);
      const card2 = cards.find(c => c.id === newFlipped[1]);

      if (card1?.content === card2?.content) {
        setCards(prev => prev.map(c => 
          newFlipped.includes(c.id) ? { ...c, isMatched: true } : c
        ));
        setFlippedIds([]);
        setIsLocked(false);
      } else {
        setTimeout(() => {
          setCards(prev => prev.map(c => 
            newFlipped.includes(c.id) ? { ...c, isFlipped: false } : c
          ));
          setFlippedIds([]);
          setIsLocked(false);
        }, 1000);
      }
    }
  };

  useEffect(() => {
    if (cards.length > 0 && cards.every(c => c.isMatched)) {
      setTimeout(() => onWin(30), 500);
    }
  }, [cards, onWin]);

  return (
    <div className="w-full h-full flex flex-col p-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-[#2D3436]">Moves: {moves}</h2>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4 w-full max-w-lg">
          {cards.map(card => (
            <motion.div
              key={card.id}
              onPointerDown={() => handleCardClick(card.id)}
              className="aspect-square relative cursor-pointer"
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                initial={false}
                animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
                transition={{ duration: 0.4, type: 'spring', stiffness: 260, damping: 20 }}
                className="w-full h-full absolute preserve-3d"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Front (Hidden state) */}
                <div 
                  className="absolute w-full h-full bg-[#6C5CE7] rounded-2xl shadow-sm border-4 border-white/20 flex items-center justify-center"
                  style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                >
                  <span className="text-white text-3xl opacity-50">?</span>
                </div>
                
                {/* Back (Revealed state) */}
                <div 
                  className="absolute w-full h-full bg-white rounded-2xl shadow-sm flex items-center justify-center text-5xl md:text-6xl font-bold text-[#2D3436]"
                  style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  {card.content}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
