import { useEffect, useState } from "react";
import { getAvailableDonations, claimDonation } from "../../services/foodService";
import { useAuth } from "../../context/AuthContext";

const BrowseFood = () => {
  const { user } = useAuth();
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await getAvailableDonations();
      setFoods(data);
      setLoading(false);
    };
    load();
  }, []);

  const handleClaim = async (id) => {
    try {
      await claimDonation(id, user.uid);
      alert("Food claimed successfully!");
      setFoods(prev => prev.filter(f => f.id !== id));
    } catch (err) {
      alert("Failed to claim food");
    }
  };

  if (loading) return <p>Loading available food...</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Available Food</h1>

      {foods.length === 0 && (
        <p className="text-gray-500">No food available right now.</p>
      )}

      {foods.map(food => (
        <div
          key={food.id}
          className="bg-white p-6 rounded-xl border flex justify-between items-center"
        >
          <div>
            <p className="font-bold">{food.foodName}</p>
            <p className="text-sm text-gray-500">
              Quantity: {food.quantity}
            </p>
          </div>

          <button
            onClick={() => handleClaim(food.id)}
            className="btn-primary"
          >
            Claim
          </button>
        </div>
      ))}
    </div>
  );
};

export default BrowseFood;
