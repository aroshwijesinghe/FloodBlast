import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { UserType, TrustedRole } from '@floodblast/shared-types';
import { Point } from 'geojson';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'enum', enum: UserType, default: UserType.BASIC })
  user_type: UserType;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name: string;

  @Index()
  @Column({ type: 'varchar', length: 20, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  nic_number: string;

  @Column({ type: 'enum', enum: TrustedRole, nullable: true })
  trusted_role: TrustedRole;

  @Column({ type: 'varchar', length: 100, nullable: true })
  trusted_badge_id: string;

  @Index()
  @Column({ type: 'varchar', length: 255, nullable: true })
  device_id: string;

  @Index({ spatial: true })
  @Column({ type: 'geometry', spatialFeatureType: 'Point', srid: 4326, nullable: true })
  last_known_location: Point;

  @Column({ type: 'float', default: 0.0 })
  reputation_score: number;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'boolean', default: false })
  is_trusted_approved: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
