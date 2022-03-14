import { ApiProperty } from "@nestjs/swagger";

export class UserInfoDto {
  @ApiProperty({ description: "用户登录token", example: "it is token" })
  token: string;
}
