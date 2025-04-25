// LogoutBtn.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

// Import your auth actions (adjust path as needed)
// import { logout } from '../store/authSlice';

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Uncomment and adjust when you have your auth actions set up
    // dispatch(logout());
    console.log('User logged out');
    navigate('/');
  };

  return (
    <button
      className="px-4 py-2 rounded-full border-2 border-dark font-semibold text-dark hover:bg-dark hover:text-white transition-colors inline-flex items-center gap-2"
      onClick={handleLogout}
    >
      <LogOut size={18} />
      <span>Logout</span>
    </button>
  );
};

export default LogoutBtn;