import { useNavigate } from "react-router-dom";

const Overview = () => {
    const navigate = useNavigate();

    return (
        <div className="space-y-10">
            {/* HEADER + CTA */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-[#3D405B]">
                        Donor Impact Dashboard
                    </h1>
                    <p className="text-sm text-[#81B29A] mt-1">
                        Track your contributions and impact
                    </p>
                </div>

                <button
                    onClick={() => navigate("/donor/donate")}
                    className="bg-[#E07A5F] text-white px-6 py-3 rounded-lg font-bold shadow-md hover:opacity-90 transition"
                >
                    + Post New Donation
                </button>
            </div>

            {/* METRICS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    ["Total Meals Saved", "1,240", "+12% this month"],
                    ["CO₂ Reduced", "450 kg", "+5% this month"],
                    ["Impact Score", "A+", "Top 5% of donors"],
                ].map((item, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl border">
                        <p className="text-[#81B29A] font-bold text-sm">
                            {item[0]}
                        </p>
                        <p className="text-3xl font-bold mt-2">{item[1]}</p>
                        <p className="text-[#E07A5F] text-sm mt-2">
                            {item[2]}
                        </p>
                    </div>
                ))}
            </div>

            {/* ACTIVE DONATIONS TABLE */}
            <div className="bg-white rounded-xl border overflow-hidden">
                <div className="p-6 border-b">
                    <h2 className="font-bold text-lg text-[#3D405B]">
                        Active Donations
                    </h2>
                </div>

                <table className="w-full">
                    <thead className="bg-[#F4F1DE]">
                        <tr>
                            <th className="p-4 text-left">Food Item</th>
                            <th className="p-4">Quantity</th>
                            <th className="p-4">Expires In</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr className="border-t">
                            <td className="p-4 font-bold">
                                Organic Vegetables Mix
                            </td>
                            <td className="p-4">15 kg</td>
                            <td className="p-4 text-[#E07A5F]">4h 20m</td>
                            <td className="p-4">
                                <span className="px-3 py-1 rounded-full text-xs bg-[#81B29A]/20 text-[#81B29A] font-bold">
                                    Available
                                </span>
                            </td>
                            <td className="p-4 text-[#E07A5F] font-bold cursor-pointer">
                                Edit
                            </td>
                        </tr>

                        <tr className="border-t">
                            <td className="p-4 font-bold">
                                Fresh Bakery Basket
                            </td>
                            <td className="p-4">5 Boxes</td>
                            <td className="p-4 text-[#81B29A]">Claimed</td>
                            <td className="p-4">
                                <span className="px-3 py-1 rounded-full text-xs bg-[#E07A5F]/20 text-[#E07A5F] font-bold">
                                    Claimed
                                </span>
                            </td>
                            <td className="p-4 text-[#E07A5F] font-bold cursor-pointer">
                                Details
                            </td>
                        </tr>

                        <tr className="border-t">
                            <td className="p-4 font-bold">
                                Lunch Catering Mix
                            </td>
                            <td className="p-4">12 Trays</td>
                            <td className="p-4 text-gray-500">Picked Up</td>
                            <td className="p-4">
                                <span className="px-3 py-1 rounded-full text-xs bg-gray-200 text-gray-600 font-bold">
                                    Picked Up
                                </span>
                            </td>
                            <td className="p-4 text-[#E07A5F] font-bold cursor-pointer">
                                Archive
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Overview;
