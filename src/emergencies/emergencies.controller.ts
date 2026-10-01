import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { EmergenciesService } from './emergencies.service';
import { CreateEmergencyDto } from './dto/create-emergency.dto';
import { UpdateEmergencyDto } from './dto/update-emergency.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('emergencies')
@UseGuards(JwtAuthGuard)
export class EmergenciesController {
  constructor(private readonly emergenciesService: EmergenciesService) {}

  @Get()
  findAll() {
    return this.emergenciesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.emergenciesService.findOne(+id);
  }

  @Post()
  create(@Body() createEmergencyDto: CreateEmergencyDto) {
    return this.emergenciesService.create(createEmergencyDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateEmergencyDto: UpdateEmergencyDto) {
    return this.emergenciesService.update(+id, updateEmergencyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.emergenciesService.remove(+id);
  }
}
