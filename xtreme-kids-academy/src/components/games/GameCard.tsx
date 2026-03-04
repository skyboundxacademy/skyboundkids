'use client';

import React from 'react';

interface GameCardProps {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  onPlay?: () => void;
  isLocked?: boolean;
}

export default function GameCard({
  title,
  description,
  icon,
  color,
  onPlay,
  isLocked = false,
}: GameCardProps) {
  return (
    <div className={`card-hover group ${isLocked ? 'opacity-60' : ''}`}>
      {/* Icon */}
      <div className={`h-32 rounded-xl flex items-center justify-center text-6xl mb-4 ${color}`}>
        {isLocked ? '🔒' : icon}
      </div>

      {/* Title */}
      <h3 className="text-lg font-kid font-semibold text-gray-800 mb-2">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-4">
        {description}
      </p>

      {/* Play button */}
      <button
        onClick={onPlay}
        disabled={isLocked}
        className={`w-full font-kid font-semibold py-3 px-6 rounded-full transition-all ${
          isLocked
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'btn-primary'
        }`}
      >
        {isLocked ? 'Locked' : 'Play Now'}
      </button>
    </div>
  );
}
