import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
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
}
