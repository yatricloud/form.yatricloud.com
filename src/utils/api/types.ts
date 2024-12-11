export interface SurveyData {
  [key: string]: string;
}

export interface ApiResponse {
  result: 'success' | 'error';
  message?: string;
  error?: string;
}