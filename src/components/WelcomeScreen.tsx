import { motion } from 'framer-motion';
import { Timer } from 'lucide-react';
import React from 'react';
import { Footer } from './Footer';
import { Background } from './ui/Background';

interface Props {
  onStart: () => void;
}

export const WelcomeScreen: React.FC<Props> = ({ onStart }) => {
  return (
    <Background gradientPosition={0}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative flex-1 flex flex-col items-center justify-center p-4 text-center z-10 min-h-screen"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <img 
            src="https://dev.yatricloud.com/assets/img/yatricloud.png" 
            alt="Yatri Cloud Logo" 
            className="w-48 h-auto mb-6"
          />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl font-bold text-white mb-8"
        >
          Welcome to Yatri Cloud Survey
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl text-white mb-12 max-w-2xl"
        >
          Help us understand your needs and improve our services
        </motion.p>

        <motion.button
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="relative px-12 py-4 bg-[#0a66c2] hover:bg-[#0a66c2]/90 text-white text-xl rounded-lg transition-all duration-300 shadow-[0_0_15px_rgba(10,102,194,0.5)] hover:shadow-[0_0_20px_rgba(10,102,194,0.7)]"
        >
          <span className="relative z-10">Start Survey</span>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a66c2] to-[#0a66c2]/70 rounded-lg opacity-50 blur-sm" />
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 flex items-center gap-2 text-white"
        >
          <Timer size={16} />
          <span>Takes 15 sec</span>
        </motion.div>
      </motion.div>

      <Footer className="z-10" />
    </Background>
  );
};