import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const logger = new Logger('request');

@Injectable()
export class RequestInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now(); // 请求开始时间
    const host = context.switchToHttp();
    const request = host.getRequest<Request>();
    const urlInfo = `${request.method} ${request.url}`;
    return next
      .handle()
      .pipe(tap(() => logger.log(`${urlInfo} ${Date.now() - start} ms`)));
  }
}
