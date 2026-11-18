import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AssistanceRequest } from '../../assistance-requests/entities/assistance-request.entity';
import { Rol } from '../enums/rol.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  telefono: string;

  @Column({ unique: true })
  correo: string;

  @Column({ type: 'enum', enum: Rol })
  rol: Rol;

  @Column({ name: 'documento_identidad', unique: true })
  documentoIdentidad: string;

  @OneToMany(() => AssistanceRequest, (request) => request.registradoPor)
  solicitudesRegistradas: AssistanceRequest[];
}
