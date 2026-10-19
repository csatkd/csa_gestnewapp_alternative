import { useState } from 'react';
import { Settings, Save, Building, Phone, Mail, MapPin, Globe, Clock } from 'lucide-react';

interface AcademySettings {
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  openingHours: {
    weekday: string;
    saturday: string;
    sunday: string;
  };
  director: string;
  technicalDirector: string;
  affiliation: {
    fitkd: string;
    kukkiwon: string;
    worldTaekwondo: string;
  };
  socialMedia: {
    facebook: string;
    instagram: string;
    youtube: string;
  };
}

const defaultSettings: AcademySettings = {
  name: 'Confidence Sports Academy',
  address: 'Cocody, Abidjan, Côte d\'Ivoire',
  phone: '+225 27 22 44 55 66',
  email: 'contact@csa-taekwondo.ci',
  website: 'www.csa-taekwondo.ci',
  openingHours: {
    weekday: '16h00 - 20h00',
    saturday: '09h00 - 13h00',
    sunday: 'Fermé'
  },
  director: 'Maître Koné Ibrahim',
  technicalDirector: 'Coach Traoré Moussa',
  affiliation: {
    fitkd: 'FITKD-CI-2024-001',
    kukkiwon: 'KKW-2024-12345',
    worldTaekwondo: 'WT-2024-CI-001'
  },
  socialMedia: {
    facebook: 'facebook.com/csataekwondo',
    instagram: '@csataekwondo',
    youtube: 'youtube.com/csataekwondo'
  }
};

export default function AcademySettings() {
  const [settings, setSettings] = useState<AcademySettings>(defaultSettings);
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // Sauvegarder dans localStorage
    localStorage.setItem('csa_settings', JSON.stringify(settings));
    setIsEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleChange = (field: keyof AcademySettings, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (category: string, field: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...(prev as any)[category],
        [field]: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Paramètres de l'Académie</h2>
          <p className="text-slate-400 text-sm">Configuration générale de la CSA</p>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Save className="w-4 h-4" />
                Enregistrer
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
              >
                Annuler
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Settings className="w-4 h-4" />
              Modifier
            </button>
          )}
        </div>
      </div>

      {/* Success Message */}
      {saved && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 flex items-center gap-3">
          <Save className="w-5 h-5 text-emerald-400" />
          <p className="text-emerald-400">Paramètres enregistrés avec succès !</p>
        </div>
      )}

      {/* Informations Générales */}
      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Building className="w-5 h-5 text-emerald-400" />
          Informations Générales
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-slate-400 text-sm block mb-2">Nom de l'Académie</label>
            <input
              type="text"
              value={settings.name}
              onChange={(e) => handleChange('name', e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="text-slate-400 text-sm block mb-2">Directeur</label>
            <input
              type="text"
              value={settings.director}
              onChange={(e) => handleChange('director', e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="text-slate-400 text-sm block mb-2">Directeur Technique</label>
            <input
              type="text"
              value={settings.technicalDirector}
              onChange={(e) => handleChange('technicalDirector', e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Phone className="w-5 h-5 text-emerald-400" />
          Coordonnées
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-slate-400 text-sm block mb-2">Adresse</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={settings.address}
                onChange={(e) => handleChange('address', e.target.value)}
                disabled={!isEditing}
                className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
          <div>
            <label className="text-slate-400 text-sm block mb-2">Téléphone</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="tel"
                value={settings.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                disabled={!isEditing}
                className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
          <div>
            <label className="text-slate-400 text-sm block mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="email"
                value={settings.email}
                onChange={(e) => handleChange('email', e.target.value)}
                disabled={!isEditing}
                className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
          <div>
            <label className="text-slate-400 text-sm block mb-2">Site Web</label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="url"
                value={settings.website}
                onChange={(e) => handleChange('website', e.target.value)}
                disabled={!isEditing}
                className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Horaires */}
      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-emerald-400" />
          Horaires d'Ouverture
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-slate-400 text-sm block mb-2">Lundi - Vendredi</label>
            <input
              type="text"
              value={settings.openingHours.weekday}
              onChange={(e) => handleNestedChange('openingHours', 'weekday', e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="text-slate-400 text-sm block mb-2">Samedi</label>
            <input
              type="text"
              value={settings.openingHours.saturday}
              onChange={(e) => handleNestedChange('openingHours', 'saturday', e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="text-slate-400 text-sm block mb-2">Dimanche</label>
            <input
              type="text"
              value={settings.openingHours.sunday}
              onChange={(e) => handleNestedChange('openingHours', 'sunday', e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Affiliations */}
      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-bold text-white mb-4">Affiliations Officielles</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-slate-400 text-sm block mb-2">FITKD</label>
            <input
              type="text"
              value={settings.affiliation.fitkd}
              onChange={(e) => handleNestedChange('affiliation', 'fitkd', e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="text-slate-400 text-sm block mb-2">Kukkiwon</label>
            <input
              type="text"
              value={settings.affiliation.kukkiwon}
              onChange={(e) => handleNestedChange('affiliation', 'kukkiwon', e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="text-slate-400 text-sm block mb-2">World Taekwondo</label>
            <input
              type="text"
              value={settings.affiliation.worldTaekwondo}
              onChange={(e) => handleNestedChange('affiliation', 'worldTaekwondo', e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Réseaux Sociaux */}
      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-bold text-white mb-4">Réseaux Sociaux</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-slate-400 text-sm block mb-2">Facebook</label>
            <input
              type="text"
              value={settings.socialMedia.facebook}
              onChange={(e) => handleNestedChange('socialMedia', 'facebook', e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="text-slate-400 text-sm block mb-2">Instagram</label>
            <input
              type="text"
              value={settings.socialMedia.instagram}
              onChange={(e) => handleNestedChange('socialMedia', 'instagram', e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="text-slate-400 text-sm block mb-2">YouTube</label>
            <input
              type="text"
              value={settings.socialMedia.youtube}
              onChange={(e) => handleNestedChange('socialMedia', 'youtube', e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white disabled:opacity-50 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
