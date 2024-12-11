export const API_CONFIG = {
  SCRIPT_URL: import.meta.env.VITE_GOOGLE_SCRIPT_URL || '',
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
  TIMEOUT: 10000,
} as const;