import React from 'react';
import { IncidentSeverity } from '../../types/enums';
import { clsx } from 'clsx';

export const SeverityBadge = ({ severity }: { severity: IncidentSeverity }) => {
  const colors = {
    [IncidentSeverity.LOW]: 'bg-blue-100 text-blue-800',
    [IncidentSeverity.MODERATE]: 'bg-yellow-100 text-yellow-800',
    [IncidentSeverity.HIGH]: 'bg-orange-100 text-orange-800',
    [IncidentSeverity.CRITICAL]: 'bg-red-100 text-red-800',
  };

  return (
    <span className={clsx('px-2.5 py-0.5 rounded-full text-xs font-medium', colors[severity])}>
      {severity}
    </span>
  );
};
