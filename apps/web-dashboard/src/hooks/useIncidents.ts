import { useQuery } from '@tanstack/react-query';
import { IncidentsService } from '../services/incidents.service';

export const useIncidents = (filters?: any) => {
  return useQuery({
    queryKey: ['incidents', filters],
    queryFn: () => IncidentsService.getAll(filters),
  });
};

export const useIncidentMarkers = (filters?: any) => {
  return useQuery({
    queryKey: ['incident-markers', filters],
    queryFn: () => IncidentsService.getMarkers(filters),
  });
};
