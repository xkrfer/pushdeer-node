import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { Jwt_CONSTANT } from "./jwt.constant";
import { PushDeerUsers } from "../entity/users.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: Jwt_CONSTANT.secret
    });
  }

  async validate(payload: PushDeerUsers) {
    const { id, name, apple_id, wechat_id } = payload;
    return { id, name, apple_id, wechat_id  };
  }
}
