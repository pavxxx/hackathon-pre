import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [role, setRole] = useState("DONOR");

    const handleLogin = () => {
        // mock login
        login(role);

        if (role === "DONOR") navigate("/donor");
        if (role === "RECIPIENT") navigate("/recipient");
        if (role === "VOLUNTEER") navigate("/delivery");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-bgsoft">
            <div className="bg-white p-8 rounded-xl w-96 shadow-lg">
                <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

                <input
                    className="w-full border p-2 mb-3 rounded"
                    placeholder="Email"
                />
                <input
                    type="password"
                    className="w-full border p-2 mb-3 rounded"
                    placeholder="Password"
                />

                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full border p-2 mb-4 rounded"
                >
                    <option value="DONOR">Donor</option>
                    <option value="RECIPIENT">Recipient</option>
                    <option value="VOLUNTEER">Volunteer (Delivery)</option>
                </select>

                <button
                    onClick={handleLogin}
                    className="w-full bg-sunset text-white py-2 rounded-lg font-bold"
                >
                    Login
                </button>

                <p className="text-sm mt-4 text-center">
                    Don’t have an account?{" "}
                    <span
                        className="text-sunset cursor-pointer font-semibold"
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
