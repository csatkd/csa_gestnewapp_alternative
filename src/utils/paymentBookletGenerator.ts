import jsPDF from 'jspdf';
import { Member } from '../types';

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

const academyInfo = {
  name: 'CONFIDENCE SPORTS ACADEMY',
  subtitle: 'Taekwondo - Dojang de Cocody',
  address: 'Cocody, Abidjan, Côte d\'Ivoire',
  phone: '+225 27 22 44 55 66',
  email: 'contact@csa-taekwondo.ci',
  fitkd: 'FITKD-CI-2024-001',
};

export function generateAnnualPaymentBooklet(
  member: Member,
  payments: MonthlyPayment[],
  year: number
): void {
  // Format A6: 105 × 148 mm (livret 4 pages)
  const pageWidth = 105;
  const pageHeight = 148;
  
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: [pageWidth, pageHeight]
  });

  // ========== PAGE 1 : COUVERTURE ==========
  
  // Fond dégradé
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');
  
  // Bande décorative en haut
  doc.setFillColor(16, 185, 129);
  doc.rect(0, 0, pageWidth, 25, 'F');
  
  // Logo et titre
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(academyInfo.name, pageWidth / 2, 10, { align: 'center' });
  
  doc.setFontSize(7);
  doc.text('CARNET DE SUIVI ANNUEL', pageWidth / 2, 15, { align: 'center' });
  doc.text(`DES PAIEMENTS - ${year}`, pageWidth / 2, 19, { align: 'center' });
  
  // Informations du licencié
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.text('LICENCIÉ(E)', pageWidth / 2, 35, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(16, 185, 129);
  doc.text(`${member.firstName} ${member.lastName}`, pageWidth / 2, 42, { align: 'center' });
  
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(200, 200, 200);
  doc.text(`N° Licence: ${member.licenseNumber}`, pageWidth / 2, 48, { align: 'center' });
  doc.text(`Grade: Ceinture ${member.beltColor}${member.dan ? ` ${member.dan}ème Dan` : ''}`, pageWidth / 2, 52, { align: 'center' });
  
  // Période
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text(`Période: Janvier ${year} - Décembre ${year}`, pageWidth / 2, 62, { align: 'center' });
  
  // Ligne décorative
  doc.setDrawColor(16, 185, 129);
  doc.setLineWidth(0.5);
  doc.line(20, 68, pageWidth - 20, 68);
  
  // Résumé financier
  doc.setFontSize(7);
  doc.setTextColor(200, 200, 200);
  const totalExpected = payments.reduce((sum, p) => sum + p.amount, 0);
  const totalPaid = payments.reduce((sum, p) => sum + p.paidAmount, 0);
  
  doc.text('MENSUALITÉ:', 15, 75);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(16, 185, 129);
  doc.text(`${payments[0]?.amount.toLocaleString() || 0} FCFA`, 50, 75);
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(200, 200, 200);
  doc.text('TOTAL ANNUEL:', 15, 82);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(16, 185, 129);
  doc.text(`${totalExpected.toLocaleString()} FCFA`, 50, 82);
  
  // Bande décorative en bas
  doc.setFillColor(16, 185, 129);
  doc.rect(0, pageHeight - 20, pageWidth, 20, 'F');
  
  doc.setFontSize(6);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('Ce carnet doit être présenté à chaque paiement', pageWidth / 2, pageHeight - 14, { align: 'center' });
  doc.text('et conservé par le licencié', pageWidth / 2, pageHeight - 10, { align: 'center' });
  
  doc.setFontSize(5);
  doc.text(`${academyInfo.address} | ${academyInfo.phone}`, pageWidth / 2, pageHeight - 5, { align: 'center' });

  // ========== PAGE 2 : CALENDRIER DES MENSUALITÉS ==========
  
  doc.addPage([pageWidth, pageHeight], 'portrait');
  
  // Fond
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');
  
  // En-tête
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, pageWidth, 12, 'F');
  
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(16, 185, 129);
  doc.text('CALENDRIER DES PAIEMENTS', pageWidth / 2, 5, { align: 'center' });
  
  doc.setFontSize(6);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(255, 255, 255);
  doc.text(`${member.firstName} ${member.lastName} - ${year}`, pageWidth / 2, 9, { align: 'center' });
  
  // Tableau des mensualités
  let y = 16;
  const rowHeight = 10;
  const colWidths = [20, 18, 18, 18, 25];
  
  // En-têtes du tableau
  doc.setFillColor(16, 185, 129);
  doc.rect(3, y, pageWidth - 6, 6, 'F');
  
  doc.setFontSize(5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('MOIS', 5, y + 4);
  doc.text('MONTANT', colWidths[0] + 5, y + 4);
  doc.text('ÉCHÉANCE', colWidths[0] + colWidths[1] + 5, y + 4);
  doc.text('PAIEMENT', colWidths[0] + colWidths[1] + colWidths[2] + 5, y + 4);
  doc.text('CACHET/SIGNATURE', colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3] + 5, y + 4);
  
  y += 7;
  
  // Lignes du tableau
  payments.forEach((payment, idx) => {
    // Alternance de couleurs
    if (idx % 2 === 0) {
      doc.setFillColor(240, 253, 244);
      doc.rect(3, y, pageWidth - 6, rowHeight, 'F');
    }
    
    // Bordure
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.2);
    doc.rect(3, y, pageWidth - 6, rowHeight);
    
    // Contenu
    doc.setFontSize(5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);
    
    doc.text(payment.month, 5, y + 4);
    doc.text(`${payment.amount.toLocaleString()} F`, colWidths[0] + 5, y + 4);
    doc.text(new Date(payment.dueDate).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' }), colWidths[0] + colWidths[1] + 5, y + 4);
    
    if (payment.paidDate) {
      doc.setTextColor(16, 185, 129);
      doc.text(new Date(payment.paidDate).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' }), colWidths[0] + colWidths[1] + colWidths[2] + 5, y + 4);
    } else {
      doc.setTextColor(200, 200, 200);
      doc.text('-', colWidths[0] + colWidths[1] + colWidths[2] + 5, y + 4);
    }
    
    // Case pour cachet
    doc.setDrawColor(150, 150, 150);
    doc.setLineWidth(0.3);
    doc.rect(colWidths[0] + colWidths[1] + colWidths[2] + colWidths[3] + 5, y + 1, 20, rowHeight - 2);
    
    y += rowHeight;
  });
  
  // Pied de page
  doc.setFontSize(5);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(100, 100, 100);
  doc.text('Chaque paiement doit être validé par le cachet du secrétariat', pageWidth / 2, pageHeight - 8, { align: 'center' });
  doc.text('Ce carnet est la propriété du licencié et doit être conservé', pageWidth / 2, pageHeight - 4, { align: 'center' });

  // ========== PAGE 3 : HISTORIQUE DES PAIEMENTS ==========
  
  doc.addPage([pageWidth, pageHeight], 'portrait');
  
  // Fond
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');
  
  // En-tête
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, pageWidth, 12, 'F');
  
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(16, 185, 129);
  doc.text('HISTORIQUE DES PAIEMENTS', pageWidth / 2, 5, { align: 'center' });
  
  doc.setFontSize(6);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(255, 255, 255);
  doc.text(`Année ${year}`, pageWidth / 2, 9, { align: 'center' });
  
  // Résumé
  y = 18;
  doc.setFillColor(240, 253, 244);
  doc.rect(5, y, pageWidth - 10, 20, 'F');
  doc.setDrawColor(16, 185, 129);
  doc.setLineWidth(0.5);
  doc.rect(5, y, pageWidth - 10, 20);
  
  doc.setFontSize(6);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('RÉCAPITULATIF', pageWidth / 2, y + 4, { align: 'center' });
  
  doc.setFontSize(5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 60, 60);
  doc.text(`Total dû: ${totalExpected.toLocaleString()} FCFA`, 10, y + 9);
  doc.text(`Total payé: ${totalPaid.toLocaleString()} FCFA`, 10, y + 13);
  doc.text(`Solde restant: ${(totalExpected - totalPaid).toLocaleString()} FCFA`, 10, y + 17);
  
  doc.text(`Taux de recouvrement: ${Math.round((totalPaid / totalExpected) * 100)}%`, 60, y + 9);
  doc.text(`Mensualités payées: ${payments.filter(p => p.status === 'paid').length}/12`, 60, y + 13);
  doc.text(`Mensualités en retard: ${payments.filter(p => p.status === 'overdue').length}`, 60, y + 17);
  
  // Détail des paiements
  y += 25;
  doc.setFontSize(6);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('DÉTAIL DES TRANSACTIONS', 5, y);
  
  y += 4;
  
  // En-têtes
  doc.setFillColor(16, 185, 129);
  doc.rect(3, y, pageWidth - 6, 5, 'F');
  
  doc.setFontSize(4.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('DATE', 5, y + 3.5);
  doc.text('MOIS', 25, y + 3.5);
  doc.text('MONTANT', 45, y + 3.5);
  doc.text('MÉTHODE', 65, y + 3.5);
  doc.text('REÇU N°', 85, y + 3.5);
  
  y += 6;
  
  // Lignes des paiements effectués
  payments.filter(p => p.paidAmount > 0).forEach((payment, idx) => {
    if (idx % 2 === 0) {
      doc.setFillColor(248, 250, 252);
      doc.rect(3, y, pageWidth - 6, 5, 'F');
    }
    
    doc.setFontSize(4);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);
    
    doc.text(payment.paidDate ? new Date(payment.paidDate).toLocaleDateString('fr-FR') : '-', 5, y + 3.5);
    doc.text(payment.month, 25, y + 3.5);
    doc.text(`${payment.paidAmount.toLocaleString()} F`, 45, y + 3.5);
    doc.text(payment.paymentMethod || '-', 65, y + 3.5);
    doc.text(payment.receiptNumber || '-', 85, y + 3.5);
    
    y += 5;
  });
  
  // Pied de page
  doc.setFontSize(5);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(100, 100, 100);
  doc.text('Document généré le ' + new Date().toLocaleDateString('fr-FR'), pageWidth / 2, pageHeight - 8, { align: 'center' });
  doc.text('À conserver précieusement', pageWidth / 2, pageHeight - 4, { align: 'center' });

  // ========== PAGE 4 : CONDITIONS ET VALIDATION ==========
  
  doc.addPage([pageWidth, pageHeight], 'portrait');
  
  // Fond
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');
  
  // En-tête
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, pageWidth, 12, 'F');
  
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(16, 185, 129);
  doc.text('CONDITIONS ET VALIDATION', pageWidth / 2, 5, { align: 'center' });
  
  doc.setFontSize(6);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(255, 255, 255);
  doc.text(academyInfo.name, pageWidth / 2, 9, { align: 'center' });
  
  // Conditions
  y = 18;
  doc.setFontSize(6);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('MODALITÉS DE PAIEMENT', 5, y);
  
  y += 5;
  doc.setFontSize(5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 60, 60);
  
  const conditions = [
    '• Les mensualités sont dues le 5 de chaque mois',
    '• Tout retard entraîne des frais de 5 000 FCFA',
    '• Paiement accepté : Espèces, Mobile Money, Virement',
    '• Chaque paiement doit être validé par cachet',
    '• Ce carnet doit être présenté à chaque paiement',
    '• En cas de perte, prévenir immédiatement le secrétariat',
    '• Le duplicata est payant (5 000 FCFA)',
    '• Ce carnet est la propriété du licencié',
  ];
  
  conditions.forEach(condition => {
    doc.text(condition, 5, y);
    y += 4;
  });
  
  // Contact
  y += 5;
  doc.setFontSize(6);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(16, 185, 129);
  doc.text('CONTACT', 5, y);
  
  y += 5;
  doc.setFontSize(5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 60, 60);
  doc.text(`📍 ${academyInfo.address}`, 5, y); y += 3.5;
  doc.text(`📞 ${academyInfo.phone}`, 5, y); y += 3.5;
  doc.text(`📧 ${academyInfo.email}`, 5, y); y += 3.5;
  doc.text(`🌐 www.csa-taekwondo.ci`, 5, y);
  
  // Zone de validation
  y += 15;
  doc.setDrawColor(16, 185, 129);
  doc.setLineWidth(0.5);
  doc.rect(5, y, pageWidth - 10, 30);
  
  doc.setFontSize(6);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('VALIDATION DU CARNET', pageWidth / 2, y + 5, { align: 'center' });
  
  doc.setFontSize(5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  doc.text('Date d\'émission: _____________________', 10, y + 12);
  doc.text('Signature du Directeur: _____________________', 10, y + 18);
  doc.text('Cachet de l\'Académie:', 10, y + 24);
  
  // Pied de page
  doc.setFontSize(4);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(150, 150, 150);
  doc.text('Affiliée FITKD • Homologuée Kukkiwon • Membre World Taekwondo', pageWidth / 2, pageHeight - 4, { align: 'center' });

  // Sauvegarder
  const fileName = `Carnet_Paiements_${member.lastName}_${member.firstName}_${year}.pdf`;
  doc.save(fileName);
}
