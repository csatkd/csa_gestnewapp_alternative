import { useState } from 'react';
import { Bell, Calendar, CreditCard, User, Shield, Activity, MessageCircle } from 'lucide-react';
import { mockMembers, mockPayments, mockCompetitions, mockAttendanceRecords } from '../data/mockData';

export default function ParentPortalView() {
  const [selectedChild, setSelectedChild] = useState(mockMembers[0]);
  const [activeSection, setActiveSection] = useState<'overview' | 'attendance' | 'payments' | 'events'>('overview');

  const childPayments = mockPayments.filter(p => p.memberId === selectedChild.id);
  const childAttendance = mockAttendanceRecords.filter(r => r.memberId === selectedChild.id);
  const totalDue = childPayments.reduce((s, p) => s + (p.amount - p.paidAmount), 0);

  const getRecentNotifications = () => {
    return [
      { id: 1, type: 'arrival', message: `${selectedChild.firstName} est arrivé(e) au Dojang à 16:00`, time: 'Aujourd\'hui 16:00', icon: '✅' },
      { id: 2, type: 'payment', message: `Acompte de 25 000 FCFA reçu par Orange Money`, time: 'Hier 14:30', icon: '💰' },
      { id: 3, type: 'event', message: 'Compétition Coupe Régionale dans 15 jours', time: 'Il y a 2 jours', icon: '🏆' },
      { id: 4, type: 'medical', message: 'Certificat médical à renouveler dans 45 jours', time: 'Il y a 3 jours', icon: '⚕️' },
    ];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Portail Famille</h2>
          <p className="text-slate-400 text-sm">Suivi de l'évolution de vos enfants</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedChild.id}
            onChange={(e) => setSelectedChild(mockMembers.find(m => m.id === e.target.value) || mockMembers[0])}
            className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
          >
            {mockMembers.filter(m => m.parentPhone).map(m => (
              <option key={m.id} value={m.id}>{m.firstName} {m.lastName}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Child Profile Card */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-800/50 rounded-xl p-5 border border-slate-700">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center text-2xl font-bold text-emerald-400 border-2 border-emerald-500/30">
            {selectedChild.firstName[0]}{selectedChild.lastName[0]}
          </div>
          <div className="flex-1">
            <h3 className="text-white font-bold text-lg">{selectedChild.firstName} {selectedChild.lastName}</h3>
            <p className="text-slate-400 text-sm">Licence: {selectedChild.licenseNumber}</p>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-slate-400 text-xs flex items-center gap-1">
                <Shield className="w-3 h-3" /> {selectedChild.beltColor === 'white' ? 'Blanche' : selectedChild.beltColor === 'yellow' ? 'Jaune' : selectedChild.beltColor === 'orange' ? 'Orange' : selectedChild.beltColor === 'green' ? 'Verte' : selectedChild.beltColor === 'blue' ? 'Bleue' : selectedChild.beltColor === 'red' ? 'Rouge' : 'Noire'}
              </span>
              <span className="text-slate-400 text-xs flex items-center gap-1">
                <Activity className="w-3 h-3" /> {Math.round(selectedChild.attendanceHistory.reduce((s, a) => s + a.rate, 0) / selectedChild.attendanceHistory.length)}% assiduité
              </span>
              <span className="text-slate-400 text-xs flex items-center gap-1">
                <User className="w-3 h-3" /> {selectedChild.weight}kg / {selectedChild.height}cm
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
              Autorisation Parentale
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          { key: 'overview', label: 'Vue d\'ensemble', icon: User },
          { key: 'attendance', label: 'Assiduité', icon: Activity },
          { key: 'payments', label: 'Paiements', icon: CreditCard },
          { key: 'events', label: 'Événements', icon: Calendar },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveSection(tab.key as typeof activeSection)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${activeSection === tab.key ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeSection === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Notifications */}
          <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5 text-amber-400" /> Notifications Récentes
            </h3>
            <div className="space-y-3">
              {getRecentNotifications().map(notif => (
                <div key={notif.id} className="flex items-start gap-3 bg-slate-700/30 rounded-lg p-3">
                  <span className="text-lg">{notif.icon}</span>
                  <div className="flex-1">
                    <p className="text-white text-sm">{notif.message}</p>
                    <p className="text-slate-500 text-xs mt-1">{notif.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-4">
            <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
              <h3 className="text-white font-semibold mb-3">Résumé du Mois</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-700/30 rounded-lg p-3 text-center">
                  <p className="text-slate-400 text-xs">Séances suivies</p>
                  <p className="text-white text-xl font-bold">12</p>
                </div>
                <div className="bg-slate-700/30 rounded-lg p-3 text-center">
                  <p className="text-slate-400 text-xs">Retards</p>
                  <p className="text-amber-400 text-xl font-bold">1</p>
                </div>
                <div className="bg-slate-700/30 rounded-lg p-3 text-center">
                  <p className="text-slate-400 text-xs">Prochain Grade</p>
                  <p className="text-emerald-400 text-sm font-bold">Ceinture suivante</p>
                </div>
                <div className="bg-slate-700/30 rounded-lg p-3 text-center">
                  <p className="text-slate-400 text-xs">Solde à payer</p>
                  <p className={`text-xl font-bold ${totalDue > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                    {totalDue > 0 ? `${totalDue.toLocaleString()} F` : 'Soldé ✓'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
              <h3 className="text-white font-semibold mb-3">Contact Rapide</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700 transition-colors">
                  <MessageCircle className="w-5 h-5 text-emerald-400" />
                  <div className="text-left">
                    <p className="text-white text-sm">Contacter le Coach</p>
                    <p className="text-slate-500 text-xs">WhatsApp / SMS</p>
                  </div>
                </button>
                <button className="w-full flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700 transition-colors">
                  <CreditCard className="w-5 h-5 text-amber-400" />
                  <div className="text-left">
                    <p className="text-white text-sm">Payer par Mobile Money</p>
                    <p className="text-slate-500 text-xs">Orange Money / MTN MoMo / Wave / Moov</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSection === 'attendance' && (
        <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
          <h3 className="text-white font-semibold mb-4">Historique d'Assiduité — 12 Mois</h3>
          <div className="flex items-end gap-2 h-48">
            {selectedChild.attendanceHistory.map((a, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-slate-400 text-xs">{a.rate}%</span>
                <div
                  className={`w-full rounded-t transition-all ${a.rate >= 80 ? 'bg-emerald-500' : a.rate >= 75 ? 'bg-amber-500' : 'bg-red-500'}`}
                  style={{ height: `${a.rate}%` }}
                ></div>
                <span className="text-slate-500 text-xs">{a.month}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1"><span className="w-3 h-1 bg-emerald-500 rounded"></span> ≥80% (Seuil grade)</span>
            <span className="flex items-center gap-1"><span className="w-3 h-1 bg-amber-500 rounded"></span> 75-79% (Limite)</span>
            <span className="flex items-center gap-1"><span className="w-3 h-1 bg-red-500 rounded"></span> &lt;75% (Insuffisant FITKD)</span>
          </div>

          <div className="mt-6">
            <h4 className="text-white font-semibold text-sm mb-3">Derniers Pointages</h4>
            <div className="space-y-2">
              {childAttendance.map(record => (
                <div key={record.id} className="flex items-center justify-between bg-slate-700/30 rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full ${record.status === 'present' ? 'bg-emerald-400' : record.status === 'late' ? 'bg-amber-400' : 'bg-red-400'}`}></span>
                    <div>
                      <p className="text-white text-sm">{new Date(record.date).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })}</p>
                      <p className="text-slate-500 text-xs">{record.time} • {record.method === 'qr' ? 'QR Code' : record.method === 'nfc' ? 'NFC' : 'Manuel'}</p>
                    </div>
                  </div>
                  <span className={`text-sm font-medium ${record.status === 'present' ? 'text-emerald-400' : record.status === 'late' ? 'text-amber-400' : 'text-red-400'}`}>
                    {record.status === 'present' ? '✓ Présent' : record.status === 'late' ? `⏰ Retard (${record.lateMinutes}min)` : '✗ Absent'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeSection === 'payments' && (
        <div className="space-y-4">
          {childPayments.map(payment => (
            <div key={payment.id} className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-white font-medium">{payment.description}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${payment.status === 'paid' ? 'bg-emerald-500/20 text-emerald-400' : new Date(payment.dueDate) < new Date() ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'}`}>
                  {payment.status === 'paid' ? 'Payé' : new Date(payment.dueDate) < new Date() ? 'En retard' : 'En cours'}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-3">
                <div className="text-center">
                  <p className="text-slate-400 text-xs">Total</p>
                  <p className="text-white font-bold">{payment.amount.toLocaleString()} F</p>
                </div>
                <div className="text-center">
                  <p className="text-emerald-400 text-xs">Payé</p>
                  <p className="text-emerald-400 font-bold">{payment.paidAmount.toLocaleString()} F</p>
                </div>
                <div className="text-center">
                  <p className="text-slate-400 text-xs">Restant</p>
                  <p className={`font-bold ${(payment.amount - payment.paidAmount) > 0 ? 'text-red-400' : 'text-slate-500'}`}>
                    {(payment.amount - payment.paidAmount).toLocaleString()} F
                  </p>
                </div>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${(payment.paidAmount / payment.amount) * 100}%` }}></div>
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className="text-slate-500 text-xs">Échéance: {new Date(payment.dueDate).toLocaleDateString('fr-FR')}</span>
                {(payment.amount - payment.paidAmount) > 0 && (
                  <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-lg text-xs transition-colors">
                    Payer maintenant
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeSection === 'events' && (
        <div className="space-y-4">
          {mockCompetitions.map(comp => {
            const isRegistered = comp.registeredAthletes.includes(selectedChild.id);
            const daysLeft = Math.ceil((new Date(comp.date).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
            return (
              <div key={comp.id} className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-white font-semibold">{comp.name}</h4>
                    <p className="text-slate-400 text-sm mt-1">📍 {comp.location}</p>
                    <p className="text-slate-400 text-sm">📅 {new Date(comp.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`px-2 py-0.5 rounded text-xs ${comp.type === 'national' ? 'bg-blue-500/20 text-blue-400' : comp.type === 'international' ? 'bg-purple-500/20 text-purple-400' : 'bg-amber-500/20 text-amber-400'}`}>
                        {comp.type === 'national' ? '🏛️ National' : comp.type === 'international' ? '🌍 International' : '📍 Régional'}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    {daysLeft > 0 ? (
                      <div className="bg-amber-500/20 rounded-lg p-2">
                        <p className="text-amber-400 text-2xl font-bold">{daysLeft}</p>
                        <p className="text-amber-400/70 text-xs">jours</p>
                      </div>
                    ) : (
                      <span className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded text-xs">Terminé</span>
                    )}
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-700 flex items-center justify-between">
                  <span className={`text-sm ${isRegistered ? 'text-emerald-400' : 'text-slate-400'}`}>
                    {isRegistered ? '✓ Votre enfant est inscrit(e)' : 'Inscription non effectuée'}
                  </span>
                  {!isRegistered && daysLeft > 0 && (
                    <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-lg text-xs transition-colors">
                      Inscrire
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
