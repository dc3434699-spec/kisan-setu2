import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, Truck, CheckCircle2, Clock, QrCode, Phone, AlertCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { Order } from '../types';

interface ConsumerOrdersViewProps {
  onSelectProductBatch?: (batchId: string) => void;
  onOpenMarketplace?: () => void;
}

export const ConsumerOrdersView: React.FC<ConsumerOrdersViewProps> = ({
  onSelectProductBatch,
  onOpenMarketplace
}) => {
  const { orders, cancelOrder, openTraceability, addToCart } = useStore();
  const { currentUser } = useAuth();
  const [filter, setFilter] = useState<'all' | 'active' | 'delivered'>('all');

  const myOrders = orders.filter(
    o => o.consumerId === currentUser?.id || currentUser?.username === 'tanmay123'
  );

  const filteredOrders = myOrders.filter(o => {
    if (filter === 'active') return o.orderStatus !== 'delivered' && o.orderStatus !== 'cancelled';
    if (filter === 'delivered') return o.orderStatus === 'delivered';
    return true;
  });

  const getStatusStepIndex = (status: Order['orderStatus']) => {
    switch (status) {
      case 'placed': return 0;
      case 'confirmed': return 1;
      case 'harvesting': return 2;
      case 'packed': return 3;
      case 'dispatched': return 4;
      case 'delivered': return 5;
      default: return -1;
    }
  };

  const steps = [
    'Order Placed',
    'Confirmed',
    'Morning Harvest',
    'Cold Packed',
    'Out for Delivery',
    'Delivered'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#1B3B22] to-[#2D5A27] text-white p-6 sm:p-8 rounded-3xl shadow-lg space-y-2">
        <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-400 text-emerald-950 inline-block">
          Direct Farm Logistics
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold">
          My Farm Produce Orders & Live Tracking
        </h1>
        <p className="text-xs text-gray-200 max-w-xl">
          Track field harvesting, morning dispatch vans, and trace chemical residue lab certificates directly to your doorstep.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex border-b border-[#E5E0D5] text-xs font-bold">
        {[
          { id: 'all', label: `All Orders (${myOrders.length})` },
          { id: 'active', label: `In Transit (${myOrders.filter(o => o.orderStatus !== 'delivered' && o.orderStatus !== 'cancelled').length})` },
          { id: 'delivered', label: `Delivered (${myOrders.filter(o => o.orderStatus === 'delivered').length})` }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id as any)}
            className={`py-3 px-5 border-b-2 transition-colors ${
              filter === tab.id
                ? 'border-[#1B5E3B] text-[#1B5E3B]'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {filteredOrders.length === 0 ? (
          <div className="bg-white border border-[#E5E0D5] rounded-3xl p-12 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 mx-auto">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#1B3B22]">No Orders Found</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              You do not have any orders in this tab. Explore fresh organic harvests in the marketplace!
            </p>
            <button
              onClick={onOpenMarketplace}
              className="px-4 py-2 rounded-xl bg-[#1B5E3B] text-white text-xs font-bold"
            >
              Shop Produce Now
            </button>
          </div>
        ) : (
          filteredOrders.map(order => {
            const currentStepIdx = getStatusStepIndex(order.orderStatus);

            return (
              <div
                key={order.id}
                className="bg-white border border-[#E5E0D5] rounded-3xl p-6 space-y-5 shadow-xs"
              >
                {/* Header info */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-emerald-800">
                        {order.orderNumber}
                      </span>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        order.orderStatus === 'delivered'
                          ? 'bg-emerald-100 text-emerald-800'
                          : order.orderStatus === 'cancelled'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {order.orderStatus.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Placed on {new Date(order.createdAt).toLocaleDateString()} • Tracking: <span className="font-mono text-[#2D3A26]">{order.trackingNumber}</span>
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-lg font-extrabold text-[#1B5E3B]">₹{order.total}</span>
                    <span className="text-[11px] text-gray-500 block">
                      Paid via {order.paymentMethod.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Visual Tracking Timeline (Only if not cancelled) */}
                {order.orderStatus !== 'cancelled' && (
                  <div className="bg-[#FAF9F6] p-4 rounded-2xl border border-[#E5E0D5] space-y-3">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                      Live Delivery Pipeline Status:
                    </span>
                    <div className="flex items-center justify-between relative overflow-x-auto pb-1">
                      {steps.map((s, idx) => {
                        const isDone = idx <= currentStepIdx;
                        const isCurrent = idx === currentStepIdx;
                        return (
                          <div key={idx} className="flex flex-col items-center flex-1 min-w-[70px] text-center relative z-10">
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold mb-1 transition-all ${
                                isCurrent
                                  ? 'bg-[#1B5E3B] text-white ring-4 ring-emerald-200'
                                  : isDone
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-gray-200 text-gray-500'
                              }`}
                            >
                              {isDone ? '✓' : idx + 1}
                            </div>
                            <span className={`text-[10px] ${isCurrent ? 'font-bold text-[#1B5E3B]' : 'text-gray-600'}`}>
                              {s}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Items & Destination */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  
                  {/* Items List */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                      Produce Items in this Harvest Crate:
                    </span>
                    <div className="space-y-2">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-gray-50 border border-gray-100">
                          <div className="flex items-center gap-2">
                            <img src={item.product.image} alt={item.product.name} className="w-10 h-10 rounded-lg object-cover" />
                            <div>
                              <span className="font-bold text-[#2D3A26] block">{item.product.name}</span>
                              <span className="text-[10px] text-gray-500">{item.quantity} {item.product.unit} • {item.product.farmName}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => openTraceability(item.product.batchId)}
                            className="text-[10px] text-emerald-800 font-bold bg-emerald-50 px-2 py-1 rounded border border-emerald-200 hover:bg-emerald-100 flex items-center gap-1"
                          >
                            <QrCode className="w-3 h-3" />
                            <span>Trace</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Destination & Slot */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                      Delivery Window & Address:
                    </span>
                    <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100 space-y-1 text-gray-700">
                      <p className="font-bold text-[#1B3B22]">{order.deliverySlot}</p>
                      <p>{order.deliveryAddress.street}</p>
                      <p>{order.deliveryAddress.city}, Maharashtra {order.deliveryAddress.pincode}</p>
                      <p className="text-[11px] text-gray-500">Contact: {order.consumerPhone}</p>
                    </div>
                  </div>

                </div>

                {/* Bottom Actions */}
                <div className="pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {order.items.map(item => (
                      <button
                        key={item.product.id}
                        onClick={() => addToCart(item.product, item.quantity)}
                        className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold hover:bg-emerald-100 transition-colors flex items-center gap-1"
                      >
                        <RotateCcw className="w-3 h-3" /> Reorder {item.product.name.split(' ')[0]}
                      </button>
                    ))}
                  </div>

                  {order.orderStatus !== 'delivered' && order.orderStatus !== 'cancelled' && (
                    <button
                      onClick={() => cancelOrder(order.id)}
                      className="text-xs text-rose-600 font-bold hover:underline"
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
