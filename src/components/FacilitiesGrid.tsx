import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Scan, Sparkles, Activity, ShieldCheck, Smile, CheckCircle2, 
  Stethoscope, Heart, Grid, Search, Clock, ChevronRight, X, Calendar, ArrowRight, Info
} from 'lucide-react';
import { Language, Facility } from '../types';
import { translations } from '../data/translations';
import { facilitiesData } from '../data/clinicData';

interface FacilitiesGridProps {
  currentLang: Language;
  onBookFacility: (facilityName: string) => void;
}

export const FacilitiesGrid: React.FC<FacilitiesGridProps> = ({ currentLang, onBookFacility }) => {
  const t = translations[currentLang];
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFacility, setActiveFacility] = useState<Facility | null>(null);

  // Icon mapper helper
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Scan': return <Scan className="w-6 h-6 text-teal-600" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-teal-600" />;
      case 'Activity': return <Activity className="w-6 h-6 text-teal-600" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-teal-600" />;
      case 'Smile': return <Smile className="w-6 h-6 text-teal-600" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-6 h-6 text-teal-600" />;
      case 'Stethoscope': return <Stethoscope className="w-6 h-6 text-teal-600" />;
      case 'Heart': return <Heart className="w-6 h-6 text-teal-600" />;
      case 'Grid': return <Grid className="w-6 h-6 text-teal-600" />;
      default: return <Sparkles className="w-6 h-6 text-teal-600" />;
    }
  };

  const filteredFacilities = facilitiesData.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const title = currentLang === 'en' ? item.titleEn : item.titleMr;
    const desc = currentLang === 'en' ? item.shortDescEn : item.shortDescMr;
    const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase()) || desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="facilities" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>* {t.availableFacilitiesHeader} *</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {currentLang === 'en' ? "Comprehensive Dental Facilities" : "उपलब्ध सुविधा (दातांचा दवाखाना)"}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            {t.availableFacilitiesSubHeader}
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-slate-50 p-3 rounded-2xl border border-slate-200">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              id="filter-cat-all"
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                selectedCategory === 'all' ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200/60'
              }`}
            >
              {t.allCategories}
            </button>
            <button
              id="filter-cat-preventive"
              onClick={() => setSelectedCategory('preventive')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                selectedCategory === 'preventive' ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200/60'
              }`}
            >
              {t.preventive}
            </button>
            <button
              id="filter-cat-restorative"
              onClick={() => setSelectedCategory('restorative')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                selectedCategory === 'restorative' ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200/60'
              }`}
            >
              {t.restorative}
            </button>
            <button
              id="filter-cat-surgical"
              onClick={() => setSelectedCategory('surgical')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                selectedCategory === 'surgical' ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200/60'
              }`}
            >
              {t.surgical}
            </button>
            <button
              id="filter-cat-cosmetic"
              onClick={() => setSelectedCategory('cosmetic')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                selectedCategory === 'cosmetic' ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200/60'
              }`}
            >
              {t.cosmetic}
            </button>
            <button
              id="filter-cat-pediatric"
              onClick={() => setSelectedCategory('pediatric')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                selectedCategory === 'pediatric' ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200/60'
              }`}
            >
              {t.pediatric}
            </button>
          </div>

          {/* Search Field */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="input-facility-search"
              type="text"
              placeholder={t.searchFacilities}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white text-slate-800 text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        {/* Facilities Cards Grid (3 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFacilities.map((facility, index) => {
            const title = currentLang === 'en' ? facility.titleEn : facility.titleMr;
            const subtitle = currentLang === 'en' ? facility.titleMr : facility.titleEn;
            const desc = currentLang === 'en' ? facility.shortDescEn : facility.shortDescMr;
            const badge = currentLang === 'en' ? facility.badgeEn : facility.badgeMr;

            return (
              <motion.div
                key={facility.id}
                id={`facility-card-${facility.id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: (index % 6) * 0.08, ease: "easeOut" }}
                className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-teal-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
              >
                <div className="space-y-4">
                  {/* Top Bar inside Card */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center group-hover:scale-110 group-hover:bg-teal-50 transition-all">
                      {renderIcon(facility.iconName)}
                    </div>

                    {badge && (
                      <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 bg-teal-50 text-teal-800 rounded-full border border-teal-200">
                        {badge}
                      </span>
                    )}
                  </div>

                  {/* Titles */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                      {title}
                    </h3>
                    <p className="text-xs font-semibold text-rose-600 mt-0.5">
                      {subtitle}
                    </p>
                  </div>

                  {/* Short description */}
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {desc}
                  </p>

                  {/* Procedure Metadata */}
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium pt-2 border-t border-slate-100">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-teal-600" />
                      {facility.durationMinutes} mins
                    </span>
                    <span>•</span>
                    <span className="text-teal-700 font-semibold">
                      {facility.painLevel}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    id={`btn-facility-details-${facility.id}`}
                    onClick={() => setActiveFacility(facility)}
                    className="text-xs font-bold text-teal-700 hover:text-teal-900 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  >
                    <span>{t.facilityDetails}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    id={`btn-facility-book-${facility.id}`}
                    onClick={() => onBookFacility(facility.titleEn)}
                    className="bg-sky-50 hover:bg-teal-600 hover:text-white text-teal-800 text-xs font-semibold px-3 py-1.5 rounded-lg border border-sky-200 transition-colors"
                  >
                    Book Slot
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Facility Detail Modal */}
      {activeFacility && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl my-8 border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Close Button */}
            <button
              id="btn-close-facility-modal"
              onClick={() => setActiveFacility(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-start gap-4 mb-6 pr-8">
              <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center shrink-0">
                {renderIcon(activeFacility.iconName)}
              </div>

              <div>
                <span className="text-[10px] font-bold text-teal-700 uppercase tracking-wider bg-teal-50 px-2 py-0.5 rounded-md">
                  {activeFacility.category}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">
                  {currentLang === 'en' ? activeFacility.titleEn : activeFacility.titleMr}
                </h3>
                <p className="text-xs font-semibold text-rose-600">
                  {currentLang === 'en' ? activeFacility.titleMr : activeFacility.titleEn}
                </p>
              </div>
            </div>

            {/* Detailed Body */}
            <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
              
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Overview & Medical Need
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {currentLang === 'en' ? activeFacility.fullDescEn : activeFacility.fullDescMr}
                </p>
              </div>

              {/* Benefits List */}
              <div className="bg-sky-50/70 p-4 rounded-xl border border-sky-100">
                <h4 className="text-xs font-bold text-sky-900 uppercase tracking-wider mb-2">
                  Key Patient Benefits
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {(currentLang === 'en' ? activeFacility.benefitsEn : activeFacility.benefitsMr).map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Step by Step Procedure */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Treatment Steps (What to Expect)
                </h4>
                <div className="space-y-2">
                  {(currentLang === 'en' ? activeFacility.procedureStepsEn : activeFacility.procedureStepsMr).map((step, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <span className="w-5 h-5 rounded-full bg-teal-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Aftercare */}
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                <p className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-amber-600" />
                  <span>Post-Treatment Advice</span>
                </p>
                <p className="text-xs text-amber-800 mt-1">
                  {currentLang === 'en' ? activeFacility.aftercareEn[0] : activeFacility.aftercareMr[0]}
                </p>
              </div>

            </div>

            {/* Modal Footer CTAs */}
            <div className="pt-6 mt-6 border-t border-slate-200 flex items-center justify-between gap-4">
              <a
                href="tel:9922300842"
                className="text-xs font-semibold text-slate-700 hover:text-slate-900 flex items-center gap-1"
              >
                <span>Call 9922300842</span>
              </a>

              <button
                id="btn-modal-facility-book-confirm"
                onClick={() => {
                  onBookFacility(activeFacility.titleEn);
                  setActiveFacility(null);
                }}
                className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-md"
              >
                <Calendar className="w-4 h-4" />
                <span>Book This Treatment</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
