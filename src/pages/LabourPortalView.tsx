import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';
import { Users, Phone, Star, MapPin, CheckCircle2, Plus, Calendar, Clock, ArrowRight } from 'lucide-react';
import { WorkerRequest } from '../types';

export const LabourPortalView: React.FC = () => {
  const { laborGroups, workerRequests, createWorkerRequest, matchWorkerRequest } = useStore();
  const { currentUser, openAuthModal } = useAuth();

  const [showRequestModal, setShowRequestModal] = useState(false);
  const [jobCategory, setJobCategory] = useState<WorkerRequest['jobCategory']>('Harvesting & Picking');
  const [cropName, setCropName] = useState('Desi Tomatoes');
  const [workersNeeded, setWorkersNeeded] = useState('6');
  const [wagePerWorker, setWagePerWorker] = useState('550');
  const [startDate, setStartDate] = useState('2026-10-22');
  const [durationDays, setDurationDays] = useState('3');
  const [notes, setNotes] = useState('Morning harvest, tea & lunch provided.');

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      openAuthModal('login');
      return;
    }

    createWorkerRequest({
      farmerId: currentUser.id,
      farmerName: currentUser.name,
      farmerPhone: currentUser.phone || '+91 98220 14567',
      farmName: currentUser.farmerProfile?.farmName || `${currentUser.name}'s Farm`,
      farmLocation: `${currentUser.location?.district || 'Nashik'} Belt`,
      jobCategory,
      cropName,
      workersNeeded: Number(workersNeeded),
      startDate,
      endDate: startDate,
      durationDays: Number(durationDays),
      workingHours: '08:00 AM - 05:00 PM',
      wagePerWorker: Number(wagePerWorker),
      foodStayProvided: true,
      notes
    });

    setShowRequestModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1B3B22] to-[#2D5A27] text-white p-6 sm:p-8 rounded-3xl shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-400 text-amber-950 inline-block">
            Rural Employment & Agricultural Labour
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold">
            Farm Labour Cooperatives & Teams
          </h1>
          <p className="text-xs text-gray-200 max-w-xl">
            Directly connect landholding farmers with verified local rural labor cooperatives for peak harvesting, tillage, and packing.
          </p>
        </div>

        <button
          onClick={() => setShowRequestModal(true)}
          className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Post Labour Request</span>
        </button>
      </div>

      {/* 2 Column: Verified Cooperatives & Open Job Requests */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Verified Cooperatives Directory */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#1B3B22]">
                Verified Labour Cooperatives ({laborGroups.length})
              </h2>
              <p className="text-xs text-gray-600">Local groups ready for on-field deployment</p>
            </div>
          </div>

          <div className="space-y-4">
            {laborGroups.map(grp => (
              <div
                key={grp.id}
                className="bg-white border border-[#E5E0D5] rounded-3xl p-5 shadow-xs hover:shadow-md transition-shadow space-y-3"
              >
                <div className="flex flex-wrap items-start justify-between gap-2 border-b border-gray-100 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif text-base font-bold text-[#1B3B22]">{grp.groupName}</h3>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                        Verified Group
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-0.5">Leader: <strong className="text-[#2D3A26]">{grp.leaderName}</strong></p>
                    <p className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#1B5E3B]" /> {grp.location} ({grp.distanceKm} km away)
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold text-[#1B5E3B] bg-emerald-50 px-2.5 py-1 rounded-xl block border border-emerald-200">
                      {grp.availableWorkers} Workers Available
                    </span>
                    <span className="text-xs font-semibold text-gray-700 mt-1 block">
                      {grp.dailyRateEstimate}
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Specialties:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {grp.specialties.map((s, idx) => (
                      <span key={idx} className="text-[11px] font-medium px-2 py-0.5 rounded-lg bg-[#FAF9F6] border border-[#E5E0D5] text-[#2D3A26]">
                        ✓ {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs text-amber-600 font-bold flex items-center gap-0.5">
                    <Star className="w-3.5 h-3.5 fill-amber-500" /> {grp.rating} (Verified Attendance)
                  </span>

                  <a
                    href={`tel:${grp.phone}`}
                    className="px-4 py-1.5 rounded-xl bg-[#1B5E3B] hover:bg-[#2D5A27] text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Call Leader ({grp.phone})</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Farmer Labour Requests */}
        <div className="lg:col-span-5 space-y-4">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#1B3B22]">
              Open Farmer Labour Postings ({workerRequests.length})
            </h2>
            <p className="text-xs text-gray-600">Harvest and field operations seeking labour teams</p>
          </div>

          <div className="space-y-3">
            {workerRequests.map(req => (
              <div
                key={req.id}
                className="bg-white border border-[#E5E0D5] rounded-3xl p-4 space-y-2.5 shadow-2xs"
              >
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span className="font-mono text-xs font-bold text-emerald-800">{req.requestCode}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    req.status === 'matched' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {req.status === 'matched' ? 'Team Matched ✓' : 'Seeking 6 Workers'}
                  </span>
                </div>

                <div>
                  <h4 className="font-serif text-sm font-bold text-[#1B3B22]">{req.jobCategory}</h4>
                  <p className="text-xs text-gray-700">{req.cropName} • {req.farmName}</p>
                  <p className="text-[11px] text-gray-500">{req.farmLocation}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs bg-[#FAF9F6] p-2.5 rounded-xl border border-[#E5E0D5]">
                  <div>Wage: <strong className="text-emerald-700">₹{req.wagePerWorker}/day</strong></div>
                  <div>Workers: <strong className="text-[#2D3A26]">{req.workersNeeded}</strong></div>
                  <div>Starts: <strong className="text-[#2D3A26]">{req.startDate}</strong></div>
                  <div>Duration: <strong className="text-[#2D3A26]">{req.durationDays} Days</strong></div>
                </div>

                {req.notes && (
                  <p className="text-[11px] text-gray-500 italic">"{req.notes}"</p>
                )}

                {req.status === 'open' && (
                  <button
                    onClick={() => matchWorkerRequest(req.id, laborGroups[0].id)}
                    className="w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1 mt-1"
                  >
                    <span>Assign Shivaji Agro Labor Team</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Modal: Post Labour Request */}
      {showRequestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FAF9F6] border border-[#E5E0D5] w-full max-w-md rounded-3xl shadow-2xl p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-lg font-bold text-[#1B3B22]">Post Farm Labour Request</h3>
              <button onClick={() => setShowRequestModal(false)} className="text-gray-400">✕</button>
            </div>

            <form onSubmit={handleCreateRequest} className="space-y-3 text-xs">
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
                  <option value="Post-Harvest Sorting">Post-Harvest Sorting</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#2D3A26] mb-1">Crop / Specific Field Task</label>
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
                    required
                    value={workersNeeded}
                    onChange={e => setWorkersNeeded(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#D4CDBC] bg-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#2D3A26] mb-1">Daily Wage / Person (₹)</label>
                  <input
                    type="number"
                    required
                    value={wagePerWorker}
                    onChange={e => setWagePerWorker(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#D4CDBC] bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-[#2D3A26] mb-1">Start Date</label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#D4CDBC] bg-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#2D3A26] mb-1">Duration (Days)</label>
                  <input
                    type="number"
                    required
                    value={durationDays}
                    onChange={e => setDurationDays(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#D4CDBC] bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#2D3A26] mb-1">Notes / Instructions</label>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 rounded-xl border border-[#D4CDBC] bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-[#1B5E3B] hover:bg-[#2D5A27] text-white font-bold shadow-md transition-all mt-2"
              >
                Broadcast Labour Request
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
