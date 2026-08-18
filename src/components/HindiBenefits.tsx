import { Star, CheckCircle, TrendingUp, Lightbulb, Users, Shield, Briefcase, GraduationCap, Plane, Sparkles, Building2, Globe, HeartHandshake, Landmark } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';

export default function HindiBenefits() {
  const { language } = useLanguage();
  const isTa = language === 'ta';

  const features = [
    {
      icon: <Lightbulb className="w-5 h-5 text-amber-500" />,
      bg: "bg-amber-50",
      text: isTa 
        ? "இந்தி எழுத்துக்கள் இல்லாத பேச்சு பயிற்சி மட்டுமே...!" 
        : "Spoken-only training without the need to learn Hindi scripts."
    },
    {
      icon: <Sparkles className="w-5 h-5 text-purple-500" />,
      bg: "bg-purple-50",
      text: isTa 
        ? "ரோமன் தமிழ் மற்றும் ரோமன் இந்தி முறையிலான எளிதான படிப்பு முறை...!" 
        : "Easy learning method using Roman Tamil and Roman Hindi."
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-emerald-500" />,
      bg: "bg-emerald-50",
      text: isTa 
        ? "இலக்கண பிழையின்றிய அன்றாட பயன்பாட்டுப் பேச்சுமுறை...!" 
        : "Grammar-error-free everyday practical conversation."
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-blue-500" />,
      bg: "bg-blue-50",
      text: isTa 
        ? "மிக மிக குறைவான கட்டணம்...! இல்லை ... இல்லை ... மிக மிக குறைவான முதலீடு...!" 
        : "Incredibly low fees. A very minimal investment for your future!"
    }
  ];

  const benefits = [
    {
      icon: <GraduationCap className="w-5 h-5" />,
      text: isTa ? "மாணவர்களுக்கு இந்தியா முழுவதிலுமான வேலை வாய்ப்பு...!" : "Pan-India job opportunities for students."
    },
    {
      icon: <Briefcase className="w-5 h-5" />,
      text: isTa ? "கேம்பஸ் இன்டர்வியூவில் தேர்ச்சி சதவிகிதம் அதிகரிக்கும் வாய்ப்பு...!" : "Increased success rate in campus interviews."
    },
    {
      icon: <Building2 className="w-5 h-5" />,
      text: isTa ? "சிறு, குறு தொழில் முனைவோர் முதல், பெரும் தொழில் அதிபர்கள் வரை தங்கள் தொழிலை இந்தியா முழுவதிலும் விரிவு படுத்திக் கொள்ளும் வாய்ப்பு...!" : "Opportunities for entrepreneurs of all scales to expand their business across India."
    },
    {
      icon: <HeartHandshake className="w-5 h-5" />,
      text: isTa ? "இந்தி பேசுவதன் மூலம் ஒட்டு மொத்த இந்திய மக்களின் மனங்களைப் புரிந்து கொள்ளும் வாய்ப்பு...!" : "Connect with and understand the hearts of people all over India."
    },
    {
      icon: <Landmark className="w-5 h-5" />,
      text: isTa ? "அரசு / தனியார் துறை ஊழியர்கள் மற்றும் வங்கி ஊழியர்கள் அனைவருக்குமான வெளிமாநிலங்களில் வேலை செய்யும் வாய்ப்பு அதன் மூலம் பதவி உயர்வு / ஊதிய உயர்வு அதிக அளவில் பெறும் வாய்ப்பு...!" : "Interstate work opportunities for employees, accelerating promotions and salary hikes."
    },
    {
      icon: <Globe className="w-5 h-5" />,
      text: isTa ? "அரசியல் தலைவர்கள் இந்தியாவின் மற்ற மாநில தலைவர்களுடன் உரையாடி எளிதில் பழகக்கூடிய வாய்ப்பு அதன் மூலம் உயர்வு பெறும் அரசியல் வாழ்க்கை மற்றும் இந்தியாவின் மற்ற மாநில மக்களின் மக்கள் மனநிலை / அரசியல் நிலவரங்களை நேரடியாகப் புரிந்து கொண்டு அதற்கு ஏற்றார் போல் செயல்படும் வாய்ப்பு...!" : "Allows political leaders to connect with counterparts across states and understand the national pulse."
    },
    {
      icon: <Users className="w-5 h-5" />,
      text: isTa ? "நம் தொழிலாளர்கள் வேறு மாநிலத்தில் பணிபுரியவும், வேறு மாநில தொழிலாளர்களை நம் மாநிலத்தில் பணியமர்த்தவும் வாய்ப்பு...!" : "Opportunity for our workforce to work interstate, and to employ interstate workers seamlessly."
    },
    {
      icon: <Shield className="w-5 h-5" />,
      text: isTa ? "போலீஸ் மற்றும் இதர பாதுகாப்புப்படை வீரர்கள் வெளி மாநிலங்களில் பணியமர்த்தப்படும் வாய்ப்பு...!" : "Opportunities for police and security personnel to be deployed in other states."
    },
    {
      icon: <Star className="w-5 h-5" />,
      text: isTa ? "விளையாட்டு வீரர்கள் தமிழகம் தாண்டிய தங்கள் வாய்ப்புகளைப் பெருக்கிக்கொள்ளும் அற்புத வாய்ப்பு...!" : "Expand scope and opportunities for athletes beyond Tamil Nadu."
    },
    {
      icon: <Plane className="w-5 h-5" />,
      text: isTa ? "கல்விச் சுற்றுலா, ஆன்மீகச் சுற்றுலா, குடும்பச் சுற்றுலா, தொழில் முறை பயணங்கள் அனைத்தும் இந்தியா முழுவதும் எளிதாக, தயக்கமின்றி மகிழ்ச்சியுடன் மேற் கொள்ளும் அரிய வாய்ப்பு...!" : "Easily undertake educational, spiritual, family, and professional tours across India without hesitation."
    }
  ];

  const facts = [
    {
      text: isTa ? "தமிழ் மொழியிலிருந்து தோன்றியது தான் இந்தி...!" : "Hindi has deep roots connected to the Tamil language."
    },
    {
      text: isTa ? "இன்றும் 75% இந்தி வார்த்தைகள் தமிழ் மொழியே...!" : "Even today, a vast majority of Hindi words share origins with Tamil."
    },
    {
      text: isTa ? "இந்தியர் அனைவரின் கலாச்சாரம், பண்பாடு, வாழ்க்கை முறை, வழிபாட்டு முறை அனைத்தும் ஏறத்தாழ ஒன்றே...!" : "The culture, tradition, lifestyle, and worship methods of all Indians are largely the same."
    }
  ];

  return (
    <div className="py-16 bg-transparent overflow-hidden font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Top Section: Features & Facts Side-by-Side */}
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Features Card */}
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group">
            {/* Decorative accent top border */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-400 to-rose-500"></div>
            
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 bg-orange-50 rounded-xl">
                <Sparkles className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
                {isTa ? "சிறப்பம்சங்கள்...!" : "Special Features"}
              </h3>
            </div>
            
            <div className="space-y-6">
              {features.map((feature, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1, type: "spring" }}
                  className="flex items-start gap-5 p-4 rounded-2xl hover:bg-gray-50 transition-colors group/item"
                >
                  <div className={`mt-0.5 flex-shrink-0 ${feature.bg} rounded-xl p-3.5 shadow-sm group-hover/item:scale-110 transition-transform`}>
                    {feature.icon}
                  </div>
                  <p className="text-gray-700 text-lg sm:text-xl font-medium leading-relaxed pt-1.5">
                    {feature.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Facts Card */}
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group">
            {/* Decorative accent top border */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-cyan-400 to-blue-500"></div>
            
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 bg-cyan-50 rounded-xl">
                <Lightbulb className="w-6 h-6 text-cyan-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
                {isTa ? "நீங்கள் அறிவீர்களா...!" : "Did You Know?"}
              </h3>
            </div>
            
            <div className="space-y-6">
              {facts.map((fact, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1, type: "spring" }}
                  className="relative bg-white rounded-2xl p-6 border border-gray-100 flex items-start gap-5 shadow-sm hover:shadow-md hover:border-cyan-200 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-cyan-400 rounded-l-2xl opacity-0 hover:opacity-100 transition-opacity"></div>
                  <div className="bg-cyan-50 rounded-full p-3 flex-shrink-0 border border-cyan-100">
                    <TrendingUp className="w-6 h-6 text-cyan-600" />
                  </div>
                  <p className="text-gray-700 text-lg sm:text-xl font-medium leading-relaxed pt-0.5">
                    {fact.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section: Applications / Benefits */}
        <div className="pt-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 tracking-tight mb-4 inline-block">
              {isTa ? "பயன்பாடுகள்" : "Real-World Benefits & Uses"}
            </h2>
            <div className="w-20 h-1.5 bg-indigo-500 mx-auto rounded-full"></div>
            <p className="text-gray-500 mt-4 text-sm font-medium">Why learning Hindi transforms your career and life.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.05, type: "spring", bounce: 0.3 }}
                className="bg-white border border-gray-100 rounded-3xl p-8 flex items-start gap-5 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-indigo-200 group relative overflow-hidden"
              >
                {/* Subtle highlight border on left */}
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="flex-shrink-0 mt-0.5 relative z-10">
                  <motion.div 
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className="w-14 h-14 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300"
                  >
                    {/* Make the icon slightly bigger manually by adding some style or just mapping a cloned element */}
                    <div className="scale-125">
                      {benefit.icon}
                    </div>
                  </motion.div>
                </div>
                
                <p className="text-gray-700 text-lg font-medium leading-relaxed group-hover:text-gray-900 transition-colors relative z-10">
                  {benefit.text}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Taglines Footer */}
          <div className="mt-16 text-center">
            <div className="inline-block bg-white border border-gray-200 rounded-full px-8 py-5 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">
                  <span>
                    {isTa ? "ஈடில்லாத தேசப் பணியைத் தொடர்ந்து...!" : "Continuing matchless national service!"}
                  </span>
                  <span className="hidden sm:block text-gray-300">|</span>
                  <span>
                    {isTa ? "இணையில்லாத மக்கள் பணியில்...!" : "In unparalleled public service!"}
                  </span>
                </div>
                <div className="flex items-center justify-center gap-3 text-2xl font-black text-gray-900 tracking-tight">
                  <Shield className="w-7 h-7 text-indigo-600" />
                  {isTa ? "இராணுவ வீரன்...!" : "Raanuva Veeran...!"}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
