import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { VerificationVote } from '@floodblast/shared-types';

export class ClosureVoteDto {
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
