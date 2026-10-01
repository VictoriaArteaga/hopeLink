import { Module } from '@nestjs/common';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { SuppliesModule } from '../supplies/supplies.module';
import { SheltersModule } from '../shelters/shelters.module';

@Module({
  imports: [SuppliesModule, SheltersModule],
  controllers: [InventoryController],
  providers: [InventoryService],
  exports: [InventoryService],
})
export class InventoryModule {}
