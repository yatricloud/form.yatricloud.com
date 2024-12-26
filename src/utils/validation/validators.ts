// Individual field validators
export const validateEmail = (email: string): string | null => {
  if (!email) return 'Email is required';
  if (!email.includes('@')) return 'Invalid email format';
  if (email.length < 5) return 'Email is too short';
  return null;
};

export const validateName = (name: string, field: string): string | null => {
  if (!name?.trim()) return `${field} is required`;
  if (name.length < 2) return `${field} is too short`;
  if (!/^[a-zA-Z\s-]+$/.test(name)) return `${field} can only contain letters, spaces, and hyphens`;
  return null;
};

export const validateUrl = (url: string, field: string): string | null => {
  if (!url) return null; // URLs are optional
  try {
    new URL(url);
    return null;
  } catch {
    return `Invalid ${field} URL format`;
  }
};

export const validateLinkedInUrl = (url: string): string | null => {
  if (!url) return null; // LinkedIn URL is optional
  if (!url.includes('linkedin.com')) return 'Invalid LinkedIn profile URL';
  return validateUrl(url, 'LinkedIn profile');
};

export const validateReview = (review: string): string | null => {
  if (!review?.trim()) return null; // Review is optional
  if (review.length < 10) return 'Review must be at least 10 characters long';
  if (review.length > 1000) return 'Review must not exceed 1000 characters';
  return null;
};