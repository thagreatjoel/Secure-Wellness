export function isValidEmail(email = '') {
  return /.+@.+\..+/.test(String(email).toLowerCase());
}

export function isValidUrl(str = '') {
  try { new URL(str); return true; } catch { return false; }
}
