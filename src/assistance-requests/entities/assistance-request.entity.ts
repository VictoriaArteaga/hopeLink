export enum AssistanceRequestStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  DELIVERED = 'DELIVERED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
}

export enum AssistanceNeedType {
  WATER = 'WATER',
  FOOD = 'FOOD',
  MEDICINE = 'MEDICINE',
  HYGIENE_KITS = 'HYGIENE_KITS',
  BLANKETS = 'BLANKETS',
  SHELTER = 'SHELTER',
  CLOTHING = 'CLOTHING',
  OTHER = 'OTHER',
}

export class AssistanceRequest {
  id: number;
  affectedPersonId: number;
  emergencyId: number;
  needType: AssistanceNeedType;
  quantity: number;
  unit: string;
  severity: number; // 1-10 scale
  status: AssistanceRequestStatus;
  priority: number; // Calculated by prioritization algorithm
  description?: string;
  approvedBy?: number; // User ID
  rejectionReason?: string;
  createdAt: Date;
  updatedAt: Date;
  deliveredAt?: Date;
}
