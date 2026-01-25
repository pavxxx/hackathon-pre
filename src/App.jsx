import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Auth
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

// Layout
import DashboardLayout from "./components/common/DashboardLayout";
import ProtectedRoute from "./components/common/ProtectedRoute";

// Donor pages
import Overview from "./pages/donor/Overview";
import DonateFood from "./pages/donor/DonateFood";
import MyDonations from "./pages/donor/MyDonations";
import Impact from "./pages/donor/Impact";

// Recipient
const RecipientDashboard = () => (
  <h1 className="text-2xl font-bold">Recipient Dashboard</h1>
);

// Volunteer
const VolunteerDashboard = () => (
  <h1 className="text-2xl font-bold">Volunteer Tasks</h1>
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* DONOR */}
        <Route element={<ProtectedRoute allowedRole="DONOR" />}>
          <Route path="/donor" element={<DashboardLayout />}>
            <Route index element={<Overview />} />
            <Route path="donate" element={<DonateFood />} />
            <Route path="donations" element={<MyDonations />} />
            <Route path="impact" element={<Impact />} />
          </Route>
        </Route>

        {/* RECIPIENT */}
        <Route element={<ProtectedRoute allowedRole="RECIPIENT" />}>
          <Route path="/recipient" element={<DashboardLayout />}>
            <Route index element={<RecipientDashboard />} />
          </Route>
        </Route>

        {/* VOLUNTEER */}
        <Route element={<ProtectedRoute allowedRole="VOLUNTEER" />}>
          <Route path="/volunteer" element={<DashboardLayout />}>
            <Route index element={<VolunteerDashboard />} />
          </Route>
        </Route>

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
