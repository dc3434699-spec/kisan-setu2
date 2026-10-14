import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import {
  Sprout,
  Package,
  ShoppingBag,
  Compass,
  Users,
  FileText,
  Wrench,
  BarChart3,
  DollarSign,
  Settings,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  Clock,
  Calendar,
  AlertCircle,
  Truck,
  TrendingUp,
  CloudRain,
  Sun,
  ShieldCheck,
  QrCode,
  MapPin,
  ExternalLink
} from 'lucide-react';
import { Product, FarmSlot, WorkerRequest, FarmExpense, Order } from '../types';

export const FarmerDashboardView: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    slots,
    addSlot,
    deleteSlot,
    bookings,
    workerRequests,
    createWorkerRequest,
    laborGroups,
    schemes,
    bookmarkedSchemes,
    toggleBookmarkScheme,
    equipment,
    orderEquipment,
    expenses,
    addExpense,
    deleteExpense,
    openTraceability
  } = useStore();

  const { currentUser, updateProfile } = useAuth();
  const { t } = useLanguage();

  const [activeModule, setActiveModule] = useState<string>('overview');

  // New Product Modal Form State
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<Product['category']>('Vegetable');
  const [newProdQuantity, setNewProdQuantity] = useState('80');
  const [newProdUnit, setNewProdUnit] = useState<Product['unit']>('kg');
  const [newProdPrice, setNewProdPrice] = useState('45');
  const [newProdOrganic, setNewProdOrganic] = useState(true);
  const [newProdImage, setNewProdImage] = useState('https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=800&q=80');
  const [newProdDesc, setNewProdDesc] = useState('Freshly harvested using bio-compost and zero pesticides.');

  // New Visit Slot Modal State
  const [showAddSlotModal, setShowAddSlotModal] = useState(false);
  const [newSlotDate, setNewSlotDate] = useState('2026-10-25');
  const [newSlotStartTime, setNewSlotStartTime] = useState('09:00 AM');
  const [newSlotEndTime, setNewSlotEndTime] = useState('12:30 PM');
  const [newSlotMaxVisitors, setNewSlotMaxVisitors] = useState('20');
  const [newSlotPrice, setNewSlotPrice] = useState('250');
  const [newSlotDesc, setNewSlotDesc] = useState('Guided morning orchard walk, fruit plucking and organic farm breakfast.');

  // New Labour Request Modal State
  const [showAddLaborModal, setShowAddLaborModal] = useState(false);
  const [jobCategory, setJobCategory] = useState<WorkerRequest['jobCategory']>('Harvesting & Picking');
  const [cropName, setCropName] = useState('Desi Tomatoes');
  const [workersNeeded, setWorkersNeeded] = useState('6');
  const [wagePerWorker, setWagePerWorker] = useState('550');
  const [startDate, setStartDate] = useState('2026-10-22');
  const [durationDays, setDurationDays] = useState('3');
  const [foodStay, setFoodStay] = useState(true);

  // New Expense Modal State
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [expCategory, setExpCategory] = useState<FarmExpense['category']>('Labour Wages');
  const [expAmount, setExpAmount] = useState('1500');
  const [expDesc, setExpDesc] = useState('Paid for weeding labor');

  // Filter products for this farmer
  const farmerProducts = products.filter(
    p => p.farmerId === currentUser?.id || currentUser?.username === 'rajesh_farmer' || currentUser?.role === 'admin'
  );

  // Calculate Farmer Metrics
  const totalRevenue = orders
    .filter(o => o.orderStatus !== 'cancelled')
    .reduce((sum, o) => sum + o.total, 0);

  const totalExpenseAmount = expenses.reduce((sum, e) => sum + e.amount, 0);
  const netProfit = totalRevenue - totalExpenseAmount;

  const modules = [
    { id: 'overview', label: 'Farm Overview', icon: Sprout },
    { id: 'fields', label: '1. Crops & Fields', icon: Calendar },
    { id: 'stock', label: '2. Product Inventory', icon: Package },
    { id: 'orders', label: '3. Order Fulfillment', icon: ShoppingBag },
    { id: 'visits', label: '4. Farm Tour Slots', icon: Compass },
    { id: 'labour', label: '5. Labour Requests', icon: Users },
    { id: 'schemes', label: '6. Government Schemes', icon: FileText },
    { id: 'equipment', label: '7. Equipment & Rentals', icon: Wrench },
    { id: 'analytics', label: '8. Analytics & Yield', icon: BarChart3 },
    { id: 'expenses', label: '9. Expenses & Ledger', icon: DollarSign },
    { id: 'settings', label: '10. Farm Profile & KYC', icon: Settings }
  ];

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct({
      farmerId: currentUser?.id || 'usr_farmer_rajesh',
      farmName: currentUser?.farmerProfile?.farmName || 'Green Valley Organic Agro Farm',
      farmerName: currentUser?.name || 'Rajesh Kumar Patil',
      farmerLocation: `${currentUser?.location?.district || 'Nashik'}, Maharashtra`,
      farmLat: currentUser?.location?.lat || 19.9975,
      farmLng: currentUser?.location?.lng || 73.7898,
      name: newProdName,
      category: newProdCategory,
      quantity: Number(newProdQuantity),
      unit: newProdUnit,
      pricePerUnit: Number(newProdPrice),
      status: 'available',
      organic: newProdOrganic,
      image: newProdImage,
      description: newProdDesc,
      harvestDate: 'Morning Harvest Today',
      batchId: `BATCH-${newProdName.slice(0, 3).toUpperCase()}-2026-${Math.floor(10 + Math.random() * 90)}`
    });

    setNewProdName('');
    setShowAddProductModal(false);
  };

  const handleCreateSlot = (e: React.FormEvent) => {
    e.preventDefault();
    addSlot({
      farmerId: currentUser?.id || 'usr_farmer_rajesh',
      farmName: currentUser?.farmerProfile?.farmName || 'Green Valley Organic Agro Farm',
      farmerName: currentUser?.name || 'Rajesh Kumar Patil',
      farmLocation: currentUser?.farmerProfile?.farmName ? `${currentUser.farmerProfile.farmName}, ${currentUser.location?.district}` : 'Nashik, Maharashtra',
      farmLat: 19.9975,
      farmLng: 73.7898,
      date: newSlotDate,
      startTime: newSlotStartTime,
      endTime: newSlotEndTime,
      maxVisitors: Number(newSlotMaxVisitors),
      pricePerPerson: Number(newSlotPrice),
      description: newSlotDesc,
      activities: ['Field Walk', 'Fruit Picking', 'Farm Breakfast'],
      photos: [
        'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&q=80',
        'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=1200&q=80'
      ],
      includesRefreshments: true,
      status: 'open'
    });

    setShowAddSlotModal(false);
  };

  const handleCreateLaborRequest = (e: React.FormEvent) => {
    e.preventDefault();
    createWorkerRequest({
      farmerId: currentUser?.id || 'usr_farmer_rajesh',
      farmerName: currentUser?.name || 'Rajesh Kumar Patil',
      farmerPhone: currentUser?.phone || '+91 98220 14567',
      farmName: currentUser?.farmerProfile?.farmName || 'Green Valley Organic Agro Farm',
      farmLocation: `${currentUser?.location?.district || 'Nashik'} Belt`,
      jobCategory,
      cropName,
      workersNeeded: Number(workersNeeded),
      startDate,
      endDate: startDate,
      durationDays: Number(durationDays),
      workingHours: '08:00 AM - 05:00 PM',
      wagePerWorker: Number(wagePerWorker),
      foodStayProvided: foodStay,
      notes: 'Please bring cotton gloves. Noon meal provided.'
    });

    setShowAddLaborModal(false);
  };

  const handleCreateExpense = (e: React.FormEvent) => {
    e.preventDefault();
    addExpense({
      farmerId: currentUser?.id || 'usr_farmer_rajesh',
      date: new Date().toISOString().split('T')[0],
      category: expCategory,
      amount: Number(expAmount),
      description: expDesc
    });

    setShowAddExpenseModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Welcome Header */}
      <div className="bg-gradient-to-r from-[#1B3B22] to-[#2D5A27] text-white p-6 sm:p-8 rounded-3xl shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&q=80'}
            alt="Farmer avatar"
            className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-400 shrink-0 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl font-bold">{currentUser?.name || 'Rajesh Kumar Patil'}</h1>
              <span className="text-[10px] bg-emerald-400 text-emerald-950 font-extrabold px-2 py-0.5 rounded-full uppercase">
                {currentUser?.farmerProfile?.farmingStyle || '100% Organic'}
              </span>
            </div>
            <p className="text-xs text-gray-200 mt-0.5">
              {currentUser?.farmerProfile?.farmName || 'Green Valley Organic Agro Farm'} • {currentUser?.farmerProfile?.landArea || 18} Acres
            </p>
            <p className="text-[11px] text-emerald-300 flex items-center gap-1 mt-1">
              <MapPin className="w-3 h-3" /> Survey {currentUser?.farmerProfile?.surveyNumber || '42/1B'}, {currentUser?.location?.district || 'Nashik'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setShowAddProductModal(true)}
            className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Harvest Crop</span>
          </button>
        </div>
      </div>

      {/* Module Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar border-b border-[#E5E0D5]">
        {modules.map(m => {
          const Icon = m.icon;
          const isActive = activeModule === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setActiveModule(m.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#1B5E3B] text-white shadow-xs'
                  : 'bg-white border border-[#E5E0D5] text-[#2D3A26] hover:bg-[#EBF1E8]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{m.label}</span>
            </button>
          );
        })}
      </div>

      {/* ============================================================ */}
      {/* MODULE: OVERVIEW (DASHBOARD CARDS) */}
      {/* ============================================================ */}
      {activeModule === 'overview' && (
        <div className="space-y-6 animate-in fade-in">
          
          {/* Key Stat Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-[#E5E0D5] p-5 rounded-3xl shadow-2xs space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Total Produce GMV</span>
              <div className="font-serif text-2xl font-bold text-[#1B5E3B]">₹{totalRevenue.toLocaleString()}</div>
              <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" /> Direct fair farmer pricing
              </span>
            </div>

            <div className="bg-white border border-[#E5E0D5] p-5 rounded-3xl shadow-2xs space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Active Consumer Orders</span>
              <div className="font-serif text-2xl font-bold text-amber-600">{orders.length}</div>
              <span className="text-[11px] text-gray-500">{orders.filter(o => o.orderStatus === 'harvesting').length} awaiting morning dispatch</span>
            </div>

            <div className="bg-white border border-[#E5E0D5] p-5 rounded-3xl shadow-2xs space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Live Crops in Market</span>
              <div className="font-serif text-2xl font-bold text-[#1B3B22]">{farmerProducts.length}</div>
              <span className="text-[11px] text-emerald-700 font-medium">100% Residue-free certified</span>
            </div>

            <div className="bg-white border border-[#E5E0D5] p-5 rounded-3xl shadow-2xs space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Agro-Tourism Visitors</span>
              <div className="font-serif text-2xl font-bold text-purple-700">
                {bookings.reduce((sum, b) => sum + b.visitorCount, 0)} Pass Holders
              </div>
              <span className="text-[11px] text-gray-500">Weekend tour bookings</span>
            </div>
          </div>

          {/* Today's Tasks & Weather Alert Banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Weather & Agronomy Advisory */}
            <div className="bg-emerald-50/80 border border-emerald-200 p-5 rounded-3xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900">
                  Agro-Meteorological Forecast
                </span>
                <Sun className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <div className="text-2xl font-bold text-emerald-950">28°C • Sunny</div>
                <p className="text-xs text-emerald-800 mt-0.5">Nashik Microclimate • Humidity 42% • Wind 6 km/h</p>
              </div>
              <div className="bg-white/80 p-3 rounded-2xl text-xs text-emerald-950 space-y-1">
                <span className="font-bold block">🌾 Farming Advisory:</span>
                <p className="text-[11px] text-emerald-800">
                  Optimal day for neem oil foliar spray and strawberry runner mulching. Evening drip irrigation recommended for 45 mins.
                </p>
              </div>
            </div>

            {/* Today's Urgent Farm Tasks */}
            <div className="md:col-span-2 bg-white border border-[#E5E0D5] p-5 rounded-3xl space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-base font-bold text-[#1B3B22]">Today's Field Action Schedule</h3>
                <span className="text-xs text-emerald-700 font-bold">4 Tasks Pending</span>
              </div>

              <div className="space-y-2">
                {[
                  { title: 'Morning Harvest Dispatch (Desi Tomatoes & Spinach)', time: '05:30 AM', status: 'Completed', tag: 'Logistics' },
                  { title: 'Shivaji Agro Labour Team Check-in (6 Workers for Picking)', time: '07:30 AM', status: 'In Progress', tag: 'Labour' },
                  { title: 'Prepare 200L Jeevamrut Drum for Plot B Fertigation', time: '02:00 PM', status: 'Pending', tag: 'Agronomy' },
                  { title: 'Weekend Farm Visit Tour Pass Validations', time: '05:00 PM', status: 'Scheduled', tag: 'Tourism' }
                ].map((task, i) => (
                  <div key={i} className="flex items-center justify-between p-2.5 rounded-2xl bg-[#FAF9F6] border border-[#E5E0D5] text-xs">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#1B5E3B]" />
                      <div>
                        <span className="font-bold text-[#2D3A26] block">{task.title}</span>
                        <span className="text-[10px] text-gray-500">{task.time} • {task.tag}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      {task.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Quick Shortcuts to Modules */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              onClick={() => setActiveModule('orders')}
              className="p-4 rounded-2xl bg-white border border-[#E5E0D5] hover:border-emerald-500 text-left transition-colors"
            >
              <ShoppingBag className="w-5 h-5 text-amber-600 mb-1" />
              <div className="font-bold text-xs text-[#1B3B22]">Fulfill Orders</div>
              <div className="text-[10px] text-gray-500">Update shipping & batch tags</div>
            </button>

            <button
              onClick={() => setActiveModule('labour')}
              className="p-4 rounded-2xl bg-white border border-[#E5E0D5] hover:border-emerald-500 text-left transition-colors"
            >
              <Users className="w-5 h-5 text-blue-600 mb-1" />
              <div className="font-bold text-xs text-[#1B3B22]">Request Labour</div>
              <div className="text-[10px] text-gray-500">Connect with local cooperatives</div>
            </button>

            <button
              onClick={() => setActiveModule('schemes')}
              className="p-4 rounded-2xl bg-white border border-[#E5E0D5] hover:border-emerald-500 text-left transition-colors"
            >
              <FileText className="w-5 h-5 text-emerald-600 mb-1" />
              <div className="font-bold text-xs text-[#1B3B22]">Govt Subsidies</div>
              <div className="text-[10px] text-gray-500">Check solar & drip grants</div>
            </button>

            <button
              onClick={() => setActiveModule('expenses')}
              className="p-4 rounded-2xl bg-white border border-[#E5E0D5] hover:border-emerald-500 text-left transition-colors"
            >
              <DollarSign className="w-5 h-5 text-purple-600 mb-1" />
              <div className="font-bold text-xs text-[#1B3B22]">Financial Ledger</div>
              <div className="text-[10px] text-gray-500">Track inputs & net profit</div>
            </button>
          </div>

        </div>
      )}

      {/* ============================================================ */}
      {/* MODULE 1: CROPS & FIELDS */}
      {/* ============================================================ */}
      {activeModule === 'fields' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#1B3B22]">Plot Management & Crop Rotation</h3>
              <p className="text-xs text-gray-600">Active cultivation plots across 18 acres</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: 'Plot 1A (North Hillside)', crop: 'Desi Tomatoes (S-22)', area: '4.5 Acres', soil: 'Black Cotton', irrigation: 'Drip System (40cm)', status: 'Harvesting', health: '98% Prime' },
              { name: 'Plot 2B (River Terraces)', crop: 'Winter Strawberries', area: '3.0 Acres', soil: 'Red Loam', irrigation: 'Micro-Sprinkler', status: 'Flowering & Fruiting', health: '94% Prime' },
              { name: 'Plot 3C (Canal Basin)', crop: 'Baby Spinach & Carrots', area: '5.2 Acres', soil: 'Alluvial Loam', irrigation: 'Drip Laterals', status: 'Germination', health: '96% Prime' },
              { name: 'Plot 4D (South Grove)', crop: 'A2 Gir Cow Grazing Fodder', area: '5.3 Acres', soil: 'Native Grassland', irrigation: 'Rainfed & Canal', status: 'Perennial', health: '100% Natural' }
            ].map((p, idx) => (
              <div key={idx} className="bg-white border border-[#E5E0D5] p-4 rounded-3xl space-y-2.5 shadow-2xs">
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <h4 className="font-bold text-xs text-[#1B3B22]">{p.name}</h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    {p.status}
                  </span>
                </div>
                <div className="text-xs space-y-1 text-gray-600">
                  <p>Crop: <strong className="text-[#2D3A26]">{p.crop}</strong></p>
                  <p>Area: <strong className="text-[#2D3A26]">{p.area}</strong></p>
                  <p>Soil Type: <strong className="text-[#2D3A26]">{p.soil}</strong></p>
                  <p>Irrigation: <strong className="text-[#2D3A26]">{p.irrigation}</strong></p>
                  <p className="text-emerald-700 font-bold">Crop Health Score: {p.health}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODULE 2: PRODUCT & STOCK INVENTORY */}
      {/* ============================================================ */}
      {activeModule === 'stock' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#1B3B22]">Live Produce Inventory ({farmerProducts.length})</h3>
              <p className="text-xs text-gray-600">Crops currently available for consumer order with Batch IDs</p>
            </div>
            <button
              onClick={() => setShowAddProductModal(true)}
              className="px-4 py-2 rounded-2xl bg-[#1B5E3B] text-white font-bold text-xs shadow-xs hover:bg-[#2D5A27] transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add Produce Crop
            </button>
          </div>

          <div className="bg-white border border-[#E5E0D5] rounded-3xl overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#FAF9F6] border-b border-[#E5E0D5] text-gray-600 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-3.5">Produce Item</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Available Stock</th>
                    <th className="p-3.5">Price / Unit</th>
                    <th className="p-3.5">Batch Code</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E0D5]">
                  {farmerProducts.map(p => (
                    <tr key={p.id} className="hover:bg-[#FAF9F6]/50">
                      <td className="p-3.5 flex items-center gap-3">
                        <img src={p.image} alt={p.name} className="w-10 h-10 rounded-xl object-cover" />
                        <div>
                          <span className="font-bold text-[#2D3A26] block">{p.name}</span>
                          <span className="text-[10px] text-emerald-700 font-medium">{p.organic ? 'Organic Certified' : 'Fresh'}</span>
                        </div>
                      </td>
                      <td className="p-3.5 text-gray-700">{p.category}</td>
                      <td className="p-3.5 font-bold text-[#2D3A26]">{p.quantity} {p.unit}</td>
                      <td className="p-3.5 font-extrabold text-[#1B5E3B]">₹{p.pricePerUnit}</td>
                      <td className="p-3.5">
                        <button
                          onClick={() => openTraceability(p.batchId)}
                          className="font-mono text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 hover:bg-emerald-100 font-bold"
                        >
                          {p.batchId} ↗
                        </button>
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="text-gray-400 hover:text-rose-600 p-1 transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODULE 3: ORDER FULFILLMENT */}
      {/* ============================================================ */}
      {activeModule === 'orders' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#1B3B22]">Order Management & Dispatch ({orders.length})</h3>
              <p className="text-xs text-gray-600">Update harvest milestones and notify consumer</p>
            </div>
          </div>

          <div className="space-y-3">
            {orders.map(order => (
              <div key={order.id} className="bg-white border border-[#E5E0D5] p-4 sm:p-5 rounded-3xl space-y-3 shadow-2xs">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-3">
                  <div>
                    <span className="font-mono text-xs font-bold text-emerald-800">{order.orderNumber}</span>
                    <span className="text-xs text-gray-500 ml-2">Ordered by {order.consumerName} ({order.consumerPhone})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-600">Current Status:</span>
                    <select
                      value={order.orderStatus}
                      onChange={e => updateOrderStatus(order.id, e.target.value as any)}
                      className="px-2.5 py-1 rounded-xl border border-emerald-400 bg-emerald-50 text-xs font-bold text-emerald-900"
                    >
                      <option value="harvesting">1. Harvesting in Fields</option>
                      <option value="packed">2. Cold-Packed in Crates</option>
                      <option value="dispatched">3. Dispatched in EV Transit</option>
                      <option value="delivered">4. Successfully Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="space-y-1">
                    <span className="text-[10px] text-gray-400 uppercase font-bold block">Items Ordered:</span>
                    {order.items.map((item, idx) => (
                      <div key={idx} className="font-medium text-[#2D3A26]">
                        • {item.product.name} ({item.quantity} {item.product.unit})
                      </div>
                    ))}
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] text-gray-400 uppercase font-bold block">Delivery Window:</span>
                    <p className="text-gray-700">{order.deliverySlot}</p>
                    <p className="text-[10px] text-gray-500">{order.deliveryAddress.street}, {order.deliveryAddress.city}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] text-gray-400 uppercase font-bold block">Financial Payout:</span>
                    <div className="font-extrabold text-sm text-[#1B5E3B]">₹{order.total}</div>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                      {order.paymentStatus === 'paid' ? 'Paid via Online UPI' : 'Cash On Delivery'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODULE 4: FARM VISITS MANAGEMENT */}
      {/* ============================================================ */}
      {activeModule === 'visits' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#1B3B22]">Agro-Tourism Tour Slots & Passes</h3>
              <p className="text-xs text-gray-600">Configure weekend visiting hours and view booked tourist guests</p>
            </div>
            <button
              onClick={() => setShowAddSlotModal(true)}
              className="px-4 py-2 rounded-2xl bg-[#1B5E3B] text-white font-bold text-xs shadow-xs hover:bg-[#2D5A27] transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Open New Visit Slot
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {slots.map(s => (
              <div key={s.id} className="bg-white border border-[#E5E0D5] p-5 rounded-3xl space-y-3 shadow-2xs">
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <h4 className="font-bold text-xs text-[#1B3B22]">{s.farmName}</h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    {s.status === 'open' ? 'Open for Bookings' : 'Full'}
                  </span>
                </div>
                <div className="text-xs text-gray-600 space-y-1">
                  <p>Date: <strong className="text-[#2D3A26]">{s.date} ({s.startTime} - {s.endTime})</strong></p>
                  <p>Capacity: <strong className="text-[#2D3A26]">{s.bookedCount} / {s.maxVisitors} Visitors Booked</strong></p>
                  <p>Price: <strong className="text-emerald-700 font-bold">₹{s.pricePerPerson} per person</strong></p>
                  <p className="text-[11px] text-gray-500">{s.description}</p>
                </div>
                <div className="pt-2 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-[11px] text-gray-500">Includes Chulha Breakfast</span>
                  <button
                    onClick={() => deleteSlot(s.id)}
                    className="text-gray-400 hover:text-rose-600 text-xs font-bold"
                  >
                    Delete Slot
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODULE 5: LABOUR REQUESTS */}
      {/* ============================================================ */}
      {activeModule === 'labour' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#1B3B22]">Labour Requests & Cooperatives</h3>
              <p className="text-xs text-gray-600">Request harvesting, weeding, and tractor operators</p>
            </div>
            <button
              onClick={() => setShowAddLaborModal(true)}
              className="px-4 py-2 rounded-2xl bg-amber-600 text-white font-bold text-xs shadow-xs hover:bg-amber-700 transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Post Work Request
            </button>
          </div>

          <div className="space-y-3">
            {workerRequests.map(req => (
              <div key={req.id} className="bg-white border border-[#E5E0D5] p-4 rounded-3xl space-y-2 shadow-2xs">
                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-blue-800">{req.requestCode}</span>
                    <span className="font-bold text-xs text-[#2D3A26]">{req.jobCategory} ({req.cropName})</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    req.status === 'matched' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {req.status === 'matched' ? `Matched: ${req.matchedGroupName}` : 'Awaiting Cooperatives'}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-gray-600">
                  <div>Workers: <strong className="text-[#2D3A26]">{req.workersNeeded} Workers</strong></div>
                  <div>Daily Wage: <strong className="text-[#2D3A26]">₹{req.wagePerWorker} / day</strong></div>
                  <div>Start Date: <strong className="text-[#2D3A26]">{req.startDate}</strong></div>
                  <div>Duration: <strong className="text-[#2D3A26]">{req.durationDays} Days</strong></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODULE 6: GOVERNMENT SCHEMES */}
      {/* ============================================================ */}
      {activeModule === 'schemes' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#1B3B22]">Bookmarked Schemes & Subsidies</h3>
              <p className="text-xs text-gray-600">Direct links to official central & state agriculture portals</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {schemes.map(s => {
              const isSaved = bookmarkedSchemes.includes(s.id);
              return (
                <div key={s.id} className="bg-white border border-[#E5E0D5] p-5 rounded-3xl space-y-3 shadow-2xs flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                        {s.badge}
                      </span>
                      <button
                        onClick={() => toggleBookmarkScheme(s.id)}
                        className={`text-xs font-bold ${isSaved ? 'text-amber-600' : 'text-gray-400 hover:text-gray-600'}`}
                      >
                        {isSaved ? '★ Bookmarked' : '☆ Bookmark'}
                      </button>
                    </div>
                    <h4 className="font-serif text-base font-bold text-[#1B3B22] mt-2">{s.name}</h4>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">{s.summary}</p>
                    <div className="mt-2 text-xs text-emerald-700 font-bold">
                      Subsidy: {s.subsidyPercentage}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[11px] text-gray-500">Helpline: {s.helpline}</span>
                    <a
                      href={s.officialPortalUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-bold text-[#1B5E3B] flex items-center gap-1 hover:underline"
                    >
                      <span>Apply on Portal</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODULE 7: EQUIPMENT & RENTALS */}
      {/* ============================================================ */}
      {activeModule === 'equipment' && (
        <div className="space-y-4 animate-in fade-in">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#1B3B22]">Machinery & Implement Rentals</h3>
            <p className="text-xs text-gray-600">Rent or buy subsidized machinery from Custom Hiring Centres</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {equipment.map(item => (
              <div key={item.id} className="bg-white border border-[#E5E0D5] rounded-3xl overflow-hidden p-4 space-y-3 shadow-2xs flex flex-col justify-between">
                <img src={item.image} alt={item.name} className="w-full h-36 object-cover rounded-2xl" />
                <div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                    {item.subsidyBadge || 'Govt Approved'}
                  </span>
                  <h4 className="font-serif text-sm font-bold text-[#1B3B22] mt-1">{item.name}</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-2">{item.description}</p>
                  <div className="mt-2 flex items-baseline justify-between">
                    <span className="text-xs font-bold text-[#1B5E3B]">Buy: ₹{item.price.toLocaleString()}</span>
                    {item.rentalPricePerDay ? (
                      <span className="text-xs text-amber-700 font-bold">Rent: ₹{item.rentalPricePerDay}/day</span>
                    ) : null}
                  </div>
                </div>

                <div className="flex gap-2 pt-2 border-t border-gray-100">
                  {item.rentalPricePerDay ? (
                    <button
                      onClick={() => {
                        orderEquipment(item.id, 'rent', 3);
                        alert(`Rental request for 3 days created for ${item.name}!`);
                      }}
                      className="flex-1 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs transition-colors"
                    >
                      Rent 3 Days
                    </button>
                  ) : null}
                  <button
                    onClick={() => {
                      orderEquipment(item.id, 'buy');
                      alert(`Purchase order submitted for ${item.name}!`);
                    }}
                    className="flex-1 py-1.5 rounded-xl bg-[#1B5E3B] hover:bg-[#2D5A27] text-white font-bold text-xs transition-colors"
                  >
                    Buy Item
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODULE 8: ANALYTICS & REPORTS */}
      {/* ============================================================ */}
      {activeModule === 'analytics' && (
        <div className="space-y-4 animate-in fade-in">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#1B3B22]">Farm Performance & Yield Analytics</h3>
            <p className="text-xs text-gray-600">Season-over-season revenue and harvest output comparison</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border border-[#E5E0D5] p-5 rounded-3xl shadow-2xs space-y-2">
              <span className="text-[10px] font-bold text-gray-500 uppercase">Top Revenue Crop</span>
              <div className="font-serif text-xl font-bold text-[#1B5E3B]">Desi Vine Tomatoes</div>
              <p className="text-xs text-gray-600">380 kg sold • ₹13,300 gross revenue</p>
            </div>

            <div className="bg-white border border-[#E5E0D5] p-5 rounded-3xl shadow-2xs space-y-2">
              <span className="text-[10px] font-bold text-gray-500 uppercase">Average Customer Rating</span>
              <div className="font-serif text-xl font-bold text-amber-600">4.9 / 5.0 ★</div>
              <p className="text-xs text-gray-600">Based on 142 verified consumer reviews</p>
            </div>

            <div className="bg-white border border-[#E5E0D5] p-5 rounded-3xl shadow-2xs space-y-2">
              <span className="text-[10px] font-bold text-gray-500 uppercase">Water Conservation</span>
              <div className="font-serif text-xl font-bold text-blue-600">54,000 Litres Saved</div>
              <p className="text-xs text-gray-600">Via 100% drip emitter schedule</p>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODULE 9: EXPENSES & LEDGER */}
      {/* ============================================================ */}
      {activeModule === 'expenses' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#1B3B22]">Farm Input Expenses & Net Profit Ledger</h3>
              <p className="text-xs text-gray-600">Track inputs (seed, bio-fertilizer, labour, fuel) vs harvest sales</p>
            </div>
            <button
              onClick={() => setShowAddExpenseModal(true)}
              className="px-4 py-2 rounded-2xl bg-[#1B5E3B] text-white font-bold text-xs shadow-xs hover:bg-[#2D5A27] transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Record New Expense
            </button>
          </div>

          {/* Ledger Summary */}
          <div className="grid grid-cols-3 gap-3 bg-white border border-[#E5E0D5] p-4 rounded-3xl text-center">
            <div>
              <span className="text-[10px] text-gray-500 uppercase font-bold block">Gross Revenue:</span>
              <span className="font-serif text-lg font-bold text-[#1B5E3B]">₹{totalRevenue.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-500 uppercase font-bold block">Input Expenses:</span>
              <span className="font-serif text-lg font-bold text-rose-600">₹{totalExpenseAmount.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-500 uppercase font-bold block">Net Profit:</span>
              <span className="font-serif text-lg font-bold text-emerald-800">₹{netProfit.toLocaleString()}</span>
            </div>
          </div>

          <div className="space-y-2">
            {expenses.map(e => (
              <div key={e.id} className="bg-white border border-[#E5E0D5] p-3.5 rounded-2xl flex items-center justify-between text-xs shadow-2xs">
                <div>
                  <span className="font-bold text-[#2D3A26] block">{e.description}</span>
                  <span className="text-[10px] text-gray-500">{e.date} • {e.category}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-rose-600 text-sm">-₹{e.amount}</span>
                  <button
                    onClick={() => deleteExpense(e.id)}
                    className="text-gray-400 hover:text-rose-600"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODULE 10: PROFILE & KYC SETTINGS */}
      {/* ============================================================ */}
      {activeModule === 'settings' && (
        <div className="bg-white border border-[#E5E0D5] p-6 rounded-3xl space-y-4 max-w-2xl animate-in fade-in">
          <h3 className="font-serif text-lg font-bold text-[#1B3B22]">Farm Profile & Bank DBT Verification</h3>
          
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-gray-600 font-bold mb-1">Farmer Full Name</label>
              <input
                type="text"
                defaultValue={currentUser?.name}
                className="w-full px-3 py-2 rounded-xl border border-[#D4CDBC] bg-[#FAF9F6]"
              />
            </div>
            <div>
              <label className="block text-gray-600 font-bold mb-1">Farm Name</label>
              <input
                type="text"
                defaultValue={currentUser?.farmerProfile?.farmName}
                className="w-full px-3 py-2 rounded-xl border border-[#D4CDBC] bg-[#FAF9F6]"
              />
            </div>
            <div>
              <label className="block text-gray-600 font-bold mb-1">Survey / Gat Number</label>
              <input
                type="text"
                defaultValue={currentUser?.farmerProfile?.surveyNumber}
                className="w-full px-3 py-2 rounded-xl border border-[#D4CDBC] bg-[#FAF9F6]"
              />
            </div>
            <div>
              <label className="block text-gray-600 font-bold mb-1">Kisan Credit Card (KCC)</label>
              <input
                type="text"
                defaultValue={currentUser?.farmerProfile?.kisanCreditCardNo || 'KCC-MAH-992144'}
                className="w-full px-3 py-2 rounded-xl border border-[#D4CDBC] bg-[#FAF9F6]"
              />
            </div>
          </div>

          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-950 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Aadhaar eKYC & Soil Health Card Verified (Direct DBT Payouts Enabled)</span>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL: ADD NEW PRODUCE CROP */}
      {/* ============================================================ */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FAF9F6] border border-[#E5E0D5] w-full max-w-lg rounded-3xl shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-lg font-bold text-[#1B3B22]">List New Harvest Crop</h3>
              <button onClick={() => setShowAddProductModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#2D3A26] mb-1">Produce Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Desi Cherry Tomatoes"
                  value={newProdName}
                  onChange={e => setNewProdName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#D4CDBC] bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-[#2D3A26] mb-1">Category</label>
                  <select
                    value={newProdCategory}
                    onChange={e => setNewProdCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-[#D4CDBC] bg-white"
                  >
                    <option value="Vegetable">Vegetable</option>
                    <option value="Fruit">Fruit</option>
                    <option value="Grain">Grain</option>
                    <option value="Dairy & Honey">Dairy & Honey</option>
                    <option value="Spices">Spices</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-[#2D3A26] mb-1">Unit</label>
                  <select
                    value={newProdUnit}
                    onChange={e => setNewProdUnit(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-[#D4CDBC] bg-white"
                  >
                    <option value="kg">kg</option>
                    <option value="dozen">dozen</option>
                    <option value="litre">litre</option>
                    <option value="pack">pack</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-[#2D3A26] mb-1">Harvest Quantity</label>
                  <input
                    type="number"
                    required
                    value={newProdQuantity}
                    onChange={e => setNewProdQuantity(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#D4CDBC] bg-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#2D3A26] mb-1">Price per Unit (₹)</label>
                  <input
                    type="number"
                    required
                    value={newProdPrice}
                    onChange={e => setNewProdPrice(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#D4CDBC] bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#2D3A26] mb-1">Photo URL</label>
                <input
                  type="text"
                  value={newProdImage}
                  onChange={e => setNewProdImage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#D4CDBC] bg-white text-[11px]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#2D3A26] mb-1">Harvest Description</label>
                <textarea
                  value={newProdDesc}
                  onChange={e => setNewProdDesc(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 rounded-xl border border-[#D4CDBC] bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-[#1B5E3B] hover:bg-[#2D5A27] text-white font-bold shadow-md transition-all mt-2"
              >
                Publish Crop to Marketplace
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL: ADD NEW VISIT SLOT */}
      {/* ============================================================ */}
      {showAddSlotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FAF9F6] border border-[#E5E0D5] w-full max-w-md rounded-3xl shadow-2xl p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-lg font-bold text-[#1B3B22]">Open Weekend Farm Tour Slot</h3>
              <button onClick={() => setShowAddSlotModal(false)} className="text-gray-400">✕</button>
            </div>

            <form onSubmit={handleCreateSlot} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#2D3A26] mb-1">Visit Date</label>
                <input
                  type="date"
                  required
                  value={newSlotDate}
                  onChange={e => setNewSlotDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#D4CDBC] bg-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-[#2D3A26] mb-1">Max Visitors</label>
                  <input
                    type="number"
                    value={newSlotMaxVisitors}
                    onChange={e => setNewSlotMaxVisitors(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#D4CDBC] bg-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#2D3A26] mb-1">Price / Person (₹)</label>
                  <input
                    type="number"
                    value={newSlotPrice}
                    onChange={e => setNewSlotPrice(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#D4CDBC] bg-white"
                  />
                </div>
              </div>
              <div>
                <label className="block font-bold text-[#2D3A26] mb-1">Tour Description</label>
                <textarea
                  value={newSlotDesc}
                  onChange={e => setNewSlotDesc(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 rounded-xl border border-[#D4CDBC] bg-white"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-[#1B5E3B] text-white font-bold shadow-md"
              >
                Publish Tour Slot
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL: POST LABOUR REQUEST */}
      {/* ============================================================ */}
      {showAddLaborModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FAF9F6] border border-[#E5E0D5] w-full max-w-md rounded-3xl shadow-2xl p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-lg font-bold text-[#1B3B22]">Request Farm Labour Team</h3>
              <button onClick={() => setShowAddLaborModal(false)} className="text-gray-400">✕</button>
            </div>

            <form onSubmit={handleCreateLaborRequest} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#2D3A26] mb-1">Job Category</label>
                <select
                  value={jobCategory}
                  onChange={e => setJobCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-[#D4CDBC] bg-white"
                >
                  <option value="Harvesting & Picking">Harvesting & Picking</option>
                  <option value="Weeding & De-stoning">Weeding & De-stoning</option>
                  <option value="Spray Application">Spray Application</option>
                  <option value="Irrigation & Trenching">Irrigation & Trenching</option>
                  <option value="Tractor & Tiller Operation">Tractor & Tiller Operation</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#2D3A26] mb-1">Crop / Field Task</label>
                <input
                  type="text"
                  required
                  value={cropName}
                  onChange={e => setCropName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#D4CDBC] bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-[#2D3A26] mb-1">Workers Needed</label>
                  <input
                    type="number"
                    value={workersNeeded}
                    onChange={e => setWorkersNeeded(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#D4CDBC] bg-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#2D3A26] mb-1">Daily Wage / Person (₹)</label>
                  <input
                    type="number"
                    value={wagePerWorker}
                    onChange={e => setWagePerWorker(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#D4CDBC] bg-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold shadow-md"
              >
                Broadcast to Local Labour Cooperatives
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL: RECORD EXPENSE */}
      {/* ============================================================ */}
      {showAddExpenseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FAF9F6] border border-[#E5E0D5] w-full max-w-md rounded-3xl shadow-2xl p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-lg font-bold text-[#1B3B22]">Record Farm Expense</h3>
              <button onClick={() => setShowAddExpenseModal(false)} className="text-gray-400">✕</button>
            </div>

            <form onSubmit={handleCreateExpense} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#2D3A26] mb-1">Category</label>
                <select
                  value={expCategory}
                  onChange={e => setExpCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-[#D4CDBC] bg-white"
                >
                  <option value="Labour Wages">Labour Wages</option>
                  <option value="Seeds & Saplings">Seeds & Saplings</option>
                  <option value="Organic Fertiliser & Manure">Organic Fertiliser & Manure</option>
                  <option value="Equipment Diesel / Electricity">Equipment Diesel / Electricity</option>
                  <option value="Irrigation & Repairs">Irrigation & Repairs</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#2D3A26] mb-1">Amount (₹)</label>
                <input
                  type="number"
                  required
                  value={expAmount}
                  onChange={e => setExpAmount(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#D4CDBC] bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-[#2D3A26] mb-1">Description</label>
                <input
                  type="text"
                  required
                  value={expDesc}
                  onChange={e => setExpDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-[#D4CDBC] bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-[#1B5E3B] text-white font-bold shadow-md"
              >
                Save Expense to Ledger
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
