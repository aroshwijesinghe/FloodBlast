import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { TicketEntity } from './ticket.entity';
import { IncidentEntity } from './incident.entity';
import { UserEntity } from './user.entity';

@Entity('activity_log')
export class ActivityLogEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'uuid', nullable: true })
  ticket_id: string;

  @ManyToOne(() => TicketEntity)
  @JoinColumn({ name: 'ticket_id' })
  ticket: TicketEntity;

  @Index()
  @Column({ type: 'uuid', nullable: true })
  incident_id: string;

  @ManyToOne(() => IncidentEntity)
  @JoinColumn({ name: 'incident_id' })
  incident: IncidentEntity;

  @Column({ type: 'uuid', nullable: true })
  user_id: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ type: 'varchar', length: 100 })
  action: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any>;

  @Index()
  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
}
