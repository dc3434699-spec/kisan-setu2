import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import {
  X,
  Sprout,
  ShoppingBag,
  Users,
  Shield,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
  Lock,
  Phone,
  User as UserIcon,
  MapPin,
  TrendingUp,
  KeyRound,
  ShieldAlert
} from 'lucide-react';
import { UserRole } from '../types';

interface AuthModalProps {
  onNavigate?: (view: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onNavigate }) => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalTab,
    setAuthModalTab,
    login,
    loginAsDemo,
    register,
    demoAccounts
  } = useAuth();
  const { t } = useLanguage();

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('rajesh_farmer');
  const [loginPassword, setLoginPassword] = useState('kisan123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState('');
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
  const [regError, setRegError] = useState('');

  // Farmer specific registration fields
  const [farmName, setFarmName] = useState('');
  const [surveyNumber, setSurveyNumber] = useState('');
  const [landArea, setLandArea] = useState('12');
  const [soilType, setSoilType] = useState<'Black Cotton' | 'Red Loamy' | 'Alluvial' | 'Laterite' | 'Sandy Loam'>('Black Cotton');
  const [irrigationType, setIrrigationType] = useState<'Drip Irrigation' | 'Sprinkler' | 'Canal Water' | 'Borewell' | 'Rainfed'>('Drip Irrigation');
  const [farmingStyle, setFarmingStyle] = useState<'100% Organic' | 'Natural Farming (SPNF)' | 'Integrated / Conventional'>('100% Organic');
  const [primaryCrops, setPrimaryCrops] = useState('Tomatoes, Spinach, Strawberries, Carrots');

  // Forgot Password / PIN state
  const [forgotPhone, setForgotPhone] = useState('+91 98220 14567');
  const [forgotStep, setForgotStep] = useState<'request' | 'verify'>('request');
  const [otpCode, setOtpCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);
  const [forgotError, setForgotError] = useState('');

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginSuccess('');
    setIsSubmitting(true);

    try {
      const res = await login(loginIdentifier, loginPassword);
      if (res.success && res.user) {
        setLoginSuccess(`Welcome back, ${res.user.name}!`);
        // Navigate to role-specific dashboard
        if (onNavigate) {
          if (res.user.role === 'farmer') onNavigate('farmer-dashboard');
          else if (res.user.role === 'consumer') onNavigate('marketplace');
          else if (res.user.role === 'worker') onNavigate('labour');
          else if (res.user.role === 'admin') onNavigate('admin');
        }
      } else {
        setLoginError(res.error || 'Authentication failed. Please check your credentials.');
      }
    } catch (err: any) {
      setLoginError(err?.message || 'Login error occurred. Try demo accounts below.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoClick = (demoKey: string) => {
    setLoginError('');
    loginAsDemo(demoKey, view => {
      if (onNavigate) {
        onNavigate(view);
      }
    });
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');

    if (!regName.trim()) {
      setRegError('Please provide your full legal name.');
      return;
    }
    if (!regPhone.trim() && !regEmail.trim()) {
      setRegError('Please enter either a mobile number or email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      const cropsArray = primaryCrops.split(',').map(s => s.trim()).filter(Boolean);
      const generatedUsername = (regName.toLowerCase().replace(/[^a-z0-9]/g, '_') + '_' + Math.floor(100 + Math.random() * 900));

      const newUser = await register({
        name: regName.trim(),
        username: generatedUsername,
        email: regEmail.trim(),
        phone: regPhone.trim(),
        role: regRole,
        password: regPassword.trim() || 'kisan123',
        location: {
          address: regAddress || 'Village Panchayat Area',
          district: regDistrict,
          state: regState,
          pincode: regPincode
        },
        farmerProfile:
          regRole === 'farmer'
            ? {
                farmName: farmName.trim() || `${regName}'s Organic Agro Farm`,
                surveyNumber: surveyNumber.trim() || '44/2A',
                landArea: Number(landArea) || 10,
                landAreaUnit: 'acre',
                soilType,
                irrigationType,
                farmingStyle,
                cropsGrown: cropsArray.length ? cropsArray : ['Organic Vegetables', 'Baby Spinach'],
                organicCertified: farmingStyle === '100% Organic',
                bio: `Certified sustainable agricultural producer located in ${regDistrict}, Maharashtra.`
              }
            : undefined
      });

      if (onNavigate) {
        if (newUser.role === 'farmer') onNavigate('farmer-dashboard');
        else if (newUser.role === 'consumer') onNavigate('marketplace');
        else if (newUser.role === 'worker') onNavigate('labour');
      }
    } catch (err: any) {
      setRegError('Registration could not be completed. Please check the inputs.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError('');

    if (forgotStep === 'request') {
      if (!forgotPhone.trim()) {
        setForgotError('Please enter your registered mobile number or email.');
        return;
      }
      setForgotStep('verify');
      setOtpCode('5521'); // Simulated OTP for demo
    } else {
      if (!newPassword.trim()) {
        setForgotError('Please enter a new password / PIN.');
        return;
      }
      setForgotSuccess(true);
      setTimeout(() => {
        setForgotSuccess(false);
        setForgotStep('request');
        setAuthModalTab('login');
      }, 1800);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150 overflow-y-auto"
    >
      <div className="bg-[#FAF9F6] border border-[#E5E0D5] w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[92vh] my-auto">
        
        {/* LEFT COLUMN: Agricultural Brand Identity & Value Props (Split Screen on Desktop) */}
        <div className="hidden md:flex md:w-5/12 bg-gradient-to-br from-[#1B3B22] via-[#1B5E3B] to-[#2D5A27] text-white p-7 flex-col justify-between relative overflow-hidden">
          {/* Subtle nature leaf glow background */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            {/* Brand Logo & Name */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-inner">
                <Sprout className="w-6 h-6 text-emerald-300" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h2 id="auth-modal-title" className="font-serif text-xl font-bold tracking-tight">
                    KisanSetu
                  </h2>
                  <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-200 border border-emerald-400/30">
                    2.0
                  </span>
                </div>
                <p className="text-[11px] text-emerald-200/80">Farm2Home Digital Agricultural Platform</p>
              </div>
            </div>

            {/* Headline */}
            <div className="mb-6">
              <h3 className="font-serif text-2xl font-bold leading-tight mb-2 text-white">
                Empowering Indian Agriculture From Soil to Table.
              </h3>
              <p className="text-xs text-emerald-100/80 leading-relaxed">
                Connect directly with verified organic farmers, transparent APMC mandi market rates, skilled agricultural cooperatives, and farm-stay agro-tourism.
              </p>
            </div>

            {/* 4 Concrete Value Highlights */}
            <div className="space-y-3.5 mb-6">
              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-emerald-300">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <strong className="block font-semibold text-white">Direct Farm2Home Marketplace</strong>
                  <span className="text-emerald-100/75 text-[11px]">Zero middleman exploitation — 35% higher income to rural producers.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-amber-300">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <strong className="block font-semibold text-white">APMC Mandi Intelligence & AI</strong>
                  <span className="text-emerald-100/75 text-[11px]">Real-time daily mandi prices and KrishiMitra voice agronomy assistant.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-blue-300">
                  <Users className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <strong className="block font-semibold text-white">Labour Co-ops & Machinery</strong>
                  <span className="text-emerald-100/75 text-[11px]">On-demand agricultural harvesting teams and modern tractor rentals.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-emerald-300">
                  <Shield className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <strong className="block font-semibold text-white">QR Batch Traceability</strong>
                  <span className="text-emerald-100/75 text-[11px]">100% verified harvest dates, soil type, and zero-chemical pledge.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Demonstration Notice */}
          <div className="relative z-10 pt-4 border-t border-white/15">
            <div className="flex items-center gap-2 text-[11px] text-emerald-200/90 bg-white/10 p-2.5 rounded-xl border border-white/10">
              <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
              <span>
                <strong>College & Hackathon Evaluation Mode:</strong> 1-Click instant demo accounts provided with real pre-seeded datasets.
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Login, Role Selector & Registration Forms */}
        <div className="flex-1 flex flex-col bg-white overflow-y-auto">
          
          {/* Mobile Header / Close Bar */}
          <div className="p-4 sm:p-5 border-b border-[#E5E0D5] flex items-center justify-between bg-[#FAF9F6]">
            <div className="flex items-center gap-2.5 md:hidden">
              <div className="w-8 h-8 rounded-xl bg-[#1B5E3B] flex items-center justify-center text-white">
                <Sprout className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-[#1B3B22]">KisanSetu 2.0</h3>
                <p className="text-[10px] text-gray-500">Sign in or explore demo roles</p>
              </div>
            </div>

            <div className="hidden md:block">
              <h3 className="font-serif text-lg font-bold text-[#1B3B22]">
                {authModalTab === 'login' && 'Account Access'}
                {authModalTab === 'demo' && 'Explore Demonstration Accounts'}
                {authModalTab === 'register' && 'New Agricultural Registration'}
                {authModalTab === 'forgot' && 'Reset Security PIN'}
              </h3>
              <p className="text-xs text-gray-500">
                {authModalTab === 'login' && 'Sign in to access your farm portal, cart, or workforce'}
                {authModalTab === 'demo' && 'Select an evaluation profile to instantly experience KisanSetu 2.0'}
                {authModalTab === 'register' && 'Join Maharashtra’s premier direct-to-home agricultural network'}
                {authModalTab === 'forgot' && 'Recover your PIN via registered mobile verification'}
              </p>
            </div>

            <button
              onClick={closeAuthModal}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors"
              aria-label="Close authentication window"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Selector Buttons */}
          <div className="flex border-b border-[#E5E0D5] bg-[#FDFBF7] text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setAuthModalTab('login');
                setLoginError('');
              }}
              className={`flex-1 py-3 text-center transition-colors border-b-2 ${
                authModalTab === 'login'
                  ? 'border-[#1B5E3B] text-[#1B5E3B] bg-white font-extrabold shadow-2xs'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              Sign In
            </button>

            <button
              type="button"
              onClick={() => {
                setAuthModalTab('demo');
                setLoginError('');
              }}
              className={`flex-1 py-3 text-center transition-colors border-b-2 flex items-center justify-center gap-1.5 ${
                authModalTab === 'demo'
                  ? 'border-[#1B5E3B] text-[#1B5E3B] bg-white font-extrabold shadow-2xs'
                  : 'border-transparent text-emerald-700 hover:text-emerald-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>1-Click Demos</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setAuthModalTab('register');
                setRegError('');
              }}
              className={`flex-1 py-3 text-center transition-colors border-b-2 ${
                authModalTab === 'register'
                  ? 'border-[#1B5E3B] text-[#1B5E3B] bg-white font-extrabold shadow-2xs'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              Register
            </button>

            <button
              type="button"
              onClick={() => {
                setAuthModalTab('forgot');
                setForgotError('');
              }}
              className={`py-3 px-3.5 text-center transition-colors border-b-2 ${
                authModalTab === 'forgot'
                  ? 'border-[#1B5E3B] text-[#1B5E3B] bg-white font-extrabold shadow-2xs'
                  : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              Reset PIN
            </button>
          </div>

          {/* Form / Tab Body Container */}
          <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
            
            {/* SECTION: 1-CLICK PROMINENT DEMO HERO BANNER (Shown on both login & demo tabs) */}
            {(authModalTab === 'login' || authModalTab === 'demo') && (
              <div className="bg-gradient-to-r from-emerald-50 via-[#F7FAF4] to-amber-50/60 border border-emerald-200/70 p-3.5 rounded-2xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-[#1B5E3B] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Instant Evaluator Demo Access:</span>
                  </span>
                  <span className="text-[10px] text-gray-500 font-medium hidden sm:inline">
                    Preloaded roles & data
                  </span>
                </div>

                {/* PRIORITY 1: Prominent Rajesh Farmer Demo Button */}
                <button
                  type="button"
                  onClick={() => handleDemoClick('rajesh_farmer')}
                  className="w-full mb-2.5 p-3 rounded-xl bg-white border-2 border-emerald-500 hover:border-emerald-600 hover:bg-emerald-50/50 text-left transition-all shadow-xs flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=100&q=80"
                      alt="Rajesh Kumar Patil"
                      className="w-10 h-10 rounded-xl object-cover border border-emerald-300"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-[#1B3B22] group-hover:text-emerald-700">
                          Try as Rajesh — Organic Farmer
                        </span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded border border-emerald-200">
                          Recommended
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500">
                        Green Valley Organic Farm (Nashik) • 18 Acres • Tomatoes, Palak, Strawberries
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center text-emerald-700 text-xs font-bold gap-1 shrink-0 ml-2">
                    <span className="hidden sm:inline">Launch Portal</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>

                {/* Secondary Demo Roles Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => handleDemoClick('anita_orchards')}
                    className="p-2 rounded-xl bg-white border border-[#E5E0D5] hover:border-amber-500 hover:bg-amber-50/50 text-left transition-all"
                  >
                    <div className="font-bold text-[11px] text-[#2D3A26]">🍊 Anita Shinde</div>
                    <div className="text-[10px] text-gray-500 truncate">Surya Sunburst Orchards</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDemoClick('tanmay123')}
                    className="p-2 rounded-xl bg-white border border-[#E5E0D5] hover:border-blue-500 hover:bg-blue-50/50 text-left transition-all"
                  >
                    <div className="font-bold text-[11px] text-[#2D3A26]">🛒 Tanmay Rao</div>
                    <div className="text-[10px] text-gray-500 truncate">Fresh Produce Buyer</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDemoClick('suresh_worker')}
                    className="p-2 rounded-xl bg-white border border-[#E5E0D5] hover:border-indigo-500 hover:bg-indigo-50/50 text-left transition-all"
                  >
                    <div className="font-bold text-[11px] text-[#2D3A26]">👷 Babanrao Shinde</div>
                    <div className="text-[10px] text-gray-500 truncate">Shivaji Labour Co-op</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDemoClick('admin')}
                    className="p-2 rounded-xl bg-white border border-[#E5E0D5] hover:border-purple-500 hover:bg-purple-50/50 text-left transition-all"
                  >
                    <div className="font-bold text-[11px] text-[#2D3A26]">🛡️ Platform Admin</div>
                    <div className="text-[10px] text-gray-500 truncate">Ecosystem Oversight</div>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 1: MANUAL SIGN IN FORM */}
            {authModalTab === 'login' && (
              <form onSubmit={handleLoginSubmit} className="space-y-3.5 pt-1">
                {loginError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2 animate-in fade-in">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                    <span>{loginError}</span>
                  </div>
                )}

                {loginSuccess && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                    <span>{loginSuccess}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-[#2D3A26] mb-1">
                    Username, Registered Email, or Mobile Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="e.g. rajesh_farmer or rajesh@greenvalley.in"
                      value={loginIdentifier}
                      onChange={e => setLoginIdentifier(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-[#D4CDBC] bg-white text-xs text-[#2D3A26] placeholder:text-gray-400 focus:outline-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all"
                    />
                    <UserIcon className="w-4 h-4 text-gray-400 absolute left-3 top-3 pointer-events-none" />
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1 block">
                    Demo usernames: <code className="text-emerald-700 font-mono">rajesh_farmer</code>, <code className="text-emerald-700 font-mono">anita_orchards</code>, <code className="text-emerald-700 font-mono">tanmay123</code>, <code className="text-emerald-700 font-mono">suresh_worker</code>, <code className="text-emerald-700 font-mono">admin</code>
                  </span>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-[#2D3A26]">Password / Security PIN</label>
                    <button
                      type="button"
                      onClick={() => setAuthModalTab('forgot')}
                      className="text-[11px] text-[#1B5E3B] hover:underline font-semibold"
                    >
                      Forgot PIN?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Enter password or PIN"
                      value={loginPassword}
                      onChange={e => setLoginPassword(e.target.value)}
                      className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-[#D4CDBC] bg-white text-xs text-[#2D3A26] placeholder:text-gray-400 focus:outline-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-all"
                    />
                    <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3 pointer-events-none" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-700 p-0.5"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1 block">
                    Standard demo password for all accounts is: <code className="text-emerald-700 font-mono font-bold">kisan123</code> (Admin: <code className="text-emerald-700 font-mono font-bold">admin123</code>)
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-600">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={e => setRememberMe(e.target.checked)}
                      className="rounded text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5 border-gray-300"
                    />
                    <span>Remember this session</span>
                  </label>
                  <span className="text-[11px] text-gray-400">SSL Encrypted Demo</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-2xl bg-[#1B5E3B] hover:bg-[#2D5A27] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Sign In to KisanSetu</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="text-center pt-2">
                  <span className="text-xs text-gray-500">Need a new account? </span>
                  <button
                    type="button"
                    onClick={() => setAuthModalTab('register')}
                    className="text-xs text-[#1B5E3B] font-bold hover:underline"
                  >
                    Register as Farmer or Consumer
                  </button>
                </div>
              </form>
            )}

            {/* TAB 2: EXPLORE DEMO ROLES (Full View) */}
            {authModalTab === 'demo' && (
              <div className="space-y-3 pt-1">
                <p className="text-xs text-gray-600">
                  Select any persona to test end-to-end functionality across agricultural producer management, consumer buying journeys, labour coordination, or state platform administration:
                </p>

                <div className="space-y-2.5">
                  {demoAccounts.map(account => (
                    <div
                      key={account.id}
                      className="p-3.5 rounded-2xl border border-[#E5E0D5] bg-white hover:border-emerald-500 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
                    >
                      <div className="flex items-start gap-3">
                        <img
                          src={account.avatar}
                          alt={account.displayName}
                          className="w-11 h-11 rounded-xl object-cover shrink-0 border border-gray-200"
                        />
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-xs text-[#1B3B22]">{account.displayName}</span>
                            <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${account.badgeColor} ${account.badgeBg}`}>
                              {account.role.toUpperCase()}
                            </span>
                            <span className="text-[10px] font-mono text-gray-400">@{account.username}</span>
                          </div>
                          <p className="text-xs font-medium text-emerald-800">{account.title}</p>
                          <p className="text-[11px] text-gray-500 leading-tight mt-0.5">{account.shortDescription}</p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDemoClick(account.username)}
                        className="px-3.5 py-2 rounded-xl bg-[#1B5E3B] hover:bg-[#2D5A27] text-white font-bold text-xs transition-colors shrink-0 flex items-center justify-center gap-1.5 shadow-2xs"
                      >
                        <span>Launch Role</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: REGISTRATION FORM */}
            {authModalTab === 'register' && (
              <form onSubmit={handleRegisterSubmit} className="space-y-3.5 pt-1">
                {regError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2 animate-in fade-in">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                    <span>{regError}</span>
                  </div>
                )}

                {/* Role Choice */}
                <div>
                  <label className="block text-xs font-bold text-[#2D3A26] mb-1.5">
                    Select Your Platform Role:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setRegRole('farmer')}
                      className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer ${
                        regRole === 'farmer'
                          ? 'bg-emerald-50 border-emerald-600 text-emerald-900 font-bold shadow-xs'
                          : 'bg-white border-[#E5E0D5] text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Sprout className="w-5 h-5 mx-auto mb-1 text-emerald-700" />
                      <span className="text-xs block">Farmer / Producer</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setRegRole('consumer')}
                      className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer ${
                        regRole === 'consumer'
                          ? 'bg-amber-50 border-amber-600 text-amber-900 font-bold shadow-xs'
                          : 'bg-white border-[#E5E0D5] text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <ShoppingBag className="w-5 h-5 mx-auto mb-1 text-amber-700" />
                      <span className="text-xs block">Consumer Buyer</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setRegRole('worker')}
                      className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer ${
                        regRole === 'worker'
                          ? 'bg-blue-50 border-blue-600 text-blue-900 font-bold shadow-xs'
                          : 'bg-white border-[#E5E0D5] text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Users className="w-5 h-5 mx-auto mb-1 text-blue-700" />
                      <span className="text-xs block">Labour Cooperative</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#2D3A26] mb-1">Full Legal Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Shankar Rao"
                      value={regName}
                      onChange={e => setRegName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#D4CDBC] bg-white text-xs focus:outline-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2D3A26] mb-1">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98XXX XXXXX"
                      value={regPhone}
                      onChange={e => setRegPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#D4CDBC] bg-white text-xs focus:outline-emerald-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#2D3A26] mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="name@domain.com"
                      value={regEmail}
                      onChange={e => setRegEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#D4CDBC] bg-white text-xs focus:outline-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2D3A26] mb-1">Choose PIN / Password</label>
                    <input
                      type="password"
                      placeholder="Create security PIN"
                      value={regPassword}
                      onChange={e => setRegPassword(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#D4CDBC] bg-white text-xs focus:outline-emerald-600"
                    />
                  </div>
                </div>

                {/* Farmer Profile Fields */}
                {regRole === 'farmer' && (
                  <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-2.5">
                    <span className="text-xs font-bold text-emerald-900 block">
                      🌾 Farm & Agricultural Plot Details:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[11px] font-medium text-gray-700 mb-0.5">Farm / Agro Entity Name</label>
                        <input
                          type="text"
                          placeholder="e.g. Sahyadri Organic Orchards"
                          value={farmName}
                          onChange={e => setFarmName(e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-[#D4CDBC] bg-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-gray-700 mb-0.5">Survey 7/12 Land Record No.</label>
                        <input
                          type="text"
                          placeholder="Survey 54/1A"
                          value={surveyNumber}
                          onChange={e => setSurveyNumber(e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-[#D4CDBC] bg-white text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="block text-[10px] font-medium text-gray-700 mb-0.5">Land Area (Acres)</label>
                        <input
                          type="number"
                          value={landArea}
                          onChange={e => setLandArea(e.target.value)}
                          className="w-full px-2 py-1.5 rounded-lg border border-[#D4CDBC] bg-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-medium text-gray-700 mb-0.5">Soil Type</label>
                        <select
                          value={soilType}
                          onChange={e => setSoilType(e.target.value as any)}
                          className="w-full px-2 py-1.5 rounded-lg border border-[#D4CDBC] bg-white text-xs"
                        >
                          <option value="Black Cotton">Black Cotton</option>
                          <option value="Red Loamy">Red Loamy</option>
                          <option value="Alluvial">Alluvial</option>
                          <option value="Laterite">Laterite</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-medium text-gray-700 mb-0.5">Irrigation Method</label>
                        <select
                          value={irrigationType}
                          onChange={e => setIrrigationType(e.target.value as any)}
                          className="w-full px-2 py-1.5 rounded-lg border border-[#D4CDBC] bg-white text-xs"
                        >
                          <option value="Drip Irrigation">Drip</option>
                          <option value="Sprinkler">Sprinkler</option>
                          <option value="Canal Water">Canal</option>
                          <option value="Borewell">Borewell</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-gray-700 mb-0.5">Crops Grown</label>
                      <input
                        type="text"
                        value={primaryCrops}
                        onChange={e => setPrimaryCrops(e.target.value)}
                        placeholder="e.g. Desi Tomatoes, Spinach, Strawberries"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-[#D4CDBC] bg-white text-xs"
                      />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-2xl bg-[#1B5E3B] hover:bg-[#2D5A27] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Complete Registration</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* TAB 4: RESET PIN */}
            {authModalTab === 'forgot' && (
              <form onSubmit={handleForgotSubmit} className="space-y-3.5 pt-1">
                {forgotError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2 animate-in fade-in">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                    <span>{forgotError}</span>
                  </div>
                )}

                {forgotSuccess ? (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-center space-y-2 animate-in fade-in">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                    <h4 className="font-bold text-xs">PIN Reset Successfully!</h4>
                    <p className="text-[11px] text-emerald-700">Redirecting to sign-in screen...</p>
                  </div>
                ) : forgotStep === 'request' ? (
                  <>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Enter your registered mobile number or email to receive a simulated one-time authentication code.
                    </p>
                    <div>
                      <label className="block text-xs font-bold text-[#2D3A26] mb-1">Registered Mobile or Email</label>
                      <input
                        type="text"
                        required
                        value={forgotPhone}
                        onChange={e => setForgotPhone(e.target.value)}
                        placeholder="+91 98220 14567"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#D4CDBC] bg-white text-xs focus:outline-emerald-600"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-[#1B5E3B] hover:bg-[#2D5A27] text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Send Verification OTP</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <>
                    <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs">
                      <strong>Demo OTP:</strong> We have generated temporary OTP code <code className="font-mono font-bold bg-amber-200/60 px-1.5 py-0.5 rounded">5521</code>.
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#2D3A26] mb-1">Enter 4-Digit OTP</label>
                      <input
                        type="text"
                        maxLength={4}
                        required
                        value={otpCode}
                        onChange={e => setOtpCode(e.target.value)}
                        placeholder="5521"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#D4CDBC] bg-white text-xs text-center font-mono tracking-widest text-lg font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#2D3A26] mb-1">Create New Password / PIN</label>
                      <input
                        type="password"
                        required
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        placeholder="Enter new 4-8 character PIN"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#D4CDBC] bg-white text-xs"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-[#1B5E3B] hover:bg-[#2D5A27] text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Confirm & Update PIN</span>
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  </>
                )}
              </form>
            )}

          </div>

          {/* Footer Security Badge */}
          <div className="p-3 bg-[#FAF9F6] border-t border-[#E5E0D5] flex items-center justify-between text-[11px] text-gray-500">
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#1B5E3B]" />
              <span>Certified AgriTech Sandbox</span>
            </span>
            <span>Zero real payment or bank info required</span>
          </div>

        </div>

      </div>
    </div>
  );
};
