import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { initialUsers } from '../data/initialData';

interface AuthContextType {
  currentUser: User | null;
  allUsers: User[];
  login: (usernameOrEmail: string, password?: string) => Promise<boolean>;
  loginAsDemo: (demoKey: string) => void;
  register: (userData: Partial<User> & { password?: string }) => Promise<User>;
  updateProfile: (updatedData: Partial<User>) => void;
  logout: () => void;
  isAuthModalOpen: boolean;
  authModalTab: 'login' | 'register' | 'forgot';
  setAuthModalTab: (tab: 'login' | 'register' | 'forgot') => void;
  openAuthModal: (tab?: 'login' | 'register' | 'forgot') => void;
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [allUsers, setAllUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('kisansetu_users');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing stored users', e);
      }
    }
    return initialUsers;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('kisansetu_current_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing stored current user', e);
      }
    }
    // Default to Rajesh Farmer or null
    return initialUsers[0];
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register' | 'forgot'>('login');

  useEffect(() => {
    localStorage.setItem('kisansetu_users', JSON.stringify(allUsers));
  }, [allUsers]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('kisansetu_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('kisansetu_current_user');
    }
  }, [currentUser]);

  const login = async (usernameOrEmail: string, _password?: string): Promise<boolean> => {
    const cleanInput = usernameOrEmail.trim().toLowerCase();
    const found = allUsers.find(
      u => u.username.toLowerCase() === cleanInput || u.email.toLowerCase() === cleanInput || u.phone.replace(/[\s-]/g, '') === cleanInput.replace(/[\s-]/g, '')
    );
    if (found) {
      setCurrentUser(found);
      setIsAuthModalOpen(false);
      return true;
    }
    return false;
  };

  const loginAsDemo = (demoKey: string) => {
    const found = allUsers.find(u => u.username === demoKey || u.id === demoKey);
    if (found) {
      setCurrentUser(found);
      setIsAuthModalOpen(false);
    }
  };

  const register = async (userData: Partial<User> & { password?: string }): Promise<User> => {
    const newId = `usr_${userData.role || 'consumer'}_${Date.now()}`;
    const newUser: User = {
      id: newId,
      username: userData.username || `user_${Date.now().toString().slice(-4)}`,
      name: userData.name || 'New User',
      email: userData.email || '',
      phone: userData.phone || '',
      role: (userData.role as UserRole) || 'consumer',
      avatar: userData.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80',
      location: userData.location,
      farmerProfile: userData.farmerProfile,
      workerProfile: userData.workerProfile
    };

    setAllUsers(prev => [newUser, ...prev]);
    setCurrentUser(newUser);
    setIsAuthModalOpen(false);
    return newUser;
  };

  const updateProfile = (updatedData: Partial<User>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updatedData };
    setCurrentUser(updated);
    setAllUsers(prev => prev.map(u => u.id === updated.id ? updated : u));
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const openAuthModal = (tab: 'login' | 'register' | 'forgot' = 'login') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        allUsers,
        login,
        loginAsDemo,
        register,
        updateProfile,
        logout,
        isAuthModalOpen,
        authModalTab,
        setAuthModalTab,
        openAuthModal,
        closeAuthModal
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
