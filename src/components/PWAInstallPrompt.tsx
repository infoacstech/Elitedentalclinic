import React, { useState, useEffect } from 'react';
import { Download, X, Share } from 'lucide-react';
import { Language } from '../types';

interface PWAInstallPromptProps {
  currentLang: Language;
}

export const PWAInstallPrompt: React.FC<PWAInstallPromptProps> = ({ currentLang }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Remove stale localStorage key so previous dismissals do not permanently block fresh uninstalls
    localStorage.removeItem('pwa_prompt_dismissed');

    // Detect if running in standalone mode (currently inside the installed PWA)
    const checkIsStandalone = () => {
      return (
        window.matchMedia('(display-mode: standalone)').matches ||
        (navigator as any).standalone === true ||
        document.referrer.includes('android-app://')
      );
    };

    if (checkIsStandalone()) {
      setIsInstalled(true);
      return;
    }

    // Detect iOS devices
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent) && !(window as any).MSStream;
    setIsIOS(isIosDevice);

    const isSessionDismissed = sessionStorage.getItem('pwa_prompt_dismissed_session') === 'true';

    // Handler for Chrome / Android / Desktop beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      if (!isSessionDismissed) {
        setIsVisible(true);
      }
    };

    // Handler for app installation completion
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsVisible(false);
      setDeferredPrompt(null);
      sessionStorage.removeItem('pwa_prompt_dismissed_session');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // If iOS Safari and not dismissed and not installed
    if (isIosDevice && !isSessionDismissed) {
      setIsVisible(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
      setIsVisible(false);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('pwa_prompt_dismissed_session', 'true');
  };

  if (!isVisible || isInstalled) return null;

  return (
    <div className="fixed top-12 left-2 right-2 sm:left-auto sm:right-4 sm:top-16 z-50 max-w-sm bg-slate-900/95 text-white p-3.5 rounded-2xl border border-teal-500/40 shadow-2xl backdrop-blur-md animate-in slide-in-from-top-4 duration-300">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="Elite Dental Logo" className="w-10 h-10 object-contain p-0.5 rounded-xl bg-white shrink-0 shadow-md" />
          <div>
            <h4 className="text-xs font-bold text-teal-300">
              {currentLang === 'en' ? "Install Elite Dental App" : "ॲप इन्स्टॉल करा"}
            </h4>
            <p className="text-[11px] text-slate-300 leading-tight mt-0.5">
              {currentLang === 'en' ? "Fast access, offline availability & instant booking." : "जलद प्रवेश आणि ऑफलाइन सुविधा."}
            </p>
          </div>
        </div>

        <button
          onClick={handleDismiss}
          aria-label="Close install prompt"
          className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors shrink-0"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>

      <div className="mt-3 flex items-center gap-2">
        {isIOS && !deferredPrompt ? (
          <div className="text-[11px] text-teal-200 bg-teal-950/60 p-2 rounded-xl border border-teal-800/50 flex items-center gap-2 w-full">
            <Share className="w-4 h-4 text-teal-400 shrink-0" />
            <span>
              {currentLang === 'en'
                ? "Tap Share button below, then 'Add to Home Screen'"
                : "खालील शेअर बटणावर टॅप करा, नंतर 'होम स्क्रीनवर जोडा'"}
            </span>
          </div>
        ) : (
          <>
            <button
              onClick={handleInstallClick}
              className="flex-1 bg-gradient-to-r from-teal-500 to-sky-500 hover:from-teal-600 hover:to-sky-600 text-white font-extrabold text-xs py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
            >
              <Download className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{currentLang === 'en' ? "Install App" : "इन्स्टॉल करा"}</span>
            </button>
            <button
              onClick={handleDismiss}
              className="px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-xl border border-slate-700 transition-colors"
            >
              {currentLang === 'en' ? "Later" : "नंतर"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

