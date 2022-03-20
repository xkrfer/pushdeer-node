import { AuthDto } from './auth.dto';
import { ApiProperty } from '@nestjs/swagger';

export class GenKeyDto extends AuthDto {
}

export class RemoveKeyDto extends AuthDto {
  @ApiProperty({ description: 'Key ID', example: 'xxxxx', required: true })
  id: number;
}

export class ReGenKeyDto extends AuthDto {
  @ApiProperty({ description: 'Key ID', example: 'xxxxx', required: true })
  id: number;
}

export class ListKeyDto extends AuthDto {
}

export class RenameKeyDto extends AuthDto {
  @ApiProperty({ description: 'Key ID', example: 'xxxxx', required: true })
  id: number;

  @ApiProperty({ description: 'Key新名称', example: 'xxxxx', required: true })
  name: string;

}
