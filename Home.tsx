import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import CyberneticRobot from '@/components/CyberneticRobot';
import VitalSigns from '@/components/VitalSigns';
import MeasurementLog from '@/components/MeasurementLog';
import { AlertCircle, Upload, Phone, LogOut, User } from 'lucide-react';
import { useState } from 'react';
import ConsultationModal from '@/components/ConsultationModal';
import StatusBar from '@/components/StatusBar';
import { useAuth } from '@/_core/hooks/useAuth';
import { startLogin } from '@/const';

export default function Home() {
  const { user, loading, isAuthenticated, logout } = useAuth();
  const [showAlert, setShowAlert] = useState(false);
  const [showConsultation, setShowConsultation] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      } as any,
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-foreground overflow-hidden">
      {/* Background grid effect */}
      <div className="fixed inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(0, 255, 47, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 47, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Header */}
      <motion.header
        className="sticky top-0 z-50 border-b border-cyan-500/20 bg-slate-900/80 backdrop-blur-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/50"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity } as any}
            >
              <span className="text-white font-bold text-lg">❤</span>
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-300">
                سلامتك
              </h1>
              <p className="text-xs text-gray-500">Salamatak - منصة صحتك الذكية</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Connection status */}
            <motion.div
              className="flex items-center gap-2"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm text-green-400">متصل</span>
            </motion.div>

            {/* Auth section */}
            {loading ? (
              <div className="text-sm text-gray-400">جاري التحميل...</div>
            ) : isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-cyan-500/20 border border-cyan-500/30">
                  <User size={16} className="text-cyan-400" />
                  <span className="text-sm text-cyan-300">{user.name || 'مستخدم'}</span>
                </div>
                <motion.button
                  onClick={() => logout()}
                  className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-gray-400 hover:text-red-400"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title="تسجيل الخروج"
                >
                  <LogOut size={18} />
                </motion.button>
              </div>
            ) : (
              <motion.button
                onClick={() => startLogin()}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-cyan-500 text-white font-medium text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                تسجيل الدخول
              </motion.button>
            )}
          </div>
        </div>
      </motion.header>

      {/* Main content - Bento Grid Layout */}
      <motion.main
        className="container mx-auto px-4 py-8 max-w-7xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-max">
          {/* Main AI Hub - Large card spanning 2 columns */}
          <motion.div
            className="md:col-span-2 lg:col-span-2 lg:row-span-2 rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm shadow-2xl shadow-cyan-500/20 overflow-hidden"
            variants={itemVariants}
            whileHover={{ boxShadow: '0 0 40px rgba(0, 255, 47, 0.3)' }}
          >
            <div className="p-6 h-full flex flex-col">
              <h2 className="text-xl font-bold text-cyan-400 mb-4">مساعدك الصحي الذكي</h2>
              <div className="flex-1 flex items-center justify-center">
                <CyberneticRobot />
              </div>
            </div>
          </motion.div>

          {/* Vital Signs - Right top */}
          <motion.div
            className="md:col-span-1 lg:col-span-2 rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm shadow-2xl shadow-cyan-500/20 p-6"
            variants={itemVariants}
            whileHover={{ boxShadow: '0 0 40px rgba(0, 255, 47, 0.3)' }}
          >
            <h2 className="text-lg font-bold text-cyan-400 mb-4">العلامات الحيوية</h2>
            <VitalSigns />
          </motion.div>

          {/* Measurement Log - Right middle */}
          <motion.div
            className="md:col-span-1 lg:col-span-2 rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm shadow-2xl shadow-cyan-500/20 p-6"
            variants={itemVariants}
            whileHover={{ boxShadow: '0 0 40px rgba(0, 255, 47, 0.3)' }}
          >
            <MeasurementLog />
          </motion.div>

          {/* Quick Actions - Bottom left */}
          <motion.div
            className="md:col-span-1 lg:col-span-2 rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm shadow-2xl shadow-cyan-500/20 p-6"
            variants={itemVariants}
            whileHover={{ boxShadow: '0 0 40px rgba(0, 255, 47, 0.3)' }}
          >
            <h3 className="text-lg font-bold text-cyan-400 mb-4">الإجراءات السريعة</h3>
            <div className="space-y-3">
              <motion.button
                className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-cyan-600 to-cyan-500 text-white font-medium flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Upload size={18} />
                رفع صورة التحليل
              </motion.button>
              <motion.button
                onClick={() => setShowConsultation(true)}
                className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium flex items-center justify-center gap-2 shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Phone size={18} />
                استشارة طبية
              </motion.button>
            </div>
          </motion.div>

          {/* Emergency Button - Bottom right */}
          <motion.div
            className="md:col-span-1 lg:col-span-2 rounded-2xl border border-red-500/50 bg-gradient-to-br from-red-900/30 to-red-950/30 backdrop-blur-sm shadow-2xl shadow-red-500/20 p-6 flex flex-col items-center justify-center"
            variants={itemVariants}
            whileHover={{ boxShadow: '0 0 40px rgba(255, 180, 180, 0.4)' }}
          >
            <AlertCircle size={32} className="text-red-400 mb-3" />
            <motion.button
              onClick={() => setShowAlert(!showAlert)}
              className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-red-600 to-red-500 text-white font-bold text-lg shadow-lg shadow-red-500/50 hover:shadow-red-500/70"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              🚨 طلب طوارئ
            </motion.button>
            <p className="text-xs text-red-400/70 mt-3 text-center">
              للحالات الحرجة فقط
            </p>
          </motion.div>

          {/* Medical Disclaimer - Full width */}
          <motion.div
            className="md:col-span-3 lg:col-span-4 rounded-2xl border border-yellow-500/30 bg-gradient-to-br from-yellow-900/20 to-yellow-950/20 backdrop-blur-sm p-6"
            variants={itemVariants}
          >
            <div className="flex gap-3">
              <AlertCircle size={20} className="text-yellow-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-yellow-400 mb-1">إخلاء المسؤولية الطبية</h4>
                <p className="text-sm text-yellow-400/80">
                  تطبيق سلامتك ومستشار الذكاء الاصطناعي يقدمان إرشادات ووقائيات توعوية فقط، ولا يغنيان عن
                  استشارة الطبيب البشري المختص أو مراجعة الطوارئ في الحالات الحرجة. في حالة الشعور بأي أعراض
                  خطيرة، يرجى التوجه للمستشفى فوراً.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.main>

      {/* Emergency Alert Modal */}
      {showAlert && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowAlert(false)}
        >
          <motion.div
            className="bg-gradient-to-br from-red-900/80 to-red-950/80 rounded-2xl border-2 border-red-500 p-8 max-w-md w-full shadow-2xl shadow-red-500/50"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={e => e.stopPropagation()}
          >
            <div className="text-center">
              <motion.div
                className="text-6xl mb-4"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5 }}
              >
                🚨
              </motion.div>
              <h3 className="text-2xl font-bold text-red-300 mb-4">تنبيه طوارئ</h3>
              <div className="bg-red-950/50 rounded-lg p-4 mb-6 text-left">
                <p className="text-sm text-red-200 mb-3">
                  <strong>بيانات المريض الحالية:</strong>
                </p>
                <div className="space-y-2 text-sm text-red-200/80">
                  <p>• نبض القلب: 85 نبضة/دقيقة</p>
                  <p>• مستوى الأكسجين: 96%</p>
                  <p>• درجة الحرارة: 37.2°م</p>
                  <p>• ضغط الدم: 125/82 ملم زئبق</p>
                </div>
              </div>
              <p className="text-red-200 mb-6">
                يرجى الاتصال برقم الطوارئ فوراً أو التوجه لأقرب مستشفى
              </p>
              <div className="space-y-3">
                <motion.button
                  className="w-full py-3 px-4 rounded-lg bg-red-600 text-white font-bold"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  ☎ اتصل برقم الطوارئ
                </motion.button>
                <motion.button
                  onClick={() => setShowAlert(false)}
                  className="w-full py-3 px-4 rounded-lg bg-red-900/50 text-red-200 font-medium border border-red-500"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  إغلاق
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Consultation Modal */}
      <ConsultationModal isOpen={showConsultation} onClose={() => setShowConsultation(false)} />

      {/* Status Bar */}
      <StatusBar />

      {/* Footer */}
      <motion.footer
        className="border-t border-cyan-500/20 bg-slate-900/50 backdrop-blur-md mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-500">
          <p>© 2026 سلامتك - منصة صحتك الذكية | جميع الحقوق محفوظة</p>
          <p className="mt-2 text-xs">تم تطويره بـ ❤ لصحتك وسلامتك</p>
        </div>
      </motion.footer>
    </div>
  );
}
