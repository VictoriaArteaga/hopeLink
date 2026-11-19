# Hope Link

API REST para la gestión de ayuda humanitaria en situaciones de emergencia. Permite registrar a las **personas afectadas**, gestionar las **solicitudes de asistencia** que realizan y administrar los **usuarios** (personal) que las registran y atienden.

Proyecto desarrollado para la asignatura Electiva I – Frameworks Web.

## Tecnologías

- [NestJS](https://nestjs.com/) 12 (Node.js + TypeScript)
- [TypeORM](https://typeorm.io/) como ORM
- PostgreSQL 16 (vía Docker)
- pgAdmin 4 (administración de la base de datos, opcional)
- `class-validator` / `class-transformer` para validación de datos
- Jest para pruebas y oxlint + Prettier para calidad de código

## Módulos implementados

| Módulo | Ruta base | Descripción |
| --- | --- | --- |
| Usuarios | `/users` | CRUD del personal. Roles: `REGISTRO`, `LOGISTICA`, `ATENCION`, `DISTRIBUCION`. |
| Personas afectadas | `/affected-people` | CRUD de personas afectadas (nombre, edad, dirección, nivel de vulnerabilidad). |
| Solicitudes de asistencia | `/assistance-requests` | CRUD de solicitudes, más `PATCH /assistance-requests/:id/status` para cambiar su estado. |

Cada endpoint CRUD expone `POST /`, `GET /`, `GET /:id`, `PATCH /:id` y `DELETE /:id`.

- **Prioridad** de una solicitud: `BAJA`, `MEDIA` (por defecto), `ALTA`, `CRITICA`.
- **Estado** de una solicitud: `PENDIENTE` (por defecto), `EN_PROCESO`, `ATENDIDA`, `CANCELADA`.

> Las carpetas `auth`, `shelters`, `supplies`, `inventory`, `deliveries`, `emergencies`, `prioritization`, `audit` y `health` existen en `src/` pero aún no están conectadas a la aplicación.

## Requisitos

- [Node.js](https://nodejs.org/) 20 o superior y npm
- [Docker](https://www.docker.com/) y Docker Compose (para levantar PostgreSQL y pgAdmin)
- Git

## Instalación

```bash
git clone https://github.com/VictoriaArteaga/hope-link.git
cd hope-link
npm install
```

## Configuración de la base de datos

La base de datos es PostgreSQL y se levanta con Docker Compose (`docker-compose.yml`).

### 1. Crear el archivo `.env`

Copia la plantilla y completa los valores:

```bash
cp .env.example .env
```

| Variable | Descripción |
| --- | --- |
| `POSTGRES_DB` | Nombre de la base de datos que crea el contenedor. |
| `POSTGRES_USER` | Usuario de PostgreSQL. |
| `POSTGRES_PASSWORD` | Contraseña de PostgreSQL. |
| `POSTGRES_PORT` | Puerto del host expuesto por Docker (por defecto `5432`). |
| `PGADMIN_DEFAULT_EMAIL` | Correo para iniciar sesión en pgAdmin. |
| `PGADMIN_DEFAULT_PASSWORD` | Contraseña de pgAdmin. |
| `DB_HOST` | Host con el que la aplicación se conecta (`localhost` en local). |
| `DB_PORT` | Puerto con el que la aplicación se conecta (igual a `POSTGRES_PORT`). |
| `DB_NAME` | Nombre de la base de datos (igual a `POSTGRES_DB`). |
| `DB_USER` | Usuario (igual a `POSTGRES_USER`). |
| `DB_PASSWORD` | Contraseña (igual a `POSTGRES_PASSWORD`). |

Los valores `DB_*` deben coincidir con los `POSTGRES_*`, ya que la aplicación usa los primeros y el contenedor los segundos.



### 2. Levantar los contenedores

```bash
docker compose up -d
```

Esto inicia:

- **PostgreSQL 16** en `localhost:${POSTGRES_PORT}` (contenedor `hopelink-postgres`), con volumen persistente.
- **pgAdmin 4** en <http://localhost:5050> (contenedor `hopelink-pgadmin`). Ingresa con `PGADMIN_DEFAULT_EMAIL` / `PGADMIN_DEFAULT_PASSWORD` y registra un servidor con host `postgres`, puerto `5432` y las credenciales `POSTGRES_*`.

Para verificar que la base está lista:

```bash
docker compose ps
```

### 3. Creación de tablas

No hay migraciones: TypeORM está configurado con `synchronize: true` y `autoLoadEntities: true`, por lo que las tablas (`users`, `affected_people`, `assistance_requests`) se crean automáticamente al iniciar la aplicación por primera vez.

> `synchronize: true` es adecuado para desarrollo, pero no se recomienda en producción porque puede alterar o borrar datos al cambiar las entidades. Para producción, usa migraciones.

### Detener o reiniciar la base de datos

```bash
docker compose stop          # detiene los contenedores (conserva los datos)
docker compose down          # elimina los contenedores (conserva los datos)
docker compose down -v       # elimina contenedores Y datos
```

## Ejecución

```bash
# desarrollo
npm run start

# desarrollo con recarga automática
npm run start:dev

# producción (requiere npm run build previo)
npm run build
npm run start:prod
```

La API queda disponible en <http://localhost:3000>. Puedes cambiar el puerto con la variable de entorno `PORT`.

La aplicación valida globalmente los datos de entrada: se descartan los campos no declarados y se rechaza la petición si llegan campos desconocidos (`whitelist` y `forbidNonWhitelisted`).


## Estructura del proyecto

```text
hope-link/
├── src/
│   ├── affected-people/
│   ├── assistance-requests/
│   ├── audit/
│   ├── auth/
│   ├── common/
│   ├── config/
│   ├── database/
│   ├── deliveries/
│   ├── emergencies/
│   ├── health/
│   ├── inventory/
│   ├── prioritization/
│   ├── shelters/
│   ├── supplies/
│   ├── users/
│   └── (app.module.ts, main.ts, ...)
├── test/
├── .env.example
├── .gitignore
├── .prettierrc
├── docker-compose.yml
├── jest.config.ts
├── nest-cli.json
├── oxlint.json
├── package.json
├── package-lock.json
├── tsconfig.build.json
├── tsconfig.json
└── README.md
```
