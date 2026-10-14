import { useState, useEffect } from 'react';
import { DoorOpen, DoorClosed, Clock, UserCheck, AlertCircle, Search, CheckCircle, XCircle, Timer, Download } from 'lucide-react';
import { mockMembers } from '../data/mockData';
import { exportToCSV } from '../utils/helpers';

interface CheckPoint {
  id: string;
  memberId: string;
  memberName: string;
  licenseNumber: string;
  checkInTime: string;
  checkInDate: string;
  checkOutTime?: string;
  checkOutDate?: string;
  duration?: number; // en minutes
  status: 'in_progress' | 'completed' | 'forgot_checkout';
  notes?: string;
}

export default function SecretariatAttendanceView() {
  const [checkPoints, setCheckPoints] = useState<CheckPoint[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showCheckInModal, setShowCheckInModal] = useState(false);
  const [showCheckOutModal, setShowCheckOutModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<string>('');
  const [currentTime, setCurrentTime] = useState(new Date());

  // Mise à jour de l'heure en temps réel
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Charger les pointages du jour
  useEffect(() => {
    loadCheckPoints();
  }, [selectedDate]);

  const loadCheckPoints = () => {
    // Simulation de chargement depuis localStorage ou API
    const stored = localStorage.getItem(`checkpoints_${selectedDate}`);
    if (stored) {
      setCheckPoints(JSON.parse(stored));
    } else {
      setCheckPoints([]);
    }
  };

  const saveCheckPoints = (points: CheckPoint[]) => {
    localStorage.setItem(`checkpoints_${selectedDate}`, JSON.stringify(points));
    setCheckPoints(points);
  };

  // Pointage d'entrée
  const handleCheckIn = () => {
    if (!selectedMember) return;

    const member = mockMembers.find(m => m.id === selectedMember);
    if (!member) return;

    // Vérifier si déjà pointé aujourd'hui
    const existingCheckIn = checkPoints.find(
      cp => cp.memberId === selectedMember && cp.checkInDate === selectedDate && !cp.checkOutTime
    );

    if (existingCheckIn) {
      alert(`${member.firstName} ${member.lastName} est déjà pointé(e) aujourd'hui à ${existingCheckIn.checkInTime}`);
      return;
    }

    const newCheckPoint: CheckPoint = {
      id: `CP-${Date.now()}`,
      memberId: member.id,
      memberName: `${member.firstName} ${member.lastName}`,
      licenseNumber: member.licenseNumber,
      checkInTime: currentTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      checkInDate: selectedDate,
      status: 'in_progress',
    };

    saveCheckPoints([...checkPoints, newCheckPoint]);
    setSelectedMember('');
    setShowCheckInModal(false);
  };

  // Pointage de sortie
  const handleCheckOut = (checkPointId: string) => {
    const checkPoint = checkPoints.find(cp => cp.id === checkPointId);
    if (!checkPoint) return;

    const checkOutTime = currentTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    
    // Calculer la durée en minutes
    const [inHours, inMinutes] = checkPoint.checkInTime.split(':').map(Number);
    const [outHours, outMinutes] = checkOutTime.split(':').map(Number);
    const duration = (outHours * 60 + outMinutes) - (inHours * 60 + inMinutes);

    const updatedCheckPoints = checkPoints.map(cp =>
      cp.id === checkPointId
        ? {
            ...cp,
            checkOutTime,
            checkOutDate: selectedDate,
            duration,
            status: 'completed' as const,
          }
        : cp
    );

    saveCheckPoints(updatedCheckPoints);
  };

  // Statistiques du jour
  const todayStats = {
    total: checkPoints.length,
    inProgress: checkPoints.filter(cp => cp.status === 'in_progress').length,
    completed: checkPoints.filter(cp => cp.status === 'completed').length,
    forgotCheckout: checkPoints.filter(cp => cp.status === 'forgot_checkout').length,
    averageDuration: checkPoints.filter(cp => cp.duration).reduce((sum, cp) => sum + (cp.duration || 0), 0) / 
                     Math.max(checkPoints.filter(cp => cp.duration).length, 1),
  };

  // Filtrer les pointages
  const filteredCheckPoints = checkPoints.filter(cp =>
    cp.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cp.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Membres actuellement au club
  const membersInClub = checkPoints.filter(cp => cp.status === 'in_progress');

  // Export CSV
  const handleExport = () => {
    exportToCSV(checkPoints.map(cp => ({
      licencie: cp.memberName,
      licence: cp.licenseNumber,
      date: cp.checkInDate,
      entree: cp.checkInTime,
      sortie: cp.checkOutTime || 'Non pointé',
      duree_minutes: cp.duration || 0,
      duree_heures: cp.duration ? (cp.duration / 60).toFixed(2) : '0',
      statut: cp.status === 'completed' ? 'Terminé' : cp.status === 'in_progress' ? 'En cours' : 'Oubli',
    })), `pointage_secretariat_${selectedDate}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Pointage au Secrétariat</h2>
          <p className="text-slate-400 text-sm">Gestion des entrées et sorties des licenciés</p>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
          />
          <button
            onClick={handleExport}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Current Time Display */}
      <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-xl p-6 border border-emerald-500/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-sm">Heure actuelle</p>
            <p className="text-4xl font-bold text-white font-mono">
              {currentTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </p>
            <p className="text-slate-400 text-sm mt-1">
              {currentTime.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowCheckInModal(true)}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg transition-colors text-lg font-medium"
            >
              <DoorOpen className="w-6 h-6" />
              Pointage Entrée
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500/20 p-3 rounded-lg">
              <UserCheck className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-blue-400 text-xs">Actuellement au Club</p>
              <p className="text-3xl font-bold text-white">{todayStats.inProgress}</p>
            </div>
          </div>
        </div>
        <div className="bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/30">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500/20 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <p className="text-emerald-400 text-xs">Sorties Enregistrées</p>
              <p className="text-3xl font-bold text-white">{todayStats.completed}</p>
            </div>
          </div>
        </div>
        <div className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/30">
          <div className="flex items-center gap-3">
            <div className="bg-purple-500/20 p-3 rounded-lg">
              <Timer className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-purple-400 text-xs">Durée Moyenne</p>
              <p className="text-3xl font-bold text-white">{Math.round(todayStats.averageDuration)} min</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="bg-slate-700/50 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-slate-400" />
            </div>
            <div>
              <p className="text-slate-400 text-xs">Total Pointages</p>
              <p className="text-3xl font-bold text-white">{todayStats.total}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Members Currently in Club */}
      {membersInClub.length > 0 && (
        <div className="bg-emerald-500/10 rounded-xl p-5 border border-emerald-500/30">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <DoorOpen className="w-5 h-5 text-emerald-400" />
            Licenciés Actuellement au Club ({membersInClub.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {membersInClub.map(cp => {
              const [inHours, inMinutes] = cp.checkInTime.split(':').map(Number);
              const [nowHours, nowMinutes] = currentTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }).split(':').map(Number);
              const elapsedMinutes = (nowHours * 60 + nowMinutes) - (inHours * 60 + inMinutes);

              return (
                <div key={cp.id} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-white font-medium">{cp.memberName}</p>
                      <p className="text-slate-400 text-xs">{cp.licenseNumber}</p>
                    </div>
                    <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded text-xs">
                      Présent
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-xs">Entrée à</p>
                      <p className="text-white font-mono">{cp.checkInTime}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-slate-400 text-xs">Durée</p>
                      <p className="text-emerald-400 font-mono font-bold">
                        {Math.floor(elapsedMinutes / 60)}h {elapsedMinutes % 60}min
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCheckOut(cp.id)}
                    className="w-full mt-3 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-colors text-sm"
                  >
                    <DoorClosed className="w-4 h-4" />
                    Pointage Sortie
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Search and Filter */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Rechercher par nom ou numéro de licence..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
        />
      </div>

      {/* Check Points Table */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
        <div className="p-4 border-b border-slate-700">
          <h3 className="text-white font-semibold">Historique des Pointages du Jour</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left px-4 py-3 text-slate-400 text-xs font-medium uppercase">Licencié</th>
                <th className="text-left px-4 py-3 text-slate-400 text-xs font-medium uppercase">N° Licence</th>
                <th className="text-center px-4 py-3 text-slate-400 text-xs font-medium uppercase">Entrée</th>
                <th className="text-center px-4 py-3 text-slate-400 text-xs font-medium uppercase">Sortie</th>
                <th className="text-center px-4 py-3 text-slate-400 text-xs font-medium uppercase">Durée</th>
                <th className="text-center px-4 py-3 text-slate-400 text-xs font-medium uppercase">Statut</th>
                <th className="text-center px-4 py-3 text-slate-400 text-xs font-medium uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCheckPoints.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-slate-500">
                    Aucun pointage enregistré pour cette date
                  </td>
                </tr>
              ) : (
                filteredCheckPoints.map(cp => (
                  <tr key={cp.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                    <td className="px-4 py-3">
                      <span className="text-white text-sm font-medium">{cp.memberName}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-400 text-sm">{cp.licenseNumber}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <DoorOpen className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400 text-sm font-mono">{cp.checkInTime}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {cp.checkOutTime ? (
                        <div className="flex items-center justify-center gap-1">
                          <DoorClosed className="w-4 h-4 text-blue-400" />
                          <span className="text-blue-400 text-sm font-mono">{cp.checkOutTime}</span>
                        </div>
                      ) : (
                        <span className="text-slate-500 text-sm">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {cp.duration ? (
                        <span className="text-purple-400 text-sm font-mono font-bold">
                          {Math.floor(cp.duration / 60)}h {cp.duration % 60}min
                        </span>
                      ) : (
                        <span className="text-slate-500 text-sm">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {cp.status === 'completed' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs">
                          <CheckCircle className="w-3 h-3" />
                          Terminé
                        </span>
                      ) : cp.status === 'in_progress' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs">
                          <Clock className="w-3 h-3" />
                          En cours
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-500/20 text-red-400 rounded-full text-xs">
                          <AlertCircle className="w-3 h-3" />
                          Oubli
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {cp.status === 'in_progress' && (
                        <button
                          onClick={() => handleCheckOut(cp.id)}
                          className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs transition-colors"
                        >
                          Pointage Sortie
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Check In Modal */}
      {showCheckInModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-2xl border border-slate-700 max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <DoorOpen className="w-6 h-6 text-emerald-400" />
                Pointage d'Entrée
              </h3>
              <button onClick={() => setShowCheckInModal(false)} className="text-slate-400 hover:text-white text-2xl">&times;</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-slate-300 text-sm block mb-2">Sélectionner un licencié</label>
                <select
                  value={selectedMember}
                  onChange={(e) => setSelectedMember(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="">-- Choisir --</option>
                  {mockMembers.map(m => (
                    <option key={m.id} value={m.id}>
                      {m.firstName} {m.lastName} ({m.licenseNumber})
                    </option>
                  ))}
                </select>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-4">
                <p className="text-slate-400 text-sm">Heure de pointage</p>
                <p className="text-white text-2xl font-mono font-bold">
                  {currentTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleCheckIn}
                  disabled={!selectedMember}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-700 disabled:text-slate-500 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Confirmer l'Entrée
                </button>
                <button
                  onClick={() => setShowCheckInModal(false)}
                  className="px-6 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
