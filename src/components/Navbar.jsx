import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Menu,
  X,
  Search,
  Bell,
  Scan,
  ShoppingBag,
  Sparkles,
  User,
  Droplets,
  Flame,
  LayoutDashboard,
  CalendarDays,
  UtensilsCrossed,
  LineChart,
  Award,
  LogOut,
  Palette
} from 'lucide-react';

export default function Navbar() {
  const { userProfile, groceryList, dailyLog, logout, currentTheme, changeTheme } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const uncompletedGroceryCount = groceryList.filter((g) => !g.completed).length;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/recipes?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMenuOpen(false);
    }
  };

  const handleLogout = () => {
    setIsMenuOpen(false);
    logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/meal-planner', label: 'Meal Planner', icon: CalendarDays, badge: 'AI' },
    { path: '/ingredient-scanner', label: 'Ingredient Scanner', icon: Scan, badge: 'OCR' },
    { path: '/recipes', label: 'Recipe Generator', icon: UtensilsCrossed },
    {
      path: '/grocery',
      label: 'Grocery List',
      icon: ShoppingBag,
      count: uncompletedGroceryCount
    },
    { path: '/tracker', label: 'Nutrition Tracker', icon: LineChart },
    { path: '/profile', label: 'Profile', icon: User }
  ];

  const notifications = [
    { id: 1, title: 'Water Intake Reminder', text: 'You need 750ml more water to reach your goal.', time: '10m ago', icon: Droplets, color: 'text-blue-400' },
    { id: 2, title: 'AI Meal Suggestion', text: 'High-protein dinner idea ready based on your pantry.', time: '1h ago', icon: Sparkles, color: 'text-emerald-400' },
    { id: 3, title: 'Streak Achievement', text: 'You hit a 7-day logged meal streak!', time: '3h ago', icon: Flame, color: 'text-amber-400' }
  ];

  return (
    <>
      <header className="sticky top-0 z-30 bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl">
        {/* Top Header Row */}
        <div className="px-4 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Left: Hamburger Menu Trigger & Brand Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-[#39FF14]/40 text-slate-300 hover:text-[#39FF14] transition-all flex items-center justify-center group shadow-sm cursor-pointer"
              title="Open Navigation Menu"
            >
              <Menu className="w-5 h-5 group-hover:scale-110 transition-transform text-[#39FF14]" />
            </button>

            <NavLink to="/dashboard" className="flex items-center gap-2.5 group">
              <div className="relative group transition-transform duration-300 group-hover:scale-105">
                <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-[#39FF14] to-[#00CFFF] opacity-75 blur-sm group-hover:opacity-100 transition duration-300" />
                <img
                  src="/assets/fitgen_logo.png"
                  alt="FitGen Logo"
                  className="relative w-9 h-9 rounded-xl object-cover border border-white/20 shadow-lg bg-[#0A0A0A]"
                />
              </div>
              <div>
                <span className="text-lg font-bold font-heading bg-gradient-to-r from-white via-slate-100 to-[#39FF14] bg-clip-text text-transparent">
                  FitGen <span className="text-[#39FF14] text-[10px] px-1.5 py-0.5 rounded bg-[#39FF14]/15 border border-[#39FF14]/30 font-extrabold">PRO</span>
                </span>
                <p className="text-[9px] text-slate-400 font-medium tracking-wide">SMART NUTRITION</p>
              </div>
            </NavLink>
          </div>

          {/* Global Search Bar */}
          <form onSubmit={handleSearchSubmit} className="relative hidden md:block w-72 lg:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search recipes, ingredients, macros..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-900/90 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#39FF14] focus:ring-1 focus:ring-[#39FF14] transition-all"
            />
          </form>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            {/* Quick AI Scanner Shortcut */}
            <NavLink
              to="/ingredient-scanner"
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#39FF14]/10 border border-[#39FF14]/30 text-[#39FF14] hover:bg-[#39FF14]/20 text-xs font-semibold transition-all group"
            >
              <Scan className="w-3.5 h-3.5 text-[#39FF14] group-hover:scale-110 transition-transform" />
              <span>AI Scanner</span>
            </NavLink>

            {/* Grocery List Shortcut */}
            <NavLink
              to="/grocery"
              className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
              title="Grocery List"
            >
              <ShoppingBag className="w-5 h-5" />
              {uncompletedGroceryCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#39FF14] text-slate-950 font-bold text-[10px] flex items-center justify-center border-2 border-slate-950">
                  {uncompletedGroceryCount}
                </span>
              )}
            </NavLink>

            {/* Theme Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowThemeDropdown(!showThemeDropdown)}
                className="p-2 rounded-xl text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                title="Change Project Theme Color"
              >
                <Palette className="w-4 h-4 text-emerald-400" />
                <span className="hidden md:inline text-xs font-bold capitalize">{currentTheme}</span>
              </button>

              {showThemeDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-2 z-50 space-y-1 animate-in fade-in duration-200">
                  <div className="px-2.5 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Select Theme Color
                  </div>
                  {[
                    { name: 'emerald', label: '❇️ Cyber Emerald', color: '#39FF14' },
                    { name: 'cyberpunk', label: '🟣 Neon Cyberpunk', color: '#FF007F' },
                    { name: 'sunset', label: '🌅 Golden Flame', color: '#FFB800' },
                    { name: 'ocean', label: '🌊 Sapphire Ocean', color: '#00F2FE' },
                    { name: 'stealth', label: '🖤 Stealth Onyx', color: '#F8FAFC' }
                  ].map((thm) => (
                    <button
                      key={thm.name}
                      onClick={() => {
                        changeTheme(thm.name);
                        setShowThemeDropdown(false);
                      }}
                      className={`w-full px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                        currentTheme === thm.name
                          ? 'bg-slate-800 text-white border border-slate-700 shadow-sm'
                          : 'text-slate-400 hover:text-white hover:bg-slate-950'
                      }`}
                    >
                      <span>{thm.label}</span>
                      <span className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: thm.color }} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* User Profile Pill */}
            <NavLink
              to="/profile"
              className="flex items-center gap-3 p-1 pl-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors group"
            >
              <div className="hidden sm:block text-right">
                <p className="text-xs font-semibold text-slate-200 group-hover:text-[#39FF14] transition-colors">
                  {userProfile.name}
                </p>
                <p className="text-[10px] text-[#39FF14] font-medium">
                  {userProfile.goal}
                </p>
              </div>
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                className="w-8 h-8 rounded-lg object-cover border border-[#39FF14]/40"
              />
            </NavLink>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/15 border border-rose-500/30 hover:bg-rose-500/25 text-rose-300 text-xs font-bold transition-all cursor-pointer"
              title="Logout from FitGen"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hamburger Menu Overlay Drawer */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity duration-300"
            onClick={() => setIsMenuOpen(false)}
          />

          <div className="relative w-80 max-w-full bg-[#0A0A0A] border-r border-white/10 shadow-2xl p-6 flex flex-col justify-between z-50 animate-in slide-in-from-left duration-300">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#39FF14]/15 border border-[#39FF14]/40 text-[#39FF14] flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white font-heading">FitGen PRO</h2>
                    <p className="text-[10px] text-slate-400">Navigation Menu</p>
                  </div>
                </div>

                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-1.5 mt-4">
                <div className="px-3 py-1.5 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                  Menu Links
                </div>

                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 group ${
                          isActive
                            ? 'bg-gradient-to-r from-[#39FF14]/20 to-[#00CFFF]/10 text-[#39FF14] border border-[#39FF14]/40'
                            : 'text-slate-300 hover:text-white hover:bg-slate-800/80 border border-transparent'
                        }`
                      }
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4 text-[#39FF14] group-hover:scale-110 transition-transform" />
                        <span>{item.label}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {item.badge && (
                          <span className="text-[10px] px-2 py-0.5 rounded-md font-bold bg-[#39FF14]/15 text-[#39FF14] border border-[#39FF14]/30">
                            {item.badge}
                          </span>
                        )}
                        {item.count !== undefined && item.count > 0 && (
                          <span className="w-5 h-5 rounded-full text-[11px] font-bold bg-[#00CFFF] text-slate-950 flex items-center justify-center">
                            {item.count}
                          </span>
                        )}
                      </div>
                    </NavLink>
                  );
                })}
              </nav>

              {/* Mobile Theme Selector */}
              <div className="pt-3 border-t border-white/10 space-y-2">
                <div className="text-[10px] font-bold tracking-wider text-slate-400 uppercase flex items-center gap-1">
                  <Palette className="w-3.5 h-3.5 text-emerald-400" /> Project Theme Color
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { name: 'emerald', label: '❇️ Emerald' },
                    { name: 'cyberpunk', label: '🟣 Cyberpunk' },
                    { name: 'sunset', label: '🌅 Sunset Gold' },
                    { name: 'ocean', label: '🌊 Ocean' },
                    { name: 'stealth', label: '🖤 Stealth' }
                  ].map((thm) => (
                    <button
                      key={thm.name}
                      onClick={() => changeTheme(thm.name)}
                      className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition-all text-center border cursor-pointer ${
                        currentTheme === thm.name
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-sm'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      {thm.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Logout Footer Button in Drawer */}
            <div className="pt-3 border-t border-white/10 space-y-2.5">
              <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-slate-900 border border-slate-800">
                <img
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  className="w-10 h-10 rounded-xl object-cover border border-[#39FF14]/50"
                />
                <div className="flex-1 truncate">
                  <p className="text-xs font-bold text-slate-200 truncate">{userProfile.name}</p>
                  <p className="text-[10px] text-slate-400 truncate">{userProfile.email}</p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="w-full py-2.5 px-4 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
              >
                <LogOut className="w-4 h-4" />
                <span>Complete Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
