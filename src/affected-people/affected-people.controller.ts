import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { AffectedPeopleService } from './affected-people.service';
import { CreateAffectedPersonDto } from './dto/create-affected-person.dto';
import { UpdateAffectedPersonDto } from './dto/update-affected-person.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('affected-people')
@UseGuards(JwtAuthGuard)
export class AffectedPeopleController {
  constructor(private readonly affectedPeopleService: AffectedPeopleService) {}

  @Get()
  findAll() {
    return this.affectedPeopleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.affectedPeopleService.findOne(+id);
  }

  @Post()
  create(@Body() createAffectedPersonDto: CreateAffectedPersonDto) {
    return this.affectedPeopleService.create(createAffectedPersonDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateAffectedPersonDto: UpdateAffectedPersonDto,
  ) {
    return this.affectedPeopleService.update(+id, updateAffectedPersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.affectedPeopleService.remove(+id);
  }
}
