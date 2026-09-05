import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, Sparkles, ArrowRight, ShieldCheck, UserCheck, Lock, Mail } from "lucide-react";
import { useAlbumStore } from "../store/useAlbumStore";
import { Navbar } from "../components/Website/Navbar";
import { Footer } from "../components/Website/Footer";

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, demoLogin } = useAlbumStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    const name = email.split("@")[0] || "Wedding Designer";
    login(name, email, "designer");
    navigate("/dashboard");
  };

  const handleDemoAccess = () => {
    demoLogin();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#0d0e12] text-zinc-100 flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      <Navbar />

      <div className="flex-1 flex items-center justify-center p-4 py-16 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md bg-[#13151f] border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center mx-auto border border-amber-300/40 shadow-lg shadow-amber-500/20">
              <BookOpen className="w-6 h-6 text-black" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-white">
              Studio Sign In
            </h1>
            <p className="text-zinc-400 text-xs">
              Access your wedding album workspaces & client proofing portals
            </p>
          </div>

          {/* Quick Demo Access Button */}
          <button
            onClick={handleDemoAccess}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-bold text-xs shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01]"
          >
            <Sparkles className="w-4 h-4 fill-black" />
            <span>1-Click Studio Demo Access</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-3 text-xs text-zinc-500">
            <div className="h-px bg-white/10 flex-1" />
            <span>or sign in with email</span>
            <div className="h-px bg-white/10 flex-1" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1 text-left">
              <label className="text-xs font-semibold text-zinc-300">
                Studio Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  placeholder="designer@weddings.studio"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#0b0c11] border border-white/10 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="space-y-1 text-left">
              <label className="text-xs font-semibold text-zinc-300">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#0b0c11] border border-white/10 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Sign In to Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="text-center pt-2">
            <span className="text-xs text-zinc-400">
              New to Album Design Studio?{" "}
              <Link to="/signup" className="text-amber-400 hover:text-amber-300 font-semibold">
                Create Studio Account
              </Link>
            </span>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
