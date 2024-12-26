export interface SurveyData {
  [key: string]: string;
}

export interface ApiResponse {
  status: 'success' | 'error';
  message: string;
  code?: number;
  timestamp: string;
}

export interface ApiErrorResponse {
  status: 'error';
  code: number;
  message: string;
  timestamp: string;
}