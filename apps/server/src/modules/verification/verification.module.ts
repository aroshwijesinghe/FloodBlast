import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerificationService } from './verification.service';
import { VerificationController } from './verification.controller';
import { VerificationEntity } from '../../database/entities/verification.entity';
import { IncidentEntity } from '../../database/entities/incident.entity';
import { UserEntity } from '../../database/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VerificationEntity, IncidentEntity, UserEntity])],
  controllers: [VerificationController],
  providers: [VerificationService],
  exports: [VerificationService],
})
export class VerificationModule {}
