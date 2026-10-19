import { useState } from 'react';
import { UserCheck, CheckCircle, XCircle, Clock, Search, Filter, Eye, Phone, Mail, Calendar, MapPin } from 'lucide-react';

interface PreInscription {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  age: number;
  gender: 'M' | 'F';
  parentName?: string;
  parentPhone: string;
  parentEmail?: string;
  address: string;
  desiredSchedule: string;
  experience: string;
  medicalCertificate: boolean;
  motivation: string;
  status: 'pending' | 'approved' | 'rejected';
  submissionDate: string;
  notes?: string;
}

const mockPreInscriptions: PreInscription[] = [
  {
    id: 'PRE-001',
    firstName: 'Kouamé',
    lastName: 'Jean',
    dateOfBirth: '2015-03-15',
    age: 9,
    gender: 'M',
    parentName: 'Kouamé Marie',
    parentPhone: '+225 07 11 22 33 44',
    parentEmail: 'kouame.marie@email.com',
    address: 'Cocody, Abidjan',
    desiredSchedule: 'enfants-lundi',
    experience: 'debutant',
    medicalCertificate: true,
    motivation: 'Mon fils souhaite apprendre le Taekwondo pour la discipline et la confiance en soi.',
    status: 'pending',
    submissionDate: '2024-12-18',
  },
  {
    id: 'PRE-002',
    firstName: 'Traoré',
    lastName: 'Fatou',
    dateOfBirth: '2010-07-22',
    age: 14,
    gender: 'F',
    parentName: 'Traoré Ibrahim',
    parentPhone: '+225 07 22 33 44 55',
    parentEmail: 'traore.ibrahim@email.com',
    address: 'Yopougon, Abidjan',
    desiredSchedule: 'ados-lundi',
    experience: 'quelques-mois',
    medicalCertificate: true,
    motivation: 'Elle a déjà fait quelques mois dans un autre club et souhaite continuer.',
    status: 'pending',
    submissionDate: '2024-12-19',
  },
  {
    id: 'PRE-003',
    firstName: 'Bamba',
    lastName: 'Moussa',
    dateOfBirth: '1995-11-08',
    age: 29,
    gender: 'M',
    parentPhone: '+225 07 33 44 55 66',
    parentEmail: 'bamba.moussa@email.com',
    address: 'Plateau, Abidjan',
    desiredSchedule: 'adultes-mardi',
    experience: 'autre-art-martial',
    medicalCertificate: false,
    motivation: 'Je pratique le karaté depuis 5 ans et souhaite découvrir le Taekwondo.',
    status: 'pending',
    submissionDate: '2024-12-20',
    notes: 'En attente du certificat médical',
  },
  {
    id: 'PRE-004',
    firstName: 'Diallo',
    lastName: 'Aminata',
    dateOfBirth: '2012-05-18',
    age: 12,
    gender: 'F',
    parentName: 'Diallo Mamadou',
    parentPhone: '+225 07 44 55 66 77',
    parentEmail: 'diallo.mamadou@email.com',
    address: 'Treichville, Abidjan',
    desiredSchedule: 'enfants-mercredi',
    experience: 'debutant',
    medicalCertificate: true,
    motivation: 'Ma fille est très motivée pour apprendre le Taekwondo.',
    status: 'approved',
    submissionDate: '2024-12-15',
    notes: 'Préinscription validée - Rendez-vous fixé au 22/12',
  },
  {
    id: 'PRE-005',
    firstName: 'Ouattara',
    lastName: 'Seydou',
    dateOfBirth: '2008-09-12',
    age: 16,
    gender: 'M',
    parentName: 'Ouattara Mariam',
    parentPhone: '+225 07 55 66 77 88',
    address: 'Marcory, Abidjan',
    desiredSchedule: 'ados-jeudi',
    experience: '1-2-ans',
    medicalCertificate: true,
    motivation: 'Il souhaite participer aux compétitions.',
    status: 'rejected',
    submissionDate: '2024-12-10',
    notes: 'Groupe complet pour cet horaire - proposer un autre horaire',
  },
];

export default function PreInscriptionManagement() {
  const [preInscriptions, setPreInscriptions] = useState<PreInscription[]>(mockPreInscriptions);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedPreInscription, setSelectedPreInscription] = useState<PreInscription | null>(null);

  const filteredPreInscriptions = preInscriptions.filter(pre => {
    const matchSearch = `${pre.firstName} ${pre.lastName} ${pre.parentPhone}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'all' || pre.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const stats = {
    total: preInscriptions.length,
    pending: preInscriptions.filter(p => p.status === 'pending').length,
    approved: preInscriptions.filter(p => p.status === 'approved').length,
    rejected: preInscriptions.filter(p => p.status === 'rejected').length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'approved': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'rejected': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'approved': return 'Approuvée';
      case 'rejected': return 'Rejetée';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  const getScheduleLabel = (schedule: string) => {
    const labels: Record<string, string> = {
      'enfants-lundi': 'Enfants - Lundi 16h-17h30',
      'enfants-mercredi': 'Enfants - Mercredi 16h-17h30',
      'enfants-vendredi': 'Enfants - Vendredi 16h-17h30',
      'ados-lundi': 'Ados - Lundi 18h-19h30',
      'ados-jeudi': 'Ados - Jeudi 18h-19h30',
      'adultes-mardi': 'Adultes - Mardi 18h-20h',
      'adultes-vendredi': 'Adultes - Vendredi 18h-20h',
      'competition-samedi': 'Compétition - Samedi 11h-12h30',
    };
    return labels[schedule] || schedule;
  };

  const getExperienceLabel = (experience: string) => {
    const labels: Record<string, string> = {
      'debutant': 'Débutant complet',
      'quelques-mois': 'Quelques mois',
      '1-2-ans': '1-2 ans',
      '3-ans-plus': '3 ans ou plus',
      'autre-art-martial': 'Autre art martial',
    };
    return labels[experience] || experience;
  };

  const handleApprove = (id: string) => {
    setPreInscriptions(preInscriptions.map(p => 
      p.id === id ? { ...p, status: 'approved' as const, notes: 'Préinscription approuvée' } : p
    ));
    if (selectedPreInscription?.id === id) {
      setSelectedPreInscription({ ...selectedPreInscription, status: 'approved', notes: 'Préinscription approuvée' });
    }
  };

  const handleReject = (id: string) => {
    setPreInscriptions(preInscriptions.map(p => 
      p.id === id ? { ...p, status: 'rejected' as const, notes: 'Préinscription rejetée' } : p
    ));
    if (selectedPreInscription?.id === id) {
      setSelectedPreInscription({ ...selectedPreInscription, status: 'rejected', notes: 'Préinscription rejetée' });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Gestion des Préinscriptions</h2>
          <p className="text-slate-400 text-sm">Validation des préinscriptions en ligne</p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500/20 p-3 rounded-lg">
              <UserCheck className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-slate-400 text-xs">Total</p>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-yellow-500/10 rounded-xl p-4 border border-yellow-500/30">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-500/20 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <p className="text-yellow-400 text-xs">En attente</p>
              <p className="text-2xl font-bold text-white">{stats.pending}</p>
            </div>
          </div>
        </div>
        <div className="bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/30">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500/20 p-3 rounded-lg">
              <CheckCircle className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <p className="text-emerald-400 text-xs">Approuvées</p>
              <p className="text-2xl font-bold text-white">{stats.approved}</p>
            </div>
          </div>
        </div>
        <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/30">
          <div className="flex items-center gap-3">
            <div className="bg-red-500/20 p-3 rounded-lg">
              <XCircle className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <p className="text-red-400 text-xs">Rejetées</p>
              <p className="text-2xl font-bold text-white">{stats.rejected}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher par nom ou téléphone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
        >
          <option value="all">Tous les statuts</option>
          <option value="pending">En attente</option>
          <option value="approved">Approuvées</option>
          <option value="rejected">Rejetées</option>
        </select>
      </div>

      {/* Pre-inscriptions List */}
      <div className="space-y-4">
        {filteredPreInscriptions.map(pre => (
          <div
            key={pre.id}
            className="bg-slate-800/50 rounded-xl p-5 border border-slate-700 hover:border-emerald-500/30 transition-all cursor-pointer"
            onClick={() => setSelectedPreInscription(pre)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white font-bold">
                  {pre.firstName[0]}{pre.lastName[0]}
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">
                    {pre.firstName} {pre.lastName}
                  </h3>
                  <p className="text-slate-400 text-sm">
                    {pre.age} ans • {pre.gender === 'M' ? 'Masculin' : 'Féminin'}
                  </p>
                  {pre.parentName && (
                    <p className="text-slate-500 text-xs mt-1">
                      Parent: {pre.parentName} • {pre.parentPhone}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getStatusColor(pre.status)}`}>
                  {getStatusIcon(pre.status)}
                  {getStatusLabel(pre.status)}
                </span>
                <span className="text-slate-500 text-xs">
                  Soumis le {new Date(pre.submissionDate).toLocaleDateString('fr-FR')}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span className="text-slate-300">{getScheduleLabel(pre.desiredSchedule)}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <UserCheck className="w-4 h-4 text-slate-400" />
                <span className="text-slate-300">{getExperienceLabel(pre.experience)}</span>
              </div>
            </div>

            {pre.status === 'pending' && (
              <div className="flex gap-2 pt-3 border-t border-slate-700">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleApprove(pre.id);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors text-sm"
                >
                  <CheckCircle className="w-4 h-4" />
                  Approuver
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleReject(pre.id);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm"
                >
                  <XCircle className="w-4 h-4" />
                  Rejeter
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedPreInscription && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedPreInscription(null)}>
          <div className="bg-slate-800 rounded-2xl border border-slate-700 max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-slate-700">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white font-bold text-xl">
                    {selectedPreInscription.firstName[0]}{selectedPreInscription.lastName[0]}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {selectedPreInscription.firstName} {selectedPreInscription.lastName}
                    </h2>
                    <p className="text-slate-400 mt-1">
                      {selectedPreInscription.age} ans • {selectedPreInscription.gender === 'M' ? 'Masculin' : 'Féminin'}
                    </p>
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border mt-2 ${getStatusColor(selectedPreInscription.status)}`}>
                      {getStatusIcon(selectedPreInscription.status)}
                      {getStatusLabel(selectedPreInscription.status)}
                    </span>
                  </div>
                </div>
                <button onClick={() => setSelectedPreInscription(null)} className="text-slate-400 hover:text-white text-2xl">&times;</button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Informations Personnelles */}
              <div className="bg-slate-700/30 rounded-lg p-4">
                <h4 className="text-emerald-400 font-semibold text-sm mb-3">Informations Personnelles</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-slate-400">Date de naissance</p>
                    <p className="text-white">{new Date(selectedPreInscription.dateOfBirth).toLocaleDateString('fr-FR')}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Âge</p>
                    <p className="text-white">{selectedPreInscription.age} ans</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> Adresse
                    </p>
                    <p className="text-white">{selectedPreInscription.address}</p>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="bg-slate-700/30 rounded-lg p-4">
                <h4 className="text-emerald-400 font-semibold text-sm mb-3">Contact</h4>
                <div className="space-y-2 text-sm">
                  {selectedPreInscription.parentName && (
                    <div className="flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-400">Parent:</span>
                      <span className="text-white">{selectedPreInscription.parentName}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-400">Téléphone:</span>
                    <a href={`tel:${selectedPreInscription.parentPhone}`} className="text-emerald-400 hover:underline">
                      {selectedPreInscription.parentPhone}
                    </a>
                  </div>
                  {selectedPreInscription.parentEmail && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-400">Email:</span>
                      <a href={`mailto:${selectedPreInscription.parentEmail}`} className="text-emerald-400 hover:underline">
                        {selectedPreInscription.parentEmail}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Préférences */}
              <div className="bg-slate-700/30 rounded-lg p-4">
                <h4 className="text-emerald-400 font-semibold text-sm mb-3">Préférences</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <p className="text-slate-400">Horaire souhaité</p>
                    <p className="text-white">{getScheduleLabel(selectedPreInscription.desiredSchedule)}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Expérience</p>
                    <p className="text-white">{getExperienceLabel(selectedPreInscription.experience)}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Certificat médical</p>
                    <p className={selectedPreInscription.medicalCertificate ? 'text-emerald-400' : 'text-red-400'}>
                      {selectedPreInscription.medicalCertificate ? '✓ Oui' : '✗ Non'}
                    </p>
                  </div>
                  {selectedPreInscription.motivation && (
                    <div>
                      <p className="text-slate-400 mb-1">Motivation</p>
                      <p className="text-white italic">"{selectedPreInscription.motivation}"</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Notes */}
              {selectedPreInscription.notes && (
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <h4 className="text-emerald-400 font-semibold text-sm mb-2">Notes</h4>
                  <p className="text-slate-300 text-sm">{selectedPreInscription.notes}</p>
                </div>
              )}

              {/* Actions */}
              {selectedPreInscription.status === 'pending' && (
                <div className="flex gap-3 pt-4 border-t border-slate-700">
                  <button
                    onClick={() => {
                      handleApprove(selectedPreInscription.id);
                      setSelectedPreInscription(null);
                    }}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Approuver la Préinscription
                  </button>
                  <button
                    onClick={() => {
                      handleReject(selectedPreInscription.id);
                      setSelectedPreInscription(null);
                    }}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <XCircle className="w-5 h-5" />
                    Rejeter la Préinscription
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
