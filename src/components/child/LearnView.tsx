import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChildProfile, getSubjectsForAge } from '../../data';
import { Sparkles, RefreshCw, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  profile: ChildProfile;
}

interface LearningCard {
  title: string;
  fact: string;
  emoji: string;
}

interface QuickInfo {
  info: string;
  emoji: string;
}

export function LearnView({ profile }: Props) {
  const ageSubjects = getSubjectsForAge(profile.age);
  const [activeSubject, setActiveSubject] = useState(ageSubjects[0].name);
  const [learningCards, setLearningCards] = useState<LearningCard[]>([]);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [quickInfo, setQuickInfo] = useState<QuickInfo | null>(null);
  const [loadingCard, setLoadingCard] = useState(false);
  const [loadingInfo, setLoadingInfo] = useState(false);

  useEffect(() => {
    fetchLearningCards(activeSubject);
  }, [activeSubject]);

  const fetchLearningCards = async (subject: string) => {
    setLoadingCard(true);
    try {
      const res = await fetch('/api/generate-learning-card', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject,
          age: profile.age,
          level: profile.level
        })
      });
      const data = await res.json();
      setLearningCards(Array.isArray(data) ? data : [data]);
      setActiveCardIndex(0);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingCard(false);
    }
  };

  const fetchQuickInfo = async () => {
    setLoadingInfo(true);
    try {
      const res = await fetch('/api/generate-quick-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          age: profile.age,
          level: profile.level
        })
      });
      const data = await res.json();
      setQuickInfo(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingInfo(false);
    }
  };

  const nextCard = () => {
    setActiveCardIndex((prev) => (prev + 1) % learningCards.length);
  };

  const prevCard = () => {
    setActiveCardIndex((prev) => (prev - 1 + learningCards.length) % learningCards.length);
  };

  const currentCard = learningCards[activeCardIndex];

  return (
    <div className="flex flex-col space-y-6">
      {/* Subject Tabs - Moved to the very top */}
      <div className="-mx-6 px-6 flex space-x-2 overflow-x-auto pb-2 pt-2 scrollbar-hide">
        {ageSubjects.map((sub) => (
          <button
            key={sub.id}
            onClick={() => setActiveSubject(sub.name)}
            className={`px-5 py-2.5 rounded-2xl font-bold whitespace-nowrap transition-all flex-shrink-0 ${
              activeSubject === sub.name 
                ? 'bg-[#6C5CE7] text-white shadow-md' 
                : 'bg-white text-[#636E72] border border-[#F1F3F5]'
            }`}
          >
            {sub.name}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3 mb-2">
        <div className="bg-[#6C5CE7]/10 p-2 rounded-xl text-[#6C5CE7]">
          <BookOpen size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-black text-[#2D3436]">Learn</h1>
          <p className="text-sm font-medium text-[#636E72]">Discover new things today!</p>
        </div>
      </div>

      {/* Learning Card Carousel */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#F1F3F5] min-h-[250px] flex flex-col justify-center relative overflow-hidden">
        {loadingCard ? (
          <div className="flex justify-center items-center h-full">
            <RefreshCw className="w-8 h-8 text-[#6C5CE7] animate-spin" />
          </div>
        ) : currentCard ? (
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSubject + activeCardIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="text-center px-8"
              >
                <div className="text-6xl mb-4">{currentCard.emoji}</div>
                <h3 className="text-xl font-black text-[#2D3436] mb-3">{currentCard.title}</h3>
                <p className="text-[#636E72] leading-relaxed font-medium">{currentCard.fact}</p>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            {learningCards.length > 1 && (
              <>
                <button
                  onClick={prevCard}
                  className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#F1F3F5] text-[#636E72] hover:bg-[#E2E6EA] transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextCard}
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#F1F3F5] text-[#636E72] hover:bg-[#E2E6EA] transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}

            {/* Indicator Dots */}
            {learningCards.length > 1 && (
              <div className="flex justify-center gap-1.5 mt-6">
                {learningCards.map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 rounded-full transition-all ${
                      i === activeCardIndex ? 'w-6 bg-[#6C5CE7]' : 'w-2 bg-[#E2E6EA]'
                    }`}
                  />
                ))}
              </div>
            )}
            
            <button 
              onClick={() => fetchLearningCards(activeSubject)}
              className="mt-6 flex items-center justify-center gap-2 mx-auto text-sm font-bold text-[#6C5CE7] bg-[#6C5CE7]/10 px-4 py-2 rounded-full hover:bg-[#6C5CE7]/20 transition-colors"
            >
              <RefreshCw size={16} /> Load New Cards
            </button>
          </div>
        ) : null}
      </div>

      {/* Quick Information Section */}
      <div className="mt-8">
        <h4 className="font-bold text-[#2D3436] text-sm mb-3 px-1 uppercase tracking-wider flex items-center gap-2">
          <Sparkles size={16} className="text-[#FDCB6E]" /> Quick Information
        </h4>
        
        {!quickInfo ? (
          <button 
            onClick={fetchQuickInfo}
            disabled={loadingInfo}
            className="w-full bg-gradient-to-r from-[#FF9A9E] to-[#FECFEF] text-white font-black py-4 rounded-3xl shadow-md active:scale-95 transition-transform flex justify-center items-center gap-2"
          >
            {loadingInfo ? <RefreshCw className="animate-spin" /> : "Tell me something cool! 🤯"}
          </button>
        ) : (
          <div className="bg-gradient-to-r from-[#FF9A9E] to-[#FECFEF] rounded-3xl p-5 shadow-md text-white relative">
            {loadingInfo ? (
              <div className="flex justify-center items-center py-6">
                <RefreshCw className="w-8 h-8 animate-spin" />
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-start gap-4"
              >
                <div className="text-4xl">{quickInfo.emoji}</div>
                <div className="flex-1">
                  <p className="font-bold text-lg leading-snug">{quickInfo.info}</p>
                  <button 
                    onClick={fetchQuickInfo}
                    className="mt-3 text-xs font-black bg-white/20 px-3 py-1.5 rounded-full hover:bg-white/30 transition-colors inline-flex items-center gap-1"
                  >
                    <RefreshCw size={12} /> More
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>

    </div>
  );
}
