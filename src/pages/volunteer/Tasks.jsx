import { useEffect, useState } from "react";
import { getVolunteerTasks } from "../../services/volunteerService";

const VolunteerTasks = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        getVolunteerTasks().then(setTasks);
    }, []);

    const updateStatus = (taskId, newStatus) => {
        setTasks((prev) =>
            prev.map((t) =>
                t.taskId === taskId ? { ...t, status: newStatus } : t
            )
        );
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">My Tasks</h1>

            <div className="space-y-6">
                {tasks.map((task) => (
                    <div
                        key={task.taskId}
                        className="bg-white border rounded-xl p-6"
                    >
                        <h2 className="text-lg font-bold mb-2">
                            {task.foodName} ({task.quantity})
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <p className="font-semibold">Pickup</p>
                                <p className="text-sm text-gray-600">
                                    📍 {task.pickup.location}
                                </p>
                                <p className="text-sm text-gray-600">
                                    ⏰ {task.pickup.time}
                                </p>
                            </div>

                            <div>
                                <p className="font-semibold">Drop</p>
                                <p className="text-sm text-gray-600">
                                    📍 {task.drop.location}
                                </p>
                                <p className="text-sm text-gray-600">
                                    ⏳ {task.drop.deadline}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-sm font-bold">
                                Status: {task.status}
                            </span>

                            {task.status === "ASSIGNED" && (
                                <button
                                    onClick={() =>
                                        updateStatus(task.taskId, "PICKED_UP")
                                    }
                                    className="px-4 py-2 bg-sunset text-white rounded-lg"
                                >
                                    Mark Picked Up
                                </button>
                            )}

                            {task.status === "PICKED_UP" && (
                                <button
                                    onClick={() =>
                                        updateStatus(task.taskId, "DELIVERED")
                                    }
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg"
                                >
                                    Mark Delivered
                                </button>
                            )}

                            {task.status === "DELIVERED" && (
                                <span className="text-green-600 font-semibold">
                                    ✅ Completed
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VolunteerTasks;
