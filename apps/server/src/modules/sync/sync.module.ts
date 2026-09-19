import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SyncService } from './sync.service';
import { SyncController } from './sync.controller';
import { IncidentEntity } from '../../database/entities/incident.entity';
import { TicketEntity } from '../../database/entities/ticket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IncidentEntity, TicketEntity])],
  controllers: [SyncController],
  providers: [SyncService],
  exports: [SyncService],
})
export class SyncModule {}
