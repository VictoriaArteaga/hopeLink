import { Injectable } from '@nestjs/common';
import { CreateSupplyDto } from './dto/create-supply.dto';
import { UpdateSupplyDto } from './dto/update-supply.dto';

@Injectable()
export class SuppliesService {
  private supplies: any[] = [];

  create(createSupplyDto: CreateSupplyDto) {
    const supply = {
      id: this.supplies.length + 1,
      ...createSupplyDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.supplies.push(supply);
    return supply;
  }

  findAll() {
    return this.supplies;
  }

  findOne(id: number) {
    return this.supplies.find(supply => supply.id === id);
  }

  update(id: number, updateSupplyDto: UpdateSupplyDto) {
    const index = this.supplies.findIndex(supply => supply.id === id);
    if (index >= 0) {
      this.supplies[index] = {
        ...this.supplies[index],
        ...updateSupplyDto,
        updatedAt: new Date(),
      };
      return this.supplies[index];
    }
    return null;
  }

  remove(id: number) {
    const index = this.supplies.findIndex(supply => supply.id === id);
    if (index >= 0) {
      const supply = this.supplies.splice(index, 1);
      return supply[0];
    }
    return null;
  }
}
