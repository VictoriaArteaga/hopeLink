export enum MovementType {
  ENTRY = 'ENTRY',
  EXIT = 'EXIT',
}

export enum MovementReason {
  INITIAL = 'INITIAL',
  DELIVERY = 'DELIVERY',
  DONATION = 'DONATION',
  RESTOCK = 'RESTOCK',
  LOSS = 'LOSS',
  ADJUSTMENT = 'ADJUSTMENT',
}

export class InventoryMovement {
  id: number;
  inventoryId: number;
  type: MovementType;
  quantity: number;
  reason: MovementReason;
  description?: string;
  authorizedBy?: number; // User ID
  createdAt: Date;
}
