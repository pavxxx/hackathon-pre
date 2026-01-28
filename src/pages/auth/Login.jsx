import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../../services/firebase";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(
      auth,
      email.trim().toLowerCase(),
      password
    );
  };

  useEffect(() => {
    if (!user) return;

    if (user.role === "DONOR") navigate("/donor");
    if (user.role === "RECIPIENT") navigate("/recipient");
    if (user.role === "VOLUNTEER") navigate("/volunteer");
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F1DE]">
      <form
        className="bg-white p-8 rounded-xl w-[380px]"
        onSubmit={handleLogin}
      >
        <h2 className="text-2xl font-bold mb-6">Login to Share-Bite</h2>

        <input
          className="w-full mb-4 p-3 border rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            className="w-full p-3 border rounded pr-12"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2
                       text-sm font-semibold text-[#E07A5F]"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button className="w-full bg-[#E07A5F] text-white py-3 rounded font-bold">
          Login
        </button>

        <p className="text-sm mt-4 text-center">
          No account?{" "}
          <Link to="/signup" className="text-[#E07A5F] font-bold">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
