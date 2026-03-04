'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/navigation/Navigation';

// Game types
type Game = {
    id: string;
    title: string;
    description: string;
    icon: string;
    category: string;
    players: string;
    duration: string;
    skills: string[];
};

// Mock games data
const games: Game[] = [
    {
        id: 'memory-match',
        title: 'Memory Match',
        description: 'Find matching pairs of words and images!',
        icon: '🃏',
        category: 'English',
        players: '1 Player',
        duration: '5 min',
        skills: ['Memory', 'Vocabulary'],
    },
    {
        id: 'word-hunt',
        title: 'Word Hunt',
        description: 'Search for hidden words in the puzzle!',
        icon: '🔍',
        category: 'English',
        players: '1 Player',
        duration: '10 min',
        skills: ['Spelling', 'Reading'],
    },
    {
        id: 'counting-fun',
        title: 'Counting Fun',
        description: 'Count the objects and tap the right number!',
        icon: '🔢',
        category: 'Math',
        players: '1 Player',
        duration: '5 min',
        skills: ['Counting', 'Numbers'],
    },
    {
        id: 'shape-sorter',
        title: 'Shape Sorter',
        description: 'Match the shapes to their shadows!',
        icon: '⬛',
        category: 'Math',
        players: '1 Player',
        duration: '5 min',
        skills: ['Shapes', 'Logic'],
    },
    {
        id: 'animal-sounds',
        title: 'Animal Sounds',
        description: 'Listen to animal sounds and guess who it is!',
        icon: '🦁',
        category: 'Science',
        players: '1 Player',
        duration: '5 min',
        skills: ['Animals', 'Listening'],
    },
    {
        id: 'color-mix',
        title: 'Color Mix',
        description: 'Mix colors to see what new colors you make!',
        icon: '🎨',
        category: 'Art',
        players: '1 Player',
        duration: '10 min',
        skills: ['Colors', 'Creativity'],
    },
];

const categories = ['All', 'English', 'Math', 'Science', 'Art'];

export default function GamesPage() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [activeGame, setActiveGame] = useState<string | null>(null);

    const filteredGames = selectedCategory === 'All'
        ? games
        : games.filter(game => game.category === selectedCategory);

    const handlePlayGame = (gameId: string) => {
        setActiveGame(gameId);
        // In a real app, this would load the game
    };

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
                        <h1 className="font-kid text-2xl font-bold text-[#E63946]">🎮 Game Center</h1>
                    </div>

                    {/* Park Suggestion */}
                    <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-full">
                        <span className="text-2xl">🧸</span>
                        <p className="font-kid text-sm text-gray-700">
                            "Let's play! Which game do you like?"
                        </p>
                    </div>
                </div>
            </header>

            {/* Category Filters */}
            <div className="bg-white border-b px-6 py-3">
                <div className="flex gap-3 overflow-x-auto">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`
                px-6 py-2 rounded-full font-kid text-lg whitespace-nowrap transition-all
                ${selectedCategory === category
                                    ? 'bg-[#E63946] text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
              `}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Games Grid */}
            <main className="flex-1 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {filteredGames.map((game) => (
                        <div
                            key={game.id}
                            className="card-hover group relative overflow-hidden"
                        >
                            {/* Game Icon */}
                            <div className="text-8xl text-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                {game.icon}
                            </div>

                            {/* Game Info */}
                            <h3 className="font-kid text-xl font-bold text-gray-800 mb-2">
                                {game.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-4">
                                {game.description}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="badge-purple text-xs">{game.category}</span>
                                <span className="badge-yellow text-xs">{game.players}</span>
                                <span className="badge-green text-xs">{game.duration}</span>
                            </div>

                            {/* Skills */}
                            <div className="flex flex-wrap gap-1">
                                {game.skills.map((skill, index) => (
                                    <span key={index} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                        ⭐ {skill}
                                    </span>
                                ))}
                            </div>

                            {/* Play Button Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#E63946]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                                <button
                                    onClick={() => handlePlayGame(game.id)}
                                    className="bg-white text-[#E63946] px-8 py-3 rounded-full font-kid text-xl font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                                >
                                    ▶ Play Now!
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredGames.length === 0 && (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">😢</div>
                        <h3 className="font-kid text-2xl text-gray-600 mb-2">No games found</h3>
                        <p className="text-gray-500">Try selecting a different category!</p>
                    </div>
                )}
            </main>

            {/* Demo: Memory Match Game */}
            {activeGame === 'memory-match' && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl p-6 max-w-2xl w-full max-h-[90vh] overflow-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="font-kid text-2xl font-bold">🃏 Memory Match</h2>
                            <button
                                onClick={() => setActiveGame(null)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <p className="text-gray-600 mb-4">Tap two cards to find matching pairs!</p>

                        {/* Simple Memory Game Demo */}
                        <MemoryGameDemo onComplete={() => setActiveGame(null)} />
                    </div>
                </div>
            )}

            {/* Navigation */}
            <Navigation currentPage="games" />
        </div>
    );
}

// Simple Memory Game Demo Component
function MemoryGameDemo({ onComplete }: { onComplete: () => void }) {
    const [cards, setCards] = useState<{ id: number; emoji: string; flipped: boolean; matched: boolean }[]>([]);
    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [moves, setMoves] = useState(0);
    const [isLocked, setIsLocked] = useState(false);

    const emojis = ['🍎', '🌟', '🐶', '🎈', '🌈', '🎵', '🍕', '🚀'];

    // Initialize game
    useState(() => {
        const shuffled = [...emojis, ...emojis]
            .sort(() => Math.random() - 0.5)
            .map((emoji, index) => ({
                id: index,
                emoji,
                flipped: false,
                matched: false,
            }));
        setCards(shuffled);
    });

    const handleCardClick = (id: number) => {
        if (isLocked) return;
        const card = cards.find(c => c.id === id);
        if (!card || card.flipped || card.matched) return;
        if (flippedCards.length >= 2) return;

        // Flip the card
        const newCards = cards.map(c =>
            c.id === id ? { ...c, flipped: true } : c
        );
        setCards(newCards);

        const newFlipped = [...flippedCards, id];
        setFlippedCards(newFlipped);

        if (newFlipped.length === 2) {
            setMoves(m => m + 1);
            setIsLocked(true);

            const [first, second] = newFlipped;
            const firstCard = cards.find(c => c.id === first);
            const secondCard = cards.find(c => c.id === second);

            if (firstCard?.emoji === secondCard?.emoji) {
                // Match found!
                setTimeout(() => {
                    setCards(cards.map(c =>
                        newFlipped.includes(c.id) ? { ...c, matched: true } : c
                    ));
                    setFlippedCards([]);
                    setIsLocked(false);

                    // Check if all matched
                    if (cards.filter(c => c.matched).length === emojis.length - 2) {
                        setTimeout(onComplete, 1000);
                    }
                }, 500);
            } else {
                // No match - flip back
                setTimeout(() => {
                    setCards(cards.map(c =>
                        newFlipped.includes(c.id) ? { ...c, flipped: false } : c
                    ));
                    setFlippedCards([]);
                    setIsLocked(false);
                }, 1000);
            }
        }
    };

    return (
        <div>
            <div className="text-center mb-4">
                <span className="font-kid text-lg">Moves: {moves}</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
                {cards.map((card) => (
                    <button
                        key={card.id}
                        onClick={() => handleCardClick(card.id)}
                        disabled={card.matched}
                        className={`
              aspect-square rounded-xl text-3xl flex items-center justify-center transition-all duration-300
              ${card.flipped || card.matched
                                ? 'bg-white border-2 border-[#E63946]'
                                : 'bg-gradient-to-br from-[#E63946] to-[#6A4E9B]'}
              ${card.matched ? 'opacity-50' : ''}
            `}
                    >
                        {card.flipped || card.matched ? card.emoji : '❓'}
                    </button>
                ))}
            </div>
        </div>
    );
}
