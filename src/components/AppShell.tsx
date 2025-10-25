import { Outlet } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';

export default function AppShell() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="min-h-screen overflow-auto bg-[linear-gradient(135deg,_#0D0D0F_0%,_#1A1A2E_15%,_#4F46E5_40%,_#3B82F6_60%,_#1A1A2E_85%,_#0D0D0F_100%)] bg-[size:200%_200%] animate-gradient-shift text-[#ffffff] shadow-[0_0_20px_rgba(0,255,136,0.1)] z-0"
      initial={shouldReduceMotion ? undefined : { opacity: 0 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <Outlet />
    </motion.div>
  );
}
