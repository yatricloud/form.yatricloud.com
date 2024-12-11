import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  gradientPosition?: number;
}

export const Background: React.FC<Props> = ({ children, gradientPosition = 0 }) => {
  const positions = [
    ['100%_0%', '0%_100%'],      // Right top to left bottom
    ['100%_100%', '0%_0%'],      // Right bottom to left top
    ['0%_100%', '100%_0%'],      // Left bottom to right top
    ['50%_100%', '50%_0%'],      // Bottom center to top center
    ['100%_50%', '0%_50%'],      // Right center to left center
    ['0%_0%', '100%_100%']       // Left top to right bottom
  ];

  const currentPosition = positions[gradientPosition % positions.length];

  return (
    <div className="min-h-screen bg-github-dark relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0"
      >
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className={`absolute inset-0 bg-[radial-gradient(circle_at_${currentPosition[0]},_#0a66c2_0%,_transparent_50%)]`}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`absolute inset-0 bg-[radial-gradient(circle_at_${currentPosition[1]},_#0d1117_0%,_transparent_50%)]`}
        />
      </motion.div>
      {children}
    </div>
  );
};