import React from 'react';
import { IIncident } from '../../types/interfaces';
import { StatusBadge } from '../shared/StatusBadge';
import { SeverityBadge } from '../shared/SeverityBadge';
import { DisasterIcon } from '../shared/DisasterIcon';
import { Link } from 'react-router-dom';

export const IncidentSummaryCard = ({ incident, onClose }: { incident: IIncident, onClose: () => void }) => {
  return (
    <div className="absolute bottom-6 left-6 w-80 bg-white rounded-xl shadow-xl p-4 border border-gray-100">
      <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">×</button>
      
      <div className="flex items-start gap-3 mb-3">
        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
          <DisasterIcon category={incident.category} />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 line-clamp-1 pr-6">{incident.title}</h3>
          <p className="text-sm text-gray-500">{incident.district}</p>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <StatusBadge status={incident.status} />
        <SeverityBadge severity={incident.severity} />
      </div>

      <Link 
        to={`/incidents/${incident.id}`}
        className="block w-full py-2 text-center text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
      >
        View Details
      </Link>
    </div>
  );
};
