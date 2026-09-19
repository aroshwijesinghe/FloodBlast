import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { IncidentCategory, IncidentSeverity } from '@floodblast/shared-types';

export class CreateIncidentDto {
  @IsEnum(IncidentCategory)
  @IsNotEmpty()
  category: IncidentCategory;

  @IsEnum(IncidentSeverity)
  @IsOptional()
  severity?: IncidentSeverity;

  @IsString()
  @IsOptional()
  sub_type?: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  longitude: number;

  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @IsString()
  @IsOptional()
  reporter_phone?: string;

  @IsOptional()
  expose_contact?: boolean;
}
