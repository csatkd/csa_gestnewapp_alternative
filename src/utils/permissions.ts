// Role-based permissions system
import { UserRole } from '../components/AuthContext';

export interface Permission {
  canView: string[];
  canEdit: string[];
  canDelete: string[];
  canExport: string[];
}

export const ROLE_PERMISSIONS: Record<UserRole, Permission> = {
  admin: {
    canView: [
      'dashboard', 'members', 'cards', 'attendance', 'secretariat', 'schedule',
      'progress', 'grading', 'booking', 'trial', 'coaches', 'coach-attendance',
      'shop', 'competitions', 'whatsapp', 'calendar', 'feedback', 'videos',
      'referral', 'receipts', 'inscriptions', 'payments', 'monthly-payments',
      'booklet', 'inventory', 'incidents', 'rewards', 'communication', 'stats',
      'report', 'data', 'settings', 'user-management'
    ],
    canEdit: ['*'], // All
    canDelete: ['*'], // All
    canExport: ['*'] // All
  },
  coach: {
    canView: [
      'dashboard', 'members', 'attendance', 'secretariat', 'schedule',
      'progress', 'grading', 'coaches', 'coach-attendance', 'competitions',
      'calendar', 'feedback', 'videos', 'incidents', 'communication', 'stats'
    ],
    canEdit: [
      'attendance', 'secretariat', 'schedule', 'progress', 'grading',
      'feedback', 'incidents', 'communication'
    ],
    canDelete: [],
    canExport: ['attendance', 'stats', 'progress']
  },
  treasurer: {
    canView: [
      'dashboard', 'members', 'payments', 'monthly-payments', 'booklet',
      'receipts', 'inscriptions', 'shop', 'stats', 'report', 'communication'
    ],
    canEdit: ['payments', 'monthly-payments', 'receipts', 'inscriptions', 'shop'],
    canDelete: [],
    canExport: ['payments', 'monthly-payments', 'receipts', 'report']
  },
  parent: {
    canView: ['parents'],
    canEdit: [],
    canDelete: [],
    canExport: []
  }
};

export function hasPermission(role: UserRole, action: 'view' | 'edit' | 'delete' | 'export', resource: string): boolean {
  const permissions = ROLE_PERMISSIONS[role];
  
  switch (action) {
    case 'view':
      return permissions.canView.includes('*') || permissions.canView.includes(resource);
    case 'edit':
      return permissions.canEdit.includes('*') || permissions.canEdit.includes(resource);
    case 'delete':
      return permissions.canDelete.includes('*') || permissions.canDelete.includes(resource);
    case 'export':
      return permissions.canExport.includes('*') || permissions.canExport.includes(resource);
    default:
      return false;
  }
}

export function getAccessibleViews(role: UserRole): string[] {
  return ROLE_PERMISSIONS[role].canView;
}

export function getRoleLabel(role: UserRole): string {
  const labels: Record<UserRole, string> = {
    admin: 'Administrateur',
    coach: 'Coach',
    treasurer: 'Trésorier',
    parent: 'Parent'
  };
  return labels[role];
}

export function getRoleIcon(role: UserRole): string {
  const icons: Record<UserRole, string> = {
    admin: '👑',
    coach: '🥋',
    treasurer: '💰',
    parent: '👨‍👩‍👧‍👦'
  };
  return icons[role];
}

export function getRoleColor(role: UserRole): string {
  const colors: Record<UserRole, string> = {
    admin: 'from-purple-500 to-purple-700',
    coach: 'from-blue-500 to-blue-700',
    treasurer: 'from-emerald-500 to-emerald-700',
    parent: 'from-amber-500 to-amber-700'
  };
  return colors[role];
}
