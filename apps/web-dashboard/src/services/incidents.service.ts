import { api } from './api';
import { IIncident, IApiResponse, IMapMarker } from '../types/interfaces';

export const IncidentsService = {
  getAll: async (filters?: any): Promise<IApiResponse<IIncident[]>> => {
    const response = await api.get('/incidents', { params: filters });
    return response.data;
  },
  getById: async (id: string): Promise<IApiResponse<IIncident>> => {
    const response = await api.get(`/incidents/${id}`);
    return response.data;
  },
  getMarkers: async (filters?: any): Promise<IApiResponse<IMapMarker[]>> => {
    const response = await api.get('/incidents/markers', { params: filters });
    return response.data;
  }
};
