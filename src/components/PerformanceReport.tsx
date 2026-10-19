import { useState } from 'react';
import { FileText, Download, Calendar, Users, TrendingUp, Award } from 'lucide-react';
import { mockMembers, mockPayments, mockAttendanceRecords } from '../data/mockData';
import { formatFCFA, calculateStatistics } from '../utils/storage';
import { exportToCSV } from '../utils/helpers';

export default function PerformanceReport() {
  const [period, setPeriod] = useState<'month' | 'quarter' | 'year'>('year');
  const [reportType, setReportType] = useState<'general' | 'attendance' | 'financial' | 'grading'>('general');

  const stats = calculateStatistics(mockMembers);

  const generateReport = () => {
    const reportData = [];

    if (reportType === 'general') {
      reportData.push(
        { section: 'STATISTIQUES GÉNÉRALES', indicateur: '', valeur: '' },
        { section: '', indicateur: 'Total licenciés', valeur: stats.total.toString() },
        { section: '', indicateur: 'Licenciés actifs', valeur: stats.active.toString() },
        { section: '', indicateur: 'Licenciés inactifs', valeur: stats.inactive.toString() },
        { section: '', indicateur: 'Taux d\'assiduité moyen', valeur: `${stats.avgAttendance}%` },
        { section: '', indicateur: '', valeur: '' },
        { section: 'RÉPARTITION PAR CEINTURE', indicateur: '', valeur: '' },
      );
      Object.entries(stats.beltDistribution).forEach(([belt, count]) => {
        reportData.push({ section: '', indicateur: belt, valeur: count.toString() });
      });
    }

    if (reportType === 'attendance') {
      reportData.push(
        { section: 'RAPPORT D\'ASSIDUITÉ', indicateur: '', valeur: '' },
        { section: '', indicateur: 'Taux moyen', valeur: `${stats.avgAttendance}%` },
        { section: '', indicateur: 'Seuil FITKD', valeur: '75%' },
        { section: '', indicateur: '', valeur: '' },
        { section: 'DÉTAIL PAR LICENCIÉ', indicateur: '', valeur: '' },
      );
      mockMembers.forEach(m => {
        const avg = m.attendanceHistory.reduce((s, a) => s + a.rate, 0) / m.attendanceHistory.length;
        reportData.push({
          section: '',
          indicateur: `${m.firstName} ${m.lastName}`,
          valeur: `${Math.round(avg)}%`
        });
      });
    }

    if (reportType === 'financial') {
      const totalRevenue = mockPayments.reduce((sum, p) => sum + p.paidAmount, 0);
      const totalExpected = mockPayments.reduce((sum, p) => sum + p.amount, 0);
      const collectionRate = Math.round((totalRevenue / totalExpected) * 100);

      reportData.push(
        { section: 'RAPPORT FINANCIER', indicateur: '', valeur: '' },
        { section: '', indicateur: 'Revenus totaux', valeur: formatFCFA(totalRevenue) },
        { section: '', indicateur: 'Montants attendus', valeur: formatFCFA(totalExpected) },
        { section: '', indicateur: 'Taux de recouvrement', valeur: `${collectionRate}%` },
        { section: '', indicateur: 'Impayés', valeur: formatFCFA(totalExpected - totalRevenue) },
        { section: '', indicateur: '', valeur: '' },
        { section: 'DÉTAIL PAR LICENCIÉ', indicateur: '', valeur: '' },
      );
      mockPayments.forEach(p => {
        const member = mockMembers.find(m => m.id === p.memberId);
        reportData.push({
          section: '',
          indicateur: `${member?.firstName} ${member?.lastName}`,
          valeur: `${p.paidAmount.toLocaleString()} / ${p.amount.toLocaleString()} FCFA`
        });
      });
    }

    if (reportType === 'grading') {
      reportData.push(
        { section: 'RAPPORT DES PASSAGES DE GRADE', indicateur: '', valeur: '' },
        { section: '', indicateur: 'Sessions organisées', valeur: '3' },
        { section: '', indicateur: 'Candidats présentés', valeur: '15' },
        { section: '', indicateur: 'Candidats admis', valeur: '12' },
        { section: '', indicateur: 'Taux de réussite', valeur: '80%' },
      );
    }

    return reportData;
  };

  const handleExport = () => {
    const reportData = generateReport();
    exportToCSV(reportData, `rapport_${reportType}_${period}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Rapport de Performance</h2>
          <p className="text-slate-400 text-sm">Génération de rapports détaillés pour l'académie</p>
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
            onClick={handleExport}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            Exporter PDF
          </button>
        </div>
      </div>

      {/* Report Type Selector */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <button
          onClick={() => setReportType('general')}
          className={`p-4 rounded-xl border-2 transition-all ${
            reportType === 'general'
              ? 'border-emerald-500 bg-emerald-500/10'
              : 'border-slate-700 hover:border-slate-500'
          }`}
        >
          <FileText className={`w-8 h-8 mx-auto mb-2 ${reportType === 'general' ? 'text-emerald-400' : 'text-slate-400'}`} />
          <p className={`text-center font-medium ${reportType === 'general' ? 'text-emerald-400' : 'text-white'}`}>
            Rapport Général
          </p>
          <p className="text-slate-500 text-xs text-center mt-1">Vue d'ensemble</p>
        </button>

        <button
          onClick={() => setReportType('attendance')}
          className={`p-4 rounded-xl border-2 transition-all ${
            reportType === 'attendance'
              ? 'border-emerald-500 bg-emerald-500/10'
              : 'border-slate-700 hover:border-slate-500'
          }`}
        >
          <Users className={`w-8 h-8 mx-auto mb-2 ${reportType === 'attendance' ? 'text-emerald-400' : 'text-slate-400'}`} />
          <p className={`text-center font-medium ${reportType === 'attendance' ? 'text-emerald-400' : 'text-white'}`}>
            Rapport Assiduité
          </p>
          <p className="text-slate-500 text-xs text-center mt-1">Présences & retards</p>
        </button>

        <button
          onClick={() => setReportType('financial')}
          className={`p-4 rounded-xl border-2 transition-all ${
            reportType === 'financial'
              ? 'border-emerald-500 bg-emerald-500/10'
              : 'border-slate-700 hover:border-slate-500'
          }`}
        >
          <TrendingUp className={`w-8 h-8 mx-auto mb-2 ${reportType === 'financial' ? 'text-emerald-400' : 'text-slate-400'}`} />
          <p className={`text-center font-medium ${reportType === 'financial' ? 'text-emerald-400' : 'text-white'}`}>
            Rapport Financier
          </p>
          <p className="text-slate-500 text-xs text-center mt-1">Revenus & paiements</p>
        </button>

        <button
          onClick={() => setReportType('grading')}
          className={`p-4 rounded-xl border-2 transition-all ${
            reportType === 'grading'
              ? 'border-emerald-500 bg-emerald-500/10'
              : 'border-slate-700 hover:border-slate-500'
          }`}
        >
          <Award className={`w-8 h-8 mx-auto mb-2 ${reportType === 'grading' ? 'text-emerald-400' : 'text-slate-400'}`} />
          <p className={`text-center font-medium ${reportType === 'grading' ? 'text-emerald-400' : 'text-white'}`}>
            Rapport Grades
          </p>
          <p className="text-slate-500 text-xs text-center mt-1">Passages de grade</p>
        </button>
      </div>

      {/* Report Preview */}
      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold text-lg">Aperçu du Rapport</h3>
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <Calendar className="w-4 h-4" />
            <span>Période: {period === 'month' ? 'Ce mois' : period === 'quarter' ? 'Ce trimestre' : 'Cette année'}</span>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 max-h-96 overflow-y-auto">
          <table className="w-full">
            <tbody>
              {generateReport().map((row, idx) => (
                <tr key={idx} className={row.section ? 'border-t border-slate-700' : ''}>
                  {row.section && (
                    <td colSpan={2} className="py-2 text-emerald-400 font-semibold text-sm">
                      {row.section}
                    </td>
                  )}
                  {row.indicateur && (
                    <>
                      <td className="py-1 text-slate-300 text-sm">{row.indicateur}</td>
                      <td className="py-1 text-white text-sm font-medium text-right">{row.valeur}</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-slate-500 text-xs">
            Rapport généré le {new Date().toLocaleDateString('fr-FR')} à {new Date().toLocaleTimeString('fr-FR')}
          </p>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
          >
            <Download className="w-4 h-4" />
            Télécharger le rapport complet
          </button>
        </div>
      </div>
    </div>
  );
}
