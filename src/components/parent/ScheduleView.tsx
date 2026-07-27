import React from 'react';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { Card } from '../ui/Card';

export function ScheduleView({ childName }: { childName: string }) {
  // Simple deterministic schedule based on child's name length to vary the content slightly
  const scheduleVariations = [
    [
      { id: 1, time: '09:00 AM', lesson: 'Space Counting', type: 'Math', duration: '20 min' },
      { id: 2, time: '10:30 AM', lesson: 'Animal Sounds', type: 'Science', duration: '15 min' },
      { id: 3, time: '02:00 PM', lesson: 'Color Mixing', type: 'Art', duration: '30 min' },
      { id: 4, time: '04:00 PM', lesson: 'Story Time: Mars', type: 'Reading', duration: '20 min' },
    ],
    [
      { id: 1, time: '08:30 AM', lesson: 'Morning Reading', type: 'Reading', duration: '20 min' },
      { id: 2, time: '10:00 AM', lesson: 'Number Blocks', type: 'Math', duration: '25 min' },
      { id: 3, time: '01:00 PM', lesson: 'Dinosaur Bones', type: 'Science', duration: '30 min' },
      { id: 4, time: '03:30 PM', lesson: 'Finger Painting', type: 'Art', duration: '40 min' },
    ],
    [
      { id: 1, time: '09:15 AM', lesson: 'Phonics Fun', type: 'Reading', duration: '20 min' },
      { id: 2, time: '11:00 AM', lesson: 'Shape Sorting', type: 'Math', duration: '15 min' },
      { id: 3, time: '01:30 PM', lesson: 'Plant Lifecycle', type: 'Science', duration: '20 min' },
      { id: 4, time: '04:15 PM', lesson: 'Music Makers', type: 'Art', duration: '30 min' },
    ]
  ];

  const schedule = scheduleVariations[childName.length % scheduleVariations.length];

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#1E293B]">{childName}'s Schedule</h2>
        <div className="bg-white px-3 py-1.5 rounded-full shadow-sm text-sm font-bold text-primary flex items-center gap-2 border border-primary-light">
          <CalendarIcon size={16} />
          <span>Today</span>
        </div>
      </div>

      <div className="space-y-4">
        {schedule.map((item, i) => (
          <div key={item.id} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="text-xs font-bold text-[#94A3B8] w-16 text-right pt-1">{item.time}</div>
              <div className={`w-0.5 h-full ${i === schedule.length - 1 ? 'bg-transparent' : 'bg-[#E2E8F0]'} mt-2`}></div>
            </div>
            <Card className="flex-1 p-4 mb-4 bg-white border-[#F1F5F9] shadow-sm relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary"></div>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-[#1E293B]">{item.lesson}</h4>
                  <p className="text-[11px] font-bold text-primary uppercase tracking-wider mt-1">{item.type}</p>
                </div>
                <div className="flex items-center gap-1 text-[#94A3B8] text-xs font-bold bg-[#F8FAFC] px-2 py-1 rounded-md">
                  <Clock size={12} />
                  {item.duration}
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
