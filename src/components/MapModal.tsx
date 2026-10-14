import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, MapPin, Navigation, Phone, ExternalLink, Filter, Compass, Sprout, Users, Wrench } from 'lucide-react';

export const MapModal: React.FC = () => {
  const { isMapModalOpen, setIsMapModalOpen, products, laborGroups, equipment } = useStore();
  const [activeFilter, setActiveFilter] = useState<'all' | 'farms' | 'labour' | 'equipment'>('all');
  const [selectedPinId, setSelectedPinId] = useState<string>('pin_farm_1');
  const [showRoute, setShowRoute] = useState(false);

  if (!isMapModalOpen) return null;

  const pins = [
    {
      id: 'pin_farm_1',
      type: 'farm' as const,
      name: 'Green Valley Organic Agro Farm',
      owner: 'Rajesh Kumar Patil',
      phone: '+91 98220 14567',
      address: 'Survey No. 42, Dindori Road, Nashik, Maharashtra',
      distanceKm: 12.4,
      lat: 19.9975,
      lng: 73.7898,
      x: 35, // percentage for SVG map
      y: 42,
      speciality: 'Fresh Desi Tomatoes, Strawberries, Gir Cow Dairy',
      badge: 'Certified Organic Farm'
    },
    {
      id: 'pin_farm_2',
      type: 'farm' as const,
      name: 'Surya Sunburst Orchards',
      owner: 'Anita Ramesh Shinde',
      phone: '+91 98450 78123',
      address: 'Near Mango Heritage Valley, Guhagar Highway, Ratnagiri',
      distanceKm: 48.0,
      lat: 17.5186,
      lng: 73.1957,
      x: 28,
      y: 75,
      speciality: 'GI Alphonso Mangoes, Pomegranate, Farm Visits',
      badge: 'Heritage Orchard'
    },
    {
      id: 'pin_labour_1',
      type: 'labour' as const,
      name: 'Shivaji Agro Labor Cooperative',
      owner: 'Leader: Babanrao Shinde',
      phone: '+91 94230 55123',
      address: 'Saswad Agri Labor Center, Pune Belt',
      distanceKm: 4.5,
      lat: 18.3444,
      lng: 74.0298,
      x: 52,
      y: 55,
      speciality: '18 Available Harvesters & Tillage Operators',
      badge: 'Verified Labour Team'
    },
    {
      id: 'pin_labour_2',
      type: 'labour' as const,
      name: 'Kisan Shakti Mahila Krishi Sangh',
      owner: 'Leader: Sunita Gaikwad',
      phone: '+91 98901 22345',
      address: 'Dindori Taluka, Nashik Belt',
      distanceKm: 7.2,
      lat: 20.02,
      lng: 73.82,
      x: 40,
      y: 38,
      speciality: '12 Skilled Seed Bed & De-stoning Workers',
      badge: 'Verified Labour Team'
    },
    {
      id: 'pin_equip_1',
      type: 'equipment' as const,
      name: 'BharatKrishi Machinery Rental Hub',
      owner: 'Operator: K. Deshmukh',
      phone: '+91 98900 11223',
      address: 'Plot 18, MIDC Agri Engineering Sector, Nashik',
      distanceKm: 8.8,
      lat: 19.95,
      lng: 73.72,
      x: 32,
      y: 46,
      speciality: '7HP Power Tillers, Solar Pumps, Drip Sets for Rent/Sale',
      badge: 'Custom Hiring Centre (CHC)'
    }
  ];

  const filteredPins = pins.filter(p => {
    if (activeFilter === 'all') return true;
    return p.type === activeFilter;
  });

  const selectedPin = pins.find(p => p.id === selectedPinId) || pins[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-[#FAF9F6] border border-[#E5E0D5] w-full max-w-4xl h-[88vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="bg-[#1B3B22] text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-white">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold">Interactive Agricultural Ecosystem Map</h3>
              <p className="text-[11px] text-gray-300">Locate Nearby Organic Farms, Labour Cooperatives & Machinery Hubs</p>
            </div>
          </div>
          <button
            onClick={() => setIsMapModalOpen(false)}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white border-b border-[#E5E0D5] px-4 py-2.5 flex items-center justify-between gap-2 overflow-x-auto">
          <div className="flex items-center gap-1.5 shrink-0">
            {[
              { id: 'all', label: 'All Ecosystem Pins', icon: MapPin },
              { id: 'farms', label: 'Direct Farms (2)', icon: Sprout },
              { id: 'labour', label: 'Labour Teams (2)', icon: Users },
              { id: 'equipment', label: 'Machinery Hubs (1)', icon: Wrench }
            ].map(f => {
              const Icon = f.icon;
              return (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                    activeFilter === f.id
                      ? 'bg-[#1B5E3B] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{f.label}</span>
                </button>
              );
            })}
          </div>

          <span className="text-[11px] text-gray-500 font-medium hidden sm:inline">
            📍 Current Location: <strong className="text-[#1B3B22]">Baner / Pune Hub</strong>
          </span>
        </div>

        {/* Map Canvas and Details Split View */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Interactive SVG Canvas Map */}
          <div className="flex-1 bg-[#E8EFE5] relative overflow-hidden select-none flex items-center justify-center p-4">
            
            {/* Topographic Background Simulation */}
            <div className="absolute inset-0 opacity-40 pointer-events-none">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#6B8F71" strokeWidth="0.5" strokeOpacity="0.3" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                {/* River curve */}
                <path d="M 0 120 Q 250 80, 500 240 T 900 360" fill="none" stroke="#60A5FA" strokeWidth="8" strokeOpacity="0.4" />
                <path d="M 200 400 Q 400 350, 700 550" fill="none" stroke="#60A5FA" strokeWidth="5" strokeOpacity="0.3" />
                {/* Roads */}
                <path d="M 100 0 L 300 250 L 550 320 L 800 600" fill="none" stroke="#D1D5DB" strokeWidth="4" strokeDasharray="6,4" />
              </svg>
            </div>

            {/* Consumer Home Pin */}
            <div
              className="absolute z-20 flex flex-col items-center -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{ left: '50%', top: '58%' }}
            >
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg border-2 border-white animate-bounce">
                <Navigation className="w-4 h-4 rotate-45" />
              </div>
              <span className="bg-blue-900/90 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full mt-0.5 shadow-xs whitespace-nowrap">
                You Are Here
              </span>
            </div>

            {/* Simulated Route Line if enabled */}
            {showRoute && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                <path
                  d={`M 50% 58% Q 45% 50%, ${selectedPin.x}% ${selectedPin.y}%`}
                  fill="none"
                  stroke="#1B5E3B"
                  strokeWidth="4"
                  strokeDasharray="8,6"
                  className="animate-pulse"
                />
              </svg>
            )}

            {/* Interactive Pins */}
            {filteredPins.map(pin => {
              const isSelected = selectedPin.id === pin.id;
              const isFarm = pin.type === 'farm';
              const isLabour = pin.type === 'labour';

              return (
                <div
                  key={pin.id}
                  onClick={() => setSelectedPinId(pin.id)}
                  className="absolute z-30 flex flex-col items-center -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform transform hover:scale-110"
                  style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                >
                  <div
                    className={`w-9 h-9 rounded-2xl flex items-center justify-center text-white shadow-xl border-2 transition-all ${
                      isSelected
                        ? 'ring-4 ring-emerald-500/40 scale-110'
                        : ''
                    } ${
                      isFarm
                        ? 'bg-[#1B5E3B] border-emerald-300'
                        : isLabour
                        ? 'bg-amber-600 border-amber-300'
                        : 'bg-purple-600 border-purple-300'
                    }`}
                  >
                    {isFarm && <Sprout className="w-5 h-5" />}
                    {isLabour && <Users className="w-5 h-5" />}
                    {pin.type === 'equipment' && <Wrench className="w-5 h-5" />}
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 shadow-md whitespace-nowrap border ${
                      isSelected
                        ? 'bg-[#1B3B22] text-white border-emerald-400'
                        : 'bg-white text-[#2D3A26] border-gray-300'
                    }`}
                  >
                    {pin.name.split(' ')[0]} ({pin.distanceKm} km)
                  </span>
                </div>
              );
            })}

            {/* Map Legend */}
            <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs border border-[#E5E0D5] p-2 rounded-xl text-[10px] space-y-1 shadow-md">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1B5E3B]"></span> Farm Gate
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span> Labour Team
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span> Machinery Hub
              </div>
            </div>

          </div>

          {/* Right Selected Pin Card Panel */}
          <div className="w-full md:w-80 bg-white border-t md:border-t-0 md:border-l border-[#E5E0D5] p-4 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  selectedPin.type === 'farm'
                    ? 'bg-emerald-100 text-emerald-800'
                    : selectedPin.type === 'labour'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-purple-100 text-purple-800'
                }`}>
                  {selectedPin.badge}
                </span>
                <span className="text-xs font-bold text-emerald-700">
                  {selectedPin.distanceKm} km away
                </span>
              </div>

              <div>
                <h4 className="font-serif text-base font-bold text-[#1B3B22] leading-tight">
                  {selectedPin.name}
                </h4>
                <p className="text-xs text-gray-600 mt-1">{selectedPin.owner}</p>
                <p className="text-[11px] text-gray-500 flex items-start gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#1B5E3B] shrink-0 mt-0.5" />
                  <span>{selectedPin.address}</span>
                </p>
              </div>

              <div className="bg-[#FAF9F6] border border-[#E5E0D5] p-2.5 rounded-xl text-xs">
                <span className="text-[10px] font-bold text-gray-500 uppercase block mb-0.5">Speciality:</span>
                <p className="text-[#2D3A26] font-medium">{selectedPin.speciality}</p>
              </div>

              {/* Driving Directions Simulation */}
              {showRoute && (
                <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-xs space-y-1.5 animate-in fade-in">
                  <span className="font-bold text-emerald-900 block">🚗 Fastest Driving Route:</span>
                  <div className="space-y-1 text-[11px] text-emerald-800">
                    <p>1. Head North onto NH-60 towards Dindori (8.2 km)</p>
                    <p>2. Take Exit 14 towards Agri-Tourism Corridor (3.1 km)</p>
                    <p>3. Turn right at Farm Gate Arch. Estimated: <strong>24 mins</strong></p>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 space-y-2">
              <button
                onClick={() => setShowRoute(!showRoute)}
                className="w-full py-2.5 rounded-xl bg-[#1B5E3B] hover:bg-[#2D5A27] text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>{showRoute ? 'Hide Route Directions' : 'Calculate Live Directions'}</span>
              </button>

              <a
                href={`tel:${selectedPin.phone}`}
                className="w-full py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#2D3A26] font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-700" />
                <span>Call {selectedPin.phone}</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
