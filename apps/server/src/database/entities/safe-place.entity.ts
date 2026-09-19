import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { SafePlaceStatus, SafePlaceVerification } from '@floodblast/shared-types';
import { Point } from 'geojson';
import { TicketEntity } from './ticket.entity';
import { UserEntity } from './user.entity';

@Entity('safe_places')
export class SafePlaceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'uuid', nullable: true })
  ticket_id: string;

  @ManyToOne(() => TicketEntity)
  @JoinColumn({ name: 'ticket_id' })
  ticket: TicketEntity;

  @Column({ type: 'uuid' })
  added_by: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'added_by' })
  adder: UserEntity;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Index({ spatial: true })
  @Column({ type: 'geometry', spatialFeatureType: 'Point', srid: 4326 })
  location: Point;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ type: 'int', default: 0 })
  capacity: number;

  @Column({ type: 'int', default: 0 })
  current_occupancy: number;

  @Column({ type: 'text', nullable: true })
  facilities_description: string;

  @Index()
  @Column({ type: 'enum', enum: SafePlaceStatus, default: SafePlaceStatus.ACTIVE })
  status: SafePlaceStatus;

  @Column({ type: 'enum', enum: SafePlaceVerification, default: SafePlaceVerification.UNVERIFIED })
  verification_status: SafePlaceVerification;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
