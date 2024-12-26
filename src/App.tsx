import React from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { SurveyQuestion } from './components/SurveyQuestion';
import { questions } from './data/questions';
import { AnimatePresence, motion } from 'framer-motion';
import { ToastProvider } from './components/providers/ToastProvider';
import { useSurvey } from './hooks/useSurvey';

export default function App() {
  const { 
    started, 
    surveyState, 
    isSubmitting,
    handleStart, 
    handleBack,
    handleAnswer, 
    handleSubmit,
    getFieldError
  } = useSurvey();

  return (
    <ToastProvider>
      <AnimatePresence mode="wait">
        {!started ? (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <WelcomeScreen onStart={handleStart} />
          </motion.div>
        ) : (
          <motion.div
            key={`question-${surveyState.currentStep}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <SurveyQuestion
              question={questions[surveyState.currentStep]}
              value={surveyState.answers[questions[surveyState.currentStep].id] || ''}
              onChange={handleAnswer}
              onSubmit={handleSubmit}
              onBack={handleBack}
              error={getFieldError(questions[surveyState.currentStep].id)}
              isSubmitting={isSubmitting}
              isFirstQuestion={surveyState.currentStep === 0}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </ToastProvider>
  );
}