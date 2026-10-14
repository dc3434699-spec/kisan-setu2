export type UserRole = 'farmer' | 'consumer' | 'worker' | 'admin';

export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  location?: {
    address: string;
    village?: string;
    district: string;
    state: string;
    pincode: string;
    lat?: number;
    lng?: number;
  };
  farmerProfile?: {
    farmName: string;
    surveyNumber?: string;
    landArea: number; // in acres
    landAreaUnit: 'acre' | 'hectare' | 'bigha';
    soilType: 'Black Cotton' | 'Red Loamy' | 'Alluvial' | 'Laterite' | 'Sandy Loam';
    irrigationType: 'Drip Irrigation' | 'Sprinkler' | 'Canal Water' | 'Borewell' | 'Rainfed';
    farmingStyle: '100% Organic' | 'Natural Farming (SPNF)' | 'Integrated / Conventional';
    cropsGrown: string[];
    bio?: string;
    kisanCreditCardNo?: string;
    organicCertified: boolean;
    bannerImage?: string;
  };
  workerProfile?: {
    teamName?: string;
    isLeader: boolean;
    availableWorkers: number;
    specialties: string[];
    dailyRate: number;
    experienceYears: number;
  };
}

export interface Product {
  id: string;
  farmerId: string;
  farmName: string;
  farmerName: string;
  farmerLocation: string;
  farmLat: number;
  farmLng: number;
  name: string;
  category: 'Vegetable' | 'Fruit' | 'Grain' | 'Dairy & Honey' | 'Spices' | 'Organic Special';
  quantity: number;
  unit: 'kg' | 'g' | 'dozen' | 'litre' | 'pack';
  pricePerUnit: number;
  status: 'available' | 'low_stock' | 'sold_out';
  organic: boolean;
  image: string;
  description: string;
  rating: number;
  reviewsCount: number;
  harvestDate: string;
  batchId: string;
  nutritionalHighlights?: string[];
  shelfLife?: string;
}

export interface Review {
  id: string;
  productId: string;
  consumerName: string;
  rating: number;
  comment: string;
  date: string;
  verifiedBuyer: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  consumerId: string;
  consumerName: string;
  consumerPhone: string;
  deliveryAddress: {
    street: string;
    city: string;
    district: string;
    state: string;
    pincode: string;
  };
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  paymentMethod: 'cod' | 'upi' | 'card' | 'netbanking';
  paymentStatus: 'paid' | 'pending';
  orderStatus: 'placed' | 'confirmed' | 'harvesting' | 'packed' | 'dispatched' | 'delivered' | 'cancelled';
  createdAt: string;
  deliverySlot: string;
  trackingNumber: string;
  batchIds: string[];
  farmerIds: string[];
}

export interface FarmSlot {
  id: string;
  farmerId: string;
  farmName: string;
  farmerName: string;
  farmLocation: string;
  farmLat: number;
  farmLng: number;
  date: string;
  endDate?: string;
  startTime: string;
  endTime: string;
  maxVisitors: number;
  bookedCount: number;
  pricePerPerson: number;
  activities: string[];
  description: string;
  photos: string[];
  includesRefreshments: boolean;
  status: 'open' | 'full' | 'paused';
}

export interface VisitBooking {
  id: string;
  bookingCode: string;
  slotId: string;
  slotDetails: FarmSlot;
  consumerId: string;
  consumerName: string;
  consumerPhone: string;
  consumerEmail: string;
  visitDate: string;
  visitorCount: number;
  totalPrice: number;
  status: 'confirmed' | 'attended' | 'cancelled';
  qrCodeToken: string;
  createdAt: string;
}

export interface LaborGroup {
  id: string;
  groupName: string;
  leaderName: string;
  phone: string;
  availableWorkers: number;
  location: string;
  specialties: string[];
  dailyRateEstimate: string;
  rating: number;
  verified: boolean;
  distanceKm: number;
}

export interface WorkerRequest {
  id: string;
  requestCode: string;
  farmerId: string;
  farmerName: string;
  farmerPhone: string;
  farmName: string;
  farmLocation: string;
  jobCategory: 'Harvesting & Picking' | 'Weeding & De-stoning' | 'Spray Application' | 'Irrigation & Trenching' | 'Tractor & Tiller Operation' | 'Post-Harvest Sorting' | 'General Farm Work';
  cropName: string;
  workersNeeded: number;
  assignedWorkersCount: number;
  startDate: string;
  endDate: string;
  durationDays: number;
  workingHours: string;
  wagePerWorker: number;
  foodStayProvided: boolean;
  status: 'open' | 'matched' | 'in_progress' | 'completed' | 'cancelled';
  matchedGroupId?: string;
  matchedGroupName?: string;
  notes?: string;
  createdAt: string;
}

export interface Scheme {
  id: string;
  name: string;
  shortName: string;
  ministry: string;
  category: 'Financial Aid & Income' | 'Irrigation & Solar' | 'Crop Insurance' | 'Organic & Natural Farming' | 'Machinery & Equipment' | 'Credit & Loan';
  subsidyPercentage: string;
  directFinancialSupport?: string;
  maxSubsidyAmount?: string;
  summary: string;
  eligibility: string[];
  documentsRequired: string[];
  keyBenefits: string[];
  howToApply: string[];
  officialPortalUrl: string;
  portalName: string;
  helpline: string;
  applicableStates: string;
  targetFarmers: string;
  badge: string;
}

export interface EquipmentItem {
  id: string;
  name: string;
  brand: string;
  category: 'Land Preparation & Tillage' | 'Spraying & Plant Protection' | 'Micro-Irrigation' | 'Solar & Pumping' | 'Harvesting & Cutting' | 'Soil Testing & Sensors' | 'Hand & Planting Tools';
  price: number;
  rentalPricePerDay?: number;
  originalPrice: number;
  subsidyEligible: boolean;
  subsidyBadge?: string;
  powerSource: 'Manual' | 'Battery / Electric' | 'Petrol / Diesel' | 'Solar';
  warrantyYears: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockCount: number;
  image: string;
  features: string[];
  specifications: Record<string, string>;
  description: string;
}

export interface EquipmentOrder {
  id: string;
  equipmentId: string;
  equipmentName: string;
  userId: string;
  userName: string;
  orderType: 'buy' | 'rent';
  rentalDays?: number;
  totalAmount: number;
  status: 'processing' | 'shipped' | 'delivered';
  createdAt: string;
}

export interface MandiRate {
  id: string;
  commodity: string;
  market: string;
  state: string;
  variety: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  trend: 'up' | 'down' | 'stable';
  change: string;
  updatedAt: string;
}

export interface FarmExpense {
  id: string;
  farmerId: string;
  date: string;
  category: 'Seeds & Saplings' | 'Organic Fertiliser & Manure' | 'Labour Wages' | 'Equipment Diesel / Electricity' | 'Irrigation & Repairs' | 'Packaging & Transport';
  amount: number;
  description: string;
}
