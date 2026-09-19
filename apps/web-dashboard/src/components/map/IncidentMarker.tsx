import React from 'react';
import { AdvancedMarker } from '@vis.gl/react-google-maps';
import { IMapMarker } from '../../types/interfaces';
import { IncidentCategory } from '../../types/enums';

export const IncidentMarker = ({ marker, onClick }: { marker: IMapMarker, onClick: () => void }) => {
  const getMarkerColor = (category: IncidentCategory) => {
    switch (category) {
      case IncidentCategory.FLOOD: return '#3b82f6';
      case IncidentCategory.LANDSLIDE: return '#8b4513';
      case IncidentCategory.FIRE: return '#ef4444';
      case IncidentCategory.WIND: return '#64748b';
      default: return '#eab308';
    }
  };

  return (
    <AdvancedMarker
      position={{ lat: marker.location.lat, lng: marker.location.lng }}
      onClick={onClick}
    >
      <div 
        className="w-6 h-6 rounded-full border-2 border-white shadow-md flex items-center justify-center cursor-pointer transform hover:scale-110 transition-transform"
        style={{ backgroundColor: getMarkerColor(marker.category) }}
      />
    </AdvancedMarker>
  );
};
