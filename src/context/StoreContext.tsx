import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  Order,
  FarmSlot,
  VisitBooking,
  LaborGroup,
  WorkerRequest,
  Scheme,
  EquipmentItem,
  EquipmentOrder,
  MandiRate,
  FarmExpense,
  Review
} from '../types';
import {
  initialProducts,
  initialSlots,
  initialBookings,
  initialOrders,
  initialLaborGroups,
  initialWorkerRequests,
  initialSchemes,
  initialEquipment,
  initialMandiRates,
  initialExpenses,
  initialReviews
} from '../data/initialData';

interface Coupon {
  code: string;
  discountPercent?: number;
  flatDiscount?: number;
}

interface StoreContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'rating' | 'reviewsCount'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;

  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  orders: Order[];
  placeOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'trackingNumber'>) => Order;
  updateOrderStatus: (orderId: string, status: Order['orderStatus']) => void;
  cancelOrder: (orderId: string) => void;

  slots: FarmSlot[];
  addSlot: (slot: Omit<FarmSlot, 'id' | 'bookedCount'>) => void;
  updateSlot: (id: string, updates: Partial<FarmSlot>) => void;
  deleteSlot: (id: string) => void;

  bookings: VisitBooking[];
  bookSlot: (slot: FarmSlot, visitorCount: number, consumerInfo: { id: string; name: string; phone: string; email: string }) => VisitBooking;
  cancelBooking: (bookingId: string) => void;

  laborGroups: LaborGroup[];
  workerRequests: WorkerRequest[];
  createWorkerRequest: (req: Omit<WorkerRequest, 'id' | 'requestCode' | 'assignedWorkersCount' | 'status' | 'createdAt'>) => WorkerRequest;
  matchWorkerRequest: (requestId: string, groupId: string) => void;
  updateRequestStatus: (requestId: string, status: WorkerRequest['status']) => void;

  schemes: Scheme[];
  bookmarkedSchemes: string[];
  toggleBookmarkScheme: (schemeId: string) => void;

  equipment: EquipmentItem[];
  equipmentOrders: EquipmentOrder[];
  orderEquipment: (equipmentId: string, orderType: 'buy' | 'rent', days?: number) => void;

  mandiRates: MandiRate[];
  expenses: FarmExpense[];
  addExpense: (expense: Omit<FarmExpense, 'id'>) => void;
  deleteExpense: (id: string) => void;

  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;

  // Global modals
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isTraceModalOpen: boolean;
  setIsTraceModalOpen: (open: boolean) => void;
  activeTraceBatchId: string;
  openTraceability: (batchId?: string) => void;
  isMapModalOpen: boolean;
  setIsMapModalOpen: (open: boolean) => void;
  isKrishiMitraOpen: boolean;
  setIsKrishiMitraOpen: (open: boolean) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Helper to load or fallback
  const load = <T,>(key: string, fallback: T): T => {
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(`Error parsing ${key}`, e);
      }
    }
    return fallback;
  };

  const [products, setProducts] = useState<Product[]>(() => {
    const loaded = load<Product[]>('kisansetu_products', initialProducts);
    // Automatic schema migration: ensure updated spinach image and pricing discounts are applied
    return loaded.map(p => {
      if (p.id === 'prod_spinach_rajesh') {
        return {
          ...p,
          image: '/images/spinach.jpg',
          pricePerUnit: 25,
          originalPrice: 30,
          discountPercent: 17,
          promotionalBadge: '17% OFF / Save ₹5'
        };
      }
      const initial = initialProducts.find(ip => ip.id === p.id);
      if (initial && initial.originalPrice && !p.originalPrice) {
        return {
          ...p,
          originalPrice: initial.originalPrice,
          discountPercent: initial.discountPercent,
          promotionalBadge: initial.promotionalBadge
        };
      }
      return p;
    });
  });
  const [cart, setCart] = useState<CartItem[]>(() => load('kisansetu_cart', []));
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => load('kisansetu_coupon', null));
  const [orders, setOrders] = useState<Order[]>(() => load('kisansetu_orders', initialOrders));
  const [slots, setSlots] = useState<FarmSlot[]>(() => load('kisansetu_slots', initialSlots));
  const [bookings, setBookings] = useState<VisitBooking[]>(() => load('kisansetu_bookings', initialBookings));
  const [laborGroups] = useState<LaborGroup[]>(() => load('kisansetu_labor_groups', initialLaborGroups));
  const [workerRequests, setWorkerRequests] = useState<WorkerRequest[]>(() => load('kisansetu_worker_requests', initialWorkerRequests));
  const [schemes] = useState<Scheme[]>(() => load('kisansetu_schemes', initialSchemes));
  const [bookmarkedSchemes, setBookmarkedSchemes] = useState<string[]>(() => load('kisansetu_bookmarked_schemes', ['pm-kusum-solar', 'pmksy-micro-irrigation']));
  const [equipment] = useState<EquipmentItem[]>(() => load('kisansetu_equipment', initialEquipment));
  const [equipmentOrders, setEquipmentOrders] = useState<EquipmentOrder[]>(() => load('kisansetu_instrument_orders', []));
  const [mandiRates] = useState<MandiRate[]>(() => load('kisansetu_mandi_rates', initialMandiRates));
  const [expenses, setExpenses] = useState<FarmExpense[]>(() => load('kisansetu_expenses', initialExpenses));
  const [reviews, setReviews] = useState<Review[]>(() => load('kisansetu_reviews', initialReviews));

  // Modal States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isTraceModalOpen, setIsTraceModalOpen] = useState(false);
  const [activeTraceBatchId, setActiveTraceBatchId] = useState('BATCH-TOM-2026-88');
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isKrishiMitraOpen, setIsKrishiMitraOpen] = useState(false);

  // Sync state to localStorage
  useEffect(() => { localStorage.setItem('kisansetu_products', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('kisansetu_cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('kisansetu_coupon', JSON.stringify(appliedCoupon)); }, [appliedCoupon]);
  useEffect(() => { localStorage.setItem('kisansetu_orders', JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem('kisansetu_slots', JSON.stringify(slots)); }, [slots]);
  useEffect(() => { localStorage.setItem('kisansetu_bookings', JSON.stringify(bookings)); }, [bookings]);
  useEffect(() => { localStorage.setItem('kisansetu_worker_requests', JSON.stringify(workerRequests)); }, [workerRequests]);
  useEffect(() => { localStorage.setItem('kisansetu_bookmarked_schemes', JSON.stringify(bookmarkedSchemes)); }, [bookmarkedSchemes]);
  useEffect(() => { localStorage.setItem('kisansetu_instrument_orders', JSON.stringify(equipmentOrders)); }, [equipmentOrders]);
  useEffect(() => { localStorage.setItem('kisansetu_expenses', JSON.stringify(expenses)); }, [expenses]);
  useEffect(() => { localStorage.setItem('kisansetu_reviews', JSON.stringify(reviews)); }, [reviews]);

  // Product Operations
  const addProduct = (prodData: Omit<Product, 'id' | 'rating' | 'reviewsCount'>) => {
    const newProduct: Product = {
      ...prodData,
      id: `prod_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      rating: 5.0,
      reviewsCount: 0
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // Cart Operations
  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.product.pricePerUnit * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Coupons
  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'KISAN50') {
      const coupon: Coupon = { code: 'KISAN50', flatDiscount: 50 };
      setAppliedCoupon(coupon);
      return { success: true, message: '₹50 discount applied!' };
    }
    if (clean === 'FIRSTFARM') {
      const coupon: Coupon = { code: 'FIRSTFARM', discountPercent: 15 };
      setAppliedCoupon(coupon);
      return { success: true, message: '15% discount applied on your first order!' };
    }
    if (clean === 'ORGANIC20') {
      const coupon: Coupon = { code: 'ORGANIC20', discountPercent: 20 };
      setAppliedCoupon(coupon);
      return { success: true, message: '20% organic harvest discount applied!' };
    }
    return { success: false, message: 'Invalid promo code. Try KISAN50 or FIRSTFARM.' };
  };

  const removeCoupon = () => setAppliedCoupon(null);

  // Orders
  const placeOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'trackingNumber'>): Order => {
    const id = `ord_${Date.now()}`;
    const orderNumber = `KS-ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const trackingNumber = `TRK-MH-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: Order = {
      ...orderData,
      id,
      orderNumber,
      trackingNumber,
      createdAt: new Date().toISOString()
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['orderStatus']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, orderStatus: status } : o));
  };

  const cancelOrder = (orderId: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, orderStatus: 'cancelled' } : o));
  };

  // Farm Slots
  const addSlot = (slotData: Omit<FarmSlot, 'id' | 'bookedCount'>) => {
    const newSlot: FarmSlot = {
      ...slotData,
      id: `slot_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      bookedCount: 0
    };
    setSlots(prev => [newSlot, ...prev]);
  };

  const updateSlot = (id: string, updates: Partial<FarmSlot>) => {
    setSlots(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const deleteSlot = (id: string) => {
    setSlots(prev => prev.filter(s => s.id !== id));
  };

  // Bookings
  const bookSlot = (
    slot: FarmSlot,
    visitorCount: number,
    consumerInfo: { id: string; name: string; phone: string; email: string }
  ): VisitBooking => {
    const bookingCode = `KS-VISIT-${Math.floor(1000 + Math.random() * 9000)}`;
    const qrCodeToken = `KS-PASS-${consumerInfo.name.toUpperCase().replace(/\s+/g, '_')}-${bookingCode}`;
    const newBooking: VisitBooking = {
      id: `book_${Date.now()}`,
      bookingCode,
      slotId: slot.id,
      slotDetails: slot,
      consumerId: consumerInfo.id,
      consumerName: consumerInfo.name,
      consumerPhone: consumerInfo.phone,
      consumerEmail: consumerInfo.email,
      visitDate: slot.date,
      visitorCount,
      totalPrice: slot.pricePerPerson * visitorCount,
      status: 'confirmed',
      qrCodeToken,
      createdAt: new Date().toISOString()
    };

    setBookings(prev => [newBooking, ...prev]);
    // Increment booked count
    setSlots(prev =>
      prev.map(s => (s.id === slot.id ? { ...s, bookedCount: s.bookedCount + visitorCount } : s))
    );
    return newBooking;
  };

  const cancelBooking = (bookingId: string) => {
    const found = bookings.find(b => b.id === bookingId);
    if (found) {
      setSlots(prev =>
        prev.map(s =>
          s.id === found.slotId ? { ...s, bookedCount: Math.max(0, s.bookedCount - found.visitorCount) } : s
        )
      );
    }
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'cancelled' } : b));
  };

  // Worker Requests
  const createWorkerRequest = (
    reqData: Omit<WorkerRequest, 'id' | 'requestCode' | 'assignedWorkersCount' | 'status' | 'createdAt'>
  ): WorkerRequest => {
    const requestCode = `WRK-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newReq: WorkerRequest = {
      ...reqData,
      id: `req_${Date.now()}`,
      requestCode,
      assignedWorkersCount: 0,
      status: 'open',
      createdAt: new Date().toISOString()
    };
    setWorkerRequests(prev => [newReq, ...prev]);
    return newReq;
  };

  const matchWorkerRequest = (requestId: string, groupId: string) => {
    const grp = laborGroups.find(g => g.id === groupId);
    setWorkerRequests(prev =>
      prev.map(r =>
        r.id === requestId
          ? {
              ...r,
              status: 'matched',
              matchedGroupId: groupId,
              matchedGroupName: grp?.groupName || 'Matched Labor Team',
              assignedWorkersCount: r.workersNeeded
            }
          : r
      )
    );
  };

  const updateRequestStatus = (requestId: string, status: WorkerRequest['status']) => {
    setWorkerRequests(prev => prev.map(r => r.id === requestId ? { ...r, status } : r));
  };

  // Schemes Bookmark
  const toggleBookmarkScheme = (schemeId: string) => {
    setBookmarkedSchemes(prev =>
      prev.includes(schemeId) ? prev.filter(id => id !== schemeId) : [...prev, schemeId]
    );
  };

  // Equipment Orders
  const orderEquipment = (equipmentId: string, orderType: 'buy' | 'rent', days = 1) => {
    const item = equipment.find(e => e.id === equipmentId);
    if (!item) return;
    const amount = orderType === 'buy' ? item.price : (item.rentalPricePerDay || 100) * days;
    const newOrder: EquipmentOrder = {
      id: `eq_ord_${Date.now()}`,
      equipmentId: item.id,
      equipmentName: item.name,
      userId: 'usr_current',
      userName: 'Current User',
      orderType,
      rentalDays: orderType === 'rent' ? days : undefined,
      totalAmount: amount,
      status: 'processing',
      createdAt: new Date().toISOString()
    };
    setEquipmentOrders(prev => [newOrder, ...prev]);
  };

  // Expenses
  const addExpense = (expData: Omit<FarmExpense, 'id'>) => {
    const newExpense: FarmExpense = {
      ...expData,
      id: `exp_${Date.now()}`
    };
    setExpenses(prev => [newExpense, ...prev]);
  };

  const deleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
  };

  // Reviews
  const addReview = (reviewData: Omit<Review, 'id' | 'date'>) => {
    const newRev: Review = {
      ...reviewData,
      id: `rev_${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    setReviews(prev => [newRev, ...prev]);
  };

  const openTraceability = (batchId?: string) => {
    if (batchId) {
      setActiveTraceBatchId(batchId);
    }
    setIsTraceModalOpen(true);
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartTotal,
        cartCount,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        orders,
        placeOrder,
        updateOrderStatus,
        cancelOrder,
        slots,
        addSlot,
        updateSlot,
        deleteSlot,
        bookings,
        bookSlot,
        cancelBooking,
        laborGroups,
        workerRequests,
        createWorkerRequest,
        matchWorkerRequest,
        updateRequestStatus,
        schemes,
        bookmarkedSchemes,
        toggleBookmarkScheme,
        equipment,
        equipmentOrders,
        orderEquipment,
        mandiRates,
        expenses,
        addExpense,
        deleteExpense,
        reviews,
        addReview,
        isCartOpen,
        setIsCartOpen,
        isTraceModalOpen,
        setIsTraceModalOpen,
        activeTraceBatchId,
        openTraceability,
        isMapModalOpen,
        setIsMapModalOpen,
        isKrishiMitraOpen,
        setIsKrishiMitraOpen
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
