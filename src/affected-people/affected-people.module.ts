import { Module } from '@nestjs/common';
import { AffectedPeopleController } from './affected-people.controller';
import { AffectedPeopleService } from './affected-people.service';

@Module({
  controllers: [AffectedPeopleController],
  providers: [AffectedPeopleService],
  exports: [AffectedPeopleService],
})
export class AffectedPeopleModule {}
