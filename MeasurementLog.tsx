import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Archive, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Measurement {
  id: string;
  timestamp: Date;
  heartRate: number;
  oxygenLevel: number;
  temperature: number;
  status: 'normal' | 'warning' | 'alert';
}

export default function MeasurementLog() {
  const [measurements, setMeasurements] = useState<Measurement[]>([]);

  useEffect(() => {
    const sampleMeasurements: Measurement[] = Array.from({ length: 8 }, (_, i) => ({
      id: `m-${i}`,
      timestamp: new Date(Date.now() - i * 15 * 60000),
      heartRate: 72 + Math.random() * 20 - 10,
      oxygenLevel: 98 + Math.random() * 3 - 1.5,
      temperature: 36.8 + Math.random() * 0.5 - 0.25,
      status: Math.random() > 0.8 ? 'warning' : 'normal',
    }));
    setMeasurements(sampleMeasurements);
  }, []);

  const deleteMeasurement = (id: string) => {
    setMeasurements(prev => prev.filter(m => m.id !== id));
  };

  const archiveMeasurement = (id: string) => {
    setMeasurements(prev =>
      prev.map(m => (m.id === id ? { ...m, status: 'normal' } : m))
    );
  };

  const getStatusColor = (status: string) => {
    if (status === 'alert') {
      return 'bg-red-500/20 border-red-500/50 text-red-400';
    }
    if (status === 'warning') {
      return 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400';
    }
    return 'bg-green-500/20 border-green-500/50 text-green-400';
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);

    if (minutes < 1) return 'الآن';
    if (minutes < 60) return `منذ ${minutes} دقيقة`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `منذ ${hours} ساعة`;
    const days = Math.floor(hours / 24);
    return `منذ ${days} يوم`;
  };

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-cyan-400">سجل القياسات</h3>
        <span className="text-xs text-gray-500">{measurements.length} قياس</span>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
        <AnimatePresence>
          {measurements.length > 0 ? (
            measurements.map((measurement, index) => (
              <motion.div
                key={measurement.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                className={`p-3 rounded-lg border ${getStatusColor(
                  measurement.status
                )} bg-slate-800/50 backdrop-blur-sm group hover:bg-slate-800/80 transition-all`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock size={14} className="flex-shrink-0" />
                      <span className="text-xs text-gray-400">
                        {formatTime(measurement.timestamp)}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <span className="text-gray-500">النبض:</span>
                        <span className="ml-1 font-medium">
                          {Math.round(measurement.heartRate)}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">الأكسجين:</span>
                        <span className="ml-1 font-medium">
                          {Math.round(measurement.oxygenLevel)}%
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">الحرارة:</span>
                        <span className="ml-1 font-medium">
                          {measurement.temperature.toFixed(1)}°
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                    <motion.button
                      onClick={() => archiveMeasurement(measurement.id)}
                      className="p-1.5 rounded bg-blue-500/20 hover:bg-blue-500/40 text-blue-400 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      title="أرشفة"
                    >
                      <Archive size={14} />
                    </motion.button>
                    <motion.button
                      onClick={() => deleteMeasurement(measurement.id)}
                      className="p-1.5 rounded bg-red-500/20 hover:bg-red-500/40 text-red-400 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      title="حذف"
                    >
                      <Trash2 size={14} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8 text-gray-500"
            >
              <p>لا توجد قياسات حتى الآن</p>
              <p className="text-xs mt-1">ابدأ بقياس العلامات الحيوية</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {measurements.length > 0 && (
        <motion.button
          onClick={() => setMeasurements([])}
          className="w-full py-2 px-3 rounded-lg text-sm text-red-400 border border-red-500/30 hover:bg-red-500/10 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          مسح الكل
        </motion.button>
      )}
    </div>
  );
}
