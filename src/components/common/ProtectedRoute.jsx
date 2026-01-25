import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children, allowedRole }) => {
    const { user } = useAuth();

    // IMPORTANT: wait until user is resolved
    if (user === undefined) {
        return null;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRole && user.role !== allowedRole) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
