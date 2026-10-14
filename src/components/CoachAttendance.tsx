import { useState } from 'react';
import { Calendar, Clock, Users, CheckCircle, XCircle, AlertCircle, Download, Filter, TrendingUp, UserCheck } from 'lucide-react';
import { exportToCSV } from '../utils/helpers';

interface CoachAttendanceRecord {
  id: string;
  coachId: string;
  coachName: string;
  date: string;
  checkIn: string;
  checkOut?: string;
  status: 'present' | 'late' | 'absent' | 'excused';
  sessionType: 'training' | 'meeting' | 'competition' | 'admin';
  hoursWorked?: number;
  notes?: string;
}

interface CoachSchedule {
  coachId: string;
  coachName: string;
  monday: string[];
  tuesday: string[];
  wednesday: string[];
  thursday: string[];
  friday: string[];
  saturday: string[];
  sunday: string[];
  totalHoursPerWeek: number;
}

const mockCoachAttendance: CoachAttendanceRecord[] = [
  {
    id: 'CA001',
    coachId: 'C001',
    coachName: 'Koné Ibrahim',
    date: '2024-12-15',
    checkIn: '08:00',
    checkOut: '17:00',
    status: 'present',
    sessionType: 'training',
    hoursWorked: 9,
    notes: 'Cours enfants + adolescents'
  },
  {
    id: 'CA002',
    coachId: 'C002',
    coachName: 'Traoré Moussa',
    date: '2024-12-15',
    checkIn: '09:00',
    checkOut: '18:00',
    status: 'present',
    sessionType: 'training',
    hoursWorked: 9,
    notes: 'Préparation compétition'
  },
  {
    id: 'CA003',
    coachId: 'C003',
    coachName: 'Diallo Aminata',
    date: '2024-12-15',
    checkIn: '08:30',
    checkOut: '16:30',
    status: 'present',
    sessionType: 'training',
    hoursWorked: 8,
    notes: 'Cours débutants'
  },
  {
    id: 'CA004',
    coachId: 'C004',
    coachName: 'Bamba Fatoumata',
    date: '2024-12-15',
    checkIn: '00:00',
    status: 'excused',
    sessionType: 'training',
    notes: 'Congé maladie'
  },
  {
    id: 'CA005',
    coachId: 'C001',
    coachName: 'Koné Ibrahim',
    date: '2024-12-14',
    checkIn: '08:00',
    checkOut: '17:00',
    status: 'present',
    sessionType: 'training',
    hoursWorked: 9
  },
  {
    id: 'CA006',
    coachId: 'C002',
    coachName: 'Traoré Moussa',
    date: '2024-12-14',
    checkIn: '09:15',
    checkOut: '18:00',
    status: 'late',
    sessionType: 'training',
    hoursWorked: 8.75,
    notes: 'Retard 15 min - embouteillage'
  },
  {
    id: 'CA007',
    coachId: 'C003',
    coachName: 'Diallo Aminata',
    date: '2024-12-14',
    checkIn: '08:00',
    checkOut: '16:30',
    status: 'present',
    sessionType: 'training',
    hoursWorked: 8.5
  },
  {
    id: 'CA008',
    coachId: 'C004',
    coachName: 'Bamba Fatoumata',
    date: '2024-12-14',
    checkIn: '08:30',
    checkOut: '17:00',
    status: 'present',
    sessionType: 'competition',
    hoursWorked: 8.5,
    notes: 'Accompagnement compétition régionale'
  }
];

const mockCoachSchedules: CoachSchedule[] = [
  {
    coachId: 'C001',
    coachName: 'Koné Ibrahim',
    monday: ['16:00-17:30', '18:00-19:30'],
    tuesday: ['16:00-17:30'],
    wednesday: ['10:00-11:30', '16:00-17:30'],
    thursday: ['16:00-17:30'],
    friday: ['16:00-17:30', '18:00-20:00'],
    saturday: ['09:00-11:00', '11:00-12:30'],
    sunday: [],
    totalHoursPerWeek: 28
  },
  {
    coachId: 'C002',
    coachName: 'Traoré Moussa',
    monday: ['18:00-19:30'],
    tuesday: ['18:00-20:00'],
    wednesday: [],
    thursday: ['18:00-19:30'],
    friday: ['18:00-20:00'],
    saturday: ['14:00-16:00'],
    sunday: [],
    totalHoursPerWeek: 18
  },
  {
    coachId: 'C003',
    coachName: 'Diallo Aminata',
    monday: ['16:00-17:30'],
    tuesday: ['16:00-17:30'],
    wednesday: ['16:00-17:30'],
    thursday: ['16:00-17:30'],
    friday: ['16:00-17:30'],
    saturday: ['09:00-10:30'],
    sunday: [],
    totalHoursPerWeek: 22
  },
  {
    coachId: 'C004',
    coachName: 'Bamba Fatoumata',
    monday: [],
    tuesday: ['18:00-19:30'],
    wednesday: ['10:00-11:30'],
    thursday: ['18:00-19:30'],
    friday: [],
    saturday: ['14:00-16:00'],
    sunday: [],
    totalHoursPerWeek: 14
  }
];

export default function CoachAttendance() {
  const [attendanceRecords, setAttendanceRecords] = useState<CoachAttendanceRecord[]>(mockCoachAttendance);
  const [selectedDate, setSelectedDate] = useState('2024-12-15');
  const [filterCoach, setFilterCoach] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'attendance' | 'schedule' | 'stats'>('attendance');

  const filteredRecords = attendanceRecords.filter(record => {
    const matchDate = record.date === selectedDate;
    const matchCoach = filterCoach === 'all' || record.coachId === filterCoach;
    const matchStatus = filterStatus === 'all' || record.status === filterStatus;
    return matchDate && matchCoach && matchStatus;
  });

  // Statistics
  const todayRecords = attendanceRecords.filter(r => r.date === selectedDate);
  const presentCount = todayRecords.filter(r => r.status === 'present').length;
  const lateCount = todayRecords.filter(r => r.status === 'late').length;
  const absentCount = todayRecords.filter(r => r.status === 'absent').length;
  const excusedCount = todayRecords.filter(r => r.status === 'excused').length;
  const attendanceRate = todayRecords.length > 0 
    ? Math.round(((presentCount + lateCount) / todayRecords.length) * 100) 
    : 0;

  // Monthly statistics per coach
  const getCoachMonthlyStats = (coachId: string) => {
    const coachRecords = attendanceRecords.filter(r => r.coachId === coachId);
    const present = coachRecords.filter(r => r.status === 'present').length;
    const late = coachRecords.filter(r => r.status === 'late').length;
    const total = coachRecords.length;
    const rate = total > 0 ? Math.round(((present + late) / total) * 100) : 0;
    const totalHours = coachRecords.reduce((sum, r) => sum + (r.hoursWorked || 0), 0);
    
    return { present, late, total, rate, totalHours };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'late': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'absent': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'excused': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'present': return 'Présent';
      case 'late': return 'En retard';
      case 'absent': return 'Absent';
      case 'excused': return 'Excusé';
      default: return status;
    }
  };

  const handleExport = () => {
    const exportData = filteredRecords.map(record => ({
      date: record.date,
      coach: record.coachName,
      arrivee: record.checkIn,
      depart: record.checkOut || 'N/A',
      statut: getStatusLabel(record.status),
      heures: record.hoursWorked || 0,
      type: record.sessionType,
      notes: record.notes || ''
    }));
    exportToCSV(exportData, `assiduite_coachs_${selectedDate}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Assiduité des Coachs</h2>
          <p className="text-slate-400 text-sm">Pointage et suivi des présences</p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Download className="w-4 h-4" />
          Exporter CSV
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 rounded-xl p-5 border border-emerald-500/20">
          <div className="flex items-center justify-between mb-3">
            <CheckCircle className="w-8 h-8 text-emerald-400" />
            <span className="text-emerald-400 text-xs font-medium bg-emerald-500/20 px-2 py-1 rounded">Aujourd'hui</span>
          </div>
          <p className="text-slate-400 text-sm">Présents</p>
          <p className="text-3xl font-bold text-white mt-1">{presentCount}</p>
        </div>

        <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 rounded-xl p-5 border border-amber-500/20">
          <div className="flex items-center justify-between mb-3">
            <Clock className="w-8 h-8 text-amber-400" />
            <span className="text-amber-400 text-xs font-medium bg-amber-500/20 px-2 py-1 rounded">Aujourd'hui</span>
          </div>
          <p className="text-slate-400 text-sm">Retards</p>
          <p className="text-3xl font-bold text-white mt-1">{lateCount}</p>
        </div>

        <div className="bg-gradient-to-br from-red-500/10 to-red-600/5 rounded-xl p-5 border border-red-500/20">
          <div className="flex items-center justify-between mb-3">
            <XCircle className="w-8 h-8 text-red-400" />
            <span className="text-red-400 text-xs font-medium bg-red-500/20 px-2 py-1 rounded">Aujourd'hui</span>
          </div>
          <p className="text-slate-400 text-sm">Absents</p>
          <p className="text-3xl font-bold text-white mt-1">{absentCount}</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-xl p-5 border border-blue-500/20">
          <div className="flex items-center justify-between mb-3">
            <AlertCircle className="w-8 h-8 text-blue-400" />
            <span className="text-blue-400 text-xs font-medium bg-blue-500/20 px-2 py-1 rounded">Aujourd'hui</span>
          </div>
          <p className="text-slate-400 text-sm">Excusés</p>
          <p className="text-3xl font-bold text-white mt-1">{excusedCount}</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-xl p-5 border border-purple-500/20">
          <div className="flex items-center justify-between mb-3">
            <TrendingUp className="w-8 h-8 text-purple-400" />
            <span className="text-purple-400 text-xs font-medium bg-purple-500/20 px-2 py-1 rounded">Taux</span>
          </div>
          <p className="text-slate-400 text-sm">Assiduité</p>
          <p className="text-3xl font-bold text-white mt-1">{attendanceRate}%</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('attendance')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'attendance'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'bg-slate-800 text-slate-400 border border-slate-700'
          }`}
        >
          Pointage
        </button>
        <button
          onClick={() => setActiveTab('schedule')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'schedule'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'bg-slate-800 text-slate-400 border border-slate-700'
          }`}
        >
          Planning Hebdo
        </button>
        <button
          onClick={() => setActiveTab('stats')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'stats'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'bg-slate-800 text-slate-400 border border-slate-700'
          }`}
        >
          Statistiques
        </button>
      </div>

      {/* Attendance Tab */}
      {activeTab === 'attendance' && (
        <>
          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <div>
              <label className="text-slate-400 text-sm block mb-2">Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-slate-400 text-sm block mb-2">Coach</label>
              <select
                value={filterCoach}
                onChange={(e) => setFilterCoach(e.target.value)}
                className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="all">Tous les coachs</option>
                {mockCoachSchedules.map(schedule => (
                  <option key={schedule.coachId} value={schedule.coachId}>{schedule.coachName}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-slate-400 text-sm block mb-2">Statut</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="all">Tous</option>
                <option value="present">Présent</option>
                <option value="late">En retard</option>
                <option value="absent">Absent</option>
                <option value="excused">Excusé</option>
              </select>
            </div>
          </div>

          {/* Attendance Table */}
          <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left px-4 py-3 text-slate-400 text-xs font-medium uppercase">Coach</th>
                    <th className="text-left px-4 py-3 text-slate-400 text-xs font-medium uppercase">Arrivée</th>
                    <th className="text-left px-4 py-3 text-slate-400 text-xs font-medium uppercase">Départ</th>
                    <th className="text-center px-4 py-3 text-slate-400 text-xs font-medium uppercase">Heures</th>
                    <th className="text-left px-4 py-3 text-slate-400 text-xs font-medium uppercase">Type</th>
                    <th className="text-left px-4 py-3 text-slate-400 text-xs font-medium uppercase">Statut</th>
                    <th className="text-left px-4 py-3 text-slate-400 text-xs font-medium uppercase">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map(record => (
                    <tr key={record.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <UserCheck className="w-4 h-4 text-emerald-400" />
                          <span className="text-white font-medium">{record.coachName}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-300 text-sm">{record.checkIn}</td>
                      <td className="px-4 py-3 text-slate-300 text-sm">{record.checkOut || '-'}</td>
                      <td className="px-4 py-3 text-center text-slate-300 text-sm">
                        {record.hoursWorked ? `${record.hoursWorked}h` : '-'}
                      </td>
                      <td className="px-4 py-3 text-slate-300 text-sm capitalize">{record.sessionType}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(record.status)}`}>
                          {getStatusLabel(record.status)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-400 text-sm">{record.notes || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Schedule Tab */}
      {activeTab === 'schedule' && (
        <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left px-4 py-3 text-slate-400 text-xs font-medium uppercase">Coach</th>
                  <th className="text-center px-4 py-3 text-slate-400 text-xs font-medium uppercase">Lundi</th>
                  <th className="text-center px-4 py-3 text-slate-400 text-xs font-medium uppercase">Mardi</th>
                  <th className="text-center px-4 py-3 text-slate-400 text-xs font-medium uppercase">Mercredi</th>
                  <th className="text-center px-4 py-3 text-slate-400 text-xs font-medium uppercase">Jeudi</th>
                  <th className="text-center px-4 py-3 text-slate-400 text-xs font-medium uppercase">Vendredi</th>
                  <th className="text-center px-4 py-3 text-slate-400 text-xs font-medium uppercase">Samedi</th>
                  <th className="text-center px-4 py-3 text-slate-400 text-xs font-medium uppercase">Dimanche</th>
                  <th className="text-center px-4 py-3 text-slate-400 text-xs font-medium uppercase">Total/Sem</th>
                </tr>
              </thead>
              <tbody>
                {mockCoachSchedules.map(schedule => (
                  <tr key={schedule.coachId} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                    <td className="px-4 py-3">
                      <span className="text-white font-medium">{schedule.coachName}</span>
                    </td>
                    <td className="px-4 py-3 text-center text-slate-300 text-xs">
                      {schedule.monday.length > 0 ? schedule.monday.join(', ') : '-'}
                    </td>
                    <td className="px-4 py-3 text-center text-slate-300 text-xs">
                      {schedule.tuesday.length > 0 ? schedule.tuesday.join(', ') : '-'}
                    </td>
                    <td className="px-4 py-3 text-center text-slate-300 text-xs">
                      {schedule.wednesday.length > 0 ? schedule.wednesday.join(', ') : '-'}
                    </td>
                    <td className="px-4 py-3 text-center text-slate-300 text-xs">
                      {schedule.thursday.length > 0 ? schedule.thursday.join(', ') : '-'}
                    </td>
                    <td className="px-4 py-3 text-center text-slate-300 text-xs">
                      {schedule.friday.length > 0 ? schedule.friday.join(', ') : '-'}
                    </td>
                    <td className="px-4 py-3 text-center text-slate-300 text-xs">
                      {schedule.saturday.length > 0 ? schedule.saturday.join(', ') : '-'}
                    </td>
                    <td className="px-4 py-3 text-center text-slate-300 text-xs">
                      {schedule.sunday.length > 0 ? schedule.sunday.join(', ') : '-'}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-emerald-400 font-bold">{schedule.totalHoursPerWeek}h</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Stats Tab */}
      {activeTab === 'stats' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockCoachSchedules.map(schedule => {
            const stats = getCoachMonthlyStats(schedule.coachId);
            return (
              <div key={schedule.coachId} className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold">{schedule.coachName}</h3>
                  <span className={`text-lg font-bold ${stats.rate >= 90 ? 'text-emerald-400' : stats.rate >= 75 ? 'text-amber-400' : 'text-red-400'}`}>
                    {stats.rate}%
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-slate-700/30 rounded-lg p-3 text-center">
                    <p className="text-slate-400 text-xs">Présences</p>
                    <p className="text-emerald-400 text-xl font-bold">{stats.present}</p>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-3 text-center">
                    <p className="text-slate-400 text-xs">Retards</p>
                    <p className="text-amber-400 text-xl font-bold">{stats.late}</p>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-3 text-center">
                    <p className="text-slate-400 text-xs">Total Jours</p>
                    <p className="text-white text-xl font-bold">{stats.total}</p>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-3 text-center">
                    <p className="text-slate-400 text-xs">Heures Totales</p>
                    <p className="text-blue-400 text-xl font-bold">{stats.totalHours}h</p>
                  </div>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all ${stats.rate >= 90 ? 'bg-emerald-500' : stats.rate >= 75 ? 'bg-amber-500' : 'bg-red-500'}`}
                    style={{ width: `${stats.rate}%` }}
                  ></div>
                </div>
                <p className="text-slate-500 text-xs mt-2 text-center">
                  {stats.rate >= 90 ? 'Excellente assiduité' : stats.rate >= 75 ? 'Bonne assiduité' : 'Assiduité à améliorer'}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
