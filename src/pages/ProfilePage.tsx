import React, { useEffect, useState } from 'react';
import { User, Mail, Phone, LogOut, ArrowLeft, ShieldCheck, MapPin, Calendar, Award } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function ProfilePage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const [userData, setUserData] = useState({
    userId: '',
    userName: '',
    userEmail: '',
    userMobile: ''
  });

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('userLoggedIn');
    if (!isLoggedIn) {
      navigate('/auth');
      return;
    }

    // Retrieve user data from local storage
    setUserData({
      userId: localStorage.getItem('userId') || '',
      userName: localStorage.getItem('userName') || 'User',
      userEmail: localStorage.getItem('userEmail') || '',
      userMobile: localStorage.getItem('userMobile') || ''
    });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userMobile');
    
    // Redirect to home page
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden font-sans">
      
      {/* Premium Background Blurs */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-br from-purple-600 via-fuchsia-600 to-orange-500 rounded-b-[40px] shadow-2xl z-0"></div>
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-white/20 blur-[120px] rounded-full z-0 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[100px] rounded-full z-0 pointer-events-none"></div>

      <div className="relative z-10 pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8 text-white">
          <Link 
            to="/" 
            className="flex items-center text-white/90 hover:text-white transition-colors backdrop-blur-md bg-white/10 px-5 py-2.5 rounded-full border border-white/20 hover:bg-white/20 shadow-lg"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="font-semibold">Back to Home</span>
          </Link>
        </div>

        {/* Ultra Modern Profile Card */}
        <div className="bg-white/90 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_20px_50px_rgb(0,0,0,0.1)] overflow-hidden border border-white/50">
          
          <div className="grid md:grid-cols-[1fr_2fr] gap-0">
            
            {/* Left Column - Avatar & Identity */}
            <div className="p-8 md:p-12 flex flex-col items-center justify-center bg-gradient-to-b from-white/60 to-slate-50/80 border-b md:border-b-0 md:border-r border-slate-200/60 relative">
              
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400/10 to-transparent rounded-bl-full"></div>
              
              <div className="relative group mb-8">
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-400 to-purple-600 rounded-full blur-xl opacity-40 group-hover:opacity-70 transition-opacity duration-500"></div>
                <div className="relative w-40 h-40 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-white overflow-hidden transform group-hover:scale-105 transition-transform duration-500">
                  <User className="w-16 h-16 text-slate-300" />
                </div>
                <div className="absolute bottom-2 right-2 w-10 h-10 bg-emerald-500 border-4 border-white rounded-full flex items-center justify-center shadow-lg">
                   <ShieldCheck className="w-5 h-5 text-white" />
                </div>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 text-center tracking-tight">{userData.userName}</h2>
              <div className="inline-flex items-center justify-center px-4 py-1.5 bg-gradient-to-r from-purple-100 to-fuchsia-100 text-purple-700 rounded-full text-sm font-bold tracking-wide shadow-sm border border-purple-200/50">
                Student ID: {userData.userId || 'N/A'}
              </div>

              <div className="mt-12 w-full">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center px-6 py-4 bg-slate-900 hover:bg-red-600 text-white font-bold rounded-2xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-red-500/20 group"
                >
                  <LogOut className="w-5 h-5 mr-3 group-hover:animate-pulse" />
                  Sign Out Securely
                </button>
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="p-8 md:p-12">
              <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center shadow-sm">
                  <Award className="w-5 h-5 text-orange-600" />
                </div>
                Account Details
              </h3>

              <div className="space-y-5">
                
                {/* Email Field */}
                <div className="group relative p-6 bg-white rounded-2xl shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
                  <div className="relative z-10 flex items-center">
                    <div className="w-14 h-14 bg-orange-50 group-hover:bg-orange-500 rounded-2xl flex items-center justify-center mr-5 transition-colors duration-300 shadow-sm group-hover:shadow-orange-500/30">
                      <Mail className="w-6 h-6 text-orange-500 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Email Address</p>
                      <p className="text-lg font-bold text-slate-800">{userData.userEmail || 'Not provided'}</p>
                    </div>
                  </div>
                </div>

                {/* Mobile Field */}
                <div className="group relative p-6 bg-white rounded-2xl shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
                  <div className="relative z-10 flex items-center">
                    <div className="w-14 h-14 bg-emerald-50 group-hover:bg-emerald-500 rounded-2xl flex items-center justify-center mr-5 transition-colors duration-300 shadow-sm group-hover:shadow-emerald-500/30">
                      <Phone className="w-6 h-6 text-emerald-500 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Mobile Number</p>
                      <p className="text-lg font-bold text-slate-800">{userData.userMobile || 'Not provided'}</p>
                    </div>
                  </div>
                </div>

                {/* Extra Display Fields for Premium Look */}
                <div className="grid grid-cols-2 gap-5 mt-8">
                  <div className="p-6 bg-slate-50 hover:bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center text-center group">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Calendar className="w-5 h-5 text-purple-600" />
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Member Since</p>
                    <p className="font-bold text-slate-800">Aug 2026</p>
                  </div>
                  
                  <div className="p-6 bg-slate-50 hover:bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center text-center group">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <MapPin className="w-5 h-5 text-blue-600" />
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Location</p>
                    <p className="font-bold text-slate-800">India</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
        
      </div>
    </div>
  );
}
