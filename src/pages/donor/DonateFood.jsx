import React, { useState } from "react";
import { calculateRiskScore } from "../../utils/riskCalculator";

const DonateFood = () => {
    const [preparedAt, setPreparedAt] = useState("");
    const [expiryHours, setExpiryHours] = useState("");

    const risk = calculateRiskScore({ preparedAt, expiryHours });

    return (
        <div className="p-8 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Donate Food</h1>

            <input
                type="datetime-local"
                className="w-full mb-4 border rounded p-2"
                onChange={(e) => setPreparedAt(e.target.value)}
            />

            <input
                type="number"
                placeholder="Expiry (hours)"
                className="w-full mb-4 border rounded p-2"
                onChange={(e) => setExpiryHours(e.target.value)}
            />

            <div
                className={`p-3 rounded font-bold ${risk.level === "LOW"
                        ? "bg-green-100 text-green-700"
                        : risk.level === "MEDIUM"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                    }`}
            >
                Risk Level: {risk.level}
            </div>
        </div>
    );
};

export default DonateFood;
