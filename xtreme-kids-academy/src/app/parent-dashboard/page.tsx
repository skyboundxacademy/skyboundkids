'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Demo child data
const demoChildren = [
    {
        id: '1',
        name: 'Ada',
        age: 5,
        level: 'cadet',
        xp: 150,
        plan: 'free',
        lastActivity: 'Completed Nouns lesson',
        avatar: '👧',
    },
    {
        id: '2',
        name: 'Emeka',
        age: 7,
        level: 'rookie',
        xp: 650,
        plan: 'pro',
        lastActivity: 'Played Math Adventure',
        avatar: '👦',
    },
];

export default function ParentDashboard() {
    const router = useRouter();
    const [children] = useState(demoChildren);

    const getLevelColor = (level: string) => {
        switch (level) {
            case 'legend':
                return 'level-legend';
            case 'rookie':
                return 'level-rookie';
            default:
                return 'level-cadet';
        }
    };

    const getXpProgress = (xp: number) => {
        if (xp >= 1000) return 100;
        if (xp >= 500) return ((xp - 500) / 500) * 100;
        return (xp / 500) * 100;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#E63946] rounded-full flex items-center justify-center text-xl">
                            🧸
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-[#E63946]">Xtreme Kids</h1>
                            <p className="text-xs text-gray-500">Parent Dashboard</p>
                        </div>
                    </Link>

                    {/* User menu */}
                    <div className="flex items-center gap-4">
                        <button className="p-2 hover:bg-gray-100 rounded-full">
                            <span className="text-xl">🔔</span>
                        </button>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#6A4E9B] rounded-full flex items-center justify-center text-white font-bold">
                                P
                            </div>
                            <span className="text-sm font-medium">Parent</span>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Welcome */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">Welcome back!</h1>
                    <p className="text-gray-600">Here's what your children have been up to.</p>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <div className="text-3xl font-bold text-[#E63946]">{children.length}</div>
                        <div className="text-gray-500">Children</div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <div className="text-3xl font-bold text-green-500">12</div>
                        <div className="text-gray-500">Lessons Completed</div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <div className="text-3xl font-bold text-[#FFD166]">5</div>
                        <div className="text-gray-500">Badges Earned</div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <div className="text-3xl font-bold text-[#6A4E9B]">2h 30m</div>
                        <div className="text-gray-500">Learning Time</div>
                    </div>
                </div>

                {/* Children Cards */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Your Children</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {children.map((child) => (
                            <div key={child.id} className="bg-white rounded-2xl p-6 shadow-sm">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-4xl">
                                            {child.avatar}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-800">{child.name}</h3>
                                            <p className="text-sm text-gray-500">{child.age} years old</p>
                                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-1 ${getLevelColor(child.level)}`}>
                                                {child.level.charAt(0).toUpperCase() + child.level.slice(1)}
                                            </span>
                                        </div>
                                    </div>
                                    {child.plan === 'pro' && (
                                        <span className="badge-purple">Premium</span>
                                    )}
                                </div>

                                {/* XP Progress */}
                                <div className="mb-4">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-600">XP Progress</span>
                                        <span className="font-medium">{child.xp} / {child.level === 'legend' ? 1000 : child.level === 'rookie' ? 1000 : 500}</span>
                                    </div>
                                    <div className="progress-bar">
                                        <div className="progress-bar-fill" style={{ width: `${getXpProgress(child.xp)}%` }}></div>
                                    </div>
                                </div>

                                {/* Last Activity */}
                                <div className="text-sm text-gray-600 mb-4">
                                    <span className="font-medium">Last activity:</span> {child.lastActivity}
                                </div>

                                {/* Actions */}
                                <div className="flex gap-3">
                                    <Link
                                        href={`/child-dashboard?child=${child.id}`}
                                        className="flex-1 btn-primary text-center text-sm py-2"
                                    >
                                        View Dashboard
                                    </Link>
                                    <button className="px-4 py-2 border border-gray-200 rounded-full hover:bg-gray-50">
                                        ⚙️
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Add Child CTA */}
                <div className="bg-gradient-to-r from-[#E63946]/10 to-[#FFD166]/10 rounded-2xl p-6 mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 mb-2">Add Another Child</h3>
                            <p className="text-gray-600">Register another child to your account</p>
                        </div>
                        <a
                            href="https://forms.gle/YOUR_FORM_LINK"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary"
                        >
                            Add Child
                        </a>
                    </div>
                </div>

                {/* Sidebar Links */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link href="/parent-dashboard/progress" className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">📊</div>
                        <div>
                            <h3 className="font-bold text-gray-800">Progress Reports</h3>
                            <p className="text-sm text-gray-500">View detailed analytics</p>
                        </div>
                    </Link>
                    <Link href="/parent-dashboard/school" className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl">🏫</div>
                        <div>
                            <h3 className="font-bold text-gray-800">School Settings</h3>
                            <p className="text-sm text-gray-500">Connect to school</p>
                        </div>
                    </Link>
                    <Link href="/parent-dashboard/billing" className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-2xl">💳</div>
                        <div>
                            <h3 className="font-bold text-gray-800">Billing & Plans</h3>
                            <p className="text-sm text-gray-500">Manage subscription</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
