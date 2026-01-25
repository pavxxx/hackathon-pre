import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopHeader from "./TopHeader";

const DashboardLayout = () => {
    return (
        <div className="flex min-h-screen bg-[#F4F1DE]">
            <Sidebar />

            <div className="flex-1 flex flex-col">
                <TopHeader />

                <main className="p-8 max-w-[1200px] mx-auto w-full">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
