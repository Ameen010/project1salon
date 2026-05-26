import { useState } from 'react';
import { Eye, Clock, X, Info } from 'lucide-react';
import { GalleryItem } from '../types';
import { GALLERY_ITEMS } from '../data';

export default function StyleGallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const filterItems = () => {
    if (selectedCategory === 'all') return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter(item => item.category === selectedCategory);
  };

  const categories = [
    { id: 'all', name: 'All Trends' },
    { id: 'cuts', name: 'Signature Cuts' },
    { id: 'color', name: 'Artistic Balayage & Color' },
    { id: 'grooming', name: 'Precision Grooming' }
  ];

  return (
    <div id="gallery-section" className="w-full bg-[#F8F7F2] py-20 px-4 md:px-8 border-b border-black">
      <div className="max-w-6xl mx-auto">
        
        {/* Gallery Title */}
        <div className="text-center mb-12">
          <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-500 uppercase">
            Signature Showcase
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-neutral-900 tracking-tight mt-3">
            Downtown Lookbook
          </h2>
          <p className="text-neutral-700 font-serif italic text-sm md:text-base max-w-xl mx-auto mt-2">
            No stock modeling. These photos illustrate real style work produced directly under the scissors of our salon master artists.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex gap-2 justify-center overflow-x-auto pb-2 mb-10 max-w-full no-scrollbar">
          {categories.map((cat) => (
            <button
              id={`gallery-cat-${cat.id}`}
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-widest transition whitespace-nowrap rounded-none ${
                selectedCategory === cat.id
                  ? 'bg-black text-[#F8F7F2] border border-black'
                  : 'bg-transparent text-neutral-600 border border-neutral-350 hover:border-black hover:text-black'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filterItems().map((item) => (
            <div
              id={`gallery-item-${item.id}`}
              key={item.id}
              className="group relative bg-white rounded-none overflow-hidden border border-black transition-transform duration-350 hover:-translate-y-1 cursor-pointer"
              onClick={() => setActiveItem(item)}
            >
              <div className="relative aspect-square overflow-hidden bg-neutral-100">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-neutral-950/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="p-3 bg-white text-black border border-black transition-transform transform translate-y-2 group-hover:translate-y-0 duration-300 rounded-none">
                    <Eye className="w-4 h-4 text-black" />
                  </span>
                </div>
              </div>

              <div className="p-4 border-t border-black">
                <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-550 font-semibold block">
                  {item.category}
                </span>
                <h3 className="text-base font-serif italic text-neutral-900 truncate mt-1">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-600 truncate mt-0.5">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Overlay Detail Modal */}
        {activeItem && (
          <div
            id="gallery-modal-overlay"
            className="fixed inset-0 z-50 bg-neutral-950/75 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setActiveItem(null)}
          >
            <div
              id="gallery-modal-container"
              className="bg-[#F8F7F2] rounded-none overflow-hidden max-w-2xl w-full border border-black shadow-none relative animate-scaleUp"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                id="gallery-modal-close"
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black text-[#F8F7F2] hover:bg-neutral-800 transition rounded-none border border-black"
                title="Close lightbox"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 aspect-square bg-[#F1EFEB]">
                  <img
                    src={activeItem.imageUrl}
                    alt={activeItem.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="md:w-1/2 p-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="text-[9px] font-mono font-bold uppercase text-black bg-neutral-200 px-2.5 py-1 tracking-widest rounded-none">
                      {activeItem.category} Showcase
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-neutral-950 mt-2">
                      {activeItem.title}
                    </h3>
                    <p className="text-xs text-neutral-700 leading-relaxed">
                      {activeItem.description}
                    </p>

                    <div className="space-y-2 text-xs text-neutral-600 border-t border-black/10 pt-3">
                      <div className="flex items-center gap-2">
                        <Info className="w-4 h-4 text-neutral-800" />
                        <span>Available for all hair textures.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-neutral-800" />
                        <span>Approx. 45 - 180 Minutes scaling.</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-black/10 flex items-center gap-3">
                    <a
                      href="#booking-section"
                      onClick={() => setActiveItem(null)}
                      className="flex-1 py-3 px-4 bg-black hover:bg-neutral-800 text-white font-mono text-[9px] font-bold tracking-widest uppercase rounded-none text-center transition border border-black"
                    >
                      Book This Look →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
