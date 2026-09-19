import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VerificationEntity } from '../../database/entities/verification.entity';
import { IncidentEntity } from '../../database/entities/incident.entity';
import { UserEntity } from '../../database/entities/user.entity';
import { CreateVerificationDto } from './dto/create-verification.dto';
import { VerificationVote, IncidentStatus } from '@floodblast/shared-types';

@Injectable()
export class VerificationService {
  constructor(
    @InjectRepository(VerificationEntity)
    private readonly verificationRepository: Repository<VerificationEntity>,
    @InjectRepository(IncidentEntity)
    private readonly incidentRepository: Repository<IncidentEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async castVote(userId: string, dto: CreateVerificationDto): Promise<VerificationEntity> {
    const incident = await this.incidentRepository.findOne({ where: { id: dto.incident_id } });
    if (!incident) throw new NotFoundException('Incident not found');

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    // Simple proximity check using PostGIS
    const distanceQuery = await this.incidentRepository.query(
      `SELECT ST_Distance(
        location::geography,
        ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography
      ) as distance
      FROM incidents WHERE id = $3`,
      [dto.longitude, dto.latitude, incident.id]
    );

    const distance = distanceQuery[0]?.distance;
    if (distance > 500) {
      throw new BadRequestException('User is too far from the incident to verify it.');
    }

    const voterWeight = user.reputation_score > 0 ? user.reputation_score : 1;

    const verification = this.verificationRepository.create({
      incident_id: dto.incident_id,
      user_id: userId,
      vote: dto.vote,
      voter_location: { type: 'Point', coordinates: [dto.longitude, dto.latitude] },
      distance_to_incident: distance,
      voter_weight: voterWeight,
    });

    await this.verificationRepository.save(verification);

    // Update confidence score logic (stub implementation)
    const scoreDiff = dto.vote === VerificationVote.CONFIRM ? voterWeight : -voterWeight;
    incident.confidence_score += scoreDiff;
    
    if (incident.confidence_score > 10) {
      incident.status = IncidentStatus.VERIFIED;
      incident.verified_at = new Date();
    } else if (incident.confidence_score < -5) {
      incident.status = IncidentStatus.DISPUTED;
    }
    
    await this.incidentRepository.save(incident);

    return verification;
  }

  async getPendingVerifications(lat: number, lng: number): Promise<any[]> {
    return this.incidentRepository.query(
      `SELECT * FROM find_nearby_incidents($1, $2, 500)`,
      [lng, lat]
    );
  }
}
