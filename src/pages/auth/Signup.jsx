import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "../../services/firebase";
import { ROLES } from "../../constants/roles";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: ROLES.DONOR,
  });

  const navigate = useNavigate();

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
    <div className="min-h-screen flex items-center justify-center bg-bgsoft">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl w-[420px] space-y-4"
      >
        <h1 className="text-2xl font-bold">Create Account</h1>

        <input placeholder="Name" className="input" onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Email" className="input" onChange={e => setForm({ ...form, email: e.target.value })} />
        <input placeholder="Phone" className="input" onChange={e => setForm({ ...form, phone: e.target.value })} />
        <input type="password" placeholder="Password" className="input" onChange={e => setForm({ ...form, password: e.target.value })} />

        <select className="input" onChange={e => setForm({ ...form, role: e.target.value })}>
          <option value={ROLES.DONOR}>Food Donor</option>
          <option value={ROLES.RECIPIENT}>Recipient</option>
          <option value={ROLES.VOLUNTEER}>Volunteer</option>
        </select>

        <button className="btn-primary w-full">Sign Up</button>

        <p className="text-center text-sm">
          Already have an account? <Link to="/login" className="text-sunset font-bold">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
