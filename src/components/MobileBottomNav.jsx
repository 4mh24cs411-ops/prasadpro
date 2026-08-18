import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CalendarDays, Bot, LineChart, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function MobileBottomNav() {
  const { groceryList } = useApp();
  const uncompletedGroceryCount = groceryList ? groceryList.filter((g) => !g.completed).length : 0;

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/meal-planner', label: 'Planner', icon: CalendarDays },
    { path: '/ingredient-scanner', label: 'FitGen AI', icon: Bot, isHighlight: true },
    { path: '/tracker', label: 'Tracker', icon: LineChart },
    { path: '/profile', label: 'Profile', icon: User }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#0A0A0A]/95 backdrop-blur-xl border-t border-white/10 px-2 py-1.5 flex items-center justify-around shadow-2xl safe-area-pb">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-1 px-2 rounded-xl text-[10px] font-bold transition-all relative ${
                isActive
                  ? 'text-[#06B6D4]'
                  : 'text-slate-400 hover:text-slate-200'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {item.isHighlight ? (
                  <div className={`p-2 rounded-xl transition-all shadow-md ${
                    isActive
                      ? 'bg-[#06B6D4] text-slate-950 scale-105 shadow-[#06B6D4]/30'
                      : 'bg-[#06B6D4]/15 text-[#06B6D4] border border-[#06B6D4]/30'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                ) : (
                  <div className={`p-1 rounded-lg transition-transform ${isActive ? 'scale-110' : ''}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                )}
                <span className={`mt-0.5 tracking-tight ${item.isHighlight ? 'text-[#06B6D4] font-black' : ''}`}>
                  {item.label}
                </span>
                {isActive && !item.isHighlight && (
                  <span className="w-1 h-1 rounded-full bg-[#06B6D4] absolute bottom-0" />
                )}
              </>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
}
