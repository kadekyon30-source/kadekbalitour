import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ToastContainer } from './components/ToastContainer';
import { Hero } from './components/Hero';
import { DestinationsSection } from './components/DestinationsSection';
import { ToursSection } from './components/ToursSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { AboutSection } from './components/AboutSection';
import { GallerySection } from './components/GallerySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { AdminDashboard } from './admin/AdminDashboard';
import { AdminLogin } from './admin/AdminLogin';

const MainApp: React.FC = () => {
  const { data, activePage, auth, loading } = useApp();
  const visibility = data.settings?.sectionVisibility || {
    destinations: true,
    tours: true,
    whyUs: true,
    about: true,
    gallery: true,
    testimonials: true,
    contact: true,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-[#EDE5D8] border-t-[#526B50] rounded-full animate-spin" />
          <span className="font-serif text-sm text-[#252923]/70">Memuat KADEK BALI TOUR...</span>
        </div>
      </div>
    );
  }

  // Admin View
  if (activePage === 'admin') {
    return (
      <main className="min-h-screen bg-[#FAF9F6] text-[#252923]">
        {auth.isAuthenticated ? <AdminDashboard /> : <AdminLogin />}
        <ToastContainer />
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#252923] flex flex-col selection:bg-[#526B50] selection:text-[#FAF9F6]">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Pages */}
      <main className="flex-1">
        {activePage === 'home' && (
          <>
            <Hero />
            {visibility.destinations && <DestinationsSection isHomeView={true} />}
            {visibility.tours && <ToursSection isHomeView={true} />}
            {visibility.whyUs && <WhyChooseUs />}
            {visibility.about && <AboutSection isHomeView={true} />}
            {visibility.gallery && <GallerySection isHomeView={true} />}
            {visibility.testimonials && <TestimonialsSection />}
            {visibility.contact && <ContactSection />}
          </>
        )}

        {activePage === 'destinations' && <DestinationsSection isHomeView={false} />}
        {activePage === 'tours' && <ToursSection isHomeView={false} />}
        {activePage === 'gallery' && <GallerySection isHomeView={false} />}
        {activePage === 'about' && (
          <>
            <AboutSection isHomeView={false} />
            <WhyChooseUs />
            {visibility.testimonials && <TestimonialsSection />}
          </>
        )}
        {activePage === 'contact' && <ContactSection />}
      </main>

      {/* Floating WhatsApp Action */}
      <FloatingWhatsApp />

      {/* Notifications Toast */}
      <ToastContainer />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
