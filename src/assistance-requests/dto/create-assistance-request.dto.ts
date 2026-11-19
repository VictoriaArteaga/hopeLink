import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { PriorityLevel } from '../enums/priority-level.enum';

export class CreateAssistanceRequestDto {
  @IsUUID()
  personaAfectadaId: string;

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
