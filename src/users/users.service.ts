import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async create(userData: CreateUserDto) {
    const correo = userData.correo.trim().toLowerCase();
    if (await this.usersRepo.existsBy({ correo })) {
      throw new ConflictException('Ya existe un usuario con ese correo');
    }
    if (
      await this.usersRepo.existsBy({
        documentoIdentidad: userData.documentoIdentidad,
      })
    ) {
      throw new ConflictException('Ya existe un usuario con ese documento');
    }

    const user = await this.usersRepo.save(
      this.usersRepo.create({ ...userData, correo }),
    );
    return { message: 'Usuario creado con éxito', data: user };
  }

  async findAll() {
    return {
      message: 'Usuarios encontrados',
      data: await this.usersRepo.find(),
    };
  }

  async findOne(id: string) {
    return { message: 'Usuario encontrado', data: await this.getById(id) };
  }

  async update(id: string, changes: UpdateUserDto) {
    if (Object.keys(changes).length === 0) {
      throw new BadRequestException(
        'Debe enviar al menos un campo para actualizar',
      );
    }

    const user = await this.getById(id);

    if (
      changes.documentoIdentidad &&
      changes.documentoIdentidad !== user.documentoIdentidad &&
      (await this.usersRepo.existsBy({
        documentoIdentidad: changes.documentoIdentidad,
      }))
    ) {
      throw new ConflictException('Ya existe un usuario con ese documento');
    }

    const correo = changes.correo?.trim().toLowerCase();
    if (correo && correo !== user.correo) {
      if (await this.usersRepo.existsBy({ correo })) {
        throw new ConflictException('Ya existe un usuario con ese correo');
      }
    }

    Object.assign(user, changes, correo ? { correo } : {});
    const saved = await this.usersRepo.save(user);
    return { message: 'Usuario actualizado con éxito', data: saved };
  }

  async remove(id: string) {
    const user = await this.getById(id);
    await this.usersRepo.remove(user);
    return { message: 'Usuario eliminado con éxito' };
  }

  private async getById(id: string) {
    const user = await this.usersRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return user;
  }
}
