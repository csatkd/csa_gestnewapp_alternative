export type BeltColor = 'white' | 'yellow' | 'orange' | 'green' | 'blue' | 'purple' | 'brown' | 'red' | 'black';
export type AgeCategory = 'Poussins' | 'Benjamins' | 'Minimes' | 'Cadets' | 'Juniors' | 'Seniors' | 'Veterans';
export type AttendanceStatus = 'present' | 'late' | 'excused' | 'absent';
export type PaymentStatus = 'paid' | 'partial' | 'overdue' | 'pending';
export type UserRole = 'admin' | 'coach' | 'treasurer' | 'parent';

export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'M' | 'F';
  licenseNumber: string;
  beltColor: BeltColor;
  beltRank: number;
  dan?: number;
  photo?: string;
  phone: string;
  parentPhone?: string;
  email?: string;
  address: string;
  medicalCertificateDate: string;
  medicalCertificateValidUntil: string;
  insuranceValidUntil: string;
  emergencyContact: string;
  emergencyPhone: string;
  registrationDate: string;
  weight: number;
  height: number;
  weightHistory: { date: string; weight: number }[];
  attendanceHistory: { month: string; rate: number }[];
  status: 'active' | 'inactive' | 'suspended';
}

export interface AttendanceRecord {
  id: string;
  memberId: string;
  date: string;
  time: string;
  status: AttendanceStatus;
  method: 'qr' | 'nfc' | 'manual';
  lateMinutes?: number;
  excuseReason?: string;
  sessionType: 'training' | 'grading' | 'competition' | 'special';
}

export interface GradingSession {
  id: string;
  date: string;
  time: string;
  location: string;
  maxCandidates: number;
  registeredCandidates: string[];
  status: 'upcoming' | 'in_progress' | 'completed';
  examiner?: string;
}

export interface GradingResult {
  memberId: string;
  sessionId: string;
  poomsae: number;
  kyorugi: number;
  kyokpa: number;
  hosinsul: number;
  attitude: number;
  total: number;
  passed: boolean;
  newBelt?: BeltColor;
  newDan?: number;
  comments: string;
  date: string;
}

export interface Payment {
  id: string;
  memberId: string;
  type: 'cotisation' | 'examen' | 'equipement' | 'competition';
  amount: number;
  paidAmount: number;
  date: string;
  dueDate: string;
  status: PaymentStatus;
  installments: Installment[];
  description: string;
}

export interface Installment {
  id: string;
  amount: number;
  date: string;
  method: 'cash' | 'mobile_money' | 'bank';
  receipt: string;
}

export interface Competition {
  id: string;
  name: string;
  date: string;
  location: string;
  type: 'national' | 'international' | 'regional';
  registeredAthletes: string[];
  medals: { gold: number; silver: number; bronze: number };
}

export interface InventoryItem {
  id: string;
  name: string;
  category: 'casque' | 'dobok' | 'mitaines' | 'plastron' | 'protège-tibias' | 'autre';
  stock: number;
  minStock: number;
  maxStock: number;
  unitPrice: number;
}

export interface DashboardWidget {
  id: string;
  title: string;
  category: 'performance' | 'finance' | 'attendance' | 'inventory' | 'competition';
  visible: boolean;
  order: number;
}
