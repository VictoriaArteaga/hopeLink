import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAffectedPersonDto } from './dto/create-affected-person.dto';
import { UpdateAffectedPersonDto } from './dto/update-affected-person.dto';
import { AffectedPerson } from './entities/affected-person.entity';

@Injectable()
export class AffectedPeopleService {
  constructor(
    @InjectRepository(AffectedPerson)
    private readonly affectedPeopleRepo: Repository<AffectedPerson>,
  ) {}

  async create(personData: CreateAffectedPersonDto) {
    const person = this.affectedPeopleRepo.create(personData);
    const savedPerson = await this.affectedPeopleRepo.save(person);

    return {
      message: 'Persona afectada registrada con éxito',
      data: savedPerson,
    };
  }

  async findAll(nivelVulnerabilidad?: string) {
    const people = await this.affectedPeopleRepo.find({
      where: nivelVulnerabilidad ? { nivelVulnerabilidad } : {},
      relations: { solicitudes: true },
    });

    return {
      message: 'Personas afectadas encontradas',
      data: people,
    };
  }

  async findOne(id: string) {
    const person = await this.affectedPeopleRepo.findOne({
      where: { id },
      relations: { solicitudes: true },
    });
    if (!person) {
      throw new NotFoundException(
        `Persona afectada con ID ${id} no encontrada`,
      );
    }
    return {
      message: 'Persona afectada encontrada',
      data: person,
    };
  }

  async update(id: string, changes: UpdateAffectedPersonDto) {
    if (Object.keys(changes).length === 0) {
      throw new BadRequestException('Debe enviar al menos un campo para actualizar');
    }

    const person = await this.affectedPeopleRepo.findOneBy({ id });
    if (!person) {
      throw new NotFoundException(
        `Persona afectada con ID ${id} no encontrada`,
      );
    }

    this.affectedPeopleRepo.merge(person, changes);
    const updatedPerson = await this.affectedPeopleRepo.save(person);
    return {
      message: 'Persona afectada actualizada con éxito',
      data: updatedPerson,
    };
  }

  async remove(id: string) {
    const person = await this.affectedPeopleRepo.findOneBy({ id });
    if (!person) {
      throw new NotFoundException(
        `Persona afectada con ID ${id} no encontrada`,
      );
    }

    await this.affectedPeopleRepo.remove(person);
    return { message: 'Persona afectada eliminada con éxito' };
  }
}
