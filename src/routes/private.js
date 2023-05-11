import { useContext } from 'react';
import { AuthGoogleContext } from '../contexts/authGoogle';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoutes = () => {
    const { user } = useContext(AuthGoogleContext);

    return user ? <Outlet /> : <Navigate to="/login" />;
};