import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import FindPlayers from "./pages/FindPlayers";
import Matches from "./pages/Matches";
import Community from "./pages/Community";
import CommunityView from "./pages/CommunityView";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Messages from "./pages/Messages";
import EmailAuth from "./pages/EmailAuth";
import OtpVerification from "./pages/OtpVerification";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/find-players" element={<FindPlayers />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/community" element={<Community />} />
          <Route path="/community-view" element={<CommunityView />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/email-auth" element={<EmailAuth />} />
          <Route path="/otp-verification" element={<OtpVerification />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          {/* REMOVED: <Route path="/notifications" element={<Notifications />} /> */}
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="/community-availability" element={<CommunityAvailability />} /> */}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);
export default App;
