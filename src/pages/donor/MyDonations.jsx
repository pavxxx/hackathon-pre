const MyDonations = () => {
    return (
        <>
            {/* METRICS */}
            <div className="grid grid-cols-3 gap-6 mb-10">
                {[
                    ["Total Meals Saved", "1,240", "+12% this month"],
                    ["CO2 Reduced", "450 kg", "+5% this month"],
                    ["Impact Score", "A+", "Top 5% of donors"],
                ].map((item, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl border">
                        <p className="text-sage font-bold">{item[0]}</p>
                        <p className="text-3xl font-bold mt-2">{item[1]}</p>
                        <p className="text-sunset text-sm mt-2">{item[2]}</p>
                    </div>
                ))}
            </div>

            {/* TABLE */}
            <div className="bg-white rounded-xl border overflow-hidden mb-10">
                <table className="w-full">
                    <thead className="bg-bgsoft">
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
                            <td className="p-4 font-bold">Organic Vegetables Mix</td>
                            <td className="p-4">15.0 kg</td>
                            <td className="p-4 text-sunset">4h 20m</td>
                            <td className="p-4">
                                <span className="px-3 py-1 rounded-full text-xs badge-available">
                                    Available
                                </span>
                            </td>
                            <td className="p-4 text-sunset font-bold">Edit</td>
                        </tr>

                        <tr className="border-t">
                            <td className="p-4 font-bold">Fresh Bakery Basket</td>
                            <td className="p-4">5 Boxes</td>
                            <td className="p-4 text-sage">Claimed</td>
                            <td className="p-4">
                                <span className="px-3 py-1 rounded-full text-xs badge-claimed">
                                    Claimed
                                </span>
                            </td>
                            <td className="p-4 text-sunset font-bold">Details</td>
                        </tr>

                        <tr className="border-t">
                            <td className="p-4 font-bold">Lunch Catering Mix</td>
                            <td className="p-4">12 Trays</td>
                            <td className="p-4 text-gray-500">Picked Up</td>
                            <td className="p-4">
                                <span className="px-3 py-1 rounded-full text-xs badge-picked">
                                    Picked Up
                                </span>
                            </td>
                            <td className="p-4 text-sunset font-bold">Archive</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default MyDonations;
