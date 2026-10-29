import { PriorityLevel } from '../enums/priority-level.enum';
import { RequestStatus } from '../enums/request-status.enum';

export class AssistanceRequest {
  id: number;
  personaAfectadaId: number;
  tipoAyuda: string;
  descripcion: string;
  prioridad: PriorityLevel;
  estado: RequestStatus;
  fechaCreacion: Date;
  fechaActualizacion: Date;
}
