import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Rol } from '../enums/rol.enum';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  telefono: string;

  @IsNotEmpty()
  @IsEmail()
  correo: string;

  @IsNotEmpty()
  @IsEnum(Rol)
  rol: Rol;

  @IsNotEmpty()
  @IsString()
  documentoIdentidad: string;
}
