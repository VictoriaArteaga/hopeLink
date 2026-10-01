import { Injectable } from '@nestjs/common';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';

@Injectable()
export class DeliveriesService {
  private deliveries: any[] = [];

  create(createDeliveryDto: CreateDeliveryDto) {
    // TODO: Validate assistance request exists
    // TODO: Check inventory availability
    // TODO: Record inventory movement

    const delivery = {
      id: this.deliveries.length + 1,
      ...createDeliveryDto,
      status: 'PENDING',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.deliveries.push(delivery);
    return delivery;
  }

  findAll(status?: string, emergencyId?: number) {
    let filtered = this.deliveries;

    if (status) {
      filtered = filtered.filter(d => d.status === status);
    }

    if (emergencyId) {
      filtered = filtered.filter(d => d.emergencyId === emergencyId);
    }

    return filtered;
  }

  findOne(id: number) {
    return this.deliveries.find(d => d.id === id);
  }

  update(id: number, updateDeliveryDto: UpdateDeliveryDto) {
    const index = this.deliveries.findIndex(d => d.id === id);
    if (index >= 0) {
      this.deliveries[index] = {
        ...this.deliveries[index],
        ...updateDeliveryDto,
        updatedAt: new Date(),
      };
      return this.deliveries[index];
    }
    return null;
  }

  remove(id: number) {
    const index = this.deliveries.findIndex(d => d.id === id);
    if (index >= 0) {
      const delivery = this.deliveries.splice(index, 1);
      return delivery[0];
    }
    return null;
  }

  confirmDelivery(id: number) {
    const delivery = this.findOne(id);
    if (!delivery) {
      return { error: 'Delivery not found' };
    }

    delivery.status = 'DELIVERED';
    delivery.deliveredAt = new Date();
    delivery.updatedAt = new Date();

    // TODO: Record audit log
    // TODO: Update assistance request status

    return delivery;
  }

  getCoverageStats(emergencyId?: number) {
    let relevant = this.deliveries;

    if (emergencyId) {
      relevant = relevant.filter(d => d.emergencyId === emergencyId);
    }

    const total = relevant.length;
    const delivered = relevant.filter(d => d.status === 'DELIVERED').length;
    const pending = relevant.filter(d => d.status === 'PENDING').length;

    return {
      emergencyId,
      totalDeliveries: total,
      deliveredDeliveries: delivered,
      pendingDeliveries: pending,
      coveragePercentage: total > 0 ? Math.round((delivered / total) * 100) : 0,
    };
  }
}
