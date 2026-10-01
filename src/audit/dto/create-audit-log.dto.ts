import { IsNumber, IsString, IsEnum, IsOptional, IsObject } from 'class-validator';
import { AuditAction } from '../entities/audit-log.entity';

export class CreateAuditLogDto {
  @IsNumber()
  userId: number;

  @IsEnum(AuditAction)
  action: AuditAction;

  @IsString()
  entityType: string;

  @IsNumber()
  entityId: number;

  @IsObject()
  @IsOptional()
  changes?: Record<string, any>;

  @IsString()
  @IsOptional()
  details?: string;

  @IsString()
  @IsOptional()
  ipAddress?: string;

  @IsString()
  @IsOptional()
  userAgent?: string;
}
