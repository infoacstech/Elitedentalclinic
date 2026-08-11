import React from 'react';
import { ShieldCheck, Award, CheckCircle, UserCheck, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { doctorDetails } from '../data/clinicData';
import { DailyDentalTipCard } from './DailyDentalTipCard';

interface HeroProps {
  currentLang: Language;
  onBookClick: () => void;
  onAiConsultClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ currentLang, onBookClick, onAiConsultClick }) => {
  const t = translations[currentLang];

  return (
    <section id="hero" className="relative bg-slate-900 text-white overflow-hidden py-12 lg:py-16">
      {/* Background Image Container with 16:9 aspect styling and gradient overlay for negative space */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1920"
          alt="Dr. Ankita Goklani's Elite Dental Care - Modern Sterile Clinic Environment"
          className="w-full h-full object-cover object-center opacity-40 scale-105 filter blur-[1px]"
          referrerPolicy="no-referrer"
        />
        {/* Soft Blue, White & Teal Gradient Overlay prioritizing left-third negative space */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-sky-950/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-900/40" />
      </div>

      <div className="relative z-10 max-w-[1536px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs sm:text-sm font-semibold backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>{t.regNoLabel} | {doctorDetails.degreesShort}</span>
            </div>

            {/* Main Title & Subtitle */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {currentLang === 'en' ? (
                  <>
                    <span className="text-teal-400 block text-xl sm:text-2xl font-bold uppercase tracking-wider mb-1">
                      Dr. Ankita Goklani's
                    </span>
                    <span className="text-white">Elite Dental Care</span>
                  </>
                ) : (
                  <>
                    <span className="text-teal-400 block text-xl sm:text-2xl font-bold mb-1">
                      डॉ. अंकिता गोकलानीज्
                    </span>
                    <span className="text-white">एलाईट डेंटल केअर</span>
                  </>
                )}
              </h1>

              <p className="text-sky-200 text-sm sm:text-base font-semibold italic flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                {currentLang === 'en' ? "Consultant Oral Physician & Dental Surgeon" : "कन्सल्टंट ओरल फिजिशियन आणि दंत शल्यचिकित्सक"}
              </p>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed pt-2">
                {t.heroTagline}
              </p>
            </div>

            {/* Doctor Credentials Pill List */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-slate-200">
              <div className="flex items-center gap-2 bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/60 backdrop-blur-xs">
                <CheckCircle className="w-4 h-4 text-teal-400 shrink-0" />
                <span>B.D.S (C.S.M.S.S College)</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/60 backdrop-blur-xs">
                <CheckCircle className="w-4 h-4 text-teal-400 shrink-0" />
                <span>M.D.S (GDC Sambhajinagar)</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/60 backdrop-blur-xs">
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Ex-Asst. Prof (Ghati Hospital)</span>
              </div>
            </div>



            {/* Daily Dental Tip Card */}
            <div className="pt-2">
              <DailyDentalTipCard currentLang={currentLang} />
            </div>

            {/* Quick Stat Bar across 4 full columns */}
            <div className="pt-4 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-2 bg-slate-800/40 rounded-xl border border-slate-800">
                <p className="text-xl sm:text-2xl font-extrabold text-teal-400">100%</p>
                <p className="text-[11px] text-slate-300 font-medium uppercase">Sterile & Safe</p>
              </div>
              <div className="p-2 bg-slate-800/40 rounded-xl border border-slate-800">
                <p className="text-xl sm:text-2xl font-extrabold text-sky-400">Digital</p>
                <p className="text-[11px] text-slate-300 font-medium uppercase">RVG Low-Radiation</p>
              </div>
              <div className="p-2 bg-slate-800/40 rounded-xl border border-slate-800">
                <p className="text-xl sm:text-2xl font-extrabold text-rose-400">Painless</p>
                <p className="text-[11px] text-slate-300 font-medium uppercase">Single Sitting RCT</p>
              </div>
              <div className="p-2 bg-slate-800/40 rounded-xl border border-slate-800">
                <p className="text-xl sm:text-2xl font-extrabold text-amber-400">Gentle</p>
                <p className="text-[11px] text-slate-300 font-medium uppercase">Zero Anxiety Care</p>
              </div>
            </div>

          </div>

          {/* Right Column (Hero Visual Card showcasing sterile examination & dental instruments close-up) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-teal-500/30 bg-slate-800 group">
              <img
                src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=1000"
                alt="Close up examination of a healthy white smile with dental mirror and probe in blue gloves"
                className="w-full h-[360px] sm:h-[420px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

              {/* Foreground Overlay Card */}
              <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md p-4 rounded-xl border border-slate-700/80 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-300 shrink-0">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      {currentLang === 'en' ? "Expert Clinical Diagnosis" : "अचूक व डिजिटल निदान"}
                    </h3>
                    <p className="text-xs text-slate-300">
                      {currentLang === 'en' 
                        ? "Examined under precision magnification with sanitized instruments." 
                        : "अत्याधुनिक उपकरणांद्वारे अत्यंत स्वच्छ वातावरणात दंत तपासणी."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute top-4 right-4 bg-teal-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-teal-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Elite Care Standard</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
