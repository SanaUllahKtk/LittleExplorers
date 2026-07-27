import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Sparkles, Brain } from 'lucide-react';

export function ScreenTimeSubView({ limit: initialLimit, onSave, onBack }: { limit?: number, onSave?: (limit: number) => void, onBack: () => void }) {
  const [limit, setLimit] = useState(initialLimit || 60);

  return (
    <div className="flex flex-col gap-6 animate-in slide-in-from-right-4 duration-300">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm text-[#64748B] hover:text-[#1E293B] font-bold">←</button>
        <h2 className="text-xl font-bold text-[#1E293B]">Screen Time Limit</h2>
      </div>
      
      <Card className="p-6 bg-white border-[#F1F5F9] text-center shadow-md">
        <div className="text-6xl mb-4">⏳</div>
        <h3 className="text-lg font-bold text-[#1E293B] mb-2">Daily Allowance</h3>
        <p className="text-sm text-[#64748B] mb-8">Set how much time your child can spend learning and playing each day.</p>
        
        <div className="flex items-center justify-center gap-6 mb-8">
          <button onClick={() => setLimit(Math.max(15, limit - 15))} className="w-12 h-12 rounded-full bg-[#F1F5F9] text-[#1E293B] font-bold text-xl active:scale-95 transition-transform">-</button>
          <div className="w-24">
            <span className="text-4xl font-black text-primary">{limit}</span>
            <span className="text-sm font-bold text-[#94A3B8] ml-1">m</span>
          </div>
          <button onClick={() => setLimit(Math.min(180, limit + 15))} className="w-12 h-12 rounded-full bg-[#F1F5F9] text-[#1E293B] font-bold text-xl active:scale-95 transition-transform">+</button>
        </div>

        <input 
          type="range" 
          min="15" 
          max="180" 
          step="15" 
          value={limit} 
          onChange={(e) => setLimit(Number(e.target.value))}
          className="w-full h-2 bg-[#E2E8F0] rounded-lg appearance-none cursor-pointer accent-primary" 
        />
        <div className="flex justify-between text-xs font-bold text-[#94A3B8] mt-2 mb-8">
          <span>15m</span>
          <span>3h</span>
        </div>

        <button 
          onClick={() => onSave ? onSave(limit) : onBack()}
          className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary-hover active:scale-[0.98] transition-all shadow-md"
        >
          OK
        </button>
      </Card>
    </div>
  );
}

export function ReportsSubView({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col gap-6 animate-in slide-in-from-right-4 duration-300">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm text-[#64748B] hover:text-[#1E293B] font-bold">←</button>
        <h2 className="text-xl font-bold text-[#1E293B]">AI Progress Report</h2>
      </div>

      <div className="bg-gradient-to-br from-primary-light to-white p-5 rounded-[32px] border border-primary-light relative overflow-hidden shadow-md">
        <div className="absolute right-[-10px] top-[-10px] opacity-20">
          <Sparkles size={100} className="text-primary" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3 text-primary-hover">
            <Brain size={20} />
            <span className="font-bold text-xs uppercase tracking-wider">AI Analysis</span>
          </div>
          <h3 className="text-xl font-black text-[#1E293B] mb-3 leading-tight">Excelling in<br/>Mathematics! 🚀</h3>
          <p className="text-sm text-[#475569] leading-relaxed mb-5">
            Based on this week's activity, strong pattern recognition and counting skills are present. Slight struggles with phonic sounds (C and K). I recommend focusing next week's sessions on early reading.
          </p>
          
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-white/50">
            <h4 className="font-bold text-[#1E293B] text-sm mb-2">Strengths</h4>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-xs font-bold">Counting</span>
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-xs font-bold">Shapes</span>
            </div>
            <h4 className="font-bold text-[#1E293B] text-sm mb-2">Needs Review</h4>
            <div className="flex flex-wrap gap-2">
              <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-md text-xs font-bold">Phonics</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LearningPlanSubView({ onBack }: { onBack: () => void }) {
  const [focus, setFocus] = useState('montessori');

  return (
    <div className="flex flex-col gap-6 animate-in slide-in-from-right-4 duration-300">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm text-[#64748B] hover:text-[#1E293B] font-bold">←</button>
        <h2 className="text-xl font-bold text-[#1E293B]">Learning Plan</h2>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-[#1E293B] text-sm px-1">Educational Focus</h3>
        
        <Card 
          onClick={() => setFocus('standard')} 
          className={`p-4 cursor-pointer transition-all ${focus === 'standard' ? 'border-2 border-primary bg-primary-light/30 shadow-md' : 'bg-white border-[#F1F5F9] shadow-sm'}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-3xl">📚</div>
              <div>
                <h4 className="font-bold text-[#1E293B]">Standard Core</h4>
                <p className="text-xs text-[#64748B] mt-0.5">Traditional curriculum</p>
              </div>
            </div>
            {focus === 'standard' && <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">✓</div>}
          </div>
        </Card>

        <Card 
          onClick={() => setFocus('montessori')} 
          className={`p-4 cursor-pointer transition-all ${focus === 'montessori' ? 'border-2 border-[#10B981] bg-[#ECFDF5] shadow-md' : 'bg-white border-[#F1F5F9] shadow-sm'}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-3xl">🌱</div>
              <div>
                <h4 className="font-bold text-[#1E293B]">Montessori</h4>
                <p className="text-xs text-[#64748B] mt-0.5">Self-directed, hands-on</p>
              </div>
            </div>
            {focus === 'montessori' && <div className="w-6 h-6 bg-[#10B981] rounded-full flex items-center justify-center text-white text-xs font-bold">✓</div>}
          </div>
        </Card>

        <Card 
          onClick={() => setFocus('stem')} 
          className={`p-4 cursor-pointer transition-all ${focus === 'stem' ? 'border-2 border-[#F59E0B] bg-[#FFFBEB] shadow-md' : 'bg-white border-[#F1F5F9] shadow-sm'}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-3xl">🔬</div>
              <div>
                <h4 className="font-bold text-[#1E293B]">STEM Explorer</h4>
                <p className="text-xs text-[#64748B] mt-0.5">Science & logic heavy</p>
              </div>
            </div>
            {focus === 'stem' && <div className="w-6 h-6 bg-[#F59E0B] rounded-full flex items-center justify-center text-white text-xs font-bold">✓</div>}
          </div>
        </Card>
      </div>
    </div>
  );
}
