import { motion } from 'framer-motion';
import { useAudioVisualization } from '@/hooks/useAudioVisualization';
import { useEffect, useState } from 'react';

interface RecordingButtonProps {
  state: 'idle' | 'listening' | 'active';
  isEnabled: boolean;
  onClick: () => void;
}

const RecordingButton = ({ state, isEnabled, onClick }: RecordingButtonProps) => {
  const { audioLevel, waveformData, startVisualization, stopVisualization } = useAudioVisualization();
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldReduceMotion(mediaQuery.matches);
  }, []);

  useEffect(() => {
    if (isEnabled && state === 'idle') {
      startVisualization();
    } else {
      stopVisualization();
    }

    return () => stopVisualization();
  }, [isEnabled, state, startVisualization, stopVisualization]);

  // Calculate button size (25-35% of screen)
  const buttonSize = typeof window !== 'undefined' 
    ? Math.min(window.innerWidth, window.innerHeight) * 0.30 
    : 200;

  // Breathing animation variants
  const breathingVariants = {
    idle: shouldReduceMotion ? {
      scale: 1,
      filter: 'brightness(1)',
    } : {
      scale: [1, 1.08, 1],
      filter: [
        'brightness(1) drop-shadow(0 0 20px rgba(255, 107, 107, 0.5))',
        'brightness(1.1) drop-shadow(0 0 40px rgba(255, 142, 83, 0.7))',
        'brightness(1) drop-shadow(0 0 20px rgba(255, 107, 107, 0.5))',
      ],
    },
  };

  const transition = shouldReduceMotion ? {
    duration: 0,
  } : {
    duration: 1.8,
    repeat: Infinity,
    ease: 'easeInOut',
  };

  // Dynamic glow based on audio level
  const glowIntensity = state === 'idle' ? audioLevel * 60 : 40;

  return (
    <div className="relative flex items-center justify-center">
      {/* Waveform visualization rings */}
      {state === 'idle' && isEnabled && waveformData.length > 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {waveformData.slice(0, 10).map((value, index) => {
            const angle = (index / 10) * Math.PI * 2;
            const distance = buttonSize * 0.6 + value * 20;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            
            return (
              <motion.div
                key={index}
                className="absolute w-1 h-8 rounded-full"
                style={{
                  background: 'linear-gradient(180deg, #FF6B6B 0%, #FF8E53 50%, #FFB84D 100%)',
                  opacity: 0.3 + value * 0.4,
                  transform: `translate(${x}px, ${y}px) rotate(${angle}rad)`,
                }}
                animate={{
                  scaleY: 0.5 + value * 1.5,
                }}
                transition={{
                  duration: 0.1,
                }}
              />
            );
          })}
        </div>
      )}

      {/* Main orb button */}
      <motion.button
        onClick={onClick}
        disabled={!isEnabled}
        className="relative rounded-full cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#FF8E53]/50 transition-opacity"
        style={{
          width: buttonSize,
          height: buttonSize,
          background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 50%, #FFB84D 100%)',
          boxShadow: `0 0 ${glowIntensity}px rgba(255, 107, 107, 0.6)`,
        }}
        variants={breathingVariants}
        animate={state === 'idle' && isEnabled ? 'idle' : undefined}
        transition={transition}
        whileHover={isEnabled ? { scale: 1.05 } : undefined}
        whileTap={isEnabled ? { scale: 0.95 } : undefined}
      >
        {/* Inner gradient overlay */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-60" />
        
        {/* Recording state indicator */}
        {state === 'active' && (
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-white"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0.5, 1, 0.5], scale: [0.8, 1.1, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </motion.button>
    </div>
  );
};

export default RecordingButton;
