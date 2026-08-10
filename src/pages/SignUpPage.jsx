import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { User, Mail, Lock, Eye, EyeOff, Dumbbell, ArrowRight, Sparkles, AlertCircle, ShieldAlert, CheckCircle2, X } from 'lucide-react';

import GoogleAuthModal from '../components/GoogleAuthModal';

export default function SignUpPage() {
  const navigate = useNavigate();
  const { signup, validateCredentials } = useApp();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [accountExistsError, setAccountExistsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Google OAuth Modal State
  const [showGoogleModal, setShowGoogleModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setAccountExistsError(false);

    if (!agreeTerms) {
      setErrorMsg('You must agree to the Terms & Conditions to proceed.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please verify.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Password should be at least 6 characters long.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      // Check if user already exists
      const checkRes = validateCredentials(email, password);
      if (checkRes.error !== 'NO_ACCOUNT') {
        setIsLoading(false);
        setAccountExistsError(true);
        setErrorMsg(`An account with email "${email}" already exists. Please Login instead.`);
        return;
      }

      // Create new account
      signup({ fullName, email, password });
      setIsLoading(false);
      // Navigate automatically to Goal Selection page
      navigate('/goal-selection');
    }, 750);
  };

  const handleOpenGoogleNotice = () => {
    setErrorMsg('');
    setShowGoogleModal(true);
  };

  const handleSelectGoogleAccount = (googleAccount) => {
    setShowGoogleModal(false);
    signup({
      fullName: googleAccount.name,
      email: googleAccount.email,
      password: 'google-oauth-pass',
      avatar: googleAccount.avatar
    });
    navigate('/goal-selection');
  };

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden bg-[#0A0A0A] text-slate-100">
      {/* Background Floating Animated Particles / Orbs */}
      <div className="particle-glow w-[32rem] h-[32rem] bg-[#39FF14]/15 top-[-10%] right-[-10%] animate-pulse" />
      <div className="particle-glow w-[28rem] h-[28rem] bg-[#00CFFF]/15 bottom-[-10%] left-[-10%] animate-pulse" style={{ animationDelay: '2.5s' }} />

      {/* Main Glass Card */}
      <div className="relative z-10 w-full max-w-md glass-card p-8 md:p-10 rounded-[20px] shadow-2xl transition-all duration-500 animate-fadeIn border border-white/10 hover:border-white/15 my-6">
        
        {/* Unique FitGen Logo Emblem Badge */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="relative group transition-transform duration-300 hover:scale-105 mb-3">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#39FF14] via-[#00CFFF] to-[#FF5722] opacity-75 blur-md group-hover:opacity-100 transition duration-500 animate-pulse" />
            <img
              src="/assets/fitgen_logo.png"
              alt="FitGen Logo"
              className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-white/20 shadow-2xl bg-[#0A0A0A]"
            />
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-2xl font-extrabold tracking-wider font-heading text-white">FIT<span className="text-[#39FF14]">GEN</span></span>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-[#00CFFF]/10 text-[#00CFFF] border border-[#00CFFF]/30 rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> JOIN
            </span>
          </div>
          <h1 className="text-2xl font-bold font-heading text-white mt-2">Create Account</h1>
          <p className="text-sm text-slate-400 mt-1">Start your personalized fitness journey today.</p>
        </div>

        {/* Dynamic Error Alert Banner */}
        {errorMsg && (
          <div className="mb-4 p-3.5 bg-rose-500/15 border border-rose-500/40 rounded-xl text-rose-200 text-xs font-medium space-y-2.5 animate-fadeIn">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">{errorMsg}</p>
            </div>

            {accountExistsError && (
              <div className="pt-2 border-t border-rose-500/25 flex items-center justify-between gap-2">
                <span className="text-[11px] text-slate-300 font-semibold">Already registered?</span>
                <Link
                  to="/login"
                  className="px-3 py-1.5 bg-[#39FF14] hover:bg-[#39FF14]/90 text-slate-950 rounded-lg text-xs font-extrabold transition-all shadow-md flex items-center gap-1 cursor-pointer"
                >
                  <span>Login Now</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Sign Up Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Alex Morgan"
                className="w-full pl-10 pr-4 py-2.5 glass-input text-sm text-white placeholder-slate-500 rounded-xl focus:ring-2 focus:ring-[#39FF14]/50"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@example.com"
                className="w-full pl-10 pr-4 py-2.5 glass-input text-sm text-white placeholder-slate-500 rounded-xl focus:ring-2 focus:ring-[#39FF14]/50"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">
              Password
            </label>
            <div className="relative flex items-center">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create strong password"
                className="w-full pl-10 pr-12 py-2.5 glass-input text-sm text-white placeholder-slate-500 rounded-xl focus:ring-2 focus:ring-[#39FF14]/50"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3.5 p-1 flex items-center justify-center text-slate-400 hover:text-[#39FF14] transition-colors cursor-pointer z-20 focus:outline-none"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4 text-[#39FF14]" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className="w-full pl-10 pr-4 py-2.5 glass-input text-sm text-white placeholder-slate-500 rounded-xl focus:ring-2 focus:ring-[#39FF14]/50"
              />
            </div>
          </div>

          {/* Terms & Conditions Checkbox */}
          <div className="pt-1">
            <label className="flex items-start gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-slate-700 bg-slate-900 text-[#39FF14] focus:ring-[#39FF14] focus:ring-offset-slate-900 cursor-pointer accent-[#39FF14]"
              />
              <span className="text-xs text-slate-300">
                I agree to the <a href="#terms" onClick={(e) => e.preventDefault()} className="text-[#39FF14] hover:underline font-medium">Terms & Conditions</a> and <a href="#privacy" onClick={(e) => e.preventDefault()} className="text-[#00CFFF] hover:underline font-medium">Privacy Policy</a>
              </span>
            </label>
          </div>

          {/* Primary Create Account Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-4 neon-btn-primary text-slate-950 font-bold rounded-[14px] shadow-lg flex items-center justify-center gap-2 text-sm tracking-wide transition-all duration-300 disabled:opacity-75 cursor-pointer mt-2"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Create Account</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-5 flex items-center justify-center">
          <div className="w-full border-t border-white/10" />
          <span className="absolute bg-[#121212] px-3 text-[11px] font-semibold text-slate-400 tracking-wider">
            OR
          </span>
        </div>

        {/* Social Signup */}
        <button
          type="button"
          onClick={handleOpenGoogleNotice}
          className="w-full py-3 px-4 glass-card hover:bg-white/10 border border-white/10 text-white rounded-xl font-medium text-xs flex items-center justify-center gap-3 transition-all duration-200 cursor-pointer group"
        >
          <svg className="w-4 h-4 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.3 8.9 5 12 5z"
            />
            <path
              fill="#4285F4"
              d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
            />
            <path
              fill="#FBBC05"
              d="M5.3 14.7c-.3-.8-.4-1.7-.4-2.7s.1-1.9.4-2.7L1.6 6.4C.6 8.4 0 10.1 0 12s.6 3.6 1.6 5.6l3.7-2.9z"
            />
            <path
              fill="#34A853"
              d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.3-6.7-5.3L1.6 16C3.5 19.8 7.4 23 12 23z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="text-[#39FF14] hover:underline font-semibold ml-1">
            Login
          </Link>
        </div>
      </div>

      {/* Google Authentication Account Chooser Modal */}
      {showGoogleModal && (
        <GoogleAuthModal
          mode="signup"
          onClose={() => setShowGoogleModal(false)}
          onSelectAccount={handleSelectGoogleAccount}
        />
      )}
    </div>
  );
}
