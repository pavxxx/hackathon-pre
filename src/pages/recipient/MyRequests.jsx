import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../services/firebase";
import { useAuth } from "../../context/AuthContext";

const MyRequests = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (!user?.uid) return;

    const q = query(
      collection(db, "requests"),
      where("recipientId", "==", user.uid)
    );

    const unsub = onSnapshot(q, (snap) => {
      setRequests(
        snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }))
      );
    });

    return () => unsub();
  }, [user]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#3D405B]">
        My Requests
      </h1>

      {requests.length === 0 && (
        <p className="text-gray-500">No requests yet.</p>
      )}

      {requests.map((r) => (
        <div
          key={r.id}
          className="bg-white p-6 rounded-xl border"
        >
          <p className="font-bold">
            Donation ID: {r.donationId}
          </p>
          <p className="text-sm text-gray-600">
            Status: {r.status}
          </p>
        </div>
      ))}
    </div>
  );
};

export default MyRequests;
