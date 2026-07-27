export type { ChildProfile, Activity, Subject, Reward } from './types';
import { ChildProfile, Activity, Subject, Reward } from './types';

export const MOCK_PROFILES: ChildProfile[] = [
  {
    id: '1',
    name: 'Leo',
    age: 4,
    avatar: '🦁',
    language: 'English',
    level: 'Level 1',
    stars: 120,
    streak: 5,
    progress: 40,
    settings: {
      screenTimeLimit: 60,
      bedTime: '20:00',
      allowedCategories: ['math', 'reading', 'logic', 'creativity']
    }
  },
  {
    id: '2',
    name: 'Mia',
    age: 7,
    avatar: '🐰',
    language: 'English',
    level: 'Level 3',
    stars: 450,
    streak: 12,
    progress: 75,
    settings: {
      screenTimeLimit: 120,
      bedTime: '21:00',
      allowedCategories: ['math', 'reading', 'logic', 'science', 'art']
    }
  },
];

export const MOCK_SUBJECTS: Subject[] = [
  { id: 'math', name: 'Math', icon: 'Calculator', color: 'bg-blue-100 text-blue-600' },
  { id: 'reading', name: 'Reading', icon: 'BookOpen', color: 'bg-orange-100 text-orange-600' },
  { id: 'science', name: 'Science', icon: 'FlaskConical', color: 'bg-green-100 text-green-600' },
  { id: 'art', name: 'Art', icon: 'Palette', color: 'bg-pink-100 text-pink-600' },
  { id: 'logic', name: 'Logic', icon: 'Puzzle', color: 'bg-purple-100 text-purple-600' },
];

export function getSubjectsForAge(age: number): Subject[] {
  if (age >= 2 && age <= 4) {
    return [
      { id: 'alphabet', name: 'Alphabet Recognition', icon: 'Type', color: 'bg-red-100 text-red-600' },
      { id: 'numbers', name: 'Numbers 1–20', icon: 'Hash', color: 'bg-blue-100 text-blue-600' },
      { id: 'colors', name: 'Colours', icon: 'Palette', color: 'bg-yellow-100 text-yellow-600' },
      { id: 'shapes', name: 'Shapes', icon: 'Triangle', color: 'bg-green-100 text-green-600' },
      { id: 'animals', name: 'Animals', icon: 'Cat', color: 'bg-orange-100 text-orange-600' },
      { id: 'fruits_veg', name: 'Fruits & Vegetables', icon: 'Apple', color: 'bg-pink-100 text-pink-600' },
      { id: 'body_parts', name: 'Body Parts', icon: 'User', color: 'bg-purple-100 text-purple-600' },
      { id: 'nursery_rhymes', name: 'Nursery Rhymes', icon: 'Music', color: 'bg-teal-100 text-teal-600' },
      { id: 'matching_games', name: 'Matching Games', icon: 'Copy', color: 'bg-indigo-100 text-indigo-600' },
      { id: 'sensory', name: 'Sensory Activities', icon: 'Eye', color: 'bg-rose-100 text-rose-600' },
      { id: 'fine_motor', name: 'Fine Motor Skills', icon: 'Hand', color: 'bg-cyan-100 text-cyan-600' },
      { id: 'listening', name: 'Listening Activities', icon: 'Ear', color: 'bg-lime-100 text-lime-600' },
    ];
  } else if (age >= 5 && age <= 6) {
    return [
      { id: 'phonics', name: 'Phonics', icon: 'Mic', color: 'bg-blue-100 text-blue-600' },
      { id: 'reading_ready', name: 'Reading Readiness', icon: 'BookOpen', color: 'bg-red-100 text-red-600' },
      { id: 'writing_prac', name: 'Writing Practice', icon: 'PenTool', color: 'bg-green-100 text-green-600' },
      { id: 'counting', name: 'Counting', icon: 'Hash', color: 'bg-yellow-100 text-yellow-600' },
      { id: 'basic_math', name: 'Basic Addition & Subtraction', icon: 'PlusSquare', color: 'bg-purple-100 text-purple-600' },
      { id: 'time', name: 'Time', icon: 'Clock', color: 'bg-pink-100 text-pink-600' },
      { id: 'calendar', name: 'Calendar', icon: 'Calendar', color: 'bg-teal-100 text-teal-600' },
      { id: 'science_exp', name: 'Science Exploration', icon: 'FlaskConical', color: 'bg-indigo-100 text-indigo-600' },
      { id: 'nature', name: 'Nature', icon: 'Leaf', color: 'bg-green-100 text-green-600' },
      { id: 'geo_basics', name: 'Geography Basics', icon: 'Globe', color: 'bg-blue-100 text-blue-600' },
      { id: 'practical_life', name: 'Practical Life Skills', icon: 'Tool', color: 'bg-orange-100 text-orange-600' },
      { id: 'art_creative', name: 'Art & Creativity', icon: 'Palette', color: 'bg-rose-100 text-rose-600' },
      { id: 'music', name: 'Music', icon: 'Music', color: 'bg-cyan-100 text-cyan-600' },
      { id: 'logical_think', name: 'Logical Thinking', icon: 'Puzzle', color: 'bg-lime-100 text-lime-600' },
    ];
  } else {
    // 6-10 years old and fallback
    return [
      { id: 'english', name: 'English', icon: 'BookText', color: 'bg-blue-100 text-blue-600' },
      { id: 'mathematics', name: 'Mathematics', icon: 'Calculator', color: 'bg-red-100 text-red-600' },
      { id: 'science', name: 'Science', icon: 'FlaskConical', color: 'bg-green-100 text-green-600' },
      { id: 'social_studies', name: 'Social Studies', icon: 'Users', color: 'bg-yellow-100 text-yellow-600' },
      { id: 'geography', name: 'Geography', icon: 'Globe', color: 'bg-purple-100 text-purple-600' },
      { id: 'coding_basics', name: 'Coding Basics', icon: 'Code', color: 'bg-pink-100 text-pink-600' },
      { id: 'general_know', name: 'General Knowledge', icon: 'Lightbulb', color: 'bg-teal-100 text-teal-600' },
      { id: 'read_comp', name: 'Reading Comprehension', icon: 'BookOpen', color: 'bg-indigo-100 text-indigo-600' },
      { id: 'grammar', name: 'Grammar', icon: 'Type', color: 'bg-green-100 text-green-600' },
      { id: 'vocabulary', name: 'Vocabulary', icon: 'WholeWord', color: 'bg-blue-100 text-blue-600' },
      { id: 'creative_write', name: 'Creative Writing', icon: 'PenTool', color: 'bg-orange-100 text-orange-600' },
      { id: 'stem', name: 'STEM Activities', icon: 'Rocket', color: 'bg-rose-100 text-rose-600' },
      { id: 'prob_solve', name: 'Problem Solving', icon: 'Puzzle', color: 'bg-cyan-100 text-cyan-600' },
      { id: 'crit_think', name: 'Critical Thinking', icon: 'Brain', color: 'bg-lime-100 text-lime-600' },
      { id: 'edu_quiz', name: 'Educational Quizzes', icon: 'HelpCircle', color: 'bg-teal-100 text-teal-600' },
    ];
  }
}

export const MOCK_ACTIVITIES: Activity[] = [
  {
    id: 'a1',
    title: 'Counting 1 to 10',
    subject: 'math',
    duration: 15,
    date: new Date().toISOString(),
    type: 'lesson',
    score: 100,
  },
  {
    id: 'a2',
    title: 'Animal Sounds',
    subject: 'science',
    duration: 10,
    date: new Date().toISOString(),
    type: 'game',
  },
  {
    id: 'a3',
    title: 'The Hungry Bear',
    subject: 'reading',
    duration: 20,
    date: new Date(Date.now() - 86400000).toISOString(),
    type: 'story',
  },
  {
    id: 'a4',
    title: 'Shapes Matching',
    subject: 'logic',
    duration: 12,
    date: new Date(Date.now() - 86400000 * 2).toISOString(),
    type: 'quiz',
    score: 85,
  },
];

export const MOCK_REWARDS: Reward[] = [
  { id: 'r1', title: 'First 10 Stars', type: 'badge', image: '🌟', earnedAt: new Date().toISOString() },
  { id: 'r2', title: 'Reading Champion', type: 'badge', image: '📚' },
  { id: 'r3', title: 'Little Fox Pet', type: 'pet', image: '🦊' },
];
