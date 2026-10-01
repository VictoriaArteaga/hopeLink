import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateSupplyDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  unit: string;

  @IsString()
  category: string;

  @IsNumber()
  costPerUnit: number;

  @IsString()
  @IsOptional()
  supplierId?: string;
}
