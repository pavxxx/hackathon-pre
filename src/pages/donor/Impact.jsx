const Impact = () => {
    return (
        <div className="space-y-10">
            {/* PAGE TITLE */}
            <div>
                <h1 className="text-2xl font-bold text-[#3D405B]">
                    Your Impact
                </h1>
                <p className="text-sm text-[#81B29A] mt-1">
                    See how your donations are making a difference
                </p>
            </div>

            {/* IMPACT STATS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border">
                    <p className="text-sm font-bold text-[#81B29A]">
                        Total Meals Donated
                    </p>
                    <p className="text-3xl font-bold mt-2">1,240</p>
                </div>

                <div className="bg-white p-6 rounded-xl border">
                    <p className="text-sm font-bold text-[#81B29A]">
                        CO₂ Emissions Prevented
                    </p>
                    <p className="text-3xl font-bold mt-2">450 kg</p>
                </div>

                <div className="bg-white p-6 rounded-xl border">
                    <p className="text-sm font-bold text-[#81B29A]">
                        Food Waste Reduced
                    </p>
                    <p className="text-3xl font-bold mt-2">320 kg</p>
                </div>
            </div>

            {/* BADGES */}
            <div className="bg-white p-6 rounded-xl border">
                <h2 className="font-bold mb-4 text-[#3D405B]">
                    Your Badges
                </h2>

                <div className="flex gap-4 flex-wrap">
                    {[
                        { name: "Community Hero", desc: "100+ meals donated" },
                        { name: "Green Warrior", desc: "Reduced 300kg CO₂" },
                        { name: "Gold Donor", desc: "Top 5% contributors" },
                    ].map((badge, i) => (
                        <div
                            key={i}
                            className="border rounded-lg px-4 py-3 bg-[#F4F1DE]"
                        >
                            <p className="font-bold text-[#3D405B]">
                                {badge.name}
                            </p>
                            <p className="text-xs text-gray-500">
                                {badge.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* LEADERBOARD */}
            <div className="bg-white p-6 rounded-xl border">
                <h2 className="font-bold mb-4 text-[#3D405B]">
                    Top Donors This Month
                </h2>

                <table className="w-full text-left">
                    <thead>
                        <tr className="text-sm text-gray-500 border-b">
                            <th className="pb-2">Rank</th>
                            <th className="pb-2">Donor</th>
                            <th className="pb-2">Meals Saved</th>
                        </tr>
                    </thead>

                    <tbody>
                        {[
                            ["1", "Green Garden Bistro", "420"],
                            ["2", "Fresh Feast Cafe", "380"],
                            ["3", "Urban Eats", "310"],
                        ].map((row, i) => (
                            <tr key={i} className="border-b last:border-none">
                                <td className="py-3 font-bold">{row[0]}</td>
                                <td className="py-3">{row[1]}</td>
                                <td className="py-3">{row[2]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Impact;
