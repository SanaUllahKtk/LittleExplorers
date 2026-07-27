import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { ArrowLeft, Bot, Lightbulb, CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { ChildProfile } from '../../data';

interface Props {
  subject: string;
  profile: ChildProfile;
  onBack: () => void;
  onComplete: () => void;
}

import { getSubjectProgress, incrementSubjectProgress } from '../../lib/progress';

interface Question {
  question: string;
  imageEmoji?: string;
  type: 'mcq';
  options: string[];
  correctAnswer: string;
}

export function LessonView({ subject, profile, onBack, onComplete }: Props) {
  const [loading, setLoading] = useState(true);
  const [questionCount, setQuestionCount] = useState(() => getSubjectProgress(subject));
  const [question, setQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [hint, setHint] = useState<string | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [loadingHint, setLoadingHint] = useState(false);
  const [loadingSolve, setLoadingSolve] = useState(false);

  useEffect(() => {
    fetchQuestion();
  }, [subject]);

  const fetchQuestion = async () => {
    if (questionCount >= 5) {
      setQuestion(null);
      return;
    }
    setLoading(true);
    setIsCorrect(null);
    setHint(null);
    setExplanation(null);
    setSelectedAnswer('');
    try {
      const res = await fetch('/api/generate-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, age: profile.age, level: profile.level })
      });
      const data = await res.json();
      setQuestion(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const [checkingAnswer, setCheckingAnswer] = useState(false);

  const checkAnswer = async () => {
    if (!question || !selectedAnswer.trim()) return;
    
    const correct = selectedAnswer.trim() === question.correctAnswer.trim();
    if (correct) {
      const nextCount = incrementSubjectProgress(subject);
      setQuestionCount(nextCount);
    }
    setIsCorrect(correct);
  };

  const getHint = async () => {
    if (!question) return;
    setLoadingHint(true);
    try {
      const res = await fetch('/api/hint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: question.question, options: question.options, type: question.type, age: profile.age, level: profile.level })
      });
      const data = await res.json();
      setHint(data.hint);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingHint(false);
    }
  };

  const solveWithAI = async () => {
    if (!question) return;
    setLoadingSolve(true);
    try {
      const res = await fetch('/api/solve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: question.question, options: question.options, type: question.type, correctAnswer: question.correctAnswer, age: profile.age, level: profile.level })
      });
      const data = await res.json();
      setExplanation(data.explanation);
      setIsCorrect(true);
      setSelectedAnswer(question.correctAnswer || '');
      const nextCount = incrementSubjectProgress(subject);
      setQuestionCount(nextCount);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingSolve(false);
    }
  };

  if (questionCount >= 5 && !question) {
    return (
      <div className="flex flex-col h-full bg-white relative">
        <div className="flex items-center p-4 border-b border-[#F1F3F5]">
          <button onClick={onBack} className="w-10 h-10 rounded-full flex items-center justify-center bg-[#F8FAFC] text-[#2D3436] hover:bg-[#F1F5F9]">
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-xl font-bold text-[#2D3436] ml-4 flex-1 text-center pr-10">{subject}</h2>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <CheckCircle2 className="text-green-500 mb-4" size={64} />
          <h2 className="text-2xl font-bold text-[#2D3436] mb-4">All done!</h2>
          <p className="text-lg text-[#636E72] mb-8">Your {subject} Practice for today has been finished, come tomorrow to learn more!</p>
          <Button onClick={onComplete} className="w-full bg-[#6C5CE7] text-white hover:bg-[#5A4FCF] py-4 rounded-xl font-bold text-lg shadow-md">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center h-full">
        <Sparkles className="animate-spin text-[#6C5CE7] mb-4" size={48} />
        <p className="text-[#2D3436] font-bold animate-pulse">Generating your lesson...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white relative">
      <div className="flex items-center p-4 border-b border-[#F1F3F5]">
        <button onClick={onBack} className="w-10 h-10 rounded-full flex items-center justify-center bg-[#F8FAFC] text-[#2D3436] hover:bg-[#F1F5F9]">
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-xl font-bold text-[#2D3436] ml-4 flex-1 text-center pr-10">{subject}</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-6 pb-32">
        {question && (
          <div className="space-y-6">
            {question.imageEmoji && (
              <div className="flex justify-center mb-6 text-7xl bg-[#F8FAFC] p-8 rounded-3xl border border-[#F1F3F5] shadow-sm">
                {question.imageEmoji}
              </div>
            )}
            <h3 className="text-2xl font-extrabold text-[#2D3436] leading-tight mb-8 text-center">
              {question.question}
            </h3>

            {question.type === 'mcq' && Array.isArray(question.options) ? (
              <div className="space-y-3">
                {question.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (isCorrect !== true) {
                        setSelectedAnswer(opt);
                        if (isCorrect === false) setIsCorrect(null);
                      }
                    }}
                    disabled={isCorrect === true}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all font-bold text-lg
                      ${selectedAnswer === opt 
                        ? 'border-[#6C5CE7] bg-[#EEF2FF] text-[#6C5CE7]' 
                        : 'border-[#E2E8F0] bg-white text-[#2D3436] hover:border-[#CBD5E1]'}
                    `}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            ) : null}

            {isCorrect !== true && selectedAnswer && (
              <Button onClick={checkAnswer} disabled={checkingAnswer} className="w-full bg-[#6C5CE7] text-white py-4 rounded-2xl font-bold text-lg shadow-md hover:bg-[#5A4FCF]">
                {checkingAnswer ? 'Checking...' : 'Check Answer'}
              </Button>
            )}

            <AnimatePresence>
              {hint && isCorrect !== true && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-4 bg-yellow-50 rounded-xl border border-yellow-200 flex gap-3 items-start"
                >
                  <Lightbulb className="text-yellow-500 shrink-0 mt-0.5" size={20} />
                  <p className="text-yellow-700 font-medium text-sm leading-relaxed">{hint}</p>
                </motion.div>
              )}
              {isCorrect === false && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border-2 border-red-200 rounded-2xl p-5"
                >
                  <div className="flex items-center gap-3 text-red-500 mb-4">
                    <XCircle size={24} />
                    <span className="font-bold text-lg">Oops! That's not quite right.</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button onClick={getHint} disabled={loadingHint || !!hint} className="w-full bg-white border border-red-200 text-red-500 hover:bg-red-100">
                      <Lightbulb size={18} className="mr-2" />
                      {loadingHint ? 'Thinking...' : hint ? 'Hint loaded' : 'Get Hint'}
                    </Button>
                    <Button onClick={solveWithAI} disabled={loadingSolve} className="w-full bg-white border border-red-200 text-[#6C5CE7] hover:bg-indigo-50">
                      <Bot size={18} className="mr-2" />
                      {loadingSolve ? 'Thinking...' : 'Solve with AI'}
                    </Button>
                  </div>
                </motion.div>
              )}

              {isCorrect === true && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border-2 border-green-200 rounded-2xl p-5"
                >
                  <div className="flex items-center gap-3 text-green-500 mb-2">
                    <CheckCircle2 size={24} />
                    <span className="font-bold text-lg">Great job! You got it right!</span>
                  </div>
                  {explanation && (
                    <div className="mt-4 p-4 bg-white rounded-xl flex gap-3 items-start">
                      <Bot className="text-[#6C5CE7] shrink-0 mt-0.5" size={20} />
                      <p className="text-[#2D3436] font-medium text-sm leading-relaxed">{explanation}</p>
                    </div>
                  )}
                  <Button onClick={fetchQuestion} className="w-full mt-4 bg-green-500 text-white hover:bg-green-600">
                    Next Question
                  </Button>
                  <Button onClick={onComplete} className="w-full mt-2 bg-transparent text-green-700 hover:bg-green-100">
                    Back to Home
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
