import { motion } from 'framer-motion';
import { Wifi, Battery, Volume2, Settings } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function StatusBar() {
  const [time, setTime] = useState(new Date());
  const [battery, setBattery] = useState(85);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ar-SA', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ar-SA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-40 space-y-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      {/* Time and Date Widget */}
      <motion.div
        className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-md rounded-lg border border-cyan-500/30 p-4 shadow-lg shadow-cyan-500/20 min-w-max"
        whileHover={{ boxShadow: '0 0 30px rgba(0, 255, 47, 0.3)' }}
      >
        <div className="text-center">
          <div className="text-2xl font-bold text-cyan-400 font-mono">
            {formatTime(time)}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {formatDate(time)}
          </div>
        </div>
      </motion.div>

      {/* System Status Widget */}
      <motion.div
        className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-md rounded-lg border border-cyan-500/30 p-3 shadow-lg shadow-cyan-500/20"
        whileHover={{ boxShadow: '0 0 30px rgba(0, 255, 47, 0.3)' }}
      >
        <div className="space-y-2">
          {/* WiFi Status */}
          <motion.div
            className="flex items-center gap-2 text-xs"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Wifi size={14} className="text-green-400" />
            <span className="text-gray-400">متصل</span>
            <span className="text-gray-600">|</span>
            <span className="text-gray-500">عالي</span>
          </motion.div>

          {/* Battery Status */}
          <div className="flex items-center gap-2 text-xs">
            <Battery size={14} className={battery > 50 ? 'text-green-400' : 'text-yellow-400'} />
            <div className="flex-1 bg-slate-700 rounded-full h-1.5 w-12">
              <motion.div
                className={`h-full rounded-full ${battery > 50 ? 'bg-green-500' : 'bg-yellow-500'}`}
                initial={{ width: `${battery}%` }}
                animate={{ width: `${battery}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <span className="text-gray-500 w-6 text-right">{battery}%</span>
          </div>

          {/* Sound Status */}
          <div className="flex items-center gap-2 text-xs">
            <Volume2 size={14} className="text-blue-400" />
            <span className="text-gray-400">الصوت مفعل</span>
          </div>
        </div>
      </motion.div>

      {/* Quick Settings */}
      <motion.button
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600/50 to-cyan-500/50 hover:from-cyan-600 hover:to-cyan-500 rounded-lg p-3 text-sm text-cyan-200 transition-all shadow-lg shadow-cyan-500/20"
        whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 255, 47, 0.4)' }}
        whileTap={{ scale: 0.95 }}
      >
        <Settings size={16} />
        الإعدادات
      </motion.button>
    </motion.div>
  );
}
