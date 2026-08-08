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
              className="flex items-center gap-1.5 hover:text-white transition-colors font-medium text-sky-200 text-[11px] sm:text-xs whitespace-nowrap"
              id="topbar-phone-link"
            >
              <Phone className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span>{t.callNow}</span>
            </a>

            <div className="hidden md:flex items-center gap-1.5 text-sky-300 text-xs whitespace-nowrap">
              <Clock className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span>{t.morningSlot} | {t.eveningSlot}</span>
            </div>

            <div className="hidden lg:flex items-center gap-1.5 text-sky-300 text-xs truncate max-w-xs">
              <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span className="truncate">Jawahar Colony, Sambhajinagar</span>
            </div>
          </div>

          {/* Right info: Live Status Badge */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button 
              id="clinic-status-badge"
              onClick={onToggleStatus}
              title="Click to toggle Open / Closed status for demonstration"
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-wide cursor-pointer transition-transform hover:scale-105 whitespace-nowrap ${
                isOpenNow ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30' : 'bg-amber-500/20 text-amber-200 border border-amber-400/30'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isOpenNow ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              <span>{isOpenNow ? t.openNow : t.closedNow}</span>
              <span className="text-[9px] opacity-70 underline ml-0.5">(Toggle)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Brand Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-8 py-2.5 flex items-center justify-between gap-3 overflow-x-auto no-scrollbar">
        {/* Brand Logo & Title */}
        <a href="#hero" className="flex items-center gap-2.5 group shrink-0" id="brand-logo-link">
          {/* Custom Stylized Logo (Reduced size: w-9 h-9 sm:w-10 sm:h-10) */}
          <div className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-teal-500 to-sky-600 text-white shadow-md group-hover:scale-105 transition-transform shrink-0">
            <Sparkles className="w-5 h-5 text-white" />
            <div className="absolute -bottom-1 -right-1 bg-rose-600 text-[8px] font-extrabold px-1 py-0.2 rounded-full text-white border border-white shadow-xs">
              ELITE
            </div>
          </div>

          {/* Text block: flex column with whitespace-nowrap on all lines */}
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
          <nav className="hidden md:flex items-center gap-5 text-xs sm:text-sm font-medium text-slate-700">
            <a href="#facilities" className="hover:text-teal-600 transition-colors whitespace-nowrap" id="nav-facilities">{t.availableFacilitiesHeader}</a>
            <a href="#doctor" className="hover:text-teal-600 transition-colors whitespace-nowrap" id="nav-doctor">{t.meetTheSurgeon}</a>
            <a href="#ai-assistant" className="hover:text-teal-600 transition-colors flex items-center gap-1 text-sky-700 font-semibold whitespace-nowrap" id="nav-ai">
              <Sparkles className="w-3.5 h-3.5 text-teal-500" />
              <span>AI Assistant</span>
            </a>
            <a href="#gallery" className="hover:text-teal-600 transition-colors whitespace-nowrap" id="nav-gallery">Gallery</a>
            <a href="#contact" className="hover:text-teal-600 transition-colors whitespace-nowrap" id="nav-contact">Contact</a>
          </nav>

          {/* Clean EN | मराठी Language Switcher */}
          <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200 shrink-0">
            <button
              id="btn-lang-en"
              onClick={() => onLanguageChange('en')}
              className={`px-2 py-1 text-xs font-bold rounded ${
                currentLang === 'en' ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              } transition-all`}
            >
              EN
            </button>
            <button
              id="btn-lang-mr"
              onClick={() => onLanguageChange('mr')}
              className={`px-2 py-1 text-xs font-bold rounded ${
                currentLang === 'mr' ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              } transition-all`}
            >
              मराठी
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
