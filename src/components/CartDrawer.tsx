import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { X, Trash2, Plus, Minus, ArrowRight, Tag, Truck, ShieldCheck, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CartDrawerProps {
  onOpenOrders: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onOpenOrders }) => {
  const {
    cart,
    cartTotal,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    placeOrder
  } = useStore();
  const { currentUser, openAuthModal } = useAuth();
  const { t } = useLanguage();

  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);

  // Checkout modal within drawer or overlay
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [addressStreet, setAddressStreet] = useState(currentUser?.location?.address || 'Flat 402, Green Acres Apt, Baner-Pashan Link Road');
  const [addressCity, setAddressCity] = useState('Pune');
  const [addressPincode, setAddressPincode] = useState('411045');
  const [deliverySlot, setDeliverySlot] = useState('Today Evening (05:00 PM - 08:00 PM)');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'upi' | 'card' | 'netbanking'>('upi');
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [placedOrderNumber, setPlacedOrderNumber] = useState('');

  if (!isCartOpen) return null;

  const freeDeliveryThreshold = 400;
  const deliveryFee = cartTotal >= freeDeliveryThreshold || cartTotal === 0 ? 0 : 40;
  const discountAmount = appliedCoupon?.flatDiscount
    ? appliedCoupon.flatDiscount
    : appliedCoupon?.discountPercent
    ? Math.round((cartTotal * appliedCoupon.discountPercent) / 100)
    : 0;

  const finalTotal = Math.max(0, cartTotal + deliveryFee - discountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    setCouponFeedback(res);
  };

  const handleConfirmOrder = () => {
    if (!currentUser) {
      openAuthModal('login');
      return;
    }

    const newOrder = placeOrder({
      consumerId: currentUser.id,
      consumerName: currentUser.name,
      consumerPhone: currentUser.phone || '+91 98765 43210',
      deliveryAddress: {
        street: addressStreet,
        city: addressCity,
        district: addressCity,
        state: 'Maharashtra',
        pincode: addressPincode
      },
      items: cart,
      subtotal: cartTotal,
      deliveryFee,
      discount: discountAmount,
      total: finalTotal,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
      orderStatus: 'harvesting',
      deliverySlot,
      batchIds: cart.map(i => i.product.batchId),
      farmerIds: [...new Set(cart.map(i => i.product.farmerId))]
    });

    setPlacedOrderNumber(newOrder.orderNumber);
    setIsOrderPlaced(true);

    // Confetti explosion
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-[#FAF9F6] border-l border-[#E5E0D5] w-full max-w-md h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#1B3B22] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-serif text-lg font-bold">Your Harvest Cart</h3>
            <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-bold">
              {cart.length} {cart.length === 1 ? 'item' : 'items'}
            </span>
          </div>
          <button
            onClick={() => {
              setIsCartOpen(false);
              setIsCheckingOut(false);
              setIsOrderPlaced(false);
            }}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ORDER SUCCESS SCREEN */}
        {isOrderPlaced ? (
          <div className="flex-1 p-6 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-md">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <div>
              <h4 className="font-serif text-xl font-bold text-[#1B3B22]">Order Placed Successfully!</h4>
              <p className="text-xs text-gray-600 mt-1">
                Your order <span className="font-mono font-bold text-emerald-800">{placedOrderNumber}</span> has been dispatched to the farmers for morning harvesting.
              </p>
            </div>

            <div className="w-full bg-white border border-[#E5E0D5] rounded-2xl p-4 text-left text-xs space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Delivery Window:</span>
                <span className="font-bold text-[#2D3A26]">{deliverySlot}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Payment Mode:</span>
                <span className="font-bold text-uppercase text-[#2D3A26]">{paymentMethod.toUpperCase()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Total Paid:</span>
                <span className="font-bold text-emerald-700">₹{finalTotal}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsCartOpen(false);
                setIsOrderPlaced(false);
                setIsCheckingOut(false);
                onOpenOrders();
              }}
              className="w-full py-3 rounded-2xl bg-[#1B5E3B] hover:bg-[#2D5A27] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Track Live Farm Dispatch</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : isCheckingOut ? (
          /* CHECKOUT VIEW */
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            <button
              onClick={() => setIsCheckingOut(false)}
              className="text-xs text-[#1B5E3B] font-bold flex items-center gap-1 hover:underline"
            >
              ← Back to Cart Items
            </button>

            <div className="bg-white border border-[#E5E0D5] rounded-2xl p-4 space-y-3">
              <h4 className="text-xs font-bold text-[#2D3A26] uppercase tracking-wider">
                1. Delivery Destination
              </h4>
              <div>
                <label className="block text-[11px] font-semibold text-gray-600 mb-0.5">Street Address</label>
                <input
                  type="text"
                  value={addressStreet}
                  onChange={e => setAddressStreet(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl border border-[#D4CDBC] bg-[#FAF9F6] text-xs text-[#2D3A26]"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-0.5">City / District</label>
                  <input
                    type="text"
                    value={addressCity}
                    onChange={e => setAddressCity(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl border border-[#D4CDBC] bg-[#FAF9F6] text-xs text-[#2D3A26]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-0.5">Pincode</label>
                  <input
                    type="text"
                    value={addressPincode}
                    onChange={e => setAddressPincode(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl border border-[#D4CDBC] bg-[#FAF9F6] text-xs text-[#2D3A26]"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#E5E0D5] rounded-2xl p-4 space-y-2">
              <h4 className="text-xs font-bold text-[#2D3A26] uppercase tracking-wider">
                2. Preferred Delivery Slot
              </h4>
              <div className="space-y-1.5">
                {[
                  'Today Evening (05:00 PM - 08:00 PM)',
                  'Tomorrow Morning (07:00 AM - 10:00 AM)',
                  'Tomorrow Afternoon (01:00 PM - 04:00 PM)'
                ].map(slot => (
                  <label
                    key={slot}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer text-xs transition-colors ${
                      deliverySlot === slot
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold'
                        : 'border-[#E5E0D5] bg-white text-gray-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="slot"
                      checked={deliverySlot === slot}
                      onChange={() => setDeliverySlot(slot)}
                      className="text-emerald-600"
                    />
                    <span>{slot}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white border border-[#E5E0D5] rounded-2xl p-4 space-y-2">
              <h4 className="text-xs font-bold text-[#2D3A26] uppercase tracking-wider">
                3. Payment Method
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'upi', label: '⚡ Instant UPI / QR', desc: 'GPay, PhonePe, Paytm' },
                  { id: 'cod', label: '💵 Cash On Delivery', desc: 'Pay at doorstep' },
                  { id: 'card', label: '💳 Debit / Credit Card', desc: 'Visa, RuPay, MC' },
                  { id: 'netbanking', label: '🏦 Net Banking', desc: 'All Indian Banks' }
                ].map(m => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPaymentMethod(m.id as any)}
                    className={`p-2.5 rounded-xl border text-left transition-colors ${
                      paymentMethod === m.id
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold'
                        : 'border-[#E5E0D5] bg-white text-gray-700'
                    }`}
                  >
                    <div className="text-xs">{m.label}</div>
                    <div className="text-[10px] text-gray-500">{m.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Total Summary */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs space-y-1.5">
              <div className="flex justify-between text-emerald-900">
                <span>Produce Total:</span>
                <span>₹{cartTotal}</span>
              </div>
              <div className="flex justify-between text-emerald-900">
                <span>Direct Delivery:</span>
                <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Coupon Discount:</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}
              <div className="border-t border-emerald-200 pt-1.5 flex justify-between font-bold text-sm text-[#1B3B22]">
                <span>Total Amount:</span>
                <span>₹{finalTotal}</span>
              </div>
            </div>

            <button
              onClick={handleConfirmOrder}
              className="w-full py-3.5 rounded-2xl bg-[#1B5E3B] hover:bg-[#2D5A27] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Place Harvest Order (₹{finalTotal})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* CART ITEMS VIEW */
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 flex flex-col justify-between">
            {cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-3 py-12">
                <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                  <Truck className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-bold text-[#1B3B22]">Your Cart is Empty</h4>
                  <p className="text-xs text-gray-500 max-w-xs mt-1">
                    Explore our 100% traceable vegetables, fruits, Vedic ghee, and wild honey freshly harvested today.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                
                {/* Free Delivery Bar */}
                <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-2xl text-xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-[#1B5E3B] flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5" /> Direct Farm Delivery:
                    </span>
                    <span className="font-semibold text-emerald-800">
                      {cartTotal >= freeDeliveryThreshold ? (
                        <span className="text-emerald-700 font-bold">FREE Delivery Unlocked! 🎉</span>
                      ) : (
                        `Add ₹${freeDeliveryThreshold - cartTotal} more for FREE`
                      )}
                    </span>
                  </div>
                  <div className="w-full bg-emerald-200 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#1B5E3B] h-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (cartTotal / freeDeliveryThreshold) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Items List */}
                <div className="space-y-2.5">
                  {cart.map(item => (
                    <div
                      key={item.product.id}
                      className="bg-white border border-[#E5E0D5] p-3 rounded-2xl flex items-center gap-3 shadow-2xs"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-14 h-14 rounded-xl object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-[#2D3A26] truncate">{item.product.name}</h4>
                        <p className="text-[10px] text-gray-500 truncate">{item.product.farmName}</p>
                        <p className="text-xs font-extrabold text-[#1B5E3B] mt-0.5">
                          ₹{item.product.pricePerUnit} <span className="text-[10px] font-normal text-gray-500">/ {item.product.unit}</span>
                        </p>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-1.5 bg-[#FAF9F6] border border-[#E5E0D5] rounded-xl px-1.5 py-1">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 rounded-lg hover:bg-white text-gray-600"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 rounded-lg hover:bg-white text-gray-600"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-gray-400 hover:text-rose-600 transition-colors p-1"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Coupon Code Applicator */}
                <div className="bg-white border border-[#E5E0D5] p-3 rounded-2xl">
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between text-xs bg-emerald-50 text-emerald-800 p-2 rounded-xl">
                      <span className="font-bold flex items-center gap-1">
                        <Tag className="w-3.5 h-3.5" /> Code {appliedCoupon.code} Applied (-₹{discountAmount})
                      </span>
                      <button onClick={removeCoupon} className="text-rose-600 text-[11px] font-bold hover:underline">
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Promo code (e.g. KISAN50)"
                        value={couponInput}
                        onChange={e => setCouponInput(e.target.value)}
                        className="flex-1 px-3 py-1.5 rounded-xl border border-[#D4CDBC] bg-[#FAF9F6] text-xs uppercase"
                      />
                      <button
                        type="submit"
                        className="px-3 py-1.5 bg-[#1B5E3B] text-white text-xs font-bold rounded-xl hover:bg-[#2D5A27] transition-colors"
                      >
                        Apply
                      </button>
                    </form>
                  )}
                  {couponFeedback && (
                    <p className={`text-[11px] mt-1.5 ${couponFeedback.success ? 'text-emerald-700 font-bold' : 'text-rose-600'}`}>
                      {couponFeedback.message}
                    </p>
                  )}
                </div>

                {/* Summary */}
                <div className="bg-white border border-[#E5E0D5] p-3.5 rounded-2xl text-xs space-y-1.5">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal:</span>
                    <span>₹{cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee:</span>
                    <span>{deliveryFee === 0 ? <span className="text-emerald-700 font-bold">FREE</span> : `₹${deliveryFee}`}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-bold">
                      <span>Discount:</span>
                      <span>-₹{discountAmount}</span>
                    </div>
                  )}
                  <div className="border-t border-[#E5E0D5] pt-1.5 flex justify-between font-bold text-sm text-[#1B3B22]">
                    <span>Total:</span>
                    <span>₹{finalTotal}</span>
                  </div>
                </div>

                {/* Checkout Trigger */}
                <button
                  onClick={() => setIsCheckingOut(true)}
                  className="w-full py-3.5 rounded-2xl bg-[#1B5E3B] hover:bg-[#2D5A27] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
