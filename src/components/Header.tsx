import React from 'react';
import { Zap, Flame, RotateCcw, Sparkles, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  onReset: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onReset, theme, onToggleTheme }) => {
  return (
    <header className="border-b border-white/10 dark:border-white/10 theme-light:border-slate-200 bg-slate-950/70 theme-light:bg-white/80 backdrop-blur-md sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo & Title */}
        <div className="flex items-center space-x-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-sky-500 to-amber-500 p-[1px] shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-slate-950 theme-light:bg-slate-900 rounded-[11px] flex items-center justify-center space-x-0.5">
              <Zap className="w-5 h-5 text-cyan-400 fill-cyan-400/20" />
              <Flame className="w-4 h-4 text-amber-400 -ml-1 fill-amber-400/20" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-display font-extrabold text-xl tracking-tight text-slate-900 theme-dark:text-white">
                Volt<span className="text-cyan-500 theme-dark:text-cyan-400">vs</span>Gas
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 theme-dark:text-cyan-300 border border-cyan-500/20">
                5-Yr Advisor
              </span>
            </div>
            <p className="text-xs text-slate-500 theme-dark:text-slate-400 hidden sm:block">
              EV vs. Internal Combustion Financial & Sustainability Calculator
            </p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="hidden md:flex items-center space-x-1 text-xs text-slate-600 theme-dark:text-slate-400 glass-pill px-3 py-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 mr-1" />
            <span>Real-time Engine</span>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 theme-dark:bg-slate-800/80 theme-dark:hover:bg-slate-700 text-slate-800 theme-dark:text-slate-200 text-xs font-medium border border-slate-300 theme-dark:border-white/10 transition"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-sky-600" />
                <span className="hidden sm:inline">Dark Mode</span>
              </>
            )}
          </button>

          {/* Reset Button */}
          <button
            onClick={onReset}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 theme-dark:bg-slate-800/80 theme-dark:hover:bg-slate-700 text-slate-800 theme-dark:text-slate-200 text-xs font-medium border border-slate-300 theme-dark:border-white/10 transition"
            title="Reset to default values"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Defaults</span>
          </button>
        </div>

      </div>
    </header>
  );
};
