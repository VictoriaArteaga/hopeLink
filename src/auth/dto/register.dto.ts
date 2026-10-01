import { IsEmail, IsString, MinLength, IsEnum } from 'class-validator';

enum UserRole {
  ADMIN = 'ADMIN',
  OPERATOR = 'OPERATOR',
}

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEnum(UserRole)
  role: UserRole;
}
