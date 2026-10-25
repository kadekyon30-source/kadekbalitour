import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppData, AuthState, Destination, TourPackage } from '../types';
import { INITIAL_DATA } from '../data/initialData';
import { loadAppData, saveAppData, loginAdmin, getStoredAuth, clearStoredAuth } from '../services/dataService';

export type NavPage = 'home' | 'about' | 'destinations' | 'tours' | 'gallery' | 'contact' | 'admin';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface AppContextType {
  data: AppData;
  loading: boolean;
  language: 'en' | 'id';
  setLanguage: (lang: 'en' | 'id') => void;
  activePage: NavPage;
  setActivePage: (page: NavPage) => void;
  selectedTour: TourPackage | null;
  setSelectedTour: (tour: TourPackage | null) => void;
  selectedDestination: Destination | null;
  setSelectedDestination: (dest: Destination | null) => void;
  auth: AuthState;
  login: (u: string, p: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  saveData: (updated: AppData) => Promise<boolean>;
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  dismissToast: (id: string) => void;
  openWhatsApp: (message: string) => void;
  bookingModal: {
    isOpen: boolean;
    tour?: TourPackage | null;
    destination?: Destination | null;
    type?: 'booking' | 'inquiry';
  };
  openBookingModal: (options?: {
    tour?: TourPackage | null;
    destination?: Destination | null;
    type?: 'booking' | 'inquiry';
  }) => void;
  closeBookingModal: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<AppData>(INITIAL_DATA);
  const [loading, setLoading] = useState<boolean>(true);
  const [language, setLanguage] = useState<'en' | 'id'>('en');
  const [activePage, setActivePage] = useState<NavPage>('home');
  const [selectedTour, setSelectedTour] = useState<TourPackage | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [bookingModal, setBookingModal] = useState<{
    isOpen: boolean;
    tour?: TourPackage | null;
    destination?: Destination | null;
    type?: 'booking' | 'inquiry';
  }>({
    isOpen: false,
    tour: null,
    destination: null,
    type: 'booking',
  });

  const openBookingModal = (options?: {
    tour?: TourPackage | null;
    destination?: Destination | null;
    type?: 'booking' | 'inquiry';
  }) => {
    setBookingModal({
      isOpen: true,
      tour: options?.tour || null,
      destination: options?.destination || null,
      type: options?.type || 'booking',
    });
  };

  const closeBookingModal = () => {
    setBookingModal((prev) => ({ ...prev, isOpen: false }));
  };

  const [auth, setAuth] = useState<AuthState>(() => {
    const stored = getStoredAuth();
    return {
      isAuthenticated: !!stored.token,
      username: stored.username,
      token: stored.token,
    };
  });

  // Load data on startup
  useEffect(() => {
    let mounted = true;
    loadAppData()
      .then((loaded) => {
        if (mounted) {
          setData(loaded);
          if (loaded.settings?.defaultLanguage) {
            setLanguage(loaded.settings.defaultLanguage);
          }
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Failed to load app data:', err);
        if (mounted) setLoading(false);
      });

    // Listen to data change events (cross-tab or service-driven)
    const handleDataChange = (e: Event) => {
      const customEvent = e as CustomEvent<AppData>;
      if (customEvent.detail) {
        setData(customEvent.detail);
      }
    };
    window.addEventListener('verlaska_data_changed', handleDataChange);

    return () => {
      mounted = false;
      window.removeEventListener('verlaska_data_changed', handleDataChange);
    };
  }, []);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = 'toast-' + Date.now() + '-' + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleLogin = async (u: string, p: string) => {
    const res = await loginAdmin(u, p);
    if (res.success && res.token) {
      setAuth({
        isAuthenticated: true,
        username: u,
        token: res.token,
      });
      showToast('Welcome back, ' + u + '! Administrator logged in.', 'success');
      return { success: true };
    }
    showToast(res.error || 'Login failed. Please check credentials.', 'error');
    return { success: false, error: res.error };
  };

  const handleLogout = () => {
    clearStoredAuth();
    setAuth({
      isAuthenticated: false,
      username: null,
      token: null,
    });
    showToast('Administrator logged out safely.', 'info');
    if (activePage === 'admin') {
      setActivePage('home');
    }
  };

  const handleSaveData = async (updated: AppData): Promise<boolean> => {
    setData(updated);
    const res = await saveAppData(updated, auth.token || undefined);
    if (res.success) {
      showToast(res.message || 'Changes saved and published successfully!', 'success');
      return true;
    } else {
      showToast('Failed to save changes.', 'error');
      return false;
    }
  };

  const openWhatsApp = (message: string) => {
    const phone = (data.contact?.whatsappNumber || '6285739256845').replace(/[^\d]/g, '');
    const cleanPhone = phone.startsWith('08') ? '62' + phone.slice(1) : phone;
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message.trim())}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <AppContext.Provider
      value={{
        data,
        loading,
        language,
        setLanguage,
        activePage,
        setActivePage,
        selectedTour,
        setSelectedTour,
        selectedDestination,
        setSelectedDestination,
        auth,
        login: handleLogin,
        logout: handleLogout,
        saveData: handleSaveData,
        toasts,
        showToast,
        dismissToast,
        openWhatsApp,
        bookingModal,
        openBookingModal,
        closeBookingModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
