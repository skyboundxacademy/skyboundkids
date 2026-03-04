'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Mock data for children profiles
const children = [
  {
    id: '1',
    name: 'Ada',
    age: 7,
    avatar: '/avatar-ada.svg',
    level: 'Cadet',
    xp: 450,
    xpToNext: 1000,
  },
  {
    id: '2',
    name: 'Emeka',
    age: 5,
    avatar: '/avatar-emeka.svg',
    level: 'Cadet',
    xp: 120,
    xpToNext: 1000,
  },
];

export default function ChildSelectionPage() {
  const [selectedChild, setSelectedChild] = useState<string | null>(null);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Cadet':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Rookie':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'Legend':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const handleChildSelect = (childId: string) => {
    setSelectedChild(childId);
    // In a real app, this would set the active child in context/state
    // and redirect to child dashboard
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-red-50 flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="font-kid text-4xl md:text-5xl font-bold text-[#E63946] mb-2">
          Who's Learning Today?
        </h1>
        <p className="text-gray-600 font-parent text-lg">
          Tap on your profile to continue
        </p>
      </div>

      {/* Children Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl w-full">
        {children.map((child) => (
          <button
            key={child.id}
            onClick={() => handleChildSelect(child.id)}
            className={`
              group relative bg-white rounded-3xl p-6 shadow-lg border-4 transition-all duration-300
              hover:shadow-xl hover:scale-105 hover:border-[#E63946]
              ${selectedChild === child.id ? 'border-[#E63946] ring-4 ring-red-100' : 'border-transparent'}
            `}
          >
            {/* Avatar Circle */}
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32 mb-4">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[#E63946] to-[#6A4E9B] p-1">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                    <span className="text-5xl font-kid font-bold text-[#E63946]">
                      {child.name.charAt(0)}
                    </span>
                  </div>
                </div>
                {/* Level Badge */}
                <div className={`absolute -bottom-2 -right-2 px-3 py-1 rounded-full text-sm font-bold border-2 ${getLevelColor(child.level)}`}>
                  {child.level}
                </div>
              </div>

              {/* Child Name */}
              <h2 className="font-kid text-2xl font-bold text-gray-800 mb-1">
                {child.name}
              </h2>
              <p className="text-gray-500 font-parent text-sm mb-3">
                Age {child.age}
              </p>

              {/* XP Progress */}
              <div className="w-full">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>XP</span>
                  <span>{child.xp}/{child.xpToNext}</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#E63946] to-[#FFD166] rounded-full transition-all duration-500"
                    style={{ width: `${(child.xp / child.xpToNext) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Selection Checkmark */}
            {selectedChild === child.id && (
              <div className="absolute top-4 right-4 w-8 h-8 bg-[#E63946] rounded-full flex items-center justify-center animate-bounce-gentle">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Add Child Button */}
      <div className="mt-8 text-center">
        <Link 
          href="https://forms.gle/add-child"
          className="inline-flex items-center gap-2 text-[#6A4E9B] font-parent font-semibold hover:underline"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add another child
        </Link>
      </div>

      {/* Continue Button */}
      {selectedChild && (
        <Link 
          href="/child-dashboard"
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 btn-primary text-xl px-12 py-4 shadow-2xl animate-bounce-gentle"
        >
          Let's Learn! 🚀
        </Link>
      )}

      {/* Back Button */}
      <Link 
        href="/login"
        className="fixed top-6 left-6 flex items-center gap-2 text-gray-600 hover:text-[#E63946] transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="font-parent">Back</span>
      </Link>
    </div>
  );
}
