import React from 'react';
import { Inbox } from 'lucide-react';

export const EmptyState = ({ message = 'No data available' }: { message?: string }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-gray-500">
      <Inbox className="w-12 h-12 mb-4 opacity-50" />
      <p className="text-lg font-medium">{message}</p>
    </div>
  );
};
