import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChildProfile } from '../../data';
import { Music, Play, X } from 'lucide-react';

interface Props {
  profile: ChildProfile;
}

interface Poem {
  id: string;
  title: string;
  videoUrl: string;
  thumbnail: string;
}

const POEMS_2_4: Poem[] = [
  { id: 'p1', title: 'Johny Johny Yes Papa', videoUrl: 'https://www.youtube.com/embed/F4tHL8reNCs', thumbnail: '👶' },
  { id: 'p2', title: 'Old MacDonald Had a Farm', videoUrl: 'https://www.youtube.com/embed/_6HzoUcx3eo', thumbnail: '🐄' },
  { id: 'p3', title: 'The Wheels on the Bus', videoUrl: 'https://www.youtube.com/embed/e_04ZrNroTo', thumbnail: '🚌' },
  { id: 'p4', title: 'The Itsy Bitsy Spider', videoUrl: 'https://www.youtube.com/embed/w_lCi8U49mY', thumbnail: '🕷️' },
  { id: 'p5', title: 'Twinkle Star & Little Bee', videoUrl: 'https://www.youtube.com/embed/yCjJyiqpAuU', thumbnail: '⭐' },
  { id: 'p6', title: 'Humpty Dumpty', videoUrl: 'https://www.youtube.com/embed/nrv495corBc', thumbnail: '🥚' },
  { id: 'p7', title: 'Baa Baa Black Sheep', videoUrl: 'https://www.youtube.com/embed/CRvQ-Y_EbqQ', thumbnail: '🐑' },
  { id: 'p8', title: 'Hickory Dickory Dock', videoUrl: 'https://www.youtube.com/embed/HGgsklW-mtg', thumbnail: '🕰️' },
  { id: 'p9', title: 'Five Little Monkeys', videoUrl: 'https://www.youtube.com/embed/b0NHrFNZWh0', thumbnail: '🐒' },
  { id: 'p10', title: 'Row, Row, Row Your Boat', videoUrl: 'https://www.youtube.com/embed/7otAJa3jui8', thumbnail: '🚣' },
  { id: 'p11', title: 'Rain, Rain, Go Away', videoUrl: 'https://www.youtube.com/embed/LFrKYjrIDs8', thumbnail: '🌧️' },
  { id: 'p12', title: 'Five Red Apples', videoUrl: 'https://www.youtube.com/embed/vO6s6u0dIOs', thumbnail: '🍎' },
];

const POEMS_4_6: Poem[] = [
  { id: 'p13', title: 'The Rainbow Bridge', videoUrl: 'https://www.youtube.com/embed/nRTdq0VsLGQ', thumbnail: '🌈' },
  { id: 'p14', title: 'Counting Friendly Dinosaurs', videoUrl: 'https://www.youtube.com/embed/TjmGTbNjSJQ', thumbnail: '🦕' },
  { id: 'p15', title: 'Seeds in the Spring Garden', videoUrl: 'https://www.youtube.com/embed/cRhGOdqWIIo', thumbnail: '🌱' },
  { id: 'p16', title: 'The Phonics ABC Song', videoUrl: 'https://www.youtube.com/embed/hq3yfQnllfQ', thumbnail: '🔤' },
];

const POEMS_6_10: Poem[] = [
  { id: 'p17', title: 'Journey Through the Solar System', videoUrl: 'https://www.youtube.com/embed/F2prtmPEjOc', thumbnail: '🪐' },
  { id: 'p18', title: 'The Secret of the Old Oak Tree', videoUrl: 'https://www.youtube.com/embed/7V1Uj_1JzEQ', thumbnail: '🌳' },
  { id: 'p19', title: 'The Robot Who Learned to Paint', videoUrl: 'https://www.youtube.com/embed/1_Y28GGEVf0', thumbnail: '🤖' },
  { id: 'p20', title: 'The Water Cycle Adventure', videoUrl: 'https://www.youtube.com/embed/TWb4KlM2vts', thumbnail: '💧' },
];

export function PoemsView({ profile }: Props) {
  const [playingVideo, setPlayingVideo] = useState<Poem | null>(null);

  let agePoems: Poem[] = [];
  if (profile.age >= 2 && profile.age <= 4) {
    agePoems = POEMS_2_4;
  } else if (profile.age >= 5 && profile.age <= 6) {
    agePoems = POEMS_4_6;
  } else {
    agePoems = POEMS_6_10;
  }

  return (
    <div className="flex flex-col space-y-6 pt-4 pb-32 px-4 h-full overflow-y-auto relative">
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-teal-100 p-2 rounded-xl text-teal-600">
          <Music size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-black text-[#2D3436]">Poems</h1>
          <p className="text-sm font-medium text-[#636E72]">Sing and learn along!</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {agePoems.map((poem) => (
          <div 
            key={poem.id}
            onClick={() => setPlayingVideo(poem)}
            className="bg-white rounded-3xl p-4 shadow-sm border border-[#F1F3F5] flex flex-col items-center cursor-pointer active:scale-95 transition-transform text-center space-y-3"
          >
            <div className="text-6xl bg-[#F8FAFC] w-full py-6 rounded-2xl flex items-center justify-center relative overflow-hidden">
              {poem.thumbnail}
              <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                <div className="bg-white/90 p-3 rounded-full shadow-sm text-[#6C5CE7]">
                  <Play size={20} className="ml-1" />
                </div>
              </div>
            </div>
            <h3 className="font-bold text-[#2D3436] leading-tight text-sm px-1">
              {poem.title}
            </h3>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {playingVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex flex-col"
          >
            <div className="p-4 flex justify-end">
              <button 
                onClick={() => setPlayingVideo(null)}
                className="bg-white/20 p-2 rounded-full text-white backdrop-blur-md"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center px-4 pb-20">
              <div className="w-full max-w-3xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl relative">
                <iframe 
                  src={`${playingVideo.videoUrl}?autoplay=1`} 
                  title={playingVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full object-cover border-0"
                />
              </div>
            </div>
            <div className="absolute bottom-10 left-0 right-0 text-center px-6">
               <h2 className="text-white font-bold text-xl">{playingVideo.title}</h2>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
