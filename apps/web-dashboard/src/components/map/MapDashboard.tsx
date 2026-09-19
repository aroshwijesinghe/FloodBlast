import React, { useState } from 'react';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { useMapStore } from '../../store/mapStore';
import { useIncidentMarkers } from '../../hooks/useIncidents';
import { IncidentMarker } from './IncidentMarker';
import { IncidentSummaryCard } from './IncidentSummaryCard';
import { MapFilterBar } from './MapFilterBar';
import { LoadingSpinner } from '../shared/LoadingSpinner';

export const MapDashboard = () => {
  const { center, zoom, setCenter, setZoom } = useMapStore();
  const { data: markersResponse, isLoading } = useIncidentMarkers();
  const [selectedIncident, setSelectedIncident] = useState<any>(null);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="relative w-full h-full">
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY || ''}>
        <MapFilterBar />
        <Map
          defaultCenter={center}
          defaultZoom={zoom}
          onCenterChanged={(e: any) => setCenter(e.detail.center)}
          onZoomChanged={(e: any) => setZoom(e.detail.zoom)}
          mapId="DEMO_MAP_ID"
          disableDefaultUI={true}
        >
          {markersResponse?.data?.map((marker) => (
            <IncidentMarker 
              key={marker.id} 
              marker={marker}
              onClick={() => setSelectedIncident(marker)}
            />
          ))}
        </Map>
        
        {selectedIncident && (
          <IncidentSummaryCard 
            incident={selectedIncident} 
            onClose={() => setSelectedIncident(null)} 
          />
        )}
      </APIProvider>
    </div>
  );
};
