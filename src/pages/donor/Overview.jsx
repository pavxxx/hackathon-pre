import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Overview = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalDonations: 0,
    active: 0,
    claimed: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      const q = query(
        collection(db, "donations"),
        where("donorId", "==", user.uid)
      );

      const snap = await getDocs(q);

      let active = 0;
      let claimed = 0;

      snap.forEach((d) => {
        if (d.data().status === "Available") active++;
        if (d.data().status === "Claimed") claimed++;
      });

      setStats({
        totalDonations: snap.size,
        active,
        claimed,
      });
    };

    loadStats();
  }, [user.uid]);

  return (
    <div className="space-y-8">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Donor Dashboard</h1>
        <button
          onClick={() => navigate("donate")}
          className="bg-[#E07A5F] text-white px-6 py-3 rounded-lg"
        >
          + Post New Donation
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <Stat title="Total Donations" value={stats.totalDonations} />
        <Stat title="Active" value={stats.active} />
        <Stat title="Claimed" value={stats.claimed} />
      </div>
    </div>
  );
};

const Stat = ({ title, value }) => (
  <div className="bg-white p-6 rounded-xl border">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-3xl font-bold">{value}</p>
  </div>
);

export default Overview;
