import { UserRole } from '../types';

export interface DemoAccountConfig {
  id: string;
  username: string;
  displayName: string;
  role: UserRole;
  email: string;
  phone: string;
  demoPassword: string; // Used for demo login validation
  title: string;
  shortDescription: string;
  primaryView: string;
  avatar: string;
  badgeColor: string;
  badgeBg: string;
  keyFeatures: string[];
}

export const DEMO_ACCOUNTS: DemoAccountConfig[] = [
  {
    id: 'usr_farmer_rajesh',
    username: 'rajesh_farmer',
    displayName: 'Rajesh Kumar Patil',
    role: 'farmer',
    email: 'rajesh@greenvalley.in',
    phone: '+91 98220 14567',
    demoPassword: 'kisan123',
    title: 'Lead Organic Farmer',
    shortDescription: '18-Acre Natural Farm (Nashik). Manages Desi Tomatoes, Palak, Strawberries, and incoming orders.',
    primaryView: 'farmer-dashboard',
    avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&q=80',
    badgeColor: 'text-emerald-800 border-emerald-300',
    badgeBg: 'bg-emerald-50 hover:bg-emerald-100',
    keyFeatures: [
      '10-Module Farmer ERP suite',
      'Inventory CRUD & live stock update',
      'Direct consumer order dispatch',
      'Farm tour weekend slot management'
    ]
  },
  {
    id: 'usr_farmer_anita',
    username: 'anita_orchards',
    displayName: 'Anita Ramesh Shinde',
    role: 'farmer',
    email: 'anita@suryasunburst.in',
    phone: '+91 98450 78123',
    demoPassword: 'kisan123',
    title: 'Fruit Orchardist & Agro-Host',
    shortDescription: '24-Acre Konkan Orchard (Ratnagiri). Specialises in GI Alphonso Mangoes and ruby Bhagwa Pomegranates.',
    primaryView: 'farmer-dashboard',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80',
    badgeColor: 'text-amber-800 border-amber-300',
    badgeBg: 'bg-amber-50 hover:bg-amber-100',
    keyFeatures: [
      'Orchard management & GI harvest batches',
      'Agro-tourism farm visit passes',
      'Organic bio-dynamic composting ledger'
    ]
  },
  {
    id: 'usr_consumer_tanmay',
    username: 'tanmay123',
    displayName: 'Tanmay Rao',
    role: 'consumer',
    email: 'tanmay.rao@outlook.com',
    phone: '+91 98765 43210',
    demoPassword: 'kisan123',
    title: 'Farm2Home Direct Consumer',
    shortDescription: 'Urban Family Shopper (Pune). Experiences farm-direct zero-middleman ordering and tour bookings.',
    primaryView: 'marketplace',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80',
    badgeColor: 'text-blue-800 border-blue-300',
    badgeBg: 'bg-blue-50 hover:bg-blue-100',
    keyFeatures: [
      'Direct farm produce marketplace & cart',
      'Coupon codes: KISAN50 & FIRSTFARM',
      'Live 5-stage farm-to-door tracking',
      'Farm stay QR pass booking'
    ]
  },
  {
    id: 'usr_worker_suresh',
    username: 'suresh_worker',
    displayName: 'Babanrao Shinde',
    role: 'worker',
    email: 'babanrao@shivajilabor.in',
    phone: '+91 94230 55123',
    demoPassword: 'kisan123',
    title: 'Agro Labour Co-op Leader',
    shortDescription: 'Shivaji Agro Labour Cooperative (Saswad). Manages 18 skilled agricultural workers for harvesting.',
    primaryView: 'labour',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    badgeColor: 'text-indigo-800 border-indigo-300',
    badgeBg: 'bg-indigo-50 hover:bg-indigo-100',
    keyFeatures: [
      'Verified rural workforce directory',
      'Daily wage contracts & seasonal bookings',
      'Farm job applications and skill badges'
    ]
  },
  {
    id: 'usr_admin',
    username: 'admin',
    displayName: 'KisanSetu Platform Admin',
    role: 'admin',
    email: 'admin@kisansetu.gov.in',
    phone: '+91 1800 180 1551',
    demoPassword: 'admin123',
    title: 'Central Ecosystem Oversight',
    shortDescription: 'State Agricultural Technology Board. Oversees GMV, farmer KYC, order dispute resolution, and analytics.',
    primaryView: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
    badgeColor: 'text-purple-800 border-purple-300',
    badgeBg: 'bg-purple-50 hover:bg-purple-100',
    keyFeatures: [
      'Platform GMV & volume analytics',
      'Farmer KYC verification pipeline',
      'Government subsidy disbursement monitor',
      'System-wide audit log and reports'
    ]
  }
];

export const DEMO_PASSWORD_DEFAULT = 'kisan123';
