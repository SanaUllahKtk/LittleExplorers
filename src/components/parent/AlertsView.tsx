import React from 'react';
import { Trophy, ShieldAlert, Star } from 'lucide-react';
import { Card } from '../ui/Card';

export function AlertsView({ childName }: { childName: string }) {
  const alertsVariations = [
    [
      { id: 1, type: 'achievement', title: 'Goal Reached!', message: `${childName} completed their 45 min reading goal.`, time: '10 mins ago', icon: Trophy, color: 'text-yellow-500', bg: 'bg-yellow-50' },
      { id: 2, type: 'system', title: 'Screen Time Warning', message: `${childName} has 5 minutes left of screen time.`, time: '1 hour ago', icon: ShieldAlert, color: 'text-orange-500', bg: 'bg-orange-50' },
      { id: 3, type: 'reward', title: 'New Badge Earned', message: `${childName} earned the "Space Explorer" badge.`, time: '2 hours ago', icon: Star, color: 'text-indigo-500', bg: 'bg-indigo-50' },
    ],
    [
      { id: 1, type: 'system', title: 'Session Completed', message: `${childName} finished the Morning Math session.`, time: '25 mins ago', icon: Trophy, color: 'text-green-500', bg: 'bg-green-50' },
      { id: 2, type: 'achievement', title: 'Perfect Score!', message: `${childName} got all answers right in spelling.`, time: '3 hours ago', icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-50' },
    ],
    [
      { id: 1, type: 'reward', title: 'New Badge Earned', message: `${childName} earned the "Artist" badge.`, time: 'Just now', icon: Star, color: 'text-purple-500', bg: 'bg-purple-50' },
      { id: 2, type: 'achievement', title: 'Weekly Goal Met!', message: `${childName} practiced reading for 3 days in a row.`, time: 'Yesterday', icon: Trophy, color: 'text-yellow-500', bg: 'bg-yellow-50' },
    ]
  ];

  const alerts = alertsVariations[childName.length % alertsVariations.length];

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#1E293B]">Notifications</h2>
        <span className="bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">{alerts.length} New</span>
      </div>

      <div className="space-y-3">
        {alerts.map(alert => (
          <Card key={alert.id} className="p-4 bg-white border-[#F1F5F9] shadow-sm flex gap-4 items-start">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${alert.bg} ${alert.color}`}>
              <alert.icon size={20} />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-[#1E293B] text-sm">{alert.title}</h4>
              <p className="text-xs text-[#64748B] mt-0.5 leading-relaxed">{alert.message}</p>
              <p className="text-[10px] text-[#94A3B8] font-bold mt-2 uppercase tracking-wider">{alert.time}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
