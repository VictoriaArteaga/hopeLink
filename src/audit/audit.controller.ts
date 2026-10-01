import { Controller, Get, Param, UseGuards, Query } from '@nestjs/common';
import { AuditService } from './audit.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('audit')
@UseGuards(JwtAuthGuard)
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Get()
  findAll(
    @Query('userId') userId?: number,
    @Query('entityType') entityType?: string,
    @Query('action') action?: string,
  ) {
    return this.auditService.findAll(userId, entityType, action);
  }

  @Get('entity/:entityType/:entityId')
  getEntityHistory(
    @Param('entityType') entityType: string,
    @Param('entityId') entityId: string,
  ) {
    return this.auditService.getEntityHistory(entityType, +entityId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.auditService.findOne(+id);
  }
}
