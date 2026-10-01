import { Injectable } from '@nestjs/common';
import { CreateAuditLogDto } from './dto/create-audit-log.dto';

@Injectable()
export class AuditService {
  private logs: any[] = [];

  /**
   * Record an audit log
   * This should be called from interceptors or service methods
   */
  log(createAuditLogDto: CreateAuditLogDto) {
    const log = {
      id: this.logs.length + 1,
      ...createAuditLogDto,
      timestamp: new Date(),
    };
    this.logs.push(log);
    return log;
  }

  findAll(userId?: number, entityType?: string, action?: string) {
    let filtered = this.logs;

    if (userId) {
      filtered = filtered.filter(log => log.userId === userId);
    }

    if (entityType) {
      filtered = filtered.filter(log => log.entityType === entityType);
    }

    if (action) {
      filtered = filtered.filter(log => log.action === action);
    }

    // Return sorted by timestamp descending
    return filtered.sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    );
  }

  findOne(id: number) {
    return this.logs.find(log => log.id === id);
  }

  getEntityHistory(entityType: string, entityId: number) {
    return this.logs
      .filter(log => log.entityType === entityType && log.entityId === entityId)
      .sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
      );
  }

  /**
   * Get statistics for audit logs
   */
  getStats() {
    return {
      totalLogs: this.logs.length,
      actionCounts: this._countByAction(),
      entityCounts: this._countByEntityType(),
    };
  }

  private _countByAction() {
    const counts = {};
    this.logs.forEach(log => {
      counts[log.action] = (counts[log.action] || 0) + 1;
    });
    return counts;
  }

  private _countByEntityType() {
    const counts = {};
    this.logs.forEach(log => {
      counts[log.entityType] = (counts[log.entityType] || 0) + 1;
    });
    return counts;
  }
}
