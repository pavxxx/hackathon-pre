import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

import DashboardLayout from "./components/common/DashboardLayout";
import ProtectedRoute from "./components/common/ProtectedRoute";

import Overview from "./pages/donor/Overview";
import MyDonations from "./pages/donor/MyDonations";
import Impact from "./pages/donor/Impact";

import BrowseFood from "./pages/recipient/BrowseFood";
import MyRequests from "./pages/recipient/MyRequests";



import Tasks from "./pages/volunteer/Tasks";

import { ROLES } from "./constants/roles";
import DonateFood from "./pages/donor/DonateFood";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* DONOR DASHBOARD */}
        <Route
          path="/donor"
          element={
            <ProtectedRoute role={ROLES.DONOR}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Overview />} />
          <Route path="donations" element={<MyDonations />} />
          <Route path="impact" element={<Impact />} />
          <Route path="donate" element={<DonateFood />} />

        </Route>

        {/* RECIPIENT DASHBOARD */}
        <Route
          path="/recipient"
          element={
            <ProtectedRoute role={ROLES.RECIPIENT}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<BrowseFood />} />
          <Route path="requests" element={<MyRequests />} />
        </Route>

        {/* VOLUNTEER DASHBOARD */}
        <Route
          path="/volunteer"
          element={
            <ProtectedRoute role={ROLES.VOLUNTEER}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Tasks />} />
        </Route>

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
