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
    <div className="min-h-screen flex items-center justify-center bg-[#F4F1DE]">
      <form
        onSubmit={handleSignup}
        className="bg-white p-10 rounded-2xl shadow-md w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-center text-[#3D405B]">
          Create Account
        </h1>

        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-lg"
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-lg"
        />

        <input
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-lg"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-lg"
        />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-lg bg-white"
        >
          <option value="">Select Role</option>
          <option value={ROLES.DONOR}>Food Donor</option>
          <option value={ROLES.RECIPIENT}>Food Recipient</option>
          <option value={ROLES.VOLUNTEER}>Volunteer</option>
        </select>

        <button className="w-full bg-[#E07A5F] text-white py-3 rounded-lg font-bold">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
