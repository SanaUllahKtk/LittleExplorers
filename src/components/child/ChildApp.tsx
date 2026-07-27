import React, { useState, useEffect } from 'react';
import { ChildProfile, getSubjectsForAge } from '../../data';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';
import { LessonView } from './LessonView';
import { LearnView } from './LearnView';
import { PoemsView } from './PoemsView';
import { GamesView } from './GamesView';
import { StoreView } from './StoreView';
import { getSubjectProgress } from '../../lib/progress';
import { 
  Home, 
  BookOpen, 
  Gamepad2, 
  BookType, 
  Gift, 
  Star,
  Flame,
  Play,
  Bot,
  Music,
  Trophy,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  profile: ChildProfile;
  allProfiles: ChildProfile[];
  onLogout: () => void;
  onUpdateProfile?: (profile: ChildProfile) => void;
}

export function ChildApp({ profile, allProfiles, onLogout, onUpdateProfile }: Props) {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const startLesson = (subject: string) => {
    setSelectedSubject(subject);
    setActiveTab('lesson');
  };

  return (
    <div className={`flex flex-col h-full overflow-hidden relative ${profile.theme || 'bg-white'}`}>
      {/* Header */}
      {activeTab !== 'lesson' && (
      <div className={`flex items-center justify-between px-6 py-4 z-10 ${profile.theme ? 'bg-transparent' : 'bg-white'}`}>
        <div className="flex items-center gap-3 cursor-pointer" onClick={onLogout}>
          <div className="w-12 h-12 bg-[#FFD93D] rounded-2xl flex items-center justify-center text-2xl shadow-sm">
            {profile.avatar}
          </div>
          <div>
            <h3 className="font-extrabold text-[#2D3436] text-lg leading-tight">Hi, {profile.name}!</h3>
            <span className="bg-[#FF8E71] inline-block text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">{profile.level}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-[#FFF3E0] px-3 py-1.5 rounded-2xl">
            <Star size={16} className="text-[#FDCB6E] fill-current" />
            <span className="font-bold text-[#E17055]">{profile.stars}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#F1F3F5] px-3 py-1.5 rounded-2xl">
            <Flame size={16} className="text-orange-500 fill-orange-500" />
            <span className="font-bold text-[#2D3436]">{profile.streak}</span>
          </div>
        </div>
      </div>
      )}

      {/* Main Content Area */}
      <div className={`flex-1 overflow-y-auto ${activeTab !== 'lesson' ? 'px-6 py-2 pb-32 space-y-5' : ''}`}>
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col space-y-5"
            >
              {/* Today's Missions */}
              <div className="space-y-4">
                <h4 className="font-bold text-[#2D3436] text-sm px-1 uppercase tracking-wider opacity-90">Today's Missions</h4>
                {getSubjectsForAge(profile.age).map((subject, i) => {
                  const progressCount = getSubjectProgress(subject.name);
                  const isCompleted = progressCount >= 5;
                  const progressPercent = Math.min((progressCount / 5) * 100, 100);
                  const gradients = [
                    'from-[#74EBD5] to-[#9FACE6]',
                    'from-[#FF9A9E] to-[#FECFEF]',
                    'from-[#a18cd1] to-[#fbc2eb]',
                    'from-[#ff9a44] to-[#fc6076]'
                  ];
                  const bgGradient = gradients[i % gradients.length];
                  
                  return (
                    <div key={subject.id} className={`bg-gradient-to-br ${bgGradient} rounded-[32px] p-5 text-white shadow-lg relative overflow-hidden`}>
                      <div className="relative z-10">
                        <h2 className="text-2xl font-black mb-2 leading-tight">{subject.name}</h2>
                        
                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex-1">
                            <div className="flex justify-between text-sm font-medium mb-1 text-white/90">
                              <span>Progress</span>
                              <span>{Math.round(progressPercent)}%</span>
                            </div>
                            <ProgressBar value={progressPercent} colorClass="bg-white" className="bg-black/10" />
                          </div>
                        </div>

                        {isCompleted ? (
                          <div className="text-sm font-bold bg-white/20 p-3 rounded-xl mb-3">
                            🎉 Congratulations you have completed your today's Practice.
                          </div>
                        ) : (
                          <div className="text-sm font-bold bg-white/20 p-3 rounded-xl mb-3">
                            Complete today's questions to maintain your streak
                          </div>
                        )}

                        <button 
                          onClick={() => startLesson(subject.name)} 
                          className="bg-white text-[#2D3436] font-black py-2 px-6 rounded-2xl text-sm shadow-md transition-transform active:scale-95"
                        >
                          {isCompleted ? "PRACTICE MORE" : "GO!"}
                        </button>
                      </div>
                      <div className="absolute -right-4 -bottom-4 text-8xl opacity-30">
                        {i === 0 ? '🚀' : i === 1 ? '🌟' : i === 2 ? '🎨' : '🎸'}
                      </div>
                    </div>
                  );
                })}
              </div>



              {/* AI Buddy Prompt */}
              <div className="bg-white border-2 border-[#F1F3F5] rounded-3xl p-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-[#6C5CE7] rounded-full flex items-center justify-center text-white shadow-inner shrink-0">
                  <Bot size={24} />
                </div>
                <p className="text-[11px] text-[#636E72] font-medium leading-relaxed">
                  "You're doing great, {profile.name}! Ready to learn about <b>Numbers</b> today?"
                </p>
              </div>

            </motion.div>
          )}

          {activeTab === 'lesson' && selectedSubject && (
            <motion.div
              key="lesson"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full absolute inset-0 bg-white z-30"
            >
              <LessonView 
                subject={selectedSubject}
                profile={profile}
                onBack={() => setActiveTab('home')}
                onComplete={() => setActiveTab('home')}
              />
            </motion.div>
          )}

          {activeTab === 'learn' && (
            <motion.div
              key="learn"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <LearnView profile={profile} />
            </motion.div>
          )}

          {activeTab === 'poems' && (
            <motion.div
              key="poems"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full"
            >
              <PoemsView profile={profile} />
            </motion.div>
          )}

          {activeTab === 'games' && (
            <motion.div
              key="games"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full"
            >
              <GamesView profile={profile} onUpdateProfile={onUpdateProfile} />
            </motion.div>
          )}

          {activeTab === 'rewards' && (
            <motion.div
              key="rewards"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full"
            >
              <StoreView profile={profile} onUpdateProfile={onUpdateProfile} />
            </motion.div>
          )}

          {activeTab !== 'home' && activeTab !== 'lesson' && activeTab !== 'learn' && activeTab !== 'poems' && activeTab !== 'games' && activeTab !== 'rewards' && (
            <motion.div
              key="other"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full flex flex-col items-center justify-center text-slate-400"
            >
              <div className="text-6xl mb-4">🚧</div>
              <h2 className="text-xl font-bold text-slate-600">Coming Soon!</h2>
              <p>This section is under construction.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Leaderboard Button */}
      <button 
        onClick={() => setShowLeaderboard(true)}
        className="absolute bottom-24 right-4 bg-[#FFD93D] p-3 rounded-full shadow-lg text-yellow-800 hover:scale-105 active:scale-95 transition-all z-30 flex items-center justify-center border-4 border-white"
      >
        <Trophy size={28} className="fill-yellow-600" />
      </button>

      {/* Leaderboard Modal */}
      <AnimatePresence>
        {showLeaderboard && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm"
            onClick={() => setShowLeaderboard(false)}
          >
            <div 
              className="bg-white w-full rounded-t-[32px] p-6 pb-8 shadow-2xl h-[70%] flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-yellow-100 p-2 rounded-xl text-yellow-600">
                    <Trophy size={24} className="fill-current" />
                  </div>
                  <h2 className="text-2xl font-black text-[#2D3436]">Leaderboard</h2>
                </div>
                <button 
                  onClick={() => setShowLeaderboard(false)}
                  className="bg-[#F1F3F5] p-2 rounded-full text-[#636E72]"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-col gap-3 overflow-y-auto flex-1 pb-4">
                {[...allProfiles].sort((a, b) => (b.stars || 0) - (a.stars || 0)).map((p, index) => {
                  const isMe = p.id === profile.id;
                  return (
                    <div 
                      key={p.id}
                      className={`flex items-center gap-4 p-4 rounded-2xl border-2 ${isMe ? 'bg-[#FFF3E0] border-[#FDCB6E]' : 'bg-white border-[#F1F3F5]'} shadow-sm`}
                    >
                      <div className="w-8 font-black text-xl text-[#B2BEC3] flex justify-center">
                        {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                      </div>
                      <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-2xl border border-[#F1F3F5]">
                        {p.avatar}
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-bold text-lg ${isMe ? 'text-[#E17055]' : 'text-[#2D3436]'}`}>
                          {p.name} {isMe && '(You)'}
                        </h3>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <div className="flex items-center gap-1 bg-[#FFF3E0] px-2 py-1 rounded-lg w-[72px] justify-end">
                          <Star size={14} className="text-[#FDCB6E] fill-current" />
                          <span className="font-bold text-[#E17055] text-sm">{p.stars || 0}</span>
                        </div>
                        <div className="flex items-center gap-1 bg-[#F1F3F5] px-2 py-1 rounded-lg w-[72px] justify-end">
                          <Flame size={14} className="text-orange-500 fill-current" />
                          <span className="font-bold text-[#2D3436] text-sm">{p.streak || 0}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-white border-t border-[#F1F3F5] flex justify-around items-center px-4 pb-4 pt-2 z-20">
        <NavButton 
          icon={<Home />} 
          label="Home" 
          isActive={activeTab === 'home'} 
          onClick={() => setActiveTab('home')} 
        />
        <NavButton 
          icon={<BookOpen />} 
          label="Learn" 
          isActive={activeTab === 'learn'} 
          onClick={() => setActiveTab('learn')} 
        />
        <NavButton 
          icon={<Music />} 
          label="Poems" 
          isActive={activeTab === 'poems'} 
          onClick={() => setActiveTab('poems')} 
        />
        <NavButton 
          icon={<Gamepad2 />} 
          label="Play" 
          isActive={activeTab === 'games'} 
          onClick={() => setActiveTab('games')} 
        />
        <NavButton 
          icon={<Gift />} 
          label="Store" 
          isActive={activeTab === 'rewards'} 
          onClick={() => setActiveTab('rewards')} 
        />
      </div>
    </div>
  );
}

function NavButton({ icon, label, isActive, onClick }: { icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void }) {
  const colorClass = isActive ? 'text-[#6C5CE7]' : 'text-[#B2BEC3]';
  return (
    <div 
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-16 h-16 ${colorClass} transition-colors cursor-pointer`}
    >
      <div className="mb-1">
        {React.cloneElement(icon as React.ReactElement, { 
          size: 24,
          strokeWidth: isActive ? 2.5 : 2
        })}
      </div>
      <span className="text-[10px] font-bold">{label}</span>
    </div>
  );
}
