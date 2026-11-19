import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AffectedPerson } from '../../affected-people/entities/affected-person.entity';
import { User } from '../../users/entities/user.entity';
import { PriorityLevel } from '../enums/priority-level.enum';
import { RequestStatus } from '../enums/request-status.enum';

@Entity('assistance_requests')
export class AssistanceRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'persona_afectada_id' })
  personaAfectadaId: number;

  @ManyToOne(() => AffectedPerson, (person) => person.solicitudes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'persona_afectada_id' })
  personaAfectada: AffectedPerson;

  @Column({ name: 'registrado_por_id', type: 'uuid', nullable: true })
  registradoPorId: string | null;

  @ManyToOne(() => User, (user) => user.solicitudesRegistradas, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'registrado_por_id' })
  registradoPor: User | null;

  @Column({ name: 'tipo_ayuda' })
  tipoAyuda: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'enum', enum: PriorityLevel, default: PriorityLevel.MEDIA })
  prioridad: PriorityLevel;

  @Column({ type: 'enum', enum: RequestStatus, default: RequestStatus.PENDIENTE })
  estado: RequestStatus;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_actualizacion' })
  fechaActualizacion: Date;
}
