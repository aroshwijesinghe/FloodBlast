import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual } from 'typeorm';
import { IncidentEntity } from '../../database/entities/incident.entity';
import { TicketEntity } from '../../database/entities/ticket.entity';

@Injectable()
export class SyncService {
  constructor(
    @InjectRepository(IncidentEntity)
    private readonly incidentRepository: Repository<IncidentEntity>,
    @InjectRepository(TicketEntity)
    private readonly ticketRepository: Repository<TicketEntity>,
  ) {}

  async pullChanges(since: string, district?: string) {
    const timestamp = new Date(since);
    
    const incidentQuery: any = { updated_at: MoreThanOrEqual(timestamp) };
    if (district) incidentQuery.district = district;

    const ticketQuery: any = { updated_at: MoreThanOrEqual(timestamp) };
    if (district) ticketQuery.district = district;

    const [incidents, tickets] = await Promise.all([
      this.incidentRepository.find({ where: incidentQuery }),
      this.ticketRepository.find({ where: ticketQuery }),
    ]);

    return { incidents, tickets, serverTimestamp: new Date() };
  }

  async pushChanges(userId: string, data: any) {
    // Basic implementation for batch push
    // Real implementation would involve iterating and upserting data
    return { success: true, processedCount: data?.incidents?.length || 0 };
  }
}
