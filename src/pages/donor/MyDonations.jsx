const DonorDashboard = () => {
    return (
        <div className="flex min-h-screen">
            {/* SIDEBAR */}
            <aside className="w-64 bg-white border-r p-6 flex flex-col justify-between">
                <div>
                    <div className="flex items-center gap-3 mb-10">
                        <div className="bg-sunset text-white w-10 h-10 rounded-lg flex items-center justify-center">
                            🍽️
                        </div>
                        <div>
                            <h1 className="font-bold text-lg">ShareBite</h1>
                            <p className="text-xs text-sage font-bold tracking-widest">
                                DONOR NETWORK
                            </p>
                        </div>
                    </div>

                    <nav className="space-y-2">
                        <div className="px-3 py-2 rounded-lg bg-sunset/10 text-sunset font-bold">
                            Overview
                        </div>
                        <div className="px-3 py-2 rounded-lg text-gray-500">
                            My Donations
                        </div>
                        <div className="px-3 py-2 rounded-lg text-gray-500">Impact</div>
                        <div className="px-3 py-2 rounded-lg text-gray-500">Settings</div>
                    </nav>
                </div>

                <button className="bg-sunset text-white py-3 rounded-lg font-bold">
                    + Post New Donation
                </button>
            </aside>

            {/* MAIN */}
            <main className="flex-1 p-10">
                {/* TOP */}
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold">Donor Impact Dashboard</h2>
                    <input
                        placeholder="Search donations..."
                        className="px-4 py-2 rounded-lg bg-white border"
                    />
                </div>

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

                {/* BOTTOM */}
                <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl border">
                        <h3 className="font-bold mb-4">Nearby Redistribution Partners</h3>
                        <p>City Food Bank — 0.8 miles</p>
                        <p>Community Shelter — 1.2 miles</p>
                    </div>

                    <div className="bg-darksage text-white p-6 rounded-xl">
                        <h3 className="font-bold mb-2">Health Standards Active</h3>
                        <p className="text-sm opacity-80 mb-4">
                            Maintain temperature logs for elite donor badge.
                        </p>
                        <button className="bg-sunset px-4 py-2 rounded-lg font-bold">
                            Download Certificate
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DonorDashboard;
