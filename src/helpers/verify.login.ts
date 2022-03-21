import { AppleLoginDto } from '../dto/user.dto';
import { HttpException } from '@nestjs/common';
import { Code } from './utils';


export interface AppleUserInfo {
  email: string;
  name: string;
  apple_id: string;
}

export async function verifyAppleToken(appleLogin: AppleLoginDto): Promise<AppleUserInfo> {
  const info = appleLogin.idToken.split('.')[1];
  if (!info) {
    throw new HttpException({
      code: Code.AUTH,
      error: 'idToken错误',
    }, 200);
  }
  let infoToJson: any = {};
  try {
    infoToJson = JSON.parse(Buffer.from(info, 'base64').toString('utf-8'));
  } catch {
    throw new HttpException({
      code: Code.AUTH,
      error: 'idToken解析失败',
    }, 200);
  }
  const email = infoToJson.email;
  return {
    email,
    name: email.split('@')[0],
    apple_id: infoToJson.sub,
  };
}
