import { useState } from 'react';
import { BarChart3, TrendingUp, Users, DollarSign, Award, Calendar, Download } from 'lucide-react';
import { mockMembers, mockPayments, mockAttendanceRecords, mockCompetitions } from '../data/mockData';
import { exportToCSV } from '../utils/helpers';
import { formatFCFA, calculateStatistics } from '../utils/storage';

export default function AdvancedStats() {
  const [period, setPeriod] = useState<'month' | 'quarter' | 'year'>('month');

  const stats = calculateStatistics(mockMembers);

  // Financial statistics
  const totalRevenue = mockPayments.reduce((sum, p) => sum + p.paidAmount, 0);
  const totalExpected = mockPayments.reduce((sum, p) => sum + p.amount, 0);
  const collectionRate = Math.round((totalRevenue / totalExpected) * 100);
  const overduePayments = mockPayments.filter(p => p.status === 'overdue');
  const overdueAmount = overduePayments.reduce((sum, p) => sum + (p.amount - p.paidAmount), 0);

  // Attendance statistics
  const avgAttendanceRate = Math.round(
    mockMembers.reduce((sum, m) => {
      const avg = m.attendanceHistory.reduce((s, a) => s + a.rate, 0) / m.attendanceHistory.length;
      return sum + avg;
    }, 0) / mockMembers.length
  );

  const excellentAttendance = mockMembers.filter(m => {
    const avg = m.attendanceHistory.reduce((s, a) => s + a.rate, 0) / m.attendanceHistory.length;
    return avg >= 90;
  }).length;

  const atRiskAttendance = mockMembers.filter(m => {
    const avg = m.attendanceHistory.reduce((s, a) => s + a.rate, 0) / m.attendanceHistory.length;
    return avg < 75;
  }).length;

  // Competition statistics
  const totalMedals = mockCompetitions.reduce((sum, c) => sum + c.medals.gold + c.medals.silver + c.medals.bronze, 0);
  const goldMedals = mockCompetitions.reduce((sum, c) => sum + c.medals.gold, 0);

  // Monthly trends
  const monthlyData = Array.from({ length: 12 }, (_, i) => {
    const month = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'][i];
    const attendance = mockMembers.reduce((sum, m) => sum + (m.attendanceHistory[i]?.rate || 0), 0) / mockMembers.length;
    return {
      month,
      attendance: Math.round(attendance),
      newMembers: Math.floor(Math.random() * 3),
      revenue: Math.floor(Math.random() * 500000) + 200000,
    };
  });

  const handleExportReport = () => {
    const reportData = [
      { indicateur: 'Total licenciés', valeur: stats.total },
      { indicateur: 'Licenciés actifs', valeur: stats.active },
      { indicateur: 'Taux d\'assiduité moyen', valeur: `${avgAttendanceRate}%` },
      { indicateur: 'Excellente assiduité (≥90%)', valeur: excellentAttendance },
      { indicateur: 'Assiduité à risque (<75%)', valeur: atRiskAttendance },
      { indicateur: 'Revenus totaux', valeur: formatFCFA(totalRevenue) },
      { indicateur: 'Taux de recouvrement', valeur: `${collectionRate}%` },
      { indicateur: 'Impayés', valeur: formatFCFA(totalExpected - totalRevenue) },
      { indicateur: 'Total médailles', valeur: totalMedals },
      { indicateur: 'Médailles d\'or', valeur: goldMedals },
    ];
    exportToCSV(reportData, 'rapport_statistiques');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Statistiques Avancées</h2>
          <p className="text-slate-400 text-sm">Analyse détaillée des performances de l'académie</p>
        </div>
        <div className="flex gap-2">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value as typeof period)}
            className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="month">Ce mois</option>
            <option value="quarter">Ce trimestre</option>
            <option value="year">Cette année</option>
          </select>
          <button
            onClick={handleExportReport}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            Exporter Rapport
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 rounded-xl p-5 border border-emerald-500/20">
          <div className="flex items-center justify-between mb-3">
            <Users className="w-8 h-8 text-emerald-400" />
            <span className="text-emerald-400 text-xs font-medium bg-emerald-500/20 px-2 py-1 rounded">+12%</span>
          </div>
          <p className="text-slate-400 text-sm">Licenciés Actifs</p>
          <p className="text-3xl font-bold text-white mt-1">{stats.active}</p>
          <p className="text-slate-500 text-xs mt-2">sur {stats.total} total</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-xl p-5 border border-blue-500/20">
          <div className="flex items-center justify-between mb-3">
            <TrendingUp className="w-8 h-8 text-blue-400" />
            <span className="text-blue-400 text-xs font-medium bg-blue-500/20 px-2 py-1 rounded">+5%</span>
          </div>
          <p className="text-slate-400 text-sm">Assiduité Moyenne</p>
          <p className="text-3xl font-bold text-white mt-1">{avgAttendanceRate}%</p>
          <p className="text-slate-500 text-xs mt-2">Seuil FITKD: 75%</p>
        </div>

        <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 rounded-xl p-5 border border-amber-500/20">
          <div className="flex items-center justify-between mb-3">
            <DollarSign className="w-8 h-8 text-amber-400" />
            <span className="text-amber-400 text-xs font-medium bg-amber-500/20 px-2 py-1 rounded">{collectionRate}%</span>
          </div>
          <p className="text-slate-400 text-sm">Revenus Encaissés</p>
          <p className="text-3xl font-bold text-white mt-1">{(totalRevenue / 1000).toFixed(0)}K</p>
          <p className="text-slate-500 text-xs mt-2">FCFA</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-xl p-5 border border-purple-500/20">
          <div className="flex items-center justify-between mb-3">
            <Award className="w-8 h-8 text-purple-400" />
            <span className="text-purple-400 text-xs font-medium bg-purple-500/20 px-2 py-1 rounded">Saison</span>
          </div>
          <p className="text-slate-400 text-sm">Médailles Totales</p>
          <p className="text-3xl font-bold text-white mt-1">{totalMedals}</p>
          <p className="text-slate-500 text-xs mt-2">🥇 {goldMedals} or</p>
        </div>
      </div>

      {/* Detailed Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Analysis */}
        <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-emerald-400" />
            <h3 className="text-white font-semibold">Analyse d'Assiduité</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
              <div>
                <p className="text-white font-medium">Excellente assiduité</p>
                <p className="text-slate-400 text-xs">≥ 90% de présence</p>
              </div>
              <p className="text-2xl font-bold text-emerald-400">{excellentAttendance}</p>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <div>
                <p className="text-white font-medium">Bonne assiduité</p>
                <p className="text-slate-400 text-xs">75% - 89% de présence</p>
              </div>
              <p className="text-2xl font-bold text-blue-400">{stats.active - excellentAttendance - atRiskAttendance}</p>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-500/10 rounded-lg border border-red-500/20">
              <div>
                <p className="text-white font-medium">Assiduité à risque</p>
                <p className="text-slate-400 text-xs">&lt; 75% de présence</p>
              </div>
              <p className="text-2xl font-bold text-red-400">{atRiskAttendance}</p>
            </div>
          </div>
        </div>

        {/* Financial Analysis */}
        <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="w-5 h-5 text-amber-400" />
            <h3 className="text-white font-semibold">Analyse Financière</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
              <div>
                <p className="text-white font-medium">Total encaissé</p>
                <p className="text-slate-400 text-xs">Paiements reçus</p>
              </div>
              <p className="text-xl font-bold text-emerald-400">{formatFCFA(totalRevenue)}</p>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <div>
                <p className="text-white font-medium">Taux de recouvrement</p>
                <p className="text-slate-400 text-xs">Paiements / Attendu</p>
              </div>
              <p className="text-xl font-bold text-blue-400">{collectionRate}%</p>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-500/10 rounded-lg border border-red-500/20">
              <div>
                <p className="text-white font-medium">Impayés</p>
                <p className="text-slate-400 text-xs">{overduePayments.length} en retard</p>
              </div>
              <p className="text-xl font-bold text-red-400">{formatFCFA(overdueAmount)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-blue-400" />
          <h3 className="text-white font-semibold">Évolution Mensuelle</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left px-4 py-3 text-slate-400 text-xs font-medium uppercase">Mois</th>
                <th className="text-center px-4 py-3 text-slate-400 text-xs font-medium uppercase">Assiduité</th>
                <th className="text-center px-4 py-3 text-slate-400 text-xs font-medium uppercase">Nouveaux</th>
                <th className="text-center px-4 py-3 text-slate-400 text-xs font-medium uppercase">Revenus</th>
              </tr>
            </thead>
            <tbody>
              {monthlyData.map((data, idx) => (
                <tr key={idx} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                  <td className="px-4 py-3 text-white text-sm font-medium">{data.month}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-sm font-bold ${data.attendance >= 80 ? 'text-emerald-400' : data.attendance >= 75 ? 'text-amber-400' : 'text-red-400'}`}>
                      {data.attendance}%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center text-blue-400 text-sm">+{data.newMembers}</td>
                  <td className="px-4 py-3 text-center text-amber-400 text-sm">{(data.revenue / 1000).toFixed(0)}K F</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Distribution Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Belt Distribution */}
        <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
          <h3 className="text-white font-semibold mb-4">Répartition par Ceinture</h3>
          <div className="space-y-3">
            {Object.entries(stats.beltDistribution).map(([belt, count]) => {
              const percentage = Math.round((count / stats.total) * 100);
              const colors: Record<string, string> = {
                white: 'bg-white',
                yellow: 'bg-yellow-400',
                orange: 'bg-orange-400',
                green: 'bg-green-500',
                blue: 'bg-blue-500',
                purple: 'bg-purple-500',
                red: 'bg-red-600',
                black: 'bg-black',
              };
              return (
                <div key={belt}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-slate-300 text-sm capitalize">{belt}</span>
                    <span className="text-white text-sm font-medium">{count} ({percentage}%)</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className={`${colors[belt] || 'bg-slate-500'} h-2 rounded-full`} style={{ width: `${percentage}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Age Distribution */}
        <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
          <h3 className="text-white font-semibold mb-4">Répartition par Âge</h3>
          <div className="space-y-3">
            {Object.entries(stats.ageDistribution).map(([category, count]) => {
              const percentage = Math.round((count / stats.total) * 100);
              return (
                <div key={category}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-slate-300 text-sm">{category}</span>
                    <span className="text-white text-sm font-medium">{count} ({percentage}%)</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
