export class Supply {
  id: number;
  name: string;
  description: string;
  unit: string; // liters, kg, units, boxes, etc.
  category: string; // e.g., food, water, medicine, hygiene
  costPerUnit: number;
  supplierId?: string;
  createdAt: Date;
  updatedAt: Date;
}
