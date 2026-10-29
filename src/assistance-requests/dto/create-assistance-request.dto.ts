import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { PriorityLevel } from '../enums/priority-level.enum';

export class CreateAssistanceRequestDto {
  @IsInt()
  @IsPositive()
  personaAfectadaId: number;

  @IsNotEmpty()
  @IsString()
  tipoAyuda: string;

  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @IsOptional()
  @IsEnum(PriorityLevel)
  prioridad?: PriorityLevel;
}
