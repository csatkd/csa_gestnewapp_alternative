import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'admin' | 'coach' | 'treasurer' | 'parent';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users database
const MOCK_USERS = [
  {
    id: 'admin-001',
    name: 'Maître Koné',
    email: 'admin@csa.ci',
    password: 'admin123',
    role: 'admin' as UserRole,
    avatar: '🥋'
  },
  {
    id: 'coach-001',
    name: 'Coach Traoré',
    email: 'coach@csa.ci',
    password: 'coach123',
    role: 'coach' as UserRole,
    avatar: '👨‍🏫'
  },
  {
    id: 'coach-002',
    name: 'Coach Diallo',
    email: 'diallo@csa.ci',
    password: 'coach123',
    role: 'coach' as UserRole,
    avatar: '👩‍🏫'
  },
  {
    id: 'treasurer-001',
    name: 'M. Bamba',
    email: 'tresorerie@csa.ci',
    password: 'tresor123',
    role: 'treasurer' as UserRole,
    avatar: '💰'
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Load session from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('csa_user_session');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error loading user session:', error);
        localStorage.removeItem('csa_user_session');
      }
    }
  }, []);

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    const foundUser = MOCK_USERS.find(
      u => u.email === email && u.password === password && u.role === role
    );

    if (foundUser) {
      const userData: User = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
        avatar: foundUser.avatar
      };
      
      setUser(userData);
      localStorage.setItem('csa_user_session', JSON.stringify(userData));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('csa_user_session');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
