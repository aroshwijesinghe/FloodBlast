import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IncidentEntity } from '../../database/entities/incident.entity';
import { GisService } from '../gis/gis.service';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { UpdateIncidentDto } from './dto/update-incident.dto';
import { QueryIncidentsDto } from './dto/query-incidents.dto';

@Injectable()
export class IncidentsService {
  constructor(
    @InjectRepository(IncidentEntity)
    private readonly incidentRepository: Repository<IncidentEntity>,
    private readonly gisService: GisService,
  ) {}

  async create(reporterId: string, dto: CreateIncidentDto): Promise<IncidentEntity> {
    const adminLocation = await this.gisService.resolveLocation(dto.longitude, dto.latitude);
    const point = {
      type: 'Point',
      coordinates: [dto.longitude, dto.latitude],
    };

    const incident = this.incidentRepository.create({
      ...dto,
      reporter_id: reporterId,
      location: point as any,
      gn_division: adminLocation?.gn_division,
      ds_division: adminLocation?.ds_division,
      district: adminLocation?.district,
    });

    return this.incidentRepository.save(incident);
  }

  async findAll(query: QueryIncidentsDto): Promise<IncidentEntity[]> {
    const qb = this.incidentRepository.createQueryBuilder('incident');

    if (query.category) {
      qb.andWhere('incident.category = :category', { category: query.category });
    }
    if (query.status) {
      qb.andWhere('incident.status = :status', { status: query.status });
    }
    if (query.district) {
      qb.andWhere('incident.district = :district', { district: query.district });
    }

    if (query.minLat && query.maxLat && query.minLng && query.maxLng) {
      qb.andWhere(
        `ST_Intersects(incident.location, ST_MakeEnvelope(:minLng, :minLat, :maxLng, :maxLat, 4326))`
      ).setParameters({
        minLng: parseFloat(query.minLng),
        minLat: parseFloat(query.minLat),
        maxLng: parseFloat(query.maxLng),
        maxLat: parseFloat(query.maxLat),
      });
    }

    return qb.getMany();
  }

  async findOne(id: string): Promise<IncidentEntity> {
    const incident = await this.incidentRepository.findOne({
      where: { id },
      relations: ['reporter'],
    });
    if (!incident) throw new NotFoundException('Incident not found');
    return incident;
  }

  async findNearby(lat: number, lng: number, radius: number): Promise<any[]> {
    const result = await this.incidentRepository.query(
      `SELECT * FROM find_nearby_incidents($1, $2, $3)`,
      [lng, lat, radius]
    );
    return result;
  }

  async findClusters(category: string, hours: number = 24): Promise<any[]> {
    const result = await this.incidentRepository.query(
      `SELECT * FROM cluster_incidents($1, $2)`,
      [category, hours]
    );
    return result;
  }

  async update(id: string, dto: UpdateIncidentDto): Promise<IncidentEntity> {
    const incident = await this.findOne(id);
    if (dto.status) {
      incident.status = dto.status;
    }
    return this.incidentRepository.save(incident);
  }
}
