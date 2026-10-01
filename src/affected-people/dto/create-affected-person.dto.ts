import { IsString, IsNumber, IsBoolean, IsOptional, IsEmail, Min } from 'class-validator';

export class CreateAffectedPersonDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  idNumber: string;

  @IsNumber()
  @Min(0)
  age: number;

  @IsString()
  gender: string;

  @IsNumber()
  @Min(1)
  familySize: number;

  @IsBoolean()
  hasDisability: boolean;

  @IsString()
  @IsOptional()
  disabilityType?: string;

  @IsNumber()
  @Min(0)
  monthlyIncome: number;

  @IsString()
  address: string;

  @IsString()
  phone: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsNumber()
  emergencyId: number;

  @IsNumber()
  @IsOptional()
  shelterId?: number;

  @IsNumber()
  @IsOptional()
  latitude?: number;

  @IsNumber()
  @IsOptional()
  longitude?: number;

  @IsNumber()
  registeredBy: number;
}
