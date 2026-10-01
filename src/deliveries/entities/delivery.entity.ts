export enum DeliveryStatus {
  PENDING = 'PENDING',
  IN_TRANSIT = 'IN_TRANSIT',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  FAILED = 'FAILED',
}

export class Delivery {
  id: number;
  assistanceRequestId: number;
  affectedPersonId: number;
  emergencyId: number;
  shelterId?: number;
  quantity: number;
  unit: string;
  status: DeliveryStatus;
  plannedDate: Date;
  deliveredAt?: Date;
  receivedBy?: string;
  deliveredBy: number; // User ID
  notes?: string;
  latitude?: number;
  longitude?: number;
  createdAt: Date;
  updatedAt: Date;
}
