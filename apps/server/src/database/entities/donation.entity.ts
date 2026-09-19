import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { DonationStatus } from '@floodblast/shared-types';
import { ReliefRequestEntity } from './relief-request.entity';
import { UserEntity } from './user.entity';

@Entity('donations')
export class DonationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'uuid' })
  relief_request_id: string;

  @ManyToOne(() => ReliefRequestEntity)
  @JoinColumn({ name: 'relief_request_id' })
  relief_request: ReliefRequestEntity;

  @Index()
  @Column({ type: 'uuid' })
  donor_id: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'donor_id' })
  donor: UserEntity;

  @Column({ type: 'int' })
  quantity_pledged: number;

  @Index()
  @Column({ type: 'enum', enum: DonationStatus, default: DonationStatus.PLEDGED })
  status: DonationStatus;

  @CreateDateColumn({ type: 'timestamptz' })
  pledged_at: Date;

  @Column({ type: 'timestamptz', nullable: true })
  delivered_at: Date;
}
