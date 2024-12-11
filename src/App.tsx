import React, { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { SurveyQuestion } from './components/SurveyQuestion';
import { questions } from './data/questions';
import { SurveyState } from './types/survey';
import { AnimatePresence, motion } from 'framer-motion';
import { submitSurvey } from './utils/api/submitSurvey';

function App() {
  const [started, setStarted] = useState(false);
  const [surveyState, setSurveyState] = useState<SurveyState>({
    currentStep: -1,
    answers: {},
  });

  const handleStart = () => {
    setStarted(true);
    setSurveyState(prev => ({ ...prev, currentStep: 0 }));
  };

  const handleAnswer = (value: string) => {
    const currentQuestion = questions[surveyState.currentStep];
    setSurveyState(prev => ({
      ...prev,
      answers: { ...prev.answers, [currentQuestion.id]: value },
    }));
  };

  const handleSubmit = async () => {
    if (surveyState.currentStep < questions.length - 1) {
      setSurveyState(prev => ({ ...prev, currentStep: prev.currentStep + 1 }));
    } else {
      try {
        await submitSurvey(surveyState.answers);
        console.log('Survey completed and submitted:', surveyState.answers);
        // Here you can add success notification or redirect
      } catch (error) {
        console.error('Error submitting survey:', error);
        // Here you can add error notification
      }
    }
  };

  return (
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
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;