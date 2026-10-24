import { Destination, TourPackage, GalleryImage, Testimonial, Advantage } from '../types';

export const TRANSLATIONS = {
  en: {
    // Topbar & Nav
    baliExperiences: 'Bali Experiences',
    home: 'Home',
    destinations: 'Destinations',
    tours: 'Tour Packages',
    gallery: 'Gallery',
    about: 'About Us',
    contact: 'Contact',
    chatWhatsApp: 'Chat on WhatsApp',
    ownerPortal: 'Owner Portal',
    languageLabel: 'Language:',

    // Hero
    heroKicker: 'Bali, Indonesia · Private Tours & Holiday Transport',
    heroHeading: 'Discover the Beauty of Bali',
    heroSubheading:
      'Explore beautiful places, enjoy local culture, and create unforgettable memories with KADEK BALI.',
    exploreToursBtn: 'Explore Our Tours',
    chatWhatsAppBtn: 'Chat on WhatsApp',
    trustPrivate: '100% Private Service',
    trustCustom: 'Custom Pace & Itinerary',
    trustSupport: 'Direct WhatsApp Support',
    heroPhotoSubtitle: 'Lake Beratan & Ulun Danu',
    heroPhotoTitle: 'Tropical Paradise Awaits You',

    // Destinations Section
    destKicker: 'Discover the Island',
    destTitle: 'Popular Destinations in Bali',
    destSubtitle:
      'From sea-cliff temples and emerald valleys to hidden jungle waterfalls and pristine white-sand islands.',
    searchDestPlaceholder: 'Search destinations...',
    viewAllDest: 'View All Destinations',
    exploreDestBtn: 'Explore Destination',
    noDestMatch: 'No destinations match your search.',
    aboutDestTitle: 'About This Destination',
    highlightsTitle: 'Key Highlights & Attractions',
    closeBtn: 'Close',
    inquireDestWhatsApp: 'Inquire on WhatsApp',

    // Tours Section
    toursKicker: 'Curated Private Trips',
    toursTitle: 'Bali Private Tour Packages',
    toursSubtitle:
      '100% private sightseeing itineraries. Travel at your own pace with clean air-conditioned transport and friendly local guides.',
    allToursTab: 'All Tours',
    featuredToursTab: 'Featured Only',
    viewAllToursBtn: 'Explore All Tour Packages',
    featuredBadge: 'Featured Tour',
    startingRate: 'Starting Rate',
    viewDetailsBtn: 'View Itinerary & Details',
    bookWhatsAppBtn: 'Book on WhatsApp',

    // Tour Modal
    packageOverview: 'Package Overview',
    tourRate: 'Tour Rate',
    privateCarIncluded: '(Private car & driver included)',
    statusAvailable: 'Status: Available',
    statusLimited: 'Status: Limited Spots',
    statusOnRequest: 'Status: On Request',
    destVisited: 'Destinations Visited',
    sampleItinerary: 'Sample Itinerary',
    whatIncluded: 'What is Included',
    whatExcluded: 'What is Excluded',
    pickupPoint: 'Meeting & Pickup Point:',
    backBtn: 'Back',

    // Why Choose Us
    whyKicker: 'The Kadek Bali Standard',
    whyTitle: 'Why Choose KADEK BALI',
    whySubtitle:
      'Thoughtful boutique travel experiences tailored to your rhythm, with warm local hospitality and modern reliability.',

    // About Section
    aboutKicker: 'About Us',
    aboutHeading: 'Your Journey, Our Passion',
    aboutDescription:
      'We help travelers discover the beauty of Bali through memorable journeys, beautiful destinations, and friendly service.',
    missionTitle: 'Our Mission',
    visionTitle: 'Our Vision',
    readMoreAboutBtn: 'Read More About Us',
    commitmentTitle: 'Our Service Commitment',
    commitCleanCars: 'Clean & Sanitized Vehicles',
    commitEnglishGuides: 'English-Speaking Friendly Chauffeurs',
    commitNoHiddenFees: 'Transparent Pricing Without Hidden Costs',
    commitFastWhatsApp: 'Instant WhatsApp Coordination',

    // Gallery Section
    galleryKicker: 'Visual Impressions',
    galleryTitle: 'Bali Travel Photography',
    gallerySubtitle:
      'A visual celebration of serene mountain lakes, dramatic limestone cliffs, sacred temples, and lush emerald jungles.',
    viewFullGalleryBtn: 'View Full Gallery',
    clickToExpand: 'Click to expand',
    catAll: 'All',
    catTemples: 'Temples',
    catNature: 'Nature',
    catCulture: 'Culture',
    catBeaches: 'Beaches',
    catWaterfalls: 'Waterfalls',

    // Testimonials Section
    reviewsKicker: 'Traveler Experiences',
    reviewsTitle: 'Guest Reviews & Experiences',
    reviewsSubtitle:
      'Memorable private tours and smooth holiday transportation tailored with genuine care.',
    sampleNotice: 'Sample preview content for demonstration. Easily customizable in Admin.',

    // Contact Section
    contactKicker: 'Get in Touch',
    contactTitle: 'Plan Your Bali Experience',
    contactSubtitle:
      'Have questions about customized tour itineraries or private car hire? Send us a message or chat with us on WhatsApp.',
    directAssistance: 'Direct Assistance',
    waBookingTitle: 'WhatsApp Booking',
    waBookingSubtitle: 'Fastest response for bookings',
    emailTitle: 'Official Email',
    operatingHoursTitle: 'Operating Hours',
    officeLocationTitle: 'Service Area in Bali',
    socialTitle: 'Social Media:',
    sendInquiryTitle: 'Send an Inquiry',
    sendInquirySubtitle:
      'Fill in your details and our travel coordinator will respond with recommendations and availability.',
    fullNameLabel: 'Full Name *',
    emailLabel: 'Email Address *',
    travelDateLabel: 'Planned Travel Date',
    travelersCountLabel: 'Travelers Count',
    preferredAreaLabel: 'Preferred Area',
    customAreaOption: 'All Bali / Custom Itinerary',
    messageLabel: 'Your Message & Travel Wishes *',
    messagePlaceholder:
      "Tell us what you'd love to see or ask any questions about private car hire...",
    submitInquiryBtn: 'Submit Inquiry',
    submittingBtn: 'Sending Inquiry...',
    inquirySuccessTitle: 'Inquiry Successfully Sent!',
    inquirySuccessMsg:
      'Your inquiry has been saved to our reservation queue.',
    inquiryWhatsAppPrompt:
      'Want an instant response? You can also send a copy directly to our team via WhatsApp:',
    continueWhatsAppBtn: 'Continue via WhatsApp',
    sendAnotherBtn: 'Send Another Message',

    // Floating WhatsApp
    floatingTooltip: 'Chat with us on WhatsApp',

    // Footer
    quickLinks: 'Quick Links',
    footerAssistance: 'Get in Touch',
    footerBoutique: 'Boutique Travel Agency',
    footerCopyright: 'All rights reserved.',
  },
  id: {
    // Topbar & Nav
    baliExperiences: 'Wisata Privat Bali',
    home: 'Beranda',
    destinations: 'Destinasi',
    tours: 'Paket Tur',
    gallery: 'Galeri',
    about: 'Tentang Kami',
    contact: 'Kontak',
    chatWhatsApp: 'Chat di WhatsApp',
    ownerPortal: 'Portal Pemilik',
    languageLabel: 'Bahasa:',

    // Hero
    heroKicker: 'Bali, Indonesia · Tur Privat & Transportasi Liburan',
    heroHeading: 'Temukan Keindahan Pulau Bali',
    heroSubheading:
      'Jelajahi tempat-tempat indah, nikmati budaya lokal, dan ciptakan kenangan tak terlupakan bersama KADEK BALI.',
    exploreToursBtn: 'Jelajahi Paket Tur Kami',
    chatWhatsAppBtn: 'Chat di WhatsApp',
    trustPrivate: '100% Layanan Privat',
    trustCustom: 'Jadwal & Rute Fleksibel',
    trustSupport: 'Bantuan Langsung WhatsApp',
    heroPhotoSubtitle: 'Danau Beratan & Ulun Danu',
    heroPhotoTitle: 'Surga Tropis Menanti Anda',

    // Destinations Section
    destKicker: 'Eksplorasi Pulau Bali',
    destTitle: 'Destinasi Populer di Bali',
    destSubtitle:
      'Dari pura megah di tebing laut hingga sawah bertingkat yang damai dan pulau pantai berpasir putih.',
    searchDestPlaceholder: 'Cari destinasi wisata...',
    viewAllDest: 'Lihat Semua Destinasi',
    exploreDestBtn: 'Jelajahi Destinasi',
    noDestMatch: 'Tidak ada destinasi yang cocok dengan pencarian Anda.',
    aboutDestTitle: 'Tentang Destinasi Ini',
    highlightsTitle: 'Tempat & Daya Tarik Utama',
    closeBtn: 'Tutup',
    inquireDestWhatsApp: 'Tanya Destinasi via WhatsApp',

    // Tours Section
    toursKicker: 'Perjalanan Privat Pilihan',
    toursTitle: 'Paket Tur Privat Bali',
    toursSubtitle:
      '100% rencana perjalanan privat. Berlibur dengan nyaman sesuai ritme Anda ditemani mobil ber-AC dingin dan pemandu lokal ramah.',
    allToursTab: 'Semua Paket',
    featuredToursTab: 'Pilihan Favorit',
    viewAllToursBtn: 'Lihat Semua Paket Tur',
    featuredBadge: 'Tur Unggulan',
    startingRate: 'Mulai Dari',
    viewDetailsBtn: 'Lihat Rute & Detail',
    bookWhatsAppBtn: 'Pesan di WhatsApp',

    // Tour Modal
    packageOverview: 'Ringkasan Paket Tur',
    tourRate: 'Tarif Tur',
    privateCarIncluded: '(Sudah termasuk mobil privat & sopir)',
    statusAvailable: 'Status: Tersedia',
    statusLimited: 'Status: Kuota Terbatas',
    statusOnRequest: 'Status: Sesuai Permintaan',
    destVisited: 'Destinasi yang Dikunjungi',
    sampleItinerary: 'Rencana Perjalanan (Itinerary)',
    whatIncluded: 'Fasilitas Termasuk',
    whatExcluded: 'Tidak Termasuk',
    pickupPoint: 'Titik Penjemputan & Pertemuan:',
    backBtn: 'Kembali',

    // Why Choose Us
    whyKicker: 'Standar Layanan Kadek Bali',
    whyTitle: 'Mengapa Memilih KADEK BALI?',
    whySubtitle:
      'Layanan perjalanan privat yang dirancang dengan perhatian, kejujuran, kenyamanan, dan keramahan khas Bali.',

    // About Section
    aboutKicker: 'Tentang Kami',
    aboutHeading: 'Perjalanan Anda, Dedikasi Kami',
    aboutDescription:
      'Kami membantu wisatawan menjelajahi keindahan Bali melalui perjalanan yang berkesan, destinasi menawan, dan pelayanan yang ramah.',
    missionTitle: 'Misi Kami',
    visionTitle: 'Visi Kami',
    readMoreAboutBtn: 'Pelajari Lebih Lanjut Tentang Kami',
    commitmentTitle: 'Komitmen Layanan Kami',
    commitCleanCars: 'Kendaraan Bersih, Nyaman & Higienis',
    commitEnglishGuides: 'Sopir Lokal Ramah Berbahasa Inggris',
    commitNoHiddenFees: 'Harga Transparan Tanpa Biaya Tersembunyi',
    commitFastWhatsApp: 'Koordinasi WhatsApp Cepat & Mudah',

    // Gallery Section
    galleryKicker: 'Potret Keindahan',
    galleryTitle: 'Galeri Foto Wisata Bali',
    gallerySubtitle:
      'Koleksi visual danau pegunungan yang tenang, tebing kapur megah di tepi laut, pura suci, dan ngarai hutan tropis yang hijau asri.',
    viewFullGalleryBtn: 'Buka Galeri Lengkap',
    clickToExpand: 'Klik untuk perbesar',
    catAll: 'Semua',
    catTemples: 'Pura',
    catNature: 'Alam',
    catCulture: 'Budaya',
    catBeaches: 'Pantai',
    catWaterfalls: 'Air Terjun',

    // Testimonials Section
    reviewsKicker: 'Cerita Wisatawan',
    reviewsTitle: 'Kesan & Ulasan Tamu',
    reviewsSubtitle:
      'Perjalanan privat yang berkesan dan transportasi liburan yang nyaman dengan ketulusan khas Bali.',
    sampleNotice: 'Konten pratinjau sampel untuk demonstrasi. Dapat diubah dengan mudah di Dashboard Admin.',

    // Contact Section
    contactKicker: 'Hubungi Kami',
    contactTitle: 'Rencanakan Liburan Bali Anda',
    contactSubtitle:
      'Punya pertanyaan tentang rute tur atau sewa mobil privat di Bali? Kirim pesan atau hubungi kami langsung via WhatsApp.',
    directAssistance: 'Bantuan Langsung',
    waBookingTitle: 'Pemesanan via WhatsApp',
    waBookingSubtitle: 'Respon tercepat untuk konsultasi & reservasi',
    emailTitle: 'Email Resmi',
    operatingHoursTitle: 'Jam Operasional',
    officeLocationTitle: 'Area Layanan di Bali',
    socialTitle: 'Media Sosial:',
    sendInquiryTitle: 'Kirim Pesan Pertanyaan',
    sendInquirySubtitle:
      'Isi rincian perjalanan Anda dan koordinator kami akan segera merespons dengan saran rute terbaik serta ketersediaan jadwal.',
    fullNameLabel: 'Nama Lengkap *',
    emailLabel: 'Alamat Email *',
    travelDateLabel: 'Rencana Tanggal Perjalanan',
    travelersCountLabel: 'Jumlah Tamu',
    preferredAreaLabel: 'Daerah / Tujuan Pilihan',
    customAreaOption: 'Seluruh Bali / Rute Kustom',
    messageLabel: 'Pesan & Keinginan Perjalanan Anda *',
    messagePlaceholder:
      'Ceritakan destinasi yang ingin Anda kunjungi atau tanyakan seputar sewa mobil privat...',
    submitInquiryBtn: 'Kirim Pertanyaan',
    submittingBtn: 'Sedang Mengirim Pesan...',
    inquirySuccessTitle: 'Pertanyaan Berhasil Terkirim!',
    inquirySuccessMsg:
      'Pesan Anda telah berhasil tersimpan di sistem antrean reservasi kami.',
    inquiryWhatsAppPrompt:
      'Ingin respon instan? Anda juga dapat mengirim salinan pesan langsung ke WhatsApp kami sekarang:',
    continueWhatsAppBtn: 'Lanjutkan via WhatsApp',
    sendAnotherBtn: 'Kirim Pesan Lainnya',

    // Floating WhatsApp
    floatingTooltip: 'Tanya kami di WhatsApp',

    // Footer
    quickLinks: 'Navigasi Cepat',
    footerAssistance: 'Bantuan Langsung',
    footerBoutique: 'Agensi Wisata Butik Bali',
    footerCopyright: 'Hak cipta dilindungi undang-undang.',
  },
};

/**
 * Returns localized text for a given key.
 */
export function t(key: keyof typeof TRANSLATIONS.en, language: 'en' | 'id'): string {
  const lang = language === 'id' ? 'id' : 'en';
  return TRANSLATIONS[lang][key] || TRANSLATIONS.en[key] || '';
}

/**
 * Maps category names dynamically between English and Indonesian.
 */
export function translateCategory(cat: string, language: 'en' | 'id'): string {
  if (language === 'en') {
    if (cat === 'Semua') return 'All';
    if (cat === 'Pura') return 'Temples';
    if (cat === 'Alam') return 'Nature';
    if (cat === 'Budaya') return 'Culture';
    if (cat === 'Pantai') return 'Beaches';
    if (cat === 'Air Terjun') return 'Waterfalls';
    return cat;
  }
  // Indonesian
  if (cat === 'All') return 'Semua';
  if (cat === 'Temples') return 'Pura';
  if (cat === 'Nature') return 'Alam';
  if (cat === 'Culture') return 'Budaya';
  if (cat === 'Beaches') return 'Pantai';
  if (cat === 'Waterfalls') return 'Air Terjun';
  return cat;
}

/**
 * Provides localized destination data when Indonesian is selected.
 */
export const DESTINATIONS_ID_MAP: Record<string, Partial<Destination>> = {
  'dest-tanah-lot': {
    name: 'Pura Tanah Lot',
    location: 'Tabanan, Pesisir Barat Bali',
    shortDescription: 'Pura laut suci kuno yang bertengger megah di atas bongkahan batu karang vulkanik dengan deburan ombak samudra saat matahari terbenam.',
    fullDescription: 'Pura Tanah Lot adalah salah satu pura laut paling dihormati di Bali yang didirikan pada abad ke-16 oleh Danghyang Nirartha. Terletak di pantai barat Tabanan yang berbatu, pura ini terkenal dengan pemandangan matahari terbenam spektakuler di saat ombak Samudra Hindia memecah di kakinya. Saat air surut, pengunjung dapat berjalan mendekat untuk menerima berkah air suci alami.',
    highlights: ['Pura di Atas Batu Karang Samudra', 'Panorama Matahari Terbenam Keemasan', 'Lengkungan Karang Alami Batu Bolong', 'Berkah Air Suci Tirta Pembersihan'],
  },
  'dest-kintamani': {
    name: 'Kintamani & Gunung Batur',
    location: 'Bangli, Dataran Tinggi Bali',
    shortDescription: 'Hawa sejuk pegunungan, pemandangan kaldera Gunung Batur yang aktif, dan ketenangan panorama Danau Batur.',
    fullDescription: 'Terletak di dataran tinggi Bangli pada ketinggian 1.500 meter di atas permukaan laut, Kintamani menawarkan udara sejuk menyegarkan. Nikmati pemandangan lepas tak terhalang menghadap Gunung Batur yang megah dan danau kawah berbentuk bulan sabit, ditemani seduhan kopi Arabika Kintamani yang ditanam di lereng vulkanik subur.',
    highlights: ['Gardu Pandang Gunung Batur', 'Kaldera & Danau Kawah Batur', 'Kafe Kopi Spesialis Kintamani', 'Pemandian Air Panas Alami Toya Devasya'],
  },
  'dest-besakih': {
    name: 'Pura Besakih (Ibu Pura Bali)',
    location: 'Karangasem, Bali Timur',
    shortDescription: 'Kompleks pura Hindu terbesar dan paling suci di Bali, terletak anggun di lereng suci Gunung Agung.',
    fullDescription: 'Dikenal sebagai "Mother Temple of Bali", Pura Besakih adalah suaka agung yang terdiri dari lebih dari 80 pura dan tempat persembahyangan yang berundak di lereng suci Gunung Agung. Menampilkan gerbang Candi Bentar yang megah dan menara Meru bertingkat hitam, Besakih adalah pusat spiritual seluruh masyarakat Bali.',
    highlights: ['Kompleks Utama Penataran Agung', 'Latar Belakang Gunung Agung yang Sakral', 'Gerbang Pintu Masuk Candi Bentar', 'Arsitektur Kuno Khas Bali Bertingkat'],
  },
  'dest-tirta-empul': {
    name: 'Pura Tirta Empul (Mata Air Suci)',
    location: 'Tampaksiring, Gianyar',
    shortDescription: 'Pura air suci bersejarah yang didirikan sejak 962 M, terkenal dengan kolam penyucian diri spiritual (Melukat) yang jernih.',
    fullDescription: 'Tirta Empul adalah situs cagar budaya nasional di desa Manukraya dekat Tampaksiring. Didedikasikan kepada Dewa Wisnu, pura ini memiliki mata air alami yang terus memancar dari dalam tanah. Warga lokal dan wisatawan mancanegara dapat mengikuti ritual pembersihan diri spiritual (Melukat) di bawah pancuran air batu kuno.',
    highlights: ['Pancuran Tirta Suci Melukat', 'Kolam Mata Air Alami Sebening Kaca', 'Ukiran Batu Kuno Peninggalan Sejarah', 'Pemandangan Istana Kepresidenan Tampaksiring'],
  },
  'dest-ubud': {
    name: 'Lembah Budaya Ubud',
    location: 'Gianyar, Bali Tengah',
    shortDescription: 'Jantung seni dan budaya Bali yang terkenal dengan suaka monyet keramat, puri agung, desa perajin seni, dan ngarai hijau.',
    fullDescription: 'Ubud adalah pusat kebudayaan Bali yang tenang di antara lembah sungai dan hutan tropis. Di sini Anda dapat menemukan sanggar seni tradisional, pura berhiaskan bunga teratai seperti Puri Saraswati, pasar seni lokal yang semarak, serta peristirahatan damai berhadapan dengan lembah pohon kelapa.',
    highlights: ['Hutan Monyet Keramat (Monkey Forest)', 'Puri Saraswati & Kolam Teratai', 'Pasar Seni Tradisional Ubud', 'Jalur Bukit Campuhan (Ridge Walk)'],
  },
  'dest-uluwatu': {
    name: 'Tebing & Pura Uluwatu',
    location: 'Badung, Semenanjung Selatan Bali',
    shortDescription: 'Garis tebing kapur setinggi 70 meter di atas samudra, pantai selancar kelas dunia, dan tari Kecak saat senja.',
    fullDescription: 'Berdiri kokoh di ujung selatan pulau Bali, Uluwatu menyuguhkan tebing batu karang terjal setinggi 70 meter, pantai berpasir putih tersembunyi, dan pemandangan magis matahari terbenam Samudra Hindia yang diiringi pertunjukan sakral Tari Kecak & Api di panggung tebing terbuka.',
    highlights: ['Pura Tebing Laut Uluwatu', 'Pertunjukan Tari Kecak & Api Senja', 'Pantai Pasir Putih Padang Padang', 'Pemandangan Samudra Hindia Membentang'],
  },
  'dest-nusa-penida': {
    name: 'Pulau Nusa Penida',
    location: 'Klungkung, Kepulauan Bali',
    shortDescription: 'Pulau eksotis dengan formasi tebing karang ikonik Kelingking, laguna toska bening, dan pantai berpasir putih alami.',
    fullDescription: 'Hanya 35 menit penyeberangan speedboat dari Sanur, Nusa Penida terkenal di dunia dengan tebing pantai Kelingking berbentuk T-Rex, kolam bidadari alami Angel’s Billabong, terowongan laut Broken Beach, dan keindahan snorkeling bersama ikan pari manta raksasa.',
    highlights: ['Tebing Ikonik Kelingking T-Rex', 'Kolam Bidadari Alami Angel’s Billabong', 'Lengkungan Pantai Broken Beach', 'Pantai Pasir Putih & Snorkeling Crystal Bay'],
  },
  'dest-waterfalls': {
    name: 'Air Terjun Sekumpul & Alami',
    location: 'Bangli & Buleleng, Bali Utara & Tengah',
    shortDescription: 'Ngarai rimba tropis yang dalam, air terjun kembar bertingkat, dan kolam pemandian alami yang sejuk menyegarkan.',
    fullDescription: 'Bali dianugerahi air terjun mempesona yang tersembunyi di rimbunnya hutan tropis. Nikmati kemegahan air terjun kembar Sekumpul, ketenangan alam Tibumana, atau gua ngarai Tukad Cepung di mana berkas sinar matahari menembus celah tebing batu.',
    highlights: ['Air Terjun Kembar Megah Sekumpul', 'Kolam Renang Alami Hutan Tibumana', 'Gua Air Terjun Tukad Cepung', 'Trekking Menembus Hutan Asri'],
  },
  'dest-sanur': {
    name: 'Pantai Sanur Matahari Terbit',
    location: 'Denpasar, Pesisir Timur Bali',
    shortDescription: 'Kawasan pesisir tenang berpasir putih dengan jajaran perahu tradisional jukung warna-warni dan panorama sunrise terindah.',
    fullDescription: 'Sanur adalah kawasan pantai tertua dan paling damai di Bali. Dikelilingi terumbu karang pelindung yang membuat ombaknya tenang dan dangkal, wisatawan dapat bersepeda di sepanjang jalur tepi pantai 5 km, mengagumi perahu jukung tradisional, dan menikmati matahari terbit yang syahdu.',
    highlights: ['Jalur Santai Tepi Pantai', 'Perahu Kayu Tradisional Jukung', 'Air Laut Tenang & Aman untuk Berenang', 'Pelabuhan Utama Penyeberangan Nusa Penida'],
  },
  'dest-ulun-danu': {
    name: 'Pura Ulun Danu Beratan',
    location: 'Bedugul, Dataran Tinggi Tengah',
    shortDescription: 'Pura terapung megah di tepi danau yang diselimuti kabut pegunungan sejuk di Danau Beratan, Bedugul.',
    fullDescription: 'Berada di dataran tinggi Bedugul pada ketinggian 1.200 meter, Ulun Danu Beratan adalah pura air abad ke-17 yang dipersembahkan kepada Dewi Danu, dewi kesuburan danau dan sungai, dengan latar belakang pegunungan berkabut yang memesona.',
    highlights: ['Menara Meru 11 Tingkat di Atas Danau', 'Wisata Sampan Tradisional Danau Beratan', 'Kebun Raya Bedugul', 'Udara Sejuk Khas Pegunungan'],
  },
  'dest-tegallalang': {
    name: 'Sawah Terasering Tegallalang',
    location: 'Ubud, Gianyar',
    shortDescription: 'Hamparan sawah bertingkat hijau zamrud yang dirawat dengan kearifan lokal sistem pengairan kuno Subak.',
    fullDescription: 'Terletak di utara Ubud, Tegallalang memperlihatkan kejeniusan tata kelola air tradisional Bali (Subak). Berjalanlah di pematang sawah yang dinaungi pohon kelapa sambil menikmati pemandangan lembah tropis yang damai.',
    highlights: ['Sistem Irigasi Warisan Dunia Subak', 'Jalur Pematang Sawah Hijau Asri', 'Spot Foto Ayunan Raksasa (Jungle Swing)', 'Pusat Kerajinan Ukir Kayu Tradisional'],
  },
  'dest-seminyak-canggu': {
    name: 'Pesisir Seminyak & Canggu',
    location: 'Badung, Pesisir Barat Daya',
    shortDescription: 'Pantai modern berpasir luas dengan panorama matahari terbenam memukau, ombak selancar, dan kuliner butik tepi laut.',
    fullDescription: 'Seminyak dan Canggu memadukan gaya hidup selancar santai dengan restoran dan kafe tepi laut yang berkelas. Nikmati momen senja keemasan di pantai Batu Bolong dan Petitenget, butik perancang busana, dan alunan musik santai di tepi samudra.',
    highlights: ['Pantai Selancar Batu Bolong & Echo Beach', 'Tempat Bersantai Tepi Pantai Senja', 'Pura Petitenget Pesisir', 'Pusat Butik Mode & Kafe Organik'],
  },
};

/**
 * Provides localized tour package data when Indonesian is selected.
 */
export const TOURS_ID_MAP: Record<string, Partial<TourPackage>> = {
  'tour-ubud-heritage': {
    name: 'Tur Privat Warisan Budaya Ubud & Air Terjun Tersembunyi',
    duration: 'Sehari Penuh (8-10 Jam)',
    description: 'Perjalanan privat santai sehari penuh menikmati indahnya sawah bertingkat Ubud, desa kerajinan seni, suaka monyet keramat, dan segarnya air terjun alami di tengah hutan.',
    destinationsIncluded: ['Ubud', 'Sawah Terasering Tegallalang', 'Air Terjun Tibumana', 'Puri Saraswati'],
    meetingPoint: 'Penjemputan gratis di lobi hotel area Kuta, Seminyak, Canggu, Sanur, Ubud, atau Nusa Dua',
    availableDates: 'Tersedia setiap hari berdasarkan permintaan',
    includedServices: [
      'Kendaraan privat ber-AC untuk kapasitas hingga 5 orang',
      'Sopir lokal profesional berbahasa Inggris & Indonesia',
      'Semua biaya parkir dan tol',
      'Air mineral dingin selama perjalanan',
      'Jadwal fleksibel & bantuan pengambilan foto',
    ],
    excludedServices: [
      'Tiket masuk objek wisata (dibayar di lokasi)',
      'Makan siang dan minuman pribadi',
      'Tip untuk sopir (sukarela)',
    ],
    itinerary: [
      { time: '08:30 WITA', title: 'Penjemputan di Hotel', description: 'Bertemu sopir privat Anda di lobi dengan mobil ber-AC yang bersih dan nyaman.' },
      { time: '10:00 WITA', title: 'Sawah Terasering Tegallalang', description: 'Jalan santai pagi di hamparan sawah berundak hijau warisan budaya Subak.' },
      { time: '12:00 WITA', title: 'Air Terjun Tibumana', description: 'Menikmati kesegaran air terjun alami dan kolam jernih di tengah ngarai hutan asri.' },
      { time: '13:30 WITA', title: 'Makan Siang Masakan Khas Bali', description: 'Menikmati hidangan lezat dengan pemandangan lembah tropis (opsional).' },
      { time: '15:00 WITA', title: 'Suaka Monyet & Puri Ubud', description: 'Melihat monyet-monyet lincah di hutan keramat dan mengagumi arsitektur kerajaan Puri Saren.' },
      { time: '17:30 WITA', title: 'Kembali Menuju Hotel', description: 'Perjalanan kembali dengan nyaman menuju villa atau hotel Anda.' },
    ],
  },
  'tour-tanah-lot-uluwatu': {
    name: 'Tur Privat Matahari Terbenam Tanah Lot & Pura Pesisir',
    duration: 'Sehari Penuh (9-10 Jam)',
    description: 'Saksikan pura laut paling tersohor di Bali, mulai dari megahnya Pura Tanah Lot di atas batu karang samudra hingga tebing karang Uluwatu saat senja.',
    destinationsIncluded: ['Pura Tanah Lot', 'Tebing & Pura Uluwatu', 'Pantai Padang Padang'],
    meetingPoint: 'Penjemputan di lobi hotel area Bali Selatan & Tengah',
    availableDates: 'Tersedia setiap hari sesuai permintaan',
    includedServices: [
      'Mobil privat bersih dan bahan bakar minyak (BBM)',
      'Sopir lokal berpengalaman dan ramah',
      'Air mineral botol dingin',
      'Semua biaya parkir kendaraan',
    ],
    excludedServices: [
      'Tiket masuk pura & objek wisata',
      'Makan dan belanja pribadi',
    ],
    itinerary: [
      { time: '09:00 WITA', title: 'Penjemputan di Hotel', description: 'Berangkat dengan kendaraan privat ber-AC yang nyaman.' },
      { time: '10:30 WITA', title: 'Pura Kerajaan Taman Ayun', description: 'Menjelajahi pura peninggalan kerajaan Mengwi yang asri dikelilingi kolam teratai.' },
      { time: '13:00 WITA', title: 'Pantai Pasir Putih Padang Padang', description: 'Bersantai atau bermain air di pantai tenang yang diapit tebing kapur.' },
      { time: '16:00 WITA', title: 'Pura Laut Tanah Lot', description: 'Menyaksikan deburan ombak samudra menghantam pura karang di saat matahari terbenam keemasan.' },
    ],
  },
  'tour-kintamani-besakih': {
    name: 'Tur Akbar Gunung Batur Kintamani & Pura Agung Besakih',
    duration: 'Sehari Penuh (9-10 Jam)',
    description: 'Petualangan menuju dataran tinggi sejuk Kintamani dengan panorama Gunung Batur, mata air suci Tirta Empul, dan suaka Pura Ibu Agung Besakih.',
    destinationsIncluded: ['Kintamani & Gunung Batur', 'Pura Besakih', 'Pura Tirta Empul'],
    meetingPoint: 'Lobi hotel atau villa Anda di Bali',
    availableDates: 'Tersedia setiap hari',
    includedServices: [
      'Mobil privat ber-AC dingin dan bahan bakar',
      'Sopir lokal ramah berbahasa Inggris & Indonesia',
      'Biaya parkir dan tol',
      'Air mineral botol gratis',
    ],
    excludedServices: [
      'Tiket masuk objek wisata',
      'Makan siang dan belanja pribadi',
    ],
    itinerary: [
      { time: '08:00 WITA', title: 'Penjemputan Pagi di Hotel', description: 'Perjalanan santai menuju kawasan Bali tengah-timur.' },
      { time: '09:45 WITA', title: 'Pura Tirta Empul Tampaksiring', description: 'Mengunjungi kolam mata air suci alami peninggalan abad ke-10.' },
      { time: '11:45 WITA', title: 'Gardu Pandang Kaldera Kintamani', description: 'Pemandangan panorama Gunung Batur dan Danau Batur sambil menikmati kopi lokal.' },
      { time: '14:30 WITA', title: 'Pura Ibu Agung Besakih', description: 'Menjelajahi kompleks pura terbesar di Bali di lereng Gunung Agung.' },
      { time: '17:30 WITA', title: 'Perjalanan Pulang ke Hotel', description: 'Istirahat nyaman dalam perjalanan kembali ke hotel Anda.' },
    ],
  },
  'tour-nusa-penida-west': {
    name: 'Wisata Sehari Privat Nusa Penida Pesisir Barat',
    duration: 'Sehari Penuh (10-11 Jam)',
    description: 'Menyeberang menuju pulau surga eksotis. Kunjungi tebing Kelingking Beach, kolam alami Angel’s Billabong, dan Broken Beach dengan mobil privat ber-AC.',
    destinationsIncluded: ['Nusa Penida', 'Kelingking Beach', 'Broken Beach', 'Angel’s Billabong'],
    meetingPoint: 'Lobi hotel Anda di Bali',
    availableDates: 'Keberangkatan setiap hari (menyesuaikan cuaca laut)',
    includedServices: [
      'Antar jemput mobil privat hotel ke pelabuhan di Bali',
      'Tiket speedboat pulang-pergi (Sanur - Nusa Penida)',
      'Mobil privat dan sopir pemandu khusus di Nusa Penida',
      'Biaya retribusi pemerintah daerah Nusa Penida',
      'Air mineral selama perjalanan',
    ],
    excludedServices: [
      'Makan siang dan belanja pribadi',
      'Perlengkapan dan perahu snorkeling (tersedia berdasarkan permintaan)',
    ],
    itinerary: [
      { time: '06:30 WITA', title: 'Penjemputan di Hotel & Transfer ke Pelabuhan', description: 'Menuju pelabuhan Sanur untuk proses check-in speedboat.' },
      { time: '07:30 WITA', title: 'Speedboat Menuju Nusa Penida', description: 'Pelayaran 35 menit melintasi Selat Badung dengan pemandangan laut biru.' },
      { time: '08:45 WITA', title: 'Tebing Kelingking T-Rex', description: 'Mengabadikan foto ikonik di atas tebing spektakuler dan pantai pasir putih.' },
      { time: '11:30 WITA', title: 'Angel’s Billabong & Broken Beach', description: 'Menikmati kolam air laut alami dan lengkungan tebing bundar raksasa.' },
      { time: '13:00 WITA', title: 'Makan Siang & Pantai Crystal Bay', description: 'Makan siang santai dan melepas penat di tepi pantai teduh berpasir putih.' },
      { time: '16:00 WITA', title: 'Speedboat Kembali ke Sanur Bali', description: 'Menyeberang kembali ke Bali dan diantar langsung ke lobi hotel Anda.' },
    ],
  },
  'tour-custom-charter': {
    name: 'Sewa Mobil Privat & Sopir Fleksibel (10 Jam)',
    duration: '10 Jam Sehari Penuh',
    description: 'Rancang sendiri rute liburan Bali impian Anda. Tentukan destinasi favorit Anda atau biarkan sopir berpengalaman kami merekomendasikan rute terbaik.',
    destinationsIncluded: ['Bebas ke Seluruh Wilayah Bali (Tengah, Selatan, Utara, atau Timur)'],
    meetingPoint: 'Semua hotel, villa, atau Bandara Ngurah Rai di Bali',
    availableDates: 'Tersedia setiap hari',
    includedServices: [
      'Mobil modern 7-seater (Toyota Avanza / Xenia atau setara)',
      'Sopir lokal berpengalaman dan ramah berbahasa Inggris & Indonesia',
      'Bahan bakar minyak (BBM / bensin) sudah termasuk',
      'Layanan mobil privat 10 jam penuh',
      'Air mineral dingin di dalam mobil',
    ],
    excludedServices: [
      'Tiket masuk objek wisata dan pura',
      'Makan dan pengeluaran pribadi',
      'Biaya overtime jika melebihi 10 jam (Rp 50.000 / jam jika diperlukan)',
    ],
    itinerary: [
      { time: 'Fleksibel', title: 'Jadwal Ditentukan Sendiri', description: 'Anda bebas menentukan jam penjemputan dan daftar tempat yang ingin dikunjungi.' },
      { time: 'Bebas Kapan Saja', title: 'Berhenti Sesuai Keinginan', description: 'Bisa berhenti kapan saja untuk berfoto, ngopi, berbelanja, atau makan.' },
    ],
  },
};

/**
 * Localized advantages in Indonesian.
 */
export const ADVANTAGES_ID_MAP: Record<string, Partial<Advantage>> = {
  'adv-1': {
    title: 'Jadwal & Waktu Fleksibel',
    description: 'Tidak terburu-buru dan tanpa rombongan bus wisata ramai. Setiap rencana perjalanan disesuaikan penuh dengan kenyamanan dan ritme Anda.',
  },
  'adv-2': {
    title: 'Sopir & Pemandu Lokal Ramah',
    description: 'Sopir berpengalaman kami fasih berbahasa Inggris & Indonesia, siap berbagi cerita budaya asli Bali serta tempat-tempat indah tersembunyi.',
  },
  'adv-3': {
    title: 'Mobil Bersih & Ber-AC Nyaman',
    description: 'Bepergian dengan kendaraan modern yang selalu dirawat berkala, bersih, wangi, ber-AC dingin, dan dilengkapi air mineral botol gratis.',
  },
  'adv-4': {
    title: 'Bantuan Langsung via WhatsApp',
    description: 'Komunikasi cepat dan jelas sebelum dan selama liburan Anda di Bali agar perjalanan selalu tenang dan menyenangkan.',
  },
};

/**
 * Localized testimonials in Indonesian.
 */
export const TESTIMONIALS_ID_MAP: Record<string, Partial<Testimonial>> = {
  'test-1': {
    name: 'Sarah & Mark Jenkins',
    roleOrOrigin: 'Pasangan dari Sydney, Australia',
    reviewText: 'Tur privat bersama VERLASKA TRAVEL adalah pengalaman paling menyenangkan selama liburan kami di Bali. Sopir kami sangat tepat waktu, ramah, dan mengajak kami ke tempat-tempat indah yang tidak ramai. Kami merasa sangat aman dan diperhatikan!',
  },
  'test-2': {
    name: 'David Van Houten',
    roleOrOrigin: 'Wisatawan dari Amsterdam, Belanda',
    reviewText: 'Pemesanan melalui WhatsApp sangat mudah dan cepat. Pertanyaan saya dijawab dalam hitungan menit. Mobilnya sangat bersih, AC dingin, dan perjalanan tur di Ubud terasa seperti menjelajah bersama sahabat lokal yang berpengetahuan luas.',
  },
  'test-3': {
    name: 'Elena & Lucas Moreau',
    roleOrOrigin: 'Keluarga dari Lyon, Prancis',
    reviewText: 'Bepergian membawa dua anak kecil bisa sangat melelahkan, namun VERLASKA TRAVEL membuat semuanya begitu lancar. Cara mengemudi sopir sangat halus dan jadwal langsung disesuaikan saat anak-anak kami butuh istirahat. Sangat kami rekomendasikan!',
  },
};

/**
 * Localized gallery captions in Indonesian.
 */
export const GALLERY_ID_MAP: Record<string, Partial<GalleryImage>> = {
  'gal-tanah-lot': {
    caption: 'Pura laut Tanah Lot di atas bongkahan karang hitam saat matahari terbenam keemasan',
    category: 'Pura',
  },
  'gal-kintamani': {
    caption: 'Pemandangan kaldera Gunung Batur dan danau kawah di dataran tinggi Kintamani',
    category: 'Alam',
  },
  'gal-besakih': {
    caption: 'Pura Agung Besakih dengan gapura Candi Bentar berlatar Gunung Agung suci',
    category: 'Pura',
  },
  'gal-tirta-empul': {
    caption: 'Kolam mata air suci untuk ritual Melukat di Pura Tirta Empul Tampaksiring',
    category: 'Budaya',
  },
  'gal-sanur': {
    caption: 'Deretan perahu jukung tradisional Bali di Pantai Sanur saat matahari terbit',
    category: 'Pantai',
  },
  'gal-lake-beratan': {
    caption: 'Matahari terbit damai di Danau Beratan dengan pura terapung Ulun Danu',
    category: 'Pura',
  },
  'gal-ubud-rice': {
    caption: 'Berkas sinar mentari pagi menyinari hamparan terasering sawah Tegallalang Ubud',
    category: 'Alam',
  },
  'gal-uluwatu-cliff': {
    caption: 'Tebing karang kapur setinggi 70 meter menghadap Samudra Hindia di Uluwatu',
    category: 'Pantai',
  },
  'gal-nusa-penida': {
    caption: 'Air laut toska jernih dan tebing karang Kelingking T-Rex di Nusa Penida',
    category: 'Pantai',
  },
  'gal-sekumpul-waterfall': {
    caption: 'Air terjun megah Sekumpul mengalir di ngarai hutan hujan tropis Bali yang asri',
    category: 'Air Terjun',
  },
};


export function getLocalizedDestination(dest: Destination, lang: 'en' | 'id'): Destination {
  if (lang === 'en' || !DESTINATIONS_ID_MAP[dest.id]) return dest;
  const mapped = DESTINATIONS_ID_MAP[dest.id];
  return {
    ...dest,
    name: mapped.name || dest.name,
    location: mapped.location || dest.location,
    shortDescription: mapped.shortDescription || dest.shortDescription,
    fullDescription: mapped.fullDescription || dest.fullDescription,
    highlights: mapped.highlights || dest.highlights,
  };
}

export function getLocalizedTour(tour: TourPackage, lang: 'en' | 'id'): TourPackage {
  if (lang === 'en' || !TOURS_ID_MAP[tour.id]) return tour;
  const mapped = TOURS_ID_MAP[tour.id];
  return {
    ...tour,
    name: mapped.name || tour.name,
    duration: mapped.duration || tour.duration,
    description: mapped.description || tour.description,
    destinationsIncluded: mapped.destinationsIncluded || tour.destinationsIncluded,
    meetingPoint: mapped.meetingPoint || tour.meetingPoint,
    availableDates: mapped.availableDates || tour.availableDates,
    includedServices: mapped.includedServices || tour.includedServices,
    excludedServices: mapped.excludedServices || tour.excludedServices,
    itinerary: mapped.itinerary || tour.itinerary,
  };
}

export function getLocalizedGallery(item: GalleryImage, lang: 'en' | 'id'): GalleryImage {
  if (lang === 'en' || !GALLERY_ID_MAP[item.id]) {
    return {
      ...item,
      category: translateCategory(item.category, lang),
    };
  }
  const mapped = GALLERY_ID_MAP[item.id];
  return {
    ...item,
    caption: mapped.caption || item.caption,
    category: mapped.category || translateCategory(item.category, lang),
  };
}

export function getLocalizedTestimonial(test: Testimonial, lang: 'en' | 'id'): Testimonial {
  if (lang === 'en' || !TESTIMONIALS_ID_MAP[test.id]) return test;
  const mapped = TESTIMONIALS_ID_MAP[test.id];
  return {
    ...test,
    name: mapped.name || test.name,
    roleOrOrigin: mapped.roleOrOrigin || test.roleOrOrigin,
    reviewText: mapped.reviewText || test.reviewText,
  };
}

export function getLocalizedAdvantage(adv: Advantage, lang: 'en' | 'id'): Advantage {
  if (lang === 'en' || !ADVANTAGES_ID_MAP[adv.id]) return adv;
  const mapped = ADVANTAGES_ID_MAP[adv.id];
  return {
    ...adv,
    title: mapped.title || adv.title,
    description: mapped.description || adv.description,
  };
}
