import {
  User,
  Product,
  FarmSlot,
  VisitBooking,
  Order,
  LaborGroup,
  WorkerRequest,
  Scheme,
  EquipmentItem,
  MandiRate,
  FarmExpense,
  Review
} from '../types';

export const initialUsers: User[] = [
  {
    id: 'usr_farmer_rajesh',
    username: 'rajesh_farmer',
    name: 'Rajesh Kumar Patil',
    email: 'rajesh@greenvalley.in',
    phone: '+91 98220 14567',
    role: 'farmer',
    avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&q=80',
    location: {
      address: 'Survey No. 42, Dindori Road',
      village: 'Dindori',
      district: 'Nashik',
      state: 'Maharashtra',
      pincode: '422004',
      lat: 19.9975,
      lng: 73.7898
    },
    farmerProfile: {
      farmName: 'Green Valley Organic Agro Farm',
      surveyNumber: '42/1B',
      landArea: 18,
      landAreaUnit: 'acre',
      soilType: 'Black Cotton',
      irrigationType: 'Drip Irrigation',
      farmingStyle: '100% Organic',
      cropsGrown: ['Desi Tomato', 'Baby Spinach', 'Red Carrot', 'Winter Strawberry', 'Fresh Papaya', 'Cauliflower'],
      bio: 'Certified pesticide-free natural farm. Every morning produce is hand-picked at 5:30 AM to guarantee maximum crispness and nutritional density. We also welcome urban families for weekend agro-tourism.',
      organicCertified: true,
      kisanCreditCardNo: 'KCC-MAH-992144',
      bannerImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&q=80'
    }
  },
  {
    id: 'usr_farmer_anita',
    username: 'anita_orchards',
    name: 'Anita Ramesh Shinde',
    email: 'anita@suryasunburst.in',
    phone: '+91 98450 78123',
    role: 'farmer',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80',
    location: {
      address: 'Near Mango Heritage Valley, Guhagar Highway',
      village: 'Guhagar',
      district: 'Ratnagiri',
      state: 'Maharashtra',
      pincode: '415703',
      lat: 17.5186,
      lng: 73.1957
    },
    farmerProfile: {
      farmName: 'Surya Sunburst Orchards & Agro Tourism',
      surveyNumber: '88/2A',
      landArea: 24,
      landAreaUnit: 'acre',
      soilType: 'Laterite',
      irrigationType: 'Drip Irrigation',
      farmingStyle: '100% Organic',
      cropsGrown: ['Alphonso Mango', 'Bhagwa Pomegranate', 'Desi Tomatoes', 'Cashew Apple'],
      bio: 'Multi-generation Konkan orchard specialising in authentic GI-tagged Alphonso mangoes and ruby-red pomegranates grown using biodynamic compost and zero synthetic sprays.',
      organicCertified: true,
      kisanCreditCardNo: 'KCC-MAH-884210',
      bannerImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&q=80'
    }
  },
  {
    id: 'usr_consumer_tanmay',
    username: 'tanmay123',
    name: 'Tanmay Rao',
    email: 'tanmay.rao@outlook.com',
    phone: '+91 98765 43210',
    role: 'consumer',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80',
    location: {
      address: 'Flat 402, Green Acres Apt, Baner-Pashan Link Road',
      village: 'Baner',
      district: 'Pune',
      state: 'Maharashtra',
      pincode: '411045',
      lat: 18.559,
      lng: 73.7868
    }
  },
  {
    id: 'usr_worker_suresh',
    username: 'suresh_worker',
    name: 'Babanrao Shinde (Shivaji Agro Labor)',
    email: 'babanrao@shivajilabor.in',
    phone: '+91 94230 55123',
    role: 'worker',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    location: {
      address: 'Saswad Agri Labor Center',
      village: 'Saswad',
      district: 'Pune',
      state: 'Maharashtra',
      pincode: '412301',
      lat: 18.3444,
      lng: 74.0298
    },
    workerProfile: {
      teamName: 'Shivaji Agro Labor Cooperative',
      isLeader: true,
      availableWorkers: 18,
      specialties: ['Harvesting & Picking', 'Post-Harvest Sorting & Packing', 'Sowing & Transplantation', 'Tractor Operation'],
      dailyRate: 550,
      experienceYears: 12
    }
  },
  {
    id: 'usr_admin',
    username: 'admin',
    name: 'KisanSetu Admin Oversight',
    email: 'admin@kisansetu.gov.in',
    phone: '+91 1800 180 1551',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
    location: {
      address: 'AgriTech Central Hub, Shivaji Nagar',
      district: 'Pune',
      state: 'Maharashtra',
      pincode: '411005'
    }
  }
];

export const initialProducts: Product[] = [
  {
    id: 'prod_tomatoes_rajesh',
    farmerId: 'usr_farmer_rajesh',
    farmName: 'Green Valley Organic Agro Farm',
    farmerName: 'Rajesh Kumar Patil',
    farmerLocation: 'Nashik, Maharashtra (12 km away)',
    farmLat: 19.9975,
    farmLng: 73.7898,
    name: 'Farm-Fresh Desi Tomatoes',
    category: 'Vegetable',
    quantity: 120,
    unit: 'kg',
    pricePerUnit: 35,
    originalPrice: 42,
    discountPercent: 17,
    promotionalBadge: 'Direct Farm Harvest',
    status: 'available',
    organic: true,
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&q=80',
    description: 'Naturally vine-ripened indigenous desi tomatoes. High lycopene content, intense tangy flavour, completely free of synthetic ripening gas or waxes.',
    rating: 4.9,
    reviewsCount: 38,
    harvestDate: 'Harvested Today at 5:30 AM',
    batchId: 'BATCH-TOM-2026-88',
    nutritionalHighlights: ['Rich in Lycopene', 'Vitamin C 28%', 'Zero Chemical Wax'],
    shelfLife: '5-7 days at room temperature'
  },
  {
    id: 'prod_mangoes_anita',
    farmerId: 'usr_farmer_anita',
    farmName: 'Surya Sunburst Orchards',
    farmerName: 'Anita Ramesh Shinde',
    farmerLocation: 'Ratnagiri, Maharashtra',
    farmLat: 17.5186,
    farmLng: 73.1957,
    name: 'GI-Tagged Alphonso (Hapus) Mangoes',
    category: 'Fruit',
    quantity: 45,
    unit: 'dozen',
    pricePerUnit: 650,
    originalPrice: 750,
    discountPercent: 13,
    promotionalBadge: 'GI Tagged',
    status: 'available',
    organic: true,
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=800&q=80',
    description: 'Authentic Ratnagiri coastal GI Alphonso mangoes. Tree-ripened, straw-cured naturally without carbide. Golden saffron pulp with celestial aroma.',
    rating: 5.0,
    reviewsCount: 64,
    harvestDate: 'Tree-plucked Yesterday',
    batchId: 'BATCH-MNG-2026-42',
    nutritionalHighlights: ['Natural Beta-Carotene', 'No Calcium Carbide', 'GI-Certified'],
    shelfLife: '6-8 days'
  },
  {
    id: 'prod_strawberries_rajesh',
    farmerId: 'usr_farmer_rajesh',
    farmName: 'Green Valley Organic Agro Farm',
    farmerName: 'Rajesh Kumar Patil',
    farmerLocation: 'Nashik, Maharashtra (12 km away)',
    farmLat: 19.9975,
    farmLng: 73.7898,
    name: 'Sweet Ruby Strawberries (Winter Harvest)',
    category: 'Fruit',
    quantity: 60,
    unit: 'pack',
    pricePerUnit: 90,
    originalPrice: 110,
    discountPercent: 18,
    promotionalBadge: '18% OFF',
    status: 'available',
    organic: true,
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=800&q=80',
    description: 'Crisp, sweet, deep red strawberries grown in cool hill microclimate. Packed in breathable punnets right after morning plucking.',
    rating: 4.8,
    reviewsCount: 42,
    harvestDate: 'Harvested Today at 6:00 AM',
    batchId: 'BATCH-STR-2026-19',
    nutritionalHighlights: ['Antioxidant Rich', 'Vitamin C 58mg', 'Hand-Sorted'],
    shelfLife: '3-4 days refrigerated'
  },
  {
    id: 'prod_spinach_rajesh',
    farmerId: 'usr_farmer_rajesh',
    farmName: 'Green Valley Organic Agro Farm',
    farmerName: 'Rajesh Kumar Patil',
    farmerLocation: 'Nashik, Maharashtra (12 km away)',
    farmLat: 19.9975,
    farmLng: 73.7898,
    name: 'Tender Organic Baby Spinach (Palak)',
    category: 'Vegetable',
    quantity: 80,
    unit: 'kg',
    pricePerUnit: 25,
    originalPrice: 30,
    discountPercent: 17,
    promotionalBadge: '17% OFF / Save ₹5',
    status: 'available',
    organic: true,
    image: '/images/spinach.jpg',
    description: 'Fresh succulent baby spinach leaves nourished with vermicompost and drip canal water. Zero chemical wash, retain vivid dark emerald color.',
    rating: 4.9,
    reviewsCount: 29,
    harvestDate: 'Harvested 3 Hours Ago',
    batchId: 'BATCH-SPN-2026-05',
    nutritionalHighlights: ['Iron 3.6mg', 'Folate Booster', 'Zero Chemical Wash'],
    shelfLife: '3-5 days'
  },
  {
    id: 'prod_pomegranates_anita',
    farmerId: 'usr_farmer_anita',
    farmName: 'Surya Sunburst Orchards',
    farmerName: 'Anita Ramesh Shinde',
    farmerLocation: 'Ratnagiri, Maharashtra',
    farmLat: 17.5186,
    farmLng: 73.1957,
    name: 'Bhagwa Ruby Pomegranate (Anar)',
    category: 'Fruit',
    quantity: 95,
    unit: 'kg',
    pricePerUnit: 140,
    originalPrice: 165,
    discountPercent: 15,
    promotionalBadge: '15% OFF',
    status: 'available',
    organic: true,
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&q=80',
    description: 'Export-grade Bhagwa variety pomegranates. Deep red soft arils, extremely sweet and juicy with soft seeds. Grown with bio-fertilizers.',
    rating: 4.9,
    reviewsCount: 51,
    harvestDate: 'Harvested 2 Days Ago',
    batchId: 'BATCH-POM-2026-31',
    nutritionalHighlights: ['Heart Healthy Polyphenols', 'Potassium Rich', 'Soft Seeds'],
    shelfLife: '14 days'
  },
  {
    id: 'prod_carrots_rajesh',
    farmerId: 'usr_farmer_rajesh',
    farmName: 'Green Valley Organic Agro Farm',
    farmerName: 'Rajesh Kumar Patil',
    farmerLocation: 'Nashik, Maharashtra (12 km away)',
    farmLat: 19.9975,
    farmLng: 73.7898,
    name: 'Sweet Crunchy Red Carrots (Gajar)',
    category: 'Vegetable',
    quantity: 110,
    unit: 'kg',
    pricePerUnit: 40,
    status: 'available',
    organic: true,
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=800&q=80',
    description: 'Traditional native red carrots grown in deep loose sandy loam soil. Naturally sweet, high moisture, ideal for fresh salads, juices, and halwa.',
    rating: 4.7,
    reviewsCount: 22,
    harvestDate: 'Dug Fresh Today',
    batchId: 'BATCH-CRT-2026-14',
    nutritionalHighlights: ['Beta-Carotene', 'Dietary Fiber', 'High Sugar Content'],
    shelfLife: '7-10 days'
  },
  {
    id: 'prod_cauliflower_rajesh',
    farmerId: 'usr_farmer_rajesh',
    farmName: 'Green Valley Organic Agro Farm',
    farmerName: 'Rajesh Kumar Patil',
    farmerLocation: 'Nashik, Maharashtra (12 km away)',
    farmLat: 19.9975,
    farmLng: 73.7898,
    name: 'Pure White Organic Cauliflower',
    category: 'Vegetable',
    quantity: 75,
    unit: 'kg',
    pricePerUnit: 35,
    status: 'available',
    organic: true,
    image: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?w=800&q=80',
    description: 'Tightly packed, milk-white cauliflower curds shielded naturally with broad wrapper leaves. Free of sulphur bleach or synthetic preservatives.',
    rating: 4.8,
    reviewsCount: 19,
    harvestDate: 'Harvested Today',
    batchId: 'BATCH-CLF-2026-11',
    nutritionalHighlights: ['No Bleach Treatment', 'Vitamin K', 'Crisp Texture'],
    shelfLife: '5-7 days'
  },
  {
    id: 'prod_papaya_rajesh',
    farmerId: 'usr_farmer_rajesh',
    farmName: 'Green Valley Organic Agro Farm',
    farmerName: 'Rajesh Kumar Patil',
    farmerLocation: 'Nashik, Maharashtra (12 km away)',
    farmLat: 19.9975,
    farmLng: 73.7898,
    name: 'Taiwan 786 Red Lady Sweet Papaya',
    category: 'Fruit',
    quantity: 50,
    unit: 'kg',
    pricePerUnit: 35,
    status: 'available',
    organic: true,
    image: 'https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?w=800&q=80',
    description: 'Thick reddish-orange sweet flesh with high brix sweetness index. Great for digestion, tree-ripened without any artificial carbide exposure.',
    rating: 4.8,
    reviewsCount: 26,
    harvestDate: 'Harvested Yesterday',
    batchId: 'BATCH-PAP-2026-07',
    nutritionalHighlights: ['Papain Digestive Enzyme', 'Vitamin A', 'Natural Sweetness'],
    shelfLife: '4-6 days'
  },
  {
    id: 'prod_basmati_heritage',
    farmerId: 'usr_farmer_rajesh',
    farmName: 'Green Valley Organic Agro Farm',
    farmerName: 'Rajesh Kumar Patil',
    farmerLocation: 'Nashik, Maharashtra',
    farmLat: 19.9975,
    farmLng: 73.7898,
    name: 'Aged Traditional Basmati Rice (1121)',
    category: 'Grain',
    quantity: 200,
    unit: 'kg',
    pricePerUnit: 120,
    status: 'available',
    organic: true,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&q=80',
    description: 'Aged for 2 years in traditional aerated granaries. Extra-long pearl grains that elongate to over 22mm on cooking with rich authentic aroma.',
    rating: 4.9,
    reviewsCount: 45,
    harvestDate: 'Aged Season Harvest',
    batchId: 'BATCH-RCE-2026-92',
    nutritionalHighlights: ['Low GI', 'Aged 2 Years', 'Non-GMO Heritage Seed'],
    shelfLife: '18 months'
  },
  {
    id: 'prod_desi_ghee',
    farmerId: 'usr_farmer_rajesh',
    farmName: 'Green Valley Organic Agro Farm',
    farmerName: 'Rajesh Kumar Patil',
    farmerLocation: 'Nashik, Maharashtra',
    farmLat: 19.9975,
    farmLng: 73.7898,
    name: 'Desi Gir Cow A2 Vedic Bilona Ghee',
    category: 'Dairy & Honey',
    quantity: 35,
    unit: 'litre',
    pricePerUnit: 1450,
    status: 'available',
    organic: true,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&q=80',
    description: 'Made from free-grazing grass-fed Gir cows using traditional wooden bilona churning of whole curd, slowly clarified over cow-dung flame.',
    rating: 5.0,
    reviewsCount: 78,
    harvestDate: 'Churned This Week',
    batchId: 'BATCH-GHEE-2026-14',
    nutritionalHighlights: ['100% A2 Beta-Casein', 'Wooden Bilona Method', 'Granular Danedar Texture'],
    shelfLife: '12 months'
  },
  {
    id: 'prod_raw_wild_honey',
    farmerId: 'usr_farmer_anita',
    farmName: 'Surya Sunburst Orchards',
    farmerName: 'Anita Ramesh Shinde',
    farmerLocation: 'Ratnagiri, Maharashtra',
    farmLat: 17.5186,
    farmLng: 73.1957,
    name: 'Raw Unprocessed Wild Forest Honey',
    category: 'Dairy & Honey',
    quantity: 40,
    unit: 'kg',
    pricePerUnit: 480,
    status: 'available',
    organic: true,
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&q=80',
    description: 'Directly harvested from bee boxes stationed in organic mango and acacia floral groves. Unfiltered, unheated, full of active pollen enzymes.',
    rating: 4.9,
    reviewsCount: 34,
    harvestDate: 'Fresh Comb Extraction',
    batchId: 'BATCH-HNY-2026-03',
    nutritionalHighlights: ['Unpasteurized', 'Natural Bee Pollen', 'Zero Added Invert Sugar'],
    shelfLife: '24 months'
  },
  {
    id: 'prod_organic_turmeric',
    farmerId: 'usr_farmer_anita',
    farmName: 'Surya Sunburst Orchards',
    farmerName: 'Anita Ramesh Shinde',
    farmerLocation: 'Ratnagiri, Maharashtra',
    farmLat: 17.5186,
    farmLng: 73.1957,
    name: 'Salem High-Curcumin Lakadong Turmeric Powder',
    category: 'Spices',
    quantity: 90,
    unit: 'kg',
    pricePerUnit: 220,
    status: 'available',
    organic: true,
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&q=80',
    description: 'Ground from shade-dried organic turmeric rhizomes boasting 6.8% curcumin content. Rich pungent aroma and vibrant natural golden color.',
    rating: 4.9,
    reviewsCount: 31,
    harvestDate: 'Milled This Month',
    batchId: 'BATCH-TRM-2026-18',
    nutritionalHighlights: ['Curcumin 6.8%', 'Stone Ground', 'Zero Lead Chromate'],
    shelfLife: '12 months'
  }
];

export const initialSlots: FarmSlot[] = [
  {
    id: 'slot_gv_weekend_morning',
    farmerId: 'usr_farmer_rajesh',
    farmName: 'Green Valley Organic Agro Farm',
    farmerName: 'Rajesh Kumar Patil',
    farmLocation: 'Survey No. 42, Dindori Road, Nashik, Maharashtra',
    farmLat: 19.9975,
    farmLng: 73.7898,
    date: '2026-10-18',
    startTime: '08:30 AM',
    endTime: '12:00 PM',
    maxVisitors: 20,
    bookedCount: 6,
    pricePerPerson: 250,
    activities: [
      'Guided Organic Field Walk & Soil Biology Tour',
      'Hands-on Strawberry & Tomato Picking (Keep 1 Basket)',
      'Desi Gir Cow Milking Demonstration',
      'Chulha Breakfast: Hot Jaggery Poha, Herbal Tea & Fresh Buttermilk'
    ],
    description: 'Escape the city rush and breathe clean farm air! Walk through lush vegetable rows, learn organic composting secrets, harvest your own salad basket, and enjoy authentic Maharashtrian farm breakfast.',
    photos: [
      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&q=80',
      'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=1200&q=80',
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&q=80'
    ],
    includesRefreshments: true,
    status: 'open'
  },
  {
    id: 'slot_gv_weekend_afternoon',
    farmerId: 'usr_farmer_rajesh',
    farmName: 'Green Valley Organic Agro Farm',
    farmerName: 'Rajesh Kumar Patil',
    farmLocation: 'Survey No. 42, Dindori Road, Nashik, Maharashtra',
    farmLat: 19.9975,
    farmLng: 73.7898,
    date: '2026-10-18',
    startTime: '03:30 PM',
    endTime: '06:30 PM',
    maxVisitors: 25,
    bookedCount: 12,
    pricePerPerson: 250,
    activities: [
      'Sunset Field Walk & Drip Irrigation Workshop',
      'Vegetable Picking Basket Harvest',
      'Tractor Ride Across Valley Orchard',
      'Farm Fresh Evening Refreshments & Sugarcane Juice'
    ],
    description: 'Catch the golden hour over green rolling hills. Experience a bumpy tractor ride, test soil health with digital sensors, pick fresh vegetables, and sip freshly crushed sugarcane juice.',
    photos: [
      'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=1200&q=80',
      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&q=80'
    ],
    includesRefreshments: true,
    status: 'open'
  },
  {
    id: 'slot_so_sunday_tour',
    farmerId: 'usr_farmer_anita',
    farmName: 'Surya Sunburst Orchards & Agro Tourism',
    farmerName: 'Anita Ramesh Shinde',
    farmLocation: 'Near Mango Heritage Valley, Guhagar Highway, Ratnagiri, Maharashtra',
    farmLat: 17.5186,
    farmLng: 73.1957,
    date: '2026-10-19',
    startTime: '09:00 AM',
    endTime: '01:00 PM',
    maxVisitors: 15,
    bookedCount: 8,
    pricePerPerson: 350,
    activities: [
      'Alphonso Mango Heritage Canopy Exploration',
      'Tree Grafting Masterclass with Anita Tai',
      'Traditional Jaggery & Aamras Preparation Demo',
      'Authentic Konkani Ukdiche Modak & Solkadhi Feast'
    ],
    description: 'Immerse in Konkan coastal orchard life! Learn how century-old Alphonso trees are preserved, watch master grafters work, pluck fruits, and relish steaming ukdiche modak and solkadhi.',
    photos: [
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&q=80',
      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&q=80'
    ],
    includesRefreshments: true,
    status: 'open'
  }
];

export const initialBookings: VisitBooking[] = [
  {
    id: 'book_1788991201',
    bookingCode: 'KS-VISIT-8041',
    slotId: 'slot_gv_weekend_morning',
    slotDetails: initialSlots[0],
    consumerId: 'usr_consumer_tanmay',
    consumerName: 'Tanmay Rao',
    consumerPhone: '+91 98765 43210',
    consumerEmail: 'tanmay.rao@outlook.com',
    visitDate: '2026-10-18',
    visitorCount: 3,
    totalPrice: 750,
    status: 'confirmed',
    qrCodeToken: 'KS-PASS-TANMAY-8041-CONFIRMED',
    createdAt: '2026-10-11T10:30:00.000Z'
  }
];

export const initialOrders: Order[] = [
  {
    id: 'ord_1001',
    orderNumber: 'KS-ORD-2026-9041',
    consumerId: 'usr_consumer_tanmay',
    consumerName: 'Tanmay Rao',
    consumerPhone: '+91 98765 43210',
    deliveryAddress: {
      street: 'Flat 402, Green Acres Apt, Baner-Pashan Link Road',
      city: 'Pune',
      district: 'Pune',
      state: 'Maharashtra',
      pincode: '411045'
    },
    items: [
      { product: initialProducts[0], quantity: 3 }, // Desi Tomatoes (3 kg)
      { product: initialProducts[2], quantity: 2 }, // Strawberries (2 packs)
      { product: initialProducts[3], quantity: 1 }  // Spinach (1 kg)
    ],
    subtotal: 310,
    deliveryFee: 40,
    discount: 0,
    total: 350,
    paymentMethod: 'upi',
    paymentStatus: 'paid',
    orderStatus: 'harvesting',
    createdAt: '2026-10-13T06:15:00.000Z',
    deliverySlot: 'Today Evening (5:00 PM - 8:00 PM)',
    trackingNumber: 'TRK-MH-99410',
    batchIds: ['BATCH-TOM-2026-88', 'BATCH-STR-2026-19', 'BATCH-SPN-2026-05'],
    farmerIds: ['usr_farmer_rajesh']
  },
  {
    id: 'ord_1002',
    orderNumber: 'KS-ORD-2026-8812',
    consumerId: 'usr_consumer_tanmay',
    consumerName: 'Tanmay Rao',
    consumerPhone: '+91 98765 43210',
    deliveryAddress: {
      street: 'Flat 402, Green Acres Apt, Baner-Pashan Link Road',
      city: 'Pune',
      district: 'Pune',
      state: 'Maharashtra',
      pincode: '411045'
    },
    items: [
      { product: initialProducts[1], quantity: 1 }, // Alphonso Mangoes (1 dozen)
      { product: initialProducts[9], quantity: 1 }  // A2 Gir Cow Ghee (1 litre)
    ],
    subtotal: 2100,
    deliveryFee: 0,
    discount: 100,
    total: 2000,
    paymentMethod: 'card',
    paymentStatus: 'paid',
    orderStatus: 'delivered',
    createdAt: '2026-10-10T14:20:00.000Z',
    deliverySlot: 'Delivered On 11th Oct',
    trackingNumber: 'TRK-MH-77218',
    batchIds: ['BATCH-MNG-2026-42', 'BATCH-GHEE-2026-14'],
    farmerIds: ['usr_farmer_anita', 'usr_farmer_rajesh']
  }
];

export const initialLaborGroups: LaborGroup[] = [
  {
    id: 'grp_1',
    groupName: 'Shivaji Agro Labor Cooperative',
    leaderName: 'Babanrao Shinde',
    phone: '+91 94230 55123',
    availableWorkers: 18,
    location: 'Saswad - Haveli Belt, Pune',
    specialties: ['Harvesting & Picking', 'Post-Harvest Sorting & Packing', 'Sowing & Transplantation'],
    dailyRateEstimate: '₹500 - ₹600 / day',
    rating: 4.9,
    verified: true,
    distanceKm: 4.5
  },
  {
    id: 'grp_2',
    groupName: 'Kisan Shakti Mahila Krishi Sangh',
    leaderName: 'Sunita Gaikwad',
    phone: '+91 98901 22345',
    availableWorkers: 12,
    location: 'Dindori Taluka, Nashik',
    specialties: ['Weeding & De-stoning', 'Vegetable Harvesting', 'Seed Bed Preparation'],
    dailyRateEstimate: '₹450 - ₹550 / day',
    rating: 4.8,
    verified: true,
    distanceKm: 7.2
  },
  {
    id: 'grp_3',
    groupName: 'Gramin Kisan Seva Toli',
    leaderName: 'Santosh Jadhav',
    phone: '+91 97654 33211',
    availableWorkers: 25,
    location: 'Baramati Canal Zone, Pune',
    specialties: ['Tractor Operation', 'Canal Irrigation', 'Sugarcane Cutting', 'Heavy Tillage'],
    dailyRateEstimate: '₹550 - ₹700 / day',
    rating: 4.7,
    verified: true,
    distanceKm: 14.0
  },
  {
    id: 'grp_4',
    groupName: 'Sahyadri Harvester Crew',
    leaderName: 'Namdeo Patil',
    phone: '+91 96541 22987',
    availableWorkers: 15,
    location: 'Niphad Grape Valley, Nashik',
    specialties: ['Orchard Pruning', 'Fruit Plucking', 'Drip Trenching & Repairs'],
    dailyRateEstimate: '₹500 - ₹650 / day',
    rating: 4.9,
    verified: true,
    distanceKm: 9.8
  }
];

export const initialWorkerRequests: WorkerRequest[] = [
  {
    id: 'req_labor_1',
    requestCode: 'WRK-2026-081',
    farmerId: 'usr_farmer_rajesh',
    farmerName: 'Rajesh Kumar Patil',
    farmerPhone: '+91 98220 14567',
    farmName: 'Green Valley Organic Agro Farm',
    farmLocation: 'Survey No. 42, Dindori Road, Nashik',
    jobCategory: 'Harvesting & Picking',
    cropName: 'Desi Tomatoes & Bell Peppers',
    workersNeeded: 6,
    assignedWorkersCount: 6,
    startDate: '2026-10-15',
    endDate: '2026-10-17',
    durationDays: 3,
    workingHours: '07:30 AM - 04:30 PM',
    wagePerWorker: 550,
    foodStayProvided: true,
    status: 'matched',
    matchedGroupId: 'grp_1',
    matchedGroupName: 'Shivaji Agro Labor Cooperative',
    notes: 'Please bring cotton harvesting crates. Tea and noon vegetarian lunch provided at the farm.',
    createdAt: '2026-10-12T09:00:00.000Z'
  },
  {
    id: 'req_labor_2',
    requestCode: 'WRK-2026-089',
    farmerId: 'usr_farmer_rajesh',
    farmerName: 'Rajesh Kumar Patil',
    farmerPhone: '+91 98220 14567',
    farmName: 'Green Valley Organic Agro Farm',
    farmLocation: 'Survey No. 42, Dindori Road, Nashik',
    jobCategory: 'Weeding & De-stoning',
    cropName: 'Organic Baby Spinach Beds',
    workersNeeded: 4,
    assignedWorkersCount: 0,
    startDate: '2026-10-20',
    endDate: '2026-10-21',
    durationDays: 2,
    workingHours: '08:00 AM - 05:00 PM',
    wagePerWorker: 500,
    foodStayProvided: false,
    status: 'open',
    notes: 'Hand weeding required between drip lateral lines. Careful not to damage drip tubes.',
    createdAt: '2026-10-13T08:30:00.000Z'
  }
];

export const initialSchemes: Scheme[] = [
  {
    id: 'pm-kusum-solar',
    name: 'Pradhan Mantri Kisan Urja Suraksha evam Utthaan Mahabhiyan (PM-KUSUM)',
    shortName: 'PM-KUSUM Solar Water Pump',
    ministry: 'Ministry of New & Renewable Energy (MNRE)',
    category: 'Irrigation & Solar',
    subsidyPercentage: '60% Financial Subsidy (30% Central + 30% State)',
    maxSubsidyAmount: 'Up to ₹1,80,000 for 7.5 HP Solar Pump',
    summary: 'Enables farmers to install stand-alone solar agricultural water pumps or solarize existing grid-connected tube wells, slashing diesel and electricity costs to zero while earning revenue by selling excess power.',
    eligibility: [
      'Individual farmers, Water User Associations (WUAs), and FPOs',
      'Farmer must have verified land record and confirmed underground borewell or open well source',
      'Must not have received identical solar pump subsidy under any other central scheme in past 5 years'
    ],
    documentsRequired: [
      '7/12 Land Extract and 8A Land Record',
      'Aadhaar Card of Landholder',
      'Water source availability certificate / NOC from local Gram Panchayat',
      'Bank passbook copy with IFSC linked to DBT'
    ],
    keyBenefits: [
      '60% subsidy: Farmer pays only 10% to 40% of total solar equipment cost',
      'Uninterrupted daytime irrigation without relying on erratic night-time grid supply',
      '5-Year comprehensive manufacturer warranty and on-site maintenance',
      'Eliminates diesel pump running expense completely'
    ],
    howToApply: [
      'Visit state renewable energy portal (e.g. MahaUrja in Maharashtra, UPNEDA in UP)',
      'Click on "PM-KUSUM Component-B Solar Pump Application"',
      'Enter Aadhaar number and verify via OTP',
      'Select required pump capacity (3 HP, 5 HP, or 7.5 HP DC/AC)',
      'Upload 7/12 extract and pay farmer contribution token fee'
    ],
    officialPortalUrl: 'https://pmkusum.mnre.gov.in',
    portalName: 'pmkusum.mnre.gov.in',
    helpline: '1800-180-3333 (MNRE Toll-Free)',
    applicableStates: 'All States & UTs in India',
    targetFarmers: 'All Landholding Farmers',
    badge: '60% Solar Subsidy'
  },
  {
    id: 'pm-kisan-income',
    name: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
    shortName: 'PM-KISAN Direct Support',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    category: 'Financial Aid & Income',
    subsidyPercentage: '100% Direct Cash Transfer',
    directFinancialSupport: '₹6,000 / year (3 installments of ₹2,000 every 4 months)',
    summary: 'Direct income support scheme transferring ₹6,000 annually into the DBT-enabled bank accounts of eligible land-owning farmer families to meet timely agricultural inputs and household requirements.',
    eligibility: [
      'All landholding farmer families with cultivable land in their names',
      'Excludes institutional landholders and constitutional post holders or high income tax payees',
      'eKYC must be completed via Aadhaar-linked OTP or biometric CSC verification'
    ],
    documentsRequired: [
      'Aadhaar Card linked with active mobile number',
      'Land ownership record (RoR, 7/12, Patta)',
      'Active DBT-enabled bank account number'
    ],
    keyBenefits: [
      'Guaranteed ₹2,000 transferred directly every 4 months without delay',
      'Financial cushion for seeds, bio-fertilizers, and farm input purchases',
      'Seamless direct bank transfer with zero middleman deductions'
    ],
    howToApply: [
      'Go to official PM-KISAN portal (pmkisan.gov.in)',
      'Click on "Farmer Corner" and select "New Farmer Registration"',
      'Enter Aadhaar number, state, and captcha code',
      'Fill in land survey number, area, and bank particulars',
      'Complete biometric or OTP eKYC verification'
    ],
    officialPortalUrl: 'https://pmkisan.gov.in',
    portalName: 'pmkisan.gov.in',
    helpline: '155261 / 011-24300606',
    applicableStates: 'Pan-India',
    targetFarmers: 'Small & Marginal Farmers',
    badge: 'Direct Cash Transfer'
  },
  {
    id: 'pmksy-micro-irrigation',
    name: 'Pradhan Mantri Krishi Sinchayee Yojana (PMKSY) - Per Drop More Crop',
    shortName: 'PMKSY Drip & Sprinkler Subsidy',
    ministry: 'Department of Agriculture & Farmers Welfare',
    category: 'Irrigation & Solar',
    subsidyPercentage: '45% - 55% of total system cost',
    maxSubsidyAmount: 'Up to ₹60,000 per hectare for micro-irrigation',
    summary: 'Promotes efficient water usage through micro-irrigation technologies such as drip and sprinkler systems, saving up to 50% water while boosting crop yields by 30-40%.',
    eligibility: [
      'Farmers of all categories having an assured source of water on their farm',
      'Small & Marginal farmers receive 55% financial assistance',
      'Other farmers receive 45% financial assistance',
      'Cooperative societies, self-help groups, and FPOs are also eligible'
    ],
    documentsRequired: [
      'Land 7/12 and 8A extracts or land deed',
      'Water and electricity availability certificate / NOC',
      'Aadhaar card copy & mobile number',
      'Soil & water testing report (if requested by district agri office)'
    ],
    keyBenefits: [
      '55% subsidy on installation of complete drip & micro-sprinkler networks',
      'Saves 40% to 60% of water and 30% of electricity/fertilizer costs',
      'Minimizes weed growth and soil erosion',
      'Extends crop season during scarce summer months'
    ],
    howToApply: [
      'Log into state agriculture portal (e.g. MahaDBT, UP Agriculture, e-Dharti)',
      'Select "Micro Irrigation - PMKSY" under the Schemes tab',
      'Choose approved micro-irrigation manufacturer & local dealer',
      'Upload land map showing borewell/water reservoir location',
      'Field inspection is conducted by Taluka Agriculture Officer before subsidy disbursement'
    ],
    officialPortalUrl: 'https://pmksy.gov.in',
    portalName: 'pmksy.gov.in',
    helpline: '1800-180-1551',
    applicableStates: 'Pan-India',
    targetFarmers: 'Small & Marginal Farmers',
    badge: 'Save 50% Water'
  },
  {
    id: 'pmfby-crop-insurance',
    name: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    shortName: 'PMFBY Crop Insurance',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    category: 'Crop Insurance',
    subsidyPercentage: 'Nominal Premium: 1.5% to 2% only (Govt pays 90%+)',
    maxSubsidyAmount: '100% Sum Insured for natural disaster loss',
    summary: 'Comprehensive yield and weather-based crop insurance shielding farmers against non-preventable natural risks such as drought, floods, unseasonal hail, pests, and cyclones.',
    eligibility: [
      'All farmers growing notified crops in notified areas (both loanee and non-loanee farmers)',
      'Sharecroppers and tenant farmers eligible with self-declaration'
    ],
    documentsRequired: [
      'Land Revenue Document (7/12, RoR, LPC)',
      'Sowing Certificate / Crop Declaration issued by Village Patwari or Gram Sevak',
      'Aadhaar Card and Bank Account Passbook'
    ],
    keyBenefits: [
      'Farmers pay only 2% premium for Kharif crops, 1.5% for Rabi, 5% for horticultural cash crops',
      'Claim settlements directly credited to bank account via National Crop Insurance Portal',
      'Covers mid-season adversity, prevented sowing, and post-harvest localized losses'
    ],
    howToApply: [
      'Visit pmfby.gov.in or nearest Common Service Centre (CSC)',
      'Enter Aadhaar number and link bank passbook',
      'Select Kharif/Rabi season and specify crop and survey number',
      'Pay token premium online to receive instant insurance policy receipt'
    ],
    officialPortalUrl: 'https://pmfby.gov.in',
    portalName: 'pmfby.gov.in',
    helpline: '14447 (National PMFBY Helpline)',
    applicableStates: 'All Participating States',
    targetFarmers: 'All Farmers',
    badge: '1.5% Premium Shield'
  },
  {
    id: 'pkvy-organic-farming',
    name: 'Paramparagat Krishi Vikas Yojana (PKVY)',
    shortName: 'PKVY Organic Farming Scheme',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    category: 'Organic & Natural Farming',
    subsidyPercentage: '₹50,000 / hectare over 3 years',
    directFinancialSupport: '₹31,000 / ha directly for organic inputs (seeds, bio-fertilizers, vermicompost)',
    summary: 'Supports traditional organic and natural farming through cluster approach. Grants financial assistance for organic conversion, PGS certification, vermicompost units, and direct market linkages.',
    eligibility: [
      'Groups of farmers forming organic clusters of minimum 20 hectares or 50 farmers',
      'Individual farmers joining existing registered PGS-India organic clusters'
    ],
    documentsRequired: [
      'Cluster formation resolution & group member Aadhaar copies',
      'Land survey numbers list',
      'Cluster bank account details'
    ],
    keyBenefits: [
      '₹50,000/ha assistance for organic inputs, vermicompost pits, and packaging',
      'Free Participatory Guarantee System (PGS) Organic Certification',
      'Premium pricing on organic produce in local and export markets'
    ],
    howToApply: [
      'Form cluster with 20+ neighbouring farmers with help of local Taluka Agri Officer',
      'Register cluster on pgsin-india portal',
      'Submit cluster proposal to District Agri Officer for PKVY grant sanction'
    ],
    officialPortalUrl: 'https://daconet.dac.gov.in/pkvy/',
    portalName: 'pkvy.gov.in',
    helpline: '1800-180-1551',
    applicableStates: 'Pan-India',
    targetFarmers: 'Organic & Natural Farmers',
    badge: '₹50,000/ha Organic Aid'
  },
  {
    id: 'smam-farm-mechanization',
    name: 'Sub-Mission on Agricultural Mechanization (SMAM)',
    shortName: 'SMAM Farm Machinery Subsidy',
    ministry: 'Department of Agriculture & Farmers Welfare',
    category: 'Machinery & Equipment',
    subsidyPercentage: '40% - 50% Subsidy on Farm Machinery',
    maxSubsidyAmount: 'Up to ₹2,50,000 for tractors, power tillers & harvesters',
    summary: 'Subsidizes purchase of modern farm machinery including power tillers, tractors, seeders, mulchers, and automated sprayers to reduce drudgery and enhance field productivity.',
    eligibility: [
      'Small, marginal, SC/ST, and women farmers receive 50% subsidy',
      'General category farmers receive 40% subsidy',
      'Custom Hiring Centres (CHC) can receive up to 80% project assistance'
    ],
    documentsRequired: [
      'Land records (7/12 & 8A)',
      'Aadhaar card & Caste certificate (if claiming SC/ST subsidy)',
      'Quotation from registered machinery dealer'
    ],
    keyBenefits: [
      'Cuts machinery purchase cost in half',
      'Enables mechanization for smallholder farmers who previously relied on manual labor',
      'Boosts timeliness of sowing and harvesting'
    ],
    howToApply: [
      'Register on agrimachinery.nic.in portal',
      'Select desired equipment (e.g., Power Tiller or Laser Land Leveler)',
      'Upload dealer quotation and land documents',
      'Draw of lots / sanction letter issued by District Agriculture Engineer'
    ],
    officialPortalUrl: 'https://agrimachinery.nic.in',
    portalName: 'agrimachinery.nic.in',
    helpline: '011-23381012',
    applicableStates: 'All States',
    targetFarmers: 'Smallholders & FPOs',
    badge: 'Up to 50% Machinery Grant'
  }
];

export const initialEquipment: EquipmentItem[] = [
  {
    id: 'inst-power-tiller-7hp',
    name: 'BharatKrishi 7HP Multi-Speed Rotary Power Tiller',
    brand: 'BharatKrishi AgroTech',
    category: 'Land Preparation & Tillage',
    price: 38500,
    rentalPricePerDay: 450,
    originalPrice: 48000,
    subsidyEligible: true,
    subsidyBadge: 'Eligible for 40% SMAM Subsidy',
    powerSource: 'Petrol / Diesel',
    warrantyYears: 2,
    rating: 4.8,
    reviewsCount: 112,
    inStock: true,
    stockCount: 14,
    image: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?w=800&q=80',
    features: [
      'High torque 212cc 4-stroke air-cooled engine with easy recoil start',
      'Dual forward speeds + 1 reverse speed gear box for effortless turning in wet soil',
      'Adjustable 32-blade rotary tiller attachment with width 800mm to 1050mm',
      'Can be hitched with potato digger, ridger plough, and water pump'
    ],
    specifications: {
      'Engine Power': '7.0 HP @ 3600 RPM',
      'Tilling Width': '800 - 1050 mm',
      'Tilling Depth': '150 - 300 mm',
      'Fuel Tank': '3.6 Litres Petrol',
      'Weight': '82 kg'
    },
    description: 'The workhorse of small and medium farms. Effortlessly replaces 8 bullock hours in just 60 minutes for inter-cultivation, puddling, and weed clearing.'
  },
  {
    id: 'inst-battery-sprayer-16l',
    name: 'KisanShield 16L 2-in-1 Dual Battery Knapsack Sprayer',
    brand: 'KisanShield Tools',
    category: 'Spraying & Plant Protection',
    price: 2450,
    rentalPricePerDay: 75,
    originalPrice: 3200,
    subsidyEligible: true,
    subsidyBadge: 'Govt Approved ISI Mark',
    powerSource: 'Battery / Electric',
    warrantyYears: 1,
    rating: 4.7,
    reviewsCount: 184,
    inStock: true,
    stockCount: 35,
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80',
    features: [
      '12V / 12Ah heavy-duty rechargeable lead-acid battery provides 6-8 continuous hours spraying',
      'Dual switch: Variable pressure regulator knob + continuous full-speed switch',
      'Telescopic stainless steel lance extendable up to 3.5 feet with 4 brass nozzle tips',
      'Back cushioning ergonomic shoulder harness reduces spinal fatigue'
    ],
    specifications: {
      'Tank Capacity': '16 Litres UV-Stabilized Polypropylene',
      'Working Pressure': '0.15 - 0.4 MPa',
      'Spray Distance': '3 to 5 metres',
      'Battery Backup': '6-8 hours on single charge',
      'Weight': '5.2 kg (Empty)'
    },
    description: 'Spray bio-pesticides, neem oil, and foliar nutrients with uniform mist pressure without the exhausting hand-pumping of traditional manual sprayers.'
  },
  {
    id: 'inst-drip-irrigation-1acre',
    name: 'JalSetu Complete 1-Acre Micro-Drip Irrigation Kit',
    brand: 'JalSetu Precision Agro',
    category: 'Micro-Irrigation',
    price: 18500,
    rentalPricePerDay: 0,
    originalPrice: 24000,
    subsidyEligible: true,
    subsidyBadge: '55% PMKSY Subsidy Applicable',
    powerSource: 'Manual',
    warrantyYears: 3,
    rating: 4.9,
    reviewsCount: 76,
    inStock: true,
    stockCount: 20,
    image: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=800&q=80',
    features: [
      'Complete modular 1-acre kit: includes 1000m 16mm inline drip lateral with 40cm emitter spacing',
      'Includes Disc filter, venturi fertilizer injector manifold, control valves, and joiners',
      'Clog-resistant labyrinth drippers delivering uniform 2.4 LPH discharge per emitter',
      'Saves 55% water and prevents nutrient leaching directly to root zones'
    ],
    specifications: {
      'Lateral Pipe': '16mm Virgin HDPE with UV inhibitors (1000 metres)',
      'Emitter Spacing': '40 cm inline',
      'Discharge Rate': '2.4 Litres / Hour per emitter',
      'Filtration': '120 Mesh / 130 Micron Disc Filter',
      'Operating Pressure': '1.0 - 2.5 kg/cm²'
    },
    description: 'Engineered specifically for vegetables, row crops, and fruit orchards. Conserves precious groundwater while enhancing crop yield by 35% through precision fertigation.'
  },
  {
    id: 'inst-solar-pump-3hp',
    name: 'SuryaShakti 3HP DC Submersible Solar Borewell Pump',
    brand: 'SuryaShakti Energy',
    category: 'Solar & Pumping',
    price: 89000,
    rentalPricePerDay: 0,
    originalPrice: 140000,
    subsidyEligible: true,
    subsidyBadge: '60% PM-KUSUM Subsidy Available',
    powerSource: 'Solar',
    warrantyYears: 5,
    rating: 4.9,
    reviewsCount: 42,
    inStock: true,
    stockCount: 8,
    image: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=800&q=80',
    features: [
      'High efficiency brushless DC (BLDC) motor with stainless steel pump casing',
      'MPPT intelligent controller with dry run protection and automatic sun-tracking restart',
      'Operates from early 7:30 AM sunrise to 5:30 PM sunset without grid power dependence',
      'Zero diesel cost: Pays for itself in under 2 crop seasons'
    ],
    specifications: {
      'Power Rating': '3.0 HP / 2.2 kW BLDC Motor',
      'Head Range': '40 to 90 metres',
      'Max Water Discharge': '72,000 Litres / Day (Under bright sun)',
      'Solar Panel Array': '3000 Watt Mono-crystalline',
      'Warranty': '5 Years Comprehensive'
    },
    description: 'Liberate your farm from irregular power cuts and expensive diesel bills. Delivers reliable, abundant irrigation water straight from borewell depths.'
  },
  {
    id: 'inst-manual-seed-planter',
    name: 'DhartiRatan Dual-Hopper Hand-Push Precision Seed & Fertilizer Planter',
    brand: 'DhartiRatan Farm Tools',
    category: 'Hand & Planting Tools',
    price: 2850,
    rentalPricePerDay: 60,
    originalPrice: 3800,
    subsidyEligible: true,
    subsidyBadge: 'National Innovation Awardee',
    powerSource: 'Manual',
    warrantyYears: 2,
    rating: 4.7,
    reviewsCount: 88,
    inStock: true,
    stockCount: 25,
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&q=80',
    features: [
      'Dual-hopper mechanism deposits seed and basal fertilizer simultaneously at adjustable depths',
      'Plant standing upright without bending, protecting back and knees from strain',
      'Interchangeable seed metering wheels for Maize, Cotton, Soybean, Groundnut, Wheat & Chickpeas',
      'Saves 80% labor: One operator can sow 1 to 1.5 acres per day easily'
    ],
    specifications: {
      'Sowing Depth': '3.5 - 7.8 cm (adjustable)',
      'Seed Capacity': '3 kg hopper',
      'Fertilizer Capacity': '3 kg hopper',
      'Material': 'High-strength alloy steel beak with transparent acrylic seed box',
      'Weight': '8.4 kg'
    },
    description: 'Plant row crops at exact, uniform depth and spacing without bending down all day. The dual hopper deposits seed and fertilizer 4 cm apart so seeds do not suffer fertilizer burn.'
  },
  {
    id: 'inst-fruit-picker-pole',
    name: 'Baghban Telescopic 13-Foot Stainless Steel Fruit Harvester Pole',
    brand: 'Baghban Tools',
    category: 'Harvesting & Cutting',
    price: 1350,
    rentalPricePerDay: 40,
    originalPrice: 1999,
    subsidyEligible: false,
    powerSource: 'Manual',
    warrantyYears: 1,
    rating: 4.8,
    reviewsCount: 154,
    inStock: true,
    stockCount: 50,
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=800&q=80',
    features: [
      'Sturdy stainless steel telescopic pole with flip-cam locks extendable from 5 to 13 feet',
      'Deep padded harvesting basket with dual foam sponge pads prevents fruit bruising',
      'Sharpened stainless collection teeth pluck stems gently with a light twist',
      'Ideal for harvesting Mangoes, Guavas, Avocados, Oranges, Apples, and Pears safely from ground'
    ],
    specifications: {
      'Length': '1.5m to 4.0m (5 to 13 feet)',
      'Basket Dimensions': '34 cm x 15 cm deep',
      'Weight': '1.35 kg (ultra lightweight)',
      'Material': 'Aircraft Grade Stainless Steel & Anti-Rust Coating'
    },
    description: 'Harvest delicate orchard fruits safely from ground level without shaking trees or risking ladder falls. Cushioned collection basket guarantees zero fruit drops or skin bruises.'
  }
];

export const initialMandiRates: MandiRate[] = [
  {
    id: 'mandi_1',
    commodity: 'Tomato (Desi)',
    market: 'Nashik APMC',
    state: 'Maharashtra',
    variety: 'Hybrid / Desi',
    minPrice: 2800,
    maxPrice: 3600,
    modalPrice: 3200, // per quintal = ₹32/kg
    trend: 'up',
    change: '+₹300/qtl',
    updatedAt: 'Today, 10:00 AM'
  },
  {
    id: 'mandi_2',
    commodity: 'Onion (Gavran Red)',
    market: 'Lasalgaon APMC',
    state: 'Maharashtra',
    variety: 'Red Lasalgaon',
    minPrice: 2200,
    maxPrice: 2850,
    modalPrice: 2600,
    trend: 'stable',
    change: '0.0%',
    updatedAt: 'Today, 09:30 AM'
  },
  {
    id: 'mandi_3',
    commodity: 'Alphonso Mango',
    market: 'Vashi APMC (Navi Mumbai)',
    state: 'Maharashtra',
    variety: 'Ratnagiri A-Grade',
    minPrice: 50000,
    maxPrice: 75000,
    modalPrice: 65000,
    trend: 'up',
    change: '+5.2%',
    updatedAt: 'Today, 11:15 AM'
  },
  {
    id: 'mandi_4',
    commodity: 'Wheat (Sharbati)',
    market: 'Indore APMC',
    state: 'Madhya Pradesh',
    variety: 'Sharbati Premium',
    minPrice: 2750,
    maxPrice: 3400,
    modalPrice: 3100,
    trend: 'up',
    change: '+₹80/qtl',
    updatedAt: 'Today, 10:45 AM'
  },
  {
    id: 'mandi_5',
    commodity: 'Soybean (Yellow)',
    market: 'Akola APMC',
    state: 'Maharashtra',
    variety: 'Yellow 9305',
    minPrice: 4200,
    maxPrice: 4750,
    modalPrice: 4500,
    trend: 'down',
    change: '-₹50/qtl',
    updatedAt: 'Today, 10:15 AM'
  },
  {
    id: 'mandi_6',
    commodity: 'Basmati Rice (Paddy 1121)',
    market: 'Karnal APMC',
    state: 'Haryana',
    variety: 'Pusa 1121',
    minPrice: 4100,
    maxPrice: 4850,
    modalPrice: 4600,
    trend: 'up',
    change: '+₹120/qtl',
    updatedAt: 'Today, 09:00 AM'
  }
];

export const initialExpenses: FarmExpense[] = [
  {
    id: 'exp_1',
    farmerId: 'usr_farmer_rajesh',
    date: '2026-10-12',
    category: 'Labour Wages',
    amount: 3300,
    description: 'Paid Shivaji Agro Labor (6 workers @ ₹550 for morning tomato plucking)'
  },
  {
    id: 'exp_2',
    farmerId: 'usr_farmer_rajesh',
    date: '2026-10-09',
    category: 'Seeds & Saplings',
    amount: 2400,
    description: 'Purchased certified heirloom strawberry runner saplings for Plot C'
  },
  {
    id: 'exp_3',
    farmerId: 'usr_farmer_rajesh',
    date: '2026-10-05',
    category: 'Organic Fertiliser & Manure',
    amount: 4200,
    description: '3 Trolleys aged Gir cow vermicompost delivered from local gaushala'
  },
  {
    id: 'exp_4',
    farmerId: 'usr_farmer_rajesh',
    date: '2026-10-01',
    category: 'Irrigation & Repairs',
    amount: 850,
    description: 'Replaced 4 drip flush valves and lateral grommets on Sector 2'
  }
];

export const initialReviews: Review[] = [
  {
    id: 'rev_1',
    productId: 'prod_tomatoes_rajesh',
    consumerName: 'Pooja Kulkarni (Kothrud, Pune)',
    rating: 5,
    comment: 'These are what tomatoes used to taste like 20 years ago! Tangy, juicy, and so fresh. My family made rasam and salads. Highly recommend Rajesh Patil farm.',
    date: '2026-10-12',
    verifiedBuyer: true
  },
  {
    id: 'rev_2',
    productId: 'prod_mangoes_anita',
    consumerName: 'Dr. Sameer Mehta (Bandra, Mumbai)',
    rating: 5,
    comment: 'Authentic Ratnagiri Devgad mangoes without any chemical ripening smell. The packaging was immaculate. Glad to bypass middlemen and pay directly to Anita tai.',
    date: '2026-10-10',
    verifiedBuyer: true
  },
  {
    id: 'rev_3',
    productId: 'prod_desi_ghee',
    consumerName: 'Meenakshi Iyer (Aundh, Pune)',
    rating: 5,
    comment: 'Pure granular yellow bilona ghee with divine earthy aroma. You can tell it is genuine whole-curd churned. Worth every single rupee.',
    date: '2026-10-08',
    verifiedBuyer: true
  }
];
