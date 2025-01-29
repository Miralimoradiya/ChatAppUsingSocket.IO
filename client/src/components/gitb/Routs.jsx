import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import Home from '../pages/Home';
import Login from '../pages/Login';

const PrivateRoute = ({ element: Element}) => {
    const { isAuthenticated } = useAuth();
    
    return isAuthenticated ? <Element /> : <Navigate to="/" />;
};

const Routs = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/home" element={<PrivateRoute element={Home} />} />

                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default Routs;