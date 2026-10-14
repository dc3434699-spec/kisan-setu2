import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { FileText, Search, ExternalLink, Calculator, CheckCircle2, ShieldCheck, HelpCircle, Phone, ArrowRight } from 'lucide-react';

export const GovernmentSchemesView: React.FC = () => {
  const { schemes, bookmarkedSchemes, toggleBookmarkScheme } = useStore();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Eligibility Calculator State
  const [calcLandSize, setCalcLandSize] = useState('3.5');
  const [calcCategory, setCalcCategory] = useState<'Small & Marginal' | 'Large / General'>('Small & Marginal');
  const [calcIrrigation, setCalcIrrigation] = useState<'Borewell / Open Well' | 'Rainfed' | 'Canal'>('Borewell / Open Well');
  const [calcResult, setCalcResult] = useState<{ subsidyTotal: string; schemesList: string[] } | null>(null);

  const categories = [
    'all',
    'Financial Aid & Income',
    'Irrigation & Solar',
    'Crop Insurance',
    'Organic & Natural Farming',
    'Machinery & Equipment'
  ];

  const filteredSchemes = schemes.filter(s => {
    const matchCat = selectedCategory === 'all' || s.category === selectedCategory;
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.shortName.toLowerCase().includes(search.toLowerCase()) ||
      s.badge.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const acres = Number(calcLandSize) || 1;
    let totalEstimated = 6000; // PM-KISAN
    const eligible: string[] = ['PM-KISAN Direct Support (₹6,000/yr guaranteed)'];

    if (calcIrrigation === 'Borewell / Open Well') {
      totalEstimated += 120000; // PM-KUSUM
      eligible.push('PM-KUSUM Solar Water Pump (60% Subsidy ~ ₹1,20,000 grant)');
    }

    if (acres <= 5) {
      totalEstimated += Math.min(100000, acres * 25000);
      eligible.push(`PMKSY Drip Irrigation (55% Subsidy for ${acres} acres ~ ₹${acres * 25000})`);
    }

    eligible.push('PMFBY Crop Insurance (Govt covers 90%+ premium)');
    eligible.push('PKVY Organic Farming Aid (₹50,000/ha assistance)');

    setCalcResult({
      subsidyTotal: `₹${totalEstimated.toLocaleString()}`,
      schemesList: eligible
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1B3B22] to-[#2D5A27] text-white p-6 sm:p-8 rounded-3xl shadow-lg space-y-2">
        <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-400 text-amber-950 inline-block">
          Govt Schemes & Subsidies Hub
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold">
          Central & State Agriculture Subsidies
        </h1>
        <p className="text-xs text-gray-200 max-w-2xl">
          Direct financial aid, solar water pump grants, micro-drip assistance, and crop insurance schemes with verified links to official government portals.
        </p>
      </div>

      {/* Interactive Eligibility Calculator Wizard */}
      <div className="bg-white border-2 border-emerald-500/40 p-6 rounded-3xl shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-[#1B5E3B]">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-base font-bold text-[#1B3B22]">
              Direct Subsidy Eligibility Calculator
            </h3>
            <p className="text-xs text-gray-600">Enter land size to calculate potential government grants</p>
          </div>
        </div>

        <form onSubmit={handleCalculate} className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="block font-bold text-[#2D3A26] mb-1">Land Holding (Acres)</label>
            <input
              type="number"
              step="0.5"
              required
              value={calcLandSize}
              onChange={e => setCalcLandSize(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#D4CDBC] bg-[#FAF9F6]"
            />
          </div>

          <div>
            <label className="block font-bold text-[#2D3A26] mb-1">Farmer Category</label>
            <select
              value={calcCategory}
              onChange={e => setCalcCategory(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl border border-[#D4CDBC] bg-[#FAF9F6]"
            >
              <option value="Small & Marginal">Small & Marginal (&lt; 5 Acres)</option>
              <option value="Large / General">Large / General (&gt; 5 Acres)</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-[#2D3A26] mb-1">Water Source</label>
            <select
              value={calcIrrigation}
              onChange={e => setCalcIrrigation(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl border border-[#D4CDBC] bg-[#FAF9F6]"
            >
              <option value="Borewell / Open Well">Borewell / Open Well</option>
              <option value="Canal">Canal Irrigation</option>
              <option value="Rainfed">Rainfed / Dryland</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#1B5E3B] hover:bg-[#2D5A27] text-white font-bold transition-colors shadow-xs"
            >
              Check My Eligibility
            </button>
          </div>
        </form>

        {calcResult && (
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl space-y-2 animate-in fade-in">
            <div className="flex justify-between items-center">
              <span className="font-bold text-xs text-emerald-900">
                🎉 Estimated Available Government Subsidy Value:
              </span>
              <span className="font-serif text-xl font-bold text-emerald-800">
                {calcResult.subsidyTotal}
              </span>
            </div>
            <div className="space-y-1 text-xs text-emerald-950 pt-1 border-t border-emerald-200">
              <span className="font-bold text-[11px] block">Eligible Schemes:</span>
              {calcResult.schemesList.map((item, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#E5E0D5] p-4 rounded-3xl space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search scheme name, solar pump, drip irrigation, PM-KISAN..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#D4CDBC] bg-[#FAF9F6] text-xs text-[#2D3A26]"
            />
          </div>
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
              {c === 'all' ? 'All Categories' : c}
            </button>
          ))}
        </div>
      </div>

      {/* Schemes Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSchemes.map(scheme => {
          const isSaved = bookmarkedSchemes.includes(scheme.id);
          return (
            <div
              key={scheme.id}
              className="bg-white border border-[#E5E0D5] rounded-3xl p-6 space-y-4 shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                    {scheme.badge}
                  </span>
                  <button
                    onClick={() => toggleBookmarkScheme(scheme.id)}
                    className={`text-xs font-bold ${isSaved ? 'text-amber-600' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    {isSaved ? '★ Bookmarked' : '☆ Bookmark'}
                  </button>
                </div>

                <div>
                  <h3 className="font-serif text-lg font-bold text-[#1B3B22] leading-snug">
                    {scheme.name}
                  </h3>
                  <p className="text-[11px] text-gray-500 mt-0.5">{scheme.ministry}</p>
                </div>

                <p className="text-xs text-gray-700 leading-relaxed bg-[#FAF9F6] p-3 rounded-2xl border border-[#E5E0D5]">
                  {scheme.summary}
                </p>

                <div className="space-y-1.5 text-xs">
                  <div className="text-emerald-800 font-bold">
                    ✓ Financial Support: {scheme.subsidyPercentage}
                  </div>
                  {scheme.directFinancialSupport && (
                    <div className="text-gray-700 font-medium">
                      Direct Payout: {scheme.directFinancialSupport}
                    </div>
                  )}
                  {scheme.maxSubsidyAmount && (
                    <div className="text-gray-700 font-medium">
                      Max Subsidy Cap: {scheme.maxSubsidyAmount}
                    </div>
                  )}
                </div>

                {/* Eligibility Bullet Points */}
                <div className="pt-2 border-t border-gray-100 space-y-1 text-[11px] text-gray-600">
                  <span className="font-bold text-[#2D3A26] block">Key Eligibility Criteria:</span>
                  {scheme.eligibility.slice(0, 2).map((e, idx) => (
                    <p key={idx}>• {e}</p>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[11px] text-gray-500 font-medium flex items-center gap-1">
                  <Phone className="w-3 h-3 text-emerald-700" /> {scheme.helpline}
                </span>

                <a
                  href={scheme.officialPortalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#1B5E3B] hover:bg-[#2D5A27] text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <span>Apply on {scheme.portalName}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
