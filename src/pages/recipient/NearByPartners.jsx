const partners = [
    {
        id: 1,
        name: "City Food Bank",
        distance: "0.8 km away",
        type: "NGO",
    },
    {
        id: 2,
        name: "Community Shelter",
        distance: "1.2 km away",
        type: "Shelter",
    },
    {
        id: 3,
        name: "Hope Foundation",
        distance: "2.1 km away",
        type: "NGO",
    },
];

const NearbyPartners = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-[#3D405B]">
                Nearby Redistribution Partners
            </h2>

            <div className="space-y-4">
                {partners.map((partner) => (
                    <div
                        key={partner.id}
                        className="bg-white border rounded-xl p-4 flex justify-between items-center hover:shadow-sm transition"
                    >
                        <div>
                            <h3 className="font-semibold text-lg">{partner.name}</h3>
                            <p className="text-sm text-gray-500">
                                {partner.type} • {partner.distance}
                            </p>
                        </div>

                        <button className="text-[#E07A5F] font-semibold">
                            View →
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NearbyPartners;
