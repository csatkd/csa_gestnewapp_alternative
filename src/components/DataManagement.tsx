import { useState } from 'react';
import { Download, Upload, Database, Trash2, AlertTriangle, CheckCircle } from 'lucide-react';
import { exportAllData, importAllData, clearAllData } from '../utils/storage';

export default function DataManagement() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleExport = () => {
    try {
      const data = exportAllData();
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `csa_backup_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setMessage({ type: 'success', text: 'Sauvegarde exportée avec succès' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Erreur lors de l\'export' });
    }
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const success = importAllData(content);
        if (success) {
          setMessage({ type: 'success', text: 'Données importées avec succès. Rechargez la page pour voir les changements.' });
        } else {
          setMessage({ type: 'error', text: 'Erreur lors de l\'import des données' });
        }
      } catch (error) {
        setMessage({ type: 'error', text: 'Fichier invalide' });
      }
    };
    reader.readAsText(file);
  };

  const handleClear = () => {
    clearAllData();
    setMessage({ type: 'success', text: 'Toutes les données ont été supprimées' });
    setShowConfirm(false);
  };

  return (
    <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center gap-3 mb-6">
        <Database className="w-6 h-6 text-emerald-400" />
        <h3 className="text-white font-semibold text-lg">Gestion des Données</h3>
      </div>

      {message && (
        <div className={`mb-4 p-3 rounded-lg flex items-center gap-2 ${
          message.type === 'success' ? 'bg-emerald-500/10 border border-emerald-500/30' : 'bg-red-500/10 border border-red-500/30'
        }`}>
          {message.type === 'success' ? (
            <CheckCircle className="w-5 h-5 text-emerald-400" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-red-400" />
          )}
          <span className={message.type === 'success' ? 'text-emerald-400' : 'text-red-400'}>{message.text}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Export */}
        <div className="bg-slate-700/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Download className="w-5 h-5 text-blue-400" />
            <h4 className="text-white font-medium">Exporter</h4>
          </div>
          <p className="text-slate-400 text-sm mb-4">
            Sauvegardez toutes les données de l'application dans un fichier JSON
          </p>
          <button
            onClick={handleExport}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Exporter les données
          </button>
        </div>

        {/* Import */}
        <div className="bg-slate-700/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Upload className="w-5 h-5 text-emerald-400" />
            <h4 className="text-white font-medium">Importer</h4>
          </div>
          <p className="text-slate-400 text-sm mb-4">
            Restaurez les données depuis un fichier de sauvegarde JSON
          </p>
          <label className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer block text-center">
            Importer des données
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
          </label>
        </div>

        {/* Clear */}
        <div className="bg-slate-700/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Trash2 className="w-5 h-5 text-red-400" />
            <h4 className="text-white font-medium">Réinitialiser</h4>
          </div>
          <p className="text-slate-400 text-sm mb-4">
            Supprimez toutes les données locales (irréversible)
          </p>
          <button
            onClick={() => setShowConfirm(true)}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Réinitialiser les données
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-xl border border-slate-700 max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-red-400" />
              <h3 className="text-white font-semibold text-lg">Confirmation</h3>
            </div>
            <p className="text-slate-300 mb-6">
              Êtes-vous sûr de vouloir supprimer toutes les données ? Cette action est irréversible.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleClear}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium transition-colors"
              >
                Oui, supprimer
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg font-medium transition-colors"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
