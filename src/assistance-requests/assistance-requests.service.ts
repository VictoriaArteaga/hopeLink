import { Injectable } from '@nestjs/common';
import { CreateAssistanceRequestDto } from './dto/create-assistance-request.dto';
import { UpdateAssistanceRequestDto } from './dto/update-assistance-request.dto';
import { PrioritizationService } from '../prioritization/prioritization.service';

@Injectable()
export class AssistanceRequestsService {
  private requests: any[] = [];

  constructor(private readonly prioritizationService: PrioritizationService) {}

  create(createAssistanceRequestDto: CreateAssistanceRequestDto) {
    // TODO: Validate affected person and emergency exist

    // Calculate priority
    const priority = this.prioritizationService.calculatePriority(
      createAssistanceRequestDto,
    );

    const request = {
      id: this.requests.length + 1,
      ...createAssistanceRequestDto,
      priority,
      status: 'PENDING',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.requests.push(request);
    return request;
  }

  findAll(emergencyId?: number, status?: string) {
    let filtered = this.requests;

    if (emergencyId) {
      filtered = filtered.filter(req => req.emergencyId === emergencyId);
    }

    if (status) {
      filtered = filtered.filter(req => req.status === status);
    }

    // Sort by priority
    return filtered.sort((a, b) => b.priority - a.priority);
  }

  findOne(id: number) {
    return this.requests.find(request => request.id === id);
  }

  update(id: number, updateAssistanceRequestDto: UpdateAssistanceRequestDto) {
    const index = this.requests.findIndex(request => request.id === id);
    if (index >= 0) {
      const updatedRequest = {
        ...this.requests[index],
        ...updateAssistanceRequestDto,
        updatedAt: new Date(),
      };

      // Recalculate priority if needed
      if (
        updateAssistanceRequestDto.severity ||
        updateAssistanceRequestDto.quantity
      ) {
        updatedRequest.priority =
          this.prioritizationService.calculatePriority(updatedRequest);
      }

      this.requests[index] = updatedRequest;
      return this.requests[index];
    }
    return null;
  }

  remove(id: number) {
    const index = this.requests.findIndex(request => request.id === id);
    if (index >= 0) {
      const request = this.requests.splice(index, 1);
      return request[0];
    }
    return null;
  }

  findByPriority(priority: string) {
    return this.requests.filter(request => request.priority.toString() === priority);
  }
}
