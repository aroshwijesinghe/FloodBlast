import { io, Socket } from 'socket.io-client';

class WebSocketService {
  private socket: Socket | null = null;

  connect() {
    if (!this.socket) {
      this.socket = io(import.meta.env.VITE_WS_URL || 'http://localhost:3000', {
        autoConnect: true,
      });
    }
    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  getSocket() {
    return this.socket;
  }
}

export const wsService = new WebSocketService();
