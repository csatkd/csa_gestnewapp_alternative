import jsPDF from 'jspdf';
import { Member, GradingResult } from '../types';
import { mockMembers } from '../data/mockData';

const beltLabels: Record<string, string> = {
  white: 'Blanche', yellow: 'Jaune', orange: 'Orange', green: 'Verte',
  blue: 'Bleue', purple: 'Violette', brown: 'Marron', red: 'Rouge', black: 'Noire',
};

export function generateDiplomaPDF(result: GradingResult) {
  const member = mockMembers.find(m => m.id === result.memberId);
  if (!member) return;

  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
  const w = 297;
  const h = 210;

  // Background
  doc.setFillColor(255, 253, 245);
  doc.rect(0, 0, w, h, 'F');

  // Outer gold border
  doc.setDrawColor(184, 134, 11);
  doc.setLineWidth(3);
  doc.rect(8, 8, w - 16, h - 16);

  // Inner burgundy border
  doc.setDrawColor(128, 0, 0);
  doc.setLineWidth(1.5);
  doc.rect(12, 12, w - 24, h - 24);

  // Decorative corners
  doc.setFillColor(184, 134, 11);
  const corners = [[14, 14], [w - 20, 14], [14, h - 20], [w - 20, h - 20]];
  corners.forEach(([x, y]) => {
    doc.circle(x + 3, y + 3, 3, 'F');
  });

  // Watermark
  doc.setFontSize(60);
  doc.setTextColor(230, 220, 200);
  doc.text('태권도', w / 2, h / 2 + 10, { align: 'center' });

  // Header
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text('RÉPUBLIQUE DE CÔTE D\'IVOIRE', w / 2, 22, { align: 'center' });
  doc.text('Fédération Ivoirienne de Taekwondo (FITKD) — Affiliée World Taekwondo (Kukkiwon)', w / 2, 27, { align: 'center' });

  // Academy name
  doc.setFontSize(14);
  doc.setTextColor(128, 0, 0);
  doc.text('CONFIDENCE SPORTS ACADEMY', w / 2, 36, { align: 'center' });
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text('Dojang de Cocody — Abidjan, Côte d\'Ivoire', w / 2, 41, { align: 'center' });

  // Title
  doc.setFontSize(28);
  doc.setTextColor(184, 134, 11);
  doc.text('DIPLÔME DE GRADE', w / 2, 58, { align: 'center' });

  // Decorative line
  doc.setDrawColor(184, 134, 11);
  doc.setLineWidth(0.5);
  doc.line(80, 62, w - 80, 62);

  // Certification text
  doc.setFontSize(11);
  doc.setTextColor(60, 60, 60);
  doc.text('Le Jury d\'Examen certifie que le/la licencié(e)', w / 2, 72, { align: 'center' });

  // Candidate name
  doc.setFontSize(22);
  doc.setTextColor(128, 0, 0);
  doc.text(`${member.firstName.toUpperCase()} ${member.lastName.toUpperCase()}`, w / 2, 84, { align: 'center' });

  // License number
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`N° Licence FITKD : ${member.licenseNumber}`, w / 2, 92, { align: 'center' });

  // Grade info
  doc.setFontSize(12);
  doc.setTextColor(60, 60, 60);
  doc.text('a obtenu le grade de', w / 2, 102, { align: 'center' });

  const newBelt = result.newBelt || member.beltColor;
  const newDan = result.newDan || member.dan;
  doc.setFontSize(18);
  doc.setTextColor(184, 134, 11);
  const gradeText = newDan ? `CEINTURE NOIRE ${newDan}ème DAN` : `CEINTURE ${beltLabels[newBelt]?.toUpperCase() || 'N/A'}`;
  doc.text(gradeText, w / 2, 113, { align: 'center' });

  // Score
  doc.setFontSize(11);
  doc.setTextColor(60, 60, 60);
  doc.text(`avec un score total de ${result.total}/100 points`, w / 2, 122, { align: 'center' });

  // Scores table
  const tableX = 55;
  const tableY = 130;
  const colW = 38;

  doc.setFillColor(128, 0, 0);
  doc.rect(tableX, tableY, colW * 5, 8, 'F');
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);

  const headers = ['Poomsae /20', 'Kyorugi /20', 'Kyokpa /20', 'Hosinsul /20', 'Attitude /20'];
  headers.forEach((h, i) => {
    doc.text(h, tableX + i * colW + colW / 2, tableY + 5.5, { align: 'center' });
  });

  doc.setFillColor(255, 248, 230);
  doc.rect(tableX, tableY + 8, colW * 5, 8, 'F');
  doc.setTextColor(60, 60, 60);
  doc.setFontSize(10);

  const scores = [result.poomsae, result.kyorugi, result.kyokpa, result.hosinsul, result.attitude];
  scores.forEach((s, i) => {
    doc.text(`${s}/20`, tableX + i * colW + colW / 2, tableY + 14, { align: 'center' });
  });

  // Seal
  doc.setDrawColor(200, 0, 0);
  doc.setLineWidth(1.5);
  doc.circle(w - 55, h - 45, 15);
  doc.setFontSize(6);
  doc.setTextColor(200, 0, 0);
  doc.text('SEAL', w - 55, h - 48, { align: 'center' });
  doc.text('CSA DOJANG', w - 55, h - 44, { align: 'center' });
  doc.text('OFFICIEL', w - 55, h - 40, { align: 'center' });
  doc.setFontSize(5);
  doc.text(new Date(result.date).toLocaleDateString('fr-FR'), w - 55, h - 36, { align: 'center' });

  // Signatures
  doc.setFontSize(9);
  doc.setTextColor(60, 60, 60);
  const sigY = h - 35;
  doc.line(30, sigY, 90, sigY);
  doc.text('Examinateur en Chef', 60, sigY + 5, { align: 'center' });

  doc.line(110, sigY, 170, sigY);
  doc.text('Directeur Technique', 140, sigY + 5, { align: 'center' });

  doc.line(190, sigY, 250, sigY);
  doc.text('Président de l\'Académie', 220, sigY + 5, { align: 'center' });

  // Footer
  doc.setFontSize(7);
  doc.setTextColor(150, 150, 150);
  doc.text(`Document généré le ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')} — Référence: DIP-${member.id}-${result.date}`, w / 2, h - 12, { align: 'center' });

  doc.save(`Diplome_${member.lastName}_${member.firstName}_${newBelt}_${result.date}.pdf`);
}

export function generateAttendanceSheetPDF(date: string, records: { member: Member; status: string; time: string; method: string }[]) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  // Header
  doc.setFillColor(30, 41, 59);
  doc.rect(0, 0, 210, 30, 'F');
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text('CONFIDENCE SPORTS ACADEMY', 105, 10, { align: 'center' });
  doc.setFontSize(8);
  doc.setTextColor(200, 200, 200);
  doc.text('Dojang de Cocody - Abidjan, Côte d\'Ivoire', 105, 16, { align: 'center' });
  doc.setFontSize(10);
  doc.setTextColor(16, 185, 129);
  doc.text('FICHE OFFICIELLE D\'ÉMARGEMENT', 105, 22, { align: 'center' });
  doc.setFontSize(7);
  doc.setTextColor(150, 150, 150);
  doc.text('Affiliée FITKD • Homologuée Kukkiwon • Membre World Taekwondo', 105, 27, { align: 'center' });

  // Session info
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  const startY = 38;
  doc.text(`Date : ${new Date(date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}`, 15, startY);
  doc.text('Séance : Entraînement régulier', 15, startY + 6);
  doc.text('Lieu : Dojang CSA — Cocody, Abidjan', 15, startY + 12);
  doc.text('Entraîneur : Coach Principal', 15, startY + 18);

  // Stats
  const present = records.filter(r => r.status === 'present').length;
  const late = records.filter(r => r.status === 'late').length;
  const absent = records.filter(r => r.status === 'absent').length;
  const rate = Math.round(((present + late) / records.length) * 100);

  const statsY = startY + 28;
  doc.setFillColor(240, 253, 244);
  doc.rect(15, statsY, 180, 12, 'F');
  doc.setDrawColor(16, 185, 129);
  doc.setLineWidth(0.5);
  doc.rect(15, statsY, 180, 12);

  doc.setFontSize(8);
  doc.setTextColor(16, 185, 129);
  doc.text(`CONVOQUÉS: ${records.length}`, 25, statsY + 5);
  doc.text(`PRÉSENTS: ${present}`, 65, statsY + 5);
  doc.text(`RETARDS: ${late}`, 100, statsY + 5);
  doc.text(`ABSENTS: ${absent}`, 135, statsY + 5);
  doc.text(`TAUX: ${rate}%`, 170, statsY + 5);

  // Table header
  const tableY = statsY + 18;
  doc.setFillColor(30, 41, 59);
  doc.rect(15, tableY, 180, 8, 'F');
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);

  const cols = [
    { label: 'N°', x: 18, w: 10 },
    { label: 'N° Licence', x: 28, w: 30 },
    { label: 'Nom & Prénom', x: 58, w: 40 },
    { label: 'Grade', x: 98, w: 25 },
    { label: 'Heure', x: 123, w: 18 },
    { label: 'Méthode', x: 141, w: 18 },
    { label: 'Statut', x: 159, w: 18 },
    { label: 'Signature', x: 177, w: 18 },
  ];

  cols.forEach(col => {
    doc.text(col.label, col.x, tableY + 5.5);
  });

  // Table rows
  let rowY = tableY + 8;
  records.forEach((record, idx) => {
    if (rowY > 270) return;

    if (idx % 2 === 0) {
      doc.setFillColor(248, 250, 252);
      doc.rect(15, rowY, 180, 7, 'F');
    }

    doc.setFontSize(7);
    doc.setTextColor(60, 60, 60);
    doc.text(`${idx + 1}`, cols[0].x, rowY + 5);
    doc.text(record.member.licenseNumber, cols[1].x, rowY + 5);
    doc.text(`${record.member.firstName} ${record.member.lastName}`, cols[2].x, rowY + 5);
    doc.text(beltLabels[record.member.beltColor] || '', cols[3].x, rowY + 5);
    doc.text(record.time, cols[4].x, rowY + 5);
    doc.text(record.method, cols[5].x, rowY + 5);

    // Status with color
    if (record.status === 'present') doc.setTextColor(16, 185, 129);
    else if (record.status === 'late') doc.setTextColor(245, 158, 11);
    else doc.setTextColor(239, 68, 68);
    doc.text(record.status === 'present' ? 'Présent' : record.status === 'late' ? 'Retard' : 'Absent', cols[6].x, rowY + 5);

    doc.setTextColor(60, 60, 60);
    // Signature box
    doc.setDrawColor(200, 200, 200);
    doc.rect(cols[7].x, rowY + 1, 14, 5);

    rowY += 7;
  });

  // Footer
  doc.setFontSize(7);
  doc.setTextColor(150, 150, 150);
  doc.text(`Document certifié conforme — Généré le ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}`, 105, 285, { align: 'center' });
  doc.text('Confidence Sports Academy — Dojang de Cocody, Abidjan, Côte d\'Ivoire', 105, 290, { align: 'center' });

  doc.save(`Emargement_${date}.pdf`);
}

export function generatePaymentStatementPDF(memberId: string, payments: { description: string; amount: number; paidAmount: number; installments: { amount: number; date: string; method: string; receipt: string }[] }[]) {
  const member = mockMembers.find(m => m.id === memberId);
  if (!member) return;

  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  // Header
  doc.setFillColor(30, 41, 59);
  doc.rect(0, 0, 210, 35, 'F');
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text('CONFIDENCE SPORTS ACADEMY', 105, 12, { align: 'center' });
  doc.setFontSize(8);
  doc.setTextColor(200, 200, 200);
  doc.text('Dojang de Cocody - Abidjan, Côte d\'Ivoire', 105, 18, { align: 'center' });
  doc.setFontSize(11);
  doc.setTextColor(16, 185, 129);
  doc.text('RELEVÉ DE COMPTE LICENCIÉ', 105, 25, { align: 'center' });
  doc.setFontSize(7);
  doc.setTextColor(150, 150, 150);
  doc.text('Document comptable officiel - Affiliée FITKD • Homologuée Kukkiwon', 105, 31, { align: 'center' });

  // Member info
  let y = 45;
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  doc.text(`Licencié : ${member.firstName} ${member.lastName}`, 15, y);
  doc.text(`N° Licence : ${member.licenseNumber}`, 15, y + 6);
  doc.text(`Grade : Ceinture ${beltLabels[member.beltColor] || 'N/A'}${member.dan ? ` ${member.dan}ème Dan` : ''}`, 15, y + 12);
  doc.text(`Date du relevé : ${new Date().toLocaleDateString('fr-FR')}`, 120, y);

  // Summary
  y += 24;
  const totalAmount = payments.reduce((s, p) => s + p.amount, 0);
  const totalPaid = payments.reduce((s, p) => s + p.paidAmount, 0);
  const totalRemaining = totalAmount - totalPaid;

  doc.setFillColor(240, 253, 244);
  doc.rect(15, y, 180, 15, 'F');
  doc.setDrawColor(16, 185, 129);
  doc.rect(15, y, 180, 15);

  doc.setFontSize(9);
  doc.setTextColor(16, 185, 129);
  doc.text(`TOTAL FACTURÉ: ${totalAmount.toLocaleString()} FCFA`, 25, y + 6);
  doc.text(`TOTAL PAYÉ: ${totalPaid.toLocaleString()} FCFA`, 85, y + 6);
  doc.setTextColor(totalRemaining > 0 ? 239 : 16, totalRemaining > 0 ? 68 : 185, totalRemaining > 0 ? 68 : 129);
  doc.text(`SOLDE: ${totalRemaining.toLocaleString()} FCFA`, 145, y + 6);

  // Transactions
  y += 22;
  doc.setFontSize(11);
  doc.setTextColor(60, 60, 60);
  doc.text('Historique des Transactions', 15, y);
  y += 5;

  payments.forEach(payment => {
    if (y > 260) return;

    doc.setFillColor(30, 41, 59);
    doc.rect(15, y, 180, 7, 'F');
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text(payment.description, 18, y + 5);
    doc.text(`${payment.amount.toLocaleString()} FCFA`, 160, y + 5);

    y += 9;

    payment.installments.forEach(inst => {
      if (y > 270) return;
      doc.setFontSize(7);
      doc.setTextColor(60, 60, 60);
      doc.text(`  • ${new Date(inst.date).toLocaleDateString('fr-FR')} — ${inst.amount.toLocaleString()} FCFA — ${inst.method === 'cash' ? 'Espèces' : inst.method === 'mobile_money' ? 'Mobile Money' : 'Virement'} — Reçu: ${inst.receipt}`, 20, y + 4);
      y += 6;
    });

    const remaining = payment.amount - payment.paidAmount;
    if (remaining > 0) {
      doc.setTextColor(239, 68, 68);
      doc.text(`  ↳ Solde restant: ${remaining.toLocaleString()} FCFA`, 20, y + 4);
      y += 6;
    }

    y += 3;
  });

  // Footer
  doc.setFontSize(7);
  doc.setTextColor(150, 150, 150);
  doc.text('Ce document est généré automatiquement par le système de gestion CSA.', 105, 280, { align: 'center' });
  doc.text(`Référence: RLV-${member.id}-${Date.now()}`, 105, 285, { align: 'center' });

  doc.save(`Releve_${member.lastName}_${member.firstName}_${new Date().toISOString().split('T')[0]}.pdf`);
}
