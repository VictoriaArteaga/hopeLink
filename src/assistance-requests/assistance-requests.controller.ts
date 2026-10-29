import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { AssistanceRequestsService } from './assistance-requests.service';
import { CreateAssistanceRequestDto } from './dto/create-assistance-request.dto';
import { UpdateAssistanceRequestDto } from './dto/update-assistance-request.dto';
import { UpdateRequestStatusDto } from './dto/update-request-status.dto';

@Controller('assistance-requests')
export class AssistanceRequestsController {
  constructor(
    private readonly assistanceRequestsService: AssistanceRequestsService,
  ) {}

  @Post()
  create(@Body() createDto: CreateAssistanceRequestDto) {
    return this.assistanceRequestsService.create(createDto);
  }

  @Get()
  findAll() {
    return this.assistanceRequestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.assistanceRequestsService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateAssistanceRequestDto,
  ) {
    return this.assistanceRequestsService.update(id, updateDto);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() statusDto: UpdateRequestStatusDto,
  ) {
    return this.assistanceRequestsService.updateStatus(id, statusDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.assistanceRequestsService.remove(id);
  }
}
