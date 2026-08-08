import React, { useState } from 'react';
import { 
  AlertTriangle, Phone, MessageSquare, Clock, Calendar, 
  ChevronDown, ChevronUp, ShieldAlert, Sparkles, HeartPulse, Check, X, Info
} from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface EmergencyDentalCardProps {
  currentLang: Language;
  onBookClick: () => void;
  isOpenNow: boolean;
}

export const EmergencyDentalCard: React.FC<EmergencyDentalCardProps> = ({
  currentLang,
  onBookClick,
  isOpenNow
}) => {
  const t = translations[currentLang];
  const [activeTab, setActiveTab] = useState<'toothache' | 'knockedOut' | 'broken' | 'bleeding'>('toothache');
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const emergencyWhatsAppMsg = encodeURIComponent(
    "URGENT DENTAL ISSUE: Hello Dr. Ankita Goklani, I am experiencing a severe dental emergency outside normal clinic hours. Please advise."
  );
  const whatsappUrl = `https://wa.me/919922300842?text=${emergencyWhatsAppMsg}`;

  const tabs = [
    {
      id: 'toothache',
      titleEn: 'Severe Toothache',
      titleMr: 'तीव्र दातदुखी / सूज',
      icon: '⚡'
    },
    {
      id: 'knockedOut',
      titleEn: 'Knocked-out Tooth',
      titleMr: 'दात तुटणे किंवा पडणे',
      icon: '🦷'
    },
    {
      id: 'broken',
      titleEn: 'Chipped / Broken Tooth',
      titleMr: 'दात चिरडणे किंवा फुटणे',
      icon: '💥'
    },
    {
      id: 'bleeding',
      titleEn: 'Bleeding & Trauma',
      titleMr: 'रक्तस्राव किंवा दुखापत',
      icon: '🩸'
    }
  ];

  return (
    <div id="emergency-dental-card" className="max-w-7xl mx-auto px-4 sm:px-8 my-6">
      <div className="bg-gradient-to-br from-slate-900 via-rose-950/90 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-rose-500/40 relative overflow-hidden transition-all">
        
        {/* Subtle Background Glows */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-rose-500/30">
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-600/30 border border-rose-400/50 flex items-center justify-center text-rose-400 shrink-0 shadow-lg animate-pulse">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="bg-rose-600 text-white text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full shadow-xs">
                  {currentLang === 'en' ? "Emergency Protocol" : "तातडीचे दंत उपचार"}
                </span>

                {!isOpenNow && (
                  <span className="bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-amber-400/30">
                    {currentLang === 'en' ? "Clinic Currently Closed" : "दवाखाना बंद आहे"}
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
                {currentLang === 'en' ? "Emergency Dental Care Guide" : "तातडीची दातदुखी आणि प्रथमोपचार"}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              id="btn-toggle-emergency-card"
              onClick={() => setIsExpanded(!isExpanded)}
              aria-expanded={isExpanded}
              aria-controls="emergency-details-content"
              aria-label={isExpanded ? "Collapse emergency steps" : "Expand emergency steps"}
              className="text-xs font-bold text-rose-200 hover:text-white bg-rose-900/40 hover:bg-rose-900/70 px-3 py-1.5 rounded-xl border border-rose-500/30 focus-visible:ring-2 focus-visible:ring-rose-400 transition-colors flex items-center gap-1"
            >
              <span>{isExpanded ? (currentLang === 'en' ? "Collapse" : "लपवा") : (currentLang === 'en' ? "Expand Steps" : "पहा")}</span>
              {isExpanded ? <ChevronUp className="w-4 h-4" aria-hidden="true" /> : <ChevronDown className="w-4 h-4" aria-hidden="true" />}
            </button>
          </div>

        </div>

        {/* Expandable Emergency Details */}
        {isExpanded && (
          <div id="emergency-details-content" className="mt-6 space-y-6 animate-in fade-in duration-300">
            
            {/* Quick Urgent Hotline Bar */}
            <div className="bg-rose-950/80 border border-rose-500/50 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-inner">
              <div className="space-y-1 text-center md:text-left">
                <p className="text-xs font-bold text-rose-300 uppercase tracking-wider flex items-center justify-center md:justify-start gap-1.5">
                  <HeartPulse className="w-4 h-4 text-rose-400" aria-hidden="true" />
                  <span>{currentLang === 'en' ? "Direct Emergency Helpline" : "तातडीचा संपर्क क्रमांक"}</span>
                </p>
                <p className="text-sm sm:text-base font-extrabold text-white">
                  {currentLang === 'en' 
                    ? "Call Dr. Ankita Goklani's Emergency Line: 9922300842" 
                    : "डॉ. अंकिता गोकलानी यांच्याशी तात्काळ संपर्क साधा: ९९२२३००८४२"}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2.5 w-full md:w-auto">
                <a
                  id="btn-emergency-call-direct"
                  href="tel:9922300842"
                  aria-label="Call emergency hotline at 9922300842"
                  className="bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-black text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 border border-rose-400/40 focus-visible:ring-2 focus-visible:ring-rose-400 transition-transform active:scale-95"
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  <span>{currentLang === 'en' ? "Call 9922300842" : "९९२२३००८४२ वर कॉल करा"}</span>
                </a>

                <a
                  id="btn-emergency-whatsapp-direct"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2 border border-emerald-400/40 transition-transform active:scale-95"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{currentLang === 'en' ? "Emergency WhatsApp" : "व्हॉट्सॲप मेसेज"}</span>
                </a>

                <button
                  id="btn-emergency-priority-book"
                  onClick={onBookClick}
                  className="bg-slate-800 hover:bg-slate-700 text-sky-200 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-slate-600 flex items-center gap-1.5 transition-colors"
                >
                  <Calendar className="w-4 h-4 text-teal-400" />
                  <span>{currentLang === 'en' ? "Book Priority Slot" : "पहिली वेळ बुक करा"}</span>
                </button>
              </div>
            </div>

            {/* Condition Category Tabs */}
            <div className="space-y-3">
              <p className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                {currentLang === 'en' ? "Select Your Specific Condition For First-Aid Steps:" : "तुमची लक्षणे निवडून प्रथमोपचार पहा:"}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {tabs.map((tab) => {
                  const isSelected = activeTab === tab.id;
                  const label = currentLang === 'en' ? tab.titleEn : tab.titleMr;

                  return (
                    <button
                      key={tab.id}
                      id={`btn-emergency-tab-${tab.id}`}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`p-3 rounded-xl border text-left font-bold text-xs transition-all flex items-center gap-2 ${
                        isSelected 
                          ? 'bg-rose-600/30 border-rose-400 text-white shadow-md ring-2 ring-rose-500/50' 
                          : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span className="text-base">{tab.icon}</span>
                      <span className="truncate">{label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Condition Instructions Content */}
            <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800 space-y-4">
              
              {activeTab === 'toothache' && (
                <div className="space-y-3 text-xs sm:text-sm text-slate-200">
                  <h3 className="text-base font-bold text-rose-300 flex items-center gap-2">
                    <span>⚡</span>
                    <span>{currentLang === 'en' ? "Severe Toothache & Swelling Protocol" : "तीव्र दातदुखी आणि गालावर सूज असल्यास काय करावे"}</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                    <div className="bg-emerald-950/30 border border-emerald-500/30 p-3.5 rounded-xl space-y-1.5">
                      <p className="font-extrabold text-emerald-400 flex items-center gap-1.5">
                        <Check className="w-4 h-4" />
                        <span>{currentLang === 'en' ? "DO THIS IMMEDIATELY:" : "हे करा:"}</span>
                      </p>
                      <ul className="space-y-1 text-slate-300 list-disc list-inside text-xs">
                        <li>Rinse gently with warm salt water (1/2 tsp salt in 1 cup water).</li>
                        <li>Apply a cold ice pack to the outside of your cheek (15 mins on / 15 mins off).</li>
                        <li>Gently use dental floss to remove trapped food between teeth.</li>
                        <li>Take an over-the-counter pain reliever if medically safe for you.</li>
                      </ul>
                    </div>

                    <div className="bg-rose-950/30 border border-rose-500/30 p-3.5 rounded-xl space-y-1.5">
                      <p className="font-extrabold text-rose-400 flex items-center gap-1.5">
                        <X className="w-4 h-4" />
                        <span>{currentLang === 'en' ? "DO NOT DO THIS:" : "हे मुळीच करू नका:"}</span>
                      </p>
                      <ul className="space-y-1 text-slate-300 list-disc list-inside text-xs">
                        <li>NEVER place aspirin directly on gums (causes severe chemical burns).</li>
                        <li>Do NOT apply heat or hot compresses to swollen cheeks.</li>
                        <li>Avoid extremely hot, cold, or sugary drinks.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'knockedOut' && (
                <div className="space-y-3 text-xs sm:text-sm text-slate-200">
                  <h3 className="text-base font-bold text-rose-300 flex items-center gap-2">
                    <span>🦷</span>
                    <span>{currentLang === 'en' ? "Knocked-Out (Avulsed) Permanent Tooth" : "मार लागून दात पडला असल्यास (अत्यंत महत्त्वाचे)"}</span>
                  </h3>

                  <div className="p-3 bg-amber-500/10 border border-amber-400/30 rounded-xl text-amber-200 text-xs font-semibold">
                    ⏱️ <strong>CRITICAL WINDOW:</strong> You have 30 to 60 minutes to re-implant a knocked-out permanent tooth for high success!
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-emerald-950/30 border border-emerald-500/30 p-3.5 rounded-xl space-y-1.5">
                      <p className="font-extrabold text-emerald-400 flex items-center gap-1.5">
                        <Check className="w-4 h-4" />
                        <span>{currentLang === 'en' ? "DO THIS IMMEDIATELY:" : "हे करा:"}</span>
                      </p>
                      <ul className="space-y-1 text-slate-300 list-disc list-inside text-xs">
                        <li>Pick up the tooth ONLY by the white crown. Do NOT touch the root!</li>
                        <li>If dirty, gently rinse with cold fresh milk or saline for 2 seconds.</li>
                        <li>Try reinserting the tooth gently back into its socket if possible.</li>
                        <li>Otherwise, keep the tooth submerged in a small cup of cold fresh milk.</li>
                      </ul>
                    </div>

                    <div className="bg-rose-950/30 border border-rose-500/30 p-3.5 rounded-xl space-y-1.5">
                      <p className="font-extrabold text-rose-400 flex items-center gap-1.5">
                        <X className="w-4 h-4" />
                        <span>{currentLang === 'en' ? "DO NOT DO THIS:" : "हे मुळीच करू नका:"}</span>
                      </p>
                      <ul className="space-y-1 text-slate-300 list-disc list-inside text-xs">
                        <li>Do NOT scrub, brush, or use soap on the tooth root.</li>
                        <li>Do NOT wrap the tooth in dry tissue or cloth.</li>
                        <li>Do NOT store in plain tap water.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'broken' && (
                <div className="space-y-3 text-xs sm:text-sm text-slate-200">
                  <h3 className="text-base font-bold text-rose-300 flex items-center gap-2">
                    <span>💥</span>
                    <span>{currentLang === 'en' ? "Chipped or Fractured Tooth" : "दात तुटणे किंवा चीर जाणे"}</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-emerald-950/30 border border-emerald-500/30 p-3.5 rounded-xl space-y-1.5">
                      <p className="font-extrabold text-emerald-400 flex items-center gap-1.5">
                        <Check className="w-4 h-4" />
                        <span>{currentLang === 'en' ? "RECOMMENDED STEPS:" : "प्रथमोपचार:"}</span>
                      </p>
                      <ul className="space-y-1 text-slate-300 list-disc list-inside text-xs">
                        <li>Rinse your mouth thoroughly with clean warm water.</li>
                        <li>Save any broken tooth fragments and store them in clean milk.</li>
                        <li>If there are sharp edges cutting your tongue, cover with clean sugar-free gum or dental wax.</li>
                        <li>Apply cold compress to lip/cheek if there is soft tissue swelling.</li>
                      </ul>
                    </div>

                    <div className="bg-rose-950/30 border border-rose-500/30 p-3.5 rounded-xl space-y-1.5">
                      <p className="font-extrabold text-rose-400 flex items-center gap-1.5">
                        <X className="w-4 h-4" />
                        <span>{currentLang === 'en' ? "WHAT TO AVOID:" : "काय टाळावे:"}</span>
                      </p>
                      <ul className="space-y-1 text-slate-300 list-disc list-inside text-xs">
                        <li>Do NOT chew food on the damaged side of your jaw.</li>
                        <li>Avoid hard, crunchy, hot, or frozen food items.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'bleeding' && (
                <div className="space-y-3 text-xs sm:text-sm text-slate-200">
                  <h3 className="text-base font-bold text-rose-300 flex items-center gap-2">
                    <span>🩸</span>
                    <span>{currentLang === 'en' ? "Oral Bleeding & Trauma Care" : "हिरडीतून रक्त येणे किंवा तोंडाला दुखापत"}</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-emerald-950/30 border border-emerald-500/30 p-3.5 rounded-xl space-y-1.5">
                      <p className="font-extrabold text-emerald-400 flex items-center gap-1.5">
                        <Check className="w-4 h-4" />
                        <span>{currentLang === 'en' ? "PRESSURE STEPS:" : "रक्त थांबवण्याचे उपाय:"}</span>
                      </p>
                      <ul className="space-y-1 text-slate-300 list-disc list-inside text-xs">
                        <li>Apply firm, steady pressure directly with clean sterile gauze or cotton for 15-20 minutes.</li>
                        <li>Sit upright and tilt head slightly forward so blood doesn't drain into throat.</li>
                        <li>Bite down gently on a moistened black tea bag if gauze is unavailable (tannins help clot).</li>
                      </ul>
                    </div>

                    <div className="bg-rose-950/30 border border-rose-500/30 p-3.5 rounded-xl space-y-1.5">
                      <p className="font-extrabold text-rose-400 flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-rose-400" />
                        <span>{currentLang === 'en' ? "HOSPITAL RED FLAGS:" : "हॉस्पिटलमध्ये केव्हा जावे:"}</span>
                      </p>
                      <ul className="space-y-1 text-slate-300 list-disc list-inside text-xs">
                        <li>Uncontrollable bleeding lasting over 30 minutes despite pressure.</li>
                        <li>Difficulty breathing or swallowing due to throat swelling.</li>
                        <li>Jaw dislocation or suspected facial bone fracture.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* General Disclaimer */}
            <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
              <Info className="w-4 h-4 text-sky-400 shrink-0" />
              <span>
                {currentLang === 'en' 
                  ? "This guide is for emergency first-aid orientation. For severe physical trauma or life-threatening facial injuries, visit your nearest emergency casualty ward immediately."
                  : "ही माहिती प्रथमोपचारासाठी आहे. गंभीर अपघात किंवा श्वसनाचा त्रास असल्यास जवळच्या रुग्णालयात तात्काळ जावे."}
              </span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
