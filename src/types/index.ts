/**
 * VERLASKA TRAVEL - Data Types & Models
 */

export interface WebsiteSettings {
  siteName: string;
  tagline: string;
  logoUrl: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  defaultLanguage: 'en' | 'id';
  description: string;
  heroHeading: string;
  heroSubheading: string;
  heroImageUrl: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  footerText: string;
  sectionVisibility: {
    destinations: boolean;
    tours: boolean;
    whyUs: boolean;
    about: boolean;
    gallery: boolean;
    testimonials: boolean;
    contact: boolean;
  };
}

export interface Advantage {
  id: string;
  title: string;
  description: string;
}

export interface AboutInfo {
  heading: string;
  description: string;
  mission: string;
  vision: string;
  advantages: Advantage[];
  mainPhotoUrl: string;
  logoUrl: string;
}

export interface Destination {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  location: string;
  imageUrl: string;
  published: boolean;
  featured: boolean;
  highlights: string[];
}

export type PriceType = 'fixed' | 'starting' | 'contact';

export interface TourPackage {
  id: string;
  name: string;
  description: string;
  mainImage: string;
  duration: string;
  destinationsIncluded: string[];
  itinerary: Array<{ time: string; title: string; description: string }>;
  priceType: PriceType;
  price: number;
  currency: string;
  includedServices: string[];
  excludedServices: string[];
  meetingPoint: string;
  availableDates: string;
  bookingStatus: 'available' | 'limited' | 'on_request';
  featured: boolean;
  published: boolean;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  category: string;
  showOnHome: boolean;
  order: number;
}

export interface Testimonial {
  id: string;
  name: string;
  roleOrOrigin: string;
  reviewText: string;
  profilePhotoUrl?: string;
  rating: number;
  published: boolean;
  isSample: boolean; // Clearly labeled during development
}

export interface ContactSettings {
  whatsappNumber: string;
  email: string;
  instagram: string;
  facebook: string;
  tiktok: string;
  youtube?: string;
  address: string;
  operatingHours: string;
  googleMapsEmbed: string;
}

export interface Inquiry {
  id: string;
  fullName: string;
  email: string;
  travelDate: string;
  travelersCount: number;
  preferredDestination: string;
  message: string;
  createdAt: string;
  status: 'new' | 'read' | 'contacted';
}

export interface AppData {
  settings: WebsiteSettings;
  about: AboutInfo;
  destinations: Destination[];
  tours: TourPackage[];
  gallery: GalleryImage[];
  testimonials: Testimonial[];
  contact: ContactSettings;
  inquiries: Inquiry[];
}

export interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
  token: string | null;
}
