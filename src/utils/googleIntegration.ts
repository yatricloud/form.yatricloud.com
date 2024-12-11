import axios from 'axios';

// Configuration for Google Apps Script integration
const config = {
  SCRIPT_URL: import.meta.env.VITE_GOOGLE_SCRIPT_URL || '',
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // milliseconds
};

interface SurveyData {
  [key: string]: string;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const validateScriptUrl = () => {
  if (!config.SCRIPT_URL) {
    throw new Error('Google Apps Script URL is not configured. Please set VITE_GOOGLE_SCRIPT_URL in your environment variables.');
  }
};

const formatSurveyData = (data: SurveyData) => {
  return {
    ...data,
    timestamp: new Date().toISOString(),
    submittedAt: new Date().toLocaleString(),
    joinCommunity: data.joinCommunity === 'true' ? 'Yes' : 'No'
  };
};

export async function submitToGoogleSheet(data: SurveyData, attemptNumber = 1): Promise<boolean> {
  try {
    validateScriptUrl();
    
    const formattedData = formatSurveyData(data);
    
    // Use JSONP to bypass CORS
    const params = new URLSearchParams({
      action: 'submit',
      data: JSON.stringify(formattedData)
    }).toString();

    const response = await axios.get(`${config.SCRIPT_URL}?${params}`, {
      headers: {
        'Accept': 'application/json',
      }
    });
    
    if (response.data.result === 'success') {
      return true;
    }
    
    throw new Error(response.data.error || 'Submission failed');
    
  } catch (error) {
    console.error(`Attempt ${attemptNumber} failed:`, error);
    
    if (attemptNumber < config.RETRY_ATTEMPTS) {
      await delay(config.RETRY_DELAY);
      return submitToGoogleSheet(data, attemptNumber + 1);
    }
    
    throw new Error(
      error instanceof Error 
        ? error.message 
        : 'Failed to submit survey data after multiple attempts'
    );
  }
}