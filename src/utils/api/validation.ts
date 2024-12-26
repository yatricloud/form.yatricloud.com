import { SurveyData } from './types';
import { ValidationError } from './errors';

export const validateSurveyData = (data: SurveyData): void => {
  if (!data.email || !data.email.includes('@')) {
    throw new ValidationError('Invalid email address');
  }

  if (!data.firstName?.trim()) {
    throw new ValidationError('First name is required');
  }

  if (!data.lastName?.trim()) {
    throw new ValidationError('Last name is required');
  }

  if (!data.contactNumber?.trim()) {
    throw new ValidationError('Contact number is required');
  }

  if (!data.country?.trim()) {
    throw new ValidationError('Country is required');
  }

  if (!data.gender?.trim()) {
    throw new ValidationError('Gender is required');
  }

  if (data.linkedinProfile && !data.linkedinProfile.includes('linkedin.com')) {
    throw new ValidationError('Invalid LinkedIn profile URL');
  }
};