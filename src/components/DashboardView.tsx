import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Users, TrendingUp, DollarSign, Award, AlertTriangle, Calendar, Activity, Download } from 'lucide-react';
import { mockMembers, mockPayments, mockCompetitions, mockInventory, attendance30DaysData } from '../data/mockData';
import CompetitionCountdown from './CompetitionCountdown';
import { exportToCSV } from '../utils/helpers';

const COLORS = ['#10b981', '#f59e0b', '#ef4444', '#6366f1'];

export default function DashboardView() {
  const [showMovingAvg, setShowMovingAvg] = useState(false);

  const totalMembers = mockMembers.length;
  const activeMembers = mockMembers.filter(m => m.status === 'active').length;
  const avgAttendance = Math.round(attendance30DaysData.reduce((sum, d) => sum + d.rate, 0) / attendance30DaysData.length);
  const totalRevenue = mockPayments.reduce((sum, p) => sum + p.paidAmount, 0);
  const outstandingAmount = mockPayments.reduce((sum, p) => sum + (p.amount - p.paidAmount), 0);
  const overduePayments = mockPayments.filter(p => p.status === 'overdue').length;

  const beltDistribution = [
    { name: 'Blanche-Jaune', value: mockMembers.filter(m => ['white', 'yellow'].includes(m.beltColor)).length },
    { name: 'Orange-Vert', value: mockMembers.filter(m => ['orange', 'green'].includes(m.beltColor)).length },
    { name: 'Bleue-Violette', value: mockMembers.filter(m => ['blue', 'purple'].includes(m.beltColor)).length },
    { name: 'Rouge-Noire', value: mockMembers.filter(m => ['red', 'black'].includes(m.beltColor)).length },
  ];

  const movingAvg = attendance30DaysData.map((d, i) => {
    const start = Math.max(0, i - 6);
    const slice = attendance30DaysData.slice(start, i + 1);
    const avg = Math.round(slice.reduce((s, x) => s + x.rate, 0) / slice.length);
    return { ...d, movingAvg: avg };
  });

  const criticalStock = mockInventory.filter(item => item.stock <= item.minStock);

  const getCountdown = (dateStr: string) => {
    const target = new Date(dateStr);
    const now = new Date();
    const diff = target.getTime() - now.getTime();
    if (diff <= 0) return 'En cours';
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return `${days}j`;
  };

  const exportAttendanceCSV = () => {
    const csvData = attendance30DaysData.map(d => ({
      date: d.fullDate,
      taux: `${d.rate}%`,
      presents: d.present,
      retards: d.late,
      absents: d.absent
    }));
    exportToCSV(csvData, 'assiduite_30jours');
  };

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-5 border border-slate-700 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Licenciés Actifs</p>
              <p className="text-3xl font-bold text-white mt-1">{activeMembers}<span className="text-slate-400 text-lg">/{totalMembers}</span></p>
            </div>
            <div className="bg-emerald-500/20 p-3 rounded-lg">
              <Users className="w-6 h-6 text-emerald-400" />
            </div>
          </div>
          <div className="mt-3 flex items-center text-emerald-400 text-sm">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+2 ce mois</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-5 border border-slate-700 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Taux Assiduité</p>
              <p className="text-3xl font-bold text-white mt-1">{avgAttendance}%</p>
            </div>
            <div className="bg-blue-500/20 p-3 rounded-lg">
              <Activity className="w-6 h-6 text-blue-400" />
            </div>
          </div>
          <div className="mt-3 flex items-center text-sm">
            <span className="text-amber-400">Seuil FITKD: 75%</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-5 border border-slate-700 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Recettes Encaissées</p>
              <p className="text-3xl font-bold text-white mt-1">{(totalRevenue / 1000).toFixed(0)}K</p>
              <p className="text-slate-500 text-xs">FCFA</p>
            </div>
            <div className="bg-amber-500/20 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-amber-400" />
            </div>
          </div>
          <div className="mt-3 flex items-center text-sm">
            <span className="text-red-400">Impayé: {(outstandingAmount / 1000).toFixed(0)}K FCFA</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-5 border border-slate-700 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Médailles Saison</p>
              <p className="text-3xl font-bold text-white mt-1">
                <span className="text-yellow-400">{mockCompetitions.reduce((s, c) => s + c.medals.gold, 0)}</span>
                <span className="text-slate-400 text-lg"> / </span>
                <span className="text-gray-300">{mockCompetitions.reduce((s, c) => s + c.medals.silver, 0)}</span>
                <span className="text-slate-400 text-lg"> / </span>
                <span className="text-amber-600">{mockCompetitions.reduce((s, c) => s + c.medals.bronze, 0)}</span>
              </p>
            </div>
            <div className="bg-purple-500/20 p-3 rounded-lg">
              <Award className="w-6 h-6 text-purple-400" />
            </div>
          </div>
          <div className="mt-3 flex items-center text-sm text-slate-400">
            🥇 Or / 🥈 Argent / 🥉 Bronze
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Chart */}
        <div className="lg:col-span-2 bg-slate-800/50 rounded-xl p-5 border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold text-lg">Taux d'Assiduité - 30 Jours</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowMovingAvg(!showMovingAvg)}
                className={`px-3 py-1 rounded-lg text-sm ${showMovingAvg ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-400'}`}
              >
                Moy. Mobile 7j
              </button>
              <button
                onClick={exportAttendanceCSV}
                className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-slate-400 rounded-lg text-sm flex items-center gap-1"
              >
                <Download className="w-4 h-4" />
                CSV
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={showMovingAvg ? movingAvg : attendance30DaysData}>
              <defs>
                <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} domain={[60, 100]} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
                labelStyle={{ color: '#e2e8f0' }}
              />
              <ReferenceLine y={75} stroke="#f59e0b" strokeDasharray="5 5" label={{ value: 'Seuil FITKD 75%', fill: '#f59e0b', fontSize: 10 }} />
              <ReferenceLine y={85} stroke="#10b981" strokeDasharray="5 5" label={{ value: 'Objectif 85%', fill: '#10b981', fontSize: 10 }} />
              <Area type="monotone" dataKey="rate" stroke="#10b981" strokeWidth={2.5} fill="url(#colorRate)" name="Taux (%)" />
              {showMovingAvg && <Area type="monotone" dataKey="movingAvg" stroke="#6366f1" strokeWidth={2} fill="url(#colorAvg)" name="Moy. Mobile" />}
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Belt Distribution */}
        <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
          <h3 className="text-white font-semibold text-lg mb-4">Répartition par Grade</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={beltDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                {beltDistribution.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {beltDistribution.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                <span className="text-slate-400 text-xs">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Competitions */}
        <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-amber-400" />
            <h3 className="text-white font-semibold">Compétitions à Venir</h3>
          </div>
          <div className="space-y-3">
            {mockCompetitions.slice(0, 2).map(comp => (
              <CompetitionCountdown key={comp.id} competition={comp} />
            ))}
          </div>
        </div>

        {/* Critical Stock */}
        <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <h3 className="text-white font-semibold">Stocks Critiques</h3>
          </div>
          {criticalStock.length > 0 ? (
            <div className="space-y-3">
              {criticalStock.map(item => (
                <div key={item.id} className="bg-red-500/10 rounded-lg p-3 border border-red-500/30">
                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm">{item.name}</span>
                    <span className="text-red-400 font-bold text-sm">{item.stock}/{item.minStock}</span>
                  </div>
                  <div className="mt-2 bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-red-500 h-2 rounded-full"
                      style={{ width: `${(item.stock / item.maxStock) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-slate-400 text-xs mt-1">Min: {item.minStock} | Max: {item.maxStock}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-emerald-400 text-sm">✓ Tous les stocks sont suffisants</p>
          )}
          <div className="mt-4 space-y-2">
            {mockInventory.filter(i => !criticalStock.includes(i)).map(item => (
              <div key={item.id} className="flex items-center justify-between text-sm">
                <span className="text-slate-400">{item.name}</span>
                <span className="text-emerald-400">{item.stock} unités</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Payments */}
        <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="w-5 h-5 text-emerald-400" />
            <h3 className="text-white font-semibold">Alertes Financières</h3>
          </div>
          <div className="space-y-3">
            {mockPayments.filter(p => p.status !== 'paid').map(payment => {
              const member = mockMembers.find(m => m.id === payment.memberId);
              const remaining = payment.amount - payment.paidAmount;
              const isOverdue = new Date(payment.dueDate) < new Date();
              return (
                <div key={payment.id} className={`rounded-lg p-3 border ${isOverdue ? 'bg-red-500/10 border-red-500/30' : 'bg-amber-500/10 border-amber-500/30'}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm font-medium">{member?.firstName} {member?.lastName}</span>
                    {isOverdue && (
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                      </span>
                    )}
                  </div>
                  <p className="text-slate-400 text-xs mt-1">{payment.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`text-xs font-bold ${isOverdue ? 'text-red-400' : 'text-amber-400'}`}>
                      {isOverdue ? 'ÉCHÉANCE DÉPASSÉE' : 'EN COURS'}
                    </span>
                    <span className="text-white text-sm font-bold">{remaining.toLocaleString()} FCFA</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Weekly Attendance Bar Chart */}
      <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
        <h3 className="text-white font-semibold text-lg mb-4">Décomposition Assiduité - 30 Jours</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={attendance30DaysData.slice(-14)}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} />
            <YAxis stroke="#94a3b8" fontSize={11} />
            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }} />
            <Bar dataKey="present" stackId="a" fill="#10b981" name="Présents" radius={[0, 0, 0, 0]} />
            <Bar dataKey="late" stackId="a" fill="#f59e0b" name="Retards" radius={[0, 0, 0, 0]} />
            <Bar dataKey="absent" stackId="a" fill="#ef4444" name="Absents" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
