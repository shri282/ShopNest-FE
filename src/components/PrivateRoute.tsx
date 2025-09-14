import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/auth';

interface PrivateRouteProps {
    children: React.ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
    const { authContextSelector } = useAuthContext();
    const isAuthenticated = authContextSelector.isAuthenticated();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}