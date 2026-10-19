import { useState } from 'react';
import { UserPlus, CheckCircle, AlertCircle, Calendar, Phone, Mail, MapPin, Shield } from 'lucide-react';

interface PreInscription {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  age: number;
  gender: 'M' | 'F';
  parentName?: string;
  parentPhone: string;
  parentEmail?: string;
  address: string;
  desiredSchedule: string;
  experience: string;
  medicalCertificate: boolean;
  motivation: string;
  status: 'pending' | 'approved' | 'rejected';
  submissionDate: string;
  notes?: string;
}

interface PreInscriptionFormProps {
  onSubmit: (preInscription: Omit<PreInscription, 'id' | 'status' | 'submissionDate'>) => void;
  onCancel: () => void;
}

export default function PreInscriptionForm({ onSubmit, onCancel }: PreInscriptionFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: 'M' as 'M' | 'F',
    parentName: '',
    parentPhone: '',
    parentEmail: '',
    address: '',
    desiredSchedule: '',
    experience: '',
    medicalCertificate: false,
    motivation: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const calculateAge = (dob: string): number => {
    const today = new Date();
    const birth = new Date(dob);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'Le prénom est requis';
    if (!formData.lastName.trim()) newErrors.lastName = 'Le nom est requis';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'La date de naissance est requise';
    if (!formData.parentPhone.trim()) newErrors.parentPhone = 'Le téléphone est requis';
    if (!formData.address.trim()) newErrors.address = 'L\'adresse est requise';
    if (!formData.desiredSchedule) newErrors.desiredSchedule = 'Veuillez sélectionner un horaire';
    if (formData.parentPhone && !/^\+225\s?\d{2}\s?\d{2}\s?\d{2}\s?\d{2}$/.test(formData.parentPhone.replace(/\s/g, ''))) {
      newErrors.parentPhone = 'Format invalide (ex: +225 07 12 34 56 78)';
    }

    const age = calculateAge(formData.dateOfBirth);
    if (age < 4 || age > 80) {
      newErrors.dateOfBirth = 'L\'âge doit être entre 4 et 80 ans';
    }

    if (age < 18 && !formData.parentName.trim()) {
      newErrors.parentName = 'Le nom du parent/tuteur est requis pour les mineurs';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const age = calculateAge(formData.dateOfBirth);
    
    onSubmit({
      ...formData,
      age
    });
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl mb-4 shadow-lg shadow-emerald-500/20">
            <UserPlus className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Préinscription en Ligne</h1>
          <p className="text-slate-400">Confidence Sports Academy - Taekwondo</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 shadow-2xl">
          {/* Informations Personnelles */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-400" />
              Informations Personnelles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Prénom *
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  className={`w-full px-4 py-3 bg-slate-900/50 border ${errors.firstName ? 'border-red-500' : 'border-slate-700'} rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all`}
                  placeholder="Ex: Aya"
                />
                {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Nom *
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  className={`w-full px-4 py-3 bg-slate-900/50 border ${errors.lastName ? 'border-red-500' : 'border-slate-700'} rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all`}
                  placeholder="Ex: Kouassi"
                />
                {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Date de naissance *
                </label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                  className={`w-full px-4 py-3 bg-slate-900/50 border ${errors.dateOfBirth ? 'border-red-500' : 'border-slate-700'} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all`}
                />
                {errors.dateOfBirth && <p className="text-red-400 text-xs mt-1">{errors.dateOfBirth}</p>}
                {formData.dateOfBirth && (
                  <p className="text-emerald-400 text-xs mt-1">
                    Âge: {calculateAge(formData.dateOfBirth)} ans
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Genre *
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleChange('gender', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                >
                  <option value="M">Masculin</option>
                  <option value="F">Féminin</option>
                </select>
              </div>
            </div>
          </div>

          {/* Informations Parent/Tuteur */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Phone className="w-5 h-5 text-emerald-400" />
              Contact Parent/Tuteur
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Nom du parent/tuteur {calculateAge(formData.dateOfBirth) < 18 ? '*' : ''}
                </label>
                <input
                  type="text"
                  value={formData.parentName}
                  onChange={(e) => handleChange('parentName', e.target.value)}
                  className={`w-full px-4 py-3 bg-slate-900/50 border ${errors.parentName ? 'border-red-500' : 'border-slate-700'} rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all`}
                  placeholder="Ex: Kouassi Jean"
                />
                {errors.parentName && <p className="text-red-400 text-xs mt-1">{errors.parentName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Téléphone *
                </label>
                <input
                  type="tel"
                  value={formData.parentPhone}
                  onChange={(e) => handleChange('parentPhone', e.target.value)}
                  className={`w-full px-4 py-3 bg-slate-900/50 border ${errors.parentPhone ? 'border-red-500' : 'border-slate-700'} rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all`}
                  placeholder="+225 07 12 34 56 78"
                />
                {errors.parentPhone && <p className="text-red-400 text-xs mt-1">{errors.parentPhone}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email (optionnel)
                </label>
                <input
                  type="email"
                  value={formData.parentEmail}
                  onChange={(e) => handleChange('parentEmail', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                  placeholder="email@exemple.com"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Adresse *
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  className={`w-full px-4 py-3 bg-slate-900/50 border ${errors.address ? 'border-red-500' : 'border-slate-700'} rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all`}
                  placeholder="Ex: Cocody, Abidjan"
                />
                {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
              </div>
            </div>
          </div>

          {/* Préférences */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-400" />
              Préférences
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Horaire souhaité *
                </label>
                <select
                  value={formData.desiredSchedule}
                  onChange={(e) => handleChange('desiredSchedule', e.target.value)}
                  className={`w-full px-4 py-3 bg-slate-900/50 border ${errors.desiredSchedule ? 'border-red-500' : 'border-slate-700'} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all`}
                >
                  <option value="">Sélectionnez un horaire</option>
                  <option value="enfants-lundi">Enfants (6-12 ans) - Lundi 16h-17h30</option>
                  <option value="enfants-mercredi">Enfants (6-12 ans) - Mercredi 16h-17h30</option>
                  <option value="enfants-vendredi">Enfants (6-12 ans) - Vendredi 16h-17h30</option>
                  <option value="ados-lundi">Adolescents (13-17 ans) - Lundi 18h-19h30</option>
                  <option value="ados-jeudi">Adolescents (13-17 ans) - Jeudi 18h-19h30</option>
                  <option value="adultes-mardi">Adultes (+18 ans) - Mardi 18h-20h</option>
                  <option value="adultes-vendredi">Adultes (+18 ans) - Vendredi 18h-20h</option>
                  <option value="competition-samedi">Compétition - Samedi 11h-12h30</option>
                </select>
                {errors.desiredSchedule && <p className="text-red-400 text-xs mt-1">{errors.desiredSchedule}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Expérience préalable
                </label>
                <select
                  value={formData.experience}
                  onChange={(e) => handleChange('experience', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                >
                  <option value="debutant">Débutant complet</option>
                  <option value="quelques-mois">Quelques mois d'expérience</option>
                  <option value="1-2-ans">1-2 ans d'expérience</option>
                  <option value="3-ans-plus">3 ans ou plus</option>
                  <option value="autre-art-martial">Autre art martial</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Motivation
                </label>
                <textarea
                  value={formData.motivation}
                  onChange={(e) => handleChange('motivation', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all resize-none"
                  placeholder="Pourquoi souhaitez-vous rejoindre la CSA ?"
                />
              </div>
            </div>
          </div>

          {/* Certificat Médical */}
          <div className="mb-8">
            <div className="flex items-start gap-3 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <input
                type="checkbox"
                id="medicalCertificate"
                checked={formData.medicalCertificate}
                onChange={(e) => handleChange('medicalCertificate', e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-emerald-500"
              />
              <label htmlFor="medicalCertificate" className="text-sm text-slate-300">
                Je certifie disposer d'un certificat médical de non-contre-indication à la pratique du Taekwondo, 
                ou je m'engage à en fournir un avant le début des cours.
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              Soumettre la Préinscription
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-6 bg-slate-700 hover:bg-slate-600 text-white font-medium py-3 rounded-lg transition-colors"
            >
              Annuler
            </button>
          </div>
        </form>

        {/* Info */}
        <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
          <p className="text-sm text-emerald-300 flex items-start gap-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>
              Votre préinscription sera examinée par notre équipe. Vous recevrez une confirmation 
              par téléphone ou email dans les 48 heures. Une fois validée, vous pourrez finaliser 
              votre inscription au secrétariat.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
