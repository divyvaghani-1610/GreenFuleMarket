import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen, handleLogout }) => {
  const navigate = useNavigate();

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? '' : 'hidden'}`}>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsOpen(false)} />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-64 bg-white shadow-lg">
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Profile</h2>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={() => {
                navigate('/marketplace');
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md"
            >
              Marketplace
            </button>
            
            <button
              onClick={() => {
                navigate('/cart');
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md"
            >
              Cart
            </button>
            
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-md"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;