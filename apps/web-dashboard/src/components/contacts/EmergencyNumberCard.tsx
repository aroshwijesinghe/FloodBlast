import React from 'react';
import { Phone } from 'lucide-react';

interface Props {
  name: string;
  phone: string;
}

export const EmergencyNumberCard = ({ name, phone }: Props) => {
  return (
    <a 
      href={`tel:${phone}`}
      className="flex items-center justify-between p-4 bg-red-50 border border-red-100 rounded-xl hover:bg-red-100 transition-colors"
    >
      <div>
        <h3 className="font-semibold text-red-900">{name}</h3>
        <p className="text-2xl font-bold text-red-600 tracking-wider mt-1">{phone}</p>
      </div>
      <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white shadow-md">
        <Phone className="w-6 h-6" />
      </div>
    </a>
  );
};
