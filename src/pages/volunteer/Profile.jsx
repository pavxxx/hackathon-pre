import { useAuth } from "../../context/AuthContext";

const Profile = () => {
    const { user } = useAuth();

    return (
        <div className="bg-white p-6 rounded-xl border space-y-4">
            <h1 className="text-xl font-bold">My Profile</h1>

            <p>
                <strong>Name:</strong> {user?.name || "Volunteer"}
            </p>

            <p>
                <strong>Email:</strong> {user?.email}
            </p>

            <div className="mt-6">
                <h2 className="font-bold mb-2">Your Contributions</h2>
                <ul className="list-disc ml-5 text-gray-600">
                    <li>Tasks Completed: {user?.tasksCompleted || 0}</li>
                    <li>Deliveries Done: {user?.deliveries || 0}</li>
                    <li>Status: Active Volunteer</li>
                </ul>
            </div>
        </div>
    );
};

export default Profile;
