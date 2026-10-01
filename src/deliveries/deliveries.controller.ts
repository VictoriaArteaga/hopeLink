import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Query } from '@nestjs/common';
import { DeliveriesService } from './deliveries.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('deliveries')
@UseGuards(JwtAuthGuard)
export class DeliveriesController {
  constructor(private readonly deliveriesService: DeliveriesService) {}

  @Get()
  findAll(@Query('status') status?: string, @Query('emergencyId') emergencyId?: number) {
    return this.deliveriesService.findAll(status, emergencyId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deliveriesService.findOne(+id);
  }

  @Post()
  create(@Body() createDeliveryDto: CreateDeliveryDto) {
    return this.deliveriesService.create(createDeliveryDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDeliveryDto: UpdateDeliveryDto) {
    return this.deliveriesService.update(+id, updateDeliveryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deliveriesService.remove(+id);
  }

  @Post(':id/confirm')
  confirmDelivery(@Param('id') id: string) {
    return this.deliveriesService.confirmDelivery(+id);
  }

  @Get('/stats/coverage')
  getCoverageStats(@Query('emergencyId') emergencyId?: number) {
    return this.deliveriesService.getCoverageStats(emergencyId);
  }
}
