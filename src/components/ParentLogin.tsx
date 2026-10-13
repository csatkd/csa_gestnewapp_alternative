import { useState } from 'react';
import { Lock, User, AlertCircle } from 'lucide-react';
import { useParentAuth } from './ParentAuthContext';

export default function ParentLogin() {
  const [licenseNumber, setLicenseNumber] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useParentAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate loading
    setTimeout(() => {
      const success = login(licenseNumber.trim());
      
      if (!success) {
        setError('Numéro de licence invalide. Veuillez vérifier et réessayer.');
        setIsLoading(false);
      }
    }, 800);
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
          <p className="text-slate-400">Portail Parents - Taekwondo</p>
        </div>

        {/* Carte de connexion */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 shadow-2xl">
          <h2 className="text-xl font-semibold text-white mb-2">Connexion Parent</h2>
          <p className="text-slate-400 text-sm mb-6">
            Entrez le numéro de licence de votre enfant pour accéder à son espace
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="license" className="block text-sm font-medium text-slate-300 mb-2">
                Numéro de Licence
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  id="license"
                  type="text"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  placeholder="Ex: CSA-2024-001"
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
              disabled={isLoading || !licenseNumber.trim()}
              className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Connexion...</span>
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  <span>Se Connecter</span>
                </>
              )}
            </button>
          </form>

          {/* Information d'aide */}
          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-sm text-blue-300">
              <strong>💡 Information:</strong> Le numéro de licence de votre enfant sert à la fois d'identifiant et de mot de passe. Vous pouvez le trouver sur sa carte de membre ou le demander au secrétariat.
            </p>
          </div>

          {/* Numéros de test */}
          <div className="mt-4 p-4 bg-slate-700/30 rounded-lg">
            <p className="text-xs text-slate-400 mb-2 font-medium">Numéros de licence de test:</p>
            <div className="space-y-1 text-xs text-slate-500">
              <p>• CSA-2024-001 (Kouassi Aya Marie)</p>
              <p>• CSA-2024-002 (Traoré Moussa)</p>
              <p>• CSA-2024-003 (Bamba Fatoumata)</p>
              <p>• CSA-2024-004 (Koné Ibrahim)</p>
              <p>• CSA-2024-005 (Diallo Aminata)</p>
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
