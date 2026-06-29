import { useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'musician' | 'fan' | 'teacher' | 'venue' | 'organizer' | 'sponsor' | 'admin';
  bio: string;
  location: string;
  followers: number;
  following: number;
  verified: boolean;
  joinedAt: string;
  genres: string[];
  instruments: string[];
}

export const DEMO_USERS: Record<string, User> = {
  'lover@example.com': {
    id: 'lover',
    name: 'Emily Johnson',
    email: 'lover@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    role: 'fan',
    bio: 'Avid live music lover, coffee enthusiast, and supporter of independent artists.',
    location: 'New York, NY',
    followers: 142,
    following: 382,
    verified: false,
    joinedAt: '2024-03-10',
    genres: ['Indie Rock', 'Acoustic', 'Folk'],
    instruments: [],
  },
  'musician@example.com': {
    id: 'musician',
    name: 'Alex Rivera',
    email: 'musician@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    role: 'musician',
    bio: 'Singer-songwriter & acoustic guitarist. Performing at local cafes and open mics across the city.',
    location: 'San Francisco, CA',
    followers: 1247,
    following: 342,
    verified: true,
    joinedAt: '2024-01-15',
    genres: ['Indie Folk', 'Acoustic', 'Jazz'],
    instruments: ['Guitar', 'Piano'],
  },
  'teacher@example.com': {
    id: 'teacher',
    name: 'Marcus Chen',
    email: 'teacher@example.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    role: 'teacher',
    bio: 'Classical piano instructor & jazz performance coach. Offering private lessons and workshops.',
    location: 'Boston, MA',
    followers: 852,
    following: 142,
    verified: true,
    joinedAt: '2023-11-05',
    genres: ['Classical', 'Jazz', 'Blues'],
    instruments: ['Piano', 'Keyboard'],
  },
  'venue@example.com': {
    id: 'venue',
    name: 'Sarah Jenkins',
    email: 'venue@example.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    role: 'venue',
    bio: "Owner of 'The Grind Cafe & Stage'. Hosting weekly acoustic gigs, open mic sessions, and local bands.",
    location: 'Austin, TX',
    followers: 3120,
    following: 610,
    verified: true,
    joinedAt: '2023-08-20',
    genres: ['Acoustic', 'Indie', 'Jazz', 'Blues'],
    instruments: [],
  },
  'organizer@example.com': {
    id: 'organizer',
    name: 'Elena Rostova',
    email: 'organizer@example.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    role: 'organizer',
    bio: "Independent concert producer & founder of 'Underground Beats' festival series.",
    location: 'Chicago, IL',
    followers: 4890,
    following: 920,
    verified: true,
    joinedAt: '2023-05-14',
    genres: ['Alternative', 'Electronic', 'Rock'],
    instruments: [],
  },
  'sponsor@example.com': {
    id: 'sponsor',
    name: 'David Vance',
    email: 'sponsor@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    role: 'sponsor',
    bio: 'Partnership Director at VibeBrew Coffee Co. Supporting local acoustic musicians and campus events.',
    location: 'Seattle, WA',
    followers: 540,
    following: 85,
    verified: true,
    joinedAt: '2024-02-18',
    genres: ['Acoustic', 'Indie Folk', 'Ambient'],
    instruments: [],
  },
  'admin@example.com': {
    id: 'admin',
    name: 'Admin Chief',
    email: 'admin@example.com',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face',
    role: 'admin',
    bio: 'System Administrator. Overseeing user safety, artist verifications, platform health, and moderation.',
    location: 'Global',
    followers: 0,
    following: 0,
    verified: true,
    joinedAt: '2023-01-01',
    genres: [],
    instruments: [],
  },
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('cacUser');
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    if (email && password.length >= 6) {
      const normalizedEmail = email.toLowerCase().trim();
      const u = DEMO_USERS[normalizedEmail] || {
        id: 'user-' + Date.now(),
        name: email.split('@')[0],
        email: email,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
        role: 'fan',
        bio: 'New music lover on ChordsAndCoffee.',
        location: 'Earth',
        followers: 0,
        following: 0,
        verified: false,
        joinedAt: new Date().toISOString().split('T')[0],
        genres: [],
        instruments: [],
      };
      setUser(u);
      localStorage.setItem('cacUser', JSON.stringify(u));
      return { success: true };
    }
    return { success: false, error: 'Invalid email or password.' };
  };

  const register = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1400));
    setLoading(false);
    if (name && email && password.length >= 6) {
      const normalizedEmail = email.toLowerCase().trim();
      const u = DEMO_USERS[normalizedEmail] || {
        id: Date.now().toString(),
        name,
        email,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
        role: 'fan',
        bio: 'New user on ChordsAndCoffee.',
        location: 'Earth',
        followers: 0,
        following: 0,
        verified: false,
        joinedAt: new Date().toISOString().split('T')[0],
        genres: [],
        instruments: [],
      };
      setUser(u);
      localStorage.setItem('cacUser', JSON.stringify(u));
      return { success: true };
    }
    return { success: false, error: 'Please fill in all fields correctly.' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cacUser');
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      const updated = { ...user, ...updates };
      setUser(updated);
      localStorage.setItem('cacUser', JSON.stringify(updated));
    }
  };

  return { user, loading, login, register, logout, updateProfile };
};
