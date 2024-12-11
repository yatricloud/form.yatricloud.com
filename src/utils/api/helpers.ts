import { SurveyData } from './types';

export const delay = (ms: number): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms));

export const validateScriptUrl = (url: string): void => {
  if (!url) {
    throw new Error('Google Apps Script URL is not configured. Please set VITE_GOOGLE_SCRIPT_URL in your environment variables.');
  }
};

export const formatSurveyData = (data: SurveyData): SurveyData => ({
  ...data,
  timestamp: new Date().toISOString(),
  submittedAt: new Date().toLocaleString(),
  joinCommunity: data.joinCommunity === 'true' ? 'Yes' : 'No'
});