import React from 'react';
import { Phone, Calendar, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface MobileActionBarProps {
  currentLang: Language;
  onBookClick: () => void;
}

export const MobileActionBar: React.FC<MobileActionBarProps> = ({ currentLang, onBookClick }) => {
  const t = translations[currentLang];

  const waMessage = encodeURIComponent(
    "Hello Dr. Ankita Goklani's Elite Dental Care, I would like to inquire about an appointment/consultation."
  );
  const whatsappUrl = `https://wa.me/919922300842?text=${waMessage}`;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 p-2.5 px-4 shadow-2xl">
      <div className="flex items-center justify-between gap-2 max-w-md mx-auto">
        
        {/* Call Button */}
        <a
          id="btn-mobile-call"
          href="tel:9922300842"
          className="flex-1 bg-slate-800 hover:bg-slate-700 text-sky-200 font-bold py-2.5 px-3 rounded-xl border border-slate-700 text-xs flex items-center justify-center gap-1.5 transition-colors"
        >
          <Phone className="w-4 h-4 text-teal-400" />
          <span>Call</span>
        </a>

        {/* WhatsApp Button */}
        <motion.a
          id="btn-mobile-whatsapp"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="flex-1 bg-emerald-700 hover:bg-emerald-600 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
        >
          <MessageSquare className="w-4 h-4" />
          <span>WhatsApp</span>
        </motion.a>

        {/* Book Button (Primary CTA with glowing breathing effect) */}
        <motion.button
          id="btn-mobile-book"
          onClick={onBookClick}
          animate={{
            scale: [1, 1.04, 1],
            boxShadow: [
              '0 4px 6px -1px rgba(14, 165, 233, 0.2), 0 2px 4px -2px rgba(14, 165, 233, 0.1)',
              '0 10px 15px -3px rgba(20, 184, 166, 0.4), 0 4px 6px -4px rgba(20, 184, 166, 0.2)',
              '0 4px 6px -1px rgba(14, 165, 233, 0.2), 0 2px 4px -2px rgba(14, 165, 233, 0.1)'
            ]
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex-1 bg-gradient-to-r from-teal-500 to-sky-600 hover:from-teal-600 hover:to-sky-700 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
        >
          <Calendar className="w-4 h-4" />
          <span>Book</span>
        </motion.button>

      </div>
    </div>
  );
};
