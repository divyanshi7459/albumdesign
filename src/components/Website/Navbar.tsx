import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sparkles, Menu, X, ArrowRight, BookOpen, Layers, Layout, Palette, ShieldCheck, User } from "lucide-react";
import { useAlbumStore } from "../../store/useAlbumStore";

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useAlbumStore();

  const navLinks = [
    { name: "Features", path: "/features" },
    { name: "Templates", path: "/templates" },
    { name: "Pricing", path: "/pricing" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0d0e12]/90 backdrop-blur-md border-b border-amber-500/15 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300 border border-amber-300/40">
            <BookOpen className="w-6 h-6 text-black" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-serif font-bold text-xl tracking-tight text-white group-hover:text-amber-300 transition-colors">
                Album Design Studio
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                PRO
              </span>
            </div>
            <span className="text-[11px] text-zinc-400 tracking-wide">
              AI Indian Wedding Album Platform
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-amber-300 ${
                  isActive ? "text-amber-400 font-semibold" : "text-zinc-300"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right CTAs */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                to="/dashboard"
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 border border-white/10 hover:border-white/20 transition-all flex items-center gap-2"
              >
                <User className="w-3.5 h-3.5 text-amber-400" />
                <span>Dashboard</span>
              </Link>
              <Link
                to="/studio"
                className="px-5 py-2.5 text-xs font-bold rounded-lg bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black shadow-lg shadow-amber-500/20 hover:shadow-amber-500/35 transition-all flex items-center gap-2 group cursor-pointer"
              >
                <Sparkles className="w-4 h-4 fill-black group-hover:rotate-12 transition-transform" />
                <span>Open Studio</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-2 text-xs font-semibold text-zinc-300 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/studio"
                className="px-5 py-2.5 text-xs font-bold rounded-lg bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black shadow-lg shadow-amber-500/20 hover:shadow-amber-500/35 transition-all flex items-center gap-2 group cursor-pointer"
              >
                <Sparkles className="w-4 h-4 fill-black group-hover:rotate-12 transition-transform" />
                <span>Start Designing</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            to="/studio"
            className="px-3 py-1.5 text-xs font-bold rounded-lg bg-amber-500 text-black"
          >
            Studio
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#121319] border-b border-white/10 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md text-sm font-medium text-zinc-300 hover:text-amber-300 hover:bg-white/5"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md text-sm font-medium text-zinc-300 hover:bg-white/5"
              >
                Workspace Dashboard
              </Link>
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md text-sm font-medium text-zinc-300 hover:bg-white/5"
              >
                Sign In
              </Link>
              <Link
                to="/studio"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 text-center text-xs font-bold rounded-lg bg-amber-500 text-black shadow-md shadow-amber-500/20"
              >
                Launch Album Studio
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
