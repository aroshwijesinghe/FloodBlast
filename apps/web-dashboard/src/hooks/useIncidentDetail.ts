import { useQuery } from '@tanstack/react-query';
import { IncidentsService } from '../services/incidents.service';

export const useIncidentDetail = (id: string) => {
  return useQuery({
    queryKey: ['incident', id],
    queryFn: () => IncidentsService.getById(id),
    enabled: !!id,
  });
};
