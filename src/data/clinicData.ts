import { DoctorInfo, Facility, SmileTransformation, FAQItem, PatientReview } from '../types';

export const doctorDetails: DoctorInfo = {
  name: "Dr. Ankita Amar Goklani",
  marathiName: "डॉ. अंकिता अमर गोकलानी",
  degrees: [
    "B.D.S (C.S.M.S.S Dental College, Aurangabad)",
    "M.D.S (Govt. Dental College and Hospital, Chh. Sambhaji Nagar)",
    "Ex-Asst. Professor (Ghati Hospital, Chh. Sambhaji Nagar)"
  ],
  degreesShort: "B.D.S, M.D.S (GDC Sambhajinagar)",
  title: "Consultant Oral Physician and Dental Surgeon",
  titleMarathi: "कन्सल्टंट ओरल फिजिशियन आणि डेंटल सर्जन",
  regNo: "Reg. No. A-29912",
  collegeBds: "C.S.M.S.S Dental College, Aurangabad",
  collegeMds: "Govt. Dental College and Hospital, Chh. Sambhaji Nagar",
  exRole: "Ex-Assistant Professor, Ghati Hospital, Chh. Sambhaji Nagar",
  bio: "Dr. Ankita Amar Goklani brings years of expert academic and clinical experience from Government Dental College and Ghati Hospital. She specializes in diagnosis, advanced painless root canal therapy, digital radiography, ceramic restorations, and pediatric dentistry. Her mission is to provide world-class, sterile, and affordable dental care in Chhatrapati Sambhajinagar.",
  bioMarathi: "डॉ. अंकिता अमर गोकलानी यांना शासकीय दंत महाविद्यालय आणि घाटी रुग्णालयातील प्रदीर्घ वैद्यकीय व अध्यापनाचा अनुभव आहे. त्या ओरल फिजिशन व डेंटल सर्जन म्हणून रूट कॅनाल, डिजिटल एक्स-रे, कॅप्स/क्राउन्स आणि लहान मुलांच्या दातांच्या उपचारात तज्ज्ञ आहेत.",
  photoUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800",
  experienceYears: 12
};

export const facilitiesData: Facility[] = [
  {
    id: "xray",
    titleEn: "Digital Dental X-Ray",
    titleMr: "डिजिटल दंत एक्स-रे",
    category: "preventive",
    iconName: "Scan",
    shortDescEn: "Instant digital radiography providing ultra-low radiation & clear tooth structure diagnostics.",
    shortDescMr: "अत्यंत कमी रेडिएशनसह काही सेकंदात दातांची अंतर्गत रचना स्पष्ट दाखवणारे डिजिटल एक्स-रे.",
    fullDescEn: "Our clinic utilizes state-of-the-art Sensor-based Digital Radiography (RVG). It captures high-definition intraoral images with up to 90% less radiation than traditional film X-rays, enabling precise detection of hidden decay, root bone health, and nerve anatomy.",
    fullDescMr: "आमच्या क्लिनिकमध्ये अत्याधुनिक डिजिटल एक्स-रे (RVG) उपलब्ध आहे. पारंपरिक एक्स-रेच्या तुलनेत ९०% कमी रेडिएशनसह कीड, हाडांचे आरोग्य आणि नसांचे निदान अचूकपणे केले जाते.",
    benefitsEn: [
      "Immediate high-resolution digital display",
      "90% reduced X-ray radiation exposure",
      "Accurate early detection of cavities between teeth",
      "Digital magnification for precise root evaluation"
    ],
    benefitsMr: [
      "काही सेकंदात कॉम्प्युटर स्क्रीनवर तात्काळ निकाल",
      "९०% कमी किरणोत्सर्ग (रेडिएशन)",
      "दातांमधील लपलेली कीड वेळीच ओळखता येते",
      "रूट कॅनाल उपचारासाठी अत्यंत अचूक मार्गदर्शन"
    ],
    durationMinutes: 5,
    painLevel: "Painless",
    procedureStepsEn: [
      "Comfortable sensor placed inside oral cavity",
      "Sub-second digital exposure",
      "Instant magnified view on HD chairside monitor",
      "Dr. Ankita explains bone & root health with patient"
    ],
    procedureStepsMr: [
      "तोंडात लहान व मऊ डिजिटल सेन्सर ठेवला जातो",
      "एक सेकंदाच्या आत डिजिटल फोटो घेतला जातो",
      "स्क्रीनवर मोठ्या आकारात दाताचे चित्र पाहिले जाते",
      "डॉक्टरांकडून चित्राच्या आधारे सविस्तर मार्गदर्शन"
    ],
    aftercareEn: ["No special aftercare needed. Proceed with planned consultation."],
    aftercareMr: ["कोणत्याही काळजीची गरज नाही, लगेच पुढील उपचार सुरू करता येतात."],
    badgeEn: "Instant Diagnosis",
    badgeMr: "तात्काळ निकाल"
  },
  {
    id: "filling",
    titleEn: "Tooth-Colored Composite Fillings",
    titleMr: "दातांच्या रंगाची फिलींग",
    category: "restorative",
    iconName: "Sparkles",
    shortDescEn: "Seamless tooth-colored composite restorations matching your exact natural shade.",
    shortDescMr: "नैसर्गिक दातासारख्याच रंगाची, मजबूत आणि न दिसणारी मऊ-कठीण कंपोझिट फिलींग.",
    fullDescEn: "Say goodbye to old silver amalgam fillings. We use aesthetic, biocompatible nano-composite resins cured with blue light technology. It chemically bonds to tooth enamel, restoring full strength, aesthetics, and preventing future decay progression.",
    fullDescMr: "जुन्या चांदीच्या किंवा काळ्या फिलींगऐवजी आता नैसर्गिक दातासारखीच सुंदर कंपोझिट फिलींग केली जाते. ही फिलींग दाताला घट्ट पकडून ठेवते आणि कीड पुढे पसरण्यापासून वाचवते.",
    benefitsEn: [
      "100% natural shade matching",
      "Strong chemical bonding with enamel",
      "Mercury-free, bio-safe materials",
      "Single sitting procedure taking 20-30 minutes"
    ],
    benefitsMr: [
      "नैसर्गिक दाताशी हुबेहूब मिळताजुळता रंग",
      "पारा (Mercury) मुक्त सुरक्षित साहित्य",
      "दाताची नैसर्गिक ताकद पूर्ववत होते",
      "अवघ्या २० ते ३० मिनिटांत एकाच वेळी पूर्ण"
    ],
    durationMinutes: 30,
    painLevel: "Painless",
    procedureStepsEn: [
      "Gentle removal of infected tooth decay",
      "Etching and bonding agent application",
      "Layering of tooth-shaded resin composite",
      "Blue LED curing light activation and high polish"
    ],
    procedureStepsMr: [
      "कीड लागलेला भाग हलक्या हाताने स्वच्छ करणे",
      "बॉन्डिंग जेल आणि दाताच्या रंगाचे साहित्य भरणे",
      "ब्लू एलईडी लाईटने साहित्य घट्ट करणे",
      "फिनिशिंग व पॉलिशिंग करून नैसर्गिक आकार देणे"
    ],
    aftercareEn: ["Avoid eating hard or extremely hot foods for 1 hour post-filling."],
    aftercareMr: ["उपचारानंतर १ तास कडक पदार्थ खाणे टाळा."],
    badgeEn: "Aesthetic",
    badgeMr: "नैसर्गिक दिसणारे"
  },
  {
    id: "rct",
    titleEn: "Root Canal Treatment (RCT)",
    titleMr: "रूट कॅनाल ट्रिटमेंट",
    category: "restorative",
    iconName: "Activity",
    shortDescEn: "Painless single-sitting rotary root canal therapy saving infected or painful teeth.",
    shortDescMr: "तीव्र दातदुखीवर मात करून मूळ दात वाचवणारी अत्यंत वेदनामुक्त व आधुनिक रूट कॅनाल ट्रिटमेंट.",
    fullDescEn: "Root Canal Treatment becomes necessary when deep decay reaches the central dental nerve pulp. Dr. Ankita Goklani uses advanced rotary Endodontics and apex locators to clean, disinfect, and seal root canals painlessly, saving the tooth from extraction.",
    fullDescMr: "जेव्हा कीड दाताच्या आतील मज्जातंतूपर्यंत पोहोचते, तेव्हा तीव्र वेदना होतात. डॉ. अंकिता गोकलानी या अत्याधुनिक रोटरी उपकरणांद्वारे वेदनाशामक भूल देऊन मूळ दात वाचवतात.",
    benefitsEn: [
      "Immediate relief from severe tooth pain",
      "Saves natural tooth from permanent extraction",
      "Single-sitting option with modern rotary instruments",
      "Biocompatible gutta-percha sealing against infections"
    ],
    benefitsMr: [
      "तीव्र दातदुखीपासून तात्काळ व कायमची मुक्ती",
      "नैसर्गिक दात काढण्यापासून बचाव",
      "आधुनिक रोटरी उपकरणांमुळे कमी वेळात पूर्ण",
      "आतील नसा पूर्णपणे सील करून संसर्ग रोखणे"
    ],
    durationMinutes: 45,
    painLevel: "Local Anesthesia",
    procedureStepsEn: [
      "Gentle localized numbing of the affected tooth area",
      "Cleaning and shaping infected root canals using flexible rotary files",
      "Antibacterial laser/ultrasound irrigation",
      "Obturation (sealing) with gutta-percha and temporary or permanent crown prep"
    ],
    procedureStepsMr: [
      "उपचाराच्या जागेवर हलकी स्थानिक भूल देणे",
      "कीड लागलेली नस व संसर्ग सूक्ष्म उपकरणांनी स्वच्छ करणे",
      "अँटीबॅक्टेरियल औषधाने कॅनाल धुवून पूर्ण साफ करणे",
      "सुरक्षित साहित्याने कॅनाल बंद (सील) करून कॅपसाठी तयार करणे"
    ],
    aftercareEn: ["Take prescribed mild painkillers. Avoid chewing hard food on that side until crown placement."],
    aftercareMr: ["डॉक्टरांनी दिलेली औषधे वेळेवर घ्या. कॅप मिळेपर्यंत त्या बाजूने कडक पदार्थ चावू नका."],
    badgeEn: "Most Popular",
    badgeMr: "अतिशय लोकप्रिय"
  },
  {
    id: "crowns",
    titleEn: "Fixed Crown & Bridge (Prosthetics)",
    titleMr: "कायमस्वरूपी कृत्रिम दात बसवणे",
    category: "restorative",
    iconName: "ShieldCheck",
    shortDescEn: "High-strength metal-free Zirconia, Ceramic, and PFM crowns restoring strength & biting function.",
    shortDescMr: "रूट कॅनालनंतर किंवा तुटलेल्या दातावर बसवली जाणारी मजबूत आणि हुबेहूब दिसणारी कॅप व ब्रीज.",
    fullDescEn: "A dental crown protects treated or weak teeth, while a dental bridge replaces missing adjacent teeth. We offer CAD-CAM milled monolithic Zirconia and E-max ceramic crowns that deliver exceptional bite force resistance and natural translucency.",
    fullDescMr: "रूट कॅनाल झालेल्या किंवा कमकुवत दाताला संरक्षण देण्यासाठी कॅप अत्यंत आवश्यक असते. आम्ही झिर्कोनिया (Zirconia) आणि सेरॅमिक कॅप्स वापरतो ज्या दाताला मूळ ताकद आणि सौंदर्य देतात.",
    benefitsEn: [
      "Restores 100% masticatory (chewing) efficiency",
      "Prevents fracture of root canal-treated teeth",
      "High translucency mimicking real tooth enamel",
      "Custom precision digital impression fit"
    ],
    benefitsMr: [
      "अन्न चावण्याची पूर्ण क्षमता पूर्ववत होते",
      "रूट कॅनाल झालेला दात फुटण्यापासून वाचतो",
      "झिर्कोनिया आणि सेरॅमिकचा नैसर्गिक चमकदार लूक",
      "५ ते १५ वर्षांपर्यंतची दीर्घकालीन वॉरंटी"
    ],
    durationMinutes: 40,
    painLevel: "Painless",
    procedureStepsEn: [
      "Precision tooth preparation and shaping",
      "Digital or elastic impression taking",
      "Custom shade matching with patient input",
      "Permanent cementation using high-grade dental cements"
    ],
    procedureStepsMr: [
      "दाताचा आकार कॅप बसवण्यासाठी व्यवस्थित करणे",
      "दाताचे अचूक माप (मापदंड) घेणे",
      "इतर दातांशी मिळताजुळता रंग निवडणे",
      "अत्याधुनिक सिमेंटच्या साहाय्याने कॅप कायमस्वरूपी फिक्स करणे"
    ],
    aftercareEn: ["Maintain daily brushing and flossing around crown margins."],
    aftercareMr: ["रोज सकाळी व रात्री कॅपच्या अवतीभवती व्यवस्थित ब्रश करा."],
    badgeEn: "Durable",
    badgeMr: "दीर्घकाळ टिकणारे"
  },
  {
    id: "dentures",
    titleEn: "Full & Partial Dentures",
    titleMr: "दातांची पुर्ण किंवा अंशिक कृत्रिम कवळी बनवणे",
    category: "restorative",
    iconName: "Smile",
    shortDescEn: "Custom-fitted flexible, acrylic, or cast-partial prosthetics for full facial structure support.",
    shortDescMr: "वयस्कर किंवा अनेक दात नसलेल्या रुग्णांसाठी आरामदायक, हलकी आणि नैसर्गिक दिसणारी कवळी.",
    fullDescEn: "Missing multiple or all teeth can impair digestion and cause facial collapse. Our custom dentures are light-weight, break-resistant, and anatomically sculpted to support your lips, cheeks, and restore confidence in smiling and speaking.",
    fullDescMr: "अनेक दात नसल्यास अन्न चावता येत नाही आणि चेहरा बसल्यासारखा दिसतो. आमची फिक्स व रिमूव्हेबल कवळी रुग्णाच्या तोंडाच्या आकाराला साजेशी, हलकी आणि खाण्यासाठी अत्यंत सोयीस्कर असते.",
    benefitsEn: [
      "Restores speech clarity and eating capabilities",
      "Supports lip and cheek facial volume",
      "Available in flexible Valplast & high-impact Lucitone acrylics",
      "Custom tooth size and gum shade selection"
    ],
    benefitsMr: [
      "स्पष्ट बोलणे आणि सहज अन्न खाणे शक्य होते",
      "गाल व ओठांना योग्य आकार मिळून तरुण दिसण्यास मदत",
      "फ्लेक्सिबल व मजबूत मटेरियलचा वापर",
      "वापरण्यास अत्यंत सोपी आणि आरामदायक"
    ],
    durationMinutes: 45,
    painLevel: "Painless",
    procedureStepsEn: [
      "Primary jaw mapping and impression",
      "Bite registration and vertical dimension check",
      "Wax try-in to confirm comfort and aesthetic alignment",
      "Final denture insertion and bite adjustment"
    ],
    procedureStepsMr: [
      "जबड्याचे पहिले माप घेणे",
      "चावण्याची दिशा व उंची (Bite) निश्चित करणे",
      "मेणाच्या साहाय्याने ट्रायल (Try-in) करून दाखवणे",
      "अंतिम कवळी बसवून योग्य सूचना देणे"
    ],
    aftercareEn: ["Clean daily with denture brush and soft cleanser. Soak overnight in clean water."],
    aftercareMr: ["रोज रात्री कवळी काढून स्वच्छ पाण्यात ठेवा आणि सकाळी ब्रशिंग करा."],
    badgeEn: "Comfort Fit",
    badgeMr: "अत्यंत सोयीस्कर"
  },
  {
    id: "implants",
    titleEn: "Dental Implants (Permanent Teeth)",
    titleMr: "इम्प्लांट पध्दतीने दात बसवणे",
    category: "surgical",
    iconName: "CheckCircle2",
    shortDescEn: "Advanced titanium root replacement implants restoring permanent teeth with 98% success rate.",
    shortDescMr: "नसलेल्या दाताच्या जागी हाडात टायटॅनियमचा स्क्रू बसवून कायमस्वरूपी मूळ दातासारखा दात बसवणे.",
    fullDescEn: "Dental implants are the gold standard for replacing missing teeth without touching adjacent healthy teeth. A bio-friendly titanium post is surgically placed in the jawbone, integrating over time to anchor a lifelong porcelain crown.",
    fullDescMr: "शेजारच्या चांगल्या दातांना इजा न करता गमावलेला दात कायमस्वरूपी परत मिळवण्याचा हा सर्वोत्तम आधुनिक मार्ग आहे. हाडात बसवलेला टायटॅनियम स्क्रू नैसर्गिक मुळासारखा काम करतो.",
    benefitsEn: [
      "Feels, functions, and looks exactly like a real tooth",
      "Prevents jawbone resorption and bone loss",
      "No involvement or grinding of neighboring teeth",
      "Lifelong permanent tooth replacement option"
    ],
    benefitsMr: [
      "हूबेहूब नैसर्गिक दातासारखा दिसतो व काम करतो",
      "जबड्याचे हाड झिजण्यापासून रोखले जाते",
      "शेजारच्या चांगल्या दातांना कोणताही घासण्याचा त्रास नाही",
      "योग्य काळजी घेतल्यास आयुष्यभर टिकणारा उपाय"
    ],
    durationMinutes: 60,
    painLevel: "Local Anesthesia",
    procedureStepsEn: [
      "3D CBCT digital bone density assessment",
      "Precise surgical placement of titanium implant fixture under anesthesia",
      "Osseointegration healing period",
      "Abutment attachment and custom Zirconia crown fitting"
    ],
    procedureStepsMr: [
      "हाडांची जाडी तपासण्यासाठी डिजिटल स्कॅनिंग",
      "स्थानिक भूल देऊन टायटॅनियम इम्प्लांट बसवणे",
      "इम्प्लांट हाडासोबत पक्का होण्याची प्रक्रिया",
      "त्यावर झिर्कोनिया क्राऊन (कॅप) बसवणे"
    ],
    aftercareEn: ["Follow soft food diet for 3 days post-surgery. Maintain strict oral hygiene."],
    aftercareMr: ["शस्त्रक्रियेनंतर ३ दिवस मऊ अन्न खा. तोंडाची स्वच्छता नीट ठेवा."],
    badgeEn: "Lifelong Solution",
    badgeMr: "कायमस्वरूपी उपाय"
  },
  {
    id: "wisdom",
    titleEn: "Wisdom Tooth Extraction",
    titleMr: "अक्कल दाढ काढणे",
    category: "surgical",
    iconName: "Stethoscope",
    shortDescEn: "Gentle surgical and non-surgical wisdom tooth removal by specialist oral physician.",
    shortDescMr: "तिरप्या किंवा हाडात अडकलेल्या अक्कल दाढेमुळे होणाऱ्या सुज व वेदनेवर सुरक्षित शस्त्रक्रिया.",
    fullDescEn: "Impacted or crooked wisdom teeth frequently cause severe jaw pain, swelling, earaches, and damage adjacent molars. Dr. Ankita Goklani performs gentle atraumatic extractions under local anesthesia with minimal downtime.",
    fullDescMr: "अक्कल दाढ तिरपी आल्यास किंवा हाडात अडकल्यास जबड्यात सूज, तीव्र वेदना आणि शेजारच्या दाताला कीड लागते. आमच्याकडे तज्ज्ञ डॉक्टरांकडून अत्यंत अलगतपणे दाढ काढली जाते.",
    benefitsEn: [
      "Eliminates recurrent pericoronitis (gum swelling)",
      "Prevents crowding and pushing of front teeth",
      "Atraumatic technique minimizing post-op swelling",
      "Safe, sterile clinical environment"
    ],
    benefitsMr: [
      "मागील हिरडीची सूज व वेदनेपासून मुक्ती",
      "पुढील दात वाकडे होण्यापासून बचाव",
      "अत्यंत कमी त्रासात अलगतपणे दाढ काढली जाते",
      "उपचारानंतर औषधोपचाराचे पूर्ण मार्गदर्शन"
    ],
    durationMinutes: 30,
    painLevel: "Local Anesthesia",
    procedureStepsEn: [
      "Digital X-ray evaluation of root curvature & nerve proximity",
      "Complete painless local numbing of the region",
      "Gentle sectioning or atraumatic elevation of the tooth",
      "Hemostatic gauze placement & ice pack instruction"
    ],
    procedureStepsMr: [
      "एक्स-रे द्वारे मुळांची रचना व मज्जातंतू तपासणे",
      "जागा पूर्णपणे सुन्न (भूल) करणे",
      "विशेष उपकरणांनी अलगत दाढ बाहेर काढणे",
      "रक्तस्राव रोखण्यासाठी कापसाचा बोळा ठेवणे व बर्फाचा शेक देणे"
    ],
    aftercareEn: ["Keep gauze pressed for 45 mins. Eat cold ice cream or cold liquid post-procedure. No spit/gargle for 24 hours."],
    aftercareMr: ["४५ मिनिटे कापूस घट्ट दाबून ठेवा. २४ तास थुंकू नका. थंड आईस्क्रीम किंवा थंड रस घ्या."],
    badgeEn: "Gentle Removal",
    badgeMr: "वेदनाविरहित"
  },
  {
    id: "pediatric",
    titleEn: "Pediatric Dental Care (Children)",
    titleMr: "लहान मुलांचे सर्व दंत उपचार",
    category: "pediatric",
    iconName: "Heart",
    shortDescEn: "Child-friendly, fear-free cavity treatments, pit & fissure sealants, and fluoride coating.",
    shortDescMr: "लहान मुलांसाठी भीतीमुक्त वातावरणात दातांची कीड रोखणे, फ्लोराईड कोटिंग व किडलेले दात भरणे.",
    fullDescEn: "Early milk teeth care is essential for healthy permanent teeth development. We provide specialized pediatric care including fluoride varnish coatings to protect enamel, pit & fissure sealants, pulpectomy (kid's root canal), and habit breaking appliances.",
    fullDescMr: "लहान मुलांचे दुधाचे दात निरोगी राहणे हे येणाऱ्या चांगल्या दातांसाठी अत्यंत महत्त्वाचे असते. मुलांसाठी भयमुक्त, हसतखेळत वातावरणात उपचार केले जातात.",
    benefitsEn: [
      "Friendly, non-intimidating pediatric environment",
      "Fluoride varnish strengthens young enamel against cavities",
      "Prevents premature loss of milk teeth",
      "Dietary & brushing habit guidance for parents"
    ],
    benefitsMr: [
      "मुलांना भीती वाटणार नाही असे प्रेमळ वातावरण",
      "फ्लोराईड कोटिंगमुळे कीड लागण्याचा धोका ९०% कमी",
      "दुधाचे दात वेळेआधी पडण्यापासून संरक्षण",
      "ब्रशिंगच्या चांगल्या सवयींचे मार्गदर्शन"
    ],
    durationMinutes: 25,
    painLevel: "Painless",
    procedureStepsEn: [
      "Gentle fun talk & acclimatization with dental equipment",
      "Teeth cleaning and fruit-flavored fluoride gel application",
      "Cavity filling or preventive sealant coating",
      "Reward sticker and bravery badge for the little champion!"
    ],
    procedureStepsMr: [
      "मुलांशी गप्पा मारून क्लिनिकशी मैत्री करून देणे",
      "दातांची सफाई व स्वादिष्ट फ्लोराईड जेल लावणे",
      "कीड स्वच्छ करून रंगीत फिलींग करणे",
      "मुलाला प्रोत्साहन देण्यासाठी लहान भेट किंवा स्टिकर देणे!"
    ],
    aftercareEn: ["Avoid food/water for 30 minutes post fluoride gel."],
    aftercareMr: ["फ्लोराईड लावल्यानंतर ३० मिनिटे काहीही खाऊ किंवा पिऊ नका."],
    badgeEn: "Kid Friendly",
    badgeMr: "लहान मुलांसाठी विशेष"
  },
  {
    id: "ortho",
    titleEn: "Teeth Straightening & Orthodontics",
    titleMr: "वेडेवाकडे व पुढे असलेले दात सरळ करणे",
    category: "cosmetic",
    iconName: "Grid",
    shortDescEn: "Modern ceramic braces, metal braces, and invisible clear aligners for a flawless symmetrical smile.",
    shortDescMr: "पुढे आलेले, वाकडे किंवा अंतर असणारे दात ब्रॅसेस किंवा अदृश्य अलाईनरने सरळ करणे.",
    fullDescEn: "Misaligned or crowded teeth affect both smile aesthetics and chewing health. We offer metal braces, aesthetic clear ceramic braces, and advanced removable clear aligners (Invisible Braces) to align your teeth smoothly without wires.",
    fullDescMr: "वाकडे किंवा बाहेर आलेले दात तुमच्या आत्मविश्वासावर परिणाम करतात. आम्ही धातूचे, पारदर्शक सेरॅमिक ब्रॅसेस आणि विना वायरचे अदृश्य अलाईनर (Clear Aligners) उपलब्ध करून देतो.",
    benefitsEn: [
      "Corrects overlapping, gap teeth, and overbites",
      "Improves facial symmetry and jaw profile",
      "Clear Aligners option — virtually invisible & removable",
      "Prevents uneven tooth wear and gum disease"
    ],
    benefitsMr: [
      "वाकडे दात व दोन दातांमधील अंतर पूर्णपणे बंद होते",
      "चेहऱ्याचा आकार व हास्य अधिक आकर्षक दिसते",
      "अदृश्य अलाईनरमुळे तारा न दिसता उपचार शक्य",
      "दात स्वच्छ ठेवणे सोपे जाते"
    ],
    durationMinutes: 45,
    painLevel: "Mild",
    procedureStepsEn: [
      "Orthodontic smile analysis and 3D intraoral digital scan",
      "Treatment plan simulation showing expected final alignment",
      "Precision bonding of brackets or delivery of custom aligner trays",
      "Monthly checkup visits for gradual adjustment"
    ],
    procedureStepsMr: [
      "दातांचे आणि चेहऱ्याचे डिजिटल स्कॅनिंग",
      "उपचारानंतर दात कसे दिसतील याचे कॉम्प्युटर मॉडेल दाखवणे",
      "ब्रॅसेस बसवणे किंवा अदृश्य अलाईनर सेट देणे",
      "दरमहा तपासणी करून दातांना योग्य दिशा देणे"
    ],
    aftercareEn: ["Avoid sticky or hard candies if wearing braces. Wear retainers post-treatment."],
    aftercareMr: ["ब्रॅसेस असल्यास चघळणारे व कडक पदार्थ खाऊ नका."],
    badgeEn: "Smile Makeover",
    badgeMr: "सुंदर हास्य"
  }
];

export const smileTransformationsData: SmileTransformation[] = [
  {
    id: "t1",
    titleEn: "Painless Root Canal & Zirconia Crown Restoration",
    titleMr: "वेदनाविरहित रूट कॅनाल आणि झिर्कोनिया क्राऊन",
    treatmentType: "Root Canal + Zirconia Crown",
    descriptionEn: "Severe molar decay with unbearable pain restored in 2 sittings with natural-looking zirconia crown.",
    descriptionMr: "तीव्र दातदुखी असलेल्या दाढेवर यशस्वी रूट कॅनाल करून नैसर्गिक दिसणारी झिर्कोनिया कॅप बसवली.",
    beforeImg: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600",
    afterImg: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=600",
    duration: "2 Sittings"
  },
  {
    id: "t2",
    titleEn: "Front Tooth Gap Closure & Composite Bonding",
    titleMr: "पुढील दातांमधील अंतर बंद करणे (कंपोझिट बॉन्डिंग)",
    treatmentType: "Cosmetic Tooth-Colored Filling",
    descriptionEn: "Closed central diastema (gap) in 30 minutes without cutting natural enamel.",
    descriptionMr: "पुढील दोन दातांमधील अंतर अवघ्या ३० मिनिटांत दाताच्या रंगाच्या साहित्याने नैसर्गिकरीत्या बंद केले.",
    beforeImg: "https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&q=80&w=600",
    afterImg: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=600",
    duration: "30 Minutes"
  },
  {
    id: "t3",
    titleEn: "Invisible Clear Aligners for Crooked Teeth",
    titleMr: "अदृश्य अलाईनरद्वारे वाकडे दात सरळ करणे",
    treatmentType: "Orthodontics / Aligners",
    descriptionEn: "Aligned upper crowded incisors using removable clear aligners in 8 months.",
    descriptionMr: "तार न वापरता अदृश्य अलाईनरच्या साहाय्याने वाकडे दात ८ महिन्यात मूळ रेषेत आणले.",
    beforeImg: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600",
    afterImg: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600",
    duration: "8 Months"
  }
];

export const faqData: FAQItem[] = [
  {
    id: "f1",
    questionEn: "Is Root Canal Treatment (RCT) painful?",
    questionMr: "रूट कॅनाल ट्रिटमेंट करताना त्रास किंवा वेदना होतात का?",
    answerEn: "No! At Dr. Ankita Goklani's clinic, modern local anesthetics completely numb the area before starting. Patients feel no pain during the procedure — in fact, RCT removes the pain caused by the tooth infection!",
    answerMr: "मुळीच नाही! उपचारापूर्वी अत्याधुनिक भूल (Local Anesthesia) दिली जाते, ज्यामुळे जागा पूर्ण सुन्न होते. त्यामुळे उपचारादरम्यान अजिबात वेदना होत नाहीत.",
    category: "rct"
  },
  {
    id: "f2",
    questionEn: "Are Digital Dental X-Rays safe for children and pregnant women?",
    questionMr: "डिजिटल एक्स-रे लहान मुले आणि महिलांसाठी सुरक्षित आहेत का?",
    answerEn: "Yes. Our Sensor RVG Digital X-rays emit up to 90% less radiation than conventional film X-rays. We also use protective lead aprons for complete safety.",
    answerMr: "होय, आमचे डिजिटल एक्स-रे ९०% कमी रेडिएशन सोडतात आणि ते अत्यंत सुरक्षित आहेत.",
    category: "safety"
  },
  {
    id: "f3",
    questionEn: "What are the clinic working hours in Jawahar Colony?",
    questionMr: "जवाहर कॉलनीतील क्लिनिकच्या वेळा काय आहेत?",
    answerEn: "Morning Slot: 10:00 AM to 2:00 PM | Evening Slot: 5:00 PM to 9:00 PM (Monday to Saturday). Sundays are available on appointment basis.",
    answerMr: "सकाळी १०:०० ते दुपारी २:०० आणि संध्याकाळी ५:०० ते रात्री ९:००. रविवारी फक्त अपॉइंटमेंटनुसार.",
    category: "timing"
  },
  {
    id: "f4",
    questionEn: "How many visits are required for a dental crown or bridge?",
    questionMr: "कॅप किंवा ब्रीज बसवण्यासाठी किती वेळा यावे लागते?",
    answerEn: "Usually 2 visits: Visit 1 for shaping and digital impression, and Visit 2 (within 3-4 days) for permanent fitting and bite check.",
    answerMr: "साधारणपणे २ भेटी पुरेशा असतात. पहिल्या भेटीत माप घेतले जाते आणि दुसऱ्या भेटीत कॅप फिक्स केली जाते.",
    category: "crowns"
  }
];

export const reviewsData: PatientReview[] = [
  {
    id: "r1",
    name: "Sunil Kulkarni",
    rating: 5,
    treatment: "Root Canal Treatment + Crown",
    date: "July 2026",
    commentEn: "Dr. Ankita Goklani is very soft-spoken and professional. I was terrified of root canals, but she completed it totally painlessly in single sitting. Clinic is extremely clean!",
    commentMr: "डॉ. अंकिता गोकलानी अत्यंत नम्र आणि तज्ज्ञ आहेत. मला रूट कॅनालची खूप भीती वाटत होती, पण त्यांनी अजिबात वेदना न होऊ देता उपचार पूर्ण केला. क्लिनिक खूप स्वच्छ आहे!",
    verified: true
  },
  {
    id: "r2",
    name: "Pooja Jadhav",
    rating: 5,
    treatment: "Tooth-Colored Filling & Digital X-Ray",
    date: "June 2026",
    commentEn: "Best dental clinic in Jawahar Colony! They showed me the cavity on digital X-ray screen and fixed it with invisible white filling. Highly recommended.",
    commentMr: "जवाहर कॉलनीतील सर्वोत्तम दातांचा दवाखाना! डिजिटल एक्स-रे वर कीड दाखवून अवघ्या २० मिनिटांत फिलींग करून दिली.",
    verified: true
  },
  {
    id: "r3",
    name: "Mahesh Deshmukh",
    rating: 5,
    treatment: "Wisdom Tooth Extraction",
    date: "May 2026",
    commentEn: "Got my impacted wisdom tooth removed by Dr. Ankita. She explained everything clearly. Pain relief was fast and recovery was smooth.",
    commentMr: "माझी तिरपी आलेली अक्कल दाढ काढली. काहीही त्रास झाला नाही. डॉक्टरांनी उपचारांनंतर योग्य ती काळजी घेण्याचे मार्गदर्शन केले.",
    verified: true
  }
];
