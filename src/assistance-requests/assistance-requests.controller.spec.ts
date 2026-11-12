import { Test, TestingModule } from '@nestjs/testing';
import { AssistanceRequestsController } from './assistance-requests.controller';
import { AssistanceRequestsService } from './assistance-requests.service';
import { CreateAssistanceRequestDto } from './dto/create-assistance-request.dto';
import { RequestStatus } from './enums/request-status.enum';

describe('AssistanceRequestsController', () => {
  let controller: AssistanceRequestsController;

  const serviceMock = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    updateStatus: jest.fn(),
    remove: jest.fn(),
  };

  const createDto: CreateAssistanceRequestDto = {
    personaAfectadaId: 7,
    tipoAyuda: 'Alimentos',
    descripcion: 'Familia sin acceso a alimentos',
  };

  beforeEach(async () => {
    jest.resetAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssistanceRequestsController],
      providers: [
        { provide: AssistanceRequestsService, useValue: serviceMock },
      ],
    }).compile();

    controller = module.get<AssistanceRequestsController>(
      AssistanceRequestsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create delega en el servicio', async () => {
    const expected = { message: 'ok', data: { id: 1 } };
    serviceMock.create.mockResolvedValue(expected);

    await expect(controller.create(createDto)).resolves.toBe(expected);
    expect(serviceMock.create).toHaveBeenCalledWith(createDto);
  });

  it('findAll delega en el servicio', async () => {
    const expected = { message: 'ok', data: [{ id: 1 }] };
    serviceMock.findAll.mockResolvedValue(expected);

    await expect(controller.findAll()).resolves.toBe(expected);
    expect(serviceMock.findAll).toHaveBeenCalled();
  });

  it('findOne delega en el servicio', async () => {
    const expected = { message: 'ok', data: { id: 1 } };
    serviceMock.findById.mockResolvedValue(expected);

    await expect(controller.findOne(1)).resolves.toBe(expected);
    expect(serviceMock.findById).toHaveBeenCalledWith(1);
  });

  it('update delega en el servicio', async () => {
    const expected = { message: 'ok', data: { id: 1, tipoAyuda: 'Agua' } };
    serviceMock.update.mockResolvedValue(expected);

    await expect(controller.update(1, { tipoAyuda: 'Agua' })).resolves.toBe(
      expected,
    );
    expect(serviceMock.update).toHaveBeenCalledWith(1, { tipoAyuda: 'Agua' });
  });

  it('updateStatus delega en el servicio', async () => {
    const expected = { message: 'ok', data: { id: 1 } };
    serviceMock.updateStatus.mockResolvedValue(expected);

    await expect(
      controller.updateStatus(1, { estado: RequestStatus.ATENDIDA }),
    ).resolves.toBe(expected);
    expect(serviceMock.updateStatus).toHaveBeenCalledWith(1, {
      estado: RequestStatus.ATENDIDA,
    });
  });

  it('remove delega en el servicio', async () => {
    const expected = { message: 'ok' };
    serviceMock.remove.mockResolvedValue(expected);

    await expect(controller.remove(1)).resolves.toBe(expected);
    expect(serviceMock.remove).toHaveBeenCalledWith(1);
  });
});
