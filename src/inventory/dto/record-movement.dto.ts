import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { MovementType, MovementReason } from '../entities/inventory-movement.entity';

export class RecordMovementDto {
  @IsEnum(MovementType)
  type: MovementType;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsEnum(MovementReason)
  reason: MovementReason;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  authorizedBy?: number;
}
