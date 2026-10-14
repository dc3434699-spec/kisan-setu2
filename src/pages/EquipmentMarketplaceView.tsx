import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import { Wrench, Search, Star, ShieldCheck, CheckCircle2, ShoppingBag, ArrowRight } from 'lucide-react';
import { EquipmentItem } from '../types';

export const EquipmentMarketplaceView: React.FC = () => {
  const { equipment, orderEquipment } = useStore();
  const { currentUser, openAuthModal } = useAuth();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [orderFeedback, setOrderFeedback] = useState<string | null>(null);

  const categories = [
    'all',
    'Land Preparation & Tillage',
    'Spraying & Plant Protection',
    'Micro-Irrigation',
    'Solar & Pumping',
    'Hand & Planting Tools',
    'Harvesting & Cutting'
  ];

  const filteredEquipment = equipment.filter(item => {
    const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.brand.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleAction = (item: EquipmentItem, type: 'buy' | 'rent') => {
    if (!currentUser) {
      openAuthModal('login');
      return;
    }

    orderEquipment(item.id, type, type === 'rent' ? 3 : undefined);
    setOrderFeedback(
      type === 'buy'
        ? `Purchase order for "${item.name}" submitted! Custom Hiring Centre will dispatch to your farm address.`
        : `Rental booked for "${item.name}" for 3 days (Total: ₹${(item.rentalPricePerDay || 100) * 3}). Machine operator notified!`
    );

    setTimeout(() => setOrderFeedback(null), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#1B3B22] to-[#2D5A27] text-white p-6 sm:p-8 rounded-3xl shadow-lg space-y-2">
        <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-400 text-amber-950 inline-block">
          Modern Farm Mechanization Hub
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold">
          Farm Machinery & Implement Store
        </h1>
        <p className="text-xs text-gray-200 max-w-2xl">
          Purchase or rent modern agricultural implements with direct government subsidy verification through Custom Hiring Centres (CHC).
        </p>
      </div>

      {orderFeedback && (
        <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-2xl text-xs text-emerald-900 font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{orderFeedback}</span>
        </div>
      )}

      {/* Search & Categories Bar */}
      <div className="bg-white border border-[#E5E0D5] p-4 rounded-3xl space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search power tiller, solar pump, battery sprayer, drip kit..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#D4CDBC] bg-[#FAF9F6] text-xs text-[#2D3A26]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar border-t border-gray-100 pt-2.5">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                selectedCategory === c
                  ? 'bg-[#1B5E3B] text-white shadow-xs'
                  : 'bg-[#FAF9F6] text-gray-700 hover:bg-[#EBF1E8]'
              }`}
            >
              {c === 'all' ? 'All Machinery' : c}
            </button>
          ))}
        </div>
      </div>

      {/* Equipment Catalog */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEquipment.map(item => (
          <div
            key={item.id}
            className="bg-white border border-[#E5E0D5] rounded-3xl overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                {item.subsidyBadge && (
                  <span className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500 text-white shadow-xs">
                    {item.subsidyBadge}
                  </span>
                )}
                <span className="absolute bottom-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-white">
                  {item.powerSource}
                </span>
              </div>

              <div className="p-5 space-y-3">
                <div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="font-semibold">{item.brand}</span>
                    <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-500" /> {item.rating} ({item.reviewsCount})
                    </span>
                  </div>

                  <h3 className="font-serif text-base font-bold text-[#1B3B22] mt-1 leading-snug">
                    {item.name}
                  </h3>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                  {item.description}
                </p>

                {/* Features Highlights */}
                <div className="space-y-1 text-[11px] text-gray-700 bg-[#FAF9F6] p-3 rounded-2xl border border-[#E5E0D5]">
                  {item.features.slice(0, 2).map((feat, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Price Display */}
                <div className="pt-2 flex items-baseline justify-between">
                  <div>
                    <span className="text-lg font-extrabold text-[#1B5E3B]">₹{item.price.toLocaleString()}</span>
                    <span className="text-xs text-gray-400 line-through ml-1.5">₹{item.originalPrice.toLocaleString()}</span>
                  </div>
                  {item.rentalPricePerDay ? (
                    <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                      Rent: ₹{item.rentalPricePerDay} / day
                    </span>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-5 pt-0 flex gap-2">
              {item.rentalPricePerDay ? (
                <button
                  onClick={() => handleAction(item, 'rent')}
                  className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs transition-colors"
                >
                  Rent Tool
                </button>
              ) : null}

              <button
                onClick={() => handleAction(item, 'buy')}
                className="flex-1 py-2.5 rounded-xl bg-[#1B5E3B] hover:bg-[#2D5A27] text-white font-bold text-xs shadow-xs transition-colors"
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
