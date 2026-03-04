// Supabase client configuration for Xtreme Kids Academy
// This file handles database connections, authentication, and storage

// Note: These environment variables should be set in your .env.local file
// NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
// NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

export interface User {
    id: string;
    email: string;
    created_at: string;
}

export interface Child {
    id: string;
    parent_id: string;
    name: string;
    age: number;
    avatar?: string;
    level: 'cadet' | 'rookie' | 'legend';
    xp: number;
    plan: 'free' | 'pro';
    created_at: string;
}

export interface Lesson {
    id: string;
    title: string;
    subject: 'english' | 'math' | 'science' | 'general';
    grade_level: number;
    description: string;
    thumbnail_url?: string;
    steps: LessonStep[];
    created_at: string;
}

export interface LessonStep {
    id: string;
    order: number;
    type: 'greeting' | 'teach' | 'practice' | 'video' | 'celebrate';
    content: string;
    media_url?: string;
    question?: string;
    options?: string[];
    correct_answer?: string;
}

export interface LessonProgress {
    id: string;
    child_id: string;
    lesson_id: string;
    completed: boolean;
    score?: number;
    completed_at?: string;
}

export interface Challenge {
    id: string;
    title: string;
    description: string;
    reward_points: number;
    expires_at: string;
}

export interface UserChallenge {
    id: string;
    user_id: string;
    challenge_id: string;
    completed_at?: string;
}

export interface Badge {
    id: string;
    name: string;
    description: string;
    icon: string;
    requirement: string;
}

export interface UserBadge {
    id: string;
    user_id: string;
    badge_id: string;
    earned_at: string;
}

// Database types for Supabase tables
export type Database = {
    public: {
        Tables: {
            children: {
                Row: Child;
                Insert: Omit<Child, 'id' | 'created_at'>;
                Update: Partial<Omit<Child, 'id' | 'created_at'>>;
            };
            lessons: {
                Row: Lesson;
                Insert: Omit<Lesson, 'id' | 'created_at'>;
                Update: Partial<Omit<Lesson, 'id' | 'created_at'>>;
            };
            lesson_progress: {
                Row: LessonProgress;
                Insert: Omit<LessonProgress, 'id'>;
                Update: Partial<Omit<LessonProgress, 'id'>>;
            };
            challenges: {
                Row: Challenge;
                Insert: Omit<Challenge, 'id'>;
                Update: Partial<Omit<Challenge, 'id'>>;
            };
            user_challenges: {
                Row: UserChallenge;
                Insert: Omit<UserChallenge, 'id'>;
                Update: Partial<Omit<UserChallenge, 'id'>>;
            };
            badges: {
                Row: Badge;
                Insert: Omit<Badge, 'id'>;
                Update: Partial<Omit<Badge, 'id'>>;
            };
            user_badges: {
                Row: UserBadge;
                Insert: Omit<UserBadge, 'id'>;
                Update: Partial<Omit<UserBadge, 'id'>>;
            };
        };
    };
};

// Helper function to check if user is premium
export function isPremiumUser(plan: string): boolean {
    return plan === 'pro';
}

// Helper to calculate level from XP
export function calculateLevel(xp: number): 'cadet' | 'rookie' | 'legend' {
    if (xp >= 1000) return 'legend';
    if (xp >= 500) return 'rookie';
    return 'cadet';
}

// Helper to get XP needed for next level
export function xpForNextLevel(currentXp: number): number {
    if (currentXp >= 1000) return 0;
    if (currentXp >= 500) return 1000 - currentXp;
    return 500 - currentXp;
}
