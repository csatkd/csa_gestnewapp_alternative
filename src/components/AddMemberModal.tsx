import { useState } from 'react';
import { UserPlus, X, Save, AlertCircle } from 'lucide-react';
import { Member, BeltColor } from '../types';
import { validateMember, generateId } from '../utils/storage';

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (member: Member) => void;
}

export default function AddMemberModal({ isOpen, onClose, onAdd }: AddMemberModalProps) {
  const [formData, setFormData] = useState<Partial<Member>>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: 'M',
    beltColor: 'white',
    beltRank: 1,
    phone: '',
    address: '',
    emergencyContact: '',
    emergencyPhone: '',
    weight: 0,
    height: 0,
    status: 'active',
  });

  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateMember(formData);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    const newMember: Member = {
      id: generateId('M'),
      licenseNumber: `CSA-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      firstName: formData.firstName || '',
      lastName: formData.lastName || '',
      dateOfBirth: formData.dateOfBirth || '',
      gender: formData.gender || 'M',
      beltColor: formData.beltColor || 'white',
      beltRank: formData.beltRank || 1,
      phone: formData.phone || '',
      address: formData.address || '',
      medicalCertificateDate: new Date().toISOString().split('T')[0],
      medicalCertificateValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      insuranceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      emergencyContact: formData.emergencyContact || '',
      emergencyPhone: formData.emergencyPhone || '',
      registrationDate: new Date().toISOString().split('T')[0],
      weight: formData.weight || 0,
      height: formData.height || 0,
      weightHistory: [],
      attendanceHistory: [],
      status: 'active',
    };

    onAdd(newMember);
    onClose();
  };

  const handleChange = (field: keyof Member, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-2xl border border-slate-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <UserPlus className="w-6 h-6 text-emerald-400" />
            <h2 className="text-xl font-bold text-white">Nouveau Licencié</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {errors.length > 0 && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <h4 className="text-red-400 font-semibold">Erreurs de validation</h4>
              </div>
              <ul className="list-disc list-inside space-y-1">
                {errors.map((error, idx) => (
                  <li key={idx} className="text-red-300 text-sm">{error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Personal Information */}
          <div>
            <h3 className="text-white font-semibold mb-3">Informations Personnelles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-300 text-sm font-medium block mb-2">Prénom *</label>
                <input
                  type="text"
                  value={formData.firstName || ''}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>
              <div>
                <label className="text-slate-300 text-sm font-medium block mb-2">Nom *</label>
                <input
                  type="text"
                  value={formData.lastName || ''}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>
              <div>
                <label className="text-slate-300 text-sm font-medium block mb-2">Date de naissance *</label>
                <input
                  type="date"
                  value={formData.dateOfBirth || ''}
                  onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>
              <div>
                <label className="text-slate-300 text-sm font-medium block mb-2">Genre *</label>
                <select
                  value={formData.gender || 'M'}
                  onChange={(e) => handleChange('gender', e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="M">Masculin</option>
                  <option value="F">Féminin</option>
                </select>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-white font-semibold mb-3">Contact</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-300 text-sm font-medium block mb-2">Téléphone *</label>
                <input
                  type="tel"
                  value={formData.phone || ''}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="+225 07 12 34 56 78"
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>
              <div>
                <label className="text-slate-300 text-sm font-medium block mb-2">Adresse *</label>
                <input
                  type="text"
                  value={formData.address || ''}
                  onChange={(e) => handleChange('address', e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div>
            <h3 className="text-white font-semibold mb-3">Contact d'Urgence</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-300 text-sm font-medium block mb-2">Nom du contact *</label>
                <input
                  type="text"
                  value={formData.emergencyContact || ''}
                  onChange={(e) => handleChange('emergencyContact', e.target.value)}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>
              <div>
                <label className="text-slate-300 text-sm font-medium block mb-2">Téléphone d'urgence *</label>
                <input
                  type="tel"
                  value={formData.emergencyPhone || ''}
                  onChange={(e) => handleChange('emergencyPhone', e.target.value)}
                  placeholder="+225 01 23 45 67 89"
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Biometrics */}
          <div>
            <h3 className="text-white font-semibold mb-3">Biométrie</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-300 text-sm font-medium block mb-2">Poids (kg)</label>
                <input
                  type="number"
                  value={formData.weight || ''}
                  onChange={(e) => handleChange('weight', parseFloat(e.target.value))}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="text-slate-300 text-sm font-medium block mb-2">Taille (cm)</label>
                <input
                  type="number"
                  value={formData.height || ''}
                  onChange={(e) => handleChange('height', parseFloat(e.target.value))}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Belt */}
          <div>
            <h3 className="text-white font-semibold mb-3">Grade Initial</h3>
            <div>
              <label className="text-slate-300 text-sm font-medium block mb-2">Ceinture</label>
              <select
                value={formData.beltColor || 'white'}
                onChange={(e) => handleChange('beltColor', e.target.value)}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="white">Blanche</option>
                <option value="yellow">Jaune</option>
                <option value="orange">Orange</option>
                <option value="green">Verte</option>
                <option value="blue">Bleue</option>
                <option value="purple">Violette</option>
                <option value="red">Rouge</option>
                <option value="black">Noire</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-slate-700">
            <button
              type="submit"
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              Enregistrer le Licencié
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg font-medium transition-colors"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
