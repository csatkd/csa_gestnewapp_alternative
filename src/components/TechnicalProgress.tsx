import { useState } from 'react';
import { Target, TrendingUp, Award, CheckCircle, Circle } from 'lucide-react';
import { mockMembers } from '../data/mockData';

interface TechnicalSkill {
  id: string;
  name: string;
  category: 'poomsae' | 'kyorugi' | 'kyokpa' | 'hosinsul' | 'theory';
  description: string;
  maxLevel: number;
}

interface MemberProgress {
  memberId: string;
  skills: {
    skillId: string;
    level: number;
    lastUpdated: string;
  }[];
}

const technicalSkills: TechnicalSkill[] = [
  // Poomsae (Formes)
  { id: 'P001', name: 'Taegeuk Il Jang', category: 'poomsae', description: 'Première forme - Ciel', maxLevel: 10 },
  { id: 'P002', name: 'Taegeuk Yi Jang', category: 'poomsae', description: 'Deuxième forme - Joie', maxLevel: 10 },
  { id: 'P003', name: 'Taegeuk Sam Jang', category: 'poomsae', description: 'Troisième forme - Feu', maxLevel: 10 },
  { id: 'P004', name: 'Taegeuk Sa Jang', category: 'poomsae', description: 'Quatrième forme - Tonnerre', maxLevel: 10 },
  
  // Kyorugi (Combat)
  { id: 'K001', name: 'Position de combat', category: 'kyorugi', description: 'Garde et déplacement de base', maxLevel: 10 },
  { id: 'K002', name: 'Kicks de base', category: 'kyorugi', description: 'Ap Chagi, Dollyo Chagi', maxLevel: 10 },
  { id: 'K003', name: 'Kicks avancés', category: 'kyorugi', description: 'Twio Chagi, Bandae Dollyo', maxLevel: 10 },
  { id: 'K004', name: 'Stratégie de combat', category: 'kyorugi', description: 'Tactique et timing', maxLevel: 10 },
  
  // Kyokpa (Casse)
  { id: 'C001', name: 'Casse de planche', category: 'kyokpa', description: 'Technique de base', maxLevel: 10 },
  { id: 'C002', name: 'Casse multiple', category: 'kyokpa', description: 'Plusieurs planches', maxLevel: 10 },
  { id: 'C003', name: 'Casse en sautant', category: 'kyokpa', description: 'Techniques aériennes', maxLevel: 10 },
  
  // Hosinsul (Self-Défense)
  { id: 'H001', name: 'Dégagement de poignet', category: 'hosinsul', description: 'Techniques de base', maxLevel: 10 },
  { id: 'H002', name: 'Défense contre saisie', category: 'hosinsul', description: 'Corps à corps', maxLevel: 10 },
  { id: 'H003', name: 'Défense contre arme', category: 'hosinsul', description: 'Situations avancées', maxLevel: 10 },
  
  // Théorie
  { id: 'T001', name: 'Terminologie coréenne', category: 'theory', description: 'Vocabulaire de base', maxLevel: 10 },
  { id: 'T002', name: 'Histoire du Taekwondo', category: 'theory', description: 'Origines et développement', maxLevel: 10 },
  { id: 'T003', name: 'Philosophie martiale', category: 'theory', description: 'Principes et valeurs', maxLevel: 10 },
];

const mockProgress: MemberProgress[] = [
  {
    memberId: 'M001',
    skills: [
      { skillId: 'P001', level: 9, lastUpdated: '2024-12-10' },
      { skillId: 'P002', level: 8, lastUpdated: '2024-12-10' },
      { skillId: 'P003', level: 7, lastUpdated: '2024-12-08' },
      { skillId: 'K001', level: 9, lastUpdated: '2024-12-12' },
      { skillId: 'K002', level: 8, lastUpdated: '2024-12-12' },
      { skillId: 'C001', level: 7, lastUpdated: '2024-12-05' },
      { skillId: 'H001', level: 6, lastUpdated: '2024-12-01' },
      { skillId: 'T001', level: 8, lastUpdated: '2024-12-10' },
    ]
  },
  {
    memberId: 'M002',
    skills: [
      { skillId: 'P001', level: 10, lastUpdated: '2024-12-12' },
      { skillId: 'P002', level: 10, lastUpdated: '2024-12-12' },
      { skillId: 'P003', level: 9, lastUpdated: '2024-12-10' },
      { skillId: 'P004', level: 8, lastUpdated: '2024-12-08' },
      { skillId: 'K001', level: 10, lastUpdated: '2024-12-12' },
      { skillId: 'K002', level: 10, lastUpdated: '2024-12-12' },
      { skillId: 'K003', level: 9, lastUpdated: '2024-12-10' },
      { skillId: 'K004', level: 8, lastUpdated: '2024-12-08' },
      { skillId: 'C001', level: 10, lastUpdated: '2024-12-12' },
      { skillId: 'C002', level: 9, lastUpdated: '2024-12-10' },
      { skillId: 'C003', level: 7, lastUpdated: '2024-12-05' },
      { skillId: 'H001', level: 9, lastUpdated: '2024-12-10' },
      { skillId: 'H002', level: 8, lastUpdated: '2024-12-08' },
      { skillId: 'T001', level: 10, lastUpdated: '2024-12-12' },
      { skillId: 'T002', level: 9, lastUpdated: '2024-12-10' },
    ]
  },
  {
    memberId: 'M004',
    skills: technicalSkills.map(skill => ({
      skillId: skill.id,
      level: 10,
      lastUpdated: '2024-12-12'
    }))
  }
];

export default function TechnicalProgress() {
  const [selectedMember, setSelectedMember] = useState<string>('M001');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const member = mockMembers.find(m => m.id === selectedMember);
  const progress = mockProgress.find(p => p.memberId === selectedMember);

  const filteredSkills = selectedCategory === 'all'
    ? technicalSkills
    : technicalSkills.filter(s => s.category === selectedCategory);

  const getSkillLevel = (skillId: string) => {
    if (!progress) return 0;
    const skill = progress.skills.find(s => s.skillId === skillId);
    return skill ? skill.level : 0;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'poomsae': return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
      case 'kyorugi': return 'text-red-400 bg-red-500/10 border-red-500/30';
      case 'kyokpa': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
      case 'hosinsul': return 'text-purple-400 bg-purple-500/10 border-purple-500/30';
      case 'theory': return 'text-green-400 bg-green-500/10 border-green-500/30';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/30';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'poomsae': return 'Poomsae (Formes)';
      case 'kyorugi': return 'Kyorugi (Combat)';
      case 'kyokpa': return 'Kyokpa (Casse)';
      case 'hosinsul': return 'Hosinsul (Self-Défense)';
      case 'theory': return 'Théorie';
      default: return category;
    }
  };

  const calculateOverallProgress = () => {
    if (!progress) return 0;
    const totalLevels = progress.skills.reduce((sum, s) => sum + s.level, 0);
    const maxPossible = progress.skills.length * 10;
    return Math.round((totalLevels / maxPossible) * 100);
  };

  const getCategoryProgress = (category: string) => {
    if (!progress) return 0;
    const categorySkills = technicalSkills.filter(s => s.category === category);
    const categoryProgress = progress.skills.filter(s => 
      categorySkills.some(cs => cs.id === s.skillId)
    );
    const totalLevels = categoryProgress.reduce((sum, s) => sum + s.level, 0);
    const maxPossible = categorySkills.length * 10;
    return Math.round((totalLevels / maxPossible) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">Progression Technique</h2>
        <p className="text-slate-400 text-sm">Suivi détaillé des compétences par membre</p>
      </div>

      {/* Member Selector */}
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <label className="text-slate-400 text-sm block mb-2">Sélectionner un membre</label>
        <select
          value={selectedMember}
          onChange={(e) => setSelectedMember(e.target.value)}
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
        >
          {mockMembers.map(m => (
            <option key={m.id} value={m.id}>{m.firstName} {m.lastName}</option>
          ))}
        </select>
      </div>

      {/* Overall Progress */}
      {member && progress && (
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-white">{member.firstName} {member.lastName}</h3>
              <p className="text-slate-400 text-sm">Progression globale</p>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold text-emerald-400">{calculateOverallProgress()}%</p>
              <p className="text-slate-400 text-sm">Maîtrise totale</p>
            </div>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-4 mb-6">
            <div
              className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-4 rounded-full transition-all"
              style={{ width: `${calculateOverallProgress()}%` }}
            ></div>
          </div>

          {/* Category Progress */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {['poomsae', 'kyorugi', 'kyokpa', 'hosinsul', 'theory'].map(category => (
              <div key={category} className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
                <p className="text-slate-400 text-xs mb-1">{getCategoryLabel(category).split(' ')[0]}</p>
                <p className="text-2xl font-bold text-white">{getCategoryProgress(category)}%</p>
                <div className="w-full bg-slate-700 rounded-full h-1.5 mt-2">
                  <div
                    className="bg-emerald-500 h-1.5 rounded-full"
                    style={{ width: `${getCategoryProgress(category)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
            selectedCategory === 'all'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'bg-slate-800 text-slate-400 border border-slate-700'
          }`}
        >
          Toutes
        </button>
        {['poomsae', 'kyorugi', 'kyokpa', 'hosinsul', 'theory'].map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              selectedCategory === category
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-slate-800 text-slate-400 border border-slate-700'
            }`}
          >
            {getCategoryLabel(category)}
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSkills.map(skill => {
          const level = getSkillLevel(skill.id);
          const percentage = (level / skill.maxLevel) * 100;
          
          return (
            <div
              key={skill.id}
              className={`rounded-xl p-5 border-2 ${getCategoryColor(skill.category)}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="text-white font-semibold mb-1">{skill.name}</h4>
                  <p className="text-slate-400 text-xs">{skill.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-white">{level}/{skill.maxLevel}</p>
                </div>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-3 mb-2">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-3 rounded-full transition-all"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">{getCategoryLabel(skill.category)}</span>
                <span className="text-slate-400">{Math.round(percentage)}%</span>
              </div>
              
              {/* Level indicators */}
              <div className="flex gap-1 mt-3">
                {Array.from({ length: skill.maxLevel }).map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 h-1.5 rounded-full ${
                      i < level ? 'bg-emerald-500' : 'bg-slate-700'
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* No Progress Message */}
      {!progress && (
        <div className="bg-slate-800/50 rounded-xl p-8 text-center border border-slate-700">
          <Target className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <p className="text-slate-400">Aucune progression enregistrée pour ce membre</p>
        </div>
      )}
    </div>
  );
}
