import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { Jwt_CONSTANT } from "./jwt.constant";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField("token"),
      ignoreExpiration: true,
      secretOrKey: Jwt_CONSTANT.secret
    });
  }

  async validate(payload: any) {
    const { id, name, apple_id, wechat_id, email, level, created_at, updated_at } = payload
    return { id, name, apple_id, wechat_id, email, level, created_at, updated_at };
  }
}
