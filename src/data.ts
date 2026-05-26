import { Service, Stylist, GalleryItem, Review } from './types';

// Let's resolve the actual generated image paths
import salonHeroImg from './assets/images/salon_hero_1779786807463.png';
import styleBobImg from './assets/images/style_bob_1779786826508.png';
import styleFadeImg from './assets/images/style_fade_1779786848619.png';
import styleBalayageImg from './assets/images/style_balayage_1779786869577.png';
import styleRoseGoldImg from './assets/images/style_rose_gold_1779786891022.png';

export const HERO_IMAGE = salonHeroImg;

export const SERVICES: Service[] = [
  {
    id: 's1',
    name: 'Signature Downtown Cut & Blowout',
    price: 85,
    duration: 60,
    category: 'cuts',
    description: 'Includes luxurious custom shampoo, aromatherapy scalp massage, artistic haircut, and premium sleek blowout.'
  },
  {
    id: 's2',
    name: 'Chic Maintenance Cut',
    price: 65,
    duration: 45,
    category: 'cuts',
    description: 'Dry or wet maintenance trim to remove split ends and maintain healthy hair geometry.'
  },
  {
    id: 's3',
    name: 'Premium Art Balayage & Gloss',
    price: 210,
    duration: 180,
    category: 'color',
    description: 'Artistic hand-painted custom highlighting paired with custom toning gloss for a seamless, sun-kissed finish.'
  },
  {
    id: 's4',
    name: 'Single Process Root Refresh',
    price: 95,
    duration: 90,
    category: 'color',
    description: 'Perfect for seamless depth matching and gray coverage to maintain a sharp, rich look between major sessions.'
  },
  {
    id: 's5',
    name: 'Creative Pastel / Vivid Tint',
    price: 155,
    duration: 120,
    category: 'color',
    description: 'Dynamic highlights or all-over fashion tones including rose-gold, silver, and custom primary colors.'
  },
  {
    id: 's6',
    name: 'Red Carpet Volume Blowout',
    price: 55,
    duration: 45,
    category: 'styling',
    description: 'Specialty double-brush wash and blowout for max volume, straight shine, or lush bouncing curls.'
  },
  {
    id: 's7',
    name: 'Special Event Updo & Braiding',
    price: 90,
    duration: 75,
    category: 'styling',
    description: 'Sophisticated pin-ups, vintage curls, or structural braids tailored for galas, dinners, and events.'
  },
  {
    id: 's8',
    name: 'Deep-Hydrating Botanical Keratin Treatment',
    price: 45,
    duration: 30,
    category: 'treatments',
    description: 'Steam-infused organic hydration to tame stubborn frizz, lock down color pigments, and restore glossy finish.'
  },
  {
    id: 's9',
    name: 'Scalp Detox & Essential Oil Care',
    price: 50,
    duration: 45,
    category: 'treatments',
    description: 'Clarifying dynamic scrub and tea-tree infusion to eliminate oil buildup and stimulate healthy base growth.'
  },
  {
    id: 's10',
    name: "Classic Downtown Fade & Hot Towel",
    price: 45,
    duration: 45,
    category: 'grooming',
    description: 'Signature barber scissor-and-clipper styling, skin taper fade, straight-razor clean outline, and hot botanical facial towel.'
  },
  {
    id: 's11',
    name: 'Executive Beardsmanship Cut',
    price: 35,
    duration: 30,
    category: 'grooming',
    description: 'Crisply detailed trimmer adjustment, clean hot-shave razor cheek borders, and premium botanical oil hydration.'
  }
];

export const STYLISTS: Stylist[] = [
  {
    id: 'st1',
    name: 'Sophia Laurent',
    role: 'Creative Director & Co-Founder',
    rating: 4.9,
    specialty: 'Balayage Artistry & Fashion Shading',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    bio: 'With over a decade of dedication in high-fashion runways and downtown salons, Sophia excels in natural dimensional blondes and vivid pastel tones.'
  },
  {
    id: 'st2',
    name: 'Marcus Vance',
    role: 'Master Barber & Hair Therapist',
    rating: 5.0,
    specialty: 'Crisp Fades, Tapers & Beard Detailing',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    bio: 'Marcus takes grooming as a precise geometry. Famed downtown for his flawless skin fades, relaxed conversation, and specialized hot-rag shaves.'
  },
  {
    id: 'st3',
    name: 'Elena Rostova',
    role: 'Senior Hair Stylist',
    rating: 4.8,
    specialty: 'Symmetrical Bobs & Volume Blowouts',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80',
    bio: 'Elena views hair styling as sculpture. She combines deep structural bone anatomy awareness with modern cuts that hold volume for days.'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    reviewerName: 'Jessica Miller',
    rating: 5,
    date: '2026-05-18',
    comment: 'Sophia is absolute magic! I have been searching for someone downtown who can actually do a rich blonde balayage without damaging my hair. She exceeded all expectations. The space feels incredibly safe, upscale, and peaceful.',
    serviceCompleted: 'Premium Art Balayage & Gloss',
    verified: true
  },
  {
    id: 'r2',
    reviewerName: 'David Chen',
    rating: 5,
    date: '2026-05-12',
    comment: 'First time visiting Marcus and easily the best skin fade I have ever had. The hot-towel massage at the end was so therapeutic after a long workday in downtown. Truly a gem for our neighborhood.',
    serviceCompleted: 'Classic Downtown Fade & Hot Towel',
    verified: true
  },
  {
    id: 'r3',
    reviewerName: 'Amanda Reynolds',
    rating: 4,
    date: '2026-05-05',
    comment: 'Lovely experience. Elena designed a gorgeous textured shoulder-length bob for me. She taught me how to blow dry it properly to keep the volume. Booking was seamless on their website.',
    serviceCompleted: 'Signature Downtown Cut & Blowout',
    verified: true
  },
  {
    id: 'r4',
    reviewerName: 'Jordan Banks',
    rating: 5,
    date: '2026-04-28',
    comment: 'The booking system is phenomenal. I scheduled an appointment last minute on Monday. The environment is spotless and so modern. Scalp massage felt incredible!',
    serviceCompleted: 'Scalp Detox & Essential Oil Care',
    verified: true
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Textured Classic Bob with Highlights',
    category: 'cuts',
    imageUrl: styleBobImg,
    description: 'A beautiful chic bob haircut with subtle golden-brown dimensional highlights and beachy waves.'
  },
  {
    id: 'g2',
    title: 'Precision Mid-Skin Fade',
    category: 'grooming',
    imageUrl: styleFadeImg,
    description: 'Crisp textured crop cut matched with skin fade and razor-sharp beard styling.'
  },
  {
    id: 'g3',
    title: 'Seamless Caramel Honey Balayage',
    category: 'color',
    imageUrl: styleBalayageImg,
    description: 'Flowing caramel tones hand-painted into luxury rich dark roots for soft, high-shine summer waves.'
  },
  {
    id: 'g4',
    title: 'Fashion Rose-Gold Tint',
    category: 'color',
    imageUrl: styleRoseGoldImg,
    description: 'Pastel metallic pink rose-gold coloring on textured shoulder layering.'
  }
];
