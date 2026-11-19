import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { jest } from '@jest/globals';
import request from 'supertest';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Rol } from './enums/rol.enum';

describe('Users HTTP endpoints', () => {
  let app: INestApplication;
  const id = '9166296c-bb61-4e05-bf08-9293e3504693';
  const user = {
    nombre: 'Ana',
    telefono: '3001234567',
    correo: 'ana@example.com',
    rol: Object.values(Rol)[0],
    documentoIdentidad: '123456789',
  };
  const service = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: service }],
    }).compile();
    app = module.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  afterAll(async () => app.close());
  beforeEach(() => jest.resetAllMocks());

  it('routes create, list, read, update and delete to the service', async () => {
    service.create.mockResolvedValue({ data: { id, ...user } });
    service.findAll.mockResolvedValue({ data: [{ id, ...user }] });
    service.findOne.mockResolvedValue({ data: { id, ...user } });
    service.update.mockResolvedValue({
      data: { id, ...user, nombre: 'Ana Maria' },
    });
    service.remove.mockResolvedValue({
      message: 'Usuario eliminado con éxito',
    });

    const api = request(app.getHttpServer());
    await api.post('/users').send(user).expect(201);
    await api.get('/users').expect(200);
    await api.get(`/users/${id}`).expect(200);
    await api.patch(`/users/${id}`).send({ nombre: 'Ana Maria' }).expect(200);
    await api.delete(`/users/${id}`).expect(200);

    expect(service.create).toHaveBeenCalledWith(user);
    expect(service.findAll).toHaveBeenCalledTimes(1);
    expect(service.findOne).toHaveBeenCalledWith(id);
    expect(service.update).toHaveBeenCalledWith(id, { nombre: 'Ana Maria' });
    expect(service.remove).toHaveBeenCalledWith(id);
  });

  it('rejects invalid UUIDs and invalid user bodies before calling the service', async () => {
    const api = request(app.getHttpServer());
    await api
      .post('/users')
      .send({ ...user, correo: 'invalid' })
      .expect(400);
    await api.get('/users/invalid').expect(400);
    await api.patch('/users/invalid').send({ nombre: 'Ana' }).expect(400);
    await api.delete('/users/invalid').expect(400);
    expect(service.create).not.toHaveBeenCalled();
    expect(service.findOne).not.toHaveBeenCalled();
    expect(service.update).not.toHaveBeenCalled();
    expect(service.remove).not.toHaveBeenCalled();
  });
});
