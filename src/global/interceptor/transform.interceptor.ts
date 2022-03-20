import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Code } from '../../helpers/utils';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => {
      if (data.code === Code.DONE) {
        return {
          code: Code.DONE,
          content: data.data ?? {
            message: 'done',
          },
        };
      }
      return {
        code: data.code,
        error: data.error,
      };
    }));
  }
}
