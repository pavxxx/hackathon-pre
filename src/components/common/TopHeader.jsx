import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { db, auth } from "../../services/firebase";
import { useAuth } from "../../context/AuthContext";

const TopHeader = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate(); // ✅ ONLY hook usage

  useEffect(() => {
    if (!user?.uid) return;

    const fetchProfile = async () => {
      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists()) {
        setProfile(snap.data());
      }
    };

    fetchProfile();
  }, [user]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login", { replace: true });
  };

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur border-b">
      <div>
        <h2 className="text-xl font-bold text-[#3D405B]">
          {profile?.role === "DONOR"
            ? "Donor Dashboard"
            : profile?.role === "RECIPIENT"
              ? "Recipient Dashboard"
              : "Volunteer Dashboard"}
        </h2>
        <p className="text-xs text-[#81B29A] mt-1">Welcome back 👋</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-bold">{profile?.name || "User"}</p>
          <p className="text-xs text-[#81B29A]">{profile?.role}</p>
        </div>

        <div className="w-10 h-10 rounded-full bg-[#81B29A] flex items-center justify-center text-white font-bold">
          {profile?.name?.charAt(0) || "U"}
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-1.5 rounded-full
             bg-red-50 text-red-500
             hover:bg-red-100
             transition text-sm font-semibold"
        >
          Logout
        </button>

      </div>
    </header>
  );
};

export default TopHeader;
