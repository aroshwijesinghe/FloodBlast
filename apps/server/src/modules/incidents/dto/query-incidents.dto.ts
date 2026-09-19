import { IsEnum, IsNumberString, IsOptional, IsString } from 'class-validator';
import { IncidentCategory, IncidentStatus } from '@floodblast/shared-types';

export class QueryIncidentsDto {
  @IsEnum(IncidentCategory)
  @IsOptional()
  category?: IncidentCategory;

  @IsEnum(IncidentStatus)
  @IsOptional()
  status?: IncidentStatus;

  @IsString()
  @IsOptional()
  district?: string;

  @IsNumberString()
  @IsOptional()
  minLat?: string;

  @IsNumberString()
  @IsOptional()
  maxLat?: string;

  @IsNumberString()
  @IsOptional()
  minLng?: string;

  @IsNumberString()
  @IsOptional()
  maxLng?: string;
}
