import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';
import { useLanguage } from '../context/LanguageContext';
import { Sprout, ShoppingBag, Sparkles, LayoutDashboard, UserCheck } from 'lucide-react';

interface MobileBottomNavProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ currentView, setCurrentView }) => {
  const { currentUser, openAuthModal } = useAuth();
  const { cartCount, setIsCartOpen, setIsKrishiMitraOpen } = useStore();
  const { t } = useLanguage();

  const handlePortalClick = () => {
    if (!currentUser) {
      openAuthModal('login');
      return;
    }
    if (currentUser.role === 'farmer') {
      setCurrentView('farmer-dashboard');
    } else if (currentUser.role === 'consumer') {
      setCurrentView('orders');
    } else if (currentUser.role === 'admin') {
      setCurrentView('admin');
    } else {
      setCurrentView('labour');
    }
  };

  const isPortalActive =
    currentView === 'farmer-dashboard' ||
    currentView === 'orders' ||
    currentView === 'admin';

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E5E0D5] py-1.5 px-3 md:hidden shadow-lg safe-bottom">
      <div className="flex items-center justify-around">
        
        {/* Home */}
        <button
          onClick={() => setCurrentView('home')}
          className={`flex flex-col items-center py-1 px-2 rounded-xl transition-colors ${
            currentView === 'home' ? 'text-[#1B5E3B] font-bold' : 'text-gray-500'
          }`}
        >
          <Sprout className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">{t('home')}</span>
        </button>

        {/* Marketplace */}
        <button
          onClick={() => setCurrentView('marketplace')}
          className={`flex flex-col items-center py-1 px-2 rounded-xl transition-colors ${
            currentView === 'marketplace' ? 'text-[#1B5E3B] font-bold' : 'text-gray-500'
          }`}
        >
          <ShoppingBag className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">{t('marketplace')}</span>
        </button>

        {/* Krishi Mitra AI */}
        <button
          onClick={() => setIsKrishiMitraOpen(true)}
          className="flex flex-col items-center -mt-4"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center text-white shadow-md shadow-amber-500/30">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <span className="text-[10px] font-bold text-amber-700 mt-0.5">Krishi AI</span>
        </button>

        {/* Cart */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center py-1 px-2 text-gray-500 rounded-xl"
        >
          <ShoppingBag className="w-5 h-5 mb-0.5" />
          {cartCount > 0 && (
            <span className="absolute top-0 right-1 bg-rose-600 text-white text-[9px] font-black rounded-full h-4 w-4 flex items-center justify-center">
              {cartCount}
            </span>
          )}
          <span className="text-[10px]">{t('cart')}</span>
        </button>

        {/* My Portal */}
        <button
          onClick={handlePortalClick}
          className={`flex flex-col items-center py-1 px-2 rounded-xl transition-colors ${
            isPortalActive ? 'text-[#1B5E3B] font-bold' : 'text-gray-500'
          }`}
        >
          {currentUser?.role === 'farmer' ? (
            <LayoutDashboard className="w-5 h-5 mb-0.5" />
          ) : (
            <UserCheck className="w-5 h-5 mb-0.5" />
          )}
          <span className="text-[10px]">
            {currentUser?.role === 'farmer' ? 'Farmer' : currentUser?.role === 'consumer' ? 'Orders' : 'Portal'}
          </span>
        </button>

      </div>
    </nav>
  );
};
