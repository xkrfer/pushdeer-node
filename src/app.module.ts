import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { Log4jsModule } from '@nestx-log4js/core';
import { DbModule } from './db/db.module';
import { DeviceModule } from './modules/device/device.module';
import { LoginModule } from './modules/login/login.module';
import { KeyModule } from './modules/key/key.module';
import { MessageModule } from './modules/message/message.module';

@Module({
  imports: [
    Log4jsModule.forRoot(),
    DbModule,
    DeviceModule,
    LoginModule,
    UserModule,
    KeyModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
