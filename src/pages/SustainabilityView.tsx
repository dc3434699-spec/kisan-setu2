import React, { useState } from 'react';
import { Leaf, Droplets, TrendingUp, ShieldCheck, Award, Heart, Sparkles, CheckCircle2 } from 'lucide-react';

export const SustainabilityView: React.FC = () => {
  const [familyMembers, setFamilyMembers] = useState(4);

  const calculateImpact = (members: number) => {
    return {
      chemicalFreeKg: members * 12.5,
      waterSavedL: members * 450,
      farmerDirectExtraRs: members * 380,
      carbonSavedKg: members * 4.2
    };
  };

  const impact = calculateImpact(familyMembers);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#1B3B22] to-[#2D5A27] text-white p-6 sm:p-8 rounded-3xl shadow-lg space-y-2">
        <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-400 text-emerald-950 inline-block">
          Ecological & Rural Impact Dashboard
        </span>
        <h1 className="font-serif text-2xl sm:text-4xl font-bold">
          Sustainability & Community Transformation
        </h1>
        <p className="text-xs sm:text-sm text-gray-200 max-w-2xl">
          By bypassing extractive industrial wholesale chains, KisanSetu delivers real ecological restoration, ground water conservation, and fair rural livelihood stability.
        </p>
      </div>

      {/* 4 Core Impact Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white border border-[#E5E0D5] p-6 rounded-3xl shadow-xs space-y-2 text-center">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto text-xl font-bold">
            <Leaf className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Chemical-Free Harvest</span>
          <div className="font-serif text-2xl sm:text-3xl font-extrabold text-[#1B3B22]">15,400+ kg</div>
          <span className="text-xs text-emerald-700 font-semibold block">0.00 ppm synthetic pesticides</span>
        </div>

        <div className="bg-white border border-[#E5E0D5] p-6 rounded-3xl shadow-xs space-y-2 text-center">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mx-auto text-xl font-bold">
            <Droplets className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Groundwater Conserved</span>
          <div className="font-serif text-2xl sm:text-3xl font-extrabold text-blue-800">540,000 L</div>
          <span className="text-xs text-blue-700 font-semibold block">Via PMKSY precision micro-drip</span>
        </div>

        <div className="bg-white border border-[#E5E0D5] p-6 rounded-3xl shadow-xs space-y-2 text-center">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto text-xl font-bold">
            <TrendingUp className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Farmer Income Lift</span>
          <div className="font-serif text-2xl sm:text-3xl font-extrabold text-amber-800">+42% Higher</div>
          <span className="text-xs text-amber-700 font-semibold block">₹28.4 Lakhs direct fair payouts</span>
        </div>

        <div className="bg-white border border-[#E5E0D5] p-6 rounded-3xl shadow-xs space-y-2 text-center">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mx-auto text-xl font-bold">
            <Heart className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Rural Labour Days</span>
          <div className="font-serif text-2xl sm:text-3xl font-extrabold text-purple-800">1,840 Days</div>
          <span className="text-xs text-purple-700 font-semibold block">Fair daily wages with meals</span>
        </div>
      </div>

      {/* Interactive Household Impact Calculator */}
      <div className="bg-white border-2 border-emerald-500/40 p-6 sm:p-8 rounded-3xl shadow-xs space-y-6">
        <div className="max-w-xl space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            Household Footprint Calculator
          </span>
          <h2 className="font-serif text-2xl font-bold text-[#1B3B22]">
            Calculate Your Family's Monthly Agricultural Impact
          </h2>
          <p className="text-xs text-gray-600">
            See the direct difference your household makes by switching from supermarket storage produce to KisanSetu direct farm-gate harvesting.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-[#FAF9F6] p-4 rounded-2xl border border-[#E5E0D5] max-w-sm">
          <span className="text-xs font-bold text-[#2D3A26]">Family Members:</span>
          <div className="flex items-center gap-2">
            {[1, 2, 4, 6, 8].map(count => (
              <button
                key={count}
                onClick={() => setFamilyMembers(count)}
                className={`w-9 h-9 rounded-xl font-bold text-xs transition-colors ${
                  familyMembers === count
                    ? 'bg-[#1B5E3B] text-white shadow-xs'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                {count}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-emerald-950">
            <span className="text-[11px] font-bold block">Monthly Chemical-Free Food:</span>
            <div className="font-serif text-xl font-bold text-emerald-900 mt-1">{impact.chemicalFreeKg} kg</div>
            <span className="text-[10px] text-gray-500">Pure nutrition for children</span>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-blue-950">
            <span className="text-[11px] font-bold block">Water Saved This Month:</span>
            <div className="font-serif text-xl font-bold text-blue-900 mt-1">{impact.waterSavedL} Litres</div>
            <span className="text-[10px] text-gray-500">From precision micro-drip</span>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-950">
            <span className="text-[11px] font-bold block">Farmer Direct Wealth Created:</span>
            <div className="font-serif text-xl font-bold text-amber-900 mt-1">+₹{impact.farmerDirectExtraRs}</div>
            <span className="text-[10px] text-gray-500">Zero broker commissions</span>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 text-purple-950">
            <span className="text-[11px] font-bold block">Cold Chain CO2 Prevented:</span>
            <div className="font-serif text-xl font-bold text-purple-900 mt-1">{impact.carbonSavedKg.toFixed(1)} kg CO2</div>
            <span className="text-[10px] text-gray-500">18-hr direct transit vans</span>
          </div>
        </div>
      </div>

      {/* Sustainable Farming Practices */}
      <div className="bg-[#FAF9F6] border border-[#E5E0D5] p-6 sm:p-8 rounded-3xl space-y-4">
        <h3 className="font-serif text-xl font-bold text-[#1B3B22]">Our 4 Sustainable Pillars</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-white border border-[#E5E0D5] space-y-1">
            <span className="font-bold text-[#1B5E3B] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Indigenous Gir Cow Natural Farming (SPNF)
            </span>
            <p className="text-gray-600">
              Fermented Jeevamrut, Ghanjeevamrut, and Dashparni Ark replace toxic synthetic urea and organophosphates, naturally restoring native earthworms and microbial biology.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#E5E0D5] space-y-1">
            <span className="font-bold text-[#1B5E3B] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Solar Irrigation & Energy Independence
            </span>
            <p className="text-gray-600">
              Farmers adopt PM-KUSUM 60% subsidized stand-alone solar agricultural pumps, eliminating costly diesel generators and lowering agricultural carbon footprints to zero.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#E5E0D5] space-y-1">
            <span className="font-bold text-[#1B5E3B] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Complete Soil Health Testing & Traceability
            </span>
            <p className="text-gray-600">
              Every harvest batch is certified through gas chromatography for zero pesticide residues and graded for Brix sugar density, upholding the highest standards of food safety.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#E5E0D5] space-y-1">
            <span className="font-bold text-[#1B5E3B] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Dignified Rural Agricultural Labour
            </span>
            <p className="text-gray-600">
              Fair daily wages, organized cooperatives, and safe harvesting equipment shield rural workers from drudgery, creating vibrant agricultural communities.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
