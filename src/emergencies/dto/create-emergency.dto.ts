import { IsString, IsEnum, IsNumber, IsDate, IsOptional } from 'class-validator';
import { EmergencyType, EmergencyStatus } from '../entities/emergency.entity';
import { Type } from 'class-transformer';

export class CreateEmergencyDto {
  @IsString()
  name: string;

  @IsEnum(EmergencyType)
  type: EmergencyType;

  @IsString()
  description: string;

  @IsEnum(EmergencyStatus)
  @IsOptional()
  status?: EmergencyStatus = EmergencyStatus.ACTIVE;

  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  endDate?: Date;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;

  @IsString()
  affectedArea: string;

  @IsNumber()
  estimatedAffectedPopulation: number;
}
