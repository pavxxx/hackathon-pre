import {
  doc,
  updateDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

export const claimDonation = async (donationId, recipientId) => {
  // 🔍 Find any volunteer
  const volunteerQuery = query(
    collection(db, "users"),
    where("role", "==", "VOLUNTEER")
  );

  const snap = await getDocs(volunteerQuery);

  if (snap.empty) {
    throw new Error("No volunteer found");
  }

  const volunteerId = snap.docs[0].id;

  // ✅ Update donation
  await updateDoc(doc(db, "donations", donationId), {
    status: "Claimed",
    claimedBy: recipientId,
    volunteerId: volunteerId,
  });
};
