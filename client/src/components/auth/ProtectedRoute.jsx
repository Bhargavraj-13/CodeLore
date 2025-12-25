// To ensure that only authenticated users can access certain routes

import { Navigate } from "react-router-dom";
import {useAuth} from "./AuthContext.jsx";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="text-center text-white py-10">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;