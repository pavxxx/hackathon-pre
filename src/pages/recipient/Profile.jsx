import { useEffect, useState } from "react";
import { auth } from "../../services/firebase";

const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        setUser(auth.currentUser);
    }, []);

    if (!user) return null;

    return (
        <div className="max-w-xl">
            <h2 className="text-2xl font-bold mb-6 text-[#3D405B]">
                My Profile
            </h2>

            <div className="bg-white border rounded-xl p-6 space-y-4">
                <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-semibold">
                        {user.displayName || "Recipient User"}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-semibold">{user.email}</p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">Role</p>
                    <p className="font-semibold text-[#81B29A]">Recipient</p>
                </div>

                <button
                    onClick={() => alert("Edit profile coming soon")}
                    className="mt-4 bg-[#E07A5F] text-white px-4 py-2 rounded-lg font-semibold"
                >
                    Edit Profile
                </button>
            </div>
        </div>
    );
};

export default Profile;
