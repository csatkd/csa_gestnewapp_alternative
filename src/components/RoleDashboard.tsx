import { Users, Calendar, DollarSign, TrendingUp, Award, Activity } from 'lucide-react';
import { mockMembers, mockPayments, mockAttendanceRecords } from '../data/mockData';

interface RoleDashboardProps {
  role: 'admin' | 'coach' | 'treasurer';
}

export default function RoleDashboard({ role }: RoleDashboardProps) {
  const getDashboardContent = () => {
    switch (role) {
      case 'admin':
        return <AdminDashboard />;
      case 'coach':
        return <CoachDashboard />;
      case 'treasurer':
        return <TreasurerDashboard />;
      default:
        return <AdminDashboard />;
    }
  };

  return <>{getDashboardContent()}</>;
}

function AdminDashboard() {
  const totalMembers = mockMembers.length;
  const activeMembers = mockMembers.filter(m => m.status === 'active').length;
  const totalRevenue = mockPayments.reduce((sum, p) => sum + p.paidAmount, 0);
  const attendanceRate = Math.round(
    mockAttendanceRecords.filter(r => r.status === 'present').length / mockAttendanceRecords.length * 100
  );

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Tableau de Bord Administrateur</h2>
        <p className="text-purple-100">Vue d'ensemble de l'académie</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
          <div className="flex items-center justify-between mb-3">
            <Users className="w-8 h-8 text-purple-400" />
            <span className="text-purple-400 text-xs font-medium bg-purple-500/20 px-2 py-1 rounded">Total</span>
          </div>
          <p className="text-slate-400 text-sm">Licenciés Actifs</p>
          <p className="text-3xl font-bold text-white mt-1">{activeMembers}/{totalMembers}</p>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
          <div className="flex items-center justify-between mb-3">
            <DollarSign className="w-8 h-8 text-emerald-400" />
            <span className="text-emerald-400 text-xs font-medium bg-emerald-500/20 px-2 py-1 rounded">Revenus</span>
          </div>
          <p className="text-slate-400 text-sm">Total Encaissé</p>
          <p className="text-3xl font-bold text-white mt-1">{(totalRevenue / 1000).toFixed(0)}K F</p>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
          <div className="flex items-center justify-between mb-3">
            <Activity className="w-8 h-8 text-blue-400" />
            <span className="text-blue-400 text-xs font-medium bg-blue-500/20 px-2 py-1 rounded">Assiduité</span>
          </div>
          <p className="text-slate-400 text-sm">Taux Global</p>
          <p className="text-3xl font-bold text-white mt-1">{attendanceRate}%</p>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
          <div className="flex items-center justify-between mb-3">
            <Award className="w-8 h-8 text-amber-400" />
            <span className="text-amber-400 text-xs font-medium bg-amber-500/20 px-2 py-1 rounded">Grades</span>
          </div>
          <p className="text-slate-400 text-sm">Passages ce mois</p>
          <p className="text-3xl font-bold text-white mt-1">8</p>
        </div>
      </div>

      <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
        <h3 className="text-white font-semibold mb-4">Actions Rapides</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button className="p-4 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 rounded-lg transition-colors">
            <Users className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <p className="text-white text-sm">Gérer Utilisateurs</p>
          </button>
          <button className="p-4 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 rounded-lg transition-colors">
            <Calendar className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <p className="text-white text-sm">Planifier Grades</p>
          </button>
          <button className="p-4 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-lg transition-colors">
            <DollarSign className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
            <p className="text-white text-sm">Rapports Financiers</p>
          </button>
          <button className="p-4 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-lg transition-colors">
            <TrendingUp className="w-6 h-6 text-amber-400 mx-auto mb-2" />
            <p className="text-white text-sm">Statistiques</p>
          </button>
        </div>
      </div>
    </div>
  );
}

function CoachDashboard() {
  const todayAttendance = mockAttendanceRecords.filter(r => r.date === '2024-12-15');
  const presentCount = todayAttendance.filter(r => r.status === 'present').length;
  const lateCount = todayAttendance.filter(r => r.status === 'late').length;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Tableau de Bord Coach</h2>
        <p className="text-blue-100">Gestion des entraînements et des élèves</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
          <div className="flex items-center justify-between mb-3">
            <Users className="w-8 h-8 text-blue-400" />
            <span className="text-blue-400 text-xs font-medium bg-blue-500/20 px-2 py-1 rounded">Aujourd'hui</span>
          </div>
          <p className="text-slate-400 text-sm">Présents</p>
          <p className="text-3xl font-bold text-white mt-1">{presentCount}</p>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
          <div className="flex items-center justify-between mb-3">
            <Activity className="w-8 h-8 text-amber-400" />
            <span className="text-amber-400 text-xs font-medium bg-amber-500/20 px-2 py-1 rounded">Retards</span>
          </div>
          <p className="text-slate-400 text-sm">En retard</p>
          <p className="text-3xl font-bold text-white mt-1">{lateCount}</p>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
          <div className="flex items-center justify-between mb-3">
            <Award className="w-8 h-8 text-emerald-400" />
            <span className="text-emerald-400 text-xs font-medium bg-emerald-500/20 px-2 py-1 rounded">Prochain</span>
          </div>
          <p className="text-slate-400 text-sm">Passage de grade</p>
          <p className="text-xl font-bold text-white mt-1">20 Jan</p>
        </div>
      </div>

      <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
        <h3 className="text-white font-semibold mb-4">Mes Sessions Aujourd'hui</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
            <div>
              <p className="text-white font-medium">Cours Enfants (6-12 ans)</p>
              <p className="text-slate-400 text-sm">16:00 - 17:30 • 15 élèves</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors">
              Démarrer
            </button>
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
            <div>
              <p className="text-white font-medium">Cours Adolescents (13-17 ans)</p>
              <p className="text-slate-400 text-sm">18:00 - 19:30 • 12 élèves</p>
            </div>
            <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm transition-colors">
              18:00
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TreasurerDashboard() {
  const totalRevenue = mockPayments.reduce((sum, p) => sum + p.paidAmount, 0);
  const pendingPayments = mockPayments.filter(p => p.status !== 'paid');
  const pendingAmount = pendingPayments.reduce((sum, p) => sum + (p.amount - p.paidAmount), 0);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Tableau de Bord Trésorier</h2>
        <p className="text-emerald-100">Gestion financière et suivi des paiements</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
          <div className="flex items-center justify-between mb-3">
            <DollarSign className="w-8 h-8 text-emerald-400" />
            <span className="text-emerald-400 text-xs font-medium bg-emerald-500/20 px-2 py-1 rounded">Total</span>
          </div>
          <p className="text-slate-400 text-sm">Encaissé ce mois</p>
          <p className="text-3xl font-bold text-white mt-1">{(totalRevenue / 1000).toFixed(0)}K F</p>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
          <div className="flex items-center justify-between mb-3">
            <TrendingUp className="w-8 h-8 text-amber-400" />
            <span className="text-amber-400 text-xs font-medium bg-amber-500/20 px-2 py-1 rounded">En attente</span>
          </div>
          <p className="text-slate-400 text-sm">Paiements dus</p>
          <p className="text-3xl font-bold text-white mt-1">{(pendingAmount / 1000).toFixed(0)}K F</p>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
          <div className="flex items-center justify-between mb-3">
            <Activity className="w-8 h-8 text-red-400" />
            <span className="text-red-400 text-xs font-medium bg-red-500/20 px-2 py-1 rounded">Retard</span>
          </div>
          <p className="text-slate-400 text-sm">En retard</p>
          <p className="text-3xl font-bold text-white mt-1">{pendingPayments.length}</p>
        </div>
      </div>

      <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
        <h3 className="text-white font-semibold mb-4">Paiements Récents</h3>
        <div className="space-y-2">
          {mockPayments.slice(0, 5).map(payment => {
            const member = mockMembers.find(m => m.id === payment.memberId);
            return (
              <div key={payment.id} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <div>
                  <p className="text-white text-sm font-medium">{member?.firstName} {member?.lastName}</p>
                  <p className="text-slate-400 text-xs">{payment.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-emerald-400 font-bold">{payment.paidAmount.toLocaleString()} F</p>
                  <p className="text-slate-500 text-xs">{new Date(payment.date).toLocaleDateString('fr-FR')}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
