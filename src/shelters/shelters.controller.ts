import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { SheltersService } from './shelters.service';
import { CreateShelterDto } from './dto/create-shelter.dto';
import { UpdateShelterDto } from './dto/update-shelter.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('shelters')
@UseGuards(JwtAuthGuard)
export class SheltersController {
  constructor(private readonly sheltersService: SheltersService) {}

  @Get()
  findAll() {
    return this.sheltersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sheltersService.findOne(+id);
  }

  @Post()
  create(@Body() createShelterDto: CreateShelterDto) {
    return this.sheltersService.create(createShelterDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateShelterDto: UpdateShelterDto) {
    return this.sheltersService.update(+id, updateShelterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sheltersService.remove(+id);
  }

  @Get(':id/occupancy')
  getOccupancy(@Param('id') id: string) {
    return this.sheltersService.getOccupancy(+id);
  }
}
