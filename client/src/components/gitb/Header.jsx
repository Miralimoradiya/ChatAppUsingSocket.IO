// Header.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Header = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/'); 
    };

    return (
        <header className="bg-gray-800 text-white p-5">
            <div className=" mx-auto flex items-center justify-between">
                <nav className="flex-1 flex justify-center space-x-4">
                    <Link to="/home" className="hover:text-gray-400">Home</Link>
                    <Link to="/products" className="hover:text-gray-400">Products</Link>
                    <Link to="/about" className="hover:text-gray-400">About</Link>
                </nav>
                <div>
                    {!isAuthenticated ? (
                        <Link to="/" className="hover:text-gray-400">Login</Link>
                    ) : (
                        <button onClick={handleLogout} className="hover:text-gray-400">Logout</button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;

