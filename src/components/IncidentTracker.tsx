import { useState } from 'react';
import { Activity, AlertTriangle, Plus, Edit2, Trash2, Calendar, User } from 'lucide-react';

interface Incident {
  id: string;
  memberId: string;
  memberName: string;
  date: string;
  type: 'blessure' | 'malaise' | 'accident' | 'autre';
  severity: 'legere' | 'moderee' | 'grave';
  description: string;
  treatment: string;
  followUp: string;
  reportedBy: string;
  status: 'actif' | 'en_traitement' | 'gueri';
}

const mockIncidents: Incident[] = [
  {
    id: '1',
    memberId: 'M001',
    memberName: 'Kouassi Aya Marie',
    date: '2024-12-10',
    type: 'blessure',
    severity: 'legere',
    description: 'Entorse légère de la cheville droite lors d\'un exercice de kicks',
    treatment: 'Glace, repos, bandage compressif',
    followUp: 'Reprise progressive après 5 jours de repos',
    reportedBy: 'Coach Traoré',
    status: 'gueri'
  },
  {
    id: '2',
    memberId: 'M004',
    memberName: 'Koné Ibrahim',
    date: '2024-12-15',
    type: 'blessure',
    severity: 'moderee',
    description: 'Déchirure musculaire au niveau du quadriceps gauche',
    treatment: 'Repos complet, anti-inflammatoires, kinésithérapie',
    followUp: 'Arrêt de 3 semaines, reprise progressive',
    reportedBy: 'Maître Koné',
    status: 'en_traitement'
  },
  {
    id: '3',
    memberId: 'M007',
    memberName: 'Yao Koffi',
    date: '2024-12-18',
    type: 'malaise',
    severity: 'legere',
    description: 'Malaise vagal pendant l\'échauffement',
    treatment: 'Repos, hydratation, surveillance',
    followUp: 'Aucune séquelle, reprise normale',
    reportedBy: 'Coach Bamba',
    status: 'gueri'
  }
];

export default function IncidentTracker() {
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredIncidents = incidents.filter(incident => {
    const matchStatus = filterStatus === 'all' || incident.status === filterStatus;
    const matchSeverity = filterSeverity === 'all' || incident.severity === filterSeverity;
    return matchStatus && matchSeverity;
  });

  const activeIncidents = incidents.filter(i => i.status === 'actif' || i.status === 'en_traitement').length;
  const severeIncidents = incidents.filter(i => i.severity === 'grave').length;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'grave': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'moderee': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'legere': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'actif': return 'bg-red-500/20 text-red-400';
      case 'en_traitement': return 'bg-yellow-500/20 text-yellow-400';
      case 'gueri': return 'bg-green-500/20 text-green-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'actif': return 'Actif';
      case 'en_traitement': return 'En traitement';
      case 'gueri': return 'Guéri';
      default: return status;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'blessure': return 'Blessure';
      case 'malaise': return 'Malaise';
      case 'accident': return 'Accident';
      case 'autre': return 'Autre';
      default: return type;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Suivi des Incidents</h2>
          <p className="text-slate-400 text-sm">Gestion des blessures et incidents médicaux</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Déclarer un Incident
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-500/20 p-3 rounded-lg">
              <Activity className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <p className="text-slate-400 text-xs">Incidents Actifs</p>
              <p className="text-2xl font-bold text-white">{activeIncidents}</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="bg-red-500/20 p-3 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <p className="text-slate-400 text-xs">Incidents Graves</p>
              <p className="text-2xl font-bold text-white">{severeIncidents}</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="bg-green-500/20 p-3 rounded-lg">
              <Activity className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-slate-400 text-xs">Total Incidents</p>
              <p className="text-2xl font-bold text-white">{incidents.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <div className="flex gap-2">
          <span className="text-slate-400 text-sm py-2">Statut:</span>
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
              filterStatus === 'all'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-slate-800 text-slate-400 border border-slate-700'
            }`}
          >
            Tous
          </button>
          <button
            onClick={() => setFilterStatus('actif')}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
              filterStatus === 'actif'
                ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                : 'bg-slate-800 text-slate-400 border border-slate-700'
            }`}
          >
            Actifs
          </button>
          <button
            onClick={() => setFilterStatus('en_traitement')}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
              filterStatus === 'en_traitement'
                ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                : 'bg-slate-800 text-slate-400 border border-slate-700'
            }`}
          >
            En traitement
          </button>
          <button
            onClick={() => setFilterStatus('gueri')}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
              filterStatus === 'gueri'
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-slate-800 text-slate-400 border border-slate-700'
            }`}
          >
            Guéris
          </button>
        </div>
        <div className="flex gap-2">
          <span className="text-slate-400 text-sm py-2">Gravité:</span>
          <button
            onClick={() => setFilterSeverity('all')}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
              filterSeverity === 'all'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-slate-800 text-slate-400 border border-slate-700'
            }`}
          >
            Toutes
          </button>
          <button
            onClick={() => setFilterSeverity('grave')}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
              filterSeverity === 'grave'
                ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                : 'bg-slate-800 text-slate-400 border border-slate-700'
            }`}
          >
            Grave
          </button>
          <button
            onClick={() => setFilterSeverity('moderee')}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
              filterSeverity === 'moderee'
                ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                : 'bg-slate-800 text-slate-400 border border-slate-700'
            }`}
          >
            Modérée
          </button>
          <button
            onClick={() => setFilterSeverity('legere')}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
              filterSeverity === 'legere'
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-slate-800 text-slate-400 border border-slate-700'
            }`}
          >
            Légère
          </button>
        </div>
      </div>

      {/* Incidents List */}
      <div className="space-y-4">
        {filteredIncidents.length === 0 ? (
          <div className="bg-slate-800/50 rounded-xl p-8 text-center border border-slate-700">
            <Activity className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400">Aucun incident à afficher</p>
          </div>
        ) : (
          filteredIncidents.map(incident => (
            <div
              key={incident.id}
              className={`bg-slate-800/50 rounded-xl p-5 border transition-colors ${
                incident.severity === 'grave' ? 'border-red-500/30' : 'border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    incident.severity === 'grave' ? 'bg-red-500/20' :
                    incident.severity === 'moderee' ? 'bg-yellow-500/20' : 'bg-green-500/20'
                  }`}>
                    <AlertTriangle className={`w-5 h-5 ${
                      incident.severity === 'grave' ? 'text-red-400' :
                      incident.severity === 'moderee' ? 'text-yellow-400' : 'text-green-400'
                    }`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-white font-semibold">{incident.memberName}</h3>
                      <span className={`px-2 py-0.5 rounded text-xs border ${getSeverityColor(incident.severity)}`}>
                        {incident.severity === 'grave' ? 'Grave' : incident.severity === 'moderee' ? 'Modérée' : 'Légère'}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-xs ${getStatusColor(incident.status)}`}>
                        {getStatusLabel(incident.status)}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(incident.date).toLocaleDateString('fr-FR')}
                      </span>
                      <span>•</span>
                      <span>{getTypeLabel(incident.type)}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {incident.reportedBy}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="text-slate-400 hover:text-white transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="text-slate-400 hover:text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="ml-11 space-y-2">
                <div>
                  <p className="text-slate-400 text-xs mb-1">Description:</p>
                  <p className="text-slate-300 text-sm">{incident.description}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs mb-1">Traitement:</p>
                  <p className="text-slate-300 text-sm">{incident.treatment}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs mb-1">Suivi:</p>
                  <p className="text-slate-300 text-sm">{incident.followUp}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Incident Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-2xl border border-slate-700 max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-white mb-4">Déclarer un Incident</h3>
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
