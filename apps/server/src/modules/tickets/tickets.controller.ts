import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { QueryTicketsDto } from './dto/query-tickets.dto';
import { ClosureVoteDto } from './dto/closure-vote.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('tickets')
@UseGuards(JwtAuthGuard)
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get()
  findAll(@Query() query: QueryTicketsDto) {
    return this.ticketsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketsService.findOne(id);
  }

  @Patch(':id/request-closure')
  requestClosure(@Param('id') id: string, @CurrentUser() user: any) {
    return this.ticketsService.requestClosure(id, user.id);
  }

  @Post(':id/closure-vote')
  castVote(@Param('id') id: string, @CurrentUser() user: any, @Body() dto: ClosureVoteDto) {
    return this.ticketsService.castClosureVote(id, user.id, dto);
  }
}
