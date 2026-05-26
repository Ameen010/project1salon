import { useState, useEffect, FormEvent } from 'react';
import { Mail, Phone, MapPin, Compass, CheckCircle2, Navigation, Send } from 'lucide-react';

export default function ContactBlock() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState<boolean | null>(null);

  // Check if current time falls within standard business hours (9:00 AM to 7:00 PM)
  useEffect(() => {
    const checkIfOpen = () => {
      const now = new Date();
      const currentHour = now.getHours();
      // Open 9:00 AM to 7:00 PM (hour 9 to 18 inclusive)
      if (currentHour >= 9 && currentHour < 19) {
        setIsOpenNow(true);
      } else {
        setIsOpenNow(false);
      }
    };
    checkIfOpen();
    // Refresh check hourly
    const timer = setInterval(checkIfOpen, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    // Simulate sending message beautifully
    setIsSent(true);
    setName('');
    setEmail('');
    setMessage('');

    setTimeout(() => {
      setIsSent(false);
    }, 8000);
  };

  return (
    <div id="contact-section" className="w-full bg-[#1A1A1A] text-neutral-300 py-20 px-4 md:px-8 border-b border-black">
      <div className="max-w-6xl mx-auto">
        
        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Side: Info & Live Hours */}
          <div className="space-y-8 animate-fadeIn">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest bg-white/5 border border-white/10 px-3 py-1 rounded-none text-neutral-300">
                Visit Downtown Shop
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#F8F7F2] tracking-tight mt-3">
                Stop By Today
              </h2>
              <p className="text-neutral-400 font-serif italic text-sm md:text-base mt-2 max-w-md leading-relaxed">
                Located right in the historic center of Downtown. Easy access from transit hubs, with dedicated complimentary underground parking.
              </p>
            </div>

            {/* Live Open/Closed Status Flag */}
            <div className="bg-white/5 border border-white/10 p-5 rounded-none flex items-center justify-between">
              <div>
                <span className="text-[9px] font-mono text-neutral-500 uppercase block tracking-wider font-bold">Current Shop Status</span>
                <span className="text-xs font-sans text-neutral-300 mt-1 block">
                  Weekly standard hours: 9:00 AM – 7:00 PM (Monday – Sunday)
                </span>
              </div>
              
              <div>
                {isOpenNow === true ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none text-[9px] font-mono font-bold bg-white/10 text-white border border-white/20 animate-pulse uppercase tracking-widest font-bold">
                    ● Open Now
                  </span>
                ) : isOpenNow === false ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none text-[9px] font-mono font-bold bg-neutral-800 text-neutral-400 border border-neutral-700 uppercase tracking-widest font-bold">
                    ● Closed Now
                  </span>
                ) : (
                  <span className="text-xs text-neutral-400 font-mono">Loading Status...</span>
                )}
              </div>
            </div>

            {/* Direct Contact Metrics */}
            <div className="space-y-4 font-sans text-neutral-300">
              <div className="flex gap-4 items-start pb-4 border-b border-white/5">
                <div className="w-10 h-10 rounded-none bg-white/5 text-white flex items-center justify-center shrink-0 border border-white/10">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white font-mono uppercase tracking-widest">Downtown Coordinates</h4>
                  <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
                    425 S. Broadway Ave, Suite 102<br />
                    Downtown, City Center (Adjacent to the Downtown Central Library)
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start pb-4 border-b border-white/5">
                <div className="w-10 h-10 rounded-none bg-white/5 text-white flex items-center justify-center shrink-0 border border-white/10">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white font-mono uppercase tracking-widest">Parking & Subway Access</h4>
                  <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
                    <strong>Underground Parking</strong>: 2 hours full validation at the Municipal Parking Garage (entrance via 4th Ave).<br />
                    <strong>Public Transit</strong>: Line 4 Underground Station directly opposite the main entrance escalators.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start pb-4 border-b border-white/5">
                <div className="w-10 h-10 rounded-none bg-white/5 text-white flex items-center justify-center shrink-0 border border-white/10">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white font-mono uppercase tracking-widest">Direct Call / Reception</h4>
                  <p className="text-xs text-neutral-400 mt-1.5 font-mono">
                    +1 (555) 725-6611
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-none bg-white/5 text-white flex items-center justify-center shrink-0 border border-white/10">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white font-mono uppercase tracking-widest">Email Correspondence</h4>
                  <p className="text-xs text-neutral-400 mt-1.5 font-mono">
                    hello@downtownhairsalon.com
                  </p>
                </div>
              </div>
            </div>

            {/* Custom Aesthetic Vector Map Mockup */}
            <div className="relative h-44 rounded-none bg-black border border-neutral-800 overflow-hidden shadow-inner group p-4 flex flex-col justify-end">
              <div className="absolute inset-0 bg-[radial-gradient(#242c24_1px,transparent_1px)] [background-size:16px_16px] opacity-60" />
              <div className="absolute top-1/2 left-1/3 w-32 h-1.5 bg-neutral-800/40 rounded-none transform -rotate-12" />
              <div className="absolute top-1/4 left-1/2 w-1.5 h-32 bg-neutral-800/30 rounded-none" />
              
              {/* Map pin marker icon glowing */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-white/20 absolute -top-1 -left-1 animate-ping" />
                  <div className="w-6 h-6 rounded-none bg-white text-black flex items-center justify-center border border-white shadow-lg text-xs font-bold font-mono">
                    📍
                  </div>
                </div>
                <span className="text-[9px] font-bold font-mono text-black bg-[#F8F7F2] border border-black px-2 py-0.5 rounded-none shadow mt-1">
                  We Are Here
                </span>
              </div>

              {/* Surrounding landmarks labels */}
              <div className="absolute top-4 left-6 text-[9px] font-mono text-neutral-600 bg-neutral-900/50 px-1.5 py-0.5 rounded-none">
                Central Plaza
              </div>
              <div className="absolute bottom-6 right-6 text-[9px] font-mono text-neutral-600 bg-neutral-900/50 px-1.5 py-0.5 rounded-none">
                Broadway Terminal
              </div>
              
              <div className="z-20 text-[10px] text-neutral-500 font-mono flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-neutral-350" />
                <span>Downtown Grid Navigation Live • Click Below for GPS</span>
              </div>
            </div>
          </div>

          {/* Right Side: Message Contact Form */}
          <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-none relative">
            
            {isSent && (
              <div className="absolute inset-0 bg-neutral-950/95 z-30 flex flex-col items-center justify-center text-center p-6 rounded-none animate-fadeIn">
                <div className="w-12 h-12 bg-white text-black border border-black rounded-none flex items-center justify-center text-2xl shadow-none mb-4 font-bold">
                  ✓
                </div>
                <h3 className="text-xl font-serif font-bold text-[#F8F7F2]">Inquiry Dispatched!</h3>
                <p className="text-neutral-400 text-xs mt-2 max-w-sm">
                  Thank you for reaching out. A receptionist from our Downtown hub will review your query and contact you within 2 business hours.
                </p>
                <button
                  id="contact-btn-reset-form"
                  onClick={() => setIsSent(false)}
                  className="mt-6 text-xs text-white hover:text-neutral-300 underline font-mono font-bold uppercase tracking-wider"
                >
                  Send another inquiry
                </button>
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-lg font-serif italic text-[#F8F7F2]">
                Direct Inquiry Mailbox
              </h3>
              <p className="text-neutral-400 text-xs mt-1">
                Have specific styling questions, bridal group pricing queries, or local partnership pitches? Submit below.
              </p>
            </div>

            <form onSubmit={handleSendMessage} className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-550 font-bold mb-1.5">Your Name</label>
                <input
                  id="contact-input-name"
                  type="text"
                  required
                  placeholder="E.g. Alexander Green"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-sm p-3 bg-neutral-950 border border-neutral-800 rounded-none focus:border-white focus:outline-none focus:ring-1 focus:ring-white text-neutral-200 placeholder-neutral-700"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-550 font-bold mb-1.5">Email Address</label>
                <input
                  id="contact-input-email"
                  type="email"
                  required
                  placeholder="alexander@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-sm p-3 bg-neutral-950 border border-neutral-800 rounded-none focus:border-white focus:outline-none focus:ring-1 focus:ring-white text-neutral-200 placeholder-neutral-700"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-550 font-bold mb-1.5">Your Message</label>
                <textarea
                  id="contact-input-message"
                  required
                  rows={4}
                  placeholder="How can our downtown team accommodate your styling desires today?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full text-sm p-3 bg-neutral-950 border border-neutral-800 rounded-none focus:border-white focus:outline-none focus:ring-1 focus:ring-white text-neutral-200 placeholder-neutral-700"
                />
              </div>

              <button
                id="contact-submit-btn"
                type="submit"
                className="w-full py-3 bg-[#F8F7F2] hover:bg-[#E8E6DD] text-black font-mono text-[9px] font-bold tracking-widest uppercase rounded-none transition flex items-center justify-center gap-1.5 border border-black"
              >
                Dispatch Inquiry <Send className="w-3.5 h-3.5 text-black" />
              </button>
            </form>

            {/* SEO Keyword tags beneath */}
            <div className="mt-8 pt-6 border-t border-neutral-800 flex flex-wrap gap-2 text-[9px] font-mono text-neutral-500 uppercase tracking-widest">
              <span>#DowntownHairSalon</span>
              <span>•</span>
              <span>#DowntownMensFade</span>
              <span>•</span>
              <span>#DowntownBalayageSpecialists</span>
              <span>•</span>
              <span>#LuxeHaircutsCityCenter</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
