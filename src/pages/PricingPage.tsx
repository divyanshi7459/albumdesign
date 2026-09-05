import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Check,
  Sparkles,
  ShieldCheck,
  Zap,
  HelpCircle,
  Printer,
  Share2,
  Layers,
  ArrowRight,
} from "lucide-react";
import { Navbar } from "../components/Website/Navbar";
import { Footer } from "../components/Website/Footer";

export const PricingPage: React.FC = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");

  const plans = [
    {
      name: "Freelancer",
      badge: "For Solo Photographers",
      priceMonthly: "₹1,299",
      priceAnnual: "₹999",
      usdMonthly: "$24",
      usdAnnual: "$19",
      desc: "Perfect for independent photographers and freelance album designers.",
      features: [
        "Unlimited AI layout generations",
        "Full 300 DPI uncompressed PNG exports",
        "Up to 15 active wedding projects",
        "All 25+ layout archetypes & crease protection",
        "Complete Indian vector motif library",
        "Standard email support",
      ],
      popular: false,
      cta: "Start Freelancer Plan",
    },
    {
      name: "Studio Pro",
      badge: "Most Popular for Studios",
      priceMonthly: "₹3,199",
      priceAnnual: "₹2,499",
      usdMonthly: "$59",
      usdAnnual: "$49",
      desc: "Designed for busy wedding photography studios delivering 30+ albums per season.",
      features: [
        "Everything in Freelancer, plus:",
        "Unlimited active wedding projects",
        "Client Proofing Portal with comment pins",
        "Realistic 3D Album Flipbook simulation",
        "Photoshop JSX layout script export",
        "Full Album Storybook Batch Generator",
        "Custom studio branding on client portals",
        "Priority 300 DPI rendering engine",
      ],
      popular: true,
      cta: "Start Studio Pro Trial",
    },
    {
      name: "Print Lab / Enterprise",
      badge: "For Commercial Labs & Teams",
      priceMonthly: "₹8,999",
      priceAnnual: "₹6,999",
      usdMonthly: "$159",
      usdAnnual: "$129",
      desc: "Dedicated infrastructure for photo labs, high-volume franchises, and multi-designer teams.",
      features: [
        "Everything in Studio Pro, plus:",
        "Up to 10 team seats & role management",
        "Direct Lab RIP & Hotfolder integration",
        "Custom ICC color profiles & CMYK curves",
        "Custom Indian motif and border ingestion",
        "Dedicated account manager & SLA",
        "Automated lab batch PDF/TIFF generation",
      ],
      popular: false,
      cta: "Contact Enterprise Sales",
    },
  ];

  const faqs = [
    {
      q: "Are exports strictly 300 DPI?",
      a: "Yes. For a standard 12 × 24 inch panoramic spread, our engine outputs an uncompressed 7200 × 3600 pixel file at 300 DPI without pixel interpolation, meeting the highest specifications of Canvera, Millers, and global labs.",
    },
    {
      q: "How does the Client Proofing link work?",
      a: "With one click, you generate a secure private link. Your client couple can view the album on their phone or desktop, flip through pages, leave feedback pins on specific photos, and click 'Approve Spread'. They never need to register an account.",
    },
    {
      q: "Can I export to Adobe Photoshop?",
      a: "Yes! In Studio Pro and Enterprise plans, you can export a Photoshop JSX layout script. Running it in Photoshop recreates the canvas layers, frames, margins, and guides automatically as native PSD layers.",
    },
    {
      q: "Can I use my own photos in the layouts?",
      a: "Absolutely. You upload your client's high-resolution wedding photos into the studio library and drag-and-drop them into any photo placeholder with live cropping and positioning.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0d0e12] text-zinc-100 flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      <Navbar />

      {/* Header */}
      <section className="py-20 bg-gradient-to-b from-[#141620] via-[#0f1016] to-[#0d0e12] border-b border-white/5 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Commercial Studio Pricing</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            Predictable Pricing for{" "}
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600 bg-clip-text text-transparent">
              Growing Studios
            </span>
          </h1>

          <p className="text-zinc-300 text-base max-w-2xl mx-auto leading-relaxed">
            Design, review, and export print-ready Indian wedding albums without per-export fees or hidden watermarks.
          </p>

          {/* Billing Switch */}
          <div className="pt-6 flex items-center justify-center gap-3">
            <span
              className={`text-xs font-medium cursor-pointer ${
                billingCycle === "monthly" ? "text-white font-bold" : "text-zinc-400"
              }`}
              onClick={() => setBillingCycle("monthly")}
            >
              Monthly Billing
            </span>
            <button
              onClick={() =>
                setBillingCycle(billingCycle === "monthly" ? "annual" : "monthly")
              }
              className="w-12 h-6 rounded-full bg-[#202330] p-1 border border-white/10 relative transition-colors focus:outline-none"
              aria-label="Toggle Billing Cycle"
            >
              <div
                className={`w-4 h-4 rounded-full bg-amber-400 transition-transform ${
                  billingCycle === "annual" ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
            <div className="flex items-center gap-1.5">
              <span
                className={`text-xs font-medium cursor-pointer ${
                  billingCycle === "annual" ? "text-white font-bold" : "text-zinc-400"
                }`}
                onClick={() => setBillingCycle("annual")}
              >
                Annual Billing
              </span>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Save 20%
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {plans.map((p) => {
            const price =
              billingCycle === "annual" ? p.priceAnnual : p.priceMonthly;
            return (
              <div
                key={p.name}
                className={`rounded-3xl p-8 flex flex-col justify-between relative transition-all duration-300 ${
                  p.popular
                    ? "bg-[#161824] border-2 border-amber-500/80 shadow-[0_0_40px_rgba(217,119,6,0.15)] lg:-translate-y-3"
                    : "bg-[#12141c] border border-white/10 hover:border-white/20"
                }`}
              >
                {p.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 text-black font-bold text-[10px] uppercase tracking-wider shadow-md">
                    Most Popular
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-semibold text-amber-400 tracking-wider uppercase">
                      {p.badge}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-white mt-1">
                      {p.name}
                    </h3>
                    <p className="text-zinc-400 text-xs mt-2 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white font-serif">
                      {price}
                    </span>
                    <span className="text-xs text-zinc-400">/ month</span>
                    {billingCycle === "annual" && (
                      <span className="text-[11px] text-zinc-500 ml-2">
                        (billed annually)
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => navigate("/studio")}
                    className={`w-full py-3.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      p.popular
                        ? "bg-gradient-to-r from-amber-400 to-amber-600 text-black hover:from-amber-300 hover:to-amber-500 shadow-lg shadow-amber-500/20"
                        : "bg-white/10 hover:bg-white/15 text-white"
                    }`}
                  >
                    <span>{p.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="pt-6 border-t border-white/10 space-y-3">
                    <div className="text-xs font-semibold text-zinc-300">
                      Included in this plan:
                    </div>
                    {p.features.map((feat, fIdx) => (
                      <div
                        key={fIdx}
                        className="flex items-start gap-2.5 text-xs text-zinc-300"
                      >
                        <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[#0f1016] border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 space-y-2">
            <h2 className="font-serif text-3xl font-bold text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-zinc-400 text-xs">
              Everything you need to know about formats, lab delivery, and printing rights.
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((f, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#14161f] border border-white/10 space-y-2"
              >
                <h3 className="font-serif font-bold text-base text-white flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{f.q}</span>
                </h3>
                <p className="text-zinc-300 text-xs leading-relaxed pl-6">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
