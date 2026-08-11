import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, User, Bot, RefreshCw, Calendar, Activity, MessageSquare } from 'lucide-react';
import { Language, ChatMessage } from '../types';
import { translations } from '../data/translations';
import { DentalRiskQuiz } from './DentalRiskQuiz';

interface SmileConsultantAIProps {
  currentLang: Language;
  onBookClick: (suggestedService?: string) => void;
}

export const SmileConsultantAI: React.FC<SmileConsultantAIProps> = ({ currentLang, onBookClick }) => {
  const t = translations[currentLang];
  const [activeTab, setActiveTab] = useState<'chat' | 'quiz'>('chat');

  const initialGreeting = currentLang === 'en'
    ? "Hello! I am Dr. Ankita Goklani's AI Dental Assistant. Ask me anything about root canals, tooth fillings, dental implants, digital X-rays, or clinic timings!"
    : "नमस्कार! मी डॉ. अंकिता गोकलानी यांची AI दंत सहाय्यक आहे. मला रूट कॅनाल, दातांची फिलींग, दातदुखी किंवा क्लिनिकबद्दल कोणताही प्रश्न विचारा!";

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'assistant',
      text: initialGreeting,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  const suggestedQuestions = currentLang === 'en' ? [
    "Is Root Canal Treatment (RCT) painful?",
    "What are the benefits of Dental Implants?",
    "Do you offer child-friendly dental care?",
    "What are clinic timing hours in Jawahar Colony?"
  ] : [
    "रूट कॅनाल ट्रिटमेंट करताना वेदना होतात का?",
    "इम्प्लांट दात बसवण्याचे काय फायदे आहेत?",
    "लहान मुलांच्या दातांच्या उपचाराची माहिती सांगा.",
    "जवाहर कॉलनीतील क्लिनिकची वेळ काय आहे?"
  ];

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (activeTab === 'chat' && chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, activeTab]);

  const getClientFallback = (query: string): string => {
    const q = query.toLowerCase();
    const isMarathi = /[\u0900-\u097F]/.test(query) || q.includes("marathi") || q.includes("कधी") || q.includes("काय") || q.includes("माहिती") || q.includes("नाही") || q.includes("आहे");

    // Greetings
    if (q.match(/^(hi|hello|hey|namaste|greetings|नमस्ते|नमस्कार)/i)) {
      return isMarathi
        ? `**नमस्ते! डॉ. अंकिता गोकलानीज् एलाईट डेंटल केअरमध्ये आपले सहर्ष स्वागत आहे.**\n\nमी डॉ. अंकिता गोकलानी यांची एआय असिस्टंट आहे. दातांचे दुखणे, रूट कॅनाल, इम्प्लांट, दात साफ करणे, लहान मुलांचे दात किंवा अपॉइंटमेंटबद्दल मी तुम्हाला मदत करू शकते.\n\nतुम्हाला काय अडचण आहे ते सांगा किंवा **९९२२३००८४२** वर कॉल करा!`
        : `**Hello and welcome to Dr. Ankita Goklani's Elite Dental Care!**\n\nI am Dr. Ankita's AI Dental Assistant. How can I assist you with your dental health today?\n\nYou can ask me about Toothache Relief, Root Canal (RCT), Dental Implants, Teeth Whitening, Braces, Clinic Timings, or Booking an Appointment!`;
    }

    // Toothache / Pain / Emergency
    if (q.includes("pain") || q.includes("toothache") || q.includes("ache") || q.includes("hurt") || q.includes("swell") || q.includes("दुखणे") || q.includes("सुज") || q.includes("कळ") || q.includes("वेदना")) {
      return isMarathi 
        ? `**दातदुखी किंवा सुज आल्यास तातडीचे मार्गदर्शन:**\n\n• **तात्पुरता दिलासा:** कोमट पाण्यात थोडे मीठ घालून गुळण्या करा. दुखणाऱ्या दातावर दाब देऊ नका.\n• **काय करू नये:** दुखणाऱ्या दातावर थेट पेनकिलर गोळी किंवा बाम ठेवू नका, यामुळे हिरडीला दुखापत होऊ शकते.\n• **उपचार:** दातामध्ये कीड खोलवर गेल्याने किंवा संसर्गामुळे दुखणे होते. यासाठी डिजिटल एक्स-रे काढून रूट कॅनाल (RCT) किंवा फिलींगची गरज असू शकते.\n\nतात्काळ तपासणीसाठी डॉ. अंकिता गोकलानी (M.D.S) यांच्याशी **९९२२३००८४२** वर संपर्क साधा किंवा क्लिनिकला भेट द्या!`
        : `**Toothache & Pain Management Advice:**\n\n• **Immediate Relief:** Rinse your mouth gently with warm salt water. Avoid chewing on the painful side.\n• **Important Warning:** Do not place aspirin or painkiller tablets directly against the aching tooth or gum, as it can cause tissue burns.\n• **Root Cause & Treatment:** Severe pain usually indicates deep decay or pulp infection. Dr. Ankita Goklani can evaluate with a quick digital X-ray and perform a painless Root Canal or Filling.\n\nFor urgent attention, please call our clinic helpline directly at **9922300842** or book an immediate appointment slot!`;
    }

    if (q.includes("rct") || q.includes("root canal") || q.includes("कॅनाल") || q.includes("रूट") || q.includes("painful") || q.includes("वेदना")) {
      return isMarathi 
        ? `**रूट कॅनाल ट्रिटमेंट (RCT) ची सविस्तर माहिती:**\n\n• **वेदना होतात का?** अजिबात नाही! आधुनिक लोकल ॲनेस्थेशियामुळे उपचार पूर्णपणे त्रासमुक्त आणि सुखकर होतो.\n• **हा उपचार का केला जातो?** किडलेला किंवा संसर्ग झालेला दात काढण्याऐवजी तो कायमचा वाचवण्यासाठी RCT सर्वोत्तम उपाय आहे.\n• **फायदे:** दातदुखी लगेच थांबते आणि तुमचा नैसर्गिक दात सुरक्षित राहतो.\n\nडॉ. अंकिता गोकलानी (M.D.S) यांच्याशी सल्ल्यासाठी **९९२२३००८४२** वर संपर्क साधा किंवा ऑनलाईन अपॉइंटमेंट बुक करा!`
        : `**Root Canal Treatment (RCT) Information:**\n\n• **Is RCT Painful?** No! With modern local anesthesia, Root Canal Treatment is virtually painless and provides immediate relief from severe tooth pain.\n• **Why is it done?** RCT cleans and disinfects the interior pulp of a deeply decayed tooth, preserving your natural tooth structure so you don't need an extraction.\n• **Procedure:** The infection is removed, the root canal is sealed, and a protective custom crown is placed.\n\nTo schedule a personal consultation with Dr. Ankita Goklani (M.D.S), call **9922300842** or book an appointment online!`;
    }

    if (q.includes("implant") || q.includes("इम्प्लांट") || q.includes("missing tooth") || q.includes("दात बसवणे")) {
      return isMarathi
        ? `**इम्प्लांट पद्धतीने दात बसवणे (Dental Implants):**\n\n• **काय आहे इम्प्लांट?** इम्प्लांट हा पडलेल्या दातांच्या जागी नैसर्गिक दातासारखाच मजबूत दात बसवण्याचा सर्वात आधुनिक आणि कायमस्वरूपी उपाय आहे.\n• **फायदे:** नैसर्गिक दिसणारी रचना, मजबूती, जबड्याच्या हाडाचे रक्षण आणि आयुष्याभर टिकणारा उपाय.\n\nडॉ. अंकिता गोकलानी (M.D.S) यांच्याकडे इम्प्लांट सल्ल्यासाठी **९९२२३००८४२** वर संपर्क साधा!`
        : `**Benefits of Dental Implants:**\n\nDental implants are the gold standard for replacing missing teeth.\n\n• **Key Advantages:** Looks and functions like natural teeth, preserves jawbone density, and protects adjacent healthy teeth.\n\nFor an implant assessment with Dr. Ankita Goklani (M.D.S), call **9922300842** or book an appointment today!`;
    }

    if (q.includes("timing") || q.includes("hours") || q.includes("address") || q.includes("location") || q.includes("कधी") || q.includes("पत्ता") || q.includes("वेळ")) {
      return isMarathi
        ? `**डॉ. अंकिता गोकलानीज् एलाईट डेंटल केअर (दातांचा दवाखाना):**\n\n• **पत्ता:** ७१/ए, जवाहर कॉलनी, छत्रपती संभाजीनगर.\n• **सकाळची वेळ:** १०:०० ते दुपारी २:००\n• **संध्याकाळची वेळ:** ५:०० ते रात्री ९:००\n• **रविवार:** अपॉइंटमेंटनुसार\n• **संपर्क:** ९९२२३००८४२`
        : `**Dr. Ankita Goklani's Elite Dental Care:**\n\n• **Address:** 71/A, Jawahar Colony, Chhatrapati Sambhajinagar.\n• **Morning:** 10:00 AM - 2:00 PM\n• **Evening:** 5:00 PM - 9:00 PM\n• **Sunday:** By Appointment\n• **Direct Helpline:** 9922300842`;
    }

    if (q.includes("child") || q.includes("kid") || q.includes("pediatric") || q.includes("मुले") || q.includes("बाळ")) {
      return isMarathi
        ? `**लहान मुलांच्या दातांचे उपचार:** डॉ. अंकिता गोकलानी लहान मुलांवर प्रेमळ आणि त्रासमुक्त उपचार करतात. फोन: ९९२२३००८४२`
        : `**Pediatric Dental Care:** Gentle care for children by Dr. Ankita Goklani. Call 9922300842.`;
    }

    return isMarathi
      ? `**डॉ. अंकिता गोकलानीज् एलाईट डेंटल केअर**\n\nतुमच्या प्रश्नाबद्दल अधिक माहितीसाठी किंवा डॉक्टरांशी थेट बोलण्यासाठी कृपया **९९२२३००८४२** वर संपर्क साधा किंवा अपॉइंटमेंट बुक करा!`
      : `**Dr. Ankita Goklani's Elite Dental Care**\n\nFor personalized advice or to schedule a consultation with Dr. Ankita Goklani (M.D.S), please call **9922300842** or use our online appointment booking system below!`;
  };

  const handleSend = async (messageToSend?: string) => {
    const userQuery = messageToSend || inputMessage;
    if (!userQuery.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: userQuery,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!messageToSend) setInputMessage('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userQuery,
          language: currentLang
        })
      });

      if (response.ok) {
        const data = await response.json();
        const botMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: data.reply || getClientFallback(userQuery),
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botMsg]);
      } else {
        throw new Error('API request failed');
      }
    } catch {
      const fallbackText = getClientFallback(userQuery);
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: fallbackText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai-assistant" className="py-12 bg-gradient-to-b from-sky-50 to-slate-100 border-t border-slate-200">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-5xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4 text-teal-600" />
            <span>AI Dental Consultation & Assessment</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.aiAssistantTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            {t.aiAssistantSub}
          </p>

          {/* Interactive Mode Toggle Bar */}
          <div className="mt-6 inline-flex p-1 bg-slate-200/80 rounded-2xl border border-slate-300 shadow-inner">
            <button
              id="tab-ai-chat"
              onClick={() => setActiveTab('chat')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'chat'
                  ? 'bg-white text-slate-900 shadow-md border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <MessageSquare className="w-4 h-4 text-teal-600" />
              <span>{currentLang === 'en' ? "AI Chat Consultation" : "एआय चॅट सल्लागार"}</span>
            </button>

            <button
              id="tab-ai-quiz"
              onClick={() => setActiveTab('quiz')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'quiz'
                  ? 'bg-white text-slate-900 shadow-md border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Activity className="w-4 h-4 text-rose-500" />
              <span>{currentLang === 'en' ? "Dental Risk Assessment" : "दंत धोका मूल्यांकन"}</span>
              <span className="text-[10px] bg-rose-500 text-white font-extrabold px-2 py-0.5 rounded-full animate-pulse">
                QUIZ
              </span>
            </button>
          </div>
        </div>

        {/* Main Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Feature Highlight Card */}
          <div className="lg:col-span-4 bg-white rounded-2xl p-6 shadow-xl border border-slate-200 space-y-6">
            {activeTab === 'chat' ? (
              <>
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600 shrink-0">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Dr. Ankita's AI Assistant</h3>
                    <p className="text-xs text-slate-500">24/7 Virtual Dental Guidance</p>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-slate-600">
                  <p className="leading-relaxed">
                    {currentLang === 'en'
                      ? "Ask any question regarding root canals, pain relief, dental implants, teeth whitening, or clinic appointment availability."
                      : "रूट कॅनाल, दातदुखीवरील उपाय, इम्प्लांट किंवा उपचारांबद्दल कोणताही प्रश्न विचारा."}
                  </p>

                  <div className="bg-sky-50 p-3 rounded-xl border border-sky-200/80 space-y-1">
                    <span className="font-bold text-sky-900 block text-[11px] uppercase">Assistant Capabilities:</span>
                    <ul className="list-disc list-inside space-y-1 text-slate-700">
                      <li>Instant symptom triage</li>
                      <li>Treatment cost estimates</li>
                      <li>Post-procedure care tips</li>
                    </ul>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-2.5">
                  <button
                    onClick={() => setActiveTab('quiz')}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Activity className="w-4 h-4 text-rose-400" />
                    <span>{currentLang === 'en' ? "Take Dental Risk Assessment Quiz" : "दंत आरोग्य क्विझ सोडवा"}</span>
                  </button>

                  <button
                    onClick={() => onBookClick()}
                    className="w-full bg-gradient-to-r from-teal-600 to-sky-600 hover:from-teal-700 hover:to-sky-700 text-white font-bold py-3 rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>{t.bookAppointment}</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 shrink-0">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Health Risk Assessment</h3>
                    <p className="text-xs text-slate-500">5-Question Self Triage</p>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-slate-600">
                  <p className="leading-relaxed">
                    {currentLang === 'en'
                      ? "Evaluate your tooth sensitivity, gum health, and hygiene habits to get personalized care recommendations from Dr. Ankita Goklani."
                      : "तुमच्या दातांच्या आरोग्याचे मोजमाप करा आणि तुमच्यासाठी सुचवलेल्या उपचारांची माहिती मिळवा."}
                  </p>

                  <div className="bg-rose-50 p-3 rounded-xl border border-rose-200/80 space-y-1">
                    <span className="font-bold text-rose-900 block text-[11px] uppercase">Assessment Highlights:</span>
                    <ul className="list-disc list-inside space-y-1 text-slate-700">
                      <li>Calculates custom risk score</li>
                      <li>Detects early pulp & gum risks</li>
                      <li>Generates direct treatment advice</li>
                    </ul>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-2.5">
                  <button
                    onClick={() => setActiveTab('chat')}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4 text-teal-400" />
                    <span>{currentLang === 'en' ? "Switch to AI Chat Assistant" : "एआय चॅट कडे जा"}</span>
                  </button>

                  <button
                    onClick={() => onBookClick()}
                    className="w-full bg-gradient-to-r from-teal-600 to-sky-600 hover:from-teal-700 hover:to-sky-700 text-white font-bold py-3 rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>{t.bookAppointment}</span>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Right Column: Active Interactive Tool Frame */}
          <div className="lg:col-span-8">
            {activeTab === 'quiz' ? (
              <DentalRiskQuiz
                currentLang={currentLang}
                onBookClick={(service) => onBookClick(service)}
                onSendToChat={(summary) => {
                  setActiveTab('chat');
                  handleSend(summary);
                }}
              />
            ) : (
              <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col h-[540px]">
                {/* Chat Top Bar */}
                <div className="bg-slate-900 text-white px-6 py-3.5 flex items-center justify-between border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-300 shrink-0">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <span>Dr. Ankita's AI Assistant</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      </h3>
                      <p className="text-[11px] text-sky-200">
                        Powered by Gemini 3.6 Flash | Dr. Ankita Goklani's Elite Dental Care
                      </p>
                    </div>
                  </div>

                  <button
                    id="btn-book-from-ai"
                    onClick={() => onBookClick()}
                    className="hidden sm:inline-flex items-center gap-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Appointment</span>
                  </button>
                </div>

                {/* Messages Area */}
                <div ref={chatContainerRef} className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/50">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {msg.sender === 'assistant' && (
                        <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center text-xs shrink-0 mt-0.5 shadow-xs">
                          <Bot className="w-4 h-4" />
                        </div>
                      )}

                      <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 shadow-xs text-xs sm:text-sm leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-r from-teal-600 to-sky-600 text-white rounded-tr-none'
                          : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                      }`}>
                        <p className="whitespace-pre-line">{msg.text}</p>
                        <span className={`text-[10px] mt-2 block text-right font-medium ${
                          msg.sender === 'user' ? 'text-sky-200' : 'text-slate-400'
                        }`}>
                          {msg.timestamp}
                        </span>
                      </div>

                      {msg.sender === 'user' && (
                        <div className="w-8 h-8 rounded-full bg-sky-800 text-white flex items-center justify-center text-xs shrink-0 mt-0.5 shadow-xs">
                          <User className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  ))}

                  {loading && (
                    <div className="flex items-center gap-2 text-xs text-slate-500 bg-white p-3 rounded-2xl border border-slate-200 w-max">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-teal-600" />
                      <span>Dr. Ankita's AI is processing your dental query...</span>
                    </div>
                  )}
                </div>

                {/* Suggested Quick Questions */}
                <div className="px-4 py-2 bg-slate-100 border-t border-slate-200 flex items-center gap-2 overflow-x-auto no-scrollbar">
                  <span className="text-[10px] font-bold text-slate-500 uppercase shrink-0">Quick Ask:</span>
                  {suggestedQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      id={`btn-suggested-q-${idx}`}
                      onClick={() => handleSend(q)}
                      className="text-[11px] bg-white hover:bg-sky-50 text-slate-700 hover:text-teal-700 font-medium px-2.5 py-1 rounded-full border border-slate-200 whitespace-nowrap transition-colors shrink-0"
                    >
                      {q}
                    </button>
                  ))}
                </div>

                {/* Input Box */}
                <div className="p-3 bg-white border-t border-slate-200">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSend();
                    }}
                    className="flex items-center gap-2"
                  >
                    <input
                      id="input-ai-chat"
                      type="text"
                      placeholder={t.typeQuestion}
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      className="flex-1 bg-slate-50 text-slate-900 text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <button
                      id="btn-send-ai-chat"
                      type="submit"
                      disabled={loading || !inputMessage.trim()}
                      className="bg-teal-600 hover:bg-teal-700 disabled:opacity-40 text-white font-bold p-2.5 rounded-xl shadow-md transition-all shrink-0"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
