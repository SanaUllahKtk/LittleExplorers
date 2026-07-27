export type Role = 'child' | 'parent';

export type EducationalLevel = 'Level 1' | 'Level 2' | 'Level 3';

export interface ChildProfileSettings {
  screenTimeLimit: number;
  bedTime: string;
  allowedCategories: string[];
}

export interface ChildProfile {
  id: string;
  name: string;
  age: number;
  avatar: string;
  theme?: string;
  language: string;
  level: EducationalLevel;
  stars: number;
  streak: number;
  progress: number;
  purchasedItems?: string[];
  settings: ChildProfileSettings;
}

export interface Activity {
  id: string;
  title: string;
  subject: string;
  duration: number; // in minutes
  date: string; // ISO date string
  score?: number;
  type: 'lesson' | 'game' | 'story' | 'quiz';
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface ScreenTimeConfig {
  dailyLimit: number; // minutes
  bedtimeStart: string; // HH:mm
  bedtimeEnd: string; // HH:mm
  bonusTime: number; // minutes
  isPaused: boolean;
}

export interface Reward {
  id: string;
  title: string;
  type: 'badge' | 'pet' | 'costume';
  image: string;
  earnedAt?: string;
}
