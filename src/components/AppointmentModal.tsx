import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, Phone, CheckCircle2, MessageSquare, AlertCircle, Sparkles } from 'lucide-react';
import { Language, AppointmentFormData } from '../types';
import { translations } from '../data/translations';
import { facilitiesData } from '../data/clinicData';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  preSelectedFacility?: string;
  onSuccessToast?: (toast: { title: string; message: string; type: 'success' | 'error' | 'info' }) => void;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  preSelectedFacility,
  onSuccessToast
}) => {
  const t = translations[currentLang];

  const today = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState<AppointmentFormData>({
    patientName: '',
    phone: '',
    age: '',
    service: preSelectedFacility || 'Root Canal Treatment',
    preferredDate: today,
    preferredSlot: 'Morning (10 AM - 2 PM)',
    symptoms: ''
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successResult, setSuccessResult] = useState<{
    id: string;
    whatsappUrl: string;
  } | null>(null);

  useEffect(() => {
    if (preSelectedFacility) {
      setFormData(prev => ({ ...prev, service: preSelectedFacility }));
    }
  }, [preSelectedFacility]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.patientName.trim() || !formData.phone.trim()) {
      setErrorMsg(currentLang === 'en' ? 'Please enter patient name and mobile number.' : 'कृपया रुग्णाचे नाव आणि मोबाईल नंबर टाका.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to register appointment');
      }

      setSuccessResult({
        id: data.appointment.id,
        whatsappUrl: data.whatsappUrl
      });

      if (onSuccessToast) {
        onSuccessToast({
          title: currentLang === 'en' ? 'Appointment Confirmed!' : 'अपॉइंटमेंट निश्चित झाली!',
          message: currentLang === 'en'
            ? `Booking ID: ${data.appointment.id} registered for ${formData.patientName}.`
            : `${formData.patientName} यांच्यासाठी बुकिंग आयडी: ${data.appointment.id} नोंदवले गेले.`,
          type: 'success'
        });
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Error booking appointment. Please call 9922300842 directly.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSuccessResult(null);
    setFormData({
      patientName: '',
      phone: '',
      age: '',
      service: 'Root Canal Treatment',
      preferredDate: today,
      preferredSlot: 'Morning (10 AM - 2 PM)',
      symptoms: ''
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl my-8 border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          id="btn-close-appointment-modal"
          onClick={handleReset}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!successResult ? (
          <div>
            {/* Modal Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold uppercase tracking-wider mb-2">
                <Calendar className="w-3.5 h-3.5 text-teal-600" />
                <span>Dr. Ankita Goklani's Elite Dental Care</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {t.bookingModalTitle}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Jawahar Colony, Chhatrapati Sambhajinagar | Call: 9922300842
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Booking Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Patient Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.patientName} *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="input-patient-name"
                    type="text"
                    required
                    placeholder="e.g. Ramesh Patil"
                    value={formData.patientName}
                    onChange={e => setFormData({ ...formData, patientName: e.target.value })}
                    className="w-full bg-slate-50 text-slate-900 text-xs sm:text-sm pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              {/* Phone & Age */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.patientPhone} *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      id="input-patient-phone"
                      type="tel"
                      required
                      placeholder="e.g. 9922300842"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-50 text-slate-900 text-xs sm:text-sm pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.patientAge}
                  </label>
                  <input
                    id="input-patient-age"
                    type="number"
                    placeholder="e.g. 35"
                    value={formData.age}
                    onChange={e => setFormData({ ...formData, age: e.target.value })}
                    className="w-full bg-slate-50 text-slate-900 text-xs sm:text-sm px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.selectService} *
                </label>
                <select
                  id="select-patient-service"
                  value={formData.service}
                  onChange={e => setFormData({ ...formData, service: e.target.value })}
                  className="w-full bg-slate-50 text-slate-900 text-xs sm:text-sm px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  {facilitiesData.map(item => (
                    <option key={item.id} value={item.titleEn}>
                      {currentLang === 'en' ? `${item.titleEn} (${item.titleMr})` : `${item.titleMr} (${item.titleEn})`}
                    </option>
                  ))}
                  <option value="General Dental Checkup">General Consultation & Checkup</option>
                </select>
              </div>

              {/* Date & Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.selectDate} *
                  </label>
                  <input
                    id="input-patient-date"
                    type="date"
                    required
                    min={today}
                    value={formData.preferredDate}
                    onChange={e => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full bg-slate-50 text-slate-900 text-xs sm:text-sm px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t.selectSlot} *
                  </label>
                  <select
                    id="select-patient-slot"
                    value={formData.preferredSlot}
                    onChange={e => setFormData({ ...formData, preferredSlot: e.target.value as any })}
                    className="w-full bg-slate-50 text-slate-900 text-xs sm:text-sm px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="Morning (10 AM - 2 PM)">Morning (10 AM - 2 PM)</option>
                    <option value="Evening (5 PM - 9 PM)">Evening (5 PM - 9 PM)</option>
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t.symptomsNotes}
                </label>
                <textarea
                  id="textarea-patient-notes"
                  rows={2}
                  placeholder="e.g. Toothache since 2 days, sensitivity to cold water..."
                  value={formData.symptoms}
                  onChange={e => setFormData({ ...formData, symptoms: e.target.value })}
                  className="w-full bg-slate-50 text-slate-900 text-xs px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Submit Button */}
              <button
                id="btn-submit-appointment"
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-teal-600 to-sky-600 hover:from-teal-700 hover:to-sky-700 text-white font-bold py-3 rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
              >
                {loading ? (
                  <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{t.confirmBooking}</span>
                  </>
                )}
              </button>

            </form>
          </div>
        ) : (
          /* Success Receipt Card */
          <div className="text-center space-y-4 py-2">
            <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto border border-teal-200 shadow-xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-extrabold text-slate-900">
              {t.bookingSuccessTitle}
            </h3>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-left space-y-2 text-xs">
              <p className="font-bold text-teal-800 flex justify-between">
                <span>Booking ID:</span>
                <span className="font-mono bg-teal-100 px-2 py-0.5 rounded text-teal-900">{successResult.id}</span>
              </p>
              <p><span className="font-semibold text-slate-600">Patient Name:</span> {formData.patientName}</p>
              <p><span className="font-semibold text-slate-600">Service:</span> {formData.service}</p>
              <p><span className="font-semibold text-slate-600">Date & Slot:</span> {formData.preferredDate} ({formData.preferredSlot})</p>
              <p><span className="font-semibold text-slate-600">Clinic Contact:</span> 9922300842</p>
            </div>

            <p className="text-xs text-slate-600">
              {t.bookingSuccessMsg}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <a
                id="btn-whatsapp-confirm"
                href={successResult.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{t.sendWhatsApp}</span>
              </a>

              <button
                id="btn-close-success-modal"
                onClick={handleReset}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 px-4 rounded-xl text-xs"
              >
                {t.close}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
