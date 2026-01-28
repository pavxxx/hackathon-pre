import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import { db } from "../../services/firebase";
import { useAuth } from "../../context/AuthContext";

const BrowseFood = () => {
  const { user } = useAuth();
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "donations"),
      where("status", "==", "AVAILABLE")
    );

    const unsub = onSnapshot(q, (snap) => {
      setFoods(
        snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }))
      );
      setLoading(false);
    });

    return () => unsub();
  }, []);

const handleClaim = async (food) => {
  if (food.donorId === user.uid) {
    alert("You cannot claim your own donation");
    return;
  }

  try {
    // ✅ Recipient ONLY claims food
    await updateDoc(doc(db, "donations", food.id), {
      status: "CLAIMED",
      claimedBy: user.uid,
      claimedAt: serverTimestamp(),
    });

    // ✅ Create request
    await addDoc(collection(db, "requests"), {
      donationId: food.id,
      recipientId: user.uid,
      donorId: food.donorId,
      status: "CLAIMED",
      createdAt: serverTimestamp(),
    });

    alert("Food claimed successfully!");
  } catch (err) {
    console.error(err);
    alert("Failed to claim food");
  }
};


  if (loading) return <p className="p-6">Loading food...</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#3D405B]">
        Available Food
      </h1>

      {foods.length === 0 && (
        <p className="text-gray-500">
          No food available at the moment.
        </p>
      )}

      {foods.map((food) => (
        <div
          key={food.id}
          className="bg-white p-6 rounded-xl border flex justify-between items-center"
        >
          <div>
            <p className="font-bold">{food.foodName}</p>
            <p className="text-sm text-gray-500">
              Quantity: {food.quantity} {food.unit}
            </p>
            <p className="text-sm text-gray-500">
              Pickup: {food.pickupLocation}
            </p>
          </div>

          <button
            onClick={() => handleClaim(food)}
            className="bg-[#E07A5F] text-white px-5 py-2 rounded-lg font-bold"
          >
            Claim
          </button>
        </div>
      ))}
    </div>
  );
};

export default BrowseFood;
