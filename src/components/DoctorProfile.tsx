import React from 'react';
import { Award, GraduationCap, Building, ShieldCheck, Stethoscope, FileText, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { doctorDetails } from '../data/clinicData';

interface DoctorProfileProps {
  currentLang: Language;
}

export const DoctorProfile: React.FC<DoctorProfileProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  return (
    <section id="doctor" className="py-12 bg-slate-50 border-y border-slate-200/80">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-5xl mx-auto mb-10">
          <span className="text-xs font-bold text-teal-700 uppercase tracking-widest bg-teal-100/80 px-3 py-1 rounded-full border border-teal-200">
            {t.meetTheSurgeon}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 tracking-tight">
            {currentLang === 'en' ? doctorDetails.name : doctorDetails.marathiName}
          </h2>
          <p className="text-sm sm:text-base text-rose-700 font-semibold mt-1">
            {currentLang === 'en' ? doctorDetails.title : doctorDetails.titleMarathi}
          </p>
          <p className="text-xs font-bold text-slate-500 uppercase mt-1 tracking-wider">
            {doctorDetails.regNo}
          </p>
        </div>

        {/* Doctor Main Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-200">
          
          {/* Left Column: Photo / Visual Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border-4 border-sky-100 shadow-md">
              <img
                src={doctorDetails.photoUrl}
                alt="Dr. Ankita Amar Goklani - Consultant Oral Physician and Dental Surgeon"
                className="w-full h-[380px] object-cover object-top"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 text-white p-3 bg-slate-900/80 backdrop-blur-md rounded-xl border border-white/10">
                <p className="text-xs font-bold text-teal-300 uppercase tracking-wider">{t.regNoLabel}</p>
                <p className="text-sm font-extrabold text-white">{currentLang === 'en' ? doctorDetails.name : doctorDetails.marathiName}</p>
                <p className="text-xs text-sky-200 truncate">{doctorDetails.exRole}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Qualifications & Academic Background */}
          <div className="lg:col-span-7 space-y-6">
            
            <div>
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-teal-600" />
                <span>{currentLang === 'en' ? "Clinical Excellence & Background" : "शैक्षणिक पात्रता व अनुभव"}</span>
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mt-2">
                {currentLang === 'en' ? doctorDetails.bio : doctorDetails.bioMarathi}
              </p>
            </div>

            {/* Qualifications Timeline Box */}
            <div className="space-y-3 bg-sky-50/60 p-4 rounded-xl border border-sky-200/70">
              <h4 className="text-xs font-bold text-sky-900 uppercase tracking-wider flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-teal-600" />
                <span>{currentLang === 'en' ? "Degrees & Academic Honors" : "पदव्या व विशेष पात्रता"}</span>
              </h4>

              <div className="space-y-2.5 text-xs sm:text-sm text-slate-800 font-medium">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900">B.D.S</span> — C.S.M.S.S Dental College, Aurangabad
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900">M.D.S</span> — Govt. Dental College & Hospital, Chh. Sambhaji Nagar
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Building className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900">Ex-Assistant Professor</span> — Ghati Hospital, Chh. Sambhaji Nagar
                  </div>
                </div>
              </div>
            </div>

            {/* Core Values / Specialty Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-teal-50 rounded-xl border border-teal-200 text-center">
                <p className="text-xs font-bold text-teal-900">Oral Physician</p>
                <p className="text-[11px] text-teal-700">Expert Diagnosis</p>
              </div>

              <div className="p-3 bg-sky-50 rounded-xl border border-sky-200 text-center">
                <p className="text-xs font-bold text-sky-900">Dental Surgeon</p>
                <p className="text-[11px] text-sky-700">Precision Surgery</p>
              </div>

              <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-center col-span-2 sm:col-span-1">
                <p className="text-xs font-bold text-rose-900">Reg. A-29912</p>
                <p className="text-[11px] text-rose-700">State Dental Council</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
