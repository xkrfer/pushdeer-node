import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PushDeerMessages } from '../../entity/message.entity';
import { PushDeerKeys } from '../../entity/keys.entity';
import { PushDeerDevices } from '../../entity/devices.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PushDeerMessages, PushDeerKeys, PushDeerDevices])],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {
}
