import { useState } from 'react';
import { Users, Gift, TrendingUp, Award, Copy, CheckCircle, Share2, Star, MessageSquare, Send } from 'lucide-react';

interface Referral {
  id: string;
  referrerId: string;
  referrerName: string;
  referredName: string;
  referredPhone: string;
  status: 'pending' | 'accepted' | 'enrolled' | 'rewarded';
  date: string;
  reward: number;
  code: string;
}

interface ReferralStats {
  totalReferrals: number;
  successfulReferrals: number;
  totalRewards: number;
  conversionRate: number;
}

const mockReferrals: Referral[] = [
  {
    id: 'R001',
    referrerId: 'M001',
    referrerName: 'Kouassi Aya Marie',
    referredName: 'Kouamé Jean',
    referredPhone: '+225 07 11 22 33 44',
    status: 'rewarded',
    date: '2024-11-15',
    reward: 10000,
    code: 'CSA-AYA-2024'
  },
  {
    id: 'R002',
    referrerId: 'M002',
    referrerName: 'Traoré Moussa',
    referredName: 'Traoré Fatou',
    referredPhone: '+225 07 22 33 44 55',
    status: 'enrolled',
    date: '2024-12-01',
    reward: 10000,
    code: 'CSA-MOU-2024'
  },
  {
    id: 'R003',
    referrerId: 'M004',
    referrerName: 'Koné Ibrahim',
    referredName: 'Koné Awa',
    referredPhone: '+225 07 33 44 55 66',
    status: 'accepted',
    date: '2024-12-10',
    reward: 0,
    code: 'CSA-IBR-2024'
  },
  {
    id: 'R004',
    referrerId: 'M001',
    referrerName: 'Kouassi Aya Marie',
    referredName: 'Bamba Ibrahim',
    referredPhone: '+225 07 44 55 66 77',
    status: 'pending',
    date: '2024-12-14',
    reward: 0,
    code: 'CSA-AYA-2024'
  }
];

const mockStats: ReferralStats = {
  totalReferrals: 12,
  successfulReferrals: 8,
  totalRewards: 80000,
  conversionRate: 67
};

export default function ReferralProgram() {
  const [referrals] = useState<Referral[]>(mockReferrals);
  const [stats] = useState<ReferralStats>(mockStats);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'my-referrals' | 'invite'>('overview');

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'accepted': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'enrolled': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'rewarded': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'accepted': return 'Accepté';
      case 'enrolled': return 'Inscrit';
      case 'rewarded': return 'Récompensé';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return '⏳';
      case 'accepted': return '✓';
      case 'enrolled': return '🎓';
      case 'rewarded': return '🎁';
      default: return '📝';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Programme de Parrainage</h2>
          <p className="text-slate-400 text-sm">Parrainez vos proches et gagnez des récompenses</p>
        </div>
        <button
          onClick={() => setActiveTab('invite')}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Share2 className="w-4 h-4" />
          Inviter un Ami
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-xl p-5 border border-blue-500/20">
          <div className="flex items-center justify-between mb-3">
            <Users className="w-8 h-8 text-blue-400" />
            <span className="text-blue-400 text-xs font-medium bg-blue-500/20 px-2 py-1 rounded">Total</span>
          </div>
          <p className="text-slate-400 text-sm">Parrainages</p>
          <p className="text-3xl font-bold text-white mt-1">{stats.totalReferrals}</p>
        </div>

        <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 rounded-xl p-5 border border-emerald-500/20">
          <div className="flex items-center justify-between mb-3">
            <CheckCircle className="w-8 h-8 text-emerald-400" />
            <span className="text-emerald-400 text-xs font-medium bg-emerald-500/20 px-2 py-1 rounded">Réussis</span>
          </div>
          <p className="text-slate-400 text-sm">Inscriptions</p>
          <p className="text-3xl font-bold text-white mt-1">{stats.successfulReferrals}</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-xl p-5 border border-purple-500/20">
          <div className="flex items-center justify-between mb-3">
            <Gift className="w-8 h-8 text-purple-400" />
            <span className="text-purple-400 text-xs font-medium bg-purple-500/20 px-2 py-1 rounded">Total</span>
          </div>
          <p className="text-slate-400 text-sm">Récompenses</p>
          <p className="text-3xl font-bold text-white mt-1">{(stats.totalRewards / 1000).toFixed(0)}K F</p>
        </div>

        <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 rounded-xl p-5 border border-yellow-500/20">
          <div className="flex items-center justify-between mb-3">
            <TrendingUp className="w-8 h-8 text-yellow-400" />
            <span className="text-yellow-400 text-xs font-medium bg-yellow-500/20 px-2 py-1 rounded">Taux</span>
          </div>
          <p className="text-slate-400 text-sm">Conversion</p>
          <p className="text-3xl font-bold text-white mt-1">{stats.conversionRate}%</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'overview'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'bg-slate-800 text-slate-400 border border-slate-700'
          }`}
        >
          <Award className="w-4 h-4 inline mr-2" />
          Vue d'Ensemble
        </button>
        <button
          onClick={() => setActiveTab('my-referrals')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'my-referrals'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'bg-slate-800 text-slate-400 border border-slate-700'
          }`}
        >
          <Users className="w-4 h-4 inline mr-2" />
          Mes Parrainages
        </button>
        <button
          onClick={() => setActiveTab('invite')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'invite'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'bg-slate-800 text-slate-400 border border-slate-700'
          }`}
        >
          <Share2 className="w-4 h-4 inline mr-2" />
          Inviter
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* How it works */}
          <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-xl p-6 border border-emerald-500/20">
            <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              Comment ça marche ?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-3">
                  <span className="text-3xl">1️⃣</span>
                </div>
                <h4 className="text-white font-medium mb-1">Partagez</h4>
                <p className="text-slate-400 text-sm">Partagez votre code de parrainage avec vos amis et famille</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-3">
                  <span className="text-3xl">2️⃣</span>
                </div>
                <h4 className="text-white font-medium mb-1">Inscription</h4>
                <p className="text-slate-400 text-sm">Votre filleul s'inscrit à la CSA avec votre code</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-3">
                  <span className="text-3xl">3️⃣</span>
                </div>
                <h4 className="text-white font-medium mb-1">Validation</h4>
                <p className="text-slate-400 text-sm">L'inscription est validée et le filleul commence les cours</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-yellow-500/20 flex items-center justify-center mx-auto mb-3">
                  <span className="text-3xl">4️⃣</span>
                </div>
                <h4 className="text-white font-medium mb-1">Récompense</h4>
                <p className="text-slate-400 text-sm">Vous recevez 10 000 FCFA de réduction sur votre prochaine cotisation</p>
              </div>
            </div>
          </div>

          {/* Your Code */}
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h3 className="text-white font-semibold mb-4">Votre Code de Parrainage</h3>
            <div className="flex items-center gap-4">
              <div className="flex-1 bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                <p className="text-slate-400 text-xs mb-1">Code unique</p>
                <p className="text-2xl font-bold text-emerald-400 font-mono">CSA-VOUS-2024</p>
              </div>
              <button
                onClick={() => copyCode('CSA-VOUS-2024')}
                className="flex items-center gap-2 px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
              >
                {copiedCode === 'CSA-VOUS-2024' ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Copié !
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    Copier
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Rewards */}
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h3 className="text-white font-semibold mb-4">Vos Récompenses</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Gift className="w-5 h-5 text-purple-400" />
                  <p className="text-purple-400 text-sm font-medium">Récompenses Gagnées</p>
                </div>
                <p className="text-3xl font-bold text-white">80 000 F</p>
                <p className="text-slate-400 text-xs mt-1">8 parrainages réussis</p>
              </div>
              <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-blue-400" />
                  <p className="text-blue-400 text-sm font-medium">En Attente</p>
                </div>
                <p className="text-3xl font-bold text-white">10 000 F</p>
                <p className="text-slate-400 text-xs mt-1">1 parrainage en cours</p>
              </div>
              <div className="bg-emerald-500/10 rounded-lg p-4 border border-emerald-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                  <p className="text-emerald-400 text-sm font-medium">Prochaine Récompense</p>
                </div>
                <p className="text-3xl font-bold text-white">10 000 F</p>
                <p className="text-slate-400 text-xs mt-1">Après validation</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* My Referrals Tab */}
      {activeTab === 'my-referrals' && (
        <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left px-4 py-3 text-slate-400 text-xs font-medium uppercase">Filleul</th>
                  <th className="text-left px-4 py-3 text-slate-400 text-xs font-medium uppercase">Téléphone</th>
                  <th className="text-left px-4 py-3 text-slate-400 text-xs font-medium uppercase">Date</th>
                  <th className="text-center px-4 py-3 text-slate-400 text-xs font-medium uppercase">Statut</th>
                  <th className="text-center px-4 py-3 text-slate-400 text-xs font-medium uppercase">Récompense</th>
                </tr>
              </thead>
              <tbody>
                {referrals.map(referral => (
                  <tr key={referral.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{getStatusIcon(referral.status)}</span>
                        <span className="text-white font-medium">{referral.referredName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-400 text-sm">{referral.referredPhone}</td>
                    <td className="px-4 py-3 text-slate-400 text-sm">{new Date(referral.date).toLocaleDateString('fr-FR')}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(referral.status)}`}>
                        {getStatusLabel(referral.status)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {referral.reward > 0 ? (
                        <span className="text-emerald-400 font-bold">{referral.reward.toLocaleString()} F</span>
                      ) : (
                        <span className="text-slate-500">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Invite Tab */}
      {activeTab === 'invite' && (
        <div className="space-y-6">
          {/* Share Options */}
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h3 className="text-white font-semibold mb-4">Partager votre Code</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                <MessageSquare className="w-5 h-5" />
                WhatsApp
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                <Send className="w-5 h-5" />
                SMS
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                <Share2 className="w-5 h-5" />
                Email
              </button>
            </div>
          </div>

          {/* Referral Form */}
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h3 className="text-white font-semibold mb-4">Enregistrer un Parrainage</h3>
            <div className="space-y-4">
              <div>
                <label className="text-slate-300 text-sm block mb-2">Nom du filleul</label>
                <input
                  type="text"
                  placeholder="Nom complet"
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="text-slate-300 text-sm block mb-2">Téléphone</label>
                <input
                  type="tel"
                  placeholder="+225 XX XX XX XX XX"
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="text-slate-300 text-sm block mb-2">Email (optionnel)</label>
                <input
                  type="email"
                  placeholder="email@exemple.com"
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <button className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-medium transition-colors">
                <Users className="w-5 h-5" />
                Enregistrer le Parrainage
              </button>
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Gift className="w-5 h-5 text-purple-400" />
              Avantages du Programme
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5" />
                <div>
                  <p className="text-white font-medium">10 000 FCFA par parrainage</p>
                  <p className="text-slate-400 text-sm">Réduction sur votre prochaine cotisation</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Pas de limite</p>
                  <p className="text-slate-400 text-sm">Parrainez autant de personnes que vous voulez</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Récompenses immédiates</p>
                  <p className="text-slate-400 text-sm">Dès l'inscription validée</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Suivi en temps réel</p>
                  <p className="text-slate-400 text-sm">Consultez l'état de vos parrainages</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
