import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../../services/firebase";
import { useAuth } from "../../context/AuthContext";

const DonateFood = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    foodName: "",
    quantity: "",
    unit: "kg",
    foodType: "VEG",
    expiryAt: "",
    pickupLocation: "",
    pickupTime: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validation
    for (const key in form) {
      if (!form[key]) {
        alert("Please fill all fields");
        return;
      }
    }

    try {
      await addDoc(collection(db, "donations"), {
        foodName: form.foodName,
        quantity: Number(form.quantity),
        unit: form.unit,
        foodType: form.foodType,
        expiryAt: new Date(form.expiryAt),
        pickupLocation: form.pickupLocation,
        pickupTime: form.pickupTime,

        donorId: user.uid,
        donorName: user.name,

        status: "AVAILABLE",
        createdAt: serverTimestamp(),
      });

      alert("Donation posted successfully");
      navigate("/donor/donations");
    } catch (err) {
      console.error(err);
      alert("Failed to post donation");
    }
  };

  return (
    <div className="max-w-2xl bg-white p-8 rounded-xl border">
      <h1 className="text-2xl font-bold mb-6 text-[#3D405B]">
        Post New Donation
      </h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          name="foodName"
          placeholder="Food Name"
          className="w-full p-3 border rounded"
          value={form.foodName}
          onChange={handleChange}
        />

        <div className="flex gap-4">
          <input
            name="quantity"
            type="number"
            placeholder="Quantity"
            className="w-full p-3 border rounded"
            value={form.quantity}
            onChange={handleChange}
          />

          <select
            name="unit"
            className="w-full p-3 border rounded"
            value={form.unit}
            onChange={handleChange}
          >
            <option value="kg">Kg</option>
            <option value="plates">Plates</option>
            <option value="boxes">Boxes</option>
          </select>
        </div>

        <select
          name="foodType"
          className="w-full p-3 border rounded"
          value={form.foodType}
          onChange={handleChange}
        >
          <option value="VEG">Vegetarian</option>
          <option value="NON_VEG">Non-Vegetarian</option>
        </select>

        <input
          type="datetime-local"
          name="expiryAt"
          className="w-full p-3 border rounded"
          value={form.expiryAt}
          onChange={handleChange}
        />

        <input
          name="pickupLocation"
          placeholder="Pickup Location"
          className="w-full p-3 border rounded"
          value={form.pickupLocation}
          onChange={handleChange}
        />

        <input
          name="pickupTime"
          placeholder="Pickup Time (e.g. 6PM – 8PM)"
          className="w-full p-3 border rounded"
          value={form.pickupTime}
          onChange={handleChange}
        />

        <button className="w-full bg-[#E07A5F] text-white py-3 rounded font-bold">
          Post Donation
        </button>
      </form>
    </div>
  );
};

export default DonateFood;
