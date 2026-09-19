import { Controller, Get, Param, Query, ParseFloatPipe, UseGuards } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { OptionalAuthGuard } from '../auth/guards/optional-auth.guard';

@Controller('contacts')
@UseGuards(OptionalAuthGuard)
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Get()
  async getByLocation(
    @Query('lat', ParseFloatPipe) lat: number,
    @Query('lng', ParseFloatPipe) lng: number,
  ) {
    return this.contactsService.getContactsByLocation(lat, lng);
  }

  @Get('national')
  async getNational() {
    return this.contactsService.getNationalContacts();
  }

  @Get(':district')
  async getByDistrict(@Param('district') district: string) {
    return this.contactsService.getContactsByDistrict(district);
  }
}
