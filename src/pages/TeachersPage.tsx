import { Award, Target, Shield, Zap, CheckCircle, Quote, Phone, MessageCircle } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

function AnimatedSection({ children, direction = 'up', className = '', delay = 0 }: any) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  const animations: Record<string, string> = {
    up: 'translate-y-10 opacity-0',
    left: 'translate-x-[-50px] opacity-0',
    right: 'translate-x-[50px] opacity-0',
    fade: 'opacity-0'
  };

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'translate-x-0 translate-y-0 opacity-100' : animations[direction]
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function TeachersPage() {
  const { t } = useLanguage();

  return (
    <div className="pt-24 pb-16 min-h-screen bg-white text-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Profile Header */}
        <AnimatedSection direction="up" className="grid md:grid-cols-12 gap-12 items-center mb-24">
          <div className="md:col-span-5 relative">
            <div className="aspect-[4/5] sm:aspect-square rounded-3xl overflow-hidden shadow-2xl relative border-4 border-orange-100">
              <img 
                src="/teacher-profile-new.jpg" 
                alt="Mr Surendar J" 
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="inline-flex items-center gap-2 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider shadow-lg">
                  <Award className="w-4 h-4" /> {t('tutorArmyVeteran')}
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-7 space-y-6">
            <h4 className="text-orange-500 font-bold tracking-widest uppercase text-sm">{t('tutorMeetTutor')}</h4>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
              {t('tutorName')}
            </h1>
            <p className="text-xl text-slate-600 font-medium">
              {t('tutorTitle').split(',')[0]},<br/>{t('tutorTitle').split(',')[1] || ''}
            </p>
            <div className="w-20 h-1 bg-orange-500 rounded-full"></div>
            <p className="text-lg text-slate-600 leading-relaxed pt-4">
              {t('tutorP1')}
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              {t('tutorP2')} <strong>{t('tutorMissionStrong')}</strong>
            </p>
          </div>
        </AnimatedSection>

        {/* Why Learn With Me */}
        <AnimatedSection direction="up" className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">{t('tutorWhyLearn')}</h2>
            <p className="text-lg text-slate-600">
              {t('tutorWhyDesc')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: t('tutorFeature1Title'),
                desc: t('tutorFeature1Desc')
              },
              {
                icon: Target,
                title: t('tutorFeature2Title'),
                desc: t('tutorFeature2Desc')
              },
              {
                icon: Shield,
                title: t('tutorFeature3Title'),
                desc: t('tutorFeature3Desc')
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-100 rounded-2xl p-8 hover:shadow-xl transition-shadow">
                <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Program Benefits */}
        <AnimatedSection direction="up" className="mb-24 bg-slate-900 rounded-3xl p-8 md:p-16 text-white relative overflow-hidden">
          {/* Subtle decoration instead of background image */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">{t('tutorProgramDesigned')}</h2>
              <div className="space-y-4">
                {[
                  t('tutorBullet1'),
                  t('tutorBullet2'),
                  t('tutorBullet3'),
                  t('tutorBullet4'),
                  t('tutorBullet5'),
                  t('tutorBullet6'),
                  t('tutorBullet7')
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-orange-400 shrink-0 mt-0.5" />
                    <span className="text-slate-300 text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <Quote className="w-12 h-12 text-orange-500 mb-6 opacity-50" />
              <h3 className="text-2xl font-bold mb-4">{t('tutorPhilosophyTitle')}</h3>
              <p className="text-xl text-slate-300 italic mb-8 leading-relaxed">
                {t('tutorPhilosophyQuote')}
              </p>
              <div className="space-y-4">
                <p className="text-slate-400">{t('tutorValuesIntro')}</p>
                <div className="flex flex-wrap gap-3">
                  {[t('tutorValue1'), t('tutorValue2'), t('tutorValue3'), t('tutorValue4')].map(value => (
                    <span key={value} className="bg-white/10 text-white px-4 py-2 rounded-lg font-medium">
                      {value}
                    </span>
                  ))}
                </div>
                <p className="text-slate-400 pt-4">
                  {t('tutorGoal')}
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Mission and Contact */}
        <div className="grid md:grid-cols-2 gap-12">
          <AnimatedSection direction="up" delay={100}>
            <div className="h-full bg-slate-50 rounded-3xl p-10 border border-slate-100 flex flex-col justify-center">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">{t('tutorMissionTitle')}</h2>
              <p className="text-2xl text-orange-600 font-bold mb-6 leading-relaxed">
                {t('tutorMissionTamil')}
              </p>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                {t('tutorMissionDesc1')}
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                {t('tutorMissionDesc2')}
              </p>
            </div>
          </AnimatedSection>
          
          <AnimatedSection direction="up" delay={200}>
            <div className="h-full bg-orange-50 rounded-3xl p-10 border border-orange-100 flex flex-col justify-center text-center">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">{t('tutorStartJourney')}</h2>
              <p className="text-lg text-slate-600 mb-10">{t('tutorStartDesc')}</p>
              
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-orange-100 mb-8">
                <h3 className="font-bold text-xl text-slate-900 mb-2">Raanuva Veeran Spoken Hindi Academy</h3>
                <p className="text-slate-500 mb-6 flex items-center justify-center gap-2">
                  <Target className="w-4 h-4" /> Gobichettipalayam
                </p>
                <div className="flex flex-col gap-4">
                  <a href="https://wa.me/916397255377" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 bg-green-500 text-white py-4 rounded-xl font-bold hover:bg-green-600 transition-colors">
                    <MessageCircle className="w-5 h-5" /> WhatsApp: 6397255377
                  </a>
                  <a href="tel:7010817113" className="flex items-center justify-center gap-3 bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-colors">
                    <Phone className="w-5 h-5" /> Mobile: 7010817113
                  </a>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>

      </div>
    </div>
  );
}
