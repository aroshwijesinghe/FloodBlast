import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { SyncService } from './sync.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('sync')
@UseGuards(JwtAuthGuard)
export class SyncController {
  constructor(private readonly syncService: SyncService) {}

  @Get('pull')
  async pullChanges(
    @Query('since') since: string,
    @Query('district') district?: string,
  ) {
    return this.syncService.pullChanges(since, district);
  }

  @Post('push')
  async pushChanges(
    @CurrentUser() user: any,
    @Body() data: any,
  ) {
    return this.syncService.pushChanges(user.id, data);
  }
}
