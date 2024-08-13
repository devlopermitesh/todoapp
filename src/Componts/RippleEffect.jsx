import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
const RippleEffect = () => {
  const Ondark = useSelector((state) => state.todo.theme);
  return (
    <motion.div
      className="ripple"
      animate={{ 
        scale: [0, 2], // Expand ripple
        opacity: [1, 0] // Fade out
      }}
      transition={{
        duration: 2.5, // Duration of one ripple cycle
        ease: 'easeIn',
        repeat: Infinity, // Repeat animation indefinitely
        repeatType: 'loop' // Loop animation
      }}
      style={{
        position: 'absolute',
        borderRadius: '50%',
        backgroundColor: `${(Ondark)?"white":"#6B78BD"}`, // Ripple color
        width: '50px', // Ripple size, adjust if needed
        height: '50px', // Ripple size, adjust if needed
        pointerEvents: 'none',
        zIndex:0,
        top: '1%', // Center horizontally
        left: '1%', // Center vertically
        transform: 'translate(-50%, -50%)'
      }}
    />
  );
};

export default RippleEffect;
