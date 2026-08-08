import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory appointments store
interface Appointment {
  id: string;
  patientName: string;
  phone: string;
  age?: string;
  service: string;
  preferredDate: string;
  preferredSlot: "Morning (10 AM - 2 PM)" | "Evening (5 PM - 9 PM)";
  symptoms?: string;
  status: "Confirmed" | "Pending";
  createdAt: string;
}

const appointmentsStore: Appointment[] = [
  {
    id: "EDC-8492",
    patientName: "Rahul Sharma",
    phone: "9823456789",
    age: "32",
    service: "Root Canal Treatment",
    preferredDate: "2026-08-07",
    preferredSlot: "Morning (10 AM - 2 PM)",
    symptoms: "Mild molar pain while drinking cold water",
    status: "Confirmed",
    createdAt: new Date().toISOString()
  }
];

// Helper for Lazy Gemini Client Initialization
let aiClientInstance: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
    return null;
  }
  if (!aiClientInstance) {
    aiClientInstance = new GoogleGenAI({
      apiKey: apiKey.trim(),
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  }
  return aiClientInstance;
}

// Fallback Dental Knowledge Base Response Engine
function getKnowledgeBaseResponse(userQuery: string): string {
  const query = userQuery.toLowerCase();
  const isMarathi = /[\u0900-\u097F]/.test(userQuery) || query.includes("marathi") || query.includes("कधी") || query.includes("काय");

  // 1. Root Canal Treatment (RCT)
  if (query.includes("rct") || query.includes("root canal") || query.includes("कॅनाल") || query.includes("रूट") || query.includes("painful") || query.includes("वेदना")) {
    if (isMarathi) {
      return `**रूट कॅनाल ट्रिटमेंट (RCT) ची सविस्तर माहिती:**\n\n• **वेदना होतात का?** अजिबात नाही! आधुनिक लोकल ॲनेस्थेशियामुळे उपचार पूर्णपणे त्रासमुक्त आणि सुखकर होतो.\n• **हा उपचार का केला जातो?** किडलेला किंवा संसर्ग झालेला दात काढण्याऐवजी तो कायमचा वाचवण्यासाठी RCT सर्वोत्तम उपाय आहे.\n• **फायदे:** दातदुखी लगेच थांबते आणि तुमचा नैसर्गिक दात सुरक्षित राहतो.\n\nडॉ. अंकिता गोकलानी (M.D.S) यांच्याशी जवाहर कॉलनी, छत्रपती संभाजीनगर येथील क्लिनिकमध्ये सल्ल्यासाठी **९९२२३००८४२** वर संपर्क साधा किंवा ऑनलाईन अपॉइंटमेंट बुक करा!`;
    }
    return `**Root Canal Treatment (RCT) Information:**\n\n• **Is RCT Painful?** No! With modern local anesthesia, Root Canal Treatment is virtually painless and provides immediate relief from severe tooth pain.\n• **Why is it done?** RCT cleans and disinfects the interior pulp of a deeply decayed tooth, preserving your natural tooth structure so you don't need an extraction.\n• **Procedure:** The infection is removed, the root canal is sealed, and a protective custom crown is placed.\n\nTo schedule a personal consultation with Dr. Ankita Goklani (M.D.S), call **9922300842** or book an appointment online!`;
  }

  // 2. Dental Implants
  if (query.includes("implant") || query.includes("इम्प्लांट") || query.includes("missing tooth") || query.includes("दात बसवणे")) {
    if (isMarathi) {
      return `**इम्प्लांट पद्धतीने दात बसवणे (Dental Implants):**\n\n• **काय आहे इम्प्लांट?** इम्प्लांट हा पडलेल्या किंवा काढलेल्या दातांच्या जागी नैसर्गिक दातासारखाच मजबूत दात बसवण्याचा सर्वात आधुनिक आणि कायमस्वरूपी उपाय आहे.\n• **फायदे:**\n  1. नैसर्गिक दातांसारखीच आकर्षक दिसणारी रचना व मजबुती.\n  2. शेजारच्या चांगल्या दातांना घासण्याची किंवा त्रास देण्याची गरज नाही.\n  3. जबड्याच्या हाडाची झीज रोखली जाते.\n  4. योग्य काळजी घेतल्यास आयुष्यभर टिकतात.\n\nडॉ. अंकिता गोकलानी (M.D.S, Ex-Asst. Professor Ghati Hospital) यांच्याकडे इम्प्लांट सल्ल्यासाठी **९९२२३००८४२** वर संपर्क साधा!`;
    }
    return `**Benefits of Dental Implants:**\n\nDental implants are the gold standard for replacing missing teeth. They consist of bio-compatible titanium posts inserted into the jawbone, topped with custom porcelain crowns.\n\n• **Key Advantages:**\n  1. **Feels & Looks Natural:** Functions just like your real teeth for chewing and speaking.\n  2. **Bone Preservation:** Stimulates and preserves natural jawbone density.\n  3. **Protects Adjacent Teeth:** Unlike dental bridges, neighboring healthy teeth remain untouched.\n  4. **Long-Term Longevity:** Built to last a lifetime with standard brushing and flossing.\n\nFor an implant assessment with Dr. Ankita Goklani (M.D.S), call **9922300842** or book an appointment today!`;
  }

  // 3. Timings, Address & Clinic Info
  if (query.includes("timing") || query.includes("hours") || query.includes("address") || query.includes("location") || query.includes("कधी") || query.includes("पत्ता") || query.includes("वेळ")) {
    if (isMarathi) {
      return `**डॉ. अंकिता गोकलानीज् एलाईट डेंटल केअर (दातांचा दवाखाना):**\n\n• **पत्ता:** ७१/ए, डॉ. एस. एस. नथानीज् सनी क्लिनिक, न्यू शांतीनिकेतन कॉलनी, जवाहर कॉलनी, छत्रपती संभाजीनगर.\n• **सकाळची वेळ:** १०:०० ते दुपारी २:००\n• **संध्याकाळची वेळ:** ५:०० ते रात्री ९:००\n• **रविवार:** पूर्वसंध्येने अपॉइंटमेंटनुसार\n• **फोन क्रमांक:** ९९२२३००८४२\n\nतुम्ही या वेबसाईटवरून थेट अपॉइंटमेंट बुक करू शकता!`;
    }
    return `**Dr. Ankita Goklani's Elite Dental Care Details:**\n\n• **Address:** 71/A, C/O Dr. S.S. Nathani's Sunny Clinic, New Shantiniketan Colony, Jawahar Colony, Chhatrapati Sambhajinagar.\n• **Morning Session:** 10:00 AM to 2:00 PM\n• **Evening Session:** 5:00 PM to 9:00 PM\n• **Sunday:** On Appointment Basis\n• **Direct Helpline:** 9922300842\n\nYou can book an appointment slot directly through this website!`;
  }

  // 4. Children / Pediatric Dental Care
  if (query.includes("child") || query.includes("kid") || query.includes("pediatric") || query.includes("मुले") || query.includes("बाळ")) {
    if (isMarathi) {
      return `**लहान मुलांचे दंत उपचार (Pediatric Dentistry):**\n\nहोय, डॉ. अंकिता गोकलानी मुलांसाठी अत्यंत काळजीपूर्वक व स्नेहाळ दंत उपचार पुरवतात:\n\n• लहान मुलांच्या दातांच्या किडीवर उपचार व फिलींग.\n• किड रोखण्यासाठी फ्लुओराइड वार्निश (Fluoride Coating).\n• दुधाच्या दातांचे रक्षण व ओरल हायजीन मार्गदर्शन.\n\nक्लिनिकमध्ये संपर्क साधण्यासाठी **९९२२३००८४२** वर कॉल करा!`;
    }
    return `**Pediatric & Child Dental Care:**\n\nYes! Dr. Ankita Goklani provides gentle, child-friendly dental care in a stress-free environment:\n\n• **Preventive Protection:** Cavity-preventing Fluoride Varnish & Sealants.\n• **Tooth Restoration:** Painless tooth-colored fillings for milk teeth.\n• **Habit Correction:** Guidance and appliances for thumb-sucking or tongue thrusting.\n\nBook a visit for your child or call **9922300842**!`;
  }

  // 5. Braces / Aligners / Orthodontics
  if (query.includes("brace") || query.includes("aligner") || query.includes("straight") || query.includes("वेडेवाकडे") || query.includes("तार")) {
    if (isMarathi) {
      return `**वेडेवाकडे व पुढे असलेले दात सरळ करणे (Orthodontic Braces & Aligners):**\n\n• **उपलब्ध पर्याय:** मेटल ब्रेसेस, सेरामिक ब्रेसेस आणि इनव्हिजिबल अलाईनर्स (Invisalign).\n• **फायदे:** दातांची रचना सुंदर होते, हसू आकर्षक बनते आणि अन्न चावणे सोपे होते.\n\nअधिक माहितीसाठी क्लिनिकमध्ये **९९२२३००८४२** वर संपर्क साधा!`;
    }
    return `**Teeth Straightening & Alignment (Braces & Clear Aligners):**\n\nWe offer modern orthodontic solutions to correct crooked, crowded, or protruding teeth:\n\n• Metal Braces, Ceramic Tooth-Colored Braces, and Clear Invisible Aligners.\n• Improves smile aesthetics, bite alignment, and overall oral health.\n\nSchedule a consultation with Dr. Ankita Goklani at **9922300842**!`;
  }

  // Default General Guidance Response
  if (isMarathi) {
    return `**डॉ. अंकिता गोकलानीज् एलाईट डेंटल केअर मध्ये आपले स्वागत आहे!**\n\nआमच्या क्लिनिकमध्ये खालील सर्व आधुनिक दंत उपचार उपलब्ध आहेत:\n• डिजिटल दंत एक्स-रे व दातांची फिलींग\n• वेदनाशामक रूट कॅनाल ट्रिटमेंट (RCT)\n• इम्प्लांट पद्धतीने व कायमस्वरूपी कृत्रिम दात बसवणे\n• लहान मुलांचे दंत उपचार व अक्कल दाढ काढणे\n\nडॉ. अंकिता गोकलानी (B.D.S, M.D.S - Ex-Asst. Professor, Ghati Hospital) यांच्या सल्ल्यासाठी **९९२२३००८४२** वर कॉल करा किंवा ऑनलाईन अपॉइंटमेंट बुक करा!`;
  }

  return `**Welcome to Dr. Ankita Goklani's Elite Dental Care!**\n\nWe offer comprehensive, modern, and hygiene-focused dental treatments in Jawahar Colony, Chhatrapati Sambhajinagar:\n\n• **Digital Dental X-Ray & Fillings:** Quick, low-radiation imaging and invisible composite fillings.\n• **Painless Root Canal (RCT):** Single-sitting infection treatment preserving natural teeth.\n• **Dental Implants & Crowns:** Permanent tooth replacement with high-strength zirconia/ceramic crowns.\n• **Pediatric & Braces Care:** Child-friendly dentistry and teeth alignment solutions.\n\nTo schedule a consultation with Dr. Ankita Goklani (M.D.S), please call **9922300842** or click "Book Appointment" above!`;
}

// API Routes
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", clinic: "Dr. Ankita Goklani's Elite Dental Care" });
});

// Get clinic info
app.get("/api/clinic-info", (_req, res) => {
  res.json({
    name: "Dr. Ankita Goklani's Elite Dental Care",
    marathiName: "डॉ. अंकिता गोकलानीज् एलाईट डेंटल केअर (दातांचा दवाखाना)",
    doctor: {
      name: "Dr. Ankita Amar Goklani",
      qualifications: [
        "B.D.S (C.S.M.S.S Dental College, Aurangabad)",
        "M.D.S (Govt. Dental College and Hospital, Chh. Sambhaji Nagar)",
        "Ex-Asst. Professor (Ghati Hospital, Chh. Sambhaji Nagar)"
      ],
      title: "Consultant Oral Physician and Dental Surgeon",
      regNo: "Reg. No. A-29912"
    },
    contact: {
      phone: "9922300842",
      formattedPhone: "+91 9922300842",
      address: "71/A, C/O Dr. S.S. Nathani's Sunny Clinic, New Shantiniketan Colony, Jawahar Colony, Chhatrapati Sambhajinagar",
      city: "Chhatrapati Sambhajinagar"
    },
    timings: {
      morning: "10:00 AM to 2:00 PM",
      evening: "5:00 PM to 9:00 PM",
      sunday: "On Appointment Basis"
    },
    facilities: [
      { id: "xray", en: "Digital Dental X-Ray", mr: "डिजिटल दंत एक्स-रे", desc: "Instant low-radiation digital radiography for accurate diagnosis." },
      { id: "filling", en: "Tooth-Colored Fillings", mr: "दातांच्या रंगाची फिलींग", desc: "Invisible composite restorations matching your natural tooth color." },
      { id: "rct", en: "Root Canal Treatment", mr: "रूट कॅनाल ट्रिटमेंट", desc: "Painless single-sitting root canal therapy to relieve severe tooth pain and preserve natural teeth." },
      { id: "crowns", en: "Fixed Crown & Bridge", mr: "कायमस्वरूपी कृत्रिम दात बसवणे", desc: "High-strength ceramic, metal-free zirconia, and porcelain crowns for functional restoration." },
      { id: "dentures", en: "Full or Partial Dentures", mr: "दातांची पुर्ण किंवा अंशिक कृत्रिम कवळी बनवणे", desc: "Comfortable, custom-fitted removable or fixed prosthetic dentures." },
      { id: "implants", en: "Dental Implants", mr: "इम्प्लांट पध्दतीने दात बसवणे", desc: "Permanent titanium implants mimicking natural root structures for missing teeth." },
      { id: "wisdom", en: "Wisdom Tooth Extraction", mr: "अक्कल दाढ काढणे", desc: "Gentle surgical and non-surgical wisdom tooth removal by specialist oral physician." },
      { id: "pediatric", en: "Pediatric Dental Care", mr: "लहान मुलांचे सर्व दंत उपचार", desc: "Child-friendly dental treatments including cavity fluoride coating, sealants, and gentle care." },
      { id: "ortho", en: "Teeth Straightening & Alignment", mr: "वेडेवाकडे व पुढे असलेले दात सरळ करणे", desc: "Modern braces and clear invisible aligners for perfect smile alignment." }
    ]
  });
});

// Book appointment endpoint
app.post("/api/appointments", (req, res) => {
  const { patientName, phone, age, service, preferredDate, preferredSlot, symptoms } = req.body;

  if (!patientName || !phone || !service || !preferredDate || !preferredSlot) {
    return res.status(400).json({ error: "Missing required booking details (Name, Phone, Service, Date, Time slot)" });
  }

  const id = "EDC-" + Math.floor(1000 + Math.random() * 9000);
  const newAppointment: Appointment = {
    id,
    patientName,
    phone,
    age: age || "N/A",
    service,
    preferredDate,
    preferredSlot,
    symptoms: symptoms || "General Consultation",
    status: "Confirmed",
    createdAt: new Date().toISOString()
  };

  appointmentsStore.unshift(newAppointment);

  // Generate WhatsApp pre-filled text
  const waMessage = encodeURIComponent(
    `Hello Dr. Ankita Goklani's Elite Dental Care,\nI would like to confirm my appointment:\n\n*Booking ID:* ${id}\n*Name:* ${patientName}\n*Phone:* ${phone}\n*Service:* ${service}\n*Date:* ${preferredDate}\n*Time Slot:* ${preferredSlot}\n*Notes/Symptoms:* ${symptoms || 'None'}\n\nThank you!`
  );
  const whatsappUrl = `https://wa.me/919922300842?text=${waMessage}`;

  return res.status(201).json({
    success: true,
    appointment: newAppointment,
    whatsappUrl,
    message: "Appointment booked successfully! You can also send this summary directly on WhatsApp."
  });
});

// List appointments
app.get("/api/appointments", (_req, res) => {
  res.json({ appointments: appointmentsStore });
});

// AI Dental Assistant Endpoint powered by Gemini 3.6 Flash & Knowledge Base Engine
app.post("/api/dental-consult", async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = getGeminiClient();
    
    if (ai) {
      try {
        const systemInstruction = `
You are the AI Dental Health & Patient Assistant for "Dr. Ankita Goklani's Elite Dental Care" (डॉ. अंकिता गोकलानीज् एलाईट डेंटल केअर), located in Jawahar Colony, Chhatrapati Sambhajinagar.
Doctor Information:
- Dr. Ankita Amar Goklani
- Qualifications: B.D.S (C.S.M.S.S Dental College, Aurangabad), M.D.S (Govt. Dental College & Hospital, Chh. Sambhaji Nagar), Ex-Asst. Professor (Ghati Hospital, Chh. Sambhaji Nagar).
- Title: Consultant Oral Physician and Dental Surgeon (Reg. No. A-29912).
- Clinic Phone: 9922300842
- Address: 71/A, C/O Dr. S.S. Nathani's Sunny Clinic, New Shantiniketan Colony, Jawahar Colony, Chhatrapati Sambhajinagar.
- Timings: Morning 10:00 AM to 2:00 PM | Evening 5:00 PM to 9:00 PM | Sunday: On Appointment Basis.

Available Treatments at Clinic:
1. Digital Dental X-Ray (डिजिटल दंत एक्स-रे)
2. Tooth-Colored Fillings (दातांच्या रंगाची फिलींग)
3. Root Canal Treatment / RCT (रूट कॅनाल ट्रिटमेंट)
4. Fixed Crown & Bridge (कायमस्वरूपी कृत्रिम दात बसवणे)
5. Full & Partial Dentures (दातांची पुर्ण किंवा अंशिक कृत्रिम कवळी बनवणे)
6. Dental Implants (इम्प्लांट पध्दतीने दात बसवणे)
7. Wisdom Tooth Extraction (अक्कल दाढ काढणे)
8. Pediatric Dental Care (लहान मुलांचे सर्व दंत उपचार)
9. Orthodontics / Teeth Straightening (वेडेवाकडे व पुढे असलेले दात सरळ करणे)

Your guidelines:
- Be extremely warm, polite, reassuring, professional, and hygiene-conscious.
- Understand both English and Marathi inputs or mixed Hinglish/Marathi phrases.
- Provide general dental guidance, explain procedures simply (e.g. why RCT is painless with modern anesthesia, benefits of dental implants over traditional bridges, digital X-ray safety, child dental hygiene tips).
- Emphasize that while AI provides helpful information, a clinical examination by Dr. Ankita Goklani is essential for precise diagnosis.
- Encourage booking an appointment or calling 9922300842.
- Keep answers concise (2 to 4 paragraphs or structured bullet points).
`;

        // Construct prompt with history
        let promptContext = "Conversation History:\n";
        for (const msg of conversationHistory) {
          promptContext += `${msg.sender === 'user' ? 'Patient' : 'Assistant'}: ${msg.text}\n`;
        }
        promptContext += `Patient: ${message}\nAssistant:`;

        const response = await ai.models.generateContent({
          model: "gemini-3.6-flash",
          contents: promptContext,
          config: {
            systemInstruction,
            temperature: 0.7,
          }
        });

        if (response && response.text) {
          return res.json({
            reply: response.text,
            source: "gemini",
            suggestedActions: [
              "Book Appointment",
              "Call Clinic (9922300842)",
              "Check Clinic Timings",
              "View Treatment Fees & Details"
            ]
          });
        }
      } catch (geminiError: any) {
        console.warn("Gemini API call failed, falling back to Knowledge Base:", geminiError.message || geminiError);
      }
    }

    // Knowledge Base Engine fallback (guarantees an answer)
    const fallbackReply = getKnowledgeBaseResponse(message);
    return res.json({
      reply: fallbackReply,
      source: "knowledge_base",
      suggestedActions: [
        "Book Appointment",
        "Call Clinic (9922300842)",
        "Check Clinic Timings",
        "View Treatment Fees & Details"
      ]
    });

  } catch (error: any) {
    console.error("Dental Consult Route Error:", error);
    // Return friendly knowledge response instead of 500 error
    const fallbackReply = getKnowledgeBaseResponse(req.body?.message || "");
    return res.json({
      reply: fallbackReply,
      source: "fallback",
      suggestedActions: [
        "Book Appointment",
        "Call Clinic (9922300842)"
      ]
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Dr. Ankita Goklani's Elite Dental Care server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
