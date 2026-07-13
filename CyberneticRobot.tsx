import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface RobotState {
  mode: 'idle' | 'processing' | 'speaking' | 'alert';
  mouseX: number;
  mouseY: number;
}

export default function CyberneticRobot() {
  const [state, setState] = useState<RobotState>({
    mode: 'idle',
    mouseX: 0,
    mouseY: 0,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const [audioWaves, setAudioWaves] = useState<number[]>([]);

  // Track mouse movement for eye tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
        const distance = 8;

        setState(prev => ({
          ...prev,
          mouseX: Math.cos(angle) * distance,
          mouseY: Math.sin(angle) * distance,
        }));
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Generate audio waves animation
  useEffect(() => {
    if (state.mode === 'speaking') {
      const interval = setInterval(() => {
        setAudioWaves(prev => {
          const newWaves = Array.from({ length: 5 }, () => Math.random() * 20 + 10);
          return newWaves;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [state.mode]);

  // Simulate mode changes for demo
  useEffect(() => {
    const modes: Array<'idle' | 'processing' | 'speaking' | 'alert'> = ['idle', 'processing', 'speaking', 'alert'];
    let modeIndex = 0;

    const interval = setInterval(() => {
      modeIndex = (modeIndex + 1) % modes.length;
      setState(prev => ({ ...prev, mode: modes[modeIndex] }));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center w-full h-full min-h-[400px] relative"
    >
      {/* Background glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-3xl"
        animate={{
          opacity: state.mode === 'alert' ? [0.5, 0.8, 0.5] : 0.3,
        }}
        transition={{ duration: 1, repeat: Infinity }}
      />

      {/* Main robot container */}
      <motion.div
        className="relative w-48 h-48 flex items-center justify-center"
        animate={{
          scale: state.mode === 'alert' ? [1, 1.05, 1] : 1,
        }}
        transition={{ duration: 0.5, repeat: state.mode === 'alert' ? Infinity : 0 }}
      >
        {/* Robot face circle */}
        <motion.div
          className="relative w-40 h-40 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-cyan-500/50 shadow-lg shadow-cyan-500/30 flex items-center justify-center"
          animate={{
            boxShadow:
              state.mode === 'alert'
                ? [
                    '0 0 20px rgba(255, 180, 180, 0.5)',
                    '0 0 40px rgba(255, 180, 180, 0.8)',
                    '0 0 20px rgba(255, 180, 180, 0.5)',
                  ]
                : '0 0 20px rgba(0, 255, 47, 0.3)',
          }}
          transition={{ duration: 0.5, repeat: state.mode === 'alert' ? Infinity : 0 }}
        >
          {/* Processing mode - scanning circles */}
          {state.mode === 'processing' && (
            <>
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-500 border-r-cyan-500"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute inset-4 rounded-full border-2 border-transparent border-b-cyan-500 border-l-cyan-500"
                animate={{ rotate: -360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />
            </>
          )}

          {/* Eyes container */}
          <div className="relative w-32 h-20 flex items-center justify-between">
            {/* Left eye */}
            <motion.div
              className="relative w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 shadow-lg shadow-cyan-500/50 flex items-center justify-center"
              animate={{
                x: state.mode === 'idle' ? state.mouseX : 0,
                y: state.mode === 'idle' ? state.mouseY : 0,
              }}
              transition={{ type: 'spring', stiffness: 100, damping: 10 }}
            >
              <motion.div
                className="w-3 h-3 rounded-full bg-slate-900"
                animate={{
                  scale: state.mode === 'processing' ? [1, 1.2, 1] : 1,
                }}
                transition={{ duration: 0.5, repeat: state.mode === 'processing' ? Infinity : 0 }}
              />
            </motion.div>

            {/* Right eye */}
            <motion.div
              className="relative w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 shadow-lg shadow-cyan-500/50 flex items-center justify-center"
              animate={{
                x: state.mode === 'idle' ? state.mouseX : 0,
                y: state.mode === 'idle' ? state.mouseY : 0,
              }}
              transition={{ type: 'spring', stiffness: 100, damping: 10 }}
            >
              <motion.div
                className="w-3 h-3 rounded-full bg-slate-900"
                animate={{
                  scale: state.mode === 'processing' ? [1, 1.2, 1] : 1,
                }}
                transition={{ duration: 0.5, repeat: state.mode === 'processing' ? Infinity : 0 }}
              />
            </motion.div>
          </div>

          {/* Mouth indicator */}
          <motion.div
            className="absolute bottom-6 w-12 h-1 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400"
            animate={{
              scaleX: state.mode === 'speaking' ? [1, 1.2, 1] : 1,
              opacity: state.mode === 'speaking' ? 1 : 0.5,
            }}
            transition={{ duration: 0.3, repeat: state.mode === 'speaking' ? Infinity : 0 }}
          />
        </motion.div>

        {/* Audio waves visualization (Speaking mode) */}
        {state.mode === 'speaking' && (
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-24 flex items-end gap-1 h-12">
            {audioWaves.map((height, i) => (
              <motion.div
                key={i}
                className="w-1 bg-gradient-to-t from-cyan-500 to-cyan-300 rounded-full"
                animate={{ height: `${height}px` }}
                transition={{ duration: 0.1 }}
              />
            ))}
          </div>
        )}

        {/* Alert pulse (Alert mode) */}
        {state.mode === 'alert' && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-red-500/50"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [1, 0, 1],
              }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <motion.div
              className="absolute top-2 right-2 w-3 h-3 rounded-full bg-yellow-400"
              animate={{
                opacity: [1, 0.3, 1],
              }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-2 left-2 w-3 h-3 rounded-full bg-red-500"
              animate={{
                opacity: [1, 0.3, 1],
              }}
              transition={{ duration: 0.5, repeat: Infinity, delay: 0.25 }}
            />
          </>
        )}
      </motion.div>

      {/* Status text */}
      <motion.div
        className="absolute bottom-0 text-center text-sm font-medium text-cyan-400"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {state.mode === 'idle' && 'جاهز للاستشارة'}
        {state.mode === 'processing' && 'جاري التحليل...'}
        {state.mode === 'speaking' && 'جاري الشرح...'}
        {state.mode === 'alert' && 'تنبيه مهم!'}
      </motion.div>
    </div>
  );
}
