import { useState } from 'react';
import { Search, Clock, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Service } from '../types';
import { SERVICES } from '../data';

interface ServicesPricingProps {
  onSelectServiceToBook: (serviceId: string) => void;
}

export default function ServicesPricing({ onSelectServiceToBook }: ServicesPricingProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const handleSelectService = (id: string) => {
    onSelectServiceToBook(id);
  };

  const getFilteredServices = () => {
    return SERVICES.filter((service) => {
      const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            service.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  };

  const categories = [
    { id: 'all', name: 'All Services' },
    { id: 'cuts', name: 'Cuts & Volume' },
    { id: 'color', name: 'Professional Color' },
    { id: 'styling', name: 'Dry styling' },
    { id: 'treatments', name: 'Hair Wellness' },
    { id: 'grooming', name: 'Men’s Grooming' },
  ];

  return (
    <div id="services-section" className="w-full bg-[#F8F7F2] py-20 px-4 md:px-8 border-b border-black">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-500 uppercase">
              Established 2018 — Service Menu
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-neutral-900 tracking-tight mt-3">
              Precision Hair Menu
            </h2>
            <p className="text-neutral-700 font-serif italic text-sm md:text-base mt-2">
              Every appointment is optimized for the downtown lifestyle, featuring premium organic materials, complete scalp rituals, and dedicated styling finishing.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              id="services-search-input"
              type="text"
              placeholder="Filter by keyword (e.g. fade, cut)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-none border border-black bg-white text-sm focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>
        </div>

        {/* Categories Scroller */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-10 border-b border-black/15 max-w-full no-scrollbar">
          {categories.map((cat) => (
            <button
              id={`service-cat-tab-${cat.id}`}
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-none transition whitespace-nowrap shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-black text-[#F8F7F2] border border-black'
                  : 'bg-transparent text-neutral-600 border border-neutral-300 hover:border-black hover:text-black'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Service Cards Grid - Styled exquisitely */}
        {getFilteredServices().length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-black bg-black">
            {getFilteredServices().map((service) => (
              <div
                id={`service-card-${service.id}`}
                key={service.id}
                className="group relative bg-[#F8F7F2] p-6 border-r border-b border-black transition-colors hover:bg-neutral-100 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start gap-3">
                    <span className="text-[9px] font-mono font-bold uppercase text-black bg-neutral-200 px-2.5 py-0.5 rounded-none tracking-widest">
                      {service.category}
                    </span>
                    <div className="flex items-center gap-1 text-neutral-500 text-[10px] font-mono uppercase tracking-wider whitespace-nowrap">
                      <Clock className="w-3.5 h-3.5 text-neutral-500" />
                      <span>{service.duration} MIN</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-serif italic text-neutral-900 tracking-tight mt-4 mb-2 group-hover:text-black">
                    {service.name}
                  </h3>

                  <p className="text-xs text-neutral-600 leading-relaxed min-h-[50px]">
                    {service.description}
                  </p>

                  {/* Highlights checklist */}
                  <div className="mt-4 space-y-1.5 border-t border-black/10 pt-3 text-[10px] text-neutral-700 font-sans">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                      <span>Complimentary tea, espresso, or micro-roasted coffee</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                      <span>Luxe botanical shampoo & scalp massage</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-black/15 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase font-mono tracking-widest text-neutral-400">Fixed rate</span>
                    <span className="text-xl font-mono font-bold text-neutral-900">${service.price}</span>
                  </div>

                  <button
                    id={`service-book-btn-${service.id}`}
                    onClick={() => handleSelectService(service.id)}
                    className="py-2.5 px-4 rounded-none bg-black hover:bg-neutral-800 text-white font-mono text-[9px] font-bold tracking-widest uppercase transition flex items-center gap-1.5 border border-black"
                  >
                    Select & Book →
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-black rounded-none bg-white">
            <p className="text-neutral-500 font-mono text-xs">No services matched your query.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="mt-4 text-xs font-mono text-black underline font-bold uppercase tracking-wider"
            >
              Reset Filters & Search
            </button>
          </div>
        )}

        {/* Local SEO / Call-to-Neighborhood Block */}
        <div className="mt-16 bg-white border border-black rounded-none p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="z-10 max-w-2xl space-y-2">
            <span className="text-neutral-500 font-mono text-[10px] tracking-widest font-bold uppercase block">Downtown Resident Perks</span>
            <h3 className="text-2xl md:text-3xl font-serif italic text-neutral-950 tracking-tight mt-2">
              Are you from the neighborhood?
            </h3>
            <p className="text-neutral-700 text-sm leading-relaxed font-sans">
              We love supporting our downtown community. Residents of the downtown area receive a complimentary deep hydration scalp conditioning mask containing pure botanical honey on their first visit. Simply mention your building or street address to the stylist!
            </p>
          </div>

          <a
            href="#booking-section"
            className="z-10 shrink-0 bg-black text-[#F8F7F2] hover:bg-neutral-800 py-4 px-6 rounded-none text-[9px] font-mono tracking-widest font-bold uppercase transition border border-black"
          >
            Claim Resident Offer Now
          </a>
        </div>

      </div>
    </div>
  );
}
