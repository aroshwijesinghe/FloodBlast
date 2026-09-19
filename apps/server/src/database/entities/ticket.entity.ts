import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { IncidentCategory, TicketStatus } from '@floodblast/shared-types';
import { Point, Polygon } from 'geojson';

@Entity('tickets')
export class TicketEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'enum', enum: IncidentCategory })
  category: IncidentCategory;

  @Index()
  @Column({ type: 'enum', enum: TicketStatus, default: TicketStatus.OPEN })
  status: TicketStatus;

  @Index({ spatial: true })
  @Column({ type: 'geometry', spatialFeatureType: 'Point', srid: 4326, nullable: true })
  centroid: Point;

  @Index({ spatial: true })
  @Column({ type: 'geometry', spatialFeatureType: 'Polygon', srid: 4326, nullable: true })
  area: Polygon;

  @Column({ type: 'varchar', length: 100, nullable: true })
  district: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  ds_division: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  gn_division: string;

  @Column({ type: 'int', default: 0 })
  total_affected_persons: number;

  @Column({ type: 'text', nullable: true })
  summary: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @Column({ type: 'timestamptz', nullable: true })
  closed_at: Date;

  @Index()
  @Column({ type: 'timestamptz', nullable: true })
  auto_expire_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
