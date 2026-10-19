import { useState } from 'react';
import { DollarSign, X, Save, CreditCard, Smartphone, Building } from 'lucide-react';
import { Payment, Installment } from '../types';
import { generateId } from '../utils/storage';
import { mockMembers } from '../data/mockData';

interface AddPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (payment: Payment) => void;
}

export default function AddPaymentModal({ isOpen, onClose, onAdd }: AddPaymentModalProps) {
  const [formData, setFormData] = useState({
    memberId: '',
    type: 'cotisation' as Payment['type'],
    amount: 0,
    paidAmount: 0,
    dueDate: '',
    description: '',
    paymentMethod: 'cash' as Installment['method'],
    receiptNumber: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.memberId || formData.amount <= 0 || !formData.dueDate) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const newPayment: Payment = {
      id: generateId('P'),
      memberId: formData.memberId,
      type: formData.type,
      amount: formData.amount,
      paidAmount: formData.paidAmount,
      date: new Date().toISOString().split('T')[0],
      dueDate: formData.dueDate,
      status: formData.paidAmount >= formData.amount ? 'paid' : formData.paidAmount > 0 ? 'partial' : 'pending',
      installments: formData.paidAmount > 0 ? [{
        id: generateId('I'),
        amount: formData.paidAmount,
        date: new Date().toISOString().split('T')[0],
        method: formData.paymentMethod,
        receipt: formData.receiptNumber || `REC-${Date.now()}`,
      }] : [],
      description: formData.description || `${formData.type === 'cotisation' ? 'Cotisation' : formData.type === 'examen' ? 'Examen' : formData.type === 'equipement' ? 'Équipement' : 'Compétition'} ${new Date().getFullYear()}`,
    };

    onAdd(newPayment);
    onClose();
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-2xl border border-slate-700 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <DollarSign className="w-6 h-6 text-emerald-400" />
            <h2 className="text-xl font-bold text-white">Nouveau Paiement</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Member Selection */}
          <div>
            <label className="text-slate-300 text-sm font-medium block mb-2">Licencié *</label>
            <select
              value={formData.memberId}
              onChange={(e) => handleChange('memberId', e.target.value)}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
              required
            >
              <option value="">Sélectionner un licencié</option>
              {mockMembers.map(m => (
                <option key={m.id} value={m.id}>{m.firstName} {m.lastName} ({m.licenseNumber})</option>
              ))}
            </select>
          </div>

          {/* Payment Type */}
          <div>
            <label className="text-slate-300 text-sm font-medium block mb-2">Type de paiement *</label>
            <select
              value={formData.type}
              onChange={(e) => handleChange('type', e.target.value)}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="cotisation">Cotisation</option>
              <option value="examen">Frais d'examen</option>
              <option value="equipement">Équipement</option>
              <option value="competition">Compétition</option>
            </select>
          </div>

          {/* Amounts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-slate-300 text-sm font-medium block mb-2">Montant total (FCFA) *</label>
              <input
                type="number"
                value={formData.amount || ''}
                onChange={(e) => handleChange('amount', parseFloat(e.target.value))}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                required
                min="0"
              />
            </div>
            <div>
              <label className="text-slate-300 text-sm font-medium block mb-2">Montant payé maintenant (FCFA)</label>
              <input
                type="number"
                value={formData.paidAmount || ''}
                onChange={(e) => handleChange('paidAmount', parseFloat(e.target.value))}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                min="0"
                max={formData.amount}
              />
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label className="text-slate-300 text-sm font-medium block mb-2">Date d'échéance *</label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => handleChange('dueDate', e.target.value)}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
              required
            />
          </div>

          {/* Payment Method */}
          {formData.paidAmount > 0 && (
            <div>
              <label className="text-slate-300 text-sm font-medium block mb-2">Méthode de paiement</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleChange('paymentMethod', 'cash')}
                  className={`p-3 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${
                    formData.paymentMethod === 'cash'
                      ? 'border-emerald-500 bg-emerald-500/10'
                      : 'border-slate-700 hover:border-slate-500'
                  }`}
                >
                  <CreditCard className={`w-6 h-6 ${formData.paymentMethod === 'cash' ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span className={`text-xs ${formData.paymentMethod === 'cash' ? 'text-emerald-400' : 'text-slate-400'}`}>Espèces</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleChange('paymentMethod', 'mobile_money')}
                  className={`p-3 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${
                    formData.paymentMethod === 'mobile_money'
                      ? 'border-emerald-500 bg-emerald-500/10'
                      : 'border-slate-700 hover:border-slate-500'
                  }`}
                >
                  <Smartphone className={`w-6 h-6 ${formData.paymentMethod === 'mobile_money' ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span className={`text-xs ${formData.paymentMethod === 'mobile_money' ? 'text-emerald-400' : 'text-slate-400'}`}>Mobile Money</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleChange('paymentMethod', 'bank')}
                  className={`p-3 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${
                    formData.paymentMethod === 'bank'
                      ? 'border-emerald-500 bg-emerald-500/10'
                      : 'border-slate-700 hover:border-slate-500'
                  }`}
                >
                  <Building className={`w-6 h-6 ${formData.paymentMethod === 'bank' ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span className={`text-xs ${formData.paymentMethod === 'bank' ? 'text-emerald-400' : 'text-slate-400'}`}>Virement</span>
                </button>
              </div>
            </div>
          )}

          {/* Receipt Number */}
          {formData.paidAmount > 0 && (
            <div>
              <label className="text-slate-300 text-sm font-medium block mb-2">Numéro de reçu</label>
              <input
                type="text"
                value={formData.receiptNumber}
                onChange={(e) => handleChange('receiptNumber', e.target.value)}
                placeholder="Laisser vide pour génération automatique"
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          )}

          {/* Description */}
          <div>
            <label className="text-slate-300 text-sm font-medium block mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Description optionnelle du paiement"
              rows={3}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 resize-none"
            />
          </div>

          {/* Summary */}
          {formData.amount > 0 && (
            <div className="bg-slate-700/30 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2">Résumé</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Montant total:</span>
                  <span className="text-white font-medium">{formData.amount.toLocaleString()} FCFA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Payé maintenant:</span>
                  <span className="text-emerald-400 font-medium">{formData.paidAmount.toLocaleString()} FCFA</span>
                </div>
                <div className="flex justify-between border-t border-slate-600 pt-1">
                  <span className="text-slate-400">Solde restant:</span>
                  <span className={`font-medium ${formData.amount - formData.paidAmount > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                    {(formData.amount - formData.paidAmount).toLocaleString()} FCFA
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-slate-700">
            <button
              type="submit"
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              Enregistrer le Paiement
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
