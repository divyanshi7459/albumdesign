import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, Sparkles, ArrowRight, ShieldCheck, UserCheck, Lock, Mail, Building } from "lucide-react";
import { useAlbumStore } from "../store/useAlbumStore";
import { Navbar } from "../components/Website/Navbar";
import { Footer } from "../components/Website/Footer";

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, demoLogin } = useAlbumStore();
  const [name, setName] = useState("");
  const [studioName, setStudioName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"photographer" | "designer" | "studio">("photographer");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;
    login(name, email, role);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#0d0e12] text-zinc-100 flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      <Navbar />

      <div className="flex-1 flex items-center justify-center p-4 py-16 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md bg-[#13151f] border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center mx-auto border border-amber-300/40 shadow-lg shadow-amber-500/20">
              <BookOpen className="w-6 h-6 text-black" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-white">
              Create Studio Account
            </h1>
            <p className="text-zinc-400 text-xs">
              Start designing print-ready Indian wedding albums in minutes
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1 text-left">
              <label className="text-xs font-semibold text-zinc-300">Your Name</label>
              <input
                type="text"
                required
                placeholder="Rohan Mehra"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0c11] border border-white/10 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="space-y-1 text-left">
              <label className="text-xs font-semibold text-zinc-300">Photography Studio Name</label>
              <input
                type="text"
                placeholder="Mehra Wedding Films & Albums"
                value={studioName}
                onChange={(e) => setStudioName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0c11] border border-white/10 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="space-y-1 text-left">
              <label className="text-xs font-semibold text-zinc-300">Studio Email</label>
              <input
                type="email"
                required
                placeholder="rohan@mehrafilms.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0c11] border border-white/10 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="space-y-1 text-left">
              <label className="text-xs font-semibold text-zinc-300">Primary Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0c11] border border-white/10 text-white text-xs focus:outline-none focus:border-amber-400"
              >
                <option value="photographer">Wedding Photographer</option>
                <option value="designer">Album Designer</option>
                <option value="studio">Photography Studio / Agency</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-black font-bold text-xs shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all mt-4"
            >
              <Sparkles className="w-4 h-4 fill-black" />
              <span>Get Started Free</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="text-center pt-2">
            <span className="text-xs text-zinc-400">
              Already have an account?{" "}
              <Link to="/login" className="text-amber-400 hover:text-amber-300 font-semibold">
                Sign In
              </Link>
            </span>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
