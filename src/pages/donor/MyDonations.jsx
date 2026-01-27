import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../services/firebase";
import { useAuth } from "../../context/AuthContext";

const MyDonations = () => {
  const { user } = useAuth();
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "donations"),
      where("donorId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setDonations(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  if (loading) {
    return <p className="p-6">Loading your donations...</p>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#3D405B]">
        My Donations
      </h1>

      {donations.length === 0 && (
        <p className="text-gray-500">
          You haven’t posted any donations yet.
        </p>
      )}

      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#F4F1DE]">
            <tr>
              <th className="p-4 text-left">Food</th>
              <th className="p-4">Quantity</th>
              <th className="p-4">Status</th>
              <th className="p-4">Expires</th>
            </tr>
          </thead>

          <tbody>
            {donations.map((d) => (
              <tr key={d.id} className="border-t">
                <td className="p-4 font-bold">
                  {d.foodName}
                </td>
                <td className="p-4">
                  {d.quantity} {d.unit}
                </td>
                <td className="p-4">
                  <span className="badge-available">
                    {d.status}
                  </span>
                </td>
                <td className="p-4 text-sm">
                  {d.expiresAt?.toDate
                    ? d.expiresAt.toDate().toLocaleString()
                    : "—"}
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
