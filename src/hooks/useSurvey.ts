import { useState } from 'react';
import { SurveyState } from '../types/survey';
import { questions } from '../data/questions';
import { submitSurvey } from '../utils/api/submitSurvey';
import { ApiError, NetworkError, ValidationError } from '../utils/api/errors';
import { useFormValidation } from './useFormValidation';
import toast from 'react-hot-toast';

export const useSurvey = () => {
  const [started, setStarted] = useState(false);
  const [surveyState, setSurveyState] = useState<SurveyState>({
    currentStep: -1,
    answers: {},
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { validateField, validateForm, getFieldError, clearErrors } = useFormValidation();

  const handleStart = () => {
    setStarted(true);
    setSurveyState(prev => ({ ...prev, currentStep: 0 }));
  };

  const handleBack = () => {
    if (surveyState.currentStep > 0) {
      setSurveyState(prev => ({ ...prev, currentStep: prev.currentStep - 1 }));
    }
  };

  const handleAnswer = (value: string) => {
    const currentQuestion = questions[surveyState.currentStep];
    validateField(currentQuestion.id, value, {
      ...surveyState.answers,
      [currentQuestion.id]: value
    });
    
    setSurveyState(prev => ({
      ...prev,
      answers: { ...prev.answers, [currentQuestion.id]: value },
    }));
  };

  const resetSurvey = () => {
    setSurveyState({ currentStep: -1, answers: {} });
    setStarted(false);
    clearErrors();
  };

  const handleSubmit = async () => {
    const currentQuestion = questions[surveyState.currentStep];
    const currentValue = surveyState.answers[currentQuestion.id];
    
    // Validate current field before proceeding
    const isValid = validateField(currentQuestion.id, currentValue, surveyState.answers);
    
    if (!isValid) {
      return;
    }

    if (surveyState.currentStep < questions.length - 1) {
      setSurveyState(prev => ({ ...prev, currentStep: prev.currentStep + 1 }));
      return;
    }

    // Validate entire form before submission
    if (!validateForm(surveyState.answers)) {
      toast.error('Please fix the validation errors before submitting');
      return;
    }

    setIsSubmitting(true);
    try {
      const success = await submitSurvey(surveyState.answers);
      if (success) {
        toast.success('Thank you! Your survey has been submitted successfully.', {
          duration: 5000,
          icon: '🎉'
        });
        resetSurvey();
      }
    } catch (error) {
      console.error('Survey submission error:', error);
      
      if (error instanceof ValidationError) {
        toast.error(`Validation error: ${error.message}`);
      } else if (error instanceof ApiError) {
        if (error.statusCode === 403) {
          toast.error('Access denied. Please try again later.');
        } else if (error.statusCode === 404) {
          toast.error('Survey form not found. Please contact support.');
        } else {
          toast.error(`Server error: ${error.message}`);
        }
      } else if (error instanceof NetworkError) {
        toast.error('Network error. Please check your connection and try again.');
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    started,
    surveyState,
    isSubmitting,
    handleStart,
    handleBack,
    handleAnswer,
    handleSubmit,
    getFieldError,
  };
};