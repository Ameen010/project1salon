import { useState, useEffect, FormEvent } from 'react';
import { Calendar, Clock, User, Scissors, Check, X, CreditCard, ChevronRight, ChevronLeft, Trash2, CalendarCheck } from 'lucide-react';
import { Service, Stylist, Appointment } from '../types';
import { SERVICES, STYLISTS } from '../data';

interface BookingSystemProps {
  preSelectedServiceId: string | null;
  onClearPreSelectedService: () => void;
  onBookingSuccess?: () => void;
}

const TIME_SLOTS = [
  '09:00 AM', '10:15 AM', '11:30 AM', '01:00 PM', '02:15 PM', '03:30 PM', '04:45 PM', '06:00 PM'
];

export default function BookingSystem({
  preSelectedServiceId,
  onClearPreSelectedService,
  onBookingSuccess
}: BookingSystemProps) {
  // Wizard steps: 1 = Services, 2 = Stylist, 3 = Date & Time, 4 = Details, 5 = Confirmed
  const [step, setStep] = useState<number>(1);
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [selectedStylist, setSelectedStylist] = useState<Stylist | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [guestName, setGuestName] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [guestNotes, setGuestNotes] = useState<string>('');
  
  // Local bookings persistence
  const [myAppointments, setMyAppointments] = useState<Appointment[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Load existing bookings from local storage
  useEffect(() => {
    const saved = localStorage.getItem('salon_appointments');
    if (saved) {
      try {
        setMyAppointments(JSON.parse(saved));
      } catch (e) {
        console.error('Error parsing saved appointments', e);
      }
    }
  }, []);

  // Handle pre-selected service from another section (e.g. Hero CTA or Pricing Card)
  useEffect(() => {
    if (preSelectedServiceId) {
      const service = SERVICES.find(s => s.id === preSelectedServiceId);
      if (service) {
        // Pre-populate and jump to step 1
        setSelectedServices([service]);
        setStep(1);
        // Clear it so user can change selection later
        onClearPreSelectedService();
        // Scroll to booking system smoothly
        const el = document.getElementById('booking-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }, [preSelectedServiceId, onClearPreSelectedService]);

  // Save appointments helper
  const saveAppointments = (list: Appointment[]) => {
    localStorage.setItem('salon_appointments', JSON.stringify(list));
    setMyAppointments(list);
  };

  const toggleService = (service: Service) => {
    setSelectedServices(prev => {
      const exists = prev.some(s => s.id === service.id);
      if (exists) {
        return prev.filter(s => s.id !== service.id);
      } else {
        return [...prev, service];
      }
    });
  };

  const getFilteredServices = () => {
    if (activeCategory === 'all') return SERVICES;
    return SERVICES.filter(s => s.category === activeCategory);
  };

  const totalDuration = selectedServices.reduce((acc, s) => acc + s.duration, 0);
  const totalPrice = selectedServices.reduce((acc, s) => acc + s.price, 0);

  // Generate date options for the next 14 days
  const getDateOptions = () => {
    const dates = [];
    const today = new Date();
    
    // Set custom names like Today, Tomorrow or clear weekdays
    for (let i = 1; i <= 14; i++) {
      const nextDate = new Date();
      nextDate.setDate(today.getDate() + i);
      
      const dayName = nextDate.toLocaleDateString('en-US', { weekday: 'short' });
      const monthDay = nextDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const fullDateString = nextDate.toISOString().split('T')[0];
      
      dates.push({
        value: fullDateString,
        dayName,
        monthDay,
        isWeekend: nextDate.getDay() === 0 || nextDate.getDay() === 6 // 0 is Sunday
      });
    }
    return dates;
  };

  const datesList = getDateOptions();

  // Handle Booking submission
  const handleConfirmBooking = (e: FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestEmail || !guestPhone) return;

    const finalStylist = selectedStylist || STYLISTS[0]; // fallback default stylist

    const newAppointment: Appointment = {
      id: `APT-${Math.floor(100000 + Math.random() * 900000)}`,
      services: [...selectedServices],
      stylist: finalStylist,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      guestName,
      guestEmail,
      guestPhone,
      notes: guestNotes,
      totalPrice,
      status: 'confirmed'
    };

    const updated = [newAppointment, ...myAppointments];
    saveAppointments(updated);
    setStep(5); // Go to Success Screen
    if (onBookingSuccess) onBookingSuccess();
  };

  // Cancel an appointment
  const handleCancelAppointment = (id: string) => {
    const filtered = myAppointments.filter(apt => apt.id !== id);
    saveAppointments(filtered);
  };

  // Reset booking form to make another appointment
  const handleResetForm = () => {
    setSelectedServices([]);
    setSelectedStylist(null);
    setSelectedDate('');
    setSelectedTimeSlot('');
    setGuestName('');
    setGuestEmail('');
    setGuestPhone('');
    setGuestNotes('');
    setStep(1);
  };

  return (
    <div id="booking-section" className="w-full bg-[#F8F7F2] py-20 px-4 md:px-8 border-b border-black">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-[10px] font-mono font-bold tracking-widest text-[#1A1A1A]/75 uppercase">
            Instant Scheduling
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-neutral-900 tracking-tight mt-3">
            Book Stylist Session
          </h2>
          <p className="text-neutral-700 font-serif italic text-sm md:text-base max-w-xl mx-auto mt-2">
            Secure your style reservation instantly. Cancel or adjust anytime dynamically with our scheduling wizard.
          </p>
        </div>

        {/* Wizard Progress Stepper */}
        {step < 5 && (
          <div className="mb-8 overflow-x-auto no-scrollbar">
            <div className="flex items-center min-w-[500px] md:min-w-0 justify-between text-[10px] font-mono text-neutral-500 border-b border-black pb-4 px-2">
              <button
                disabled={step <= 1}
                onClick={() => setStep(1)}
                className={`flex items-center gap-1.5 transition tracking-widest uppercase font-bold ${step === 1 ? 'text-black font-bold' : 'hover:text-black'}`}
              >
                <span className={`w-5 h-5 rounded-none flex items-center justify-center border font-mono ${step >= 1 ? 'bg-black text-[#F8F7F2] border-black' : 'border-neutral-300'}`}>1</span>
                <span>Select Services</span>
              </button>
              <span className="text-neutral-400 font-sans">/</span>
              <button
                disabled={selectedServices.length === 0}
                onClick={() => setStep(2)}
                className={`flex items-center gap-1.5 transition tracking-widest uppercase font-bold ${step === 2 ? 'text-black font-bold' : 'hover:text-black opacity-80'}`}
              >
                <span className={`w-5 h-5 rounded-none flex items-center justify-center border font-mono ${step >= 2 ? 'bg-black text-[#F8F7F2] border-black' : 'border-neutral-300'}`}>2</span>
                <span>Specialist</span>
              </button>
              <span className="text-neutral-400 font-sans">/</span>
              <button
                disabled={selectedServices.length === 0 || !selectedStylist}
                onClick={() => setStep(3)}
                className={`flex items-center gap-1.5 transition tracking-widest uppercase font-bold ${step === 3 ? 'text-black font-bold' : 'hover:text-black opacity-80'}`}
              >
                <span className={`w-5 h-5 rounded-none flex items-center justify-center border font-mono ${step >= 3 ? 'bg-black text-[#F8F7F2] border-black' : 'border-neutral-300'}`}>3</span>
                <span>Date & Time</span>
              </button>
              <span className="text-neutral-400 font-sans">/</span>
              <button
                disabled={selectedServices.length === 0 || !selectedStylist || !selectedDate || !selectedTimeSlot}
                onClick={() => setStep(4)}
                className={`flex items-center gap-1.5 transition tracking-widest uppercase font-bold ${step === 4 ? 'text-black font-bold' : 'opacity-80'}`}
              >
                <span className={`w-5 h-5 rounded-none flex items-center justify-center border font-mono ${step === 4 ? 'bg-black text-[#F8F7F2] border-black' : 'border-neutral-300'}`}>4</span>
                <span>Your Details</span>
              </button>
            </div>
          </div>
        )}

        {/* Content Box */}
        <div className="bg-[#F8F7F2] rounded-none border border-black shadow-none overflow-hidden min-h-[460px] flex flex-col md:flex-row">
          
          {/* Main Workspace */}
          <div className="flex-1 p-6 md:p-8 bg-white flex flex-col justify-between">
            
             {/* STEP 1: SERVICES SELECTOR */}
            {step === 1 && (
              <div className="animate-fadeIn">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-neutral-900 flex items-center gap-2">
                      <Scissors className="w-5 h-5 text-black" /> Choose Services
                    </h3>
                    <p className="text-neutral-500 text-xs mt-1">Mix and match styles to customize your salon visit.</p>
                  </div>
                  
                  {/* Category filters */}
                  <div className="flex gap-1 overflow-x-auto pb-1 max-w-full no-scrollbar">
                    {['all', 'cuts', 'color', 'styling', 'treatments', 'grooming'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-3 py-1.5 text-[9px] font-mono uppercase tracking-wider font-bold rounded-none border transition whitespace-nowrap ${
                          activeCategory === cat
                            ? 'bg-black text-[#F8F7F2] border-black'
                            : 'bg-transparent text-neutral-600 border-neutral-250 hover:border-black'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Service Cards list */}
                <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1 no-scrollbar">
                  {getFilteredServices().map((service) => {
                    const isSelected = selectedServices.some(s => s.id === service.id);
                    return (
                      <div
                        id={`booking-service-item-${service.id}`}
                        key={service.id}
                        onClick={() => toggleService(service)}
                        className={`p-4 rounded-none border transition cursor-pointer flex items-start gap-4 ${
                          isSelected
                            ? 'border-black bg-neutral-100'
                            : 'border-neutral-200 hover:border-black bg-white'
                        }`}
                      >
                        <div className={`mt-0.5 w-5 h-5 rounded-none flex items-center justify-center border transition-all ${
                          isSelected ? 'bg-black border-black text-[#F8F7F2]' : 'border-neutral-400 bg-white'
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-baseline gap-2">
                            <h4 className="text-base font-serif italic text-neutral-900 truncate">
                              {service.name}
                            </h4>
                            <span className="text-base font-mono font-bold text-neutral-900 shrink-0">
                              ${service.price}
                            </span>
                          </div>
                          <p className="text-xs text-neutral-600 mt-1.5">
                            {service.description}
                          </p>
                          <div className="flex items-center gap-1.5 mt-2.5 text-neutral-500 text-[10px] font-mono uppercase tracking-widest whitespace-nowrap">
                            <Clock className="w-3.5 h-3.5 text-neutral-500" />
                            <span>{service.duration} Mins</span>
                            <span className="mx-1">•</span>
                            <span className="bg-neutral-150 text-black px-2 py-0.5 rounded-none font-bold">
                              {service.category}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 2: STYLIST SELECTOR */}
            {step === 2 && (
              <div className="animate-fadeIn">
                <h3 className="text-xl font-serif font-bold text-neutral-900 mb-1 flex items-center gap-2">
                  <User className="w-5 h-5 text-black" /> Select Your Hair Specialist
                </h3>
                <p className="text-neutral-500 text-xs mb-6">Our master stylists bring unique specialties to your appointment.</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Any Available Stylist Card */}
                  <div
                    id="booking-stylist-any"
                    onClick={() => setSelectedStylist({
                      id: 'any',
                      name: 'Optimal Availability',
                      role: 'Matches fastest slot schedule',
                      rating: 5,
                      specialty: 'All Hair Services',
                      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
                      bio: 'Our scheduling assistant maps you to whichever talented artist yields the optimal time window.'
                    })}
                    className={`p-4 rounded-none border transition cursor-pointer flex flex-col justify-between h-44 ${
                      selectedStylist?.id === 'any'
                        ? 'border-black bg-neutral-100'
                        : 'border-neutral-200 hover:border-black bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-none bg-black text-white flex items-center justify-center font-bold text-base shadow-none uppercase border border-black shrink-0">
                        ⭐
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-serif font-bold text-neutral-900 truncate">Optimal Availability</h4>
                        <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider italic">Fastest booking</p>
                      </div>
                    </div>
                    <p className="text-[11px] text-neutral-600 line-clamp-2 mt-2 leading-relaxed">
                      Automatically pairing you with the perfect artist to match your requested slot.
                    </p>
                    <div className="text-[9px] font-mono text-white bg-black self-start px-2 py-0.5 rounded-none font-bold uppercase tracking-wider">
                      Flexible & Accelerated
                    </div>
                  </div>

                  {STYLISTS.map((stylist) => {
                    const isSelected = selectedStylist?.id === stylist.id;
                    return (
                      <div
                        id={`booking-stylist-${stylist.id}`}
                        key={stylist.id}
                        onClick={() => setSelectedStylist(stylist)}
                        className={`p-4 rounded-none border transition cursor-pointer flex flex-col justify-between h-44 ${
                          isSelected
                            ? 'border-black bg-neutral-100'
                            : 'border-neutral-200 hover:border-black bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={stylist.avatar}
                            alt={stylist.name}
                            className="w-11 h-11 rounded-none object-cover shadow-none border border-black shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0">
                            <h4 className="text-sm font-serif font-bold text-neutral-900 truncate">{stylist.name}</h4>
                            <p className="text-[10px] text-black font-mono font-bold uppercase tracking-widest">{stylist.role}</p>
                          </div>
                        </div>
                        <p className="text-[11px] text-neutral-600 line-clamp-3 mt-2 leading-relaxed">
                          {stylist.bio}
                        </p>
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-black/10">
                          <span className="text-[9px] font-mono text-neutral-500 max-w-[120px] truncate uppercase font-bold">
                            {stylist.specialty}
                          </span>
                          <span className="text-xs text-black font-bold font-mono">
                            ★ {stylist.rating}.0
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 3: DATE & TIME */}
            {step === 3 && (
              <div className="animate-fadeIn">
                <h3 className="text-xl font-serif font-bold text-neutral-900 mb-1 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-black" /> Choose Date and Time
                </h3>
                <p className="text-stone-500 text-xs mb-6">Select from our verified real-time downtown openings.</p>

                {/* Date Grid */}
                <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-500 mb-2">Available Dates</h4>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 mb-6">
                  {datesList.map((date) => {
                    const isSelected = selectedDate === date.value;
                    return (
                      <button
                        id={`booking-date-${date.value}`}
                        key={date.value}
                        type="button"
                        onClick={() => {
                          setSelectedDate(date.value);
                          setSelectedTimeSlot(''); // reset slot when date changes
                        }}
                        className={`p-2.5 rounded-none flex flex-col items-center justify-center border transition-all ${
                          isSelected
                            ? 'bg-black text-[#F8F7F2] border-black'
                            : 'border-neutral-250 hover:border-black bg-white'
                        }`}
                      >
                        <span className={`text-[9px] uppercase font-mono tracking-widest font-bold ${isSelected ? 'text-neutral-350' : 'text-neutral-500'}`}>
                          {date.dayName}
                        </span>
                        <span className="text-base font-bold mt-0.5 font-mono">
                          {date.monthDay.split(' ')[1]}
                        </span>
                        <span className={`text-[8px] font-mono uppercase tracking-wider font-bold mt-0.5 ${isSelected ? 'text-neutral-350' : 'text-neutral-400'}`}>
                          {date.monthDay.split(' ')[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Time Slots */}
                {selectedDate ? (
                  <div className="animate-fadeIn">
                    <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#1A1A1A] mb-2.5 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-black" /> Open Slots on {new Date(selectedDate).toLocaleDateString('en', {month: 'long', day: 'numeric', year: 'numeric'})}
                    </h4>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {TIME_SLOTS.map((slot) => {
                        const isSelected = selectedTimeSlot === slot;
                        return (
                          <button
                            id={`booking-slot-${slot.replace(' ', '-')}`}
                            key={slot}
                            type="button"
                            onClick={() => setSelectedTimeSlot(slot)}
                            className={`p-2.5 text-xs font-mono rounded-none border text-center transition tracking-wider ${
                              isSelected
                                ? 'bg-black text-[#F8F7F2] border-black font-bold'
                                : 'border-neutral-250 hover:border-black bg-white text-black'
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 border border-black rounded-none bg-neutral-50 text-neutral-500 font-mono text-xs">
                    Please select an appointment date above to view hourly open-slots.
                  </div>
                )}
              </div>
            )}

            {/* STEP 4: GUEST DETAILS */}
            {step === 4 && (
              <form onSubmit={handleConfirmBooking} className="animate-fadeIn space-y-4">
                <div>
                  <h3 className="text-xl font-serif font-bold text-neutral-900 mb-1">
                    Complete Reservation Details
                  </h3>
                  <p className="text-neutral-550 text-xs">No deposit is required today; simply settle your bill at the salon counter after your services.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-[#1A1A1A]/70 mb-1.5">Full Name</label>
                    <input
                      id="booking-input-name"
                      type="text"
                      required
                      placeholder="Alexander Green"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full text-sm p-3 bg-white border border-black rounded-none focus:outline-none focus:ring-1 focus:ring-black placeholder-neutral-350"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-[#1A1A1A]/70 mb-1.5">Phone Number</label>
                    <input
                      id="booking-input-phone"
                      type="tel"
                      required
                      placeholder="(555) 725-6611"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      className="w-full text-sm p-3 bg-white border border-black rounded-none focus:outline-none focus:ring-1 focus:ring-black placeholder-neutral-350"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-[#1A1A1A]/70 mb-1.5">Email Address</label>
                  <input
                    id="booking-input-email"
                    type="email"
                    required
                    placeholder="alexander@example.com"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full text-sm p-3 bg-white border border-black rounded-none focus:outline-none focus:ring-1 focus:ring-black placeholder-neutral-350"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-550 mb-1.5 font-bold">Special Stylist Directives / Salon History (Optional)</label>
                  <textarea
                    id="booking-input-notes"
                    rows={2}
                    placeholder="E.g., thick dense hair volume, color lift history, premium scalp sensitivities..."
                    value={guestNotes}
                    onChange={(e) => setGuestNotes(e.target.value)}
                    className="w-full text-sm p-3 bg-white border border-black rounded-none focus:outline-none focus:ring-1 focus:ring-black placeholder-neutral-355"
                  />
                </div>

                <div className="bg-[#F8F7F2] border border-black/15 p-3.5 rounded-none flex items-start gap-2 text-neutral-700 text-[10px] leading-relaxed">
                  <CreditCard className="w-4 h-4 text-black shrink-0 mt-0.5" />
                  <span>
                    <strong>Cancellation Grace Rules</strong>: Free modifications or cancellation up to 4 hours in advance. No initial charge or pre-payment required online.
                  </span>
                </div>

                {/* Styled submit button */}
                <button
                  id="booking-submit-confirm"
                  type="submit"
                  className="hidden" // we trigger this using the general wizard buttons below
                />
              </form>
            )}


            {/* STEP BUTTONS */}
            <div className="mt-8 pt-4 border-t border-black/10 flex items-center justify-between">
              {step > 1 && step < 5 ? (
                <button
                  id="booking-btn-prev"
                  type="button"
                  onClick={() => setStep(prev => prev - 1)}
                  className="p-3 px-5 bg-neutral-150 hover:bg-neutral-200 text-black border border-neutral-350 tracking-widest text-[9px] font-mono font-bold uppercase rounded-none transition flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
              ) : (
                <div />
              )}

              {step === 1 && (
                <button
                  id="booking-btn-next-1"
                  type="button"
                  disabled={selectedServices.length === 0}
                  onClick={() => setStep(2)}
                  className="p-3 px-5 bg-black hover:bg-neutral-800 text-white border border-black tracking-widest text-[9px] font-mono font-bold uppercase rounded-none transition flex items-center gap-1.5 ml-auto disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                >
                  Next: Stylist <ChevronRight className="w-4 h-4" />
                </button>
              )}

              {step === 2 && (
                <button
                  id="booking-btn-next-2"
                  type="button"
                  disabled={!selectedStylist}
                  onClick={() => setStep(3)}
                  className="p-3 px-5 bg-black hover:bg-neutral-800 text-white border border-black tracking-widest text-[9px] font-mono font-bold uppercase rounded-none transition flex items-center gap-1.5 ml-auto disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                >
                  Next: Schedule <ChevronRight className="w-4 h-4" />
                </button>
              )}

              {step === 3 && (
                <button
                  id="booking-btn-next-3"
                  type="button"
                  disabled={!selectedDate || !selectedTimeSlot}
                  onClick={() => setStep(4)}
                  className="p-3 px-5 bg-black hover:bg-neutral-800 text-white border border-black tracking-widest text-[9px] font-mono font-bold uppercase rounded-none transition flex items-center gap-1.5 ml-auto disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                >
                  Next: Contact <ChevronRight className="w-4 h-4" />
                </button>
              )}

              {step === 4 && (
                <button
                  id="booking-btn-confirm"
                  type="button"
                  disabled={!guestName || !guestEmail || !guestPhone}
                  onClick={(e) => handleConfirmBooking(e)}
                  className="p-3.5 px-6 bg-black hover:bg-[#1A1A1A] text-white border border-black tracking-widest text-[9px] font-mono font-bold uppercase rounded-none transition flex items-center gap-1.5 ml-auto disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                >
                  Book Appointment <Check className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>

          {/* STEP 5: SUCCESS INTERFACE (Ticket style) */}
          {step === 5 && (
            <div className="w-full p-8 md:p-12 text-center flex flex-col items-center justify-center animate-fadeIn bg-black text-white rounded-none">
              <div className="w-14 h-14 bg-neutral-800 border border-neutral-700 text-[#F8F7F2] rounded-none flex items-center justify-center mb-5 text-2xl">
                ✓
              </div>
              <span className="text-neutral-400 font-mono text-[10px] uppercase tracking-widest font-bold">Reservation Secure</span>
              <h3 className="text-2xl md:text-3xl font-serif italic text-white mt-1">Downtown Appointment Confirmed!</h3>
              <p className="text-neutral-400 text-xs mt-2 max-w-sm font-sans leading-relaxed">
                We have registered your styled appointment at Downtown Salon. Please review your ticketing voucher:
              </p>
              
              {/* Receipt Visual mockup */}
              <div className="bg-[#1A1A1A] border border-neutral-800 rounded-none p-6 mt-6 w-full max-w-sm text-left font-mono text-xs text-neutral-350 space-y-3.5">
                <div className="flex justify-between border-b border-neutral-850 pb-2.5">
                  <span className="font-bold">BOOKING ID:</span>
                  <span className="font-bold text-white uppercase tracking-wider">{myAppointments[0]?.id}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[9px] font-bold tracking-widest">SERVICES</span>
                  <div className="font-sans text-neutral-200 text-xs mt-1.5 space-y-1.5">
                    {myAppointments[0]?.services.map(s => (
                      <div key={s.id} className="flex justify-between">
                        <span>• {s.name}</span>
                        <span className="font-mono font-semibold">${s.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between pt-1 border-t border-neutral-850">
                  <span className="font-bold">SPECIALIST:</span>
                  <span className="text-neutral-200">{myAppointments[0]?.stylist.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">DATE:</span>
                  <span className="text-white font-bold">{myAppointments[0] ? new Date(myAppointments[0].date).toLocaleDateString('en-US', {month: 'short', day: 'numeric', weekday: 'short'}) : ''}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">TIME:</span>
                  <span className="text-white font-bold">{myAppointments[0]?.timeSlot}</span>
                </div>
                <div className="border-t border-neutral-800 pt-3.5 flex justify-between font-bold text-white text-sm">
                  <span>AMOUNT DUE AT SALON:</span>
                  <span className="text-[#F8F7F2] font-mono">${myAppointments[0]?.totalPrice}</span>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-2.5 justify-center">
                <button
                  id="booking-btn-new-appointment"
                  onClick={handleResetForm}
                  className="px-5 py-3 bg-[#F8F7F2] text-black hover:bg-neutral-200 rounded-none text-[9px] font-mono tracking-widest font-bold uppercase transition border border-black cursor-pointer"
                >
                  Make Another Booking
                </button>
                <a
                  href="#contact-section"
                  className="px-5 py-3 bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-neutral-300 rounded-none text-[9px] font-mono tracking-widest font-bold uppercase transition cursor-pointer"
                >
                  Directions & Parking Guide
                </a>
              </div>
            </div>
          )}

          {/* Right Sidebar Checklist (Order summary, only shown under step 1-4) */}
          {step < 5 && (
            <div className="w-full md:w-80 bg-black text-[#F8F7F2] border-t md:border-t-0 md:border-l border-black p-5 md:p-6 flex flex-col justify-between">
              <div>
                <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#F8F7F2]/60 border-b border-[#F8F7F2]/15 pb-2.5 mb-4">
                  Reservation Ticket
                </h4>

                {/* Selected Services List */}
                <div className="space-y-4">
                  <div>
                    <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest font-bold font-bold">Selected Services</span>
                    {selectedServices.length === 0 ? (
                      <p className="text-xs text-neutral-400 italic mt-1.5 font-serif">No services selected yet.</p>
                    ) : (
                      <div className="space-y-2 mt-2">
                        {selectedServices.map(s => (
                          <div key={s.id} className="flex justify-between items-start text-xs font-sans gap-2 text-white bg-white/5 p-2 border border-white/5 rounded-none">
                            <span className="truncate text-xs">{s.name}</span>
                            <div className="flex items-center gap-1.5 shrink-0">
                              <span className="font-mono text-white font-bold">${s.price}</span>
                              <button
                                onClick={() => toggleService(s)}
                                className="text-neutral-500 hover:text-white transition cursor-pointer"
                                title="Remove service"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Selected Stylist */}
                  {selectedStylist && (
                    <div className="border-t border-[#F8F7F2]/10 pt-3">
                      <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest font-bold">Stylist</span>
                      <div className="flex items-center gap-2 mt-1.5 bg-white/5 p-2 rounded-none text-white border border-white/5">
                        {selectedStylist.id === 'any' ? (
                          <span className="text-xl">⭐</span>
                        ) : (
                          <img src={selectedStylist.avatar} alt="stylist" className="w-7 h-7 rounded-none object-cover shrink-0 border border-white/10" referrerPolicy="no-referrer" />
                        )}
                        <div className="min-w-0">
                          <p className="text-xs font-serif italic truncate leading-tight">{selectedStylist.name}</p>
                          <p className="text-[9px] font-mono text-neutral-400 uppercase tracking-wider truncate leading-none mt-1">{selectedStylist.role}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Selected Date & Time */}
                  {(selectedDate || selectedTimeSlot) && (
                    <div className="border-t border-[#F8F7F2]/10 pt-3">
                      <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest font-bold">Schedule Slot</span>
                      <div className="space-y-1.5 mt-1.5 text-xs font-mono uppercase tracking-wider">
                        {selectedDate && (
                          <div className="flex items-center gap-1.5 text-white">
                            <Calendar className="w-3.5 h-3.5 text-white" />
                            <span>{new Date(selectedDate).toLocaleDateString('en-US', {month: 'short', day: 'numeric', weekday: 'short'})}</span>
                          </div>
                        )}
                        {selectedTimeSlot && (
                          <div className="flex items-center gap-1.5 text-white">
                            <Clock className="w-3.5 h-3.5 text-white" />
                            <span>{selectedTimeSlot}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Running total footer */}
              <div className="border-t border-[#F8F7F2]/10 pt-4 mt-6">
                <div className="flex justify-between text-xs font-mono text-neutral-400">
                  <span>EST. TIMEFRAME:</span>
                  <span className="text-white font-bold">{totalDuration} MINS</span>
                </div>
                <div className="flex justify-between items-baseline mt-2.5 pt-2.5 border-t border-[#F8F7F2]/5">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">Est. Due Today:</span>
                  <span className="text-2xl font-mono font-extrabold text-white">${totalPrice}</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Local Booking Management Segment */}
        {myAppointments.length > 0 && (
          <div className="mt-12 bg-white p-6 rounded-none border border-black shadow-none text-black">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-[#1A1A1A] flex items-center gap-2 mb-4">
              <CalendarCheck className="w-4 h-4 text-black" /> Your Scheduled Appointments
            </h3>
            <div className="space-y-3">
              {myAppointments.map((apt) => (
                <div
                  id={`my-appointment-card-${apt.id}`}
                  key={apt.id}
                  className="bg-white rounded-none p-4 border border-black flex flex-col md:flex-row md:items-center justify-between gap-4 transition hover:bg-neutral-50"
                >
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-mono font-bold bg-neutral-250 text-black px-2 py-0.5 rounded-none border border-black/10">
                        {apt.id}
                      </span>
                      <span className="text-[10px] font-mono font-bold tracking-widest text-black border border-black px-2 py-0.5 rounded-none uppercase bg-neutral-100">
                        Confirmed & Live
                      </span>
                    </div>

                    <div className="mt-3.5 space-y-1.5 text-xs text-neutral-700">
                      <p className="font-serif italic flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-black shrink-0" /> 
                        <span><strong>Date Allocation:</strong> {new Date(apt.date).toLocaleDateString('en-US', {weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'})} • {apt.timeSlot}</span>
                      </p>
                      <p className="font-serif italic flex items-center gap-2">
                        <User className="w-4 h-4 text-black shrink-0" /> 
                        <span><strong>Assigned Hair Artist:</strong> {apt.stylist.name} ({apt.stylist.role})</span>
                      </p>
                      <p className="font-sans text-xs mt-2.5 pt-2 border-t border-black/5 text-neutral-600">
                        <strong>Services Selected:</strong> {apt.services.map(s => s.name).join(', ')}
                      </p>
                    </div>
                  </div>

                  <div className="flex md:flex-col items-end gap-3 justify-between md:justify-center border-t md:border-t-0 border-neutral-100 pt-3 md:pt-0">
                    <div className="text-right">
                      <span className="text-[9px] text-[#1A1A1A]/55 font-mono block uppercase tracking-wider">Estimated Total</span>
                      <span className="text-xl font-mono font-bold text-black">${apt.totalPrice}</span>
                    </div>
                    <button
                      id={`booking-btn-cancel-${apt.id}`}
                      onClick={() => handleCancelAppointment(apt.id)}
                      className="px-3.5 py-2 text-[9px] text-red-700 hover:bg-red-50 font-mono font-bold uppercase tracking-widest rounded-none bg-neutral-100 transition border border-neutral-300 flex items-center gap-1 cursor-pointer"
                      title="Cancel Booking"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-700" /> Cancel Reservation
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
