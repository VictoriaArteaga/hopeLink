import { Injectable } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { RecordMovementDto } from './dto/record-movement.dto';

@Injectable()
export class InventoryService {
  private inventory: any[] = [];
  private movements: any[] = [];

  create(createInventoryDto: CreateInventoryDto) {
    const inventoryItem = {
      id: this.inventory.length + 1,
      ...createInventoryDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.inventory.push(inventoryItem);

    // Record initial movement
    this.movements.push({
      id: this.movements.length + 1,
      inventoryId: inventoryItem.id,
      type: 'ENTRY',
      quantity: createInventoryDto.quantity,
      reason: 'INITIAL',
      createdAt: new Date(),
    });

    return inventoryItem;
  }

  findAll(shelterId?: number) {
    if (shelterId) {
      return this.inventory.filter(item => item.shelterId === shelterId);
    }
    return this.inventory;
  }

  findOne(id: number) {
    return this.inventory.find(item => item.id === id);
  }

  update(id: number, updateInventoryDto: UpdateInventoryDto) {
    const index = this.inventory.findIndex(item => item.id === id);
    if (index >= 0) {
      this.inventory[index] = {
        ...this.inventory[index],
        ...updateInventoryDto,
        updatedAt: new Date(),
      };
      return this.inventory[index];
    }
    return null;
  }

  remove(id: number) {
    const index = this.inventory.findIndex(item => item.id === id);
    if (index >= 0) {
      const item = this.inventory.splice(index, 1);
      return item[0];
    }
    return null;
  }

  recordMovement(inventoryId: number, recordMovementDto: RecordMovementDto) {
    const inventoryItem = this.findOne(inventoryId);
    if (!inventoryItem) {
      return { error: 'Inventory item not found' };
    }

    // Calculate new quantity
    let newQuantity = inventoryItem.quantity;
    if (recordMovementDto.type === 'ENTRY') {
      newQuantity += recordMovementDto.quantity;
    } else if (recordMovementDto.type === 'EXIT') {
      newQuantity -= recordMovementDto.quantity;
    }

    // Update inventory
    inventoryItem.quantity = Math.max(0, newQuantity);
    inventoryItem.updatedAt = new Date();

    // Record movement
    const movement = {
      id: this.movements.length + 1,
      inventoryId,
      ...recordMovementDto,
      createdAt: new Date(),
    };
    this.movements.push(movement);

    return {
      movement,
      inventoryItem,
    };
  }

  getMovements(inventoryId: number) {
    return this.movements.filter(m => m.inventoryId === inventoryId);
  }
}
