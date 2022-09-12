import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class GetUserDto {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(60)
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty()
  @IsString()
  _id?: string;
}
