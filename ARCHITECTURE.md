# HopeLink - Arquitectura del Sistema

## Descripción General

HopeLink es una plataforma API RESTful especializada en la gestión integral de emergencias, respuesta operativa y logística de asistencia humanitaria ante desastres naturales.

### Objetivos Principales

1. **Censo en tiempo real**: Caracterización socioeconómica de poblaciones vulnerables
2. **Priorización algorítmica**: Cálculo automático de necesidades críticas
3. **Administración centralizada**: Gestión de suministros y entregas
4. **Trazabilidad end-to-end**: Auditoría completa de operaciones
5. **Reportes de cobertura**: Toma de decisiones informada
6. **Alta disponibilidad**: Funcionamiento en escenarios de crisis

## Stack Tecnológico

- **Lenguaje**: TypeScript
- **Framework**: NestJS
- **Base de datos**: PostgreSQL (recomendado)
- **ORM**: TypeORM (a implementar)
- **Validación**: class-validator + class-transformer
- **Autenticación**: JWT + Passport

## Estructura de Carpetas

```
src/
├── auth/                           # Autenticación y autorización
│   ├── auth.module.ts
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── strategies/                 # Passport strategies
│   ├── guards/                     # Guards de autenticación
│   └── dto/                        # Data Transfer Objects
│
├── users/                          # Gestión de usuarios del sistema
│   ├── users.module.ts
│   ├── users.controller.ts
│   ├── users.service.ts
│   ├── entities/
│   └── dto/
│
├── emergencies/                    # Gestión de emergencias/desastres
│   ├── emergencies.module.ts
│   ├── emergencies.controller.ts
│   ├── emergencies.service.ts
│   ├── entities/
│   └── dto/
│
├── affected-people/                # Registro de personas afectadas
│   ├── affected-people.module.ts
│   ├── affected-people.controller.ts
│   ├── affected-people.service.ts
│   ├── entities/
│   └── dto/
│
├── assistance-requests/            # Solicitudes de asistencia
│   ├── assistance-requests.module.ts
│   ├── assistance-requests.controller.ts
│   ├── assistance-requests.service.ts
│   ├── entities/
│   └── dto/
│
├── prioritization/                 # Algoritmo de priorización
│   ├── prioritization.module.ts
│   ├── prioritization.service.ts
│   └── rules/                      # Reglas de priorización
│       ├── prioritization.rule.ts
│       ├── disability.rule.ts
│       ├── age.rule.ts
│       ├── family-size.rule.ts
│       ├── income.rule.ts
│       └── severity.rule.ts
│
├── shelters/                       # Centros de acopio
│   ├── shelters.module.ts
│   ├── shelters.controller.ts
│   ├── shelters.service.ts
│   ├── entities/
│   └── dto/
│
├── supplies/                       # Catálogo de suministros
│   ├── supplies.module.ts
│   ├── supplies.controller.ts
│   ├── supplies.service.ts
│   ├── entities/
│   └── dto/
│
├── inventory/                      # Gestión de inventario
│   ├── inventory.module.ts
│   ├── inventory.controller.ts
│   ├── inventory.service.ts
│   ├── entities/
│   │   ├── inventory.entity.ts
│   │   └── inventory-movement.entity.ts
│   └── dto/
│
├── deliveries/                     # Gestión de entregas
│   ├── deliveries.module.ts
│   ├── deliveries.controller.ts
│   ├── deliveries.service.ts
│   ├── entities/
│   └── dto/
│
├── audit/                          # Auditoría y logs
│   ├── audit.module.ts
│   ├── audit.controller.ts
│   ├── audit.service.ts
│   ├── entities/
│   └── dto/
│
├── common/                         # Elementos compartidos
│   ├── decorators/                 # Decoradores personalizados
│   ├── filters/                    # Filtros de excepciones
│   ├── guards/                     # Guards de autorización
│   ├── interceptors/               # Interceptores
│   ├── pipes/                      # Pipes de validación
│   └── interfaces/                 # Interfaces compartidas
│
├── app.module.ts                   # Módulo raíz
├── app.controller.ts
├── app.service.ts
└── main.ts                         # Punto de entrada
```

## Módulos Principales

### 1. Auth Module
**Responsabilidad**: Autenticación y autorización de usuarios

- Registro de usuarios
- Login con JWT
- Validación de credenciales
- Refresh tokens
- Estrategias: Local, JWT

### 2. Users Module
**Responsabilidad**: Gestión de usuarios del sistema

- CRUD de usuarios
- Gestión de roles (ADMIN, OPERATOR)
- Perfiles de usuario

### 3. Emergencies Module
**Responsabilidad**: Gestión de desastres naturales

- Registro de emergencias
- Tipos: Terremoto, Inundación, Deslizamiento, Incendio
- Estado de emergencia (ACTIVE, CONTAINED, RESOLVED)
- Ubicación y población estimada afectada

### 4. Affected People Module
**Responsabilidad**: Registro y caracterización de personas afectadas

- Datos personales
- Información socioeconómica:
  - Edad
  - Tamaño de familia
  - Discapacidades
  - Ingresos mensuales
- Ubicación geográfica

### 5. Assistance Requests Module
**Responsabilidad**: Solicitudes de asistencia humanitaria

- Tipos de necesidad (agua, alimento, medicina, etc.)
- Cantidad solicitada
- Severidad de la necesidad
- **Prioridad calculada automáticamente**
- Estado (PENDING, APPROVED, DELIVERED, REJECTED)

### 6. Prioritization Module
**Responsabilidad**: Algoritmo de priorización de solicitudes

#### Reglas de Priorización (0-100 puntos)

1. **Disability Rule** (0-20 puntos)
   - Personas con discapacidades: +20 puntos

2. **Age Rule** (0-20 puntos)
   - Menores (0-12): +20 puntos
   - Adultos mayores (65+): +18 puntos
   - Adolescentes (13-17): +10 puntos
   - Adultos: 0 puntos

3. **Family Size Rule** (0-20 puntos)
   - Familia >= 5 personas: +20 puntos
   - Familia >= 3 personas: +15 puntos
   - Familia >= 2 personas: +10 puntos
   - Unipersonal: 0 puntos

4. **Income Rule** (0-20 puntos)
   - Ingreso <= 250k: +20 puntos
   - Ingreso <= 500k: +15 puntos
   - Ingreso <= 1M: +10 puntos
   - Ingreso > 1M: 0 puntos

5. **Severity Rule** (0-20 puntos)
   - Escala 1-10 → Multiplicado por 2 = 0-20 puntos

#### Niveles de Prioridad

- **CRITICAL**: >= 80 puntos
- **HIGH**: 60-79 puntos
- **MEDIUM**: 40-59 puntos
- **LOW**: < 40 puntos

### 7. Shelters Module
**Responsabilidad**: Gestión de centros de acopio

- Ubicación geográfica
- Capacidad total
- Ocupación actual
- Estado (ACTIVE, FULL, INACTIVE, CLOSED)
- Amenidades (médico, cocina, baños)
- Responsable

### 8. Supplies Module
**Responsabilidad**: Catálogo de suministros

- Nombre del suministro
- Categoría
- Unidad de medida
- Costo unitario
- Proveedor

### 9. Inventory Module
**Responsabilidad**: Gestión de inventario y movimientos

- Stock por shelter
- Suministro disponible
- Threshold mínimo de alerta
- **Movimientos de inventario**:
  - ENTRY: Entrada de suministros
  - EXIT: Salida de suministros
  - Razones: INITIAL, DELIVERY, DONATION, RESTOCK, LOSS, ADJUSTMENT

### 10. Deliveries Module
**Responsabilidad**: Gestión de entregas de asistencia

- Vinculación entre solicitud y entrega
- Cantidad entregada
- Estado (PENDING, IN_TRANSIT, DELIVERED, CANCELLED, FAILED)
- Receptor
- Ubicación GPS de entrega
- **Trazabilidad**: Quién, cuándo, dónde

### 11. Audit Module
**Responsabilidad**: Auditoría y cumplimiento

- Registro de todas las operaciones importantes
- Acciones: CREATE, READ, UPDATE, DELETE, APPROVE, REJECT, DELIVER
- Cambios registrados
- IP del usuario
- User Agent
- Timestamp exacto

## Flujo de Datos Típico

### Caso: Atender solicitud de asistencia

```
1. REGISTRAR PERSONA AFECTADA
   └─> Affected People Module
       └─> Guarda datos socioeconómicos

2. CREAR SOLICITUD DE ASISTENCIA
   └─> Assistance Requests Module
       └─> Llama a Prioritization Service
           └─> Calcula score (0-100)
           └─> Determina nivel de urgencia
       └─> Guarda solicitud con prioridad

3. ORDENAR POR PRIORIDAD
   └─> Assistance Requests Module
       └─> Retorna solicitudes ordenadas

4. CREAR ENTREGA
   └─> Deliveries Module
       └─> Valida disponibilidad en inventario
       └─> Inventory Module
           └─> Registra movimiento (EXIT)
       └─> Guarda entrega

5. CONFIRMAR ENTREGA
   └─> Deliveries Module
       └─> Marca como DELIVERED
       └─> Registra timestamp y receptor
       └─> Audit Module
           └─> Registra operación

6. GENERAR REPORTES
   └─> Deliveries Module
       └─> Calcula coverage stats
       └─> Retorna % de cobertura por emergencia
```

## Patrones y Convenciones

### 1. Estructura de Módulos
Cada módulo sigue:
```
module/
├── module.module.ts      (Definición)
├── module.controller.ts  (Rutas)
├── module.service.ts     (Lógica)
├── entities/             (DTOs y modelos)
└── dto/                  (Data transfer objects)
```

### 2. Nombres de Archivos
- PascalCase para clases
- kebab-case para archivos
- Ejemplo: `AssistanceRequest` en `assistance-request.entity.ts`

### 3. DTOs por Operación
- `CreateXxxDto`: Para crear
- `UpdateXxxDto`: Para actualizar (PartialType de Create)
- `FilterXxxDto`: Para búsquedas

### 4. Guardias de Autorización
- `@UseGuards(JwtAuthGuard)`: Autenticación
- `@UseGuards(RolesGuard)` + `@Roles('ADMIN')`: Autorización por rol

## Decisiones Arquitectónicas

### 1. Monolítica Modular
- Una sola aplicación NestJS
- Módulos independientes pero comunicables
- Facilita despliegue y mantenimiento
- Escalabilidad futura con microservicios

### 2. Priorización Basada en Reglas
- Algoritmo transparente y auditable
- Reglas separadas e independientes
- Fácil agregar nuevas reglas
- Scores aditivos y normalizados

### 3. Auditoría Integrada
- Registro de todas las operaciones críticas
- Trazabilidad end-to-end de entregas
- Cumplimiento normativo

### 4. Entidades Normalizadas
- `Supply` ≠ `Inventory`
- `Inventory` + `Movement` = Trazabilidad completa
- Evita redundancia y permite análisis

## Próximos Pasos - Implementación

1. **Base de Datos**
   - Configurar TypeORM
   - Crear migrations
   - Implementar repositorios

2. **Validaciones Avanzadas**
   - Validadores personalizados
   - Reglas de negocio complejas

3. **Reportes y Analytics**
   - Dashboards
   - Exportación de datos

4. **Integraciones**
   - APIs externas (mapas, clima)
   - Notificaciones (email, SMS)

5. **Performance**
   - Caching (Redis)
   - Paginación en endpoints
   - Índices de base de datos

6. **Seguridad**
   - Rate limiting
   - CORS configurado
   - Validación de entrada

7. **Testing**
   - Unit tests
   - Integration tests
   - E2E tests

## Referencias

- [NestJS Documentation](https://docs.nestjs.com)
- [TypeORM Documentation](https://typeorm.io)
- [Passport.js](http://www.passportjs.org)
- [class-validator](https://github.com/typestack/class-validator)
