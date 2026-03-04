'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
    name: string;
    href: string;
    icon: string;
}

interface NavigationProps {
    variant?: 'child' | 'parent';
    onParentClick?: () => void;
}

const childNavItems: NavItem[] = [
    { name: 'Home', href: '/child-dashboard', icon: '🏠' },
    { name: 'Lessons', href: '/lessons', icon: '📚' },
    { name: 'Games', href: '/games', icon: '🎮' },
    { name: 'Progress', href: '/progress', icon: '⭐' },
    { name: 'Settings', href: '/settings', icon: '⚙️' },
];

const parentNavItems: NavItem[] = [
    { name: 'Dashboard', href: '/parent-dashboard', icon: '🏠' },
    { name: 'Progress', href: '/parent-dashboard/progress', icon: '📊' },
    { name: 'School', href: '/parent-dashboard/school', icon: '🏫' },
    { name: 'Billing', href: '/parent-dashboard/billing', icon: '💳' },
    { name: 'Account', href: '/parent-dashboard/account', icon: '👤' },
];

export default function Navigation({ variant = 'child', onParentClick }: NavigationProps) {
    const pathname = usePathname();
    const items = variant === 'child' ? childNavItems : parentNavItems;

    return (
        <nav className={`
      fixed bottom-0 left-0 right-0 z-50
      bg-white/95 backdrop-blur-sm shadow-lg
      border-t border-gray-100
      ${variant === 'child' ? 'py-3' : 'py-2'}
    `}>
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-around">
                    {items.map((item) => {
                        const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`
                  flex flex-col items-center justify-center
                  transition-all duration-200
                  ${isActive ? 'text-[#E63946] scale-110' : 'text-gray-400 hover:text-gray-600'}
                  ${variant === 'child' ? 'min-w-[70px] py-2' : 'min-w-[60px] py-1'}
                `}
                            >
                                <span className="text-2xl">{item.icon}</span>
                                <span className={`font-medium mt-1 ${variant === 'child' ? 'text-sm' : 'text-xs'}`}>
                                    {item.name}
                                </span>
                                {isActive && (
                                    <div className="absolute -bottom-1 w-8 h-1 bg-[#E63946] rounded-full" />
                                )}
                            </Link>
                        );
                    })}

                    {/* Parent access button for child navigation */}
                    {variant === 'child' && onParentClick && (
                        <button
                            onClick={onParentClick}
                            className="flex flex-col items-center justify-center min-w-[70px] py-2 text-gray-400 hover:text-[#6A4E9B] transition-colors"
                        >
                            <span className="text-2xl">🔒</span>
                            <span className="text-xs font-medium mt-1">Parent</span>
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}
