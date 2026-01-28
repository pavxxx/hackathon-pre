import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <header className="bg-white px-8 py-4 border-b flex justify-between">
            <h2 className="font-bold text-lg">Dashboard</h2>
            <button
                onClick={handleLogout}
                className="px-4 py-1.5 rounded-full
               bg-red-50 text-red-500
               hover:bg-red-100
               transition text-sm font-semibold"
            >
                Logout
            </button>

        </header>
    );
};

export default Navbar;
