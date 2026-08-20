import { Target, Users, BookOpen, Clock, CheckCircle, Zap, Shield, Star, PhoneCall, ChevronRight, Sparkles } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, useScroll, useTransform } from 'framer-motion';

interface FastrackCoursesPageProps {
  onOpenModal: (modal: string) => void;
}

function useInView(options = {}): [React.RefObject<any>, boolean] {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
      }
    }, { threshold: 0.1, ...options });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return [ref, isInView];
}

export default function FastrackCoursesPage({ onOpenModal }: FastrackCoursesPageProps) {
  const { language, t } = useLanguage();
  const [heroRef, heroInView] = useInView();
  const [methodRef, methodInView] = useInView();
  const syllabusContainerRef = useRef<HTMLDivElement>(null);
  const [ctaRef, ctaInView] = useInView();

  const { scrollYProgress } = useScroll({
    target: syllabusContainerRef,
    offset: ["start center", "end center"]
  });

  const isTa = language === 'ta';

  const methods = [
    { 
      icon: <Users className="w-6 h-6" />, 
      title: "One-to-One Training", 
      desc: isTa ? "தனிப்பட்ட கவனம் செலுத்தி பயிற்சி" : "Personalized 1-on-1 coaching for maximum results" 
    },
    { 
      icon: <Target className="w-6 h-6" />, 
      title: "100% Speaking-focused", 
      desc: isTa ? "பேச்சுப் பயிற்சிக்கு மட்டுமே முன்னுரிமை" : "Priority strictly given to conversational practice" 
    },
    { 
      icon: <BookOpen className="w-6 h-6" />, 
      title: "No Hindi Letters Needed", 
      desc: isTa ? "எழுத்துக்களை கற்காமல் எளிதாக பேசலாம்" : "Speak fluently without needing to learn the script" 
    },
    { 
      icon: <Clock className="w-6 h-6" />, 
      title: "Daily Conversation", 
      desc: isTa ? "தினசரி உரையாடல் பயிற்சி" : "Everyday practical conversation drills" 
    },
    { 
      icon: <Shield className="w-6 h-6" />, 
      title: "Real-life Situations", 
      desc: isTa ? "நடைமுறை வாழ்க்கைக்கு தேவையான ஹிந்தி" : "Hindi tailored for your everyday practical needs" 
    },
    { 
      icon: <Zap className="w-6 h-6" />, 
      title: "Easy Learning Method", 
      desc: isTa ? "எளிய தமிழ் வழி ஹிந்தி கற்றல்" : "Simple and effective Tamil-to-Hindi learning approach" 
    }
  ];

  const syllabus = [
    {
      week: "Week 1",
      title: "Foundation & Basics",
      topics: [
        "Pronoun, Verb, Orders",
        "Relationship & Parts of Body",
        "Regular Usage Words - 1",
        "Questions & Numbers",
        "Everyday vocabulary",
        "Simple conversations"
      ]
    },
    {
      week: "Week 2",
      title: "Structure & Flow",
      topics: [
        "Verb & Time",
        "Positions",
        "Daily Conversation",
        "Vetrumai Urubugal",
        "Tense - General"
      ]
    },
    {
      week: "Week 3",
      title: "Expression & Storytelling",
      topics: [
        "Tenses (Simple, Continuous, Perfect)",
        "Asking Question & Answers",
        "Explaining daily routine of self & others",
        "Self Introduction",
        "Speaking about others",
        "Confidence Building Exercises"
      ]
    },
    {
      week: "Week 4",
      title: "Fluency & Application",
      topics: [
        "Shopping, Travel & transportation",
        "Dialogue with fellow students and tutor",
        "Situational Hindi",
        "Speaking without translating word-by-word",
        "Real-life conversation simulations",
        "Continuous speaking practice",
        "Speed, confidence & Final Assessment"
      ]
    }
  ];

  return (
    <div className="pt-16 min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <style>{`
        .animate-fade-up {
          animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.5);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
        }
        .glass-card:hover {
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(99, 102, 241, 0.3);
          box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.1), 0 8px 10px -6px rgba(99, 102, 241, 0.1);
        }
        @keyframes currentFlow {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(400%); opacity: 0; }
        }
        .animate-current-flow {
          animation: currentFlow 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>

      {/* Ultra Modern Hero Section */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center justify-center border-b border-slate-200/60 bg-white">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-200/50 rounded-full blur-[120px] pointer-events-none mix-blend-multiply"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-rose-200/40 rounded-full blur-[100px] pointer-events-none mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.03] mix-blend-overlay"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-20">
          <div ref={heroRef} className={`max-w-4xl mx-auto text-center space-y-10 ${heroInView ? 'animate-fade-up' : 'opacity-0'}`}>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-card text-indigo-600 font-semibold tracking-wide text-xs sm:text-sm"
            >
              <Sparkles className="w-4 h-4 text-indigo-500" />
              Raanuva Veeran Academy Exclusive
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1, type: "spring" }}
              className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.15]"
            >
              28-Day Fast-Track <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-500">
                Spoken Hindi Course
              </span>
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative inline-block w-full max-w-3xl"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl blur-lg opacity-60"></div>
              <p className="relative text-base sm:text-2xl text-slate-700 font-medium leading-relaxed max-w-3xl mx-auto glass-card px-4 py-4 sm:px-8 sm:py-6 rounded-2xl">
                “{isTa 
                  ? "28 நாட்களில் Hindi-யை புரிந்து கொண்டு, தயக்கமின்றி பேசும் அளவிற்கு பயிற்சி!" 
                  : "Understand and speak Hindi fluently without hesitation in just 28 Days!"}”
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-6 sm:pt-8"
            >
              <button
                onClick={() => onOpenModal("enroll")}
                className="w-full sm:w-auto bg-slate-900 text-white px-6 sm:px-10 py-3.5 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:bg-indigo-600 transition-all transform hover:scale-105 shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-3 group"
              >
                <PhoneCall className="w-5 h-5 group-hover:rotate-12 transition-transform shrink-0" />
                <span>{isTa ? "இப்போதே சேருங்கள் - ₹19,999" : "Enroll Now - ₹19,999"}</span>
              </button>
              
              <div className="flex items-center gap-5 text-sm font-medium text-slate-500">
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-500" /> One-to-One
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-indigo-500" /> Fast Track
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Course Method Bento Grid */}
      <section className="py-24 relative overflow-hidden bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Unique Learning Methodology</h2>
            <p className="text-slate-500 mt-4 text-base sm:text-lg">Designed for absolute practical fluency.</p>
          </div>

          <div ref={methodRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {methods.map((method, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1, type: "spring", bounce: 0.3 }}
                className={`bg-white rounded-3xl p-8 transition-all duration-300 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-xl border border-gray-100 hover:border-indigo-200 group relative overflow-hidden`}
              >
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <motion.div 
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300"
                >
                  {method.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-wide">{method.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">{method.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Syllabus Timeline */}
      <section className="py-24 bg-white border-y border-slate-200/60 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-50/50 pointer-events-none"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">4-Week Master Plan</h2>
            <p className="text-slate-500 text-base sm:text-lg">A highly optimized roadmap engineered for rapid learning.</p>
          </div>

          <div ref={syllabusContainerRef} className="space-y-8 relative pb-10">
            
            {/* The Animated Junction Box Current Flow Line */}
            <div className="absolute top-0 bottom-0 left-[1.25rem] sm:left-1/2 w-0.5 bg-indigo-100 transform sm:-translate-x-1/2 overflow-hidden rounded-full z-0">
               {/* Scroll-based fill line */}
               <motion.div 
                 className="w-full bg-gradient-to-b from-indigo-400 via-purple-500 to-indigo-600 shadow-[0_0_15px_rgba(99,102,241,0.8)]"
                 style={{ height: scrollYProgress, transformOrigin: "top" }}
               />
            </div>

            {syllabus.map((week, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`relative flex items-center justify-between sm:justify-normal sm:odd:flex-row-reverse group`}
              >
                {/* Timeline Node (Junction Box) */}
                <motion.div 
                  initial={{ backgroundColor: "#ffffff", borderColor: "#6366f1", scale: 0.8 }}
                  whileInView={{ backgroundColor: "#eef2ff", borderColor: "#4f46e5", scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.3, delay: idx * 0.1 + 0.2 }}
                  whileHover={{ scale: 1.2, boxShadow: "0px 0px 15px rgba(99, 102, 241, 0.6)" }}
                  className="absolute left-0 sm:left-1/2 w-10 h-10 rounded-full border-[3px] flex items-center justify-center transform -translate-x-1/2 sm:translate-x-[-50%] z-10 shadow-md cursor-pointer"
                >
                  <span className="text-indigo-600 text-xs font-black">{idx + 1}</span>
                </motion.div>

                {/* Content Card */}
                <div className="ml-14 sm:ml-0 sm:w-[calc(50%-3rem)] bg-white border border-gray-100 p-6 sm:p-8 rounded-3xl w-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-indigo-200 shadow-[0_4px_20px_rgb(0,0,0,0.03)] group/card relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-400 to-purple-500 opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
                  
                  <div className="text-xs font-black text-indigo-500 uppercase tracking-widest mb-2 group-hover/card:text-indigo-600 transition-colors">{week.week}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-5">{week.title}</h3>
                  <ul className="space-y-3">
                    {week.topics.map((topic, i) => (
                      <li key={i} className="flex items-start gap-3 group/item">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-300 mt-2 flex-shrink-0 group-hover/item:bg-indigo-500 group-hover/item:scale-150 transition-all"></div>
                        <span className="text-sm text-slate-600 leading-relaxed font-medium group-hover/item:text-slate-900 transition-colors">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ultra CTA Section */}
      <section className="py-32 relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-indigo-950/40 pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen transform -translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div ref={ctaRef} className={`space-y-10 ${ctaInView ? 'animate-fade-up' : 'opacity-0'}`}>
            
            <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              “{isTa 
                ? "ஹிந்தியில் பேசுவோம்! இந்தியர் அனைவருடனும் பேசுவோம்!" 
                : "Let's speak Hindi! Let's connect with all Indians!"}”
            </h2>
            
            <p className="text-indigo-200 text-lg sm:text-xl font-medium">
              Master Spoken Hindi with 100% confidence in just 28 Days.
            </p>
            
            <div className="pt-8 flex justify-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
                className="bg-white/5 backdrop-blur-xl rounded-[2rem] p-8 sm:p-12 border border-white/10 w-full max-w-md relative overflow-hidden group shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10">
                  <div className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-3">Premium 1-to-1 Fast Track</div>
                  <div className="flex items-center justify-center gap-1 mb-8">
                    <span className="text-xl text-slate-400 font-medium">₹</span>
                    <span className="text-5xl sm:text-6xl font-black text-white tracking-tighter">19,999</span>
                  </div>
                  
                  <button
                    onClick={() => onOpenModal("enroll")}
                    className="w-full bg-white text-slate-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-indigo-50 transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                  >
                    Start Your Journey Now
                  </button>
                  <p className="text-xs text-slate-400 mt-6 font-medium tracking-wide">Limited slots available for personalized training.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
