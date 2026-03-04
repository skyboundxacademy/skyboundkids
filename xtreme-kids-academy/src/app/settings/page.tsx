'use client';

import { useState } from 'react';
import Link from 'next/link';

// Park customization items
type ParkItem = {
    id: string;
    name: string;
    icon: string;
    unlocked: boolean;
};

const parkItems: ParkItem[] = [
    { id: 'bowtie-red', name: 'Red Bowtie', icon: '🎀', unlocked: true },
    { id: 'bowtie-blue', name: 'Blue Bowtie', icon: '🎀', unlocked: true },
    { id: 'bowtie-gold', name: 'Gold Bowtie', icon: '🎀', unlocked: false },
    { id: 'glasses', name: 'Glasses', icon: '👓', unlocked: true },
    { id: 'sunglasses', name: 'Sunglasses', icon: '🕶️', unlocked: false },
    { id: 'hat-cowboy', name: 'Cowboy Hat', icon: '🤠', unlocked: false },
    { id: 'hat-wizard', name: 'Wizard Hat', icon: '🎩', unlocked: false },
    { id: 'hat-crown', name: 'Crown', icon: '👑', unlocked: false },
    { id: 'cane', name: 'Golden Cane', icon: '🎋', unlocked: false },
];

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState<'park' | 'parent'>('park');
    const [selectedItems, setSelectedItems] = useState<string[]>(['bowtie-red', 'glasses']);
    const [parentPasscode, setParentPasscode] = useState('');
    const [showPasscodePrompt, setShowPasscodePrompt] = useState(false);
    const [parentUnlocked, setParentUnlocked] = useState(false);
    const [soundEnabled, setSoundEnabled] = useState(true);

    const handleItemToggle = (itemId: string) => {
        const item = parkItems.find(i => i.id === itemId);
        if (!item?.unlocked) return;

        setSelectedItems(prev =>
            prev.includes(itemId)
                ? prev.filter(id => id !== itemId)
                : [...prev, itemId]
        );
    };

    const handleParentAccess = () => {
        // In a real app, this would verify against a stored passcode
        if (parentPasscode === '1234') {
            setParentUnlocked(true);
            setShowPasscodePrompt(false);
        } else if (parentPasscode.length > 0) {
            alert('Incorrect passcode. Try: 1234');
        } else {
            setShowPasscodePrompt(true);
        }
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
                        <h1 className="font-kid text-2xl font-bold text-[#E63946]">⚙️ Settings</h1>
                    </div>
                </div>
            </header>

            {/* Tabs */}
            <div className="bg-white px-6">
                <div className="flex gap-2">
                    <button
                        onClick={() => setActiveTab('park')}
                        className={`px-6 py-3 rounded-t-xl font-kid text-lg transition-colors ${activeTab === 'park'
                                ? 'bg-[#E63946] text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        🧸 Park's Stuff
                    </button>
                    <button
                        onClick={() => setActiveTab('parent')}
                        className={`px-6 py-3 rounded-t-xl font-kid text-lg transition-colors ${activeTab === 'parent'
                                ? 'bg-[#6A4E9B] text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        🔐 Parent Stuff
                    </button>
                </div>
            </div>

            {/* Content */}
            <main className="flex-1 p-6 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    {/* Park's Stuff Tab */}
                    {activeTab === 'park' && (
                        <div>
                            {/* Park Preview */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
                                <h2 className="font-kid text-xl font-bold text-gray-800 mb-4">Your Park</h2>
                                <div className="flex justify-center">
                                    <div className="relative w-48 h-56">
                                        {/* Park */}
                                        <div className="w-40 h-48 bg-amber-700 rounded-3xl mx-auto relative">
                                            {/* Ears */}
                                            <div className="absolute -top-4 -left-4 w-10 h-10 bg-amber-700 rounded-full" />
                                            <div className="absolute -top-4 -right-4 w-10 h-10 bg-amber-700 rounded-full" />

                                            {/* Face */}
                                            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-32 h-24">
                                                <div className="flex justify-center gap-6">
                                                    <div className="w-5 h-5 bg-black rounded-full">
                                                        <div className="w-2 h-2 bg-white rounded-full mt-1 ml-1" />
                                                    </div>
                                                    <div className="w-5 h-5 bg-black rounded-full">
                                                        <div className="w-2 h-2 bg-white rounded-full mt-1 ml-1" />
                                                    </div>
                                                </div>
                                                <div className="w-5 h-3 bg-black rounded-full mx-auto mt-2" />
                                                <div className="w-12 h-4 border-4 border-black rounded-b-full mx-auto mt-1" />
                                            </div>

                                            {/* Selected Items */}
                                            {selectedItems.includes('bowtie-red') && (
                                                <div className="absolute top-28 left-1/2 -translate-x-1/2">
                                                    <div className="w-10 h-5 bg-[#E63946] rounded-full" />
                                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#E63946] rounded-full" />
                                                </div>
                                            )}

                                            {selectedItems.includes('glasses') && (
                                                <div className="absolute top-14 left-1/2 -translate-x-1/2 flex gap-4">
                                                    <div className="w-8 h-6 border-2 border-black rounded bg-black/20" />
                                                    <div className="w-8 h-6 border-2 border-black rounded bg-black/20" />
                                                    <div className="w-3 h-2 bg-black" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Wardrobe */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm">
                                <h2 className="font-kid text-xl font-bold text-gray-800 mb-4">Wardrobe</h2>
                                <p className="text-gray-600 mb-4">Tap items to dress Park!</p>

                                <div className="grid grid-cols-3 gap-4">
                                    {parkItems.map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => handleItemToggle(item.id)}
                                            disabled={!item.unlocked}
                                            className={`
                        p-4 rounded-xl text-center transition-all
                        ${selectedItems.includes(item.id)
                                                    ? 'bg-[#E63946] text-white ring-2 ring-[#E63946]'
                                                    : 'bg-gray-100 hover:bg-gray-200'}
                        ${!item.unlocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                      `}
                                        >
                                            <div className="text-4xl mb-2">{item.icon}</div>
                                            <div className="font-kid text-sm">{item.name}</div>
                                            {!item.unlocked && (
                                                <div className="text-xs mt-1">🔒</div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Sound Settings */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm mt-6">
                                <h2 className="font-kid text-xl font-bold text-gray-800 mb-4">Sound</h2>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">{soundEnabled ? '🔊' : '🔇'}</span>
                                        <span className="font-parent text-gray-700">Sound Effects</span>
                                    </div>
                                    <button
                                        onClick={() => setSoundEnabled(!soundEnabled)}
                                        className={`
                      w-14 h-8 rounded-full transition-colors relative
                      ${soundEnabled ? 'bg-green-500' : 'bg-gray-300'}
                    `}
                                    >
                                        <div className={`
                      absolute w-6 h-6 bg-white rounded-full top-1 transition-transform
                      ${soundEnabled ? 'left-7' : 'left-1'}
                    `} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Parent Stuff Tab */}
                    {activeTab === 'parent' && (
                        <div>
                            {!parentUnlocked ? (
                                /* Passcode Entry */
                                <div className="bg-white rounded-2xl p-6 shadow-sm">
                                    <div className="text-center mb-6">
                                        <div className="text-6xl mb-4">🔐</div>
                                        <h2 className="font-kid text-2xl font-bold text-gray-800">Parent Access</h2>
                                        <p className="text-gray-600">Enter your parent passcode</p>
                                    </div>

                                    <div className="max-w-xs mx-auto">
                                        <input
                                            type="password"
                                            value={parentPasscode}
                                            onChange={(e) => setParentPasscode(e.target.value)}
                                            placeholder="Enter passcode"
                                            className="input text-center text-2xl tracking-widest mb-4"
                                            maxLength={4}
                                        />
                                        <button
                                            onClick={handleParentAccess}
                                            className="btn-primary w-full"
                                        >
                                            Unlock
                                        </button>
                                        <p className="text-center text-sm text-gray-500 mt-4">
                                            Demo passcode: 1234
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                /* Parent Settings */
                                <div className="space-y-6">
                                    {/* Account Details */}
                                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                                        <h2 className="font-kid text-xl font-bold text-gray-800 mb-4">Account</h2>
                                        <div className="space-y-3">
                                            <div className="flex justify-between py-2 border-b">
                                                <span className="text-gray-600">Email</span>
                                                <span className="font-semibold">parent@email.com</span>
                                            </div>
                                            <div className="flex justify-between py-2 border-b">
                                                <span className="text-gray-600">Plan</span>
                                                <span className="font-semibold text-green-600">Free</span>
                                            </div>
                                            <button className="btn-premium w-full mt-4">
                                                Upgrade to Premium 🚀
                                            </button>
                                        </div>
                                    </div>

                                    {/* School Settings */}
                                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                                        <h2 className="font-kid text-xl font-bold text-gray-800 mb-4">School Settings</h2>
                                        <p className="text-gray-600 mb-4">Enter school passcode to access school curriculum</p>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                placeholder="School Passcode"
                                                className="input flex-1"
                                            />
                                            <button className="btn-secondary">
                                                Link School
                                            </button>
                                        </div>
                                    </div>

                                    {/* Notifications */}
                                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                                        <h2 className="font-kid text-xl font-bold text-gray-800 mb-4">Notifications</h2>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-700">Progress Updates</span>
                                                <button className="w-12 h-6 bg-green-500 rounded-full relative">
                                                    <div className="absolute w-5 h-5 bg-white rounded-full top-0.5 right-0.5" />
                                                </button>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-700">Weekly Reports</span>
                                                <button className="w-12 h-6 bg-green-500 rounded-full relative">
                                                    <div className="absolute w-5 h-5 bg-white rounded-full top-0.5 right-0.5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Logout */}
                                    <button className="btn-ghost w-full text-red-600 hover:bg-red-50">
                                        Log Out
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
