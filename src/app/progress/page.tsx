'use client';

import { useState } from 'react';
import Link from 'next/link';

// Achievement/Badge types
type Badge = {
    id: string;
    name: string;
    description: string;
    icon: string;
    earned: boolean;
    earnedDate?: string;
};

// Certificate types
type Certificate = {
    id: string;
    title: string;
    date: string;
    lesson: string;
};

// Mock data
const childData = {
    name: 'Ada',
    level: 'Cadet',
    xp: 450,
    xpToNext: 1000,
    totalStars: 125,
    lessonsCompleted: 15,
    gamesPlayed: 32,
    streak: 5,
};

const badges: Badge[] = [
    { id: '1', name: 'Noun Master', description: 'Complete all noun lessons', icon: '🏆', earned: true, earnedDate: '2026-02-15' },
    { id: '2', name: 'Math Whiz', description: 'Score 100% in 5 math lessons', icon: '🧮', earned: true, earnedDate: '2026-02-20' },
    { id: '3', name: 'Word Hunter', description: 'Find 50 words in Word Hunt', icon: '🔍', earned: true, earnedDate: '2026-02-25' },
    { id: '4', name: 'Super Reader', description: 'Read 10 stories', icon: '📚', earned: false },
    { id: '5', name: 'Science Star', description: 'Complete all science lessons', icon: '🔬', earned: false },
    { id: '6', name: 'Game Champion', description: 'Win 50 games', icon: '🎮', earned: false },
    { id: '7', name: 'Streak Hero', description: 'Learn for 30 days in a row', icon: '🔥', earned: false },
    { id: '8', name: 'Artist', description: 'Complete 5 art activities', icon: '🎨', earned: false },
];

const certificates: Certificate[] = [
    { id: '1', title: 'Noun Expert', date: '2026-02-15', lesson: 'Nouns – People and Places' },
    { id: '2', title: 'Math Champion', date: '2026-02-20', lesson: 'Basic Addition' },
    { id: '3', title: 'Word Master', date: '2026-02-25', lesson: 'Word Hunt Level 5' },
];

// Level milestones
const levels = [
    { name: 'Cadet', xp: 0, icon: '⭐' },
    { name: 'Rookie', xp: 1000, icon: '🌟' },
    { name: 'Legend', xp: 2500, icon: '👑' },
    { name: 'Hero', xp: 5000, icon: '🦸' },
];

export default function ProgressPage() {
    const [activeTab, setActiveTab] = useState<'badges' | 'certificates' | 'stats'>('badges');

    const getProgressToNextLevel = () => {
        const currentLevelIndex = levels.findIndex(l => l.name === childData.level);
        const currentLevel = levels[currentLevelIndex];
        const nextLevel = levels[currentLevelIndex + 1];

        if (!nextLevel) return 100;

        const progress = ((childData.xp - currentLevel.xp) / (nextLevel.xp - currentLevel.xp)) * 100;
        return Math.min(progress, 100);
    };

    const getNextLevel = () => {
        const currentLevelIndex = levels.findIndex(l => l.name === childData.level);
        return levels[currentLevelIndex + 1];
    };

    const nextLevel = getNextLevel();

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-red-50 flex flex-col">
            {/* Header */}
            <header className="bg-white shadow-sm px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/child-dashboard" className="flex items-center gap-2 text-gray-600 hover:text-[#E63946] transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            <span className="font-parent">Back</span>
                        </Link>
                        <h1 className="font-kid text-2xl font-bold text-[#E63946]">⭐ My Progress</h1>
                    </div>
                </div>
            </header>

            {/* Level Progress Card */}
            <div className="bg-white border-b px-6 py-6">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-r from-[#E63946] to-[#6A4E9B] rounded-3xl p-6 text-white">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-4">
                                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-4xl">
                                    {levels.find(l => l.name === childData.level)?.icon}
                                </div>
                                <div>
                                    <h2 className="font-kid text-3xl font-bold">{childData.name}</h2>
                                    <p className="text-white/80">Level: {childData.level}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-kid text-4xl font-bold">{childData.xp}</p>
                                <p className="text-white/80">XP Points</p>
                            </div>
                        </div>

                        {/* XP Progress Bar */}
                        <div className="mb-2">
                            <div className="flex justify-between text-sm mb-1">
                                <span>Progress to {nextLevel ? nextLevel.name : 'Max Level'}</span>
                                <span>{childData.xp} / {nextLevel ? nextLevel.xp : childData.xp} XP</span>
                            </div>
                            <div className="h-4 bg-white/20 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-white rounded-full transition-all duration-500"
                                    style={{ width: `${getProgressToNextLevel()}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-4 gap-4 mt-4">
                        <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
                            <div className="text-3xl mb-1">⭐</div>
                            <div className="font-kid text-2xl font-bold text-[#E63946]">{childData.totalStars}</div>
                            <div className="text-xs text-gray-500">Stars</div>
                        </div>
                        <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
                            <div className="text-3xl mb-1">📚</div>
                            <div className="font-kid text-2xl font-bold text-[#E63946]">{childData.lessonsCompleted}</div>
                            <div className="text-xs text-gray-500">Lessons</div>
                        </div>
                        <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
                            <div className="text-3xl mb-1">🎮</div>
                            <div className="font-kid text-2xl font-bold text-[#E63946]">{childData.gamesPlayed}</div>
                            <div className="text-xs text-gray-500">Games</div>
                        </div>
                        <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
                            <div className="text-3xl mb-1">🔥</div>
                            <div className="font-kid text-2xl font-bold text-[#E63946]">{childData.streak}</div>
                            <div className="text-xs text-gray-500">Day Streak</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white px-6">
                <div className="flex gap-2">
                    <button
                        onClick={() => setActiveTab('badges')}
                        className={`px-6 py-3 rounded-t-xl font-kid text-lg transition-colors ${activeTab === 'badges'
                                ? 'bg-[#E63946] text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        🏆 Badges
                    </button>
                    <button
                        onClick={() => setActiveTab('certificates')}
                        className={`px-6 py-3 rounded-t-xl font-kid text-lg transition-colors ${activeTab === 'certificates'
                                ? 'bg-[#E63946] text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        📜 Certificates
                    </button>
                    <button
                        onClick={() => setActiveTab('stats')}
                        className={`px-6 py-3 rounded-t-xl font-kid text-lg transition-colors ${activeTab === 'stats'
                                ? 'bg-[#E63946] text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        📊 Stats
                    </button>
                </div>
            </div>

            {/* Content */}
            <main className="flex-1 p-6 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    {/* Badges Tab */}
                    {activeTab === 'badges' && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {badges.map((badge) => (
                                <div
                                    key={badge.id}
                                    className={`
                    bg-white rounded-2xl p-6 text-center shadow-sm transition-all
                    ${badge.earned
                                            ? 'hover:shadow-lg hover:scale-105 cursor-pointer'
                                            : 'opacity-50 grayscale'}
                  `}
                                >
                                    <div className="text-5xl mb-3">{badge.icon}</div>
                                    <h3 className="font-kid font-bold text-gray-800 mb-1">{badge.name}</h3>
                                    <p className="text-xs text-gray-500 mb-2">{badge.description}</p>
                                    {badge.earned && badge.earnedDate && (
                                        <span className="text-xs text-green-600 font-semibold">✓ Earned!</span>
                                    )}
                                    {!badge.earned && (
                                        <span className="text-xs text-gray-400">🔒 Locked</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Certificates Tab */}
                    {activeTab === 'certificates' && (
                        <div className="space-y-4">
                            {certificates.map((cert) => (
                                <div
                                    key={cert.id}
                                    className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all cursor-pointer flex items-center gap-6"
                                >
                                    <div className="text-5xl">📜</div>
                                    <div className="flex-1">
                                        <h3 className="font-kid text-xl font-bold text-gray-800">{cert.title}</h3>
                                        <p className="text-gray-600">{cert.lesson}</p>
                                        <p className="text-sm text-gray-400">Earned on {cert.date}</p>
                                    </div>
                                    <button className="btn-secondary text-sm">
                                        🖨️ Print
                                    </button>
                                </div>
                            ))}

                            {certificates.length === 0 && (
                                <div className="text-center py-12">
                                    <div className="text-6xl mb-4">📜</div>
                                    <h3 className="font-kid text-2xl text-gray-600">No certificates yet</h3>
                                    <p className="text-gray-500">Complete lessons to earn certificates!</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Stats Tab */}
                    {activeTab === 'stats' && (
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <h3 className="font-kid text-xl font-bold text-gray-800 mb-6">📊 Learning Statistics</h3>

                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-600">English</span>
                                        <span className="font-semibold">8 lessons completed</span>
                                    </div>
                                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-[#E63946] rounded-full" style={{ width: '80%' }} />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-600">Math</span>
                                        <span className="font-semibold">5 lessons completed</span>
                                    </div>
                                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-[#6A4E9B] rounded-full" style={{ width: '50%' }} />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-600">Science</span>
                                        <span className="font-semibold">2 lessons completed</span>
                                    </div>
                                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-[#22C55E] rounded-full" style={{ width: '20%' }} />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t">
                                <h4 className="font-kid font-bold text-gray-800 mb-4">🎯 This Week's Goals</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600">✓</div>
                                        <span className="text-gray-600">Complete 1 lesson</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600">✓</div>
                                        <span className="text-gray-600">Earn 10 stars</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600">⏳</div>
                                        <span className="text-gray-600">Play 2 more games</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
