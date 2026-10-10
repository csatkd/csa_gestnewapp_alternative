import { useState } from 'react';
import { Calendar, Award, CheckCircle, XCircle, Users, Star } from 'lucide-react';
import { mockMembers, mockGradingSessions, mockGradingResults } from '../data/mockData';

export default function GradingView() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'results'>('upcoming');
  const [showExamModal, setShowExamModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState(mockGradingSessions[0]);

  const [scores, setScores] = useState({ poomsae: 0, kyorugi: 0, kyokpa: 0, hosinsul: 0, attitude: 0 });
  const totalScore = Object.values(scores).reduce((s, v) => s + v, 0);
  const passed = totalScore >= 70;

  const getMemberEligibility = (memberId: string) => {
    const member = mockMembers.find(m => m.id === memberId);
    if (!member) return { eligible: false, reason: 'Membre non trouvé' };
    const avgAttendance = Math.round(member.attendanceHistory.reduce((s, a) => s + a.rate, 0) / member.attendanceHistory.length);
    if (avgAttendance < 75) return { eligible: false, reason: `Assiduité insuffisante (${avgAttendance}% < 75%)` };
    return { eligible: true, reason: `Assiduité OK (${avgAttendance}%)` };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Passages de Grade</h2>
          <p className="text-slate-400 text-sm">Gestion des sessions d'examen Kukkiwon / FITKD</p>
        </div>
        <button className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-colors">
          <Calendar className="w-4 h-4" />
          Nouvelle Session
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'upcoming' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}
        >
          Sessions à Venir
        </button>
        <button
          onClick={() => setActiveTab('results')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'results' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}
        >
          Résultats & Historique
        </button>
      </div>

      {activeTab === 'upcoming' && (
        <div className="space-y-4">
          {mockGradingSessions.filter(s => s.status === 'upcoming').map(session => (
            <div key={session.id} className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-white font-semibold text-lg flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-400" />
                    Session du {new Date(session.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                  </h3>
                  <p className="text-slate-400 text-sm mt-1">📍 {session.location} • 🕐 {session.time}</p>
                  {session.examiner && <p className="text-slate-500 text-xs mt-1">Examinateur: {session.examiner}</p>}
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-slate-400 text-xs">Candidats</p>
                    <p className="text-white font-bold">{session.registeredCandidates.length}/{session.maxCandidates}</p>
                  </div>
                  <div className="w-24 bg-slate-700 rounded-full h-2">
                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${(session.registeredCandidates.length / session.maxCandidates) * 100}%` }}></div>
                  </div>
                  <button
                    onClick={() => { setSelectedSession(session); setShowExamModal(true); }}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    Ouvrir Session
                  </button>
                </div>
              </div>

              {/* Candidates List */}
              {session.registeredCandidates.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-700">
                  <h4 className="text-slate-300 text-sm font-medium mb-3">Candidats Inscrits</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {session.registeredCandidates.map(candId => {
                      const member = mockMembers.find(m => m.id === candId);
                      const eligibility = getMemberEligibility(candId);
                      if (!member) return null;
                      return (
                        <div key={candId} className={`flex items-center gap-3 p-2 rounded-lg ${eligibility.eligible ? 'bg-emerald-500/5 border border-emerald-500/20' : 'bg-red-500/5 border border-red-500/20'}`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${member.beltColor === 'white' ? 'bg-white text-gray-800' : 'bg-slate-600 text-white'}`}>
                            {member.firstName[0]}{member.lastName[0]}
                          </div>
                          <div className="flex-1">
                            <p className="text-white text-sm">{member.firstName} {member.lastName}</p>
                            <p className={`text-xs ${eligibility.eligible ? 'text-emerald-400' : 'text-red-400'}`}>
                              {eligibility.eligible ? '✓ Éligible' : `✗ ${eligibility.reason}`}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'results' && (
        <div className="space-y-4">
          {mockGradingSessions.filter(s => s.status === 'completed').map(session => (
            <div key={session.id} className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                Session du {new Date(session.date).toLocaleDateString('fr-FR')} — Terminée
              </h3>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left px-3 py-2 text-slate-400 text-xs">Candidat</th>
                      <th className="text-center px-3 py-2 text-slate-400 text-xs">Poomsae /20</th>
                      <th className="text-center px-3 py-2 text-slate-400 text-xs">Kyorugi /20</th>
                      <th className="text-center px-3 py-2 text-slate-400 text-xs">Kyokpa /20</th>
                      <th className="text-center px-3 py-2 text-slate-400 text-xs">Hosinsul /20</th>
                      <th className="text-center px-3 py-2 text-slate-400 text-xs">Attitude /20</th>
                      <th className="text-center px-3 py-2 text-slate-400 text-xs">Total /100</th>
                      <th className="text-center px-3 py-2 text-slate-400 text-xs">Verdict</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockGradingResults.filter(r => r.sessionId === session.id).map(result => {
                      const member = mockMembers.find(m => m.id === result.memberId);
                      return (
                        <tr key={result.memberId} className="border-b border-slate-700/50">
                          <td className="px-3 py-3 text-white text-sm">{member?.firstName} {member?.lastName}</td>
                          <td className="text-center px-3 py-3 text-slate-300 text-sm">{result.poomsae}</td>
                          <td className="text-center px-3 py-3 text-slate-300 text-sm">{result.kyorugi}</td>
                          <td className="text-center px-3 py-3 text-slate-300 text-sm">{result.kyokpa}</td>
                          <td className="text-center px-3 py-3 text-slate-300 text-sm">{result.hosinsul}</td>
                          <td className="text-center px-3 py-3 text-slate-300 text-sm">{result.attitude}</td>
                          <td className="text-center px-3 py-3">
                            <span className={`font-bold ${result.total >= 70 ? 'text-emerald-400' : 'text-red-400'}`}>{result.total}</span>
                          </td>
                          <td className="text-center px-3 py-3">
                            {result.passed ? (
                              <span className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 justify-center">
                                <Star className="w-3 h-3" /> ADMIS
                              </span>
                            ) : (
                              <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 justify-center">
                                <XCircle className="w-3 h-3" /> REFUSÉ
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Exam Modal */}
      {showExamModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowExamModal(false)}>
          <div className="bg-slate-800 rounded-2xl border border-slate-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-slate-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Notation Officielle — Examen de Grade</h2>
                <button onClick={() => setShowExamModal(false)} className="text-slate-400 hover:text-white text-2xl">&times;</button>
              </div>
              <p className="text-slate-400 text-sm mt-1">Session du {new Date(selectedSession.date).toLocaleDateString('fr-FR')}</p>
            </div>

            <div className="p-6 space-y-6">
              {/* Candidate Selector */}
              <div>
                <label className="text-slate-300 text-sm font-medium block mb-2">Candidat à évaluer</label>
                <select className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500">
                  {selectedSession.registeredCandidates.map(candId => {
                    const member = mockMembers.find(m => m.id === candId);
                    return <option key={candId} value={candId}>{member?.firstName} {member?.lastName}</option>;
                  })}
                </select>
              </div>

              {/* Scoring Grid */}
              <div className="space-y-4">
                <h4 className="text-emerald-400 font-semibold text-sm">Barème Technique WT — /100 points</h4>
                
                {[
                  { key: 'poomsae', label: 'Poomsae (Formes)', desc: 'Exécution technique des formes' },
                  { key: 'kyorugi', label: 'Kyorugi (Combat)', desc: 'Application en situation de combat' },
                  { key: 'kyokpa', label: 'Kyokpa (Casse)', desc: 'Démonstration de puissance' },
                  { key: 'hosinsul', label: 'Hosinsul (Self-Défense)', desc: 'Techniques de défense personnelle' },
                  { key: 'attitude', label: 'Attitude & Terminologie', desc: 'Étiquette martiale et coréen' },
                ].map(criterion => (
                  <div key={criterion.key} className="bg-slate-700/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="text-white text-sm font-medium">{criterion.label}</p>
                        <p className="text-slate-500 text-xs">{criterion.desc}</p>
                      </div>
                      <span className="text-slate-400 text-xs">/20</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="20"
                      value={scores[criterion.key as keyof typeof scores]}
                      onChange={(e) => setScores({ ...scores, [criterion.key]: parseInt(e.target.value) })}
                      className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                    <div className="flex justify-between mt-1">
                      <span className="text-slate-500 text-xs">0</span>
                      <span className="text-emerald-400 font-bold text-sm">{scores[criterion.key as keyof typeof scores]}/20</span>
                      <span className="text-slate-500 text-xs">20</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Score */}
              <div className={`rounded-xl p-5 border-2 text-center ${passed ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                <p className="text-slate-400 text-sm">Score Total</p>
                <p className={`text-5xl font-bold ${passed ? 'text-emerald-400' : 'text-red-400'}`}>{totalScore}<span className="text-2xl text-slate-500">/100</span></p>
                <p className={`text-sm mt-2 font-medium ${passed ? 'text-emerald-400' : 'text-red-400'}`}>
                  {passed ? '✓ ADMIS — Seuil de 70 points atteint' : '✗ NON ADMIS — Seuil de 70 points non atteint'}
                </p>
              </div>

              {/* Comments */}
              <div>
                <label className="text-slate-300 text-sm font-medium block mb-2">Commentaires du Jury</label>
                <textarea
                  rows={3}
                  placeholder="Observations du jury..."
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 resize-none"
                ></textarea>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowExamModal(false)}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  {passed ? '🎉 Valider & Célébrer' : 'Enregistrer le Résultat'}
                </button>
                <button
                  onClick={() => setShowExamModal(false)}
                  className="px-6 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
