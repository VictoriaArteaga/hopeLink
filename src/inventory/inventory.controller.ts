import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Query } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { RecordMovementDto } from './dto/record-movement.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('inventory')
@UseGuards(JwtAuthGuard)
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  findAll(@Query('shelterId') shelterId?: number) {
    return this.inventoryService.findAll(shelterId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inventoryService.findOne(+id);
  }

  @Post()
  create(@Body() createInventoryDto: CreateInventoryDto) {
    return this.inventoryService.create(createInventoryDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateInventoryDto: UpdateInventoryDto) {
    return this.inventoryService.update(+id, updateInventoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inventoryService.remove(+id);
  }

  @Post(':id/movements')
  recordMovement(
    @Param('id') id: string,
    @Body() recordMovementDto: RecordMovementDto,
  ) {
    return this.inventoryService.recordMovement(+id, recordMovementDto);
  }

  @Get(':id/movements')
  getMovements(@Param('id') id: string) {
    return this.inventoryService.getMovements(+id);
  }
}
