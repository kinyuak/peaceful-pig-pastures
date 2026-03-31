import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/DashboardLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import InventoryManagement from "./pages/InventoryManagement";
import StaffManagement from "./pages/StaffManagement";
import SalesManagement from "./pages/SalesManagement";
import Store from "./pages/Store";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient();

function ProtectedDashboard({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <DashboardLayout>{children}</DashboardLayout>
    </ProtectedRoute>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Protected routes with sidebar */}
            <Route path="/dashboard" element={<ProtectedDashboard><Dashboard /></ProtectedDashboard>} />
            <Route path="/pigs" element={<ProtectedDashboard><PigManagementPage /></ProtectedDashboard>} />
            <Route path="/calendar" element={<ProtectedDashboard><CalendarPage /></ProtectedDashboard>} />
            <Route path="/inventory" element={<ProtectedDashboard><InventoryManagement /></ProtectedDashboard>} />
            <Route path="/staff" element={<ProtectedDashboard><StaffManagement /></ProtectedDashboard>} />
            <Route path="/sales" element={<ProtectedDashboard><SalesManagement /></ProtectedDashboard>} />
            <Route path="/store" element={<ProtectedDashboard><Store /></ProtectedDashboard>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

// Inline page wrappers for components that need it
function PigManagementPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-6">Animal Management</h2>
      <PigManagementContent />
    </div>
  );
}

function CalendarPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-6">Farm Calendar</h2>
      <CalendarContent />
    </div>
  );
}

// Lazy imports for content components
import PigManagement from "@/components/PigManagement";
import FarmCalendar from "@/components/FarmCalendar";

function PigManagementContent() {
  return <PigManagement />;
}

function CalendarContent() {
  return <FarmCalendar />;
}

export default App;
