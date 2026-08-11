import React, { useState } from 'react';
import { Bot, Sparkles, X, ArrowRight } from 'lucide-react';
import { Language } from '../types';

interface FloatingAiWidgetProps {
  currentLang: Language;
}

export const FloatingAiWidget: React.FC<FloatingAiWidgetProps> = ({ currentLang }) => {
  const [isOpenTooltip, setIsOpenTooltip] = useState(true);

  const handleScrollToAi = () => {
    const aiSection = document.getElementById('ai-assistant');
    if (aiSection) {
      aiSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Floating Popup Nudge Tooltip */}
      {isOpenTooltip && (
        <div className="bg-slate-900 text-white p-3.5 rounded-2xl shadow-2xl border border-slate-700 max-w-[260px] animate-bounce-subtle relative flex items-start gap-2.5 text-xs">
          <div className="w-8 h-8 rounded-full bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-300 shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4 text-teal-400" />
          </div>

          <div className="flex-1">
            <p className="font-bold text-teal-300">
              {currentLang === 'en' ? "AI Dental Assistant" : "एआय दंत सल्लागार"}
            </p>
            <p className="text-[11px] text-slate-300 leading-snug mt-0.5">
              {currentLang === 'en' 
                ? "Ask toothache remedies, RCT details or clinic timings!"
                : "दातदुखी, रूट कॅनाल किंवा वेळेबद्दल प्रश्न विचारा!"}
            </p>
            <button
              onClick={handleScrollToAi}
              className="mt-2 text-[11px] font-extrabold text-sky-400 hover:text-sky-300 flex items-center gap-1 transition-colors"
            >
              <span>{currentLang === 'en' ? "Start AI Chat" : "चॅट करा"}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <button
            onClick={() => setIsOpenTooltip(false)}
            className="text-slate-400 hover:text-white p-0.5 rounded-full transition-colors"
            aria-label="Close tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        id="btn-floating-ai"
        onClick={handleScrollToAi}
        aria-label="Ask AI Dental Assistant"
        className="group relative flex items-center justify-center w-14 h-14 bg-gradient-to-r from-teal-500 to-sky-600 hover:from-teal-600 hover:to-sky-700 text-white rounded-full shadow-2xl ring-4 ring-white/20 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
      >
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 border-2 border-slate-900 rounded-full animate-ping" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 border-2 border-slate-900 rounded-full" />
        <Bot className="w-7 h-7 text-white transition-transform group-hover:rotate-12" />
      </button>
    </div>
  );
};
