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
    format: [cardWidth, cardHeight * 2] // Double hauteur pour recto-verso
  });

  // ========== RECTO (Page 1) ==========
  
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

  // ========== VERSO (Page 2) ==========
  
  // Nouvelle page pour le verso
  doc.addPage([cardWidth, cardHeight], 'landscape');
  
  // Fond du verso
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, cardWidth, cardHeight, 'F');
  
  // Bordure
  doc.setDrawColor(16, 185, 129);
  doc.setLineWidth(0.5);
  doc.rect(1, 1, cardWidth - 2, cardHeight - 2);
  
  // Bande décorative en haut
  doc.setFillColor(16, 185, 129);
  doc.rect(0, 0, cardWidth, 8, 'F');
  
  // Titre du verso
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('INFORMATIONS IMPORTANTES', cardWidth / 2, 5.5, { align: 'center' });
  
  // QR Code plus grand au centre
  const qrSizeBack = 20;
  const qrXBack = (cardWidth - qrSizeBack) / 2;
  const qrYBack = 12;
  
  doc.setFillColor(255, 255, 255);
  doc.rect(qrXBack, qrYBack, qrSizeBack, qrSizeBack, 'F');
  
  // Pattern QR simplifié
  doc.setFillColor(0, 0, 0);
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if ((i + j) % 2 === 0 || (i < 2 && j < 2) || (i > 5 && j < 2) || (i < 2 && j > 5)) {
        doc.rect(qrXBack + 1 + i * 2.2, qrYBack + 1 + j * 2.2, 2, 2, 'F');
      }
    }
  }
  
  // Texte sous le QR code
  doc.setFontSize(4);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(16, 185, 129);
  doc.text('SCANNEZ POUR VÉRIFICATION', cardWidth / 2, qrYBack + qrSizeBack + 3, { align: 'center' });
  
  doc.setFontSize(3);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(255, 255, 255);
  doc.text('csa-taekwondo.ci/verify', cardWidth / 2, qrYBack + qrSizeBack + 6, { align: 'center' });
  
  // Informations de contact
  let y = qrYBack + qrSizeBack + 10;
  
  doc.setFontSize(4);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(16, 185, 129);
  doc.text('CONTACT', 5, y);
  y += 3;
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(3);
  doc.text('📍 Cocody, Abidjan, Côte d\'Ivoire', 5, y); y += 2.5;
  doc.text('📞 +225 27 22 44 55 66', 5, y); y += 2.5;
  doc.text('📧 contact@csa-taekwondo.ci', 5, y); y += 2.5;
  doc.text('🌐 www.csa-taekwondo.ci', 5, y); y += 4;
  
  // Numéro d'urgence
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(239, 68, 68);
  doc.text('⚠ URGENCE', 5, y); y += 2.5;
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(3);
  doc.text('Secrétariat: +225 07 12 34 56 78', 5, y); y += 2.5;
  doc.text('Directeur: +225 07 98 76 54 32', 5, y); y += 4;
  
  // Conditions d'utilisation (colonne droite)
  y = qrY + qrSize + 10;
  
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(16, 185, 129);
  doc.text('CONDITIONS', 50, y);
  y += 3;
  
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(200, 200, 200);
  doc.setFontSize(2.5);
  
  const conditions = [
    '• Cette carte est strictement personnelle',
    '• Elle doit être présentée sur demande',
    '• En cas de perte, prévenir immédiatement',
    '• Le duplicata est payant (5 000 FCFA)',
    '• Carte non transférable',
    '• Validité: 1 an à compter de l\'émission',
    '• Renouvellement annuel obligatoire',
  ];
  
  conditions.forEach(condition => {
    doc.text(condition, 50, y);
    y += 2.2;
  });
  
  // Bande décorative en bas
  doc.setFillColor(16, 185, 129);
  doc.rect(0, cardHeight - 6, cardWidth, 6, 'F');
  
  // Texte en bas
  doc.setFontSize(2.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('CONFIDENCE SPORTS ACADEMY - EXCELLENCE MARTIALE', cardWidth / 2, cardHeight - 3.5, { align: 'center' });
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(2);
  doc.text('Affiliée FITKD • Homologuée Kukkiwon • Membre World Taekwondo', cardWidth / 2, cardHeight - 1.5, { align: 'center' });

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

  // ========== RECTO (Pages impaires) ==========
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
    const qrSizeMulti = 8;
    doc.setFillColor(255, 255, 255);
    doc.rect(x + cardWidth - qrSizeMulti - 2, y + cardHeight - qrSizeMulti - 2, qrSizeMulti, qrSizeMulti, 'F');
    
    doc.setFillColor(0, 0, 0);
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if ((i + j) % 2 === 0) {
          doc.rect(x + cardWidth - qrSizeMulti - 1 + i * 1.5, y + cardHeight - qrSizeMulti - 1 + j * 1.5, 1.2, 1.2, 'F');
        }
      }
    }

    cardIndex++;
  });

  // ========== VERSO (Pages paires) ==========
  cardIndex = 0;
  
  members.forEach((member, idx) => {
    const card = cards[idx];
    if (!card) return;

    const row = Math.floor((cardIndex % (cardsPerRow * cardsPerColumn)) / cardsPerRow);
    const col = cardIndex % cardsPerRow;

    // Nouvelle page si nécessaire (commencer sur page 2 pour le verso)
    if (cardIndex === 0) {
      doc.addPage();
    } else if (cardIndex > 0 && cardIndex % (cardsPerRow * cardsPerColumn) === 0) {
      doc.addPage();
    }

    const x = margin + col * (cardWidth + margin);
    const y = margin + row * (cardHeight + margin);

    // Fond du verso
    doc.setFillColor(15, 23, 42);
    doc.rect(x, y, cardWidth, cardHeight, 'F');

    // Bordure
    doc.setDrawColor(16, 185, 129);
    doc.setLineWidth(0.5);
    doc.rect(x + 0.5, y + 0.5, cardWidth - 1, cardHeight - 1);

    // Bande décorative en haut
    doc.setFillColor(16, 185, 129);
    doc.rect(x, y, cardWidth, 4, 'F');

    // Titre
    doc.setFontSize(4);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text('INFOS', x + cardWidth / 2, y + 3, { align: 'center' });

    // QR Code
    const qrSizeBack = 12;
    doc.setFillColor(255, 255, 255);
    doc.rect(x + (cardWidth - qrSizeBack) / 2, y + 6, qrSizeBack, qrSizeBack, 'F');
    
    doc.setFillColor(0, 0, 0);
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if ((i + j) % 2 === 0) {
          doc.rect(x + (cardWidth - qrSizeBack) / 2 + 1 + i * 2, y + 7 + j * 2, 1.5, 1.5, 'F');
        }
      }
    }

    // Texte sous QR
    doc.setFontSize(2.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(16, 185, 129);
    doc.text('SCANNEZ', x + cardWidth / 2, y + 20, { align: 'center' });

    // Contact
    doc.setFontSize(2.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(255, 255, 255);
    let textY = y + 24;
    doc.text('📍 Cocody, Abidjan', x + 3, textY); textY += 2.5;
    doc.text('📞 +225 27 22 44 55 66', x + 3, textY); textY += 2.5;
    doc.text('📧 contact@csa-taekwondo.ci', x + 3, textY); textY += 2.5;
    doc.text('🌐 www.csa-taekwondo.ci', x + 3, textY);

    // Conditions (colonne droite)
    doc.setFontSize(2);
    doc.setTextColor(200, 200, 200);
    let condY = y + 24;
    const shortConditions = [
      '• Carte personnelle',
      '• Non transférable',
      '• Validité: 1 an',
      '• Perte: 5 000 F',
    ];
    shortConditions.forEach(cond => {
      doc.text(cond, x + 50, condY);
      condY += 2;
    });

    // Bande décorative en bas
    doc.setFillColor(16, 185, 129);
    doc.rect(x, y + cardHeight - 3, cardWidth, 3, 'F');

    doc.setFontSize(2);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text('CSA - EXCELLENCE MARTIALE', x + cardWidth / 2, y + cardHeight - 1.5, { align: 'center' });

    cardIndex++;
  });

  // Sauvegarder
  doc.save('Cartes_Membres_CSA_RectoVerso.pdf');
}
