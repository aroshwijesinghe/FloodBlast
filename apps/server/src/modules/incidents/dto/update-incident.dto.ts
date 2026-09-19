import { IsEnum, IsOptional } from 'class-validator';
import { IncidentStatus } from '@floodblast/shared-types';

export class UpdateIncidentDto {
  @IsEnum(IncidentStatus)
  @IsOptional()
  status?: IncidentStatus;
}
