import React from 'react';
import { useIncidents } from '../../hooks/useIncidents';
import { LoadingSpinner } from '../shared/LoadingSpinner';
import { EmptyState } from '../shared/EmptyState';
import { StatusBadge } from '../shared/StatusBadge';
import { SeverityBadge } from '../shared/SeverityBadge';
import { DisasterIcon } from '../shared/DisasterIcon';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

export const IncidentList = () => {
  const { data, isLoading } = useIncidents();

  if (isLoading) return <LoadingSpinner />;
  if (!data?.data?.length) return <EmptyState message="No incidents found" />;

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-600 text-sm">
            <tr>
              <th className="px-6 py-4 font-medium">Incident</th>
              <th className="px-6 py-4 font-medium">Location</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Severity</th>
              <th className="px-6 py-4 font-medium">Time</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.data.map((incident) => (
              <tr key={incident.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
                      <DisasterIcon category={incident.category} />
                    </div>
                    <span className="font-medium text-gray-900">{incident.title}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {incident.district}, {incident.dsDivision}
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={incident.status} />
                </td>
                <td className="px-6 py-4">
                  <SeverityBadge severity={incident.severity} />
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {format(new Date(incident.createdAt), 'MMM d, HH:mm')}
                </td>
                <td className="px-6 py-4 text-right">
                  <Link 
                    to={`/incidents/${incident.id}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
