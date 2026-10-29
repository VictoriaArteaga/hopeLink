import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AffectedPeopleModule } from './affected-people/affected-people.module';

@Module({
  imports: [UsersModule, AffectedPeopleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
