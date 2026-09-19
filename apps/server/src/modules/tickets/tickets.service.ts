import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TicketEntity } from '../../database/entities/ticket.entity';
import { IncidentEntity } from '../../database/entities/incident.entity';
import { ActivityLogEntity } from '../../database/entities/activity-log.entity';
import { UserEntity } from '../../database/entities/user.entity';
import { QueryTicketsDto } from './dto/query-tickets.dto';
import { ClosureVoteDto } from './dto/closure-vote.dto';
import { TicketStatus, UserType, VerificationVote } from '@floodblast/shared-types';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(TicketEntity)
    private readonly ticketRepository: Repository<TicketEntity>,
    @InjectRepository(IncidentEntity)
    private readonly incidentRepository: Repository<IncidentEntity>,
    @InjectRepository(ActivityLogEntity)
    private readonly activityLogRepository: Repository<ActivityLogEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll(query: QueryTicketsDto): Promise<TicketEntity[]> {
    const qb = this.ticketRepository.createQueryBuilder('ticket');
    if (query.status) qb.andWhere('ticket.status = :status', { status: query.status });
    if (query.category) qb.andWhere('ticket.category = :category', { category: query.category });
    if (query.district) qb.andWhere('ticket.district = :district', { district: query.district });
    return qb.getMany();
  }

  async findOne(id: string): Promise<TicketEntity> {
    const ticket = await this.ticketRepository.findOne({ where: { id } });
    if (!ticket) throw new NotFoundException('Ticket not found');
    return ticket;
  }

  async requestClosure(id: string, userId: string): Promise<TicketEntity> {
    const ticket = await this.findOne(id);
    if (ticket.status === TicketStatus.CLOSED) throw new BadRequestException('Already closed');

    const user = await this.userRepository.findOne({ where: { id: userId } });
    
    // Trusted user instant close
    if (user?.user_type === UserType.TRUSTED || user?.user_type === UserType.ADMIN) {
      ticket.status = TicketStatus.CLOSED;
      ticket.closed_at = new Date();
    } else {
      ticket.status = TicketStatus.CLOSING_REQUESTED;
    }

    await this.ticketRepository.save(ticket);
    
    await this.activityLogRepository.save(
      this.activityLogRepository.create({
        ticket_id: id,
        user_id: userId,
        action: 'TICKET_CLOSURE_REQUEST',
        description: `Closure requested by user ${userId}`,
      })
    );

    return ticket;
  }

  async castClosureVote(id: string, userId: string, dto: ClosureVoteDto): Promise<any> {
    const ticket = await this.findOne(id);
    
    // Stub implementation: create the closure vote row and log activity
    // Would normally require checking proximity with ST_DWithin and tallying votes
    await this.activityLogRepository.save(
      this.activityLogRepository.create({
        ticket_id: id,
        user_id: userId,
        action: 'TICKET_CLOSURE_VOTE',
        description: `Voted to ${dto.vote} closure`,
        metadata: { vote: dto.vote },
      })
    );
    
    return { success: true, message: 'Vote casted successfully' };
  }
}
