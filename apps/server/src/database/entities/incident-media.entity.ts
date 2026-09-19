import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { MediaType, UploadPriority, UploadStatus } from '@floodblast/shared-types';
import { IncidentEntity } from './incident.entity';

@Entity('incident_media')
export class IncidentMediaEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'uuid' })
  incident_id: string;

  @ManyToOne(() => IncidentEntity)
  @JoinColumn({ name: 'incident_id' })
  incident: IncidentEntity;

  @Column({ type: 'enum', enum: MediaType })
  media_type: MediaType;

  @Column({ type: 'enum', enum: UploadPriority, default: UploadPriority.MEDIUM_3 })
  priority: UploadPriority;

  @Column({ type: 'text', nullable: true })
  storage_url: string;

  @Column({ type: 'text', nullable: true })
  thumbnail_url: string;

  @Index()
  @Column({ type: 'enum', enum: UploadStatus, default: UploadStatus.PENDING })
  upload_status: UploadStatus;

  @Column({ type: 'int', nullable: true })
  file_size_bytes: number;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
}
