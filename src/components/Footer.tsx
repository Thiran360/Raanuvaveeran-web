import { useState } from 'react';
import { Facebook, Twitter, Instagram, Youtube, Phone, MapPin, Mail, X, ShieldCheck, FileText, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t, language } = useLanguage();
  const [activePolicy, setActivePolicy] = useState<'privacy' | 'terms' | 'refund' | null>(null);

  const getPolicyContent = () => {
    if (activePolicy === 'privacy') {
      return {
        icon: <ShieldCheck className="w-8 h-8 text-orange-500" />,
        title: language === 'ta' ? 'தனியுரிமை கொள்கை' : 'Privacy Policy',
        sections: [
          {
            h: language === 'ta' ? '1. தகவல் சேகரிப்பு' : '1. Information Collection',
            p: language === 'ta'
              ? 'நீங்கள் பாடங்களுக்குப் பதிவு செய்யும் போது அல்லது இலவச டெமோ கோரும் போது உங்கள் பெயர், மின்னஞ்சல் முகவரி மற்றும் தொலைபேசி எண் போன்ற தகவல்களைச் சேகரிக்கிறோம்.'
              : 'We collect personal information such as your name, email address, and phone number when you register for courses or request demo classes.'
          },
          {
            h: language === 'ta' ? '2. தகவலின் பயன்பாடு' : '2. Use of Information',
            p: language === 'ta'
              ? 'உங்கள் தகவல்கள் பாடத்திட்ட அணுகலை வழங்கவும், சான்றிதழ்களை வழங்கவும், நேரடி வகுப்பு அறிவிப்புகளை அனுப்பவும் மட்டுமே பயன்படுத்தப்படுகின்றன.'
              : 'Your information is strictly used to provide course access, issue completion certificates, and communicate important live class updates.'
          },
          {
            h: language === 'ta' ? '3. தரவு பாதுகாப்பு' : '3. Data Protection',
            p: language === 'ta'
              ? 'உங்கள் தனிப்பட்ட தரவைப் பாதுகாக்க நாங்கள் கடுமையான பாதுகாப்பு நடைமுறைகளைப் பின்பற்றுகிறோம். உங்கள் விவரங்களை மூன்றாம் தரப்பினருக்குப் பகிர மாட்டோம்.'
              : 'We enforce robust security protocols to protect your personal data. We do not sell, rent, or share your data with third parties.'
          }
        ]
      };
    } else if (activePolicy === 'terms') {
      return {
        icon: <FileText className="w-8 h-8 text-orange-500" />,
        title: language === 'ta' ? 'விதிமுறைகள் மற்றும் நிபந்தனைகள்' : 'Terms & Conditions',
        sections: [
          {
            h: language === 'ta' ? '1. கணக்கு மற்றும் கற்றல் அணுகல்' : '1. Account & Learning Access',
            p: language === 'ta'
              ? 'பாடப் பதிவு ஒரு நபருக்கான அணுகலை மட்டுமே வழங்குகிறது. உங்கள் கணக்கு விவரங்களை மற்றவர்களுடன் பகிரக்கூடாது.'
              : 'Course enrollment grants single-user access to recorded lectures and live classes. Account credentials must not be shared with others.'
          },
          {
            h: language === 'ta' ? '2. அறிவுசார் சொத்துரிமை' : '2. Intellectual Property',
            p: language === 'ta'
              ? 'அனைத்துப் பாடப் புத்தகங்கள், வீடியோ பாடங்கள் மற்றும் பாடத்திட்டங்கள் ராணுவ வீரன் ஸ்போக்கன் ஹிந்தி அகாடமியின் காப்புரிமை பெற்றவை.'
              : 'All study materials, video lessons, and curriculum are copyrighted property of Raanuva Veeran Spoken Hindi Academy.'
          },
          {
            h: language === 'ta' ? '3. மாணவர் நடத்தை' : '3. Student Conduct',
            p: language === 'ta'
              ? 'நேரடி வகுப்புகள் மற்றும் அரட்டைகளில் மாணவர்கள் கண்ணியத்தையும் மரியாதையையும் பேண வேண்டும்.'
              : 'Students are expected to maintain respect and decorum during live interactive sessions and chat forums.'
          }
        ]
      };
    } else if (activePolicy === 'refund') {
      return {
        icon: <RefreshCw className="w-8 h-8 text-orange-500" />,
        title: language === 'ta' ? 'பணத்தைத் திரும்பப்பெறுதல் கொள்கை' : 'Refund Policy',
        sections: [
          {
            h: language === 'ta' ? '1. 7 நாட்கள் பணத்தைத் திரும்பப்பெறும் உத்தரவாதம்' : '1. 7-Day Money-Back Guarantee',
            p: language === 'ta'
              ? 'பாடப் பதிவிலிருந்து 7 நாட்களுக்குள் உங்களுக்கு முழு திருப்தி இல்லை எனில் 100% பணத்தை மீண்டும் பெறலாம்.'
              : 'We offer a 100% money-back guarantee within 7 days of course purchase if you are not completely satisfied.'
          },
          {
            h: language === 'ta' ? '2. விண்ணப்பிக்கும் முறை' : '2. Request Procedure',
            p: language === 'ta'
              ? 'பணத்தை மீண்டும் பெற, உங்கள் கட்டண ரசீதுடன் எங்கள் மின்னஞ்சல் அல்லது தொலைபேசி எண்ணிற்குத் தொடர்பு கொள்ளலாம்.'
              : 'To request a refund, simply send an email to our support team or contact us via phone with your payment receipt.'
          },
          {
            h: language === 'ta' ? '3. செயலாக்க நேரம்' : '3. Processing Time',
            p: language === 'ta'
              ? 'அங்கீகரிக்கப்பட்ட பணத்தைத் திரும்பப்பெறுதல் 5-7 வேலை நாட்களுக்குள் உங்கள் வங்கி கணக்கிற்கு நேரடியாக அனுப்பப்படும்.'
              : 'Approved refunds are processed within 5-7 business days directly to your original payment method (Bank/UPI).'
          }
        ]
      };
    }
    return null;
  };

  const policyData = getPolicyContent();

  return (
    <footer className="bg-gray-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              {t('footerTitle')}
            </h3>
            <p className="text-gray-400 mb-4">
              {t('footerDesc')}
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">{t('quickLinks')}</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-orange-400 transition-colors">{t('home')}</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-orange-400 transition-colors">{t('aboutUs')}</Link></li>
              <li><Link to="/courses" className="text-gray-400 hover:text-orange-400 transition-colors">{t('courses')}</Link></li>
              <li><Link to="/teachers" className="text-gray-400 hover:text-orange-400 transition-colors">{t('teachers')}</Link></li>
            </ul>
          </div>



          <div>
            <h4 className="font-bold text-lg mb-4">{t('contactUs')}</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400">
                <Mail className="w-5 h-5 text-orange-400" />
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=info@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-400 transition-colors"
                >
                  Gmail
                </a>
              </li>

              <li className="flex items-center gap-2 text-gray-400">
                <Phone className="w-5 h-5 text-orange-400" />
                <a href="tel:07010817113" className="hover:text-orange-400 transition-colors">
                  06397 255 377 / 070108 17113
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <MapPin className="w-5 h-5 text-orange-400" />
                <span>
                  {language === 'ta' ? (
                    <>
                      பஸ் நிலையம் அருகில்,<br />
                      முத்துஷா வீதி பின்புறம்,<br />
                      வண்டிப்பேட்டை, கோபி - 638 452
                    </>
                  ) : (
                    <>
                      Near Bus Stand,<br />
                      Behind Muthusha Street,<br />
                      Vandipettai, Gobi - 638 452
                    </>
                  )}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              {t('copyright')}
            </p>
            <div className="flex flex-wrap justify-center md:justify-end gap-3 sm:gap-6 text-xs sm:text-sm">
              <button
                onClick={() => setActivePolicy('privacy')}
                className="text-gray-400 hover:text-orange-400 transition-colors cursor-pointer"
              >
                {t('privacyPolicy')}
              </button>
              <button
                onClick={() => setActivePolicy('terms')}
                className="text-gray-400 hover:text-orange-400 transition-colors cursor-pointer"
              >
                {t('termsConditions')}
              </button>
              <button
                onClick={() => setActivePolicy('refund')}
                className="text-gray-400 hover:text-orange-400 transition-colors cursor-pointer"
              >
                {t('refundPolicy')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* POLICY POPUP MODAL */}
      {activePolicy && policyData && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-fade-in">
          <div className="bg-gray-900 border border-gray-800 text-white rounded-2xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl overflow-hidden">
            <button
              onClick={() => setActivePolicy(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-800 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-orange-500/10 rounded-xl border border-orange-500/20">
                {policyData.icon}
              </div>
              <h3 className="text-2xl font-bold text-white">{policyData.title}</h3>
            </div>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 text-gray-300">
              {policyData.sections.map((sec, idx) => (
                <div key={idx} className="bg-gray-800/50 p-4 rounded-xl border border-gray-800">
                  <h4 className="font-bold text-orange-400 mb-1 text-base">{sec.h}</h4>
                  <p className="text-sm leading-relaxed text-gray-300">{sec.p}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-800 text-right">
              <button
                onClick={() => setActivePolicy(null)}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg"
              >
                {language === 'ta' ? 'மூடுக' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
