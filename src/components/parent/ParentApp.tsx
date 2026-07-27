import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { MOCK_PROFILES } from '../../data';
import { 
  BarChart3,
  Calendar,
  Bell,
  Settings,
  LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ScheduleView } from './ScheduleView';
import { AlertsView } from './AlertsView';
import { SettingsView } from './SettingsView';
import { ScreenTimeSubView, ReportsSubView, LearningPlanSubView } from './StatsSubViews';

import { ChildProfile } from '../../data';
import { AddChildProfile } from './AddChildProfile';

interface Props {
  profiles: ChildProfile[];
  onAddProfile: (profile: ChildProfile) => void;
  onUpdateProfile?: (profile: ChildProfile) => void;
  onLogout: () => void;
  currentPin: string;
  onUpdatePin: (pin: string) => void;
  parentAccount?: { name: string; email: string; password: string; };
  onUpdateParentAccount?: (account: any) => void;
}

export function ParentApp({ 
  profiles, 
  onAddProfile, 
  onUpdateProfile, 
  onLogout, 
  currentPin, 
  onUpdatePin,
  parentAccount,
  onUpdateParentAccount
}: Props) {
  const [activeTab, setActiveTab] = useState('stats');
  const [activeChildId, setActiveChildId] = useState(profiles[0]?.id);
  const [statsSubView, setStatsSubView] = useState<'main' | 'screentime' | 'reports' | 'plan'>('main');
  const [isAddingChild, setIsAddingChild] = useState(false);

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] overflow-hidden w-full relative">
      <div className="flex-1 overflow-y-auto px-8 py-6 pb-24">
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#1E293B]">Parent Hub</h2>
          <div className="flex gap-2 items-center">
            <div className="w-10 h-10 bg-[#E2E8F0] rounded-full flex items-center justify-center text-sm font-bold text-slate-600">JD</div>
            <Button variant="ghost" size="icon" onClick={onLogout} className="text-slate-400 hover:text-slate-600 w-10 h-10 rounded-full">
              <LogOut size={18} />
            </Button>
          </div>
        </div>

        {/* Child Switcher */}
        {!isAddingChild && (
          <div className="flex gap-3 mb-8 overflow-x-auto hide-scrollbar">
            {profiles.map((profile, i) => {
              const isActive = profile.id === activeChildId;
              return (
                <div key={profile.id} onClick={() => setActiveChildId(profile.id)} className={`flex flex-col items-center gap-1 cursor-pointer transition-opacity ${isActive ? 'opacity-100' : 'opacity-40'}`}>
                  <div className={`w-14 h-14 rounded-full border-4 p-0.5 transition-colors ${isActive ? 'border-primary' : 'border-transparent'}`}>
                    <div className={`w-full h-full ${i % 2 === 0 ? 'bg-[#FFD93D]' : 'bg-[#FF8E71]'} rounded-full flex items-center justify-center text-2xl`}>{profile.avatar}</div>
                  </div>
                  <span className="text-[10px] font-bold text-[#1E293B]">{profile.name}</span>
                </div>
              );
            })}
            <div className="flex flex-col items-center gap-1 cursor-pointer" onClick={() => setIsAddingChild(true)}>
              <div className="w-14 h-14 rounded-full bg-slate-200 border-2 border-dashed border-slate-400 flex items-center justify-center text-slate-500 mt-1 mb-0.5 text-xl">+</div>
              <span className="text-[10px] font-bold text-[#64748B]">Add</span>
            </div>
          </div>
        )}

        {isAddingChild ? (
          <AddChildProfile 
            onAdd={(profile) => {
              onAddProfile(profile);
              setActiveChildId(profile.id);
              setIsAddingChild(false);
            }} 
            onCancel={() => setIsAddingChild(false)} 
          />
        ) : (
          <AnimatePresence mode="wait">
          {activeTab === 'stats' && (
            <motion.div
              key="stats"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {statsSubView === 'main' && (
                <div className="animate-in fade-in slide-in-from-left-4 duration-300">
                  {/* Stats Cards */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-3xl shadow-sm border border-[#F1F5F9]">
                      <span className="text-xs text-[#94A3B8] font-semibold">Screen Time</span>
                      <div className="flex items-end gap-1 mt-1 mb-2">
                        <h3 className="text-2xl font-bold text-[#1E293B] leading-none">42</h3>
                        <span className="text-[10px] text-[#64748B] mb-0.5">mins</span>
                      </div>
                      <div className="w-full bg-[#F1F5F9] h-1.5 rounded-full">
                        <div className="bg-primary h-1.5 rounded-full w-[70%]"></div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-3xl shadow-sm border border-[#F1F5F9]">
                      <span className="text-xs text-[#94A3B8] font-semibold">Lessons</span>
                      <div className="flex items-end gap-1 mt-1 mb-2">
                        <h3 className="text-2xl font-bold text-[#1E293B] leading-none">12</h3>
                        <span className="text-[10px] text-[#64748B] mb-0.5">this week</span>
                      </div>
                      <div className="flex gap-1 h-1.5">
                        <div className="h-full w-full bg-green-400 rounded-sm"></div>
                        <div className="h-full w-full bg-green-400 rounded-sm"></div>
                        <div className="h-full w-3/4 bg-slate-200 rounded-sm"></div>
                      </div>
                    </div>
                  </div>

                  {/* Settings Quick Menu */}
                  <div className="space-y-3">
                    <div onClick={() => setStatsSubView('screentime')} className="bg-primary-light p-4 rounded-[24px] flex items-center justify-between cursor-pointer active:scale-[0.98] transition-transform">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-lg">⏳</div>
                         <div>
                           <p className="text-sm font-bold text-[#1E293B]">Screen Time Limit</p>
                           <p className="text-[10px] text-primary font-semibold">{profiles.find(p => p.id === activeChildId)?.settings.screenTimeLimit || 60} min daily limit</p>
                         </div>
                      </div>
                      <div className="w-10 h-5 bg-primary rounded-full relative">
                        <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                      </div>
                    </div>

                    <div onClick={() => setStatsSubView('reports')} className="bg-white p-4 rounded-[24px] flex items-center justify-between border border-[#F1F5F9] cursor-pointer active:scale-[0.98] transition-transform">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 bg-[#F8FAFC] rounded-xl flex items-center justify-center shadow-sm text-lg">📊</div>
                         <div>
                           <p className="text-sm font-bold text-[#1E293B]">Progress Reports</p>
                           <p className="text-[10px] text-[#94A3B8]">Monthly summary available</p>
                         </div>
                      </div>
                      <div className="text-[#CBD5E1] font-bold">→</div>
                    </div>

                    <div onClick={() => setStatsSubView('plan')} className="bg-white p-4 rounded-[24px] flex items-center justify-between border border-[#F1F5F9] cursor-pointer active:scale-[0.98] transition-transform">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 bg-[#F8FAFC] rounded-xl flex items-center justify-center shadow-sm text-lg">🗺️</div>
                         <div>
                           <p className="text-sm font-bold text-[#1E293B]">Learning Plan</p>
                           <p className="text-[10px] text-[#94A3B8]">Montessori focus active</p>
                         </div>
                      </div>
                      <div className="text-[#CBD5E1] font-bold">→</div>
                    </div>
                  </div>
                </div>
              )}
              {statsSubView === 'screentime' && (
                <ScreenTimeSubView 
                  limit={profiles.find(p => p.id === activeChildId)?.settings.screenTimeLimit || 60}
                  onSave={(newLimit) => {
                    const p = profiles.find(p => p.id === activeChildId);
                    if (p && onUpdateProfile) {
                      onUpdateProfile({ ...p, settings: { ...p.settings, screenTimeLimit: newLimit } });
                    }
                    setStatsSubView('main');
                  }}
                  onBack={() => setStatsSubView('main')} 
                />
              )}
              {statsSubView === 'reports' && <ReportsSubView onBack={() => setStatsSubView('main')} />}
              {statsSubView === 'plan' && <LearningPlanSubView onBack={() => setStatsSubView('main')} />}
            </motion.div>
          )}

          {activeTab === 'schedule' && (
            <motion.div key="schedule" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ScheduleView childName={profiles.find(p => p.id === activeChildId)?.name || ''} />
            </motion.div>
          )}

          {activeTab === 'alerts' && (
            <motion.div key="alerts" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <AlertsView childName={profiles.find(p => p.id === activeChildId)?.name || ''} />
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <SettingsView 
                onLogout={onLogout} 
                currentPin={currentPin} 
                onUpdatePin={onUpdatePin} 
                parentAccount={parentAccount}
                onUpdateParentAccount={onUpdateParentAccount}
              />
            </motion.div>
          )}
        </AnimatePresence>
        )}
      </div>

      {/* Parent Nav Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-white border-t border-[#F1F5F9] flex justify-around items-center px-4 pb-4 pt-2 z-20">
        <ParentNavButton icon={<BarChart3 />} label="Stats" isActive={activeTab === 'stats'} onClick={() => { setActiveTab('stats'); setStatsSubView('main'); }} />
        <ParentNavButton icon={<Calendar />} label="Schedule" isActive={activeTab === 'schedule'} onClick={() => setActiveTab('schedule')} />
        <ParentNavButton icon={<Bell />} label="Alerts" isActive={activeTab === 'alerts'} onClick={() => setActiveTab('alerts')} />
        <ParentNavButton icon={<Settings />} label="Settings" isActive={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
      </div>
    </div>
  );
}

function ParentNavButton({ icon, label, isActive, onClick }: { icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void }) {
  const colorClass = isActive ? 'text-primary' : 'text-[#94A3B8]';
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
      <span className="text-[9px] font-bold uppercase tracking-wider">{label}</span>
    </div>
  );
}
