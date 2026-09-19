import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ cors: { origin: '*' } })
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  
  private logger: Logger = new Logger('EventsGateway');

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinDistrict')
  handleJoinDistrict(client: Socket, district: string) {
    client.join(`district:${district}`);
    return { event: 'joined', data: `Joined district:${district}` };
  }

  @SubscribeMessage('leaveDistrict')
  handleLeaveDistrict(client: Socket, district: string) {
    client.leave(`district:${district}`);
    return { event: 'left', data: `Left district:${district}` };
  }

  broadcastIncidentNew(district: string, incident: any) {
    this.server.to(`district:${district}`).emit('incident:new', incident);
  }

  broadcastIncidentVerified(district: string, incident: any) {
    this.server.to(`district:${district}`).emit('incident:verified', incident);
  }

  broadcastIncidentUpdated(district: string, incident: any) {
    this.server.to(`district:${district}`).emit('incident:updated', incident);
  }

  broadcastTicketUpdated(district: string, ticket: any) {
    this.server.to(`district:${district}`).emit('ticket:updated', ticket);
  }
}
