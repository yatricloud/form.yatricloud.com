export const API_CONFIG = {
  SCRIPT_URL: import.meta.env.VITE_GOOGLE_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbxT0aNPWdBkpPX_0jA-E7tuwwWATkYwDoKwByxVWVtGHjqgGQF5tbBKbQBH_hcfm18BbA/exec',
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
  TIMEOUT: 10000,
} as const;