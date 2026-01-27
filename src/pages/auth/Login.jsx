import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { auth, db } from "../../services/firebase";
import { ROLES } from "../../constants/roles";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // 1️⃣ Firebase Auth login
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email.trim().toLowerCase(),
        password
      );

      const user = userCredential.user;

      // 2️⃣ Fetch role from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (!userDoc.exists()) {
        throw new Error("User profile not found");
      }

      const role = userDoc.data().role;

      // 3️⃣ Store role for ProtectedRoute + Sidebar
      localStorage.setItem("role", role);

      // 4️⃣ Redirect based on role
      if (role === ROLES.DONOR) navigate("/donor");
      else if (role === ROLES.RECIPIENT) navigate("/recipient");
      else if (role === ROLES.VOLUNTEER) navigate("/volunteer");
      else throw new Error("Invalid role");

    } catch (err) {
      console.error(err);
      alert("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F1DE]">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-md w-[380px]"
      >
        <h2 className="text-2xl font-bold mb-6 text-[#3D405B]">
          Login to ShareBite
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 border rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-3 border rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-[#E07A5F] text-white py-3 rounded-lg font-bold"
        >
          Login
        </button>

        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-[#E07A5F] font-bold">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
