import { Controller, Get, Post, Body, Query, UseGuards, ParseFloatPipe } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { CreateVerificationDto } from './dto/create-verification.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('verification')
@UseGuards(JwtAuthGuard)
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}

  @Post()
  castVote(@CurrentUser() user: any, @Body() dto: CreateVerificationDto) {
    return this.verificationService.castVote(user.id, dto);
  }

  @Get('pending')
  getPending(
    @Query('lat', ParseFloatPipe) lat: number,
    @Query('lng', ParseFloatPipe) lng: number,
  ) {
    return this.verificationService.getPendingVerifications(lat, lng);
  }
}
