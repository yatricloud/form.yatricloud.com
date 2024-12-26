import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import React from 'react';
import { SurveyQuestion as QuestionType } from '../types/survey';
import { ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import { QuestionInput } from './inputs/QuestionInput';
import { Background } from './ui/Background';

interface Props {
  question: QuestionType;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onBack: () => void;
  error?: string;
  isSubmitting?: boolean;
  isFirstQuestion: boolean;
}

export const SurveyQuestion: React.FC<Props> = ({ 
  question, 
  value, 
  onChange, 
  onSubmit,
  onBack,
  error,
  isSubmitting = false,
  isFirstQuestion
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const getGradientPosition = (id: string) => {
    const sum = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return sum % 4;
  };

  const isDisabled = () => {
    if (isSubmitting) return true;
    if (error) return true;
    if (!value.trim()) return true;
    return false;
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
              className="text-white/80 mb-6"
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
              onSubmit={onSubmit}
              error={error}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 flex items-center justify-between gap-4"
          >
            {!isFirstQuestion && (
              <button
                onClick={onBack}
                className="group flex items-center gap-2 px-8 py-3 bg-github-dark-secondary rounded-lg transition-all duration-300 hover:bg-github-dark-secondary/90"
              >
                <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
                <span>Back</span>
              </button>
            )}
            
            <button
              onClick={onSubmit}
              disabled={isDisabled()}
              className={`group relative flex items-center gap-2 px-8 py-3 bg-[#0a66c2] rounded-lg transition-all duration-300 ml-auto
                ${isDisabled() 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-[#0a66c2]/90 shadow-[0_0_15px_rgba(10,102,194,0.5)] hover:shadow-[0_0_20px_rgba(10,102,194,0.7)]'
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
          </motion.div>

          {(question.type === 'email' || question.type === 'text' || question.type === 'url') && !error && (
            <p className="text-sm text-white/70 text-center mt-4">
              Press Enter ↵ to continue
            </p>
          )}
        </div>
      </motion.div>
    </Background>
  );
};