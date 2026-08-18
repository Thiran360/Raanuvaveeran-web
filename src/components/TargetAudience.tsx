import { UserCheck, Target, GraduationCap, Briefcase, Building2, Globe, Medal, Shield, TrendingUp, Compass, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function TargetAudience({ onOpenModal }: { onOpenModal: (m: string) => void }) {
  const { language, t } = useLanguage();
  const isTa = language === 'ta';

  const audiences = [
    {
      icon: <GraduationCap className="w-6 h-6 text-indigo-500" />,
      text: isTa 
        ? "குடும்பத்தின் பொறுப்புகளோடும், எதிர்காலக் கனவுகளோடும் கல்லூரியில் படித்துக் கொண்டிருக்கும் மாணவர்களா?"
        : "A college student studying with family responsibilities and future dreams?"
    },
    {
      icon: <Briefcase className="w-6 h-6 text-emerald-500" />,
      text: isTa 
        ? "Campus Interview எதிர்நோக்கிக் காத்திருக்கும் குடும்பத்தின் விடிவெள்ளியா?"
        : "The guiding light of your family, eagerly waiting for a Campus Interview?"
    },
    {
      icon: <Target className="w-6 h-6 text-rose-500" />,
      text: isTa 
        ? "போட்டித் தேர்வுகளுக்குத் தயாராகிக் கொண்டிருக்கும் துடிப்பான இளைஞரா?"
        : "An energetic youth preparing for competitive exams?"
    },
    {
      icon: <Building2 className="w-6 h-6 text-blue-500" />,
      text: isTa 
        ? "மத்திய அரசின் எண்ணற்ற துறைகளில் இருக்கும் வேலை மற்றும் தொழில் வாய்ப்புகளைத் தவறவிட்டுக் கொண்டிருக்கும் சாமானியத் தமிழக மாணவரா?"
        : "A common Tamil Nadu student missing out on countless central government job and career opportunities?"
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-amber-500" />,
      text: isTa 
        ? "தங்களது திறமையில் தங்களுக்கென ஒரு தொழில் சாம்ராஜ்யத்தை இந்தியா முழுவதும் கட்டமைக்க விரும்பும் கனவுகளின் நாயகரா?"
        : "A dreamer wanting to build a business empire across India with your unique talents?"
    },
    {
      icon: <Medal className="w-6 h-6 text-purple-500" />,
      text: isTa 
        ? "தமிழகம் கடந்து தங்களது திறமையை காட்டத் துடிக்கும் விளையாட்டு வீரரா?"
        : "An athlete yearning to showcase your talent beyond Tamil Nadu?"
    },
    {
      icon: <Shield className="w-6 h-6 text-green-500" />,
      text: isTa 
        ? "இந்திய இராணுவம் உள்ளிட்ட பாதுகாப்புப் படையில் இணைந்து இந்தியதேசத்தை காக்க விரும்பும் இணையற்ற வீரரா?"
        : "An unparalleled warrior aspiring to join the Indian Army and defense forces to protect our nation?"
    },
    {
      icon: <Globe className="w-6 h-6 text-cyan-500" />,
      text: isTa 
        ? "உலக வரலாற்றின் பெருமை மிகுந்த இந்திய அரசியல் களத்தில் சாதிக்கத் துடிக்கும் இளைஞரா?"
        : "A youth driven to achieve in the historically proud Indian political arena?"
    },
    {
      icon: <UserCheck className="w-6 h-6 text-pink-500" />,
      text: isTa 
        ? "இந்தி என்ற ஒரே ஒரு மொழியை மட்டும் தெரிந்து கொள்வதால் உங்களுடைய தொழில் மற்றும் வேலை வாய்ப்புகளை இந்தியாவின் அனைத்து மாநிலங்களிலும் விரிவுபடுத்திக் கொள்ள முடியும் என்று தீர்க்கமாக நம்புகிறீர்களா?"
        : "Do you firmly believe that knowing just the Hindi language can expand your career and business opportunities across all states in India?"
    },
    {
      icon: <Compass className="w-6 h-6 text-teal-500" />,
      text: isTa 
        ? "கல்வி / ஆன்மீக / குடும்ப மற்றும் தொழில்முறை சுற்றுலா செல்ல விருப்பம் கொண்டவரா?"
        : "Someone who loves to embark on educational, spiritual, family, and professional tours?"
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-slate-50/50 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-6"
          >
            {isTa ? "நீங்கள்....." : "Are you....."}
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-16">
          {audiences.map((audience, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: (idx % 2) * 0.1 }}
              className="bg-white border border-slate-100 p-6 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-xl hover:-translate-y-1 transition-all group flex items-start gap-5"
            >
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex-shrink-0 group-hover:scale-110 transition-transform">
                {audience.icon}
              </div>
              <p className="text-slate-700 font-medium leading-relaxed text-base sm:text-lg pt-1">
                {audience.text}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center bg-indigo-600 rounded-[2.5rem] p-10 sm:p-14 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 mix-blend-overlay"></div>
          
          <h3 className="text-3xl sm:text-4xl font-black text-white mb-8 relative z-10">
            {isTa ? "இந்த பயிற்சி உங்களுக்காகவே.....!" : "This Training is Exclusively for You...!"}
          </h3>
          
          <button
            onClick={() => onOpenModal('enroll')}
            className="relative z-10 inline-flex items-center gap-3 bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-50 transition-all transform hover:scale-105 shadow-xl"
          >
            {t('enrollNow')}
            <ArrowRight className="w-5 h-5" />
          </button>

          <p className="mt-8 text-indigo-100 font-medium text-lg relative z-10 max-w-2xl mx-auto">
            {isTa 
              ? "ஈடில்லாத தேசப் பணியைத் தொடர்ந்து...! இணையில்லாத மக்கள் பணியில்...! இராணுவ வீரன்...!" 
              : "Continuing unparalleled service to the nation...! In the incomparable service of the people...! Raanuva Veeran...!"}
          </p>
        </motion.div>

      </div>
    </section>
  );
}
