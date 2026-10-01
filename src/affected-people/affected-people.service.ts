import { Injectable } from '@nestjs/common';
import { CreateAffectedPersonDto } from './dto/create-affected-person.dto';
import { UpdateAffectedPersonDto } from './dto/update-affected-person.dto';

@Injectable()
export class AffectedPeopleService {
  private affectedPeople: any[] = [];

  create(createAffectedPersonDto: CreateAffectedPersonDto) {
    const person = {
      id: this.affectedPeople.length + 1,
      ...createAffectedPersonDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.affectedPeople.push(person);
    return person;
  }

  findAll() {
    return this.affectedPeople;
  }

  findOne(id: number) {
    return this.affectedPeople.find(person => person.id === id);
  }

  update(id: number, updateAffectedPersonDto: UpdateAffectedPersonDto) {
    const index = this.affectedPeople.findIndex(person => person.id === id);
    if (index >= 0) {
      this.affectedPeople[index] = {
        ...this.affectedPeople[index],
        ...updateAffectedPersonDto,
        updatedAt: new Date(),
      };
      return this.affectedPeople[index];
    }
    return null;
  }

  remove(id: number) {
    const index = this.affectedPeople.findIndex(person => person.id === id);
    if (index >= 0) {
      const person = this.affectedPeople.splice(index, 1);
      return person[0];
    }
    return null;
  }
}
