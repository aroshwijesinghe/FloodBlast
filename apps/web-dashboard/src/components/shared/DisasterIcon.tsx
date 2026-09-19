import React from 'react';
import { Waves, Mountain, Wind, Flame, AlertCircle } from 'lucide-react';
import { IncidentCategory } from '../../types/enums';

export const DisasterIcon = ({ category, className = 'w-5 h-5' }: { category: IncidentCategory, className?: string }) => {
  switch (category) {
    case IncidentCategory.FLOOD: return <Waves className={className} />;
    case IncidentCategory.LANDSLIDE: return <Mountain className={className} />;
    case IncidentCategory.WIND: return <Wind className={className} />;
    case IncidentCategory.FIRE: return <Flame className={className} />;
    default: return <AlertCircle className={className} />;
  }
};
