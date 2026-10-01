import { PartialType } from '@nestjs/mapped-types';
import { CreateDeliveryDto } from './create-delivery.dto';
import { IsEnum, IsOptional, IsString, IsDate } from 'class-validator';
import { DeliveryStatus } from '../entities/delivery.entity';
import { Type } from 'class-transformer';

export class UpdateDeliveryDto extends PartialType(CreateDeliveryDto) {
  @IsEnum(DeliveryStatus)
  @IsOptional()
  status?: DeliveryStatus;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  deliveredAt?: Date;

  @IsString()
  @IsOptional()
  receivedBy?: string;
}
