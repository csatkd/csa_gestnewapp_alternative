import { useState } from 'react';
import { QrCode, Clock, CheckCircle, XCircle, AlertCircle, UserCheck, FileText, Download, Monitor } from 'lucide-react';
import { mockMembers, mockAttendanceRecords } from '../data/mockData';
import { AttendanceStatus } from '../types';
import { generateAttendanceSheetPDF } from '../utils/pdfGenerators';
import { exportToCSV } from '../utils/helpers';
import KioskMode from './KioskMode';

export default function AttendanceView() {
  const [selectedDate, setSelectedDate] = useState('2024-12-15');
  const [sessionType, setSessionType] = useState('training');
  const [pointingMethod, setPointingMethod] = useState<'qr' | 'nfc' | 'manual'>('manual');
  const [showKiosk, setShowKiosk] = useState(false);

  const todayRecords = mockAttendanceRecords.filter(r => r.date === selectedDate);
  
  const stats = {
    total: mockMembers.length,
    present: todayRecords.filter(r => r.status === 'present').length,
    late: todayRecords.filter(r => r.status === 'late').length,
    excused: todayRecords.filter(r => r.status === 'excused').length,
    absent: todayRecords.filter(r => r.status === 'absent').length,
    rate: Math.round((todayRecords.filter(r => r.status === 'present' || r.status === 'late').length / mockMembers.length) * 100),
  };

  const getStatusIcon = (status: AttendanceStatus) => {
    switch (status) {
      case 'present': return <CheckCircle className="w-5 h-5 text-emerald-400" />;
      case 'late': return <Clock className="w-5 h-5 text-amber-400" />;
      case 'excused': return <AlertCircle className="w-5 h-5 text-blue-400" />;
      case 'absent': return <XCircle className="w-5 h-5 text-red-400" />;
    }
  };

  const getStatusBadge = (status: AttendanceStatus) => {
    const styles: Record<AttendanceStatus, string> = {
      present: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      late: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      excused: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      absent: 'bg-red-500/20 text-red-400 border-red-500/30',
    };
    const labels: Record<AttendanceStatus, string> = {
      present: 'Présent', late: 'En Retard', excused: 'Excusé', absent: 'Absent',
    };
    return <span className={`px-2 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>{labels[status]}</span>;
  };

  if (showKiosk) {
    return <KioskMode />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Pointage Dojang</h2>
          <p className="text-slate-400 text-sm">Séance du {new Date(selectedDate).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
          />
          <select
            value={sessionType}
            onChange={(e) => setSessionType(e.target.value)}
            className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="training">Entraînement</option>
            <option value="grading">Passage de Grade</option>
            <option value="competition">Compétition</option>
            <option value="special">Séance Spéciale</option>
          </select>
          <button
            onClick={() => setShowKiosk(true)}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
            title="Mode Borne de Pointage"
          >
            <Monitor className="w-4 h-4" />
            <span className="hidden md:inline">Mode Kiosk</span>
          </button>
        </div>
      </div>

      {/* Pointing Method Selector */}
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <h3 className="text-white font-semibold mb-3">Méthode de Pointage</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            onClick={() => setPointingMethod('qr')}
            className={`p-4 rounded-lg border-2 transition-all flex items-center gap-3 ${pointingMethod === 'qr' ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-700 hover:border-slate-500'}`}
          >
            <QrCode className={`w-8 h-8 ${pointingMethod === 'qr' ? 'text-emerald-400' : 'text-slate-400'}`} />
            <div className="text-left">
              <p className={`font-medium ${pointingMethod === 'qr' ? 'text-emerald-400' : 'text-white'}`}>Scan QR Code</p>
              <p className="text-slate-500 text-xs">Caméra du badge licencié</p>
            </div>
          </button>
          <button
            onClick={() => setPointingMethod('nfc')}
            className={`p-4 rounded-lg border-2 transition-all flex items-center gap-3 ${pointingMethod === 'nfc' ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-700 hover:border-slate-500'}`}
          >
            <UserCheck className={`w-8 h-8 ${pointingMethod === 'nfc' ? 'text-emerald-400' : 'text-slate-400'}`} />
            <div className="text-left">
              <p className={`font-medium ${pointingMethod === 'nfc' ? 'text-emerald-400' : 'text-white'}`}>Borne Kiosk NFC</p>
              <p className="text-slate-500 text-xs">Badge sans contact</p>
            </div>
          </button>
          <button
            onClick={() => setPointingMethod('manual')}
            className={`p-4 rounded-lg border-2 transition-all flex items-center gap-3 ${pointingMethod === 'manual' ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-700 hover:border-slate-500'}`}
          >
            <CheckCircle className={`w-8 h-8 ${pointingMethod === 'manual' ? 'text-emerald-400' : 'text-slate-400'}`} />
            <div className="text-left">
              <p className={`font-medium ${pointingMethod === 'manual' ? 'text-emerald-400' : 'text-white'}`}>Appel Manuel</p>
              <p className="text-slate-500 text-xs">Par l'entraîneur</p>
            </div>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 text-center">
          <p className="text-slate-400 text-xs">Convoqués</p>
          <p className="text-2xl font-bold text-white">{stats.total}</p>
        </div>
        <div className="bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/30 text-center">
          <p className="text-emerald-400 text-xs">Présents</p>
          <p className="text-2xl font-bold text-emerald-400">{stats.present}</p>
        </div>
        <div className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30 text-center">
          <p className="text-amber-400 text-xs">Retards</p>
          <p className="text-2xl font-bold text-amber-400">{stats.late}</p>
        </div>
        <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/30 text-center">
          <p className="text-red-400 text-xs">Absents</p>
          <p className="text-2xl font-bold text-red-400">{stats.absent}</p>
        </div>
        <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30 text-center">
          <p className="text-blue-400 text-xs">Taux Assiduité</p>
          <p className={`text-2xl font-bold ${stats.rate >= 80 ? 'text-emerald-400' : stats.rate >= 75 ? 'text-amber-400' : 'text-red-400'}`}>{stats.rate}%</p>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
        <div className="p-4 border-b border-slate-700 flex items-center justify-between">
          <h3 className="text-white font-semibold">Feuille d'Émargement</h3>
          <span className="text-slate-400 text-sm">{todayRecords.length} pointage(s) enregistré(s)</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left px-4 py-3 text-slate-400 text-xs font-medium uppercase">Licencié</th>
                <th className="text-left px-4 py-3 text-slate-400 text-xs font-medium uppercase">N° Licence</th>
                <th className="text-left px-4 py-3 text-slate-400 text-xs font-medium uppercase">Heure</th>
                <th className="text-left px-4 py-3 text-slate-400 text-xs font-medium uppercase">Méthode</th>
                <th className="text-left px-4 py-3 text-slate-400 text-xs font-medium uppercase">Statut</th>
                <th className="text-left px-4 py-3 text-slate-400 text-xs font-medium uppercase">Détails</th>
              </tr>
            </thead>
            <tbody>
              {mockMembers.map(member => {
                const record = todayRecords.find(r => r.memberId === member.id);
                return (
                  <tr key={member.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(record?.status || 'absent')}
                        <span className="text-white text-sm">{member.firstName} {member.lastName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-400 text-sm">{member.licenseNumber}</td>
                    <td className="px-4 py-3 text-slate-400 text-sm">{record?.time || '--:--'}</td>
                    <td className="px-4 py-3">
                      <span className="text-slate-400 text-sm">
                        {record?.method === 'qr' ? '📱 QR' : record?.method === 'nfc' ? '📡 NFC' : '✋ Manuel'}
                      </span>
                    </td>
                    <td className="px-4 py-3">{record ? getStatusBadge(record.status) : getStatusBadge('absent')}</td>
                    <td className="px-4 py-3 text-slate-400 text-sm">
                      {record?.status === 'late' ? `${record.lateMinutes} min de retard` : record?.status === 'excused' ? record.excuseReason : '-'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Benchmarks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <h4 className="text-white font-semibold mb-3">Benchmarks d'Assiduité</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-sm">Moyenne Dojang</span>
              <div className="flex items-center gap-2">
                <div className="w-32 bg-slate-700 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <span className="text-emerald-400 font-medium text-sm">85%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-sm">Seuil FITKD (minimum)</span>
              <div className="flex items-center gap-2">
                <div className="w-32 bg-slate-700 rounded-full h-2">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <span className="text-amber-400 font-medium text-sm">75%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-sm">Objectif Club</span>
              <div className="flex items-center gap-2">
                <div className="w-32 bg-slate-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                </div>
                <span className="text-blue-400 font-medium text-sm">90%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-sm">Séance actuelle</span>
              <div className="flex items-center gap-2">
                <div className="w-32 bg-slate-700 rounded-full h-2">
                  <div className={`h-2 rounded-full ${stats.rate >= 80 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${stats.rate}%` }}></div>
                </div>
                <span className={`font-medium text-sm ${stats.rate >= 80 ? 'text-emerald-400' : 'text-amber-400'}`}>{stats.rate}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <h4 className="text-white font-semibold mb-3">Actions Rapides</h4>
          <div className="space-y-2">
            <button className="w-full text-left px-4 py-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors flex items-center gap-3">
              <QrCode className="w-5 h-5 text-emerald-400" />
              <div>
                <p className="text-white text-sm">Lancer le Scanner QR</p>
                <p className="text-slate-500 text-xs">Ouvrir la caméra pour scanner les badges</p>
              </div>
            </button>
            <button
              onClick={() => {
                const records = mockMembers.map(m => {
                  const record = todayRecords.find(r => r.memberId === m.id);
                  return {
                    member: m,
                    status: record?.status || 'absent',
                    time: record?.time || '--:--',
                    method: record?.method === 'qr' ? 'QR Code' : record?.method === 'nfc' ? 'NFC' : 'Manuel',
                  };
                });
                generateAttendanceSheetPDF(selectedDate, records);
              }}
              className="w-full text-left px-4 py-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors flex items-center gap-3"
            >
              <FileText className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-white text-sm">Générer Feuille d'Émargement PDF</p>
                <p className="text-slate-500 text-xs">Document officiel A4 pour archivage</p>
              </div>
            </button>
            <button
              onClick={() => {
                exportToCSV(mockMembers.map(m => {
                  const record = todayRecords.find(r => r.memberId === m.id);
                  return {
                    licence: m.licenseNumber,
                    nom: `${m.firstName} ${m.lastName}`,
                    heure: record?.time || '--',
                    statut: record?.status || 'absent',
                    methode: record?.method || 'manuel',
                  };
                }), `pointage_${selectedDate}`);
              }}
              className="w-full text-left px-4 py-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors flex items-center gap-3"
            >
              <Download className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-white text-sm">Exporter en CSV</p>
                <p className="text-slate-500 text-xs">Données brutes pour traitement</p>
              </div>
            </button>
            <button
              onClick={() => {
                const absentMembers = mockMembers.filter(m => {
                  const record = todayRecords.find(r => r.memberId === m.id);
                  return !record || record.status === 'absent';
                });
                if (absentMembers.length > 0) {
                  const names = absentMembers.map(m => `${m.firstName} ${m.lastName}`).join(', ');
                  alert(`Notification envoyée aux parents de:\n${names}\n\nMessage: "Votre enfant est absent(e) de la séance d'aujourd'hui. Merci de contacter le Dojang."`);
                } else {
                  alert('Tous les licenciés sont présents !');
                }
              }}
              className="w-full text-left px-4 py-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors flex items-center gap-3"
            >
              <AlertCircle className="w-5 h-5 text-amber-400" />
              <div>
                <p className="text-white text-sm">Notifier les Absents</p>
                <p className="text-slate-500 text-xs">Envoyer SMS/WhatsApp aux parents</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
