import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../../services/firebase";
import { useAuth } from "../../context/AuthContext";

const statusStyles = {
  AVAILABLE: "badge-available",
  CLAIMED: "badge-claimed",
  PICKED_UP: "badge-picked",
  DELIVERED: "badge-picked",
};

const MyDonations = () => {
  const { user } = useAuth();
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;

    const q = query(
      collection(db, "donations"),
      where("donorId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snap) => {
      setDonations(
        snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
      setLoading(false);
    });

    return () => unsub();
  }, [user]);

  if (loading) return <p className="p-6">Loading donations...</p>;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-[#3D405B]">
        My Donations
      </h1>

      {donations.length === 0 && (
        <p className="text-gray-500">
          You have not posted any donations yet.
        </p>
      )}

      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#F4F1DE]">
            <tr>
              <th className="p-4 text-left">Food</th>
              <th className="p-4">Quantity</th>
              <th className="p-4">Expires At</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {donations.map((d) => (
              <tr key={d.id} className="border-t">
                <td className="p-4 font-semibold">
                  {d.foodName}
                </td>

                <td className="p-4 text-center">
                  {d.quantity} {d.unit}
                </td>

                <td className="p-4 text-center text-[#E07A5F]">
                  {d.expiryAt?.toDate
                    ? d.expiryAt.toDate().toLocaleString()
                    : "—"}
                </td>

                <td className="p-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      statusStyles[d.status]
                    }`}
                  >
                    {d.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyDonations;
