import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { Rol } from '../src/users/enums/rol.enum';

describe('Users with PostgreSQL', () => {
  let app: INestApplication;
  let db: DataSource;

  beforeAll(async () => {
    if (!process.env.DB_NAME?.includes('integration')) {
      throw new Error(
        'Use a dedicated integration database (DB_NAME must contain integration)',
      );
    }
    const module = await Test.createTestingModule({
      imports: [AppModule],
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
    db = app.get(DataSource);
  });

  afterAll(async () => app?.close());

  it('creates tables and foreign keys, and serves all user endpoints', async () => {
    const api = request(app.getHttpServer());
    const tables =
      await db.query(`SELECT table_name FROM information_schema.tables
      WHERE table_schema = 'public' AND table_name IN ('users', 'affected_people', 'assistance_requests')`);
    expect(
      tables.map((row: { table_name: string }) => row.table_name).sort(),
    ).toEqual(['affected_people', 'assistance_requests', 'users']);

    const foreignKeys = await db.query(`SELECT ccu.table_name AS target_table
      FROM information_schema.table_constraints tc
      JOIN information_schema.key_column_usage kcu ON tc.constraint_name = kcu.constraint_name
        AND tc.table_schema = kcu.table_schema
      JOIN information_schema.constraint_column_usage ccu ON tc.constraint_name = ccu.constraint_name
        AND tc.table_schema = ccu.table_schema
      WHERE tc.constraint_type = 'FOREIGN KEY' AND tc.table_name = 'assistance_requests'
        AND kcu.column_name = 'registrado_por_id'`);
    expect(foreignKeys).toEqual([{ target_table: 'users' }]);

    const suffix = Date.now().toString();
    const user = {
      nombre: 'Prueba Integración',
      telefono: '3001234567',
      correo: `integration-${suffix}@example.com`,
      rol: Rol.REGISTRO,
      documentoIdentidad: `test-${suffix}`,
    };
    const created = await api.post('/users').send(user).expect(201);
    const id: string = created.body.data.id;
    try {
      expect(created.body.data).toMatchObject(user);
      await api
        .get('/users')
        .expect(200)
        .expect((res) => {
          expect(res.body.data).toEqual(
            expect.arrayContaining([expect.objectContaining({ id })]),
          );
        });
      await api
        .get(`/users/${id}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.data.id).toBe(id);
        });
      await api
        .patch(`/users/${id}`)
        .send({ nombre: 'Prueba Editada' })
        .expect(200);
      await api
        .get(`/users/${id}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.data.nombre).toBe('Prueba Editada');
        });
      await api.post('/users').send(user).expect(409);
      await api.get('/users/not-a-uuid').expect(400);

      const person = await api
        .post('/affected-people')
        .send({
          nombre: 'Persona Prueba',
          edad: 30,
          direccion: 'Dirección de prueba',
          nivelVulnerabilidad: 'medio',
        })
        .expect(201);
      const personId: string = person.body.data.id;
      try {
        const savedRequest = await api
          .post('/assistance-requests')
          .send({
            personaAfectadaId: personId,
            tipoAyuda: 'Alimentos',
            descripcion: 'Solicitud de integración',
          })
          .expect(201);
        const requestId: number = savedRequest.body.data.id;
        try {
          await api
            .patch(`/assistance-requests/${requestId}`)
            .send({ registradoPorId: id })
            .expect(200);
          const rows = await db.query(
            'SELECT registrado_por_id FROM assistance_requests WHERE id = $1',
            [requestId],
          );
          expect(rows[0].registrado_por_id).toBe(id);
        } finally {
          await api.delete(`/assistance-requests/${requestId}`).expect(200);
        }
      } finally {
        await api.delete(`/affected-people/${personId}`).expect(200);
      }
    } finally {
      await api.delete(`/users/${id}`).expect(200);
      await api.get(`/users/${id}`).expect(404);
    }
  });
});
