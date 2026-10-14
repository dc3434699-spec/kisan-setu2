import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useLanguage } from '../context/LanguageContext';
import { TrendingUp, TrendingDown, Minus, RefreshCw, ChevronRight } from 'lucide-react';

interface MandiTickerProps {
  onOpenMandiModal?: () => void;
}

export const MandiTicker: React.FC<MandiTickerProps> = ({ onOpenMandiModal }) => {
  const { mandiRates } = useStore();
  const { t } = useLanguage();
  const [filter, setFilter] = useState('');

  const filteredRates = filter
    ? mandiRates.filter(r => r.commodity.toLowerCase().includes(filter.toLowerCase()) || r.market.toLowerCase().includes(filter.toLowerCase()))
    : mandiRates;

  return (
    <div className="bg-[#1B3B22] text-[#EBF1E8] border-b border-[#2D5A27] text-xs py-2 px-3 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 shrink-0">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1">
            📊 {t('mandiRates')} (APMC Live):
          </span>
        </div>

        {/* Scrolling or Flex Items */}
        <div className="flex-1 flex items-center overflow-x-auto no-scrollbar gap-4 py-0.5">
          {filteredRates.map(rate => (
            <div
              key={rate.id}
              className="flex items-center gap-1.5 shrink-0 bg-white/10 hover:bg-white/15 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
              onClick={onOpenMandiModal}
              title={`${rate.market}: ₹${rate.modalPrice}/qtl (${rate.change})`}
            >
              <span className="font-semibold text-white">{rate.commodity}:</span>
              <span className="text-amber-200">₹{rate.modalPrice}/qtl</span>
              <span className="text-[10px] text-gray-300">({rate.market})</span>
              {rate.trend === 'up' && (
                <span className="flex items-center text-emerald-300 text-[10px] font-bold">
                  <TrendingUp className="w-3 h-3 ml-0.5" /> {rate.change}
                </span>
              )}
              {rate.trend === 'down' && (
                <span className="flex items-center text-rose-300 text-[10px] font-bold">
                  <TrendingDown className="w-3 h-3 ml-0.5" /> {rate.change}
                </span>
              )}
              {rate.trend === 'stable' && (
                <span className="flex items-center text-gray-300 text-[10px]">
                  <Minus className="w-3 h-3" />
                </span>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={onOpenMandiModal}
          className="shrink-0 hidden md:flex items-center gap-1 text-[11px] text-amber-300 hover:text-white font-medium transition-colors"
        >
          <span>View All APMCs</span>
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
