import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { SuppliesService } from './supplies.service';
import { CreateSupplyDto } from './dto/create-supply.dto';
import { UpdateSupplyDto } from './dto/update-supply.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('supplies')
@UseGuards(JwtAuthGuard)
export class SuppliesController {
  constructor(private readonly suppliesService: SuppliesService) {}

  @Get()
  findAll() {
    return this.suppliesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.suppliesService.findOne(+id);
  }

  @Post()
  create(@Body() createSupplyDto: CreateSupplyDto) {
    return this.suppliesService.create(createSupplyDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateSupplyDto: UpdateSupplyDto) {
    return this.suppliesService.update(+id, updateSupplyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.suppliesService.remove(+id);
  }
}
