# Verificación de usuarios en PostgreSQL

El módulo `users` usa `TypeOrmModule.forFeature([User])`. La relación disponible es
`users.id` → `assistance_requests.registrado_por_id`; la solicitud puede registrar
un usuario mediante `registradoPorId`. Al eliminar el usuario, la clave de la
solicitud queda en `NULL`.

1. Configurar `.env` con `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`,
   `POSTGRES_PORT`, `PGADMIN_DEFAULT_EMAIL`, `PGADMIN_DEFAULT_PASSWORD` y los
   valores `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` equivalentes.
2. Iniciar `docker compose up -d`. Si la API corre en el equipo, `DB_HOST` debe
   ser `localhost` y `DB_PORT` el puerto publicado por PostgreSQL.
3. Ejecutar `npm run build` y `npm test -- --runInBand`.
4. Usar una base **exclusiva para pruebas** cuyo nombre contenga `integration` y
   ejecutar `node --env-file=.env --experimental-vm-modules
   ./node_modules/jest/bin/jest.js --config test/jest-e2e.json --runInBand`.
   La prueba crea y elimina sus propios registros; comprueba las tablas `users`,
   `affected_people` y `assistance_requests`, la clave foránea y los cinco
   endpoints de usuarios.
5. Entrar a pgAdmin en `http://localhost:5050` con las credenciales de `.env`.
   Registrar un servidor con host `postgres`, puerto `5432`, base y usuario
   correspondientes a `POSTGRES_DB` y `POSTGRES_USER`. Las tablas aparecen en
   `Servers > Databases > <base> > Schemas > public > Tables`.
