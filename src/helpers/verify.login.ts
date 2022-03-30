import { AppleLoginDto } from '../dto/user.dto';
import { HttpException } from '@nestjs/common';
import { Code } from './utils';
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from './config';
import * as qs from 'qs';
import { request } from './request';

export interface AppleUserInfo {
  email: string;
  name: string;
  apple_id: string;
}

export async function verifyAppleToken(
  appleLogin: AppleLoginDto,
): Promise<AppleUserInfo> {
  const info = appleLogin.idToken.split('.')[1];
  if (!info) {
    throw new HttpException(
      {
        code: Code.AUTH,
        error: 'idToken错误',
      },
      200,
    );
  }
  let infoToJson: any = {};
  try {
    infoToJson = JSON.parse(Buffer.from(info, 'base64').toString('utf-8'));
  } catch {
    throw new HttpException(
      {
        code: Code.AUTH,
        error: 'idToken解析失败',
      },
      200,
    );
  }
  const email = infoToJson.email;
  return {
    email,
    name: email.split('@')[0],
    apple_id: infoToJson.sub,
  };
}

export async function githubLogin(code: string) {
  const access_token = await getGithubAccessToken(code);
  return await getGithubUser(access_token);
}

async function getGithubAccessToken(code: string) {
  const data = await request({
    method: 'post',
    url: `https://github.com/login/oauth/access_token`,
    data: {
      client_id: GITHUB_CLIENT_ID,
      client_secret: GITHUB_CLIENT_SECRET,
      code,
    },
  });
  const { access_token } = qs.parse(data.data);
  return access_token as string;
}

async function getGithubUser(access_token: string) {
  const data = await request({
    method: 'GET',
    url: 'https://api.github.com/user',
    headers: {
      Authorization: `token ${access_token}`,
    },
  });
  return data.data;
}
