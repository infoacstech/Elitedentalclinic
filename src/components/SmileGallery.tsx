import React, { useState } from 'react';
import { Sparkles, ArrowLeftRight, CheckCircle2, Clock } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { smileTransformationsData } from '../data/clinicData';

interface SmileGalleryProps {
  currentLang: Language;
}

export const SmileGallery: React.FC<SmileGalleryProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const [sliderPositions, setSliderPositions] = useState<Record<string, number>>({
    t1: 50,
    t2: 50,
    t3: 50
  });

  const handleSliderChange = (id: string, val: number) => {
    setSliderPositions(prev => ({ ...prev, [id]: val }));
  };

  return (
    <section id="gallery" className="py-16 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Smile Outcomes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.transformationsTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            {t.transformationsSub}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {smileTransformationsData.map((item) => {
            const pos = sliderPositions[item.id] || 50;
            const title = currentLang === 'en' ? item.titleEn : item.titleMr;
            const desc = currentLang === 'en' ? item.descriptionEn : item.descriptionMr;

            return (
              <div
                key={item.id}
                className="bg-slate-50 rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-lg transition-shadow flex flex-col justify-between"
              >
                <div>
                  {/* Before / After Visual Comparison Box */}
                  <div className="relative h-[240px] rounded-xl overflow-hidden select-none border border-slate-300">
                    
                    {/* After Image (Full background) */}
                    <img
                      src={item.afterImg}
                      alt={`${title} - After Treatment`}
                      className="absolute inset-0 w-full h-full object-cover object-center"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 right-2 bg-emerald-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded shadow-xs z-10">
                      AFTER
                    </div>

                    {/* Before Image (Clipped overlay) */}
                    <div
                      className="absolute inset-y-0 left-0 overflow-hidden"
                      style={{ width: `${pos}%` }}
                    >
                      <img
                        src={item.beforeImg}
                        alt={`${title} - Before Treatment`}
                        className="absolute top-0 left-0 h-full w-[340px] max-w-none object-cover object-center"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-2 left-2 bg-rose-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded shadow-xs z-10">
                        BEFORE
                      </div>
                    </div>

                    {/* Vertical Divider handle */}
                    <div
                      className="absolute inset-y-0 w-1 bg-white shadow-lg pointer-events-none z-20 flex items-center justify-center"
                      style={{ left: `${pos}%` }}
                    >
                      <div className="w-7 h-7 rounded-full bg-teal-600 text-white flex items-center justify-center shadow-md border-2 border-white">
                        <ArrowLeftRight className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Hidden Range Input overlay */}
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={pos}
                      onChange={(e) => handleSliderChange(item.id, Number(e.target.value))}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold text-teal-700">
                      <span>{item.treatmentType}</span>
                      <span className="flex items-center gap-1 text-slate-500 font-normal">
                        <Clock className="w-3 h-3 text-teal-600" />
                        {item.duration}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-200 text-[11px] font-semibold text-emerald-700 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Outcome by Dr. Ankita Goklani</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
