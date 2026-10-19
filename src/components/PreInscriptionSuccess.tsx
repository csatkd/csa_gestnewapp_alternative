import { CheckCircle, Calendar, Phone, Mail } from 'lucide-react';

interface PreInscriptionSuccessProps {
  preInscriptionId: string;
  firstName: string;
  lastName: string;
  onClose: () => void;
}

export default function PreInscriptionSuccess({ 
  preInscriptionId, 
  firstName, 
  lastName, 
  onClose 
}: PreInscriptionSuccessProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full mb-6 shadow-lg shadow-emerald-500/30 animate-pulse">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">
            Préinscription Réussie !
          </h1>
          <p className="text-xl text-slate-300">
            Merci {firstName} {lastName}
          </p>
        </div>

        {/* Confirmation Card */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 shadow-2xl">
          <div className="space-y-6">
            {/* Reference Number */}
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
              <p className="text-emerald-400 text-sm font-medium mb-1">Numéro de référence</p>
              <p className="text-white text-2xl font-bold font-mono">{preInscriptionId}</p>
            </div>

            {/* Next Steps */}
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">Prochaines étapes</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-400 font-bold">1</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">Examen de votre dossier</p>
                    <p className="text-slate-400 text-sm">Notre équipe va examiner votre préinscription sous 48h</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-400 font-bold">2</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">Confirmation par téléphone/email</p>
                    <p className="text-slate-400 text-sm">Vous recevrez une confirmation de votre préinscription</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-amber-400 font-bold">3</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">Rendez-vous au secrétariat</p>
                    <p className="text-slate-400 text-sm">Finalisez votre inscription avec les documents requis</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-emerald-400 font-bold">4</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">Début des cours</p>
                    <p className="text-slate-400 text-sm">Rejoignez votre groupe et commencez l'aventure !</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Documents Required */}
            <div className="bg-slate-700/30 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-3">Documents à préparer</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Certificat médical de non-contre-indication</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>2 photos d'identité récentes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Copie de la pièce d'identité (ou livret de famille pour mineurs)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>Frais d'inscription : 25 000 FCFA</span>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="text-blue-400 font-semibold mb-3">Besoin d'aide ?</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-slate-300">
                  <Phone className="w-4 h-4 text-blue-400" />
                  <span>+225 27 22 44 55 66</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span>contact@csa-taekwondo.ci</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Calendar className="w-4 h-4 text-blue-400" />
                  <span>Secrétariat : Lun-Ven 16h-20h, Sam 9h-13h</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              Retour à l'accueil
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-6 text-sm text-slate-500">
          <p>Conservez votre numéro de référence pour le suivi de votre dossier</p>
        </div>
      </div>
    </div>
  );
}
