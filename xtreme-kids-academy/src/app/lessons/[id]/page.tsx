'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Lesson step types
type LessonStep = {
    id: number;
    type: 'greeting' | 'look-around' | 'teach' | 'practice' | 'celebrate' | 'next-prompt';
    title: string;
    content: string;
    images?: string[];
    options?: string[];
    correctAnswer?: string;
};

// Mock lesson data
const lessonData = {
    id: '1',
    title: 'Nouns – People and Places',
    subject: 'English',
    totalSteps: 6,
    steps: [
        {
            id: 1,
            type: 'greeting',
            title: 'Hello!',
            content: "Hi Ada! How are you feeling today?",
            options: ['😊 Happy', '😴 Tired', '😲 Excited'],
        },
        {
            id: 2,
            type: 'look-around',
            title: 'Look Around',
            content: "Look around your room. What do you see?",
            images: ['bed', 'window', 'toy'],
        },
        {
            id: 3,
            type: 'teach',
            title: 'Learn About Nouns',
            content: "A noun is a person, animal, place, or thing. Bed is a noun because it's a thing!",
            images: ['bed', 'carpet', 'lamp'],
        },
        {
            id: 4,
            type: 'practice',
            title: 'Time to Practice!',
            content: 'Which one is a noun?',
            options: ['Running', 'Apple', 'Happy'],
            correctAnswer: 'Apple',
        },
        {
            id: 5,
            type: 'celebrate',
            title: 'Great Job!',
            content: "You did it! You're a noun expert! 🎉",
        },
        {
            id: 6,
            type: 'next-prompt',
            title: 'What Next?',
            content: "Want to learn another noun? Or play a game?",
            options: ['More Lessons', 'Play Games'],
        },
    ] as LessonStep[],
};

// Park states
type ParkState = 'idle' | 'talking' | 'pointing' | 'celebrating' | 'thinking';

export default function LessonPage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [parkState, setParkState] = useState<ParkState>('talking');
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [showConfetti, setShowConfetti] = useState(false);
    const [speaking, setSpeaking] = useState(false);

    const step = lessonData.steps[currentStep];
    const progress = ((currentStep + 1) / lessonData.totalSteps) * 100;

    // Update Park state based on step type
    useEffect(() => {
        switch (step.type) {
            case 'greeting':
            case 'look-around':
            case 'teach':
                setParkState('talking');
                break;
            case 'practice':
                setParkState('thinking');
                break;
            case 'celebrate':
                setParkState('celebrating');
                setShowConfetti(true);
                setTimeout(() => setShowConfetti(false), 3000);
                break;
            case 'next-prompt':
                setParkState('idle');
                break;
        }
    }, [currentStep, step.type]);

    const handleAnswer = (answer: string) => {
        setSelectedAnswer(answer);

        if (step.type === 'practice') {
            const correct = answer === step.correctAnswer;
            setIsCorrect(correct);

            if (correct) {
                setParkState('celebrating');
                setShowConfetti(true);
                setTimeout(() => {
                    setShowConfetti(false);
                    setIsCorrect(null);
                    setSelectedAnswer(null);
                    if (currentStep < lessonData.totalSteps - 1) {
                        setCurrentStep(currentStep + 1);
                    }
                }, 2000);
            } else {
                setParkState('talking');
                setTimeout(() => {
                    setIsCorrect(null);
                    setSelectedAnswer(null);
                    setParkState('thinking');
                }, 2000);
            }
        } else if (step.type === 'greeting') {
            // Move to next step after greeting
            setTimeout(() => {
                setCurrentStep(currentStep + 1);
            }, 1000);
        } else if (step.type === 'next-prompt') {
            if (answer === 'More Lessons') {
                // Navigate to lessons
                window.location.href = '/lessons';
            } else {
                // Navigate to games
                window.location.href = '/games';
            }
        }
    };

    const handleNext = () => {
        if (currentStep < lessonData.totalSteps - 1) {
            setCurrentStep(currentStep + 1);
            setSelectedAnswer(null);
            setIsCorrect(null);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-red-50 flex flex-col">
            {/* Top Bar */}
            <header className="bg-white shadow-sm px-6 py-3 flex items-center justify-between z-10">
                <div className="flex items-center gap-4">
                    <Link href="/child-dashboard" className="flex items-center gap-2 text-gray-600 hover:text-[#E63946] transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="font-parent">Exit</span>
                    </Link>
                    <div className="h-6 w-px bg-gray-300" />
                    <h1 className="font-kid text-xl font-bold text-gray-800">{lessonData.title}</h1>
                    <span className="badge-red text-xs">{lessonData.subject}</span>
                </div>

                {/* Progress Bar */}
                <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 font-parent">
                        Step {currentStep + 1} of {lessonData.totalSteps}
                    </span>
                    <div className="w-32 h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-[#E63946] to-[#FFD166] rounded-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex">
                {/* Board Area - 70% */}
                <div className="flex-[7] p-6 flex items-center justify-center">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl h-full max-h-[600px] p-8 relative overflow-hidden">
                        {/* Confetti Effect */}
                        {showConfetti && (
                            <div className="absolute inset-0 pointer-events-none">
                                {[...Array(50)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="absolute animate-confetti"
                                        style={{
                                            left: `${Math.random() * 100}%`,
                                            top: -20,
                                            animationDelay: `${Math.random() * 2}s`,
                                            backgroundColor: ['#E63946', '#FFD166', '#6A4E9B', '#22C55E', '#3B82F6'][Math.floor(Math.random() * 5)],
                                            width: '10px',
                                            height: '10px',
                                            borderRadius: Math.random() > 0.5 ? '50%' : '0',
                                        }}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Step Content */}
                        <div className="h-full flex flex-col items-center justify-center text-center">
                            {/* Step Title */}
                            <h2 className="font-kid text-3xl font-bold text-[#E63946] mb-6">
                                {step.title}
                            </h2>

                            {/* Main Content */}
                            <p className="font-kid text-2xl text-gray-700 mb-8 max-w-2xl">
                                {step.content}
                            </p>

                            {/* Options/Buttons */}
                            {step.options && (
                                <div className="flex flex-wrap gap-4 justify-center">
                                    {step.options.map((option, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleAnswer(option)}
                                            disabled={selectedAnswer !== null}
                                            className={`
                        btn-primary text-xl px-8 py-4 min-w-[200px]
                        ${selectedAnswer === option && isCorrect !== null ? (
                                                    isCorrect ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
                                                ) : ''}
                        ${selectedAnswer === option && isCorrect === null ? 'ring-4 ring-red-200' : ''}
                        disabled:opacity-80
                      `}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Images Grid */}
                            {step.images && !step.options && (
                                <div className="grid grid-cols-3 gap-4">
                                    {step.images.map((img, index) => (
                                        <div key={index} className="bg-gray-100 rounded-2xl p-4 aspect-square flex items-center justify-center">
                                            <span className="text-6xl">🛏️</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Feedback Message */}
                            {isCorrect === true && (
                                <div className="mt-6 text-green-600 font-kid text-xl animate-bounce-gentle">
                                    🎉 Correct! Great job!
                                </div>
                            )}
                            {isCorrect === false && (
                                <div className="mt-6 text-red-600 font-kid text-xl">
                                    😅 Not quite! Try again!
                                </div>
                            )}

                            {/* Certificate (on celebrate step) */}
                            {step.type === 'celebrate' && (
                                <div className="mt-8 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-2xl p-6 border-4 border-yellow-400">
                                    <div className="text-6xl mb-4">🏆</div>
                                    <h3 className="font-kid text-2xl font-bold text-yellow-800">Noun Expert!</h3>
                                    <p className="text-yellow-700">You completed the lesson!</p>
                                    <button className="mt-4 btn-secondary text-sm">
                                        Print Certificate 🖨️
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Park Area - 30% */}
                <div className="flex-[3] flex flex-col items-center justify-end pb-6 pr-6">
                    {/* Park the Teddy */}
                    <div className={`
            relative w-64 h-80 flex items-center justify-center
            ${parkState === 'celebrating' ? 'animate-bounce-gentle' : ''}
            ${parkState === 'thinking' ? 'animate-pulse-soft' : ''}
          `}>
                        {/* Park Avatar */}
                        <div className="relative">
                            {/* Body */}
                            <div className="w-48 h-56 bg-amber-700 rounded-3xl relative">
                                {/* Ears */}
                                <div className="absolute -top-4 -left-4 w-12 h-12 bg-amber-700 rounded-full" />
                                <div className="absolute -top-4 -right-4 w-12 h-12 bg-amber-700 rounded-full" />

                                {/* Face */}
                                <div className="absolute top-12 left-1/2 -translate-x-1/2 w-40 h-32">
                                    {/* Eyes */}
                                    <div className="flex justify-center gap-8 mb-4">
                                        <div className={`w-6 h-6 bg-black rounded-full ${parkState === 'talking' ? 'animate-pulse' : ''}`}>
                                            <div className="w-2 h-2 bg-white rounded-full mt-1 ml-1" />
                                        </div>
                                        <div className={`w-6 h-6 bg-black rounded-full ${parkState === 'talking' ? 'animate-pulse' : ''}`}>
                                            <div className="w-2 h-2 bg-white rounded-full mt-1 ml-1" />
                                        </div>
                                    </div>

                                    {/* Nose */}
                                    <div className="w-6 h-4 bg-black rounded-full mx-auto mb-2" />

                                    {/* Mouth */}
                                    <div className={`
                    w-16 h-8 border-4 border-black rounded-b-full mx-auto
                    ${parkState === 'celebrating' ? 'bg-red-500' : ''}
                  `}>
                                        {parkState === 'talking' && (
                                            <div className="w-8 h-4 bg-red-400 rounded-full mx-auto mt-2 animate-pulse" />
                                        )}
                                    </div>
                                </div>

                                {/* Bowtie */}
                                <div className="absolute top-36 left-1/2 -translate-x-1/2">
                                    <div className="w-12 h-6 bg-[#E63946] rounded-full" />
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#E63946] rounded-full" />
                                </div>

                                {/* Cane */}
                                <div className={`absolute -right-8 top-24 transition-transform duration-300 ${parkState === 'pointing' ? 'rotate-12' : ''}`}>
                                    <div className="w-2 h-32 bg-amber-900 rounded-full" />
                                    <div className="absolute -top-2 -left-2 w-6 h-6 bg-amber-900 rounded-full" />
                                </div>
                            </div>
                        </div>

                        {/* Speech Bubble */}
                        <div className="absolute -top-20 left-0 bg-white rounded-2xl p-4 shadow-lg max-w-[280px]">
                            <p className="font-kid text-lg text-gray-700">
                                {step.content.substring(0, 80)}
                                {step.content.length > 80 ? '...' : ''}
                            </p>
                            <div className="absolute -bottom-3 left-8 w-6 h-6 bg-white transform rotate-45" />
                        </div>

                        {/* Voice Indicator */}
                        <div className="absolute -bottom-4 right-0">
                            <button className="w-12 h-12 bg-[#E63946] rounded-full flex items-center justify-center shadow-lg hover:bg-red-700 transition-colors">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {/* Bottom Navigation */}
            <footer className="bg-white shadow-lg px-6 py-4">
                <div className="flex justify-between items-center max-w-6xl mx-auto">
                    <button
                        onClick={() => currentStep > 0 && setCurrentStep(currentStep - 1)}
                        disabled={currentStep === 0}
                        className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        ← Back
                    </button>

                    {step.type !== 'practice' && step.type !== 'celebrate' && step.type !== 'next-prompt' && (
                        <button onClick={handleNext} className="btn-primary">
                            Next →
                        </button>
                    )}
                </div>
            </footer>

            {/* Styles for confetti animation */}
            <style jsx>{`
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-confetti {
          animation: confetti 3s ease-out forwards;
        }
      `}</style>
        </div>
    );
}
