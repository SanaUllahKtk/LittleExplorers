import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChildProfile } from '../../data';
import { Gift, Star, Check } from 'lucide-react';

interface Props {
  profile: ChildProfile;
  onUpdateProfile?: (profile: ChildProfile) => void;
}

interface StoreItem {
  id: string;
  type: 'avatar' | 'theme';
  name: string;
  value: string;
  price: number;
  icon: string;
}

const STORE_ITEMS: StoreItem[] = [
  { id: 'av1', type: 'avatar', name: 'Cool Cat', value: '😎🐱', price: 50, icon: '😎' },
  { id: 'av2', type: 'avatar', name: 'Magic Unicorn', value: '🦄', price: 100, icon: '🦄' },
  { id: 'av3', type: 'avatar', name: 'Space Explorer', value: '🧑‍🚀', price: 150, icon: '🚀' },
  { id: 'av4', type: 'avatar', name: 'Friendly Dinosaur', value: '🦖', price: 100, icon: '🦖' },
  { id: 'th1', type: 'theme', name: 'Ocean Blue', value: 'theme-ocean', price: 150, icon: '🌊' },
  { id: 'th2', type: 'theme', name: 'Forest Green', value: 'theme-forest', price: 150, icon: '🌲' },
  { id: 'th3', type: 'theme', name: 'Sunset Pink', value: 'theme-sunset', price: 150, icon: '🌅' },
  { id: 'th4', type: 'theme', name: 'Galaxy Purple', value: 'theme-galaxy', price: 200, icon: '🌌' },
];

export function StoreView({ profile, onUpdateProfile }: Props) {
  const [purchasedMessage, setPurchasedMessage] = useState<string | null>(null);

  const purchasedItems = profile.purchasedItems || [];
  
  const handlePurchase = (item: StoreItem) => {
    if (profile.stars >= item.price && !purchasedItems.includes(item.id)) {
      if (onUpdateProfile) {
        const newProfile = {
          ...profile,
          stars: profile.stars - item.price,
          purchasedItems: [...purchasedItems, item.id],
        };
        
        if (item.type === 'avatar') {
          newProfile.avatar = item.value;
        } else if (item.type === 'theme') {
          newProfile.theme = item.value;
        }
        
        onUpdateProfile(newProfile);
        
        setPurchasedMessage(`You bought ${item.name}!`);
        setTimeout(() => setPurchasedMessage(null), 3000);
      }
    }
  };
  
  const handleEquip = (item: StoreItem) => {
    if (onUpdateProfile && purchasedItems.includes(item.id)) {
      const newProfile = { ...profile };
      if (item.type === 'avatar') {
        newProfile.avatar = item.value;
      } else if (item.type === 'theme') {
        newProfile.theme = item.value;
      }
      onUpdateProfile(newProfile);
    }
  };

  const isEquipped = (item: StoreItem) => {
    if (item.type === 'avatar') return profile.avatar === item.value;
    if (item.type === 'theme') return profile.theme === item.value;
    return false;
  };

  return (
    <div className="flex flex-col space-y-6 pt-4 pb-32 px-4 h-full overflow-y-auto relative">
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-amber-100 p-2 rounded-xl text-amber-600">
          <Gift size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-black text-[#2D3436]">Star Store</h1>
          <p className="text-sm font-medium text-[#636E72]">Spend your stars here!</p>
        </div>
      </div>
      
      {purchasedMessage && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="bg-[#00B894] text-white p-4 rounded-2xl font-bold text-center shadow-md"
        >
          {purchasedMessage}
        </motion.div>
      )}

      <div>
        <h2 className="text-xl font-bold text-[#2D3436] mb-4">Avatars</h2>
        <div className="grid grid-cols-2 gap-4">
          {STORE_ITEMS.filter(i => i.type === 'avatar').map(item => (
            <StoreCard 
              key={item.id}
              item={item}
              stars={profile.stars}
              isPurchased={purchasedItems.includes(item.id)}
              isEquipped={isEquipped(item)}
              onPurchase={() => handlePurchase(item)}
              onEquip={() => handleEquip(item)}
            />
          ))}
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-bold text-[#2D3436] mb-4">Themes</h2>
        <div className="grid grid-cols-2 gap-4">
          {STORE_ITEMS.filter(i => i.type === 'theme').map(item => (
            <StoreCard 
              key={item.id}
              item={item}
              stars={profile.stars}
              isPurchased={purchasedItems.includes(item.id)}
              isEquipped={isEquipped(item)}
              onPurchase={() => handlePurchase(item)}
              onEquip={() => handleEquip(item)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function StoreCard({ 
  item, 
  stars, 
  isPurchased, 
  isEquipped, 
  onPurchase, 
  onEquip 
}: { 
  key?: string;
  item: StoreItem; 
  stars: number; 
  isPurchased: boolean; 
  isEquipped: boolean; 
  onPurchase: () => void; 
  onEquip: () => void;
}) {
  const canAfford = stars >= item.price;
  
  return (
    <div className="bg-white rounded-3xl p-4 shadow-sm border border-[#F1F3F5] flex flex-col items-center text-center">
      <div className="text-5xl mb-3 bg-[#F8FAFC] w-full py-4 rounded-2xl flex items-center justify-center">
        {item.type === 'avatar' ? item.value : item.icon}
      </div>
      <h3 className="font-bold text-[#2D3436] text-sm mb-2 h-10">{item.name}</h3>
      
      {isEquipped ? (
        <div className="w-full bg-[#00B894] text-white py-2 rounded-xl font-bold text-sm flex items-center justify-center gap-1">
          <Check size={16} /> Equipped
        </div>
      ) : isPurchased ? (
        <button 
          onClick={onEquip}
          className="w-full bg-[#F1F3F5] text-[#2D3436] py-2 rounded-xl font-bold text-sm active:scale-95 transition-transform"
        >
          Equip
        </button>
      ) : (
        <button 
          onClick={onPurchase}
          disabled={!canAfford}
          className={`w-full py-2 rounded-xl font-bold text-sm flex items-center justify-center gap-1 active:scale-95 transition-transform ${
            canAfford ? 'bg-[#6C5CE7] text-white' : 'bg-slate-100 text-slate-400 cursor-not-allowed'
          }`}
        >
          <Star size={14} className={canAfford ? 'fill-current' : ''} /> {item.price}
        </button>
      )}
    </div>
  );
}
