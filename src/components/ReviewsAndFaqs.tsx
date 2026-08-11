import React, { useState } from 'react';
import { Star, CheckCircle, ChevronDown, ChevronUp, MessageSquareQuote, HelpCircle } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { faqData, reviewsData } from '../data/clinicData';

interface ReviewsAndFaqsProps {
  currentLang: Language;
}

export const ReviewsAndFaqs: React.FC<ReviewsAndFaqsProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const [openFaq, setOpenFaq] = useState<string>('f1');

  return (
    <section id="reviews-faqs" className="py-12 bg-slate-50 border-t border-slate-200">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-8 space-y-16">
        
        {/* Patient Reviews Section */}
        <div>
          <div className="text-center max-w-5xl mx-auto mb-10">
            <span className="text-xs font-bold text-teal-700 uppercase tracking-widest bg-teal-100 px-3 py-1 rounded-full border border-teal-200">
              {t.reviewsTitle}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 tracking-tight">
              {currentLang === 'en' ? "Trusted Patient Experiences" : "रुग्णांचे प्रत्यक्ष अनुभव"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {t.reviewsSub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {reviewsData.map((review) => {
              const comment = currentLang === 'en' ? review.commentEn : review.commentMr;

              return (
                <div
                  key={review.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    {/* Stars */}
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                      "{comment}"
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-900">{review.name}</p>
                      <p className="text-[11px] text-teal-700 font-medium">{review.treatment}</p>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Verified
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">{review.date}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* FAQs Section */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold text-sky-800 uppercase tracking-widest bg-sky-100 px-3 py-1 rounded-full border border-sky-200">
              {t.faqTitle}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3 tracking-tight">
              {currentLang === 'en' ? "Dental Care Questions Answered" : "दंत उपचारांबद्दलचे प्रश्न आणि उत्तरे"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {t.faqSub}
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqData.map((faq) => {
              const question = currentLang === 'en' ? faq.questionEn : faq.questionMr;
              const answer = currentLang === 'en' ? faq.answerEn : faq.answerMr;
              const isOpen = openFaq === faq.id;

              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs"
                >
                  <button
                    id={`btn-faq-toggle-${faq.id}`}
                    onClick={() => setOpenFaq(isOpen ? '' : faq.id)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                  >
                    <span className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2.5">
                      <HelpCircle className="w-4 h-4 text-teal-600 shrink-0" />
                      {question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-teal-600 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 border-t border-slate-100 leading-relaxed bg-sky-50/30">
                      {answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
