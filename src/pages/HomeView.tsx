import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import {
  Sprout,
  ShoppingBag,
  Sparkles,
  QrCode,
  ShieldCheck,
  Compass,
  FileText,
  Wrench,
  Users,
  ArrowRight,
  Star,
  CheckCircle2,
  ChevronDown,
  Plus,
  Minus,
  MapPin,
  TrendingUp,
  Heart,
  HelpCircle,
  Truck
} from 'lucide-react';
import { Product, FarmSlot } from '../types';

interface HomeViewProps {
  setCurrentView: (view: string) => void;
  onSelectProduct: (p: Product) => void;
  onSelectSlot: (s: FarmSlot) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  setCurrentView,
  onSelectProduct,
  onSelectSlot
}) => {
  const { products, addToCart, openTraceability, slots, schemes, equipment, laborGroups } = useStore();
  const { currentUser, loginAsDemo, openAuthModal } = useAuth();
  const { t } = useLanguage();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [heroSearch, setHeroSearch] = useState('');

  const categories = [
    { id: 'all', label: 'All Harvest', icon: '🌾' },
    { id: 'Vegetable', label: 'Vegetables', icon: '🥦' },
    { id: 'Fruit', label: 'Fruits', icon: '🍎' },
    { id: 'Grain', label: 'Grains & Rice', icon: '🌾' },
    { id: 'Dairy & Honey', label: 'Dairy & Wild Honey', icon: '🍯' },
    { id: 'Spices', label: 'Natural Spices', icon: '🌶️' }
  ];

  const filteredProducts = products.filter(p => {
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      !heroSearch ||
      p.name.toLowerCase().includes(heroSearch.toLowerCase()) ||
      p.farmName.toLowerCase().includes(heroSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const faqs = [
    {
      q: 'How does KisanSetu guarantee 100% direct farm traceability?',
      a: 'Every produce crate is assigned a unique Batch ID right at morning harvest. The QR code links directly to field GPS coordinates, soil organic matter tests, residue laboratory certifications (0.00 ppm chemical residue), and exact time of plucking.'
    },
    {
      q: 'How are farmers paid more on KisanSetu compared to APMC Mandis?',
      a: 'Traditional agricultural supply chains have 4 to 6 tiers of commission agents, brokers, and mandi auctions taking 35-50% margins. KisanSetu connects buyers directly to the farm gate, passing +42% higher direct payouts to farmers while keeping prices affordable for consumers.'
    },
    {
      q: 'What happens during a Farm Visit / Agro-Tourism slot?',
      a: 'Families and visitors enjoy guided walks through fruit orchards and vegetable rows, participate in strawberry or tomato picking, witness traditional Gir cow milking, experience tractor rides, and savor authentic chulha-cooked farm breakfasts and meals.'
    },
    {
      q: 'How can farmers book agricultural labour teams on the platform?',
      a: 'Farmers can submit a Labour Request specifying crop, number of workers, daily wage, and dates. Verified local agricultural labor cooperatives (such as Shivaji Agro Labor) are instantly matched and dispatched with attendance tracking.'
    },
    {
      q: 'Are government subsidies accessible directly through KisanSetu?',
      a: 'Yes! We feature comprehensive guides, eligibility calculators, and application shortcuts for top schemes like PM-KUSUM (60% Solar Pump subsidy), PMKSY (55% Micro-irrigation), PM-KISAN, and SMAM farm mechanization grants.'
    }
  ];

  return (
    <div className="space-y-16 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-14 bg-gradient-to-b from-[#EBF1E8]/70 via-[#FAF9F6] to-[#FAF9F6] border-b border-[#E5E0D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
                <span>Direct From Earth • 100% Lab Traceable</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#1B3B22] tracking-tight leading-[1.15]">
                Connecting the Farmer <span className="text-[#1B5E3B] underline decoration-amber-400 decoration-wavy decoration-2">Directly</span> to the Consumer.
              </h1>

              <p className="text-sm sm:text-base text-gray-700 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                A unified agricultural digital ecosystem connecting farmers, conscious consumers, labour cooperatives, machinery providers, and government subsidies under one digital roof.
              </p>

              {/* Quick Search Bar */}
              <div className="max-w-md mx-auto lg:mx-0 flex items-center bg-white border-2 border-[#1B5E3B]/40 rounded-2xl p-1.5 shadow-md">
                <input
                  type="text"
                  placeholder={t('searchPlaceholder')}
                  value={heroSearch}
                  onChange={e => setHeroSearch(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs text-[#2D3A26] bg-transparent focus:outline-hidden"
                />
                <button
                  onClick={() => setCurrentView('marketplace')}
                  className="px-4 py-2 bg-[#1B5E3B] hover:bg-[#2D5A27] text-white text-xs font-bold rounded-xl transition-colors shadow-xs flex items-center gap-1.5"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Quick CTA Actions */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <button
                  onClick={() => setCurrentView('marketplace')}
                  className="px-5 py-3 rounded-2xl bg-[#1B5E3B] hover:bg-[#2D5A27] text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Shop Fresh Produce</span>
                </button>

                <button
                  onClick={() => setCurrentView('visits')}
                  className="px-5 py-3 rounded-2xl bg-white border border-[#E5E0D5] hover:border-[#1B5E3B] hover:bg-emerald-50/50 text-[#1B3B22] font-bold text-xs shadow-xs transition-all flex items-center gap-2"
                >
                  <Compass className="w-4 h-4 text-[#1B5E3B]" />
                  <span>Book Farm Tours</span>
                </button>

                <button
                  onClick={() => openTraceability('BATCH-TOM-2026-88')}
                  className="px-4 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-2"
                >
                  <QrCode className="w-4 h-4" />
                  <span>Trace Batch Origin</span>
                </button>
              </div>

              {/* Live Metric Badges */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-200/60 max-w-lg mx-auto lg:mx-0 text-left">
                <div>
                  <span className="font-serif text-xl sm:text-2xl font-bold text-[#1B3B22] block">15,400+ kg</span>
                  <span className="text-[11px] text-gray-500 font-medium">Delivered to Homes</span>
                </div>
                <div>
                  <span className="font-serif text-xl sm:text-2xl font-bold text-[#1B5E3B] block">+42% Higher</span>
                  <span className="text-[11px] text-gray-500 font-medium">Farmer Earnings</span>
                </div>
                <div>
                  <span className="font-serif text-xl sm:text-2xl font-bold text-amber-600 block">18 Hours</span>
                  <span className="text-[11px] text-gray-500 font-medium">Field-to-Fork Speed</span>
                </div>
              </div>

            </div>

            {/* Right Hero Visual Card */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                  <img
                    src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&q=80"
                    alt="Green Farm Fields"
                    className="w-full h-80 sm:h-96 object-cover"
                  />
                  <div className="p-5 bg-white space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=120&q=80"
                          alt="Rajesh Patil"
                          className="w-10 h-10 rounded-xl object-cover border border-emerald-500"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-[#1B3B22]">Rajesh Kumar Patil</h4>
                          <p className="text-[10px] text-gray-500">Green Valley Organic Agro Farm, Nashik</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        Verified Farmer
                      </span>
                    </div>

                    <div className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl text-xs text-emerald-950 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <QrCode className="w-5 h-5 text-[#1B5E3B]" />
                        <div>
                          <span className="font-bold block text-[11px]">Today's Harvest Batch: BATCH-TOM-2026-88</span>
                          <span className="text-[10px] text-gray-500">120 kg Vine-Ripened Desi Tomatoes Plucked at 5:30 AM</span>
                        </div>
                      </div>
                      <button
                        onClick={() => openTraceability('BATCH-TOM-2026-88')}
                        className="text-[11px] font-bold text-[#1B5E3B] underline shrink-0 ml-2"
                      >
                        Verify ↗
                      </button>
                    </div>
                  </div>
                </div>

                {/* Floating Eco Badge */}
                <div className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-md border border-[#E5E0D5] p-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
                    <Heart className="w-4 h-4 fill-amber-700" />
                  </div>
                  <div>
                    <span className="font-bold text-[#1B3B22] block">Fair Farm Prices</span>
                    <span className="text-[10px] text-gray-500">100% money goes directly to rural farmers</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. ROLE SELECTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-[#E5E0D5] rounded-3xl p-6 sm:p-8 shadow-xs">
          <div className="text-center max-w-xl mx-auto mb-6">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              One Platform. Many Connections.
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B3B22] mt-2">
              Select Your Portal to Get Started
            </h2>
            <p className="text-xs text-gray-600 mt-1">
              Customized digital workflows tailored specifically for each member of the rural economy.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Farmer Card */}
            <div
              onClick={() => {
                loginAsDemo('rajesh_farmer');
                setCurrentView('farmer-dashboard');
              }}
              className="group p-5 rounded-3xl border border-[#E5E0D5] hover:border-emerald-500 bg-[#FAF9F6] hover:bg-emerald-50/40 transition-all cursor-pointer shadow-2xs hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Sprout className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1B3B22]">For Farmers</h3>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  List fresh crops, manage field inventory, request farm labour teams, and apply for government subsidies with zero commissions.
                </p>
              </div>
              <div className="pt-4 flex items-center text-xs font-bold text-[#1B5E3B]">
                <span>Launch Farmer Suite</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Consumer Card */}
            <div
              onClick={() => setCurrentView('marketplace')}
              className="group p-5 rounded-3xl border border-[#E5E0D5] hover:border-amber-500 bg-[#FAF9F6] hover:bg-amber-50/40 transition-all cursor-pointer shadow-2xs hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1B3B22]">For Consumers</h3>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  Order 100% residue-free produce harvested this morning. Track origin with Batch IDs and book family farm visit passes.
                </p>
              </div>
              <div className="pt-4 flex items-center text-xs font-bold text-amber-800">
                <span>Browse Produce Market</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Labour / Workers Card */}
            <div
              onClick={() => setCurrentView('labour')}
              className="group p-5 rounded-3xl border border-[#E5E0D5] hover:border-blue-500 bg-[#FAF9F6] hover:bg-blue-50/40 transition-all cursor-pointer shadow-2xs hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1B3B22]">Labour Teams</h3>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  Connect rural worker cooperatives with nearby farms for harvesting, sowing, and tillage with transparent daily wages.
                </p>
              </div>
              <div className="pt-4 flex items-center text-xs font-bold text-blue-800">
                <span>Find Farm Assignments</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Equipment & Schemes Card */}
            <div
              onClick={() => setCurrentView('equipment')}
              className="group p-5 rounded-3xl border border-[#E5E0D5] hover:border-purple-500 bg-[#FAF9F6] hover:bg-purple-50/40 transition-all cursor-pointer shadow-2xs hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Wrench className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#1B3B22]">Machinery & Tools</h3>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  Rent or purchase modern implements (power tillers, solar pumps, drip kits) with government subsidy verification.
                </p>
              </div>
              <div className="pt-4 flex items-center text-xs font-bold text-purple-800">
                <span>View Machinery Hub</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS (4-STEP PROCESS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#1B5E3B]">
            Transparent Farm-to-Home Pipeline
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#1B3B22] mt-1">
            How KisanSetu Works in 4 Steps
          </h2>
          <p className="text-xs text-gray-600 mt-1">
            Zero middlemen, zero warehouse holding. Harvested on demand and delivered fresh within 18 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {[
            {
              step: '01',
              title: 'Direct Farm Sourcing',
              desc: 'Farmer confirms crop maturity and registers harvest batch with field GPS coordinates and soil data.',
              icon: '🌱'
            },
            {
              step: '02',
              title: 'Residue & Quality Test',
              desc: 'Chemical residue lab screening ensures 0.00 ppm synthetic toxicity and peak natural sweetness.',
              icon: '🔬'
            },
            {
              step: '03',
              title: 'Morning Cold Packing',
              desc: 'Produce is sorted into biodegradable crates and loaded onto temperature-controlled direct transit vans.',
              icon: '📦'
            },
            {
              step: '04',
              title: 'Doorstep Delivery',
              desc: 'Delivered directly to consumer doorstep with verified Batch ID QR pass and farmer earnings breakdown.',
              icon: '🚚'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E5E0D5] p-6 rounded-3xl shadow-xs relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-serif text-3xl font-extrabold text-[#1B5E3B]/20">{item.step}</span>
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <h3 className="font-serif text-base font-bold text-[#1B3B22]">{item.title}</h3>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FRESH FROM NEARBY FARMS (PRODUCE SHOWCASE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Harvested Fresh Today
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B3B22] mt-2">
              Fresh Produce From Nearby Farms
            </h2>
            <p className="text-xs text-gray-600 mt-1">
              Plucked at 5:30 AM this morning. Guaranteed residue-free and full of natural nutrients.
            </p>
          </div>

          <button
            onClick={() => setCurrentView('marketplace')}
            className="text-xs font-bold text-[#1B5E3B] hover:text-[#2D5A27] flex items-center gap-1 self-start md:self-auto"
          >
            <span>View All Produce in Marketplace</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === c.id
                  ? 'bg-[#1B5E3B] text-white shadow-xs'
                  : 'bg-white border border-[#E5E0D5] text-[#2D3A26] hover:bg-[#EBF1E8]'
              }`}
            >
              <span>{c.icon}</span>
              <span>{c.label}</span>
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredProducts.slice(0, 8).map(product => (
            <div
              key={product.id}
              className="bg-white border border-[#E5E0D5] rounded-3xl overflow-hidden shadow-2xs hover:shadow-lg transition-all group flex flex-col justify-between"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  onError={e => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=80';
                  }}
                  onClick={() => onSelectProduct(product)}
                  className="w-full h-44 object-cover cursor-pointer group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white shadow-xs">
                    {product.organic ? 'Organic' : 'Farm Direct'}
                  </span>
                  {product.promotionalBadge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-white shadow-xs">
                      {product.promotionalBadge}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => openTraceability(product.batchId)}
                  className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-white/90 hover:bg-white text-[#1B5E3B] shadow-xs"
                  title="Verify Batch ID"
                >
                  <QrCode className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-gray-500">
                    <span className="truncate max-w-[140px]">{product.farmName}</span>
                    <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                      <Star className="w-3 h-3 fill-amber-500" /> {product.rating}
                    </span>
                  </div>

                  <h3
                    onClick={() => onSelectProduct(product)}
                    className="font-serif text-base font-bold text-[#1B3B22] mt-1 hover:text-[#1B5E3B] cursor-pointer line-clamp-1"
                  >
                    {product.name}
                  </h3>

                  <p className="text-[11px] text-gray-600 line-clamp-2 mt-0.5">
                    {product.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-base font-extrabold text-[#1B5E3B]">₹{product.pricePerUnit}</span>
                      {product.originalPrice && product.originalPrice > product.pricePerUnit && (
                        <span className="text-xs text-gray-400 line-through">₹{product.originalPrice}</span>
                      )}
                      <span className="text-[10px] text-gray-500"> / {product.unit}</span>
                    </div>
                    {product.discountPercent && product.discountPercent > 0 && (
                      <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                        {product.promotionalBadge || `${product.discountPercent}% OFF`}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => addToCart(product, 1)}
                    className="px-3.5 py-1.5 rounded-xl bg-[#1B5E3B] hover:bg-[#2D5A27] text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. AGRO-TOURISM & FARM VISITS SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#1B3B22] to-[#2D5A27] rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs uppercase font-extrabold tracking-wider px-3 py-1 rounded-full bg-amber-400 text-amber-950 inline-block">
                Agro-Tourism & Weekend Farm Visits
              </span>

              <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight">
                Bring Your Family to the Fields. Pick Your Own Fruits.
              </h2>

              <p className="text-xs sm:text-sm text-gray-200 leading-relaxed max-w-xl">
                Experience authentic rural heritage! Book weekend tour slots, pick strawberries and mangoes straight from the trees, meet Gir cows, and enjoy hot traditional farm breakfasts cooked on chulhas.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Fresh Harvest Basket</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Cow Milking Demo</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Tractor Country Ride</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-3">
                <button
                  onClick={() => onSelectSlot(slots[0])}
                  className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
                >
                  <Compass className="w-4 h-4" />
                  <span>Book Green Valley Slot (₹250/person)</span>
                </button>

                <button
                  onClick={() => setCurrentView('visits')}
                  className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all"
                >
                  View All Farm Tour Passes
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-3">
              <img
                src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=600&q=80"
                alt="Greenhouse Walk"
                className="rounded-2xl h-44 w-full object-cover shadow-md"
              />
              <img
                src="https://images.unsplash.com/photo-1592417817098-8f3d6ef23ef9?w=600&q=80"
                alt="Orchard Trees"
                className="rounded-2xl h-44 w-full object-cover shadow-md"
              />
            </div>

          </div>
        </div>
      </section>

      {/* 6. GOVERNMENT SCHEMES & LABOUR SUMMARY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Schemes Teaser Card */}
          <div className="bg-white border border-[#E5E0D5] p-6 rounded-3xl shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1B5E3B] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Government Support Hub
                </span>
                <span className="text-xs text-gray-500">6 Active Schemes</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1B3B22]">
                Subsidies & Direct Financial Aid
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Check eligibility for PM-KUSUM (60% solar pump grant), PMKSY (55% drip irrigation subsidy), and PM-KISAN ₹6,000 direct income support.
              </p>

              <div className="space-y-2 pt-2">
                {schemes.slice(0, 3).map(s => (
                  <div key={s.id} className="p-2.5 rounded-xl bg-[#FAF9F6] border border-[#E5E0D5] text-xs flex justify-between items-center">
                    <div>
                      <span className="font-bold text-[#2D3A26] block">{s.shortName}</span>
                      <span className="text-[10px] text-gray-500">{s.subsidyPercentage}</span>
                    </div>
                    <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded">
                      {s.badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setCurrentView('schemes')}
              className="w-full py-2.5 rounded-2xl bg-[#1B5E3B] hover:bg-[#2D5A27] text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Explore Schemes & Subsidy Calculator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Farm Labour Teaser Card */}
          <div className="bg-white border border-[#E5E0D5] p-6 rounded-3xl shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  Rural Employment Network
                </span>
                <span className="text-xs text-gray-500">70+ Verified Workers</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1B3B22]">
                Agricultural Labour Cooperatives
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Solve harvest labor shortages instantly. Request trained teams for tomato plucking, sugarcane harvesting, tractor tillage, and packing.
              </p>

              <div className="space-y-2 pt-2">
                {laborGroups.slice(0, 3).map(g => (
                  <div key={g.id} className="p-2.5 rounded-xl bg-[#FAF9F6] border border-[#E5E0D5] text-xs flex justify-between items-center">
                    <div>
                      <span className="font-bold text-[#2D3A26] block">{g.groupName}</span>
                      <span className="text-[10px] text-gray-500">{g.availableWorkers} available • {g.dailyRateEstimate}</span>
                    </div>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                      ★ {g.rating}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setCurrentView('labour')}
              className="w-full py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Book Labour Teams or Post Work Request</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* 7. WHY KISANSETU (BENEFITS & VALUES) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-[#E5E0D5] rounded-3xl p-6 sm:p-10 shadow-xs">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B3B22]">
              Why Choose KisanSetu?
            </h2>
            <p className="text-xs text-gray-600 mt-1">
              Building a transparent, equitable, and sustainable digital rural economy.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E5E0D5] space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#1B5E3B] flex items-center justify-center mx-auto text-xl font-bold">
                🌾
              </div>
              <h3 className="font-serif text-base font-bold text-[#1B3B22]">Zero Middlemen Payouts</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Farmers receive up to 90% of the consumer shelf price directly into their DBT bank accounts, eliminating mandi broker commissions.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E5E0D5] space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto text-xl font-bold">
                🔬
              </div>
              <h3 className="font-serif text-base font-bold text-[#1B3B22]">100% Residue-Free Food</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Certified pesticide-free natural cultivation verified through NABL batch testing. Pure nutrition for growing children and families.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-[#E5E0D5] space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center mx-auto text-xl font-bold">
                🌱
              </div>
              <h3 className="font-serif text-base font-bold text-[#1B3B22]">Preserving Soil & Water</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                We empower farmers with micro-drip subsidies, bio-composting techniques, and solar energy systems, restoring ground water tables.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FREQUENTLY ASKED QUESTIONS (ACCORDION) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#1B5E3B]">Got Questions?</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B3B22] mt-1">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E5E0D5] rounded-2xl overflow-hidden transition-all shadow-2xs"
            >
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-[#1B3B22] hover:bg-[#FAF9F6] transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform duration-200 shrink-0 ml-2 ${
                    openFaqIndex === idx ? 'rotate-180 text-[#1B5E3B]' : ''
                  }`}
                />
              </button>

              {openFaqIndex === idx && (
                <div className="p-4 pt-0 text-xs text-gray-600 leading-relaxed border-t border-gray-100 bg-[#FAF9F6]/50">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
