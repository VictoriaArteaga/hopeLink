import { Module } from '@nestjs/common';
import { AssistanceRequestsController } from './assistance-requests.controller';
import { AssistanceRequestsService } from './assistance-requests.service';
import { PrioritizationModule } from '../prioritization/prioritization.module';

@Module({
  imports: [PrioritizationModule],
  controllers: [AssistanceRequestsController],
  providers: [AssistanceRequestsService],
  exports: [AssistanceRequestsService],
})
export class AssistanceRequestsModule {}
