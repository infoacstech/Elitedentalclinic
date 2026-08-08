export type Language = 'en' | 'mr';

export interface DoctorInfo {
  name: string;
  marathiName: string;
  degrees: string[];
  degreesShort: string;
  title: string;
  titleMarathi: string;
  regNo: string;
  collegeBds: string;
  collegeMds: string;
  exRole: string;
  bio: string;
  bioMarathi: string;
  photoUrl: string;
  experienceYears: number;
}

export interface Facility {
  id: string;
  titleEn: string;
  titleMr: string;
  category: 'preventive' | 'restorative' | 'surgical' | 'cosmetic' | 'pediatric';
  iconName: string;
  shortDescEn: string;
  shortDescMr: string;
  fullDescEn: string;
  fullDescMr: string;
  benefitsEn: string[];
  benefitsMr: string[];
  durationMinutes: number;
  painLevel: 'Painless' | 'Minimal' | 'Mild' | 'Local Anesthesia';
  procedureStepsEn: string[];
  procedureStepsMr: string[];
  aftercareEn: string[];
  aftercareMr: string[];
  badgeEn?: string;
  badgeMr?: string;
}

export interface AppointmentFormData {
  patientName: string;
  phone: string;
  age: string;
  service: string;
  preferredDate: string;
  preferredSlot: 'Morning (10 AM - 2 PM)' | 'Evening (5 PM - 9 PM)';
  symptoms: string;
}

export interface AppointmentRecord extends AppointmentFormData {
  id: string;
  status: 'Confirmed' | 'Pending';
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export interface SmileTransformation {
  id: string;
  titleEn: string;
  titleMr: string;
  treatmentType: string;
  descriptionEn: string;
  descriptionMr: string;
  beforeImg: string;
  afterImg: string;
  duration: string;
}

export interface FAQItem {
  id: string;
  questionEn: string;
  questionMr: string;
  answerEn: string;
  answerMr: string;
  category: string;
}

export interface PatientReview {
  id: string;
  name: string;
  rating: number;
  treatment: string;
  date: string;
  commentEn: string;
  commentMr: string;
  verified: boolean;
}
