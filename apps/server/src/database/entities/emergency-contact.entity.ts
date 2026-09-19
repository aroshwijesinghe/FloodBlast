import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from 'typeorm';
import { OfficerType } from '@floodblast/shared-types';
import { Point } from 'geojson';

@Entity('emergency_contacts')
export class EmergencyContactEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  officer_name: string;

  @Column({ type: 'varchar', length: 255 })
  officer_title: string;

  @Column({ type: 'varchar', length: 20 })
  phone_number: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  secondary_phone: string;

  @Index()
  @Column({ type: 'enum', enum: OfficerType })
  officer_type: OfficerType;

  @Index()
  @Column({ type: 'varchar', length: 200, nullable: true })
  gn_division: string;

  @Index()
  @Column({ type: 'varchar', length: 200, nullable: true })
  ds_division: string;

  @Index()
  @Column({ type: 'varchar', length: 100, nullable: true })
  district: string;

  @Index({ spatial: true })
  @Column({ type: 'geometry', spatialFeatureType: 'Point', srid: 4326, nullable: true })
  office_location: Point;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
}
