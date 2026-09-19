import { IsEnum, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { VerificationVote } from '@floodblast/shared-types';

export class CreateVerificationDto {
  @IsUUID()
  @IsNotEmpty()
  incident_id: string;

  @IsEnum(VerificationVote)
  @IsNotEmpty()
  vote: VerificationVote;

  @IsNumber()
  @IsNotEmpty()
  longitude: number;

  @IsNumber()
  @IsNotEmpty()
  latitude: number;
}
