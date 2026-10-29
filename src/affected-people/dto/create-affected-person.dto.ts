import {
  IsInt,
  IsIn,
  IsNotEmpty,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateAffectedPersonDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsInt()
  @Min(0)
  @Max(120)
  edad: number;

  @IsString()
  @IsNotEmpty()
  direccion: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['bajo', 'medio', 'alto'])
  nivelVulnerabilidad: string;
}
