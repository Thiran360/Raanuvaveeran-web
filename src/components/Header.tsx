import { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  // --- Live Class Check ---
  const isAdmin = localStorage.getItem('admin') === 'true';
  const isLoggedIn = isAdmin || localStorage.getItem('userLoggedIn') === 'true';
  const isLiveActive = localStorage.getItem('isLiveActive') === 'true';

  const isActive = (path: string) => location.pathname === path;

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ta' : 'en');
  };

  return (
    <div className="relative">
      {/* SCROLL BACKGROUND IMAGE */}
      <div
        id="scrollBg"
        className="
          fixed inset-0 
          opacity-0 
          transition-opacity duration-1000
          bg-cover bg-center bg-no-repeat
          pointer-events-none
        "
        style={{
          backgroundImage: "url('/bg.png')",
        }}
      />

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-purple-900/90 backdrop-blur-md shadow-md">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 sm:gap-3 shrink min-w-0">
              <img
                src="/indian-flag.jpg"
                alt="Raanuva Veeran Logo"
                className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 object-contain transition-transform duration-300 hover:scale-105 rounded-lg shrink-0"
              />
              <span className={`font-bold text-white tracking-wide truncate ${language === 'ta' ? 'text-xs xs:text-sm sm:text-base max-w-[130px] xs:max-w-[200px] sm:max-w-none' : 'text-sm sm:text-xl max-w-[160px] xs:max-w-none'}`}>
                {t('heroTitle1')}
              </span>
            </Link>

            {/* Desktop Menu */}
            <nav className={`hidden xl:flex items-center justify-center flex-1 text-white ${language === 'ta' ? 'gap-4 text-sm' : 'gap-6 text-[15px]'}`}>
              <Link to="/" className={`${isActive("/") ? "text-yellow-400 font-bold" : "hover:text-yellow-400"} transition-colors whitespace-nowrap`}>
                {t('home')}
              </Link>
              <Link to="/about" className={`${isActive("/about") ? "text-yellow-400 font-bold" : "hover:text-yellow-400"} transition-colors whitespace-nowrap`}>
                {t('about')}
              </Link>
              <Link to="/courses" className={`${isActive("/courses") ? "text-yellow-400 font-bold" : "hover:text-yellow-400"} transition-colors whitespace-nowrap`}>
                {t('courses')}
              </Link>
              <Link to="/fastrack-courses" className={`${isActive("/fastrack-courses") ? "text-yellow-400 font-bold" : "hover:text-yellow-400"} transition-colors whitespace-nowrap`}>
                Fast Track
              </Link>
              <Link to="/teachers" className={`${isActive("/teachers") ? "text-yellow-400 font-bold" : "hover:text-yellow-400"} transition-colors whitespace-nowrap`}>
                {t('teachers')}
              </Link>
              <Link to="/gallery" className={`${isActive("/gallery") ? "text-yellow-400 font-bold" : "hover:text-yellow-400"} transition-colors whitespace-nowrap`}>
                Gallery
              </Link>
              <Link to="/contact" className={`${isActive("/contact") ? "text-yellow-400 font-bold" : "hover:text-yellow-400"} transition-colors whitespace-nowrap`}>
                {t('contact')}
              </Link>
              {isLoggedIn && (
                <Link to="/live-class" className={`${isActive("/live-class") ? "text-yellow-400 font-bold" : "hover:text-yellow-400"} transition-colors whitespace-nowrap`}>
                  {t('liveClass')}
                </Link>
              )}
              {isLoggedIn && (
                <Link
                  to="/meeting"
                  onClick={(e) => {
                    if (isLiveActive) {
                      e.preventDefault();
                      const liveLink = localStorage.getItem('liveMeetingLink') || 'https://api.codingboss.in/military/live';
                      window.open(liveLink, '_blank');
                    }
                  }}
                  className={`${isActive("/meeting") ? "text-yellow-400 font-bold" : "hover:text-yellow-400"} transition-colors whitespace-nowrap flex items-center gap-2`}
                >
                  {t('meetingEngine')}
                  {isLiveActive && (
                    <span className="flex h-2.5 w-2.5 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                    </span>
                  )}
                </Link>
              )}
            </nav>

            {/* Desktop Buttons */}
            <div className="hidden xl:flex items-center gap-5 flex-shrink-0">
              <div className="flex items-center bg-white/10 p-1 rounded-full backdrop-blur-sm border border-white/20 shadow-inner">
                <button
                  onClick={() => setLanguage('en')}
                  className={`flex items-center justify-center leading-none px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
                    language === 'en' ? 'bg-emerald-500 text-white shadow-md' : 'text-white/70 hover:text-white'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('ta')}
                  className={`flex items-center justify-center leading-none px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
                    language === 'ta' ? 'bg-emerald-500 text-white shadow-md' : 'text-white/70 hover:text-white'
                  }`}
                >
                  தமிழ்
                </button>
              </div>

              {!isLoggedIn ? (
                <>
                  <Link to="/auth">
                    <button className="text-white hover:text-yellow-400 transition-colors font-medium whitespace-nowrap">
                      {t('login')}
                    </button>
                  </Link>
                  <Link to="/courses">
                    <button className="bg-gradient-to-r from-purple-500 to-purple-700 text-white px-5 py-2 rounded-full font-semibold hover:shadow-lg transition-all transform hover:scale-105 whitespace-nowrap">
                      {t('getStarted')}
                    </button>
                  </Link>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  {isAdmin && (
                    <Link to="/admin-dashboard">
                      <button className="text-white bg-indigo-600 hover:bg-indigo-500 transition-colors font-medium border border-indigo-500 px-4 py-1.5 rounded-full hover:shadow-lg whitespace-nowrap">
                        {t('adminPanel')}
                      </button>
                    </Link>
                  )}

                  {!isAdmin && (
                    <Link to="/profile">
                      <button className="text-white hover:text-yellow-400 transition-colors font-medium whitespace-nowrap">
                        Profile
                      </button>
                    </Link>
                  )}

                  <button
                    onClick={() => {
                      localStorage.removeItem('userLoggedIn');
                      localStorage.removeItem('userEmail');
                      localStorage.removeItem('userId');
                      localStorage.removeItem('userName');
                      localStorage.removeItem('userMobile');
                      localStorage.removeItem('admin');
                      window.location.href = '/';
                    }}
                    className="text-white hover:text-red-300 transition-colors font-medium border border-white/20 px-4 py-1.5 rounded-full hover:bg-white/10 whitespace-nowrap"
                  >
                    {t('logout')}
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="xl:hidden flex items-center gap-3">
              <div className="flex items-center bg-white/10 p-1 rounded-full backdrop-blur-sm border border-white/20">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all duration-300 ${
                    language === 'en' ? 'bg-emerald-500 text-white shadow-md' : 'text-white/70 hover:text-white'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('ta')}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all duration-300 ${
                    language === 'ta' ? 'bg-emerald-500 text-white shadow-md' : 'text-white/70 hover:text-white'
                  }`}
                >
                  தமிழ்
                </button>
              </div>
              
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-white hover:text-yellow-400 transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="xl:hidden py-4 border-t border-purple-700/40 animate-fade-in max-h-[85vh] overflow-y-auto custom-scrollbar">
              <nav className="flex flex-col gap-4 text-white">
                <Link
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className={`${isActive("/") ? "text-yellow-400" : "hover:text-yellow-400"} py-2`}
                >
                  {t('home')}
                </Link>
                <Link
                  to="/about"
                  onClick={() => setIsMenuOpen(false)}
                  className={`${isActive("/about") ? "text-yellow-400" : "hover:text-yellow-400"} py-2`}
                >
                  {t('about')}
                </Link>
                <Link
                  to="/courses"
                  onClick={() => setIsMenuOpen(false)}
                  className={`${isActive("/courses") ? "text-yellow-400" : "hover:text-yellow-400"} py-2`}
                >
                  {t('courses')}
                </Link>
                <Link
                  to="/fastrack-courses"
                  onClick={() => setIsMenuOpen(false)}
                  className={`${isActive("/fastrack-courses") ? "text-yellow-400" : "hover:text-yellow-400"} py-2`}
                >
                  Fast Track
                </Link>
                <Link
                  to="/teachers"
                  onClick={() => setIsMenuOpen(false)}
                  className={`${isActive("/teachers") ? "text-yellow-400" : "hover:text-yellow-400"} py-2`}
                >
                  {t('teachers')}
                </Link>

                <Link
                  to="/gallery"
                  onClick={() => setIsMenuOpen(false)}
                  className={`${isActive("/gallery") ? "text-yellow-400" : "hover:text-yellow-400"} py-2`}
                >
                  Gallery
                </Link>

                <Link
                  to="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className={`${isActive("/contact") ? "text-yellow-400" : "hover:text-yellow-400"} py-2`}
                >
                  {t('contact')}
                </Link>
                {isLoggedIn && (
                  <Link
                    to="/live-class"
                    onClick={() => setIsMenuOpen(false)}
                    className={`${isActive("/live-class") ? "text-yellow-400" : "hover:text-yellow-400"} py-2 flex items-center gap-2`}
                  >
                    {t('liveClass')}
                  </Link>
                )}
                {isLoggedIn && (
                  <Link
                    to="/meeting"
                    onClick={(e) => {
                      setIsMenuOpen(false);
                      if (isLiveActive) {
                        e.preventDefault();
                        const liveLink = localStorage.getItem('liveMeetingLink') || 'https://api.codingboss.in/military/live';
                        window.open(liveLink, '_blank');
                      }
                    }}
                    className={`${isActive("/live") ? "text-yellow-400" : "hover:text-yellow-400"} py-2 flex items-center gap-2`}
                  >
                    {t('meetingEngine')}
                    {isLiveActive && (
                      <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded font-bold animate-pulse">
                        {t('liveNow')}
                      </span>
                    )}
                  </Link>
                )}

                <div className="flex flex-col gap-3 pt-4 border-t border-purple-700/30">
                  {!isLoggedIn ? (
                    <>
                      <Link to='/auth' onClick={() => setIsMenuOpen(false)}>
                        <button className="text-white hover:text-yellow-400 py-2 text-left w-full">
                          {t('login')}
                        </button>
                      </Link>
                      <Link to="/courses" onClick={() => setIsMenuOpen(false)}>
                        <button className="bg-gradient-to-r from-purple-500 to-purple-700 text-white px-6 py-3 rounded-full font-semibold w-full">
                          {t('getStarted')}
                        </button>
                      </Link>
                    </>
                  ) : (
                    <>
                      {isAdmin && (
                        <Link to="/admin-dashboard" onClick={() => setIsMenuOpen(false)}>
                          <button className="text-white bg-indigo-600 hover:bg-indigo-500 transition-colors font-medium border border-indigo-500 px-6 py-3 rounded-full hover:shadow-lg w-full text-left">
                            {t('adminPanel')}
                          </button>
                        </Link>
                      )}
                      {!isAdmin && (
                        <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                          <button className="text-white hover:text-yellow-400 transition-colors font-medium border border-white/20 px-6 py-3 rounded-full hover:bg-white/10 w-full text-left">
                            Profile
                          </button>
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          localStorage.removeItem('userLoggedIn');
                          localStorage.removeItem('userEmail');
                          localStorage.removeItem('userId');
                          localStorage.removeItem('userName');
                          localStorage.removeItem('userMobile');
                          localStorage.removeItem('admin');
                          window.location.href = '/';
                        }}
                        className="text-white hover:text-red-300 transition-colors font-medium border border-white/20 px-6 py-3 rounded-full hover:bg-white/10 w-full text-left"
                      >
                        {t('logout')}
                      </button>
                    </>
                  )}
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}
