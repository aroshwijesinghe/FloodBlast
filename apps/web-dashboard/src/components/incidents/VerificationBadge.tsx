import React from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

export const VerificationBadge = ({ confirms, denies }: { confirms: number, denies: number }) => {
  return (
    <div className="flex items-center gap-3 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
      <div className="flex items-center gap-1.5 text-green-600 font-medium text-sm">
        <ThumbsUp className="w-4 h-4" />
        {confirms}
      </div>
      <div className="w-px h-4 bg-gray-200"></div>
      <div className="flex items-center gap-1.5 text-red-600 font-medium text-sm">
        <ThumbsDown className="w-4 h-4" />
        {denies}
      </div>
    </div>
  );
};
