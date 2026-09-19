import { Controller, Get, Post, Body, Patch, Param, Query, UseGuards, ParseFloatPipe } from '@nestjs/common';
import { IncidentsService } from './incidents.service';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { UpdateIncidentDto } from './dto/update-incident.dto';
import { QueryIncidentsDto } from './dto/query-incidents.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('incidents')
@UseGuards(JwtAuthGuard)
export class IncidentsController {
  constructor(private readonly incidentsService: IncidentsService) {}

  @Post()
  create(@CurrentUser() user: any, @Body() dto: CreateIncidentDto) {
    return this.incidentsService.create(user.id, dto);
  }

  @Get()
  findAll(@Query() query: QueryIncidentsDto) {
    return this.incidentsService.findAll(query);
  }

  @Get('nearby')
  findNearby(
    @Query('lat', ParseFloatPipe) lat: number,
    @Query('lng', ParseFloatPipe) lng: number,
    @Query('radius') radius: string,
  ) {
    const rad = radius ? parseInt(radius) : 500;
    return this.incidentsService.findNearby(lat, lng, rad);
  }

  @Get('clusters')
  findClusters(
    @Query('category') category: string,
    @Query('hours') hours?: string,
  ) {
    return this.incidentsService.findClusters(category, hours ? parseInt(hours) : 24);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.incidentsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateIncidentDto) {
    return this.incidentsService.update(id, dto);
  }
}
