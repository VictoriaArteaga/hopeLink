import { PartialType } from '@nestjs/mapped-types';
import { CreateAssistanceRequestDto } from './create-assistance-request.dto';
import { IsEnum, IsOptional, IsString, IsNumber } from 'class-validator';
import { AssistanceRequestStatus } from '../entities/assistance-request.entity';

export class UpdateAssistanceRequestDto extends PartialType(
  CreateAssistanceRequestDto,
) {
  @IsEnum(AssistanceRequestStatus)
  @IsOptional()
  status?: AssistanceRequestStatus;

  @IsNumber()
  @IsOptional()
  approvedBy?: number;

  @IsString()
  @IsOptional()
  rejectionReason?: string;
}
