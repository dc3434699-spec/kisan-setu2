import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { X, Sprout, ShoppingBag, Users, Shield, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { UserRole } from '../types';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalTab,
    setAuthModalTab,
    login,
    loginAsDemo,
    register
  } = useAuth();
  const { t } = useLanguage();

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('password123');
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Register form state
  const [regRole, setRegRole] = useState<UserRole>('farmer');
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regAddress, setRegAddress] = useState('');
  const [regDistrict, setRegDistrict] = useState('Nashik');
  const [regState, setRegState] = useState('Maharashtra');
  const [regPincode, setRegPincode] = useState('422004');

  // Farmer specific
  const [farmName, setFarmName] = useState('');
  const [surveyNumber, setSurveyNumber] = useState('');
  const [landArea, setLandArea] = useState('12');
  const [soilType, setSoilType] = useState<'Black Cotton' | 'Red Loamy' | 'Alluvial' | 'Laterite' | 'Sandy Loam'>('Black Cotton');
  const [irrigationType, setIrrigationType] = useState<'Drip Irrigation' | 'Sprinkler' | 'Canal Water' | 'Borewell' | 'Rainfed'>('Drip Irrigation');
  const [farmingStyle, setFarmingStyle] = useState<'100% Organic' | 'Natural Farming (SPNF)' | 'Integrated / Conventional'>('100% Organic');
  const [primaryCrops, setPrimaryCrops] = useState('Tomatoes, Pomegranate, Baby Corn');

  // Forgot Password state
  const [forgotPhone, setForgotPhone] = useState('');
  const [forgotStep, setForgotStep] = useState<'request' | 'verify'>('request');
  const [otpCode, setOtpCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsSubmitting(true);
    const success = await login(loginIdentifier, loginPassword);
    setIsSubmitting(false);
    if (!success) {
      setLoginError('User not found. Try one of the 1-click demo accounts below!');
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const cropsArray = primaryCrops.split(',').map(s => s.trim()).filter(Boolean);

    await register({
      name: regName,
      username: regName.toLowerCase().replace(/\s+/g, '_') + '_' + Math.floor(Math.random() * 1000),
      email: regEmail,
      phone: regPhone,
      role: regRole,
      location: {
        address: regAddress,
        district: regDistrict,
        state: regState,
        pincode: regPincode
      },
      farmerProfile: regRole === 'farmer' ? {
        farmName: farmName || `${regName}'s Agro Farm`,
        surveyNumber: surveyNumber || 'Survey 24',
        landArea: Number(landArea) || 10,
        landAreaUnit: 'acre',
        soilType,
        irrigationType,
        farmingStyle,
        cropsGrown: cropsArray.length ? cropsArray : ['Organic Vegetables'],
        organicCertified: farmingStyle === '100% Organic',
        bio: `Sustainable farmer based in ${regDistrict}, producing healthy direct produce.`
      } : undefined
    });

    setIsSubmitting(false);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (forgotStep === 'request') {
      setForgotStep('verify');
    } else {
      setForgotSuccess(true);
      setTimeout(() => {
        setForgotSuccess(false);
        setForgotStep('request');
        setAuthModalTab('login');
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-[#FAF9F6] border border-[#E5E0D5] w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-[#1B3B22] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold">KisanSetu 2.0 Account</h3>
              <p className="text-[11px] text-gray-300">Seamless Access for Farmers, Consumers & Workers</p>
            </div>
          </div>
          <button
            onClick={closeAuthModal}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-[#E5E0D5] bg-white text-xs font-bold">
          <button
            onClick={() => setAuthModalTab('login')}
            className={`flex-1 py-3 text-center transition-colors border-b-2 ${
              authModalTab === 'login'
                ? 'border-[#1B5E3B] text-[#1B5E3B] bg-[#FAF9F6]'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setAuthModalTab('register')}
            className={`flex-1 py-3 text-center transition-colors border-b-2 ${
              authModalTab === 'register'
                ? 'border-[#1B5E3B] text-[#1B5E3B] bg-[#FAF9F6]'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Register New Account
          </button>
          <button
            onClick={() => setAuthModalTab('forgot')}
            className={`py-3 px-4 text-center transition-colors border-b-2 ${
              authModalTab === 'forgot'
                ? 'border-[#1B5E3B] text-[#1B5E3B] bg-[#FAF9F6]'
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            Reset PIN
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          
          {/* Quick Demo Logins Banner */}
          <div className="bg-gradient-to-r from-emerald-50 to-amber-50 border border-[#E5E0D5] p-3.5 rounded-2xl">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#1B5E3B] block mb-2">
              ⚡ Instant 1-Click Demo Evaluation Accounts:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => loginAsDemo('rajesh_farmer')}
                className="p-2 rounded-xl bg-white border border-[#E5E0D5] hover:border-emerald-500 hover:bg-emerald-50/50 text-left transition-all text-xs"
              >
                <div className="font-bold text-[#2D3A26]">🌾 Rajesh Patil</div>
                <div className="text-[10px] text-gray-500">Green Valley Farmer</div>
              </button>
              <button
                type="button"
                onClick={() => loginAsDemo('anita_orchards')}
                className="p-2 rounded-xl bg-white border border-[#E5E0D5] hover:border-amber-500 hover:bg-amber-50/50 text-left transition-all text-xs"
              >
                <div className="font-bold text-[#2D3A26]">🍊 Anita Shinde</div>
                <div className="text-[10px] text-gray-500">Surya Orchards</div>
              </button>
              <button
                type="button"
                onClick={() => loginAsDemo('tanmay123')}
                className="p-2 rounded-xl bg-white border border-[#E5E0D5] hover:border-blue-500 hover:bg-blue-50/50 text-left transition-all text-xs"
              >
                <div className="font-bold text-[#2D3A26]">🛒 Tanmay Rao</div>
                <div className="text-[10px] text-gray-500">Fresh Produce Buyer</div>
              </button>
              <button
                type="button"
                onClick={() => loginAsDemo('suresh_worker')}
                className="p-2 rounded-xl bg-white border border-[#E5E0D5] hover:border-indigo-500 hover:bg-indigo-50/50 text-left transition-all text-xs"
              >
                <div className="font-bold text-[#2D3A26]">👷 Babanrao S.</div>
                <div className="text-[10px] text-gray-500">Shivaji Labour Team</div>
              </button>
              <button
                type="button"
                onClick={() => loginAsDemo('admin')}
                className="p-2 rounded-xl bg-white border border-[#E5E0D5] hover:border-purple-500 hover:bg-purple-50/50 text-left transition-all text-xs sm:col-span-2"
              >
                <div className="font-bold text-[#2D3A26]">🛡️ Platform Admin</div>
                <div className="text-[10px] text-gray-500">Full Oversight & Analytics</div>
              </button>
            </div>
          </div>

          {/* TAB 1: LOGIN */}
          {authModalTab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-3 pt-1">
              {loginError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-[#2D3A26] mb-1">
                  Username, Email, or Mobile Number
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. rajesh_farmer or +91 98220 14567"
                  value={loginIdentifier}
                  onChange={e => setLoginIdentifier(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D4CDBC] bg-white text-xs text-[#2D3A26] focus:outline-emerald-600"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-[#2D3A26]">Password / PIN</label>
                  <button
                    type="button"
                    onClick={() => setAuthModalTab('forgot')}
                    className="text-[11px] text-[#1B5E3B] hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D4CDBC] bg-white text-xs text-[#2D3A26] focus:outline-emerald-600"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-2xl bg-[#1B5E3B] hover:bg-[#2D5A27] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 mt-2"
              >
                <span>Sign In to KisanSetu</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* TAB 2: REGISTER */}
          {authModalTab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              {/* Role Selection */}
              <div>
                <label className="block text-xs font-bold text-[#2D3A26] mb-1.5">
                  Select Your Platform Role:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setRegRole('farmer')}
                    className={`p-2.5 rounded-2xl border text-center transition-all ${
                      regRole === 'farmer'
                        ? 'bg-emerald-50 border-emerald-600 text-emerald-800 font-bold shadow-xs'
                        : 'bg-white border-[#E5E0D5] text-gray-600'
                    }`}
                  >
                    <Sprout className="w-5 h-5 mx-auto mb-1 text-emerald-700" />
                    <span className="text-xs">Farmer / Producer</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRegRole('consumer')}
                    className={`p-2.5 rounded-2xl border text-center transition-all ${
                      regRole === 'consumer'
                        ? 'bg-amber-50 border-amber-600 text-amber-800 font-bold shadow-xs'
                        : 'bg-white border-[#E5E0D5] text-gray-600'
                    }`}
                  >
                    <ShoppingBag className="w-5 h-5 mx-auto mb-1 text-amber-700" />
                    <span className="text-xs">Consumer / Buyer</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRegRole('worker')}
                    className={`p-2.5 rounded-2xl border text-center transition-all ${
                      regRole === 'worker'
                        ? 'bg-blue-50 border-blue-600 text-blue-800 font-bold shadow-xs'
                        : 'bg-white border-[#E5E0D5] text-gray-600'
                    }`}
                  >
                    <Users className="w-5 h-5 mx-auto mb-1 text-blue-700" />
                    <span className="text-xs">Labour / Worker</span>
                  </button>
                </div>
              </div>

              {/* Common Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-[#2D3A26] mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dnyaneshwar Shinde"
                    value={regName}
                    onChange={e => setRegName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#D4CDBC] bg-white text-xs text-[#2D3A26]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#2D3A26] mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98220..."
                    value={regPhone}
                    onChange={e => setRegPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#D4CDBC] bg-white text-xs text-[#2D3A26]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-[#2D3A26] mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="name@gmail.com"
                    value={regEmail}
                    onChange={e => setRegEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#D4CDBC] bg-white text-xs text-[#2D3A26]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#2D3A26] mb-1">Create Password *</label>
                  <input
                    type="password"
                    required
                    placeholder="Min 6 characters"
                    value={regPassword}
                    onChange={e => setRegPassword(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#D4CDBC] bg-white text-xs text-[#2D3A26]"
                  />
                </div>
              </div>

              {/* Location Fields */}
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-bold text-[#2D3A26] mb-1">District</label>
                  <input
                    type="text"
                    value={regDistrict}
                    onChange={e => setRegDistrict(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#D4CDBC] bg-white text-xs text-[#2D3A26]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#2D3A26] mb-1">State</label>
                  <input
                    type="text"
                    value={regState}
                    onChange={e => setRegState(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#D4CDBC] bg-white text-xs text-[#2D3A26]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#2D3A26] mb-1">Pincode</label>
                  <input
                    type="text"
                    value={regPincode}
                    onChange={e => setRegPincode(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#D4CDBC] bg-white text-xs text-[#2D3A26]"
                  />
                </div>
              </div>

              {/* Detailed Farmer Specific Fields */}
              {regRole === 'farmer' && (
                <div className="bg-emerald-50/60 border border-emerald-200/80 p-3.5 rounded-2xl space-y-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900 block">
                    🌾 Farmer & Land Verification Details:
                  </span>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-emerald-950 mb-0.5">Farm / Orchard Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Sahyadri Bio Farm"
                        value={farmName}
                        onChange={e => setFarmName(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-emerald-300 bg-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-emerald-950 mb-0.5">Land Area (Acres)</label>
                      <input
                        type="number"
                        value={landArea}
                        onChange={e => setLandArea(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-emerald-300 bg-white text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-emerald-950 mb-0.5">Soil Type</label>
                      <select
                        value={soilType}
                        onChange={e => setSoilType(e.target.value as any)}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-emerald-300 bg-white text-xs"
                      >
                        <option value="Black Cotton">Black Cotton Soil (Regur)</option>
                        <option value="Red Loamy">Red Loamy Soil</option>
                        <option value="Alluvial">Alluvial Soil</option>
                        <option value="Laterite">Laterite Soil</option>
                        <option value="Sandy Loam">Sandy Loam</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-emerald-950 mb-0.5">Irrigation Setup</label>
                      <select
                        value={irrigationType}
                        onChange={e => setIrrigationType(e.target.value as any)}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-emerald-300 bg-white text-xs"
                      >
                        <option value="Drip Irrigation">Drip Irrigation</option>
                        <option value="Sprinkler">Sprinkler Network</option>
                        <option value="Canal Water">Canal Water</option>
                        <option value="Borewell">Borewell & Pump</option>
                        <option value="Rainfed">Rainfed / Dryland</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-emerald-950 mb-0.5">Primary Crops Grown</label>
                    <input
                      type="text"
                      placeholder="e.g. Desi Tomatoes, Alphonso Mango, Spinach, Wheat"
                      value={primaryCrops}
                      onChange={e => setPrimaryCrops(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-emerald-300 bg-white text-xs"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-2xl bg-[#1B5E3B] hover:bg-[#2D5A27] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 mt-2"
              >
                <span>Complete Registration & Launch Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* TAB 3: FORGOT PASSWORD */}
          {authModalTab === 'forgot' && (
            <form onSubmit={handleForgotSubmit} className="space-y-3 pt-2">
              {forgotSuccess ? (
                <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <p className="text-xs font-bold text-emerald-900">
                    PIN Reset Successfully!
                  </p>
                  <p className="text-[11px] text-emerald-700">
                    Redirecting to Sign In screen...
                  </p>
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-xs font-bold text-[#2D3A26] mb-1">
                      Registered Mobile Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98220 14567"
                      value={forgotPhone}
                      onChange={e => setForgotPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#D4CDBC] bg-white text-xs text-[#2D3A26]"
                    />
                  </div>

                  {forgotStep === 'verify' && (
                    <>
                      <div>
                        <label className="block text-xs font-bold text-[#2D3A26] mb-1">
                          OTP Verification Code (Simulated: Enter 1234)
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="1234"
                          value={otpCode}
                          onChange={e => setOtpCode(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#D4CDBC] bg-white text-xs text-[#2D3A26]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#2D3A26] mb-1">
                          New Secure Password / PIN
                        </label>
                        <input
                          type="password"
                          required
                          placeholder="••••••••"
                          value={newPassword}
                          onChange={e => setNewPassword(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#D4CDBC] bg-white text-xs text-[#2D3A26]"
                        />
                      </div>
                    </>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3 rounded-2xl bg-[#1B5E3B] hover:bg-[#2D5A27] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 mt-2"
                  >
                    <span>{forgotStep === 'request' ? 'Send OTP Code' : 'Confirm New Password'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
