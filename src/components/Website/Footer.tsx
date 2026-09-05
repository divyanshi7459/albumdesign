import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, Sparkles, Shield, Printer, Mail, Heart, Github, Twitter, Instagram, Youtube } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#08090c] border-t border-white/10 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center border border-amber-300/40 shadow-md shadow-amber-500/10">
                <BookOpen className="w-5 h-5 text-black" />
              </div>
              <span className="font-serif font-bold text-lg text-white tracking-tight">
                Album Design Studio
              </span>
            </Link>
            <p className="text-zinc-400 text-xs leading-relaxed max-w-sm">
              The premier AI-assisted design platform built exclusively for professional Indian wedding photographers, album designers, and printing labs. Generate print-ready 300 DPI double-spread layouts in minutes.
            </p>
            <div className="flex items-center gap-4 text-zinc-500 pt-2">
              <a href="#" className="hover:text-amber-400 transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-amber-400 transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-amber-400 transition-colors" aria-label="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-amber-400 transition-colors" aria-label="GitHub">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product Column */}
          <div className="space-y-3">
            <h4 className="font-semibold text-zinc-100 uppercase tracking-wider text-[11px]">
              Product
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/studio" className="hover:text-amber-300 transition-colors">
                  Design Studio Editor
                </Link>
              </li>
              <li>
                <Link to="/features" className="hover:text-amber-300 transition-colors">
                  AI Layout Generator
                </Link>
              </li>
              <li>
                <Link to="/templates" className="hover:text-amber-300 transition-colors">
                  Indian Wedding Assets
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-amber-300 transition-colors">
                  Project Workspace
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-amber-300 transition-colors">
                  Pricing Plans
                </Link>
              </li>
            </ul>
          </div>

          {/* Features Column */}
          <div className="space-y-3">
            <h4 className="font-semibold text-zinc-100 uppercase tracking-wider text-[11px]">
              Print & Workflow
            </h4>
            <ul className="space-y-2">
              <li>
                <span className="text-zinc-300 hover:text-amber-300 cursor-pointer">
                  12 × 24" Panoramic Spreads
                </span>
              </li>
              <li>
                <span className="text-zinc-300 hover:text-amber-300 cursor-pointer">
                  300 DPI Export Engine
                </span>
              </li>
              <li>
                <span className="text-zinc-300 hover:text-amber-300 cursor-pointer">
                  Bleed & Safe Area Guides
                </span>
              </li>
              <li>
                <span className="text-zinc-300 hover:text-amber-300 cursor-pointer">
                  Center Crease Protection
                </span>
              </li>
              <li>
                <span className="text-zinc-300 hover:text-amber-300 cursor-pointer">
                  Client Proofing Portal
                </span>
              </li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div className="space-y-3">
            <h4 className="font-semibold text-zinc-100 uppercase tracking-wider text-[11px]">
              Resources & Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/templates" className="hover:text-amber-300 transition-colors">
                  Design Templates
                </Link>
              </li>
              <li>
                <span className="text-zinc-300 hover:text-amber-300 cursor-pointer">
                  Print Lab Standards
                </span>
              </li>
              <li>
                <span className="text-zinc-300 hover:text-amber-300 cursor-pointer">
                  Photoshop JSX Scripts
                </span>
              </li>
              <li>
                <span className="text-zinc-300 hover:text-amber-300 cursor-pointer">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="text-zinc-300 hover:text-amber-300 cursor-pointer">
                  Terms of Service
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} Album Design Studio. Engineered for wedding photographers & studios worldwide.
          </div>
          <div className="flex items-center gap-6">
            <span>No Watermark Guarantee</span>
            <span>•</span>
            <span>Native 300 DPI Uncompressed</span>
            <span>•</span>
            <span>Commercial License</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
