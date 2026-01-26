import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../../services/firebase";
import { ROLES } from "../../constants/roles";

const Login = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // ⚠️ Firebase Auth supports EMAIL login (phone requires OTP setup)
      const userCredential = await signInWithEmailAndPassword(
        auth,
        emailOrPhone,
        password
      );

      // 🔐 TEMP ROLE LOGIC (hackathon-safe)
      // In real app → fetch role from Firestore
      let role = localStorage.getItem("role");

      if (!role) {
        // fallback role (VERY IMPORTANT)
        role = ROLES.DONOR;
        localStorage.setItem("role", role);
      }

      // ✅ REDIRECT BASED ON ROLE
      if (role === ROLES.DONOR) navigate("/donor");
      if (role === ROLES.RECIPIENT) navigate("/recipient");
      if (role === ROLES.VOLUNTEER) navigate("/volunteer");

    } catch (error) {
      alert("Invalid email/phone or password");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F1DE]">
      <form
        onSubmit={handleLogin}
        className="bg-white p-10 rounded-xl shadow-md w-[380px]"
      >
        <h2 className="text-2xl font-bold mb-6 text-[#3D405B]">
          Login to ShareBite
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 border rounded-lg"
          value={emailOrPhone}
          onChange={(e) => setEmailOrPhone(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-3 border rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-[#E07A5F] text-white py-3 rounded-lg font-bold"
        >
          Login
        </button>

        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-[#E07A5F] font-bold">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
