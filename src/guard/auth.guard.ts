import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  handleRequest(err, user) {
    if (err) {
      throw err;
    }
    if (!user) {
      // 登录失败
      return null;
    }
    return { ...user };
  }
}
