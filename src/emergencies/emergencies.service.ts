import { Injectable } from '@nestjs/common';
import { CreateEmergencyDto } from './dto/create-emergency.dto';
import { UpdateEmergencyDto } from './dto/update-emergency.dto';

@Injectable()
export class EmergenciesService {
  private emergencies: any[] = [];

  create(createEmergencyDto: CreateEmergencyDto) {
    const emergency = {
      id: this.emergencies.length + 1,
      ...createEmergencyDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.emergencies.push(emergency);
    return emergency;
  }

  findAll() {
    return this.emergencies;
  }

  findOne(id: number) {
    return this.emergencies.find(emergency => emergency.id === id);
  }

  update(id: number, updateEmergencyDto: UpdateEmergencyDto) {
    const index = this.emergencies.findIndex(emergency => emergency.id === id);
    if (index >= 0) {
      this.emergencies[index] = {
        ...this.emergencies[index],
        ...updateEmergencyDto,
        updatedAt: new Date(),
      };
      return this.emergencies[index];
    }
    return null;
  }

  remove(id: number) {
    const index = this.emergencies.findIndex(emergency => emergency.id === id);
    if (index >= 0) {
      const emergency = this.emergencies.splice(index, 1);
      return emergency[0];
    }
    return null;
  }
}
