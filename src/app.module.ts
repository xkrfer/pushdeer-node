import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { Log4jsModule } from '@nestx-log4js/core';
import { DbModule } from './modules/db/db.module';
import { DeviceModule } from './modules/device/device.module';
import { LoginModule } from './modules/login/login.module';
import { KeyModule } from './modules/key/key.module';
import { MessageModule } from './modules/message/message.module';
import { RequestMiddleware } from './global/middleware/request.middleware';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { MAX_EVERY_API_LIMIT_PER_MINUTE } from './helpers/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    Log4jsModule.forRoot(),
    DbModule,
    DeviceModule,
    LoginModule,
    UserModule,
    KeyModule,
    MessageModule,
    ThrottlerModule.forRoot({
      ttl: 60, // 每分钟
      limit: Number(MAX_EVERY_API_LIMIT_PER_MINUTE), //  调接口
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static/dist'),
      exclude: [
        '/device*',
        '/key*',
        '/login*',
        '/message*',
        '/user*',
        '/appid*',
      ],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestMiddleware).forRoutes('*');
  }
}
