import { useLocation } from "react-router-dom";

const TopHeader = () => {
    const { pathname } = useLocation();

    let title = "";
    let subtitle = "";

    if (pathname.startsWith("/donor")) {
        title = "Donor Impact Dashboard";
        subtitle = "Track your contributions and impact";
    } else if (pathname.startsWith("/recipient")) {
        title = "Recipient Dashboard";
        subtitle = "Browse and request surplus food";
    } else if (pathname.startsWith("/volunteer")) {
        title = "Volunteer Dashboard";
        subtitle = "Pickup and drop-off assignments";
    }

    return (
        <header className="flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur border-b">
            <div>
                <h2 className="text-xl font-bold text-[#3D405B]">
                    {title}
                </h2>
                <p className="text-xs text-[#81B29A] mt-1">
                    {subtitle}
                </p>
            </div>

            <div className="flex items-center gap-4">
                <div className="text-right">
                    <p className="text-sm font-bold">Green Garden Bistro</p>
                    <p className="text-xs text-[#81B29A]">Verified User</p>
                </div>

                <div className="w-10 h-10 rounded-full bg-[#81B29A] flex items-center justify-center text-white font-bold">
                    G
                </div>
            </div>
        </header>
    );
};

export default TopHeader;
