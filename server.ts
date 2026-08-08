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

// Initialize Gemini client server-side
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build'
    }
  }
});

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

// AI Dental Assistant Endpoint powered by Gemini 3.6 Flash
app.post("/api/dental-consult", async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

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

    const reply = response.text || "I apologize, I couldn't process your query. Please call Dr. Ankita Goklani's clinic directly at 9922300842 for assistance!";

    return res.json({
      reply,
      suggestedActions: [
        "Book Appointment",
        "Call Clinic (9922300842)",
        "Check Clinic Timings",
        "View Treatment Fees & Details"
      ]
    });
  } catch (error: any) {
    console.error("Gemini Dental Consult Error:", error);
    return res.status(500).json({
      error: "Failed to connect to AI Assistant",
      details: error.message || String(error)
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
