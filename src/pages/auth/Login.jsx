import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ROLES } from "../../constants/roles";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const stored = JSON.parse(
      localStorage.getItem("sharebite_credentials")
    );

    if (!stored) {
      alert("No account found. Please sign up.");
      return;
    }

    const identifierMatch =
      identifier === stored.email ||
      identifier === stored.phone;

    const passwordMatch =
      password === stored.password;

    if (!identifierMatch || !passwordMatch) {
      alert("Invalid email/phone or password");
      return;
    }

    login(stored.role);

    if (stored.role === ROLES.DONOR) navigate("/donor");
    if (stored.role === ROLES.RECIPIENT) navigate("/recipient");
    if (stored.role === ROLES.VOLUNTEER) navigate("/volunteer");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F1DE]">
      <form
        onSubmit={handleLogin}
        className="bg-white p-10 rounded-2xl shadow-md w-full max-w-md space-y-6"
      >
        <h1 className="text-2xl font-bold text-center text-[#3D405B]">
          Login to ShareBite
        </h1>

        <input
          placeholder="Email or Phone Number"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          className="w-full border px-4 py-2 rounded-lg"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-4 py-2 rounded-lg"
        />

        <button
          type="submit"
          className="w-full bg-[#E07A5F] text-white py-3 rounded-lg font-bold hover:opacity-90 transition"
        >
          Login
        </button>

        {/* 🔹 SIGNUP LINK (THIS WAS MISSING) */}
        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-[#E07A5F] font-bold cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
