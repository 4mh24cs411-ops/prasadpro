import React, { useState } from 'react';
import { X, Camera, ShieldAlert, ChevronUp, ChevronDown, UserPlus, Settings, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

export const REAL_GOOGLE_ACCOUNTS = [
  {
    id: 'g-main',
    name: 'Prasad Official',
    email: 'prasadparm5@gmail.com',
    initial: 'P',
    color: 'bg-sky-600',
    type: 'initial',
    isPrimary: true
  },
  {
    id: 'g-1',
    name: 'Prasad Prasad',
    email: 'prasadpaddehuli2004@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200',
    type: 'photo'
  },
  {
    id: 'g-2',
    name: 'Jss Polytechnic',
    email: 'polytechnicjss6@gmail.com',
    initial: 'J',
    color: 'bg-amber-600',
    type: 'initial'
  },
  {
    id: 'g-3',
    name: 'fsd project',
    email: 'projectfsd69@gmail.com',
    initial: 'f',
    color: 'bg-teal-600',
    type: 'initial'
  },
  {
    id: 'g-4',
    name: 'Anusha A. M',
    email: 'anushaam359@gmail.com',
    initial: 'A',
    color: 'bg-blue-600',
    type: 'initial'
  },
  {
    id: 'g-5',
    name: 'Rakshitha A. M',
    email: 'rakshithaam900@gmail.com',
    initial: 'R',
    color: 'bg-emerald-600',
    type: 'initial'
  },
  {
    id: 'g-6',
    name: 'Nandu Nanndi',
    email: 'nandunanndi@gmail.com',
    initial: 'N',
    color: 'bg-slate-600',
    type: 'initial'
  },
  {
    id: 'g-7',
    name: 'Prasad Prasad',
    email: '4mh24cs411@gmail.com',
    initial: 'P',
    color: 'bg-purple-600',
    type: 'initial'
  },
  {
    id: 'g-8',
    name: 'Prasad M',
    email: '4mh24cs411a@gmail.com',
    initial: 'P',
    color: 'bg-cyan-600',
    type: 'initial'
  }
];

export default function GoogleAuthModal({ onClose, onSelectAccount, mode = 'login' }) {
  const [activeAccount, setActiveAccount] = useState(REAL_GOOGLE_ACCOUNTS[0]);
  const [isAccountsExpanded, setIsAccountsExpanded] = useState(true);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customEmail, setCustomEmail] = useState('');
  const [customName, setCustomName] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authStep, setAuthStep] = useState('');

  const handleAccountSelect = (acc) => {
    setActiveAccount(acc);
    setIsAuthenticating(true);
    setAuthStep('Connecting to Google Account Services...');

    setTimeout(() => {
      setAuthStep('Authenticating OAuth 2.0 Token...');
    }, 400);

    setTimeout(() => {
      setAuthStep('Synchronizing profile with FitGen AI Pro...');
    }, 800);

    setTimeout(() => {
      onSelectAccount({
        name: acc.name,
        email: acc.email,
        avatar: acc.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(acc.name)}&background=0288D1&color=fff`
      });
    }, 1200);
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customEmail.trim()) return;

    const customAcc = {
      id: `g-custom-${Date.now()}`,
      name: customName.trim() || customEmail.split('@')[0],
      email: customEmail.trim().toLowerCase(),
      initial: (customName.trim() || customEmail)[0].toUpperCase(),
      color: 'bg-[#0288D1]',
      type: 'initial'
    };

    handleAccountSelect(customAcc);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#1C1B20] text-slate-100 rounded-[28px] border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header Bar */}
        <div className="px-5 py-3.5 flex items-center justify-between border-b border-white/5 bg-[#1C1B20] sticky top-0 z-20">
          <span className="text-xs text-slate-300 font-medium tracking-wide truncate max-w-[280px]">
            {activeAccount.email}
          </span>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body Container */}
        <div className="overflow-y-auto flex-1 p-5 space-y-4">
          
          {/* Authentic OAuth Loading Spinner State */}
          {isAuthenticating ? (
            <div className="py-12 flex flex-col items-center justify-center space-y-4 text-center animate-fadeIn">
              <div className="relative w-16 h-16 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-sky-500/20 border-t-sky-400 animate-spin" />
                {activeAccount.type === 'photo' ? (
                  <img
                    src={activeAccount.avatar}
                    alt={activeAccount.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className={`w-12 h-12 rounded-full ${activeAccount.color} flex items-center justify-center text-lg font-bold text-white`}>
                    {activeAccount.initial}
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-base font-bold text-white">{activeAccount.name}</h3>
                <p className="text-xs text-sky-400 font-semibold mt-1 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> {authStep}
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Active Account Big Header Circle */}
              <div className="flex flex-col items-center text-center space-y-2 py-2">
                <div className="relative cursor-pointer group">
                  {activeAccount.type === 'photo' ? (
                    <img
                      src={activeAccount.avatar}
                      alt={activeAccount.name}
                      className="w-20 h-20 rounded-full object-cover border-2 border-white/20 shadow-xl"
                    />
                  ) : (
                    <div className={`w-20 h-20 rounded-full ${activeAccount.color || 'bg-[#0288D1]'} flex items-center justify-center text-3xl font-bold text-white shadow-xl border-2 border-white/20`}>
                      {activeAccount.initial || 'P'}
                    </div>
                  )}

                  {/* Camera Badge Icon */}
                  <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#2C2C35] border border-white/30 flex items-center justify-center text-slate-200 shadow-md">
                    <Camera className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-white">Hi, {activeAccount.name}!</h2>
                  <p className="text-xs text-slate-400 mt-0.5">{activeAccount.email}</p>
                </div>

                {/* Manage Account Pill Button */}
                <button
                  type="button"
                  onClick={() => handleAccountSelect(activeAccount)}
                  className="mt-1 px-5 py-1.5 rounded-full border border-slate-600 text-xs font-semibold text-sky-300 hover:bg-white/10 transition-colors"
                >
                  Manage your Google Account
                </button>
              </div>

              {/* Recommended Actions Card */}
              <div className="p-3.5 rounded-2xl bg-[#121116] border border-white/5 flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <span className="text-xs font-medium text-slate-200">Recommended actions</span>
              </div>

              {/* Switch Account Accordion Header */}
              <div className="pt-2 border-t border-white/5 space-y-2">
                <button
                  type="button"
                  onClick={() => setIsAccountsExpanded(!isAccountsExpanded)}
                  className="w-full py-2 flex items-center justify-between text-xs font-medium text-slate-300 hover:text-white"
                >
                  <span>Switch account</span>
                  {isAccountsExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </button>

                {/* Account List */}
                {isAccountsExpanded && (
                  <div className="space-y-1 animate-fadeIn max-h-60 overflow-y-auto pr-1">
                    {REAL_GOOGLE_ACCOUNTS.map((acc) => (
                      <button
                        key={acc.id}
                        onClick={() => handleAccountSelect(acc)}
                        className={`w-full p-2.5 rounded-xl transition-all flex items-center justify-between group text-left ${
                          activeAccount.email === acc.email
                            ? 'bg-sky-500/10 border border-sky-500/30'
                            : 'hover:bg-white/5 border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {acc.type === 'photo' ? (
                            <img
                              src={acc.avatar}
                              alt={acc.name}
                              className="w-9 h-9 rounded-full object-cover shrink-0"
                            />
                          ) : (
                            <div className={`w-9 h-9 rounded-full ${acc.color} text-white font-bold flex items-center justify-center text-sm shrink-0 shadow-md`}>
                              {acc.initial}
                            </div>
                          )}

                          <div className="min-w-0">
                            <h4 className="text-xs font-semibold text-white truncate group-hover:text-sky-300">
                              {acc.name}
                            </h4>
                            <p className="text-[11px] text-slate-400 truncate">{acc.email}</p>
                          </div>
                        </div>

                        {activeAccount.email === acc.email && (
                          <span className="w-2 h-2 rounded-full bg-sky-400 shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Add Another Account Form */}
              {showCustomInput ? (
                <form onSubmit={handleCustomSubmit} className="pt-2 border-t border-white/5 space-y-2.5 animate-fadeIn">
                  <p className="text-xs font-semibold text-slate-200">Add custom Google email:</p>
                  <input
                    type="email"
                    required
                    value={customEmail}
                    onChange={(e) => setCustomEmail(e.target.value)}
                    placeholder="your.google.account@gmail.com"
                    className="w-full px-3.5 py-2 bg-[#121116] border border-slate-700 text-xs text-white rounded-xl focus:outline-none focus:border-sky-400"
                  />
                  <input
                    type="text"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder="Your Name (Optional)"
                    className="w-full px-3.5 py-2 bg-[#121116] border border-slate-700 text-xs text-white rounded-xl focus:outline-none focus:border-sky-400"
                  />
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowCustomInput(false)}
                      className="py-1.5 px-3 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-1.5 px-3 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1 transition-all"
                    >
                      <span>Sign In</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              ) : (
                <div className="pt-2 border-t border-white/5 space-y-1">
                  <button
                    type="button"
                    onClick={() => setShowCustomInput(true)}
                    className="w-full py-2.5 px-3 rounded-xl hover:bg-white/5 text-xs font-medium text-slate-300 hover:text-white transition-all flex items-center gap-3 text-left"
                  >
                    <div className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center shrink-0">
                      <UserPlus className="w-4 h-4" />
                    </div>
                    <span>Add another account</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleAccountSelect(activeAccount)}
                    className="w-full py-2.5 px-3 rounded-xl hover:bg-white/5 text-xs font-medium text-slate-300 hover:text-white transition-all flex items-center gap-3 text-left"
                  >
                    <div className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center shrink-0">
                      <Settings className="w-4 h-4" />
                    </div>
                    <span>Manage accounts on this device</span>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
