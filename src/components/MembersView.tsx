import { useState } from 'react';
import { Search, Filter, UserPlus, ChevronRight, Shield, Activity, Calendar, Heart } from 'lucide-react';
import { mockMembers } from '../data/mockData';
import { Member, BeltColor } from '../types';

const beltColors: Record<BeltColor, string> = {
  white: 'bg-white border-gray-300',
  yellow: 'bg-yellow-300',
  orange: 'bg-orange-400',
  green: 'bg-green-500',
  blue: 'bg-blue-500',
  purple: 'bg-purple-500',
  brown: 'bg-amber-800',
  red: 'bg-red-600',
  black: 'bg-black border-gray-600',
};

const beltLabels: Record<BeltColor, string> = {
  white: 'Blanche', yellow: 'Jaune', orange: 'Orange', green: 'Verte',
  blue: 'Bleue', purple: 'Violette', brown: 'Marron', red: 'Rouge', black: 'Noire',
};

function getAgeCategory(dob: string): string {
  const age = Math.floor((Date.now() - new Date(dob).getTime()) / (365.25 * 24 * 60 * 60 * 1000));
  if (age <= 7) return 'Poussins';
  if (age <= 9) return 'Benjamins';
  if (age <= 11) return 'Minimes';
  if (age <= 13) return 'Cadets';
  if (age <= 15) return 'Juniors';
  if (age <= 35) return 'Seniors';
  return 'Vétérans';
}

function getBMI(weight: number, height: number): number {
  const heightM = height / 100;
  return parseFloat((weight / (heightM * heightM)).toFixed(1));
}

function getWeightCategory(bmi: number, gender: string): string {
  if (gender === 'M') {
    if (bmi < 18.5) return 'Moins de 58kg';
    if (bmi < 22) return '58-68kg';
    if (bmi < 25) return '68-80kg';
    return 'Plus de 80kg';
  } else {
    if (bmi < 18.5) return 'Moins de 49kg';
    if (bmi < 22) return '49-57kg';
    if (bmi < 25) return '57-67kg';
    return 'Plus de 67kg';
  }
}

function getDaysUntilExpiry(dateStr: string) {
  const diff = new Date(dateStr).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export default function MembersView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBelt, setFilterBelt] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const filteredMembers = mockMembers.filter(m => {
    const matchSearch = `${m.firstName} ${m.lastName} ${m.licenseNumber}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchBelt = filterBelt === 'all' || m.beltColor === filterBelt;
    const matchCategory = filterCategory === 'all' || getAgeCategory(m.dateOfBirth) === filterCategory;
    return matchSearch && matchBelt && matchCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Gestion des Licenciés</h2>
          <p className="text-slate-400 text-sm">{filteredMembers.length} membre(s) affiché(s)</p>
        </div>
        <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors">
          <UserPlus className="w-4 h-4" />
          Nouveau Licencié
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher par nom ou licence..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <select
              value={filterBelt}
              onChange={(e) => setFilterBelt(e.target.value)}
              className="pl-10 pr-8 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white appearance-none focus:outline-none focus:border-emerald-500"
            >
              <option value="all">Toutes ceintures</option>
              {Object.entries(beltLabels).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white appearance-none focus:outline-none focus:border-emerald-500"
          >
            <option value="all">Toutes catégories</option>
            <option value="Poussins">Poussins</option>
            <option value="Benjamins">Benjamins</option>
            <option value="Minimes">Minimes</option>
            <option value="Cadets">Cadets</option>
            <option value="Juniors">Juniors</option>
            <option value="Seniors">Seniors</option>
            <option value="Vétérans">Vétérans</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMembers.map(member => {
          const medicalDays = getDaysUntilExpiry(member.medicalCertificateValidUntil);
          const avgAttendance = Math.round(member.attendanceHistory.reduce((s, a) => s + a.rate, 0) / member.attendanceHistory.length);

          return (
            <div
              key={member.id}
              onClick={() => setSelectedMember(member)}
              className="bg-slate-800/70 rounded-xl p-4 border border-slate-700 hover:border-emerald-500/50 cursor-pointer transition-all hover:shadow-lg hover:shadow-emerald-500/5 group"
            >
              <div className="flex items-start gap-3">
                <div className={`w-12 h-12 rounded-full ${beltColors[member.beltColor]} flex items-center justify-center text-lg font-bold border-2 ${member.beltColor === 'white' ? 'text-gray-800' : 'text-white'}`}>
                  {member.firstName[0]}{member.lastName[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold truncate group-hover:text-emerald-400 transition-colors">
                    {member.firstName} {member.lastName}
                  </h3>
                  <p className="text-slate-400 text-xs">{member.licenseNumber}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className={`w-6 h-2 rounded-full ${beltColors[member.beltColor]} border ${member.beltColor === 'white' ? 'border-gray-400' : 'border-transparent'}`}></div>
                    <span className="text-slate-500 text-xs">
                      {beltLabels[member.beltColor]} {member.dan ? `${member.dan}ème Dan` : ''}
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2">
                <div className="bg-slate-700/50 rounded-lg p-2 text-center">
                  <p className="text-slate-500 text-xs">Catégorie</p>
                  <p className="text-white text-xs font-medium">{getAgeCategory(member.dateOfBirth)}</p>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-2 text-center">
                  <p className="text-slate-500 text-xs">Assiduité</p>
                  <p className={`text-xs font-medium ${avgAttendance >= 80 ? 'text-emerald-400' : 'text-amber-400'}`}>{avgAttendance}%</p>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-2 text-center">
                  <p className="text-slate-500 text-xs">Certif. Méd.</p>
                  <p className={`text-xs font-medium ${medicalDays > 30 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {medicalDays > 0 ? `${medicalDays}j` : 'Expiré'}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Member Detail Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedMember(null)}>
          <div className="bg-slate-800 rounded-2xl border border-slate-700 max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-slate-700">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-full ${beltColors[selectedMember.beltColor]} flex items-center justify-center text-2xl font-bold border-3 ${selectedMember.beltColor === 'white' ? 'text-gray-800' : 'text-white'}`}>
                    {selectedMember.firstName[0]}{selectedMember.lastName[0]}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{selectedMember.firstName} {selectedMember.lastName}</h2>
                    <p className="text-slate-400">{selectedMember.licenseNumber} • {getAgeCategory(selectedMember.dateOfBirth)}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className={`w-8 h-3 rounded-full ${beltColors[selectedMember.beltColor]} border ${selectedMember.beltColor === 'white' ? 'border-gray-400' : 'border-transparent'}`}></div>
                      <span className="text-slate-300 text-sm">
                        {beltLabels[selectedMember.beltColor]} {selectedMember.dan ? `${selectedMember.dan}ème Dan` : ''}
                      </span>
                    </div>
                  </div>
                </div>
                <button onClick={() => setSelectedMember(null)} className="text-slate-400 hover:text-white text-2xl">&times;</button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <h4 className="text-emerald-400 font-semibold text-sm mb-3 flex items-center gap-2">
                    <Shield className="w-4 h-4" /> Identité & Contact
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-slate-400">Date de naissance</span><span className="text-white">{new Date(selectedMember.dateOfBirth).toLocaleDateString('fr-FR')}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Genre</span><span className="text-white">{selectedMember.gender === 'M' ? 'Masculin' : 'Féminin'}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Téléphone</span><span className="text-white">{selectedMember.phone}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Adresse</span><span className="text-white">{selectedMember.address}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Contact Urgence</span><span className="text-white">{selectedMember.emergencyContact}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Tél. Urgence</span><span className="text-white">{selectedMember.emergencyPhone}</span></div>
                  </div>
                </div>
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <h4 className="text-emerald-400 font-semibold text-sm mb-3 flex items-center gap-2">
                    <Heart className="w-4 h-4" /> Santé & Administratif
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-slate-400">Certificat médical</span>
                      <span className={getDaysUntilExpiry(selectedMember.medicalCertificateValidUntil) > 30 ? 'text-emerald-400' : 'text-red-400'}>
                        {getDaysUntilExpiry(selectedMember.medicalCertificateValidUntil) > 0 ? `Valide (${getDaysUntilExpiry(selectedMember.medicalCertificateValidUntil)}j)` : 'EXPIRÉ'}
                      </span>
                    </div>
                    <div className="flex justify-between"><span className="text-slate-400">Assurance fédérale</span>
                      <span className={getDaysUntilExpiry(selectedMember.insuranceValidUntil) > 30 ? 'text-emerald-400' : 'text-red-400'}>
                        {getDaysUntilExpiry(selectedMember.insuranceValidUntil) > 0 ? `Valide (${getDaysUntilExpiry(selectedMember.insuranceValidUntil)}j)` : 'EXPIRÉE'}
                      </span>
                    </div>
                    <div className="flex justify-between"><span className="text-slate-400">Inscription</span><span className="text-white">{new Date(selectedMember.registrationDate).toLocaleDateString('fr-FR')}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Statut</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${selectedMember.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                        {selectedMember.status === 'active' ? 'Actif' : 'Inactif'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <BiometricsSection member={selectedMember} />

              <div className="bg-slate-700/30 rounded-lg p-4">
                <h4 className="text-emerald-400 font-semibold text-sm mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Assiduité 12 Mois
                </h4>
                <div className="flex items-end gap-1 h-32">
                  {selectedMember.attendanceHistory.map((a, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className={`w-full rounded-t ${a.rate >= 80 ? 'bg-emerald-500' : a.rate >= 75 ? 'bg-amber-500' : 'bg-red-500'}`}
                        style={{ height: `${a.rate}%` }}
                        title={`${a.month}: ${a.rate}%`}
                      ></div>
                      <span className="text-slate-500 text-[9px]">{a.month}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> ≥80% (OK)</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span> 75-79% (Limite)</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> &lt;75% (Insuffisant)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function BiometricsSection({ member }: { member: Member }) {
  const bmi = getBMI(member.weight, member.height);
  return (
    <div className="bg-slate-700/30 rounded-lg p-4">
      <h4 className="text-emerald-400 font-semibold text-sm mb-3 flex items-center gap-2">
        <Activity className="w-4 h-4" /> Biométrie & Catégorie de Poids
      </h4>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="text-center bg-slate-800/50 rounded-lg p-3">
          <p className="text-slate-400 text-xs">Poids</p>
          <p className="text-white text-lg font-bold">{member.weight} kg</p>
        </div>
        <div className="text-center bg-slate-800/50 rounded-lg p-3">
          <p className="text-slate-400 text-xs">Taille</p>
          <p className="text-white text-lg font-bold">{member.height} cm</p>
        </div>
        <div className="text-center bg-slate-800/50 rounded-lg p-3">
          <p className="text-slate-400 text-xs">IMC</p>
          <p className={`text-lg font-bold ${bmi >= 18.5 && bmi < 25 ? 'text-emerald-400' : 'text-amber-400'}`}>{bmi}</p>
        </div>
        <div className="text-center bg-slate-800/50 rounded-lg p-3">
          <p className="text-slate-400 text-xs">Cat. Poids WT</p>
          <p className="text-white text-sm font-medium">{getWeightCategory(bmi, member.gender)}</p>
        </div>
      </div>
    </div>
  );
}
