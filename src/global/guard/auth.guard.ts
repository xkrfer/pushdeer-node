import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { RedisCoreService } from '../../modules/redis-core/redis-core.service';
import { Code } from '../../helpers/utils';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    //获取请求对象
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const token = method === 'GET' ? request.query.token : request.body.token;
    const user = await RedisCoreService.get(token);
    if (token && user) {
      request.session.user = JSON.parse(user);
      return true;
    } else {
      throw new HttpException(
        {
          code: Code.AUTH,
          error: '当前用户没有足够的权限访问此接口',
        },
        200,
      );
    }
  }
}
