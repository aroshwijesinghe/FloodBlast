import React from 'react';
import { useWebSocket } from '../../hooks/useWebSocket';

export const ConnectionStatusBar = () => {
  const { isConnected } = useWebSocket();

  if (isConnected) return null;

  return (
    <div className="bg-yellow-500 text-white px-4 py-1 text-center text-sm font-medium">
      Connecting to real-time server...
    </div>
  );
};
