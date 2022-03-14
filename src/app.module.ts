import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { Log4jsModule } from "@nestx-log4js/core";
import { DbModule } from "./db/db.module";
import { DeviceModule } from './device/device.module';
import { LoginModule } from './login/login.module';

@Module({
  imports: [
    Log4jsModule.forRoot(),
    DbModule,
    DeviceModule,
    LoginModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
