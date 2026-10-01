export enum EmergencyType {
  EARTHQUAKE = 'EARTHQUAKE',
  FLOOD = 'FLOOD',
  LANDSLIDE = 'LANDSLIDE',
  FIRE = 'FIRE',
  HURRICANE = 'HURRICANE',
  OTHER = 'OTHER',
}

export enum EmergencyStatus {
  ACTIVE = 'ACTIVE',
  CONTAINED = 'CONTAINED',
  RESOLVED = 'RESOLVED',
}

export class Emergency {
  id: number;
  name: string;
  type: EmergencyType;
  description: string;
  status: EmergencyStatus;
  startDate: Date;
  endDate?: Date;
  latitude: number;
  longitude: number;
  affectedArea: string;
  estimatedAffectedPopulation: number;
  createdAt: Date;
  updatedAt: Date;
}
