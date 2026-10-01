# Estructura Completa del Proyecto HopeLink

## Árbol de Carpetas

```
hopeLink/
├── src/
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   ├── dto/
│   │   │   ├── login.dto.ts
│   │   │   └── register.dto.ts
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts
│   │   │   └── local-auth.guard.ts
│   │   └── strategies/
│   │       ├── jwt.strategy.ts
│   │       └── local.strategy.ts
│   │
│   ├── users/
│   │   ├── users.controller.ts
│   │   ├── users.module.ts
│   │   ├── users.service.ts
│   │   ├── dto/
│   │   │   ├── create-user.dto.ts
│   │   │   └── update-user.dto.ts
│   │   └── entities/
│   │       └── user.entity.ts
│   │
│   ├── emergencies/
│   │   ├── emergencies.controller.ts
│   │   ├── emergencies.module.ts
│   │   ├── emergencies.service.ts
│   │   ├── dto/
│   │   │   ├── create-emergency.dto.ts
│   │   │   └── update-emergency.dto.ts
│   │   └── entities/
│   │       └── emergency.entity.ts
│   │
│   ├── affected-people/
│   │   ├── affected-people.controller.ts
│   │   ├── affected-people.module.ts
│   │   ├── affected-people.service.ts
│   │   ├── dto/
│   │   │   ├── create-affected-person.dto.ts
│   │   │   └── update-affected-person.dto.ts
│   │   └── entities/
│   │       └── affected-person.entity.ts
│   │
│   ├── assistance-requests/
│   │   ├── assistance-requests.controller.ts
│   │   ├── assistance-requests.module.ts
│   │   ├── assistance-requests.service.ts
│   │   ├── dto/
│   │   │   ├── create-assistance-request.dto.ts
│   │   │   └── update-assistance-request.dto.ts
│   │   └── entities/
│   │       └── assistance-request.entity.ts
│   │
│   ├── prioritization/
│   │   ├── prioritization.module.ts
│   │   ├── prioritization.service.ts
│   │   └── rules/
│   │       ├── age.rule.ts
│   │       ├── disability.rule.ts
│   │       ├── family-size.rule.ts
│   │       ├── income.rule.ts
│   │       ├── prioritization.rule.ts
│   │       └── severity.rule.ts
│   │
│   ├── shelters/
│   │   ├── shelters.controller.ts
│   │   ├── shelters.module.ts
│   │   ├── shelters.service.ts
│   │   ├── dto/
│   │   │   ├── create-shelter.dto.ts
│   │   │   └── update-shelter.dto.ts
│   │   └── entities/
│   │       └── shelter.entity.ts
│   │
│   ├── supplies/
│   │   ├── supplies.controller.ts
│   │   ├── supplies.module.ts
│   │   ├── supplies.service.ts
│   │   ├── dto/
│   │   │   ├── create-supply.dto.ts
│   │   │   └── update-supply.dto.ts
│   │   └── entities/
│   │       └── supply.entity.ts
│   │
│   ├── inventory/
│   │   ├── inventory.controller.ts
│   │   ├── inventory.module.ts
│   │   ├── inventory.service.ts
│   │   ├── dto/
│   │   │   ├── create-inventory.dto.ts
│   │   │   ├── record-movement.dto.ts
│   │   │   └── update-inventory.dto.ts
│   │   └── entities/
│   │       ├── inventory.entity.ts
│   │       └── inventory-movement.entity.ts
│   │
│   ├── deliveries/
│   │   ├── deliveries.controller.ts
│   │   ├── deliveries.module.ts
│   │   ├── deliveries.service.ts
│   │   ├── dto/
│   │   │   ├── create-delivery.dto.ts
│   │   │   └── update-delivery.dto.ts
│   │   └── entities/
│   │       └── delivery.entity.ts
│   │
│   ├── audit/
│   │   ├── audit.controller.ts
│   │   ├── audit.module.ts
│   │   ├── audit.service.ts
│   │   ├── dto/
│   │   │   └── create-audit-log.dto.ts
│   │   └── entities/
│   │       └── audit-log.entity.ts
│   │
│   ├── common/
│   │   ├── decorators/
│   │   │   └── roles.decorator.ts
│   │   ├── filters/
│   │   │   └── http-exception.filter.ts
│   │   ├── guards/
│   │   │   └── roles.guard.ts
│   │   ├── interceptors/
│   │   │   └── logging.interceptor.ts
│   │   ├── interfaces/
│   │   │   └── response.interface.ts
│   │   └── pipes/
│   │       └── validation.pipe.ts
│   │
│   ├── app.controller.ts
│   ├── app.controller.spec.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   └── main.ts
│
├── test/
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
│
├── .env.example
├── .gitignore
├── .prettierrc
├── ARCHITECTURE.md               # Documentación de arquitectura
├── GETTING_STARTED.md            # Guía de inicio rápido
├── PROJECT_STRUCTURE.md          # Este archivo
├── jest.config.ts
├── nest-cli.json
├── package.json
├── package-lock.json
├── oxlint.json
├── README.md
├── tsconfig.build.json
└── tsconfig.json
```

## Módulos y Responsabilidades

### 🔐 Auth Module
- `auth/` - Autenticación y autorización
- Strategies: Local (usuario/contraseña), JWT (token)
- Guards: LocalAuthGuard, JwtAuthGuard
- DTOs: LoginDto, RegisterDto

### 👥 Users Module
- `users/` - Gestión de usuarios del sistema
- Roles: ADMIN, OPERATOR
- CRUD completo

### 🚨 Emergencies Module
- `emergencies/` - Registro de desastres naturales
- Tipos: EARTHQUAKE, FLOOD, LANDSLIDE, FIRE, HURRICANE, OTHER
- Estados: ACTIVE, CONTAINED, RESOLVED
- Datos: ubicación, población afectada estimada

### 👨‍👩‍👧 Affected People Module
- `affected-people/` - Registro de personas afectadas
- Datos socioeconómicos:
  - Edad, género, tamaño familiar
  - Discapacidades
  - Ingresos mensuales
- Ubicación geográfica

### 📋 Assistance Requests Module
- `assistance-requests/` - Solicitudes de asistencia
- Tipos de necesidad: WATER, FOOD, MEDICINE, HYGIENE_KITS, BLANKETS, SHELTER, CLOTHING, OTHER
- Estados: PENDING, APPROVED, DELIVERED, REJECTED, CANCELLED
- **Prioridad calculada automáticamente**

### 🎯 Prioritization Module
- `prioritization/` - Algoritmo de priorización
- Reglas modulares y extensibles:
  - Disability (0-20 pts)
  - Age (0-20 pts)
  - Family Size (0-20 pts)
  - Income (0-20 pts)
  - Severity (0-20 pts)
- Score total: 0-100 puntos
- Niveles: CRITICAL, HIGH, MEDIUM, LOW

### 🏢 Shelters Module
- `shelters/` - Gestión de centros de acopio
- Información: nombre, dirección, capacidad
- Estado: ACTIVE, FULL, INACTIVE, CLOSED
- Amenidades: médico, cocina, baños
- Monitoreo de ocupación

### 📦 Supplies Module
- `supplies/` - Catálogo de suministros
- Información: nombre, categoría, unidad, costo
- Independiente del inventario (define qué es)

### 📊 Inventory Module
- `inventory/` - Gestión de stock
- Relación: Shelter + Supply + Cantidad
- Movimientos: ENTRY, EXIT
- Razones: INITIAL, DELIVERY, DONATION, RESTOCK, LOSS, ADJUSTMENT
- Umbral mínimo de alerta

### 🚚 Deliveries Module
- `deliveries/` - Gestión de entregas
- Vinculación: AssistanceRequest → Delivery
- Estado: PENDING, IN_TRANSIT, DELIVERED, CANCELLED, FAILED
- Trazabilidad: quién, cuándo, dónde
- GPS: ubicación de entrega

### 📝 Audit Module
- `audit/` - Auditoría y compliance
- Acciones: CREATE, READ, UPDATE, DELETE, APPROVE, REJECT, DELIVER, EXPORT
- Registro completo: usuario, timestamp, IP, cambios
- Historial por entidad

### 🛠️ Common Module
- `common/` - Elementos compartidos
- Decoradores: @Roles
- Filters: HttpExceptionFilter
- Guards: RolesGuard
- Interceptors: LoggingInterceptor
- Pipes: CustomValidationPipe
- Interfaces: ApiResponse, PaginatedResponse

## Archivos de Configuración

| Archivo | Propósito |
|---------|-----------|
| `package.json` | Dependencias y scripts |
| `tsconfig.json` | Configuración de TypeScript |
| `tsconfig.build.json` | Config de compilación |
| `nest-cli.json` | Configuración de NestJS CLI |
| `jest.config.ts` | Configuración de pruebas |
| `oxlint.json` | Configuración de linting |
| `.prettierrc` | Formato de código |
| `.gitignore` | Archivos ignorados por Git |
| `.env.example` | Variables de entorno (plantilla) |

## Documentación

| Archivo | Contenido |
|---------|----------|
| `README.md` | Descripción general del proyecto |
| `ARCHITECTURE.md` | Arquitectura detallada del sistema |
| `GETTING_STARTED.md` | Guía de inicio rápido |
| `PROJECT_STRUCTURE.md` | Este archivo |

## Estadísticas del Proyecto

### Módulos
- **Total de módulos**: 11 módulos principales + 1 common
- **Controllers**: 11
- **Services**: 11
- **Entities/DTOs**: ~25

### Características
- **Operaciones CRUD**: Completas en todos los módulos
- **Validación**: DTOs con class-validator
- **Autenticación**: JWT + Local Strategy
- **Autorización**: Guards por rol
- **Auditoría**: Logging de todas las operaciones
- **Priorización**: Algoritmo modular de 5 reglas

### Endpoints (Aproximado)
```
Auth:              6 endpoints
Users:             5 endpoints
Emergencies:       5 endpoints
Affected People:   5 endpoints
Assistance Req:    6 endpoints
Shelters:          6 endpoints
Supplies:          5 endpoints
Inventory:         7 endpoints
Deliveries:        7 endpoints
Audit:             4 endpoints

Total aproximado:  ~56 endpoints RESTful
```

## Patrones Implementados

### Arquitectura
- ✅ Layered Architecture (Controller → Service → Repository)
- ✅ Modular Design
- ✅ Separation of Concerns
- ✅ DI (Dependency Injection)

### Security
- ✅ JWT Authentication
- ✅ Role-Based Authorization
- ✅ Input Validation
- ✅ Audit Logging

### Data Management
- ✅ DTOs para transferencia de datos
- ✅ Entities para persistencia
- ✅ Services para lógica de negocio
- ✅ Repositories para acceso a datos (pendiente: TypeORM)

### API Design
- ✅ RESTful conventions
- ✅ Consistent response format
- ✅ Error handling
- ✅ HTTP status codes

## Próxima Implementación

1. **TypeORM Integration**
   - Configuración de PostgreSQL
   - Migrations
   - Repositorios

2. **Advanced Validations**
   - Validadores personalizados
   - Reglas de negocio

3. **Testing**
   - Unit tests
   - Integration tests
   - E2E tests

4. **Documentation**
   - Swagger/OpenAPI
   - API specification

5. **Performance**
   - Caching
   - Paginación
   - Índices de BD

---


