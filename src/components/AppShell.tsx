import { Outlet } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';

export default function AppShell() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="min-h-screen overflow-auto bg-gradient-to-br from-[#121212] to-[#1a1a2e] text-[#ffffff] shadow-[0_0_20px_rgba(0,255,136,0.1)] z-0"
      initial={shouldReduceMotion ? undefined : { opacity: 0 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <Outlet />
    </motion.div>
  );
}
