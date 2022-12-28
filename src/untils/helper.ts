export const capitalize = (text: any) => text[0].toUpperCase() + text.slice(1);

export function hexToDecimal(hex: any) {
    return parseInt(hex.replace("#",""), 16)
  }