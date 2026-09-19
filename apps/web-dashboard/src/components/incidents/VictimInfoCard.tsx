import React from 'react';
import { IVictimReport } from '../../types/interfaces';
import { Baby, Users, HeartPulse, PersonStanding } from 'lucide-react';

export const VictimInfoCard = ({ victims }: { victims: IVictimReport }) => {
  const stats = [
    { label: 'Children', count: victims.childCount, icon: Baby, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Elderly', count: victims.elderlyCount, icon: Users, color: 'text-orange-500', bg: 'bg-orange-50' },
    { label: 'Pregnant', count: victims.pregnantCount, icon: HeartPulse, color: 'text-pink-500', bg: 'bg-pink-50' },
    { label: 'Disabled', count: victims.disabledCount, icon: PersonStanding, color: 'text-purple-500', bg: 'bg-purple-50' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="font-semibold text-gray-900 mb-4">Vulnerable Populations</h3>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="flex items-center gap-4 p-3 rounded-lg border border-gray-50">
            <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{stat.count}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
