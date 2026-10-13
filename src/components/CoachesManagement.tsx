import { useState } from 'react';
import { Users, Award, Calendar, DollarSign, Star, Phone, Mail, MapPin, Edit2, Eye } from 'lucide-react';

interface Coach {
  id: string;
  firstName: string;
  lastName: string;
  photo?: string;
  phone: string;
  email: string;
  address: string;
  specialization: string[];
  certifications: string[];
  beltRank: string;
  dan: number;
  experience: number;
  joinDate: string;
  status: 'active' | 'inactive' | 'vacation';
  salary: number;
  rating: number;
  studentsCount: number;
  classesPerWeek: number;
  bio: string;
  achievements: string[];
}

const mockCoaches: Coach[] = [
  {
    id: 'C001',
    firstName: 'Koné',
    lastName: 'Ibrahim',
    phone: '+225 07 45 67 89 01',
    email: 'kone.ibrahim@csa.ci',
    address: 'Plateau, Abidjan',
    specialization: ['Poomsae', 'Kyorugi', 'Compétition'],
    certifications: ['Maître 4ème Dan Kukkiwon', 'Arbitre International WT', 'Instructeur FITKD'],
    beltRank: 'black',
    dan: 4,
    experience: 15,
    joinDate: '2010-09-01',
    status: 'active',
    salary: 350000,
    rating: 4.9,
    studentsCount: 45,
    classesPerWeek: 12,
    bio: 'Maître Koné est un expert reconnu du Taekwondo avec plus de 15 ans d\'expérience. Formé en Corée du Sud, il a représenté la Côte d\'Ivoire dans de nombreuses compétitions internationales.',
    achievements: ['Champion National 2015', 'Médaille d\'Or Open International 2018', 'Meilleur Instructeur FITKD 2023']
  },
  {
    id: 'C002',
    firstName: 'Traoré',
    lastName: 'Moussa',
    phone: '+225 07 23 45 67 89',
    email: 'traore.moussa@csa.ci',
    address: 'Yopougon, Abidjan',
    specialization: ['Kyorugi', 'Self-Défense', 'Préparation Physique'],
    certifications: ['Coach 3ème Dan Kukkiwon', 'Spécialiste Kyorugi', 'Préparateur Physique'],
    beltRank: 'black',
    dan: 3,
    experience: 10,
    joinDate: '2015-01-15',
    status: 'active',
    salary: 280000,
    rating: 4.7,
    studentsCount: 38,
    classesPerWeek: 10,
    bio: 'Coach Traoré est spécialisé dans le combat et la préparation physique des athlètes de compétition. Son approche dynamique et motivante a formé plusieurs champions régionaux.',
    achievements: ['Vice-Champion National 2017', 'Coach de l\'Année 2022', 'Finaliste Coupe d\'Afrique 2019']
  },
  {
    id: 'C003',
    firstName: 'Diallo',
    lastName: 'Aminata',
    phone: '+225 07 56 78 90 12',
    email: 'diallo.aminata@csa.ci',
    address: 'Cocody, Abidjan',
    specialization: ['Enfants', 'Débutants', 'Poomsae'],
    certifications: ['Instructeur 2ème Dan', 'Spécialiste Jeunes', 'Pédagogie Adaptive'],
    beltRank: 'black',
    dan: 2,
    experience: 6,
    joinDate: '2019-03-01',
    status: 'active',
    salary: 220000,
    rating: 4.8,
    studentsCount: 52,
    classesPerWeek: 8,
    bio: 'Coach Diallo est passionnée par l\'enseignement aux enfants et aux débutants. Sa patience et sa pédagogie adaptée font d\'elle un excellent professeur pour les plus jeunes.',
    achievements: ['Meilleur Instructeur Jeunes 2023', 'Certificat d\'Excellence Pédagogique 2022']
  },
  {
    id: 'C004',
    firstName: 'Bamba',
    lastName: 'Fatoumata',
    phone: '+225 07 34 56 78 90',
    email: 'bamba.fatoumata@csa.ci',
    address: 'Abobo, Abidjan',
    specialization: ['Compétition', 'Kyorugi', 'Préparation Mentale'],
    certifications: ['Coach 2ème Dan', 'Préparateur Mental', 'Arbitre National'],
    beltRank: 'black',
    dan: 2,
    experience: 7,
    joinDate: '2018-09-01',
    status: 'vacation',
    salary: 240000,
    rating: 4.6,
    studentsCount: 28,
    classesPerWeek: 6,
    bio: 'Coach Bamba combine expertise technique et préparation mentale pour former des athlètes complets. Son approche holistique a permis à plusieurs élèves d\'exceller en compétition.',
    achievements: ['Championne Régionale 2020', 'Médaille de Bronze Nationale 2021']
  }
];

export default function CoachesManagement() {
  const [coaches, setCoaches] = useState<Coach[]>(mockCoaches);
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredCoaches = filterStatus === 'all' 
    ? coaches 
    : coaches.filter(c => c.status === filterStatus);

  const totalSalary = coaches.reduce((sum, c) => sum + c.salary, 0);
  const avgRating = (coaches.reduce((sum, c) => sum + c.rating, 0) / coaches.length).toFixed(1);
  const totalStudents = coaches.reduce((sum, c) => sum + c.studentsCount, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'inactive': return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
      case 'vacation': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Actif';
      case 'inactive': return 'Inactif';
      case 'vacation': return 'En congé';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Gestion des Coachs</h2>
          <p className="text-slate-400 text-sm">Équipe technique et instructeurs</p>
        </div>
        <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors">
          <Users className="w-4 h-4" />
          Ajouter un Coach
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-xl p-5 border border-blue-500/20">
          <div className="flex items-center justify-between mb-3">
            <Users className="w-8 h-8 text-blue-400" />
            <span className="text-blue-400 text-xs font-medium bg-blue-500/20 px-2 py-1 rounded">Total</span>
          </div>
          <p className="text-slate-400 text-sm">Coachs Actifs</p>
          <p className="text-3xl font-bold text-white mt-1">{coaches.filter(c => c.status === 'active').length}</p>
        </div>

        <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 rounded-xl p-5 border border-emerald-500/20">
          <div className="flex items-center justify-between mb-3">
            <Star className="w-8 h-8 text-emerald-400" />
            <span className="text-emerald-400 text-xs font-medium bg-emerald-500/20 px-2 py-1 rounded">Moyenne</span>
          </div>
          <p className="text-slate-400 text-sm">Note Moyenne</p>
          <p className="text-3xl font-bold text-white mt-1">{avgRating}/5</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-xl p-5 border border-purple-500/20">
          <div className="flex items-center justify-between mb-3">
            <Award className="w-8 h-8 text-purple-400" />
            <span className="text-purple-400 text-xs font-medium bg-purple-500/20 px-2 py-1 rounded">Total</span>
          </div>
          <p className="text-slate-400 text-sm">Élèves Suivis</p>
          <p className="text-3xl font-bold text-white mt-1">{totalStudents}</p>
        </div>

        <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 rounded-xl p-5 border border-amber-500/20">
          <div className="flex items-center justify-between mb-3">
            <DollarSign className="w-8 h-8 text-amber-400" />
            <span className="text-amber-400 text-xs font-medium bg-amber-500/20 px-2 py-1 rounded">Mensuel</span>
          </div>
          <p className="text-slate-400 text-sm">Masse Salariale</p>
          <p className="text-3xl font-bold text-white mt-1">{(totalSalary / 1000).toFixed(0)}K F</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilterStatus('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filterStatus === 'all'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'bg-slate-800 text-slate-400 border border-slate-700'
          }`}
        >
          Tous
        </button>
        <button
          onClick={() => setFilterStatus('active')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filterStatus === 'active'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'bg-slate-800 text-slate-400 border border-slate-700'
          }`}
        >
          Actifs
        </button>
        <button
          onClick={() => setFilterStatus('vacation')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filterStatus === 'vacation'
              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
              : 'bg-slate-800 text-slate-400 border border-slate-700'
          }`}
        >
          En congé
        </button>
      </div>

      {/* Coaches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCoaches.map(coach => (
          <div
            key={coach.id}
            className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden hover:border-emerald-500/30 transition-all cursor-pointer group"
            onClick={() => setSelectedCoach(coach)}
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white font-bold text-lg">
                    {coach.firstName[0]}{coach.lastName[0]}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold group-hover:text-emerald-400 transition-colors">
                      {coach.firstName} {coach.lastName}
                    </h3>
                    <p className="text-slate-400 text-xs">{coach.experience} ans d'expérience</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(coach.status)}`}>
                  {getStatusLabel(coach.status)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${star <= Math.floor(coach.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'}`}
                    />
                  ))}
                </div>
                <span className="text-slate-400 text-sm">{coach.rating}/5</span>
              </div>
            </div>

            {/* Body */}
            <div className="p-5 space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Award className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-300">Ceinture Noire {coach.dan}ème Dan</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="w-4 h-4 text-blue-400" />
                <span className="text-slate-300">{coach.studentsCount} élèves</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-purple-400" />
                <span className="text-slate-300">{coach.classesPerWeek} cours/semaine</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <DollarSign className="w-4 h-4 text-amber-400" />
                <span className="text-slate-300">{coach.salary.toLocaleString()} FCFA/mois</span>
              </div>

              {/* Specializations */}
              <div className="pt-3 border-t border-slate-700">
                <p className="text-slate-500 text-xs mb-2">Spécialisations</p>
                <div className="flex flex-wrap gap-1">
                  {coach.specialization.slice(0, 3).map((spec, idx) => (
                    <span key={idx} className="px-2 py-1 bg-slate-700/50 rounded text-xs text-slate-300">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 py-3 bg-slate-900/30 border-t border-slate-700 flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-1 text-emerald-400 hover:text-emerald-300 text-sm transition-colors">
                <Eye className="w-4 h-4" />
                Voir
              </button>
              <button className="flex-1 flex items-center justify-center gap-1 text-blue-400 hover:text-blue-300 text-sm transition-colors">
                <Edit2 className="w-4 h-4" />
                Modifier
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Coach Detail Modal */}
      {selectedCoach && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedCoach(null)}>
          <div className="bg-slate-800 rounded-2xl border border-slate-700 max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 p-6 border-b border-slate-700">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white font-bold text-2xl">
                    {selectedCoach.firstName[0]}{selectedCoach.lastName[0]}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedCoach.firstName} {selectedCoach.lastName}</h2>
                    <p className="text-slate-400">Ceinture Noire {selectedCoach.dan}ème Dan • {selectedCoach.experience} ans d'expérience</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star
                            key={star}
                            className={`w-5 h-5 ${star <= Math.floor(selectedCoach.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'}`}
                          />
                        ))}
                      </div>
                      <span className="text-slate-300">{selectedCoach.rating}/5</span>
                      <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(selectedCoach.status)}`}>
                        {getStatusLabel(selectedCoach.status)}
                      </span>
                    </div>
                  </div>
                </div>
                <button onClick={() => setSelectedCoach(null)} className="text-slate-400 hover:text-white text-2xl">&times;</button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <h4 className="text-emerald-400 font-semibold text-sm mb-3">Contact</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-300">{selectedCoach.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-300">{selectedCoach.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-300">{selectedCoach.address}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <h4 className="text-emerald-400 font-semibold text-sm mb-3">Statistiques</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-white">{selectedCoach.studentsCount}</p>
                      <p className="text-slate-400 text-xs">Élèves</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-white">{selectedCoach.classesPerWeek}</p>
                      <p className="text-slate-400 text-xs">Cours/Sem.</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-emerald-400">{selectedCoach.salary.toLocaleString()}</p>
                      <p className="text-slate-400 text-xs">FCFA/Mois</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-white">{selectedCoach.experience}</p>
                      <p className="text-slate-400 text-xs">Années</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="bg-slate-700/30 rounded-lg p-4">
                <h4 className="text-emerald-400 font-semibold text-sm mb-2">Biographie</h4>
                <p className="text-slate-300 text-sm">{selectedCoach.bio}</p>
              </div>

              {/* Specializations */}
              <div className="bg-slate-700/30 rounded-lg p-4">
                <h4 className="text-emerald-400 font-semibold text-sm mb-3">Spécialisations</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCoach.specialization.map((spec, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg text-sm">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div className="bg-slate-700/30 rounded-lg p-4">
                <h4 className="text-emerald-400 font-semibold text-sm mb-3">Certifications</h4>
                <ul className="space-y-2">
                  {selectedCoach.certifications.map((cert, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-slate-300 text-sm">
                      <Award className="w-4 h-4 text-yellow-400" />
                      {cert}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Achievements */}
              <div className="bg-slate-700/30 rounded-lg p-4">
                <h4 className="text-emerald-400 font-semibold text-sm mb-3">Réalisations</h4>
                <ul className="space-y-2">
                  {selectedCoach.achievements.map((achievement, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-slate-300 text-sm">
                      <Star className="w-4 h-4 text-amber-400" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
