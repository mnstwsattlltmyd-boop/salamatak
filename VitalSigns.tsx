import { motion } from 'framer-motion';
import { Heart, Droplets, Thermometer, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

interface VitalReading {
  heartRate: number;
  oxygenLevel: number;
  temperature: number;
  bloodPressure: string;
  glucose: number;
  hemoglobin: number;
}

export default function VitalSigns() {
  const [vitals, setVitals] = useState<VitalReading>({
    heartRate: 72,
    oxygenLevel: 98,
    temperature: 36.8,
    bloodPressure: '120/80',
    glucose: 95,
    hemoglobin: 14.5,
  });

  const [isMonitoring, setIsMonitoring] = useState(false);

  // Simulate vital signs monitoring
  useEffect(() => {
    if (!isMonitoring) return;

    const interval = setInterval(() => {
      setVitals(prev => ({
        heartRate: Math.max(60, Math.min(100, prev.heartRate + (Math.random() - 0.5) * 4)),
        oxygenLevel: Math.max(95, Math.min(100, prev.oxygenLevel + (Math.random() - 0.5) * 2)),
        temperature: Math.max(36.5, Math.min(37.5, prev.temperature + (Math.random() - 0.5) * 0.2)),
        bloodPressure: `${Math.round(110 + Math.random() * 20)}/${Math.round(70 + Math.random() * 20)}`,
        glucose: Math.max(80, Math.min(120, prev.glucose + (Math.random() - 0.5) * 5)),
        hemoglobin: Math.max(13, Math.min(16, prev.hemoglobin + (Math.random() - 0.5) * 0.3)),
      }));
    }, 1500);

    return () => clearInterval(interval);
  }, [isMonitoring]);

  const getStatusColor = (value: number, min: number, max: number) => {
    if (value < min || value > max) return 'text-red-400';
    if (value < min + (max - min) * 0.2 || value > max - (max - min) * 0.2) return 'text-yellow-400';
    return 'text-green-400';
  };

  const VitalCard = ({
    icon: Icon,
    label,
    value,
    unit,
    min,
    max,
  }: {
    icon: React.ReactNode;
    label: string;
    value: number | string;
    unit: string;
    min?: number;
    max?: number;
  }) => {
    const isNumeric = typeof value === 'number';
    const statusColor = isNumeric && min !== undefined && max !== undefined
      ? getStatusColor(value, min, max)
      : 'text-cyan-400';

    return (
      <motion.div
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-4 border border-cyan-500/30 shadow-lg shadow-cyan-500/20"
        whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 255, 47, 0.4)' }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="text-cyan-400">{Icon}</div>
          <span className="text-sm text-gray-400">{label}</span>
        </div>
        <div className="flex items-baseline gap-1">
          <motion.span
            className={`text-2xl font-bold ${statusColor}`}
            key={value}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.3 }}
          >
            {value}
          </motion.span>
          <span className="text-xs text-gray-500">{unit}</span>
        </div>
        {isNumeric && min !== undefined && max !== undefined && (
          <div className="mt-2 text-xs text-gray-500">
            النطاق: {min}-{max}
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="w-full space-y-4">
      {/* Monitoring toggle */}
      <motion.button
        onClick={() => setIsMonitoring(!isMonitoring)}
        className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
          isMonitoring
            ? 'bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg shadow-green-500/50'
            : 'bg-gradient-to-r from-cyan-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/50'
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isMonitoring ? '⏹ إيقاف المراقبة' : '▶ بدء المراقبة'}
      </motion.button>

      {/* Vitals grid */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        <VitalCard
          icon={<Heart size={20} />}
          label="نبض القلب"
          value={Math.round(vitals.heartRate)}
          unit="نبضة/دقيقة"
          min={60}
          max={100}
        />
        <VitalCard
          icon={<Zap size={20} />}
          label="مستوى الأكسجين"
          value={Math.round(vitals.oxygenLevel)}
          unit="%"
          min={95}
          max={100}
        />
        <VitalCard
          icon={<Thermometer size={20} />}
          label="درجة الحرارة"
          value={vitals.temperature.toFixed(1)}
          unit="°م"
          min={36.5}
          max={37.5}
        />
        <VitalCard
          icon={<Droplets size={20} />}
          label="ضغط الدم"
          value={vitals.bloodPressure}
          unit="ملم زئبق"
        />
        <VitalCard
          icon={<Heart size={20} />}
          label="السكر"
          value={Math.round(vitals.glucose)}
          unit="ملغ/ديسيلتر"
          min={80}
          max={120}
        />
        <VitalCard
          icon={<Droplets size={20} />}
          label="الهيموجلوبين"
          value={vitals.hemoglobin.toFixed(1)}
          unit="غ/ديسيلتر"
          min={13}
          max={16}
        />
      </div>

      {/* ECG-like waveform visualization */}
      <motion.div
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-4 border border-cyan-500/30 shadow-lg shadow-cyan-500/20"
        animate={{
          boxShadow: isMonitoring
            ? [
                '0 0 20px rgba(0, 255, 47, 0.2)',
                '0 0 40px rgba(0, 255, 47, 0.4)',
                '0 0 20px rgba(0, 255, 47, 0.2)',
              ]
            : '0 0 20px rgba(0, 255, 47, 0.2)',
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Heart size={16} className="text-red-500" />
          <span className="text-sm text-gray-400">رسم القلب (ECG)</span>
        </div>
        <svg className="w-full h-16" viewBox="0 0 200 50" preserveAspectRatio="none">
          <motion.polyline
            points="0,25 10,25 15,10 20,35 25,25 40,25 45,20 50,30 60,25 80,25 85,15 90,35 95,25 110,25 120,25 130,20 140,30 150,25 160,25 170,22 180,28 190,25 200,25"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00FF2F" />
              <stop offset="50%" stopColor="#00D4FF" />
              <stop offset="100%" stopColor="#FF6B9D" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Status indicator */}
      <motion.div
        className="flex items-center justify-center gap-2 text-sm text-cyan-400"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.div
          className="w-2 h-2 rounded-full bg-cyan-400"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        {isMonitoring ? 'جاري المراقبة المباشرة' : 'جاهز للمراقبة'}
      </motion.div>
    </div>
  );
}
