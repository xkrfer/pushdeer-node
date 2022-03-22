import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Log4jsLogger } from '@nestx-log4js/core';
import { Logger } from '@nestjs/common';
import * as session from 'express-session';
import { TransformInterceptor } from './global/interceptor/transform.interceptor';
import { ValidationPipe } from './global/pipe/validation.pipe';
import { RequestInterceptor } from './global/interceptor/request.interceptor';
import { ConfigService } from '@nestjs/config';
import { HttpConfig } from './config/config.type';

const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const http: HttpConfig = configService.get('http');
  const debug: boolean = configService.get('app.debug') ?? false;
  // 允许跨域
  app.enableCors();
  // 配置swagger
  const config = new DocumentBuilder()
    .setTitle('PushDeerOS')
    .setDescription('PushDeer 接口文档')
    .setVersion('1.0')
    .addServer(`http://127.0.0.1:${http.port}`)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger-ui', app, document);
  // 使用log4js
  app.useLogger(app.get(Log4jsLogger));
  // 使用session
  app.use(
    session({
      secret: 'XXiTBNXKitYZaYcWXLmZQpDMbUKpKt3tMKP6rZoVCx',
      resave: false,
      saveUninitialized: true,
    }),
  );
  app.useGlobalInterceptors(
    new TransformInterceptor(),
    debug ? new RequestInterceptor() : null,
  );
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(http.port);
  return {
    PORT: http.port,
  };
}

bootstrap().then((res) => {
  logger.log(`listen in http://127.0.0.1:${res.PORT}/swagger-ui`);
});
