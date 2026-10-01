import { IsString, IsNumber, IsEnum, IsOptional, Min, Max } from 'class-validator';
import { AssistanceNeedType } from '../entities/assistance-request.entity';

export class CreateAssistanceRequestDto {
  @IsNumber()
  affectedPersonId: number;

  @IsNumber()
  emergencyId: number;

  @IsEnum(AssistanceNeedType)
  needType: AssistanceNeedType;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsString()
  unit: string;

  @IsNumber()
  @Min(1)
  @Max(10)
  severity: number;

  @IsString()
  @IsOptional()
  description?: string;
}
