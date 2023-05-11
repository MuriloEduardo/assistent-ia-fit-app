import Home from '../pages/Home';
import Login from '../pages/Login';
import Logged from '../pages/user/Logged';
import { PrivateRoutes } from './private';
import { Route, Routes } from 'react-router-dom';

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<PrivateRoutes />}>
                <Route path="/" element={<Home />} />
                <Route path="/auth/user" element={<Logged />} />
            </Route>
        </Routes>
    );
};