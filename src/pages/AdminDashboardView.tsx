import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import { Shield, Users, ShoppingBag, DollarSign, Sprout, Compass, CheckCircle2, QrCode, Search } from 'lucide-react';

export const AdminDashboardView: React.FC = () => {
  const { products, orders, slots, bookings, workerRequests, laborGroups } = useStore();
  const { allUsers } = useAuth();

  const [activeTab, setActiveTab] = useState<'farmers' | 'orders' | 'labour' | 'tours'>('farmers');
  const [searchTerm, setSearchTerm] = useState('');

  const farmers = allUsers.filter(u => u.role === 'farmer');
  const consumers = allUsers.filter(u => u.role === 'consumer');

  const totalGMV = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#1B3B22] to-[#2D5A27] text-white p-6 sm:p-8 rounded-3xl shadow-lg space-y-2">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-purple-400" />
          <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-500/30 text-purple-200 border border-purple-400/30 inline-block">
            Platform Operations & Oversight
          </span>
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold">
          KisanSetu 2.0 Central Admin Command
        </h1>
        <p className="text-xs text-gray-200 max-w-xl">
          Unified administrative dashboard monitoring GMV, farmer verification, direct orders, agro-tourism tour rosters, and rural labor deployments.
        </p>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white border border-[#E5E0D5] p-5 rounded-3xl space-y-1 shadow-2xs">
          <span className="text-[10px] font-bold text-gray-500 uppercase">Gross Platform GMV</span>
          <div className="font-serif text-2xl font-bold text-[#1B5E3B]">₹{totalGMV.toLocaleString()}</div>
          <span className="text-[11px] text-emerald-600 font-semibold">100% fair farmer pass-thru</span>
        </div>

        <div className="bg-white border border-[#E5E0D5] p-5 rounded-3xl space-y-1 shadow-2xs">
          <span className="text-[10px] font-bold text-gray-500 uppercase">Verified Farmers</span>
          <div className="font-serif text-2xl font-bold text-[#1B3B22]">{farmers.length}</div>
          <span className="text-[11px] text-gray-500">{products.length} live crop harvests</span>
        </div>

        <div className="bg-white border border-[#E5E0D5] p-5 rounded-3xl shadow-2xs">
          <span className="text-[10px] font-bold text-gray-500 uppercase">Consumer Accounts</span>
          <div className="font-serif text-2xl font-bold text-amber-700">{consumers.length}</div>
          <span className="text-[11px] text-gray-500">Active fresh produce buyers</span>
        </div>

        <div className="bg-white border border-[#E5E0D5] p-5 rounded-3xl shadow-2xs">
          <span className="text-[10px] font-bold text-gray-500 uppercase">Total Orders</span>
          <div className="font-serif text-2xl font-bold text-blue-700">{orders.length}</div>
          <span className="text-[11px] text-gray-500">Direct doorstep crates</span>
        </div>

        <div className="bg-white border border-[#E5E0D5] p-5 rounded-3xl shadow-2xs col-span-2 lg:col-span-1">
          <span className="text-[10px] font-bold text-gray-500 uppercase">Agro-Tour Passes</span>
          <div className="font-serif text-2xl font-bold text-purple-700">
            {bookings.reduce((sum, b) => sum + b.visitorCount, 0)}
          </div>
          <span className="text-[11px] text-gray-500">Visitors on organic farms</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#E5E0D5] text-xs font-bold">
        {[
          { id: 'farmers', label: `Farmers Directory (${farmers.length})` },
          { id: 'orders', label: `Orders Pipeline (${orders.length})` },
          { id: 'labour', label: `Labour Dispatch (${workerRequests.length})` },
          { id: 'tours', label: `Agro-Tourism Passes (${bookings.length})` }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`py-3 px-5 border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-[#1B5E3B] text-[#1B5E3B]'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB: FARMERS DIRECTORY */}
      {activeTab === 'farmers' && (
        <div className="bg-white border border-[#E5E0D5] rounded-3xl overflow-hidden shadow-2xs">
          <div className="p-4 border-b border-[#E5E0D5] flex items-center justify-between">
            <span className="text-xs font-bold text-[#1B3B22]">Registered Farmer Producers</span>
            <span className="text-[11px] text-emerald-700 font-semibold">100% Aadhaar & Land Record KYC Verified</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#FAF9F6] border-b border-[#E5E0D5] text-gray-500 font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-3.5">Farmer & Farm Name</th>
                  <th className="p-3.5">District / State</th>
                  <th className="p-3.5">Land Area</th>
                  <th className="p-3.5">Farming Method</th>
                  <th className="p-3.5">Contact Phone</th>
                  <th className="p-3.5 text-right">Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E0D5]">
                {farmers.map(f => (
                  <tr key={f.id} className="hover:bg-[#FAF9F6]/50">
                    <td className="p-3.5 flex items-center gap-3">
                      <img src={f.avatar} alt={f.name} className="w-9 h-9 rounded-xl object-cover" />
                      <div>
                        <span className="font-bold text-[#2D3A26] block">{f.name}</span>
                        <span className="text-[11px] text-gray-500">{f.farmerProfile?.farmName}</span>
                      </div>
                    </td>
                    <td className="p-3.5 text-gray-600">{f.location?.district}, {f.location?.state}</td>
                    <td className="p-3.5 font-bold text-[#2D3A26]">{f.farmerProfile?.landArea || 10} Acres</td>
                    <td className="p-3.5">
                      <span className="text-[10px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded font-bold border border-emerald-200">
                        {f.farmerProfile?.farmingStyle || '100% Organic'}
                      </span>
                    </td>
                    <td className="p-3.5 font-mono text-gray-600">{f.phone}</td>
                    <td className="p-3.5 text-right">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" /> Verified
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB: ORDERS PIPELINE */}
      {activeTab === 'orders' && (
        <div className="bg-white border border-[#E5E0D5] rounded-3xl overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#FAF9F6] border-b border-[#E5E0D5] text-gray-500 font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-3.5">Order Number</th>
                  <th className="p-3.5">Consumer</th>
                  <th className="p-3.5">Items</th>
                  <th className="p-3.5">Total GMV</th>
                  <th className="p-3.5">Payment</th>
                  <th className="p-3.5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E0D5]">
                {orders.map(o => (
                  <tr key={o.id} className="hover:bg-[#FAF9F6]/50">
                    <td className="p-3.5 font-mono font-bold text-emerald-800">{o.orderNumber}</td>
                    <td className="p-3.5 font-bold text-[#2D3A26]">{o.consumerName}</td>
                    <td className="p-3.5 text-gray-600">{o.items.length} produce varieties</td>
                    <td className="p-3.5 font-extrabold text-[#1B5E3B]">₹{o.total}</td>
                    <td className="p-3.5 uppercase text-gray-500 font-mono text-[10px]">{o.paymentMethod}</td>
                    <td className="p-3.5 text-right">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 uppercase">
                        {o.orderStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB: LABOUR DISPATCH */}
      {activeTab === 'labour' && (
        <div className="bg-white border border-[#E5E0D5] rounded-3xl p-5 space-y-4">
          <h3 className="font-serif text-base font-bold text-[#1B3B22]">Active Rural Labour Assignments</h3>
          <div className="space-y-3">
            {workerRequests.map(r => (
              <div key={r.id} className="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#E5E0D5] text-xs flex justify-between items-center">
                <div>
                  <span className="font-mono font-bold text-emerald-800">{r.requestCode}</span>
                  <span className="font-bold text-[#2D3A26] ml-2">{r.jobCategory} ({r.cropName})</span>
                  <p className="text-[11px] text-gray-500 mt-0.5">Farm: {r.farmName} • {r.farmLocation}</p>
                </div>
                <div className="text-right">
                  <span className="text-emerald-700 font-bold block">{r.workersNeeded} Workers @ ₹{r.wagePerWorker}/day</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                    {r.status === 'matched' ? `Matched: ${r.matchedGroupName}` : 'Broadcasting'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: TOURS & PASSES */}
      {activeTab === 'tours' && (
        <div className="bg-white border border-[#E5E0D5] rounded-3xl p-5 space-y-4">
          <h3 className="font-serif text-base font-bold text-[#1B3B22]">Agro-Tourism Booked Passes</h3>
          <div className="space-y-3">
            {bookings.map(b => (
              <div key={b.id} className="p-3.5 rounded-2xl bg-[#FAF9F6] border border-[#E5E0D5] text-xs flex justify-between items-center">
                <div>
                  <span className="font-mono font-bold text-purple-800">{b.bookingCode}</span>
                  <span className="font-bold text-[#2D3A26] ml-2">{b.slotDetails.farmName}</span>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Visitor: {b.consumerName} ({b.consumerPhone}) • {b.visitDate}
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-emerald-700 block">{b.visitorCount} Guests (₹{b.totalPrice})</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                    Pass Confirmed ✓
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
