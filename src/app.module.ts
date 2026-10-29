import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssistanceRequestsModule } from './assistance-requests/assistance-requests.module';

@Module({
  imports: [AssistanceRequestsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
