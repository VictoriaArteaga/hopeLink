export enum AuditAction {
  CREATE = 'CREATE',
  READ = 'READ',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  APPROVE = 'APPROVE',
  REJECT = 'REJECT',
  DELIVER = 'DELIVER',
  EXPORT = 'EXPORT',
}

export class AuditLog {
  id: number;
  userId: number;
  action: AuditAction;
  entityType: string; // e.g., 'USER', 'ASSISTANCE_REQUEST', 'DELIVERY'
  entityId: number;
  changes?: Record<string, any>; // JSON of what changed
  details?: string;
  ipAddress?: string;
  userAgent?: string;
  timestamp: Date;
}
