import { useState } from 'react';
import { Calendar, DollarSign, AlertTriangle, TrendingUp, TrendingDown, MessageSquare, FileText, Download, Search, Filter, CheckCircle, Clock, XCircle, Bell } from 'lucide-react';
import { mockMembers, mockPayments } from '../data/mockData';
import { exportToCSV } from '../utils/helpers';
import { generatePaymentStatementPDF } from '../utils/pdfGenerators';

interface MonthlyPayment {
  id: string;
  memberId: string;
  memberName: string;
  month: string;
  year: number;
  amount: number;
  paidAmount: number;
  dueDate: string;
  paidDate?: string;
  status: 'paid' | 'partial' | 'overdue' | 'pending';
  paymentMethod?: 'cash' | 'mobile_money' | 'bank';
  reminderSent: boolean;
  reminderCount: number;
  lastReminderDate?: string;
}

interface TreasuryKPI {
  totalExpected: number;
  totalReceived: number;
  totalOutstanding: number;
  collectionRate: number;
  overdueCount: number;
  overdueAmount: number;
  pendingCount: number;
  pendingAmount: number;
}

const generateMonthlyPayments = (): MonthlyPayment[] => {
  const payments: MonthlyPayment[] = [];
  const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  
  mockMembers.forEach((member, memberIdx) => {
    const monthlyFee = member.dan ? 15000 : member.beltColor === 'black' ? 12000 : 8000;
    
    months.forEach((month, monthIdx) => {
      const isPast = monthIdx < 11; // Novembre est le mois actuel
      const isCurrentMonth = monthIdx === 10;
      
      let status: MonthlyPayment['status'] = 'pending';
      let paidAmount = 0;
      let paidDate: string | undefined;
      let paymentMethod: MonthlyPayment['paymentMethod'] | undefined;
      let reminderSent = false;
      let reminderCount = 0;
      let lastReminderDate: string | undefined;
      
      if (isPast) {
        // 70% payés, 20% partiels, 10% impayés
        const rand = Math.random();
        if (rand < 0.7) {
          status = 'paid';
          paidAmount = monthlyFee;
          paidDate = `2024-${String(monthIdx + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 5) + 1).padStart(2, '0')}`;
          paymentMethod = ['cash', 'mobile_money', 'bank'][Math.floor(Math.random() * 3)] as MonthlyPayment['paymentMethod'];
        } else if (rand < 0.9) {
          status = 'partial';
          paidAmount = Math.floor(monthlyFee * (0.3 + Math.random() * 0.5));
          paidDate = `2024-${String(monthIdx + 1).padStart(2, '0')}-05`;
          paymentMethod = 'mobile_money';
          reminderSent = true;
          reminderCount = 2;
          lastReminderDate = `2024-${String(monthIdx + 1).padStart(2, '0')}-20`;
        } else {
          status = 'overdue';
          reminderSent = true;
          reminderCount = 3;
          lastReminderDate = `2024-${String(monthIdx + 1).padStart(2, '0')}-25`;
        }
      } else if (isCurrentMonth) {
        // Mois en cours : 50% payés, reste en attente
        if (memberIdx % 2 === 0) {
          status = 'paid';
          paidAmount = monthlyFee;
          paidDate = '2024-11-03';
          paymentMethod = 'mobile_money';
        } else {
          status = 'pending';
        }
      }
      
      payments.push({
        id: `MP-${member.id}-${monthIdx}`,
        memberId: member.id,
        memberName: `${member.firstName} ${member.lastName}`,
        month,
        year: 2024,
        amount: monthlyFee,
        paidAmount,
        dueDate: `2024-${String(monthIdx + 1).padStart(2, '0')}-05`,
        paidDate,
        status,
        paymentMethod,
        reminderSent,
        reminderCount,
        lastReminderDate,
      });
    });
  });
  
  return payments;
};

export default function MonthlyPaymentsView() {
  const [monthlyPayments] = useState<MonthlyPayment[]>(generateMonthlyPayments());
  const [selectedMonth, setSelectedMonth] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showRelanceModal, setShowRelanceModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<MonthlyPayment | null>(null);

  // Filter payments
  const filteredPayments = monthlyPayments.filter(payment => {
    const matchMonth = selectedMonth === 'all' || payment.month === selectedMonth;
    const matchStatus = selectedStatus === 'all' || payment.status === selectedStatus;
    const matchSearch = payment.memberName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchMonth && matchStatus && matchSearch;
  });

  // Calculate KPIs
  const calculateKPIs = (): TreasuryKPI => {
    const totalExpected = monthlyPayments.reduce((sum, p) => sum + p.amount, 0);
    const totalReceived = monthlyPayments.reduce((sum, p) => sum + p.paidAmount, 0);
    const totalOutstanding = totalExpected - totalReceived;
    const collectionRate = Math.round((totalReceived / totalExpected) * 100);
    const overduePayments = monthlyPayments.filter(p => p.status === 'overdue');
    const overdueCount = overduePayments.length;
    const overdueAmount = overduePayments.reduce((sum, p) => sum + (p.amount - p.paidAmount), 0);
    const pendingPayments = monthlyPayments.filter(p => p.status === 'pending');
    const pendingCount = pendingPayments.length;
    const pendingAmount = pendingPayments.reduce((sum, p) => sum + p.amount, 0);

    return {
      totalExpected,
      totalReceived,
      totalOutstanding,
      collectionRate,
      overdueCount,
      overdueAmount,
      pendingCount,
      pendingAmount,
    };
  };

  const kpis = calculateKPIs();

  // Monthly summary
  const getMonthlySummary = () => {
    const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
    return months.map((month, idx) => {
      const monthPayments = monthlyPayments.filter(p => {
        const monthIdx = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'].indexOf(p.month);
        return monthIdx === idx;
      });
      const expected = monthPayments.reduce((sum, p) => sum + p.amount, 0);
      const received = monthPayments.reduce((sum, p) => sum + p.paidAmount, 0);
      const rate = expected > 0 ? Math.round((received / expected) * 100) : 0;
      return { month, expected, received, rate };
    });
  };

  const monthlySummary = getMonthlySummary();

  // Overdue members
  const getOverdueMembers = () => {
    const overdueMap = new Map<string, { name: string; totalDue: number; months: number }>();
    
    monthlyPayments.filter(p => p.status === 'overdue' || p.status === 'partial').forEach(payment => {
      const existing = overdueMap.get(payment.memberId);
      const due = payment.amount - payment.paidAmount;
      
      if (existing) {
        existing.totalDue += due;
        existing.months += 1;
      } else {
        overdueMap.set(payment.memberId, {
          name: payment.memberName,
          totalDue: due,
          months: 1,
        });
      }
    });

    return Array.from(overdueMap.entries())
      .map(([id, data]) => ({ id, ...data }))
      .sort((a, b) => b.totalDue - a.totalDue);
  };

  const overdueMembers = getOverdueMembers();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'partial': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'overdue': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'pending': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'paid': return 'Payé';
      case 'partial': return 'Partiel';
      case 'overdue': return 'Impayé';
      case 'pending': return 'En attente';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle className="w-4 h-4" />;
      case 'partial': return <Clock className="w-4 h-4" />;
      case 'overdue': return <XCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      default: return null;
    }
  };

  const getPaymentMethodLabel = (method?: string) => {
    switch (method) {
      case 'cash': return '💵 Espèces';
      case 'mobile_money': return '📱 Mobile Money';
      case 'bank': return '🏦 Virement';
      default: return '-';
    }
  };

  const sendReminder = (payment: MonthlyPayment) => {
    const member = mockMembers.find(m => m.id === payment.memberId);
    if (member?.parentPhone) {
      const amount = payment.amount - payment.paidAmount;
      const message = `Bonjour, nous vous rappelons que la mensualité de ${payment.month} ${payment.year} pour ${payment.memberName} d'un montant de ${amount.toLocaleString()} FCFA est en attente. Merci de régulariser. CSA Taekwondo`;
      alert(`Relance envoyée via WhatsApp à ${member.parentPhone}:\n\n${message}`);
    }
  };

  const sendBulkReminders = () => {
    const overduePayments = monthlyPayments.filter(p => p.status === 'overdue' || (p.status === 'partial' && p.paidAmount < p.amount));
    alert(`${overduePayments.length} relances automatiques envoyées via WhatsApp aux parents des licenciés en retard de paiement.`);
  };

  const handleExportCSV = () => {
    exportToCSV(filteredPayments.map(p => ({
      mois: p.month,
      annee: p.year,
      licencie: p.memberName,
      montant: p.amount,
      paye: p.paidAmount,
      reste: p.amount - p.paidAmount,
      echeance: p.dueDate,
      statut: getStatusLabel(p.status),
      methode: p.paymentMethod || '-',
      relances: p.reminderCount,
    })), 'mensualites');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Mensualités & Trésorerie</h2>
          <p className="text-slate-400 text-sm">Gestion des paiements mensuels, relances et impayés</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={sendBulkReminders}
            className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Bell className="w-4 h-4" />
            Relances Automatiques
          </button>
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Treasury Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 rounded-xl p-5 border border-emerald-500/20">
          <div className="flex items-center justify-between mb-3">
            <DollarSign className="w-8 h-8 text-emerald-400" />
            <TrendingUp className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-slate-400 text-sm">Total Encaissé</p>
          <p className="text-2xl font-bold text-white mt-1">{kpis.totalReceived.toLocaleString()}</p>
          <p className="text-slate-500 text-xs mt-1">FCFA</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-xl p-5 border border-blue-500/20">
          <div className="flex items-center justify-between mb-3">
            <Calendar className="w-8 h-8 text-blue-400" />
            <span className="text-blue-400 text-xs font-medium bg-blue-500/20 px-2 py-1 rounded">{kpis.collectionRate}%</span>
          </div>
          <p className="text-slate-400 text-sm">Taux Recouvrement</p>
          <p className="text-2xl font-bold text-white mt-1">{kpis.collectionRate}%</p>
          <p className="text-slate-500 text-xs mt-1">Objectif: 95%</p>
        </div>

        <div className="bg-gradient-to-br from-red-500/10 to-red-600/5 rounded-xl p-5 border border-red-500/20">
          <div className="flex items-center justify-between mb-3">
            <AlertTriangle className="w-8 h-8 text-red-400" />
            <TrendingDown className="w-5 h-5 text-red-400" />
          </div>
          <p className="text-slate-400 text-sm">Impayés</p>
          <p className="text-2xl font-bold text-white mt-1">{kpis.overdueAmount.toLocaleString()}</p>
          <p className="text-slate-500 text-xs mt-1">{kpis.overdueCount} mensualité(s)</p>
        </div>

        <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 rounded-xl p-5 border border-amber-500/20">
          <div className="flex items-center justify-between mb-3">
            <Clock className="w-8 h-8 text-amber-400" />
            <span className="text-amber-400 text-xs font-medium bg-amber-500/20 px-2 py-1 rounded">En cours</span>
          </div>
          <p className="text-slate-400 text-sm">En Attente</p>
          <p className="text-2xl font-bold text-white mt-1">{kpis.pendingAmount.toLocaleString()}</p>
          <p className="text-slate-500 text-xs mt-1">{kpis.pendingCount} mensualité(s)</p>
        </div>
      </div>

      {/* Monthly Evolution Chart */}
      <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-400" />
          Évolution Mensuelle des Recouvrements
        </h3>
        <div className="space-y-3">
          {monthlySummary.map((month, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span className="text-slate-400 text-sm w-12">{month.month}</span>
              <div className="flex-1 bg-slate-700 rounded-full h-6 relative overflow-hidden">
                <div
                  className={`h-6 rounded-full transition-all ${month.rate >= 90 ? 'bg-emerald-500' : month.rate >= 70 ? 'bg-blue-500' : month.rate >= 50 ? 'bg-amber-500' : 'bg-red-500'}`}
                  style={{ width: `${month.rate}%` }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-between px-3">
                  <span className="text-white text-xs font-medium">
                    {(month.received / 1000).toFixed(0)}K / {(month.expected / 1000).toFixed(0)}K F
                  </span>
                  <span className="text-white text-xs font-bold">{month.rate}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Overdue Members Alert */}
      {overdueMembers.length > 0 && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <h3 className="text-red-400 font-semibold">Licenciés en Retard de Paiement</h3>
            <span className="bg-red-500/20 text-red-400 px-2 py-0.5 rounded text-xs font-bold ml-auto">
              {overdueMembers.length} licencié(s)
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {overdueMembers.slice(0, 6).map(member => (
              <div key={member.id} className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium text-sm">{member.name}</p>
                    <p className="text-slate-400 text-xs">{member.months} mois en retard</p>
                  </div>
                  <div className="text-right">
                    <p className="text-red-400 font-bold">{member.totalDue.toLocaleString()} F</p>
                    <button
                      onClick={() => {
                        const payment = monthlyPayments.find(p => p.memberId === member.id && (p.status === 'overdue' || p.status === 'partial'));
                        if (payment) sendReminder(payment);
                      }}
                      className="text-xs text-emerald-400 hover:text-emerald-300 mt-1"
                    >
                      💬 Relancer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher un licencié..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
        >
          <option value="all">Tous les mois</option>
          {['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'].map(month => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
        >
          <option value="all">Tous les statuts</option>
          <option value="paid">Payé</option>
          <option value="partial">Partiel</option>
          <option value="overdue">Impayé</option>
          <option value="pending">En attente</option>
        </select>
      </div>

      {/* Payments Table */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left px-4 py-3 text-slate-400 text-xs font-medium uppercase">Licencié</th>
                <th className="text-left px-4 py-3 text-slate-400 text-xs font-medium uppercase">Mois</th>
                <th className="text-right px-4 py-3 text-slate-400 text-xs font-medium uppercase">Montant</th>
                <th className="text-right px-4 py-3 text-slate-400 text-xs font-medium uppercase">Payé</th>
                <th className="text-right px-4 py-3 text-slate-400 text-xs font-medium uppercase">Reste</th>
                <th className="text-left px-4 py-3 text-slate-400 text-xs font-medium uppercase">Échéance</th>
                <th className="text-center px-4 py-3 text-slate-400 text-xs font-medium uppercase">Statut</th>
                <th className="text-center px-4 py-3 text-slate-400 text-xs font-medium uppercase">Relances</th>
                <th className="text-center px-4 py-3 text-slate-400 text-xs font-medium uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.slice(0, 20).map(payment => (
                <tr key={payment.id} className={`border-b border-slate-700/50 hover:bg-slate-700/30 ${payment.status === 'overdue' ? 'bg-red-500/5' : ''}`}>
                  <td className="px-4 py-3">
                    <span className="text-white text-sm font-medium">{payment.memberName}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-300 text-sm">{payment.month} {payment.year}</td>
                  <td className="px-4 py-3 text-right text-white text-sm">{payment.amount.toLocaleString()} F</td>
                  <td className="px-4 py-3 text-right text-emerald-400 text-sm font-medium">{payment.paidAmount.toLocaleString()} F</td>
                  <td className="px-4 py-3 text-right">
                    <span className={payment.amount - payment.paidAmount > 0 ? 'text-red-400 text-sm font-medium' : 'text-slate-500 text-sm'}>
                      {(payment.amount - payment.paidAmount).toLocaleString()} F
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-400 text-sm">{new Date(payment.dueDate).toLocaleDateString('fr-FR')}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs border ${getStatusColor(payment.status)}`}>
                      {getStatusIcon(payment.status)}
                      {getStatusLabel(payment.status)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {payment.reminderCount > 0 ? (
                      <span className="text-amber-400 text-sm">{payment.reminderCount} relance(s)</span>
                    ) : (
                      <span className="text-slate-500 text-sm">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      {(payment.status === 'overdue' || payment.status === 'partial') && (
                        <button
                          onClick={() => sendReminder(payment)}
                          className="p-1 text-emerald-400 hover:text-emerald-300"
                          title="Envoyer relance WhatsApp"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setSelectedPayment(payment);
                          setShowRelanceModal(true);
                        }}
                        className="p-1 text-blue-400 hover:text-blue-300"
                        title="Voir détails"
                      >
                        <FileText className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredPayments.length > 20 && (
          <div className="p-3 border-t border-slate-700 text-center">
            <p className="text-slate-400 text-sm">
              Affichage de 20 sur {filteredPayments.length} mensualités
            </p>
          </div>
        )}
      </div>

      {/* Payment Detail Modal */}
      {showRelanceModal && selectedPayment && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowRelanceModal(false)}>
          <div className="bg-slate-800 rounded-2xl border border-slate-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-slate-700">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">Détail de la Mensualité</h2>
                  <p className="text-slate-400 text-sm mt-1">{selectedPayment.memberName} - {selectedPayment.month} {selectedPayment.year}</p>
                </div>
                <button onClick={() => setShowRelanceModal(false)} className="text-slate-400 hover:text-white text-2xl">&times;</button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <p className="text-slate-400 text-xs">Montant dû</p>
                  <p className="text-white text-xl font-bold">{selectedPayment.amount.toLocaleString()} FCFA</p>
                </div>
                <div className="bg-emerald-500/10 rounded-lg p-4 border border-emerald-500/30">
                  <p className="text-emerald-400 text-xs">Montant payé</p>
                  <p className="text-emerald-400 text-xl font-bold">{selectedPayment.paidAmount.toLocaleString()} FCFA</p>
                </div>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-slate-400 text-sm">Statut</span>
                  <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(selectedPayment.status)}`}>
                    {getStatusLabel(selectedPayment.status)}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-400 text-sm">Échéance</span>
                  <span className="text-white text-sm">{new Date(selectedPayment.dueDate).toLocaleDateString('fr-FR')}</span>
                </div>
                {selectedPayment.paidDate && (
                  <div className="flex justify-between mb-2">
                    <span className="text-slate-400 text-sm">Date de paiement</span>
                    <span className="text-white text-sm">{new Date(selectedPayment.paidDate).toLocaleDateString('fr-FR')}</span>
                  </div>
                )}
                {selectedPayment.paymentMethod && (
                  <div className="flex justify-between">
                    <span className="text-slate-400 text-sm">Méthode</span>
                    <span className="text-white text-sm">{getPaymentMethodLabel(selectedPayment.paymentMethod)}</span>
                  </div>
                )}
              </div>
              {selectedPayment.reminderCount > 0 && (
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                  <p className="text-amber-400 text-sm font-medium mb-2">Relances envoyées</p>
                  <p className="text-slate-300 text-sm">{selectedPayment.reminderCount} relance(s)</p>
                  {selectedPayment.lastReminderDate && (
                    <p className="text-slate-400 text-xs mt-1">Dernière relance: {new Date(selectedPayment.lastReminderDate).toLocaleDateString('fr-FR')}</p>
                  )}
                </div>
              )}
              <div className="flex gap-3 pt-4 border-t border-slate-700">
                {(selectedPayment.status === 'overdue' || selectedPayment.status === 'partial') && (
                  <button
                    onClick={() => {
                      sendReminder(selectedPayment);
                      setShowRelanceModal(false);
                    }}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-5 h-5" />
                    Envoyer Relance WhatsApp
                  </button>
                )}
                <button
                  onClick={() => {
                    const member = mockMembers.find(m => m.id === selectedPayment.memberId);
                    if (member) {
                      const payment = mockPayments.find(p => p.memberId === member.id);
                      if (payment) generatePaymentStatementPDF(member.id, [payment]);
                    }
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <FileText className="w-5 h-5" />
                  Exporter PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
