'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Demo login - in production, this would call Supabase auth
        if (email && password) {
            // Simulate API call
            setTimeout(() => {
                // For demo, redirect to parent dashboard
                router.push('/parent-dashboard');
            }, 1000);
        } else {
            setError('Please enter email and password');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#E63946]/5 to-[#FFD166]/10 flex items-center justify-center p-4">
            {/* Background decorations */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-32 h-32 bg-[#FFD166]/20 rounded-full"></div>
                <div className="absolute bottom-20 right-10 w-48 h-48 bg-[#E63946]/10 rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#6A4E9B]/5 rounded-full"></div>
            </div>

            <div className="relative w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-3">
                        <div className="w-16 h-16 bg-[#E63946] rounded-full flex items-center justify-center text-4xl animate-bounce-gentle">
                            🧸
                        </div>
                        <div className="text-left">
                            <h1 className="text-2xl font-bold text-[#E63946]">Xtreme Kids</h1>
                            <p className="text-sm text-gray-500">Academy</p>
                        </div>
                    </Link>
                </div>

                {/* Login Card */}
                <div className="bg-white rounded-3xl shadow-xl p-8">
                    <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
                        Welcome Back!
                    </h2>
                    <p className="text-gray-500 text-center mb-8">
                        Sign in to access your child's dashboard
                    </p>

                    {/* Error message */}
                    {error && (
                        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input"
                                placeholder="parent@example.com"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input type="checkbox" className="w-4 h-4 text-[#E63946] rounded" />
                                <span className="ml-2 text-sm text-gray-600">Remember me</span>
                            </label>
                            <a href="#" className="text-sm text-[#E63946] hover:underline">
                                Forgot password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full btn-primary py-4 text-lg ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-500">or</span>
                        </div>
                    </div>

                    {/* Register link */}
                    <div className="text-center">
                        <p className="text-gray-600">
                            New here?{' '}
                            <a
                                href="https://forms.gle/YOUR_FORM_LINK"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#E63946] font-semibold hover:underline"
                            >
                                Register here
                            </a>
                        </p>
                    </div>

                    {/* Demo hint */}
                    <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                        <p className="text-xs text-gray-500 text-center">
                            Demo: Enter any email and password to explore the app
                        </p>
                    </div>
                </div>

                {/* Back to home */}
                <div className="text-center mt-6">
                    <Link href="/" className="text-gray-500 hover:text-[#E63946] transition-colors">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
