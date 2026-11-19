import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';
import { ConfigService } from '@nestjs/config';

@WebSocketGateway({
  cors: {
    origin: process.env.CORS_ORIGIN?.split(',') ?? '*',
    credentials: true,
  },
  transports: ['websocket', 'polling'],
})
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger('EventsGateway');

  constructor(private readonly configService: ConfigService) {}

  // ── Attach Redis adapter so events work across multiple NestJS pods ────────
  async afterInit(server: Server) {
    const redisUrl = this.configService.get<string>('REDIS_URL', 'redis://localhost:6379');

    const pubClient = createClient({ url: redisUrl });
    const subClient = pubClient.duplicate();

    pubClient.on('error', (err) => this.logger.error('Redis pub error', err));
    subClient.on('error', (err) => this.logger.error('Redis sub error', err));

    await Promise.all([pubClient.connect(), subClient.connect()]);

    server.adapter(createAdapter(pubClient, subClient));
    this.logger.log('✅ socket.io-redis adapter connected — WebSocket rooms are multi-pod safe');
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  // ── District room management ───────────────────────────────────────────────

  @SubscribeMessage('joinDistrict')
  handleJoinDistrict(client: Socket, district: string) {
    client.join(`district:${district}`);
    this.logger.log(`Client ${client.id} joined district:${district}`);
    return { event: 'joined', data: `Joined district:${district}` };
  }

  @SubscribeMessage('leaveDistrict')
  handleLeaveDistrict(client: Socket, district: string) {
    client.leave(`district:${district}`);
    return { event: 'left', data: `Left district:${district}` };
  }

  // ── Broadcast helpers (called by other services) ──────────────────────────

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

  broadcastReliefUpdated(district: string, relief: any) {
    this.server.to(`district:${district}`).emit('relief:updated', relief);
  }

  broadcastSafePlaceUpdated(district: string, safePlace: any) {
    this.server.to(`district:${district}`).emit('safe-place:updated', safePlace);
  }

  broadcastRoadHazardNew(district: string, hazard: any) {
    this.server.to(`district:${district}`).emit('road-hazard:new', hazard);
  }

  broadcastAlert(district: string, alert: any) {
    this.server.to(`district:${district}`).emit('alert:broadcast', alert);
  }
}
