import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { CreateAffectedPersonDto } from './dto/create-affected-person.dto';
import { UpdateAffectedPersonDto } from './dto/update-affected-person.dto';

export interface AffectedPerson extends CreateAffectedPersonDto {
  id: string;
}

@Injectable()
export class AffectedPeopleService {
  private readonly affectedPeople: AffectedPerson[] = [];

  create(personData: CreateAffectedPersonDto) {
    const person: AffectedPerson = { id: randomUUID(), ...personData };
    this.affectedPeople.push(person);

    return {
      message: 'Persona afectada registrada con éxito',
      data: person,
    };
  }

  findAll(nivelVulnerabilidad?: string) {
    const people = nivelVulnerabilidad
      ? this.affectedPeople.filter(
          (person) => person.nivelVulnerabilidad === nivelVulnerabilidad,
        )
      : this.affectedPeople;

    return {
      message: 'Personas afectadas encontradas',
      data: people,
    };
  }

  findOne(id: string) {
    const person = this.affectedPeople.find((item) => item.id === id);
    if (!person) {
      throw new NotFoundException(
        `Persona afectada con ID ${id} no encontrada`,
      );
    }
    return person;
  }

  update(id: string, changes: UpdateAffectedPersonDto) {
    if (Object.keys(changes).length === 0) {
      throw new BadRequestException('Debe enviar al menos un campo para actualizar');
    }

    const person = this.findOne(id);
    Object.assign(person, changes);
    return {
      message: 'Persona afectada actualizada con éxito',
      data: person,
    };
  }

  remove(id: string) {
    const index = this.affectedPeople.findIndex((person) => person.id === id);
    if (index === -1) {
      throw new NotFoundException(
        `Persona afectada con ID ${id} no encontrada`,
      );
    }
    this.affectedPeople.splice(index, 1);
    return { message: 'Persona afectada eliminada con éxito' };
  }
}
