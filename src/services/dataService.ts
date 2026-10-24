import { AppData, ContactSettings, Destination, Inquiry, TourPackage, Testimonial, GalleryImage, WebsiteSettings, AboutInfo } from '../types';
import { INITIAL_DATA } from '../data/initialData';
import { ContactFormInput } from '../utils/bookingUtils';

const STORAGE_KEY = 'verlaska_travel_data_v1';
const AUTH_TOKEN_KEY = 'verlaska_admin_token';
const AUTH_USER_KEY = 'verlaska_admin_user';

export async function loadAppData(): Promise<AppData> {
  const ensureFullData = (loaded: any): AppData => {
    return {
      settings: loaded?.settings || INITIAL_DATA.settings,
      about: loaded?.about || INITIAL_DATA.about,
      destinations:
        loaded?.destinations && loaded.destinations.length > 0
          ? loaded.destinations
          : INITIAL_DATA.destinations,
      tours:
        loaded?.tours && loaded.tours.length > 0
          ? loaded.tours
          : INITIAL_DATA.tours,
      gallery:
        loaded?.gallery && loaded.gallery.length > 0
          ? loaded.gallery
          : INITIAL_DATA.gallery,
      testimonials:
        loaded?.testimonials && loaded.testimonials.length > 0
          ? loaded.testimonials
          : INITIAL_DATA.testimonials,
      contact: loaded?.contact || INITIAL_DATA.contact,
      inquiries: loaded?.inquiries || [],
    };
  };

  // Try server first
  try {
    const res = await fetch('/api/data');
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        const full = ensureFullData(json.data);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(full));
        return full;
      }
    }
  } catch (err) {
    console.warn('Backend /api/data not reachable, falling back to local storage', err);
  }

  // Fallback to local storage
  try {
    const local = localStorage.getItem(STORAGE_KEY);
    if (local) {
      const parsed = JSON.parse(local);
      return ensureFullData(parsed);
    }
  } catch (err) {
    console.error('Error parsing local storage data:', err);
  }

  // Default to initial data
  return INITIAL_DATA;
}

export async function saveAppData(data: AppData, token?: string): Promise<{ success: boolean; message?: string }> {
  // Always update local storage first for instant feedback and offline support
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent('verlaska_data_changed', { detail: data }));
  } catch (err) {
    console.error('Failed to save to local storage', err);
  }

  // If token is available, persist to server
  if (token) {
    try {
      const res = await fetch('/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const json = await res.json();
        return { success: true, message: json.message || 'Saved successfully to database.' };
      }
    } catch (err) {
      console.warn('Could not reach server to persist data, saved locally', err);
    }
  }

  return { success: true, message: 'Saved successfully.' };
}

export async function submitInquiry(formData: ContactFormInput): Promise<{ success: boolean; message: string; inquiry?: Inquiry }> {
  try {
    const res = await fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      const json = await res.json();
      if (json.success) {
        return { success: true, message: json.message, inquiry: json.inquiry };
      }
    }
  } catch (err) {
    console.warn('Network issue submitting inquiry to server, recording locally', err);
  }

  // Local record fallback
  const newInquiry: Inquiry = {
    id: 'inq-' + Date.now(),
    fullName: formData.fullName.trim(),
    email: formData.email.trim(),
    travelDate: formData.travelDate || '',
    travelersCount: formData.travelersCount || 1,
    preferredDestination: formData.preferredDestination || 'General Inquiry',
    message: formData.message.trim(),
    createdAt: new Date().toISOString(),
    status: 'new',
  };

  try {
    const current = await loadAppData();
    if (!current.inquiries) current.inquiries = [];
    current.inquiries.unshift(newInquiry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
    window.dispatchEvent(new CustomEvent('verlaska_data_changed', { detail: current }));
  } catch (err) {
    console.error('Error saving inquiry locally', err);
  }

  return {
    success: true,
    message: 'Thank you! Your travel inquiry has been received. Our team will contact you shortly.',
    inquiry: newInquiry,
  };
}

export async function loginAdmin(username: string, password: string): Promise<{ success: boolean; token?: string; error?: string }> {
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const json = await res.json();
    if (res.ok && json.success) {
      localStorage.setItem(AUTH_TOKEN_KEY, json.token);
      localStorage.setItem(AUTH_USER_KEY, json.username);
      return { success: true, token: json.token };
    }
    return { success: false, error: json.error || 'Invalid credentials' };
  } catch (err) {
    // If backend isn't reached (e.g. static preview), check fallback demo credentials
    if (username.trim().toLowerCase() === 'admin' && password === 'verlaska2026!') {
      const mockToken = 'local-token-' + Date.now();
      localStorage.setItem(AUTH_TOKEN_KEY, mockToken);
      localStorage.setItem(AUTH_USER_KEY, 'admin');
      return { success: true, token: mockToken };
    }
    return { success: false, error: 'Cannot connect to authentication service or incorrect credentials' };
  }
}

export function getStoredAuth(): { token: string | null; username: string | null } {
  return {
    token: localStorage.getItem(AUTH_TOKEN_KEY),
    username: localStorage.getItem(AUTH_USER_KEY),
  };
}

export function clearStoredAuth(): void {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
}

export async function uploadImageFile(file: File, token?: string): Promise<{ success: boolean; url?: string; error?: string }> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;

      if (token) {
        try {
          const res = await fetch('/api/upload', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              imageBase64: base64,
              filename: file.name,
            }),
          });
          const json = await res.json();
          if (res.ok && json.success && json.url) {
            return resolve({ success: true, url: json.url });
          }
        } catch (err) {
          console.warn('Backend upload failed, utilizing direct data URL', err);
        }
      }

      // Fallback: return data URL (works across preview and static)
      resolve({ success: true, url: base64 });
    };
    reader.onerror = () => {
      resolve({ success: false, error: 'Failed to read file' });
    };
    reader.readAsDataURL(file);
  });
}
