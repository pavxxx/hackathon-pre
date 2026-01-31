export const getVolunteerTasks = async () => {
    return [
        {
            taskId: "T001",
            foodName: "Vegetable Meals",
            quantity: "10 boxes",
            pickup: {
                location: "Green Garden Bistro, MG Road",
                time: "10:00 – 11:00 AM",
            },
            drop: {
                location: "Community Shelter, Indiranagar",
                deadline: "Before 1:00 PM",
            },
            status: "ASSIGNED",
        },
        {
            taskId: "T002",
            foodName: "Bakery Items",
            quantity: "5 crates",
            pickup: {
                location: "Sunrise Bakery, Koramangala",
                time: "2:00 – 3:00 PM",
            },
            drop: {
                location: "Old Age Home, HSR Layout",
                deadline: "Before 5:00 PM",
            },
            status: "PICKED_UP",
        },
    ];
};
