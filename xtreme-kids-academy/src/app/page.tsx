'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function LandingPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#E63946] rounded-full flex items-center justify-center text-2xl">
              🧸
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#E63946]">Xtreme Kids</h1>
              <p className="text-xs text-gray-500">Academy</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-gray-600 hover:text-[#E63946] transition-colors">
              Features
            </Link>
            <Link href="#parents" className="text-gray-600 hover:text-[#E63946] transition-colors">
              For Parents
            </Link>
            <Link href="#schools" className="text-gray-600 hover:text-[#E63946] transition-colors">
              For Schools
            </Link>
            <Link href="/login" className="btn-primary text-sm">
              Login
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden p-2">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div className="text-center md:text-left">
              <div className="inline-block px-4 py-2 bg-[#FFD166]/30 rounded-full text-[#E63946] font-medium mb-4">
                ✨ Learning Made Magical
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
                Meet Park, Your Child's
                <span className="text-[#E63946]"> Learning Friend</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                An AI-powered teddy bear that makes learning fun, interactive, and personalized for every child.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <a
                  href="https://forms.gle/YOUR_FORM_LINK"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-lg px-8 py-4"
                >
                  Get Started for Free
                </a>
                <button className="btn-secondary text-lg px-8 py-4">
                  Watch Demo
                </button>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                🎉 Free account • No credit card required
              </p>
            </div>

            {/* Right: Park illustration */}
            <div className="flex justify-center">
              <div className="relative">
                {/* Decorative circles */}
                <div className="absolute -top-10 -left-10 w-20 h-20 bg-[#FFD166]/30 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-5 -right-5 w-16 h-16 bg-[#6A4E9B]/20 rounded-full animate-pulse delay-300"></div>

                {/* Park SVG */}
                <svg
                  viewBox="0 0 280 320"
                  className="w-64 h-72 md:w-80 md:h-auto animate-float"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Bear */}
                  <circle cx="60" cy="70" r="35" fill="#8B4513" />
                  <circle cx="60" cy="70" r="20" fill="#D2691E" />
                  <circle cx="220" cy="70" r="35" fill="#8B4513" />
                  <circle cx="220" cy="70" r="20" fill="#D2691E" />
                  <ellipse cx="140" cy="100" rx="90" ry="80" fill="#8B4513" />
                  <ellipse cx="140" cy="110" rx="70" ry="60" fill="#D2691E" />
                  <ellipse cx="110" cy="95" rx="15" ry="18" fill="white" />
                  <circle cx="112" cy="97" r="8" fill="#2C1810" />
                  <circle cx="115" cy="94" r="3" fill="white" />
                  <ellipse cx="170" cy="95" rx="15" ry="18" fill="white" />
                  <circle cx="168" cy="97" r="8" fill="#2C1810" />
                  <circle cx="171" cy="94" r="3" fill="white" />
                  <ellipse cx="140" cy="120" rx="12" ry="8" fill="#2C1810" />
                  <path d="M 125 135 Q 140 150 155 135" stroke="#2C1810" strokeWidth="3" fill="none" strokeLinecap="round" />
                  <ellipse cx="85" cy="115" rx="15" ry="10" fill="#FFB6C1" opacity="0.6" />
                  <ellipse cx="195" cy="115" rx="15" ry="10" fill="#FFB6C1" opacity="0.6" />
                  <ellipse cx="140" cy="230" rx="85" ry="90" fill="#8B4513" />
                  <ellipse cx="140" cy="230" rx="55" ry="65" fill="#D2691E" />
                  <polygon points="140,175 120,165 120,185" fill="#E63946" />
                  <polygon points="140,175 160,165 160,185" fill="#E63946" />
                  <circle cx="140" cy="175" r="8" fill="#E63946" />
                  <ellipse cx="55" cy="200" rx="25" ry="45" fill="#8B4513" transform="rotate(-20 55 200)" />
                  <ellipse cx="225" cy="200" rx="25" ry="45" fill="#8B4513" transform="rotate(20 225 200)" />
                  <ellipse cx="100" cy="300" rx="30" ry="25" fill="#8B4513" />
                  <ellipse cx="180" cy="300" rx="30" ry="25" fill="#8B4513" />
                  <ellipse cx="100" cy="315" rx="25" ry="15" fill="#5D4037" />
                  <ellipse cx="180" cy="315" rx="25" ry="15" fill="#5D4037" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
            Why Kids Love Xtreme Kids Academy
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12">
            Learning that feels like play
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="w-20 h-20 bg-[#E63946]/10 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
                🎤
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Voice Interaction</h3>
              <p className="text-gray-600">
                Kids can talk to Park naturally. He listens, responds, and guides them through lessons using friendly conversation.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="w-20 h-20 bg-[#FFD166]/20 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
                📚
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Personalized Learning</h3>
              <p className="text-gray-600">
                Park adapts to each child's pace and learning style, making every lesson feel specially designed for them.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="w-20 h-20 bg-[#6A4E9B]/10 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
                🏆
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Rewards & Achievements</h3>
              <p className="text-gray-600">
                Kids earn stars, badges, and certificates as they complete lessons, keeping them motivated to learn more.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* For Parents Section */}
      <section id="parents" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                For Parents
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-600">Track your child's progress in real-time</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-600">Receive detailed progress reports</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-600">Safe and secure environment for children</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-600">Connect with teachers for collaboration</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-gray-600">Upgrade to Premium for unlimited access</span>
                </li>
              </ul>
              <a
                href="https://forms.gle/YOUR_FORM_LINK"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-block mt-8"
              >
                Register Your Child
              </a>
            </div>
            <div className="bg-gradient-to-br from-[#E63946]/10 to-[#FFD166]/10 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-6 text-center shadow-md">
                  <div className="text-3xl font-bold text-[#E63946]">500+</div>
                  <div className="text-gray-600 text-sm">Lessons</div>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-md">
                  <div className="text-3xl font-bold text-[#6A4E9B]">50+</div>
                  <div className="text-gray-600 text-sm">Games</div>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-md">
                  <div className="text-3xl font-bold text-[#FFD166]">4.9</div>
                  <div className="text-gray-600 text-sm">Rating</div>
                </div>
                <div className="bg-white rounded-xl p-6 text-center shadow-md">
                  <div className="text-3xl font-bold text-green-500">10K+</div>
                  <div className="text-gray-600 text-sm">Happy Kids</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Schools Section */}
      <section id="schools" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              For Schools
            </h2>
            <p className="text-xl text-gray-600">
              Empower your entire school with Xtreme Kids Academy
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-4xl mb-4">👨‍🏫</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Teacher Dashboard</h3>
              <p className="text-gray-600">
                Teachers can create custom lessons, track student progress, and manage classes easily.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Analytics</h3>
              <p className="text-gray-600">
                Detailed reports on student performance, class averages, and areas for improvement.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-4xl mb-4">🔗</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Easy Integration</h3>
              <p className="text-gray-600">
                Works with existing school systems. Students use passcodes to access their accounts.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <a
              href="https://forms.gle/YOUR_SCHOOL_FORM_LINK"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-premium inline-block"
            >
              Register Your School
            </a>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Simple, Affordable Pricing
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Free Plan */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Free</h3>
              <p className="text-4xl font-bold text-[#E63946] mb-6">$0</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-600">Basic lessons</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-600">5 minutes daily Park interaction</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-600">Standard videos</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gray-400">✗</span>
                  <span className="text-gray-400">Progress reports</span>
                </li>
              </ul>
              <button className="w-full btn-secondary">Get Started</button>
            </div>

            {/* Premium Plan */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-[#6A4E9B] relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#6A4E9B] text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Premium</h3>
              <p className="text-4xl font-bold text-[#6A4E9B] mb-6">$9.99<span className="text-lg text-gray-500">/month</span></p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-600">Unlimited lessons</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-600">Unlimited Park interaction</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-600">All videos & games</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-600">Detailed progress reports</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-600">Printable certificates</span>
                </li>
              </ul>
              <button className="w-full btn-premium">Upgrade Now</button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#E63946] to-[#FFD166]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Child's Learning Adventure?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of happy parents and children already learning with Park!
          </p>
          <a
            href="https://forms.gle/YOUR_FORM_LINK"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-[#E63946] px-8 py-4 rounded-full font-bold text-lg hover:shadow-lg transition-shadow"
          >
            Get Started for Free
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#E63946] rounded-full flex items-center justify-center text-xl">
                  🧸
                </div>
                <div>
                  <h3 className="font-bold">Xtreme Kids</h3>
                  <p className="text-xs text-gray-400">Academy</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Making learning magical for children everywhere.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#parents" className="hover:text-white transition-colors">For Parents</a></li>
                <li><a href="#schools" className="hover:text-white transition-colors">For Schools</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Email: hello@xtremekids.com</li>
                <li>Phone: +234 XXX XXX XXXX</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#E63946] transition-colors">
                  📘
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#E63946] transition-colors">
                  📸
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#E63946] transition-colors">
                  🐦
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>© 2026 Xtreme Kids Academy. Built with ❤️ by Skybound Twins.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
