import { useState, useRef, useEffect } from 'react';
import { BookOpen, Download, Printer, ChevronLeft, ChevronRight, Camera, Upload, X } from 'lucide-react';
import { mockMembers } from '../data/mockData';
import { generateAnnualPaymentBooklet } from '../utils/paymentBookletGenerator';

interface MonthlyPayment {
  month: string;
  amount: number;
  paidAmount: number;
  dueDate: string;
  paidDate?: string;
  status: 'paid' | 'partial' | 'overdue' | 'pending';
  paymentMethod?: string;
  receiptNumber?: string;
}

export default function PaymentBookletView() {
  const [selectedMemberId, setSelectedMemberId] = useState(mockMembers[0].id);
  const [selectedYear, setSelectedYear] = useState(2024);
  const [currentPage, setCurrentPage] = useState(1);
  const [memberPhoto, setMemberPhoto] = useState<string | null>(null);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const member = mockMembers.find(m => m.id === selectedMemberId);

  // Charger la photo du membre depuis localStorage
  useEffect(() => {
    if (member) {
      const savedPhoto = localStorage.getItem(`photo_${member.id}`);
      setMemberPhoto(savedPhoto);
    }
  }, [member?.id]);

  if (!member) return null;

  // Gérer l'upload de photo
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const photoData = reader.result as string;
        setMemberPhoto(photoData);
        localStorage.setItem(`photo_${member.id}`, photoData);
        setShowPhotoModal(false);
      };
      reader.readAsDataURL(file);
    }
  };

  // Supprimer la photo
  const handlePhotoDelete = () => {
    setMemberPhoto(null);
    localStorage.removeItem(`photo_${member.id}`);
    setShowPhotoModal(false);
  };

  // Générer les données de paiement simulées
  const generatePayments = (): MonthlyPayment[] => {
    const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 
                    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    const monthlyFee = member.dan ? 15000 : member.beltColor === 'black' ? 12000 : 8000;
    
    return months.map((month, idx) => {
      const isPast = idx < 11;
      const isCurrentMonth = idx === 10;
      
      let status: MonthlyPayment['status'] = 'pending';
      let paidAmount = 0;
      let paidDate: string | undefined;
      let paymentMethod: string | undefined;
      let receiptNumber: string | undefined;
      
      if (isPast) {
        const rand = Math.random();
        if (rand < 0.7) {
          status = 'paid';
          paidAmount = monthlyFee;
          paidDate = `2024-${String(idx + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 5) + 1).padStart(2, '0')}`;
          paymentMethod = ['Espèces', 'Orange Money', 'MTN MoMo', 'Wave', 'Virement'][Math.floor(Math.random() * 5)];
          receiptNumber = `REC-${member.id}-${idx + 1}`;
        } else if (rand < 0.9) {
          status = 'partial';
          paidAmount = Math.floor(monthlyFee * (0.3 + Math.random() * 0.5));
          paidDate = `2024-${String(idx + 1).padStart(2, '0')}-05`;
          paymentMethod = 'Orange Money';
          receiptNumber = `REC-${member.id}-${idx + 1}`;
        } else {
          status = 'overdue';
        }
      } else if (isCurrentMonth) {
        if (member.dan && member.dan % 2 === 0) {
          status = 'paid';
          paidAmount = monthlyFee;
          paidDate = '2024-11-03';
          paymentMethod = 'Orange Money';
          receiptNumber = `REC-${member.id}-11`;
        }
      }
      
      return {
        month,
        amount: monthlyFee,
        paidAmount,
        dueDate: `2024-${String(idx + 1).padStart(2, '0')}-05`,
        paidDate,
        status,
        paymentMethod,
        receiptNumber,
      };
    });
  };

  const payments = generatePayments();
  const totalExpected = payments.reduce((sum, p) => sum + p.amount, 0);
  const totalPaid = payments.reduce((sum, p) => sum + p.paidAmount, 0);

  const handleDownloadPDF = () => {
    generateAnnualPaymentBooklet(member, payments, selectedYear, memberPhoto);
  };

  const handlePrint = () => {
    handleDownloadPDF();
    setTimeout(() => {
      alert('Le PDF a été téléchargé. Vous pouvez maintenant l\'imprimer.');
    }, 500);
  };

  const getBeltColorHex = (beltColor: string) => {
    const colors: Record<string, string> = {
      white: '#FFFFFF',
      yellow: '#FFD700',
      orange: '#FF8C00',
      green: '#228B22',
      blue: '#1E90FF',
      purple: '#8B008B',
      brown: '#8B4513',
      red: '#DC143C',
      black: '#000000',
    };
    return colors[beltColor] || '#808080';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Carnet de Suivi Annuel</h2>
          <p className="text-slate-400 text-sm">Carnet de paiement des mensualités - Format A6 livret</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Printer className="w-4 h-4" />
            Imprimer
          </button>
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            Télécharger PDF
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-slate-300 text-sm block mb-2">Licencié</label>
            <select
              value={selectedMemberId}
              onChange={(e) => setSelectedMemberId(e.target.value)}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
            >
              {mockMembers.map(m => (
                <option key={m.id} value={m.id}>
                  {m.firstName} {m.lastName} ({m.licenseNumber})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-slate-300 text-sm block mb-2">Année</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
            >
              <option value={2024}>2024</option>
              <option value={2025}>2025</option>
              <option value={2026}>2026</option>
            </select>
          </div>
          <div>
            <label className="text-slate-300 text-sm block mb-2">Photo du Licencié</label>
            <button
              onClick={() => setShowPhotoModal(true)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              <Camera className="w-4 h-4" />
              {memberPhoto ? 'Modifier la Photo' : 'Ajouter une Photo'}
            </button>
          </div>
        </div>
      </div>

      {/* Booklet Preview */}
      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-400" />
            Aperçu du Carnet
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>
            <span className="text-white text-sm">
              Page {currentPage} / 4
            </span>
            <button
              onClick={() => setCurrentPage(Math.min(4, currentPage + 1))}
              disabled={currentPage === 4}
              className="p-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Page Preview */}
        <div className="flex justify-center">
          <div className="w-[210mm] h-[297mm] bg-white shadow-2xl rounded-lg overflow-hidden" style={{ transform: 'scale(0.5)', transformOrigin: 'top center' }}>
            {/* Page 1: Couverture */}
            {currentPage === 1 && (
              <div className="w-full h-full bg-slate-900 text-white relative">
                {/* Bande décorative en haut */}
                <div className="h-[50mm] bg-emerald-500 flex flex-col items-center justify-center">
                  <p className="text-slate-900 font-bold text-[10mm]">CONFIDENCE SPORTS ACADEMY</p>
                  <p className="text-slate-900 text-[6mm]">CARNET DE SUIVI ANNUEL</p>
                  <p className="text-slate-900 text-[6mm]">DES PAIEMENTS - {selectedYear}</p>
                </div>

                {/* Informations du licencié avec photo */}
                <div className="flex flex-col items-center mt-[15mm]">
                  <p className="text-[6mm]">LICENCIÉ(E)</p>
                  
                  {/* Zone photo */}
                  <div className="relative mt-[3mm] mb-[3mm]">
                    <div className="w-[25mm] h-[30mm] bg-slate-700 border-2 border-emerald-500 rounded flex items-center justify-center overflow-hidden">
                      {memberPhoto ? (
                        <img src={memberPhoto} alt="Photo du licencié" className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-center">
                          <Camera className="w-[8mm] h-[8mm] text-slate-500 mx-auto mb-1" />
                          <p className="text-[2mm] text-slate-500">Photo</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-[10mm] font-bold text-emerald-400">{member.firstName} {member.lastName}</p>
                  <p className="text-[5mm] text-slate-400">N° Licence: {member.licenseNumber}</p>
                  <p className="text-[5mm] text-slate-400">Grade: Ceinture {member.beltColor}{member.dan ? ` ${member.dan}ème Dan` : ''}</p>
                  
                  <p className="text-[6mm] mt-[8mm]">Période: Janvier {selectedYear} - Décembre {selectedYear}</p>
                  
                  {/* Ligne décorative */}
                  <div className="w-[60mm] h-[1mm] bg-emerald-500 my-[4mm]"></div>
                  
                  {/* Résumé financier */}
                  <div className="text-left w-[70mm]">
                    <p className="text-[5mm] text-slate-400">MENSUALITÉ: <span className="text-emerald-400 font-bold">{payments[0].amount.toLocaleString()} FCFA</span></p>
                    <p className="text-[5mm] text-slate-400">TOTAL ANNUEL: <span className="text-emerald-400 font-bold">{totalExpected.toLocaleString()} FCFA</span></p>
                  </div>
                </div>

                {/* Bande décorative en bas */}
                <div className="absolute bottom-0 left-0 right-0 h-[40mm] bg-emerald-500 flex flex-col items-center justify-center">
                  <p className="text-slate-900 font-bold text-[4mm]">Ce carnet doit être présenté à chaque paiement</p>
                  <p className="text-slate-900 font-bold text-[4mm]">et conservé par le licencié</p>
                  <p className="text-slate-900 text-[3mm]">Cocody, Abidjan, Côte d'Ivoire | +225 27 22 44 55 66</p>
                </div>
              </div>
            )}

            {/* Page 2: Calendrier */}
            {currentPage === 2 && (
              <div className="w-full h-full bg-white">
                {/* En-tête */}
                <div className="h-[24mm] bg-slate-900 flex flex-col items-center justify-center">
                  <p className="text-emerald-400 font-bold text-[6mm]">CALENDRIER DES PAIEMENTS</p>
                  <p className="text-white text-[4mm]">{member.firstName} {member.lastName} - {selectedYear}</p>
                </div>

                {/* Tableau */}
                <div className="p-[5mm]">
                  {/* En-têtes du tableau */}
                  <div className="grid grid-cols-5 bg-emerald-500 text-slate-900 text-[3.5mm] font-bold py-[2mm]">
                    <div className="text-center">MOIS</div>
                    <div className="text-center">MONTANT</div>
                    <div className="text-center">ÉCHÉANCE</div>
                    <div className="text-center">PAIEMENT</div>
                    <div className="text-center">CACHET/SIGNATURE</div>
                  </div>

                  {/* Lignes du tableau */}
                  {payments.map((payment, idx) => (
                    <div key={idx} className={`grid grid-cols-5 text-[3mm] py-[2mm] border-b border-slate-200 ${idx % 2 === 0 ? 'bg-emerald-50' : ''}`}>
                      <div className="text-center">{payment.month}</div>
                      <div className="text-center">{payment.amount.toLocaleString()} F</div>
                      <div className="text-center">{new Date(payment.dueDate).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })}</div>
                      <div className="text-center text-emerald-600">
                        {payment.paidDate ? new Date(payment.paidDate).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' }) : '-'}
                      </div>
                      <div className="text-center border border-slate-300 mx-[2mm] h-[8mm]"></div>
                    </div>
                  ))}
                </div>

                {/* Pied de page */}
                <div className="absolute bottom-[5mm] left-0 right-0 text-center text-[3mm] text-slate-500 italic">
                  <p>Chaque paiement doit être validé par le cachet du secrétariat</p>
                  <p>Ce carnet est la propriété du licencié et doit être conservé</p>
                </div>
              </div>
            )}

            {/* Page 3: Historique */}
            {currentPage === 3 && (
              <div className="w-full h-full bg-white">
                {/* En-tête */}
                <div className="h-[24mm] bg-slate-900 flex flex-col items-center justify-center">
                  <p className="text-emerald-400 font-bold text-[6mm]">HISTORIQUE DES PAIEMENTS</p>
                  <p className="text-white text-[4mm]">Année {selectedYear}</p>
                </div>

                {/* Résumé */}
                <div className="mx-[5mm] mt-[5mm] bg-emerald-50 border-2 border-emerald-500 rounded p-[3mm]">
                  <p className="text-slate-900 font-bold text-[5mm] text-center mb-[2mm]">RÉCAPITULATIF</p>
                  <div className="grid grid-cols-2 text-[4mm]">
                    <div>
                      <p>Total dû: {totalExpected.toLocaleString()} FCFA</p>
                      <p>Total payé: {totalPaid.toLocaleString()} FCFA</p>
                      <p>Solde restant: {(totalExpected - totalPaid).toLocaleString()} FCFA</p>
                    </div>
                    <div>
                      <p>Taux de recouvrement: {Math.round((totalPaid / totalExpected) * 100)}%</p>
                      <p>Mensualités payées: {payments.filter(p => p.status === 'paid').length}/12</p>
                      <p>Mensualités en retard: {payments.filter(p => p.status === 'overdue').length}</p>
                    </div>
                  </div>
                </div>

                {/* Détail des paiements */}
                <div className="p-[5mm]">
                  <p className="text-slate-900 font-bold text-[5mm] mb-[2mm]">DÉTAIL DES TRANSACTIONS</p>
                  
                  {/* En-têtes */}
                  <div className="grid grid-cols-5 bg-emerald-500 text-slate-900 text-[3mm] font-bold py-[1.5mm]">
                    <div className="text-center">DATE</div>
                    <div className="text-center">MOIS</div>
                    <div className="text-center">MONTANT</div>
                    <div className="text-center">MÉTHODE</div>
                    <div className="text-center">REÇU N°</div>
                  </div>

                  {/* Lignes */}
                  {payments.filter(p => p.paidAmount > 0).map((payment, idx) => (
                    <div key={idx} className={`grid grid-cols-5 text-[2.5mm] py-[1.5mm] border-b border-slate-200 ${idx % 2 === 0 ? 'bg-slate-50' : ''}`}>
                      <div className="text-center">{payment.paidDate ? new Date(payment.paidDate).toLocaleDateString('fr-FR') : '-'}</div>
                      <div className="text-center">{payment.month}</div>
                      <div className="text-center">{payment.paidAmount.toLocaleString()} F</div>
                      <div className="text-center">{payment.paymentMethod || '-'}</div>
                      <div className="text-center">{payment.receiptNumber || '-'}</div>
                    </div>
                  ))}
                </div>

                {/* Pied de page */}
                <div className="absolute bottom-[5mm] left-0 right-0 text-center text-[3mm] text-slate-500 italic">
                  <p>Document généré le {new Date().toLocaleDateString('fr-FR')}</p>
                  <p>À conserver précieusement</p>
                </div>
              </div>
            )}

            {/* Page 4: Conditions */}
            {currentPage === 4 && (
              <div className="w-full h-full bg-white">
                {/* En-tête */}
                <div className="h-[24mm] bg-slate-900 flex flex-col items-center justify-center">
                  <p className="text-emerald-400 font-bold text-[6mm]">CONDITIONS ET VALIDATION</p>
                  <p className="text-white text-[4mm]">Confidence Sports Academy</p>
                </div>

                <div className="p-[5mm]">
                  {/* Modalités */}
                  <p className="text-slate-900 font-bold text-[5mm] mb-[2mm]">MODALITÉS DE PAIEMENT</p>
                  <div className="text-[3.5mm] text-slate-700 space-y-[1.5mm]">
                    <p>• Les mensualités sont dues le 5 de chaque mois</p>
                    <p>• Tout retard entraîne des frais de 5 000 FCFA</p>
                    <p>• Paiement accepté : Espèces, Mobile Money, Virement</p>
                    <p>• Chaque paiement doit être validé par cachet</p>
                    <p>• Ce carnet doit être présenté à chaque paiement</p>
                    <p>• En cas de perte, prévenir immédiatement le secrétariat</p>
                    <p>• Le duplicata est payant (5 000 FCFA)</p>
                    <p>• Ce carnet est la propriété du licencié</p>
                  </div>

                  {/* Contact */}
                  <p className="text-emerald-600 font-bold text-[5mm] mt-[5mm] mb-[2mm]">CONTACT</p>
                  <div className="text-[3.5mm] text-slate-700 space-y-[1.5mm]">
                    <p>📍 Cocody, Abidjan, Côte d'Ivoire</p>
                    <p>📞 +225 27 22 44 55 66</p>
                    <p>📧 contact@csa-taekwondo.ci</p>
                    <p>🌐 www.csa-taekwondo.ci</p>
                  </div>

                  {/* Zone de validation */}
                  <div className="mt-[8mm] border-2 border-emerald-500 rounded p-[3mm]">
                    <p className="text-slate-900 font-bold text-[5mm] text-center mb-[3mm]">VALIDATION DU CARNET</p>
                    <div className="text-[3.5mm] text-slate-600 space-y-[3mm]">
                      <p>Date d'émission: _____________________</p>
                      <p>Signature du Directeur: _____________________</p>
                      <p>Cachet de l'Académie:</p>
                      <div className="h-[15mm] border border-slate-300 rounded"></div>
                    </div>
                  </div>
                </div>

                {/* Pied de page */}
                <div className="absolute bottom-[3mm] left-0 right-0 text-center text-[2.5mm] text-slate-400 italic">
                  <p>Affiliée FITKD • Homologuée Kukkiwon • Membre World Taekwondo</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center gap-2 mt-4">
          {[1, 2, 3, 4].map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentPage === page ? 'bg-emerald-500' : 'bg-slate-600 hover:bg-slate-500'
              }`}
            />
          ))}
        </div>

        {/* Page labels */}
        <div className="grid grid-cols-4 gap-2 mt-4 text-center text-xs text-slate-400">
          <div>Couverture</div>
          <div>Calendrier</div>
          <div>Historique</div>
          <div>Conditions</div>
        </div>
      </div>

      {/* Information */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-5">
        <h3 className="text-blue-400 font-semibold mb-3">💡 Informations sur le Carnet</h3>
        <div className="space-y-2 text-sm text-slate-300">
          <p><strong>Format :</strong> A6 livret (105 × 148 mm) - 4 pages</p>
          <p><strong>Contenu :</strong></p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Page 1 : Couverture avec informations du licencié</li>
            <li>Page 2 : Calendrier des 12 mensualités avec cases pour cachet</li>
            <li>Page 3 : Historique détaillé des paiements effectués</li>
            <li>Page 4 : Conditions, contact et zone de validation</li>
          </ul>
          <p><strong>Usage :</strong></p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Présenté à chaque paiement au secrétariat</li>
            <li>Cacheté et signé par le responsable</li>
            <li>Conservé par le licencié comme preuve de paiement</li>
            <li>Permet un suivi en ligne (numérique) et hors ligne (papier)</li>
          </ul>
          <p><strong>Impression :</strong> Format A6, impression recto simple, découpe en livret</p>
        </div>
      </div>

      {/* Modal de gestion de photo */}
      {showPhotoModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowPhotoModal(false)}>
          <div className="bg-slate-800 rounded-2xl border border-slate-700 max-w-md w-full" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-slate-700 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Photo du Licencié</h3>
              <button onClick={() => setShowPhotoModal(false)} className="text-slate-400 hover:text-white text-2xl">&times;</button>
            </div>
            <div className="p-6 space-y-4">
              {/* Aperçu de la photo actuelle */}
              <div className="flex justify-center">
                <div className="w-[100px] h-[120px] bg-slate-700 border-2 border-emerald-500 rounded flex items-center justify-center overflow-hidden">
                  {memberPhoto ? (
                    <img src={memberPhoto} alt="Photo du licencié" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center">
                      <Camera className="w-12 h-12 text-slate-500 mx-auto mb-2" />
                      <p className="text-slate-500 text-xs">Aucune photo</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Informations du licencié */}
              <div className="text-center">
                <p className="text-white font-semibold">{member.firstName} {member.lastName}</p>
                <p className="text-slate-400 text-sm">{member.licenseNumber}</p>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handlePhotoUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  <Upload className="w-5 h-5" />
                  {memberPhoto ? 'Changer la Photo' : 'Ajouter une Photo'}
                </button>
                {memberPhoto && (
                  <button
                    onClick={handlePhotoDelete}
                    className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium transition-colors"
                  >
                    <X className="w-5 h-5" />
                    Supprimer la Photo
                  </button>
                )}
              </div>

              {/* Instructions */}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                <p className="text-blue-400 text-xs">
                  💡 La photo sera affichée sur la couverture du carnet de paiement et incluse dans le PDF généré.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
