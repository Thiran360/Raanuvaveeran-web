import { Quote, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function VisionBanner() {
  const { language } = useLanguage();
  const isTa = language === 'ta';

  return (
    <section className="py-24 relative overflow-hidden bg-white border-b border-slate-100">
      <div className="absolute inset-0 bg-slate-50/30 pointer-events-none"></div>
      
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-100/50 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-100/40 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 font-semibold tracking-wide text-sm mb-6">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            {isTa ? "நமது நோக்கம்" : "Our Vision"}
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.2]">
            {isTa ? (
              <>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">இந்தியில் பேசுவோம்...!</span><br/>
                இந்தியர் அனைவருடனும் பேசுவோம்...!
              </>
            ) : (
              <>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Let's Speak in Hindi...!</span><br/>
                Let's connect with all Indians...!
              </>
            )}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 relative group hover:shadow-xl hover:-translate-y-1 hover:border-indigo-200 transition-all duration-300"
          >
            <Quote className="w-12 h-12 text-indigo-100 absolute top-6 left-6 -z-0 transform -scale-x-100" />
            <p className="text-lg sm:text-xl text-slate-700 font-medium leading-relaxed relative z-10">
              {isTa 
                ? "இந்தியை கற்பது தமிழை அழிப்பதற்காக இல்லை. தமிழர்களை இந்திய நாட்டின் தலைவர்களாக ஆக்கவே...!" 
                : "Learning Hindi is not to destroy Tamil. It is to empower Tamils to become the leaders of India...!"}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 relative group hover:shadow-xl hover:-translate-y-1 hover:border-indigo-200 transition-all duration-300"
          >
            <Quote className="w-12 h-12 text-indigo-100 absolute top-6 left-6 -z-0 transform -scale-x-100" />
            <p className="text-lg sm:text-xl text-slate-700 font-medium leading-relaxed relative z-10">
              {isTa 
                ? "இந்தியை கற்போம் ; நம் தமிழின் பெருமையை இந்தியா முழுவதிலும் பறை சாற்றுவோம்...! பெருமை மிகு தமிழனாக தமிழை இந்தியாவின் ஆட்சி மொழியாக ஆக்குவோம்...!" 
                : "Let's learn Hindi and proclaim the glory of Tamil all over India...! As proud Tamils, let's make Tamil the administrative language of India...!"}
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
