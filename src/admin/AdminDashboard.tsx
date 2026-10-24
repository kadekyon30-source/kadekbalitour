import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Settings,
  MapPin,
  Compass,
  Image as ImageIcon,
  MessageSquare,
  Phone,
  Layout,
  Inbox,
  LogOut,
  Save,
  Plus,
  Trash2,
  Copy,
  Eye,
  Check,
  CheckCircle2,
  AlertCircle,
  Upload,
  Download,
  Key,
  MessageCircle,
  Sparkles,
  Shield,
  Instagram,
  Facebook,
  Youtube,
  Share2,
  ExternalLink,
  Mail,
  Clock,
} from 'lucide-react';
import { Destination, TourPackage, GalleryImage, Testimonial } from '../types';
import { uploadImageFile } from '../services/dataService';
import { BrandLogo } from '../components/BrandLogo';
import { buildSocialUrl, cleanPhoneNumber } from '../utils/bookingUtils';

export const AdminDashboard: React.FC = () => {
  const { data, saveData, logout, setActivePage, showToast, auth } = useApp();

  // Local draft state for modifying
  const [formData, setFormData] = useState(() => JSON.parse(JSON.stringify(data)));
  const [activeTab, setActiveTab] = useState<
    'general' | 'hero' | 'destinations' | 'tours' | 'gallery' | 'testimonials' | 'contact' | 'appearance' | 'inquiries' | 'deployment'
  >('general');

  const [saving, setSaving] = useState(false);

  // Modal / Editing states
  const [editingDest, setEditingDest] = useState<Destination | null>(null);
  const [editingTour, setEditingTour] = useState<TourPackage | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');

  // Save handler
  const handleSave = async () => {
    setSaving(true);
    const success = await saveData(formData);
    setSaving(false);
    if (success) {
      showToast('All changes have been successfully published and saved!', 'success');
    }
  };

  // Image Upload Helper
  const handleFileUpload = async (file: File, callback: (url: string) => void) => {
    showToast('Uploading photo...', 'info');
    const res = await uploadImageFile(file, auth.token || undefined);
    if (res.success && res.url) {
      callback(res.url);
      showToast('Photo uploaded successfully!', 'success');
    } else {
      showToast(res.error || 'Failed to upload photo.', 'error');
    }
  };

  // Destination actions
  const handleSaveDestination = (dest: Destination) => {
    const list = [...(formData.destinations || [])];
    const index = list.findIndex((d) => d.id === dest.id);
    if (index >= 0) {
      list[index] = dest;
    } else {
      list.push(dest);
    }
    setFormData({ ...formData, destinations: list });
    setEditingDest(null);
    showToast('Destination updated in draft. Click "Save & Publish" to commit.', 'info');
  };

  const handleDeleteDestination = (id: string) => {
    if (window.confirm('Are you sure you want to delete this destination?')) {
      const list = (formData.destinations || []).filter((d: Destination) => d.id !== id);
      setFormData({ ...formData, destinations: list });
      showToast('Destination deleted from draft.', 'info');
    }
  };

  // Tour actions
  const handleSaveTour = (tour: TourPackage) => {
    const list = [...(formData.tours || [])];
    const index = list.findIndex((t) => t.id === tour.id);
    if (index >= 0) {
      list[index] = tour;
    } else {
      list.push(tour);
    }
    setFormData({ ...formData, tours: list });
    setEditingTour(null);
    showToast('Tour package updated in draft. Click "Save & Publish" to commit.', 'info');
  };

  const handleDuplicateTour = (tour: TourPackage) => {
    const duplicated: TourPackage = {
      ...tour,
      id: 'tour-' + Date.now(),
      name: `${tour.name} (Copy)`,
    };
    const list = [...(formData.tours || []), duplicated];
    setFormData({ ...formData, tours: list });
    showToast('Tour package duplicated.', 'success');
  };

  const handleDeleteTour = (id: string) => {
    if (window.confirm('Are you sure you want to delete this tour package?')) {
      const list = (formData.tours || []).filter((t: TourPackage) => t.id !== id);
      setFormData({ ...formData, tours: list });
      showToast('Tour package deleted from draft.', 'info');
    }
  };

  // Export / Import JSON Backup
  const handleExportJson = () => {
    const jsonStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(formData, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', jsonStr);
    dlAnchor.setAttribute('download', `verlaska_travel_backup_${new Date().toISOString().slice(0, 10)}.json`);
    dlAnchor.click();
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        setFormData(parsed);
        showToast('Backup data imported into draft! Click "Save & Publish" to apply.', 'success');
      } catch (err) {
        showToast('Invalid JSON file format.', 'error');
      }
    };
    reader.readAsText(file);
  };

  // Change Admin Password
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      showToast('New password must be at least 6 characters.', 'error');
      return;
    }

    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        showToast('Password changed successfully!', 'success');
        setCurrentPassword('');
        setNewPassword('');
      } else {
        showToast(json.error || 'Failed to change password.', 'error');
      }
    } catch {
      showToast('Error communicating with authentication service.', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-24">
      {/* Admin Top Bar */}
      <div className="sticky top-0 z-30 bg-white border-b border-[#EDE5D8] px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <BrandLogo size="sm" subtitle="TOUR BALI · DASHBOARD" />
          <span className="hidden sm:inline-flex text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
            Portal Pemilik & Pengelola
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Live Preview Button */}
          <button
            onClick={() => {
              setActivePage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold border border-[#EDE5D8] text-[#252923] hover:bg-[#FAF9F6] transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#1E6FD9]" />
            <span>Lihat Website Publik</span>
          </button>

          {/* Save & Publish */}
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-xs sm:text-sm font-semibold bg-[#15803D] text-[#FAF9F6] hover:bg-[#166534] transition-all shadow cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Menyimpan...' : 'Simpan & Publikasikan'}</span>
          </button>

          {/* Logout */}
          <button
            onClick={logout}
            className="p-2 rounded-full text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
            title="Keluar / Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {/* Mobile & Tablet Quick Tab Selector */}
        <div className="block lg:hidden mb-4">
          <label htmlFor="admin-mobile-tab-select" className="text-xs font-semibold text-[#252923]/70 mb-1.5 flex items-center justify-between">
            <span>Pilih Menu Pengelolaan Admin:</span>
            <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">10 Menu Tersedia</span>
          </label>
          <div className="relative">
            <select
              id="admin-mobile-tab-select"
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value as any)}
              className="w-full px-4 py-3 rounded-2xl bg-white border-2 border-[#15803D]/40 font-bold text-xs sm:text-sm text-[#252923] shadow-xs focus:outline-none focus:border-[#15803D] cursor-pointer"
            >
              <option value="inquiries">📥 Pesan Masuk ({(formData.inquiries || []).length})</option>
              <option value="contact">📞 WhatsApp & Kontak (Ubah Nomor WA, Email, Medsos)</option>
              <option value="tours">🧭 Paket Tur Bali</option>
              <option value="destinations">📍 Destinasi Bali</option>
              <option value="gallery">🖼️ Galeri Foto</option>
              <option value="testimonials">💬 Ulasan Tamu</option>
              <option value="general">⚙️ Pengaturan Umum</option>
              <option value="hero">🌅 Beranda & Hero</option>
              <option value="appearance">🎨 Tampilan Bagian</option>
              <option value="deployment">🔑 Backup & Password</option>
            </select>
          </div>
        </div>

        {/* Navigation Tabs (Horizontal Scroll with Clean Badges) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-8 border-b border-[#EDE5D8] text-xs sm:text-sm font-medium scrollbar-thin">
          {[
            { id: 'inquiries', label: `Pesan Masuk (${(formData.inquiries || []).length})`, icon: Inbox },
            { id: 'contact', label: 'WhatsApp & Kontak', icon: Phone, highlight: true },
            { id: 'tours', label: 'Paket Tur', icon: Compass },
            { id: 'destinations', label: 'Destinasi Bali', icon: MapPin },
            { id: 'gallery', label: 'Galeri Foto', icon: ImageIcon },
            { id: 'testimonials', label: 'Ulasan Tamu', icon: MessageSquare },
            { id: 'general', label: 'Pengaturan Umum', icon: Settings },
            { id: 'hero', label: 'Beranda & Hero', icon: Layout },
            { id: 'appearance', label: 'Tampilan Bagian', icon: Layout },
            { id: 'deployment', label: 'Backup & Password', icon: Key },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl whitespace-nowrap transition-all cursor-pointer min-h-[40px] ${
                  isActive
                    ? 'bg-[#15803D] text-[#FAF9F6] font-bold shadow-xs'
                    : tab.highlight
                    ? 'text-emerald-800 bg-emerald-50 hover:bg-emerald-100 font-semibold border border-emerald-200'
                    : 'text-[#252923]/75 hover:bg-[#EDE5D8]/50 hover:text-[#252923]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : tab.highlight ? 'text-emerald-700' : ''}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: General Settings */}
        {activeTab === 'general' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE5D8] max-w-3xl space-y-6">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#252923] mb-1">General Settings</h2>
              <p className="text-xs text-[#252923]/60 font-light">
                Manage your agency brand name, description, and primary business identity.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#252923] mb-1">
                  Website / Agency Name
                </label>
                <input
                  type="text"
                  value={formData.settings?.siteName || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      settings: { ...formData.settings, siteName: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-[#FAF9F6] border border-[#EDE5D8] focus:border-[#526B50]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#252923] mb-1">
                  Tagline / Catchphrase
                </label>
                <input
                  type="text"
                  value={formData.settings?.tagline || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      settings: { ...formData.settings, tagline: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-[#FAF9F6] border border-[#EDE5D8] focus:border-[#526B50]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#252923] mb-1">
                  Website Description (for Google and Social Shares)
                </label>
                <textarea
                  rows={3}
                  value={formData.settings?.description || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      settings: { ...formData.settings, description: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-[#FAF9F6] border border-[#EDE5D8] focus:border-[#526B50]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#252923] mb-1">
                  Footer Copyright Text
                </label>
                <input
                  type="text"
                  value={formData.settings?.footerText || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      settings: { ...formData.settings, footerText: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-[#FAF9F6] border border-[#EDE5D8] focus:border-[#526B50]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Home & Hero Settings */}
        {activeTab === 'hero' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE5D8] max-w-3xl space-y-6">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#252923] mb-1">Home Page & Hero Banner</h2>
              <p className="text-xs text-[#252923]/60 font-light">
                Customize the main headline, description, hero photo, and button text shown to first-time visitors.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#252923] mb-1">
                  Hero Main Heading
                </label>
                <input
                  type="text"
                  value={formData.settings?.heroHeading || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      settings: { ...formData.settings, heroHeading: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-[#FAF9F6] border border-[#EDE5D8] focus:border-[#526B50]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#252923] mb-1">
                  Hero Supporting Subtext
                </label>
                <textarea
                  rows={3}
                  value={formData.settings?.heroSubheading || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      settings: { ...formData.settings, heroSubheading: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-[#FAF9F6] border border-[#EDE5D8] focus:border-[#526B50]"
                />
              </div>

              {/* Hero Image */}
              <div>
                <label className="block text-xs font-medium text-[#252923] mb-1">
                  Hero Photograph URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.settings?.heroImageUrl || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        settings: { ...formData.settings, heroImageUrl: e.target.value },
                      })
                    }
                    className="flex-1 px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-[#FAF9F6] border border-[#EDE5D8] focus:border-[#526B50]"
                  />
                  <label className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-medium bg-[#EDE5D8] text-[#252923] hover:bg-[#e2d8c7] cursor-pointer shrink-0">
                    <Upload className="w-4 h-4 text-[#526B50]" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleFileUpload(file, (url) => {
                            setFormData({
                              ...formData,
                              settings: { ...formData.settings, heroImageUrl: url },
                            });
                          });
                        }
                      }}
                    />
                  </label>
                </div>
                {formData.settings?.heroImageUrl && (
                  <div className="mt-2 w-32 h-20 rounded-lg overflow-hidden border border-[#EDE5D8]">
                    <img
                      src={formData.settings.heroImageUrl}
                      alt="Hero preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#252923] mb-1">
                    Primary Button Label
                  </label>
                  <input
                    type="text"
                    value={formData.settings?.primaryButtonText || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        settings: { ...formData.settings, primaryButtonText: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-[#FAF9F6] border border-[#EDE5D8] focus:border-[#526B50]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#252923] mb-1">
                    Secondary Button Label
                  </label>
                  <input
                    type="text"
                    value={formData.settings?.secondaryButtonText || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        settings: { ...formData.settings, secondaryButtonText: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-[#FAF9F6] border border-[#EDE5D8] focus:border-[#526B50]"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Destination Management */}
        {activeTab === 'destinations' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-xl font-bold text-[#252923]">Bali Destinations</h2>
                <p className="text-xs text-[#252923]/60 font-light">
                  Add, edit, upload photos, or publish/hide destinations.
                </p>
              </div>

              <button
                onClick={() =>
                  setEditingDest({
                    id: 'dest-' + Date.now(),
                    name: 'New Bali Destination',
                    shortDescription: 'Describe this beautiful destination in Bali.',
                    fullDescription: 'Comprehensive overview of attractions, best times to visit, and local highlights.',
                    location: 'Bali, Indonesia',
                    imageUrl: '/src/assets/images/dest_ubud_rice_terraces_1792641959867.jpg',
                    published: true,
                    featured: false,
                    highlights: ['Scenic Views', 'Photo Spots'],
                  })
                }
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-[#526B50] text-[#FAF9F6] hover:bg-[#435741] transition-colors cursor-pointer self-start"
              >
                <Plus className="w-4 h-4" />
                <span>Add Destination</span>
              </button>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(formData.destinations || []).map((dest: Destination) => (
                <div
                  key={dest.id}
                  className="bg-white rounded-2xl p-5 border border-[#EDE5D8] flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-video rounded-xl overflow-hidden mb-3 bg-[#EDE5D8]">
                      <img src={dest.imageUrl} alt={dest.name} className="w-full h-full object-cover" />
                      {!dest.published && (
                        <span className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-semibold bg-rose-600 text-white">
                          Hidden
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-[#526B50] font-medium mb-1">
                      <MapPin className="w-3 h-3" />
                      <span>{dest.location}</span>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-[#252923] mb-1">{dest.name}</h3>
                    <p className="text-xs text-[#252923]/70 font-light line-clamp-2">{dest.shortDescription}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#EDE5D8] flex items-center justify-between">
                    <button
                      onClick={() => setEditingDest({ ...dest })}
                      className="text-xs font-semibold text-[#526B50] hover:underline cursor-pointer"
                    >
                      Edit Details
                    </button>
                    <button
                      onClick={() => handleDeleteDestination(dest.id)}
                      className="p-1 text-stone-400 hover:text-rose-600 transition-colors"
                      title="Delete Destination"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Destination Edit Modal */}
            {editingDest && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#252923]/60 backdrop-blur-sm">
                <div className="bg-white w-full max-w-xl rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-4">
                  <h3 className="font-serif text-xl font-bold text-[#252923]">
                    {editingDest.id.startsWith('dest-') ? 'Edit Destination' : 'Add Destination'}
                  </h3>

                  <div>
                    <label className="block text-xs font-medium text-[#252923] mb-1">Destination Name</label>
                    <input
                      type="text"
                      value={editingDest.name}
                      onChange={(e) => setEditingDest({ ...editingDest, name: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-[#FAF9F6] border border-[#EDE5D8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#252923] mb-1">Location / Regency</label>
                    <input
                      type="text"
                      value={editingDest.location}
                      onChange={(e) => setEditingDest({ ...editingDest, location: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-[#FAF9F6] border border-[#EDE5D8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#252923] mb-1">Photograph URL</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={editingDest.imageUrl}
                        onChange={(e) => setEditingDest({ ...editingDest, imageUrl: e.target.value })}
                        className="flex-1 px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-[#FAF9F6] border border-[#EDE5D8]"
                      />
                      <label className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-medium bg-[#EDE5D8] cursor-pointer">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleFileUpload(file, (url) => setEditingDest({ ...editingDest, imageUrl: url }));
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#252923] mb-1">Short Description (for card)</label>
                    <textarea
                      rows={2}
                      value={editingDest.shortDescription}
                      onChange={(e) => setEditingDest({ ...editingDest, shortDescription: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-[#FAF9F6] border border-[#EDE5D8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#252923] mb-1">Full Description (for modal popup)</label>
                    <textarea
                      rows={4}
                      value={editingDest.fullDescription}
                      onChange={(e) => setEditingDest({ ...editingDest, fullDescription: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-[#FAF9F6] border border-[#EDE5D8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#252923] mb-1">
                      Key Highlights (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={(editingDest.highlights || []).join(', ')}
                      onChange={(e) =>
                        setEditingDest({
                          ...editingDest,
                          highlights: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-[#FAF9F6] border border-[#EDE5D8]"
                    />
                  </div>

                  <div className="flex items-center gap-6 pt-2">
                    <label className="flex items-center gap-2 text-xs font-medium text-[#252923] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editingDest.published}
                        onChange={(e) => setEditingDest({ ...editingDest, published: e.target.checked })}
                      />
                      <span>Published on Website</span>
                    </label>

                    <label className="flex items-center gap-2 text-xs font-medium text-[#252923] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editingDest.featured}
                        onChange={(e) => setEditingDest({ ...editingDest, featured: e.target.checked })}
                      />
                      <span>Feature on Home Page</span>
                    </label>
                  </div>

                  <div className="pt-4 border-t border-[#EDE5D8] flex justify-end gap-2">
                    <button
                      onClick={() => setEditingDest(null)}
                      className="px-4 py-2 rounded-full text-xs font-medium border border-[#EDE5D8]"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSaveDestination(editingDest)}
                      className="px-5 py-2 rounded-full text-xs font-semibold bg-[#526B50] text-[#FAF9F6]"
                    >
                      Apply Destination
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Tour Packages Management */}
        {activeTab === 'tours' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-xl font-bold text-[#252923]">Tour Packages & Transport</h2>
                <p className="text-xs text-[#252923]/60 font-light">
                  Add, customize prices, itineraries, duplicate packages, and manage WhatsApp booking settings.
                </p>
              </div>

              <button
                onClick={() =>
                  setEditingTour({
                    id: 'tour-' + Date.now(),
                    name: 'New Bali Private Tour',
                    description: 'A relaxed private day tour exploring beautiful spots in Bali at your own pace.',
                    mainImage: '/src/assets/images/dest_bali_waterfall_1792641960976.jpg',
                    duration: 'Full Day (8-10 Hours)',
                    destinationsIncluded: ['Ubud', 'Rice Terraces'],
                    itinerary: [
                      { time: '08:30 AM', title: 'Hotel Pickup', description: 'Meet private chauffeur at hotel.' },
                      { time: '10:00 AM', title: 'First Destination', description: 'Scenic morning walk and sightseeing.' },
                    ],
                    priceType: 'starting',
                    price: 600000,
                    currency: 'IDR',
                    includedServices: ['Private air-conditioned car & fuel', 'English speaking driver', 'Mineral water'],
                    excludedServices: ['Entrance tickets', 'Meals & shopping'],
                    meetingPoint: 'Lobby pickup in South & Central Bali',
                    availableDates: 'Daily upon request',
                    bookingStatus: 'available',
                    featured: false,
                    published: true,
                  })
                }
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-[#526B50] text-[#FAF9F6] hover:bg-[#435741] transition-colors cursor-pointer self-start"
              >
                <Plus className="w-4 h-4" />
                <span>Add Tour Package</span>
              </button>
            </div>

            {/* Tours list */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(formData.tours || []).map((tour: TourPackage) => (
                <div
                  key={tour.id}
                  className="bg-white rounded-2xl p-5 border border-[#EDE5D8] flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-3 bg-[#EDE5D8]">
                      <img src={tour.mainImage} alt={tour.name} className="w-full h-full object-cover" />
                      {!tour.published && (
                        <span className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-semibold bg-rose-600 text-white">
                          Hidden
                        </span>
                      )}
                      {tour.featured && (
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-semibold bg-[#526B50] text-white">
                          Featured
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-xs text-[#526B50] font-semibold mb-1">
                      <span>{tour.duration}</span>
                      <span>
                        {tour.priceType === 'contact'
                          ? 'Contact Us for Price'
                          : `${tour.priceType === 'starting' ? 'From ' : ''}${tour.currency} ${tour.price.toLocaleString()}`}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-[#252923] mb-1">{tour.name}</h3>
                    <p className="text-xs text-[#252923]/70 font-light line-clamp-2">{tour.description}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#EDE5D8] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setEditingTour({ ...tour })}
                        className="text-xs font-semibold text-[#526B50] hover:underline cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDuplicateTour(tour)}
                        className="text-xs font-medium text-stone-500 hover:text-[#526B50] inline-flex items-center gap-1 cursor-pointer"
                        title="Duplicate this package"
                      >
                        <Copy className="w-3 h-3" />
                        <span>Duplicate</span>
                      </button>
                    </div>

                    <button
                      onClick={() => handleDeleteTour(tour.id)}
                      className="p-1 text-stone-400 hover:text-rose-600 transition-colors"
                      title="Delete Tour"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Tour Edit Modal */}
            {editingTour && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#252923]/60 backdrop-blur-sm">
                <div className="bg-white w-full max-w-2xl rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-4">
                  <h3 className="font-serif text-xl font-bold text-[#252923]">
                    {editingTour.id.startsWith('tour-') ? 'Edit Tour Package' : 'Add Tour Package'}
                  </h3>

                  <div>
                    <label className="block text-xs font-medium text-[#252923] mb-1">Package Name</label>
                    <input
                      type="text"
                      value={editingTour.name}
                      onChange={(e) => setEditingTour({ ...editingTour, name: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-[#FAF9F6] border border-[#EDE5D8]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#252923] mb-1">Tour Duration</label>
                      <input
                        type="text"
                        value={editingTour.duration}
                        onChange={(e) => setEditingTour({ ...editingTour, duration: e.target.value })}
                        placeholder="e.g. Full Day (8-10 Hours)"
                        className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-[#FAF9F6] border border-[#EDE5D8]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#252923] mb-1">Meeting & Pickup Point</label>
                      <input
                        type="text"
                        value={editingTour.meetingPoint}
                        onChange={(e) => setEditingTour({ ...editingTour, meetingPoint: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-[#FAF9F6] border border-[#EDE5D8]"
                      />
                    </div>
                  </div>

                  {/* Pricing configuration */}
                  <div className="p-4 rounded-xl bg-[#EDE5D8]/30 border border-[#EDE5D8] space-y-3">
                    <span className="text-xs font-semibold text-[#526B50] block">Pricing Configuration</span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-[#252923] mb-1">Price Display Type</label>
                        <select
                          value={editingTour.priceType}
                          onChange={(e) => setEditingTour({ ...editingTour, priceType: e.target.value as any })}
                          className="w-full px-3 py-2 rounded-xl text-xs bg-white border border-[#EDE5D8]"
                        >
                          <option value="starting">Starting Price ("From...")</option>
                          <option value="fixed">Fixed Price</option>
                          <option value="contact">Contact Us for Price</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-[#252923] mb-1">Amount</label>
                        <input
                          type="number"
                          disabled={editingTour.priceType === 'contact'}
                          value={editingTour.price}
                          onChange={(e) => setEditingTour({ ...editingTour, price: parseInt(e.target.value, 10) || 0 })}
                          className="w-full px-3 py-2 rounded-xl text-xs bg-white border border-[#EDE5D8] disabled:opacity-50"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-[#252923] mb-1">Currency</label>
                        <select
                          value={editingTour.currency}
                          onChange={(e) => setEditingTour({ ...editingTour, currency: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl text-xs bg-white border border-[#EDE5D8]"
                        >
                          <option value="IDR">IDR (Indonesian Rupiah)</option>
                          <option value="USD">USD (US Dollar)</option>
                          <option value="AUD">AUD (Australian Dollar)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#252923] mb-1">Main Photograph URL</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={editingTour.mainImage}
                        onChange={(e) => setEditingTour({ ...editingTour, mainImage: e.target.value })}
                        className="flex-1 px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-[#FAF9F6] border border-[#EDE5D8]"
                      />
                      <label className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-medium bg-[#EDE5D8] cursor-pointer">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleFileUpload(file, (url) => setEditingTour({ ...editingTour, mainImage: url }));
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#252923] mb-1">Package Description</label>
                    <textarea
                      rows={3}
                      value={editingTour.description}
                      onChange={(e) => setEditingTour({ ...editingTour, description: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-[#FAF9F6] border border-[#EDE5D8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#252923] mb-1">
                      Destinations Included (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={(editingTour.destinationsIncluded || []).join(', ')}
                      onChange={(e) =>
                        setEditingTour({
                          ...editingTour,
                          destinationsIncluded: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-[#FAF9F6] border border-[#EDE5D8]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#252923] mb-1">
                        Included Services (one per line)
                      </label>
                      <textarea
                        rows={3}
                        value={(editingTour.includedServices || []).join('\n')}
                        onChange={(e) =>
                          setEditingTour({
                            ...editingTour,
                            includedServices: e.target.value.split('\n').filter((s) => s.trim().length > 0),
                          })
                        }
                        className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-[#FAF9F6] border border-[#EDE5D8]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#252923] mb-1">
                        Excluded Services (one per line)
                      </label>
                      <textarea
                        rows={3}
                        value={(editingTour.excludedServices || []).join('\n')}
                        onChange={(e) =>
                          setEditingTour({
                            ...editingTour,
                            excludedServices: e.target.value.split('\n').filter((s) => s.trim().length > 0),
                          })
                        }
                        className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-[#FAF9F6] border border-[#EDE5D8]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-6 pt-2">
                    <label className="flex items-center gap-2 text-xs font-medium text-[#252923] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editingTour.published}
                        onChange={(e) => setEditingTour({ ...editingTour, published: e.target.checked })}
                      />
                      <span>Published</span>
                    </label>

                    <label className="flex items-center gap-2 text-xs font-medium text-[#252923] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editingTour.featured}
                        onChange={(e) => setEditingTour({ ...editingTour, featured: e.target.checked })}
                      />
                      <span>Featured Tour</span>
                    </label>
                  </div>

                  <div className="pt-4 border-t border-[#EDE5D8] flex justify-end gap-2">
                    <button
                      onClick={() => setEditingTour(null)}
                      className="px-4 py-2 rounded-full text-xs font-medium border border-[#EDE5D8]"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleSaveTour(editingTour)}
                      className="px-5 py-2 rounded-full text-xs font-semibold bg-[#526B50] text-[#FAF9F6]"
                    >
                      Apply Package
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 5: Gallery Management */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-xl font-bold text-[#252923]">Photo Gallery Management</h2>
                <p className="text-xs text-[#252923]/60 font-light">
                  Upload images, change captions, categorize, and toggle homepage display.
                </p>
              </div>

              <label className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-[#526B50] text-[#FAF9F6] hover:bg-[#435741] transition-colors cursor-pointer self-start">
                <Upload className="w-4 h-4" />
                <span>Upload New Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleFileUpload(file, (url) => {
                        const newImg: GalleryImage = {
                          id: 'gal-' + Date.now(),
                          url,
                          caption: file.name.replace(/\.[^/.]+$/, '').replace(/_/g, ' '),
                          category: 'Nature',
                          showOnHome: true,
                          order: (formData.gallery || []).length + 1,
                        };
                        setFormData({
                          ...formData,
                          gallery: [...(formData.gallery || []), newImg],
                        });
                        showToast('New photo added to gallery.', 'success');
                      });
                    }
                  }}
                />
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(formData.gallery || []).map((img: GalleryImage, idx: number) => (
                <div key={img.id} className="bg-white rounded-2xl p-4 border border-[#EDE5D8] space-y-3">
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#EDE5D8]">
                    <img src={img.url} alt={img.caption} className="w-full h-full object-cover" />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-stone-500 mb-0.5">Caption</label>
                    <input
                      type="text"
                      value={img.caption}
                      onChange={(e) => {
                        const list = [...formData.gallery];
                        list[idx].caption = e.target.value;
                        setFormData({ ...formData, gallery: list });
                      }}
                      className="w-full px-3 py-1.5 rounded-lg text-xs bg-[#FAF9F6] border border-[#EDE5D8]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-medium text-stone-500 mb-0.5">Category</label>
                      <input
                        type="text"
                        value={img.category}
                        onChange={(e) => {
                          const list = [...formData.gallery];
                          list[idx].category = e.target.value;
                          setFormData({ ...formData, gallery: list });
                        }}
                        className="w-full px-3 py-1.5 rounded-lg text-xs bg-[#FAF9F6] border border-[#EDE5D8]"
                      />
                    </div>

                    <div className="flex items-center pt-4">
                      <label className="flex items-center gap-1.5 text-xs text-[#252923] cursor-pointer">
                        <input
                          type="checkbox"
                          checked={img.showOnHome}
                          onChange={(e) => {
                            const list = [...formData.gallery];
                            list[idx].showOnHome = e.target.checked;
                            setFormData({ ...formData, gallery: list });
                          }}
                        />
                        <span>Show on Home</span>
                      </label>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#EDE5D8] flex justify-end">
                    <button
                      onClick={() => {
                        const list = formData.gallery.filter((g: any) => g.id !== img.id);
                        setFormData({ ...formData, gallery: list });
                      }}
                      className="p-1 text-stone-400 hover:text-rose-600 transition-colors"
                      title="Remove Photo"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 6: Reviews / Testimonials */}
        {activeTab === 'testimonials' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-xl font-bold text-[#252923]">Customer Reviews</h2>
                <p className="text-xs text-[#252923]/60 font-light">
                  Add genuine traveler reviews, edit existing quotes, or toggle publication.
                </p>
              </div>

              <button
                onClick={() =>
                  setEditingTestimonial({
                    id: 'test-' + Date.now(),
                    name: 'Guest Traveler',
                    roleOrOrigin: 'Traveler from Sydney, Australia',
                    reviewText: 'Wonderful experience with VERLASKA TRAVEL in Bali.',
                    rating: 5,
                    published: true,
                    isSample: false,
                  })
                }
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-[#526B50] text-[#FAF9F6] hover:bg-[#435741] transition-colors cursor-pointer self-start"
              >
                <Plus className="w-4 h-4" />
                <span>Add Customer Review</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(formData.testimonials || []).map((t: Testimonial) => (
                <div key={t.id} className="bg-white rounded-2xl p-5 border border-[#EDE5D8] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-serif font-bold text-sm text-[#252923]">{t.name}</span>
                      <span className="text-xs text-[#C6A66B]">{'★'.repeat(t.rating || 5)}</span>
                    </div>
                    <span className="text-xs text-stone-400 block mb-3">{t.roleOrOrigin}</span>
                    <p className="text-xs text-[#252923]/80 italic">"{t.reviewText}"</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#EDE5D8] flex items-center justify-between">
                    <button
                      onClick={() => setEditingTestimonial({ ...t })}
                      className="text-xs font-semibold text-[#526B50] hover:underline cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        const list = formData.testimonials.filter((item: any) => item.id !== t.id);
                        setFormData({ ...formData, testimonials: list });
                      }}
                      className="p-1 text-stone-400 hover:text-rose-600 transition-colors"
                      title="Delete Review"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Testimonial Edit Modal */}
            {editingTestimonial && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#252923]/60 backdrop-blur-sm">
                <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 space-y-4">
                  <h3 className="font-serif text-xl font-bold text-[#252923]">
                    {editingTestimonial.id.startsWith('test-') ? 'Edit Review' : 'Add Review'}
                  </h3>

                  <div>
                    <label className="block text-xs font-medium text-[#252923] mb-1">Customer Name</label>
                    <input
                      type="text"
                      value={editingTestimonial.name}
                      onChange={(e) => setEditingTestimonial({ ...editingTestimonial, name: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-[#FAF9F6] border border-[#EDE5D8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#252923] mb-1">Origin / Title (e.g. Couple from Melbourne)</label>
                    <input
                      type="text"
                      value={editingTestimonial.roleOrOrigin}
                      onChange={(e) => setEditingTestimonial({ ...editingTestimonial, roleOrOrigin: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-[#FAF9F6] border border-[#EDE5D8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#252923] mb-1">Review Text</label>
                    <textarea
                      rows={4}
                      value={editingTestimonial.reviewText}
                      onChange={(e) => setEditingTestimonial({ ...editingTestimonial, reviewText: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-[#FAF9F6] border border-[#EDE5D8]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#252923] mb-1">Rating (1 to 5)</label>
                      <input
                        type="number"
                        min="1"
                        max="5"
                        value={editingTestimonial.rating}
                        onChange={(e) => setEditingTestimonial({ ...editingTestimonial, rating: parseInt(e.target.value, 10) || 5 })}
                        className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-[#FAF9F6] border border-[#EDE5D8]"
                      />
                    </div>

                    <div className="flex items-center pt-4">
                      <label className="flex items-center gap-2 text-xs font-medium text-[#252923] cursor-pointer">
                        <input
                          type="checkbox"
                          checked={editingTestimonial.published}
                          onChange={(e) => setEditingTestimonial({ ...editingTestimonial, published: e.target.checked })}
                        />
                        <span>Published</span>
                      </label>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#EDE5D8] flex justify-end gap-2">
                    <button
                      onClick={() => setEditingTestimonial(null)}
                      className="px-4 py-2 rounded-full text-xs font-medium border border-[#EDE5D8]"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        const list = [...(formData.testimonials || [])];
                        const idx = list.findIndex((x) => x.id === editingTestimonial.id);
                        if (idx >= 0) list[idx] = editingTestimonial;
                        else list.push(editingTestimonial);
                        setFormData({ ...formData, testimonials: list });
                        setEditingTestimonial(null);
                        showToast('Review updated in draft.', 'info');
                      }}
                      className="px-5 py-2 rounded-full text-xs font-semibold bg-[#526B50] text-[#FAF9F6]"
                    >
                      Apply Review
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 6: Contact Settings & WhatsApp */}
        {activeTab === 'contact' && (
          <div className="space-y-6 max-w-4xl">
            {/* Header Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE5D8] shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EDE5D8]">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                      <Phone className="w-5 h-5 text-emerald-700" />
                    </span>
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#252923]">
                      Pengaturan WhatsApp, Email & Media Sosial
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-[#252923]/65 font-light">
                    Anda dapat mengubah nomor WhatsApp, alamat email, dan akun media sosial kapan saja. Perubahan yang Anda simpan akan langsung aktif seketika di seluruh halaman website.
                  </p>
                </div>

                {/* In-tab Save Button */}
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold bg-[#15803D] text-white hover:bg-[#166534] transition-all shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{saving ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
                </button>
              </div>

              <div className="pt-6 space-y-6">
                {/* 1. WHATSAPP CONFIGURATION (HIGHLIGHT) */}
                <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-emerald-50 via-emerald-50/50 to-white border-2 border-emerald-500/40 shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs sm:text-sm font-bold text-emerald-950 flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 text-emerald-600" />
                      <span>Nomor WhatsApp Resmi KADEK BALI</span>
                    </label>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-600 text-white shadow-xs">
                      Aktif di Seluruh Website
                    </span>
                  </div>

                  <p className="text-xs text-emerald-900/80 mb-3 font-light">
                    Semua tombol pemesanan paket tur, tombol floating di pojok layar, formulir reservasi, dan header publik akan terhubung ke nomor ini.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        placeholder="+6285739256845 atau 085739256845"
                        value={formData.contact?.whatsappNumber || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            contact: { ...formData.contact, whatsappNumber: e.target.value },
                          })
                        }
                        className="w-full px-4 py-3 rounded-xl text-sm font-bold bg-white border border-emerald-300 text-emerald-950 placeholder-stone-400 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
                      />
                    </div>

                    <a
                      href={`https://wa.me/${cleanPhoneNumber(formData.contact?.whatsappNumber || '6285739256845')}?text=Halo%20KADEK%20BALI%20TOUR`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold bg-emerald-700 text-white hover:bg-emerald-800 transition-colors shadow-xs cursor-pointer shrink-0"
                      title="Uji coba chat langsung dengan nomor yang dimasukkan"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Tes Hubungi WhatsApp</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                    </a>
                  </div>

                  <div className="mt-2.5 flex items-center gap-2 text-[11px] text-emerald-800 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Format tersimpan: <strong>{formData.contact?.whatsappNumber || '+6285739256845'}</strong> (Otomatis ditransformasikan ke format internasional wa.me)</span>
                  </div>
                </div>

                {/* 2. EMAIL RESMI */}
                <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#EDE5D8]">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs sm:text-sm font-bold text-[#252923] flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#1E6FD9]" />
                      <span>Alamat Email Resmi</span>
                    </label>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <input
                      type="email"
                      placeholder="contoh: info@kadekbali.com atau kadekbalitour@gmail.com"
                      value={formData.contact?.email || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          contact: { ...formData.contact, email: e.target.value },
                        })
                      }
                      className="flex-1 px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-white border border-[#EDE5D8] focus:outline-none focus:border-[#15803D]"
                    />
                    {formData.contact?.email && (
                      <a
                        href={`mailto:${formData.contact.email}`}
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-white border border-[#EDE5D8] text-[#252923] hover:bg-stone-50 transition-colors shrink-0"
                      >
                        <Mail className="w-3.5 h-3.5 text-[#1E6FD9]" />
                        <span>Tes Buka Email</span>
                      </a>
                    )}
                  </div>
                  <span className="text-[11px] text-[#252923]/60 mt-1.5 block">
                    Alamat email ini ditampilkan di bagian kontak dan footer publik untuk reservasi wisatawan internasional.
                  </span>
                </div>

                {/* 3. MEDIA SOSIAL RESMI (BISA DIUBAH SEWAKTU-WAKTU) */}
                <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#EDE5D8] space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-[#252923] flex items-center gap-2">
                        <Share2 className="w-4 h-4 text-emerald-700" />
                        <span>Akun Media Sosial KADEK BALI</span>
                      </h3>
                      <p className="text-xs text-[#252923]/60 font-light mt-0.5">
                        Masukkan username (misal @kadekbalitour) atau link lengkap profil Anda.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Instagram */}
                    <div className="bg-white p-4 rounded-xl border border-[#EDE5D8]">
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-bold text-[#252923] flex items-center gap-1.5">
                          <Instagram className="w-4 h-4 text-[#E1306C]" />
                          <span>Instagram</span>
                        </label>
                        {formData.contact?.instagram && (
                          <a
                            href={buildSocialUrl('instagram', formData.contact.instagram)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] text-[#E1306C] hover:underline flex items-center gap-0.5"
                          >
                            <span>Tes Link</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </div>
                      <input
                        type="text"
                        placeholder="@kadekbalitour"
                        value={formData.contact?.instagram || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            contact: { ...formData.contact, instagram: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg text-xs bg-[#FAF9F6] border border-[#EDE5D8] focus:border-[#E1306C]"
                      />
                    </div>

                    {/* Facebook */}
                    <div className="bg-white p-4 rounded-xl border border-[#EDE5D8]">
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-bold text-[#252923] flex items-center gap-1.5">
                          <Facebook className="w-4 h-4 text-[#1877F2]" />
                          <span>Facebook</span>
                        </label>
                        {formData.contact?.facebook && (
                          <a
                            href={buildSocialUrl('facebook', formData.contact.facebook)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] text-[#1877F2] hover:underline flex items-center gap-0.5"
                          >
                            <span>Tes Link</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </div>
                      <input
                        type="text"
                        placeholder="Kadek Bali Tour"
                        value={formData.contact?.facebook || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            contact: { ...formData.contact, facebook: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg text-xs bg-[#FAF9F6] border border-[#EDE5D8] focus:border-[#1877F2]"
                      />
                    </div>

                    {/* TikTok */}
                    <div className="bg-white p-4 rounded-xl border border-[#EDE5D8]">
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-bold text-[#252923] flex items-center gap-1.5">
                          <Share2 className="w-4 h-4 text-black" />
                          <span>TikTok</span>
                        </label>
                        {formData.contact?.tiktok && (
                          <a
                            href={buildSocialUrl('tiktok', formData.contact.tiktok)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] text-stone-800 hover:underline flex items-center gap-0.5"
                          >
                            <span>Tes Link</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </div>
                      <input
                        type="text"
                        placeholder="@kadekbalitour"
                        value={formData.contact?.tiktok || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            contact: { ...formData.contact, tiktok: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg text-xs bg-[#FAF9F6] border border-[#EDE5D8] focus:border-stone-800"
                      />
                    </div>

                    {/* YouTube */}
                    <div className="bg-white p-4 rounded-xl border border-[#EDE5D8]">
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-bold text-[#252923] flex items-center gap-1.5">
                          <Youtube className="w-4 h-4 text-[#FF0000]" />
                          <span>YouTube</span>
                        </label>
                        {formData.contact?.youtube && (
                          <a
                            href={buildSocialUrl('youtube', formData.contact.youtube)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] text-[#FF0000] hover:underline flex items-center gap-0.5"
                          >
                            <span>Tes Link</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </div>
                      <input
                        type="text"
                        placeholder="@kadekbalitour atau Kadek Bali Tour"
                        value={formData.contact?.youtube || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            contact: { ...formData.contact, youtube: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg text-xs bg-[#FAF9F6] border border-[#EDE5D8] focus:border-[#FF0000]"
                      />
                    </div>
                  </div>
                </div>

                {/* 4. JAM LAYANAN & CATATAN LAYANAN ANTAR-JEMPUT */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#EDE5D8]">
                    <label className="block text-xs font-bold text-[#252923] mb-1.5 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-[#C6A66B]" />
                      <span>Jam Layanan / Operasional</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Senin – Minggu: 07:00 – 22:00 WITA"
                      value={formData.contact?.operatingHours || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          contact: { ...formData.contact, operatingHours: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-white border border-[#EDE5D8] focus:border-[#15803D]"
                    />
                    <span className="text-[11px] text-[#252923]/60 mt-1 block">
                      Waktu aktif layanan customer service & pengemudi privat.
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-bold text-amber-900 block mb-0.5">
                          Layanan Antar-Jemput (Tanpa Kantor Fisik)
                        </span>
                        <p className="text-[11px] text-amber-800 leading-relaxed font-light">
                          Website disetel untuk tidak menampilkan alamat kantor fisik. Pengunjung diinformasikan bahwa KADEK BALI menyediakan layanan penjemputan langsung di seluruh hotel, villa, resort, dan Bandara Bali.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 5. PRATINJAU LANGSUNG (LIVE PREVIEW) */}
                <div className="p-5 rounded-2xl bg-stone-900 text-white space-y-3">
                  <div className="flex items-center justify-between border-b border-stone-800 pb-2.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Pratinjau Tampilan Bagi Pengunjung Website</span>
                    </span>
                    <span className="text-[10px] text-stone-400">Live Preview</span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-2">
                    <div>
                      <span className="text-xs text-stone-400 block mb-1">Tombol WhatsApp di Website:</span>
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#15803D] text-white text-xs font-bold shadow">
                        <MessageCircle className="w-4 h-4" />
                        <span>Chat WhatsApp ({formData.contact?.whatsappNumber || '+6285739256845'})</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-xs text-stone-400 block mb-1">Email Resmi:</span>
                      <span className="text-xs font-mono text-emerald-300 bg-stone-800 px-3 py-1.5 rounded-lg border border-stone-700 inline-block">
                        {formData.contact?.email || 'info@kadekbali.com'}
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="text-xs text-stone-400 block mb-1.5">Ikon Media Sosial yang Muncul di Footer:</span>
                    <div className="flex flex-wrap gap-2 text-[11px]">
                      {formData.contact?.instagram && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#E1306C]/20 text-rose-300 border border-[#E1306C]/30">
                          <Instagram className="w-3 h-3" />
                          <span>{formData.contact.instagram}</span>
                        </span>
                      )}
                      {formData.contact?.facebook && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#1877F2]/20 text-blue-300 border border-[#1877F2]/30">
                          <Facebook className="w-3 h-3" />
                          <span>{formData.contact.facebook}</span>
                        </span>
                      )}
                      {formData.contact?.tiktok && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-stone-800 text-stone-200 border border-stone-700">
                          <Share2 className="w-3 h-3" />
                          <span>TikTok: {formData.contact.tiktok}</span>
                        </span>
                      )}
                      {formData.contact?.youtube && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#FF0000]/20 text-red-300 border border-[#FF0000]/30">
                          <Youtube className="w-3 h-3" />
                          <span>YouTube: {formData.contact.youtube}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* 6. BIG BOTTOM SAVE BUTTON */}
                <div className="pt-2">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl text-sm font-bold bg-[#15803D] text-white hover:bg-[#166534] transition-all shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer"
                  >
                    <Save className="w-5 h-5" />
                    <span>
                      {saving
                        ? 'Menyimpan ke Server & Mengaktifkan di Website...'
                        : '💾 Simpan Perubahan Kontak & Media Sosial Sekarang'}
                    </span>
                  </button>
                  <p className="text-[11px] text-stone-500 text-center mt-2 font-light">
                    Perubahan langsung disimpan ke server dan database lokal, serta seketika tampil di seluruh tombol WhatsApp, formulir pesan, dan media sosial.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 8: Inquiries Inbox */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#252923]">Traveler Inquiries Inbox</h2>
              <p className="text-xs text-[#252923]/60 font-light">
                Real inquiries submitted via your public contact form.
              </p>
            </div>

            {(formData.inquiries || []).length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-[#EDE5D8] text-stone-400 text-sm">
                No inquiries submitted yet. Form submissions will appear here automatically.
              </div>
            ) : (
              <div className="space-y-4">
                {(formData.inquiries || []).map((inq: any) => (
                  <div
                    key={inq.id}
                    className="bg-white rounded-2xl p-6 border border-[#EDE5D8] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-3">
                        <span className="font-serif font-bold text-base text-[#252923]">{inq.fullName}</span>
                        <span className="text-xs text-stone-400">
                          {new Date(inq.createdAt).toLocaleDateString()}
                        </span>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            inq.status === 'new'
                              ? 'bg-amber-100 text-amber-800'
                              : inq.status === 'contacted'
                              ? 'bg-[#526B50]/15 text-[#526B50]'
                              : 'bg-stone-100 text-stone-600'
                          }`}
                        >
                          {inq.status.toUpperCase()}
                        </span>
                      </div>

                      <div className="text-xs text-[#526B50] font-medium flex flex-wrap gap-4">
                        <span>Email: {inq.email}</span>
                        {inq.travelDate && <span>Date: {inq.travelDate}</span>}
                        {inq.travelersCount && <span>Travelers: {inq.travelersCount}</span>}
                        {inq.preferredDestination && <span>Area: {inq.preferredDestination}</span>}
                      </div>

                      <p className="text-xs sm:text-sm text-[#252923]/80 pt-1 font-light italic">
                        "{inq.message}"
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                      <a
                        href={`https://wa.me/?text=${encodeURIComponent(
                          `Halo ${inq.fullName}, terima kasih sudah menghubungi KADEK BALI TOUR. Mengenai rencana wisata Anda ke ${inq.preferredDestination || 'Bali'} untuk ${inq.travelersCount || 2} orang, kami siap membantu dengan mobil privat ber-AC dan supir ramah. Apakah ada pertanyaan lebih lanjut?`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#15803D] text-white hover:bg-[#166534] transition-colors shadow-xs"
                        title="Balas langsung ke WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Balas via WhatsApp</span>
                      </a>

                      <button
                        onClick={() => {
                          const updated = (formData.inquiries || []).map((item: any) =>
                            item.id === inq.id ? { ...item, status: 'contacted' } : item
                          );
                          setFormData({ ...formData, inquiries: updated });
                          showToast('Status pertanyaan ditandai sudah dihubungi.', 'info');
                        }}
                        className="px-3 py-1.5 rounded-full text-xs font-medium border border-[#EDE5D8] text-[#15803D] hover:bg-[#FAF9F6] cursor-pointer"
                      >
                        Tandai Selesai
                      </button>

                      <button
                        onClick={() => {
                          const updated = (formData.inquiries || []).filter((item: any) => item.id !== inq.id);
                          setFormData({ ...formData, inquiries: updated });
                        }}
                        className="p-1.5 text-stone-400 hover:text-rose-600 cursor-pointer transition-colors"
                        title="Hapus Pertanyaan"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 9: Sections & Appearance */}
        {activeTab === 'appearance' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE5D8] max-w-3xl space-y-6">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#252923] mb-1">Section Visibility & Layout</h2>
              <p className="text-xs text-[#252923]/60 font-light">
                Toggle which sections appear on your public website.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { key: 'destinations', label: 'Popular Destinations Section' },
                { key: 'tours', label: 'Tour Packages Section' },
                { key: 'whyUs', label: 'Why Choose Us Section' },
                { key: 'about', label: 'About Us Section' },
                { key: 'gallery', label: 'Photo Gallery Section' },
                { key: 'testimonials', label: 'Guest Reviews Section' },
                { key: 'contact', label: 'Contact Form & Location Section' },
              ].map((sec) => (
                <label
                  key={sec.key}
                  className="flex items-center gap-3 p-3.5 rounded-xl border border-[#EDE5D8] cursor-pointer hover:bg-[#FAF9F6] transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={formData.settings?.sectionVisibility?.[sec.key] ?? true}
                    onChange={(e) => {
                      const visibility = {
                        ...(formData.settings?.sectionVisibility || {}),
                        [sec.key]: e.target.checked,
                      };
                      setFormData({
                        ...formData,
                        settings: { ...formData.settings, sectionVisibility: visibility },
                      });
                    }}
                    className="w-4 h-4 text-[#526B50] rounded"
                  />
                  <span className="text-xs font-medium text-[#252923]">{sec.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Tab 10: Deployment & Security */}
        {activeTab === 'deployment' && (
          <div className="space-y-8 max-w-4xl">
            {/* Password Change */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE5D8]">
              <h3 className="font-serif text-xl font-bold text-[#252923] mb-1">Change Admin Password</h3>
              <p className="text-xs text-[#252923]/60 font-light mb-6">
                Protect your dashboard by keeping your credentials secure.
              </p>

              <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
                <div>
                  <label className="block text-xs font-medium text-[#252923] mb-1">Current Password</label>
                  <input
                    type="password"
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl text-xs sm:text-sm bg-[#FAF9F6] border border-[#EDE5D8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#252923] mb-1">New Password (min 6 chars)</label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl text-xs sm:text-sm bg-[#FAF9F6] border border-[#EDE5D8]"
                  />
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full text-xs font-semibold bg-[#526B50] text-[#FAF9F6] hover:bg-[#435741]"
                >
                  Update Password
                </button>
              </form>
            </div>

            {/* Backup & Export */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE5D8]">
              <h3 className="font-serif text-xl font-bold text-[#252923] mb-1">Data Backup & Restore</h3>
              <p className="text-xs text-[#252923]/60 font-light mb-6">
                Download a complete JSON backup of your website content or restore from a previously exported backup file.
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleExportJson}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold border border-[#526B50] text-[#526B50] hover:bg-[#526B50]/10 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download JSON Backup</span>
                </button>

                <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-[#EDE5D8] text-[#252923] hover:bg-[#e2d8c7] cursor-pointer">
                  <Upload className="w-4 h-4 text-[#526B50]" />
                  <span>Restore from JSON File</span>
                  <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
                </label>
              </div>
            </div>

            {/* Deployment Guide */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE5D8] space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#252923]">Beginner Deployment Guide</h3>
              <div className="text-xs sm:text-sm text-[#252923]/80 space-y-3 font-light leading-relaxed">
                <p>
                  <strong>1. Zero-Cost Static Hosting (Cloudflare Pages or Vercel):</strong>
                  <br />
                  Run <code className="bg-stone-100 px-1 py-0.5 rounded font-mono text-xs">npm run build</code> to produce the production-ready static assets in the <code className="bg-stone-100 px-1 py-0.5 rounded font-mono text-xs">/dist</code> directory.
                  Deploy the <code className="bg-stone-100 px-1 py-0.5 rounded font-mono text-xs">dist</code> folder directly to Cloudflare Pages or Vercel. Both offer generous 100% free hosting tiers on a free subdomain (e.g. <code className="bg-stone-100 px-1 py-0.5 rounded font-mono text-xs">verlaska-travel.pages.dev</code>) with free SSL and worldwide CDN caching.
                </p>
                <p>
                  <strong>2. Full-Stack Node.js Deployment (Cloud Run / Render / Railway):</strong>
                  <br />
                  The project includes <code className="bg-stone-100 px-1 py-0.5 rounded font-mono text-xs">server.ts</code> with persistent file database storage in <code className="bg-stone-100 px-1 py-0.5 rounded font-mono text-xs">data/app_data.json</code>. You can start the service on any Node host with <code className="bg-stone-100 px-1 py-0.5 rounded font-mono text-xs">npm run start</code>.
                </p>
                <p>
                  <strong>3. Updating Content & WhatsApp:</strong>
                  <br />
                  Log in to this Owner Portal at any time. Modify your tour prices, descriptions, destinations, or WhatsApp phone number, and click <strong>"Save & Publish Changes"</strong>. Changes apply immediately without touching code!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
