import { PartialType } from '@nestjs/mapped-types';
import { CreateAffectedPersonDto } from './create-affected-person.dto';

export class UpdateAffectedPersonDto extends PartialType(CreateAffectedPersonDto) {}
