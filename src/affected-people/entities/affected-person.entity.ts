import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AssistanceRequest } from '../../assistance-requests/entities/assistance-request.entity';

@Entity('affected_people')
export class AffectedPerson {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column({ type: 'int' })
  edad: number;

  @Column()
  direccion: string;

  @Column({ name: 'nivel_vulnerabilidad' })
  nivelVulnerabilidad: string;

  @OneToMany(() => AssistanceRequest, (request) => request.personaAfectada)
  solicitudes: AssistanceRequest[];
}
