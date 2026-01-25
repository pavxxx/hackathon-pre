import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Signup = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState("DONOR");

    const handleSignup = () => {
        // mock signup
        navigate("/login");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-bgsoft">
            <div className="bg-white p-8 rounded-xl w-96">
                <h1 className="text-2xl font-bold mb-4">Create Account</h1>

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
                    onClick={handleSignup}
                    className="w-full bg-sunset text-white py-2 rounded-lg font-bold"
                >
                    Sign Up
                </button>

                <p className="text-sm mt-4 text-center">
                    Already have an account?{" "}
                    <span
                        className="text-sunset cursor-pointer"
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Signup;
