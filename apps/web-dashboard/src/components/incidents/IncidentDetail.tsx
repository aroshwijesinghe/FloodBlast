import React from 'react';
import { useIncidentDetail } from '../../hooks/useIncidentDetail';
import { LoadingSpinner } from '../shared/LoadingSpinner';
import { StatusBadge } from '../shared/StatusBadge';
import { SeverityBadge } from '../shared/SeverityBadge';
import { DisasterIcon } from '../shared/DisasterIcon';
import { VerificationBadge } from './VerificationBadge';
import { VictimInfoCard } from './VictimInfoCard';
import { format } from 'date-fns';
import { MapPin, Clock } from 'lucide-react';

export const IncidentDetail = ({ id }: { id: string }) => {
  const { data, isLoading } = useIncidentDetail(id);

  if (isLoading) return <LoadingSpinner />;
  if (!data?.data) return <div>Incident not found</div>;

  const incident = data.data;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
              <DisasterIcon category={incident.category} className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{incident.title}</h1>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-gray-500 text-sm">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {incident.district} > {incident.dsDivision} > {incident.gnDivision}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {format(new Date(incident.createdAt), 'MMM d, yyyy HH:mm')}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex gap-2">
              <StatusBadge status={incident.status} />
              <SeverityBadge severity={incident.severity} />
            </div>
            <VerificationBadge confirms={incident.confirmCount} denies={incident.denyCount} />
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
          <p className="text-gray-600 leading-relaxed">{incident.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {incident.victims && (
          <VictimInfoCard victims={incident.victims} />
        )}
        
        {/* Placeholder for Map mini-view */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-64 flex items-center justify-center bg-gray-50">
          <p className="text-gray-500">Map View (Location: {incident.location.lat}, {incident.location.lng})</p>
        </div>
      </div>
    </div>
  );
};
