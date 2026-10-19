import { useState } from 'react';
import { Lock, Mail, AlertCircle, User } from 'lucide-react';
import { useAuth, UserRole } from './AuthContext';

export default function StaffLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('admin');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const success = await login(email, password, role);
    
    if (!success) {
      setError('Identifiants invalides. Veuillez vérifier vos informations.');
      setIsLoading(false);
    }
  };

  const getRoleLabel = (r: UserRole) => {
    switch (r) {
      case 'admin': return 'Administrateur';
      case 'coach': return 'Coach';
      case 'treasurer': return 'Trésorier';
      default: return r;
    }
  };

  const getRoleIcon = (r: UserRole) => {
    switch (r) {
      case 'admin': return '👑';
      case 'coach': return '🥋';
      case 'treasurer': return '💰';
      default: return '👤';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo et titre */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl mb-4 shadow-lg shadow-emerald-500/20">
            <span className="text-4xl">🥋</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Confidence Sports Academy</h1>
          <p className="text-slate-400">Portail Staff - Gestion</p>
        </div>

        {/* Carte de connexion */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 shadow-2xl">
          <h2 className="text-xl font-semibold text-white mb-2">Connexion Staff</h2>
          <p className="text-slate-400 text-sm mb-6">
            Accédez à votre espace de gestion
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Sélection du rôle */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Type de compte
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['admin', 'coach', 'treasurer'] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      role === r
                        ? 'border-emerald-500 bg-emerald-500/10'
                        : 'border-slate-700 bg-slate-900/50 hover:border-slate-600'
                    }`}
                  >
                    <div className="text-2xl mb-1">{getRoleIcon(r)}</div>
                    <div className={`text-xs font-medium ${role === r ? 'text-emerald-400' : 'text-slate-400'}`}>
                      {getRoleLabel(r)}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  className="w-full pl-10 pr-3 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !email || !password}
              className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Connexion...</span>
                </>
              ) : (
                <>
                  <User className="w-5 h-5" />
                  <span>Se Connecter</span>
                </>
              )}
            </button>
          </form>

          {/* Comptes de test */}
          <div className="mt-6 p-4 bg-slate-700/30 rounded-lg">
            <p className="text-xs text-slate-400 mb-2 font-medium">Comptes de démonstration :</p>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>👑 Admin:</span>
                <span className="text-slate-400">admin@csa.ci / admin123</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>🥋 Coach:</span>
                <span className="text-slate-400">coach@csa.ci / coach123</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>💰 Trésorier:</span>
                <span className="text-slate-400">tresorerie@csa.ci / tresor123</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-slate-500">
          <p>© 2024 Confidence Sports Academy - Abidjan, Côte d'Ivoire</p>
          <p className="mt-1">Affiliée FITKD • Homologuée Kukkiwon</p>
        </div>
      </div>
    </div>
  );
}
