import { IsNumber, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateInventoryDto {
  @IsNumber()
  shelterId: number;

  @IsNumber()
  supplyId: number;

  @IsNumber()
  @Min(0)
  quantity: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  minThreshold?: number = 100;

  @IsOptional()
  @Type(() => Date)
  lastRestockDate?: Date;
}
