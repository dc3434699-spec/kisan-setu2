import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Sprout, Phone, Mail, MapPin, Heart, ShieldCheck, Award, Truck, Sparkles } from 'lucide-react';

interface FooterProps {
  setCurrentView: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentView }) => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#1B3B22] text-[#FAF9F6] border-t border-[#2D5A27] pt-12 pb-24 md:pb-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-10 border-b border-white/10 text-center">
          <div className="flex flex-col items-center p-3 rounded-2xl bg-white/5">
            <ShieldCheck className="w-6 h-6 text-emerald-400 mb-1" />
            <span className="text-xs font-bold">100% Residue-Free</span>
            <span className="text-[10px] text-gray-300">Lab Certified Freshness</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-2xl bg-white/5">
            <Award className="w-6 h-6 text-amber-400 mb-1" />
            <span className="text-xs font-bold">+42% Farmer Income</span>
            <span className="text-[10px] text-gray-300">Zero Middlemen Exploitation</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-2xl bg-white/5">
            <Truck className="w-6 h-6 text-emerald-400 mb-1" />
            <span className="text-xs font-bold">18-Hour Field-to-Home</span>
            <span className="text-[10px] text-gray-300">Direct morning harvest dispatch</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-2xl bg-white/5">
            <Sparkles className="w-6 h-6 text-amber-400 mb-1" />
            <span className="text-xs font-bold">Traceable Batch IDs</span>
            <span className="text-[10px] text-gray-300">Full harvest journey transparency</span>
          </div>
        </div>

        {/* 4 Column Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                KisanSetu <span className="text-emerald-400 text-lg font-sans font-bold">2.0</span>
              </span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed max-w-sm">
              India's comprehensive agricultural digital ecosystem connecting farmers, conscious consumers, farm labour cooperatives, machinery providers, and government subsidies on a unified platform.
            </p>
            <div className="pt-2">
              <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block mb-1">
                National Farmers Call Centre:
              </span>
              <p className="text-xs font-semibold flex items-center gap-1.5 text-white">
                <Phone className="w-3.5 h-3.5 text-emerald-400" /> Toll-Free 1800-180-1551 (Kisan Call Centre)
              </p>
              <p className="text-xs font-semibold flex items-center gap-1.5 text-white mt-1">
                <Mail className="w-3.5 h-3.5 text-emerald-400" /> support@kisansetu2.org
              </p>
            </div>
          </div>

          {/* Quick Ecosystem Links */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">Ecosystem Hub</h4>
            <ul className="space-y-1.5 text-xs text-gray-300">
              <li><button onClick={() => setCurrentView('marketplace')} className="hover:text-emerald-400 transition-colors">Direct Produce Marketplace</button></li>
              <li><button onClick={() => setCurrentView('visits')} className="hover:text-emerald-400 transition-colors">Agro-Tourism & Farm Tours</button></li>
              <li><button onClick={() => setCurrentView('schemes')} className="hover:text-emerald-400 transition-colors">Government Subsidies & Schemes</button></li>
              <li><button onClick={() => setCurrentView('equipment')} className="hover:text-emerald-400 transition-colors">Machinery & Tool Rentals</button></li>
              <li><button onClick={() => setCurrentView('labour')} className="hover:text-emerald-400 transition-colors">Farm Labour Cooperatives</button></li>
            </ul>
          </div>

          {/* Portals */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">Portals</h4>
            <ul className="space-y-1.5 text-xs text-gray-300">
              <li><button onClick={() => setCurrentView('farmer-dashboard')} className="hover:text-emerald-400 transition-colors">Farmer Management Suite</button></li>
              <li><button onClick={() => setCurrentView('orders')} className="hover:text-emerald-400 transition-colors">Consumer Orders & Passes</button></li>
              <li><button onClick={() => setCurrentView('labour')} className="hover:text-emerald-400 transition-colors">Agricultural Worker Board</button></li>
              <li><button onClick={() => setCurrentView('admin')} className="hover:text-emerald-400 transition-colors">Platform Administration</button></li>
              <li><button onClick={() => setCurrentView('sustainability')} className="hover:text-emerald-400 transition-colors">Sustainability Metrics</button></li>
            </ul>
          </div>

          {/* Govt & National Initiatives */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300">Govt Portals</h4>
            <ul className="space-y-1.5 text-xs text-gray-300">
              <li><a href="https://pmkisan.gov.in" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">PM-KISAN Portal ↗</a></li>
              <li><a href="https://pmkusum.mnre.gov.in" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">PM-KUSUM Solar ↗</a></li>
              <li><a href="https://pmksy.gov.in" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">PMKSY Per Drop More Crop ↗</a></li>
              <li><a href="https://pmfby.gov.in" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">PMFBY Crop Insurance ↗</a></li>
              <li><a href="https://agmarknet.gov.in" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">Agmarknet Mandi Prices ↗</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-400 gap-3">
          <p>© 2026 KisanSetu 2.0 Digital Ecosystem. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with pride for Indian Farmers & Rural Communities <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
          </p>
        </div>

      </div>
    </footer>
  );
};
