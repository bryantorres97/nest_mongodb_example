import { ApiProperty } from '@nestjs/swagger';
import { IsJWT, IsString, MaxLength, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({ required: true, type: String })
  @IsString()
  @MinLength(6)
  @MaxLength(30)
  password: string;

  @ApiProperty({ required: true, type: String })
  @IsJWT()
  token: string;
}
