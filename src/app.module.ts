import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { Log4jsModule } from '@nestx-log4js/core';
import { DbModule } from './db/db.module';

@Module({
  imports: [
    UserModule,
    Log4jsModule.forRoot(),
    DbModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
