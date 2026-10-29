import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAssistanceRequestDto } from './dto/create-assistance-request.dto';
import { UpdateAssistanceRequestDto } from './dto/update-assistance-request.dto';
import { UpdateRequestStatusDto } from './dto/update-request-status.dto';
import { AssistanceRequest } from './entities/assistance-request.entity';
import { PriorityLevel } from './enums/priority-level.enum';
import { RequestStatus } from './enums/request-status.enum';

@Injectable()
export class AssistanceRequestsService {
  private requests: AssistanceRequest[] = [];
  private nextId = 1;

  create(createDto: CreateAssistanceRequestDto) {
    const now = new Date();
    const newRequest: AssistanceRequest = {
      id: this.nextId++,
      personaAfectadaId: createDto.personaAfectadaId,
      tipoAyuda: createDto.tipoAyuda,
      descripcion: createDto.descripcion,
      prioridad: createDto.prioridad ?? PriorityLevel.MEDIA,
      estado: RequestStatus.PENDIENTE,
      fechaCreacion: now,
      fechaActualizacion: now,
    };
    this.requests.push(newRequest);
    return {
      message: 'Solicitud de asistencia creada con éxito',
      data: newRequest,
    };
  }

  findAll() {
    return {
      message: 'Solicitudes de asistencia encontradas',
      data: this.requests,
    };
  }

  findById(id: number) {
    return {
      message: 'Solicitud de asistencia encontrada',
      data: this.findOne(id),
    };
  }

  update(id: number, changes: UpdateAssistanceRequestDto) {
    
    const request = this.findOne(id);
    const { personaAfectadaId, tipoAyuda, descripcion, prioridad } = changes;
    
    request.personaAfectadaId = personaAfectadaId ?? request.personaAfectadaId;
    request.tipoAyuda = tipoAyuda ?? request.tipoAyuda;
    request.descripcion = descripcion ?? request.descripcion;
    request.prioridad = prioridad ?? request.prioridad;
    request.fechaActualizacion = new Date();
    return {
      message: 'Solicitud de asistencia actualizada con éxito',
      data: request,
    };
  }

  updateStatus(id: number, { estado }: UpdateRequestStatusDto) {
    const request = this.findOne(id);
    request.estado = estado;
    request.fechaActualizacion = new Date();
    return {
      message: 'Estado de la solicitud actualizado con éxito',
      data: request,
    };
  }

  remove(id: number) {
    const request = this.findOne(id);
    this.requests = this.requests.filter((item) => item.id !== request.id);
    return {
      message: 'Solicitud de asistencia eliminada con éxito',
    };
  }

  private findOne(id: number) {
    const request = this.requests.find((item) => item.id === id);
    if (!request) {
      throw new NotFoundException(
        `Solicitud de asistencia con ID ${id} no encontrada`,
      );
    }
    return request;
  }
}
