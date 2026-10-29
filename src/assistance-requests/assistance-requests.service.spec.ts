import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AssistanceRequestsService } from './assistance-requests.service';
import { CreateAssistanceRequestDto } from './dto/create-assistance-request.dto';
import { PriorityLevel } from './enums/priority-level.enum';
import { RequestStatus } from './enums/request-status.enum';

describe('AssistanceRequestsService', () => {
  let service: AssistanceRequestsService;

  const createDto: CreateAssistanceRequestDto = {
    personaAfectadaId: 7,
    tipoAyuda: 'Alimentos',
    descripcion: 'Familia sin acceso a alimentos',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssistanceRequestsService],
    }).compile();

    service = module.get<AssistanceRequestsService>(AssistanceRequestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('crea una solicitud PENDIENTE con prioridad MEDIA por defecto', () => {
      const { message, data } = service.create(createDto);

      expect(message).toBe('Solicitud de asistencia creada con éxito');
      expect(data).toMatchObject({
        id: 1,
        ...createDto,
        prioridad: PriorityLevel.MEDIA,
        estado: RequestStatus.PENDIENTE,
      });
    });

    it('respeta la prioridad enviada y autoincrementa el ID', () => {
      service.create(createDto);
      const { data } = service.create({
        ...createDto,
        prioridad: PriorityLevel.CRITICA,
      });

      expect(data.id).toBe(2);
      expect(data.prioridad).toBe(PriorityLevel.CRITICA);
    });
  });

  describe('findAll', () => {
    it('devuelve una lista vacía al inicio', () => {
      expect(service.findAll().data).toEqual([]);
    });

    it('devuelve las solicitudes creadas', () => {
      service.create(createDto);
      service.create(createDto);

      expect(service.findAll().data).toHaveLength(2);
    });
  });

  describe('findById', () => {
    it('devuelve la solicitud existente', () => {
      service.create(createDto);

      expect(service.findById(1).data.tipoAyuda).toBe('Alimentos');
    });

    it('lanza NotFoundException si no existe', () => {
      expect(() => service.findById(99)).toThrow(NotFoundException);
      expect(() => service.findById(99)).toThrow(
        'Solicitud de asistencia con ID 99 no encontrada',
      );
    });
  });

  describe('update', () => {
    it('actualiza solo los campos enviados', () => {
      service.create(createDto);

      const { data } = service.update(1, { descripcion: 'Nueva descripción' });

      expect(data.descripcion).toBe('Nueva descripción');
      expect(data.tipoAyuda).toBe('Alimentos');
      expect(data.estado).toBe(RequestStatus.PENDIENTE);
    });

    it('ignora campos que no pertenecen al DTO', () => {
      service.create(createDto);

      const { data } = service.update(1, {
        id: 50,
        estado: RequestStatus.ATENDIDA,
      } as any);

      expect(data.id).toBe(1);
      expect(data.estado).toBe(RequestStatus.PENDIENTE);
    });

    it('no sobrescribe tipoAyuda ni personaAfectadaId con null', () => {
      service.create(createDto);

      const { data } = service.update(1, {
        tipoAyuda: null,
        personaAfectadaId: null,
      } as any);

      expect(data.tipoAyuda).toBe('Alimentos');
      expect(data.personaAfectadaId).toBe(7);
    });

    it('con null en unos campos actualiza los demás campos válidos', () => {
      service.create(createDto);

      const { data } = service.update(1, {
        tipoAyuda: null,
        personaAfectadaId: null,
        descripcion: 'Nueva descripción',
        prioridad: PriorityLevel.ALTA,
      } as any);

      expect(data.tipoAyuda).toBe('Alimentos');
      expect(data.personaAfectadaId).toBe(7);
      expect(data.descripcion).toBe('Nueva descripción');
      expect(data.prioridad).toBe(PriorityLevel.ALTA);
    });

    it('lanza NotFoundException si no existe', () => {
      expect(() => service.update(99, { tipoAyuda: 'Agua' })).toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateStatus', () => {
    it('cambia el estado de la solicitud', () => {
      service.create(createDto);

      const { data } = service.updateStatus(1, {
        estado: RequestStatus.EN_PROCESO,
      });

      expect(data.estado).toBe(RequestStatus.EN_PROCESO);
    });

    it('lanza NotFoundException si no existe', () => {
      expect(() =>
        service.updateStatus(99, { estado: RequestStatus.CANCELADA }),
      ).toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('elimina la solicitud', () => {
      service.create(createDto);

      const { message } = service.remove(1);

      expect(message).toBe('Solicitud de asistencia eliminada con éxito');
      expect(service.findAll().data).toHaveLength(0);
    });

    it('no reutiliza el ID de una solicitud eliminada', () => {
      service.create(createDto);
      service.remove(1);

      expect(service.create(createDto).data.id).toBe(2);
    });

    it('lanza NotFoundException si no existe', () => {
      expect(() => service.remove(99)).toThrow(NotFoundException);
    });
  });
});
