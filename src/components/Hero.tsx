import React from 'react';
import { ShieldCheck, Calendar, Phone, Sparkles, Award, CheckCircle, ArrowRight, UserCheck } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { doctorDetails } from '../data/clinicData';

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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column (Left Third Negative Space for Clean Typography Overlay) */}
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

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl pt-2">
                {t.heroTagline}
              </p>
            </div>

            {/* Doctor Credentials Pill List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-xl text-xs text-slate-200">
              <div className="flex items-center gap-2 bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/60 backdrop-blur-xs">
                <CheckCircle className="w-4 h-4 text-teal-400 shrink-0" />
                <span>B.D.S (C.S.M.S.S Dental College)</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/60 backdrop-blur-xs">
                <CheckCircle className="w-4 h-4 text-teal-400 shrink-0" />
                <span>M.D.S (GDC Sambhajinagar)</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/60 backdrop-blur-xs sm:col-span-2">
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Ex-Asst. Professor (Ghati Hospital, Sambhajinagar)</span>
              </div>
            </div>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                id="btn-hero-book-appointment"
                onClick={onBookClick}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-sky-600 hover:from-teal-600 hover:to-sky-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-teal-500/25 transition-all transform hover:-translate-y-0.5 text-sm sm:text-base"
              >
                <Calendar className="w-5 h-5" />
                <span>{t.bookAppointment}</span>
              </button>

              <a
                href="tel:9922300842"
                id="btn-hero-call"
                className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-sky-200 hover:text-white font-semibold px-5 py-3.5 rounded-xl border border-slate-700 transition-colors text-sm sm:text-base"
              >
                <Phone className="w-4 h-4 text-teal-400" />
                <span>{t.callNow}</span>
              </a>

              <button
                id="btn-hero-ai-consult"
                onClick={onAiConsultClick}
                className="inline-flex items-center gap-2 bg-sky-950/80 hover:bg-sky-900 text-teal-300 font-semibold px-4 py-3 rounded-xl border border-teal-500/40 text-xs sm:text-sm transition-all"
              >
                <Sparkles className="w-4 h-4 text-teal-400" />
                <span>{t.askAiAssistant}</span>
              </button>
            </div>

            {/* Quick Stat Bar */}
            <div className="pt-4 border-t border-slate-800 grid grid-cols-3 gap-4 max-w-lg text-center">
              <div>
                <p className="text-xl sm:text-2xl font-extrabold text-teal-400">100%</p>
                <p className="text-[11px] text-slate-400 font-medium uppercase">Sterile & Safe</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-extrabold text-sky-400">Digital</p>
                <p className="text-[11px] text-slate-400 font-medium uppercase">RVG Low-Radiation</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-extrabold text-rose-400">Painless</p>
                <p className="text-[11px] text-slate-400 font-medium uppercase">Single Sitting RCT</p>
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
