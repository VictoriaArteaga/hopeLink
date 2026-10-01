import { IsNumber, IsString, IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateDeliveryDto {
  @IsNumber()
  assistanceRequestId: number;

  @IsNumber()
  affectedPersonId: number;

  @IsNumber()
  emergencyId: number;

  @IsNumber()
  @IsOptional()
  shelterId?: number;

  @IsNumber()
  quantity: number;

  @IsString()
  unit: string;

  @IsDate()
  @Type(() => Date)
  plannedDate: Date;

  @IsNumber()
  deliveredBy: number;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsNumber()
  @IsOptional()
  latitude?: number;

  @IsNumber()
  @IsOptional()
  longitude?: number;
}
