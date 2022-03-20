import { Module } from '@nestjs/common';
import { KeyController } from './key.controller';
import { KeyService } from './key.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PushDeerKeys } from '../../entity/keys.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PushDeerKeys])],
  controllers: [KeyController],
  providers: [KeyService]
})
export class KeyModule {}
