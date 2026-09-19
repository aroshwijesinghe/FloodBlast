import React from 'react';
import { IncidentList } from '../components/incidents/IncidentList';

export const IncidentsPage = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Incidents</h1>
        <p className="text-gray-500">Manage and monitor reported incidents</p>
      </div>
      <IncidentList />
    </div>
  );
};
