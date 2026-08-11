import React from 'react';
import { MapPin, Phone, Clock, Calendar, Navigation, ShieldCheck, Sparkles, MessageSquare } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface ClinicLocationTimingsProps {
  currentLang: Language;
  onBookClick: () => void;
  isOpenNow: boolean;
}

export const ClinicLocationTimings: React.FC<ClinicLocationTimingsProps> = ({
  currentLang,
  onBookClick,
  isOpenNow
}) => {
  const t = translations[currentLang];

  const mapSearchUrl = "https://www.google.com/maps/search/?api=1&query=71/A,+Sunny+Clinic,+New+Shantiniketan+Colony,+Jawahar+Colony,+Chhatrapati+Sambhajinagar";

  return (
    <section id="contact" className="py-12 bg-white border-t border-slate-200">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-8">
        
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full filter blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-500/10 rounded-full filter blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Address & Contact Details */}
            <div className="lg:col-span-7 space-y-6">
              
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold uppercase tracking-wider mb-3 border border-teal-400/30">
                  <MapPin className="w-3.5 h-3.5 text-teal-400" />
                  <span>Chhatrapati Sambhajinagar Clinic</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {currentLang === 'en' ? "Dr. Ankita Goklani's Elite Dental Care" : "डॉ. अंकिता गोकलानीज् एलाईट डेंटल केअर"}
                </h2>

                <p className="text-sky-200 text-xs sm:text-sm font-semibold mt-1">
                  {currentLang === 'en' ? "Consultant Oral Physician & Dental Surgeon" : "कन्सルトंट ओरल फिजिशियन आणि दंत शल्यचिकित्सक"} (Reg. No. A-29912)
                </p>
              </div>

              {/* Address Card */}
              <div className="bg-slate-800/80 p-4 sm:p-5 rounded-2xl border border-slate-700/80 space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Clinic Address</h3>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium mt-0.5">
                      {t.clinicAddress}
                    </p>
                    <p className="text-[11px] text-teal-300 font-semibold mt-1">
                      Landmark: C/O Dr. S.S. Nathani's Sunny Clinic
                    </p>
                  </div>
                </div>

                {/* Embedded Interactive Google Map */}
                <div className="rounded-xl overflow-hidden border border-slate-700/80 shadow-md relative group h-44 sm:h-52">
                  <iframe
                    title="Dr. Ankita Goklani's Elite Dental Care Location Map"
                    src="https://maps.google.com/maps?q=71/A,%20Sunny%20Clinic,%20New%20Shantiniketan%20Colony,%20Jawahar%20Colony,%20Chhatrapati%20Sambhajinagar&t=&z=16&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full border-0 transition-opacity"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-slate-900/90 backdrop-blur-md p-2 rounded-lg border border-white/10 flex items-center justify-between gap-2 shadow-md">
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-300">
                      <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      <span className="font-semibold truncate">Jawahar Colony, Chhatrapati Sambhajinagar</span>
                    </div>
                    <a
                      id="btn-map-embed-directions"
                      href={mapSearchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Get directions to clinic on Google Maps"
                      className="bg-teal-600 hover:bg-teal-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1 shrink-0 focus-visible:ring-2 focus-visible:ring-teal-300 transition-colors"
                    >
                      <Navigation className="w-3 h-3" aria-hidden="true" />
                      <span>{t.getDirections}</span>
                    </a>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-700/60">
                  <a
                    href="tel:9922300842"
                    id="btn-location-phone-link"
                    aria-label="Call clinic at 9922300842"
                    className="flex items-center gap-2 text-white hover:text-teal-300 text-xs sm:text-sm font-bold bg-slate-700/80 hover:bg-slate-700 px-3 py-2 rounded-xl border border-slate-600 focus-visible:ring-2 focus-visible:ring-teal-400 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-teal-400" aria-hidden="true" />
                    <span>Call 9922300842</span>
                  </a>

                  <a
                    id="btn-location-directions-link"
                    href={mapSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open Google Maps for clinic directions"
                    className="flex items-center gap-1.5 text-sky-200 hover:text-white text-xs font-semibold px-3 py-2 rounded-xl bg-slate-700/40 hover:bg-slate-700/80 border border-slate-600 focus-visible:ring-2 focus-visible:ring-teal-400 transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5 text-sky-400" aria-hidden="true" />
                    <span>{t.getDirections} (Google Maps)</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Right Column: Timings & Operating Status */}
            <div className="lg:col-span-5 bg-slate-800/90 p-6 rounded-2xl border border-slate-700 space-y-5">
              
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-teal-400" />
                  <span>Clinic Timings</span>
                </h3>

                <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                  isOpenNow ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40' : 'bg-amber-500/20 text-amber-200 border-amber-400/40'
                }`}>
                  {isOpenNow ? t.openNow : t.closedNow}
                </span>
              </div>

              {/* Timing slots list */}
              <div className="space-y-3 text-xs sm:text-sm text-slate-200">
                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-700/80 flex items-center justify-between">
                  <span className="font-semibold text-slate-300">Morning Slot:</span>
                  <span className="font-bold text-teal-300">10:00 AM – 2:00 PM</span>
                </div>

                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-700/80 flex items-center justify-between">
                  <span className="font-semibold text-slate-300">Evening Slot:</span>
                  <span className="font-bold text-teal-300">5:00 PM – 9:00 PM</span>
                </div>

                <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-700/80 flex items-center justify-between">
                  <span className="font-semibold text-slate-300">Sunday:</span>
                  <span className="font-bold text-rose-300">On Appointment Basis</span>
                </div>
              </div>

              {/* Book Appointment CTA */}
              <button
                id="btn-location-book-slot"
                onClick={onBookClick}
                className="w-full bg-gradient-to-r from-teal-500 to-sky-600 hover:from-teal-600 hover:to-sky-700 text-white font-bold py-3 rounded-xl text-xs sm:text-sm shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>{t.bookAppointment}</span>
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
