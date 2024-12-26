import { useState } from 'react';
import { validateFormData } from '../utils/validation/formValidation';
import { SurveyData } from '../utils/api/types';

export const useFormValidation = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (name: string, value: string, data: SurveyData) => {
    const result = validateFormData({
      ...data,
      [name]: value
    });

    setErrors(prev => ({
      ...prev,
      [name]: result.errors[name] || ''
    }));

    return !result.errors[name];
  };

  const validateForm = (data: SurveyData) => {
    const result = validateFormData(data);
    setErrors(result.errors);
    return result.isValid;
  };

  const clearErrors = () => {
    setErrors({});
  };

  const getFieldError = (fieldName: string) => errors[fieldName] || '';

  return {
    errors,
    validateField,
    validateForm,
    clearErrors,
    getFieldError
  };
};