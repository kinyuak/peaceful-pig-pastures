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
import PigManagement from "@/components/PigManagement";
import FarmCalendar from "@/components/FarmCalendar";
import CropsManagement from "./pages/CropsManagement";
import LabourServices from "./pages/LabourServices";
import AIAssistant from "./pages/AIAssistant";
import SettingsPage from "./pages/Settings";
import AnimalsOverview from "./pages/AnimalsOverview";
import CattleManagement from "./pages/CattleManagement";
import GoatManagement from "./pages/GoatManagement";
import SheepManagement from "./pages/SheepManagement";
import PoultryManagement from "./pages/PoultryManagement";
import AdminUsers from "./pages/admin/Users";
import AdminTrials from "./pages/admin/Trials";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

const queryClient = new QueryClient();

function ProtectedDashboard({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <DashboardLayout>{children}</DashboardLayout>
    </ProtectedRoute>
  );
}

function AdminOnly({ children }: { children: React.ReactNode }) {
  const { role, loading } = useAuth();
  if (loading) return null;
  if (role !== 'admin') return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            <Route path="/dashboard" element={<ProtectedDashboard><Dashboard /></ProtectedDashboard>} />
            <Route path="/animals" element={<ProtectedDashboard><AnimalsOverview /></ProtectedDashboard>} />
            <Route path="/animals/pigs" element={<ProtectedDashboard><div><h2 className="text-2xl font-bold text-foreground mb-6">Pig Management</h2><PigManagement /></div></ProtectedDashboard>} />
            <Route path="/pigs" element={<ProtectedDashboard><div><h2 className="text-2xl font-bold text-foreground mb-6">Pig Management</h2><PigManagement /></div></ProtectedDashboard>} />
            <Route path="/animals/cattle" element={<ProtectedDashboard><CattleManagement /></ProtectedDashboard>} />
            <Route path="/animals/goats" element={<ProtectedDashboard><GoatManagement /></ProtectedDashboard>} />
            <Route path="/animals/sheep" element={<ProtectedDashboard><SheepManagement /></ProtectedDashboard>} />
            <Route path="/animals/poultry" element={<ProtectedDashboard><PoultryManagement /></ProtectedDashboard>} />
            <Route path="/crops" element={<ProtectedDashboard><CropsManagement /></ProtectedDashboard>} />
            <Route path="/calendar" element={<ProtectedDashboard><div><h2 className="text-2xl font-bold text-foreground mb-6">Farm Calendar</h2><FarmCalendar /></div></ProtectedDashboard>} />
            <Route path="/inventory" element={<ProtectedDashboard><InventoryManagement /></ProtectedDashboard>} />
            <Route path="/staff" element={<ProtectedDashboard><StaffManagement /></ProtectedDashboard>} />
            <Route path="/sales" element={<ProtectedDashboard><SalesManagement /></ProtectedDashboard>} />
            <Route path="/store" element={<ProtectedDashboard><Store /></ProtectedDashboard>} />
            <Route path="/labour" element={<ProtectedDashboard><LabourServices /></ProtectedDashboard>} />
            <Route path="/ai-assistant" element={<ProtectedDashboard><AIAssistant /></ProtectedDashboard>} />
            <Route path="/settings" element={<ProtectedDashboard><SettingsPage /></ProtectedDashboard>} />

            <Route path="/admin/users" element={<ProtectedDashboard><AdminOnly><AdminUsers /></AdminOnly></ProtectedDashboard>} />
            <Route path="/admin/trials" element={<ProtectedDashboard><AdminOnly><AdminTrials /></AdminOnly></ProtectedDashboard>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
