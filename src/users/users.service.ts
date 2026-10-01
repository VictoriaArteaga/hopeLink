import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users: any[] = [];

  create(createUserDto: CreateUserDto) {
    // TODO: Implement user creation with database
    const user = {
      id: this.users.length + 1,
      ...createUserDto,
      createdAt: new Date(),
    };
    this.users.push(user);
    return user;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find(user => user.id === id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const index = this.users.findIndex(user => user.id === id);
    if (index >= 0) {
      this.users[index] = { ...this.users[index], ...updateUserDto };
      return this.users[index];
    }
    return null;
  }

  remove(id: number) {
    const index = this.users.findIndex(user => user.id === id);
    if (index >= 0) {
      const user = this.users.splice(index, 1);
      return user[0];
    }
    return null;
  }
}
