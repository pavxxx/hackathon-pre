import { useState } from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../services/firebase";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const DonateFood = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [foodName, setFoodName] = useState("");
  const [quantity, setQuantity] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, "foods"), {
      foodName,
      quantity,
      donorId: user.uid,
      donorName: user.name,
      status: "AVAILABLE",
      createdAt: Timestamp.now(),
    });

    navigate("/donor/donations");
  };

  return (
    <form onSubmit={submit} className="bg-white p-8 rounded-xl">
      <input placeholder="Food Name" onChange={(e) => setFoodName(e.target.value)} className="input" />
      <input placeholder="Quantity" onChange={(e) => setQuantity(e.target.value)} className="input" />
      <button className="btn-primary">Post Donation</button>
    </form>
  );
};

export default DonateFood;
