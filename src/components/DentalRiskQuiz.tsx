import React, { useState } from 'react';
import { ShieldAlert, CheckCircle, AlertTriangle, ArrowRight, ArrowLeft, RefreshCw, Calendar, MessageSquare, Sparkles, Activity } from 'lucide-react';
import { Language } from '../types';

interface DentalRiskQuizProps {
  currentLang: Language;
  onBookClick: (suggestedService?: string) => void;
  onSendToChat: (assessmentSummary: string) => void;
}

interface QuestionOption {
  id: string;
  labelEn: string;
  labelMr: string;
  descEn?: string;
  descMr?: string;
  riskPoints: number;
  tagEn?: string;
  tagMr?: string;
}

interface Question {
  id: number;
  titleEn: string;
  titleMr: string;
  options: QuestionOption[];
}

export const DentalRiskQuiz: React.FC<DentalRiskQuizProps> = ({ currentLang, onBookClick, onSendToChat }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, QuestionOption>>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const questions: Question[] = [
    {
      id: 1,
      titleEn: "Are you currently experiencing any tooth or gum discomfort?",
      titleMr: "तुम्हाला सध्या दात किंवा हिरड्यांमध्ये काही त्रास जाणवत आहे का?",
      options: [
        {
          id: 'q1_o1',
          labelEn: "Sharp pain or persistent toothache",
          labelMr: "तीव्र दातदुखी किंवा सतत होणारी ठणक",
          descEn: "Indicates deep decay, pulp infection, or nerve involvement",
          descMr: "दाताच्या मुळापर्यंत किड गेल्याचे लक्षण असू शकते",
          riskPoints: 3,
          tagEn: "Urgent Attention Needed",
          tagMr: "तातडीच्या उपचाराची गरज"
        },
        {
          id: 'q1_o2',
          labelEn: "Sensitivity to cold/hot drinks or sweet food",
          labelMr: "थंड, गरम किंवा गोड खाताना दात शिणशिणणे",
          descEn: "Enamel erosion or early cavity formation",
          descMr: "दातांचे इनॅमल घासले जाणे किंवा सुरवातीची किड",
          riskPoints: 2,
          tagEn: "Moderate Risk",
          tagMr: "मध्यम धोका"
        },
        {
          id: 'q1_o3',
          labelEn: "Bleeding or swollen gums when brushing",
          labelMr: "ब्रश करताना हिरड्यांमधून रक्त येणे किंवा सूज",
          descEn: "Gingivitis or early stage periodontal issue",
          descMr: "हिरड्यांचा संसर्ग किंवा जिंजिवायटिस",
          riskPoints: 2,
          tagEn: "Gum Care Required",
          tagMr: "हिरड्यांची निगा आवश्यक"
        },
        {
          id: 'q1_o4',
          labelEn: "No pain or sensitivity at all",
          labelMr: "कोणत्याही प्रकारचा त्रास नाही",
          descEn: "Maintain good oral hygiene habits",
          descMr: "उत्तम आरोग्य स्थिती टिकवून ठेवा",
          riskPoints: 0,
          tagEn: "Low Risk",
          tagMr: "कमी धोका"
        }
      ]
    },
    {
      id: 2,
      titleEn: "How often do you brush and clean your teeth daily?",
      titleMr: "तुम्ही दिवसातून किती वेळा दात घासता?",
      options: [
        {
          id: 'q2_o1',
          labelEn: "Twice daily with fluoride toothpaste & flossing",
          labelMr: "दिवसातून दोनदा ब्रश व नियमित सफाई",
          descEn: "Optimal plaque control and cavity protection",
          descMr: "दात व हिरड्यांच्या आरोग्यासाठी उत्तम सवय",
          riskPoints: 0,
          tagEn: "Optimal Routine",
          tagMr: "उत्तम सवय"
        },
        {
          id: 'q2_o2',
          labelEn: "Once daily in the morning",
          labelMr: "दिवसातून फक्त एकदा सकाळी",
          descEn: "Night plaque buildup increases decay risk",
          descMr: "रात्री प्लाक जमून किडण्याचा धोका वाढतो",
          riskPoints: 1,
          tagEn: "Needs Improvement",
          tagMr: "सुधारणेची गरज"
        },
        {
          id: 'q2_o3',
          labelEn: "Irregularly / frequently miss days",
          labelMr: "अनियमित / काही दिवस दात न घासणे",
          descEn: "High tartar buildup and cavity vulnerability",
          descMr: "टार्टर आणि किड होण्याचा उच्च धोका",
          riskPoints: 2,
          tagEn: "High Risk Routine",
          tagMr: "जास्त धोका"
        }
      ]
    },
    {
      id: 3,
      titleEn: "When was your last dental checkup and professional cleaning?",
      titleMr: "तुम्ही शेवटची दंत तपासणी आणि क्लिनिंग कधी केली होती?",
      options: [
        {
          id: 'q3_o1',
          labelEn: "Within the last 6 months",
          labelMr: "मागील ६ महिन्यांच्या आत",
          descEn: "Proactive preventive care routine",
          descMr: "नियमित आणि सुरक्षित दंत आरोग्य काळजी",
          riskPoints: 0,
          tagEn: "Up to Date",
          tagMr: "नियमित"
        },
        {
          id: 'q3_o2',
          labelEn: "6 to 12 months ago",
          labelMr: "६ ते १२ महिन्यांपूर्वी",
          descEn: "Due for a routine checkup soon",
          descMr: "लवकरच नियमित तपासणीची गरज",
          riskPoints: 1,
          tagEn: "Checkup Due",
          tagMr: "तपासणी आवश्यक"
        },
        {
          id: 'q3_o3',
          labelEn: "More than 1 year ago or Never",
          labelMr: "१ वर्षापेक्षा जास्त वेळ किंवा कधीच नाही",
          descEn: "Hidden tartar & undetected cavities may be progressing",
          descMr: "न दिसणारी किड व टार्टर साचण्याचा धोका",
          riskPoints: 2,
          tagEn: "Overdue",
          tagMr: "दीर्घकाळ तपासणी नाही"
        }
      ]
    },
    {
      id: 4,
      titleEn: "How frequently do you consume sweet foods, sodas, tea/coffee, or tobacco?",
      titleMr: "तुम्ही गोड पदार्थ, कोल्ड ड्रिंक्स, चहा/कॉफी किंवा तंबाखूचे सेवन किती करता?",
      options: [
        {
          id: 'q4_o1',
          labelEn: "Rarely / Low sugar diet and no tobacco",
          labelMr: "कमी प्रमाणात गोड व तंबाखूचे सेवन नाही",
          descEn: "Low acid and plaque generation",
          descMr: "अ‍ॅसिड आणि प्लाकची निर्मिती कमी राहते",
          riskPoints: 0,
          tagEn: "Healthy Lifestyle",
          tagMr: "निरोगी जीवनशैली"
        },
        {
          id: 'q4_o2',
          labelEn: "Daily tea, coffee, or frequent sweet snacks",
          labelMr: "रोज चहा/कॉफी किंवा गोड पदार्थांचे सेवन",
          descEn: "Increased surface staining and mild enamel acid risk",
          descMr: "दांतांवर डाग आणि इनॅमलची झीज होण्याचा धोका",
          riskPoints: 1,
          tagEn: "Mild Acid Exposure",
          tagMr: "मध्यम धोका"
        },
        {
          id: 'q4_o3',
          labelEn: "Frequent sodas, sweets, or tobacco/gutkha use",
          labelMr: "वारंवार कोल्ड ड्रिंक्स, गोड पदार्थ किंवा तंबाखू/गुटखा",
          descEn: "High risk for deep staining, gum disease, and tooth loss",
          descMr: "डाग, हिरड्यांचे आजार व दात खराब होण्याचा उच्च धोका",
          riskPoints: 3,
          tagEn: "High Risk Habits",
          tagMr: "अत्यंत धोकादायक सवय"
        }
      ]
    },
    {
      id: 5,
      titleEn: "Do you have any visible dental aesthetic or structural concerns?",
      titleMr: "तुम्हाला तुमच्या दातांमध्ये खालीलपैकी काही दिसणारे दोष जाणवतात का?",
      options: [
        {
          id: 'q5_o1',
          labelEn: "Discolored/yellowish teeth or dark stains",
          labelMr: "पिवळसर दात किंवा काळसर डाग",
          descEn: "Can be corrected with teeth whitening or professional polishing",
          descMr: "टीथ व्हाईटनिंग व पॉलिशिंगने ठीक होऊ शकते",
          riskPoints: 1,
          tagEn: "Cosmetic Concern",
          tagMr: "सौंदर्य विषयक"
        },
        {
          id: 'q5_o2',
          labelEn: "Missing tooth gap or loose/wobbly tooth",
          labelMr: "पडलेला दात किंवा हलणारा दात",
          descEn: "Requires implant or bridge to prevent jaw bone loss",
          descMr: "इम्प्लांट किंवा ब्रीजद्वारे उपचार आवश्यक",
          riskPoints: 2,
          tagEn: "Structural Care",
          tagMr: "संरचनात्मक उपचार"
        },
        {
          id: 'q5_o3',
          labelEn: "Crooked, crowded, or misaligned teeth",
          labelMr: "वेडेवाकडे किंवा पुढे आलेले दात",
          descEn: "Correctable with clear aligners or braces",
          descMr: "अलाईनर्स किंवा ब्रेसेसद्वारे सरळ केले जाऊ शकतात",
          riskPoints: 1,
          tagEn: "Orthodontic Concern",
          tagMr: "ऑर्थोडॉन्टिक"
        },
        {
          id: 'q5_o4',
          labelEn: "None - teeth look aligned and healthy",
          labelMr: "काहीही नाही - दात सुव्यवस्थित आणि निरोगी आहेत",
          descEn: "Great structural alignment",
          descMr: "दातांची मांडणी उत्तम आहे",
          riskPoints: 0,
          tagEn: "Healthy Structure",
          tagMr: "निरोगी रचना"
        }
      ]
    }
  ];

  const handleSelectOption = (option: QuestionOption) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentStep]: option
    }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setSelectedAnswers({});
    setIsCompleted(false);
  };

  // Calculate score and result
  const totalScore = (Object.values(selectedAnswers) as QuestionOption[]).reduce((sum: number, opt: QuestionOption) => sum + (opt?.riskPoints || 0), 0);

  let riskCategory: 'low' | 'moderate' | 'high' = 'low';
  if (totalScore >= 6) {
    riskCategory = 'high';
  } else if (totalScore >= 3) {
    riskCategory = 'moderate';
  }

  const getResultDetails = () => {
    if (riskCategory === 'high') {
      return {
        badgeEn: "High Dental Risk - Action Recommended",
        badgeMr: "उच्च दंत धोका - तातडीचे उपचार आवश्यक",
        titleEn: "Urgent Clinical Evaluation Recommended",
        titleMr: "तातडीने दंत तपासणीची गरज आहे",
        colorClass: "from-rose-500 to-amber-600",
        bgLight: "bg-rose-50 border-rose-200 text-rose-900",
        icon: ShieldAlert,
        summaryEn: "Your responses indicate active symptoms or habits that place your teeth and gums at high risk for deep decay, nerve infection, or gum disease.",
        summaryMr: "तुमच्या उत्तरांनुसार दातांमध्ये किड, जंतूसंसर्ग किंवा हिरड्यांचे आजार असण्याची शक्यता आहे.",
        recommendationsEn: [
          "Schedule a Digital RVG X-Ray consultation to inspect inner tooth roots.",
          "Check for deep pulpitis (may require single-sitting Painless RCT).",
          "Undergo professional scaling to eliminate deep sub-gingival tartar.",
          "Prevent further enamel breakdown with prescription fluoride varnish."
        ],
        recommendationsMr: [
          "मुळांच्या तपासणीसाठी डिजिटल RVG X-Ray करून घ्या.",
          "किड खोलवर असल्यास सिंगल सिटिंग रूट कॅनाल (RCT) चा सल्ला घ्या.",
          "टार्टर आणि जंतू काढण्यासाठी प्रोफेशनल्स स्केलिंग करा.",
          "इनॅमलच्या संरक्षणासाठी फ्लुओराइड उपचारांचा वापर करा."
        ],
        suggestedService: "Root Canal Treatment (RCT)"
      };
    } else if (riskCategory === 'moderate') {
      return {
        badgeEn: "Moderate Dental Risk - Preventive Care Needed",
        badgeMr: "मध्यम दंत धोका - काळजी घेणे आवश्यक",
        titleEn: "Early Preventive Care Recommended",
        titleMr: "सुरवातीचे प्रतिबंधात्मक उपचार आवश्यक",
        colorClass: "from-amber-500 to-sky-600",
        bgLight: "bg-amber-50 border-amber-200 text-amber-900",
        icon: AlertTriangle,
        summaryEn: "You have mild symptoms or routine gaps that could lead to cavities, tartar buildup, or tooth staining if left unaddressed.",
        summaryMr: "तुमच्या दातांमध्ये सौम्य चिन्हे दिसत आहेत. वेळीच उपचार न केल्यास किड आणि डाग वाढू शकतात.",
        recommendationsEn: [
          "Professional teeth scaling & polishing to remove bacterial plaque.",
          "Apply tooth fillings for early enamel cavities before pain starts.",
          "Switch to soft bristle brushing with proper circular motion.",
          "Consider desensitizing paste or fluoride varnish for hot/cold sensitivity."
        ],
        recommendationsMr: [
          "दातांची स्वच्छता (Scaling & Polishing) करून घ्या.",
          "दुखणे सुरु होण्यापूर्वी लहान किडीवर फिलींग (Tooth Filling) करा.",
          "मऊ ब्रश वापरून गोलाकार पद्धतीने दात घासा.",
          "शिणशिणणाऱ्या दातांसाठी डीसेन्सिटायझिंग पेस्ट वापरा."
        ],
        suggestedService: "Teeth Cleaning & Polishing"
      };
    } else {
      return {
        badgeEn: "Low Dental Risk - Excellent Oral Hygiene",
        badgeMr: "कमी दंत धोका - उत्तम आरोग्य",
        titleEn: "Great Dental Health Maintain It!",
        titleMr: "तुमचे दंत आरोग्य उत्तम आहे!",
        colorClass: "from-emerald-500 to-teal-600",
        bgLight: "bg-emerald-50 border-emerald-200 text-emerald-900",
        icon: CheckCircle,
        summaryEn: "Great job! Your current habits and symptoms show low risk for major dental issues. Maintain your 6-month checkup routine.",
        summaryMr: "अभिनंदन! तुमचे दंत आरोग्य उत्तम आहे. दर ६ महिन्यांनी नियमित तपासणी करत राहा.",
        recommendationsEn: [
          "Continue brushing twice daily with fluoride toothpaste.",
          "Book a routine 6-month dental checkup with Dr. Ankita Goklani.",
          "Protect teeth from dark stains by rinsing after tea or coffee.",
          "Keep up regular flossing for inter-dental hygiene."
        ],
        recommendationsMr: [
          "दिवसातून दोनदा ब्रश करण्याची सवय सुरु ठेवा.",
          "दर ६ महिन्यांनी डॉ. अंकिता गोकलानी यांच्याकडे रुटीन तपासणी करा.",
          "चहा-कॉफीनंतर पाण्याने गुळण्या करा.",
          "दोन दातांमधील स्वच्छता टिकवून ठेवा."
        ],
        suggestedService: "General Dental Checkup"
      };
    }
  };

  const resultDetails = getResultDetails();
  const ResultIcon = resultDetails.icon;

  const currentQ = questions[currentStep];
  const isSelected = !!selectedAnswers[currentStep];

  const handleSendAssessmentToChat = () => {
    const summaryText = currentLang === 'en'
      ? `I completed the Dental Risk Assessment. My score is ${totalScore}/12 (${resultDetails.badgeEn}). Primary selected concern: "${selectedAnswers[0]?.labelEn}". What specific advice and care plan does Dr. Ankita Goklani recommend for me?`
      : `मी दंत धोका मूल्यांकन पूर्ण केले आहे. माझा स्कोअर ${totalScore}/12 आहे (${resultDetails.badgeMr}). मुख्य समस्या: "${selectedAnswers[0]?.labelMr}". डॉ. अंकिता गोकलानी माझ्यासाठी कोणते उपचार सुचवतील?`;

    onSendToChat(summaryText);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col min-h-[540px]">
      
      {/* Top Title Bar */}
      <div className="bg-slate-900 text-white px-6 py-3.5 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-300">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
              <span>{currentLang === 'en' ? "Dental Health Risk Assessment" : "दंत आरोग्य धोका मूल्यांकन"}</span>
              <span className="text-[10px] bg-sky-900 text-sky-200 px-2 py-0.5 rounded-full border border-sky-700">
                {isCompleted ? "Completed" : `Question ${currentStep + 1} of ${questions.length}`}
              </span>
            </h3>
            <p className="text-[10px] text-slate-300">
              {currentLang === 'en' ? "Interactive Triage & Clinical Recommendations" : "त्वरित दंत तपासणी आणि सल्ला"}
            </p>
          </div>
        </div>

        {isCompleted && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-[11px] font-bold text-teal-400 hover:text-teal-300 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{currentLang === 'en' ? "Retake" : "पुन्हा करा"}</span>
          </button>
        )}
      </div>

      {!isCompleted ? (
        <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between bg-slate-50/50">
          
          {/* Progress Bar */}
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1.5">
              <span>{currentLang === 'en' ? `Step ${currentStep + 1} of ${questions.length}` : `टप्पा ${currentStep + 1} पैकी ${questions.length}`}</span>
              <span>{Math.round(((currentStep + 1) / questions.length) * 100)}%</span>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-teal-500 to-sky-500 transition-all duration-300 ease-out"
                style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Content */}
          <div className="my-6 space-y-4">
            <h4 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
              {currentLang === 'en' ? currentQ.titleEn : currentQ.titleMr}
            </h4>

            {/* Options List */}
            <div className="space-y-2.5">
              {currentQ.options.map((opt) => {
                const active = selectedAnswers[currentStep]?.id === opt.id;
                const label = currentLang === 'en' ? opt.labelEn : opt.labelMr;
                const desc = currentLang === 'en' ? opt.descEn : opt.descMr;
                const tag = currentLang === 'en' ? opt.tagEn : opt.tagMr;

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 ${
                      active
                        ? 'bg-sky-50 border-teal-500 ring-2 ring-teal-500/30 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                      active ? 'border-teal-600 bg-teal-600 text-white' : 'border-slate-300 bg-white'
                    }`}>
                      {active && <CheckCircle className="w-3.5 h-3.5" />}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                          {label}
                        </span>
                        {tag && (
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                            opt.riskPoints >= 3
                              ? 'bg-rose-100 text-rose-800'
                              : opt.riskPoints >= 2
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {tag}
                          </span>
                        )}
                      </div>
                      {desc && (
                        <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                          {desc}
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent transition-all flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{currentLang === 'en' ? "Back" : "मागे"}</span>
            </button>

            <button
              onClick={handleNext}
              disabled={!isSelected}
              className="bg-gradient-to-r from-teal-600 to-sky-600 hover:from-teal-700 hover:to-sky-700 disabled:opacity-40 text-white font-extrabold text-xs px-6 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <span>
                {currentStep === questions.length - 1
                  ? (currentLang === 'en' ? "View Risk Report" : "अहवाल पहा")
                  : (currentLang === 'en' ? "Next Question" : "पुढील प्रश्न")}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      ) : (
        /* Results View */
        <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between space-y-6 bg-slate-50/50 overflow-y-auto">
          
          {/* Result Badge Header */}
          <div className={`p-4 rounded-2xl border ${resultDetails.bgLight} flex items-start gap-4 shadow-xs`}>
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${resultDetails.colorClass} text-white flex items-center justify-center shrink-0 shadow-md`}>
              <ResultIcon className="w-6 h-6" />
            </div>

            <div className="flex-1">
              <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/80 border border-slate-200 mb-1">
                {currentLang === 'en' ? resultDetails.badgeEn : resultDetails.badgeMr}
              </span>
              <h4 className="text-base sm:text-lg font-extrabold text-slate-900">
                {currentLang === 'en' ? resultDetails.titleEn : resultDetails.titleMr}
              </h4>
              <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                {currentLang === 'en' ? resultDetails.summaryEn : resultDetails.summaryMr}
              </p>
            </div>
          </div>

          {/* Personal Recommendations */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <h5 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>{currentLang === 'en' ? "Personalized Care Plan & Next Steps:" : "तुमच्यासाठी सुचवलेले विशेष उपचार योजना:"}</span>
            </h5>

            <ul className="space-y-2 text-xs text-slate-700">
              {(currentLang === 'en' ? resultDetails.recommendationsEn : resultDetails.recommendationsMr).map((rec, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                  <span className="leading-relaxed">{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action CTAs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleSendAssessmentToChat}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <MessageSquare className="w-4 h-4 text-teal-400" />
              <span>{currentLang === 'en' ? "Discuss with AI Assistant" : "एआय कडून मार्गदर्शन घ्या"}</span>
            </button>

            <button
              onClick={() => onBookClick(resultDetails.suggestedService)}
              className="bg-gradient-to-r from-teal-600 to-sky-600 hover:from-teal-700 hover:to-sky-700 text-white font-extrabold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>{currentLang === 'en' ? "Book Priority Consultation" : "अपॉइंटमेंट बुक करा"}</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
