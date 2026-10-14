import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Search, QrCode, CheckCircle2, ShieldCheck, MapPin, Calendar, Clock, Award, Truck, User } from 'lucide-react';

export const TraceabilityModal: React.FC = () => {
  const { isTraceModalOpen, setIsTraceModalOpen, activeTraceBatchId, products } = useStore();
  const [searchInput, setSearchInput] = useState(activeTraceBatchId || 'BATCH-TOM-2026-88');

  if (!isTraceModalOpen) return null;

  // Find product by batch ID or fallback
  const matchedProduct = products.find(p => p.batchId.toLowerCase() === searchInput.trim().toLowerCase()) || products[0];

  const presets = [
    { code: 'BATCH-TOM-2026-88', label: 'Desi Tomatoes' },
    { code: 'BATCH-MNG-2026-42', label: 'Alphonso Mangoes' },
    { code: 'BATCH-STR-2026-19', label: 'Strawberries' },
    { code: 'BATCH-GHEE-2026-14', label: 'Gir Cow A2 Ghee' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-[#FAF9F6] border border-[#E5E0D5] w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-[#1B3B22] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-white">
              <QrCode className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold">100% Farm-to-Home Traceability</h3>
              <p className="text-[11px] text-gray-300">Verify Harvest Origin, Lab Residue Report & Cold Chain</p>
            </div>
          </div>
          <button
            onClick={() => setIsTraceModalOpen(false)}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Batch Input Bar */}
        <div className="p-4 bg-white border-b border-[#E5E0D5] space-y-2">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Enter Batch ID (e.g. BATCH-TOM-2026-88)"
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#D4CDBC] bg-[#FAF9F6] text-xs font-mono font-bold text-[#1B3B22] uppercase"
              />
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Try Sample Batches:</span>
            {presets.map(p => (
              <button
                key={p.code}
                onClick={() => setSearchInput(p.code)}
                className={`text-[10px] px-2 py-0.5 rounded-lg border font-mono transition-colors ${
                  searchInput === p.code
                    ? 'bg-[#1B5E3B] text-white border-[#1B5E3B]'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Body */}
        <div className="p-5 overflow-y-auto space-y-5">
          
          {/* Batch Card Overview */}
          <div className="bg-white border border-[#E5E0D5] rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-5 shadow-xs">
            <img
              src={matchedProduct.image}
              alt={matchedProduct.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover shrink-0"
            />
            <div className="flex-1 min-w-0 text-center sm:text-left space-y-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
                <span className="font-mono text-xs font-extrabold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                  {matchedProduct.batchId}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-300">
                  🌱 100% Residue-Free
                </span>
              </div>
              <h4 className="font-serif text-lg font-bold text-[#1B3B22]">{matchedProduct.name}</h4>
              <p className="text-xs text-gray-600 flex items-center justify-center sm:justify-start gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#1B5E3B]" /> {matchedProduct.farmerLocation}
              </p>
              <p className="text-xs text-gray-600 flex items-center justify-center sm:justify-start gap-1">
                <User className="w-3.5 h-3.5 text-[#1B5E3B]" /> Farmer: <span className="font-bold">{matchedProduct.farmerName}</span> ({matchedProduct.farmName})
              </p>
            </div>

            {/* Simulated QR Code */}
            <div className="shrink-0 flex flex-col items-center bg-gray-50 p-2.5 rounded-2xl border border-gray-200">
              <div className="w-20 h-20 bg-white border border-gray-300 rounded-xl p-1 flex items-center justify-center">
                <div className="grid grid-cols-4 gap-1 w-16 h-16 bg-gray-900 p-1.5 rounded-md">
                  <div className="bg-white rounded-xs"></div>
                  <div className="bg-black"></div>
                  <div className="bg-white rounded-xs"></div>
                  <div className="bg-black"></div>
                  <div className="bg-black"></div>
                  <div className="bg-white"></div>
                  <div className="bg-black"></div>
                  <div className="bg-white"></div>
                  <div className="bg-white rounded-xs"></div>
                  <div className="bg-black"></div>
                  <div className="bg-white rounded-xs"></div>
                  <div className="bg-black"></div>
                </div>
              </div>
              <span className="text-[9px] font-bold text-gray-600 mt-1 uppercase">Scan QR Pass</span>
            </div>
          </div>

          {/* 5-Step Journey Timeline */}
          <div className="bg-white border border-[#E5E0D5] rounded-3xl p-5 shadow-xs">
            <h4 className="text-xs font-bold text-[#2D3A26] uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#1B5E3B]" /> 5-Stage Farm-to-Fork Journey Record
            </h4>

            <div className="space-y-4 relative before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-emerald-200">
              
              {/* Step 1 */}
              <div className="flex items-start gap-3.5 relative">
                <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0 z-10 shadow-xs">
                  ✓
                </div>
                <div className="flex-1 bg-emerald-50/50 border border-emerald-100 p-3 rounded-2xl">
                  <div className="flex justify-between items-center text-xs font-bold text-emerald-950">
                    <span>1. Farm Sourcing & Natural Cultivation</span>
                    <span className="text-[10px] text-gray-500 font-normal">Plot 4A (Dindori, Nashik)</span>
                  </div>
                  <p className="text-[11px] text-gray-600 mt-0.5">
                    Nourished exclusively with aged Gir cow vermicompost and neem cake. Zero synthetic chemical insecticides sprayed throughout crop cycle.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-3.5 relative">
                <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0 z-10 shadow-xs">
                  ✓
                </div>
                <div className="flex-1 bg-emerald-50/50 border border-emerald-100 p-3 rounded-2xl">
                  <div className="flex justify-between items-center text-xs font-bold text-emerald-950">
                    <span>2. Sunrise Plucking & Hand Sorting</span>
                    <span className="text-[10px] text-gray-500 font-normal">05:30 AM Today (19°C)</span>
                  </div>
                  <p className="text-[11px] text-gray-600 mt-0.5">
                    Hand-harvested by Shivaji Agro Labor team at dawn when produce moisture and cellular turgor pressure is peak.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-3.5 relative">
                <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0 z-10 shadow-xs">
                  ✓
                </div>
                <div className="flex-1 bg-emerald-50/50 border border-emerald-100 p-3 rounded-2xl">
                  <div className="flex justify-between items-center text-xs font-bold text-emerald-950">
                    <span>3. Lab Residue Test & Brix Certification</span>
                    <span className="text-[10px] text-emerald-700 font-bold">NABL Lab Certified</span>
                  </div>
                  <p className="text-[11px] text-gray-600 mt-0.5">
                    Gas chromatography pesticide residue test score: <strong className="text-emerald-800">0.00 ppm</strong> (Passes EU & FSSAI Organic Standards). Brix sweetness index: 7.2°.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-start gap-3.5 relative">
                <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0 z-10 shadow-xs">
                  ✓
                </div>
                <div className="flex-1 bg-emerald-50/50 border border-emerald-100 p-3 rounded-2xl">
                  <div className="flex justify-between items-center text-xs font-bold text-emerald-950">
                    <span>4. Eco-Friendly Paper Crating & Cold Pack</span>
                    <span className="text-[10px] text-gray-500 font-normal">08:00 AM Today</span>
                  </div>
                  <p className="text-[11px] text-gray-600 mt-0.5">
                    Packed in breathable corrugated biodegradable punnets. Loaded into climate-controlled direct electric transport van (Vehicle: MH-15-EV-4091).
                  </p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex items-start gap-3.5 relative">
                <div className="w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold shrink-0 z-10 shadow-xs animate-pulse">
                  5
                </div>
                <div className="flex-1 bg-amber-50/50 border border-amber-200 p-3 rounded-2xl">
                  <div className="flex justify-between items-center text-xs font-bold text-amber-950">
                    <span>5. Direct Doorstep Delivery</span>
                    <span className="text-[10px] text-amber-800 font-bold">In Transit (~18 hrs total)</span>
                  </div>
                  <p className="text-[11px] text-gray-600 mt-0.5">
                    Dispatched directly from farm gate to consumer residence without passing through any wholesale mandi auction or preservative cold storage.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-[#E5E0D5] flex items-center justify-between">
          <span className="text-xs text-gray-500 flex items-center gap-1">
            <Award className="w-4 h-4 text-emerald-600" /> FSSAI Organic & Jaivik Bharat Verified
          </span>
          <button
            onClick={() => setIsTraceModalOpen(false)}
            className="px-4 py-2 rounded-xl bg-[#1B5E3B] text-white font-bold text-xs hover:bg-[#2D5A27] transition-colors"
          >
            Close Traceability Record
          </button>
        </div>

      </div>
    </div>
  );
};
