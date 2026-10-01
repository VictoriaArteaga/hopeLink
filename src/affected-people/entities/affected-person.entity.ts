export class AffectedPerson {
  id: number;
  firstName: string;
  lastName: string;
  idNumber: string;
  age: number;
  gender: string;
  familySize: number;
  hasDisability: boolean;
  disabilityType?: string;
  monthlyIncome: number;
  address: string;
  phone: string;
  email?: string;
  emergencyId: number;
  shelterId?: number;
  latitude?: number;
  longitude?: number;
  registeredBy: number; // User ID
  createdAt: Date;
  updatedAt: Date;
}
