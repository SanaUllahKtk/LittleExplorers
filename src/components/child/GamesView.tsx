import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChildProfile } from '../../data';
import { Gamepad2, X, Star, Trophy, Play } from 'lucide-react';
import { BalloonPopGame } from './games/BalloonPopGame';
import { MemoryGame } from './games/MemoryGame';
import { QuizGame } from './games/QuizGame';

interface Props {
  profile: ChildProfile;
  onUpdateProfile?: (profile: ChildProfile) => void;
}

interface GameDefinition {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  component: React.FC<{ profile: ChildProfile; onWin: (points: number) => void; onExit: () => void }>;
}

export function GamesView({ profile, onUpdateProfile }: Props) {
  const [activeGame, setActiveGame] = useState<GameDefinition | null>(null);
  const [pointsEarned, setPointsEarned] = useState<number | null>(null);

  const getGamesForAge = (age: number): GameDefinition[] => {
    if (age >= 2 && age <= 4) {
      return [
        { id: 'g1', title: 'Color Pop', description: 'Pop the right colored balloons!', icon: '🎈', color: 'bg-red-100 text-red-600', component: BalloonPopGame },
        { id: 'g2', title: 'Animal Match', description: 'Find the matching animals!', icon: '🐶', color: 'bg-orange-100 text-orange-600', component: MemoryGame },
        { id: 'g3', title: 'Shape Finder', description: 'Find the correct shape!', icon: '⭐', color: 'bg-blue-100 text-blue-600', component: QuizGame },
      ];
    } else if (age >= 5 && age <= 6) {
      return [
        { id: 'g4', title: 'Math Pop', description: 'Pop balloons with correct math answers!', icon: '➕', color: 'bg-purple-100 text-purple-600', component: BalloonPopGame },
        { id: 'g5', title: 'Word Match', description: 'Match the words to their pictures!', icon: '📖', color: 'bg-pink-100 text-pink-600', component: MemoryGame },
        { id: 'g6', title: 'Spelling Bee', description: 'Choose the correct spelling!', icon: '🐝', color: 'bg-teal-100 text-teal-600', component: QuizGame },
      ];
    } else {
      return [
        { id: 'g7', title: 'Math Ninja', description: 'Solve hard math problems quickly!', icon: '🥷', color: 'bg-slate-100 text-slate-800', component: BalloonPopGame },
        { id: 'g8', title: 'Memory Challenge', description: 'Test your memory with complex pairs!', icon: '🧠', color: 'bg-indigo-100 text-indigo-600', component: MemoryGame },
        { id: 'g9', title: 'Brain Teasers', description: 'Answer challenging questions!', icon: '🤔', color: 'bg-green-100 text-green-600', component: QuizGame },
      ];
    }
  };

  const games = getGamesForAge(profile.age);

  const handleWin = (points: number) => {
    setPointsEarned(points);
    if (onUpdateProfile) {
      onUpdateProfile({
        ...profile,
        stars: (profile.stars || 0) + points,
      });
    }
  };

  const handleCloseGame = () => {
    setActiveGame(null);
    setPointsEarned(null);
  };

  return (
    <div className="flex flex-col space-y-6 pt-4 pb-32 px-4 h-full overflow-y-auto relative">
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-rose-100 p-2 rounded-xl text-rose-600">
          <Gamepad2 size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-black text-[#2D3436]">Play & Learn</h1>
          <p className="text-sm font-medium text-[#636E72]">Play games to earn stars!</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {games.map((game) => (
          <div 
            key={game.id}
            onClick={() => setActiveGame(game)}
            className="bg-white rounded-3xl p-5 shadow-sm border border-[#F1F3F5] flex items-center gap-4 cursor-pointer active:scale-95 transition-transform"
          >
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${game.color}`}>
              {game.icon}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-[#2D3436] text-lg">{game.title}</h3>
              <p className="text-[#636E72] text-sm">{game.description}</p>
            </div>
            <div className="bg-[#F8FAFC] p-3 rounded-full text-[#6C5CE7]">
              <Play size={20} className="ml-1" />
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {activeGame && (
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-white flex flex-col"
          >
            <div className="p-4 flex items-center justify-between border-b border-[#F1F3F5]">
              <div className="flex items-center gap-2">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${activeGame.color}`}>
                  {activeGame.icon}
                </div>
                <h2 className="font-bold text-[#2D3436] text-lg">{activeGame.title}</h2>
              </div>
              <button 
                onClick={handleCloseGame}
                className="bg-[#F8FAFC] p-2 rounded-full text-[#2D3436]"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 relative overflow-hidden bg-[#F8FAFC]">
              {pointsEarned === null ? (
                <activeGame.component profile={profile} onWin={handleWin} onExit={handleCloseGame} />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center animate-in zoom-in duration-300">
                  <div className="text-8xl mb-6 animate-bounce">🏆</div>
                  <h2 className="text-3xl font-black text-[#2D3436] mb-4">You Won!</h2>
                  <div className="flex items-center gap-2 bg-[#FFF3E0] px-6 py-3 rounded-full mb-8">
                    <Star className="text-[#FDCB6E] fill-current" size={32} />
                    <span className="text-2xl font-bold text-[#E17055]">+{pointsEarned} Stars</span>
                  </div>
                  <button 
                    onClick={handleCloseGame}
                    className="w-full max-w-xs bg-[#6C5CE7] text-white py-4 rounded-2xl font-bold text-lg active:scale-95 transition-transform"
                  >
                    Play Another Game
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
