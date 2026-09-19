import { api } from './api';
import { IEmergencyContact, IApiResponse } from '../types/interfaces';

export const ContactsService = {
  getAll: async (filters?: any): Promise<IApiResponse<IEmergencyContact[]>> => {
    const response = await api.get('/contacts', { params: filters });
    return response.data;
  }
};
