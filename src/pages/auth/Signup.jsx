import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Signup = () => {
    const navigate = useNavigate();

    const [role, setRole] = useState("DONOR");

    const handleSignup = () => {
        // mock signup success
        navigate("/login");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F4F1DE]">
            <div className="bg-white rounded-xl p-8 w-[400px] shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-[#3D405B]">
                    Create Account
                </h1>

                <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full mb-4 px-4 py-2 border rounded-md"
                />

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
                    onClick={handleSignup}
                    className="w-full bg-[#E07A5F] text-white py-2 rounded-md font-semibold hover:opacity-90 transition"
                >
                    Create Account
                </button>

                <p className="text-sm text-center mt-4">
                    Already have an account?{" "}
                    <span
                        onClick={() => navigate("/login")}
                        className="text-[#E07A5F] font-semibold cursor-pointer"
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Signup;
