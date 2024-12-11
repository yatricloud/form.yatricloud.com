import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import React, { useState } from 'react';
import { SurveyQuestion as QuestionType } from '../types/survey';
import { ArrowRight, Loader2 } from 'lucide-react';
import { QuestionInput } from './inputs/QuestionInput';
import { Background } from './ui/Background';

interface Props {
  question: QuestionType;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export const SurveyQuestion: React.FC<Props> = ({ question, value, onChange, onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const getGradientPosition = (id: string) => {
    const sum = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return sum % 4;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await onSubmit();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Background gradientPosition={getGradientPosition(question.id)}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8 }}
        className="relative min-h-screen flex items-center justify-center p-4 z-10"
      >
        <div className="max-w-xl w-full">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl font-bold text-white mb-4"
          >
            {question.question}
          </motion.h2>

          {question.description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-white mb-6"
            >
              {question.description}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="gradient-border bg-github-dark-secondary p-1"
          >
            <QuestionInput
              question={question}
              value={value}
              onChange={onChange}
              onSubmit={handleSubmit}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 flex flex-col items-center gap-4"
          >
            <button
              onClick={handleSubmit}
              disabled={!value || isSubmitting}
              className={`group relative flex items-center gap-2 px-8 py-3 bg-[#0a66c2] rounded-lg transition-all duration-300 shadow-[0_0_15px_rgba(10,102,194,0.5)] hover:shadow-[0_0_20px_rgba(10,102,194,0.7)] ${
                value && !isSubmitting ? 'hover:bg-[#0a66c2]/90' : 'opacity-50 cursor-not-allowed'
              }`}
            >
              <span className="relative z-10">
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  'Continue'
                )}
              </span>
              {!isSubmitting && (
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 relative z-10" />
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a66c2] to-[#0a66c2]/70 rounded-lg opacity-50 blur-sm" />
            </button>

            {(question.type === 'email' || question.type === 'text' || question.type === 'url') && (
              <p className="text-sm text-white">
                Press Enter ↵ to continue
              </p>
            )}
          </motion.div>
        </div>
      </motion.div>
    </Background>
  );
};