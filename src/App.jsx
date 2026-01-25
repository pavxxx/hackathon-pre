import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Auth
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";


// Layout
import DashboardLayout from "./components/common/DashboardLayout";

// Donor pages
import Overview from "./pages/donor/Overview";
import DonateFood from "./pages/donor/DonateFood";
import MyDonations from "./pages/donor/MyDonations";
import Impact from "./pages/donor/Impact";

// Recipient (placeholder for now)
const RecipientDashboard = () => (
  <h1 className="text-2xl font-bold">Recipient Dashboard</h1>
);

// Volunteer (placeholder for now)
const VolunteerDashboard = () => (
  <h1 className="text-2xl font-bold">Volunteer Tasks</h1>
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* ROOT */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />



        {/* AUTH */}
        <Route path="/login" element={<Login />} />

        {/* DONOR ROUTES */}
        <Route path="/donor" element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="donate" element={<DonateFood />} />
          <Route path="donations" element={<MyDonations />} />
          <Route path="impact" element={<Impact />} />
        </Route>

        {/* RECIPIENT ROUTES */}
        <Route path="/recipient" element={<DashboardLayout />}>
          <Route index element={<RecipientDashboard />} />
        </Route>

        {/* VOLUNTEER ROUTES */}
        <Route path="/volunteer" element={<DashboardLayout />}>
          <Route index element={<VolunteerDashboard />} />
        </Route>

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
