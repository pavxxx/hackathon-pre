import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import MyDonations from "./pages/donor/MyDonations";
import BrowseFood from "./pages/recipient/BrowseFood";
import ProtectedRoute from "./components/common/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root → login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Donor */}
        <Route
          path="/donor"
          element={
            <ProtectedRoute allowedRole="DONOR">
              <MyDonations />
            </ProtectedRoute>
          }
        />

        {/* Recipient */}
        <Route
          path="/recipient"
          element={
            <ProtectedRoute allowedRole="RECIPIENT">
              <BrowseFood />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
