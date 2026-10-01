import { IsString, IsNumber, IsEnum, IsArray, IsOptional } from 'class-validator';
import { ShelterStatus } from '../entities/shelter.entity';

export class CreateShelterDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;

  @IsNumber()
  capacity: number;

  @IsEnum(ShelterStatus)
  @IsOptional()
  status?: ShelterStatus = ShelterStatus.ACTIVE;

  @IsString()
  contact: string;

  @IsString()
  phone: string;

  @IsString()
  responsiblePerson: string;

  @IsArray()
  @IsOptional()
  amenities?: string[];
}
