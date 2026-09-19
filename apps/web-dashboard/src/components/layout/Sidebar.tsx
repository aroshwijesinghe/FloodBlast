import React from 'react';
import { NavLink } from 'react-router-dom';
import { Map, AlertTriangle, PhoneCall, Shield, Settings } from 'lucide-react';
import { clsx } from 'clsx';

export const Sidebar = () => {
  const links = [
    { to: '/', icon: Map, label: 'Map Dashboard' },
    { to: '/incidents', icon: AlertTriangle, label: 'Incidents' },
    { to: '/contacts', icon: PhoneCall, label: 'Emergency Contacts' },
    { to: '/safe-places', icon: Shield, label: 'Safe Places' },
    { to: '/admin', icon: Settings, label: 'Admin' },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col">
      <div className="h-16 flex items-center px-6 font-bold text-xl border-b border-gray-800">
        FloodBlast
      </div>
      <nav className="flex-1 px-4 py-4 space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => clsx(
              'flex items-center px-4 py-3 rounded-lg transition-colors',
              isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800'
            )}
          >
            <link.icon className="w-5 h-5 mr-3" />
            {link.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};
