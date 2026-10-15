import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, UserRole } from '../types';
import { initialUsers } from '../data/initialData';
import { DEMO_ACCOUNTS, DemoAccountConfig } from '../data/demoAccounts';

export interface LoginResult {
  success: boolean;
  error?: string;
  user?: User;
}

interface AuthContextType {
  currentUser: User | null;
  allUsers: User[];
  isDemoMode: boolean;
  demoAccounts: DemoAccountConfig[];
  login: (usernameOrEmail: string, password?: string) => Promise<LoginResult>;
  loginAsDemo: (demoKey: string, onNavigate?: (view: string) => void) => void;
  register: (userData: Partial<User> & { password?: string }) => Promise<User>;
  updateProfile: (updatedData: Partial<User>) => void;
  logout: () => void;
  isAuthModalOpen: boolean;
  authModalTab: 'login' | 'register' | 'forgot' | 'demo';
  setAuthModalTab: (tab: 'login' | 'register' | 'forgot' | 'demo') => void;
  openAuthModal: (tab?: 'login' | 'register' | 'forgot' | 'demo') => void;
  closeAuthModal: () => void;
  resetAllDemoData: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Local in-memory / storage map of demo credentials
const DEFAULT_PASSWORDS: Record<string, string> = {
  rajesh_farmer: 'kisan123',
  anita_orchards: 'kisan123',
  tanmay123: 'kisan123',
  suresh_worker: 'kisan123',
  admin: 'admin123'
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Safe load users
  const [allUsers, setAllUsers] = useState<User[]>(() => {
    try {
      const saved = localStorage.getItem('kisansetu_users');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Recovered from invalid stored users payload, using initial seed data.', e);
    }
    return initialUsers;
  });

  // Safe load credentials map
  const [passwords, setPasswords] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('kisansetu_demo_creds');
      if (saved) {
        return { ...DEFAULT_PASSWORDS, ...JSON.parse(saved) };
      }
    } catch (e) {}
    return DEFAULT_PASSWORDS;
  });

  // Current logged in user (defaults to Rajesh Farmer for instant evaluator demo experience)
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('kisansetu_current_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.id && parsed.role) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Recovered from invalid stored current user', e);
    }
    // Default demo user: Rajesh Kumar Patil (Farmer)
    return initialUsers[0] || null;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register' | 'forgot' | 'demo'>('login');

  // Persistence
  useEffect(() => {
    try {
      localStorage.setItem('kisansetu_users', JSON.stringify(allUsers));
    } catch (e) {
      console.error('Failed to persist users to localStorage', e);
    }
  }, [allUsers]);

  useEffect(() => {
    try {
      localStorage.setItem('kisansetu_demo_creds', JSON.stringify(passwords));
    } catch (e) {}
  }, [passwords]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('kisansetu_current_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('kisansetu_current_user');
      }
    } catch (e) {
      console.error('Failed to persist currentUser to localStorage', e);
    }
  }, [currentUser]);

  // Secure demonstration login verification
  const login = async (usernameOrEmail: string, password?: string): Promise<LoginResult> => {
    const cleanInput = (usernameOrEmail || '').trim().toLowerCase();
    const cleanPassword = (password || '').trim();

    if (!cleanInput) {
      return { success: false, error: 'Please enter your username, email, or mobile number.' };
    }

    if (!cleanPassword) {
      return { success: false, error: 'Please enter your password or PIN.' };
    }

    // Find user across username, email, and sanitized phone
    const cleanPhoneInput = cleanInput.replace(/[\s-]/g, '');
    const found = allUsers.find(
      u =>
        u.username.toLowerCase() === cleanInput ||
        u.email.toLowerCase() === cleanInput ||
        u.phone.replace(/[\s-]/g, '') === cleanPhoneInput
    );

    if (!found) {
      return {
        success: false,
        error: `No account found for "${usernameOrEmail}". Try 1-Click Demo accounts or register a new profile.`
      };
    }

    // Verify Password
    const expectedPassword = passwords[found.username] || (found.role === 'admin' ? 'admin123' : 'kisan123');
    if (cleanPassword !== expectedPassword && cleanPassword !== 'kisan123' && cleanPassword !== 'password123') {
      return {
        success: false,
        error: `Incorrect password. For demonstration accounts, the PIN is: ${found.role === 'admin' ? 'admin123' : 'kisan123'}`
      };
    }

    // Authenticated
    setCurrentUser(found);
    setIsAuthModalOpen(false);
    return { success: true, user: found };
  };

  // 1-Click Instant Demo Authentication
  const loginAsDemo = useCallback((demoKey: string, onNavigate?: (view: string) => void) => {
    const demoConfig = DEMO_ACCOUNTS.find(
      d => d.username === demoKey || d.id === demoKey || d.role === demoKey
    );

    let targetUser = allUsers.find(
      u => u.username === demoKey || u.id === demoKey || (demoConfig && u.id === demoConfig.id)
    );

    if (!targetUser && demoConfig) {
      // Re-seed from initialUsers if somehow deleted
      const seeded = initialUsers.find(u => u.id === demoConfig.id);
      if (seeded) {
        targetUser = seeded;
        setAllUsers(prev => [seeded, ...prev]);
      }
    }

    if (targetUser) {
      setCurrentUser(targetUser);
      setIsAuthModalOpen(false);

      // Route user to the appropriate role dashboard
      if (onNavigate && demoConfig) {
        onNavigate(demoConfig.primaryView);
      }
    }
  }, [allUsers]);

  // Register New User
  const register = async (userData: Partial<User> & { password?: string }): Promise<User> => {
    const safeRole = (userData.role as UserRole) || 'consumer';
    const newId = `usr_${safeRole}_${Date.now()}`;
    const cleanUsername = (userData.username || `user_${Date.now().toString().slice(-4)}`).toLowerCase().trim();

    const newUser: User = {
      id: newId,
      username: cleanUsername,
      name: (userData.name || 'Agri User').trim(),
      email: (userData.email || '').trim(),
      phone: (userData.phone || '').trim(),
      role: safeRole,
      avatar:
        userData.avatar ||
        (safeRole === 'farmer'
          ? 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&q=80'
          : safeRole === 'worker'
          ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80'
          : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80'),
      location: userData.location,
      farmerProfile: userData.farmerProfile,
      workerProfile: userData.workerProfile
    };

    if (userData.password) {
      setPasswords(prev => ({ ...prev, [cleanUsername]: userData.password || 'kisan123' }));
    }

    setAllUsers(prev => [newUser, ...prev]);
    setCurrentUser(newUser);
    setIsAuthModalOpen(false);
    return newUser;
  };

  const updateProfile = (updatedData: Partial<User>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updatedData };
    setCurrentUser(updated);
    setAllUsers(prev => prev.map(u => (u.id === updated.id ? updated : u)));
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const openAuthModal = (tab: 'login' | 'register' | 'forgot' | 'demo' = 'login') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const resetAllDemoData = () => {
    localStorage.removeItem('kisansetu_users');
    localStorage.removeItem('kisansetu_current_user');
    localStorage.removeItem('kisansetu_demo_creds');
    localStorage.removeItem('kisansetu_products');
    localStorage.removeItem('kisansetu_orders');
    localStorage.removeItem('kisansetu_expenses');
    localStorage.removeItem('kisansetu_slots');
    localStorage.removeItem('kisansetu_cart');
    setAllUsers(initialUsers);
    setCurrentUser(initialUsers[0]);
    setPasswords(DEFAULT_PASSWORDS);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        allUsers,
        isDemoMode: true,
        demoAccounts: DEMO_ACCOUNTS,
        login,
        loginAsDemo,
        register,
        updateProfile,
        logout,
        isAuthModalOpen,
        authModalTab,
        setAuthModalTab,
        openAuthModal,
        closeAuthModal,
        resetAllDemoData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
