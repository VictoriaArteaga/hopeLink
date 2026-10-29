import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AffectedPeopleController } from './affected-people.controller';
import { AffectedPeopleService } from './affected-people.service';
import { AffectedPerson } from './entities/affected-person.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AffectedPerson])],
  controllers: [AffectedPeopleController],
  providers: [AffectedPeopleService],
})
export class AffectedPeopleModule {}
