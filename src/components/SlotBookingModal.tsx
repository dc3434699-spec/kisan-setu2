import React, { useState } from 'react';
import { FarmSlot } from '../types';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import { X, Calendar, Clock, MapPin, Users, CheckCircle2, QrCode, Phone, Sparkles, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SlotBookingModalProps {
  slot: FarmSlot | null;
  onClose: () => void;
  onViewPasses?: () => void;
}

export const SlotBookingModal: React.FC<SlotBookingModalProps> = ({ slot, onClose, onViewPasses }) => {
  const { bookSlot } = useStore();
  const { currentUser, openAuthModal } = useAuth();

  const [visitorCount, setVisitorCount] = useState(2);
  const [visitorName, setVisitorName] = useState(currentUser?.name || 'Tanmay Rao');
  const [visitorPhone, setVisitorPhone] = useState(currentUser?.phone || '+91 98765 43210');
  const [visitorEmail, setVisitorEmail] = useState(currentUser?.email || 'tanmay.rao@outlook.com');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [confirmedBookingCode, setConfirmedBookingCode] = useState('');

  if (!slot) return null;

  const availableCapacity = slot.maxVisitors - slot.bookedCount;
  const totalPrice = slot.pricePerPerson * visitorCount;

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      openAuthModal('login');
      return;
    }

    const booking = bookSlot(slot, visitorCount, {
      id: currentUser.id,
      name: visitorName,
      phone: visitorPhone,
      email: visitorEmail
    });

    setConfirmedBookingCode(booking.bookingCode);
    setIsConfirmed(true);

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-[#FAF9F6] border border-[#E5E0D5] w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-[#1B3B22] text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-serif text-lg font-bold">
              {isConfirmed ? 'Farm Visit Pass Confirmed 🎉' : 'Book Farm Visit Slot'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          
          {isConfirmed ? (
            <div className="text-center space-y-4 py-2">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              
              <div>
                <h4 className="font-serif text-xl font-bold text-[#1B3B22]">Visit Slot Confirmed! 🎉</h4>
                <p className="text-xs text-gray-600 mt-1">
                  Pass Code: <strong className="font-mono text-emerald-800">{confirmedBookingCode}</strong>
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Farmer <strong className="text-[#2D3A26]">{slot.farmerName}</strong> has been notified and is looking forward to hosting your visit!
                </p>
              </div>

              {/* Pass Ticket Card */}
              <div className="bg-white border-2 border-dashed border-emerald-300 rounded-3xl p-4 text-left text-xs space-y-2.5 shadow-xs">
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span className="font-bold text-[#1B3B22]">{slot.farmName}</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                    Confirmed Pass
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-gray-600">
                  <div>
                    <span className="text-[10px] text-gray-400 block">Date & Time:</span>
                    <strong className="text-[#2D3A26]">{slot.date} ({slot.startTime})</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 block">Visitors:</span>
                    <strong className="text-[#2D3A26]">{visitorCount} Persons</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 block">Total Amount:</span>
                    <strong className="text-emerald-700">₹{totalPrice} (Paid)</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 block">Farm Destination:</span>
                    <strong className="text-[#2D3A26] truncate block">{slot.farmLocation}</strong>
                  </div>
                </div>

                {/* Simulated QR Code for Gate Check-in */}
                <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <QrCode className="w-8 h-8 text-[#1B5E3B]" />
                    <span className="text-[10px] text-gray-500">Show this QR pass at farm gate entrance</span>
                  </div>
                  <span className="font-mono text-[10px] font-bold text-gray-600">{confirmedBookingCode}</span>
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => {
                    onClose();
                    onViewPasses?.();
                  }}
                  className="flex-1 py-3 rounded-2xl bg-[#1B5E3B] hover:bg-[#2D5A27] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <span>View All Booked Passes</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleConfirmBooking} className="space-y-4">
              
              {/* Slot Details Banner */}
              <div className="bg-white border border-[#E5E0D5] p-3.5 rounded-2xl text-xs space-y-2">
                <h4 className="font-serif text-sm font-bold text-[#1B3B22]">{slot.farmName}</h4>
                <div className="grid grid-cols-2 gap-2 text-gray-600">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#1B5E3B]" /> {slot.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#1B5E3B]" /> {slot.startTime} - {slot.endTime}
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#1B5E3B] shrink-0" /> {slot.farmLocation}
                </p>
                <div className="pt-1 border-t border-gray-100 flex items-center justify-between text-[11px]">
                  <span className="text-gray-500">Available Visitor Slots:</span>
                  <span className="font-bold text-emerald-800">{availableCapacity} spots remaining</span>
                </div>
              </div>

              {/* Visitor Stepper */}
              <div className="bg-white border border-[#E5E0D5] p-3.5 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-xs font-bold text-[#2D3A26]">Number of Visitors</label>
                    <span className="text-[11px] text-gray-500">₹{slot.pricePerPerson} per person</span>
                  </div>
                  <div className="flex items-center gap-2 bg-[#FAF9F6] border border-[#E5E0D5] rounded-xl px-2.5 py-1">
                    <button
                      type="button"
                      onClick={() => setVisitorCount(Math.max(1, visitorCount - 1))}
                      className="text-gray-600 p-1"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold w-6 text-center">{visitorCount}</span>
                    <button
                      type="button"
                      onClick={() => setVisitorCount(Math.min(availableCapacity, visitorCount + 1))}
                      className="text-gray-600 p-1"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-100 flex justify-between font-bold text-xs text-[#1B3B22]">
                  <span>Total Tour Fee:</span>
                  <span className="text-sm text-emerald-700">₹{totalPrice}</span>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-white border border-[#E5E0D5] p-3.5 rounded-2xl space-y-2">
                <h5 className="text-xs font-bold text-[#2D3A26] uppercase tracking-wider">Contact Person Details</h5>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-0.5">Primary Visitor Name</label>
                  <input
                    type="text"
                    required
                    value={visitorName}
                    onChange={e => setVisitorName(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl border border-[#D4CDBC] bg-[#FAF9F6] text-xs text-[#2D3A26]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-0.5">Mobile Phone</label>
                    <input
                      type="tel"
                      required
                      value={visitorPhone}
                      onChange={e => setVisitorPhone(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl border border-[#D4CDBC] bg-[#FAF9F6] text-xs text-[#2D3A26]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-0.5">Email (For Pass PDF)</label>
                    <input
                      type="email"
                      required
                      value={visitorEmail}
                      onChange={e => setVisitorEmail(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl border border-[#D4CDBC] bg-[#FAF9F6] text-xs text-[#2D3A26]"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-[#1B5E3B] hover:bg-[#2D5A27] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Confirm Visit & Generate QR Pass (₹{totalPrice})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
