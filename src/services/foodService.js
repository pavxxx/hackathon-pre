export const getMyDonations = async () => {
    return [
        {
            id: 1,
            name: "Organic Vegetables Mix",
            category: "Produce",
            quantity: "15 kg",
            expiresIn: "4h 20m",
            status: "AVAILABLE",
        },
        {
            id: 2,
            name: "Fresh Bakery Basket",
            category: "Bakery",
            quantity: "5 Boxes",
            expiresIn: "Claimed",
            status: "CLAIMED",
        },
    ];
};
