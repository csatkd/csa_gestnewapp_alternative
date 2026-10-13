import { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Edit2, Trash2, Plus } from 'lucide-react';

interface TrainingSession {
  id: string;
  day: 'Lundi' | 'Mardi' | 'Mercredi' | 'Jeudi' | 'Vendredi' | 'Samedi' | 'Dimanche';
  startTime: string;
  endTime: string;
  category: string;
  instructor: string;
  location: string;
  maxParticipants: number;
  currentParticipants: number;
  color: string;
}

const defaultSessions: TrainingSession[] = [
  {
    id: '1',
    day: 'Lundi',
    startTime: '16:00',
    endTime: '17:30',
    category: 'Enfants (6-12 ans)',
    instructor: 'Maître Koné',
    location: 'Dojang Principal',
    maxParticipants: 20,
    currentParticipants: 15,
    color: 'bg-blue-500'
  },
  {
    id: '2',
    day: 'Lundi',
    startTime: '18:00',
    endTime: '19:30',
    category: 'Adolescents (13-17 ans)',
    instructor: 'Coach Traoré',
    location: 'Dojang Principal',
    maxParticipants: 18,
    currentParticipants: 12,
    color: 'bg-purple-500'
  },
  {
    id: '3',
    day: 'Mardi',
    startTime: '16:00',
    endTime: '17:30',
    category: 'Enfants (6-12 ans)',
    instructor: 'Maître Koné',
    location: 'Dojang Principal',
    maxParticipants: 20,
    currentParticipants: 18,
    color: 'bg-blue-500'
  },
  {
    id: '4',
    day: 'Mardi',
    startTime: '18:00',
    endTime: '20:00',
    category: 'Adultes (+18 ans)',
    instructor: 'Maître Diallo',
    location: 'Dojang Principal',
    maxParticipants: 15,
    currentParticipants: 10,
    color: 'bg-green-500'
  },
  {
    id: '5',
    day: 'Mercredi',
    startTime: '10:00',
    endTime: '11:30',
    category: 'Compétition',
    instructor: 'Coach Bamba',
    location: 'Salle Compétition',
    maxParticipants: 12,
    currentParticipants: 8,
    color: 'bg-red-500'
  },
  {
    id: '6',
    day: 'Mercredi',
    startTime: '16:00',
    endTime: '17:30',
    category: 'Enfants (6-12 ans)',
    instructor: 'Maître Koné',
    location: 'Dojang Principal',
    maxParticipants: 20,
    currentParticipants: 16,
    color: 'bg-blue-500'
  },
  {
    id: '7',
    day: 'Jeudi',
    startTime: '16:00',
    endTime: '17:30',
    category: 'Enfants (6-12 ans)',
    instructor: 'Coach Traoré',
    location: 'Dojang Principal',
    maxParticipants: 20,
    currentParticipants: 14,
    color: 'bg-blue-500'
  },
  {
    id: '8',
    day: 'Jeudi',
    startTime: '18:00',
    endTime: '19:30',
    category: 'Adolescents (13-17 ans)',
    instructor: 'Maître Diallo',
    location: 'Dojang Principal',
    maxParticipants: 18,
    currentParticipants: 11,
    color: 'bg-purple-500'
  },
  {
    id: '9',
    day: 'Vendredi',
    startTime: '16:00',
    endTime: '17:30',
    category: 'Enfants (6-12 ans)',
    instructor: 'Maître Koné',
    location: 'Dojang Principal',
    maxParticipants: 20,
    currentParticipants: 17,
    color: 'bg-blue-500'
  },
  {
    id: '10',
    day: 'Vendredi',
    startTime: '18:00',
    endTime: '20:00',
    category: 'Adultes (+18 ans)',
    instructor: 'Maître Diallo',
    location: 'Dojang Principal',
    maxParticipants: 15,
    currentParticipants: 9,
    color: 'bg-green-500'
  },
  {
    id: '11',
    day: 'Samedi',
    startTime: '09:00',
    endTime: '11:00',
    category: 'Tous niveaux',
    instructor: 'Maître Koné',
    location: 'Dojang Principal',
    maxParticipants: 25,
    currentParticipants: 20,
    color: 'bg-yellow-500'
  },
  {
    id: '12',
    day: 'Samedi',
    startTime: '11:00',
    endTime: '12:30',
    category: 'Compétition',
    instructor: 'Coach Bamba',
    location: 'Salle Compétition',
    maxParticipants: 12,
    currentParticipants: 10,
    color: 'bg-red-500'
  }
];

export default function TrainingSchedule() {
  const [sessions, setSessions] = useState<TrainingSession[]>(defaultSessions);
  const [selectedDay, setSelectedDay] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  
  const filteredSessions = selectedDay === 'all' 
    ? sessions 
    : sessions.filter(s => s.day === selectedDay);

  const getOccupancyColor = (current: number, max: number) => {
    const percentage = (current / max) * 100;
    if (percentage >= 90) return 'text-red-400';
    if (percentage >= 70) return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Calendrier des Entraînements</h2>
          <p className="text-slate-400 text-sm">Planning hebdomadaire des séances</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Ajouter une séance
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedDay('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
            selectedDay === 'all'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'bg-slate-800 text-slate-400 border border-slate-700'
          }`}
        >
          Tous les jours
        </button>
        {days.map(day => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              selectedDay === day
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-slate-800 text-slate-400 border border-slate-700'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Schedule Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {days.map(day => {
          const daySessions = sessions.filter(s => s.day === day);
          if (selectedDay !== 'all' && selectedDay !== day) return null;
          
          return (
            <div key={day} className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
              <div className="bg-slate-700/50 px-4 py-3 border-b border-slate-700">
                <h3 className="text-white font-semibold flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  {day}
                </h3>
              </div>
              <div className="p-4 space-y-3">
                {daySessions.length === 0 ? (
                  <p className="text-slate-500 text-sm text-center py-4">Aucune séance</p>
                ) : (
                  daySessions.map(session => (
                    <div
                      key={session.id}
                      className="bg-slate-700/30 rounded-lg p-3 border border-slate-600 hover:border-slate-500 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${session.color}`}></div>
                          <span className="text-white text-sm font-medium">{session.category}</span>
                        </div>
                        <div className="flex gap-1">
                          <button className="text-slate-400 hover:text-white">
                            <Edit2 className="w-3 h-3" />
                          </button>
                          <button className="text-slate-400 hover:text-red-400">
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center gap-2 text-slate-400">
                          <Clock className="w-3 h-3" />
                          <span>{session.startTime} - {session.endTime}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                          <Users className="w-3 h-3" />
                          <span className={getOccupancyColor(session.currentParticipants, session.maxParticipants)}>
                            {session.currentParticipants}/{session.maxParticipants} participants
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                          <MapPin className="w-3 h-3" />
                          <span>{session.location}</span>
                        </div>
                        <p className="text-slate-500 mt-1">Instructeur: {session.instructor}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <p className="text-slate-400 text-xs">Total Séances/Semaine</p>
          <p className="text-2xl font-bold text-white mt-1">{sessions.length}</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <p className="text-slate-400 text-xs">Places Disponibles</p>
          <p className="text-2xl font-bold text-emerald-400 mt-1">
            {sessions.reduce((sum, s) => sum + (s.maxParticipants - s.currentParticipants), 0)}
          </p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <p className="text-slate-400 text-xs">Taux d'Occupation</p>
          <p className="text-2xl font-bold text-blue-400 mt-1">
            {Math.round((sessions.reduce((sum, s) => sum + s.currentParticipants, 0) / 
              sessions.reduce((sum, s) => sum + s.maxParticipants, 0)) * 100)}%
          </p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <p className="text-slate-400 text-xs">Heures Totales/Semaine</p>
          <p className="text-2xl font-bold text-purple-400 mt-1">
            {sessions.reduce((sum, s) => {
              const [startH, startM] = s.startTime.split(':').map(Number);
              const [endH, endM] = s.endTime.split(':').map(Number);
              const duration = (endH * 60 + endM - startH * 60 - startM) / 60;
              return sum + duration;
            }, 0).toFixed(1)}h
          </p>
        </div>
      </div>

      {/* Add Session Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-2xl border border-slate-700 max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-white mb-4">Ajouter une Séance</h3>
            <p className="text-slate-400 text-sm mb-6">Fonctionnalité en cours de développement</p>
            <button
              onClick={() => setShowAddModal(false)}
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
