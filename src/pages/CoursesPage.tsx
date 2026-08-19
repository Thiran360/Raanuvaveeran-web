import { PlayCircle, Clock, CheckCircle, Target, BookOpen, Video, Trophy, Lock, Play, Check, Users, Zap, Star, ExternalLink, ArrowLeft } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { liveApi } from '../lib/liveApi';

interface ModulesPageProps {
  onOpenModal: (modal: string) => void;
}

// Custom hook for scroll animations
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

// Video URLs - Update these with your actual video links
const generateVideos = (moduleNum: number, count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: `Lesson ${i + 1}: Video Title ${i + 1}`,
    duration: '30 min',
    url: `/videos/module${moduleNum}/video${i + 1}.mp4`,
  }));
};

const videoData = {
  module1: generateVideos(1, 30),
  module2: generateVideos(2, 30),
  module3: generateVideos(3, 30)
};

const getModules = (t: any) => [
  {
    id: 1,
    title: t('module1Title'),
    duration: `16 ${t('hoursText')}`,
    videoHours: `16 ${t('hoursText')}`,
    totalVideos: 30,
    videos: videoData.module1,
    description: t('module1Desc'),
    color: 'from-green-400 to-blue-500',
    topics: t('module1Topics').split('|'),
    testInfo: {
      questions: 50,
      duration: `60 ${t('minutesText')}`,
      passingScore: 70
    }
  },
  {
    id: 2,
    title: t('module2Title'),
    duration: `16 ${t('hoursText')}`,
    videoHours: `16 ${t('hoursText')}`,
    totalVideos: 30,
    videos: videoData.module2,
    description: t('module2Desc'),
    color: 'from-orange-400 to-red-500',
    topics: t('module2Topics').split('|'),
    testInfo: {
      questions: 50,
      duration: `60 ${t('minutesText')}`,
      passingScore: 70
    }
  },
  {
    id: 3,
    title: t('module3Title'),
    duration: `16 ${t('hoursText')}`,
    videoHours: `16 ${t('hoursText')}`,
    totalVideos: 30,
    videos: videoData.module3,
    description: t('module3Desc'),
    color: 'from-purple-400 to-pink-500',
    topics: t('module3Topics').split('|'),
    testInfo: {
      questions: 50,
      duration: `60 ${t('minutesText')}`,
      passingScore: 70
    }
  }
];

function getGoogleDriveIframeUrl(url: string): string | null {
  if (!url) return null;
  // Match standard viewing link
  let match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (match) return `https://drive.google.com/file/d/${match[1]}/preview`;

  // Match our optimized download link
  match = url.match(/id=([a-zA-Z0-9_-]+)/);
  if (match && url.includes("drive.google.com")) {
    return `https://drive.google.com/file/d/${match[1]}/preview`;
  }

  return null;
}

function getYoutubeIframeUrl(url: string): string | null {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0`;
  }
  return null;
}

export default function ModulesPage({ onOpenModal }: ModulesPageProps) {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const modules = getModules(t);
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);
  const [showDemoVideo, setShowDemoVideo] = useState(false);
  const [demoVideoUrl, setDemoVideoUrl] = useState<string>("https://raanuvaveeranspokenhindiacademy.com/videos/Video%20Project%201.mp4");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('demo') === 'true') {
      setShowDemoVideo(true);
      liveApi.getDemoVideo(1).then(data => {
        if (data.success && data.demo) {
          setDemoVideoUrl(data.demo);
        }
      }).catch(err => console.error("Error fetching demo video", err));
    }
  }, [location.search]);

  const [completedVideos, setCompletedVideos] = useState<{ [key: number]: Set<number> }>({
    1: new Set(),
    2: new Set(),
    3: new Set()
  });

  const [moduleProgress] = useState<Record<number, { testCompleted: boolean; testScore: number }>>({
    1: { testCompleted: false, testScore: 0 },
    2: { testCompleted: false, testScore: 0 },
    3: { testCompleted: false, testScore: 0 }
  });

  // --- Native Live Class State (Jitsi) ---
  const isAdmin = localStorage.getItem('admin') === 'true';
  const isLoggedIn = isAdmin || localStorage.getItem('userLoggedIn') === 'true';
  const [isEnrolled, setIsEnrolled] = useState<boolean>(localStorage.getItem('isEnrolled') === 'true' || isAdmin);
  const [isLiveActive, setIsLiveActive] = useState<boolean>(localStorage.getItem('isLiveActive') === 'true');
  const [liveMeetingLink, setLiveMeetingLink] = useState<string>(localStorage.getItem('liveMeetingLink') || '');
  const [manualJoinLink, setManualJoinLink] = useState<string>('');

  const startLiveClass = (link: string) => {
    localStorage.setItem('isLiveActive', 'true');
    localStorage.setItem('liveMeetingLink', link);
    setIsLiveActive(true);
    setLiveMeetingLink(link);
  };

  const endLiveClass = () => {
    localStorage.removeItem('isLiveActive');
    localStorage.removeItem('liveMeetingLink');
    setIsLiveActive(false);
    setLiveMeetingLink('');
  };




  // Refs for animations
  const [heroRef, heroInView] = useInView();
  const [benefitsRef, benefitsInView] = useInView();
  const [module1Ref, module1InView] = useInView();
  const [module2Ref, module2InView] = useInView();
  const [module3Ref, module3InView] = useInView();
  const [summaryRef, summaryInView] = useInView();

  const getCompletedCount = (moduleId: number) => {
    return completedVideos[moduleId]?.size || 0;
  };

  const getProgressPercentage = (moduleId: number) => {
    const completed = getCompletedCount(moduleId);
    const total = modules.find(m => m.id === moduleId)?.totalVideos || 32;
    return Math.round((completed / total) * 100);
  };

  const isVideoCompleted = (moduleId: number, videoId: number) => {
    return completedVideos[moduleId]?.has(videoId) || false;
  };

  const isVideoUnlocked = (moduleId: number, videoId: number) => {
    if (videoId === 1) return true;
    return isVideoCompleted(moduleId, videoId - 1);
  };

  const isTestUnlocked = (moduleId: number) => {
    const completed = getCompletedCount(moduleId);
    const total = modules.find(m => m.id === moduleId)?.totalVideos || 32;
    return completed === total;
  };

  const isModuleLocked = (moduleId: number) => {
    if (moduleId === 1) return !isLoggedIn || !isEnrolled;
    const prevProgress = moduleProgress[moduleId - 1];
    return !prevProgress.testCompleted || prevProgress.testScore < 70;
  };

  const markVideoComplete = () => {
    if (selectedModule) {
      const currentModule = modules.find(m => m.id === selectedModule);
      if (currentModule) {
        const currentVideo = currentModule.videos[currentVideoIndex];
        setCompletedVideos(prev => ({
          ...prev,
          [selectedModule]: new Set([...prev[selectedModule], currentVideo.id])
        }));
      }
    }
  };

  const openVideoPlayer = (moduleId: number) => {
    setSelectedModule(moduleId);
    setCurrentVideoIndex(0);
  };

  const closeVideoPlayer = () => {
    setSelectedModule(null);
    setCurrentVideoIndex(0);
  };

  const selectVideo = (index: number, moduleId: number, videoId: number) => {
    if (isVideoUnlocked(moduleId, videoId)) {
      setCurrentVideoIndex(index);
    }
  };

  const currentModule = selectedModule ? modules.find(m => m.id === selectedModule) : null;
  const currentVideo = currentModule ? currentModule.videos[currentVideoIndex] : null;

  const moduleRefs = [module1Ref, module2Ref, module3Ref];
  const moduleInViews = [module1InView, module2InView, module3InView];

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <style>{`
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-left { animation: fadeInLeft 0.8s ease-out forwards; }
        .animate-fade-right { animation: fadeInRight 0.8s ease-out forwards; }
        .animate-fade-up { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-fade-down { animation: fadeInDown 0.8s ease-out forwards; }
        .animate-scale-in { animation: scaleIn 0.8s ease-out forwards; }
      `}</style>

      {/* Demo Video Player Modal */}
      {showDemoVideo && (
        <div className="fixed inset-0 bg-black/95 z-50 overflow-hidden">
          <div className="h-full flex flex-col">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 px-4 sm:px-6 py-4 flex justify-between items-center">
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Hindi Advanced Class - Demo
              </h3>
              <button
                onClick={() => {
                  setShowDemoVideo(false);
                  navigate('/courses', { replace: true });
                }}
                className="text-white hover:bg-white/20 rounded-full p-2 transition-all"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center p-4">
              <video
                key={demoVideoUrl}
                className="w-full max-w-5xl aspect-video rounded-lg shadow-2xl"
                controls
                autoPlay
                playsInline
                src={demoVideoUrl}
                controlsList="nodownload"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}

      {/* Video Player Modal */}
      {selectedModule && currentVideo && currentModule && (
        <div className="fixed inset-0 bg-black/95 z-50 overflow-hidden">
          <div className="h-full flex flex-col">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 px-4 sm:px-6 py-4 flex justify-between items-center">
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {currentModule.title}
              </h3>
              <button
                onClick={closeVideoPlayer}
                className="text-white hover:bg-white/20 rounded-full p-2 transition-all"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
              <div className="flex-1 flex flex-col bg-black p-2 sm:p-4 overflow-y-auto">
                <div className="max-w-5xl mx-auto w-full">
                  <div className="bg-black rounded-lg overflow-hidden mb-4">
                    {(() => {
                      const driveIframeUrl = getGoogleDriveIframeUrl(currentVideo.url);
                      const ytIframeUrl = getYoutubeIframeUrl(currentVideo.url);

                      if (driveIframeUrl || ytIframeUrl) {
                        return (
                          <iframe
                            key={currentVideo.id}
                            src={driveIframeUrl || ytIframeUrl || ''}
                            className="w-full aspect-video border-0"
                            allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                          ></iframe>
                        );
                      }

                      return (
                        <video
                          key={currentVideo.id}
                          className="w-full aspect-video"
                          controls
                          autoPlay
                          src={currentVideo.url}
                          controlsList="nodownload"
                          onError={() => {
                            console.log('Video load error - please update video URLs');
                          }}
                        >
                          Your browser does not support the video tag.
                        </video>
                      );
                    })()}
                  </div>

                  <div className="bg-gray-900 rounded-lg p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-4 gap-4">
                      <div className="flex-1">
                        <h4 className="text-xl sm:text-2xl font-bold text-white mb-2">{currentVideo.title}</h4>
                        <div className="flex items-center gap-4 text-gray-400 text-sm">
                          <span>Video {currentVideo.id} of {currentModule.totalVideos}</span>
                          <span>•</span>
                          <span>{currentVideo.duration}</span>
                        </div>
                      </div>
                      <div>
                        {isVideoCompleted(selectedModule, currentVideo.id) ? (
                          <div className="bg-green-500/20 text-green-400 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-bold flex items-center gap-2 text-sm sm:text-base">
                            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                            Completed
                          </div>
                        ) : (
                          <button
                            onClick={markVideoComplete}
                            className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-bold hover:from-green-600 hover:to-blue-600 transition-all flex items-center gap-2 text-sm sm:text-base"
                          >
                            <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                            Mark Complete
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-300 font-semibold text-sm sm:text-base">Module Progress</span>
                        <span className="text-white font-bold text-sm sm:text-base">
                          {getCompletedCount(selectedModule)} / {currentModule.totalVideos}
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-500 to-blue-500 transition-all duration-500"
                          style={{ width: `${getProgressPercentage(selectedModule)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-96 bg-gray-900 overflow-y-auto border-t md:border-t-0 md:border-l border-gray-800 max-h-64 md:max-h-full">
                <div className="sticky top-0 bg-gray-800 p-4 border-b border-gray-700 z-10">
                  <h5 className="font-bold text-base sm:text-lg text-white flex items-center gap-2">
                    <PlayCircle className="w-5 h-5 text-orange-500" />
                    Course Videos
                  </h5>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1">
                    {getCompletedCount(selectedModule)} / {currentModule.totalVideos} completed
                  </p>
                </div>

                <div className="p-2">
                  {currentModule.videos.map((video, index) => {
                    const isCompleted = isVideoCompleted(selectedModule, video.id);
                    const isUnlocked = isVideoUnlocked(selectedModule, video.id);
                    const isCurrent = currentVideoIndex === index;

                    return (
                      <button
                        key={video.id}
                        onClick={() => selectVideo(index, selectedModule, video.id)}
                        disabled={!isUnlocked}
                        className={`w-full text-left p-2 sm:p-3 mb-2 rounded-lg transition-all ${isCurrent
                          ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                          : isCompleted
                            ? 'bg-green-900/30 hover:bg-green-900/50 text-white'
                            : isUnlocked
                              ? 'bg-gray-800 hover:bg-gray-750 text-white'
                              : 'bg-gray-800/50 text-gray-500 cursor-not-allowed'
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${isCurrent ? 'bg-white/20' : isCompleted ? 'bg-green-500' : isUnlocked ? 'bg-gray-700' : 'bg-gray-700/50'
                            }`}>
                            {isCompleted ? (
                              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                            ) : !isUnlocked ? (
                              <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
                            ) : isCurrent ? (
                              <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                            ) : (
                              <span className="font-bold text-sm">{video.id}</span>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <p className={`font-semibold truncate text-sm ${!isUnlocked ? 'text-gray-500' : ''}`}>
                              {video.title}
                            </p>
                            <p className={`text-xs flex items-center gap-2 ${isCurrent ? 'text-white/80' : isUnlocked ? 'text-gray-400' : 'text-gray-600'
                              }`}>
                              <Clock className="w-3 h-3" />
                              {video.duration}
                            </p>
                          </div>

                          {isCurrent && (
                            <div className="flex-shrink-0">
                              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                            </div>
                          )}
                        </div>

                        {!isUnlocked && (
                          <p className="text-xs text-gray-500 mt-2 ml-11">
                            Complete previous video to unlock
                          </p>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-pink-400/20 backdrop-blur-xl border border-white/30 py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div ref={heroRef} className="text-center">
            <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold text-purple-500 mb-4 sm:mb-6 leading-tight text-balance ${heroInView ? 'animate-fade-down' : 'opacity-0'}`}>
              {t('courseHeroTitle')}
            </h1>
            <p className={`text-lg sm:text-xl text-purple-500 max-w-3xl mx-auto mb-6 sm:mb-8 ${heroInView ? 'animate-fade-up' : 'opacity-0'}`}
              style={{ animationDelay: heroInView ? '0.2s' : '0s' }}>
              {t('courseHeroDesc')}
            </p>
            <div className={`flex flex-wrap justify-center gap-3 sm:gap-6 text-white ${heroInView ? 'animate-fade-up' : 'opacity-0'}`}
              style={{ animationDelay: heroInView ? '0.4s' : '0s' }}>
              <div className="flex items-center gap-2 bg-purple-500 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base">
                <Video className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-semibold">{t('courseVideoHours')}</span>
              </div>
              <div className="flex items-center gap-2 bg-purple-500 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base">
                <Target className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-semibold">{t('courseTests')}</span>
              </div>
              <div className="flex items-center gap-2 bg-purple-500 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base">
                <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-semibold">{t('courseKnowledge')}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="rgb(255 247 237)" />
          </svg>
        </div>
      </div>


      {/* Learning Benefits Section */}
      <div ref={benefitsRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className={`bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 sm:p-6 text-center ${benefitsInView ? 'animate-fade-left' : 'opacity-0'}`}>
          <Users className="w-10 h-10 sm:w-12 sm:h-12 text-blue-500 mx-auto mb-3" />
          <h3 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">{t('benefitExpertTeachersTitle')}</h3>
          <p className="text-xs sm:text-sm text-gray-600">{t('benefitExpertTeachersDesc')}</p>
        </div>
        <div className={`bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 sm:p-6 text-center ${benefitsInView ? 'animate-fade-up' : 'opacity-0'}`}
          style={{ animationDelay: benefitsInView ? '0.1s' : '0s' }}>
          <Zap className="w-10 h-10 sm:w-12 sm:h-12 text-green-500 mx-auto mb-3" />
          <h3 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">{t('benefitSequentialLearningTitle')}</h3>
          <p className="text-xs sm:text-sm text-gray-600">{t('benefitSequentialLearningDesc')}</p>
        </div>
        <div className={`bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-4 sm:p-6 text-center ${benefitsInView ? 'animate-fade-up' : 'opacity-0'}`}
          style={{ animationDelay: benefitsInView ? '0.2s' : '0s' }}>
          <Star className="w-10 h-10 sm:w-12 sm:h-12 text-orange-500 mx-auto mb-3" />
          <h3 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">{t('benefitQualityContentTitle')}</h3>
          <p className="text-xs sm:text-sm text-gray-600">{t('benefitQualityContentDesc')}</p>
        </div>
        <div className={`bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 sm:p-6 text-center ${benefitsInView ? 'animate-fade-right' : 'opacity-0'}`}
          style={{ animationDelay: benefitsInView ? '0.3s' : '0s' }}>
          <Trophy className="w-10 h-10 sm:w-12 sm:h-12 text-purple-500 mx-auto mb-3" />
          <h3 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">{t('benefitCertificationTitle')}</h3>
          <p className="text-xs sm:text-sm text-gray-600">{t('benefitCertificationDesc')}</p>
        </div>
      </div>

      {/* Learning Path Timeline */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">{t('learningJourneyTitle')}</h2>
          <p className="text-base sm:text-lg text-gray-600">{t('learningJourneyDesc')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 xl:gap-10">
          {modules.map((module, index) => {
            const completedCount = getCompletedCount(module.id);
            const progressPercent = getProgressPercentage(module.id);
            const testUnlocked = isTestUnlocked(module.id);
            const moduleLocked = isModuleLocked(module.id);
            const isInView = moduleInViews[index];

            return (
              <div
                key={module.id}
                ref={moduleRefs[index]}
                className={`flex flex-col bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/40 hover:shadow-2xl hover:shadow-gray-200/60 transition-all duration-500 overflow-hidden transform hover:-translate-y-2 relative group ${moduleLocked ? 'opacity-75 grayscale-[20%]' : ''} ${isInView ? 'animate-fade-up' : 'opacity-0'}`}
                style={{ animationDelay: isInView ? `${index * 0.1}s` : '0s' }}
              >
                {/* Top Section - Gradient Background */}
                <div className={`relative p-6 pb-12 bg-gradient-to-br ${module.color} text-white`}>
                  <div className="bg-white/20 backdrop-blur-md self-start inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider mb-4 border border-white/20">
                    {t('moduleText')} {module.id}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 leading-snug">{module.title}</h3>
                  <p className="text-white/80 text-sm leading-relaxed mb-6 line-clamp-2">
                    {module.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-1.5 bg-black/10 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-medium border border-white/10">
                      <Video className="w-3.5 h-3.5" />
                      {module.totalVideos} {t('videosText')}
                    </div>
                    <div className="flex items-center gap-1.5 bg-black/10 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-medium border border-white/10">
                      <Clock className="w-3.5 h-3.5" />
                      {module.duration}
                    </div>
                  </div>

                  {/* Decorative shape */}
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                </div>

                {/* Overlapping Progress Indicator */}
                <div className="px-6 -mt-8 relative z-10">
                  <div className="bg-white rounded-2xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 flex items-center gap-4">
                    {/* Circular Progress Ring */}
                    <div className="relative w-14 h-14 flex-shrink-0 flex items-center justify-center">
                      <svg className="w-14 h-14 transform -rotate-90">
                        <circle className="text-gray-100" strokeWidth="4" stroke="currentColor" fill="transparent" r="24" cx="28" cy="28"/>
                        <circle 
                          className={`${progressPercent === 100 ? 'text-green-500' : 'text-orange-500'} transition-all duration-1000 ease-out`} 
                          strokeWidth="4" 
                          strokeDasharray={24 * 2 * Math.PI} 
                          strokeDashoffset={24 * 2 * Math.PI - (progressPercent / 100) * 24 * 2 * Math.PI}
                          strokeLinecap="round" 
                          stroke="currentColor" 
                          fill="transparent" 
                          r="24" cx="28" cy="28"
                        />
                      </svg>
                      <span className="absolute text-xs font-bold text-gray-800">{progressPercent}%</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-gray-900 mb-0.5">{t('videoProgress')}</h4>
                      <p className="text-xs text-gray-500">{completedCount} / {module.totalVideos} {t('videosCompletedText')}</p>
                    </div>
                  </div>
                </div>

                {/* Middle Section - Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="mb-6 flex-1">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <BookOpen className="w-3.5 h-3.5" /> {t('topicsCovered')}
                    </h4>
                    <div className="space-y-2.5">
                      {module.topics.slice(0, 4).map((topic: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-2.5 group/item">
                          <div className="mt-0.5 bg-green-50 rounded-full p-0.5 group-hover/item:bg-green-100 transition-colors">
                            <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                          </div>
                          <span className="text-sm text-gray-600 font-medium">{topic.replace(/\s*\(.*?\)/g, '')}</span>
                        </div>
                      ))}
                      {module.topics.length > 4 && (
                        <div className="text-xs font-medium text-gray-400 pl-7">
                          + {module.topics.length - 4} more topics
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Test Details Card */}
                  <div className={`p-4 rounded-2xl border mb-6 ${testUnlocked ? 'bg-green-50/50 border-green-100' : 'bg-gray-50 border-gray-100'}`}>
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <Target className="w-3.5 h-3.5" /> {t('testDetailsTitle')}
                    </h4>
                    
                    {!testUnlocked ? (
                      <div className="flex items-center gap-3 text-gray-500">
                        <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center border border-gray-100">
                          <Lock className="w-4 h-4 text-gray-400" />
                        </div>
                        <span className="text-xs font-medium">{t('completeAllVideosToUnlock')}</span>
                      </div>
                    ) : (
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">{t('durationLabel')}</span>
                          <span className="font-bold">{module.testInfo.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">{t('passingScoreLabel')}</span>
                          <span className="font-bold text-green-600">{module.testInfo.passingScore}%</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Actions (Anchored to bottom) */}
                  <div className="grid grid-cols-2 gap-3 mt-auto">
                    <button
                      onClick={() => openVideoPlayer(module.id)}
                      disabled={moduleLocked}
                      className={`py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 ${moduleLocked ? 'bg-gray-100 text-gray-400' : 'bg-gray-900 text-white hover:bg-gray-800 shadow-md hover:shadow-lg'}`}
                    >
                      <PlayCircle className="w-3.5 h-3.5" /> {t('startVideosBtn')}
                    </button>

                    <button
                      onClick={() => onOpenModal('enroll')}
                      disabled={!testUnlocked || moduleLocked}
                      className={`py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 ${!testUnlocked || moduleLocked ? 'bg-gray-100 text-gray-400' : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md hover:shadow-lg'}`}
                    >
                      {testUnlocked && moduleProgress[module.id].testCompleted ? (
                        <><CheckCircle className="w-3.5 h-3.5" /> {t('testCompletedBtn')}</>
                      ) : (
                        <><Target className="w-3.5 h-3.5" /> {t('takeTestBtn')}</>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary */}
      <div ref={summaryRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">

        <div
          className={`
      relative rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-white overflow-hidden
      ${summaryInView ? "animate-scale-in" : "opacity-0"}
    `}
        >

          {/* Background: Image + Gradient Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `
          linear-gradient(to bottom right, rgba(255,140,0,0.75), rgba(255,0,80,0.75), rgba(255,0,150,0.75)),
          url('https://images.pexels.com/photos/7648051/pexels-photo-7648051.jpeg')
        `,
            }}
          />

          {/* Foreground Content */}
          <div className="relative z-10">

            <div className="text-center mb-6 sm:mb-8">
              <Trophy className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4" />
              <h3 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">{t('getKnowledgeTitle')}</h3>

              <p className="text-base sm:text-xl text-white/90 max-w-3xl mx-auto mb-3 sm:mb-4">
                {t('getKnowledgeDesc')}
              </p>

              <p className="text-sm sm:text-lg text-white/80 italic">
                {t('testsUnlockNote')}
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
              {[
                { num: "90", label: t('videosText') },
                { num: "48", label: t('hoursText') },
                { num: "3", label: t('testsText') },
                { num: "150", label: t('questionsText') }
              ].map((stat, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 text-center">
                  <div className="text-3xl sm:text-5xl font-bold mb-1 sm:mb-2">{stat.num}</div>
                  <div className="text-sm sm:text-base text-white/90">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Button */}
            <div className="text-center">
              {isEnrolled && isLoggedIn ? (
                <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 max-w-lg mx-auto">
                  <div className="flex items-center justify-center gap-3 text-white mb-2">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                    <span className="text-2xl font-bold">{t('alreadyEnrolledTitle')}</span>
                  </div>
                  <p className="text-white/80">{t('alreadyEnrolledDesc')}</p>
                </div>
              ) : (
                <button
                  onClick={() => {
                    if (!isLoggedIn) {
                      onOpenModal("enroll");
                    } else {
                      // Handle successful simulated enrollment
                      localStorage.setItem('isEnrolled', 'true');
                      setIsEnrolled(true);
                      alert(t('enrollSuccessAlert'));
                    }
                  }}
                  className="bg-white text-orange-600 px-8 sm:px-12 py-3 sm:py-5 rounded-full font-bold text-lg sm:text-xl hover:bg-orange-50 transition-all transform hover:scale-105 shadow-xl"
                >
                  {t('enrollNowPrice')}
                </button>
              )}

              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-white/80">
                {t('paymentFeatures')}
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
