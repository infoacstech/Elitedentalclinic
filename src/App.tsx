import React, { useState, useEffect } from 'react';
import { Language } from './types';
import { translations } from './data/translations';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { DoctorProfile } from './components/DoctorProfile';
import { FacilitiesGrid } from './components/FacilitiesGrid';
import { AppointmentModal } from './components/AppointmentModal';
import { SmileConsultantAI } from './components/SmileConsultantAI';
import { SmileGallery } from './components/SmileGallery';
import { ReviewsAndFaqs } from './components/ReviewsAndFaqs';
import { ClinicLocationTimings } from './components/ClinicLocationTimings';
import { MobileActionBar } from './components/MobileActionBar';
import { EmergencyDentalCard } from './components/EmergencyDentalCard';
import { ToastContainer, ToastMessage } from './components/Toast';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { PWAInstallPrompt } from './components/PWAInstallPrompt';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [preSelectedFacility, setPreSelectedFacility] = useState<string>('');
  const [isOpenNow, setIsOpenNow] = useState(false); // Default to closed for demonstration/safety or auto-calc
  const [manualOverrideStatus, setManualOverrideStatus] = useState<boolean | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (toast: { title: string; message: string; type: 'success' | 'error' | 'info' }) => {
    const newToast: ToastMessage = {
      id: Date.now().toString(),
      ...toast,
    };
    setToasts((prev) => [...prev, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Check clinic open/closed status based on actual local time
  useEffect(() => {
    const checkClinicStatus = () => {
      if (manualOverrideStatus !== null) return;
      
      const now = new Date();
      const day = now.getDay(); // 0 is Sunday
      const hours = now.getHours();

      if (day === 0) {
        // Sunday - Appointment Basis
        setIsOpenNow(false);
      } else {
        // Mon-Sat: 10 AM to 2 PM (10-14) & 5 PM to 9 PM (17-21)
        const isMorning = hours >= 10 && hours < 14;
        const isEvening = hours >= 17 && hours < 21;
        setIsOpenNow(isMorning || isEvening);
      }
    };

    checkClinicStatus();
    const interval = setInterval(checkClinicStatus, 60000);
    return () => clearInterval(interval);
  }, [manualOverrideStatus]);

  const activeIsOpen = manualOverrideStatus !== null ? manualOverrideStatus : isOpenNow;

  const handleOpenAppointment = (facilityName?: string) => {
    if (facilityName) {
      setPreSelectedFacility(facilityName);
    } else {
      setPreSelectedFacility('');
    }
    setIsAppointmentOpen(true);
  };

  const handleCloseAppointment = () => {
    setIsAppointmentOpen(false);
    setPreSelectedFacility('');
  };

  const scrollToAi = () => {
    const el = document.getElementById('ai-assistant');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const t = translations[currentLang];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased pb-16 md:pb-0 selection:bg-teal-500 selection:text-white">
      {/* Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* PWA Install Banner */}
      <PWAInstallPrompt currentLang={currentLang} />
      
      {/* Sticky Header */}
      <Header
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        onBookClick={() => handleOpenAppointment()}
        isOpenNow={activeIsOpen}
        onToggleStatus={() => setManualOverrideStatus(!activeIsOpen)}
      />

      <main>
        {/* 16:9 Professional Hero Banner Section */}
        <Hero
          currentLang={currentLang}
          onBookClick={() => handleOpenAppointment()}
          onAiConsultClick={scrollToAi}
        />

        {/* Emergency Dental Care Info Card (Prominently rendered when clinic status is closed) */}
        {!activeIsOpen ? (
          <EmergencyDentalCard
            currentLang={currentLang}
            onBookClick={() => handleOpenAppointment()}
            isOpenNow={activeIsOpen}
          />
        ) : (
          /* Notice banner allowing users to open emergency protocol even when clinic is open */
          <div className="max-w-7xl mx-auto px-4 sm:px-8 my-4">
            <div className="bg-slate-50 border border-rose-200 rounded-2xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-rose-800 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span>
                  {currentLang === 'en'
                    ? "Clinic is currently OPEN. In case of urgent dental trauma, review our emergency first-aid protocols."
                    : "दवाखाना सुरू आहे. तातडीच्या प्रसंगी प्रथमोपचाराची माहिती पाहण्यासाठी खालील बटणावर क्लिक करा."}
                </span>
              </div>
              <button
                id="btn-show-emergency-modal-open"
                onClick={() => setManualOverrideStatus(false)}
                className="bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold px-3 py-1.5 rounded-xl border border-rose-300 shrink-0 transition-colors"
              >
                {currentLang === 'en' ? "View Emergency Protocols" : "प्रथमोपचार मार्गदर्शक पहा"}
              </button>
            </div>
          </div>
        )}

        {/* Doctor Profile Section ("Meet Your Surgeon") */}
        <DoctorProfile
          currentLang={currentLang}
        />

        {/* Facilities & Treatments Grid (9 Brochure Items) */}
        <FacilitiesGrid
          currentLang={currentLang}
          onBookFacility={(facilityName) => handleOpenAppointment(facilityName)}
        />

        {/* Interactive AI Dental Health Assistant */}
        <SmileConsultantAI
          currentLang={currentLang}
          onBookClick={() => handleOpenAppointment()}
        />

        {/* Before & After Smile Gallery */}
        <SmileGallery
          currentLang={currentLang}
        />

        {/* Testimonials & FAQs */}
        <ReviewsAndFaqs
          currentLang={currentLang}
        />

        {/* Location, Address, Map & Operating Timings */}
        <ClinicLocationTimings
          currentLang={currentLang}
          onBookClick={() => handleOpenAppointment()}
          isOpenNow={isOpenNow}
        />
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 text-xs py-8 px-4 sm:px-8 border-t border-slate-900">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <p className="font-bold text-slate-200">
              Dr. Ankita Goklani's Elite Dental Care | {t.marathiClinicTitleTag}
            </p>
            <p className="text-slate-500 mt-0.5">
              71/A, C/O Dr. S.S. Nathani's Sunny Clinic, Jawahar Colony, Chhatrapati Sambhajinagar. Call: 9922300842
            </p>
          </div>

          <p className="text-slate-500 text-[11px]">
            Reg. No. A-29912 | B.D.S (Aurangabad), M.D.S (GDC Sambhajinagar)
          </p>
        </div>
      </footer>

      {/* Booking Modal */}
      <AppointmentModal
        isOpen={isAppointmentOpen}
        onClose={handleCloseAppointment}
        currentLang={currentLang}
        preSelectedFacility={preSelectedFacility}
        onSuccessToast={addToast}
      />

      {/* Global Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      {/* Mobile Sticky Floating Action Bar */}
      <MobileActionBar
        currentLang={currentLang}
        onBookClick={() => handleOpenAppointment()}
      />

    </div>
  );
}
