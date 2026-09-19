import { api } from './api';
import { IUser, IApiResponse } from '../types/interfaces';

export const AuthService = {
  login: async (credentials: any): Promise<IApiResponse<{user: IUser, token: string}>> => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('token');
  }
};
