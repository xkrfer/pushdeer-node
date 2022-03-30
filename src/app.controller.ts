import { Controller, Get, HttpCode, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Code } from './helpers/utils';
import { GITHUB_CLIENT_ID } from './helpers/config';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/appid')
  getAppId() {
    return {
      code: Code.DONE,
      data: {
        github: GITHUB_CLIENT_ID,
      },
    };
  }
}
