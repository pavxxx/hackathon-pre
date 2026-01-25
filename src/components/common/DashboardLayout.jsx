import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
    return (
        <div style={{ padding: 40 }}>
            <h2>DASHBOARD LAYOUT 🧱</h2>
            <Outlet />
        </div>
    );
};

export default DashboardLayout;
