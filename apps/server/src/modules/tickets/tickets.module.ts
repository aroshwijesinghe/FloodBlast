import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { TicketEntity } from '../../database/entities/ticket.entity';
import { IncidentEntity } from '../../database/entities/incident.entity';
import { ActivityLogEntity } from '../../database/entities/activity-log.entity';
import { UserEntity } from '../../database/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TicketEntity, IncidentEntity, ActivityLogEntity, UserEntity]),
  ],
  controllers: [TicketsController],
  providers: [TicketsService],
  exports: [TicketsService],
})
export class TicketsModule {}
