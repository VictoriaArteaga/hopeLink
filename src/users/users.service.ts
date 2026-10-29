import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  create(userData: CreateUserDto) {
    const correo = userData.correo.trim().toLowerCase();
    if (this.users.some((user) => user.correo === correo)) {
      throw new ConflictException('Ya existe un usuario con ese correo');
    }

    const user: User = { id: randomUUID(), ...userData, correo };
    this.users.push(user);
    return { message: 'Usuario creado con éxito', data: user };
  }

  findAll() {
    return { message: 'Usuarios encontrados', data: this.users };
  }

  findOne(id: string) {
    const user = this.users.find((item) => item.id === id);
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return { message: 'Usuario encontrado', data: user };
  }

  update(id: string, changes: UpdateUserDto) {
    if (Object.keys(changes).length === 0) {
      throw new BadRequestException(
        'Debe enviar al menos un campo para actualizar',
      );
    }

    const user = this.users.find((item) => item.id === id);
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    const correo = changes.correo?.trim().toLowerCase();
    if (
      correo &&
      this.users.some((item) => item.id !== id && item.correo === correo)
    ) {
      throw new ConflictException('Ya existe un usuario con ese correo');
    }

    Object.assign(user, changes, correo ? { correo } : {});
    return { message: 'Usuario actualizado con éxito', data: user };
  }

  remove(id: string) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    this.users.splice(index, 1);
    return { message: 'Usuario eliminado con éxito' };
  }
}
