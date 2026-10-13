import { useState } from 'react';
import { Calendar, Users, UserPlus, CheckCircle, XCircle, Clock, Phone, Mail, TrendingUp, Filter } from 'lucide-react';

interface TrialClass {
  id: string;
  date: string;
  time: string;
  duration: number;
  category: string;
  instructor: string;
  maxParticipants: number;
  currentParticipants: number;
  status: 'upcoming' | 'completed' | 'cancelled';
}

interface TrialParticipant {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  phone: string;
  email: string;
  parentName?: string;
  parentPhone?: string;
  trialClassId: string;
  status: 'registered' | 'present' | 'absent' | 'interested' | 'enrolled' | 'declined';
  registrationDate: string;
  attendanceDate?: string;
  notes: string;
  followUpDate?: string;
}

const mockTrialClasses: TrialClass[] = [
  {
    id: 'TC001',
    date: '2024-12-21',
    time: '10:00',
    duration: 60,
    category: 'Enfants (6-12 ans)',
    instructor: 'Maître Koné',
    maxParticipants: 15,
    currentParticipants: 8,
    status: 'upcoming'
  },
  {
    id: 'TC002',
    date: '2024-12-21',
    time: '14:00',
    duration: 60,
    category: 'Adolescents (13-17 ans)',
    instructor: 'Coach Traoré',
    maxParticipants: 12,
    currentParticipants: 5,
    status: 'upcoming'
  },
  {
    id: 'TC003',
    date: '2024-12-22',
    time: '10:00',
    duration: 60,
    category: 'Adultes (+18 ans)',
    instructor: 'Maître Diallo',
    maxParticipants: 10,
    currentParticipants: 3,
    status: 'upcoming'
  },
  {
    id: 'TC004',
    date: '2024-12-14',
    time: '10:00',
    duration: 60,
    category: 'Enfants (6-12 ans)',
    instructor: 'Maître Koné',
    maxParticipants: 15,
    currentParticipants: 12,
    status: 'completed'
  },
  {
    id: 'TC005',
    date: '2024-12-14',
    time: '14:00',
    duration: 60,
    category: 'Adultes (+18 ans)',
    instructor: 'Maître Diallo',
    maxParticipants: 10,
    currentParticipants: 7,
    status: 'completed'
  }
];

const mockParticipants: TrialParticipant[] = [
  {
    id: 'TP001',
    firstName: 'Kouamé',
    lastName: 'Aya',
    age: 8,
    phone: '+225 07 11 22 33 44',
    email: 'parent.kouame@email.com',
    parentName: 'Kouamé Jean',
    parentPhone: '+225 05 11 22 33 44',
    trialClassId: 'TC004',
    status: 'enrolled',
    registrationDate: '2024-12-10',
    attendanceDate: '2024-12-14',
    notes: 'Très motivé, souhaite s\'inscrire',
    followUpDate: '2024-12-16'
  },
  {
    id: 'TP002',
    firstName: 'Traoré',
    lastName: 'Fatou',
    age: 10,
    phone: '+225 07 22 33 44 55',
    email: 'parent.traore@email.com',
    parentName: 'Traoré Ibrahim',
    parentPhone: '+225 05 22 33 44 55',
    trialClassId: 'TC004',
    status: 'interested',
    registrationDate: '2024-12-11',
    attendanceDate: '2024-12-14',
    notes: 'Intéressée, doit discuter avec le père',
    followUpDate: '2024-12-18'
  },
  {
    id: 'TP003',
    firstName: 'Bamba',
    lastName: 'Moussa',
    age: 25,
    phone: '+225 07 33 44 55 66',
    email: 'bamba.moussa@email.com',
    trialClassId: 'TC005',
    status: 'enrolled',
    registrationDate: '2024-12-12',
    attendanceDate: '2024-12-14',
    notes: 'Inscrit immédiatement après le cours',
    followUpDate: '2024-12-15'
  },
  {
    id: 'TP004',
    firstName: 'Diallo',
    lastName: 'Aminata',
    age: 15,
    phone: '+225 07 44 55 66 77',
    email: 'diallo.aminata@email.com',
    parentName: 'Diallo Mamadou',
    parentPhone: '+225 05 44 55 66 77',
    trialClassId: 'TC001',
    status: 'registered',
    registrationDate: '2024-12-18',
    notes: 'Inscrite pour le prochain cours d\'essai',
    followUpDate: '2024-12-21'
  },
  {
    id: 'TP005',
    firstName: 'Ouattara',
    lastName: 'Seydou',
    age: 30,
    phone: '+225 07 55 66 77 88',
    email: 'ouattara.seydou@email.com',
    trialClassId: 'TC001',
    status: 'registered',
    registrationDate: '2024-12-19',
    notes: 'Intéressé par le Taekwondo pour la forme',
    followUpDate: '2024-12-21'
  },
  {
    id: 'TP006',
    firstName: 'Yao',
    lastName: 'Koffi',
    age: 12,
    phone: '+225 07 66 77 88 99',
    email: 'parent.yao@email.com',
    parentName: 'Yao Akissi',
    parentPhone: '+225 05 66 77 88 99',
    trialClassId: 'TC005',
    status: 'declined',
    registrationDate: '2024-12-10',
    attendanceDate: '2024-12-14',
    notes: 'A préféré le football',
    followUpDate: '2024-12-20'
  }
];

export default function TrialClasses() {
  const [trialClasses, setTrialClasses] = useState<TrialClass[]>(mockTrialClasses);
  const [participants, setParticipants] = useState<TrialParticipant[]>(mockParticipants);
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showAddClassModal, setShowAddClassModal] = useState(false);
  const [showAddParticipantModal, setShowAddParticipantModal] = useState(false);

  const filteredParticipants = participants.filter(p => {
    const matchClass = selectedClass === 'all' || p.trialClassId === selectedClass;
    const matchStatus = filterStatus === 'all' || p.status === filterStatus;
    return matchClass && matchStatus;
  });

  // Statistics
  const totalParticipants = participants.length;
  const enrolledCount = participants.filter(p => p.status === 'enrolled').length;
  const interestedCount = participants.filter(p => p.status === 'interested').length;
  const conversionRate = totalParticipants > 0 ? Math.round((enrolledCount / totalParticipants) * 100) : 0;
  const upcomingClasses = trialClasses.filter(tc => tc.status === 'upcoming').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'registered': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'present': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'absent': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'interested': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'enrolled': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'declined': return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'registered': return 'Inscrit';
      case 'present': return 'Présent';
      case 'absent': return 'Absent';
      case 'interested': return 'Intéressé';
      case 'enrolled': return 'Adhérent';
      case 'declined': return 'Refusé';
      default: return status;
    }
  };

  const updateParticipantStatus = (id: string, newStatus: TrialParticipant['status']) => {
    setParticipants(participants.map(p => 
      p.id === id ? { ...p, status: newStatus } : p
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Cours d'Essai</h2>
          <p className="text-slate-400 text-sm">Gestion des séances d'essai et conversion des prospects</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowAddClassModal(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Calendar className="w-4 h-4" />
            Planifier un Cours
          </button>
          <button
            onClick={() => setShowAddParticipantModal(true)}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            Inscrire un Prospect
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-xl p-5 border border-blue-500/20">
          <div className="flex items-center justify-between mb-3">
            <Calendar className="w-8 h-8 text-blue-400" />
            <span className="text-blue-400 text-xs font-medium bg-blue-500/20 px-2 py-1 rounded">À venir</span>
          </div>
          <p className="text-slate-400 text-sm">Cours Planifiés</p>
          <p className="text-3xl font-bold text-white mt-1">{upcomingClasses}</p>
        </div>

        <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 rounded-xl p-5 border border-emerald-500/20">
          <div className="flex items-center justify-between mb-3">
            <Users className="w-8 h-8 text-emerald-400" />
            <span className="text-emerald-400 text-xs font-medium bg-emerald-500/20 px-2 py-1 rounded">Total</span>
          </div>
          <p className="text-slate-400 text-sm">Prospects Inscrits</p>
          <p className="text-3xl font-bold text-white mt-1">{totalParticipants}</p>
        </div>

        <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-xl p-5 border border-green-500/20">
          <div className="flex items-center justify-between mb-3">
            <CheckCircle className="w-8 h-8 text-green-400" />
            <span className="text-green-400 text-xs font-medium bg-green-500/20 px-2 py-1 rounded">Converti</span>
          </div>
          <p className="text-slate-400 text-sm">Nouveaux Adhérents</p>
          <p className="text-3xl font-bold text-white mt-1">{enrolledCount}</p>
        </div>

        <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 rounded-xl p-5 border border-yellow-500/20">
          <div className="flex items-center justify-between mb-3">
            <TrendingUp className="w-8 h-8 text-yellow-400" />
            <span className="text-yellow-400 text-xs font-medium bg-yellow-500/20 px-2 py-1 rounded">Taux</span>
          </div>
          <p className="text-slate-400 text-sm">Taux de Conversion</p>
          <p className="text-3xl font-bold text-white mt-1">{conversionRate}%</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div>
          <label className="text-slate-400 text-sm block mb-2">Cours d'essai</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="all">Tous les cours</option>
            {trialClasses.map(tc => (
              <option key={tc.id} value={tc.id}>
                {new Date(tc.date).toLocaleDateString('fr-FR')} - {tc.category}
              </option>
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
            <option value="registered">Inscrits</option>
            <option value="present">Présents</option>
            <option value="absent">Absents</option>
            <option value="interested">Intéressés</option>
            <option value="enrolled">Adhérents</option>
            <option value="declined">Refusés</option>
          </select>
        </div>
      </div>

      {/* Upcoming Trial Classes */}
      <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-400" />
          Prochains Cours d'Essai
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trialClasses.filter(tc => tc.status === 'upcoming').map(tc => (
            <div key={tc.id} className="bg-slate-700/30 rounded-lg p-4 border border-slate-600 hover:border-blue-500/30 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-white font-medium">{tc.category}</p>
                  <p className="text-slate-400 text-sm mt-1">
                    {new Date(tc.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-blue-400 font-bold">{tc.time}</p>
                  <p className="text-slate-500 text-xs">{tc.duration} min</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">{tc.instructor}</span>
                <span className="text-emerald-400">{tc.currentParticipants}/{tc.maxParticipants}</span>
              </div>
              <div className="mt-2 w-full bg-slate-700 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${(tc.currentParticipants / tc.maxParticipants) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Participants List */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
        <div className="p-4 border-b border-slate-700">
          <h3 className="text-white font-semibold">Participants aux Cours d'Essai</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left px-4 py-3 text-slate-400 text-xs font-medium uppercase">Nom</th>
                <th className="text-left px-4 py-3 text-slate-400 text-xs font-medium uppercase">Âge</th>
                <th className="text-left px-4 py-3 text-slate-400 text-xs font-medium uppercase">Contact</th>
                <th className="text-left px-4 py-3 text-slate-400 text-xs font-medium uppercase">Cours</th>
                <th className="text-left px-4 py-3 text-slate-400 text-xs font-medium uppercase">Statut</th>
                <th className="text-left px-4 py-3 text-slate-400 text-xs font-medium uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredParticipants.map(participant => {
                const trialClass = trialClasses.find(tc => tc.id === participant.trialClassId);
                return (
                  <tr key={participant.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-white text-sm font-medium">{participant.firstName} {participant.lastName}</p>
                        {participant.parentName && (
                          <p className="text-slate-500 text-xs">Parent: {participant.parentName}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-300 text-sm">{participant.age} ans</td>
                    <td className="px-4 py-3">
                      <div className="text-sm">
                        <p className="text-slate-300 flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {participant.parentPhone || participant.phone}
                        </p>
                        <p className="text-slate-500 text-xs flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {participant.email}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-300 text-sm">
                      {trialClass ? (
                        <div>
                          <p>{new Date(trialClass.date).toLocaleDateString('fr-FR')}</p>
                          <p className="text-slate-500 text-xs">{trialClass.category}</p>
                        </div>
                      ) : '-'}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(participant.status)}`}>
                        {getStatusLabel(participant.status)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        {participant.status === 'registered' && (
                          <>
                            <button
                              onClick={() => updateParticipantStatus(participant.id, 'present')}
                              className="p-1 text-emerald-400 hover:text-emerald-300"
                              title="Marquer présent"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => updateParticipantStatus(participant.id, 'absent')}
                              className="p-1 text-red-400 hover:text-red-300"
                              title="Marquer absent"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        {participant.status === 'present' && (
                          <>
                            <button
                              onClick={() => updateParticipantStatus(participant.id, 'interested')}
                              className="p-1 text-yellow-400 hover:text-yellow-300"
                              title="Marquer intéressé"
                            >
                              <TrendingUp className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => updateParticipantStatus(participant.id, 'enrolled')}
                              className="p-1 text-green-400 hover:text-green-300"
                              title="Convertir en adhérent"
                            >
                              <UserPlus className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        {participant.status === 'interested' && (
                          <>
                            <button
                              onClick={() => updateParticipantStatus(participant.id, 'enrolled')}
                              className="p-1 text-green-400 hover:text-green-300"
                              title="Convertir en adhérent"
                            >
                              <UserPlus className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => updateParticipantStatus(participant.id, 'declined')}
                              className="p-1 text-slate-400 hover:text-slate-300"
                              title="Marquer refusé"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Trial Class Modal */}
      {showAddClassModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-2xl border border-slate-700 max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-white mb-4">Planifier un Cours d'Essai</h3>
            <p className="text-slate-400 text-sm mb-6">Fonctionnalité en cours de développement</p>
            <button
              onClick={() => setShowAddClassModal(false)}
              className="w-full bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* Add Participant Modal */}
      {showAddParticipantModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-2xl border border-slate-700 max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-white mb-4">Inscrire un Prospect</h3>
            <p className="text-slate-400 text-sm mb-6">Fonctionnalité en cours de développement</p>
            <button
              onClick={() => setShowAddParticipantModal(false)}
              className="w-full bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
