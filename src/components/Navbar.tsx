import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';
import { useLanguage, Language } from '../context/LanguageContext';
import { useAccessibility } from '../context/AccessibilityContext';
import {
  Sprout,
  ShoppingBag,
  Sparkles,
  MapPin,
  Globe,
  Sun,
  Eye,
  Type,
  User as UserIcon,
  LogOut,
  ChevronDown,
  Menu,
  X,
  FileText,
  Wrench,
  Users,
  Compass,
  BarChart3,
  ShieldCheck,
  Check
} from 'lucide-react';

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, setCurrentView }) => {
  const { currentUser, loginAsDemo, logout, openAuthModal } = useAuth();
  const { cartCount, setIsCartOpen, setIsKrishiMitraOpen, setIsMapModalOpen } = useStore();
  const { language, setLanguage, t } = useLanguage();
  const { highContrast, toggleHighContrast, textSize, setTextSize } = useAccessibility();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDemoDropdownOpen, setIsDemoDropdownOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isA11yDropdownOpen, setIsA11yDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: t('home'), icon: Sprout },
    { id: 'marketplace', label: t('marketplace'), icon: ShoppingBag },
    { id: 'visits', label: t('agroTourism'), icon: Compass },
    { id: 'schemes', label: t('schemes'), icon: FileText },
    { id: 'equipment', label: t('equipment'), icon: Wrench },
    { id: 'labour', label: t('labour'), icon: Users },
    { id: 'sustainability', label: t('sustainability'), icon: BarChart3 }
  ];

  const handleNavClick = (viewId: string) => {
    setCurrentView(viewId);
    setIsMobileMenuOpen(false);
  };

  const getRoleBadge = (role?: string) => {
    switch (role) {
      case 'farmer':
        return { label: '🌾 Farmer', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
      case 'consumer':
        return { label: '🛒 Buyer', color: 'bg-amber-100 text-amber-800 border-amber-300' };
      case 'worker':
        return { label: '👷 Labour', color: 'bg-blue-100 text-blue-800 border-blue-300' };
      case 'admin':
        return { label: '🛡️ Admin', color: 'bg-purple-100 text-purple-800 border-purple-300' };
      default:
        return { label: 'Guest', color: 'bg-gray-100 text-gray-700 border-gray-300' };
    }
  };

  const roleInfo = getRoleBadge(currentUser?.role);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6] border-b border-[#E5E0D5] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => handleNavClick('home')}>
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-[#1B5E3B] to-[#2D5A27] flex items-center justify-center text-white shadow-md shadow-[#1B5E3B]/20">
              <Sprout className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#1B3B22]">
                  {t('appName')}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-[#1B5E3B]/10 text-[#1B5E3B] border border-[#1B5E3B]/20">
                  2.0
                </span>
              </div>
              <p className="text-[10px] text-[#6B8F71] font-medium hidden sm:block tracking-wide">
                Farm2Home Digital Ecosystem
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1 lg:space-x-1.5">
            {navLinks.map(link => {
              const Icon = link.icon;
              const isActive = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#1B5E3B] text-white shadow-xs'
                      : 'text-[#2D3A26] hover:bg-[#EBF1E8] hover:text-[#1B5E3B]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            
            {/* Interactive Map Button */}
            <button
              onClick={() => setIsMapModalOpen(true)}
              className="p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-medium text-[#2D3A26] hover:bg-[#EBF1E8] border border-transparent hover:border-[#E5E0D5] transition-all flex items-center gap-1.5"
              title="Agricultural Map & Local Farms"
            >
              <MapPin className="w-4 h-4 text-[#1B5E3B]" />
              <span className="hidden md:inline">Map</span>
            </button>

            {/* Krishi Mitra AI Trigger */}
            <button
              onClick={() => setIsKrishiMitraOpen(true)}
              className="relative flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs font-bold shadow-xs transition-all transform hover:scale-102"
              title="AI Agricultural Assistant"
            >
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span className="hidden sm:inline">Krishi Mitra</span>
              <span className="sm:hidden">AI</span>
            </button>

            {/* Language Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="p-2 sm:px-2.5 sm:py-2 rounded-xl text-xs font-medium text-[#2D3A26] hover:bg-[#EBF1E8] border border-[#E5E0D5] transition-all flex items-center gap-1"
                title="Select Language"
              >
                <Globe className="w-3.5 h-3.5 text-[#1B5E3B]" />
                <span className="uppercase font-bold text-[11px]">{language}</span>
                <ChevronDown className="w-3 h-3 text-gray-500" />
              </button>

              {isLangDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white border border-[#E5E0D5] rounded-2xl shadow-lg py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Language
                  </div>
                  {[
                    { code: 'en', label: 'English' },
                    { code: 'hi', label: 'हिन्दी (Hindi)' },
                    { code: 'mr', label: 'मराठी (Marathi)' }
                  ].map(l => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code as Language);
                        setIsLangDropdownOpen(false);
                      }}
                      className="w-full px-3 py-1.5 text-left text-xs text-[#2D3A26] hover:bg-[#EBF1E8] flex items-center justify-between"
                    >
                      <span>{l.label}</span>
                      {language === l.code && <Check className="w-3.5 h-3.5 text-[#1B5E3B]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Accessibility Dropdown */}
            <div className="relative hidden lg:block">
              <button
                onClick={() => setIsA11yDropdownOpen(!isA11yDropdownOpen)}
                className="p-2 rounded-xl text-xs text-[#2D3A26] hover:bg-[#EBF1E8] border border-[#E5E0D5] transition-all"
                title="Accessibility Preferences"
              >
                <Eye className="w-4 h-4 text-[#5D7A4F]" />
              </button>

              {isA11yDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-[#E5E0D5] rounded-2xl shadow-lg p-2.5 z-50">
                  <p className="text-[11px] font-bold text-[#2D3A26] mb-2 uppercase tracking-wider">
                    Accessibility
                  </p>
                  
                  {/* High Contrast */}
                  <button
                    onClick={toggleHighContrast}
                    className="w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-xs hover:bg-[#FAF9F6] border border-gray-100 mb-2"
                  >
                    <span className="flex items-center gap-1.5">
                      <Sun className="w-3.5 h-3.5" /> High Contrast
                    </span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${highContrast ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-600'}`}>
                      {highContrast ? 'ON' : 'OFF'}
                    </span>
                  </button>

                  {/* Font Size */}
                  <div className="border-t border-gray-100 pt-2">
                    <span className="text-[10px] text-gray-500 font-medium block mb-1.5">Font Size:</span>
                    <div className="grid grid-cols-3 gap-1">
                      {(['normal', 'large', 'xlarge'] as const).map(size => (
                        <button
                          key={size}
                          onClick={() => setTextSize(size)}
                          className={`py-1 text-[11px] font-bold rounded text-center border ${
                            textSize === size
                              ? 'bg-[#1B5E3B] text-white border-[#1B5E3B]'
                              : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                          }`}
                        >
                          {size === 'normal' ? 'A' : size === 'large' ? 'A+' : 'A++'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 sm:px-3 sm:py-2 rounded-xl bg-white border border-[#E5E0D5] hover:border-[#1B5E3B] hover:bg-[#FAF8F5] transition-all flex items-center gap-1.5"
              title="View Cart"
            >
              <ShoppingBag className="w-4 h-4 text-[#1B5E3B]" />
              <span className="hidden sm:inline text-xs font-semibold text-[#2D3A26]">{t('cart')}</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#EF4444] text-white text-[10px] font-extrabold rounded-full h-5 w-5 flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Profile & Demo Switcher */}
            <div className="relative">
              {currentUser ? (
                <button
                  onClick={() => setIsDemoDropdownOpen(!isDemoDropdownOpen)}
                  className="flex items-center gap-2 p-1 sm:p-1.5 rounded-2xl bg-white border border-[#E5E0D5] hover:border-[#1B5E3B] transition-all"
                >
                  <img
                    src={currentUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80'}
                    alt={currentUser.name}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl object-cover"
                  />
                  <div className="text-left hidden md:block">
                    <p className="text-xs font-bold text-[#2D3A26] leading-none truncate max-w-[100px]">
                      {currentUser.name.split(' ')[0]}
                    </p>
                    <span className={`text-[10px] font-semibold px-1 rounded border ${roleInfo.color}`}>
                      {roleInfo.label}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400 mr-0.5" />
                </button>
              ) : (
                <button
                  onClick={() => openAuthModal('login')}
                  className="px-3.5 py-1.5 rounded-xl bg-[#1B5E3B] hover:bg-[#2D5A27] text-white text-xs font-semibold shadow-xs transition-colors"
                >
                  {t('login')}
                </button>
              )}

              {/* Demo Switcher & Account Dropdown */}
              {isDemoDropdownOpen && currentUser && (
                <div className="absolute right-0 mt-2 w-72 bg-white border border-[#E5E0D5] rounded-3xl shadow-xl p-3 z-50 animate-in fade-in duration-100">
                  <div className="pb-3 border-b border-gray-100 flex items-center gap-3">
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-10 h-10 rounded-2xl object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-[#2D3A26] truncate">{currentUser.name}</p>
                      <p className="text-[11px] text-gray-500 truncate">{currentUser.email || currentUser.phone}</p>
                      <span className={`inline-block mt-1 text-[10px] font-bold px-1.5 py-0.2 rounded border ${roleInfo.color}`}>
                        {roleInfo.label}
                      </span>
                    </div>
                  </div>

                  {/* Role Specific Quick Jump */}
                  <div className="py-2 border-b border-gray-100">
                    {currentUser.role === 'farmer' && (
                      <button
                        onClick={() => {
                          setCurrentView('farmer-dashboard');
                          setIsDemoDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold hover:bg-emerald-100 transition-colors flex items-center justify-between"
                      >
                        <span>🌾 Go to Farmer Portal</span>
                        <ChevronDown className="w-3.5 h-3.5 -rotate-90 text-emerald-700" />
                      </button>
                    )}
                    {currentUser.role === 'consumer' && (
                      <button
                        onClick={() => {
                          setCurrentView('orders');
                          setIsDemoDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl bg-amber-50 text-amber-800 text-xs font-bold hover:bg-amber-100 transition-colors flex items-center justify-between"
                      >
                        <span>🛒 My Orders & Passes</span>
                        <ChevronDown className="w-3.5 h-3.5 -rotate-90 text-amber-700" />
                      </button>
                    )}
                    {currentUser.role === 'worker' && (
                      <button
                        onClick={() => {
                          setCurrentView('labour');
                          setIsDemoDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl bg-blue-50 text-blue-800 text-xs font-bold hover:bg-blue-100 transition-colors flex items-center justify-between"
                      >
                        <span>👷 Labour Assignments</span>
                        <ChevronDown className="w-3.5 h-3.5 -rotate-90 text-blue-700" />
                      </button>
                    )}
                    {currentUser.role === 'admin' && (
                      <button
                        onClick={() => {
                          setCurrentView('admin');
                          setIsDemoDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl bg-purple-50 text-purple-800 text-xs font-bold hover:bg-purple-100 transition-colors flex items-center justify-between"
                      >
                        <span>🛡️ Admin Oversight</span>
                        <ChevronDown className="w-3.5 h-3.5 -rotate-90 text-purple-700" />
                      </button>
                    )}
                  </div>

                  {/* 1-Click Demo Accounts Switcher */}
                  <div className="py-2 border-b border-gray-100">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 px-1">
                      Instant Demo Role Switcher:
                    </p>
                    <div className="space-y-1">
                      {[
                        { key: 'rajesh_farmer', label: '🌾 Rajesh (Organic Farmer)', desc: 'Green Valley Organic' },
                        { key: 'anita_orchards', label: '🍊 Anita (Fruit Orchardist)', desc: 'Surya Sunburst Orchards' },
                        { key: 'tanmay123', label: '🛒 Tanmay (Consumer Buyer)', desc: 'Fresh Produce Shopper' },
                        { key: 'suresh_worker', label: '👷 Babanrao (Labour Team)', desc: 'Shivaji Agro Cooperative' },
                        { key: 'admin', label: '🛡️ Admin (Platform Ops)', desc: 'KisanSetu Admin' }
                      ].map(item => (
                        <button
                          key={item.key}
                          onClick={() => {
                            loginAsDemo(item.key, view => setCurrentView(view));
                            setIsDemoDropdownOpen(false);
                          }}
                          className={`w-full px-2.5 py-1.5 rounded-xl text-left text-xs flex flex-col transition-colors ${
                            currentUser.username === item.key
                              ? 'bg-[#1B5E3B]/10 border border-[#1B5E3B]/30 font-bold text-[#1B5E3B]'
                              : 'hover:bg-gray-50 text-[#2D3A26]'
                          }`}
                        >
                          <span className="font-semibold text-[11px]">{item.label}</span>
                          <span className="text-[10px] text-gray-500">{item.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Logout */}
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        logout();
                        setIsDemoDropdownOpen(false);
                      }}
                      className="w-full px-3 py-1.5 rounded-xl text-left text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-medium"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>{t('logout')}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl xl:hidden text-[#2D3A26] hover:bg-[#EBF1E8]"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-[#FAF9F6] border-b border-[#E5E0D5] px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-150">
          <div className="grid grid-cols-2 gap-2 mb-3">
            {navLinks.map(link => {
              const Icon = link.icon;
              const isActive = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center gap-2 p-3 rounded-2xl text-xs font-bold transition-all text-left ${
                    isActive
                      ? 'bg-[#1B5E3B] text-white shadow-xs'
                      : 'bg-white border border-[#E5E0D5] text-[#2D3A26] hover:bg-[#EBF1E8]'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{link.label}</span>
                </button>
              );
            })}
          </div>

          {currentUser?.role === 'farmer' && (
            <button
              onClick={() => handleNavClick('farmer-dashboard')}
              className="w-full p-3 rounded-2xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2"
            >
              🌾 Open Farmer Portal Dashboard
            </button>
          )}

          {currentUser?.role === 'consumer' && (
            <button
              onClick={() => handleNavClick('orders')}
              className="w-full p-3 rounded-2xl bg-amber-600 text-white font-bold text-xs flex items-center justify-center gap-2"
            >
              🛒 View My Orders & Passes
            </button>
          )}

          {currentUser?.role === 'admin' && (
            <button
              onClick={() => handleNavClick('admin')}
              className="w-full p-3 rounded-2xl bg-purple-600 text-white font-bold text-xs flex items-center justify-center gap-2"
            >
              🛡️ Admin Oversight Panel
            </button>
          )}
        </div>
      )}
    </header>
  );
};
