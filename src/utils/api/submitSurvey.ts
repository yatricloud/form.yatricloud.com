import axios from 'axios';
import { API_CONFIG } from './config';
import { SurveyData, ApiResponse } from './types';
import { delay, validateScriptUrl, formatSurveyData } from './helpers';

export async function submitSurvey(
  data: SurveyData, 
  attemptNumber = 1
): Promise<boolean> {
  try {
    validateScriptUrl(API_CONFIG.SCRIPT_URL);
    const formattedData = formatSurveyData(data);

    // Create form data for submission
    const formData = new FormData();
    Object.entries(formattedData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Use fetch API instead of axios for better CORS handling
    const response = await fetch(API_CONFIG.SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: formData,
    });

    // Since we're using no-cors, we won't get a JSON response
    // We'll assume success if the request doesn't throw
    return true;

  } catch (error) {
    console.error(`Attempt ${attemptNumber} failed:`, error);
    
    if (attemptNumber < API_CONFIG.RETRY_ATTEMPTS) {
      await delay(API_CONFIG.RETRY_DELAY);
      return submitSurvey(data, attemptNumber + 1);
    }
    
    throw new Error(
      error instanceof Error 
        ? error.message 
        : 'Failed to submit survey data after multiple attempts'
    );
  }
}