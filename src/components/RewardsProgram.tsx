import { useState } from 'react';
import { Award, Trophy, Star, Medal, Gift, TrendingUp } from 'lucide-react';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'assiduite' | 'performance' | 'grade' | 'competition' | 'special';
  points: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface MemberAchievements {
  memberId: string;
  memberName: string;
  totalPoints: number;
  level: number;
  achievements: string[];
  rank: string;
}

const mockAchievements: Achievement[] = [
  // Assiduité
  { id: 'A001', name: 'Présent Assidu', description: '10 séances consécutives sans absence', icon: '🔥', category: 'assiduite', points: 100, rarity: 'common' },
  { id: 'A002', name: 'Warrior Spirit', description: '30 séances consécutives', icon: '⚡', category: 'assiduite', points: 300, rarity: 'rare' },
  { id: 'A003', name: 'Légende du Dojang', description: '100 séances consécutives', icon: '👑', category: 'assiduite', points: 1000, rarity: 'legendary' },
  
  // Performance
  { id: 'P001', name: 'Technicien Émérite', description: 'Score > 90/100 à un examen', icon: '🎯', category: 'performance', points: 200, rarity: 'rare' },
  { id: 'P002', name: 'Maître Technique', description: 'Score parfait 100/100', icon: '💎', category: 'performance', points: 500, rarity: 'epic' },
  
  // Grade
  { id: 'G001', name: 'Premier Pas', description: 'Obtenir la ceinture jaune', icon: '🟡', category: 'grade', points: 50, rarity: 'common' },
  { id: 'G002', name: 'Ceinture Noire', description: 'Atteindre le 1er Dan', icon: '🥋', category: 'grade', points: 1000, rarity: 'legendary' },
  
  // Compétition
  { id: 'C001', name: 'Première Médaille', description: 'Remporter une médaille en compétition', icon: '🥉', category: 'competition', points: 150, rarity: 'common' },
  { id: 'C002', name: 'Champion Régional', description: 'Médaille d\'or en compétition régionale', icon: '🏆', category: 'competition', points: 500, rarity: 'epic' },
  { id: 'C003', name: 'Champion National', description: 'Médaille d\'or au championnat national', icon: '👑', category: 'competition', points: 1500, rarity: 'legendary' },
  
  // Spécial
  { id: 'S001', name: 'Mentor', description: 'Aider 5 nouveaux élèves', icon: '🤝', category: 'special', points: 200, rarity: 'rare' },
  { id: 'S002', name: 'Ambassadeur CSA', description: 'Représenter l\'académie lors d\'un événement', icon: '🌟', category: 'special', points: 300, rarity: 'epic' },
];

const mockMemberAchievements: MemberAchievements[] = [
  {
    memberId: 'M001',
    memberName: 'Kouassi Aya Marie',
    totalPoints: 1250,
    level: 12,
    achievements: ['A001', 'G001', 'C001', 'S001'],
    rank: 'Diamant'
  },
  {
    memberId: 'M002',
    memberName: 'Traoré Moussa',
    totalPoints: 2100,
    level: 21,
    achievements: ['A001', 'A002', 'P001', 'G001', 'C001', 'C002', 'S001', 'S002'],
    rank: 'Légende'
  },
  {
    memberId: 'M003',
    memberName: 'Bamba Fatoumata',
    totalPoints: 450,
    level: 4,
    achievements: ['A001', 'G001'],
    rank: 'Bronze'
  },
  {
    memberId: 'M004',
    memberName: 'Koné Ibrahim',
    totalPoints: 3500,
    level: 35,
    achievements: ['A001', 'A002', 'A003', 'P001', 'P002', 'G001', 'G002', 'C001', 'C002', 'C003', 'S001', 'S002'],
    rank: 'Mythique'
  },
  {
    memberId: 'M005',
    memberName: 'Diallo Aminata',
    totalPoints: 800,
    level: 8,
    achievements: ['A001', 'G001', 'C001'],
    rank: 'Argent'
  }
];

export default function RewardsProgram() {
  const [selectedMember, setSelectedMember] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredMembers = selectedMember === 'all' 
    ? mockMemberAchievements 
    : mockMemberAchievements.filter(m => m.memberId === selectedMember);

  const filteredAchievements = selectedCategory === 'all'
    ? mockAchievements
    : mockAchievements.filter(a => a.category === selectedCategory);

  const getRankColor = (rank: string) => {
    switch (rank) {
      case 'Mythique': return 'from-purple-500 to-pink-500';
      case 'Légende': return 'from-yellow-500 to-orange-500';
      case 'Diamant': return 'from-blue-400 to-cyan-400';
      case 'Or': return 'from-yellow-400 to-yellow-600';
      case 'Argent': return 'from-gray-300 to-gray-500';
      case 'Bronze': return 'from-orange-400 to-orange-600';
      default: return 'from-slate-400 to-slate-600';
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'border-yellow-500 bg-yellow-500/10';
      case 'epic': return 'border-purple-500 bg-purple-500/10';
      case 'rare': return 'border-blue-500 bg-blue-500/10';
      case 'common': return 'border-slate-500 bg-slate-500/10';
      default: return 'border-slate-500 bg-slate-500/10';
    }
  };

  const getRarityLabel = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'Légendaire';
      case 'epic': return 'Épique';
      case 'rare': return 'Rare';
      case 'common': return 'Commun';
      default: return rarity;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'assiduite': return 'Assiduité';
      case 'performance': return 'Performance';
      case 'grade': return 'Grade';
      case 'competition': return 'Compétition';
      case 'special': return 'Spécial';
      default: return category;
    }
  };

  const leaderboard = [...mockMemberAchievements].sort((a, b) => b.totalPoints - a.totalPoints);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">Programme de Récompenses</h2>
        <p className="text-slate-400 text-sm">Gamification et système de achievements</p>
      </div>

      {/* Leaderboard */}
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl p-6 border border-slate-700">
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="w-6 h-6 text-yellow-400" />
          <h3 className="text-xl font-bold text-white">Classement Général</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {leaderboard.slice(0, 3).map((member, index) => (
            <div
              key={member.memberId}
              className={`relative bg-slate-800/50 rounded-xl p-5 border-2 ${
                index === 0 ? 'border-yellow-500/50' :
                index === 1 ? 'border-gray-400/50' :
                'border-orange-500/50'
              }`}
            >
              <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-slate-900 border-2 border-slate-700 flex items-center justify-center">
                <span className="text-2xl">
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                </span>
              </div>
              <div className="mb-3">
                <div className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${getRankColor(member.rank)} text-white text-xs font-bold mb-2`}>
                  {member.rank}
                </div>
                <h4 className="text-white font-semibold">{member.memberName}</h4>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Points</span>
                  <span className="text-white font-bold">{member.totalPoints.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Niveau</span>
                  <span className="text-white font-bold">{member.level}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Achievements</span>
                  <span className="text-white font-bold">{member.achievements.length}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div>
          <label className="text-slate-400 text-sm block mb-2">Membre</label>
          <select
            value={selectedMember}
            onChange={(e) => setSelectedMember(e.target.value)}
            className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="all">Tous les membres</option>
            {mockMemberAchievements.map(m => (
              <option key={m.memberId} value={m.memberId}>{m.memberName}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-slate-400 text-sm block mb-2">Catégorie</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="all">Toutes</option>
            <option value="assiduite">Assiduité</option>
            <option value="performance">Performance</option>
            <option value="grade">Grade</option>
            <option value="competition">Compétition</option>
            <option value="special">Spécial</option>
          </select>
        </div>
      </div>

      {/* Achievements Grid */}
      <div>
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-emerald-400" />
          Achievements Disponibles
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAchievements.map(achievement => (
            <div
              key={achievement.id}
              className={`rounded-xl p-5 border-2 transition-all hover:scale-105 ${getRarityColor(achievement.rarity)}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="text-4xl">{achievement.icon}</div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">{getRarityLabel(achievement.rarity)}</div>
                  <div className="text-yellow-400 font-bold">+{achievement.points} pts</div>
                </div>
              </div>
              <h4 className="text-white font-semibold mb-1">{achievement.name}</h4>
              <p className="text-slate-400 text-sm mb-3">{achievement.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 bg-slate-800/50 px-2 py-1 rounded">
                  {getCategoryLabel(achievement.category)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Member Progress */}
      {selectedMember !== 'all' && (
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            Progression du Membre
          </h3>
          {filteredMembers.map(member => (
            <div key={member.memberId}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-white font-semibold">{member.memberName}</h4>
                  <div className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${getRankColor(member.rank)} text-white text-xs font-bold mt-1`}>
                    {member.rank}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-white">{member.totalPoints}</p>
                  <p className="text-slate-400 text-sm">points</p>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-400 text-sm">Niveau {member.level}</span>
                  <span className="text-slate-400 text-sm">Niveau {member.level + 1}</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-3 rounded-full transition-all"
                    style={{ width: `${(member.totalPoints % 100) / 100 * 100}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <p className="text-slate-400 text-sm mb-2">Achievements débloqués ({member.achievements.length})</p>
                <div className="flex flex-wrap gap-2">
                  {member.achievements.map(achId => {
                    const achievement = mockAchievements.find(a => a.id === achId);
                    if (!achievement) return null;
                    return (
                      <div
                        key={achId}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${getRarityColor(achievement.rarity)}`}
                      >
                        <span className="text-2xl">{achievement.icon}</span>
                        <div>
                          <p className="text-white text-sm font-medium">{achievement.name}</p>
                          <p className="text-slate-400 text-xs">+{achievement.points} pts</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
