import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

/* TEMP DASHBOARDS — KEEP SIMPLE */
const DonorDashboard = () => {
  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ fontSize: 32, fontWeight: "bold" }}>
        DONOR DASHBOARD ✅
      </h1>
      <p>If you see this, routing works.</p>
    </div>
  );
};

const RecipientDashboard = () => {
  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ fontSize: 32, fontWeight: "bold" }}>
        RECIPIENT DASHBOARD ✅
      </h1>
      <p>If you see this, routing works.</p>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Root */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Dashboards (NO protection yet) */}
        <Route path="/donor" element={<DonorDashboard />} />
        <Route path="/recipient" element={<RecipientDashboard />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
