import React from 'react';
import { CONSTANTS } from '../types/constants';
import { EmergencyNumberCard } from '../components/contacts/EmergencyNumberCard';
import { ContactsTable } from '../components/contacts/ContactsTable';

export const ContactsPage = () => {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">National Emergency Numbers</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {CONSTANTS.NATIONAL_EMERGENCY_NUMBERS.map((contact, i) => (
            <EmergencyNumberCard key={i} name={contact.name} phone={contact.phone} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Local Officials & Responders</h2>
        <ContactsTable />
      </div>
    </div>
  );
};
