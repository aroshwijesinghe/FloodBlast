import { IsEnum, IsOptional, IsString } from 'class-validator';
import { IncidentCategory, TicketStatus } from '@floodblast/shared-types';

export class QueryTicketsDto {
  @IsEnum(IncidentCategory)
  @IsOptional()
  category?: IncidentCategory;

  @IsEnum(TicketStatus)
  @IsOptional()
  status?: TicketStatus;

  @IsString()
  @IsOptional()
  district?: string;
}
