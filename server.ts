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
  const isMarathi = /[\u0900-\u097F]/.test(userQuery) || query.includes("marathi") || query.includes("कधी") || query.includes("काय") || query.includes("माहिती") || query.includes("नाही") || query.includes("आहे");

  // Greetings
  if (query.match(/^(hi|hello|hey|namaste|greetings|नमस्ते|नमस्कार)/i)) {
    if (isMarathi) {
      return `**नमस्ते! डॉ. अंकिता गोकलानीज् एलाईट डेंटल केअरमध्ये आपले सहर्ष स्वागत आहे.**\n\nमी डॉ. अंकिता गोकलानी यांची एआय असिस्टंट आहे. दातांचे दुखणे, रूट कॅनाल, इम्प्लांट, दात साफ करणे, लहान मुलांचे दात किंवा अपॉइंटमेंटबद्दल मी तुम्हाला मदत करू शकते.\n\nतुम्हाला काय अडचण आहे ते सांगा किंवा **९९२२३००८४२** वर कॉल करा!`;
    }
    return `**Hello and welcome to Dr. Ankita Goklani's Elite Dental Care!**\n\nI am Dr. Ankita's AI Dental Assistant. How can I assist you with your dental health today?\n\nYou can ask me about Toothache Relief, Root Canal (RCT), Dental Implants, Teeth Whitening, Braces, Clinic Timings, or Booking an Appointment!`;
  }

  // 1. Toothache / Pain / Emergency
  if (query.includes("pain") || query.includes("toothache") || query.includes("ache") || query.includes("hurt") || query.includes("swell") || query.includes("दुखणे") || query.includes("सुज") || query.includes("कळ") || query.includes("वेदना")) {
    if (isMarathi) {
      return `**दातदुखी किंवा सुज आल्यास तातडीचे मार्गदर्शन:**\n\n• **तात्पुरता दिलासा:** कोमट पाण्यात थोडे मीठ घालून गुळण्या करा. दुखणाऱ्या दातावर दाब देऊ नका.\n• **काय करू नये:** दुखणाऱ्या दातावर थेट पेनकिलर गोळी किंवा बाम ठेवू नका, यामुळे हिरडीला दुखापत होऊ शकते.\n• **उपचार:** दातामध्ये कीड खोलवर गेल्याने किंवा संसर्गामुळे दुखणे होते. यासाठी डिजिटल एक्स-रे काढून रूट कॅनाल (RCT) किंवा फिलींगची गरज असू शकते.\n\nतात्काळ तपासणीसाठी डॉ. अंकिता गोकलानी (M.D.S) यांच्याशी **९९२२३००८४२** वर संपर्क साधा किंवा क्लिनिकला भेट द्या!`;
    }
    return `**Toothache & Pain Management Advice:**\n\n• **Immediate Relief:** Rinse your mouth gently with warm salt water. Avoid chewing on the painful side.\n• **Important Warning:** Do not place aspirin or painkiller tablets directly against the aching tooth or gum, as it can cause tissue burns.\n• **Root Cause & Treatment:** Severe pain usually indicates deep decay or pulp infection. Dr. Ankita Goklani can evaluate with a quick digital X-ray and perform a painless Root Canal or Filling.\n\nFor urgent attention, please call our clinic helpline directly at **9922300842** or book an immediate appointment slot!`;
  }

  // 2. Root Canal Treatment (RCT)
  if (query.includes("rct") || query.includes("root canal") || query.includes("कॅनाल") || query.includes("रूट")) {
    if (isMarathi) {
      return `**रूट कॅनाल ट्रिटमेंट (RCT) ची सविस्तर माहिती:**\n\n• **वेदना होतात का?** अजिबात नाही! आधुनिक लोकल ॲनेस्थेशियामुळे उपचार पूर्णपणे त्रासमुक्त आणि सुखकर होतो.\n• **हा उपचार का केला जातो?** किडलेला किंवा संसर्ग झालेला दात काढण्याऐवजी तो कायमचा वाचवण्यासाठी RCT सर्वोत्तम उपाय आहे.\n• **फायदे:** दातदुखी लगेच थांबते आणि तुमचा नैसर्गिक दात सुरक्षित राहतो.\n• **सिटिंग्स:** बहुतांश केसेसमध्ये सिंगल सिटिंग किंवा २ टप्प्यांत उपचार पूर्ण होतो.\n\nडॉ. अंकिता गोकलानी (M.D.S) यांच्याशी जवाहर कॉलनी, छत्रपती संभाजीनगर येथील क्लिनिकमध्ये सल्ल्यासाठी **९९२२३००८४२** वर संपर्क साधा!`;
    }
    return `**Root Canal Treatment (RCT) Details:**\n\n• **Is RCT Painful?** No! With modern local anesthesia, Root Canal Treatment is virtually painless and provides instant relief from severe tooth pain.\n• **Why is it done?** RCT cleans and disinfects the interior pulp of a deeply decayed tooth, preserving your natural tooth so extraction is avoided.\n• **Process:** The infection is cleaned out, sealed, and protected with a durable tooth crown.\n\nTo schedule a consultation with Dr. Ankita Goklani (M.D.S), call **9922300842** or book an appointment online!`;
  }

  // 3. Dental Implants / Missing Teeth
  if (query.includes("implant") || query.includes("इम्प्लांट") || query.includes("missing") || query.includes("नात बसवणे") || query.includes("दात बसवणे")) {
    if (isMarathi) {
      return `**इम्प्लांट पद्धतीने दात बसवणे (Dental Implants):**\n\n• **काय आहे इम्प्लांट?** इम्प्लांट हा पडलेल्या किंवा काढलेल्या दातांच्या जागी नैसर्गिक दातासारखाच मजबूत दात बसवण्याचा कायमस्वरूपी उपाय आहे.\n• **फायदे:**\n  1. नैसर्गिक दातांसारखीच मजबुती आणि देखावा.\n  2. शेजारच्या चांगल्या दातांना कोणतीही इजा न करता उपचार.\n  3. जबड्याच्या हाडाची झीज रोखली जाते.\n  4. योग्य काळजी घेतल्यास आयुष्यभर टिकतात.\n\nडॉ. अंकिता गोकलानी (M.D.S, Ex-Asst. Professor Ghati Hospital) यांच्याकडे इम्प्लांट सल्ल्यासाठी **९९२२३००८४२** वर संपर्क साधा!`;
    }
    return `**Benefits of Dental Implants:**\n\nDental implants are the gold standard for replacing missing teeth. They consist of bio-compatible titanium posts inserted into the jawbone, topped with custom crowns.\n\n• **Key Advantages:**\n  1. **Feels & Looks Natural:** Restores full chewing strength.\n  2. **Protects Adjacent Teeth:** Healthy neighboring teeth stay untouched.\n  3. **Prevents Bone Loss:** Keeps jaw structure firm and youthful.\n\nFor an implant assessment with Dr. Ankita Goklani (M.D.S), call **9922300842** or book an appointment today!`;
  }

  // 4. Cleaning, Scaling, Whitening, Stains
  if (query.includes("clean") || query.includes("scale") || query.includes("scaling") || query.includes("whiten") || query.includes("stain") || query.includes("yellow") || query.includes("साफ") || query.includes("पांढरे") || query.includes("पिवळे") || query.includes("किटण")) {
    if (isMarathi) {
      return `**दात साफ करणे व पॉलिशिंग (Scaling & Whitening):**\n\n• **दात साफ केल्याने दात सैल होतात का?** हा एक गैरसमज आहे! अल्ट्रासोनिक क्लिनिंगने दातांवरील किटण आणि प्लेक निघून हिरड्या मजबूत होतात.\n• **फायदे:** तोंडाचा वास दूर होतो, हिरड्यांमधून रक्त येणे थांबते आणि दात स्वच्छ व चमकदार दिसतात.\n• **कालावधी:** दर ६ महिन्यांनी एकदा प्रोफेशनल क्लिनिंग करून घेणे ओरल हायजीनसाठी उत्तम मानले जाते.\n\nअधिक माहितीसाठी डॉ. अंकिता गोकलानी यांच्याशी **९९२२३००८४२** वर संपर्क साधा!`;
    }
    return `**Teeth Cleaning, Scaling & Whitening:**\n\n• **Does Scaling weaken teeth?** Not at all! Ultrasonic scaling removes harmful tartar and bacterial plaque without damaging enamel.\n• **Benefits:** Eliminates bad breath, prevents gum bleeding, and brightens your smile.\n• **Frequency:** Dentists recommend professional cleaning once every 6 months for optimal oral health.\n\nSchedule a painless ultrasonic cleaning session with Dr. Ankita Goklani by calling **9922300842**!`;
  }

  // 5. Cavity / Decay / Fillings
  if (query.includes("cavity") || query.includes("decay") || query.includes("fill") || query.includes("hole") || query.includes("black") || query.includes("किड") || query.includes("भरणे") || query.includes("खड्डा")) {
    if (isMarathi) {
      return `**दात किडणे व दातांची फिलींग (Tooth-Colored Fillings):**\n\n• **उपचार:** दातातील लहान किंवा मध्यम कीड वेळेवर काढून दाताच्या रंगाच्या कॉम्पोझिट (Composite) फिलींगने दात पूर्ववत केला जातो.\n• **फायदे:** फिलींग अजिबात दिसून येत नाही आणि कीड खोलवर जाऊन रूट कॅनालची वेळ येत नाही.\n\nतुमच्या दातांची आजच मोफत तपासणी सल्ल्यासाठी **९९२२३००८४२** वर कॉल करा!`;
    }
    return `**Tooth Decay & Invisible Tooth-Colored Fillings:**\n\n• **Treatment:** Early cavities are cleaned out and restored with high-grade tooth-colored composite resin.\n• **Advantages:** Seamless cosmetic match with natural teeth, restoring strength and preventing deep decay that leads to root canals.\n\nBook a dental checkup with Dr. Ankita Goklani today at **9922300842**!`;
  }

  // 6. Wisdom Tooth / Extractions
  if (query.includes("wisdom") || query.includes("extract") || query.includes("remove") || query.includes("pull") || query.includes("अक्कल") || query.includes("काढणे")) {
    if (isMarathi) {
      return `**अक्कल दाढ व दात काढण्याचे उपचार (Painless Extractions):**\n\n• **अक्कल दाढ का दुखते?** जेव्हा अक्कल दाढ जागेभावी तिरपी येते किंवा हिरडीत अडकते, तेव्हा तीव्र वेदना व सुज येते.\n• **उपचार:** डॉ. अंकिता गोकलानी (Oral Physician Specialist) यांच्याद्वारे सौम्य व त्रासमुक्त पद्धतीने दात काढला जातो.\n\nसल्ल्यासाठी **९९२२३००८४२** वर कॉल करा किंवा क्लिनिकला भेट द्या!`;
    }
    return `**Wisdom Tooth Pain & Gentle Extractions:**\n\n• **Why Wisdom Teeth Hurt:** Impacted or misaligned wisdom teeth cause pressure, gum swelling, and localized pain.\n• **Expert Care:** Dr. Ankita Goklani specializes in gentle, painless extractions using localized numbing for maximum patient comfort.\n\nSchedule an evaluation by calling **9922300842**!`;
  }

  // 7. Braces / Aligners / Straightening
  if (query.includes("brace") || query.includes("aligner") || query.includes("straight") || query.includes("invisalign") || query.includes("वेडेवाकडे") || query.includes("तार")) {
    if (isMarathi) {
      return `**वेडेवाकडे दात सरळ करणे (Braces & Clear Aligners):**\n\n• **उपलब्ध पर्याय:** मेटल ब्रेसेस, सेरामिक ब्रेसेस आणि इनव्हिजिबल अलाईनर्स (Invisalign).\n• **फायदे:** दातांची रचना सुंदर होते, हसू आकर्षक बनते आणि अन्न चावणे सोपे होते.\n\nअधिक माहितीसाठी क्लिनिकमध्ये **९९२२३००८४२** वर संपर्क साधा!`;
    }
    return `**Teeth Alignment (Braces & Clear Aligners):**\n\nWe offer modern orthodontic solutions to correct crooked, crowded, or protruding teeth:\n\n• **Options:** Traditional Metal Braces, Tooth-Colored Ceramic Braces, and Invisible Clear Aligners.\n• **Benefits:** Improves bite alignment, facial profile, and smile confidence.\n\nSchedule a consultation with Dr. Ankita Goklani at **9922300842**!`;
  }

  // 8. Bleeding Gums / Bad Breath / Pyorrhea
  if (query.includes("gum") || query.includes("bleed") || query.includes("smell") || query.includes("breath") || query.includes("pyorrhea") || query.includes("रक्त") || query.includes("वास") || query.includes("पायरीया")) {
    if (isMarathi) {
      return `**हिरड्यांमधून रक्त येणे व तोंडाचा वास (Gum Care & Pyorrhea):**\n\n• **कारण:** दातांवर साचलेला पिवळा थर (Plaque/Tartar) हिरड्यांना संसर्ग पोहोचवतो.\n• **उपचार:** प्रोफेशनल स्केलिंग आणि गम्स मसाज जेलने हिरड्या निरोगी होतात.\n\nडॉ. अंकिता गोकलानी यांच्याशी **९९२२३००८४२** वर संपर्क साधा!`;
    }
    return `**Bleeding Gums & Bad Breath Treatment:**\n\n• **Cause:** Plaque and tartar accumulation along the gumline irritate gum tissues, causing bleeding and mouth odor.\n• **Solution:** Ultrasonic scaling and specialized antiseptic rinses restore firm, healthy gums.\n\nContact Dr. Ankita Goklani at **9922300842** for a gum checkup!`;
  }

  // 9. Sensitivity / Cold / Hot
  if (query.includes("sensit") || query.includes("cold") || query.includes("hot") || query.includes("sweet") || query.includes("शिणशिण") || query.includes("थंड") || query.includes("गरम")) {
    if (isMarathi) {
      return `**दात शिणशिणणे (Dental Sensitivity):**\n\n• **कारण:** दातांचे बाहेरील एनेमल आवरण झिजल्याने थंड किंवा गरम खाताना कळ मारते.\n• **उपचार:** डिसेंन्सिटायझिंग टूथपेस्ट, फ्लुओराइड अ‍ॅप्लिकेशन किंवा फिलींग द्वारे त्वरीत आराम मिळतो.\n\nसल्ल्यासाठी **९९२२३००८४२** वर संपर्क साधा!`;
    }
    return `**Tooth Sensitivity Management:**\n\n• **Causes:** Enamel wear, exposed dentin, or gum recession causing sharp zings with cold or hot foods.\n• **Solutions:** Desensitizing pastes, in-clinic fluoride varnishes, or restorative sealants.\n\nBook a visit with Dr. Ankita Goklani at **9922300842**!`;
  }

  // 10. Cost / Fees / Charges
  if (query.includes("cost") || query.includes("fee") || query.includes("price") || query.includes("charge") || query.includes("rate") || query.includes("फी") || query.includes("खर्च") || query.includes("दर")) {
    if (isMarathi) {
      return `**उपचारांचे शुल्क व फी माहिती:**\n\nडॉ. अंकिता गोकलानीज् एलाईट डेंटल केअरमध्ये अत्यंत वाजवी आणि परवडणाऱ्या दरात उच्च दर्जाचे दंत उपचार पुरवले जातात.\n\n• प्रत्येक रुग्णाच्या दातांची स्थिती वेगळी असल्याने क्लिनिकमध्ये प्रत्यक्ष तपासणीनंतर अचूक अंदाज दिला जातो.\n• अपॉइंटमेंट बुक करण्यासाठी **९९२२३००८४२** वर कॉल करा!`;
    }
    return `**Treatment Fees & Cost Information:**\n\nDr. Ankita Goklani's Elite Dental Care provides high-quality, hygiene-focused dental treatments at fair and transparent prices.\n\n• Since treatment scope depends on individual clinical conditions, Dr. Ankita Goklani provides exact estimates after a brief examination.\n• Call **9922300842** or click "Book Appointment" to reserve a consultation slot!`;
  }

  // 11. Timings, Address, Location
  if (query.includes("timing") || query.includes("hours") || query.includes("address") || query.includes("location") || query.includes("where") || query.includes("pincode") || query.includes("पत्ता") || query.includes("कुठे") || query.includes("वेळ")) {
    if (isMarathi) {
      return `**डॉ. अंकिता गोकलानीज् एलाईट डेंटल केअर:**\n\n• **पत्ता:** ७१/ए, डॉ. एस. एस. नथानीज् सनी क्लिनिक, न्यू शांतीनिकेतन कॉलनी, जवाहर कॉलनी, छत्रपती संभाजीनगर.\n• **सकाळची वेळ:** १०:०० ते दुपारी २:००\n• **संध्याकाळची वेळ:** ५:०० ते रात्री ९:००\n• **रविवार:** पूर्वसंध्येने अपॉइंटमेंटनुसार\n• **फोन क्रमांक:** ९९२२३००८४२`;
    }
    return `**Dr. Ankita Goklani's Elite Dental Care Details:**\n\n• **Address:** 71/A, C/O Dr. S.S. Nathani's Sunny Clinic, New Shantiniketan Colony, Jawahar Colony, Chhatrapati Sambhajinagar.\n• **Morning Session:** 10:00 AM to 2:00 PM\n• **Evening Session:** 5:00 PM to 9:00 PM\n• **Sunday:** On Appointment Basis\n• **Direct Helpline:** 9922300842`;
  }

  // 12. Doctor Background
  if (query.includes("doctor") || query.includes("ankita") || query.includes("goklani") || query.includes("qualification") || query.includes("experience") || query.includes("डॉक्टर")) {
    if (isMarathi) {
      return `**डॉ. अंकिता अमर गोकलानी यांची माहिती:**\n\n• **पदवी:** B.D.S, M.D.S (Govt. Dental College & Hospital, Chh. Sambhaji Nagar).\n• **अनुभव:** माजी सहाय्यक प्राध्यापक (घाटी हॉस्पिटल, छत्रपती संभाजीनगर).\n• **विशेषज्ञता:** ओरल फिजिशियन व दंत शल्यचिकित्सक (Reg. No. A-29912).\n\nसल्ल्यासाठी **९९२२३००८४२** वर संपर्क साधा!`;
    }
    return `**About Dr. Ankita Amar Goklani:**\n\n• **Qualifications:** B.D.S (C.S.M.S.S Dental College), M.D.S (Govt. Dental College & Hospital, Chh. Sambhaji Nagar).\n• **Experience:** Ex-Assistant Professor at Ghati Hospital, Chhatrapati Sambhajinagar.\n• **Specialization:** Consultant Oral Physician & Dental Surgeon (Reg. No. A-29912).\n\nTo consult Dr. Ankita Goklani, call **9922300842**!`;
  }

  // Default General Guidance Response
  if (isMarathi) {
    return `**डॉ. अंकिता गोकलानीज् एलाईट डेंटल केअर मध्ये आपले स्वागत आहे!**\n\nतुमच्या प्रश्नाबाबत आमचे क्लिनिक पूर्ण मार्गदर्शन पुरवते. आमच्याकडे खालील सर्व आधुनिक दंत उपचार उपलब्ध आहेत:\n• डिजिटल दंत एक्स-रे व दातांची कॉम्पोझिट फिलींग\n• वेदनाशामक रूट कॅनाल ट्रिटमेंट (RCT)\n• इम्प्लांट पद्धतीने व कायमस्वरूपी कृत्रिम दात बसवणे\n• लहान मुलांचे दंत उपचार व अक्कल दाढ काढणे\n\nडॉ. अंकिता गोकलानी (M.D.S) यांच्या सल्ल्यासाठी **९९२२३००८४२** वर कॉल करा किंवा ऑनलाईन अपॉइंटमेंट बुक करा!`;
  }

  return `**Welcome to Dr. Ankita Goklani's Elite Dental Care!**\n\nRegarding your query, Dr. Ankita Goklani provides personalized consultation for all dental concerns in Jawahar Colony, Chhatrapati Sambhajinagar:\n\n• **Digital X-Rays & Tooth Fillings:** Quick diagnosis & aesthetic restorations.\n• **Painless Root Canal (RCT):** Single-sitting infection treatment preserving natural teeth.\n• **Dental Implants & Zirconia Crowns:** Permanent natural-looking tooth replacements.\n• **Pediatric Care & Braces:** Gentle child dentistry and alignment.\n\nTo consult Dr. Ankita Goklani (M.D.S), please call **9922300842** or click "Book Appointment" above!`;
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
app.post(["/api/dental-consult", "/api/chat"], async (req, res) => {
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
