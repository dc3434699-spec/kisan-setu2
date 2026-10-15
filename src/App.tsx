import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { StoreProvider } from './context/StoreContext';
import { LanguageProvider } from './context/LanguageContext';
import { AccessibilityProvider } from './context/AccessibilityContext';

// Components
import { MandiTicker } from './components/MandiTicker';
import { Navbar } from './components/Navbar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { CartDrawer } from './components/CartDrawer';
import { TraceabilityModal } from './components/TraceabilityModal';
import { MapModal } from './components/MapModal';
import { KrishiMitraModal } from './components/KrishiMitraModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SlotBookingModal } from './components/SlotBookingModal';

// Pages
import { HomeView } from './pages/HomeView';
import { MarketplaceView } from './pages/MarketplaceView';
import { FarmerDashboardView } from './pages/FarmerDashboardView';
import { GovernmentSchemesView } from './pages/GovernmentSchemesView';
import { EquipmentMarketplaceView } from './pages/EquipmentMarketplaceView';
import { LabourPortalView } from './pages/LabourPortalView';
import { AgroTourismView } from './pages/AgroTourismView';
import { ConsumerOrdersView } from './pages/ConsumerOrdersView';
import { SustainabilityView } from './pages/SustainabilityView';
import { AdminDashboardView } from './pages/AdminDashboardView';

import { Product, FarmSlot } from './types';

const MainApp: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<FarmSlot | null>(null);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'marketplace':
        return (
          <MarketplaceView
            onSelectProduct={p => setSelectedProduct(p)}
            onOpenFarmerDashboard={() => setCurrentView('farmer-dashboard')}
          />
        );
      case 'farmer-dashboard':
        return <FarmerDashboardView />;
      case 'schemes':
        return <GovernmentSchemesView />;
      case 'equipment':
        return <EquipmentMarketplaceView />;
      case 'labour':
        return <LabourPortalView />;
      case 'visits':
        return (
          <AgroTourismView
            onSelectSlot={s => setSelectedSlot(s)}
          />
        );
      case 'orders':
        return (
          <ConsumerOrdersView
            onOpenMarketplace={() => setCurrentView('marketplace')}
          />
        );
      case 'sustainability':
        return <SustainabilityView />;
      case 'admin':
        return <AdminDashboardView />;
      case 'home':
      default:
        return (
          <HomeView
            setCurrentView={setCurrentView}
            onSelectProduct={p => setSelectedProduct(p)}
            onSelectSlot={s => setSelectedSlot(s)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#2D3A26]">
      {/* 1. Live Mandi Rates Ticker */}
      <MandiTicker onOpenMandiModal={() => setCurrentView('home')} />

      {/* 2. Primary Navigation Header */}
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />

      {/* 3. Main Dynamic Content */}
      <main className="flex-1">
        {renderCurrentView()}
      </main>

      {/* 4. Comprehensive Agricultural Footer */}
      <Footer setCurrentView={setCurrentView} />

      {/* 5. Mobile-First Bottom Nav (360px - 430px) */}
      <MobileBottomNav currentView={currentView} setCurrentView={setCurrentView} />

      {/* 6. Global Interactive Modals */}
      <AuthModal onNavigate={setCurrentView} />
      <CartDrawer onOpenOrders={() => setCurrentView('orders')} />
      <TraceabilityModal />
      <MapModal />
      <KrishiMitraModal onNavigate={viewId => setCurrentView(viewId)} />
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
      <SlotBookingModal
        slot={selectedSlot}
        onClose={() => setSelectedSlot(null)}
        onViewPasses={() => setCurrentView('visits')}
      />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <StoreProvider>
        <LanguageProvider>
          <AccessibilityProvider>
            <MainApp />
          </AccessibilityProvider>
        </LanguageProvider>
      </StoreProvider>
    </AuthProvider>
  );
}
