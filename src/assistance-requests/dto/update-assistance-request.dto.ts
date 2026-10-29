import { PartialType } from '@nestjs/mapped-types';
import { CreateAssistanceRequestDto } from './create-assistance-request.dto';

export class UpdateAssistanceRequestDto extends PartialType(
  CreateAssistanceRequestDto,
) {}
