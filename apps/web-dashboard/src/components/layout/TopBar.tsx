import React from 'react';
import { Bell, User } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { ConnectionStatusBar } from '../shared/ConnectionStatusBar';

export const TopBar = () => {
  const { user } = useAuthStore();
  
  return (
    <div className="flex flex-col">
      <ConnectionStatusBar />
      <header className="h-16 bg-white border-b flex items-center justify-between px-6">
        <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
            <Bell className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium text-gray-700">
              {user?.name || 'Guest'}
            </span>
          </div>
        </div>
      </header>
    </div>
  );
};
