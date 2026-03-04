'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import LessonCard from '@/components/lessons/LessonCard';

// Demo lessons data
const demoLessons = [
    {
        id: '1',
        title: 'Nouns – People and Places',
        subject: 'english',
        progress: 100,
        isCompleted: true,
    },
    {
        id: '2',
        title: 'Counting 1 to 10',
        subject: 'math',
        progress: 50,
        isCompleted: false,
    },
    {
        id: '3',
        title: 'Animals and Their Sounds',
        subject: 'science',
        progress: 0,
        isCompleted: false,
    },
    {
        id: '4',
        title: 'Colors and Shapes',
        subject: 'general',
        progress: 0,
        isCompleted: false,
    },
    {
        id: '5',
        title: 'Verbs – Action Words',
        subject: 'english',
        progress: 0,
        isCompleted: false,
    },
    {
        id: '6',
        title: 'Addition Basics',
        subject: 'math',
        progress: 0,
        isCompleted: false,
    },
];

const subjects = ['all', 'english', 'math', 'science', 'general'];

export default function LessonsPage() {
    const [selectedSubject, setSelectedSubject] = useState('all');

    const filteredLessons = selectedSubject === 'all'
        ? demoLessons
        : demoLessons.filter(lesson => lesson.subject === selectedSubject);

    return (
        <div className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/child-dashboard" className="text-2xl hover:scale-110 transition-transform">
                                ←
                            </Link>
                            <h1 className="text-xl font-bold text-gray-800">📚 Lessons</h1>
                        </div>
                        <div className="w-10 h-10 bg-[#FFD166] rounded-full flex items-center justify-center text-xl">
                            👧
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Subject filters */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {subjects.map((subject) => (
                        <button
                            key={subject}
                            onClick={() => setSelectedSubject(subject)}
                            className={`px-4 py-2 rounded-full font-medium transition-all ${selectedSubject === subject
                                    ? 'bg-[#E63946] text-white'
                                    : 'bg-white text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            {subject === 'all' ? 'All' : subject.charAt(0).toUpperCase() + subject.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Park recommendation */}
                <div className="bg-gradient-to-r from-[#E63946]/10 to-[#FFD166]/10 rounded-2xl p-6 mb-8">
                    <div className="flex items-center gap-4">
                        <div className="text-4xl">🧸</div>
                        <div>
                            <h3 className="font-bold text-gray-800">Park recommends: "Start with Nouns – People and Places!"</h3>
                        </div>
                    </div>
                </div>

                {/* Lessons Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredLessons.map((lesson) => (
                        <LessonCard key={lesson.id} lesson={lesson} />
                    ))}
                </div>
            </div>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3">
                <div className="flex justify-around items-center max-w-lg mx-auto">
                    <Link href="/child-dashboard" className="flex flex-col items-center gap-1 text-gray-600 hover:text-[#E63946]">
                        <span className="text-2xl">🏠</span>
                        <span className="text-xs">Home</span>
                    </Link>
                    <Link href="/lessons" className="flex flex-col items-center gap-1 text-[#E63946]">
                        <span className="text-2xl">📚</span>
                        <span className="text-xs">Lessons</span>
                    </Link>
                    <Link href="/games" className="flex flex-col items-center gap-1 text-gray-600 hover:text-[#E63946]">
                        <span className="text-2xl">🎮</span>
                        <span className="text-xs">Games</span>
                    </Link>
                    <Link href="/progress" className="flex flex-col items-center gap-1 text-gray-600 hover:text-[#E63946]">
                        <span className="text-2xl">⭐</span>
                        <span className="text-xs">Progress</span>
                    </Link>
                </div>
            </nav>
        </div>
    );
}
