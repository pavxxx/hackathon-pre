import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "../../services/firebase";
import { ROLES } from "../../constants/roles";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: ROLES.DONOR,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password.length < 8 || !/\d/.test(form.password)) {
      alert("Password must be at least 8 characters and include a number");
      return;
    }

    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      await setDoc(doc(db, "users", res.user.uid), {
        name: form.name,
        email: form.email,
        phone: form.phone,
        role: form.role,
        createdAt: Timestamp.now(),
      });

      navigate("/login");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F1DE]">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl p-8 w-[380px] shadow-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-[#3D405B]">
          Create Account
        </h1>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full mb-4 px-4 py-2 border rounded-md"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 border rounded-md"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          type="tel"
          placeholder="Phone"
          className="w-full mb-4 px-4 py-2 border rounded-md"
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-2 border rounded-md"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <select
          className="w-full mb-6 px-4 py-2 border rounded-md"
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value={ROLES.DONOR}>Food Donor</option>
          <option value={ROLES.RECIPIENT}>Recipient</option>
          <option value={ROLES.VOLUNTEER}>Volunteer</option>
        </select>

        <button
          type="submit"
          className="w-full bg-[#E07A5F] text-white py-2 rounded-md font-semibold hover:opacity-90 transition"
        >
          Sign Up
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#E07A5F] font-semibold"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
