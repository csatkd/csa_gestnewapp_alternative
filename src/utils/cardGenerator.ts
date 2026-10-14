import jsPDF from 'jspdf';
import { Member } from '../types';

interface MemberCard {
  id: string;
  memberId: string;
  memberName: string;
  licenseNumber: string;
  beltColor: string;
  beltRank: string;
  issueDate: string;
  expiryDate: string;
  status: string;
  cardNumber: string;
  qrCode: string;
}

const getBeltColorHex = (beltColor: string): string => {
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

export function generateMemberCardPDF(member: Member, card: MemberCard): void {
  // Format carte de crédit: 85.60 × 53.98 mm
  const cardWidth = 85.6;
  const cardHeight = 53.98;
  
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: [cardWidth, cardHeight]
  });

  // Fond avec couleur unie (dégradé simulé)
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, cardWidth, cardHeight, 'F');
  
  // Overlay vert émeraude au centre
  doc.setFillColor(6, 78, 59); // emerald-900
  doc.rect(cardWidth * 0.3, 0, cardWidth * 0.4, cardHeight, 'F');

  // Bordure
  doc.setDrawColor(16, 185, 129);
  doc.setLineWidth(0.5);
  doc.rect(1, 1, cardWidth - 2, cardHeight - 2);

  // Logo CSA (cercle avec symbole)
  doc.setFillColor(16, 185, 129);
  doc.circle(10, 8, 4, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(6);
  doc.setFont('helvetica', 'bold');
  doc.text('CSA', 10, 9, { align: 'center' });

  // Nom de l'académie
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('CONFIDENCE SPORTS ACADEMY', 16, 7);
  
  doc.setFontSize(5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(16, 185, 129);
  doc.text('TAEKWONDO - FITKD • KUKKIWON', 16, 10);

  // Numéro de carte
  doc.setFontSize(4);
  doc.setTextColor(148, 163, 184);
  doc.text(`N° ${card.cardNumber}`, cardWidth - 5, 5, { align: 'right' });

  // Photo placeholder (carré)
  doc.setFillColor(51, 65, 85);
  doc.rect(5, 15, 15, 15, 'F');
  doc.setDrawColor(16, 185, 129);
  doc.setLineWidth(0.3);
  doc.rect(5, 15, 15, 15, 'S');
  
  // Icône personne dans la photo
  doc.setFillColor(100, 116, 139);
  doc.circle(12.5, 20, 2, 'F');
  doc.rect(9.5, 23, 6, 4, 'F');

  // Nom du membre
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text(card.memberName.toUpperCase(), 23, 18);

  // Numéro de licence
  doc.setFontSize(5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(16, 185, 129);
  doc.text(`Licence: ${card.licenseNumber}`, 23, 22);

  // Grade avec ceinture de couleur
  const beltY = 26;
  doc.setTextColor(148, 163, 184);
  doc.setFontSize(4);
  doc.text('GRADE:', 23, beltY);
  
  // Ceinture colorée
  doc.setFillColor(getBeltColorHex(card.beltColor));
  doc.rect(30, beltY - 1.5, 8, 2, 'F');
  doc.setDrawColor(255, 255, 255);
  doc.setLineWidth(0.2);
  doc.rect(30, beltY - 1.5, 8, 2, 'S');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(4);
  doc.text(card.beltColor.toUpperCase(), 40, beltY);

  // Dates
  doc.setFontSize(4);
  doc.setTextColor(148, 163, 184);
  doc.text('ÉMISSION:', 23, 31);
  doc.setTextColor(255, 255, 255);
  doc.text(new Date(card.issueDate).toLocaleDateString('fr-FR'), 33, 31);

  doc.setTextColor(148, 163, 184);
  doc.text('EXPIRATION:', 23, 34);
  doc.setTextColor(255, 255, 255);
  doc.text(new Date(card.expiryDate).toLocaleDateString('fr-FR'), 35, 34);

  // QR Code placeholder (carré avec pattern)
  const qrSize = 10;
  const qrX = cardWidth - qrSize - 3;
  const qrY = cardHeight - qrSize - 3;
  
  doc.setFillColor(255, 255, 255);
  doc.rect(qrX, qrY, qrSize, qrSize, 'F');
  
  // Pattern QR simplifié
  doc.setFillColor(0, 0, 0);
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if ((i + j) % 2 === 0) {
        doc.rect(qrX + 1 + i * 1.6, qrY + 1 + j * 1.6, 1.4, 1.4, 'F');
      }
    }
  }

  // Texte de vérification
  doc.setFontSize(3);
  doc.setTextColor(16, 185, 129);
  doc.text('Vérification:', qrX - 1, qrY - 1);
  doc.setFontSize(2.5);
  doc.setTextColor(148, 163, 184);
  doc.text('csa-taekwondo.ci/verify', qrX - 1, qrY + qrSize + 1);

  // Signature
  doc.setFontSize(4);
  doc.setTextColor(148, 163, 184);
  doc.text('Directeur Technique', cardWidth - 25, cardHeight - 8);
  
  doc.setFontSize(5);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(255, 255, 255);
  doc.text('Maître Koné I.', cardWidth - 25, cardHeight - 5);
  
  // Ligne de signature
  doc.setDrawColor(16, 185, 129);
  doc.setLineWidth(0.3);
  doc.line(cardWidth - 25, cardHeight - 3, cardWidth - 5, cardHeight - 3);

  // Mentions légales en bas
  doc.setFontSize(2.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text('Cette carte est la propriété de la CSA. En cas de perte, merci de contacter le secrétariat.', cardWidth / 2, cardHeight - 1, { align: 'center' });

  // Sauvegarder le PDF
  const fileName = `Carte_Membre_${card.memberName.replace(/\s/g, '_')}_${card.cardNumber}.pdf`;
  doc.save(fileName);
}

export function generateMultipleCardsPDF(members: Member[], cards: MemberCard[]): void {
  const cardWidth = 85.6;
  const cardHeight = 53.98;
  const margin = 5;
  const cardsPerRow = 2;
  const cardsPerColumn = 4;
  
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  let pageIndex = 0;
  let cardIndex = 0;

  members.forEach((member, idx) => {
    const card = cards[idx];
    if (!card) return;

    const row = Math.floor((cardIndex % (cardsPerRow * cardsPerColumn)) / cardsPerRow);
    const col = cardIndex % cardsPerRow;

    // Nouvelle page si nécessaire
    if (cardIndex > 0 && cardIndex % (cardsPerRow * cardsPerColumn) === 0) {
      doc.addPage();
      pageIndex++;
    }

    const x = margin + col * (cardWidth + margin);
    const y = margin + row * (cardHeight + margin);

    // Fond de carte
    doc.setFillColor(15, 23, 42);
    doc.rect(x, y, cardWidth, cardHeight, 'F');

    // Bordure
    doc.setDrawColor(16, 185, 129);
    doc.setLineWidth(0.5);
    doc.rect(x + 0.5, y + 0.5, cardWidth - 1, cardHeight - 1);

    // Logo
    doc.setFillColor(16, 185, 129);
    doc.circle(x + 8, y + 6, 3, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(5);
    doc.setFont('helvetica', 'bold');
    doc.text('CSA', x + 8, y + 7, { align: 'center' });

    // Nom académie
    doc.setFontSize(6);
    doc.setTextColor(255, 255, 255);
    doc.text('CONFIDENCE SPORTS', x + 13, y + 5);
    doc.setFontSize(4);
    doc.setTextColor(16, 185, 129);
    doc.text('ACADEMY - TAEKWONDO', x + 13, y + 8);

    // Numéro carte
    doc.setFontSize(3);
    doc.setTextColor(148, 163, 184);
    doc.text(`N° ${card.cardNumber}`, x + cardWidth - 3, y + 4, { align: 'right' });

    // Photo
    doc.setFillColor(51, 65, 85);
    doc.rect(x + 4, y + 12, 12, 12, 'F');
    doc.setDrawColor(16, 185, 129);
    doc.setLineWidth(0.2);
    doc.rect(x + 4, y + 12, 12, 12, 'S');

    // Nom membre
    doc.setFontSize(6);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text(card.memberName.toUpperCase(), x + 18, y + 15);

    // Licence
    doc.setFontSize(4);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(16, 185, 129);
    doc.text(`Licence: ${card.licenseNumber}`, x + 18, y + 18);

    // Grade
    doc.setTextColor(148, 163, 184);
    doc.setFontSize(3);
    doc.text('GRADE:', x + 18, y + 22);
    
    doc.setFillColor(getBeltColorHex(card.beltColor));
    doc.rect(x + 24, y + 20.5, 6, 1.5, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(3);
    doc.text(card.beltColor.toUpperCase(), x + 31, y + 22);

    // Dates
    doc.setFontSize(3);
    doc.setTextColor(148, 163, 184);
    doc.text('ÉMISSION:', x + 18, y + 26);
    doc.setTextColor(255, 255, 255);
    doc.text(new Date(card.issueDate).toLocaleDateString('fr-FR'), x + 26, y + 26);

    doc.setTextColor(148, 163, 184);
    doc.text('EXPIRATION:', x + 18, y + 29);
    doc.setTextColor(255, 255, 255);
    doc.text(new Date(card.expiryDate).toLocaleDateString('fr-FR'), x + 28, y + 29);

    // QR Code
    const qrSize = 8;
    doc.setFillColor(255, 255, 255);
    doc.rect(x + cardWidth - qrSize - 2, y + cardHeight - qrSize - 2, qrSize, qrSize, 'F');
    
    doc.setFillColor(0, 0, 0);
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if ((i + j) % 2 === 0) {
          doc.rect(x + cardWidth - qrSize - 1 + i * 1.5, y + cardHeight - qrSize - 1 + j * 1.5, 1.2, 1.2, 'F');
        }
      }
    }

    cardIndex++;
  });

  // Sauvegarder
  doc.save('Cartes_Membres_CSA.pdf');
}
