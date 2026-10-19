import { useState } from 'react';
import { DollarSign, AlertTriangle, CheckCircle, Clock, Download, CreditCard } from 'lucide-react';
import { mockMembers, mockPayments } from '../data/mockData';
import { Payment } from '../types';
import { generatePaymentStatementPDF } from '../utils/pdfGenerators';
import { exportToCSV } from '../utils/helpers';
import AddPaymentModal from './AddPaymentModal';

export default function PaymentsView() {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [showAddPayment, setShowAddPayment] = useState(false);

  const filteredPayments = mockPayments.filter(p => filterStatus === 'all' || p.status === filterStatus);

  const totalExpected = mockPayments.reduce((s, p) => s + p.amount, 0);
  const totalReceived = mockPayments.reduce((s, p) => s + p.paidAmount, 0);
  const totalOutstanding = totalExpected - totalReceived;
  const overdueCount = mockPayments.filter(p => p.status === 'overdue').length;
  const overdueAmount = mockPayments.filter(p => p.status === 'overdue').reduce((s, p) => s + (p.amount - p.paidAmount), 0);

  const getStatusBadge = (payment: Payment) => {
    const isOverdue = payment.status === 'overdue' || (new Date(payment.dueDate) < new Date() && payment.paidAmount < payment.amount);
    if (payment.status === 'paid') return <span className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full text-xs font-medium">Payé</span>;
    if (isOverdue) return <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1"><AlertTriangle className="w-3 h-3" />ÉCHÉANCE DÉPASSÉE</span>;
    if (payment.status === 'partial') return <span className="bg-amber-500/20 text-amber-400 px-2 py-1 rounded-full text-xs font-medium">Partiel</span>;
    return <span className="bg-slate-500/20 text-slate-400 px-2 py-1 rounded-full text-xs font-medium">En attente</span>;
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = { cotisation: '📋 Cotisation', examen: '🥋 Examen', equipement: '👕 Équipement', competition: '🏆 Compétition' };
    return labels[type] || type;
  };

  const getPaymentMethodLabel = (method: string) => {
    const labels: Record<string, string> = {
      cash: '💵 Espèces',
      mobile_money: '📱 Mobile Money',
      bank: '🏦 Virement Bancaire'
    };
    return labels[method] || method;
  };

  const getMobileMoneyOperator = (receipt: string) => {
    if (receipt.startsWith('OM-')) return '🟠 Orange Money';
    if (receipt.startsWith('MTN-')) return '🟡 MTN MoMo';
    if (receipt.startsWith('WAVE-')) return '🔵 Wave';
    if (receipt.startsWith('MOOV-')) return '🔷 Moov Money';
    return '📱 Mobile Money';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Trésorerie & Paiements</h2>
          <p className="text-slate-400 text-sm">Suivi des cotisations, acomptes et créances</p>
        </div>
        <button
          onClick={() => setShowAddPayment(true)}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <CreditCard className="w-4 h-4" />
          Encaisser un Paiement
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500/20 p-2 rounded-lg"><DollarSign className="w-5 h-5 text-emerald-400" /></div>
            <div>
              <p className="text-slate-400 text-xs">Total Encaissé</p>
              <p className="text-white font-bold">{totalReceived.toLocaleString()} F</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500/20 p-2 rounded-lg"><Clock className="w-5 h-5 text-blue-400" /></div>
            <div>
              <p className="text-slate-400 text-xs">Solde Restant</p>
              <p className="text-white font-bold">{totalOutstanding.toLocaleString()} F</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="bg-amber-500/20 p-2 rounded-lg"><CheckCircle className="w-5 h-5 text-amber-400" /></div>
            <div>
              <p className="text-slate-400 text-xs">Taux Recouvrement</p>
              <p className="text-white font-bold">{Math.round((totalReceived / totalExpected) * 100)}%</p>
            </div>
          </div>
        </div>
        <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/30">
          <div className="flex items-center gap-3">
            <div className="bg-red-500/20 p-2 rounded-lg"><AlertTriangle className="w-5 h-5 text-red-400" /></div>
            <div>
              <p className="text-red-400 text-xs">Échéances Dépassées</p>
              <p className="text-red-400 font-bold">{overdueCount} — {overdueAmount.toLocaleString()} F</p>
            </div>
          </div>
        </div>
      </div>

      {/* Overdue Banner */}
      {overdueCount > 0 && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center gap-3">
          <div className="relative flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
          </div>
          <div>
            <p className="text-red-400 font-medium text-sm">⚠️ {overdueCount} paiement(s) en retard — Montant total des créances échues: {overdueAmount.toLocaleString()} FCFA</p>
            <p className="text-slate-400 text-xs mt-1">Relancer les familles par SMS/WhatsApp</p>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-2 flex-wrap items-center">
        {['all', 'paid', 'partial', 'overdue', 'pending'].map(status => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${filterStatus === status ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-500'}`}
          >
            {status === 'all' ? 'Tous' : status === 'paid' ? 'Payés' : status === 'partial' ? 'Partiels' : status === 'overdue' ? 'En Retard' : 'En Attente'}
          </button>
        ))}
        <div className="ml-auto">
          <button
            onClick={() => {
              exportToCSV(filteredPayments.map(p => {
                const member = mockMembers.find(m => m.id === p.memberId);
                return {
                  licencié: `${member?.firstName} ${member?.lastName}`,
                  type: p.type,
                  description: p.description,
                  montant: p.amount,
                  payé: p.paidAmount,
                  reste: p.amount - p.paidAmount,
                  échéance: p.dueDate,
                  statut: p.status,
                };
              }), 'paiements');
            }}
            className="flex items-center gap-1 px-3 py-1.5 bg-slate-700 text-slate-300 rounded-lg text-sm hover:bg-slate-600 transition-colors"
          >
            <Download className="w-3 h-3" /> Export CSV
          </button>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left px-4 py-3 text-slate-400 text-xs font-medium uppercase">Licencié</th>
                <th className="text-left px-4 py-3 text-slate-400 text-xs font-medium uppercase">Type</th>
                <th className="text-left px-4 py-3 text-slate-400 text-xs font-medium uppercase">Montant</th>
                <th className="text-left px-4 py-3 text-slate-400 text-xs font-medium uppercase">Payé</th>
                <th className="text-left px-4 py-3 text-slate-400 text-xs font-medium uppercase">Solde Restant</th>
                <th className="text-left px-4 py-3 text-slate-400 text-xs font-medium uppercase">Échéance</th>
                <th className="text-left px-4 py-3 text-slate-400 text-xs font-medium uppercase">Statut</th>
                <th className="text-left px-4 py-3 text-slate-400 text-xs font-medium uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map(payment => {
                const member = mockMembers.find(m => m.id === payment.memberId);
                const remaining = payment.amount - payment.paidAmount;
                const isOverdue = new Date(payment.dueDate) < new Date() && remaining > 0;

                return (
                  <tr key={payment.id} className={`border-b border-slate-700/50 hover:bg-slate-700/30 ${isOverdue ? 'border-l-4 border-l-red-500 bg-red-500/5' : ''}`}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {isOverdue && (
                          <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                          </span>
                        )}
                        <span className="text-white text-sm">{member?.firstName} {member?.lastName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-300 text-sm">{getTypeLabel(payment.type)}</td>
                    <td className="px-4 py-3 text-white text-sm font-medium">{payment.amount.toLocaleString()} F</td>
                    <td className="px-4 py-3 text-emerald-400 text-sm">{payment.paidAmount.toLocaleString()} F</td>
                    <td className={`px-4 py-3 text-sm font-medium ${remaining > 0 ? 'text-red-400' : 'text-slate-500'}`}>
                      {remaining > 0 ? `${remaining.toLocaleString()} F` : '—'}
                    </td>
                    <td className="px-4 py-3 text-slate-400 text-sm">
                      {new Date(payment.dueDate).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-4 py-3">{getStatusBadge(payment)}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setSelectedPayment(payment)}
                        className="text-emerald-400 hover:text-emerald-300 text-sm flex items-center gap-1"
                      >
                        <Download className="w-3 h-3" /> Détails
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Detail Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedPayment(null)}>
          <div className="bg-slate-800 rounded-2xl border border-slate-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-slate-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Relevé de Compte</h2>
                <button onClick={() => setSelectedPayment(null)} className="text-slate-400 hover:text-white text-2xl">&times;</button>
              </div>
              {(() => {
                const member = mockMembers.find(m => m.id === selectedPayment.memberId);
                return <p className="text-slate-400 text-sm mt-1">{member?.firstName} {member?.lastName} — {selectedPayment.description}</p>;
              })()}
            </div>

            <div className="p-6 space-y-4">
              {/* Summary */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-slate-700/30 rounded-lg p-3 text-center">
                  <p className="text-slate-400 text-xs">Montant Total</p>
                  <p className="text-white font-bold">{selectedPayment.amount.toLocaleString()} F</p>
                </div>
                <div className="bg-emerald-500/10 rounded-lg p-3 text-center border border-emerald-500/20">
                  <p className="text-emerald-400 text-xs">Total Payé</p>
                  <p className="text-emerald-400 font-bold">{selectedPayment.paidAmount.toLocaleString()} F</p>
                </div>
                <div className={`rounded-lg p-3 text-center border ${selectedPayment.amount - selectedPayment.paidAmount > 0 ? 'bg-red-500/10 border-red-500/20' : 'bg-slate-700/30'}`}>
                  <p className={`text-xs ${selectedPayment.amount - selectedPayment.paidAmount > 0 ? 'text-red-400' : 'text-slate-400'}`}>Solde Restant</p>
                  <p className={`font-bold ${selectedPayment.amount - selectedPayment.paidAmount > 0 ? 'text-red-400' : 'text-slate-500'}`}>
                    {(selectedPayment.amount - selectedPayment.paidAmount).toLocaleString()} F
                  </p>
                </div>
              </div>

              {/* Installments Timeline */}
              <div>
                <h4 className="text-white font-semibold text-sm mb-3">Historique des Acomptes</h4>
                <div className="space-y-3">
                  {selectedPayment.installments.map((inst, idx) => (
                    <div key={inst.id} className="flex items-center gap-3 bg-slate-700/30 rounded-lg p-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-sm font-bold">
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm">{inst.amount.toLocaleString()} FCFA</p>
                        <p className="text-slate-400 text-xs">
                          {new Date(inst.date).toLocaleDateString('fr-FR')} • {getPaymentMethodLabel(inst.method)} {inst.method === 'mobile_money' && `(${getMobileMoneyOperator(inst.receipt)})`} • Reçu: {inst.receipt}
                        </p>
                      </div>
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-slate-700">
                <button
                  onClick={() => {
                    if (selectedPayment) {
                      generatePaymentStatementPDF(selectedPayment.memberId, [selectedPayment]);
                    }
                  }}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" /> Exporter Relevé PDF
                </button>
                <button
                  onClick={() => {
                    const member = mockMembers.find(m => m.id === selectedPayment?.memberId);
                    if (member?.parentPhone) {
                      const remaining = selectedPayment!.amount - selectedPayment!.paidAmount;
                      const message = encodeURIComponent(`Bonjour, nous vous rappelons que le solde restant de ${remaining.toLocaleString()} FCFA pour ${selectedPayment?.description} est en attente. Merci de régulariser la situation. — CSA Taekwondo`);
                      window.open(`https://wa.me/${member.parentPhone.replace(/\s/g, '')}?text=${message}`, '_blank');
                    }
                  }}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                >
                  💬 Relance WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Payment Modal */}
      <AddPaymentModal
        isOpen={showAddPayment}
        onClose={() => setShowAddPayment(false)}
        onAdd={(payment) => {
          console.log('New payment added:', payment);
          // Ici, on ajouterait le paiement à la liste
          // Pour l'instant, on affiche juste un message
          alert(`Paiement de ${payment.paidAmount.toLocaleString()} FCFA enregistré avec succès!`);
        }}
      />
    </div>
  );
}
