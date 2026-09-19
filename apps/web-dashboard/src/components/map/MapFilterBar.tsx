import React from 'react';
import { IncidentCategory } from '../../types/enums';

export const MapFilterBar = () => {
  return (
    <div className="absolute top-4 left-4 right-4 z-10 flex gap-2 overflow-x-auto bg-white/90 backdrop-blur p-3 rounded-lg shadow-sm">
      <button className="px-4 py-1.5 rounded-full text-sm font-medium bg-gray-900 text-white">
        All
      </button>
      {Object.values(IncidentCategory).map((cat) => (
        <button key={cat} className="px-4 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200">
          {cat}
        </button>
      ))}
    </div>
  );
};
