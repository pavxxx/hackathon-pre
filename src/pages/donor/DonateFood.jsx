import { useState } from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../services/firebase";
import { useAuth } from "../../context/AuthContext";

const DonateFood = () => {
  const { user } = useAuth();

  const [form, setForm] = useState({
    foodName: "",
    category: "",
    quantity: "",
    unit: "kg",
    preparedAt: "",
    expiresAt: "",
    pickupAddress: "",
    storage: "",
    contactPhone: "",
    hygieneNote: "",
    additionalNotes: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("User not authenticated");
      return;
    }

    try {
      await addDoc(collection(db, "donations"), {
        foodName: form.foodName,
        category: form.category,
        quantity: form.quantity,
        unit: form.unit,

        preparedAt: Timestamp.fromDate(new Date(form.preparedAt)),
        expiresAt: Timestamp.fromDate(new Date(form.expiresAt)),

        pickupAddress: form.pickupAddress,
        storage: form.storage,
        contactPhone: form.contactPhone,
        hygieneNote: form.hygieneNote,
        additionalNotes: form.additionalNotes,

        donorId: user.uid,
        status: "Available",
        createdAt: Timestamp.now(),
      });

      alert("Donation posted successfully!");

      setForm({
        foodName: "",
        category: "",
        quantity: "",
        unit: "kg",
        preparedAt: "",
        expiresAt: "",
        pickupAddress: "",
        storage: "",
        contactPhone: "",
        hygieneNote: "",
        additionalNotes: "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to post donation");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl border">
      <h1 className="text-2xl font-bold text-[#3D405B] mb-6">
        Post New Donation
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input name="foodName" placeholder="Food Name" className="w-full p-3 border rounded-lg" required value={form.foodName} onChange={handleChange} />

        <select name="category" className="w-full p-3 border rounded-lg" required value={form.category} onChange={handleChange}>
          <option value="">Category</option>
          <option>Vegetarian</option>
          <option>Non-Vegetarian</option>
          <option>Bakery</option>
          <option>Cooked Meals</option>
        </select>

        <div className="grid grid-cols-2 gap-4">
          <input name="quantity" type="number" placeholder="Quantity" className="p-3 border rounded-lg" required value={form.quantity} onChange={handleChange} />
          <select name="unit" className="p-3 border rounded-lg" value={form.unit} onChange={handleChange}>
            <option>kg</option>
            <option>plates</option>
            <option>boxes</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input name="preparedAt" type="datetime-local" className="p-3 border rounded-lg" required value={form.preparedAt} onChange={handleChange} />
          <input name="expiresAt" type="datetime-local" className="p-3 border rounded-lg" required value={form.expiresAt} onChange={handleChange} />
        </div>

        <textarea name="pickupAddress" placeholder="Pickup Address" className="w-full p-3 border rounded-lg" required value={form.pickupAddress} onChange={handleChange} />

        <select name="storage" className="w-full p-3 border rounded-lg" required value={form.storage} onChange={handleChange}>
          <option value="">Storage Condition</option>
          <option>Room Temperature</option>
          <option>Refrigerated</option>
          <option>Frozen</option>
        </select>

        <input name="contactPhone" placeholder="Contact Phone" className="w-full p-3 border rounded-lg" required value={form.contactPhone} onChange={handleChange} />

        <textarea name="hygieneNote" placeholder="Hygiene Notes (optional)" className="w-full p-3 border rounded-lg" value={form.hygieneNote} onChange={handleChange} />

        <textarea name="additionalNotes" placeholder="Additional Notes" className="w-full p-3 border rounded-lg" value={form.additionalNotes} onChange={handleChange} />

        <button type="submit" className="bg-[#E07A5F] text-white px-8 py-3 rounded-lg font-bold">
          Post Donation
        </button>
      </form>
    </div>
  );
};

export default DonateFood;
