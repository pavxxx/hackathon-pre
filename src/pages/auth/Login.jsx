import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState("DONOR");

    const handleLogin = () => {
        if (role === "DONOR") navigate("/donor");
        if (role === "RECIPIENT") navigate("/recipient");
        if (role === "VOLUNTEER") navigate("/volunteer");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F4F1DE]">
            <div className="bg-white rounded-xl p-8 w-[380px] shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-[#3D405B]">
                    Login
                </h1>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full mb-4 px-4 py-2 border rounded-md"
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full mb-4 px-4 py-2 border rounded-md"
                />

                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full mb-6 px-4 py-2 border rounded-md"
                >
                    <option value="DONOR">Donor</option>
                    <option value="RECIPIENT">Recipient</option>
                    <option value="VOLUNTEER">Volunteer</option>
                </select>

                <button
                    onClick={handleLogin}
                    className="w-full bg-[#E07A5F] text-white py-2 rounded-md font-semibold hover:opacity-90 transition"
                >
                    Login
                </button>

                {/* 👇 NEW USER LINK */}
                <p className="text-sm text-center mt-4">
                    New user?{" "}
                    <span
                        onClick={() => navigate("/signup")}
                        className="text-[#E07A5F] font-semibold cursor-pointer"
                    >
                        Signup
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;
