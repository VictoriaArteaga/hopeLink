import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, Query } from '@nestjs/common';
import { AssistanceRequestsService } from './assistance-requests.service';
import { CreateAssistanceRequestDto } from './dto/create-assistance-request.dto';
import { UpdateAssistanceRequestDto } from './dto/update-assistance-request.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('assistance-requests')
@UseGuards(JwtAuthGuard)
export class AssistanceRequestsController {
  constructor(private readonly assistanceRequestsService: AssistanceRequestsService) {}

  @Get()
  findAll(@Query('emergencyId') emergencyId?: number, @Query('status') status?: string) {
    return this.assistanceRequestsService.findAll(emergencyId, status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assistanceRequestsService.findOne(+id);
  }

  @Post()
  create(@Body() createAssistanceRequestDto: CreateAssistanceRequestDto) {
    return this.assistanceRequestsService.create(createAssistanceRequestDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateAssistanceRequestDto: UpdateAssistanceRequestDto,
  ) {
    return this.assistanceRequestsService.update(+id, updateAssistanceRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assistanceRequestsService.remove(+id);
  }

  @Get('priority/list')
  findByPriority(@Query('priority') priority: string) {
    return this.assistanceRequestsService.findByPriority(priority);
  }
}
