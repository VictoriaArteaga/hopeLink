import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssistanceRequestsController } from './assistance-requests.controller';
import { AssistanceRequestsService } from './assistance-requests.service';
import { AssistanceRequest } from './entities/assistance-request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AssistanceRequest])],
  controllers: [AssistanceRequestsController],
  providers: [AssistanceRequestsService],
  exports: [AssistanceRequestsService],
})
export class AssistanceRequestsModule {}
