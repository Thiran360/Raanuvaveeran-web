import React, { useState } from 'react';
import { ArrowLeft, ZoomIn, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function GalleryPage() {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    { src: '/hero-main.png', title: 'Raanuva Veeran Academy', category: 'Training' },
    { src: '/hero-army.jpg', title: 'Army Preparation', category: 'Events' },
    { src: '/about-hero.jpg', title: 'Our Campus', category: 'Campus' },
    { src: '/raanu.png', title: 'Student Success', category: 'Students' },
    { src: '/ranuva_veeran.jpg', title: 'Special Events', category: 'Events' },
    { src: '/teacher-profile-new.jpg', title: 'Expert Faculty', category: 'Faculty' },
    { src: '/Rv.png', title: 'Academy Logo', category: 'Branding' },
    { src: '/indian-flag.jpg', title: 'Patriotism', category: 'Values' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Gallery</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Take a look at the vibrant life, events, and training sessions at Raanuva Veeran Academy.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {images.map((img, index) => (
            <div 
              key={index} 
              className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 aspect-square bg-slate-200 cursor-pointer"
              onClick={() => setSelectedImage(img.src)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img 
                src={img.src} 
                alt={img.title} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                loading="lazy"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-purple-300 text-xs font-bold uppercase tracking-wider mb-1 block">
                    {img.category}
                  </span>
                  <h3 className="text-white font-bold text-lg leading-tight flex items-center justify-between">
                    {img.title}
                    <ZoomIn className="w-5 h-5 text-white/70" />
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-fade-in">
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
          >
            <X className="w-8 h-8" />
          </button>
          
          <img 
            src={selectedImage} 
            alt="Enlarged" 
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl animate-scale-up"
          />
        </div>
      )}
    </div>
  );
}
