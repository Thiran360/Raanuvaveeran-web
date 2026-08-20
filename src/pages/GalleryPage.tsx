import { useState, useEffect } from 'react';
import { ZoomIn, X, Loader2, ImageOff, RotateCw } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { apiService } from '../lib/api';

interface GalleryItem {
  id: number;
  image_url: string;
  title?: string;
  category?: string;
}

export default function GalleryPage() {
  const { language } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<{ url: string; id: number | string } | null>(null);
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Persistent Rotations saved in localStorage
  const [rotations, setRotations] = useState<Record<string | number, number>>(() => {
    try {
      const saved = localStorage.getItem('gallery_image_rotations');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true);
      try {
        const data = await apiService.getGallery();
        setImages(data.filter(item => Number(item.id) !== 61 && Number(item.id) !== 54));
      } catch (err) {
        console.error("Failed to load gallery:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const handleRotate = (e: React.MouseEvent, id: number | string) => {
    e.stopPropagation();
    setRotations(prev => {
      const nextAngle = ((prev[id] || 0) + 90) % 360;
      const updated = { ...prev, [id]: nextAngle };
      try {
        localStorage.setItem('gallery_image_rotations', JSON.stringify(updated));
      } catch (err) {
        console.error("Could not save rotation preference:", err);
      }
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Gallery</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {language === 'ta'
              ? "ராணுவ வீரன் அகாடமியின் சிறப்பான நினைவுகள் மற்றும் பயிற்சி தருணங்கள்."
              : "Take a look at the vibrant life, events, and training sessions at Raanuva Veeran Academy."}
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
            <p className="text-slate-500 font-medium animate-pulse">
              {language === 'ta' ? 'படங்கள் பதிவேற்றப்படுகின்றன...' : 'Fetching gallery images...'}
            </p>
          </div>
        )}

        {/* Empty State */}
        {!loading && images.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-3">
            <ImageOff className="w-12 h-12 stroke-[1.5]" />
            <p className="text-lg font-medium">No gallery images found.</p>
          </div>
        )}

        {/* Gallery Grid - 3 Images per row */}
        {!loading && images.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
            {images.map((img, index) => {
              const imgId = img.id || index;
              const rotation = rotations[imgId] || 0;
              const isSideways = rotation === 90 || rotation === 270;

              return (
                <div 
                  key={imgId} 
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 aspect-[4/3] bg-slate-900 border border-slate-800 cursor-pointer flex items-center justify-center p-2"
                  onClick={() => setSelectedImage({ url: img.image_url, id: imgId })}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="w-full h-full flex items-center justify-center overflow-hidden">
                    <img 
                      src={img.image_url} 
                      alt={img.title || `Gallery ${index + 1}`} 
                      referrerPolicy="no-referrer"
                      className="max-w-full max-h-full object-contain transition-all duration-500 ease-in-out group-hover:scale-105"
                      style={{ 
                        transform: `rotate(${rotation}deg) ${isSideways ? 'scale(1.35)' : 'scale(1)'}` 
                      }}
                      loading="lazy"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/hero-main.png';
                      }}
                    />
                  </div>

                  {/* Top Right Rotate Button */}
                  <button
                    onClick={(e) => handleRotate(e, imgId)}
                    title={language === 'ta' ? 'படத்தை சுழற்று (90°)' : 'Rotate 90°'}
                    className="absolute top-3 right-3 p-2.5 rounded-full bg-slate-900/80 hover:bg-purple-600 text-white backdrop-blur-md transition-all shadow-md z-20 opacity-90 hover:opacity-100 hover:scale-110 flex items-center justify-center"
                  >
                    <RotateCw className="w-4 h-4" />
                  </button>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 pointer-events-none">
                    <div className="transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                      <span className="text-purple-300 text-xs font-bold uppercase tracking-wider mb-1 block">
                        {img.category || 'Academy'}
                      </span>
                      <h3 className="text-white font-bold text-base sm:text-lg leading-tight flex items-center justify-between">
                        {img.title || `Image ${index + 1}`}
                        <ZoomIn className="w-5 h-5 text-white/80 shrink-0" />
                      </h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-fade-in">
          {/* Top Controls */}
          <div className="absolute top-6 right-6 flex items-center gap-3 z-50">
            <button
              onClick={(e) => handleRotate(e, selectedImage.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-purple-600 text-white backdrop-blur-md transition-all font-medium text-sm border border-white/10"
            >
              <RotateCw className="w-4 h-4" />
              <span>{language === 'ta' ? 'சுழற்று (90°)' : 'Rotate 90°'}</span>
            </button>

            <button 
              onClick={() => setSelectedImage(null)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-7 h-7" />
            </button>
          </div>
          
          <div className="max-w-full max-h-[85vh] p-4 flex items-center justify-center overflow-hidden">
            <img 
              src={selectedImage.url} 
              alt="Enlarged" 
              referrerPolicy="no-referrer"
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl transition-all duration-500 ease-in-out"
              style={{ transform: `rotate(${rotations[selectedImage.id] || 0}deg)` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
