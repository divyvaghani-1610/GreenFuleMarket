import React, { useState } from "react";
import { FaUser } from "react-icons/fa";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Function to close sidebar
    const closeSidebar = () => setIsOpen(false);

    return (
        <div className="relative h-screen">
            {/* Profile Icon (Only visible when sidebar is closed) */}
            {!isOpen && (
                <button
                    className="absolute top-5 left-5 text-2xl z-50"
                    onClick={() => setIsOpen(true)}
                >
                    <FaUser />
                </button>
            )}

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-screen bg-gray-800 text-white w-64 transform ${
                    isOpen ? "translate-x-0" : "-translate-x-64"
                } transition-transform duration-300 ease-in-out z-40`}
            >
                <div className="flex items-center gap-3 p-5 border-b border-gray-700">
                    <FaUser className="text-white text-2xl" />
                    <span className="text-lg font-semibold">Profile</span>
                </div>

                <ul className="mt-5 space-y-2">
                    <li className="p-4 hover:bg-gray-700 cursor-pointer">Contact</li>
                    <li className="p-4 hover:bg-gray-700 cursor-pointer">Privacy Policy</li>
                    <li className="p-4 hover:bg-gray-700 cursor-pointer">Logout</li>
                </ul>
            </div>

            {/* Background Overlay (Click Outside to Close Sidebar) */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={closeSidebar}
                ></div>
            )}
        </div>
    );
};

export default Sidebar;