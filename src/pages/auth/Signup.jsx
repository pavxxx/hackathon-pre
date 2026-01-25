import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { ROLES } from "../../constants/roles";

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = (e) => {
    e.preventDefault();

    const { name, email, phone, password, role } = form;

    if (!name || !email || !phone || !password || !role) {
      alert("All fields are required");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    const userRecord = {
      name,
      email,
      phone,
      password, // ✅ PLAIN TEXT (IMPORTANT)
      role,
    };

    localStorage.setItem(
      "sharebite_credentials",
      JSON.stringify(userRecord)
    );

    console.log("Saved user:", userRecord);

    login(role);

    if (role === ROLES.DONOR) navigate("/donor");
    if (role === ROLES.RECIPIENT) navigate("/recipient");
    if (role === ROLES.VOLUNTEER) navigate("/volunteer");
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
