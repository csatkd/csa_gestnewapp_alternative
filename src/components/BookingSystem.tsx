import { useState } from 'react';
import { Calendar, Clock, User, Plus, CheckCircle, XCircle, Edit2 } from 'lucide-react';
import { mockMembers } from '../data/mockData';

interface Booking {
  id: string;
  memberId: string;
  memberName: string;
  date: string;
  time: string;
  duration: number;
  type: 'cours_particulier' | 'stage' | 'evaluation' | 'autre';
  instructor: string;
  status: 'confirmee' | 'en_attente' | 'annulee' | 'terminee';
  notes: string;
  price: number;
}

const mockBookings: Booking[] = [
  {
    id: 'B001',
    memberId: 'M001',
    memberName: 'Kouassi Aya Marie',
    date: '2024-12-20',
    time: '10:00',
    duration: 60,
    type: 'cours_particulier',
    instructor: 'Maître Koné',
    status: 'confirmee',
    notes: 'Préparation passage de grade ceinture bleue',
    price: 15000
  },
  {
    id: 'B002',
    memberId: 'M002',
    memberName: 'Traoré Moussa',
    date: '2024-12-21',
    time: '14:00',
    duration: 90,
    type: 'stage',
    instructor: 'Coach Traoré',
    status: 'confirmee',
    notes: 'Stage intensif compétition',
    price: 25000
  },
  {
    id: 'B003',
    memberId: 'M003',
    memberName: 'Bamba Fatoumata',
    date: '2024-12-22',
    time: '11:00',
    duration: 60,
    type: 'evaluation',
    instructor: 'Maître Koné',
    status: 'en_attente',
    notes: 'Évaluation technique avant passage de grade',
    price: 10000
  },
  {
    id: 'B004',
    memberId: 'M005',
    memberName: 'Diallo Aminata',
    date: '2024-12-18',
    time: '16:00',
    duration: 60,
    type: 'cours_particulier',
    instructor: 'Coach Bamba',
    status: 'terminee',
    notes: 'Technique de kicks avancés',
    price: 15000
  }
];

export default function BookingSystem() {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredBookings = bookings.filter(booking => {
    const matchStatus = filterStatus === 'all' || booking.status === filterStatus;
    const matchType = filterType === 'all' || booking.type === filterType;
    return matchStatus && matchType;
  });

  const upcomingBookings = bookings.filter(b => 
    b.status === 'confirmee' || b.status === 'en_attente'
  ).length;

  const totalRevenue = bookings
    .filter(b => b.status === 'terminee' || b.status === 'confirmee')
    .reduce((sum, b) => sum + b.price, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmee': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'en_attente': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'annulee': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'terminee': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmee': return 'Confirmée';
      case 'en_attente': return 'En attente';
      case 'annulee': return 'Annulée';
      case 'terminee': return 'Terminée';
      default: return status;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'cours_particulier': return '📚 Cours Particulier';
      case 'stage': return '🎯 Stage';
      case 'evaluation': return '📝 Évaluation';
      case 'autre': return '📌 Autre';
      default: return type;
    }
  };

  const updateStatus = (id: string, newStatus: Booking['status']) => {
    setBookings(bookings.map(b => 
      b.id === id ? { ...b, status: newStatus } : b
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Système de Réservation</h2>
          <p className="text-slate-400 text-sm">Gestion des cours particuliers et stages</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nouvelle Réservation
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500/20 p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-slate-400 text-xs">Réservations à venir</p>
              <p className="text-2xl font-bold text-white">{upcomingBookings}</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500/20 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <p className="text-slate-400 text-xs">Total Réservations</p>
              <p className="text-2xl font-bold text-white">{bookings.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-500/20 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <p className="text-slate-400 text-xs">Revenus Générés</p>
              <p className="text-2xl font-bold text-white">{(totalRevenue / 1000).toFixed(0)}K F</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div>
          <label className="text-slate-400 text-sm block mb-2">Statut</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="all">Tous</option>
            <option value="confirmee">Confirmées</option>
            <option value="en_attente">En attente</option>
            <option value="terminee">Terminées</option>
            <option value="annulee">Annulées</option>
          </select>
        </div>
        <div>
          <label className="text-slate-400 text-sm block mb-2">Type</label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="all">Tous</option>
            <option value="cours_particulier">Cours Particulier</option>
            <option value="stage">Stage</option>
            <option value="evaluation">Évaluation</option>
            <option value="autre">Autre</option>
          </select>
        </div>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.length === 0 ? (
          <div className="bg-slate-800/50 rounded-xl p-8 text-center border border-slate-700">
            <Calendar className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400">Aucune réservation à afficher</p>
          </div>
        ) : (
          filteredBookings.map(booking => (
            <div
              key={booking.id}
              className="bg-slate-800/50 rounded-xl p-5 border border-slate-700 hover:border-slate-600 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div className="bg-emerald-500/20 p-2 rounded-lg">
                    <User className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{booking.memberName}</h3>
                    <p className="text-slate-400 text-sm">{getTypeLabel(booking.type)}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(booking.status)}`}>
                  {getStatusLabel(booking.status)}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                <div>
                  <p className="text-slate-500 text-xs">Date</p>
                  <p className="text-white text-sm">{new Date(booking.date).toLocaleDateString('fr-FR')}</p>
                </div>
                <div>
                  <p className="text-slate-500 text-xs">Heure</p>
                  <p className="text-white text-sm">{booking.time}</p>
                </div>
                <div>
                  <p className="text-slate-500 text-xs">Durée</p>
                  <p className="text-white text-sm">{booking.duration} min</p>
                </div>
                <div>
                  <p className="text-slate-500 text-xs">Prix</p>
                  <p className="text-emerald-400 text-sm font-medium">{booking.price.toLocaleString()} F</p>
                </div>
              </div>

              <div className="mb-3">
                <p className="text-slate-500 text-xs mb-1">Instructeur</p>
                <p className="text-white text-sm">{booking.instructor}</p>
              </div>

              {booking.notes && (
                <div className="mb-3">
                  <p className="text-slate-500 text-xs mb-1">Notes</p>
                  <p className="text-slate-300 text-sm">{booking.notes}</p>
                </div>
              )}

              <div className="flex gap-2 pt-3 border-t border-slate-700">
                {booking.status === 'en_attente' && (
                  <button
                    onClick={() => updateStatus(booking.id, 'confirmee')}
                    className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm transition-colors"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Confirmer
                  </button>
                )}
                {(booking.status === 'confirmee' || booking.status === 'en_attente') && (
                  <button
                    onClick={() => updateStatus(booking.id, 'annulee')}
                    className="flex items-center gap-1 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm transition-colors"
                  >
                    <XCircle className="w-4 h-4" />
                    Annuler
                  </button>
                )}
                {booking.status === 'confirmee' && (
                  <button
                    onClick={() => updateStatus(booking.id, 'terminee')}
                    className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Terminer
                  </button>
                )}
                <button className="flex items-center gap-1 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm transition-colors ml-auto">
                  <Edit2 className="w-4 h-4" />
                  Modifier
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Booking Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-2xl border border-slate-700 max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-white mb-4">Nouvelle Réservation</h3>
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
