import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { IncidentDetail } from '../components/incidents/IncidentDetail';
import { ArrowLeft } from 'lucide-react';

export const IncidentDetailPage = () => {
  const { id } = useParams();

  if (!id) return null;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <Link to="/incidents" className="inline-flex items-center text-gray-500 hover:text-gray-800 mb-6 font-medium">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Incidents
      </Link>
      <IncidentDetail id={id} />
    </div>
  );
};
