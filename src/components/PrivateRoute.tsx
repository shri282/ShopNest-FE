import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/auth";
import LoadingOverlay from "../common/LoadingOverlay";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { authContextSelector } = useAuthContext();

  if (!authContextSelector.getUser()) {
    if (authContextSelector.isRehydrated()) {
      return <Navigate to="/login" replace />;
    }

    return <LoadingOverlay loading={true} />;
  }

  return <>{children}</>;
}
