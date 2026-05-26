import { useState } from 'react';
import { Scissors, Calendar, Clock, Sparkles, MapPin, Star, Phone, ShieldCheck, Menu, X, ArrowUpRight, Check } from 'lucide-react';
import { HERO_IMAGE } from './data';
import ServicesPricing from './components/ServicesPricing';
import StyleGallery from './components/StyleGallery';
import BookingSystem from './components/BookingSystem';
import ReviewsSection from './components/ReviewsSection';
import ContactBlock from './components/ContactBlock';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [preSelectedServiceId, setPreSelectedServiceId] = useState<string | null>(null);
  
  // Local state to show booking complete banner
  const [bookingSuccessNotice, setBookingSuccessNotice] = useState(false);

  // Link services card clicks directly to the Booking engine stepper
  const handleSelectServiceToBook = (serviceId: string) => {
    setPreSelectedServiceId(serviceId);
  };

  const handleBookingCompleted = () => {
    setBookingSuccessNotice(true);
    setTimeout(() => {
      setBookingSuccessNotice(false);
    }, 10000);
  };

  return (
    <div className="min-h-screen bg-[#F8F7F2] text-neutral-900 font-sans selection:bg-black selection:text-white scroll-smooth">
      
      {/* Dynamic Booking Success Alert Header */}
      {bookingSuccessNotice && (
        <div className="bg-black text-white px-4 py-2 border-b border-black text-[10px] font-mono tracking-widest flex items-center justify-center gap-2 sticky top-0 z-50 animate-fadeIn text-center uppercase">
          <Check className="w-4 h-4 text-neutral-300 shrink-0" />
          <span>RESERVATION CONFIRMED SUCCESSFULLY! Details cached below.</span>
          <button
            onClick={() => setBookingSuccessNotice(false)}
            className="text-white hover:text-neutral-400 underline font-bold ml-2 transition"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Navigation Header */}
      <nav id="navbar-main" className="w-full bg-[#F8F7F2]/90 backdrop-blur-md border-b border-black sticky top-0 z-40 transition-shadow">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#hero-section" className="flex items-center gap-3 group">
            <div className="w-10 h-10 border border-black bg-black text-white flex items-center justify-center text-sm font-bold shadow-none group-hover:bg-neutral-800 transition rounded-none">
              <Scissors className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-serif font-black tracking-tight text-base md:text-xl block leading-tight text-neutral-900 uppercase">
                STYL<span className="text-stone-500 font-light">IST.</span>
              </span>
              <span className="text-[9px] font-mono tracking-widest text-neutral-600 uppercase font-bold mt-0.5 block">
                Downtown Strand
              </span>
            </div>
          </a>

          {/* Core Desktop Menu Links */}
          <div className="hidden md:flex items-center gap-8 text-[10px] font-mono font-bold tracking-widest text-[#1A1A1A] uppercase">
            <a id="nav-pricing-link" href="#services-section" className="hover:text-neutral-600 transition">Services Menu</a>
            <a id="nav-trends-link" href="#gallery-section" className="hover:text-neutral-600 transition">Style Gallery</a>
            <a id="nav-reviews-link" href="#reviews-section" className="hover:text-neutral-600 transition">Guest Reviews</a>
            <a id="nav-contact-link" href="#contact-section" className="hover:text-neutral-600 transition">Hours & Transit</a>
          </div>

          {/* Book Now Button Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-[9px] font-mono text-neutral-800 border border-black/30 bg-neutral-100 px-3 py-1.5 rounded-none font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 bg-black rounded-full animate-pulse" />
              <span>Downtown Transit Hub</span>
            </div>
            <a
              id="nav-btn-booking"
              href="#booking-section"
              className="px-5 py-2.5 bg-black hover:bg-neutral-800 text-white font-mono text-[9px] font-bold tracking-widest uppercase rounded-none transition border border-black"
            >
              Book Reservation →
            </a>
          </div>

          {/* Mobile Toggler Hamburger */}
          <button
            id="mobile-menu-toggler"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#1A1A1A] hover:bg-neutral-100 transition rounded-none border border-black"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Responsive Drawer Mobile Menu */}
        {mobileMenuOpen && (
          <div id="mobile-menu-dropdown" className="md:hidden bg-[#F8F7F2] border-b border-black px-6 py-6 space-y-4 shadow-none animate-fadeIn">
            <div className="flex flex-col space-y-3.5 text-[10px] font-mono font-bold tracking-widest text-[#1A1A1A] pb-4 border-b border-black/10 uppercase">
              <a href="#services-section" onClick={() => setMobileMenuOpen(false)} className="hover:text-neutral-600 py-1">Services Menu & Pricing</a>
              <a href="#gallery-section" onClick={() => setMobileMenuOpen(false)} className="hover:text-neutral-600 py-1">Trends Photo Gallery</a>
              <a href="#reviews-section" onClick={() => setMobileMenuOpen(false)} className="hover:text-neutral-600 py-1">Client Reviews</a>
              <a href="#contact-section" onClick={() => setMobileMenuOpen(false)} className="hover:text-neutral-600 py-1">Directions & Active Hours</a>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-[9px] font-mono uppercase tracking-wider text-neutral-600">
                <MapPin className="w-3.5 h-3.5 text-black" />
                <span>Next to Library, S. Broadway Ave</span>
              </div>
              <a
                id="mobile-nav-btn-book"
                href="#booking-section"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 bg-black hover:bg-neutral-800 text-white font-mono text-[9px] font-bold tracking-widest uppercase rounded-none transition border border-black"
              >
                Instantly Book Online →
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* EDITORIAL HERO SECTION */}
      <section id="hero-section" className="relative bg-[#1A1A1A] border-b border-black overflow-hidden">
        {/* Subtle decorative mesh background overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-[#1A1A1A]/95 to-stone-900/40 z-10" />
        
        <img
          src={HERO_IMAGE}
          alt="Premium Downtown Hair Salon"
          className="absolute inset-0 w-full h-full object-cover object-center scale-100 opacity-30 transition-transform duration-700 hover:scale-105"
          referrerPolicy="no-referrer"
        />

        <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-24 md:py-36 z-20 flex flex-col justify-center min-h-[580px]">
          
          <div className="max-w-2xl text-stone-100 text-left space-y-8">
            
            {/* SEO context location pill */}
            <div className="inline-flex flex-wrap items-center gap-2 bg-transparent border border-white/20 px-3.5 py-1.5 rounded-none">
              <span className="w-1.5 h-1.5 bg-neutral-300 rounded-full" />
              <span className="text-[9px] font-mono font-bold tracking-widest text-[#F8F7F2] uppercase">
                Boutique Hair Experience — Est. 2018
              </span>
            </div>

            <h1 className="text-5xl md:text-8xl font-serif text-[#F8F7F2] tracking-tighter leading-[0.9]">
              STYL<br className="hidden md:inline" />IST.
            </h1>

            <p className="text-stone-300 text-base md:text-lg leading-snug font-serif italic max-w-md">
              A boutique hair experience located in the heart of the city, specializing in architectural cuts and bespoke color artistry.
            </p>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-3 gap-0 py-4 border-y border-white/10 max-w-md text-left font-mono text-[10px] tracking-wider uppercase font-bold text-neutral-400">
              <div className="pr-4">
                <span className="text-white text-base block font-serif lowercase italic">★ 4.9 stars</span>
                <span className="text-[9px] text-stone-500 tracking-wider">Client feedback</span>
              </div>
              <div className="border-l border-white/10 pl-4 pr-4">
                <span className="text-white text-base block font-serif">10+ years</span>
                <span className="text-[9px] text-stone-500 tracking-wider">Legacy</span>
              </div>
              <div className="border-l border-white/10 pl-4">
                <span className="text-white text-base block font-serif">Verified</span>
                <span className="text-[9px] text-stone-500 tracking-wider">Expertise</span>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                id="hero-book-now-cta"
                href="#booking-section"
                className="px-8 py-4 bg-[#F8F7F2] hover:bg-stone-200 text-black font-mono text-[10px] font-bold tracking-widest uppercase rounded-none transition flex items-center gap-2 border border-[#F8F7F2]"
              >
                Online Booking System →
              </a>
              <a
                id="hero-pricing-cta"
                href="#services-section"
                className="px-8 py-4 bg-transparent hover:bg-white/10 text-white border border-white/20 font-mono text-[10px] font-bold tracking-widest uppercase rounded-none transition"
              >
                Service Menu & Pricing
              </a>
            </div>

            {/* Local Search Booster notice */}
            <p className="text-[9px] text-stone-500 font-mono uppercase tracking-wider">
              📍 Parking Validation • Directly Opposite Broadway Subway Station
            </p>

          </div>
        </div>
      </section>

      {/* CORE STATS BOARD AND TRUST BADGES */}
      <section className="bg-white py-12 border-b border-black">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          <div className="flex flex-col md:flex-row items-start gap-4 p-4 border-b md:border-b-0 md:border-none border-neutral-100 last:border-none">
            <div className="w-10 h-10 border border-black bg-stone-150 flex items-center justify-center shrink-0 rounded-none text-base">
              ST
            </div>
            <div>
              <p className="text-[10px] font-mono tracking-widest font-bold uppercase text-neutral-500">Service 01</p>
              <h4 className="text-lg font-serif italic text-neutral-900 mt-0.5">Custom Color Artistry</h4>
              <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">Perfect caramel balayages, natural highlights, and safe botanical pastel tints.</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start gap-4 p-4 border-b md:border-b-0 md:border-x md:border-black/15 border-neutral-100 last:border-none">
            <div className="w-10 h-10 border border-black bg-stone-150 flex items-center justify-center shrink-0 rounded-none text-base">
              ST
            </div>
            <div>
              <p className="text-[10px] font-mono tracking-widest font-bold uppercase text-neutral-500">Service 02</p>
              <h4 className="text-lg font-serif italic text-neutral-900 mt-0.5">Architectural Haircuts</h4>
              <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">Precision geometric bobs, classic shags, french fringes, and modern custom fades.</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start gap-4 p-4 last:border-none">
            <div className="w-10 h-10 border border-black bg-stone-150 flex items-center justify-center shrink-0 rounded-none text-base">
              ST
            </div>
            <div>
              <p className="text-[10px] font-mono tracking-widest font-bold uppercase text-neutral-500">Service 03</p>
              <h4 className="text-lg font-serif italic text-neutral-900 mt-0.5">Botanical Luxury Care</h4>
              <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">Taming organic keratin coatings, intense lavender scalp detox formulas, and hydration hair masks.</p>
            </div>
          </div>

        </div>
      </section>

      {/* 2. SERVICES & PRICING BLOCK */}
      <ServicesPricing onSelectServiceToBook={handleSelectServiceToBook} />

      {/* 3. STYLE GALLERY MODULE */}
      <StyleGallery />

      {/* 4. CLINICAL INTEGRATED SCHEDULE WIZARD SECTION */}
      <BookingSystem
        preSelectedServiceId={preSelectedServiceId}
        onClearPreSelectedService={() => setPreSelectedServiceId(null)}
        onBookingSuccess={handleBookingCompleted}
      />

      {/* 5. GUEST FEEDBACK AND REVIEWS HUB */}
      <ReviewsSection />

      {/* 6. LOCAL DIRECTORY, ACTIVE HOURS AND GEOGRAPHIC ROADMAP */}
      <ContactBlock />

      {/* PROFESSIONAL LOCAL DIRECTORY FOOTER */}
      <footer className="bg-[#1A1A1A] border-t border-black py-20 px-4 md:px-8 text-stone-400">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Logo & Slogan Column */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 border border-white/20 bg-white/5 flex items-center justify-center font-bold text-neutral-100 rounded-none">
                ✂
              </div>
              <span className="font-serif font-bold tracking-tight text-white text-lg uppercase">
                STYL<span className="text-neutral-500">IST.</span>
              </span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              Established 2018 — Downtown District. Supporting client confidence of city neighborhoods. Specializing in precision styling, bespoke balayage, and luxurious lavender scalp rituals.
            </p>
            <div className="text-[9px] font-mono tracking-wider font-bold uppercase text-white bg-white/5 border border-white/10 px-3 py-1.5 rounded-none inline-block">
              📍 neighborhood serving: City Center • Historic & Loft District
            </div>
          </div>

          {/* Quick Hub Links */}
          <div className="space-y-4 font-mono text-[10px] font-bold tracking-widest uppercase text-stone-300">
            <h4 className="text-stone-500">Directory Context</h4>
            <div className="flex flex-col space-y-3">
              <a href="#services-section" className="hover:text-white transition">Services Pricing</a>
              <a href="#gallery-section" className="hover:text-white transition">Trends Lookbook</a>
              <a href="#reviews-section" className="hover:text-white transition">Recent Reviews</a>
              <a href="#booking-section" className="hover:text-white transition">Secure Booking Stepper</a>
            </div>
          </div>

          {/* Local Regulatory Details Column */}
          <div className="space-y-4 text-xs">
            <h4 className="text-stone-500 font-mono text-[10px] tracking-widest font-bold uppercase">Boutique Inquiries</h4>
            <p className="text-neutral-300 leading-relaxed font-serif italic text-sm">
              425 S. Broadway Ave<br />
              Downtown District, Suite 102
            </p>
            <p className="text-stone-500 font-mono text-[10px] pt-1 tracking-wider uppercase">
              hello@stylist-salon.com<br />
              +1 (555) 725-6611
            </p>
          </div>

        </div>

        {/* Bottom copyright margin bar */}
        <div className="max-w-7xl mx-auto border-t border-white/10 mt-16 pt-8 flex flex-col sm:flex-row justify-between text-[10px] font-mono uppercase tracking-widest text-[#F8F7F2]/45 gap-4">
          <p>© 2026 Stylist Boutique Salon Downtown. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#hero-section" className="hover:text-white">Back to top</a>
            <span>•</span>
            <a href="#booking-section" className="hover:text-white">Reservations portal</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
