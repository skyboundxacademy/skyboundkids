'use client';

import { useState } from 'react';
import Link from 'next/link';

type Plan = {
    id: string;
    name: string;
    price: number;
    period: string;
    features: string[];
    highlighted: boolean;
    icon: string;
};

const plans: Plan[] = [
    {
        id: 'free',
        name: 'Free',
        price: 0,
        period: 'forever',
        features: [
            '5 lessons per day',
            'Basic games',
            'Limited progress tracking',
            'Ads displayed',
        ],
        highlighted: false,
        icon: '🆓',
    },
    {
        id: 'premium',
        name: 'Premium',
        price: 9.99,
        period: 'month',
        features: [
            'Unlimited lessons',
            'All games unlocked',
            'Full progress tracking',
            'No ads',
            'Printable certificates',
            'Priority support',
            'AR Scanner access',
        ],
        highlighted: true,
        icon: '⭐',
    },
    {
        id: 'family',
        name: 'Family',
        price: 19.99,
        period: 'month',
        features: [
            'Everything in Premium',
            'Up to 5 children',
            'Parent dashboard',
            'School curriculum access',
            'Family sharing',
            'Offline mode',
        ],
        highlighted: false,
        icon: '👨‍👩‍👧‍👦',
    },
];

export default function UpgradePage() {
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSelectPlan = async (planId: string) => {
        if (planId === 'free') {
            window.location.href = '/child-dashboard';
            return;
        }

        setSelectedPlan(planId);
        setIsProcessing(true);

        // Simulate payment processing
        // In a real app, this would integrate with Stripe/Paystack
        setTimeout(() => {
            setIsProcessing(false);
            alert('Payment successful! Welcome to Premium!');
            window.location.href = '/child-dashboard';
        }, 2000);
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
                        <h1 className="font-kid text-2xl font-bold text-[#E63946]">🚀 Upgrade</h1>
                    </div>
                </div>
            </header>

            {/* Park Message */}
            <div className="bg-yellow-50 px-6 py-4">
                <div className="flex items-center gap-4 max-w-4xl mx-auto">
                    <span className="text-4xl">🧸</span>
                    <div>
                        <p className="font-kid text-lg text-gray-800">
                            "With Premium, you get unlimited lessons and more fun games!"
                        </p>
                        <p className="text-sm text-gray-600">- Park</p>
                    </div>
                </div>
            </div>

            {/* Plans */}
            <main className="flex-1 p-6">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-8">
                        <h2 className="font-kid text-3xl font-bold text-gray-800 mb-2">
                            Choose Your Plan
                        </h2>
                        <p className="text-gray-600">
                            Unlock unlimited learning for your child!
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {plans.map((plan) => (
                            <div
                                key={plan.id}
                                className={`
                  bg-white rounded-3xl p-6 transition-all
                  ${plan.highlighted
                                        ? 'ring-4 ring-[#6A4E9B] shadow-2xl scale-105'
                                        : 'shadow-lg hover:shadow-xl'}
                `}
                            >
                                {/* Plan Icon & Name */}
                                <div className="text-center mb-6">
                                    <div className="text-5xl mb-3">{plan.icon}</div>
                                    <h3 className="font-kid text-2xl font-bold text-gray-800">
                                        {plan.name}
                                    </h3>
                                    {plan.highlighted && (
                                        <span className="badge-purple text-xs mt-2 inline-block">
                                            Most Popular
                                        </span>
                                    )}
                                </div>

                                {/* Price */}
                                <div className="text-center mb-6">
                                    <span className="font-kid text-4xl font-bold text-[#E63946]">
                                        ${plan.price}
                                    </span>
                                    {plan.price > 0 && (
                                        <span className="text-gray-500">/{plan.period}</span>
                                    )}
                                    {plan.price === 0 && (
                                        <span className="text-gray-500">/free</span>
                                    )}
                                </div>

                                {/* Features */}
                                <ul className="space-y-3 mb-6">
                                    {plan.features.map((feature, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="text-gray-600 text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Select Button */}
                                <button
                                    onClick={() => handleSelectPlan(plan.id)}
                                    disabled={isProcessing}
                                    className={`
                    w-full py-3 rounded-full font-kid text-lg font-bold transition-all
                    ${plan.highlighted
                                            ? 'bg-[#6A4E9B] text-white hover:bg-purple-700 hover:scale-105'
                                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}
                    ${isProcessing && selectedPlan === plan.id ? 'opacity-50' : ''}
                  `}
                                >
                                    {isProcessing && selectedPlan === plan.id ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                            </svg>
                                            Processing...
                                        </span>
                                    ) : plan.id === 'free' ? (
                                        'Continue Free'
                                    ) : (
                                        `Get ${plan.name}`
                                    )}
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Trust Badges */}
                    <div className="mt-12 text-center">
                        <p className="text-gray-500 text-sm mb-4">Trusted by thousands of parents</p>
                        <div className="flex justify-center gap-6 opacity-60">
                            <div className="flex items-center gap-2 text-gray-500">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                <span className="text-sm">Secure Payment</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-500">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                <span className="text-sm">30-Day Guarantee</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-500">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-sm">Used Worldwide</span>
                            </div>
                        </div>
                    </div>

                    {/* FAQ */}
                    <div className="mt-12 max-w-2xl mx-auto">
                        <h3 className="font-kid text-xl font-bold text-gray-800 mb-4 text-center">
                            Frequently Asked Questions
                        </h3>
                        <div className="space-y-4">
                            <details className="bg-white rounded-xl p-4 cursor-pointer">
                                <summary className="font-semibold text-gray-700">
                                    Can I cancel anytime?
                                </summary>
                                <p className="text-gray-600 mt-2">
                                    Yes! You can cancel your subscription at any time with no penalties.
                                </p>
                            </details>
                            <details className="bg-white rounded-xl p-4 cursor-pointer">
                                <summary className="font-semibold text-gray-700">
                                    What payment methods do you accept?
                                </summary>
                                <p className="text-gray-600 mt-2">
                                    We accept all major credit cards, Paystack, and mobile money.
                                </p>
                            </details>
                            <details className="bg-white rounded-xl p-4 cursor-pointer">
                                <summary className="font-semibold text-gray-700">
                                    Is there a trial period?
                                </summary>
                                <p className="text-gray-600 mt-2">
                                    Yes! New Premium users get a 7-day free trial.
                                </p>
                            </details>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
