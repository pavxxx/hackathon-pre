import { doc, updateDoc } from "firebase/firestore";

export const getAvailableDonations = async () => {
  const q = query(
    collection(db, "donations"),
    where("status", "==", "Available")
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const claimDonation = async (donationId, recipientId) => {
  const ref = doc(db, "donations", donationId);

  await updateDoc(ref, {
    status: "Claimed",
    claimedBy: recipientId,
  });
};
