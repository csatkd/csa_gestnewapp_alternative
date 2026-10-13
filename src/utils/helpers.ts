export function exportToCSV(data: Record<string, any>[], filename: string) {
  if (data.length === 0) return;

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(header => {
      const value = row[header];
      return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
    }).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
}

export function triggerConfetti() {
  // Import dynamique pour éviter le chargement si non utilisé
  import('canvas-confetti').then(({ default: confetti }) => {
    const duration = 3000;
    const end = Date.now() + duration;

    const colors = ['#10b981', '#f59e0b', '#ef4444', '#6366f1', '#8b5cf6'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    // Explosion centrale
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { x: 0.5, y: 0.5 },
        colors: colors,
      });
    }, 500);
  });
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XOF',
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function calculateAge(dob: string): number {
  const today = new Date();
  const birth = new Date(dob);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

export function getDaysUntil(dateStr: string): number {
  const target = new Date(dateStr);
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function formatPhoneNumber(phone: string): string {
  // Format pour la Côte d'Ivoire
  const cleaned = phone.replace(/\s/g, '');
  if (cleaned.startsWith('+225')) {
    return cleaned.replace('+225', '').replace(/(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4');
  }
  return phone;
}

export function getMobileMoneyOperator(receipt: string): string {
  if (receipt.startsWith('OM-')) return 'Orange Money';
  if (receipt.startsWith('MTN-')) return 'MTN MoMo';
  if (receipt.startsWith('WAVE-')) return 'Wave';
  if (receipt.startsWith('MOOV-')) return 'Moov Money';
  return 'Mobile Money';
}

export function generateReceiptNumber(): string {
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `CSA-${timestamp}${random}`;
}

export function calculateTotalAttendance(attendanceHistory: { month: string; rate: number }[]): number {
  if (attendanceHistory.length === 0) return 0;
  return Math.round(attendanceHistory.reduce((sum, a) => sum + a.rate, 0) / attendanceHistory.length);
}

export function isEligibleForGrading(attendanceRate: number, minRate: number = 75): boolean {
  return attendanceRate >= minRate;
}
