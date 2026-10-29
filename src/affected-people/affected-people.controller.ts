import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateAffectedPersonDto } from './dto/create-affected-person.dto';
import { UpdateAffectedPersonDto } from './dto/update-affected-person.dto';
import { AffectedPeopleService } from './affected-people.service';

@Controller('affected-people')
export class AffectedPeopleController {
  constructor(private readonly affectedPeopleService: AffectedPeopleService) {}

  @Post()
  create(@Body() personData: CreateAffectedPersonDto) {
    return this.affectedPeopleService.create(personData);
  }

  @Get()
  findAll(@Query('nivelVulnerabilidad') nivelVulnerabilidad?: string) {
    return this.affectedPeopleService.findAll(nivelVulnerabilidad);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.affectedPeopleService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() changes: UpdateAffectedPersonDto,
  ) {
    return this.affectedPeopleService.update(id, changes);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.affectedPeopleService.remove(id);
  }
}
