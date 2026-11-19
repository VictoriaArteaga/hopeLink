import { NotFoundException } from '@nestjs/common';
import { jest } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AssistanceRequestsService } from './assistance-requests.service';
import { CreateAssistanceRequestDto } from './dto/create-assistance-request.dto';
import { AssistanceRequest } from './entities/assistance-request.entity';
import { PriorityLevel } from './enums/priority-level.enum';
import { RequestStatus } from './enums/request-status.enum';

/** Repositorio falso en memoria que imita lo que usa el servicio. */
function createFakeRepo() {
  let store: AssistanceRequest[] = [];
  let nextId = 1;

  return {
    create: jest.fn((data: Partial<AssistanceRequest>) => ({ ...data })),
    save: jest.fn(async (entity: AssistanceRequest) => {
      const now = new Date();
      if (!entity.id) {
        entity.id = nextId++;
        entity.fechaCreacion = now;
        store.push(entity);
      }
      entity.fechaActualizacion = now;
      return entity;
    }),
    find: jest.fn(async () => [...store]),
    findOneBy: jest.fn(
      async ({ id }: { id: number }) =>
        store.find((item) => item.id === id) ?? null,
    ),
    remove: jest.fn(async (entity: AssistanceRequest) => {
      store = store.filter((item) => item.id !== entity.id);
      return entity;
    }),
  };
}

describe('AssistanceRequestsService', () => {
  let service: AssistanceRequestsService;

  const createDto: CreateAssistanceRequestDto = {
    personaAfectadaId: '9166296c-bb61-4e05-bf08-9293e3504693',
    tipoAyuda: 'Alimentos',
    descripcion: 'Familia sin acceso a alimentos',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssistanceRequestsService,
        {
          provide: getRepositoryToken(AssistanceRequest),
          useValue: createFakeRepo(),
        },
      ],
    }).compile();

    service = module.get<AssistanceRequestsService>(AssistanceRequestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('crea una solicitud PENDIENTE con prioridad MEDIA por defecto', async () => {
      const { message, data } = await service.create(createDto);

      expect(message).toBe('Solicitud de asistencia creada con éxito');
      expect(data).toMatchObject({
        id: 1,
        ...createDto,
        prioridad: PriorityLevel.MEDIA,
        estado: RequestStatus.PENDIENTE,
      });
    });

    it('respeta la prioridad enviada y autoincrementa el ID', async () => {
      await service.create(createDto);
      const { data } = await service.create({
        ...createDto,
        prioridad: PriorityLevel.CRITICA,
      });

      expect(data.id).toBe(2);
      expect(data.prioridad).toBe(PriorityLevel.CRITICA);
    });
  });

  describe('findAll', () => {
    it('devuelve una lista vacía al inicio', async () => {
      expect((await service.findAll()).data).toEqual([]);
    });

    it('devuelve las solicitudes creadas', async () => {
      await service.create(createDto);
      await service.create(createDto);

      expect((await service.findAll()).data).toHaveLength(2);
    });
  });

  describe('findById', () => {
    it('devuelve la solicitud existente', async () => {
      await service.create(createDto);

      expect((await service.findById(1)).data.tipoAyuda).toBe('Alimentos');
    });

    it('lanza NotFoundException si no existe', async () => {
      await expect(service.findById(99)).rejects.toThrow(NotFoundException);
      await expect(service.findById(99)).rejects.toThrow(
        'Solicitud de asistencia con ID 99 no encontrada',
      );
    });
  });

  describe('update', () => {
    it('actualiza solo los campos enviados', async () => {
      await service.create(createDto);

      const { data } = await service.update(1, {
        descripcion: 'Nueva descripción',
      });

      expect(data.descripcion).toBe('Nueva descripción');
      expect(data.tipoAyuda).toBe('Alimentos');
      expect(data.estado).toBe(RequestStatus.PENDIENTE);
    });

    it('ignora campos que no pertenecen al DTO', async () => {
      await service.create(createDto);

      const { data } = await service.update(1, {
        id: 50,
        estado: RequestStatus.ATENDIDA,
      } as any);

      expect(data.id).toBe(1);
      expect(data.estado).toBe(RequestStatus.PENDIENTE);
    });

    it('no sobrescribe tipoAyuda ni personaAfectadaId con null', async () => {
      await service.create(createDto);

      const { data } = await service.update(1, {
        tipoAyuda: null,
        personaAfectadaId: null,
      } as any);

      expect(data.tipoAyuda).toBe('Alimentos');
      expect(data.personaAfectadaId).toBe(createDto.personaAfectadaId);
    });

    it('con null en unos campos actualiza los demás campos válidos', async () => {
      await service.create(createDto);

      const { data } = await service.update(1, {
        tipoAyuda: null,
        personaAfectadaId: null,
        descripcion: 'Nueva descripción',
        prioridad: PriorityLevel.ALTA,
      } as any);

      expect(data.tipoAyuda).toBe('Alimentos');
      expect(data.personaAfectadaId).toBe(createDto.personaAfectadaId);
      expect(data.descripcion).toBe('Nueva descripción');
      expect(data.prioridad).toBe(PriorityLevel.ALTA);
    });

    it('lanza NotFoundException si no existe', async () => {
      await expect(service.update(99, { tipoAyuda: 'Agua' })).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateStatus', () => {
    it('cambia el estado de la solicitud', async () => {
      await service.create(createDto);

      const { data } = await service.updateStatus(1, {
        estado: RequestStatus.EN_PROCESO,
      });

      expect(data.estado).toBe(RequestStatus.EN_PROCESO);
    });

    it('lanza NotFoundException si no existe', async () => {
      await expect(
        service.updateStatus(99, { estado: RequestStatus.CANCELADA }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('elimina la solicitud', async () => {
      await service.create(createDto);

      const { message } = await service.remove(1);

      expect(message).toBe('Solicitud de asistencia eliminada con éxito');
      expect((await service.findAll()).data).toHaveLength(0);
    });

    it('no reutiliza el ID de una solicitud eliminada', async () => {
      await service.create(createDto);
      await service.remove(1);

      expect((await service.create(createDto)).data.id).toBe(2);
    });

    it('lanza NotFoundException si no existe', async () => {
      await expect(service.remove(99)).rejects.toThrow(NotFoundException);
    });
  });
});
