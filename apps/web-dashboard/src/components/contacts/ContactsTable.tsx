import React from 'react';
import { useContacts } from '../../hooks/useContacts';
import { LoadingSpinner } from '../shared/LoadingSpinner';
import { EmptyState } from '../shared/EmptyState';
import { PhoneCall } from 'lucide-react';

export const ContactsTable = () => {
  const { data, isLoading } = useContacts();

  if (isLoading) return <LoadingSpinner />;
  if (!data?.data?.length) return <EmptyState message="No contacts found" />;

  return (
    <div className="bg-white rounded-lg shadow">
      <table className="w-full text-left">
        <thead className="bg-gray-50 text-gray-600 text-sm">
          <tr>
            <th className="px-6 py-4 font-medium">Name & Title</th>
            <th className="px-6 py-4 font-medium">Area</th>
            <th className="px-6 py-4 font-medium">Contact Number</th>
            <th className="px-6 py-4 font-medium text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.data.map((contact) => (
            <tr key={contact.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="font-medium text-gray-900">{contact.name}</div>
                <div className="text-sm text-gray-500">{contact.title}</div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {contact.district} {contact.dsDivision && `- ${contact.dsDivision}`}
              </td>
              <td className="px-6 py-4 font-medium text-gray-900">
                {contact.phone}
              </td>
              <td className="px-6 py-4 text-right">
                <a 
                  href={`tel:${contact.phone}`}
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                >
                  <PhoneCall className="w-4 h-4" />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
