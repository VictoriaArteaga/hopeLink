import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAssistanceRequestDto } from './dto/create-assistance-request.dto';
import { UpdateAssistanceRequestDto } from './dto/update-assistance-request.dto';
import { UpdateRequestStatusDto } from './dto/update-request-status.dto';
import { AssistanceRequest } from './entities/assistance-request.entity';
import { PriorityLevel } from './enums/priority-level.enum';
import { RequestStatus } from './enums/request-status.enum';

@Injectable()
export class AssistanceRequestsService {
  constructor(
    @InjectRepository(AssistanceRequest)
    private readonly requestsRepo: Repository<AssistanceRequest>,
  ) {}

  async create(createDto: CreateAssistanceRequestDto) {
    const newRequest = this.requestsRepo.create({
      personaAfectadaId: createDto.personaAfectadaId,
      registradoPorId: createDto.registradoPorId ?? null,
      tipoAyuda: createDto.tipoAyuda,
      descripcion: createDto.descripcion,
      prioridad: createDto.prioridad ?? PriorityLevel.MEDIA,
      estado: RequestStatus.PENDIENTE,
    });
    const saved = await this.requestsRepo.save(newRequest);
    return {
      message: 'Solicitud de asistencia creada con éxito',
      data: saved,
    };
  }

  async findAll() {
    return {
      message: 'Solicitudes de asistencia encontradas',
      data: await this.requestsRepo.find(),
    };
  }

  async findById(id: number) {
    return {
      message: 'Solicitud de asistencia encontrada',
      data: await this.findOne(id),
    };
  }

  async update(id: number, changes: UpdateAssistanceRequestDto) {
    const request = await this.findOne(id);
    const {
      personaAfectadaId,
      registradoPorId,
      tipoAyuda,
      descripcion,
      prioridad,
    } = changes;

    request.personaAfectadaId = personaAfectadaId ?? request.personaAfectadaId;
    request.registradoPorId = registradoPorId ?? request.registradoPorId;
    request.tipoAyuda = tipoAyuda ?? request.tipoAyuda;
    request.descripcion = descripcion ?? request.descripcion;
    request.prioridad = prioridad ?? request.prioridad;

    const saved = await this.requestsRepo.save(request);
    return {
      message: 'Solicitud de asistencia actualizada con éxito',
      data: saved,
    };
  }

  async updateStatus(id: number, { estado }: UpdateRequestStatusDto) {
    const request = await this.findOne(id);
    request.estado = estado;
    const saved = await this.requestsRepo.save(request);
    return {
      message: 'Estado de la solicitud actualizado con éxito',
      data: saved,
    };
  }

  async remove(id: number) {
    const request = await this.findOne(id);
    await this.requestsRepo.remove(request);
    return {
      message: 'Solicitud de asistencia eliminada con éxito',
    };
  }

  private async findOne(id: number) {
    const request = await this.requestsRepo.findOneBy({ id });
    if (!request) {
      throw new NotFoundException(
        `Solicitud de asistencia con ID ${id} no encontrada`,
      );
    }
    return request;
  }
}
