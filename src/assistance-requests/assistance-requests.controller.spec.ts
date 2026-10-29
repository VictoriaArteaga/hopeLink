import { Test, TestingModule } from '@nestjs/testing';
import { AssistanceRequestsController } from './assistance-requests.controller';
import { AssistanceRequestsService } from './assistance-requests.service';
import { CreateAssistanceRequestDto } from './dto/create-assistance-request.dto';
import { RequestStatus } from './enums/request-status.enum';

describe('AssistanceRequestsController', () => {
  let controller: AssistanceRequestsController;
  let service: AssistanceRequestsService;

  const createDto: CreateAssistanceRequestDto = {
    personaAfectadaId: 7,
    tipoAyuda: 'Alimentos',
    descripcion: 'Familia sin acceso a alimentos',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssistanceRequestsController],
      providers: [AssistanceRequestsService],
    }).compile();

    controller = module.get<AssistanceRequestsController>(
      AssistanceRequestsController,
    );
    service = module.get<AssistanceRequestsService>(AssistanceRequestsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create delega en el servicio', () => {
    const spy = jest.spyOn(service, 'create');

    const result = controller.create(createDto);

    expect(spy).toHaveBeenCalledWith(createDto);
    expect(result.data.id).toBe(1);
  });

  it('findAll delega en el servicio', () => {
    controller.create(createDto);
    const spy = jest.spyOn(service, 'findAll');

    const result = controller.findAll();

    expect(spy).toHaveBeenCalled();
    expect(result.data).toHaveLength(1);
  });

  it('findOne delega en el servicio', () => {
    controller.create(createDto);
    const spy = jest.spyOn(service, 'findById');

    const result = controller.findOne(1);

    expect(spy).toHaveBeenCalledWith(1);
    expect(result.data.id).toBe(1);
  });

  it('update delega en el servicio', () => {
    controller.create(createDto);
    const spy = jest.spyOn(service, 'update');

    const result = controller.update(1, { tipoAyuda: 'Agua' });

    expect(spy).toHaveBeenCalledWith(1, { tipoAyuda: 'Agua' });
    expect(result.data.tipoAyuda).toBe('Agua');
  });

  it('updateStatus delega en el servicio', () => {
    controller.create(createDto);
    const spy = jest.spyOn(service, 'updateStatus');

    const result = controller.updateStatus(1, {
      estado: RequestStatus.ATENDIDA,
    });

    expect(spy).toHaveBeenCalledWith(1, { estado: RequestStatus.ATENDIDA });
    expect(result.data.estado).toBe(RequestStatus.ATENDIDA);
  });

  it('remove delega en el servicio', () => {
    controller.create(createDto);
    const spy = jest.spyOn(service, 'remove');

    controller.remove(1);

    expect(spy).toHaveBeenCalledWith(1);
    expect(controller.findAll().data).toHaveLength(0);
  });
});
