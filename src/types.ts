export interface Service {
  id: string;
  name: string;
  price: number;
  duration: number; // in minutes
  category: 'cuts' | 'color' | 'styling' | 'treatments' | 'grooming';
  description: string;
}

export interface Stylist {
  id: string;
  name: string;
  role: string;
  rating: number;
  specialty: string;
  avatar: string;
  bio: string;
}

export interface Appointment {
  id: string;
  services: Service[];
  stylist: Stylist;
  date: string; // YYYY-MM-DD
  timeSlot: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  notes?: string;
  totalPrice: number;
  status: 'confirmed' | 'cancelled';
}

export interface Review {
  id: string;
  reviewerName: string;
  rating: number; // 1-5
  date: string;
  comment: string;
  serviceCompleted?: string;
  verified: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'cuts' | 'color' | 'grooming' | 'all';
  imageUrl: string;
  description: string;
}
