import { useState, useEffect } from 'react';
import { Member, AttendanceRecord, Payment } from '../types';

// Local Storage Keys
const STORAGE_KEYS = {
  MEMBERS: 'csa_members',
  ATTENDANCE: 'csa_attendance',
  PAYMENTS: 'csa_payments',
  SETTINGS: 'csa_settings',
};

// Save to localStorage
export function saveToStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

// Load from localStorage
export function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return defaultValue;
  }
}

// Clear all data
export function clearAllData(): void {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
}

// Export all data as JSON
export function exportAllData(): string {
  const data = {
    members: loadFromStorage<Member[]>(STORAGE_KEYS.MEMBERS, []),
    attendance: loadFromStorage<AttendanceRecord[]>(STORAGE_KEYS.ATTENDANCE, []),
    payments: loadFromStorage<Payment[]>(STORAGE_KEYS.PAYMENTS, []),
    exportDate: new Date().toISOString(),
    version: '1.0.0',
  };
  return JSON.stringify(data, null, 2);
}

// Import data from JSON
export function importAllData(jsonData: string): boolean {
  try {
    const data = JSON.parse(jsonData);
    if (data.members) saveToStorage(STORAGE_KEYS.MEMBERS, data.members);
    if (data.attendance) saveToStorage(STORAGE_KEYS.ATTENDANCE, data.attendance);
    if (data.payments) saveToStorage(STORAGE_KEYS.PAYMENTS, data.payments);
    return true;
  } catch (error) {
    console.error('Error importing data:', error);
    return false;
  }
}

// Data validation
export function validateMember(member: Partial<Member>): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!member.firstName?.trim()) errors.push('Le prénom est requis');
  if (!member.lastName?.trim()) errors.push('Le nom est requis');
  if (!member.dateOfBirth) errors.push('La date de naissance est requise');
  if (!member.phone?.trim()) errors.push('Le téléphone est requis');
  if (!member.address?.trim()) errors.push('L\'adresse est requise');
  if (!member.emergencyContact?.trim()) errors.push('Le contact d\'urgence est requis');
  if (!member.emergencyPhone?.trim()) errors.push('Le téléphone d\'urgence est requis');

  // Validate phone format (Ivory Coast)
  if (member.phone && !/^\+225\s?\d{2}\s?\d{2}\s?\d{2}\s?\d{2}$/.test(member.phone.replace(/\s/g, ''))) {
    errors.push('Format de téléphone invalide (ex: +225 07 12 34 56 78)');
  }

  // Validate age
  if (member.dateOfBirth) {
    const age = Math.floor((Date.now() - new Date(member.dateOfBirth).getTime()) / (365.25 * 24 * 60 * 60 * 1000));
    if (age < 4 || age > 80) {
      errors.push('L\'âge doit être entre 4 et 80 ans');
    }
  }

  // Validate weight and height
  if (member.weight && (member.weight < 20 || member.weight > 200)) {
    errors.push('Le poids doit être entre 20 et 200 kg');
  }
  if (member.height && (member.height < 80 || member.height > 220)) {
    errors.push('La taille doit être entre 80 et 220 cm');
  }

  return { valid: errors.length === 0, errors };
}

// Generate unique ID
export function generateId(prefix: string = ''): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `${prefix}${timestamp}${random}`.toUpperCase();
}

// Format currency
export function formatFCFA(amount: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XOF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Format date
export function formatDate(date: string | Date, format: 'short' | 'long' | 'full' = 'short'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  if (format === 'short') {
    return d.toLocaleDateString('fr-FR');
  } else if (format === 'long') {
    return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  } else {
    return d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  }
}

// Calculate statistics
export function calculateStatistics(members: Member[]) {
  const total = members.length;
  const active = members.filter(m => m.status === 'active').length;
  const inactive = members.filter(m => m.status === 'inactive').length;
  
  const avgAttendance = members.reduce((sum, m) => {
    const avg = m.attendanceHistory.reduce((s, a) => s + a.rate, 0) / m.attendanceHistory.length;
    return sum + avg;
  }, 0) / total;

  const beltDistribution = members.reduce((acc, m) => {
    acc[m.beltColor] = (acc[m.beltColor] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const ageDistribution = members.reduce((acc, m) => {
    const age = Math.floor((Date.now() - new Date(m.dateOfBirth).getTime()) / (365.25 * 24 * 60 * 60 * 1000));
    const category = age <= 12 ? 'Enfant' : age <= 17 ? 'Adolescent' : 'Adulte';
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    total,
    active,
    inactive,
    avgAttendance: Math.round(avgAttendance),
    beltDistribution,
    ageDistribution,
  };
}

// Debounce hook
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
