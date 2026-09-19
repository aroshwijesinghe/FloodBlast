import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { EmergencyContactEntity } from '../../database/entities/emergency-contact.entity';
import { GisModule } from '../gis/gis.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmergencyContactEntity]),
    GisModule,
  ],
  controllers: [ContactsController],
  providers: [ContactsService],
  exports: [ContactsService],
})
export class ContactsModule {}
