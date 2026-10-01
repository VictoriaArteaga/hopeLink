export class Inventory {
  id: number;
  shelterId: number;
  supplyId: number;
  quantity: number;
  minThreshold: number; // Alert when below this
  lastRestockDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
