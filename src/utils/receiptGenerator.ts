import jsPDF from 'jspdf';
import { Payment, Member } from '../types';
import { mockMembers } from '../data/mockData';

const academyInfo = {
  name: 'CONFIDENCE SPORTS ACADEMY',
  subtitle: 'Taekwondo - Dojang de Cocody',
  address: 'Cocody, Abidjan, Côte d\'Ivoire',
  phone: '+225 27 22 44 55 66',
  email: 'contact@csa-taekwondo.ci',
  fitkd: 'FITKD-CI-2024-001',
  kukkiwon: 'KKW-2024-12345',
};

// Format A4 (standard)
export function generateReceiptA4(payment: Payment, member: Member) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const w = 210;

  // Header
  doc.setFillColor(30, 41, 59);
  doc.rect(0, 0, w, 35, 'F');
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text(academyInfo.name, w / 2, 12, { align: 'center' });
  doc.setFontSize(9);
  doc.setTextColor(16, 185, 129);
  doc.text(academyInfo.subtitle, w / 2, 19, { align: 'center' });
  doc.setFontSize(8);
  doc.setTextColor(200, 200, 200);
  doc.text(`${academyInfo.address} | ${academyInfo.phone}`, w / 2, 25, { align: 'center' });
  doc.text(`Affiliée FITKD • Homologuée Kukkiwon`, w / 2, 30, { align: 'center' });

  // Title
  doc.setFontSize(18);
  doc.setTextColor(16, 185, 129);
  doc.text('REÇU DE PAIEMENT', w / 2, 50, { align: 'center' });

  // Receipt number and date
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`N° Reçu: ${payment.id}`, 20, 60);
  doc.text(`Date: ${new Date().toLocaleDateString('fr-FR')}`, w - 20, 60, { align: 'right' });

  // Line
  doc.setDrawColor(16, 185, 129);
  doc.setLineWidth(0.5);
  doc.line(20, 65, w - 20, 65);

  // Member info
  let y = 75;
  doc.setFontSize(11);
  doc.setTextColor(60, 60, 60);
  doc.text('INFORMATIONS DU LICENCIÉ', 20, y);
  y += 8;
  doc.setFontSize(10);
  doc.text(`Nom: ${member.firstName} ${member.lastName}`, 25, y); y += 6;
  doc.text(`N° Licence: ${member.licenseNumber}`, 25, y); y += 6;
  doc.text(`Grade: Ceinture ${member.beltColor}${member.dan ? ` ${member.dan}ème Dan` : ''}`, 25, y); y += 6;
  doc.text(`Téléphone: ${member.phone}`, 25, y); y += 6;

  // Payment details
  y += 10;
  doc.setFontSize(11);
  doc.setTextColor(60, 60, 60);
  doc.text('DÉTAILS DU PAIEMENT', 20, y);
  y += 8;
  doc.setFontSize(10);
  doc.text(`Description: ${payment.description}`, 25, y); y += 6;
  doc.text(`Type: ${payment.type === 'cotisation' ? 'Cotisation' : payment.type === 'examen' ? 'Examen' : payment.type === 'equipement' ? 'Équipement' : 'Compétition'}`, 25, y); y += 6;
  doc.text(`Date d\'émission: ${new Date(payment.date).toLocaleDateString('fr-FR')}`, 25, y); y += 6;
  doc.text(`Échéance: ${new Date(payment.dueDate).toLocaleDateString('fr-FR')}`, 25, y); y += 10;

  // Amount box
  doc.setFillColor(240, 253, 244);
  doc.rect(20, y, w - 40, 35, 'F');
  doc.setDrawColor(16, 185, 129);
  doc.rect(20, y, w - 40, 35);

  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  doc.text('Montant Total:', 30, y + 10);
  doc.text(`${payment.amount.toLocaleString()} FCFA`, w - 30, y + 10, { align: 'right' });

  doc.text('Montant Payé:', 30, y + 18);
  doc.setTextColor(16, 185, 129);
  doc.setFontSize(12);
  doc.text(`${payment.paidAmount.toLocaleString()} FCFA`, w - 30, y + 18, { align: 'right' });

  const remaining = payment.amount - payment.paidAmount;
  doc.setTextColor(remaining > 0 ? 239 : 16, remaining > 0 ? 68 : 185, remaining > 0 ? 68 : 129);
  doc.text('Solde Restant:', 30, y + 28);
  doc.text(`${remaining.toLocaleString()} FCFA`, w - 30, y + 28, { align: 'right' });

  // Installments
  y += 45;
  if (payment.installments.length > 0) {
    doc.setFontSize(11);
    doc.setTextColor(60, 60, 60);
    doc.text('HISTORIQUE DES ACOMPTES', 20, y);
    y += 8;

    payment.installments.forEach((inst, idx) => {
      doc.setFontSize(9);
      doc.setTextColor(60, 60, 60);
      doc.text(`${idx + 1}. ${new Date(inst.date).toLocaleDateString('fr-FR')} - ${inst.amount.toLocaleString()} FCFA`, 25, y);
      doc.text(`Méthode: ${inst.method === 'cash' ? 'Espèces' : inst.method === 'mobile_money' ? 'Mobile Money' : 'Virement'}`, 120, y);
      doc.text(`Reçu: ${inst.receipt}`, w - 25, y, { align: 'right' });
      y += 6;
    });
  }

  // Footer
  y = 260;
  doc.setDrawColor(16, 185, 129);
  doc.line(20, y, w - 20, y);
  y += 10;
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text('Ce reçu certifie la réception du paiement ci-dessus mentionné.', w / 2, y, { align: 'center' });
  y += 5;
  doc.text('Merci de conserver ce document pour vos archives.', w / 2, y, { align: 'center' });
  y += 10;

  // Signatures
  doc.line(30, y + 10, 80, y + 10);
  doc.text('Trésorier CSA', 55, y + 15, { align: 'center' });

  doc.line(w - 80, y + 10, w - 30, y + 10);
  doc.text('Signature Licencié/Parent', w - 55, y + 15, { align: 'center' });

  doc.save(`Recu_${member.lastName}_${member.firstName}_${payment.id}.pdf`);
}

// Format Ticket Thermique 80mm
export function generateReceipt80mm(payment: Payment, member: Member) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: [80, 200] });
  const w = 80;
  let y = 5;

  // Header
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.text(academyInfo.name, w / 2, y, { align: 'center' }); y += 4;
  doc.setFontSize(7);
  doc.text(academyInfo.subtitle, w / 2, y, { align: 'center' }); y += 3;
  doc.text(academyInfo.address, w / 2, y, { align: 'center' }); y += 3;
  doc.text(`Tel: ${academyInfo.phone}`, w / 2, y, { align: 'center' }); y += 5;

  // Line
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.3);
  doc.line(5, y, w - 5, y); y += 4;

  // Title
  doc.setFontSize(9);
  doc.text('REÇU DE PAIEMENT', w / 2, y, { align: 'center' }); y += 4;
  doc.setFontSize(7);
  doc.text(`N°: ${payment.id}`, w / 2, y, { align: 'center' }); y += 3;
  doc.text(`Date: ${new Date().toLocaleDateString('fr-FR')}`, w / 2, y, { align: 'center' }); y += 5;

  // Line
  doc.line(5, y, w - 5, y); y += 4;

  // Member
  doc.setFontSize(7);
  doc.text(`Licencié: ${member.firstName} ${member.lastName}`, 5, y); y += 3;
  doc.text(`N° Licence: ${member.licenseNumber}`, 5, y); y += 3;
  doc.text(`Grade: ${member.beltColor}${member.dan ? ` ${member.dan}Dan` : ''}`, 5, y); y += 5;

  // Line
  doc.line(5, y, w - 5, y); y += 4;

  // Description
  doc.text(`Description:`, 5, y); y += 3;
  doc.text(payment.description, 5, y); y += 5;

  // Amounts
  doc.text(`Montant Total:`, 5, y);
  doc.text(`${payment.amount.toLocaleString()} F`, w - 5, y, { align: 'right' }); y += 3;
  doc.text(`Montant Payé:`, 5, y);
  doc.setFontSize(9);
  doc.text(`${payment.paidAmount.toLocaleString()} F`, w - 5, y, { align: 'right' }); y += 3;

  const remaining = payment.amount - payment.paidAmount;
  doc.setFontSize(7);
  doc.text(`Solde Restant:`, 5, y);
  doc.text(`${remaining.toLocaleString()} F`, w - 5, y, { align: 'right' }); y += 5;

  // Line
  doc.line(5, y, w - 5, y); y += 4;

  // Installments
  if (payment.installments.length > 0) {
    doc.text('Acomptes:', 5, y); y += 3;
    payment.installments.forEach((inst, idx) => {
      doc.text(`${idx + 1}. ${new Date(inst.date).toLocaleDateString('fr-FR')} - ${inst.amount.toLocaleString()}F`, 5, y);
      y += 3;
    });
    y += 2;
  }

  // Line
  doc.line(5, y, w - 5, y); y += 4;

  // Footer
  doc.setFontSize(6);
  doc.text('Merci de votre confiance!', w / 2, y, { align: 'center' }); y += 3;
  doc.text('CSA - Excellence Martiale', w / 2, y, { align: 'center' }); y += 3;
  doc.text(`Généré le ${new Date().toLocaleString('fr-FR')}`, w / 2, y, { align: 'center' });

  doc.save(`Recu_Ticket_${member.lastName}_${payment.id}.pdf`);
}

// Format Ticket Thermique 58mm
export function generateReceipt58mm(payment: Payment, member: Member) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: [58, 180] });
  const w = 58;
  let y = 3;

  // Header
  doc.setFontSize(8);
  doc.setTextColor(0, 0, 0);
  doc.text('CSA TAEKWONDO', w / 2, y, { align: 'center' }); y += 3;
  doc.setFontSize(6);
  doc.text('Cocody, Abidjan', w / 2, y, { align: 'center' }); y += 3;
  doc.text(`Tel: ${academyInfo.phone}`, w / 2, y, { align: 'center' }); y += 4;

  // Line
  doc.setDrawColor(0, 0, 0);
  doc.setLineWidth(0.2);
  doc.line(3, y, w - 3, y); y += 3;

  // Title
  doc.setFontSize(7);
  doc.text('REÇU', w / 2, y, { align: 'center' }); y += 3;
  doc.setFontSize(6);
  doc.text(`N°: ${payment.id}`, w / 2, y, { align: 'center' }); y += 3;
  doc.text(new Date().toLocaleDateString('fr-FR'), w / 2, y, { align: 'center' }); y += 4;

  // Line
  doc.line(3, y, w - 3, y); y += 3;

  // Member
  doc.text(`${member.firstName} ${member.lastName}`, 3, y); y += 3;
  doc.text(`Lic: ${member.licenseNumber}`, 3, y); y += 4;

  // Line
  doc.line(3, y, w - 3, y); y += 3;

  // Amounts
  doc.text(`Total: ${payment.amount.toLocaleString()}F`, 3, y); y += 3;
  doc.setFontSize(8);
  doc.text(`PAYÉ: ${payment.paidAmount.toLocaleString()}F`, 3, y); y += 3;
  doc.setFontSize(6);
  const remaining = payment.amount - payment.paidAmount;
  if (remaining > 0) {
    doc.text(`Reste: ${remaining.toLocaleString()}F`, 3, y); y += 3;
  }
  y += 3;

  // Line
  doc.line(3, y, w - 3, y); y += 3;

  // Footer
  doc.setFontSize(6);
  doc.text('Merci!', w / 2, y, { align: 'center' }); y += 3;
  doc.text('CSA Taekwondo', w / 2, y, { align: 'center' });

  doc.save(`Recu_58mm_${member.lastName}_${payment.id}.pdf`);
}

// Format HTML pour impression directe
export function generateReceiptHTML(payment: Payment, member: Member): string {
  const remaining = payment.amount - payment.paidAmount;
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Reçu ${payment.id}</title>
  <style>
    @media print {
      @page { margin: 10mm; }
      body { margin: 0; }
    }
    body {
      font-family: 'Courier New', monospace;
      max-width: 300px;
      margin: 0 auto;
      padding: 10px;
      font-size: 12px;
    }
    .header {
      text-align: center;
      border-bottom: 2px dashed #000;
      padding-bottom: 10px;
      margin-bottom: 10px;
    }
    .header h1 { font-size: 14px; margin: 0; }
    .header p { font-size: 10px; margin: 2px 0; }
    .section {
      border-bottom: 1px dashed #000;
      padding: 8px 0;
    }
    .row {
      display: flex;
      justify-content: space-between;
      margin: 3px 0;
    }
    .total {
      font-size: 16px;
      font-weight: bold;
      text-align: center;
      padding: 10px;
      border: 2px solid #000;
      margin: 10px 0;
    }
    .footer {
      text-align: center;
      font-size: 10px;
      margin-top: 10px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>${academyInfo.name}</h1>
    <p>${academyInfo.subtitle}</p>
    <p>${academyInfo.address}</p>
    <p>Tel: ${academyInfo.phone}</p>
  </div>

  <div class="section">
    <div class="row"><span>Reçu N°:</span><span>${payment.id}</span></div>
    <div class="row"><span>Date:</span><span>${new Date().toLocaleDateString('fr-FR')}</span></div>
  </div>

  <div class="section">
    <div class="row"><span>Licencié:</span><span>${member.firstName} ${member.lastName}</span></div>
    <div class="row"><span>N° Licence:</span><span>${member.licenseNumber}</span></div>
    <div class="row"><span>Grade:</span><span>${member.beltColor}${member.dan ? ` ${member.dan}Dan` : ''}</span></div>
  </div>

  <div class="section">
    <div class="row"><span>Description:</span></div>
    <div>${payment.description}</div>
  </div>

  <div class="section">
    <div class="row"><span>Montant Total:</span><span>${payment.amount.toLocaleString()} FCFA</span></div>
    <div class="row"><span>Montant Payé:</span><span>${payment.paidAmount.toLocaleString()} FCFA</span></div>
    ${remaining > 0 ? `<div class="row"><span>Solde Restant:</span><span>${remaining.toLocaleString()} FCFA</span></div>` : ''}
  </div>

  ${payment.installments.length > 0 ? `
  <div class="section">
    <div><strong>Acomptes:</strong></div>
    ${payment.installments.map((inst, idx) => `
    <div class="row">
      <span>${idx + 1}. ${new Date(inst.date).toLocaleDateString('fr-FR')}</span>
      <span>${inst.amount.toLocaleString()} F</span>
    </div>
    `).join('')}
  </div>
  ` : ''}

  <div class="total">
    PAYÉ: ${payment.paidAmount.toLocaleString()} FCFA
  </div>

  <div class="footer">
    <p>Merci de votre confiance!</p>
    <p>CSA - Excellence Martiale</p>
    <p>${new Date().toLocaleString('fr-FR')}</p>
  </div>

  <script>
    window.onload = function() {
      // Optionnel: imprimer automatiquement
      // window.print();
    };
  </script>
</body>
</html>
  `.trim();
}

// Format ESC/POS pour imprimante thermique Bluetooth
export function generateReceiptESCPOS(payment: Payment, member: Member): string {
  const ESC = '\x1B';
  const GS = '\x1D';
  const LF = '\n';

  let receipt = '';

  // Initialize
  receipt += ESC + '@'; // Initialize printer
  receipt += ESC + 'a' + '1'; // Center alignment

  // Header
  receipt += ESC + 'E' + '1'; // Bold
  receipt += academyInfo.name + LF;
  receipt += ESC + 'E' + '0'; // Normal
  receipt += academyInfo.subtitle + LF;
  receipt += academyInfo.address + LF;
  receipt += `Tel: ${academyInfo.phone}` + LF;
  receipt += '--------------------------------' + LF;

  // Title
  receipt += ESC + 'E' + '1';
  receipt += 'REÇU DE PAIEMENT' + LF;
  receipt += ESC + 'E' + '0';
  receipt += `N°: ${payment.id}` + LF;
  receipt += `Date: ${new Date().toLocaleDateString('fr-FR')}` + LF;
  receipt += '--------------------------------' + LF;

  // Left alignment for details
  receipt += ESC + 'a' + '0';

  // Member info
  receipt += `Licencié: ${member.firstName} ${member.lastName}` + LF;
  receipt += `N° Licence: ${member.licenseNumber}` + LF;
  receipt += `Grade: ${member.beltColor}${member.dan ? ` ${member.dan}Dan` : ''}` + LF;
  receipt += '--------------------------------' + LF;

  // Description
  receipt += `Description:` + LF;
  receipt += `${payment.description}` + LF;
  receipt += LF;

  // Amounts
  receipt += `Montant Total: ${payment.amount.toLocaleString()} FCFA` + LF;
  receipt += ESC + 'E' + '1';
  receipt += `PAYÉ: ${payment.paidAmount.toLocaleString()} FCFA` + LF;
  receipt += ESC + 'E' + '0';

  const remaining = payment.amount - payment.paidAmount;
  if (remaining > 0) {
    receipt += `Solde Restant: ${remaining.toLocaleString()} FCFA` + LF;
  }
  receipt += '--------------------------------' + LF;

  // Installments
  if (payment.installments.length > 0) {
    receipt += 'Acomptes:' + LF;
    payment.installments.forEach((inst, idx) => {
      receipt += `${idx + 1}. ${new Date(inst.date).toLocaleDateString('fr-FR')} - ${inst.amount.toLocaleString()}F` + LF;
    });
    receipt += '--------------------------------' + LF;
  }

  // Footer
  receipt += ESC + 'a' + '1'; // Center
  receipt += 'Merci de votre confiance!' + LF;
  receipt += 'CSA - Excellence Martiale' + LF;
  receipt += new Date().toLocaleString('fr-FR') + LF;
  receipt += LF + LF + LF;

  // Cut paper
  receipt += GS + 'V' + '0';

  return receipt;
}
