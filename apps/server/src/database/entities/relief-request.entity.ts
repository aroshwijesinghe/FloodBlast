import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { ReliefRequestType, MealType, ReliefRequestStatus } from '@floodblast/shared-types';
import { Point } from 'geojson';
import { TicketEntity } from './ticket.entity';
import { UserEntity } from './user.entity';

@Entity('relief_requests')
export class ReliefRequestEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'uuid' })
  ticket_id: string;

  @ManyToOne(() => TicketEntity)
  @JoinColumn({ name: 'ticket_id' })
  ticket: TicketEntity;

  @Column({ type: 'uuid' })
  requester_id: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'requester_id' })
  requester: UserEntity;

  @Index()
  @Column({ type: 'enum', enum: ReliefRequestType })
  request_type: ReliefRequestType;

  @Column({ type: 'int' })
  quantity_needed: number;

  @Column({ type: 'int', default: 0 })
  quantity_fulfilled: number;

  @Column({ type: 'enum', enum: MealType, nullable: true })
  meal_type: MealType;

  @Index()
  @Column({ type: 'enum', enum: ReliefRequestStatus, default: ReliefRequestStatus.OPEN })
  status: ReliefRequestStatus;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'geometry', spatialFeatureType: 'Point', srid: 4326, nullable: true })
  delivery_location: Point;

  @Column({ type: 'timestamptz', nullable: true })
  deadline: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
