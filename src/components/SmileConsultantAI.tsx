import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, User, Bot, RefreshCw, Calendar, Phone, CheckCircle2 } from 'lucide-react';
import { Language, ChatMessage } from '../types';
import { translations } from '../data/translations';

interface SmileConsultantAIProps {
  currentLang: Language;
  onBookClick: () => void;
}

export const SmileConsultantAI: React.FC<SmileConsultantAIProps> = ({ currentLang, onBookClick }) => {
  const t = translations[currentLang];

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
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const getClientFallback = (query: string): string => {
    const q = query.toLowerCase();
    const isMarathi = /[\u0900-\u097F]/.test(query) || q.includes("marathi") || q.includes("कधी") || q.includes("काय") || q.includes("माहिती");

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
        ? `**लहान मुलांचे दंत उपचार (Pediatric Dentistry):**\n\nहोय, डॉ. अंकिता गोकलानी मुलांसाठी अत्यंत काळजीपूर्वक व स्नेहाळ दंत उपचार पुरवतात. फ्लुओराइड कोटिंग आणि किडीवरील उपचारांसाठी **९९२२३००८४२** वर कॉल करा!`
        : `**Pediatric & Child Dental Care:**\n\nYes! Dr. Ankita Goklani provides gentle, child-friendly dental care including cavity prevention sealants and painless tooth restorations. Call **9922300842**!`;
    }

    if (q.includes("brace") || q.includes("aligner") || q.includes("straight") || q.includes("वेडेवाकडे") || q.includes("तार")) {
      return isMarathi
        ? `**दातांचे ब्रेसेस व अलाईनर्स:**\n\nआम्ही वेडेवाकडे दात सरळ करण्यासाठी मेटल ब्रेसेस, सेरामिक ब्रेसेस आणि इनव्हिजिबल अलाईनर्स (Invisalign) चे उपचार पुरवतो. सल्ल्यासाठी **९९२२३००८४२** वर संपर्क साधू शकता!`
        : `**Teeth Straightening (Braces & Aligners):**\n\nWe offer Metal Braces, Ceramic Tooth-Colored Braces, and Clear Invisible Aligners to correct crooked or misaligned teeth. Call **9922300842** for a consultation!`;
    }

    return isMarathi
      ? `**डॉ. अंकिता गोकलानीज् एलाईट डेंटल केअर मध्ये आपले स्वागत आहे!**\n\nआमच्या क्लिनिकमध्ये रूट कॅनाल, इम्प्लांट, डिजिटल एक्स-रे, दात पांढरे करणे आणि लहान मुलांचे दंत उपचार उपलब्ध आहेत. सल्ल्यासाठी **९९२२३००८४२** वर कॉल करा किंवा ऑनलाईन अपॉइंटमेंट बुक करा!`
      : `**Welcome to Dr. Ankita Goklani's Elite Dental Care!**\n\nWe offer painless Root Canal Treatments, Dental Implants, Braces, Digital X-Rays, and Child Dental Care in Jawahar Colony. To consult Dr. Ankita Goklani (M.D.S), call **9922300842** or click "Book Appointment" above!`;
  };

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setLoading(true);

    try {
      const res = await fetch('/api/dental-consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          conversationHistory: messages.map(m => ({ sender: m.sender, text: m.text }))
        })
      });

      const data = await res.json();

      const replyText = data?.reply || getClientFallback(text);

      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      const fallbackReply = getClientFallback(text);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: fallbackReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai-assistant" className="py-16 bg-gradient-to-b from-sky-50 to-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4 text-teal-600" />
            <span>AI Dental Consultation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.aiAssistantTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            {t.aiAssistantSub}
          </p>
        </div>

        {/* Chat Window Frame */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col h-[520px]">
          
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
              onClick={onBookClick}
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

      </div>
    </section>
  );
};
