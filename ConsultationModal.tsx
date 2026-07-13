import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Upload, Loader2 } from 'lucide-react';
import { useState, useRef } from 'react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'مرحباً! أنا مساعدك الصحي الذكي. كيف يمكنني مساعدتك اليوم؟ يمكنك وصف أعراضك أو رفع صورة تحليل.',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!input.trim() && !uploadedImage) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input || (uploadedImage ? 'تم رفع صورة' : ''),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setUploadedImage(null);
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponses = [
        'بناءً على المعلومات التي قدمتها، يبدو أن حالتك طبيعية. استمر في مراقبة العلامات الحيوية.',
        'أنصحك بشرب الكثير من الماء والراحة. إذا استمرت الأعراض، يرجى استشارة الطبيب.',
        'هذه الأعراض قد تكون مرتبطة بالإجهاد. حاول الاسترخاء وممارسة تمارين التنفس.',
        'من المهم الحفاظ على نمط حياة صحي. تأكد من الحصول على قسط كافٍ من النوم.',
      ];

      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: randomResponse,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
      scrollToBottom();
    }, 1500);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-40 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-cyan-500/30 w-full max-w-2xl h-96 flex flex-col shadow-2xl shadow-cyan-500/30"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-cyan-500/20">
              <h2 className="text-xl font-bold text-cyan-400">استشارة طبية ذكية</h2>
              <motion.button
                onClick={onClose}
                className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <X size={20} className="text-gray-400" />
              </motion.button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-cyan-600 to-cyan-500 text-white rounded-br-none'
                        : 'bg-slate-700/50 text-gray-200 rounded-bl-none border border-cyan-500/30'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString('ar-SA', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-slate-700/50 text-gray-200 px-4 py-3 rounded-lg rounded-bl-none border border-cyan-500/30 flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin text-cyan-400" />
                    <span className="text-sm">جاري التحليل...</span>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Image preview */}
            {uploadedImage && (
              <motion.div
                className="px-6 py-3 border-t border-cyan-500/20 bg-slate-800/50"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={uploadedImage}
                    alt="uploaded"
                    className="w-16 h-16 rounded-lg object-cover border border-cyan-500/30"
                  />
                  <div className="flex-1">
                    <p className="text-sm text-gray-400">صورة التحليل المرفوعة</p>
                    <p className="text-xs text-gray-500">جاهزة للتحليل</p>
                  </div>
                  <motion.button
                    onClick={() => setUploadedImage(null)}
                    className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X size={16} className="text-gray-400" />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Input */}
            <div className="p-6 border-t border-cyan-500/20 space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
                  placeholder="اكتب سؤالك أو وصف أعراضك..."
                  className="flex-1 bg-slate-700/50 border border-cyan-500/30 rounded-lg px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
                <motion.button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-cyan-400"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title="رفع صورة"
                >
                  <Upload size={20} />
                </motion.button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <motion.button
                  onClick={handleSendMessage}
                  disabled={isLoading || (!input.trim() && !uploadedImage)}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-cyan-500 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send size={18} />
                </motion.button>
              </div>
              <p className="text-xs text-gray-500 text-center">
                ⚠️ هذا التطبيق يقدم استشارات توعوية فقط ولا يغني عن الطبيب
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
