import { Module } from '@nestjs/common';
import { DeliveriesController } from './deliveries.controller';
import { DeliveriesService } from './deliveries.service';
import { AssistanceRequestsModule } from '../assistance-requests/assistance-requests.module';
import { InventoryModule } from '../inventory/inventory.module';

@Module({
  imports: [AssistanceRequestsModule, InventoryModule],
  controllers: [DeliveriesController],
  providers: [DeliveriesService],
  exports: [DeliveriesService],
})
export class DeliveriesModule {}
