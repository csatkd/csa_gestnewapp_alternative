import { useState } from 'react';
import { Star, MessageSquare, ThumbsUp, ThumbsDown, TrendingUp, Users, Award, Calendar } from 'lucide-react';

interface Feedback {
  id: string;
  type: 'coach_to_student' | 'student_to_coach' | 'parent_to_coach';
  from: string;
  fromName: string;
  to: string;
  toName: string;
  rating: number;
  comment: string;
  date: string;
  category: string;
  anonymous: boolean;
}

interface CoachRating {
  coachId: string;
  coachName: string;
  averageRating: number;
  totalReviews: number;
  categories: {
    pedagogy: number;
    punctuality: number;
    communication: number;
    expertise: number;
  };
  recentFeedback: Feedback[];
}

const mockFeedback: Feedback[] = [
  {
    id: 'F001',
    type: 'parent_to_coach',
    from: 'M001',
    fromName: 'Kouassi Jean',
    to: 'C001',
    toName: 'Maître Koné',
    rating: 5,
    comment: 'Excellent professeur, très pédagogue et patient. Ma fille progresse rapidement grâce à lui.',
    date: '2024-12-10',
    category: 'pédagogie',
    anonymous: false
  },
  {
    id: 'F002',
    type: 'student_to_coach',
    from: 'M002',
    fromName: 'Traoré Moussa',
    to: 'C002',
    toName: 'Coach Traoré',
    rating: 4,
    comment: 'Très bon coach, les entraînements sont intenses mais efficaces. J\'ai beaucoup progressé en combat.',
    date: '2024-12-08',
    category: 'expertise',
    anonymous: false
  },
  {
    id: 'F003',
    type: 'coach_to_student',
    from: 'C001',
    fromName: 'Maître Koné',
    to: 'M001',
    toName: 'Kouassi Aya Marie',
    rating: 5,
    comment: 'Élève très motivée et assidue. Excellente progression technique. Continue comme ça !',
    date: '2024-12-12',
    category: 'progression',
    anonymous: false
  },
  {
    id: 'F004',
    type: 'parent_to_coach',
    from: 'M003',
    fromName: 'Bamba Ibrahim',
    to: 'C003',
    toName: 'Coach Diallo',
    rating: 4,
    comment: 'Très bon avec les enfants, sait les motiver. Ma fille adore ses cours.',
    date: '2024-12-05',
    category: 'pédagogie',
    anonymous: false
  },
  {
    id: 'F005',
    type: 'student_to_coach',
    from: 'M004',
    fromName: 'Koné Ibrahim',
    to: 'C001',
    toName: 'Maître Koné',
    rating: 5,
    comment: 'Le meilleur maître que j\'ai eu. Sa connaissance du Taekwondo est impressionnante.',
    date: '2024-12-14',
    category: 'expertise',
    anonymous: false
  }
];

const mockCoachRatings: CoachRating[] = [
  {
    coachId: 'C001',
    coachName: 'Maître Koné Ibrahim',
    averageRating: 4.8,
    totalReviews: 24,
    categories: {
      pedagogy: 4.9,
      punctuality: 4.8,
      communication: 4.7,
      expertise: 5.0
    },
    recentFeedback: mockFeedback.filter(f => f.to === 'C001')
  },
  {
    coachId: 'C002',
    coachName: 'Coach Traoré Moussa',
    averageRating: 4.6,
    totalReviews: 18,
    categories: {
      pedagogy: 4.5,
      punctuality: 4.7,
      communication: 4.6,
      expertise: 4.8
    },
    recentFeedback: mockFeedback.filter(f => f.to === 'C002')
  },
  {
    coachId: 'C003',
    coachName: 'Coach Diallo Aminata',
    averageRating: 4.7,
    totalReviews: 20,
    categories: {
      pedagogy: 4.9,
      punctuality: 4.6,
      communication: 4.7,
      expertise: 4.5
    },
    recentFeedback: mockFeedback.filter(f => f.to === 'C003')
  },
  {
    coachId: 'C004',
    coachName: 'Coach Bamba Fatoumata',
    averageRating: 4.5,
    totalReviews: 15,
    categories: {
      pedagogy: 4.4,
      punctuality: 4.5,
      communication: 4.6,
      expertise: 4.7
    },
    recentFeedback: []
  }
];

export default function FeedbackSystem() {
  const [activeTab, setActiveTab] = useState<'ratings' | 'feedback' | 'submit'>('ratings');
  const [selectedCoach, setSelectedCoach] = useState<CoachRating | null>(null);
  const [feedbackFilter, setFeedbackFilter] = useState<string>('all');

  const filteredFeedback = mockFeedback.filter(f => {
    if (feedbackFilter === 'all') return true;
    return f.type === feedbackFilter;
  });

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClass = size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-4 h-4' : 'w-5 h-5';
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map(star => (
          <Star
            key={star}
            className={`${sizeClass} ${star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'}`}
          />
        ))}
      </div>
    );
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'coach_to_student': return 'Coach → Élève';
      case 'student_to_coach': return 'Élève → Coach';
      case 'parent_to_coach': return 'Parent → Coach';
      default: return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'coach_to_student': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'student_to_coach': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'parent_to_coach': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Système de Feedback</h2>
          <p className="text-slate-400 text-sm">Évaluations et retours d'expérience</p>
        </div>
        <button
          onClick={() => setActiveTab('submit')}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <MessageSquare className="w-4 h-4" />
          Donner un Feedback
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 rounded-xl p-5 border border-yellow-500/20">
          <div className="flex items-center justify-between mb-3">
            <Star className="w-8 h-8 text-yellow-400" />
            <span className="text-yellow-400 text-xs font-medium bg-yellow-500/20 px-2 py-1 rounded">Moyenne</span>
          </div>
          <p className="text-slate-400 text-sm">Note Globale</p>
          <p className="text-3xl font-bold text-white mt-1">4.6/5</p>
        </div>

        <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 rounded-xl p-5 border border-emerald-500/20">
          <div className="flex items-center justify-between mb-3">
            <MessageSquare className="w-8 h-8 text-emerald-400" />
            <span className="text-emerald-400 text-xs font-medium bg-emerald-500/20 px-2 py-1 rounded">Total</span>
          </div>
          <p className="text-slate-400 text-sm">Feedbacks Reçus</p>
          <p className="text-3xl font-bold text-white mt-1">{mockFeedback.length}</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-xl p-5 border border-blue-500/20">
          <div className="flex items-center justify-between mb-3">
            <Users className="w-8 h-8 text-blue-400" />
            <span className="text-blue-400 text-xs font-medium bg-blue-500/20 px-2 py-1 rounded">Coachs</span>
          </div>
          <p className="text-slate-400 text-sm">Coachs Évalués</p>
          <p className="text-3xl font-bold text-white mt-1">{mockCoachRatings.length}</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-xl p-5 border border-purple-500/20">
          <div className="flex items-center justify-between mb-3">
            <TrendingUp className="w-8 h-8 text-purple-400" />
            <span className="text-purple-400 text-xs font-medium bg-purple-500/20 px-2 py-1 rounded">Tendance</span>
          </div>
          <p className="text-slate-400 text-sm">Satisfaction</p>
          <p className="text-3xl font-bold text-emerald-400 mt-1">+12%</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('ratings')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'ratings'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'bg-slate-800 text-slate-400 border border-slate-700'
          }`}
        >
          <Award className="w-4 h-4 inline mr-2" />
          Classement Coachs
        </button>
        <button
          onClick={() => setActiveTab('feedback')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'feedback'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'bg-slate-800 text-slate-400 border border-slate-700'
          }`}
        >
          <MessageSquare className="w-4 h-4 inline mr-2" />
          Tous les Feedbacks
        </button>
        <button
          onClick={() => setActiveTab('submit')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'submit'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'bg-slate-800 text-slate-400 border border-slate-700'
          }`}
        >
          <ThumbsUp className="w-4 h-4 inline mr-2" />
          Soumettre
        </button>
      </div>

      {/* Ratings Tab */}
      {activeTab === 'ratings' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockCoachRatings
            .sort((a, b) => b.averageRating - a.averageRating)
            .map((coach, index) => (
              <div
                key={coach.coachId}
                className="bg-slate-800/50 rounded-xl p-5 border border-slate-700 hover:border-emerald-500/30 transition-all cursor-pointer"
                onClick={() => setSelectedCoach(coach)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white font-bold text-lg">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{coach.coachName}</h3>
                      <p className="text-slate-400 text-sm">{coach.totalReviews} évaluations</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-yellow-400">{coach.averageRating}</p>
                    {renderStars(Math.round(coach.averageRating), 'sm')}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-sm">Pédagogie</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-slate-700 rounded-full h-2">
                        <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${(coach.categories.pedagogy / 5) * 100}%` }}></div>
                      </div>
                      <span className="text-white text-sm font-medium">{coach.categories.pedagogy}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-sm">Ponctualité</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-slate-700 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(coach.categories.punctuality / 5) * 100}%` }}></div>
                      </div>
                      <span className="text-white text-sm font-medium">{coach.categories.punctuality}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-sm">Communication</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-slate-700 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${(coach.categories.communication / 5) * 100}%` }}></div>
                      </div>
                      <span className="text-white text-sm font-medium">{coach.categories.communication}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-sm">Expertise</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-slate-700 rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${(coach.categories.expertise / 5) * 100}%` }}></div>
                      </div>
                      <span className="text-white text-sm font-medium">{coach.categories.expertise}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Feedback Tab */}
      {activeTab === 'feedback' && (
        <>
          <div className="flex gap-2">
            <button
              onClick={() => setFeedbackFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                feedbackFilter === 'all'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              Tous
            </button>
            <button
              onClick={() => setFeedbackFilter('parent_to_coach')}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                feedbackFilter === 'parent_to_coach'
                  ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              Parents → Coachs
            </button>
            <button
              onClick={() => setFeedbackFilter('student_to_coach')}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                feedbackFilter === 'student_to_coach'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              Élèves → Coachs
            </button>
            <button
              onClick={() => setFeedbackFilter('coach_to_student')}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                feedbackFilter === 'coach_to_student'
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              Coachs → Élèves
            </button>
          </div>

          <div className="space-y-4">
            {filteredFeedback.map(feedback => (
              <div key={feedback.id} className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold">
                      {feedback.fromName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white font-medium">{feedback.fromName}</p>
                      <p className="text-slate-400 text-xs">
                        {getTypeLabel(feedback.type)} • {new Date(feedback.date).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {renderStars(feedback.rating)}
                    <span className={`px-2 py-1 rounded text-xs border ${getTypeColor(feedback.type)}`}>
                      {getTypeLabel(feedback.type)}
                    </span>
                  </div>
                </div>
                <div className="mb-2">
                  <p className="text-slate-400 text-xs">→ {feedback.toName}</p>
                </div>
                <p className="text-slate-300 text-sm">{feedback.comment}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Submit Tab */}
      {activeTab === 'submit' && (
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <h3 className="text-white font-semibold mb-4">Soumettre un Feedback</h3>
          <div className="space-y-4">
            <div>
              <label className="text-slate-300 text-sm block mb-2">Type de feedback</label>
              <select className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500">
                <option value="">Sélectionner</option>
                <option value="parent_to_coach">Parent → Coach</option>
                <option value="student_to_coach">Élève → Coach</option>
                <option value="coach_to_student">Coach → Élève</option>
              </select>
            </div>
            <div>
              <label className="text-slate-300 text-sm block mb-2">Destinataire</label>
              <select className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500">
                <option value="">Sélectionner</option>
                {mockCoachRatings.map(coach => (
                  <option key={coach.coachId} value={coach.coachId}>{coach.coachName}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-slate-300 text-sm block mb-2">Note</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button key={star} className="text-slate-600 hover:text-yellow-400 transition-colors">
                    <Star className="w-8 h-8" />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-slate-300 text-sm block mb-2">Commentaire</label>
              <textarea
                rows={4}
                placeholder="Votre feedback..."
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 resize-none"
              ></textarea>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="anonymous" className="rounded" />
              <label htmlFor="anonymous" className="text-slate-300 text-sm">Envoyer anonymement</label>
            </div>
            <button className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-medium transition-colors">
              <ThumbsUp className="w-5 h-5" />
              Soumettre le Feedback
            </button>
          </div>
        </div>
      )}

      {/* Coach Detail Modal */}
      {selectedCoach && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedCoach(null)}>
          <div className="bg-slate-800 rounded-2xl border border-slate-700 max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-slate-700">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedCoach.coachName}</h2>
                  <p className="text-slate-400 mt-1">{selectedCoach.totalReviews} évaluations • Note moyenne: {selectedCoach.averageRating}/5</p>
                </div>
                <button onClick={() => setSelectedCoach(null)} className="text-slate-400 hover:text-white text-2xl">&times;</button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-emerald-400 font-semibold text-sm mb-3">Détail des Évaluations</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <p className="text-slate-400 text-xs mb-2">Pédagogie</p>
                    <div className="flex items-center gap-2">
                      {renderStars(Math.round(selectedCoach.categories.pedagogy))}
                      <span className="text-white font-bold">{selectedCoach.categories.pedagogy}</span>
                    </div>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <p className="text-slate-400 text-xs mb-2">Ponctualité</p>
                    <div className="flex items-center gap-2">
                      {renderStars(Math.round(selectedCoach.categories.punctuality))}
                      <span className="text-white font-bold">{selectedCoach.categories.punctuality}</span>
                    </div>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <p className="text-slate-400 text-xs mb-2">Communication</p>
                    <div className="flex items-center gap-2">
                      {renderStars(Math.round(selectedCoach.categories.communication))}
                      <span className="text-white font-bold">{selectedCoach.categories.communication}</span>
                    </div>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <p className="text-slate-400 text-xs mb-2">Expertise</p>
                    <div className="flex items-center gap-2">
                      {renderStars(Math.round(selectedCoach.categories.expertise))}
                      <span className="text-white font-bold">{selectedCoach.categories.expertise}</span>
                    </div>
                  </div>
                </div>
              </div>

              {selectedCoach.recentFeedback.length > 0 && (
                <div>
                  <h4 className="text-emerald-400 font-semibold text-sm mb-3">Feedbacks Récents</h4>
                  <div className="space-y-3">
                    {selectedCoach.recentFeedback.map(feedback => (
                      <div key={feedback.id} className="bg-slate-700/30 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-white text-sm font-medium">{feedback.fromName}</p>
                          <div className="flex items-center gap-2">
                            {renderStars(feedback.rating, 'sm')}
                            <span className="text-slate-500 text-xs">{new Date(feedback.date).toLocaleDateString('fr-FR')}</span>
                          </div>
                        </div>
                        <p className="text-slate-300 text-sm">{feedback.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
