import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { VerificationVote } from '@floodblast/shared-types';
import { Point } from 'geojson';
import { IncidentEntity } from './incident.entity';
import { UserEntity } from './user.entity';

@Entity('verifications')
@Index(['incident_id', 'user_id'], { unique: true })
export class VerificationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'uuid' })
  incident_id: string;

  @ManyToOne(() => IncidentEntity)
  @JoinColumn({ name: 'incident_id' })
  incident: IncidentEntity;

  @Index()
  @Column({ type: 'uuid' })
  user_id: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ type: 'enum', enum: VerificationVote })
  vote: VerificationVote;

  @Column({ type: 'geometry', spatialFeatureType: 'Point', srid: 4326 })
  voter_location: Point;

  @Column({ type: 'float' })
  distance_to_incident: number;

  @Column({ type: 'float' })
  voter_weight: number;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
}
