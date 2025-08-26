import React from 'react';
import { motion } from 'framer-motion';

// This component is now even simpler and more declarative
const AnimatedSection = ({ children, delay = 0.25 }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 75 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      // `whileInView` is a powerful Framer Motion prop that handles the animation trigger
      whileInView="visible"
      // `viewport` controls when the animation triggers
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: delay, ease: [0.25, 0.1, 0.25, 1.0] }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;