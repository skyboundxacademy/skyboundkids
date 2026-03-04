'use client';

import React, { useState, useEffect } from 'react';

interface BoardContent {
    type: 'welcome' | 'lesson' | 'video' | 'image' | 'question' | 'practice' | 'celebration';
    title?: string;
    content?: string;
    mediaUrl?: string;
    question?: string;
    options?: string[];
    correctAnswer?: string;
    onAnswer?: (answer: string) => void;
}

interface BoardProps {
    content?: BoardContent;
    onFullscreen?: () => void;
    isFullscreen?: boolean;
}

export default function Board({ content, onFullscreen, isFullscreen = false }: BoardProps) {
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [showFeedback, setShowFeedback] = useState<boolean>(false);
    const [backgroundPattern, setBackgroundPattern] = useState<'clouds' | 'stars' | 'none'>('clouds');

    // Handle answer selection
    const handleAnswer = (answer: string) => {
        setSelectedAnswer(answer);
        setShowFeedback(true);
        if (content?.onAnswer) {
            content.onAnswer(answer);
        }
    };

    // Reset state when content changes
    useEffect(() => {
        setSelectedAnswer(null);
        setShowFeedback(false);
    }, [content]);

    // Default welcome content
    const defaultContent: BoardContent = {
        type: 'welcome',
        title: 'Welcome to Xtreme Kids Academy!',
        content: 'The magical Board is ready for your learning adventure.',
    };

    const displayContent = content || defaultContent;

    // Get background pattern
    const getBackgroundStyle = () => {
        if (displayContent.type === 'celebration') {
            return 'bg-gradient-to-br from-yellow-50 to-pink-50';
        }
        if (backgroundPattern === 'clouds') {
            return 'bg-gradient-to-b from-blue-50 to-white';
        }
        if (backgroundPattern === 'stars') {
            return 'bg-gradient-to-br from-indigo-900 to-purple-900';
        }
        return 'bg-white';
    };

    return (
        <div
            className={`
        relative rounded-3xl shadow-2xl overflow-hidden transition-all duration-500
        ${isFullscreen ? 'fixed inset-0 z-40' : 'w-full h-full'}
        ${getBackgroundStyle()}
      `}
        >
            {/* Background decorations */}
            {backgroundPattern === 'clouds' && displayContent.type !== 'celebration' && (
                <div className="absolute inset-0 opacity-30">
                    <div className="cloud cloud-1"></div>
                    <div className="cloud cloud-2"></div>
                    <div className="cloud cloud-3"></div>
                </div>
            )}

            {/* Stars background */}
            {backgroundPattern === 'stars' && (
                <div className="absolute inset-0">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-2 h-2 bg-white rounded-full animate-pulse"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 2}s`,
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Celebration confetti */}
            {displayContent.type === 'celebration' && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(50)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute animate-confetti"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: '-20px',
                                backgroundColor: ['#E63946', '#FFD166', '#6A4E9B', '#22C55E', '#3B82F6'][Math.floor(Math.random() * 5)],
                                width: `${Math.random() * 10 + 5}px`,
                                height: `${Math.random() * 10 + 5}px`,
                                borderRadius: Math.random() > 0.5 ? '50%' : '0',
                                animationDelay: `${Math.random() * 2}s`,
                                animationDuration: `${Math.random() * 2 + 2}s`,
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Fullscreen button */}
            {onFullscreen && (
                <button
                    onClick={onFullscreen}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white shadow-md transition-all hover:scale-110"
                    title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
                >
                    {isFullscreen ? (
                        <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        </svg>
                    )}
                </button>
            )}

            {/* Content area */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center p-8">
                {/* Title */}
                {displayContent.title && (
                    <h2 className="text-3xl font-kid font-bold text-gray-800 mb-6 text-center text-shadow">
                        {displayContent.title}
                    </h2>
                )}

                {/* Content based on type */}
                {displayContent.type === 'welcome' && (
                    <div className="text-center">
                        <p className="text-xl text-gray-700 font-kid">{displayContent.content}</p>
                        <div className="mt-8 text-6xl">📚</div>
                    </div>
                )}

                {displayContent.type === 'lesson' && (
                    <div className="text-center max-w-2xl">
                        <p className="text-2xl text-gray-700 font-kid leading-relaxed">
                            {displayContent.content}
                        </p>
                        {displayContent.mediaUrl && (
                            <img
                                src={displayContent.mediaUrl}
                                alt="Lesson media"
                                className="mt-6 max-w-md mx-auto rounded-xl shadow-lg"
                            />
                        )}
                    </div>
                )}

                {displayContent.type === 'video' && (
                    <div className="w-full max-w-4xl">
                        {displayContent.mediaUrl ? (
                            <div className="aspect-video rounded-xl overflow-hidden shadow-2xl bg-black">
                                <iframe
                                    src={displayContent.mediaUrl}
                                    className="w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        ) : (
                            <div className="aspect-video bg-gray-200 rounded-xl flex items-center justify-center">
                                <p className="text-gray-500">Video placeholder</p>
                            </div>
                        )}
                    </div>
                )}

                {displayContent.type === 'image' && displayContent.mediaUrl && (
                    <div className="text-center">
                        <img
                            src={displayContent.mediaUrl}
                            alt="Lesson content"
                            className="max-w-lg mx-auto rounded-2xl shadow-xl"
                        />
                        {displayContent.content && (
                            <p className="mt-6 text-xl text-gray-700 font-kid">{displayContent.content}</p>
                        )}
                    </div>
                )}

                {(displayContent.type === 'question' || displayContent.type === 'practice') && (
                    <div className="text-center w-full max-w-xl">
                        <p className="text-2xl font-kid text-gray-800 mb-8">
                            {displayContent.question}
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                            {displayContent.options?.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleAnswer(option)}
                                    disabled={showFeedback}
                                    className={`
                    p-6 rounded-2xl text-xl font-kid font-semibold transition-all transform hover:scale-105
                    ${selectedAnswer === option
                                            ? showFeedback
                                                ? option === displayContent.correctAnswer
                                                    ? 'bg-green-500 text-white'
                                                    : 'bg-red-500 text-white'
                                                : 'bg-[#E63946] text-white'
                                            : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-[#E63946] hover:bg-red-50'
                                        }
                    ${showFeedback && option === displayContent.correctAnswer ? 'bg-green-500 text-white' : ''}
                  `}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>

                        {/* Feedback message */}
                        {showFeedback && (
                            <div className={`mt-6 p-4 rounded-xl ${selectedAnswer === displayContent.correctAnswer ? 'bg-green-100' : 'bg-yellow-100'}`}>
                                <p className="text-lg font-kid font-semibold">
                                    {selectedAnswer === displayContent.correctAnswer
                                        ? '🎉 Correct! Great job!'
                                        : `Not quite! The correct answer is: ${displayContent.correctAnswer}`}
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {displayContent.type === 'celebration' && (
                    <div className="text-center">
                        <div className="text-8xl mb-6">🏆</div>
                        <h2 className="text-4xl font-kid font-bold text-[#E63946] mb-4">Amazing!</h2>
                        <p className="text-2xl font-kid text-gray-700">{displayContent.content}</p>
                    </div>
                )}
            </div>

            <style jsx>{`
        .cloud {
          position: absolute;
          background: white;
          border-radius: 50px;
          opacity: 0.8;
        }
        .cloud-1 {
          width: 100px;
          height: 40px;
          top: 20%;
          left: 10%;
          animation: float 20s linear infinite;
        }
        .cloud-2 {
          width: 80px;
          height: 30px;
          top: 40%;
          right: 15%;
          animation: float 25s linear infinite reverse;
        }
        .cloud-3 {
          width: 120px;
          height: 50px;
          bottom: 20%;
          left: 30%;
          animation: float 22s linear infinite;
        }
        @keyframes float {
          from { transform: translateX(-100%); }
          to { transform: translateX(100vw); }
        }
        .animate-confetti {
          animation: confetti-fall 3s ease-in-out forwards;
        }
        @keyframes confetti-fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
        </div>
    );
}
