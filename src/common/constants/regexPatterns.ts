export const REGEX_PATTERNS = {
  // Email validation
  EMAIL: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,

  // Password validation (min 8 chars, at least one number and one letter)
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,

  // Phone number validation (international format)
  PHONE: /^\+?[1-9]\d{1,14}$/,

  // Name validation (letters, spaces, and basic punctuation)
  NAME: /^[a-zA-Z\s\-']{2,50}$/,

  // Username validation (alphanumeric with underscores and hyphens)
  USERNAME: /^[a-zA-Z0-9_-]{3,20}$/,

  // URL validation
  URL: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,

  // Date validation (YYYY-MM-DD)
  DATE: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,

  // Time validation (HH:MM)
  TIME: /^([01]\d|2[0-3]):([0-5]\d)$/,
} as const; 