import React from 'react';
import { IncidentStatus } from '../../types/enums';
import { clsx } from 'clsx';

export const StatusBadge = ({ status }: { status: IncidentStatus }) => {
  const colors = {
    [IncidentStatus.UNVERIFIED]: 'bg-red-100 text-red-800 border-red-200',
    [IncidentStatus.VERIFIED]: 'bg-orange-100 text-orange-800 border-orange-200',
    [IncidentStatus.RESOLVED]: 'bg-green-100 text-green-800 border-green-200',
    [IncidentStatus.CLOSED]: 'bg-gray-100 text-gray-800 border-gray-200',
  };

  return (
    <span className={clsx('px-2.5 py-0.5 rounded-full text-xs font-medium border', colors[status])}>
      {status}
    </span>
  );
};
