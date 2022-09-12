import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, IsEmail } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'John Doe',
    required: true,
  })
  @IsString()
  @MinLength(3)
  @MaxLength(60)
  name: string;

  @ApiProperty({ required: true, example: 'my_strong_password' })
  @IsString()
  @MinLength(6)
  @MaxLength(30)
  password: string;

  @ApiProperty({ required: true, example: 'test@example.com' })
  @IsEmail()
  email: string;
}
