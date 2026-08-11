import React, { useState, useEffect } from 'react';
import { Lightbulb, X, RefreshCw, Sparkles } from 'lucide-react';
import { Language } from '../types';

interface DailyDentalTipCardProps {
  currentLang: Language;
}

interface Tip {
  id: number;
  en: string;
  mr: string;
  categoryEn: string;
  categoryMr: string;
}

const DENTAL_TIPS: Tip[] = [
  {
    id: 1,
    en: "Brush twice daily for 2 full minutes using a soft-bristled toothbrush to prevent plaque build-up.",
    mr: "प्लेक तयार होऊ नये म्हणून मऊ ब्रशने दिवसातून दोनदा २ मिनिटे स्वच्छ ब्रश करा.",
    categoryEn: "Brushing Habit",
    categoryMr: "ब्रशिंग सवय",
  },
  {
    id: 2,
    en: "Floss at least once a day to clean food particles trapped between teeth where bristles cannot reach.",
    mr: "टूथब्रश पोहचू शकत नाही अशा दातांमधील अन्नकण काढण्यासाठी रोज फ्लॉस करा.",
    categoryEn: "Interdental Care",
    categoryMr: "दात अंतर स्वच्छता",
  },
  {
    id: 3,
    en: "Replace your toothbrush every 3 months or sooner if the bristles are frayed or worn out.",
    mr: "दर ३ महिन्यांनी किंवा ब्रशचे केस खराब झाल्यास लगेच नवीन टूथब्रश वापरा.",
    categoryEn: "Hygiene Tool",
    categoryMr: "टूथब्रश काळजी",
  },
  {
    id: 4,
    en: "Rinse thoroughly with water after drinking tea, coffee, or acidic beverages to protect enamel.",
    mr: "एनॅमलचे रक्षण करण्यासाठी चहा, कॉफी किंवा आम्लयुक्त पेये घेतल्यानंतर पाण्याने गुळणी करा.",
    categoryEn: "Enamel Protection",
    categoryMr: "एनॅमल सुरक्षा",
  },
  {
    id: 5,
    en: "Never skip brushing before bedtime! Saliva decreases during sleep, letting bacteria multiply faster.",
    mr: "रात्री झोपण्यापूर्वी ब्रश करणे टाळू नका! झोपेत लाळ कमी असल्याने जंतू वेगाने वाढतात.",
    categoryEn: "Night Care",
    categoryMr: "रात्रीची काळजी",
  },
  {
    id: 6,
    en: "Clean your tongue gently using a scraper or soft bristles daily to keep breath fresh.",
    mr: "तोंडाची दुर्गंधी रोखण्यासाठी दररोज जिभलीने किंवा मऊ टूथब्रशने जीभ स्वच्छ करा.",
    categoryEn: "Fresh Breath",
    categoryMr: "ताजी श्वास",
  },
  {
    id: 7,
    en: "Schedule a routine professional scaling & check-up with Dr. Ankita Goklani every 6 months.",
    mr: "दर ६ महिन्यांनी डॉ. अंकिता गोकलानी यांच्याकडे नियमित तपासणी आणि स्केलिंग करा.",
    categoryEn: "Routine Checkup",
    categoryMr: "नियमित तपासणी",
  },
];

export const DailyDentalTipCard: React.FC<DailyDentalTipCardProps> = ({ currentLang }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [tipIndex, setTipIndex] = useState(0);

  // Pick tip based on day of year so it changes daily automatically
  useEffect(() => {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - startOfYear.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    setTipIndex(dayOfYear % DENTAL_TIPS.length);
  }, []);

  const handleNextTip = () => {
    setTipIndex((prev) => (prev + 1) % DENTAL_TIPS.length);
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  const currentTip = DENTAL_TIPS[tipIndex];

  return (
    <div className="relative bg-gradient-to-r from-slate-900/95 via-teal-950/80 to-slate-900/95 backdrop-blur-md border border-teal-500/30 rounded-2xl p-4 sm:p-5 shadow-xl transition-all duration-300">
      <div className="flex items-start gap-3.5">
        {/* Glowing Icon Container */}
        <div className="p-2.5 rounded-xl bg-teal-500/20 border border-teal-400/30 text-teal-300 shrink-0 mt-0.5">
          <Lightbulb className="w-5 h-5 text-amber-400 animate-pulse" />
        </div>

        {/* Content Area */}
        <div className="flex-1 min-w-0 pr-6">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-500/10 px-2.5 py-0.5 rounded-full border border-teal-500/20">
              <Sparkles className="w-3 h-3" />
              {currentLang === 'en' ? 'Daily Dental Tip' : 'दैनिक दंत सल्ला'}
            </span>
            <span className="text-[11px] text-slate-400 font-medium">
              • {currentLang === 'en' ? currentTip.categoryEn : currentTip.categoryMr}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed">
            "{currentLang === 'en' ? currentTip.en : currentTip.mr}"
          </p>

          {/* Controls */}
          <div className="mt-2.5 flex items-center gap-3">
            <button
              onClick={handleNextTip}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors"
              title={currentLang === 'en' ? 'Show another tip' : 'दुसरा सल्ला पहा'}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{currentLang === 'en' ? 'Another Tip' : 'नवीन सल्ला'}</span>
            </button>
            <span className="text-slate-600 text-xs">|</span>
            <span className="text-[11px] text-slate-400">
              {currentLang === 'en' ? 'Tip of the day' : 'आजचा विशेष सल्ला'}
            </span>
          </div>
        </div>

        {/* Close / Dismiss Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/80 transition-colors"
          aria-label="Dismiss tip"
          title={currentLang === 'en' ? 'Dismiss' : 'बंद करा'}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
