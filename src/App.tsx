import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop, { ScrollRestoration } from "@/components/layout/ScrollToTop";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import MusicLoverDashboard from "./pages/MusicLover/Dashboard";
import MusicianDashboard from "./pages/Musician/Dashboard";
import MusicTeacherDashboard from "./pages/MusicTeacher/Dashboard";
import VenueOwnerDashboard from "./pages/VenueOwner/Dashboard";
import EventOrganizerDashboard from "./pages/EventOrganizer/Dashboard";
import BrandSponsorDashboard from "./pages/BrandSponsor/Dashboard";
import AdminDashboard from "./pages/Admin/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import About from "./pages/About";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import FAQ from "./pages/FAQ";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import Careers from "./pages/Careers";
import CookiePolicy from "./pages/CookiePolicy";
import ConfirmPayment from "./pages/ConfirmPayment";

const queryClient = new QueryClient();

// Pages that should NOT show Navbar/Footer
const STANDALONE_PAGES = ['/login', '/register', '/forgot-password'];

function AppLayout() {
  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollRestoration />
          <InnerApp />
          <ScrollToTop />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

function InnerApp() {
  return (
    <Routes>
      {/* Standalone pages (no navbar/footer) */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/music-lover" element={<MusicLoverDashboard />} />
      <Route path="/musician" element={<MusicianDashboard />} />
      <Route path="/music-teacher" element={<MusicTeacherDashboard />} />
      <Route path="/venue-owner" element={<VenueOwnerDashboard />} />
      <Route path="/event-organizer" element={<EventOrganizerDashboard />} />
      <Route path="/brand-sponsor" element={<BrandSponsorDashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />

      {/* Pages with full layout */}
      <Route path="/*" element={<WithLayout />} />
    </Routes>
  );
}

function WithLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/confirm-payment" element={<ConfirmPayment />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
