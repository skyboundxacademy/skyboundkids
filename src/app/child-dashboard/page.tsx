'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Park from '@/components/park/Park';
import Board from '@/components/board/Board';

export default function ChildDashboard() {
    const [parkMessage, setParkMessage] = useState("Hi Ada! I'm Park! Ready to learn something new today?");
    const [parkState, setParkState] = useState<'idle' | 'talking' | 'celebrating'>('idle');

    const handleParkClick = () => {
        setParkState('talking');
        setParkMessage("Hi Ada! I'm so happy to see you! Let's have fun learning together!");

        setTimeout(() => {
            setParkState('idle');
            setParkMessage("What would you like to do today? We can learn something new or play a game!");
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            {/* Top bar with child info */}
            <header className="bg-white/80 backdrop-blur-sm shadow-sm px-4 py-3">
                <div className="flex items-center justify-between">
                    {/* Child avatar and name */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#FFD166] rounded-full flex items-center justify-center text-xl">
                            👧
                        </div>
                        <div>
                            <h1 className="font-bold text-gray-800">Ada</h1>
                            <div className="flex items-center gap-2">
                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">Cadet</span>
                                <span className="text-xs text-gray-500">⭐ 150 XP</span>
                            </div>
                        </div>
                    </div>

                    {/* Parent access */}
                    <Link href="/parent-dashboard" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                        🔒
                    </Link>
                </div>
            </header>

            {/* Main content - Board and Park */}
            <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)]">
                {/* Board area */}
                <div className="flex-1 p-4 lg:p-8">
                    <Board
                        content={{
                            type: 'welcome',
                            title: "Welcome back, Ada!",
                            content: "What would you like to do today?",
                        }}
                    />
                </div>

                {/* Park area */}
                <div className="lg:w-80 p-4 flex items-end justify-center lg:justify-start">
                    <Park
                        state={parkState}
                        message={parkMessage}
                        onClick={handleParkClick}
                    />
                </div>
            </div>

            {/* Bottom navigation */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-lg border-t border-gray-100 z-50">
                <div className="flex items-center justify-around py-3">
                    <Link href="/child-dashboard" className="flex flex-col items-center text-[#E63946]">
                        <span className="text-2xl">🏠</span>
                        <span className="text-xs font-medium">Home</span>
                    </Link>
                    <Link href="/lessons" className="flex flex-col items-center text-gray-400 hover:text-gray-600">
                        <span className="text-2xl">📚</span>
                        <span className="text-xs font-medium">Lessons</span>
                    </Link>
                    <Link href="/games" className="flex flex-col items-center text-gray-400 hover:text-gray-600">
                        <span className="text-2xl">🎮</span>
                        <span className="text-xs font-medium">Games</span>
                    </Link>
                    <Link href="/progress" className="flex flex-col items-center text-gray-400 hover:text-gray-600">
                        <span className="text-2xl">⭐</span>
                        <span className="text-xs font-medium">Progress</span>
                    </Link>
                    <Link href="/settings" className="flex flex-col items-center text-gray-400 hover:text-gray-600">
                        <span className="text-2xl">⚙️</span>
                        <span className="text-xs font-medium">Settings</span>
                    </Link>
                </div>
            </nav>

            {/* Quick actions floating button */}
            <div className="fixed bottom-20 right-4 z-40">
                <button className="w-14 h-14 bg-[#E63946] rounded-full shadow-lg flex items-center justify-center text-2xl hover:scale-110 transition-transform">
                    🎤
                </button>
            </div>
        </div>
    );
}
