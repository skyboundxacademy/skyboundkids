'use client';

import React from 'react';

interface LessonCardProps {
    id: string;
    title: string;
    subject: string;
    thumbnailUrl?: string;
    progress?: number; // 0-100
    isCompleted?: boolean;
    onStart?: () => void;
    onReview?: () => void;
}

const subjectIcons: Record<string, string> = {
    english: '📖',
    math: '🔢',
    science: '🔬',
    general: '🎯',
};

const subjectColors: Record<string, string> = {
    english: 'bg-blue-100 text-blue-800',
    math: 'bg-green-100 text-green-800',
    science: 'bg-purple-100 text-purple-800',
    general: 'bg-orange-100 text-orange-800',
};

export default function LessonCard({
    title,
    subject,
    thumbnailUrl,
    progress = 0,
    isCompleted = false,
    onStart,
    onReview,
}: LessonCardProps) {
    const icon = subjectIcons[subject] || '📚';
    const colorClass = subjectColors[subject] || 'bg-gray-100 text-gray-800';

    return (
        <div className="card-hover group">
            {/* Thumbnail */}
            <div className="relative h-40 rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-gray-100 to-gray-200">
                {thumbnailUrl ? (
                    <img
                        src={thumbnailUrl}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl">
                        {icon}
                    </div>
                )}

                {/* Subject badge */}
                <div className={`absolute top-2 left-2 px-3 py-1 rounded-full text-sm font-medium ${colorClass}`}>
                    {subject.charAt(0).toUpperCase() + subject.slice(1)}
                </div>

                {/* Completed badge */}
                {isCompleted && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        ✓ Completed
                    </div>
                )}

                {/* Progress bar */}
                {progress > 0 && !isCompleted && (
                    <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-200">
                        <div
                            className="h-full bg-gradient-to-r from-[#E63946] to-[#FFD166] transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                )}
            </div>

            {/* Title */}
            <h3 className="text-lg font-kid font-semibold text-gray-800 mb-2">
                {title}
            </h3>

            {/* Action button */}
            {isCompleted ? (
                <button
                    onClick={onReview}
                    className="w-full btn-secondary text-sm"
                >
                    Review Lesson
                </button>
            ) : (
                <button
                    onClick={onStart}
                    className="w-full btn-primary text-sm"
                >
                    {progress > 0 ? 'Continue' : 'Start Lesson'}
                </button>
            )}
        </div>
    );
}
