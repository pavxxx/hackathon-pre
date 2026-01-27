import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../services/firebase";
import { useAuth } from "../../context/AuthContext";

const Impact = () => {
  const { user } = useAuth();

  const [stats, setStats] = useState({
    totalMeals: 0,
    foodSavedKg: 0,
    co2PreventedKg: 0,
  });

  const [badges, setBadges] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    if (!user) return;

    const loadImpact = async () => {
      /* ==========================
         DONOR-SPECIFIC STATS
      ========================== */
      const donorQuery = query(
        collection(db, "donations"),
        where("donorId", "==", user.uid)
      );

      const donorSnap = await getDocs(donorQuery);

      let totalMeals = donorSnap.size;
      let foodSavedKg = 0;

      donorSnap.forEach((doc) => {
        const d = doc.data();
        if (d.unit === "kg") {
          foodSavedKg += Number(d.quantity);
        }
      });

      const co2PreventedKg = foodSavedKg * 1.9; // approx

      setStats({
        totalMeals,
        foodSavedKg,
        co2PreventedKg,
      });

      /* ==========================
         BADGES (CALCULATED)
      ========================== */
      const earnedBadges = [];

      if (totalMeals >= 10) {
        earnedBadges.push({
          name: "Community Hero",
          desc: "10+ donations made",
        });
      }

      if (foodSavedKg >= 50) {
        earnedBadges.push({
          name: "Green Warrior",
          desc: "50kg+ food waste reduced",
        });
      }

      if (totalMeals >= 20) {
        earnedBadges.push({
          name: "Gold Donor",
          desc: "20+ donations contributed",
        });
      }

      setBadges(earnedBadges);

      /* ==========================
         LEADERBOARD
      ========================== */
      const allSnap = await getDocs(collection(db, "donations"));
      const donorMap = {};

      allSnap.forEach((doc) => {
        const d = doc.data();
        donorMap[d.donorId] = (donorMap[d.donorId] || 0) + 1;
      });

      const leaderboardData = Object.entries(donorMap)
        .map(([donorId, count]) => ({
          donorId,
          count,
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      setLeaderboard(leaderboardData);
    };

    loadImpact();
  }, [user]);

  return (
    <div className="space-y-10">
      {/* PAGE TITLE */}
      <div>
        <h1 className="text-2xl font-bold text-[#3D405B]">
          Your Impact
        </h1>
        <p className="text-sm text-[#81B29A] mt-1">
          See how your donations are making a difference
        </p>
      </div>

      {/* IMPACT STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Stat
          label="Total Meals Donated"
          value={stats.totalMeals}
        />
        <Stat
          label="CO₂ Emissions Prevented"
          value={`${stats.co2PreventedKg.toFixed(1)} kg`}
        />
        <Stat
          label="Food Waste Reduced"
          value={`${stats.foodSavedKg} kg`}
        />
      </div>

      {/* BADGES */}
      <div className="bg-white p-6 rounded-xl border">
        <h2 className="font-bold mb-4 text-[#3D405B]">
          Your Badges
        </h2>

        {badges.length === 0 && (
          <p className="text-sm text-gray-500">
            No badges earned yet. Keep donating!
          </p>
        )}

        <div className="flex gap-4 flex-wrap">
          {badges.map((badge, i) => (
            <div
              key={i}
              className="border rounded-lg px-4 py-3 bg-[#F4F1DE]"
            >
              <p className="font-bold text-[#3D405B]">
                {badge.name}
              </p>
              <p className="text-xs text-gray-500">
                {badge.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* LEADERBOARD */}
      <div className="bg-white p-6 rounded-xl border">
        <h2 className="font-bold mb-4 text-[#3D405B]">
          Top Donors
        </h2>

        <table className="w-full text-left">
          <thead>
            <tr className="text-sm text-gray-500 border-b">
              <th className="pb-2">Rank</th>
              <th className="pb-2">Donor ID</th>
              <th className="pb-2">Donations</th>
            </tr>
          </thead>

          <tbody>
            {leaderboard.map((row, i) => (
              <tr key={i} className="border-b last:border-none">
                <td className="py-3 font-bold">{i + 1}</td>
                <td className="py-3 text-xs">
                  {row.donorId.slice(0, 8)}…
                </td>
                <td className="py-3">{row.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Stat = ({ label, value }) => (
  <div className="bg-white p-6 rounded-xl border">
    <p className="text-sm font-bold text-[#81B29A]">
      {label}
    </p>
    <p className="text-3xl font-bold mt-2">{value}</p>
  </div>
);

export default Impact;
