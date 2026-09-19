import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { VictimStatus } from '@floodblast/shared-types';
import { IncidentEntity } from './incident.entity';
import { UserEntity } from './user.entity';

@Entity('victim_reports')
export class VictimReportEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'uuid' })
  incident_id: string;

  @ManyToOne(() => IncidentEntity)
  @JoinColumn({ name: 'incident_id' })
  incident: IncidentEntity;

  @Column({ type: 'uuid' })
  reporter_id: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'reporter_id' })
  reporter: UserEntity;

  @Column({ type: 'int', default: 0 })
  pregnant_count: number;

  @Column({ type: 'int', default: 0 })
  medical_wounded_count: number;

  @Column({ type: 'int', default: 0 })
  elderly_count: number;

  @Column({ type: 'int', default: 0 })
  disabled_count: number;

  @Column({ type: 'int', default: 0 })
  children_count: number;

  @Column({ type: 'int', default: 0 })
  total_persons: number;

  @Column({ type: 'text', nullable: true })
  special_notes: string;

  @Column({ type: 'enum', enum: VictimStatus, default: VictimStatus.STRANDED })
  victim_status: VictimStatus;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
}
