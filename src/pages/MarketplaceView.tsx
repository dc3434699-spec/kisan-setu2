import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Product } from '../types';
import {
  Search,
  Filter,
  SlidersHorizontal,
  Star,
  MapPin,
  QrCode,
  Plus,
  ShoppingBag,
  ArrowUpDown,
  Sparkles,
  ShieldCheck,
  Check
} from 'lucide-react';

interface MarketplaceViewProps {
  onSelectProduct: (p: Product) => void;
  onOpenFarmerDashboard?: () => void;
}

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({
  onSelectProduct,
  onOpenFarmerDashboard
}) => {
  const { products, addToCart, openTraceability } = useStore();
  const { currentUser } = useAuth();
  const { t } = useLanguage();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [organicOnly, setOrganicOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'rating' | 'price-asc' | 'price-desc' | 'name'>('rating');
  const [maxPrice, setMaxPrice] = useState<number>(1500);

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'Vegetable', label: 'Fresh Vegetables' },
    { id: 'Fruit', label: 'Seasonal Fruits' },
    { id: 'Grain', label: 'Heritage Grains' },
    { id: 'Dairy & Honey', label: 'Vedic Dairy & Honey' },
    { id: 'Spices', label: 'Pure Spices' }
  ];

  const filteredProducts = products
    .filter(p => {
      const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.farmName.toLowerCase().includes(search.toLowerCase()) ||
        p.farmerName.toLowerCase().includes(search.toLowerCase());
      const matchOrganic = !organicOnly || p.organic;
      const matchPrice = p.pricePerUnit <= maxPrice;
      return matchCat && matchSearch && matchOrganic && matchPrice;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price-asc') return a.pricePerUnit - b.pricePerUnit;
      if (sortBy === 'price-desc') return b.pricePerUnit - a.pricePerUnit;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner / Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#1B3B22] to-[#2D5A27] text-white p-6 sm:p-8 rounded-3xl shadow-lg">
        <div className="space-y-1">
          <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-400 text-emerald-950 inline-block">
            Farm2Home Marketplace
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold">Direct Harvest Marketplace</h1>
          <p className="text-xs text-gray-200">
            Hand-plucked this morning with verified 0.00 ppm residue certificates. Free doorstep delivery over ₹400.
          </p>
        </div>

        {currentUser?.role === 'farmer' && (
          <button
            onClick={onOpenFarmerDashboard}
            className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 self-start md:self-auto shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>List New Crop Produce</span>
          </button>
        )}
      </div>

      {/* Search, Filter & Sort Controls */}
      <div className="bg-white border border-[#E5E0D5] p-4 sm:p-5 rounded-3xl shadow-xs space-y-4">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Search */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search produce, farm names, or farmer..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#D4CDBC] bg-[#FAF9F6] text-xs text-[#2D3A26] focus:outline-emerald-600"
            />
          </div>

          {/* Sort By */}
          <div className="md:col-span-4 flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-gray-500 shrink-0" />
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl border border-[#D4CDBC] bg-[#FAF9F6] text-xs text-[#2D3A26]"
            >
              <option value="rating">Top Rated & Verified ★</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Product Name (A-Z)</option>
            </select>
          </div>

          {/* Organic Only Toggle */}
          <div className="md:col-span-3 flex items-center justify-end">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#2D3A26]">
              <input
                type="checkbox"
                checked={organicOnly}
                onChange={e => setOrganicOnly(e.target.checked)}
                className="w-4 h-4 rounded text-[#1B5E3B] focus:ring-[#1B5E3B]"
              />
              <span>100% Organic Only 🌱</span>
            </label>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar border-t border-gray-100 pt-3">
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === c.id
                  ? 'bg-[#1B5E3B] text-white shadow-2xs'
                  : 'bg-[#FAF9F6] text-[#2D3A26] hover:bg-[#EBF1E8]'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

      </div>

      {/* Produce Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs text-gray-600 font-medium">
            Showing <strong className="text-[#1B3B22]">{filteredProducts.length}</strong> fresh agricultural harvests
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="bg-white border border-[#E5E0D5] rounded-3xl p-12 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 mx-auto">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#1B3B22]">No Produce Found</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              No crops matched your filters. Try resetting the category or search keywords.
            </p>
            <button
              onClick={() => {
                setSearch('');
                setSelectedCategory('all');
                setOrganicOnly(false);
              }}
              className="px-4 py-2 rounded-xl bg-[#1B5E3B] text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredProducts.map(product => (
              <div
                key={product.id}
                className="bg-white border border-[#E5E0D5] rounded-3xl overflow-hidden shadow-2xs hover:shadow-lg transition-all group flex flex-col justify-between"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    onClick={() => onSelectProduct(product)}
                    className="w-full h-44 object-cover cursor-pointer group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white shadow-xs">
                      {product.organic ? 'Organic' : 'Farm Direct'}
                    </span>
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

                    <p className="text-[10px] text-emerald-800 font-semibold flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3 text-[#1B5E3B]" /> {product.farmerLocation}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <span className="text-base font-extrabold text-[#1B5E3B]">₹{product.pricePerUnit}</span>
                      <span className="text-[10px] text-gray-500"> / {product.unit}</span>
                    </div>

                    <button
                      onClick={() => addToCart(product, 1)}
                      className="px-3.5 py-1.5 rounded-xl bg-[#1B5E3B] hover:bg-[#2D5A27] text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
