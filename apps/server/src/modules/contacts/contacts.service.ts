import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmergencyContactEntity } from '../../database/entities/emergency-contact.entity';
import { GisService } from '../gis/gis.service';

const NATIONAL_EMERGENCY_NUMBERS = [
  { name: 'Police Emergency', number: '119' },
  { name: 'Ambulance', number: '1990' },
  { name: 'Disaster Management Centre (DMC)', number: '117' },
  { name: 'Fire & Rescue', number: '110' },
];

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(EmergencyContactEntity)
    private readonly contactRepository: Repository<EmergencyContactEntity>,
    private readonly gisService: GisService,
  ) {}

  async getNationalContacts() {
    return NATIONAL_EMERGENCY_NUMBERS;
  }

  async getContactsByDistrict(district: string): Promise<EmergencyContactEntity[]> {
    return this.contactRepository.find({
      where: { district, is_active: true },
    });
  }

  async getContactsByLocation(lat: number, lng: number): Promise<EmergencyContactEntity[]> {
    const adminLocation = await this.gisService.resolveLocation(lng, lat);
    if (!adminLocation) return [];

    const qb = this.contactRepository.createQueryBuilder('contact')
      .where('contact.is_active = :isActive', { isActive: true })
      .andWhere(
        '(contact.district = :district OR contact.ds_division = :ds OR contact.gn_division = :gn)',
        { 
          district: adminLocation.district,
          ds: adminLocation.ds_division,
          gn: adminLocation.gn_division
        }
      );

    return qb.getMany();
  }
}
