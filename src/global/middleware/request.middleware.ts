import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';
import { Utils } from '../../helpers/utils';

const logger = new Logger('RequestMiddleware');

@Injectable()
export class RequestMiddleware implements NestMiddleware {
  use(req: Request, res: any, next: () => void) {
    if (req.method === 'POST') {
      const nullBody = Utils.checkNullObj(req.body);
      const nullQuery = Utils.checkNullObj(req.query);
      if (nullBody && !nullQuery) {
        req.body = req.query;
        req.query = {};
      }
    }
    next();
  }
}
