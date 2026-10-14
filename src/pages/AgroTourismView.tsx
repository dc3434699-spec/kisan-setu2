import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import { FarmSlot } from '../types';
import { Compass, Calendar, Clock, MapPin, Users, QrCode, Phone, CheckCircle2, ArrowRight } from 'lucide-react';

interface AgroTourismViewProps {
  onSelectSlot: (s: FarmSlot) => void;
}

export const AgroTourismView: React.FC<AgroTourismViewProps> = ({ onSelectSlot }) => {
  const { slots, bookings, cancelBooking, setIsMapModalOpen } = useStore();
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'tours' | 'passes'>('tours');

  const myBookings = bookings.filter(
    b => b.consumerId === currentUser?.id || currentUser?.username === 'tanmay123'
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1B3B22] to-[#2D5A27] text-white p-6 sm:p-8 rounded-3xl shadow-lg space-y-2">
        <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-400 text-amber-950 inline-block">
          Agro-Tourism & Rural Heritage Tours
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold">
          Weekend Farm Visits & Direct Harvesting
        </h1>
        <p className="text-xs text-gray-200 max-w-2xl">
          Step onto authentic organic farmland! Pick tree-ripened fruits, experience Gir cow dairy demos, enjoy tractor country rides, and feast on chulha-cooked farm breakfasts.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#E5E0D5]">
        <button
          onClick={() => setActiveTab('tours')}
          className={`py-3 px-6 text-xs font-bold border-b-2 transition-colors ${
            activeTab === 'tours'
              ? 'border-[#1B5E3B] text-[#1B5E3B]'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          Explore Weekend Farm Slots ({slots.length})
        </button>
        <button
          onClick={() => setActiveTab('passes')}
          className={`py-3 px-6 text-xs font-bold border-b-2 transition-colors ${
            activeTab === 'passes'
              ? 'border-[#1B5E3B] text-[#1B5E3B]'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          My Booked Farm Passes ({myBookings.length})
        </button>
      </div>

      {activeTab === 'tours' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {slots.map(slot => (
            <div
              key={slot.id}
              className="bg-white border border-[#E5E0D5] rounded-3xl overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img
                    src={slot.photos[0]}
                    alt={slot.farmName}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-600 text-white shadow-xs">
                    {slot.status === 'open' ? 'Slots Available' : 'Full'}
                  </span>
                  <span className="absolute bottom-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/60 text-white">
                    {slot.maxVisitors - slot.bookedCount} spots left
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#1B3B22] leading-snug">
                      {slot.farmName}
                    </h3>
                    <p className="text-xs text-emerald-800 font-semibold mt-0.5">
                      Host: {slot.farmerName}
                    </p>
                    <p className="text-[11px] text-gray-500 flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-[#1B5E3B] shrink-0" />
                      <span>{slot.farmLocation}</span>
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs bg-[#FAF9F6] p-2.5 rounded-xl border border-[#E5E0D5]">
                    <div className="flex items-center gap-1.5 text-gray-700">
                      <Calendar className="w-3.5 h-3.5 text-[#1B5E3B]" />
                      <span>{slot.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-700">
                      <Clock className="w-3.5 h-3.5 text-[#1B5E3B]" />
                      <span>{slot.startTime}</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed">
                    {slot.description}
                  </p>

                  <div className="space-y-1 text-xs">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                      Included Farm Experiences:
                    </span>
                    {slot.activities.map((act, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-gray-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{act}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-gray-100 flex items-center justify-between mt-2">
                <div>
                  <span className="text-lg font-extrabold text-[#1B5E3B]">₹{slot.pricePerPerson}</span>
                  <span className="text-[11px] text-gray-500"> / visitor</span>
                </div>

                <button
                  onClick={() => onSelectSlot(slot)}
                  className="px-4 py-2 rounded-xl bg-[#1B5E3B] hover:bg-[#2D5A27] text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Book Visit Slot</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* MY BOOKED PASSES */
        <div className="space-y-4">
          {myBookings.length === 0 ? (
            <div className="bg-white border border-[#E5E0D5] rounded-3xl p-12 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center text-[#1B5E3B] mx-auto">
                <Compass className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1B3B22]">No Farm Passes Booked Yet</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Select an organic farm slot above to reserve a weekend agro-tourism visit for your family.
              </p>
              <button
                onClick={() => setActiveTab('tours')}
                className="px-4 py-2 rounded-xl bg-[#1B5E3B] text-white text-xs font-bold"
              >
                Explore Available Tour Slots
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {myBookings.map(b => (
                <div
                  key={b.id}
                  className="bg-white border-2 border-emerald-300 rounded-3xl p-5 space-y-4 shadow-sm"
                >
                  <div className="flex justify-between items-start border-b border-gray-100 pb-3">
                    <div>
                      <span className="font-mono text-xs font-bold text-emerald-800 block">
                        Pass: {b.bookingCode}
                      </span>
                      <h4 className="font-serif text-base font-bold text-[#1B3B22] mt-0.5">
                        {b.slotDetails.farmName}
                      </h4>
                      <p className="text-xs text-gray-600">Farmer Host: {b.slotDetails.farmerName}</p>
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                      Confirmed Pass ✓
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-700">
                    <div>Date: <strong className="text-[#2D3A26]">{b.visitDate}</strong></div>
                    <div>Timing: <strong className="text-[#2D3A26]">{b.slotDetails.startTime}</strong></div>
                    <div>Visitors: <strong className="text-[#2D3A26]">{b.visitorCount} Persons</strong></div>
                    <div>Total Paid: <strong className="text-emerald-700">₹{b.totalPrice}</strong></div>
                  </div>

                  <div className="p-3 bg-emerald-50 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <QrCode className="w-7 h-7 text-[#1B5E3B]" />
                      <span className="text-[10px] text-gray-600">Scan at farm gate upon arrival</span>
                    </div>
                    <button
                      onClick={() => setIsMapModalOpen(true)}
                      className="text-xs font-bold text-[#1B5E3B] hover:underline flex items-center gap-1"
                    >
                      <MapPin className="w-3.5 h-3.5" /> Directions ↗
                    </button>
                  </div>

                  <div className="flex justify-between items-center text-xs pt-1">
                    <span className="text-[11px] text-gray-400">Booked on {new Date(b.createdAt).toLocaleDateString()}</span>
                    {b.status === 'confirmed' && (
                      <button
                        onClick={() => cancelBooking(b.id)}
                        className="text-rose-600 text-xs font-bold hover:underline"
                      >
                        Cancel Pass
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};
