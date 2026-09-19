import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { IncidentCategory, IncidentSeverity, IncidentStatus } from '@floodblast/shared-types';
import { Point, Polygon } from 'geojson';
import { UserEntity } from './user.entity';
import { TicketEntity } from './ticket.entity';

@Entity('incidents')
export class IncidentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'uuid' })
  reporter_id: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'reporter_id' })
  reporter: UserEntity;

  @Index()
  @Column({ type: 'uuid', nullable: true })
  ticket_id: string;

  @ManyToOne(() => TicketEntity)
  @JoinColumn({ name: 'ticket_id' })
  ticket: TicketEntity;

  @Index()
  @Column({ type: 'enum', enum: IncidentCategory })
  category: IncidentCategory;

  @Column({ type: 'varchar', length: 50, nullable: true })
  sub_type: string;

  @Column({ type: 'enum', enum: IncidentSeverity, default: IncidentSeverity.MEDIUM })
  severity: IncidentSeverity;

  @Index()
  @Column({ type: 'enum', enum: IncidentStatus, default: IncidentStatus.UNVERIFIED })
  status: IncidentStatus;

  @Index({ spatial: true })
  @Column({ type: 'geometry', spatialFeatureType: 'Point', srid: 4326 })
  location: Point;

  @Column({ type: 'geometry', spatialFeatureType: 'Polygon', srid: 4326, nullable: true })
  affected_area: Polygon;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'text', nullable: true })
  voice_transcript: string;

  @Column({ type: 'float', default: 0.0 })
  confidence_score: number;

  @Column({ type: 'varchar', length: 200, nullable: true })
  gn_division: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  ds_division: string;

  @Index()
  @Column({ type: 'varchar', length: 100, nullable: true })
  district: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  reporter_phone: string;

  @Column({ type: 'boolean', default: false })
  expose_contact: boolean;

  @Index()
  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @Column({ type: 'timestamptz', nullable: true })
  verified_at: Date;

  @Column({ type: 'timestamptz', nullable: true })
  closed_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
