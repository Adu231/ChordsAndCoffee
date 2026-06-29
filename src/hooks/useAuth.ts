import { useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'musician' | 'fan' | 'teacher' | 'venue' | 'organizer';
  bio: string;
  location: string;
  followers: number;
  following: number;
  verified: boolean;
  joinedAt: string;
  genres: string[];
  instruments: string[];
}

const DEMO_USER: User = {
  id: '1',
  name: 'Alex Rivera',
  email: 'alex@example.com',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  role: 'musician',
  bio: 'Acoustic guitarist and songwriter. Performing at local cafés and open mics across the city.',
  location: 'San Francisco, CA',
  followers: 1247,
  following: 342,
  verified: true,
  joinedAt: '2024-01-15',
  genres: ['Indie Folk', 'Acoustic', 'Jazz'],
  instruments: ['Guitar', 'Piano', 'Ukulele'],
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
      const u = { ...DEMO_USER, email };
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
      const u = { ...DEMO_USER, name, email, id: Date.now().toString() };
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
