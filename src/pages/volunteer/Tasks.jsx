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
import { setDoc } from "firebase/firestore";
const Tasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);

useEffect(() => {
  if (!user) return;

  const q = query(
    collection(db, "donations"),
    where("status", "in", ["CLAIMED", "PICKED_UP"])
  );

  const unsub = onSnapshot(q, (snap) => {
    setTasks(
      snap.docs
        .map((d) => ({ id: d.id, ...d.data() }))
        .filter((task) => {
          // show ONLY:
          // 1️⃣ unassigned CLAIMED tasks
          // 2️⃣ tasks assigned to me
          if (task.status === "CLAIMED" && !task.volunteerId) return true;
          if (task.volunteerId === user.uid) return true;
          return false;
        })
    );
  });

  return () => unsub();
}, [user]);


const acceptTask = async (taskId) => {
  try {
    await setDoc(
      doc(db, "donations", taskId),
      {
        volunteerId: user.uid,
        status: "CLAIMED",
      },
      { merge: true }
    );
  } catch (err) {
    console.error("Accept failed:", err.code, err.message);
    alert("Failed to accept task");
  }
};



  const updateStatus = async (taskId, newStatus) => {
    try {
      await updateDoc(doc(db, "donations", taskId), {
        status: newStatus,
      });
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#3D405B]">
        Volunteer Tasks
      </h1>

      {tasks.length === 0 && (
        <p className="text-gray-500">
          No available tasks right now.
        </p>
      )}

      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-white border rounded-xl p-6"
        >
          <h2 className="text-lg font-bold mb-2">
            {task.foodName}
          </h2>

          <p className="text-sm text-gray-600">
            Quantity: {task.quantity} {task.unit}
          </p>
          <p className="text-sm">
            📍 Pickup: {task.pickupLocation}
          </p>
          <p className="text-sm mb-4">
            ⏰ Time: {task.pickupTime}
          </p>

          <div className="flex gap-3 items-center">
            <span className="font-semibold">
              Status: {task.status}
            </span>

            {task.status === "CLAIMED" && !task.volunteerId && (
  <button
    onClick={() => acceptTask(task.id)}
    className="px-4 py-2 bg-[#E07A5F] text-white rounded-lg"
  >
    Accept Task
  </button>
)}


            {task.volunteerId === user.uid &&
              task.status === "CLAIMED" && (
                <button
                  onClick={() =>
                    updateStatus(task.id, "PICKED_UP")
                  }
                  className="px-4 py-2 bg-[#E07A5F] text-white rounded-lg"
                >
                  Mark Picked Up
                </button>
              )}

            {task.volunteerId === user.uid &&
              task.status === "PICKED_UP" && (
                <button
                  onClick={() =>
                    updateStatus(task.id, "DELIVERED")
                  }
                  className="px-4 py-2 bg-green-600 text-white rounded-lg"
                >
                  Mark Delivered
                </button>
              )}

            {task.status === "DELIVERED" && (
              <span className="text-green-600 font-bold">
                ✅ Completed
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tasks;
