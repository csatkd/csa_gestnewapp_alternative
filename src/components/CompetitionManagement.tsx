import { useState } from 'react';
import { Trophy, Medal, Calendar, Users, Target, TrendingUp, Plus, Eye, Flag } from 'lucide-react';

interface Competition {
  id: string;
  name: string;
  date: string;
  location: string;
  type: 'national' | 'international' | 'regional' | 'local';
  level: 'debutant' | 'intermediaire' | 'avance' | 'elite';
  status: 'upcoming' | 'ongoing' | 'completed';
  registeredAthletes: string[];
  results?: CompetitionResult[];
  notes?: string;
}

interface CompetitionResult {
  memberId: string;
  memberName: string;
  category: string;
  discipline: 'poomsae' | 'kyorugi' | 'both';
  rank: number;
  medal?: 'gold' | 'silver' | 'bronze';
  score?: number;
  notes?: string;
}

interface AthleteStats {
  memberId: string;
  memberName: string;
  totalCompetitions: number;
  goldMedals: number;
  silverMedals: number;
  bronzeMedals: number;
  totalPoints: number;
  bestRank: number;
  winRate: number;
}

const mockCompetitions: Competition[] = [
  {
    id: 'COMP001',
    name: 'Championnat National FITKD 2024',
    date: '2024-11-15',
    location: 'Abidjan, Palais des Sports',
    type: 'national',
    level: 'elite',
    status: 'completed',
    registeredAthletes: ['M001', 'M002', 'M004'],
    results: [
      { memberId: 'M001', memberName: 'Kouassi Aya Marie', category: 'Cadettes -44kg', discipline: 'poomsae', rank: 2, medal: 'silver', score: 8.5 },
      { memberId: 'M002', memberName: 'Traoré Moussa', category: 'Juniors -63kg', discipline: 'kyorugi', rank: 1, medal: 'gold', score: 15 },
      { memberId: 'M004', memberName: 'Koné Ibrahim', category: 'Seniors -68kg', discipline: 'both', rank: 1, medal: 'gold', score: 22 }
    ],
    notes: 'Excellente performance globale. 2 médailles d\'or et 1 d\'argent.'
  },
  {
    id: 'COMP002',
    name: 'Open International de Taekwondo',
    date: '2024-12-08',
    location: 'Dakar, Sénégal',
    type: 'international',
    level: 'avance',
    status: 'completed',
    registeredAthletes: ['M002', 'M004'],
    results: [
      { memberId: 'M002', memberName: 'Traoré Moussa', category: 'Juniors -63kg', discipline: 'kyorugi', rank: 3, medal: 'bronze', score: 12 },
      { memberId: 'M004', memberName: 'Koné Ibrahim', category: 'Seniors -68kg', discipline: 'both', rank: 2, medal: 'silver', score: 18 }
    ],
    notes: 'Bonne performance à l\'international. Expérience enrichissante.'
  },
  {
    id: 'COMP003',
    name: 'Coupe Régionale Zone Sud',
    date: '2025-01-20',
    location: 'San-Pédro',
    type: 'regional',
    level: 'intermediaire',
    status: 'upcoming',
    registeredAthletes: ['M001', 'M003', 'M005', 'M006'],
    notes: 'Objectif : qualifier 2 athlètes pour le championnat national.'
  },
  {
    id: 'COMP004',
    name: 'Tournoi Inter-Clubs CSA',
    date: '2025-02-10',
    location: 'Dojang CSA, Cocody',
    type: 'local',
    level: 'debutant',
    status: 'upcoming',
    registeredAthletes: ['M001', 'M002', 'M003', 'M005', 'M006', 'M007', 'M008'],
    notes: 'Tournoi interne pour évaluer la progression des élèves.'
  },
  {
    id: 'COMP005',
    name: 'Championnat d\'Afrique de Taekwondo',
    date: '2025-03-15',
    location: 'Le Caire, Égypte',
    type: 'international',
    level: 'elite',
    status: 'upcoming',
    registeredAthletes: ['M004'],
    notes: 'Compétition majeure. Sélection rigoureuse des athlètes.'
  }
];

const mockAthleteStats: AthleteStats[] = [
  {
    memberId: 'M001',
    memberName: 'Kouassi Aya Marie',
    totalCompetitions: 5,
    goldMedals: 1,
    silverMedals: 2,
    bronzeMedals: 1,
    totalPoints: 45,
    bestRank: 1,
    winRate: 80
  },
  {
    memberId: 'M002',
    memberName: 'Traoré Moussa',
    totalCompetitions: 8,
    goldMedals: 3,
    silverMedals: 2,
    bronzeMedals: 2,
    totalPoints: 78,
    bestRank: 1,
    winRate: 87
  },
  {
    memberId: 'M003',
    memberName: 'Bamba Fatoumata',
    totalCompetitions: 3,
    goldMedals: 0,
    silverMedals: 1,
    bronzeMedals: 1,
    totalPoints: 20,
    bestRank: 2,
    winRate: 66
  },
  {
    memberId: 'M004',
    memberName: 'Koné Ibrahim',
    totalCompetitions: 12,
    goldMedals: 6,
    silverMedals: 4,
    bronzeMedals: 1,
    totalPoints: 120,
    bestRank: 1,
    winRate: 92
  },
  {
    memberId: 'M005',
    memberName: 'Diallo Aminata',
    totalCompetitions: 2,
    goldMedals: 0,
    silverMedals: 0,
    bronzeMedals: 1,
    totalPoints: 10,
    bestRank: 3,
    winRate: 50
  }
];

export default function CompetitionManagement() {
  const [competitions, setCompetitions] = useState<Competition[]>(mockCompetitions);
  const [athleteStats] = useState<AthleteStats[]>(mockAthleteStats);
  const [activeTab, setActiveTab] = useState<'competitions' | 'athletes'>('competitions');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedCompetition, setSelectedCompetition] = useState<Competition | null>(null);

  const filteredCompetitions = competitions.filter(c => {
    const matchType = filterType === 'all' || c.type === filterType;
    const matchStatus = filterStatus === 'all' || c.status === filterStatus;
    return matchType && matchStatus;
  });

  // Statistics
  const totalCompetitions = competitions.length;
  const completedCompetitions = competitions.filter(c => c.status === 'completed').length;
  const totalMedals = athleteStats.reduce((sum, a) => sum + a.goldMedals + a.silverMedals + a.bronzeMedals, 0);
  const totalGold = athleteStats.reduce((sum, a) => sum + a.goldMedals, 0);
  const avgWinRate = (athleteStats.reduce((sum, a) => sum + a.winRate, 0) / athleteStats.length).toFixed(0);

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'national': return '🏛️ National';
      case 'international': return '🌍 International';
      case 'regional': return '📍 Régional';
      case 'local': return '🏠 Local';
      default: return type;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'ongoing': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'completed': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'upcoming': return 'À venir';
      case 'ongoing': return 'En cours';
      case 'completed': return 'Terminée';
      default: return status;
    }
  };

  const getMedalIcon = (medal?: string) => {
    switch (medal) {
      case 'gold': return '🥇';
      case 'silver': return '🥈';
      case 'bronze': return '🥉';
      default: return '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Gestion des Compétitions</h2>
          <p className="text-slate-400 text-sm">Suivi des performances et résultats</p>
        </div>
        <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors">
          <Plus className="w-4 h-4" />
          Nouvelle Compétition
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-xl p-5 border border-blue-500/20">
          <div className="flex items-center justify-between mb-3">
            <Trophy className="w-8 h-8 text-blue-400" />
            <span className="text-blue-400 text-xs font-medium bg-blue-500/20 px-2 py-1 rounded">Total</span>
          </div>
          <p className="text-slate-400 text-sm">Compétitions</p>
          <p className="text-3xl font-bold text-white mt-1">{totalCompetitions}</p>
        </div>

        <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 rounded-xl p-5 border border-emerald-500/20">
          <div className="flex items-center justify-between mb-3">
            <Flag className="w-8 h-8 text-emerald-400" />
            <span className="text-emerald-400 text-xs font-medium bg-emerald-500/20 px-2 py-1 rounded">Terminées</span>
          </div>
          <p className="text-slate-400 text-sm">Compétitions</p>
          <p className="text-3xl font-bold text-white mt-1">{completedCompetitions}</p>
        </div>

        <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 rounded-xl p-5 border border-amber-500/20">
          <div className="flex items-center justify-between mb-3">
            <Medal className="w-8 h-8 text-amber-400" />
            <span className="text-amber-400 text-xs font-medium bg-amber-500/20 px-2 py-1 rounded">Total</span>
          </div>
          <p className="text-slate-400 text-sm">Médailles</p>
          <p className="text-3xl font-bold text-white mt-1">{totalMedals}</p>
        </div>

        <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 rounded-xl p-5 border border-yellow-500/20">
          <div className="flex items-center justify-between mb-3">
            <Trophy className="w-8 h-8 text-yellow-400" />
            <span className="text-yellow-400 text-xs font-medium bg-yellow-500/20 px-2 py-1 rounded">Or</span>
          </div>
          <p className="text-slate-400 text-sm">Médailles d'Or</p>
          <p className="text-3xl font-bold text-white mt-1">{totalGold}</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-xl p-5 border border-purple-500/20">
          <div className="flex items-center justify-between mb-3">
            <TrendingUp className="w-8 h-8 text-purple-400" />
            <span className="text-purple-400 text-xs font-medium bg-purple-500/20 px-2 py-1 rounded">Moyenne</span>
          </div>
          <p className="text-slate-400 text-sm">Taux de Réussite</p>
          <p className="text-3xl font-bold text-white mt-1">{avgWinRate}%</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('competitions')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'competitions'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'bg-slate-800 text-slate-400 border border-slate-700'
          }`}
        >
          Compétitions
        </button>
        <button
          onClick={() => setActiveTab('athletes')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'athletes'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'bg-slate-800 text-slate-400 border border-slate-700'
          }`}
        >
          Statistiques Athlètes
        </button>
      </div>

      {/* Competitions Tab */}
      {activeTab === 'competitions' && (
        <>
          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="all">Tous types</option>
              <option value="national">National</option>
              <option value="international">International</option>
              <option value="regional">Régional</option>
              <option value="local">Local</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="all">Tous statuts</option>
              <option value="upcoming">À venir</option>
              <option value="ongoing">En cours</option>
              <option value="completed">Terminée</option>
            </select>
          </div>

          {/* Competitions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCompetitions.map(competition => (
              <div
                key={competition.id}
                className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden hover:border-emerald-500/30 transition-all cursor-pointer group"
                onClick={() => setSelectedCompetition(competition)}
              >
                <div className="p-5 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-lg group-hover:text-emerald-400 transition-colors">
                        {competition.name}
                      </h3>
                      <p className="text-slate-400 text-sm mt-1">{competition.location}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(competition.status)}`}>
                      {getStatusLabel(competition.status)}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-slate-400">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(competition.date).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-400">
                      <Users className="w-4 h-4" />
                      <span>{competition.registeredAthletes.length} athlète(s)</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-700">
                    <span className="text-slate-400 text-sm">{getTypeLabel(competition.type)}</span>
                    {competition.results && (
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-400">🥇 {competition.results.filter(r => r.medal === 'gold').length}</span>
                        <span className="text-gray-300">🥈 {competition.results.filter(r => r.medal === 'silver').length}</span>
                        <span className="text-amber-600">🥉 {competition.results.filter(r => r.medal === 'bronze').length}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Athletes Tab */}
      {activeTab === 'athletes' && (
        <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left px-4 py-3 text-slate-400 text-xs font-medium uppercase">Athlète</th>
                  <th className="text-center px-4 py-3 text-slate-400 text-xs font-medium uppercase">Compétitions</th>
                  <th className="text-center px-4 py-3 text-slate-400 text-xs font-medium uppercase">🥇 Or</th>
                  <th className="text-center px-4 py-3 text-slate-400 text-xs font-medium uppercase">🥈 Argent</th>
                  <th className="text-center px-4 py-3 text-slate-400 text-xs font-medium uppercase">🥉 Bronze</th>
                  <th className="text-center px-4 py-3 text-slate-400 text-xs font-medium uppercase">Points</th>
                  <th className="text-center px-4 py-3 text-slate-400 text-xs font-medium uppercase">Meilleur Rang</th>
                  <th className="text-center px-4 py-3 text-slate-400 text-xs font-medium uppercase">Taux Réussite</th>
                </tr>
              </thead>
              <tbody>
                {athleteStats
                  .sort((a, b) => b.totalPoints - a.totalPoints)
                  .map((athlete, index) => (
                    <tr key={athlete.memberId} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <span className="text-slate-400 font-bold text-lg">#{index + 1}</span>
                          <span className="text-white font-medium">{athlete.memberName}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center text-slate-300">{athlete.totalCompetitions}</td>
                      <td className="px-4 py-3 text-center text-yellow-400 font-bold">{athlete.goldMedals}</td>
                      <td className="px-4 py-3 text-center text-gray-300 font-bold">{athlete.silverMedals}</td>
                      <td className="px-4 py-3 text-center text-amber-600 font-bold">{athlete.bronzeMedals}</td>
                      <td className="px-4 py-3 text-center text-emerald-400 font-bold">{athlete.totalPoints}</td>
                      <td className="px-4 py-3 text-center">
                        <span className="text-white font-bold">{athlete.bestRank}</span>
                        {athlete.bestRank === 1 && <span className="ml-1">🏆</span>}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`font-bold ${athlete.winRate >= 80 ? 'text-emerald-400' : athlete.winRate >= 60 ? 'text-amber-400' : 'text-red-400'}`}>
                          {athlete.winRate}%
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Competition Detail Modal */}
      {selectedCompetition && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedCompetition(null)}>
          <div className="bg-slate-800 rounded-2xl border border-slate-700 max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-slate-700">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedCompetition.name}</h2>
                  <p className="text-slate-400 mt-1">{selectedCompetition.location}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-slate-400 text-sm flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(selectedCompetition.date).toLocaleDateString('fr-FR')}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(selectedCompetition.status)}`}>
                      {getStatusLabel(selectedCompetition.status)}
                    </span>
                    <span className="text-slate-400 text-sm">{getTypeLabel(selectedCompetition.type)}</span>
                  </div>
                </div>
                <button onClick={() => setSelectedCompetition(null)} className="text-slate-400 hover:text-white text-2xl">&times;</button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Athletes Registered */}
              <div>
                <h4 className="text-emerald-400 font-semibold text-sm mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Athlètes Inscrits ({selectedCompetition.registeredAthletes.length})
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {selectedCompetition.registeredAthletes.map(id => {
                    const athlete = athleteStats.find(a => a.memberId === id);
                    return (
                      <div key={id} className="bg-slate-700/30 rounded-lg p-3">
                        <p className="text-white text-sm">{athlete?.memberName || 'Athlète'}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Results */}
              {selectedCompetition.results && selectedCompetition.results.length > 0 && (
                <div>
                  <h4 className="text-emerald-400 font-semibold text-sm mb-3 flex items-center gap-2">
                    <Trophy className="w-4 h-4" />
                    Résultats
                  </h4>
                  <div className="space-y-2">
                    {selectedCompetition.results.map((result, idx) => (
                      <div key={idx} className="bg-slate-700/30 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{getMedalIcon(result.medal)}</span>
                            <div>
                              <p className="text-white font-medium">{result.memberName}</p>
                              <p className="text-slate-400 text-xs">{result.category} • {result.discipline}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-white">#{result.rank}</p>
                            {result.score && <p className="text-slate-400 text-xs">{result.score} pts</p>}
                          </div>
                        </div>
                        {result.notes && <p className="text-slate-400 text-sm mt-2">{result.notes}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              {selectedCompetition.notes && (
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <h4 className="text-emerald-400 font-semibold text-sm mb-2">Notes</h4>
                  <p className="text-slate-300">{selectedCompetition.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
