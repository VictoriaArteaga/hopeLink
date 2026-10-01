import { Injectable } from '@nestjs/common';
import { CreateShelterDto } from './dto/create-shelter.dto';
import { UpdateShelterDto } from './dto/update-shelter.dto';

@Injectable()
export class SheltersService {
  private shelters: any[] = [];

  create(createShelterDto: CreateShelterDto) {
    const shelter = {
      id: this.shelters.length + 1,
      ...createShelterDto,
      currentOccupancy: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.shelters.push(shelter);
    return shelter;
  }

  findAll() {
    return this.shelters;
  }

  findOne(id: number) {
    return this.shelters.find(shelter => shelter.id === id);
  }

  update(id: number, updateShelterDto: UpdateShelterDto) {
    const index = this.shelters.findIndex(shelter => shelter.id === id);
    if (index >= 0) {
      this.shelters[index] = {
        ...this.shelters[index],
        ...updateShelterDto,
        updatedAt: new Date(),
      };
      return this.shelters[index];
    }
    return null;
  }

  remove(id: number) {
    const index = this.shelters.findIndex(shelter => shelter.id === id);
    if (index >= 0) {
      const shelter = this.shelters.splice(index, 1);
      return shelter[0];
    }
    return null;
  }

  getOccupancy(id: number) {
    const shelter = this.findOne(id);
    if (!shelter) return null;

    const occupancyPercentage =
      (shelter.currentOccupancy / shelter.capacity) * 100;

    return {
      shelterId: id,
      shelterName: shelter.name,
      capacity: shelter.capacity,
      currentOccupancy: shelter.currentOccupancy,
      availableCapacity: shelter.capacity - shelter.currentOccupancy,
      occupancyPercentage: Math.round(occupancyPercentage),
    };
  }
}
