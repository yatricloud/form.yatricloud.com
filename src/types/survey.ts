export interface SurveyQuestion {
  id: string;
  question: string;
  type: 'email' | 'text' | 'select' | 'url' | 'textarea' | 'checkbox';
  placeholder?: string;
  options?: string[];
  description?: string;
}

export interface SurveyState {
  currentStep: number;
  answers: Record<string, string>;
}

export interface FooterProps {
  className?: string;
}