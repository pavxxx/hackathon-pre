import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  updateDoc,
  doc,
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
      where("status", "==", "Available")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setFoods(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleClaim = async (donationId) => {
    try {
      await updateDoc(doc(db, "donations", donationId), {
        status: "Claimed",
        claimedBy: user.uid,
      });

      // No manual state update needed — onSnapshot handles it
      alert("Food claimed successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to claim food");
    }
  };

  if (loading) {
    return <p className="p-6">Loading available food...</p>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#3D405B]">
        Available Food
      </h1>

      {foods.length === 0 && (
        <p className="text-gray-500">
          No food available right now.
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
            <p className="text-xs text-gray-400">
              Pickup: {food.pickupAddress}
            </p>
          </div>

          <button
            onClick={() => handleClaim(food.id)}
            className="bg-[#E07A5F] text-white px-4 py-2 rounded-lg font-bold"
          >
            Claim
          </button>
        </div>
      ))}
    </div>
  );
};

export default BrowseFood;
