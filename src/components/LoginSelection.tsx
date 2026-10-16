import { Users, UserCog, GraduationCap, Wallet } from 'lucide-react';

interface LoginSelectionProps {
  onSelectParent: () => void;
  onSelectStaff: () => void;
}

export default function LoginSelection({ onSelectParent, onSelectStaff }: LoginSelectionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Logo et titre */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl mb-6 shadow-lg shadow-emerald-500/20">
            <span className="text-5xl">🥋</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">Confidence Sports Academy</h1>
          <p className="text-slate-400 text-lg">Sélectionnez votre espace de connexion</p>
        </div>

        {/* Cartes de sélection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Espace Parents */}
          <button
            onClick={onSelectParent}
            className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl border-2 border-slate-700 hover:border-emerald-500 p-8 shadow-xl transition-all duration-300 hover:scale-105 text-left"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-white" />
              </div>
              <span className="text-4xl">👨‍👩‍👧‍👦</span>
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
              Espace Parents
            </h2>
            
            <p className="text-slate-400 mb-6">
              Suivez la progression de vos enfants, consultez leur assiduité, leurs paiements et les événements à venir.
            </p>

            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <span className="text-emerald-400">✓</span>
                <span>Suivi de l'assiduité en temps réel</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <span className="text-emerald-400">✓</span>
                <span>Historique des paiements</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <span className="text-emerald-400">✓</span>
                <span>Calendrier des compétitions</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <span className="text-emerald-400">✓</span>
                <span>Notifications importantes</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-emerald-400 font-medium group-hover:translate-x-2 transition-transform">
                Connexion avec numéro de licence →
              </span>
            </div>
          </button>

          {/* Espace Staff */}
          <button
            onClick={onSelectStaff}
            className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl border-2 border-slate-700 hover:border-emerald-500 p-8 shadow-xl transition-all duration-300 hover:scale-105 text-left"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <UserCog className="w-8 h-8 text-white" />
              </div>
              <span className="text-4xl">👨‍💼</span>
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
              Espace Staff
            </h2>
            
            <p className="text-slate-400 mb-6">
              Accédez aux outils de gestion : administration, coaching, trésorerie et suivi des licenciés.
            </p>

            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <GraduationCap className="w-4 h-4 text-purple-400" />
                <span>Coachs : Gestion des entraînements</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <Wallet className="w-4 h-4 text-purple-400" />
                <span>Trésorier : Gestion financière</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <UserCog className="w-4 h-4 text-purple-400" />
                <span>Admin : Accès complet</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <span className="text-emerald-400">✓</span>
                <span>Tableau de bord personnalisé</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-emerald-400 font-medium group-hover:translate-x-2 transition-transform">
                Connexion avec email/mot de passe →
              </span>
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-sm text-slate-500">
          <p>© 2024 Confidence Sports Academy - Abidjan, Côte d'Ivoire</p>
          <p className="mt-1">Affiliée FITKD • Homologuée Kukkiwon • Membre World Taekwondo</p>
        </div>
      </div>
    </div>
  );
}
