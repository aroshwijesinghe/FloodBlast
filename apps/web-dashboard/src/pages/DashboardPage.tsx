import React from 'react';
import { MapDashboard } from '../components/map/MapDashboard';

export const DashboardPage = () => {
  return (
    <div className="h-[calc(100vh-4rem)] w-full">
      <MapDashboard />
    </div>
  );
};
