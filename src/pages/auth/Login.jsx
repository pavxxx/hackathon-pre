import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ROLES } from "../../constants/roles";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

    const handleLogin = () => {
        login(role);

        if (role === "DONOR") navigate("/donor");
        if (role === "RECIPIENT") navigate("/recipient");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-bgsoft">
            <div className="bg-white p-8 rounded-xl w-96">
                <h1 className="text-2xl font-bold mb-4">Login</h1>

                <input className="w-full border p-2 mb-3" placeholder="Email" />
                <input
                    type="password"
                    className="w-full border p-2 mb-3"
                    placeholder="Password"
                />

                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full border p-2 mb-4"
                >
                    <option value="DONOR">Donor</option>
                    <option value="RECIPIENT">Recipient</option>
                </select>

        <button
          type="submit"
          className="w-full bg-[#E07A5F] text-white py-3 rounded-lg font-bold hover:opacity-90 transition"
        >
          Login
        </button>

                <p className="text-sm mt-4 text-center">
                    Don’t have an account?{" "}
                    <span
                        className="text-sunset cursor-pointer"
                        onClick={() => navigate("/signup")}
                    >
                        Sign Up
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;
