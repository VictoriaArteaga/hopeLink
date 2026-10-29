import { Module } from '@nestjs/common';
import { AssistanceRequestsController } from './assistance-requests.controller';
import { AssistanceRequestsService } from './assistance-requests.service';

@Module({
  controllers: [AssistanceRequestsController],
  providers: [AssistanceRequestsService],
  exports: [AssistanceRequestsService],
})
export class AssistanceRequestsModule {}
