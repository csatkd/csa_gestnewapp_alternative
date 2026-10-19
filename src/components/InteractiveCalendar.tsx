import { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, Clock, MapPin, Users, Award, DollarSign, Activity } from 'lucide-react';

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: number;
  type: 'training' | 'competition' | 'grading' | 'meeting' | 'holiday' | 'special';
  location: string;
  participants?: number;
  instructor?: string;
  description?: string;
  color: string;
}

const mockEvents: CalendarEvent[] = [
  {
    id: 'E001',
    title: 'Cours Enfants (6-12 ans)',
    date: '2024-12-16',
    time: '16:00',
    duration: 90,
    type: 'training',
    location: 'Dojang Principal',
    participants: 15,
    instructor: 'Maître Koné',
    description: 'Cours régulier pour les enfants',
    color: 'bg-blue-500'
  },
  {
    id: 'E002',
    title: 'Cours Adolescents (13-17 ans)',
    date: '2024-12-16',
    time: '18:00',
    duration: 90,
    type: 'training',
    location: 'Dojang Principal',
    participants: 12,
    instructor: 'Coach Traoré',
    description: 'Cours régulier pour les adolescents',
    color: 'bg-purple-500'
  },
  {
    id: 'E003',
    title: 'Cours Adultes (+18 ans)',
    date: '2024-12-16',
    time: '20:00',
    duration: 120,
    type: 'training',
    location: 'Dojang Principal',
    participants: 10,
    instructor: 'Maître Diallo',
    description: 'Cours régulier pour les adultes',
    color: 'bg-green-500'
  },
  {
    id: 'E004',
    title: 'Passage de Grade',
    date: '2024-12-20',
    time: '09:00',
    duration: 180,
    type: 'grading',
    location: 'Dojang Principal',
    participants: 8,
    instructor: 'Jury FITKD',
    description: 'Session de passage de grade Kukkiwon',
    color: 'bg-amber-500'
  },
  {
    id: 'E005',
    title: 'Coupe Régionale Zone Sud',
    date: '2024-12-21',
    time: '08:00',
    duration: 480,
    type: 'competition',
    location: 'San-Pédro',
    participants: 6,
    instructor: 'Coach Bamba',
    description: 'Compétition régionale de Taekwondo',
    color: 'bg-red-500'
  },
  {
    id: 'E006',
    title: 'Réunion des Coachs',
    date: '2024-12-18',
    time: '18:00',
    duration: 60,
    type: 'meeting',
    location: 'Salle de réunion',
    participants: 4,
    description: 'Réunion pédagogique mensuelle',
    color: 'bg-indigo-500'
  },
  {
    id: 'E007',
    title: 'Stage de Perfectionnement',
    date: '2024-12-22',
    time: '09:00',
    duration: 240,
    type: 'special',
    location: 'Dojang Principal',
    participants: 20,
    instructor: 'Maître Koné',
    description: 'Stage intensif pour les ceintures noires',
    color: 'bg-pink-500'
  },
  {
    id: 'E008',
    title: 'Cours Enfants (6-12 ans)',
    date: '2024-12-17',
    time: '16:00',
    duration: 90,
    type: 'training',
    location: 'Dojang Principal',
    participants: 15,
    instructor: 'Maître Koné',
    color: 'bg-blue-500'
  },
  {
    id: 'E009',
    title: 'Cours Compétition',
    date: '2024-12-17',
    time: '18:00',
    duration: 120,
    type: 'training',
    location: 'Salle Compétition',
    participants: 8,
    instructor: 'Coach Bamba',
    description: 'Préparation compétition',
    color: 'bg-orange-500'
  },
  {
    id: 'E010',
    title: 'Noël - Fermeture',
    date: '2024-12-25',
    time: '00:00',
    duration: 1440,
    type: 'holiday',
    location: 'CSA',
    description: 'Fermeture du Dojang pour les fêtes',
    color: 'bg-slate-500'
  }
];

export default function InteractiveCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 11, 16)); // Décembre 2024
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();

  const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

  const getEventsForDate = (date: string) => {
    return mockEvents.filter(event => event.date === date);
  };

  const getEventsForSelectedDate = () => {
    if (!selectedDate) return [];
    return getEventsForDate(selectedDate);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'training': return <Activity className="w-4 h-4" />;
      case 'competition': return <Award className="w-4 h-4" />;
      case 'grading': return <Award className="w-4 h-4" />;
      case 'meeting': return <Users className="w-4 h-4" />;
      case 'holiday': return <CalendarIcon className="w-4 h-4" />;
      case 'special': return <Activity className="w-4 h-4" />;
      default: return <CalendarIcon className="w-4 h-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'training': return 'Entraînement';
      case 'competition': return 'Compétition';
      case 'grading': return 'Passage de Grade';
      case 'meeting': return 'Réunion';
      case 'holiday': return 'Fermeture';
      case 'special': return 'Événement Spécial';
      default: return type;
    }
  };

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const formatDate = (day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const renderCalendarDays = () => {
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 bg-slate-900/30"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = formatDate(day);
      const events = getEventsForDate(dateStr);
      const isSelected = selectedDate === dateStr;
      const isToday = dateStr === new Date().toISOString().split('T')[0];

      days.push(
        <div
          key={day}
          onClick={() => setSelectedDate(dateStr)}
          className={`h-24 p-2 border border-slate-700 cursor-pointer transition-all hover:bg-slate-700/50 ${
            isSelected ? 'bg-emerald-500/20 border-emerald-500' : 'bg-slate-800/30'
          } ${isToday ? 'ring-2 ring-emerald-500' : ''}`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className={`text-sm font-medium ${isToday ? 'text-emerald-400' : 'text-white'}`}>
              {day}
            </span>
            {events.length > 0 && (
              <span className="text-xs text-slate-400">{events.length}</span>
            )}
          </div>
          <div className="space-y-1 overflow-hidden">
            {events.slice(0, 2).map(event => (
              <div
                key={event.id}
                className={`${event.color} text-white text-xs px-1 py-0.5 rounded truncate`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedEvent(event);
                }}
              >
                {event.time} {event.title}
              </div>
            ))}
            {events.length > 2 && (
              <div className="text-xs text-slate-400">+{events.length - 2} autre(s)</div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Calendrier Interactif</h2>
          <p className="text-slate-400 text-sm">Planning complet de l'académie</p>
        </div>
        <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors">
          <Plus className="w-4 h-4" />
          Nouvel Événement
        </button>
      </div>

      {/* Calendar Controls */}
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={previousMonth}
              className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <h3 className="text-xl font-bold text-white min-w-[200px] text-center">
              {monthNames[month]} {year}
            </h3>
            <button
              onClick={nextMonth}
              className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
          <div className="flex gap-2">
            <button
              onClick={goToToday}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm transition-colors"
            >
              Aujourd'hui
            </button>
            <div className="flex gap-1 bg-slate-700 rounded-lg p-1">
              <button
                onClick={() => setViewMode('month')}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  viewMode === 'month' ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Mois
              </button>
              <button
                onClick={() => setViewMode('week')}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  viewMode === 'week' ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Semaine
              </button>
              <button
                onClick={() => setViewMode('day')}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  viewMode === 'day' ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Jour
              </button>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-px bg-slate-700 rounded-lg overflow-hidden">
          {/* Day headers */}
          {dayNames.map(day => (
            <div key={day} className="bg-slate-800 p-2 text-center">
              <span className="text-slate-400 text-sm font-medium">{day}</span>
            </div>
          ))}
          
          {/* Calendar days */}
          {renderCalendarDays()}
        </div>
      </div>

      {/* Selected Date Events */}
      {selectedDate && (
        <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-emerald-400" />
            Événements du {new Date(selectedDate).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </h3>
          {getEventsForSelectedDate().length === 0 ? (
            <p className="text-slate-400 text-center py-8">Aucun événement prévu pour cette date</p>
          ) : (
            <div className="space-y-3">
              {getEventsForSelectedDate().map(event => (
                <div
                  key={event.id}
                  className="bg-slate-700/30 rounded-lg p-4 border border-slate-600 hover:border-emerald-500/30 transition-all cursor-pointer"
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${event.color}`}></div>
                      <h4 className="text-white font-medium">{event.title}</h4>
                    </div>
                    <span className="text-slate-400 text-xs">{getTypeLabel(event.type)}</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div className="flex items-center gap-1 text-slate-400">
                      <Clock className="w-3 h-3" />
                      <span>{event.time} ({event.duration} min)</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-400">
                      <MapPin className="w-3 h-3" />
                      <span>{event.location}</span>
                    </div>
                    {event.participants && (
                      <div className="flex items-center gap-1 text-slate-400">
                        <Users className="w-3 h-3" />
                        <span>{event.participants} participants</span>
                      </div>
                    )}
                    {event.instructor && (
                      <div className="flex items-center gap-1 text-slate-400">
                        <Award className="w-3 h-3" />
                        <span>{event.instructor}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Event Legend */}
      <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
        <h3 className="text-white font-semibold mb-3">Légende</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-slate-300 text-sm">Entraînement</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-slate-300 text-sm">Compétition</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span className="text-slate-300 text-sm">Passage de Grade</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
            <span className="text-slate-300 text-sm">Réunion</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-pink-500"></div>
            <span className="text-slate-300 text-sm">Événement Spécial</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-slate-500"></div>
            <span className="text-slate-300 text-sm">Fermeture</span>
          </div>
        </div>
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedEvent(null)}>
          <div className="bg-slate-800 rounded-2xl border border-slate-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-slate-700">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-lg ${selectedEvent.color} flex items-center justify-center text-white`}>
                    {getTypeIcon(selectedEvent.type)}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{selectedEvent.title}</h2>
                    <p className="text-slate-400 text-sm">{getTypeLabel(selectedEvent.type)}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedEvent(null)} className="text-slate-400 hover:text-white text-2xl">&times;</button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <p className="text-slate-400 text-xs mb-1">Date</p>
                  <p className="text-white font-medium">
                    {new Date(selectedEvent.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <p className="text-slate-400 text-xs mb-1">Horaire</p>
                  <p className="text-white font-medium">{selectedEvent.time} ({selectedEvent.duration} min)</p>
                </div>
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <p className="text-slate-400 text-xs mb-1">Lieu</p>
                  <p className="text-white font-medium">{selectedEvent.location}</p>
                </div>
                {selectedEvent.participants && (
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <p className="text-slate-400 text-xs mb-1">Participants</p>
                    <p className="text-white font-medium">{selectedEvent.participants}</p>
                  </div>
                )}
              </div>
              {selectedEvent.instructor && (
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <p className="text-slate-400 text-xs mb-1">Instructeur</p>
                  <p className="text-white font-medium">{selectedEvent.instructor}</p>
                </div>
              )}
              {selectedEvent.description && (
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <p className="text-slate-400 text-xs mb-1">Description</p>
                  <p className="text-slate-300 text-sm">{selectedEvent.description}</p>
                </div>
              )}
              <div className="flex gap-3 pt-4 border-t border-slate-700">
                <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-medium transition-colors">
                  Modifier
                </button>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="px-6 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
