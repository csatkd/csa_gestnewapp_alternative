// CSA Brand Colors Configuration
// Couleur officielle: Rouge #9f0202

export const CSA_COLORS = {
  red: '#9f0202',
  redDark: '#7a0101',
  redLight: '#b80303',
  black: '#0F172A',
  grayDark: '#1E293B',
  gray: '#475569',
  grayLight: '#64748B',
  white: '#FFFFFF',
} as const;

// Helper functions for Tailwind classes
export const csaClasses = {
  // Background colors
  bgRed: 'bg-[#9f0202]',
  bgRedDark: 'bg-[#7a0101]',
  bgRedLight: 'bg-[#b80303]',
  bgRedOpacity10: 'bg-[#9f0202]/10',
  bgRedOpacity20: 'bg-[#9f0202]/20',
  bgRedOpacity30: 'bg-[#9f0202]/30',
  
  // Text colors
  textRed: 'text-[#9f0202]',
  textRedDark: 'text-[#7a0101]',
  textRedLight: 'text-[#b80303]',
  
  // Border colors
  borderRed: 'border-[#9f0202]',
  borderRedOpacity30: 'border-[#9f0202]/30',
  borderRedOpacity50: 'border-[#9f0202]/50',
  
  // Shadow colors
  shadowRed: 'shadow-[#9f0202]/30',
  shadowRedLight: 'shadow-[#9f0202]/10',
  
  // Hover states
  hoverBgRed: 'hover:bg-[#9f0202]',
  hoverBgRedOpacity10: 'hover:bg-[#9f0202]/10',
  hoverBorderRed: 'hover:border-[#9f0202]',
  hoverTextRed: 'hover:text-[#9f0202]',
} as const;

// Gradient configurations
export const csaGradients = {
  primary: 'bg-gradient-to-r from-[#9f0202] to-[#7a0101]',
  dark: 'bg-gradient-to-br from-[#0F172A] to-[#1E293B]',
  card: 'bg-gradient-to-br from-gray-800 to-black',
  hero: 'bg-gradient-to-br from-black via-gray-900 to-black',
} as const;
