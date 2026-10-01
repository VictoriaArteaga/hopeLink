export enum ShelterStatus {
  ACTIVE = 'ACTIVE',
  FULL = 'FULL',
  INACTIVE = 'INACTIVE',
  CLOSED = 'CLOSED',
}

export class Shelter {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  capacity: number;
  currentOccupancy: number;
  status: ShelterStatus;
  contact: string;
  phone: string;
  responsiblePerson: string;
  amenities: string[]; // e.g., ['medical', 'cooking', 'bathrooms']
  createdAt: Date;
  updatedAt: Date;
}
