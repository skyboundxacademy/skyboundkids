'use client';

import React, { useState, useEffect } from 'react';
import { speak, isSpeaking, stopSpeaking } from '@/lib/speech';

export type ParkState = 'idle' | 'talking' | 'pointing' | 'holding' | 'celebrating' | 'floating';

interface ParkProps {
    state?: ParkState;
    message?: string;
    onClick?: () => void;
    isFullscreen?: boolean;
    holdingItem?: string;
}

export default function Park({
    state = 'idle',
    message,
    onClick,
    isFullscreen = false,
    holdingItem,
}: ParkProps) {
    const [isAnimating, setIsAnimating] = useState(false);
    const [isSpeakingNow, setIsSpeakingNow] = useState(false);

    // Animation effects based on state
    useEffect(() => {
        if (state === 'talking' || state === 'celebrating') {
            setIsAnimating(true);
        } else {
            setIsAnimating(false);
        }
    }, [state]);

    // Handle message with speech
    useEffect(() => {
        if (message) {
            setIsSpeakingNow(true);
            speak(message, () => {
                setIsSpeakingNow(false);
            });
        }
        return () => {
            stopSpeaking();
            setIsSpeakingNow(false);
        };
    }, [message]);

    // Get animation class based on state
    const getAnimationClass = () => {
        switch (state) {
            case 'talking':
                return 'animate-bounce-gentle';
            case 'celebrating':
                return 'animate-bounce';
            case 'floating':
                return 'animate-float';
            case 'pointing':
                return 'animate-pulse-soft';
            default:
                return '';
        }
    };

    // If fullscreen/compact mode
    if (isFullscreen) {
        return (
            <button
                onClick={onClick}
                className="fixed bottom-4 right-4 w-16 h-16 rounded-full bg-[#E63946] flex items-center justify-center shadow-lg z-50 animate-float hover:scale-110 transition-transform"
            >
                <span className="text-3xl">🧸</span>
                {message && (
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-lg shadow-md text-sm whitespace-nowrap">
                        {message}
                    </div>
                )}
            </button>
        );
    }

    return (
        <div
            className={`relative flex flex-col items-center justify-end cursor-pointer transition-all duration-300 ${onClick ? 'hover:scale-105' : ''
                }`}
            onClick={onClick}
        >
            {/* Speech bubble */}
            {message && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full mb-4 bg-white px-6 py-4 rounded-2xl shadow-lg max-w-xs text-center z-10">
                    <p className="text-lg font-kid text-gray-800">{message}</p>
                    {/* Bubble arrow */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-4 h-4 bg-white"></div>
                </div>
            )}

            {/* Park the Teddy Bear - SVG Illustration */}
            <div
                className={`relative ${getAnimationClass()} transition-transform ${isAnimating ? 'scale-110' : 'scale-100'
                    }`}
                style={{ width: '280px', height: '320px' }}
            >
                {/* Bear body */}
                <svg
                    viewBox="0 0 280 320"
                    className="w-full h-full"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Left ear */}
                    <circle cx="60" cy="70" r="35" fill="#8B4513" />
                    <circle cx="60" cy="70" r="20" fill="#D2691E" />

                    {/* Right ear */}
                    <circle cx="220" cy="70" r="35" fill="#8B4513" />
                    <circle cx="220" cy="70" r="20" fill="#D2691E" />

                    {/* Head */}
                    <ellipse cx="140" cy="100" rx="90" ry="80" fill="#8B4513" />

                    {/* Face area */}
                    <ellipse cx="140" cy="110" rx="70" ry="60" fill="#D2691E" />

                    {/* Left eye */}
                    <ellipse cx="110" cy="95" rx="15" ry="18" fill="white" />
                    <circle cx="112" cy="97" r="8" fill="#2C1810" />
                    <circle cx="115" cy="94" r="3" fill="white" />

                    {/* Right eye */}
                    <ellipse cx="170" cy="95" rx="15" ry="18" fill="white" />
                    <circle cx="168" cy="97" r="8" fill="#2C1810" />
                    <circle cx="171" cy="94" r="3" fill="white" />

                    {/* Nose */}
                    <ellipse cx="140" cy="120" rx="12" ry="8" fill="#2C1810" />

                    {/* Mouth */}
                    <path
                        d="M 125 135 Q 140 150 155 135"
                        stroke="#2C1810"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                    />

                    {/* Blush - left */}
                    <ellipse cx="85" cy="115" rx="15" ry="10" fill="#FFB6C1" opacity="0.6" />

                    {/* Blush - right */}
                    <ellipse cx="195" cy="115" rx="15" ry="10" fill="#FFB6C1" opacity="0.6" />

                    {/* Body */}
                    <ellipse cx="140" cy="230" rx="85" ry="90" fill="#8B4513" />

                    {/* Belly */}
                    <ellipse cx="140" cy="230" rx="55" ry="65" fill="#D2691E" />

                    {/* Bowtie */}
                    <polygon points="140,175 120,165 120,185" fill="#E63946" />
                    <polygon points="140,175 160,165 160,185" fill="#E63946" />
                    <circle cx="140" cy="175" r="8" fill="#E63946" />

                    {/* Left arm */}
                    <ellipse cx="55" cy="200" rx="25" ry="45" fill="#8B4513" transform="rotate(-20 55 200)" />

                    {/* Right arm - with cane or holding item */}
                    {state === 'pointing' ? (
                        <g>
                            <ellipse cx="225" cy="200" rx="25" ry="45" fill="#8B4513" transform="rotate(20 225 200)" />
                            {/* Cane */}
                            <rect x="230" y="140" width="6" height="120" fill="#5D4037" rx="3" />
                            <circle cx="233" y="135" r="10" fill="#FFD700" />
                        </g>
                    ) : holdingItem ? (
                        <g>
                            <ellipse cx="225" cy="200" rx="25" ry="45" fill="#8B4513" transform="rotate(20 225 200)" />
                            {/* Held item */}
                            <text x="235" y="180" fontSize="30">{holdingItem}</text>
                        </g>
                    ) : (
                        <ellipse cx="225" cy="200" rx="25" ry="45" fill="#8B4513" transform="rotate(20 225 200)" />
                    )}

                    {/* Left leg */}
                    <ellipse cx="100" cy="300" rx="30" ry="25" fill="#8B4513" />

                    {/* Right leg */}
                    <ellipse cx="180" cy="300" rx="30" ry="25" fill="#8B4513" />

                    {/* Feet */}
                    <ellipse cx="100" cy="315" rx="25" ry="15" fill="#5D4037" />
                    <ellipse cx="180" cy="315" rx="25" ry="15" fill="#5D4037" />
                </svg>

                {/* Listening indicator */}
                {isSpeakingNow && (
                    <div className="absolute top-2 right-2 flex gap-1">
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse delay-100"></span>
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse delay-200"></span>
                    </div>
                )}
            </div>
        </div>
    );
}
