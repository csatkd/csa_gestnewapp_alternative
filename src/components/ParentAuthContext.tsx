import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { mockMembers } from '../data/mockData';

interface ParentAuthContextType {
  isAuthenticated: boolean;
  parentPhone: string | null;
  childrenIds: string[];
  login: (licenseNumber: string) => boolean;
  logout: () => void;
}

const ParentAuthContext = createContext<ParentAuthContextType | undefined>(undefined);

export function ParentAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [parentPhone, setParentPhone] = useState<string | null>(null);
  const [childrenIds, setChildrenIds] = useState<string[]>([]);

  // Load session from localStorage on mount
  useEffect(() => {
    const savedSession = localStorage.getItem('csa_parent_session');
    if (savedSession) {
      try {
        const session = JSON.parse(savedSession);
        setIsAuthenticated(session.isAuthenticated);
        setParentPhone(session.parentPhone);
        setChildrenIds(session.childrenIds);
      } catch (error) {
        console.error('Error loading session:', error);
        localStorage.removeItem('csa_parent_session');
      }
    }
  }, []);

  const login = (licenseNumber: string): boolean => {
    // Find member by license number
    const member = mockMembers.find(m => m.licenseNumber === licenseNumber);
    
    if (!member) {
      return false;
    }

    // Check if member has a parent phone
    if (!member.parentPhone) {
      return false;
    }

    // Find all children with the same parent phone
    const siblings = mockMembers.filter(m => m.parentPhone === member.parentPhone);
    const siblingIds = siblings.map(s => s.id);

    // Set authentication state
    setIsAuthenticated(true);
    setParentPhone(member.parentPhone);
    setChildrenIds(siblingIds);

    // Save session to localStorage
    const session = {
      isAuthenticated: true,
      parentPhone: member.parentPhone,
      childrenIds: siblingIds,
      loginTime: new Date().toISOString(),
    };
    localStorage.setItem('csa_parent_session', JSON.stringify(session));

    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setParentPhone(null);
    setChildrenIds([]);
    localStorage.removeItem('csa_parent_session');
  };

  return (
    <ParentAuthContext.Provider value={{ isAuthenticated, parentPhone, childrenIds, login, logout }}>
      {children}
    </ParentAuthContext.Provider>
  );
}

export function useParentAuth() {
  const context = useContext(ParentAuthContext);
  if (context === undefined) {
    throw new Error('useParentAuth must be used within a ParentAuthProvider');
  }
  return context;
}
