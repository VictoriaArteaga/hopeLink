import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Auth Module
import { AuthModule } from './auth/auth.module';

// User Management
import { UsersModule } from './users/users.module';

// Domain Modules
import { EmergenciesModule } from './emergencies/emergencies.module';
import { AffectedPeopleModule } from './affected-people/affected-people.module';
import { AssistanceRequestsModule } from './assistance-requests/assistance-requests.module';
import { PrioritizationModule } from './prioritization/prioritization.module';

// Logistics Modules
import { SheltersModule } from './shelters/shelters.module';
import { SuppliesModule } from './supplies/supplies.module';
import { InventoryModule } from './inventory/inventory.module';
import { DeliveriesModule } from './deliveries/deliveries.module';

// Audit Module
import { AuditModule } from './audit/audit.module';

@Module({
  imports: [
    // Auth
    AuthModule,
    UsersModule,
    
    // Domain
    EmergenciesModule,
    AffectedPeopleModule,
    AssistanceRequestsModule,
    PrioritizationModule,
    
    // Logistics
    SheltersModule,
    SuppliesModule,
    InventoryModule,
    DeliveriesModule,
    
    // Audit
    AuditModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
