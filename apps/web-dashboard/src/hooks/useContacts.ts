import { useQuery } from '@tanstack/react-query';
import { ContactsService } from '../services/contacts.service';

export const useContacts = (filters?: any) => {
  return useQuery({
    queryKey: ['contacts', filters],
    queryFn: () => ContactsService.getAll(filters),
  });
};
