import { Rol } from '../enums/rol.enum';

export class User {
  id: string;
  nombre: string;
  telefono: string;
  correo: string;
  rol: Rol;
  documentoIdentidad: string;
}
