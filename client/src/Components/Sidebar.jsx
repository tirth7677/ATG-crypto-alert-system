import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white fixed">
      <h2 className="text-2xl font-bold text-center py-6 border-b border-gray-700">Crypto Monitor</h2>
      <nav className="mt-4">
        <ul>
          <li className="px-6 py-4 hover:bg-gray-700">
            <Link to="/" className="block">Home</Link>
          </li>
          <li className="px-6 py-4 hover:bg-gray-700">
            <Link to="/set-alerts" className="block">Set Alerts</Link>
          </li>
          <li className="px-6 py-4 hover:bg-gray-700">
            <Link to="/active-alerts" className="block">View All Active Alerts</Link>
          </li>
          <li className="px-6 py-4 hover:bg-gray-700">
            <Link to="/complete-alerts" className="block">View All Complete Alerts</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
