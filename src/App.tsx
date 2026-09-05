import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { FeaturesPage } from "./pages/FeaturesPage";
import { TemplatesPage } from "./pages/TemplatesPage";
import { PricingPage } from "./pages/PricingPage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { DashboardPage } from "./pages/DashboardPage";
import { StudioPage } from "./pages/StudioPage";
import { ProofingPortalPage } from "./pages/ProofingPortalPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Website Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/templates" element={<TemplatesPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Web App / Studio Workspace Routes */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/studio" element={<StudioPage />} />
        <Route path="/proof/:id" element={<ProofingPortalPage />} />
        <Route path="/proof" element={<ProofingPortalPage />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
