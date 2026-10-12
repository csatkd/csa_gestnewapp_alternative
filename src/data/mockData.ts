import { Member, AttendanceRecord, GradingSession, GradingResult, Payment, Competition, InventoryItem } from '../types';

export const mockMembers: Member[] = [
  {
    id: 'M001', firstName: 'Kouassi', lastName: 'Aya Marie', dateOfBirth: '2010-03-15', gender: 'F',
    licenseNumber: 'FITKD-CI-2024-001', beltColor: 'blue', beltRank: 2,
    phone: '+225 07 12 34 56 78', parentPhone: '+225 05 98 76 54 32',
    address: 'Cocody, Abidjan', medicalCertificateDate: '2024-09-01', medicalCertificateValidUntil: '2025-09-01',
    insuranceValidUntil: '2025-06-30', emergencyContact: 'Kouassi Jean-Baptiste (Père)', emergencyPhone: '+225 05 98 76 54 32',
    registrationDate: '2022-01-15', weight: 42, height: 148,
    weightHistory: [
      { date: '2024-01', weight: 38 }, { date: '2024-02', weight: 38.5 }, { date: '2024-03', weight: 39 },
      { date: '2024-04', weight: 39.5 }, { date: '2024-05', weight: 40 }, { date: '2024-06', weight: 40.5 },
      { date: '2024-07', weight: 41 }, { date: '2024-08', weight: 41.5 }, { date: '2024-09', weight: 41.8 },
      { date: '2024-10', weight: 42 }, { date: '2024-11', weight: 42 }, { date: '2024-12', weight: 42 }
    ],
    attendanceHistory: [
      { month: 'Jan', rate: 88 }, { month: 'Fév', rate: 92 }, { month: 'Mar', rate: 85 },
      { month: 'Avr', rate: 90 }, { month: 'Mai', rate: 87 }, { month: 'Jun', rate: 91 },
      { month: 'Jul', rate: 78 }, { month: 'Aoû', rate: 82 }, { month: 'Sep', rate: 89 },
      { month: 'Oct', rate: 93 }, { month: 'Nov', rate: 95 }, { month: 'Déc', rate: 90 }
    ],
    status: 'active'
  },
  {
    id: 'M002', firstName: 'Traoré', lastName: 'Moussa', dateOfBirth: '2008-07-22', gender: 'M',
    licenseNumber: 'FITKD-CI-2024-002', beltColor: 'red', beltRank: 1,
    phone: '+225 07 23 45 67 89', parentPhone: '+225 01 23 45 67 89',
    address: 'Yopougon, Abidjan', medicalCertificateDate: '2024-06-15', medicalCertificateValidUntil: '2025-06-15',
    insuranceValidUntil: '2025-06-30', emergencyContact: 'Traoré Fatou (Mère)', emergencyPhone: '+225 01 23 45 67 89',
    registrationDate: '2020-09-01', weight: 65, height: 172,
    weightHistory: [
      { date: '2024-01', weight: 62 }, { date: '2024-02', weight: 62.5 }, { date: '2024-03', weight: 63 },
      { date: '2024-04', weight: 63.5 }, { date: '2024-05', weight: 64 }, { date: '2024-06', weight: 64.5 },
      { date: '2024-07', weight: 64.8 }, { date: '2024-08', weight: 65 }, { date: '2024-09', weight: 65 },
      { date: '2024-10', weight: 65 }, { date: '2024-11', weight: 65 }, { date: '2024-12', weight: 65 }
    ],
    attendanceHistory: [
      { month: 'Jan', rate: 95 }, { month: 'Fév', rate: 93 }, { month: 'Mar', rate: 90 },
      { month: 'Avr', rate: 88 }, { month: 'Mai', rate: 92 }, { month: 'Jun', rate: 94 },
      { month: 'Jul', rate: 80 }, { month: 'Aoû', rate: 85 }, { month: 'Sep', rate: 91 },
      { month: 'Oct', rate: 96 }, { month: 'Nov', rate: 94 }, { month: 'Déc', rate: 92 }
    ],
    status: 'active'
  },
  {
    id: 'M003', firstName: 'Bamba', lastName: 'Fatoumata', dateOfBirth: '2012-11-08', gender: 'F',
    licenseNumber: 'FITKD-CI-2024-003', beltColor: 'yellow', beltRank: 3,
    phone: '+225 07 34 56 78 90', parentPhone: '+225 05 34 56 78 90',
    address: 'Abobo, Abidjan', medicalCertificateDate: '2024-10-01', medicalCertificateValidUntil: '2025-10-01',
    insuranceValidUntil: '2025-06-30', emergencyContact: 'Bamba Ibrahim (Père)', emergencyPhone: '+225 05 34 56 78 90',
    registrationDate: '2023-03-10', weight: 35, height: 138,
    weightHistory: [
      { date: '2024-01', weight: 33 }, { date: '2024-02', weight: 33.2 }, { date: '2024-03', weight: 33.5 },
      { date: '2024-04', weight: 33.8 }, { date: '2024-05', weight: 34 }, { date: '2024-06', weight: 34.2 },
      { date: '2024-07', weight: 34.5 }, { date: '2024-08', weight: 34.7 }, { date: '2024-09', weight: 34.8 },
      { date: '2024-10', weight: 35 }, { date: '2024-11', weight: 35 }, { date: '2024-12', weight: 35 }
    ],
    attendanceHistory: [
      { month: 'Jan', rate: 82 }, { month: 'Fév', rate: 78 }, { month: 'Mar', rate: 85 },
      { month: 'Avr', rate: 80 }, { month: 'Mai', rate: 83 }, { month: 'Jun', rate: 86 },
      { month: 'Jul', rate: 72 }, { month: 'Aoû', rate: 75 }, { month: 'Sep', rate: 80 },
      { month: 'Oct', rate: 84 }, { month: 'Nov', rate: 88 }, { month: 'Déc', rate: 82 }
    ],
    status: 'active'
  },
  {
    id: 'M004', firstName: 'Koné', lastName: 'Ibrahim', dateOfBirth: '2005-01-30', gender: 'M',
    licenseNumber: 'FITKD-CI-2024-004', beltColor: 'black', beltRank: 0, dan: 1,
    phone: '+225 07 45 67 89 01', parentPhone: '+225 01 45 67 89 01',
    address: 'Plateau, Abidjan', medicalCertificateDate: '2024-08-20', medicalCertificateValidUntil: '2025-08-20',
    insuranceValidUntil: '2025-06-30', emergencyContact: 'Koné Awa (Mère)', emergencyPhone: '+225 01 45 67 89 01',
    registrationDate: '2018-09-01', weight: 72, height: 178,
    weightHistory: [
      { date: '2024-01', weight: 70 }, { date: '2024-02', weight: 70.5 }, { date: '2024-03', weight: 71 },
      { date: '2024-04', weight: 71.2 }, { date: '2024-05', weight: 71.5 }, { date: '2024-06', weight: 71.8 },
      { date: '2024-07', weight: 72 }, { date: '2024-08', weight: 72 }, { date: '2024-09', weight: 72 },
      { date: '2024-10', weight: 72 }, { date: '2024-11', weight: 72 }, { date: '2024-12', weight: 72 }
    ],
    attendanceHistory: [
      { month: 'Jan', rate: 97 }, { month: 'Fév', rate: 95 }, { month: 'Mar', rate: 96 },
      { month: 'Avr', rate: 94 }, { month: 'Mai', rate: 98 }, { month: 'Jun', rate: 95 },
      { month: 'Jul', rate: 88 }, { month: 'Aoû', rate: 90 }, { month: 'Sep', rate: 93 },
      { month: 'Oct', rate: 97 }, { month: 'Nov', rate: 96 }, { month: 'Déc', rate: 95 }
    ],
    status: 'active'
  },
  {
    id: 'M005', firstName: 'Diallo', lastName: 'Aminata', dateOfBirth: '2011-05-18', gender: 'F',
    licenseNumber: 'FITKD-CI-2024-005', beltColor: 'green', beltRank: 1,
    phone: '+225 07 56 78 90 12', parentPhone: '+225 05 56 78 90 12',
    address: 'Treichville, Abidjan', medicalCertificateDate: '2024-07-10', medicalCertificateValidUntil: '2025-07-10',
    insuranceValidUntil: '2025-06-30', emergencyContact: 'Diallo Mamadou (Père)', emergencyPhone: '+225 01 56 78 90 12',
    registrationDate: '2022-09-15', weight: 38, height: 145,
    weightHistory: [
      { date: '2024-01', weight: 36 }, { date: '2024-02', weight: 36.3 }, { date: '2024-03', weight: 36.5 },
      { date: '2024-04', weight: 36.8 }, { date: '2024-05', weight: 37 }, { date: '2024-06', weight: 37.2 },
      { date: '2024-07', weight: 37.5 }, { date: '2024-08', weight: 37.7 }, { date: '2024-09', weight: 37.8 },
      { date: '2024-10', weight: 38 }, { date: '2024-11', weight: 38 }, { date: '2024-12', weight: 38 }
    ],
    attendanceHistory: [
      { month: 'Jan', rate: 86 }, { month: 'Fév', rate: 84 }, { month: 'Mar', rate: 88 },
      { month: 'Avr', rate: 82 }, { month: 'Mai', rate: 85 }, { month: 'Jun', rate: 87 },
      { month: 'Jul', rate: 76 }, { month: 'Aoû', rate: 79 }, { month: 'Sep', rate: 83 },
      { month: 'Oct', rate: 87 }, { month: 'Nov', rate: 90 }, { month: 'Déc', rate: 85 }
    ],
    status: 'active'
  },
  {
    id: 'M006', firstName: 'Ouattara', lastName: 'Seydou', dateOfBirth: '2009-09-12', gender: 'M',
    licenseNumber: 'FITKD-CI-2024-006', beltColor: 'orange', beltRank: 2,
    phone: '+225 07 67 89 01 23', parentPhone: '+225 05 67 89 01 23',
    address: 'Marcory, Abidjan', medicalCertificateDate: '2024-05-20', medicalCertificateValidUntil: '2025-05-20',
    insuranceValidUntil: '2025-06-30', emergencyContact: 'Ouattara Mariam (Mère)', emergencyPhone: '+225 01 67 89 01 23',
    registrationDate: '2021-09-01', weight: 48, height: 155,
    weightHistory: [
      { date: '2024-01', weight: 45 }, { date: '2024-02', weight: 45.5 }, { date: '2024-03', weight: 46 },
      { date: '2024-04', weight: 46.3 }, { date: '2024-05', weight: 46.8 }, { date: '2024-06', weight: 47 },
      { date: '2024-07', weight: 47.3 }, { date: '2024-08', weight: 47.5 }, { date: '2024-09', weight: 47.8 },
      { date: '2024-10', weight: 48 }, { date: '2024-11', weight: 48 }, { date: '2024-12', weight: 48 }
    ],
    attendanceHistory: [
      { month: 'Jan', rate: 79 }, { month: 'Fév', rate: 81 }, { month: 'Mar', rate: 77 },
      { month: 'Avr', rate: 83 }, { month: 'Mai', rate: 80 }, { month: 'Jun', rate: 82 },
      { month: 'Jul', rate: 70 }, { month: 'Aoû', rate: 74 }, { month: 'Sep', rate: 78 },
      { month: 'Oct', rate: 82 }, { month: 'Nov', rate: 85 }, { month: 'Déc', rate: 80 }
    ],
    status: 'active'
  },
  {
    id: 'M007', firstName: 'Yao', lastName: 'Koffi', dateOfBirth: '2007-04-25', gender: 'M',
    licenseNumber: 'FITKD-CI-2024-007', beltColor: 'purple', beltRank: 1,
    phone: '+225 07 78 90 12 34', parentPhone: '+225 05 78 90 12 34',
    address: 'Plateau, Abidjan', medicalCertificateDate: '2024-11-01', medicalCertificateValidUntil: '2025-11-01',
    insuranceValidUntil: '2025-06-30', emergencyContact: 'Yao Akissi (Mère)', emergencyPhone: '+225 01 78 90 12 34',
    registrationDate: '2021-01-10', weight: 58, height: 168,
    weightHistory: [
      { date: '2024-01', weight: 55 }, { date: '2024-02', weight: 55.5 }, { date: '2024-03', weight: 56 },
      { date: '2024-04', weight: 56.5 }, { date: '2024-05', weight: 57 }, { date: '2024-06', weight: 57.3 },
      { date: '2024-07', weight: 57.5 }, { date: '2024-08', weight: 57.8 }, { date: '2024-09', weight: 58 },
      { date: '2024-10', weight: 58 }, { date: '2024-11', weight: 58 }, { date: '2024-12', weight: 58 }
    ],
    attendanceHistory: [
      { month: 'Jan', rate: 91 }, { month: 'Fév', rate: 89 }, { month: 'Mar', rate: 92 },
      { month: 'Avr', rate: 88 }, { month: 'Mai', rate: 90 }, { month: 'Jun', rate: 93 },
      { month: 'Jul', rate: 85 }, { month: 'Aoû', rate: 87 }, { month: 'Sep', rate: 91 },
      { month: 'Oct', rate: 94 }, { month: 'Nov', rate: 92 }, { month: 'Déc', rate: 90 }
    ],
    status: 'active'
  },
  {
    id: 'M008', firstName: 'Coulibaly', lastName: 'Salimata', dateOfBirth: '2013-08-14', gender: 'F',
    licenseNumber: 'FITKD-CI-2024-008', beltColor: 'white', beltRank: 2,
    phone: '+225 07 89 01 23 45', parentPhone: '+225 05 89 01 23 45',
    address: 'Cocody, Abidjan', medicalCertificateDate: '2024-09-15', medicalCertificateValidUntil: '2025-09-15',
    insuranceValidUntil: '2025-06-30', emergencyContact: 'Coulibaly Drissa (Père)', emergencyPhone: '+225 01 89 01 23 45',
    registrationDate: '2024-01-05', weight: 32, height: 135,
    weightHistory: [
      { date: '2024-01', weight: 30 }, { date: '2024-02', weight: 30.3 }, { date: '2024-03', weight: 30.5 },
      { date: '2024-04', weight: 30.8 }, { date: '2024-05', weight: 31 }, { date: '2024-06', weight: 31.2 },
      { date: '2024-07', weight: 31.5 }, { date: '2024-08', weight: 31.7 }, { date: '2024-09', weight: 31.8 },
      { date: '2024-10', weight: 32 }, { date: '2024-11', weight: 32 }, { date: '2024-12', weight: 32 }
    ],
    attendanceHistory: [
      { month: 'Jan', rate: 75 }, { month: 'Fév', rate: 78 }, { month: 'Mar', rate: 80 },
      { month: 'Avr', rate: 82 }, { month: 'Mai', rate: 85 }, { month: 'Jun', rate: 83 },
      { month: 'Jul', rate: 70 }, { month: 'Aoû', rate: 72 }, { month: 'Sep', rate: 76 },
      { month: 'Oct', rate: 80 }, { month: 'Nov', rate: 82 }, { month: 'Déc', rate: 78 }
    ],
    status: 'active'
  }
];

export const mockAttendanceRecords: AttendanceRecord[] = [
  { id: 'A001', memberId: 'M001', date: '2024-12-15', time: '16:00', status: 'present', method: 'qr', sessionType: 'training' },
  { id: 'A002', memberId: 'M002', date: '2024-12-15', time: '15:55', status: 'present', method: 'nfc', sessionType: 'training' },
  { id: 'A003', memberId: 'M003', date: '2024-12-15', time: '16:15', status: 'late', method: 'manual', lateMinutes: 15, sessionType: 'training' },
  { id: 'A004', memberId: 'M004', date: '2024-12-15', time: '15:50', status: 'present', method: 'qr', sessionType: 'training' },
  { id: 'A005', memberId: 'M005', date: '2024-12-15', time: '00:00', status: 'absent', method: 'manual', sessionType: 'training' },
  { id: 'A006', memberId: 'M006', date: '2024-12-15', time: '16:05', status: 'present', method: 'qr', sessionType: 'training' },
  { id: 'A007', memberId: 'M007', date: '2024-12-15', time: '16:02', status: 'present', method: 'nfc', sessionType: 'training' },
  { id: 'A008', memberId: 'M008', date: '2024-12-15', time: '16:20', status: 'late', method: 'manual', lateMinutes: 20, sessionType: 'training' },
  { id: 'A009', memberId: 'M001', date: '2024-12-14', time: '16:00', status: 'present', method: 'qr', sessionType: 'training' },
  { id: 'A010', memberId: 'M002', date: '2024-12-14', time: '16:10', status: 'late', method: 'nfc', lateMinutes: 10, sessionType: 'training' },
  { id: 'A011', memberId: 'M003', date: '2024-12-14', time: '16:00', status: 'present', method: 'manual', sessionType: 'training' },
  { id: 'A012', memberId: 'M004', date: '2024-12-14', time: '15:58', status: 'present', method: 'qr', sessionType: 'training' },
];

export const mockGradingSessions: GradingSession[] = [
  { id: 'G001', date: '2025-01-20', time: '09:00', location: 'Dojang CSA - Cocody, Abidjan', maxCandidates: 20, registeredCandidates: ['M001', 'M002', 'M003', 'M005', 'M006'], status: 'upcoming' },
  { id: 'G002', date: '2025-04-15', time: '09:00', location: 'Dojang CSA - Cocody, Abidjan', maxCandidates: 25, registeredCandidates: [], status: 'upcoming' },
  { id: 'G003', date: '2024-10-10', time: '09:00', location: 'Dojang CSA - Cocody, Abidjan', maxCandidates: 15, registeredCandidates: ['M001', 'M004'], status: 'completed', examiner: 'Maître Koné' },
];

export const mockGradingResults: GradingResult[] = [
  { memberId: 'M004', sessionId: 'G003', poomsae: 18, kyorugi: 17, kyokpa: 19, hosinsul: 16, attitude: 18, total: 88, passed: true, newBelt: 'black', newDan: 1, comments: 'Excellent candidat, maîtrise technique remarquable.', date: '2024-10-10' },
  { memberId: 'M001', sessionId: 'G003', poomsae: 15, kyorugi: 14, kyokpa: 16, hosinsul: 13, attitude: 15, total: 73, passed: true, comments: 'Bon résultat, progression constante.', date: '2024-10-10' },
];

export const mockPayments: Payment[] = [
  {
    id: 'P001', memberId: 'M001', type: 'cotisation', amount: 75000, paidAmount: 50000,
    date: '2024-09-01', dueDate: '2024-12-31', status: 'partial',
    installments: [
      { id: 'I001', amount: 25000, date: '2024-09-15', method: 'mobile_money', receipt: 'OM-2024-0915-001' },
      { id: 'I002', amount: 25000, date: '2024-11-20', method: 'cash', receipt: 'CSA-2024-1120-001' },
    ],
    description: 'Cotisation annuelle 2024'
  },
  {
    id: 'P002', memberId: 'M001', type: 'examen', amount: 15000, paidAmount: 15000,
    date: '2024-10-01', dueDate: '2024-10-10', status: 'paid',
    installments: [
      { id: 'I003', amount: 15000, date: '2024-10-05', method: 'cash', receipt: 'CSA-2024-1005-002' },
    ],
    description: 'Frais passage de grade Ceinture Bleue 2ème Dan'
  },
  {
    id: 'P003', memberId: 'M002', type: 'cotisation', amount: 75000, paidAmount: 75000,
    date: '2024-09-01', dueDate: '2024-12-31', status: 'paid',
    installments: [
      { id: 'I004', amount: 75000, date: '2024-09-01', method: 'bank', receipt: 'VIR-2024-0901-001' },
    ],
    description: 'Cotisation annuelle 2024'
  },
  {
    id: 'P004', memberId: 'M003', type: 'cotisation', amount: 50000, paidAmount: 20000,
    date: '2024-09-01', dueDate: '2024-12-31', status: 'overdue',
    installments: [
      { id: 'I005', amount: 20000, date: '2024-09-10', method: 'mobile_money', receipt: 'WAVE-2024-0910-001' },
    ],
    description: 'Cotisation annuelle junior 2024'
  },
  {
    id: 'P005', memberId: 'M004', type: 'cotisation', amount: 100000, paidAmount: 100000,
    date: '2024-09-01', dueDate: '2024-12-31', status: 'paid',
    installments: [
      { id: 'I006', amount: 50000, date: '2024-09-01', method: 'bank', receipt: 'VIR-2024-0901-002' },
      { id: 'I007', amount: 50000, date: '2024-10-01', method: 'bank', receipt: 'VIR-2024-1001-001' },
    ],
    description: 'Cotisation annuelle senior 2024'
  },
  {
    id: 'P006', memberId: 'M005', type: 'cotisation', amount: 50000, paidAmount: 35000,
    date: '2024-09-01', dueDate: '2024-12-31', status: 'partial',
    installments: [
      { id: 'I008', amount: 20000, date: '2024-09-15', method: 'mobile_money', receipt: 'MTN-2024-0915-001' },
      { id: 'I009', amount: 15000, date: '2024-11-10', method: 'cash', receipt: 'CSA-2024-1110-001' },
    ],
    description: 'Cotisation annuelle junior 2024'
  },
];

export const mockCompetitions: Competition[] = [
  { id: 'C001', name: 'Championnat National FITKD 2025', date: '2025-03-15', location: 'Palais des Sports, Treichville, Abidjan', type: 'national', registeredAthletes: ['M001', 'M002', 'M004'], medals: { gold: 3, silver: 2, bronze: 4 } },
  { id: 'C002', name: 'Open International de Taekwondo', date: '2025-05-20', location: 'Dakar, Sénégal', type: 'international', registeredAthletes: ['M002', 'M004'], medals: { gold: 1, silver: 1, bronze: 2 } },
  { id: 'C003', name: 'Coupe Régionale Zone Sud', date: '2025-02-08', location: 'San-Pédro', type: 'regional', registeredAthletes: ['M001', 'M003', 'M005', 'M006'], medals: { gold: 2, silver: 3, bronze: 1 } },
];

export const mockInventory: InventoryItem[] = [
  { id: 'INV001', name: 'Casques de combat', category: 'casque', stock: 8, minStock: 5, maxStock: 20, unitPrice: 15000 },
  { id: 'INV002', name: 'Doboks blancs (taille M)', category: 'dobok', stock: 3, minStock: 5, maxStock: 30, unitPrice: 12000 },
  { id: 'INV003', name: 'Mitaines de frappe', category: 'mitaines', stock: 12, minStock: 8, maxStock: 25, unitPrice: 8000 },
  { id: 'INV004', name: 'Plastrons électroniques', category: 'plastron', stock: 2, minStock: 5, maxStock: 15, unitPrice: 45000 },
  { id: 'INV005', name: 'Protège-tibias', category: 'protège-tibias', stock: 15, minStock: 10, maxStock: 30, unitPrice: 5000 },
];

export const attendance30DaysData = Array.from({ length: 30 }, (_, i) => {
  const date = new Date(2024, 11, 15 - (29 - i));
  return {
    date: `${date.getDate()}/${date.getMonth() + 1}`,
    fullDate: date.toISOString().split('T')[0],
    rate: Math.round(75 + Math.random() * 20),
    present: Math.round(4 + Math.random() * 2),
    late: Math.round(Math.random() * 2),
    absent: Math.round(Math.random() * 2),
  };
});
