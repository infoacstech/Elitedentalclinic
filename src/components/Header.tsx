import React from 'react';
import { Phone, Clock, MapPin, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onBookClick: () => void;
  isOpenNow: boolean;
  onToggleStatus?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  onBookClick,
  isOpenNow,
  onToggleStatus
}) => {
  const t = translations[currentLang];

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-slate-100">
      {/* Top Utility Bar */}
      <div className="bg-sky-900 text-sky-100 text-xs py-1.5 px-3 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Left info */}
          <div className="flex items-center gap-3 sm:gap-6">
            <a 
              href="tel:9922300842" 
              className="flex items-center gap-1.5 hover:text-white focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-1 focus-visible:ring-offset-sky-900 rounded transition-colors font-medium text-sky-200 text-[11px] sm:text-xs whitespace-nowrap"
              id="topbar-phone-link"
              aria-label="Call clinic directly at +91 9922300842"
            >
              <Phone className="w-3.5 h-3.5 text-teal-400 shrink-0" aria-hidden="true" />
              <span>{t.callNow}</span>
            </a>

            <div className="hidden md:flex items-center gap-1.5 text-sky-300 text-xs whitespace-nowrap" aria-label="Clinic operating hours">
              <Clock className="w-3.5 h-3.5 text-teal-400 shrink-0" aria-hidden="true" />
              <span>{t.morningSlot} | {t.eveningSlot}</span>
            </div>

            <div className="hidden lg:flex items-center gap-1.5 text-sky-300 text-xs truncate max-w-xs" aria-label="Clinic location">
              <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" aria-hidden="true" />
              <span className="truncate">Jawahar Colony, Sambhajinagar</span>
            </div>
          </div>

          {/* Right info: Live Status Badge */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button 
              id="clinic-status-badge"
              onClick={onToggleStatus}
              title="Click to toggle Open / Closed status for demonstration"
              aria-label={`Clinic is currently ${isOpenNow ? 'Open Now' : 'Closed Now'}. Click to toggle status`}
              aria-live="polite"
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-wide cursor-pointer transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-teal-300 focus-visible:ring-offset-1 focus-visible:ring-offset-sky-900 whitespace-nowrap ${
                isOpenNow ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30' : 'bg-amber-500/20 text-amber-200 border border-amber-400/30'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isOpenNow ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} aria-hidden="true" />
              <span>{isOpenNow ? t.openNow : t.closedNow}</span>
              <span className="text-[9px] opacity-70 underline ml-0.5">(Toggle)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Brand Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-8 py-2.5 flex items-center justify-between gap-3 overflow-x-auto no-scrollbar">
        {/* Brand Logo & Title */}
        <a 
          href="#hero" 
          className="flex items-center gap-2.5 group shrink-0 focus-visible:ring-2 focus-visible:ring-teal-600 rounded-lg p-0.5" 
          id="brand-logo-link"
          aria-label="Dr. Ankita Goklani's Elite Dental Care - Home"
        >
          {/* Official Clinic Logo */}
          <img 
            src="/logo.svg" 
            alt="Dr. Ankita Goklani's Elite Dental Care Logo" 
            className="w-10 h-10 sm:w-11 sm:h-11 object-contain drop-shadow-sm group-hover:scale-105 transition-transform shrink-0" 
          />

          {/* Text block */}
          <div className="flex flex-col justify-center whitespace-nowrap">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="text-[11px] sm:text-xs font-semibold text-slate-600 tracking-tight whitespace-nowrap">
                {currentLang === 'en' ? "Dr. Ankita Goklani's" : "डॉ. अंकिता गोकलानीज्"}
              </span>
              <span className="hidden sm:inline-block text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 bg-sky-100 text-sky-800 rounded border border-sky-200">
                {t.regNoLabel}
              </span>
            </div>

            <span className="text-sm sm:text-base md:text-lg font-black text-slate-900 leading-tight tracking-tight whitespace-nowrap group-hover:text-teal-700 transition-colors">
              {currentLang === 'en' ? "Elite Dental Care" : "एलाईट डेंटल केअर"}
            </span>

            <span className="text-[10px] sm:text-xs font-bold text-rose-600 italic leading-none whitespace-nowrap">
              (दातांचा दवाखाना)
            </span>
          </div>
        </a>

        {/* Navigation Links & EN | मराठी Switcher on Right */}
        <div className="flex items-center gap-3 sm:gap-6 shrink-0">
          <nav className="hidden md:flex items-center gap-5 text-xs sm:text-sm font-medium text-slate-700" aria-label="Primary Navigation">
            <a href="#facilities" className="hover:text-teal-600 focus-visible:text-teal-600 focus-visible:outline-none transition-colors whitespace-nowrap" id="nav-facilities" aria-label="Available Dental Facilities">{t.availableFacilitiesHeader}</a>
            <a href="#doctor" className="hover:text-teal-600 focus-visible:text-teal-600 focus-visible:outline-none transition-colors whitespace-nowrap" id="nav-doctor" aria-label="Meet Dr. Ankita Goklani">{t.meetTheSurgeon}</a>
            <a href="#ai-assistant" className="hover:text-teal-600 focus-visible:text-teal-600 focus-visible:outline-none transition-colors flex items-center gap-1 text-sky-700 font-semibold whitespace-nowrap" id="nav-ai" aria-label="AI Dental Assistant">
              <Sparkles className="w-3.5 h-3.5 text-teal-500" aria-hidden="true" />
              <span>AI Assistant</span>
            </a>
            <a href="#gallery" className="hover:text-teal-600 focus-visible:text-teal-600 focus-visible:outline-none transition-colors whitespace-nowrap" id="nav-gallery" aria-label="Clinic Photo Gallery">Gallery</a>
            <a href="#contact" className="hover:text-teal-600 focus-visible:text-teal-600 focus-visible:outline-none transition-colors whitespace-nowrap" id="nav-contact" aria-label="Contact and Location Info">Contact</a>
          </nav>

          {/* Clean EN | मराठी Language Switcher */}
          <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200 shrink-0" role="group" aria-label="Language options">
            <button
              id="btn-lang-en"
              onClick={() => onLanguageChange('en')}
              aria-label="Switch language to English"
              aria-pressed={currentLang === 'en'}
              className={`px-2 py-1 text-xs font-bold rounded ${
                currentLang === 'en' ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              } focus-visible:ring-2 focus-visible:ring-teal-600 transition-all`}
            >
              EN
            </button>
            <button
              id="btn-lang-mr"
              onClick={() => onLanguageChange('mr')}
              aria-label="Switch language to Marathi (मराठी)"
              aria-pressed={currentLang === 'mr'}
              className={`px-2 py-1 text-xs font-bold rounded ${
                currentLang === 'mr' ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              } focus-visible:ring-2 focus-visible:ring-teal-600 transition-all`}
            >
              मराठी
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
